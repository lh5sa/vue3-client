"use strict";
import { http } from "@/shared";

// 获取角色
const getRoles = () => http.get("/roles");

// 删除角色
const removeRole = (data) => http.delete(`/roles/${data.id}`, data);

// 创建角色
const createRole = (data) => http.post("/roles", data);

// 修改角色
const updateRole = (data) => http.patch(`/roles/${data.id}`, data);

// 分配权限
const assignPermissions = (data) => http.post("/roleperms", data);

export default {
  updateRole,
  createRole,
  getRoles,
  removeRole,
  assignPermissions,
};
