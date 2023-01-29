import { createRouter, createWebHashHistory } from "vue-router";
import { beforeEach, afterEach } from "@/router/guards.js";

const routes = [
  {
    path: "/login",
    name: "Login",
    meta: { isPublic: true },
    component: () => import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
  },
  {
    path: "/",
    component: () => import(/* webpackChunkName: "main" */ "@/layout/index.vue"),
    redirect: { name: "Welcome" },
    children: [
      {
        path: "/users",
        name: "User",
        component: () => import(/* webpackChunkName: "user" */ "@/views/user/index.vue"),
      },
      {
        path: "/roles",
        name: "Role",
        component: () => import(/* webpackChunkName: "roel" */ "@/views/role/index.vue"),
      },
      {
        path: "/permissions",
        name: "Permission",
        component: () => import(/* webpackChunkName: "permission" */ "@/views/permission/index.vue"),
      },
      {
        path: "/update_password",
        name: "UpdatePassword",
        meta: { dontCheckPermission: true },
        component: () => import(/* webpackChunkName: "updatePassword" */ "@/views/user/UpdatePassword.vue"),
      },
      {
        path: "/",
        name: "Welcome",
        meta: { dontCheckPermission: true },
        component: () => import(/* webpackChunkName: "welcome" */ "@/views/welcome/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(beforeEach);
router.afterEach(afterEach);

export default router;
