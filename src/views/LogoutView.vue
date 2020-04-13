<template>
  <div></div>
</template>

<script>
export default {
  name: "logout-view",
  activated() {
    this.$store.commit("logout");
  }
};
</script>
