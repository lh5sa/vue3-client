<template>
  <breadcrumb :items="['用户管理', '用户列表']"></breadcrumb>
  <div class="update-password">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="90px">
      <el-form-item prop="old_password" label="原密码">
        <el-input type="password" v-model="formData.old_password" />
      </el-form-item>
      <el-form-item prop="new_password" label="新密码">
        <el-input type="password" v-model="formData.new_password" />
      </el-form-item>
      <el-form-item prop="confirm" label="确认密码">
        <el-input type="password" v-model="formData.confirm" />
      </el-form-item>
      <el-form-item label="操作">
        <el-button @click="resetForm" type="danger">重置</el-button>
        <el-button @click="submitForm" type="primary">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import Breadcrumb from "@/components/Breadcrumb";
import { reactive, readonly, ref } from "vue";
import { checkPasswordRules, getCheckConfirmRules } from "@/shared";
import { RESET_PASSWORD, taskReducer } from "./taskReducer";

const formRef = ref(null);
const formData = reactive({
  old_password: "",
  new_password: "",
  confirm: "",
});
const formRules = readonly({
  old_password: checkPasswordRules,
  new_password: [
    ...checkPasswordRules,
    {
      trigger: "blur",
      message: "新旧密码不能一样",
      validator: (_rule, value) => value !== formData.old_password,
    },
  ],
  confirm: getCheckConfirmRules((_rule, value) => value === formData.new_password),
});

// 重置表单
const resetForm = () => {
  formData.old_password = "";
  formData.new_password = "";
  formData.confirm = "";
};

// 提交表单
const submitForm = () => {
  formRef.value.validate(async (isPass) => {
    if (!isPass) return;
    await taskReducer.dispatch(RESET_PASSWORD)(formData);
  });
};
</script>
