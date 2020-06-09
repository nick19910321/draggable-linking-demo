/**
 * Created by nick on 2019/11/7.
 */
import Mock from "mockjs";
import site from "./site";
import login from "./login";

Mock.mock(/^http:\/\/localhost:8088\/site(\?\S+)?$/, "get", site.getSiteInfo);
Mock.mock(/^http:\/\/localhost:8088\/login(\?\S+)?$/, "get", login.get);
Mock.mock(/^http:\/\/localhost:8088\/login(\?\S+)?$/, "post", login.post);
export default Mock;
