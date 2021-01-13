<template>
  <el-container class="el-container">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold setheight"></i>
        <img src="@/assets/img/layout_icon.png" alt="" class="marginlr" />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img :src="userPic" alt="" />
        <span class="name">{{ userInfo.username }} 欢迎您</span>
        <button type="button" class="el-button el-button--primary">
          <el-button type="primary" @click="loginOut">退出</el-button>
        </button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { removeToken } from '@/utils/tokens.js'
export default {
  data () {
    return {
      userPic: '',
      userInfo: ''
    }
  },
  methods: {
    async getuserInfo () {
      const res = await this.$axios.get('/info')
      // console.log(res)
      if (res.code === 200) {
        this.userPic = process.env.VUE_APP_BASEURL + '/' + res.data.avatar
        this.userInfo = res.data
      }
    },
    async loginOut () {
      this.$alert('您确定退出吗', '提示', {
        confirmButtonText: '确定'
      })
        .then(async () => {
          const outres = await this.$axios.get('/logout')
          if (outres.code === 200) {
            this.$message.success('退出成功')
            removeToken()
            this.$router.push('/login')
          }
        })
        .catch(() => {
          this.$message.success('已取消退出')
        })
    }
  },
  created () {
    this.getuserInfo()
  }
}
</script>

<style lang="less">
.el-container {
  height: 100%;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .setheight {
        font-size: 20px;
      }
      .marginlr {
        margin-left: 10px;
        margin-right: 10px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
        border-radius: 50%;
      }
      .name {
        margin-right: 38px;
      }
      .el-button--primary {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
      }
    }
  }
  .aside {
    height: 100%;
  }
  .main {
    height: 100%;
    background-color: #e8e9ec;
  }
}
</style>
