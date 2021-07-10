<template>
  <div class="menu">
    <dropdown @logout="logout" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Dropdown from '@/components/Dropdown/index.vue'

export default defineComponent({
  components: {
    Dropdown
  },
  emits: ['logout'],
  setup(props, { emit }) {
    const logout = (): void => {
      emit('logout')
    }
    return {
      logout
    }
  }
})
</script>

<style lang="scss" scoped>
.menu {
  margin-right: 30px;
}
</style>
