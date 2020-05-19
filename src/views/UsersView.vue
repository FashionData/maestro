<template>
  <div>
    <p v-if="isLoading">Loading...</p>

    <template v-else>
      <p>USER Listing</p>
      <pre>{{ users }}</pre>
    </template>
  </div>
</template>

<script>
export default {
  name: "users-view",
  data() {
    return {
      users: {},
      isLoading: false
    };
  },
  mounted() {
    this.isLoading = true;

    this.$httpsCallableFunction("getAllUsers", {}).then(res => {
      this.users = res.data.users;
      this.isLoading = false;
    });
  }
};
</script>
