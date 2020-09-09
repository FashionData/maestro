<template>
  <el-aside :width="isCollapse ? '64px' : '250px'">
    <el-menu router :collapse="isCollapse" class="d-flex flex-column">
      <el-header
        class="menu-header d-flex justify-space-between align-center"
        :class="{ 'menu-header--collapse justify-center': isCollapse }"
      >
        <router-link to="/" class="logo-wrapper">
          <slot v-if="isCollapse" name="header-collapse" />
          <slot v-else name="header-extended" />
        </router-link>

        <i
          v-if="!isCollapse"
          class="el-icon-arrow-left"
          @click="toggleCollapse"
        />
      </el-header>

      <slot name="menu-items" />

      <el-submenu v-if="isSuperAdmin" index="1">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>{{ $t("m-layout.aside-component.settings.title") }}</span>
        </template>

        <el-menu-item :index="userPath">
          <i class="el-icon-user"></i>
          <span slot="title">
            {{ $t("m-layout.aside-component.settings.users") }}</span
          >
        </el-menu-item>
        <el-menu-item index="/accounts">
          <i class="el-icon-goods"></i>
          <span slot="title">{{ $t("aside.accounts") }}</span>
        </el-menu-item>
      </el-submenu>

      <i
        v-if="isCollapse"
        class="expand-menu-arrow el-icon-arrow-right"
        @click="toggleCollapse"
      />
    </el-menu>
  </el-aside>
</template>

<script>
import { Roles, USERS } from "@/constants";

export default {
  name: "aside-component",
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {
    isSuperAdmin() {
      return this.$isGranted(Roles.SuperAdmin);
    },
    userPath: () => USERS.path
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>
