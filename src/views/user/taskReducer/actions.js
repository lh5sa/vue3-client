"use strict";
import { userService } from "@/services";
import { createTaskQueue, createAsyncTaskQueue, memoize } from "@/shared";
import { logout } from "@/views/login/taskReducer/tasks";
import {
  initUsers,
  setPage,
  setPageSize,
  setCurrentRow,
  setAssignLayerVisible,
  setUpdateLayerVisiable,
  setCreateLayerVisiable,
  afterResetPassword,
} from "./tasks";
import {
  GET_USERS,
  SET_PAGE,
  SET_PAGESIZE,
  UPDATE_USER_INFO,
  CREATE_USER_INFO,
  REFRESH_USERS,
  SET_UPDATE_LAYER_VISIBLE,
  SET_CREATE_LAYER_VISIBLE,
  SET_ASSIGN_ROLES_VISIBLE,
  RESET_PASSWORD,
  ASSIGN_ROLES,
} from "./actionTypes";

const getUserFromCache = memoize(userService.getUsers);

const taskPool = {
  [GET_USERS]: createAsyncTaskQueue(getUserFromCache, [initUsers]),
  [REFRESH_USERS]: createAsyncTaskQueue(userService.getUsers, [initUsers]),
  [SET_PAGE]: createTaskQueue([setPage]),
  [SET_PAGESIZE]: createTaskQueue([setPageSize]),
  [CREATE_USER_INFO]: createAsyncTaskQueue(userService.createUser, []),
  [UPDATE_USER_INFO]: createAsyncTaskQueue(userService.updateUserInfo),
  [SET_CREATE_LAYER_VISIBLE]: createTaskQueue([setCreateLayerVisiable]),
  [SET_ASSIGN_ROLES_VISIBLE]: createTaskQueue([setCurrentRow, setAssignLayerVisible]),
  [SET_UPDATE_LAYER_VISIBLE]: createTaskQueue([setCurrentRow, setUpdateLayerVisiable]),
  [RESET_PASSWORD]: createAsyncTaskQueue(userService.resetPassword, [afterResetPassword, logout]),
  [ASSIGN_ROLES]: createAsyncTaskQueue(userService.assignRoles, []),
};

export default taskPool;
