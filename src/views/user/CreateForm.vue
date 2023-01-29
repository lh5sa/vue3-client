<template>
  <el-dialog :model-value="createLayerVisible" title="创建用户信息" @closed="hideLayer">
    <div class="create-form">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="90px">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="formData.password" />
        </el-form-item>
        <el-form-item prop="confirm" label="确认密码">
          <el-input type="password" v-model="formData.confirm" />
        </el-form-item>
        <el-form-item label="用户头像(可选)">
          <el-upload class="avatar-uploader" action="" :show-file-list="false">
            <img v-if="avatarURL" :src="avatarURL" class="avatar" />
            <div v-else class="upload-icon">
              <i class="fa fa-plus"></i>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="操作">
          <el-button @click="resetForm" type="danger">重置</el-button>
          <el-button @click="submitForm" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup>
import { inject, reactive, readonly, ref } from "vue";
import { checkEmailRules, checkPasswordRules, checkUsernameRules, getCheckConfirmRules } from "@/shared";
const { createLayerVisible, setCreateLayerVisible, createUserInfo, refreshUsers } = inject("taskReducer");

const rawFormData = {
  username: "",
  email: "",
  password: "",
  confirm: "",
  avatar: "",
};
const formRef = ref(null);
const formData = reactive(rawFormData);
const formRules = readonly({
  username: checkUsernameRules,
  email: checkEmailRules,
  password: checkPasswordRules,
  confirm: getCheckConfirmRules((_rule, value) => value === formData.password),
});

// 重置表单
const resetForm = () => {
  Object.keys(rawFormData).forEach((key) => {
    formData[key] = "";
  });
};

// 隐藏模态框
const hideLayer = () => {
  resetForm();
  setCreateLayerVisible(false);
};

// 提交表单
const submitForm = () => {
  formRef.value.validate(async (isPass) => {
    if (!isPass) return;
    await createUserInfo(formData);
    await refreshUsers();
    hideLayer();
  });
};

// TODO: 头像上传/剪切功能
const avatarURL = ref("");
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.upload-icon {
  font-size: 30px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
