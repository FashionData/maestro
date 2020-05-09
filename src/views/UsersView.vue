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
import firebase from "firebase";
import Component from "vue-class-component";

@Component({ name: 'users-view'})
export default class UsersView extends Vue {
      users: object = {}
      isLoading = false

  mounted(): void {
    this.isLoading = true;

    this.$httpsCallableFunction("getAllUsers", {}).then((res: firebase.functions.HttpsCallableResult) => {
      this.users = res.data.users;
      this.isLoading = false;
    })
  }
});
</script>
