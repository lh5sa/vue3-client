import { roleService, perimService } from "@/services";
import { createTaskQueue, createAsyncTaskQueue } from "@/shared";
import {
  INIT_ROLES,
  REMOVE_ROLE,
  SET_CREATE_LAYER_VISIBLE,
  SET_UPDATE_LAYER_VISIBLE,
  SET_ASSIGN_LAYER_VISIBLE,
  CREATE_ROLE,
  UPDATE_ROLE,
  GET_PERIMS_TREE,
  ASSIGN_PERMIS,
} from "./actionTypes.js";

import {
  getPerims,
  initRoles,
  removeRole,
  setAssignLayerVisible,
  setCreateLayerVisible,
  setUpdateLayerVisible,
} from "./tasks";

export default {
  [INIT_ROLES]: createAsyncTaskQueue(roleService.getRoles, [initRoles]),
  [REMOVE_ROLE]: createAsyncTaskQueue(roleService.removeRole, [removeRole]),
  [CREATE_ROLE]: createAsyncTaskQueue(roleService.createRole, []),
  [UPDATE_ROLE]: createAsyncTaskQueue(roleService.updateRole, []),
  [SET_CREATE_LAYER_VISIBLE]: createTaskQueue([setCreateLayerVisible]),
  [SET_UPDATE_LAYER_VISIBLE]: createTaskQueue([setUpdateLayerVisible]),
  [SET_ASSIGN_LAYER_VISIBLE]: createTaskQueue([setAssignLayerVisible]),
  [GET_PERIMS_TREE]: createAsyncTaskQueue(perimService.getPerimsTree, [getPerims]),
  [ASSIGN_PERMIS]: createAsyncTaskQueue(roleService.assignPermissions),
};
