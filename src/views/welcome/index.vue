<template>
  <div>
    <!-- 下面是第一种方式，直接从仓库中取值，没有缓存 -->
    <!-- <el-card
      >欢迎登录,'{{ $store.state.userInfo.username }}',您当前的身份为'{{
        $store.state.userInfo.role
      }}'</el-card
    > -->
    <!-- 下面是第二种方式取值，使用getter方式取值，有缓存 -->
    <el-card
      >欢迎登录,'{{ $store.getters.getUserInfo.username }}',您当前的身份为'{{
        $store.getters.getUserInfo.role
      }}'</el-card
    >
  </div>
</template>

<script>
export default {}
</script>

<style></style>
