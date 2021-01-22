<template>
  <div>
    <el-card shadow="always">
      <el-form
        ref="form"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="0"></el-option>
            <el-option label="禁用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearSearch">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always" style="margin-top:20px">
      <el-table :data="userlist" style="width: 100%">
        <el-table-column type="index" label="序号" width="120">
        </el-table-column>
        <el-table-column prop="rid" label="学科编号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="学科名称" width="150">
        </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="create_time" label="创建日期"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span :style="{ color: scope.row.status === 0 ? 'red' : '#666' }">{{
              scope.row.status === 0 ? '禁用' : '启用'
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">
              编辑
            </el-button>
            <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
            >
              {{ scope.row.status === 0 ? '启用' : '禁用' }}
            </el-button>
            <el-button @click="del(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="totalpage != ''"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[1, 2, 3, 6]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpage"
      >
      </el-pagination>
    </el-card>
    <add-or-edit ref="addOrEdit"></add-or-edit>
  </div>
</template>

<script>
import addOrEdit from './addOrEdit'
export default {
  name: 'enterprise',
  components: {
    addOrEdit
  },
  data () {
    return {
      formInline: {
        name: '',
        rid: '',
        username: '',
        status: ''
      },
      page: 1,
      limit: 3,
      userlist: [],
      totalpage: ''
    }
  },
  methods: {
    // 搜索获取用户信息
    search () {
      // 这里的page一定要从第一页开始查。否则查其他页，万一没这么多数据就显示不出来
      this.page = 1
      this.getUserInfo()
    },
    // 清空之后重新获取信息
    clearSearch () {
      this.$refs.form.resetFields()
      this.getUserInfo()
    },
    // 新增用户
    add () {
      this.$refs.addOrEdit.dialogVisible = true
      this.$refs.addOrEdit.mode = 'add'
      this.$refs.addOrEdit.ruleForm = {
        rid: '',
        name: '',
        short_name: '',
        intro: '',
        remark: ''
      }
    },
    // 编辑用户
    edit (row) {
      this.$refs.addOrEdit.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.addOrEdit.ruleForm = JSON.parse(JSON.stringify(row))
      })
      this.$refs.addOrEdit.mode = 'edit'
    },
    // 一进入页面获取列表信息
    async getUserInfo () {
      const res = await this.$axios.get('/subject/list', {
        params: {
          ...this.formInline,
          page: this.page,
          limit: this.limit
        }
      })
      // console.log(res)
      if (res.code === 200) {
        this.userlist = res.data.items
        this.totalpage = res.data.pagination.total
        // console.log(this.totalpage)
      }
    },
    // 点击禁用启用更改状态
    async changeStatus (id) {
      const res = await this.$axios.post('/subject/status', { id })
      // console.log(res)
      if (res.code === 200) {
        this.$message.success('更改用户状态成功')
        this.search()
      } else {
        this.$message.error('更改用户状态失败')
      }
    },
    // 删除按钮删除用户
    del (id) {
      this.$confirm('您确认删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$axios.post('/subject/remove', { id })
          // console.log(res)
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.search()
          } else {
            this.$message.error('删除失败')
          }
        })
        .catch(() => {})
    },
    // 处理页面列表显示多少条的变化
    handleSizeChange (val) {
      // 更新限制的条数
      this.limit = val
      // 重新加载列表数据
      this.getUserInfo()
      // console.log(`每页 ${val} 条`)
    },
    // 处理页面列表页面的变化
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 把这个值赋值给我们的page，拿去后端请求数据
      this.page = val
      // 这里是查询第val页的数据，具体看上面是第几页
      this.getUserInfo()
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style></style>
