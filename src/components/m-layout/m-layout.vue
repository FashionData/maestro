<template>
  <el-container style="height: 100vh;">
    <account-chooser
      v-if="
        $store.getters.isAuthenticated &&
          $store.getters.selectedAccount === null
      "
    />
    <template v-if="$store.getters.selectedAccount !== null">
      <aside-component>
        <template #header-extended>
          <slot name="header-extended" />
        </template>

        <template #header-collapse>
          <slot name="header-collapse" />
        </template>

        <template #menu-items>
          <slot name="menu-items" />
        </template>
      </aside-component>

      <container-component>
        <slot name="content" />
      </container-component>
    </template>
  </el-container>
</template>

<script>
import AsideComponent from "@/components/m-layout/aside-component.vue";
import ContainerComponent from "@/components/m-layout/container-component.vue";
import AccountChooser from "@/components/m-layout/account-chooser.vue";

export default {
  name: "m-layout",
  components: { AccountChooser, ContainerComponent, AsideComponent },
  beforeCreate() {
    const accountsRole = this.$store.getters.user.accountsRole;

    if (!this.$store.getters.selectedAccount && accountsRole.length === 1) {
      this.$store.dispatch("chooseAccount", accountsRole[0].identifier);
    }
  }
};
</script>
