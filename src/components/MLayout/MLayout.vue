<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px">
      <slot name="aside" />
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <slot name="header" />

        <el-dropdown>
          <el-avatar
            class="avatar"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />

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
        <slot name="content" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { LOGOUT, USER } from "@/constants/router/routes-names";

export default {
  name: "m-layout",
  computed: {
    userRouteName() {
      return USER;
    },
    logoutRouteName() {
      return LOGOUT;
    }
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.avatar {
  vertical-align: middle;
}

.el-aside {
  color: #333;
}
</style>
