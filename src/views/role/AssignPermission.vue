<template>
  <el-dialog
    ref="treeRef"
    :model-value="assignLayerVisible"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    title="分配权限"
    @closed="hideLayer"
  >
    <el-tree :data="perimsTree" :props="treeProps" ref="treeRef" show-checkbox default-expand-all node-key="id">
      <template #default="scope">
        <div class="node-item-wrapper">
          <div>{{ scope.node.label }}</div>
          <div v-if="scope.data.pid === 0">
            <el-tag :type="scope.data.type === 0 ? 'warning' : 'success'" size="small">
              {{ scope.data.type === 0 ? "路由权限" : "API权限" }}
            </el-tag>
          </div>
        </div>
      </template>
    </el-tree>
    <div class="btns">
      <el-button type="danger" size="small" @click="hideLayer">取消</el-button>
      <el-button type="success" size="small" @click="assign">确定</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import { inject, onMounted, ref, watch } from "vue";
/* prettier-ignore */
const {
  assignLayerVisible,
  perimsTree,
  currentRow,
  getPerimsTree,
  setAssignLayerVisible,
  assignPermission,
  getRoles
} = inject("taskReducer");

const treeRef = ref(null);
const treeProps = {
  children: "children",
  label: "desc",
};

// 获取权限(树形结构数据)
onMounted(getPerimsTree);

// 隐藏分配角色层
const hideLayer = () => setAssignLayerVisible(false);

// 显示分配权限的时候设置默认的ID
const initCheckedKeys = (val) => {
  if (val) {
    const ids = currentRow.value.permissions.map((item) => item.id);
    treeRef.value.setCheckedKeys(ids, true);
  } else {
    treeRef.value.setCheckedKeys([], false);
  }
};
watch(assignLayerVisible, initCheckedKeys, {
  flush: "post",
});

// 分配
const assign = async () => {
  const permission_ids = treeRef.value.getCheckedKeys();
  const role_id = currentRow.value.id;
  await assignPermission({ permission_ids, role_id });
  await getRoles();
  hideLayer();
};
</script>

<style>
.node-item-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btns {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0 0 0;
}
</style>
