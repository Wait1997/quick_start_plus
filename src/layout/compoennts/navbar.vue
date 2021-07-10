<template>
  <div class="navbar">
    <div class="left-container">
      <hamburger class="hamburger-container" :isActive="sidebar.opened" @toggleSideBar="toggleSideBar" />
      <breadcrumb class="breadcrumb-container" />
    </div>
    <right-menu class="right-menu" @logout="logout" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import RightMenu from '@/layout/compoennts/rightMenu/index.vue'

export default defineComponent({
  components: {
    Hamburger,
    Breadcrumb,
    RightMenu
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const sidebar = computed(() => store.getters.sidebar)
    const toggleSideBar = (): void => {
      store.dispatch('app/toggleSideBar')
    }
    const logout = (): void => {
      store.dispatch('user/logout').then(() => {
        router.push({
          path: '/login',
          query: {
            redirect: route.fullPath
          }
        })
      })
    }
    return {
      sidebar,
      toggleSideBar,
      logout
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .left-container {
    display: flex;
    align-items: center;

    .hamburger-container {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .right-menu {
    height: 50px;
    line-height: 50px;
  }
}
</style>
