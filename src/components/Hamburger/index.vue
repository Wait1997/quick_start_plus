<template>
  <div style="width: 30px; height: 30px; background: pink" @click="toggleSideBar"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const toggleSideBar = (): void => emit('toggleSideBar')
    return {
      toggleSideBar
    }
  }
})
</script>
