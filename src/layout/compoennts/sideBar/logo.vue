<template>
  <div class="sidebarLogo" :class="{ collapse: collapse }">
    <router-link class="sidebar-logo-link" to="/" active-class="routerLink" exact-active-class="routerLinkActive">
      <img class="sider-logo" v-if="logo" :src="logo" />
      <transition name="sidebarLogoFade"
        ><span class="sidebar-title" v-if="!collapse">{{ title }}</span></transition
      >
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const title = 'vue element admin'
    const logo = 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    return {
      title,
      logo
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebarLogo {
  position: relative;
  width: 100%;
  height: 50px;
  overflow: hidden;
  line-height: 50px;
  text-align: center;
  background-color: #2b2f23;

  .sidebar-logo-link {
    width: 100%;
    height: 100%;

    .sider-logo {
      width: 32px;
      height: 32px;
      margin-right: 12px;
      vertical-align: middle;
    }

    .sidebar-title {
      display: inline-block;
      color: #fff;
      font-weight: 600;
      font-size: 14px;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 50px;
      vertical-align: middle;
    }
  }

  &.collapse {
    text-align: center;

    .sider-logo {
      margin-right: 0;
    }
  }
}
</style>
