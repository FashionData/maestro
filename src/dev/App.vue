<template>
  <div v-if="$store.getters.isAuthenticated">
    <m-layout>
      <template #aside>
        <el-menu-item :index="usersPath">
          <i class="el-icon-menu"></i>
          <!-- TODO: Translate with i18n -->
          <span slot="title">Users</span>
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
import { USERS } from "@/constants/router/routes";

export default {
  name: 'app',
  computed: {
    usersPath() {
      return USERS.path
    }
  }
};
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
