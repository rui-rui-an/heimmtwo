<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body,
#app {
  height: 100%;
}
.el-dialog__header {
  background: linear-gradient(270deg, #01c6fa, #1493fa);
  text-align: center;
  .el-dialog__title {
    color: #fff;
  }
  .el-dialog__close{
    color: #fff !important;
  }
}
</style>
