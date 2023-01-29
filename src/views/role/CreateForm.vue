<template>
  <el-dialog :model-value="createLayerVisible" title="创建角色" @closed="hideLayer">
    <div class="create-form">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="90px">
        <el-form-item prop="role_name" label="角色名">
          <el-input v-model="formData.role_name" />
        </el-form-item>
        <el-form-item prop="role_desc" label="角色描述">
          <el-input v-model="formData.role_desc" />
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
import { ref, reactive, readonly, inject } from "vue";
import { checkRoleNameRules, checkRoleDescRules } from "@/shared";

const { createLayerVisible, createRole, setCreateLayerVisible, getRoles } = inject("taskReducer");

const rawForm = {
  role_name: "",
  role_desc: "",
};
const formRef = ref(null);
const formData = reactive(rawForm);
const formRules = readonly({
  role_name: checkRoleNameRules,
  role_desc: checkRoleDescRules,
});

const hideLayer = () => {
  resetForm();
  setCreateLayerVisible(false);
};

const resetForm = () => {
  Object.keys(rawForm).forEach((key) => {
    formData[key] = "";
  });
};

const submitForm = () => {
  formRef.value.validate(async (isPass) => {
    if (!isPass) return;
    await createRole(formData);
    hideLayer();
    await getRoles();
  });
};
</script>

<style lang="scss" scoped></style>
