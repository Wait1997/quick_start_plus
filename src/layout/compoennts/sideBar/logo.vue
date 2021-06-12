<template>
  <div class="sidebarLogo" v-if="false">
    <router-link to="/" active-class="routerLink" exact-active-class="routerLinkActive">
      <img :src="logo" alt="" />
      <transition name="sidebarLogoFade"
        ><span v-if="collapse">{{ title }}</span></transition
      >
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '欢迎'
    },
    collapse: {
      type: Boolean,
      default: true
    },
    logo: {
      type: String,
      default: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  },
  setup(props) {
    const router = useRouter()
    // toRefs是为了把数据全部变为响应式（可以解构）
    const { title, collapse, logo } = toRefs(props)
    return {}
  }
})
</script>
