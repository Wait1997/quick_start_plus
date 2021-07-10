/*
 * @Author: @guofang
 * @Date: 2021-07-07 21:24:52
 * @Last Modified by: @guofang
 * @Last Modified time: 2021-07-07 21:28:19
 */

import { RouteRecordRaw, RouteMeta } from 'vue-router'
import { currencyRoutes, asyncRoutes } from '@/router'
export interface PermissionState {
  /**
   * @description 路由表中的全部的路由
   */
  routes: RouteRecordRaw[]
  /**
   * @description 动态的有权限的路由
   */
  addRoutes: RouteRecordRaw[]
}

/**
 * @description 判断是否有通过的权限
 * @param roles 接口返回的对应的角色
 * @param route 路由表中定义的角色权限
 * @returns boolean
 */
function hasPermission(roles: string | string[], route: RouteRecordRaw): boolean {
  if (route.meta && route.meta.roles) {
    if (Array.isArray(roles)) {
      return roles.some(role => ((route.meta as RouteMeta).roles as string[]).includes(role))
    } else {
      return (route.meta.roles as string[]).includes(roles)
    }
  }
  return true
}

/**
 * @description 递归遍历动态路由表 根据角色判断可渲染的菜单列表
 * @param routes 路由表
 * @param roles 接口返回的角色
 * @returns RouteRecordRaw[]
 */
function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string | string[]): RouteRecordRaw[] {
  const res: RouteRecordRaw[] = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state: PermissionState, routes: RouteRecordRaw[]): void => {
    state.addRoutes = routes
    state.routes = currencyRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }: { commit: any }, roles: string | string[]): Promise<RouteRecordRaw[]> {
    return new Promise(resolve => {
      // asyncRoutes动态加载的路由
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
