<template>
  <div></div>
</template>

<script>
import { LOGIN } from "@/constants/router/routes-names";

export default {
  name: "logout-view",
  activated() {
    this.$store.dispatch("logout").then(() => {
      this.$router.push({ name: LOGIN });
    });
  }
};
</script>
