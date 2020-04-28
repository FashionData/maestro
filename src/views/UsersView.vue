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
import Vue from "vue";
import HttpsCallableResult = firebase.functions.HttpsCallableResult;

export default Vue.extend({
  name: "users-view",
  data() {
    return {
      users: {},
      isLoading: false
    }
  },
  mounted(): void {
    this.isLoading = true;

    this.$httpsCallableFunction("getAllUsers", {}).then((res: HttpsCallableResult) => {
      this.users = res.data.users;
      this.isLoading = false;
    })
  }
});
</script>
