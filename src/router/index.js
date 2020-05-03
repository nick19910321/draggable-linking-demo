import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index.vue";

Vue.use(VueRouter);

const routes = [
  //登录路由配置在最前，防止主路由被优先执行
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "Login" */ "@/views/Login.vue")
  },
  { path: "", redirect: "/home" },
  {
    path: "/",
    name: "index",
    component: Index,
    children: [
      {
        path: "home",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "Home" */ "@/views/Home.vue")
      },
      {
        path: "steps",
        name: "Steps",
        component: () =>
          import(/* webpackChunkName: "Steps" */ "@/views/Steps.vue")
      },
      {
        path: "cmd",
        name: "Cmd",
        component: () => import(/* webpackChunkName: "Cmd" */ "@/views/Cmd.vue")
      },
      {
        path: "install",
        name: "Install",
        component: () =>
          import(/* webpackChunkName: "Install" */ "@/views/Install.vue")
      },
      {
        path: "*",
        name: "NotFound",
        component: () =>
          import(/* webpackChunkName: "NotFound" */ "@/views/NotFound.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
