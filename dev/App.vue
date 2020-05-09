<template>
  <div v-if="$store.getters.isAuthenticated && $route.name !== 'login'">
    <m-layout>
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
