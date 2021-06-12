<template>
  <el-scrollbar class="scrollContainer">
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>
