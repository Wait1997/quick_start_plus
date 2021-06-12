import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { title, icon } = toRefs(props)
    return () => (
      <>
        {icon.value && <span class={icon.value}></span>}
        {title.value && <span class={title.value}></span>}
      </>
    )
  }
})
