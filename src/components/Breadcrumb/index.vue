<template>
  <div class="breadcrumb-wrapper">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in items" :key="item">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { ArrowRight } from "@element-plus/icons-vue"
import { defineProps } from "vue";
defineProps({
  items: {
    type: Array,
    default: () => []
  }
});
</script>

<style lang="less" scoped>
.breadcrumb-wrapper {
  padding-bottom: 20px;
}
</style>
