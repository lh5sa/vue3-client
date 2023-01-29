<template>
  <el-dialog title="新增权限" :model-value="createLayerVisible" @closed="hideLayer">
    <div class="create-form">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="90px">
        <!-- type -->
        <el-form-item prop="type" label="权限类型">
          <el-radio-group v-model="formData.type">
            <el-radio :label="0">路由权限</el-radio>
            <el-radio :label="1">API权限</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- desc -->
        <el-form-item prop="desc" label="权限描述">
          <el-input :placeholder="placeholders.desc" v-model="formData.desc" />
        </el-form-item>

        <!-- path -->
        <el-form-item prop="path" label="权限路径">
          <el-input :placeholder="placeholders.path" v-model="formData.path" />
        </el-form-item>

        <!-- pid -->
        <el-form-item prop="pid" label="父级ID">
          <el-input placeholder="例如: 0" type="number" v-model="formData.pid" />
        </el-form-item>

        <!-- icon -->
        <el-form-item v-if="formData.type === 0" prop="icon" label="图标">
          <div class="icon-wrapper">
            <el-input placeholder="例如: fa-plus" v-model="formData.icon" />
            <a class="link" target="_blank" href="https://fontawesome.com.cn/faicons">查看所有图标</a>
          </div>
        </el-form-item>

        <!-- method -->
        <el-form-item v-if="formData.type === 1" prop="method" label="请求方式">
          <el-select v-model="formData.method">
            <el-option v-for="item of methods" :value="item" :label="item" :key="item" />
          </el-select>
        </el-form-item>

        <el-form-item label="操作">
          <el-button @click="hideLayer" type="danger">取消</el-button>
          <el-button @click="submitForm" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup>
import { checkRequiredRules } from "@/shared";
import { inject, reactive, readonly, ref, computed } from "vue";
const { createLayerVisible, setCreateLayerVisible, createPerimInfo, getPerims } = inject("taskReducer");
const rawFormData = {
  type: 0, // 0: 路由权限 1: API权限
  desc: "",
  path: "",
  icon: "",
  pid: "",
  method: "",
};
const formData = reactive(rawFormData);
const formRef = ref(null);
const methods = readonly(["post", "delete", "patch", "get"]);

// computedPlaceholders
const placeholders = computed(() => {
  if (formData.type === 0) {
    // 路由权限
    return {
      desc: "例如:可以访问用户管理页面",
      path: "例如: /users",
    };
  } else {
    // API权限
    return {
      desc: "例如:可以删除用户信息",
      path: "例如: /users/:id",
    };
  }
});

// 数据验证规则
const formRules = readonly({
  icon: [checkRequiredRules("图标不能为空")],
  path: [checkRequiredRules("路径不能为空")],
  desc: [checkRequiredRules("描述不能为空")],
  type: [
    {
      validator: (_rule, value) => [0, 1].includes(value),
      message: "类型有误",
      trigger: "change",
    },
  ],
  pid: [
    {
      validator: (_rule, value) => /^\d+$/.test(String(value)),
      message: "父级ID有误",
      trigger: "blur",
    },
  ],
  method: [
    {
      validator: (_rule, value) => methods.includes(value),
      message: "请求方式有误",
      trigger: "change",
    },
  ],
});

// 重置表单
const resetForm = () => {
  Object.keys(rawFormData).forEach((key) => {
    formData[key] = key === "type" ? 0 : "";
  });
};

// 隐藏模态框
const hideLayer = () => {
  resetForm();
  setCreateLayerVisible(false);
};

// 提交表单
const submitForm = () => {
  formRef.value.validate(async (isPass) => {
    if (!isPass) return;
    // 创建/刷新
    console.log("formData:", formData);
    await createPerimInfo(formData);
    await getPerims();
    hideLayer();
  });
};
</script>

<style lang="less">
.el-radio__inner,
.el-radio__inner::after {
  border-radius: 100%;
}
.icon-wrapper {
  line-height: 1;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .link {
    text-align: right;
    min-width: 120px;
    display: block;
    text-decoration: none;
    color: var(--el-color-primary);
  }
}
</style>
