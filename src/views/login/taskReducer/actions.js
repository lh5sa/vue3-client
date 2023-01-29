"use strict";

import { createAsyncTaskQueue, createTaskQueue } from "@/shared";
import { userService } from "@/services";
import { LOGIN, LOGOUT } from "./actionTypes";
import { login, logout } from "./tasks";

const taskPool = {
  [LOGIN]: createAsyncTaskQueue(userService.login, [login]),
  [LOGOUT]: createTaskQueue([logout]),
};

export default taskPool;
