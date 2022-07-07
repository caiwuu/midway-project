<!--
 * @Author: caiwu
 * @Description: 
 * @CreateDate: 
 * @LastEditor: 
 * @LastEditTime: 2022-07-07 14:51:26
-->
<template>
  <a-form :label-col="labelCol" :model="formDataRef" :wrapper-col="wrapperCol" :rules="rulesRef" class="login-box">
    <h3 class="login-title">欢迎登录</h3>
    <a-form-item label="账号" name="username" v-bind="validateInfos.username">
      <a-input v-model:value="formDataRef.username" style="width: 200px" allowClear> </a-input>
    </a-form-item>
    <a-form-item label="密码" name="password" v-bind="validateInfos.password">
      <a-input-password v-model:value="formDataRef.password" style="width: 200px" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 16, offset: 5 }">
      <a-button type="primary" @click.prevent="onSubmit">登录</a-button>
      <a-button type="default" style="margin-left: 10px">忘记密码</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import request from '@/utils/request'
import { reactive } from 'vue'
import { Form } from 'ant-design-vue'
import md5 from 'js-md5'
import { useRouter } from 'vue-router'
const router = useRouter()

const useForm = Form.useForm
const rulesRef = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const labelCol = { span: 4 }
const wrapperCol = { span: 14 }
const formDataRef = reactive({
  username: '',
  password: '',
})
const { validate, validateInfos } = useForm(formDataRef, rulesRef)
const onSubmit = () => {
  validate()
    .then((res) => {
      request
        .post('/login', {
          username: res.username,
          password: res.password ? md5(res.password) : '',
        })
        .then((res: any) => {
          if (res.code === 200) {
            window.sessionStorage.setItem('token', 'Bearer' + ' ' + res.data.token)
            window.sessionStorage.setItem('username', res.data.username)
            router.push({
              path: '/',
            })
          } else {
            alert(res.message)
          }
        })
    })
    .catch((err) => {
      console.log('error', err)
    })
}
</script>
<style scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
