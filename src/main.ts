import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {
  ElButton,
  ElCard,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElScrollbar,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElMenuItemGroup,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu
} from 'element-plus'
import '@/router/permission'
import 'element-plus/packages/theme-chalk/src/base.scss'
import 'normalize.css'
import '@/styles/index.scss'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElButton)
app.use(ElCard)
app.use(ElForm)
app.use(ElFormItem)
app.use(ElIcon)
app.use(ElInput)
app.use(ElScrollbar)
app.use(ElMenu)
app.use(ElMenuItem)
app.use(ElSubmenu)
app.use(ElMenuItemGroup)
app.use(ElBreadcrumb)
app.use(ElBreadcrumbItem)
app.use(ElDropdown)
app.use(ElDropdownItem)
app.use(ElDropdownMenu)
app.mount('#app')
