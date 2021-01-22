<template>
  <el-dialog
    :title="mode == 'add' ? '新增用户' : '编辑用户'"
    :visible.sync="dialogVisible"
    width="600px"
    @closed="handleClose"
    :destroy-on-close="false"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id">
        <el-select v-model="ruleForm.role_id" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" prop="remark">
        <el-input v-model="ruleForm.remark"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'userAddOrEdit',
  data () {
    return {
      dialogVisible: false,
      mode: '',
      ruleForm: {
        username: '',
        email: '',
        phone: '',
        role_id: '',
        status: '',
        remark: ''
      },
      options: [
        {
          value: 1,
          label: '超级管理员'
        },
        {
          value: 2,
          label: '管理员'
        },
        {
          value: 3,
          label: '老师'
        },
        {
          value: 4,
          label: '学生'
        }
      ],
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        role_id: [{ required: true, message: '请输入角色', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return
        // console.log(11)
        let url
        if (this.mode === 'add') {
          url = '/user/add'
          //   console.log(url)
        } else {
          url = '/user/edit'
          //   console.log(url)
        }
        // console.log(111)
        const res = await this.$axios.post(url, this.ruleForm)
        // console.log(res)
        // console.log(222)
        if (res.code === 200) {
          this.$message.success(this.mode === 'add' ? '新增成功' : '修改成功')
          this.dialogVisible = false
          this.$parent.getUserInfo()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleClose () {
      this.$refs.ruleForm.resetFields()
      this.$refs.ruleForm.clearValidate()
    }
  }
}
</script>

<style></style>
