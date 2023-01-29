<template>
  <div class="login-page" :style="{ background: bgColor }">
    <el-card class="login-card">
      <template v-slot:header>
        <h2 class="card-header flex align-center">登录</h2>
      </template>
      <el-form ref="loginFormRef" :rules="loginRules" :model="loginForm" label-position="left" size="large">
        <el-form-item label="" prop="email">
          <el-input v-model="loginForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { getRandomBgColor } from "@/shared";
import { reactive, ref, readonly } from "vue";
import { checkEmailRules, checkPasswordRules } from "@/shared/formCheckRules";
import { taskReducer, LOGIN } from "./taskReducer";

const bgColor = getRandomBgColor();

const loginFormRef = ref();
const loginForm = reactive({
  email: "",
  password: "",
});

const loginRules = readonly({
  email: checkEmailRules,
  password: checkPasswordRules,
});

// 提交表单 & 验证通过才提交
const submit = () => {
  loginFormRef.value.validate(async (isPass) => {
    if (!isPass) return;
    await taskReducer.dispatch(LOGIN)(loginForm);
  });
};
</script>

<style lang="less" scoped>
.login-page {
  /* background: linear-gradient(to right, #3f2b96, #a8c0ff); */
  height: 100%;

  .login-card {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    font-size: 16px;
  }

  .card-header {
    font-size: 20px;
    margin: 5px 0;
  }
}
</style>
