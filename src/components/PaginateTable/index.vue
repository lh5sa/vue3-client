<template>
  <div class="paginate-table-container">
    <div class="search-wrapper">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="">
          <el-input v-model="searchForm.searchInput" placeholder="请输入内容" class="input-with-select">
            <template #prepend>
              <el-select v-model="searchForm.searchSelect" placeholder="选择搜索类型" style="width: 120px">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.text" />
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="right-btns">
        <el-button v-for="item of buttons" :key="item.text" :type="item.type" @click="item.handler">{{
          item.text
        }}</el-button>
      </div>
    </div>
    <div class="content">
      <slot />
    </div>
    <div class="paginate">
      <el-pagination
        small
        background
        layout="sizes, prev, pager, next"
        :total="paginateTotal.value"
        :current-page="pageParams.value.page"
        :page-size="pageParams.value.size"
        :page-sizes="[10, 15, 20]"
        @size-change="onSizeChange"
        @current-change="onPageChange"
        v-bind="$attrs"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive, isRef } from "vue";
const props = defineProps({
  options: {
    // [ {id: '', label: '', value: '' } ]
    type: Array,
    default: () => [],
  },

  buttons: {
    // [ { type: '', text:'', handler: Funcion } ]
    type: Array,
    default: () => [],
  },

  pageParams: {
    // 当前页
    required: true,
    validator: (val) => isRef(val) && val.value.page && val.value.size,
  },

  onSizeChange: {
    // 每页多少条数据变化
    type: Function,
    default: () => Function.prototype,
  },

  onPageChange: {
    // 当前页变化执行
    type: Function,
    default: () => Function.prototype,
  },

  paginateTotal: {
    // 总共有多少条数据
    required: true,
    validator: (val) => isRef(val),
  },

  onSearch: {
    // 搜索前调用
    type: Function,
    default: () => Function.prototype,
  },

  onReset: {
    // 重置前调用
    type: Function,
    default: () => Function.prototype,
  },
});

// 搜索表单
const searchForm = reactive({
  searchSelect: "",
  searchInput: "",
});

// 搜索
function search() {
  typeof props.onSearch === "function" && props.onSearch(searchForm);
  console.info("search called");
}

// 重置
function reset() {
  searchForm.searchInput = "";
  searchForm.searchSelect = "";
  typeof props.onReset === "function" && props.onReset(searchForm);
  console.info("reset called");
}
</script>

<style lang="less" scoped>
.search-wrapper {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  padding-bottom: 20px;

  .search-form {
    flex: 1;
  }

  .el-form--inline .el-form-item {
    margin-right: 10px;
    margin-bottom: 0;
  }

  .right-btns .el-button {
    margin-left: 10px;
  }

  .right-btns {
    justify-self: flex-end;
  }
}
.paginate {
  padding-top: 20px;
}
.paginate-table-container {
  padding-bottom: 30px;
}
</style>
