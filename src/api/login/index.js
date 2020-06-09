/**
 * Created by nick on 2019/3/20.
 */
import http from "@/api/common/http";
import config from "@/config";
import stringify from "@/utils/stringify";

const httpApi = {
  loginAuth: params => {
    const url = config.url.baseApi + config.api.login;
    return http.get(url, { params: params });
  },
  loginSite: params => {
    const url = config.url.baseApi + config.api.login;
    // post下参数序列化
    params = stringify(params);
    return http.post(url, params);
  },
  getCaptchaUrl: captchaId => {
    const url =
      config.url.baseApi +
      config.api.captcha +
      "/" +
      (captchaId ? captchaId : "");
    return url;
  },
  logoutSite: () => {
    const url = config.url.baseApi + config.api.logout;
    return http.get(url);
  }
};
export default httpApi;
