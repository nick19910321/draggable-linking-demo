<template>
  <div class="info-wrap">
    <template v-if="executeResult">
      <p>执行数据：{{ executeResult.showData }}</p>
      <p>执行时间：{{ executeResult.createTime }}</p>
      <p>执行结果：{{ executeResult.message }}</p>
    </template>
    <template v-else>
      暂无执行记录
    </template>
  </div>
</template>
<script>
export default {
  name: "cmd-info-panel",
  data() {
    return {};
  },
  props: ["cmdData"],
  computed: {
    executeResult() {
      const cmdData = this.cmdData;
      return cmdData && cmdData.executeResult ? cmdData.executeResult : null;
    }
  }
};
</script>
