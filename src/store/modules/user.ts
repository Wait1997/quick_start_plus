import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, LoginForm, getInfo, UserInfo, logout } from '@/api/index'

export interface UserState {
  token: string | undefined
  name: string
  avatar: string
  introduction: string
  roles: string | string[]
  [index: string]: any
}

const state: UserState = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state: UserState, token: string | undefined): void => {
    state.token = token
  },
  SET_NAME: (state: UserState, name: string): void => {
    state.name = name
  },
  SET_AVATAR: (state: UserState, avatar: string): void => {
    state.avatar = avatar
  },
  SET_INTRODUCTION: (state: UserState, introduction: string): void => {
    state.introduction = introduction
  },
  SET_ROLES: (state: UserState, roles: string | string[]): void => {
    state.roles = roles
  }
}

const actions = {
  login({ commit }: { commit: any }, userInfo: LoginForm): Promise<string> {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          const data = login({ username, password })
          commit('SET_TOKEN', data.token)
          setToken(data.token) // 把token存在cookie中
          resolve(data.token)
        }, 500)
      } catch (error) {
        reject(error)
      }
    })
  },

  getInfo({ commit, state }: { commit: any; state: UserState }): Promise<UserInfo> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const data = getInfo(state.token)
          const { name, avatar, roles, introduction } = data
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_INTRODUCTION', introduction)
          commit('SET_ROLES', roles)
          resolve(data)
        } catch (error) {
          reject(error)
        }
      }, 500)
    })
  },

  logout({ commit, state }: { commit: any; state: UserState }): Promise<null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          logout(state.token)
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          // reset 路由
          resolve(null)
        } catch (error) {
          reject(error)
        }
      }, 300)
    })
  },

  resetToken({ commit }: { commit: any }): Promise<null> {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken() // must remove token first
      resolve(null)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
