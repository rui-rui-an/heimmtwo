<template>
  <div>
    <el-card shadow="always">
      <el-form
        :model="form"
        ref="form"
        label-width="80px"
        :inline="true"
        size="normal"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科" prop="subject">
              <el-select v-model="form.subject" placeholder="请选择学科">
                <el-option
                  v-for="item in subjectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="阶段" prop="step">
              <el-select v-model="form.step" placeholder="请选择阶段">
                <el-option
                  v-for="item in stepList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业" prop="enterprise">
              <el-select v-model="form.enterprise" placeholder="请选择企业">
                <el-option
                  v-for="item in enterpriseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="题型" prop="type">
              <el-select v-model="form.type" placeholder="请选择题型">
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="难度" prop="difficulty">
              <el-select v-model="form.difficulty" placeholder="请选择难度">
                <el-option
                  v-for="item in difficultyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="作者" prop="difficulty">
              <el-input v-model="form.difficulty"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日期" prop="create_date">
              <el-date-picker
                v-model="form.create_date"
                type="date"
                placeholder="请选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title" style="width:500px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="clearAll">清除</el-button>
              <el-button type="primary" @click="add">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="always" style="margin-top:20px">
      <el-table :data="questionList" style="width: 100%">
        <el-table-column type="index" label="日期" width="80">
        </el-table-column>
        <el-table-column label="题目">
          <template #default="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column prop="step" label="学科.阶段" :formatter="formatData">
        </el-table-column>
        <el-table-column label="题型" prop="type">
          <template #default="scope">
            <span v-if="scope.row.type === 1">单选</span>
            <span v-else-if="scope.row.type === 2">多选</span>
            <span v-else>简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <span :style="{ color: scope.row.status === 0 ? 'red' : '#666' }">{{
              scope.row.status === 0 ? '禁用' : '启用'
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"> </el-table-column>
        <el-table-column label="操作" width="280">
          <template #default="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button
              @click="changStatus(scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
              >{{ scope.row.status === 0 ? '启用' : '禁用' }}</el-button
            >
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <add-or-edit
      :typeList="typeList"
      :subjectList="subjectList"
      :enterpriseList="enterpriseList"
      :difficultyList="difficultyList"
      :stepList="stepList"
      ref="AddOrEdit"
    ></add-or-edit>
  </div>
</template>

<script>
import AddOrEdit from './addOrEdit'
export default {
  name: 'question',
  components: {
    AddOrEdit
  },
  data () {
    return {
      subjectoptions: [],
      form: {
        title: '', // 标题名称
        subject: '', // 学科id
        enterprise: '', // 企业id
        type: '', // 题目类型:1(单选),2(多选),3(简答)
        step: '', // 题目阶段:1(初级),2(中级),3(高级)
        username: '', // 作者
        status: '', // 状态:0(禁用),1(启用)
        difficulty: '', // 题目难度: 1(简单),2(一般),3(困难)
        create_date: '' // 创建日期
      },
      page: 1, // 页码 默认为1
      limit: 3, // 页尺寸 默认为10,
      total: '',
      questionList: [], // 这是题目列表
      subjectList: [], // 学科列表
      enterpriseList: [], // 企业列表
      typeList: [
        {
          value: 1,
          label: '单选'
        },
        {
          value: 2,
          label: '多选'
        },
        {
          value: 3,
          label: '简答'
        }
      ],
      stepList: [
        {
          value: 1,
          label: '初级'
        },
        {
          value: 2,
          label: '中级'
        },
        {
          value: 3,
          label: '高级'
        }
      ],
      difficultyList: [
        {
          value: 1,
          label: '简单'
        },
        {
          value: 2,
          label: '一般'
        },
        {
          value: 3,
          label: '困难'
        }
      ],
      statusList: [
        {
          value: 0,
          label: '禁用'
        },
        {
          value: 1,
          label: '启用'
        }
      ]
    }
  },
  methods: {
    async getSubjectList () {
      const res = await this.$axios.get('/subject/list')
      // console.log(res)
      if (res.code === 200) {
        this.subjectList = res.data.items
        // console.log(this.subjectList)
      }
    },
    // 编辑题目
    edit (row) {
      // console.log(row)
      this.$refs.AddOrEdit.dialogVisible = true
      this.$refs.AddOrEdit.mode = 'edit'
      // 点击编辑的时候首先要拿到自己本行的数据，然后展示给用户。
      // 为什么要加nextick，主要是让新增和修改的弹框出来之后再去修改模型值，然后出发里面的watch
      this.$refs.AddOrEdit.$nextTick(() => {
        // console.log(row.city)
        this.$refs.AddOrEdit.$refs.myQuillEditor.quill.enable(false)
        this.$refs.AddOrEdit.$refs.myQuillEditor2.quill.enable(false)
        setTimeout(() => {
          this.$refs.AddOrEdit.$refs.myQuillEditor.quill.enable(true)
          this.$refs.AddOrEdit.$refs.myQuillEditor2.quill.enable(true)
        }, 2000)
        if (!Array.isArray(row.city)) {
          row.city = row.city.split(',')
          row.multiple_select_answer = row.multiple_select_answer.split(',')
        }
        this.$refs.AddOrEdit.ruleForm = JSON.parse(JSON.stringify(row))
      })
    },
    // 新增题目
    add () {
      this.$refs.AddOrEdit.dialogVisible = true
      this.$refs.AddOrEdit.mode = 'add'
    },
    async getEnterpriseList () {
      const res = await this.$axios.get('/enterprise/list')
      if (res.code === 200) {
        this.enterpriseList = res.data.items
        // console.log(this.enterpriseList)
      }
    },
    async getQuestionList () {
      const res = await this.$axios.get('/question/list', {
        params: {
          ...this.form,
          page: this.page,
          limit: this.limit
        }
      })
      // console.log(res)
      if (res.code === 200) {
        this.questionList = res.data.items
        // console.log(this.questionList)
        this.total = res.data.pagination.total
      }
    },
    formatData (row, column, cellValue, index) {
      // console.log(cellValue)
      // console.log(row)
      let stepName = ''
      switch (cellValue) {
        case 1:
          stepName = '初级'
          break
        case 2:
          stepName = '中级'
          break
        case 3:
          stepName = '高级'
          break

        default:
          stepName = 'xxx'
          break
      }
      // console.log(stepName)
      return row.subject_name + '.' + stepName
    },
    async changStatus (id) {
      // console.log(aaa)
      const res = await this.$axios.post('/question/status', { id })
      // console.log(res)
      if (res.code === 200) {
        this.$message.success('更改状态成功')
        this.getQuestionList()
      }
    },
    async del (id) {
      this.$confirm('您确认要删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$axios.post('/question/remove', { id })
          // console.log(res)
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.search()
          }
        })
        .catch(() => {
          this.$message.error('删除失败')
        })
    },
    search () {
      this.page = 1
      this.getQuestionList()
    },
    clearAll () {
      this.$refs.form.resetFields()
      this.search()
    },
    handleSizeChange (val) {
      this.limit = val
      this.search()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getQuestionList()
    }
  },
  created () {
    this.getSubjectList()
    this.getEnterpriseList()
    this.getQuestionList()
  }
}
</script>

<style></style>
