<template>
  <el-card class="tabs-wrap">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="信息" name="tab-info">
        <slot name="tab-info">信息</slot></el-tab-pane
      >
      <el-tab-pane label="操作" name="tab-action"
        ><slot name="tab-action">操作</slot></el-tab-pane
      >
      <el-tab-pane label="描述" name="tab-description"
        ><slot name="tab-description">描述</slot></el-tab-pane
      >
    </el-tabs>
  </el-card>
</template>
<script>
export default {
  name: "cmd-tabs-panel",
  data() {
    return {
      activeName: "tab-info"
    };
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
    }
  }
};
</script>
