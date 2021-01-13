<template>
  <el-dialog
    center
    title="用户注册"
    :visible.sync="dialogVisible"
    width="600px"
  >
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="80px"
      :inline="false"
      size="normal"
      label-position="left"
    >
      <!-- 这里是用户头像上传 -->
      <el-form-item label="昵称" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="postHttp"
          :data="userPicUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <!-- 图形码 -->
      <el-row>
        <el-col :span="16">
          <el-form-item label="图形码" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="margin-left:10px">
          <img :src="regImg" alt="" @click="changRegImg" />
        </el-col>
      </el-row>
      <!-- 验证码 -->
      <el-row>
        <el-col :span="16">
          <el-form-item label="验证码" prop="rcode">
            <el-input v-model="form.rcode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="margin-left:10px">
          <el-button type="default" @click="getRcode">获取用户验证码</el-button>
        </el-col>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="register">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      regImg: `${process.env.VUE_APP_BASEURL}/captcha?type=sendsms`,
      imageUrl: '',
      postHttp: `${process.env.VUE_APP_BASEURL}/uploads`,
      userPicUpload: {
        image: ''
      },
      form: {
        username: '',
        phone: '',
        email: '',
        avatar: '',
        password: '',
        rcode: '',
        code: ''
      },
      rules: {
        username: [
          { required: true, message: '昵称不能为空', trigger: 'blur' }
        ],
        phone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) return callback(new Error('手机号不能为空'))
              const regPhone = /^1[3-9][0-9]{9}$/
              if (!regPhone.test(value)) {
                return callback(new Error('请输入正确的手机号'))
              }
              // 这个回调很重要，千万别忘了
              callback()
            },
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) return callback(new Error('邮箱不能为空'))
              // eslint-disable-next-line
              const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
              if (!regEmail.test(value)) {
                return callback(new Error('请输入正确的邮箱'))
              }
              // 这个回调很重要，千万别忘了
              callback()
            },
            trigger: 'blur'
          }
        ],
        avatar: [{ required: true, message: '头像不能为空', trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        rcode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    changRegImg () {
      this.regImg =
        `${process.env.VUE_APP_BASEURL}/captcha?type=sendsms&t=` +
        (new Date() - 0)
    },
    async getRcode () {
      let num = 0
      this.$refs.form.validateField(['code', 'phone'], errorMessage => {
        // console.log(errorMessage)
        // 全面校验，校验的是为不为空，不为空那么就发请求给后端，让后端来判断对错
        if (!errorMessage) {
          num++
        }
      })
      // console.log(num)
      if (num === 2) {
        const res = await this.$axios.post('/sendsms', {
          phone: this.form.phone,
          code: this.form.code
        })

        // console.log(res)
        if (res.code === 200) {
          this.$message.success('验证码获取成功')
          this.form.rcode = res.data.captcha
        } else {
          this.$message.error(res.message)
          this.changRegImg()
        }
      }
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      // console.log(res)
      if (res.code === 200) {
        this.form.avatar = res.data.file_path
        // console.log(this.form.avatar)
      }
    },
    beforeAvatarUpload (file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      this.userPicUpload.image = file
      return isJPG && isLt2M
    },
    register () {
      this.$refs.form.validate(async valid => {
        // console.log(valid)
        if (valid) {
          const res = await this.$axios.post('/register', this.form)
          // console.log(res)
          if (res.code === 200) {
            this.$message.success('注册成功')
            this.dialogVisible = false
          }
        } else {
          this.$message.error('请填写完整')
        }
      })
    }
  }
}
</script>

<style lang="less">
.avatar-uploader {
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
