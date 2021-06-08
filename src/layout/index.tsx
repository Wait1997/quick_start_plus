import { defineComponent } from 'vue'

export default defineComponent({
  name: 'layout',
  setup() {
    return () => (
      <>
        <div>layout</div>
        <router-view />
      </>
    )
  }
})
