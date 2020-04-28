<template>
  <el-container style="height: 100vh;">
    <el-aside width="auto">
      <el-header class="d-flex align-center" :class="{ 'justify-center': isCollapse }">
        <router-link to="/">
          <template v-if="isCollapse">X</template>
          <template v-else>App Name</template>
        </router-link>
      </el-header>

      <el-menu class="menu" :collapse="isCollapse" router>
        <slot name="aside" />
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <i class="el-icon-search" />
        <i class="el-icon-bell" />
        <i class="el-icon-chat-square" />
        <i class="el-icon-star-off" />

        <el-dropdown>
          <el-avatar class="avatar" :src="$store.getters.user.photoURL" />

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link :to="{ name: userRouteName }">Profile</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link :to="{ name: logoutRouteName }">Logout</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">Agrandir</el-radio-button>
          <el-radio-button :label="true">Réduire</el-radio-button>
        </el-radio-group>
        <slot name="content" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { LOGOUT, USER } from "@/constants/router/routes";

export default {
  name: "m-layout",
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    userRouteName() {
      return USER.name;
    },
    logoutRouteName() {
      return LOGOUT.name;
    }
  },
}
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
  border: none;

  &:not(.el-menu--collapse) {
    width: 200px;
  }
}

.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #b3c0d1;
  color: #333;
  font-size: 20px;

  & > * {
    margin-right: 17px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
