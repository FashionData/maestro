<template>
  <div>
    <el-button @click="increment">{{ text }}</el-button>
  </div>
</template>

<script>
export default {
  name: "m-counter",
  computed: {
    times() {
      return this.$store.getters.counter > 1 ? "times" : "time";
    },
    text() {
      return `I have been clicked ${this.$store.getters.counter} ${this.times}`;
    },
  },
  methods: {
    increment() {
      this.$store.commit("increment");
    },
  },
};
</script>
