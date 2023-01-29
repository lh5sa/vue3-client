<template>
  <Breadcrumb :items="['权限管理', '角色管理']" />
  <RoleList />
  <CreateRoleForm />
  <UpdateRoleForm />
  <AssignPermission />
</template>

<script setup>
import Breadcrumb from "@/components/Breadcrumb";
import RoleList from "./List.vue";
import CreateRoleForm from "./CreateForm.vue";
import UpdateRoleForm from "./UpdateForm.vue";
import AssignPermission from "./AssignPermission.vue";
import { provide } from "vue";
import {
  taskReducer,
  INIT_ROLES,
  REMOVE_ROLE,
  UPDATE_ROLE,
  CREATE_ROLE,
  SET_CREATE_LAYER_VISIBLE,
  SET_UPDATE_LAYER_VISIBLE,
  SET_ASSIGN_LAYER_VISIBLE,
  GET_PERIMS_TREE,
  ASSIGN_PERMIS,
} from "./taskReducer";

/* prettier-ignore */
const {
  roles,
  currentRow,
  perimsTree,
  createLayerVisible,
  updateLayerVisible,
  assignLayerVisible,
  dispatch
} = taskReducer;

provide("taskReducer", {
  roles,
  currentRow,
  createLayerVisible,
  updateLayerVisible,
  assignLayerVisible,
  perimsTree,
  getRoles: dispatch(INIT_ROLES),
  getPerimsTree: dispatch(GET_PERIMS_TREE),
  updateRole: dispatch(UPDATE_ROLE),
  createRole: dispatch(CREATE_ROLE),
  removeRole: dispatch(REMOVE_ROLE),
  setCreateLayerVisible: dispatch(SET_CREATE_LAYER_VISIBLE),
  setUpdateLayerVisible: (visible, row) => dispatch(SET_UPDATE_LAYER_VISIBLE)({ visible, row }),
  setAssignLayerVisible: (visible, row) => dispatch(SET_ASSIGN_LAYER_VISIBLE)({ visible, row }),
  assignPermission: dispatch(ASSIGN_PERMIS),
});
</script>
