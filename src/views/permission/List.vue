<template>
  <breadcrumb :items="['权限管理', '权限列表']"></breadcrumb>
  <paginate-table v-bind="tableOptions">
    <el-table :data="perims" :border="true">
      <el-table-column prop="id" label="ID" width="120px" />
      <el-table-column prop="pid" label="父级" width="120px" />
      <el-table-column prop="path" label="路径" />
      <el-table-column prop="desc" label="描述" />
      <el-table-column label="类型" width="120px">
        <template #default="scope">
          <el-tag v-if="scope.row.type === 0" size="small" type="warning">路由权限</el-tag>
          <el-tag v-else type="success" size="small">API权限</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="图标" width="80px">
        <template #default="scope">
          <i v-if="scope.row.type === 0" class="fa" :class="scope.row.icon"></i>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="80px">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 0">正常</el-tag>
          <el-tag v-else type="danger">异常</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="220px">
        <template #default="scope">
          <!-- status: 0: 显示锁定 1: 显示解锁 -->
          <el-button @click="setStatus(scope.row, 1)" v-if="scope.row.status === 0" size="small" type="warning"
            >锁定</el-button
          >
          <el-button @click="setStatus(scope.row, 0)" v-else size="small" type="success">解锁</el-button>

          <!-- update -->
          <el-button size="small" type="primary" @click="showUpdateLayer(scope.row)">修改信息</el-button>

          <!-- delete -->
          <el-popconfirm
            @confirm="deletePerimInfo(scope.row)"
            confirm-button-text="确定"
            cancel-button-text="取消"
            title="确定要删除吗?"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </paginate-table>
</template>

<script setup>
import Breadcrumb from "@/components/Breadcrumb";
import PaginateTable from "@/components/PaginateTable";
import { inject, watchEffect } from "vue";

/* prettier-ignore */
const {
  params,
  count,
  perims,
  getPerims,
  onPageChange,
  onSizeChange,
  deletePerimInfo,
  setCreateLayerVisible,
  setUpdateLayerVisible,
  setStatus
} = inject("taskReducer");

// 监听 page/size 改变, 刷新数据
watchEffect(() => {
  getPerims(params.value);
});

// 显示修改信息/分配角色层
const showUpdateLayer = (row) => setUpdateLayerVisible(true, row);

// 点击顶部搜索/重置
const onSearch = ({ searchSelect, searchInput }) => {
  params.value.type = searchSelect;
  params.value.desc = searchInput;
  getPerims(params.value);
};
const onReset = () => {
  params.value.type = "";
  params.value.content = "";
  getPerims(params.value);
};

// 传入table的属性
const tableOptions = {
  options: [
    { label: "路由权限", value: 0 },
    { label: "API权限", value: 1 },
  ],
  buttons: [
    {
      text: "新增权限",
      type: "primary",
      handler: () => setCreateLayerVisible(true),
    },
  ],
  onSizeChange,
  onPageChange,
  pageParams: params,
  paginateTotal: count,
  onSearch,
  onReset,
};
</script>
