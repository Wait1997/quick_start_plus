<template>
  <!-- 过滤掉不需要展示的菜单项 -->
  <div v-if="!item?.meta?.hidden">
    <!-- 当children下面只有一个child时，会在这里展示 -->
    <template v-if="showOnlyOneChild(item?.children, item) && !onlyOneChild.children">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <item v-if="onlyOneChild?.meta" :icon="onlyOneChild?.meta?.icon" :title="onlyOneChild?.meta?.title" />
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template v-slot:title>
        <item v-if="item.meta" :title="item.meta && item.meta?.title" :icon="item.meta && item.meta?.icon" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :basePath="resolvePath(child.path)"
      ></sidebar-item>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from 'path'
import { defineComponent, ref, toRefs } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/validate'
import item from './item'
import appLink from './link.vue'

export default defineComponent({
  name: 'sidebarItem',
  components: {
    item,
    appLink
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // 路由路径
    const { basePath } = toRefs(props)
    // 当且仅当只有一个child时,不要打开子菜单直接在父级
    const onlyOneChild = ref<RouteRecordRaw | null>(null)

    const resolvePath = (routePath: string): string => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(basePath.value)) {
        return basePath.value
      }
      return path.resolve(basePath.value, routePath)
    }

    /**
     * @description 获取children的个数
     * @param children 父路由的children
     */
    const showingChildNumber = (children: RouteRecordRaw[]): number => {
      if (children) {
        // 过滤掉不需要展示的项,有些children不需要在菜单中直接展示
        const showingChildren = children?.filter(router => {
          if (router?.meta && router?.meta?.hidden) {
            return false
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    }

    const showOnlyOneChild = (children: RouteRecordRaw[], parent: RouteRecordRaw): boolean => {
      if (showingChildNumber(children) === 0) {
        onlyOneChild.value = { ...parent, path: '' }
        return true
      }
      // 当children下面只有一个child时,处理直接展示,相当于做了扁平化的处理
      if (showingChildNumber(children) === 1) {
        for (const child of children) {
          if (!child?.meta || !child?.meta?.hidden) {
            onlyOneChild.value = child
            return true
          }
        }
      }
      return false
    }
    return {
      onlyOneChild,
      resolvePath,
      showOnlyOneChild
    }
  }
})
</script>
