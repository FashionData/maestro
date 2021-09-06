<template>
  <div>
    <p>Hello</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "api-performance-view",
  mounted() {
    this.$http.get('test/somedata', {
      headers: {
        'Authorization': `Bearer ${this.$store.state['m-user'].user.stsTokenManager.accessToken}`
      }
    });
  }
};
</script>
