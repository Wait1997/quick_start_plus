import { watch } from 'vue'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router'
import { useStore } from 'vuex'

type FuncTags = (route: RouteLocationNormalizedLoaded) => void

const useTags = (): FuncTags => {
  const route = useRoute()
  const store = useStore()

  const addTags = (route: RouteLocationNormalizedLoaded): void => {
    console.log(route.matched)
    store.dispatch('tagsView/addView', route)
  }

  watch(
    () => route,
    to => {
      addTags(to)
    }
  )
  return addTags
}

export default useTags
