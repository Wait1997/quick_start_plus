import { defineComponent, onMounted, reactive, ref } from 'vue'
import './index.scss'

interface LoginForm {
  username: string
  password: string
}

export default defineComponent({
  setup() {
    const elForm = ref(null)
    const loading = ref<boolean>(false)
    const formLogin = reactive<LoginForm>({ username: '', password: '' })

    // 登录请求
    const handleLogin = (): void => {
      console.log('hahah')
    }

    onMounted(() => {
      console.log(elForm.value)
    })

    return () => (
      <div class='login-container'>
        <el-form label-position='right' model={formLogin} ref={() => elForm}>
          <div class='title-container'>
            <h3 class='title'>登录表单</h3>
          </div>
          <el-form-item label='用户名'>
            <el-input model-value={formLogin.username}></el-input>
          </el-form-item>
          <el-form-item label='密码'>
            <el-input model-value={formLogin.password}></el-input>
          </el-form-item>
          <el-button type='primary' loading={loading.value} onClick={handleLogin}>
            登录
          </el-button>
          <div class='tips'>
            <span style='margin-right:20px;'>username: admin</span>
            <span> password: any</span>
          </div>
        </el-form>
      </div>
    )
  }
})
