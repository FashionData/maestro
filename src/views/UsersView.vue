<template>
  <div>
    <p v-if="isLoading">Loading...</p>

    <template v-else>
      <p>USER Listing</p>
      <pre>{{ users }}</pre>
    </template>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";

export default {
  name: "users-view",
  data() {
    return {
      users: {},
      isLoading: false
    }
  },
  mounted(): void {
    this.isLoading = true;

    this.$httpsCallableFunction("getAllUsers", {}).then((res: firebase.functions.HttpsCallableResult) => {
      this.users = res.data.users;
      this.isLoading = false;
    })
  }
};
</script>
