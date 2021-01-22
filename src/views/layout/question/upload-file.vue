<template>
  <div class="upload-file">
    <el-upload
      class="avatar-uploader"
      :action="actionUrl"
      :show-file-list="false"
      :data="extraData"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <video
        v-else-if="videoUrl"
        controls
        :src="videoUrl"
        class="avatar22"
      ></video>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    datafile: Object
  },
  data () {
    return {
      imageUrl: '',
      videoUrl: '',
      actionUrl: process.env.VUE_APP_BASEURL + '/question/upload',
      extraData: {
        file: null
      }
    }
  },
  watch: {
    datafile () {
      //   console.log('aaaaaa')
      if (this.type === 'image') {
        // console.log(1111)
        if (!this.datafile.image) {
          this.imageUrl = ''
        } else {
          //   console.log(222)
          this.imageUrl =
            process.env.VUE_APP_BASEURL + '/' + this.datafile.image
        }
      } else if (this.type === 'video') {
        if (!this.datafile.video) {
          this.videoUrl = ''
        } else {
          this.videoUrl =
            process.env.VUE_APP_BASEURL + '/' + this.datafile.video
        }
      }
    },
    'datafile.video' () {
      //   console.log('AAAAAA')
      if (!this.datafile.video) {
        this.videoUrl = ''
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      //   console.log(res)
      if (this.type === 'image') {
        if (res.code === 200) {
          this.imageUrl = URL.createObjectURL(file.raw)
          this.datafile.image = res.data.url
        }
      } else if (this.type === 'video') {
        if (res.code === 200) {
          this.videoUrl = URL.createObjectURL(file.raw)
          this.datafile.video = res.data.url
        }
      }
    },
    beforeAvatarUpload (file) {
      if (this.type === 'image') {
        const isImage =
          file.type === 'image/jpeg' ||
          file.type === 'image/png' ||
          file.type === 'image/gif'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isImage) {
          this.$message.error('上传头像图片只能是 jpeg/png/gif 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        this.extraData.file = file
        return isImage && isLt2M
      } else if (this.type === 'video') {
        const isVideo = file.type === 'video/avi' || file.type === 'video/mp4'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isVideo) {
          this.$message.error('上传视频格式只能是 avi/mp4 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传视频大小不能超过 2MB!')
        }
        this.extraData.file = file
        return isVideo && isLt2M
      }
    }
  }
}
</script>

<style>
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
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar22 {
  height: 178px;
}
</style>
