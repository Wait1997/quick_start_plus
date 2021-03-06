import { createStore } from 'vuex'
import user from './modules/user'
import permission from './modules/permission'
import app from './modules/app'

export default createStore({
  modules: {
    app,
    user,
    permission
  },
  getters: {
    token: (state: any): string | undefined => state.user.token,
    avatar: (state: any): string => state.user.avatar,
    name: (state: any): string => state.user.name,
    introduction: (state: any): string => state.user.introduction,
    roles: (state: any): string | string[] => state.user.roles,
    permission_routes: (state: any) => state.permission.routes,
    sidebar: (state: any) => state.app.sidebar
  }
})
