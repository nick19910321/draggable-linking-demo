<template>
  <el-alert
    :title="msg"
    :closable=false
    type="warning"
    show-icon>
  </el-alert>
</template>
<script>
export default{
  data () {
    return {
      msg: '404！页面不存在！'
    }
  }
}
</script>

<style>
  .tip-404{
    font-size: 20px;
    color: red
  }
</style>
