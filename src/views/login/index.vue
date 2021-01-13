<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="@/assets/img/login_icon.png" alt="" /><span class="title"
          >黑马面面</span
        ><span class="line"></span><span class="sub-title">用户登录</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input
            prefix-icon="el-icon-search"
            v-model="ruleForm.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-search"
            v-model="ruleForm.password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-row class="regitem">
          <el-col :span="17"
            ><div class="grid-content bg-purple">
              <el-form-item prop="code">
                <el-input
                  prefix-icon="el-icon-search"
                  v-model="ruleForm.code"
                  placeholder="请输入验证码"
                ></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="6"
            ><div class="grid-content bg-purple-light">
              <img
                class="regimg"
                :src="imgUrl"
                @click="changeRegImg"
                alt=""
              /></div
          ></el-col>
        </el-row>
        <!-- 用户协议 -->
        <el-form-item prop="checked">
          <el-checkbox v-model="ruleForm.checked"></el-checkbox
          >&nbsp;我已阅读并同意
          <el-link type="primary" href="http://www.baidu.com" targrt="__blank"
            >&nbsp;用户协议</el-link
          >和<el-link href="http://www.jd.com" type="primary" targrt="__blank"
            >&nbsp;隐私条款</el-link
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width:100%"
            @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register" style="width:100%"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_bg.png" alt="" />
    </div>
    <register ref="register"></register>
  </div>
</template>

<script>
import { saveToken } from '@/utils/tokens.js'
import register from './register'
export default {
  name: 'Login',
  components: {
    register
  },
  data () {
    return {
      imgUrl: `${process.env.VUE_APP_BASEURL}/captcha?type=login`,
      ruleForm: {
        phone: '18511111111',
        password: '12345678',
        code: '',
        checked: true
      },
      rules: {
        phone: [
          {
            validator: (rule, value, callback) => {
              const regphone = /^1[3-9][0-9]{9}$/
              if (!regphone.test(value)) {
                return callback(new Error('请输入正确的手机号码'))
              }
              callback()
            },
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 14, message: '长度在 6 到 14 个字符', trigger: 'blur' }
        ],
        code: [
          {
            validator: (rule, value, callback) => {
              const regCode = /^[0-9]{4}$/
              if (!regCode.test(value)) {
                return callback(new Error('请输入正确的验证码'))
              }
              callback()
            },
            trigger: 'blur'
          }
        ],
        checked: [
          {
            validator: (rule, value, callback) => {
              // console.log(value)
              if (!value) return callback(new Error('需要同意用户协议'))
              callback()
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    register () {
      this.$refs.register.dialogVisible = true
    },
    changeRegImg () {
      this.imgUrl =
        `${process.env.VUE_APP_BASEURL}/captcha?type=login&aaa=` +
        (new Date() - 0)
    },
    submitForm () {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return this.$message('请输入完整')
        const res = await this.$axios.post('/login', {
          phone: this.ruleForm.phone,
          password: this.ruleForm.password,
          code: this.ruleForm.code
        })
        if (res.code !== 200) return this.$message.error(res.message)
        if (res.code === 200) this.$message.success('登陆成功')
        // localStorage.setItem('mm64Token', res.data.token)
        saveToken(res.data.token)
        this.$router.push('/layout')
      })
    }
  }
}
</script>

<style lang="less">
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;
    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #c7c7c7;
        height: 27px;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .demo-ruleForm {
      margin-top: 49px;
      .regitem {
        margin-bottom: 22px;
        .regimg {
          width: 100%;
          height: 40px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
