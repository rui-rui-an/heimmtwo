<template>
  <div>
    <el-card shadow="always">
      <el-form
        ref="form"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="formInline.role_id" placeholder="请选择">
            <el-option label="请选择" value="0"></el-option>
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearSearch">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always" style="margin-top:20px">
      <el-table :data="userlist" style="width: 100%">
        <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="role" label="角色"> </el-table-column>
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
            <el-button>
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
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      formInline: {
        username: '',
        email: '',
        role_id: ''
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
    add () {},
    // 一进入页面获取列表信息
    async getUserInfo () {
      const res = await this.$axios.get('/user/list', {
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
      const res = await this.$axios.post('/user/status', { id })
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
          const res = await this.$axios.post('/user/remove', { id })
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
