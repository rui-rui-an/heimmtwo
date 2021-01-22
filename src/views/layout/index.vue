<template>
  <el-container class="el-container">
    <el-header class="header">
      <div class="left">
        <i @click="openNav" class="el-icon-s-fold setheight"></i>
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
      <el-aside width="auto" class="aside">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          router
        >
          <!-- <el-menu-item index="/layout/chart">
            <i class="el-icon-eleme"></i>
            <span slot="title">数据预览</span>
          </el-menu-item>
          <el-menu-item index="/layout/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/subject">
            <i class="el-icon-document"></i>
            <span slot="title">学科列表</span>
          </el-menu-item> -->
          <el-menu-item
            v-for="(item, index) in $router.options.routes[3].children"
            :key="index"
            :index="item.meta.path"
            v-show="item.meta.rights.includes(userInfo.role)"
          >
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { removeToken } from '@/utils/tokens.js'
export default {
  data () {
    return {
      userPic: '',
      userInfo: '',
      isCollapse: true
    }
  },
  watch: {
    $route (val) {
      // console.log(a)
      if (!val.meta.rights.includes(this.userInfo.role)) {
        this.$message.error('您无权限访问此页面')
        this.$router.push('/')
      }
    }
  },
  methods: {
    async getuserInfo () {
      const res = await this.$axios.get('/info')
      // console.log(res)
      if (res.code === 200) {
        this.userPic = process.env.VUE_APP_BASEURL + '/' + res.data.avatar
        this.userInfo = res.data
        this.$store.commit('setUserInfo', res.data)
        // console.log(this.userInfo)
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
    },
    openNav () {
      this.isCollapse = !this.isCollapse
    }
  },
  created () {
    this.getuserInfo()
    // console.log(this.$router.options.routes[3].children)
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
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .main {
    height: 100%;
    background-color: #e8e9ec;
  }
}
</style>
