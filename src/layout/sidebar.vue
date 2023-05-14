<template>
  <el-menu class="sidebar-container" :router="true" :default-active="$route.path">
    <el-menu-item index="/"><i class="fa fa-home"></i><span>首页</span></el-menu-item>
    <el-sub-menu v-for="menu in menus" :key="menu.id" :index="`${menu.id}`">
      <template #title>
        <i class="fa" :class="menu.icon"></i>
        <span>{{ menu.desc }}</span>
      </template>
      <el-menu-item v-for="item in menu.children" :key="item.id" :index="item.path">
        <i class="fa" :class="item.icon"></i>
        <span>{{ item.desc }}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { useRoute } from "vue-router";

const $store = useAuthStore();
const menus = $store.menus;
const $route = useRoute();
</script>

<style lang="scss">
.sidebar-container {
  .el-menu-item,
  .el-sub-menu,
  .el-sub-menu__title {
    color: #666;
    &.is-active {
      color: #409eff;
    }
  }
  i.fa {
    margin-right: 5px;
  }
}
</style>
