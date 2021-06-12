<template>
  <div class="login-container">
    <el-form label-position="left" ref="elForm" :model="formLogin" :rules="rules">
      <div class="title-container">
        <h3 class="title">登录表单</h3>
      </div>
      <el-form-item prop="username">
        <span class="el-icon-user"></span>
        <el-input v-model="formLogin.username" type="text"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="el-icon-star-off"></span>
        <el-input v-model="formLogin.password" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" :loading="loading" @click="handleLogin">登录</el-button>
      <div class="tips">
        <span style="margin-right: 20px">username: admin</span>
        <span> password: any</span>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

interface LoginForm {
  username: string
  password: string
}

interface Rules {
  required?: boolean
  type?: string
  message: string
  trigger: 'blur' | 'change'
  min?: number
  max?: number
  validator?: (rule: any, value: string, callback: () => void) => void
}

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const redirect = ref<string | undefined>(undefined)
    const elForm = ref(null)
    const loading = ref<boolean>(false)
    const formLogin = reactive<LoginForm>({ username: '', password: '' })
    const rules = reactive<{
      username: Rules[]
      password: Rules[]
    }>({
      username: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      ]
    })

    const handleLogin = () => {
      const dom = elForm.value as any
      dom.validate((valid: boolean): void => {
        if (valid) {
          loading.value = true
          store
            .dispatch('user/login', formLogin)
            .then((token: string) => {
              console.log(token)
              loading.value = false
              router.push({ path: redirect.value || '/' })
            })
            .catch(error => {
              loading.value = false
              console.log(error)
            })
        }
      })
    }

    watch(
      () => route,
      to => {
        redirect.value = to.query && (to.query.redirect as string | undefined)
      },
      { deep: true }
    )

    return {
      elForm,
      loading,
      formLogin,
      rules,
      handleLogin
    }
  }
})
</script>
