<template>
  <el-aside :width="asideWidth" class="aside-wrapper">
    <el-header
      class="aside-menu-header d-flex justify-space-between align-center"
      :class="{ 'aside-menu-header--collapse': isCollapse }"
    >
      <router-link to="/" class="logo-wrapper">
        <slot v-if="isCollapse" name="header-collapse" />
        <slot v-else name="header-extended" />
      </router-link>

      <i
        v-if="!isToNarrow"
        class="cursor--pointer"
        :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"
        @click="toggleCollapse"
      />
    </el-header>

    <el-card shadow="none" class="aside-menu" :class="{ 'aside-menu--collapsed': isCollapse }">
      <el-menu router :collapse="isCollapse" class="separated-blocks">
        <slot name="menu-items" />

        <el-submenu v-if="isSuperAdmin" index="1" class="bottom-menu-items">
          <template slot="title">
            <i class="ri-settings-3-line" />
            <span>{{ $t("layouts.logged-in.menu-items.settings.title") }}</span>
          </template>

          <el-menu-item :index="userPath">
            <i class="ri-user-3-line" />
            <span>{{ $t("layouts.logged-in.menu-items.settings.users") }}</span>
          </el-menu-item>
          <el-menu-item :index="accountPath">
            <i class="el-icon-goods" />
            <span slot="title">{{ $t("aside.accounts") }}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-card>
  </el-aside>
</template>

<script>
import { ACCOUNTS, Roles, USERS } from "@/constants";

const BREAKPOINT = 980;

export default {
  name: "aside-component",
  data() {
    return {
      isCollapse: false,
      isToNarrow: false,
    };
  },
  mounted() {
    this.checkAutoCollapse();
    window.addEventListener('resize', this.checkAutoCollapse, true);
  },
  computed: {
    asideWidth() {
      return this.isCollapse ? '64px' : '250px';
    },
    isSuperAdmin() {
      return this.$isGranted(Roles.SuperAdmin);
    },
    userPath: () => USERS.path,
    accountPath: () => ACCOUNTS.path,
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    checkAutoCollapse() {
      if (!this.isCollapse && document.body.clientWidth <= BREAKPOINT) {
        this.isCollapse = true;
        this.isToNarrow = true;
      } else if (this.isCollapse && document.body.clientWidth > BREAKPOINT) {
        this.isCollapse = false;
        this.isToNarrow = false;
      }
    },
  },
};
</script>
