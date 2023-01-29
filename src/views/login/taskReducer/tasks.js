"use strict";
import { useAuthStore } from "@/store/auth.js";
import $router from "@/router";

const authStore = useAuthStore();

// 登录: 将登录信息保存到store -> 跳到首页
export function login(_state, { res }) {
  if (!res.success) {
    console.info("出错了, 登录失败", res);
    return;
  }
  authStore.login(res.data);
  $router.replace({ name: "Welcome" });
}

// 注销登录: 清除登录信息 -> 跳回到登录页
export function logout() {
  authStore.logout();
  $router.replace({ name: "Login" });
}
