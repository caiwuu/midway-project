 <template>
  <a-form :label-col="labelCol" :model="formDataRef" :wrapper-col="wrapperCol" :rules="rulesRef" class="login-box">
    <h3 class="login-title">欢迎登录</h3>
    <a-form-item label="账号" name="username">
      <a-input v-model:value="formDataRef.username" style="width:200px;" allowClear>
      </a-input>
    </a-form-item>
    <a-form-item label="密码" name="password">
      <a-input-password v-model:value="formDataRef.password" style="width:200px;" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 16, offset: 5 }">
      <a-button type="primary">登录</a-button>
      <a-button type="default" style="margin-left:10px">忘记密码</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import request from '@/utils/request';
import { reactive } from 'vue';
import { Form } from 'ant-design-vue';

const useForm = Form.useForm;
request.get('/login').then(res => {
  console.log(res);
});
const rulesRef = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const labelCol = { span: 4 }
const wrapperCol = { span: 14 }
const formDataRef = reactive({
  username: '',
  password: '',
});
const { validateInfos } = useForm(formDataRef, rulesRef)
console.log(validateInfos.username);

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


