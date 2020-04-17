<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px">
      <slot name="aside" />
    </el-aside>

    <el-container>
      <el-header class="header">
        <i class="el-icon-search" />
        <i class="el-icon-bell" />
        <i class="el-icon-chat-square" />
        <i class="el-icon-star-off" />

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
  mounted() {
    this.$log(this.$store);
    this.$log(this.$router);
    this.$log(this.$firebase);
  },
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

<style lang="scss" scoped>
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

.el-aside {
  color: #333;
}
</style>
