<template>
  <el-dialog :model-value="assignRolesVisible" title="分配角色" @closed="hideLayer">
    <el-form ref="formRef">
      <el-checkbox-group v-model="checkedList">
        <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">{{ item.role_name }}</el-checkbox>
      </el-checkbox-group>
    </el-form>
    <template #footer>
      <el-button @click="hideLayer">取 消</el-button>
      <el-button type="primary" @click="assign">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { watch, onMounted, inject, ref } from "vue";
/* prettier-ignore */
const {
  assignRolesVisible,
  roles,
  currentRow,
  setAssignRolesVisible,
  getRoles,
  assignRoles,
  refreshUsers
} = inject("taskReducer");

const formRef = ref(null);
const checkedList = ref([]);

// 获取角色数据
onMounted(getRoles);

// 初始化选中的数据
watch(assignRolesVisible, (visible) => {
  if (!visible) return;
  currentRow.value.roles.forEach((item) => {
    checkedList.value.push(item.id);
  });
});

// 重置选中
const resetCheckList = () => {
  checkedList.value = [];
};

// 隐藏分配角色层
const hideLayer = () => {
  resetCheckList();
  setAssignRolesVisible(false);
};

// 分配
const assign = async () => {
  await assignRoles({
    user_id: currentRow.value.id,
    role_ids: checkedList.value,
  });
  await refreshUsers();
  hideLayer();
};
</script>
