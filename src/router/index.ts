import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

/**
 * 路由：
 * meta: {title,icon,noCache}
 * currencyRoutes：通用的router
 */
export const currencyRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { title: '登录页', hidden: true }
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error/404'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "401" */ '@/views/error/401')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'el-icon-s-data', affix: true }
      }
    ]
  },
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/index',
    children: [
      {
        path: 'index',
        name: 'PersonalIndex',
        component: () => import(/* webpackChunkName: "personal-index" */ '@/views/personal'),
        meta: { title: '个人中心', icon: 'el-icon-s-data' }
      }
    ]
  }
]

// 动态路由
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page-user',
    meta: { title: '权限许可', icon: 'el-icon-lock', roles: ['admin', 'editor'], alwaysShow: true },
    children: [
      {
        path: 'page-user',
        name: 'PageUser',
        component: () => import(/* webpackChunkName: "page-user" */ '@/views/permission/pageUser/index.vue'),
        meta: { title: '用户页面', icon: 'el-icon-user' }
      },
      {
        path: 'page-admin',
        name: 'PageAdmin',
        component: () => import(/* webpackChunkName: "page-admin" */ '@/views/permission/pageAdmin/index.vue'),
        meta: { title: '管理员页面', icon: 'el-icon-user-solid', roles: ['admin'] }
      },
      {
        path: 'roles',
        name: 'Roles',
        component: () => import(/* webpackChunkName: "roles" */ '@/views/permission/roles/index.vue'),
        meta: { title: '权限设置', icon: 'el-icon-s-tools', roles: ['admin'] }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: currencyRoutes
})

export default router
