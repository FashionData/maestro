<template>
  <div>
    <p>USER PROFILE</p>

    <pre>{{ $store.getters.user }}</pre>
  </div>
</template>

<script>
export default {
  name: "user-profile",
};
</script>
