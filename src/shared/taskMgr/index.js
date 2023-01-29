"use strict";
import { reactive, toRefs } from "vue";
import TaskQueue from "./TaskQueue";
import AsyncTaskQueue from "./AsyncTaskQueue";

// 创建同步任务队列
export function createTaskQueue(tasks) {
  return new TaskQueue(tasks);
}

// 创建异步任务队列
export function createAsyncTaskQueue(asyncTask, tasks) {
  return new AsyncTaskQueue(asyncTask, tasks);
}

// 通知队列执行对应 type 的任务
export function notify(type, taskPool) {
  return function (state, payload) {
    for (let [key, val] of Object.entries(taskPool)) {
      // type === key && val.execute(state, payload);
      if (type === key) {
        return val.execute(state, payload);
      }
    }
  };
}

// useReducer hooks
export function useReducer(initState, taskPool) {
  const state = reactive(initState);

  // const dispatch = (type) => (payload) => notify(type, taskPool)(state, payload);
  const dispatch = (type) => (payload) => {
    const notifyResult = notify(type, taskPool);
    return notifyResult(state, payload);
  };

  return {
    ...toRefs(state),
    dispatch,
  };
}
