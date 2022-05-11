import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 路由表
const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login"),
  },
  {
    path: "/scanCode",
    name: "scanCode",
    component: () => import("@/views/scanCode"),
  },
  {
    path: "/sao2",
    name: "sao2",
    component: () => import("@/views/sao2"),
  },
  {
    path: "/writeCode",
    name: "writeCode",
    component: () => import("@/views/writeCode"),
  },
  {
    path: "/doReserve",
    name: "doReserve",
    component: () => import("@/views/doReserve"),
  },
  {
    path: "/chooseReservePoint",
    name: "chooseReservePoint",
    component: () => import("@/views/chooseReservePoint"),
  },
  {
    path: "/doReserve2",
    name: "doReserve2",
    component: () => import("@/views/doReserve2"),
  },
  {
    path: "/success",
    name: "success",
    component: () => import("@/views/success"),
  },
  {
    path: "/writeOff",
    name: "writeOff",
    component: () => import("@/views/writeOff"),
  },
  {
    path: "/myCodes",
    name: "myCodes",
    component: () => import("@/views/myCodes"),
  },
  {
    path: "/map",
    name: "map",
    component: () => import("@/views/map"),
  },
  {
    path: "/noCode",
    name: "noCode",
    component: () => import("@/views/noCode"),
  },
  {
    path: "/doNum",
    name: "doNum",
    component: () => import("@/views/doNum"),
  },
  {
    path: "/notelephone",
    name: "notelephone",
    component: () => import("@/views/notelephone"),
  },
  {
    path: "/chooseSite",
    name: "chooseSite",
    component: () => import("@/views/chooseSite"),
  },
  {
    path: "/writeTelepone",
    name: "writeTelepone",
    component: () => import("@/views/writeTelepone"),
  },
  {
    path: "/",
    // name: 'layout', // 如果父路由有默认子路由，那它的 name 没有意义
    component: () => import("@/views/layout"),
    children: [
      {
        path: "", // 默认子路由，只能有1个
        name: "home",
        component: () => import("@/views/home"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
