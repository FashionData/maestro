<template>
	<el-aside width="auto">
		<el-header class="menu-header d-flex justify-space-between align-center" :class="{ 'justify-center': isCollapse }">
			<router-link to="/">
				<template v-if="isCollapse">X</template>
				<!-- TODO: Use package name (from consumer app) -->
				<template v-else>App Name</template>
			</router-link>

			<span @click="isCollapse = !isCollapse">
          <i v-if="isCollapse" class="el-icon-caret-right"></i>
          <i v-else class="el-icon-caret-left"></i>
        </span>
		</el-header>

		<el-menu :collapse="isCollapse" router>
			<el-menu-item index="history">
				<i class="el-icon-menu"></i>
				<!-- TODO: Translate with i18n -->
				<span slot="title">History</span>
			</el-menu-item>

			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>Configuration</span>
				</template>
				<el-menu-item-group title="Group One">
					<el-menu-item index="users">Users</el-menu-item>
				</el-menu-item-group>
			</el-submenu>

			<slot />
		</el-menu>
	</el-aside>
</template>

<script lang="ts">
  export default {
    name: "aside-component",
    data() {
      return {
        isCollapse: false,
      };
    },
	}
</script>

<style lang="scss">
	.menu-header,
	ul.el-menu {
		border: none;
		background-color: $--color-primary;

		& * {
			color: $--color-white;
		}

		.el-menu-item:hover,
		.el-menu-item:focus,
		.el-submenu__title:hover,
		.el-submenu__title:focus {
			background-color: $--color-primary-light-1;
		}
	}

	ul.el-menu {
		height: 100%;

		.el-menu-item {
			// color: $--color-white;
		}

		&:not(.el-menu--collapse) {
			width: 250px;
		}
	}
</style>
