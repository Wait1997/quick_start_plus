<template>
  <div class="appContainer" :class="classStyles">
    <!-- 侧边导航栏 -->
    <side-bar class="sidebarContainer" />
    <!-- 头部以及内容容器 -->
    <div class="mainContainer">
      <div :class="{ fixedHeader: fixedHeader }">
        <navbar />
        <tags-view />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue'
import { useStore } from 'vuex'
import sideBar from './compoennts/sideBar/index.vue'
import navbar from './compoennts/navbar.vue'
import appMain from './compoennts/AppMain.vue'
import tagsView from './compoennts/tagsView/index.vue'

export default defineComponent({
  name: 'Layout',
  components: { sideBar, appMain, navbar, tagsView },
  setup() {
    const store = useStore()
    const fixedHeader: ComputedRef<boolean> = computed((): boolean => true)
    const sidebar = computed(() => store.getters.sidebar)
    const classStyles = computed(() => {
      return {
        hideSidebar: sidebar.value.opened ? false : true,
        openSidebar: sidebar.value.opened ? true : false,
        withoutAnimation: sidebar.value.withoutAnimation
      }
    })
    console.log(classStyles.value)
    return {
      fixedHeader,
      classStyles
    }
  }
})
</script>

<style lang="scss" scoped>
/* stylelint-disable */

.appContainer {
  position: relative;
  width: 100%;
  height: 100%;

  .sidebarContainer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    height: 100%;
    overflow: hidden;
    background-color: #304156;
    transition: width 0.28s;
  }

  .mainContainer {
    position: relative;
    min-height: 100%;
    transition: margin-left 0.28s;
    .fixedHeader {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      transition: width 0.28s;
    }
  }
}

.hideSidebar {
  .sidebarContainer {
    width: 54px;
  }
  .mainContainer {
    margin-left: 54px;
    .fixedHeader {
      width: calc(100% - 54px);
    }
  }
}
.openSidebar {
  .sidebarContainer {
    width: 210px;
  }
  .mainContainer {
    margin-left: 210px;
    .fixedHeader {
      width: calc(100% - 210px);
    }
  }
}
</style>
