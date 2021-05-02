<template>
  <el-row type="flex" class="row-bg" justify="center">
    <!--    原本是span="6"， xl表示 分辨率小于1200 使用xl  ， lg 表示大于1920分辨率-->
    <el-col :xl="6" :lg="7">
      <h1>欢迎来到Fq后台管理系统</h1>
      <el-image v-bind:src="require('@/assets/wolfcode.png')"></el-image>
      <p>本次实习合作方是叩丁狼教育科技有限，叩丁狼是一家专注于IT职业教育的高科技公司</p>

    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <!--    原本是span="6"， xl表示 分辨率小于1200 使用xl  ， lg 表示大于1920分辨率-->
    <el-col :xl="6" :lg="7">
      <!--使用表单对象，使用V-bind绑定loginForm事件
          V-bind绑定rules事件，rules是遵循element中的规则
          ref值，给Form表单一个注册实例，当后面提取表单获取属性
      -->
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
        <el-form-item label="用户名" prop="username" style="width: 380px">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 380px">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" style="width: 380px">
          <el-input v-model="loginForm.code" style="width: 172px ; float: left"></el-input>
          <!--          base64位的图片-->
          <el-image :src="captchaImg" class="captchaImg"></el-image>
        </el-form-item>

        <el-form-item>
          <!--          @click事件绑定submitForm 在表单中把loginForm也提交上去，让其校验-->
          <el-button type="primary" @click="submitForm('loginForm')">立即创建</el-button>
          <!--          @click事件绑定resetForm，重置表单-->
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        //后端给我们传送过来的
        token: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {min: 5, max: 5, message: '长度为五个字符', trigger: 'blur'}
        ],
      },
      captchaImg: null
    };
  },
  methods: {
    submitForm(formName) {
      //上述的ref与这里绑定，来验证是否符合标准验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login', this.loginForm).then(res => {
              //从header中获取jwt信息保存在store中
              const jwt = res.headers['authorization']

              this.$store.commit('SET_TOKEN' , jwt)

              this.$router.push("/index")
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      //重置信息,resetFields是element中封装的一个方法 让提交的Form中变为最初始的样子
      this.$refs[formName].resetFields();
    },
    getCaptcha() {
      //返回两个参数 一个编码 ，一个 token
      this.$axios.get('/captcha').then(res => {
        // res.data表示获取的结果，结果里面有一个data属性，主要是提出token属性
        console.log("/captcha")
        console.log(res)
        this.loginForm.token = res.data.data.token
        this.captchaImg = res.data.data.captchaImg
      })
    }
    //Result -> code表示结果是否正确200？404 ， msg告诉前端的信息，data结果集
    },
  created(){
    this.getCaptcha()
  }
}
</script>

<style scoped>

/*  布局的代码块都存放在el-row中*/
.el-row {
  background-color: #fafafa;
  /*使用%没有变化，使用100vh可以铺满整个页面*/
  height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;

}

.el-divider {
  height: 500px;
}

.captchaImg {
  float: left;
  margin-left: 8px;
  border-radius: 4px;
}

</style>