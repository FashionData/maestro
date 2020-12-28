<template>
  <div v-if="$store.getters.isAuthenticated && $route.name !== 'login'">
    <m-layout>
      <template #header-extended>
        <h2>MAESTRO</h2>
      </template>

      <template #header-collapse>
        <h2>M</h2>
      </template>

      <template #menu-items>
        <el-menu-item index="/test">
          <i class="ri-bar-chart-fill" />
          <!-- TODO: i18n -->
          <span slot="title">Test</span>
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
export default {
  name: 'app',
};
</script>
