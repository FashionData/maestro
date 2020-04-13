<template>
  <div>
    <el-button @click="authenticateUser">LOGIN</el-button>
  </div>
</template>

<script>
import { HOME } from "@/constants/router/routes-names";

export default {
  name: "login-view",
  methods: {
    authenticateUser() {
      this.$store.dispatch("authenticateUser").then(() => {
        // TODO: Push to home or redirect via url params
        this.$router.push(this.$route.query.redirect.toString() || { name: HOME });
      });
    }
  }
};
</script>
