"use strict";

export default {
  count: 0, // 总条数
  users: [], // 用户列表数据
  params: {
    page: 1, // 第几页
    size: 10, // 每页多少条
    type: "", // 搜索类型
    content: "", // 搜索内容
  },
  currentRow: null, // 当前操作的数据
  createLayerVisible: false, // 是否显示创建信息层
  updateLayerVisible: false, // 是否显示修改信息层
  assignRolesVisible: false, // 是否显示分配角色信息层
};
