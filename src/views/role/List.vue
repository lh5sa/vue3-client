<template>
  <div style="padding-bottom: 15px">
    <el-button type="success" @click="showCreateLayer">添加角色</el-button>
  </div>
  <el-table :data="roles" :border="true">
    <el-table-column prop="id" label="ID" width="120px" />
    <el-table-column prop="role_name" label="角色名" width="120px" />
    <el-table-column prop="role_desc" label="角色描述" width="120px" />
    <el-table-column label="角色拥有的权限">
      <template #default="scope">
        <el-tag v-for="item in scope.row.permissions" :key="item.id" size="small" style="margin: 0 5px 5px 0">{{
          item.desc
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="270px">
      <template #default="scope">
        <el-popconfirm
          @confirm="deleteRole(scope.row)"
          confirm-button-text="确定"
          cancel-button-text="取消"
          title="确定要删除吗?"
        >
          <template #reference>
            <el-button size="small" type="danger">删除角色</el-button>
          </template>
        </el-popconfirm>
        <el-button @click="showUpdateLayer(scope.row)" size="small" type="primary">修改角色</el-button>
        <el-button @click="showAssignLayer(scope.row)" size="small" type="success">分配权限</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { inject, onMounted } from "vue";
/* prettier-ignore */
const {
  roles,
  getRoles,
  removeRole,
  setCreateLayerVisible,
  setUpdateLayerVisible,
  setAssignLayerVisible
} = inject("taskReducer");

// 显示创建角色层 显示修改角色 显示分配权限
const showCreateLayer = () => setCreateLayerVisible(true);
const showUpdateLayer = (row) => setUpdateLayerVisible(true, row);
const showAssignLayer = (row) => setAssignLayerVisible(true, row);

// 删除角色
const deleteRole = async (row) => {
  await removeRole(row);
  await getRoles();
};

// 获取角色数据
onMounted(getRoles);
</script>
