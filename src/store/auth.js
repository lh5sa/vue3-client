import { defineStore } from "pinia";
import { getTree } from "@/shared/tools.js";

export const useAuthStore = defineStore("auth", {
  persist: true, // 持久化保存

  state: () => ({
    authUser: null, // 登录的用户信息
  }),

  actions: {
    login(data) {
      this.authUser = data;
    },

    logout() {
      this.authUser = null;
    },
  },

  getters: {
    isLogin() {
      return Boolean(this.authUser);
    },
    permissions() {
      if (this.authUser && this.authUser.permissions) {
        return this.authUser.permissions;
      }
      return [];
    },
    menus() {
      let menus = [];
      if (this.authUser && this.authUser.permissions) {
        menus = getTree(this.authUser.permissions);
      }
      return menus;
    },
  },
});
