<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const external = computed<boolean>(() => isExternal(props.to))
    const type = computed<string>(() => {
      if (external.value) {
        return 'a'
      }
      return 'router-link'
    })
    const linkProps = (to: string) => {
      if (external.value) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }
    return {
      type,
      linkProps
    }
  }
})
</script>
