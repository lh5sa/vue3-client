<template>
  <el-dialog :model-value="updateLayerVisible" title="修改角色信息" @closed="hideLayer">
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
import { ref, reactive, readonly, inject, watch } from "vue";
import { checkRoleNameRules, checkRoleDescRules } from "@/shared";

const { updateLayerVisible, currentRow, updateRole, setUpdateLayerVisible, getRoles } = inject("taskReducer");

const rawForm = {
  id: "",
  role_name: "",
  role_desc: "",
};
const formRef = ref(null);
const formData = reactive(rawForm);

const formRules = readonly({
  role_name: checkRoleNameRules,
  role_desc: checkRoleDescRules,
});

watch(updateLayerVisible, (visible) => {
  visible && resetForm(true);
});

const hideLayer = () => {
  resetForm();
  setUpdateLayerVisible(false);
};

const resetForm = (visible) => {
  Object.keys(rawForm).forEach((key) => {
    formData[key] = visible ? currentRow.value[key] : "";
  });
};

const submitForm = () => {
  formRef.value.validate(async (isPass) => {
    if (!isPass) return;
    await updateRole(formData);
    await getRoles();
    hideLayer();
  });
};
</script>

<style lang="scss" scoped></style>
