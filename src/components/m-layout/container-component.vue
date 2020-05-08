<template>
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
						<!-- TODO: Translate with i18n -->
						<router-link :to="{ name: userRouteName }">Profile</router-link>
					</el-dropdown-item>
					<el-dropdown-item>
						<!-- TODO: Translate with i18n -->
						<router-link :to="{ name: logoutRouteName }">Logout</router-link>
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

<script lang="ts">
  import { LOGOUT, PROFILE } from "../../constants/router/routes";

  export default {
    name: "container-component",
    computed: {
      userRouteName() {
        return PROFILE.name;
      },
      logoutRouteName() {
        return LOGOUT.name;
      },
      title(): string {
        const formattedPath = this.$route.path.replace('/', '').replace(/[^\w\s]/gi, ' ')
        return formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1);
      }
    },
	}
</script>
