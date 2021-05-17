<template>
  <el-container>
    <el-header class="header">
      <div class="account__name">
        <p>{{ pageTitle }}</p>
      </div>

      <el-dropdown trigger="click">
        <el-avatar size="small" icon="ri-user-fill" :src="$store.getters.user.photoURL" class="cursor--pointer" />

        <el-dropdown-menu slot="dropdown" class="avatar-dropdown">
          <div class="pl-3 mt-1 mb-3">
            <span class="text--primary ml-1 fs--small bold">{{ userDisplayName }} - {{ selectedAccountName }}</span>
          </div>

          <el-dropdown-item
            v-for="(headerMenuItem, index) in headerMenuItems"
            :key="headerMenuItem.label"
            :divided="index === 0 || headerMenuItem.divided"
          >
            <router-link :to="{ name: headerMenuItem.routeName }" class="d-flex align-center cta--classic-text">
              <i class="text--primary fs--large" :class="headerMenuItem.icon"></i>
              <span class="ml-1 fs--small">{{ headerMenuItem.label }}</span>
            </router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-main style="padding: 0">
      <div class="main">
        <slot />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { LOGOUT, PROFILE } from "@/constants/routes";

export default {
  name: "container-component",
  methods: {
    changeAccount() {
      this.$store.dispatch("clearAccount");
    }
  },
  computed: {
    pageTitle() {
      const page = this.$route.path.split('/')[1];
      return this.$t(`layouts.logged-in.page-titles.${page || 'home'}`);
    },
    userDisplayName() {
      return this.$store.state['m-user'].user.displayName;
    },
    selectedAccountName() {
      return this.$store.getters.selectedAccount.name;
    },
    headerMenuItems() {
      return [
        {
          icon: 'ri-profile-line',
          label: this.$t('layouts.logged-in.header-menu.profile'),
          routeName: PROFILE.name,
        },
        (this.$store.getters.user.accountsRole.length > 1 && {
          icon: 'ri-user-settings-line',
          label: this.$t('layouts.logged-in.header-menu.change-account'),
          routeName: PROFILE.name,
        }),
        {
          divided: true,
          icon: 'ri-logout-box-r-line',
          label: this.$t('layouts.logged-in.header-menu.logout'),
          route: LOGOUT.name,
        },
      ];
    },
  }
};
</script>
