<template>
  <div class="question-type">
    <!-- 单选展示的框 -->
    <div v-show="ruleForm.type === 1">
      <div
        v-for="item in ruleForm.select_options"
        :key="item.label"
        class="question-input"
      >
        <!-- 左边的单选框 -->
        <el-radio v-model="ruleForm.single_select_answer" :label="item.label">{{
          item.label
        }}</el-radio>
        <!-- 中间的input输入框 -->
        <el-input
          v-model="item.text"
          placeholder="请输入内容"
          class="inp"
        ></el-input>
        <!-- 右边的头像上传 -->
        <upload-file type="image" :datafile="item"></upload-file>
      </div>
    </div>
    <!-- 多选展示的框 -->
    <div v-show="ruleForm.type === 2">
      <div
        v-for="item in ruleForm.select_options"
        :key="item.label"
        class="question-input"
      >
        <!-- 左边的单选框 -->
        <el-checkbox
          v-model="ruleForm.multiple_select_answer"
          :label="item.label"
          >{{ item.label }}</el-checkbox
        >
        <!-- 中间的input输入框 -->
        <el-input
          v-model="item.text"
          placeholder="请输入内容"
          class="inp2"
        ></el-input>
        <!-- 右边的头像上传 -->
        <upload-file type="image" :datafile="item"></upload-file>
      </div>
    </div>
    <!-- 简答展示的框 -->
    <div v-show="ruleForm.type === 3">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="ruleForm.short_answer"
      >
      </el-input>
    </div>
  </div>
</template>

<script>
import UploadFile from './upload-file'
export default {
  name: 'questiontype',
  components: {
    UploadFile
  },
  props: {
    ruleForm: Object
  },
  data () {
    return {}
  }
}
</script>

<style lang="less">
.question-type {
  .question-input {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    .inp {
      margin-right: 15px;
    }
    .inp2 {
      margin-right: 15px;
      margin-left: 15px;
    }
  }
}
</style>
