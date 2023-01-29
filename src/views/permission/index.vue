<template>
  <PermissionList />
  <CreateForm />
  <UpdateForm />
</template>

<script setup>
import PermissionList from "./List";
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
import { provide } from "vue";
/* prettier-ignore */
import {
  taskReducer,
  SET_CREATE_LAYER_VISIBLE,
  SET_UPDATE_LAYER_VISIBLE,
  ADD_PERMIS,
  DEL_PERMIS,
  UPDATE_PERMIS,
  GET_PERMIS,
  SET_PAGE,
  SET_PAGESIZE,
  REFRESH_PERMIS,
} from "./taskReducer";

/* prettier-ignore */
const {
  count,
  createLayerVisible,
  updateLayerVisible,
  currentRow,
  perims,
  params,
  dispatch,
} = taskReducer;

provide("taskReducer", {
  // states
  count,
  createLayerVisible,
  updateLayerVisible,
  currentRow,
  perims,
  params,

  // 当page/pageSize改变
  onSizeChange: dispatch(SET_PAGESIZE),
  onPageChange: dispatch(SET_PAGE),

  // 获取权限
  getPerims: dispatch(GET_PERMIS),

  // 显示/隐藏添加信息/修改信息
  setCreateLayerVisible: (visible) => dispatch(SET_CREATE_LAYER_VISIBLE)(visible),
  setUpdateLayerVisible: (visible, row) => dispatch(SET_UPDATE_LAYER_VISIBLE)({ visible, row }),

  // 创建/修改权限
  createPerimInfo: dispatch(ADD_PERMIS),
  updatePerimInfo: async (data) => {
    await dispatch(UPDATE_PERMIS)(data);
    await dispatch(REFRESH_PERMIS)(params.value);
  },
  deletePerimInfo: async (row) => {
    await dispatch(DEL_PERMIS)(row);
    await dispatch(REFRESH_PERMIS)(params.value);
  },

  // 切换用户状态 & 然后刷新数据(防止后端返回成功状态但是数据没改成功)
  setStatus: async function (row, status) {
    await dispatch(UPDATE_PERMIS)({ id: row.id, status });
    await dispatch(REFRESH_PERMIS)(params.value);
  },
});
</script>
