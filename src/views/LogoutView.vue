<template>
  <div />
</template>

<script>
import { LOGIN } from "@/constants/routes";

export default {
  name: "logout-view",
  // TODO: Use activated with keep alive & mounted for none keep alive app
  // TODO: Fix mounted call twice
  async mounted() {
    await this.$firebase.auth().signOut();
    await this.$store.dispatch("logout");
    await this.$router.push({ name: LOGIN.name });
  },
};
</script>
