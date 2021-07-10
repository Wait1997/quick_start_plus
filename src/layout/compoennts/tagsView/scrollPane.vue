<template>
  <el-scrollbar class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const handleScroll = (e: any): void => {
      console.log(e)
    }
    return {
      handleScroll
    }
  }
})
</script>
