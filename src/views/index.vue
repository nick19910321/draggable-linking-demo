<template>
  <router-view />
</template>

<script>
import LoginService from "@/service/LoginService";
const loginService = new LoginService();
export default {
  name: "index",
  data() {
    return {};
  },
  computed: {},
  components: {},
  mounted() {
    document.title = this.$i18n.t("global.title");
    this.init();
  },
  methods: {
    init() {
      // this.loginAuth();
      // 赋值初始化数据
      const currentProcess = {
        name: "工作流A",
        type: 2,
        step: 1,
        stepsData: {
          install: {
            data1: {},
            data2: {}
          },
          cmd: {
            data1: {},
            data2: {}
          }
        }
      };
      this.$store.dispatch("process/setCurrentProcess", currentProcess);
    },
    loginAuth() {
      loginService.loginAuth().then(data => {});
    }
  }
};
</script>
