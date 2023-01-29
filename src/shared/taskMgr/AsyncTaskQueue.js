"use strict";

import TaskQueue from "./TaskQueue";

export default class AsyncTaskQueue {
  constructor(asyncTask, taskItems) {
    // 必须是 Promise
    this.asyncTask = asyncTask;
    this.taskQueue = new TaskQueue(taskItems);
  }

  // 执行任务队列中的所有任务
  execute(state, payload) {
    return this.asyncTask(payload)
      .then((res) => {
        this.taskQueue.execute(state, payload, res);
        return Promise.resolve(res);
      })
      .catch((err) => {
        this.onError(err);
        return Promise.reject(err);
      });
  }

  // 如果异步任务 reject
  onError(e) {
    console.log("[AsyncTaskQueue error]: ", e);
  }
}
