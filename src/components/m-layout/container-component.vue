<template>
  <el-container>
    <el-header class="header">
      <div class="account__name">
        <p v-if="$store.getters.user.accountsRole.length === 1">{{ $store.getters.selectedAccount.name }}</p>
        <a
          v-else
          :title="$t('account-chooser.change-account')"
          class="account__name__link"
          @click.prevent="changeAccount"
        >
          {{ $store.getters.selectedAccount.name }}
        </a>
      </div>

      <!--
      <i class="el-icon-search" />
      <i class="el-icon-bell" />
      <i class="el-icon-chat-square" />
      <i class="el-icon-star-off" />
      -->

      <el-dropdown>
        <el-avatar class="avatar" :src="$store.getters.user.photoURL" />

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link :to="{ name: userRouteName }">
              {{ $t("m-layout.container-component.dropdown-menu.profile") }}
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link :to="{ name: logoutRouteName }">
              {{ $t("m-layout.container-component.dropdown-menu.logout") }}
            </router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-main style="padding: 0">
      <header v-if="title" class="main-header">
        <h1 class="title">{{ title }}</h1>
      </header>

      <div class="main">
        <slot />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { LOGOUT, PROFILE } from "../../constants/routes";

export default {
  name: "container-component",
  methods: {
    changeAccount() {
      this.$store.dispatch("clearAccount");
    }
  },
  computed: {
    userRouteName() {
      return PROFILE.name;
    },
    logoutRouteName() {
      return LOGOUT.name;
    },
    title() {
      const formattedPath = this.$route.path
        .replace("/", "")
        .replace(/[^\w\s]/gi, " ");
      return formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1);
    }
  }
};
</script>
