<template>
  <el-breadcrumb separator="/">
    <transition-group>
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="index === levelList.length - 1">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface LocationMeta {
  title?: string
  icon?: string
  [index: string]: any
}
interface LocationMatched {
  path: any
  name?: any
  redirect?: any
  meta: LocationMeta
}

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const levelList = ref<LocationMatched[]>([])
    const handleLink = (item: LocationMatched): void => {
      const { redirect, path } = item
      console.log(redirect)
      if (redirect) {
        router.push(redirect)
      }
      router.push(path)
    }
    const isDashboard = (route: LocationMatched): boolean => {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }
    watch(
      () => route,
      to => {
        const matched = to.matched.filter(item => item.meta && item.meta.title)
        const needMatchedList = matched.map<LocationMatched>(item => {
          return {
            path: item.path,
            name: item.name,
            redirect: item.redirect,
            meta: item.meta
          }
        })
        const first = needMatchedList[0]
        if (!isDashboard(first)) {
          const dashboard: LocationMatched = {
            path: '/dashboard',
            meta: { title: '首页', icon: 'el-icon-s-data' }
          }
          needMatchedList.unshift(dashboard)
        }
        levelList.value = needMatchedList
        console.log(levelList.value)
      },
      { immediate: true, deep: true }
    )
    return {
      levelList,
      handleLink
    }
  }
})
</script>
