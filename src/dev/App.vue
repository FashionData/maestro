<template>
  <div v-if="$store.getters.isAuthenticated">
    <m-layout>
      <template #aside>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">Navigateur Un</span>
          </template>
          <el-menu-item-group>
            <span slot="title">Group Un</span>
            <el-menu-item index="1-1">item un</el-menu-item>
            <el-menu-item index="1-2">item deux</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Deux">
            <el-menu-item index="1-3">item trois</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">item quatre</span>
            <el-menu-item index="1-4-1">item un</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">Navigateur Deux</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">Navigateur Trois</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">Navigateur Quatre</span>
        </el-menu-item>
      </template>

      <template #content>
        <keep-alive>
          <router-view :key="$route.fullPath" />
        </keep-alive>
      </template>
    </m-layout>
  </div>

  <div v-else>
    <keep-alive>
      <router-view :key="$route.fullPath" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'app',
});
</script>

<style lang="scss">
  body {
    margin: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .navigation {
    & > * {
      margin-right: 20px;
    }
  }
</style>
