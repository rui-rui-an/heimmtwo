<template>
  <div class="addDialog">
    <el-dialog
      :title="mode === 'add' ? '新增试题' : '编辑题目'"
      :visible.sync="dialogVisible"
      fullscreen
      center
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="学科" prop="subject">
          <el-select
            :style="{ width: '300px' }"
            v-model="ruleForm.subject"
            placeholder="请选择学科"
          >
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select
            :style="{ width: '300px' }"
            v-model="ruleForm.step"
            placeholder="请选择学科"
          >
            <el-option
              v-for="item in stepList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select
            :style="{ width: '300px' }"
            v-model="ruleForm.enterprise"
            placeholder="请选择企业"
          >
            <el-option
              v-for="item in enterpriseList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-cascader
            v-model="ruleForm.city"
            :options="options"
            :props="{ value: 'label' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio
              v-for="item in typeList"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-radio-group v-model="ruleForm.difficulty">
            <el-radio
              v-for="item in difficultyList"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <hr class="hrMargin" />
        <el-form-item class="QuillEditorBox" label="试题标题" prop="title">
          <br />
          <quill-editor
            v-model="ruleForm.title"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur('title')"
          >
          </quill-editor>
        </el-form-item>
        <!-- 让标签的名称（label）跟着点击单选多选来变化 -->
        <el-form-item
          :label="questionList[ruleForm.type]"
          :prop="questionValue[ruleForm.type]"
        >
          <question-type :ruleForm="ruleForm"></question-type>
        </el-form-item>

        <hr class="hrMargin" />

        <el-form-item class="videoAnalyse" label="解析视频" prop="video">
          <upload-file type="video" :datafile="ruleForm"></upload-file>
        </el-form-item>

        <el-form-item
          class="QuillEditorBox"
          label="答案解析"
          prop="answer_analyze"
        >
          <br />
          <quill-editor
            v-model="ruleForm.answer_analyze"
            ref="myQuillEditor2"
            :options="editorOption"
            @blur="onEditorBlur('answer_analyze')"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item label="试题备注" prop="remark">
          <el-input v-model="ruleForm.remark"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import UploadFile from './upload-file.vue'
import QuestionType from './question-type'
// import { delete } from 'vue/types/umd'
// console.log(regionData)
export default {
  components: {
    quillEditor,
    UploadFile,
    QuestionType
  },
  props: {
    typeList: Array,
    subjectList: Array,
    enterpriseList: Array,
    difficultyList: Array,
    stepList: Array
  },
  watch: {
    'ruleForm.type' () {
      this.$refs.ruleForm.clearValidate([
        'single_select_answer',
        'multiple_select_answer',
        'short_answer'
      ])
    },
    // 新增/关闭窗口清空表单内容
    dialogVisible (newvalue) {
      //   this.$refs.ruleForm.resetFields()
      //   重置表单只能重置prop的内容，无法清除这一块的内容，手动还原，使得image改变，让upload-file中的监听能监听到
      if (!newvalue) {
        this.ruleForm.select_options = [
          // 选项，介绍，图片介绍
          {
            label: 'A',
            text: '',
            image: ''
          },
          {
            label: 'B',
            text: '',
            image: ''
          },
          {
            label: 'C',
            text: '',
            image: ''
          },
          {
            label: 'D',
            text: '',
            image: ''
          }
        ]
        this.$refs.ruleForm.resetFields()
      }
    }
  },
  data () {
    return {
      dialogVisible: false,
      mode: '', // 控制是新增还是编辑
      options: regionData,
      editorOption: {
        placeholder: '请输入标题'
      },
      questionList: {
        1: '单选',
        2: '多选',
        3: '简答'
      },
      questionValue: {
        1: 'single_select_answer',
        2: 'multiple_select_answer',
        3: 'short_answer'
      },

      ruleForm: {
        title: '', // 标题
        subject: '', // 学科id标识
        step: '', // 阶段1、初级 2、中级 3、高级
        enterprise: '', // 企业id标识
        city: '', // [省、市、区县]
        type: 1, // 题型 1单选 、2多选 、3简答
        difficulty: 1, // 题目难度 1简单 、2一般 、3困难
        single_select_answer: '', // 单选题答案
        multiple_select_answer: [], // 多选题答案
        short_answer: '', // 简答题答案
        video: '', // 解析视频地址
        answer_analyze: '', // 答案解析
        remark: '', // 答案备注
        select_options: [
          // 选项，介绍，图片介绍
          {
            label: 'A',
            text: '',
            image: ''
          },
          {
            label: 'B',
            text: '',
            image: ''
          },
          {
            label: 'C',
            text: '',
            image: ''
          },
          {
            label: 'D',
            text: '',
            image: ''
          }
        ]
      },
      rules: {
        subject: [
          { required: true, message: '学科不能为空', trigger: 'change' }
        ],
        step: [{ required: true, message: '阶段不能为空', trigger: 'change' }],
        enterprise: [
          { required: true, message: '企业不能为空', trigger: 'change' }
        ],
        type: [{ required: true, message: '题型不能为空', trigger: 'change' }],
        city: [{ required: true, message: '城市不能为空', trigger: 'change' }],
        difficulty: [
          { required: true, message: '难度不能为空', trigger: 'change' }
        ],
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        answer_analyze: [
          { required: true, message: '答案解析不能为空', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '试题备注不能为空', trigger: 'blur' }
        ],
        single_select_answer: [
          { required: true, message: '单选答案不能为空', trigger: 'blur' }
        ],
        multiple_select_answer: [
          { required: true, message: '多选答案不能为空', trigger: 'blur' }
        ],
        short_answer: [
          { required: true, message: '简答答案不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onEditorBlur (val) {
      // 这里需要有变量，否则会一起校验，就没有分开
      this.$refs.ruleForm.validateField(val)
    },
    submitForm () {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return
        let url = ''
        if (this.mode === 'add') {
          url = '/question/add'
          delete this.ruleForm.id
        } else if (this.mode === 'edit') {
          url = '/question/edit'
        }
        const res = await this.$axios.post(url, this.ruleForm)
        // console.log(res)
        if (res.code === 200) {
          // 成功之后需要做的事
          // 提示用户
          this.$message.success(this.mode === 'add' ? '新增成功' : '修改成功')
          //   关闭窗口，清空统一做
          this.dialogVisible = false
          //   重新加载layout页面显示新增的那一条
          this.$parent.search()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="less">
.addDialog {
  .demo-ruleForm {
    width: 720px;
    margin: 0 auto;
  }
  .hrMargin {
    margin-bottom: 20px;
  }
  .QuillEditorBox {
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
  .videoAnalyse {
    display: flex;
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
  .quill-editor {
    width: 100%;
    .ql-editor {
      height: 200px;
    }
  }
}
</style>
