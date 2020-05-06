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

		<header v-if="title" class="main-header">
			<h1 class="title">{{ title }}</h1>
		</header>

		<el-main>
			<slot />
		</el-main>
	</el-container>
</template>

<script lang="ts">
	import Vue from 'vue';
  import { LOGOUT, PROFILE } from "../../constants/router/routes";

  export default Vue.extend({
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
	})
</script>

<style lang="scss">
	.header {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 20px;
		box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.06);

		& > * {
			margin-right: 17px;

			&:last-child {
				margin-right: 0;
			}
		}
	}

	.main-header {
		@extend .d-flex;
		@extend .align-center;

		padding: $--main-padding;
		min-height: 12rem;
		background-color: $--color-primary-light-9;

		.title {
			margin: 0;
		}
	}

	main.el-main {
		padding-top: $--main-padding * 2;
		padding-bottom: $--main-padding * 2;
	}
</style>
