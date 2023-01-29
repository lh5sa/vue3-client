import { createTaskQueue, createAsyncTaskQueue, memoize } from "@/shared";
import { perimService } from "@/services";

import {
  SET_CREATE_LAYER_VISIBLE,
  SET_UPDATE_LAYER_VISIBLE,
  ADD_PERMIS,
  DEL_PERMIS,
  UPDATE_PERMIS,
  GET_PERMIS,
  SET_PAGESIZE,
  SET_PAGE,
  REFRESH_PERMIS
} from "./actionTypes.js";

import { setPage, setPageSize, initPerims, setCreateLayerVisible, setUpdateLayerVisible } from "./tasks.js";

const actions = Object.create(null);

const getPerimsFromCache = memoize(perimService.getPerims);

actions[SET_CREATE_LAYER_VISIBLE] = createTaskQueue([setCreateLayerVisible]);
actions[SET_UPDATE_LAYER_VISIBLE] = createTaskQueue([setUpdateLayerVisible]);
actions[SET_PAGE] = createTaskQueue([setPage]);
actions[SET_PAGESIZE] = createTaskQueue([setPageSize]);
actions[ADD_PERMIS] = createAsyncTaskQueue(perimService.createPerims, []);
actions[DEL_PERMIS] = createAsyncTaskQueue(perimService.deletePerims, []);
actions[UPDATE_PERMIS] = createAsyncTaskQueue(perimService.updatePerims, []);
actions[GET_PERMIS] = createAsyncTaskQueue(getPerimsFromCache, [initPerims]);
actions[REFRESH_PERMIS] = createAsyncTaskQueue(perimService.getPerims, [initPerims]);

export default actions;
