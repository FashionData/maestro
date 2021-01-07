<template>
  <RecycleScroller class="scroller" :items="list" :item-size="40" key-field="id" v-slot="{ item }">
    <div class="user">
      <p>{{ item }}</p>
      <el-button @click="test">CLICK</el-button>
    </div>
  </RecycleScroller>
</template>

<script>
export default {
  name: "m-virtual-displays",
  props: {
    list: {
      type: Array,
      required: true,
    }
  },
  methods: {
    test: () => {
      console.log('HELLO CLICK');
    }
  }
};
</script>

<style scoped>
.scroller {
  height: 80vh;
  background-color: red;
}

.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>
