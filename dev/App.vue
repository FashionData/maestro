<template>
  <div v-if="$store.getters.isAuthenticated && $route.name !== 'login'">
    <logged-in-layout>
      <template #header-extended>
        <h2>MAESTRO</h2>
      </template>

      <template #header-collapse>
        <h2>M</h2>
      </template>

      <template #menu-items>
        <el-menu-item v-for="menuItem in menuItems" :key="menuItem.index" :index="menuItem.index">
          <i :class="menuItem.icon" />
          <span slot="title">{{ menuItem.title }}</span>
        </el-menu-item>
      </template>

      <template #content>
        <keep-alive>
          <router-view :key="$route.fullPath" />
        </keep-alive>
      </template>
    </logged-in-layout>
  </div>

  <div v-else>
    <keep-alive>
      <router-view :key="$route.fullPath" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { VIRTUAL_DISPLAYS } from "./constants/routes";

export default {
  name: 'app',
  computed: {
    menuItems() {
      return [
        {
          icon: 'ri-table-line',
          index: VIRTUAL_DISPLAYS.path,
          title: this.$t('app.menu-items.virtual-displays'),
        }
      ]
    }
  }
};
</script>
