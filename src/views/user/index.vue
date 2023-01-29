<template>
  <breadcrumb :items="['用户管理', '用户列表']"></breadcrumb>
  <UserList />
  <CreateUserForm />
  <UpdateUserForm />
  <AssignRoles />
</template>

<script setup>
import Breadcrumb from "@/components/Breadcrumb";
import UserList from "./List";
import CreateUserForm from "./CreateForm";
import UpdateUserForm from "./UpdateForm";
import AssignRoles from "./AssignRoles";
import { provide } from "vue";
import {
  taskReducer,
  GET_USERS,
  REFRESH_USERS,
  SET_PAGE,
  SET_PAGESIZE,
  UPDATE_USER_INFO,
  SET_UPDATE_LAYER_VISIBLE,
  SET_CREATE_LAYER_VISIBLE,
  SET_ASSIGN_ROLES_VISIBLE,
  CREATE_USER_INFO,
  ASSIGN_ROLES,
} from "./taskReducer";
import { INIT_ROLES, taskReducer as roleTaskReducer } from "@/views/role/taskReducer";

/* prettier-ignore */
const {
  count,
  users,
  params,
  assignRolesVisible,
  updateLayerVisible,
  createLayerVisible,
  currentRow,
  dispatch
} = taskReducer;

const { roles, dispatch: roleDispatch } = roleTaskReducer;

provide("taskReducer", {
  roles,
  count,
  users,
  params,
  currentRow,
  assignRolesVisible,
  updateLayerVisible,
  createLayerVisible,
  // 获取角色数据
  getRoles: roleDispatch(INIT_ROLES),

  // 分配角色
  assignRoles: dispatch(ASSIGN_ROLES),

  // 获取用户数据/强制刷新用户数据
  getUsers: dispatch(GET_USERS),
  refreshUsers: dispatch(REFRESH_USERS),

  // 当page/pageSize改变
  onSizeChange: dispatch(SET_PAGESIZE),
  onPageChange: dispatch(SET_PAGE),

  // 显示/隐藏添加信息/修改信息/分配角色层
  setCreateLayerVisible: (visible) => dispatch(SET_CREATE_LAYER_VISIBLE)(visible),
  setUpdateLayerVisible: (visible, row) => dispatch(SET_UPDATE_LAYER_VISIBLE)({ visible, row }),
  setAssignRolesVisible: (visible, row) => dispatch(SET_ASSIGN_ROLES_VISIBLE)({ visible, row }),

  // 创建/修改用户信息
  createUserInfo: dispatch(CREATE_USER_INFO),
  updateUserInfo: dispatch(UPDATE_USER_INFO),

  // 切换用户状态 & 然后刷新数据(防止后端返回成功状态但是数据没改成功)
  setStatus: async function (row, status) {
    await dispatch(UPDATE_USER_INFO)({ id: row.id, status });
    await dispatch(REFRESH_USERS)(params.value);
  },
});
</script>
