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
        this.$router.push(this.$route.query.redirect ? this.$route.query.redirect.toString() : { name: HOME });
      });
    }
  }
};
</script>
