"use strict";

/**
 * 初始化 roles
 */
export function initRoles(state, { res }) {
  state.roles = res.data;
}

/**
 * 删除角色信息
 */
export function removeRole(state, { payload }) {
  state.roles = state.roles.filter((item) => item.id !== payload.id);
}

/**
 * 设置创建角色层显示隐藏
 */
export function setCreateLayerVisible(state, { payload }) {
  state.createLayerVisible = payload;
}

/**
 * 设置修改角色层显示隐藏
 */
export function setUpdateLayerVisible(state, { payload }) {
  state.currentRow = payload.row;
  state.updateLayerVisible = payload.visible;
}

/**
 * 分配角色权限层显示/隐藏
 */
export function setAssignLayerVisible(state, { payload }) {
  state.currentRow = payload.row;
  state.assignLayerVisible = payload.visible;
}

/**
 * 获取权限树
 */
export function getPerims(state, { res }) {
  state.perimsTree = res.data;
}
