<template>
  <div></div>
</template>

<script>
import { LOGIN } from "@/constants/routes";

export default {
  name: "logout-view",
  activated() {
    this.$firebase.auth().signOut();
    this.$store.dispatch("logout").then(() => {
      this.$router.push({ name: LOGIN.name });
    });
  },
};
</script>
