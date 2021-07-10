import { getSidebarStatus, setSidebarStatus } from '@/utils/auth'

export interface SideBar {
  opened: boolean
  withoutAnimation: boolean
}
export interface AppState {
  sidebar: SideBar
}

const state: AppState = {
  sidebar: {
    opened: getSidebarStatus(),
    withoutAnimation: false
  }
}

const mutations = {
  TOGGLE_SIDEBAR: (state: AppState): void => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    state.sidebar.opened ? setSidebarStatus(1) : setSidebarStatus(0)
  }
}

const actions = {
  toggleSideBar({ commit }: { commit: any }): void {
    console.log('xxxxx')
    commit('TOGGLE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
