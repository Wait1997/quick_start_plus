<template>
  <div class="appContainer">
    <side-bar class="sidebarContainer" />
    <div class="mainContainer">
      <div :class="{ fixedHeader: fixedHeader }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sideBar from './compoennts/sideBar/index.vue'
import navbar from './compoennts/navbar.vue'
import appMain from './compoennts/AppMain.vue'
import tagsView from './compoennts/tagsView/index.vue'

export default defineComponent({
  name: 'Layout',
  components: { sideBar, appMain, navbar, tagsView },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.scss';

.appContainer {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
