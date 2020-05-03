import api from "@/api";

class LoginService {
  constructor() {}

  async loginAuth() {
    const result = await api.login.loginAuth().then(data => {
      return data;
    });
    return result;
  }

  async loginSite(params) {
    const result = await api.login.loginSite(params).then(data => {
      return data;
    });
    return result;
  }
  async getLoginCaptchaUrl() {
    const captchaId =
      new Date().getTime() * 1000 + Math.ceil(Math.random() * 1000);
    const captchaUrl = api.login.getCaptchaUrl(captchaId);
    const captchaData = {
      captchaUrl: captchaUrl,
      captchaId: captchaId
    };
    return captchaData;
  }
}

export default LoginService;
