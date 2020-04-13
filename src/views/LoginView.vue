<template>
  <div>
    <el-button @click="authenticateUser">LOGIN</el-button>
  </div>
</template>

<script>
export default {
  name: "login-view",
  methods: {
    authenticateUser() {
      this.$store.commit("authenticateUser");
    }
  }
};
</script>
