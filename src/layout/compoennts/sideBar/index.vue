<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbarWrap">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :uniqueOpened="uniqueOpened"
        :background-color="variable.menuBg"
        :text-color="variable.menuText"
        :active-text-color="variable.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permissionRoutes" :key="route.path" :item="route" :basePath="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, ref, watch } from 'vue'
import { RouteRecordRaw, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import logo from './logo.vue'
import sidebarItem from './Sidebaritem.vue'
import variables from '@/styles/variables.scss'

export default defineComponent({
  components: {
    logo,
    sidebarItem
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const uniqueOpened = ref(true)

    const sidebar = computed(() => store.getters.sidebar)
    const permissionRoutes: ComputedRef<RouteRecordRaw[]> = computed(
      (): RouteRecordRaw[] => store.getters.permission_routes
    )
    const activeMenu: ComputedRef<string> = computed((): string => {
      const { meta, path } = route
      if (meta?.activeMenu) {
        return meta?.activeMenu as string
      }
      return path
    })
    const showLogo: ComputedRef<boolean> = computed((): boolean => true)
    const isCollapse: ComputedRef<boolean> = computed(() => !sidebar.value.opened)
    const variable: ComputedRef<any> = computed(() => variables)

    return {
      uniqueOpened,
      permissionRoutes,
      showLogo,
      isCollapse,
      activeMenu,
      variable
    }
  }
})
</script>

<style lang="scss" scoped>
/* stylelint-disable */

.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
  .scrollbarWrap {
    overflow-x: hidden;
  }
}
</style>
