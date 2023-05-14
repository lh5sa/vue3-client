<template>
  <div class="navbar-wrapper">
    <div class="logo">Admin-Vue3</div>
    <div class="infos">
      <div class="item user">
        <div class="avatar"><img :src="user.avatar" /></div>
        <p>{{ user.username }}</p>
      </div>
      <div class="item">
        <el-button type="primary" @click="goEditPassword">修改密码</el-button>
      </div>
      <div class="item">
        <el-button type="danger" @click="logout">注销登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth.js";
import { taskReducer, LOGOUT } from "@/views/login/taskReducer";
const $router = useRouter();

const user = useAuthStore().authUser;

// 注销登录
const logout = taskReducer.dispatch(LOGOUT);

// 跳到修改密码页面
const goEditPassword = () => {
  $router.push({ name: "UpdatePassword" });
};
</script>

<style lang="scss" scoped>
.navbar-wrapper {
  width: 100%;
  height: 100%;
  /* background: #ccc; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #555;
  .logo {
    font-size: 20px;
  }
  .infos {
    display: flex;
    align-items: center;
    .item {
      height: 100%;
      margin-left: 15px;
    }
    .user {
      display: flex;
      align-items: center;
      font-size: 16px;
      .avatar {
        width: 40px;
        height: 40px;
        max-width: 40px;
        max-height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
