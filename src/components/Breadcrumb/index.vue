<template>
  <el-breadcrumb class="appBreadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span class="no-redirect" v-if="index === levelList.length - 1">{{ item.meta.title }}</span>
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
  meta?: LocationMeta
}

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const levelList = ref<LocationMatched[]>([])

    const handleLink = (item: LocationMatched): void => {
      const { redirect, path } = item
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

    // 深度监听路由的变化
    watch(
      () => route,
      to => {
        const matched = to.matched.filter(item => item.meta && item.meta.title)
        // 根据路由匹配到的遍历 获取赋值给面包屑需要的数据
        const needMatchedList = matched.map<LocationMatched>(item => {
          return {
            path: item.path,
            name: item.name,
            redirect: item.redirect,
            meta: item.meta
          }
        })
        const first = needMatchedList[0]
        // 保证面包屑都是从首页开始的，因为重定向过来的路由会直接重定向到指定页面
        if (!isDashboard(first)) {
          const dashboard: LocationMatched = {
            path: '/dashboard',
            name: 'Dashboard',
            redirect: undefined,
            meta: { title: '首页', icon: 'el-icon-s-data', affix: true }
          }
          needMatchedList.unshift(dashboard)
        }
        levelList.value = needMatchedList
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

<style lang="scss" scoped>
.appBreadcrumb {
  margin-left: 8px;
  font-size: 14px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
