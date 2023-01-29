import http from "@/shared/http";

// 登录
const login = (data) => http.post("/user/login", data);

// 修改密码
const resetPassword = (data) => http.post("/user/update_password", data);

// 获取用户列表
const getUsers = (params) => http.get("/users", { params });

// 创建用户信息
const createUser = (data) => http.post("/users", data);

// 修改用户信息
const updateUserInfo = (data) => http.patch(`/users/${data.id}`, data);

// 给用户分配角色
const assignRoles = (data) => http.post("/userroles", data);

export default {
  login,
  resetPassword,
  getUsers,
  createUser,
  updateUserInfo,
  assignRoles,
};
