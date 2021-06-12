<template>
  <div>
    <hamburger @toggleSideBar="toggleSideBar" />
    <breadcrumb />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'

export default defineComponent({
  components: {
    Hamburger,
    Breadcrumb
  },
  setup() {
    const toggleSideBar = (): void => {
      console.log('朱艳我老婆')
    }
    return {
      toggleSideBar
    }
  }
})
</script>
