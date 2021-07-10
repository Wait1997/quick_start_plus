<template>
  <el-dropdown trigger="click">
    <el-button type="primary">头像</el-button>
    <template v-slot:dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <router-link to="/dashboard">首页</router-link>
        </el-dropdown-item>
        <el-dropdown-item divided @click="logout">
          <span>退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['logout'],
  setup(props, { emit }) {
    const logout = (): void => emit('logout')
    return {
      logout
    }
  }
})
</script>
