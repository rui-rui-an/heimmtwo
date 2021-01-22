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
      <el-form-item label="学科编号" prop="rid">
        <el-input v-model="ruleForm.rid"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="ruleForm.short_name"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro">
        <el-input v-model="ruleForm.intro"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark">
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
  name: 'enterAddOrEdit',
  data () {
    return {
      dialogVisible: false,
      mode: '',
      ruleForm: {
        rid: '',
        name: '',
        short_name: '',
        intro: '',
        remark: ''
      },
      rules: {
        eid: [{ required: true, message: '请输入学科编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入学科名称', trigger: 'blur' }]
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
          url = '/subject/add'
          // console.log(url)
        } else {
          url = '/subject/edit'
          // console.log(url)
        }
        // console.log(111)
        // delete this.ruleForm.created_time
        // delete this.ruleForm.update_time
        // delete this.ruleForm.username
        // delete this.ruleForm.user_id
        // delete this.ruleForm.status
        // delete this.ruleForm.is_del
        const res = await this.$axios.post(url, this.ruleForm)
        // console.log(res)
        console.log(222)
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
