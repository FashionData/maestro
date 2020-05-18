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
			<!-- TODO: Add route constant -->
			<el-menu-item index="history">
				<i class="el-icon-menu"></i>
				<span slot="title">{{ $t('m-layout.aside-component.history') }}</span>
			</el-menu-item>

			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>{{ $t('m-layout.aside-component.settings.title') }}</span>
				</template>
				<el-menu-item :index="userPath">{{ $t('m-layout.aside-component.settings.users') }}</el-menu-item>
			</el-submenu>

			<slot />
		</el-menu>
	</el-aside>
</template>

<script lang="ts">
  import { USERS } from "@/constants";

  export default {
    name: "aside-component",
    data() {
      return {
        isCollapse: false,
      };
    },
		computed: {
      userPath: () => USERS.path
		}
	}
</script>
