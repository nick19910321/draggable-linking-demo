/**
 * Created by sn on 2019/11/15.
 */
const login = {
  get: req => {
    console.log("Mock:", req);
    return {
      code: 200,
      msg: "账号尚未登录",
      time: new Date().getTime(),
      data: {
        status: 40001
      }
    };
  },
  post: req => {
    console.log("Mock:", req);

    return {
      code: 404,
      msg: "接口不存在",
      time: new Date().getTime(),
      data: []
    };
  }
};

export default login;
