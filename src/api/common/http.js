/**
 * http配置
 * Created by sn on 2019/3/18.
 */

// 引入axios以及element ui中的loading和message组件
import axios from "axios";
import { Loading, Message } from "element-ui";
// 路由跳转
import router from "@/router";
// 引入国际化语言包
import lang from "@/assets/lang";
const locale = localStorage.getItem("lang") || "zh";
const $constants = lang[locale].constants;

// 超时时间
axios.defaults.timeout = 3600;
axios.defaults.withCredentials = true;
axios.defaults.responseType = "json";

// http请求拦截器
let loadingInstance;
axios.interceptors.request.use(
  config => {
    loadingInstance = Loading.service({
      fullscreen: true
    });
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      lang: locale
    };
    config.params = Object.assign(
      {
        _t: new Date().getTime() + Math.random()
      },
      config.params
    );
    return config;
  },
  error => {
    loadingInstance.close();
    Message.error({
      message: $constants.MSG_TIMEOUT
    });
    return Promise.reject(error);
  }
);

// http响应拦截器
axios.interceptors.response.use(
  response => {
    loadingInstance.close();
    const data = response.data;
    if (!data) {
      Message.error({
        message: $constants.MSG_ERROR
      });
      return Promise.reject();
    }
    if (data.code == $constants.CODE_NOT_LOGIN) {
      Message.error({
        message: data && data.msg ? data.msg : $constants.MSG_NOT_LOGIN
      });
      router.push({
        path: "/login",
        query: {
          redirect: router.currentRoute.fullPath
        }
      });
      // 报错处理，打断then事件，以免返回数据导致错误判定
      return Promise.reject(data);
    }
    if (data.code !== $constants.CODE_SUCCESS) {
      Message.error({
        message: data && data.msg ? data.msg : $constants.MSG_ERROR
      });
      return Promise.reject(data);
    }
    return data;
  },
  error => {
    loadingInstance.close();
    Message.error({
      message: $constants.MSG_ERROR
    });
    return Promise.reject(error.response);
  }
);

export default axios;
