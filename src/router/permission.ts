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

  // 如果是登录页直接放行
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 有token并且能够拿到用户名
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfo')
          next()
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
