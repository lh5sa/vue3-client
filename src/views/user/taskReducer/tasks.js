"use strict";
import { ElMessage } from "element-plus";

/**
 * 初始化用户列表数据
 * @param {Object} state
 * @param {Object} param1
 * @returns {any}
 */
export function initUsers(state, { res }) {
  const { count, rows } = res.data;
  state.count = count;
  state.users = rows;
}

/**
 * 设置当前页数
 */
export function setPage(state, { payload }) {
  state.params.page = payload;
}

/**
 * 设置当前每页多少条数据
 */
export function setPageSize(state, { payload }) {
  state.params.size = payload;
}

/**
 * 设置当前修改的行信息
 */
export function setCurrentRow(state, { payload }) {
  state.currentRow = payload.row;
}

/**
 * 显示分配角色层
 */
export function setAssignLayerVisible(state, { payload }) {
  state.assignRolesVisible = payload.visible;
}

/**
 * 显示/隐藏修改信息层
 */
export function setUpdateLayerVisiable(state, { payload }) {
  state.updateLayerVisible = payload.visible;
}

/**
 * 显示/隐藏创建信息层
 */
export function setCreateLayerVisiable(state, { payload }) {
  state.createLayerVisible = payload;
}

/**
 * 密码修改成功后
 */
export function afterResetPassword() {
  ElMessage.success("修改成功");
}
