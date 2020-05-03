<template>
  <el-card>
    <label>展示数据：</label>
    <span v-if="showData">{{ showData }}</span>
    <span v-else>暂无数据</span>
  </el-card>
</template>
<script>
export default {
  name: "cmd-show-panel",
  data() {
    return {};
  },
  props: ["cmdData"],
  computed: {
    showData() {
      const cmdData = this.cmdData;
      return cmdData && cmdData.showData ? cmdData.showData : null;
    }
  }
};
</script>
