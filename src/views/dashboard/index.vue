<template>
  <div class="dashboardContainer">
    <component :is="currentRole"></component>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import adminDashboard from './admin/index.vue'
import editorDashboard from './editor/index.vue'

export default defineComponent({
  components: { adminDashboard, editorDashboard },
  setup() {
    const currentRole = ref<string>('adminDashboard')
    return {
      currentRole
    }
  }
})
</script>
