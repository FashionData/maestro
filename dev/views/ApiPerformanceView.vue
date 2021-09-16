<template>
  <div>
    <p>Hello</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "api-performance-view",
  mounted() {
    this.$get('test/somedata');
  }
};
</script>
