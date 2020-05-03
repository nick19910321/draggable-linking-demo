<template>
  <div class="app-login-page" v-loading="loading">
    <c-form-panel
      :loginFun="loginSite"
      :captchaFun="getLoginCaptchaUrl"
      v-if="loading == false"
    ></c-form-panel>
  </div>
</template>

<script>
import CFormPanel from "@/components/login/FormPanel.vue";
import LoginService from "@/service/LoginService";
const loginService = new LoginService();
export default {
  data() {
    return {
      loading: false,
      title: "登录页面",
      msg: "请登录"
    };
  },
  computed: {},
  components: {
    CFormPanel
  },
  created() {},

  methods: {
    loginSite(params) {
      const that = this;
      return loginService.loginSite(params).then(data => {
        let redirect = "/";
        if (that.$route.query && that.$route.query.redirect) {
          redirect = that.$route.query.redirect;
        }
        that.$router.push(redirect);
      });
    },
    getLoginCaptchaUrl() {
      const that = this;
      const loginCaptcha = loginService.getLoginCaptchaUrl();
      return loginCaptcha;
    }
  }
};
</script>
