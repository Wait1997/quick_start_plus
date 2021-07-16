import { defineComponent, toRefs } from 'vue'
import './index.scss'

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
    // props是响应式的 不能直接解构
    const { title, icon } = toRefs(props)
    return () => (
      <>
        {icon.value && <span class={[icon.value, 'sub-el-icon']}></span>}
        {title.value && <span class='title'>{title.value}</span>}
      </>
    )
  }
})
