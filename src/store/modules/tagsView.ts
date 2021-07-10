import { RouteLocationNormalizedLoaded } from 'vue-router'

const state = {
  visitedViews: [],
  cachedViews: []
}

// const mutations = {
//   ADD_VISITED_VIEW: (state, view: RouteLocationNormalizedLoaded) => {},
//   ADD_CACHED_VIEW: (state, view: RouteLocationNormalizedLoaded) => {}
// }

const actions = {
  addView({ dispatch }: { dispatch: any }, view: RouteLocationNormalizedLoaded): void {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }: { commit: any }, view: RouteLocationNormalizedLoaded): void {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }: { commit: any }, view: RouteLocationNormalizedLoaded): void {
    commit('ADD_CACHED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  // mutations,
  actions
}
