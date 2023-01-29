<template>
  <paginate-table v-bind="tableOptions">
    <el-table :data="users" :border="true">
      <el-table-column prop="id" label="ID" width="120px" />
      <el-table-column prop="username" label="用户名" width="120px" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="头像" width="120px">
        <template #default="scope">
          <img :src="scope.row.avatar" style="width: 30px; height: 30px" />
        </template>
      </el-table-column>
      <el-table-column label="角色">
        <template #default="scope">
          <el-tag
            type="success"
            size="small"
            style="margin-right: 5px"
            v-for="item of scope.row.roles"
            :key="item.id"
            >{{ item.role_name }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="注册时间">
        <template #default="scope">
          <span>{{ dateFormat(scope.row.created_at) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" width="65px">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 0" type="success" size="small">正常</el-tag>
          <el-tag v-else type="danger" size="small">异常</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="showUpdateLayer(scope.row)">修改信息</el-button>
          <el-button size="small" type="warning" @click="showAssignRoles(scope.row)">分配角色</el-button>
          <!-- 0: 显示锁定 1: 显示解锁 -->
          <el-button @click="setStatus(scope.row, 1)" v-if="scope.row.status === 0" size="small" type="danger"
            >锁定</el-button
          >
          <el-button @click="setStatus(scope.row, 0)" v-else size="small" type="success">解锁</el-button>
        </template>
      </el-table-column>
    </el-table>
  </paginate-table>
</template>

<script setup>
import PaginateTable from "@/components/PaginateTable";
import { inject, watchEffect } from "vue";
import { dateFormat } from "@/shared";
/* prettier-ignore */
const {
  params,
  count,
  users,
  setStatus,
  getUsers,
  onPageChange,
  onSizeChange,
  setCreateLayerVisible,
  setUpdateLayerVisible,
  setAssignRolesVisible
} = inject("taskReducer");

// 监听 page/size 改变, 刷新数据
watchEffect(() => {
  getUsers(params.value);
});

// 显示修改信息/分配角色层
const showUpdateLayer = (row) => setUpdateLayerVisible(true, row);
const showAssignRoles = (row) => setAssignRolesVisible(true, row);

// 点击顶部搜索/重置
const onSearch = ({ searchSelect, searchInput }) => {
  params.value.type = searchSelect;
  params.value.content = searchInput;
  getUsers(params.value);
};
const onReset = () => {
  params.value.type = "";
  params.value.content = "";
  getUsers(params.value);
};

// 传入table的属性
const tableOptions = {
  options: [
    { label: "用户ID", value: 1 },
    { label: "用户名", value: 2 },
    { label: "用户邮箱", value: 3 },
  ],
  buttons: [
    {
      text: "创建用户",
      type: "primary",
      handler: () => setCreateLayerVisible(true),
    },
  ],
  onSizeChange,
  onPageChange,
  pageParams: params,
  paginateTotal: count,
  onSearch,
  onReset,
};
</script>
