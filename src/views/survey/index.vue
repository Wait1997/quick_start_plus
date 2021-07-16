<template>
  <div>
    朱艳
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <Component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>
