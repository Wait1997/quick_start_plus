import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout'

/**
 * 路由：
 * meta: {title,icon,noCache}
 * currencyRoutes：通用的router
 */
export const currencyRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login'),
    meta: { title: '登录页' }
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404')
  },
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        // eslint-disable-next-line prettier/prettier
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard'),
        meta: { title: '首页', icon: 'el-icon-s-data' }
      }
    ]
  },
  {
    path: '/personal',
    name: 'personal',
    component: Layout,
    redirect: '/personal/index',
    children: [
      {
        path: 'index',
        name: 'personal-index',
        component: () => import(/* webpackChunkName: "personal-index" */ '@/views/personal'),
        meta: { title: '个人中心' }
      }
    ]
  }
]

// 动态路由
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/permission',
    name: 'permission',
    component: Layout,
    redirect: '/permission/page-user',
    meta: { title: '权限许可', icon: 'el-icon-lock' },
    children: [
      {
        path: 'page-user',
        name: 'page-user',
        component: () => import(/* webpackChunkName: "page-user" */ '@/views/permission/pageUser'),
        meta: { title: '用户页面', icon: 'el-icon-user' }
      },
      {
        path: 'page-admin',
        name: 'page-admin',
        component: () => import(/* webpackChunkName: "page-admin" */ '@/views/permission/pageAdmin'),
        meta: { title: '管理员页面', icon: 'el-icon-user-solid' }
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import(/* webpackChunkName: "roles" */ '@/views/permission/roles'),
        meta: { title: '权限设置', icon: 'el-icon-s-tools' }
      }
    ]
  },
  {
    path: '*',
    name: '*404',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: currencyRoutes
})

export default router
