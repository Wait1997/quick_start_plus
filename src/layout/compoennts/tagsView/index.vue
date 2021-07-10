<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link v-for="tag in visitedViews" :key="tag.path"></router-link>
    </scroll-pane>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import useTags from './hooks/usetags'
import ScrollPane from './scrollPane.vue'

export default defineComponent({
  components: {
    ScrollPane
  },
  setup() {
    useTags()
    const visitedViews = ref<RouteLocationNormalizedLoaded[]>([])
    // const visitedViews = computed(() => store.state.)
    return { visitedViews }
  }
})
</script>
