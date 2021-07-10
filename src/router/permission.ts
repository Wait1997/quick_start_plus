import { RouteRecordRaw } from 'vue-router'
import router from './index'
import store from '@/store'
import getTitle from '@/utils/getTitle'
import { getToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'

// 白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // 获取标签title
  document.title = getTitle(to.meta.title as string)

  const hasToken = getToken()

  // 是否有token
  if (hasToken) {
    // 有token的情况下 如果是登录页直接放行
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 有token并且能够拿到用户角色 此时的路由表已经根据角色确定
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // 获取路由表中所有路由记录
        const routerAllLists = router.getRoutes()
        // 如果用户手动输入了错误的路径跳转到404
        if (routerAllLists.some(route => route.path === to.path)) {
          next()
        } else {
          next({ path: '/404' })
        }
      } else {
        try {
          // 接口返回的 roles(Array<string>)
          const { roles } = await store.dispatch('user/getInfo')

          // 获取匹配后的动态路由 accessRoutes
          const accessRoutes: RouteRecordRaw[] = await store.dispatch('permission/generateRoutes', roles)

          // 动态添加异步路由到路由表中
          accessRoutes.forEach(route => router.addRoute(route))

          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          ElMessage.error('error' || 'Has Error')
          next({
            path: '/login',
            query: {
              redirect: to.fullPath
            }
          })
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
})
