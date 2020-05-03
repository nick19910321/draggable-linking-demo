<template>
  <div class="steps">
    <el-steps :active="currentStep" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>

<script>
export default {
  name: "steps",
  data() {
    return {};
  },
  computed: {
    // 工作流数据
    currentProcess: {
      get() {
        return this.$store.getters["process/currentProcess"];
      },
      set(val) {
        this.$store.dispatch("process/setCurrentProcess", val);
      }
    },
    currentStep: {
      get() {
        return this.$store.getters["process/currentStep"];
      },
      set(val) {
        this.$store.dispatch("process/setCurrentStep", val);
      }
    }
  },
  methods: {
    next() {
      console.log(this.currentProcess)
      if (this.currentStep++ > 2) this.currentStep = 0;
    }
  }
};
</script>
