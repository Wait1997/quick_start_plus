<template>
  <div>
    <logo />
    <el-scrollbar wrap-class="scrollbarWrap">
      <el-menu
        default-active="2"
        :collapse="true"
        :uniqueOpened="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        mode="vertical"
      >
        <sidebar-item v-for="route in permissionRoutes" :key="route.path" :item="route" :basePath="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import logo from './logo.vue'
import sidebarItem from './Sidebaritem.vue'

export default defineComponent({
  components: {
    logo,
    sidebarItem
  },
  setup() {
    const store = useStore()
    const permissionRoutes = computed(() => store.getters.permission_routes)
    return {
      permissionRoutes
    }
  }
})
</script>
