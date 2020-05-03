import Vue from "vue";

// 项目入口
import App from "./App.vue";
// vue-router
import router from "./router";
// vuex
import store from "./store";

Vue.config.productionTip = false;

// 第三方插件
import Plugins from "./plugins";
Vue.use(Plugins);

// 国际化
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import ElementLocale from "element-ui/lib/locale";
import lang from "./assets/lang";
const messages = {
  en: {
    ...lang.en,
    ...enLocale
  },
  zh: {
    ...lang.zh,
    ...zhLocale
  }
};
const locale = localStorage.getItem("lang") || "zh";
const i18n = new VueI18n({
  locale: locale,
  messages: messages
});

ElementLocale.i18n((key, value) => i18n.t(key, value));

if (process.env.NODE_ENV == "mock") {
  require("@/mock/index.js");
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
