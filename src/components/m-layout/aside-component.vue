<template>
  <el-aside :width="asideWidth">
    <el-menu router :collapse="isCollapse" class="aside-menu">
      <el-header
        class="aside-menu-header d-flex justify-space-between align-center"
        :class="{ 'aside-menu-header--collapse justify-center': isCollapse }"
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
          <i class="ri-settings-3-line" />
          <span>{{ $t("m-layout.aside-component.settings.title") }}</span>
        </template>

        <el-menu-item :index="userPath">
          <i class="ri-user-3-line" />
          <span slot="title">{{ $t("m-layout.aside-component.settings.users") }}</span>
        </el-menu-item>
        <el-menu-item index="/accounts">
          <i class="el-icon-goods"></i>
          <span slot="title">{{ $t("aside.accounts") }}</span>
        </el-menu-item>
      </el-submenu>

      <i
        v-if="isCollapse"
        class="expand-aside-menu-arrow el-icon-arrow-right"
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
    asideWidth() {
      return this.isCollapse ? '64px' : '250px';
    },
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
