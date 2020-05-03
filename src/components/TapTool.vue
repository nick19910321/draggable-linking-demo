<template>
  <el-radio-group class="tap-tool" v-model="tapCode" @change="changeTapCode">
    <el-radio class="tap-radio" :label="1">tap页1</el-radio>
    <el-radio class="tap-radio" :label="2">tap页2</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: "tap-tool",
  data() {
    return {};
  },
  props: ["typeCode", "setTypeCode"],
  computed: {
    tapCode: {
      get() {
        return this.typeCode;
      },
      set(val) {
        this.changeTapCode(val);
      }
    }
  },
  methods: {
    changeTapCode(val) {
      this.setTypeCode(val);
    }
  }
};
</script>
>
