<template>
  <div>
    <el-input v-model="search" />
    <m-virtual-displays :list="formattedList" />
  </div>
</template>

<script lang="ts">
import MVirtualDisplays from "../../src/components/m-virtual-displays/m-virtual-displays.vue";

export default {
  name: "virtual-displays-view",
  components: { MVirtualDisplays },
  data: () => ({
    search: '',
  }),
  computed: {
    list() {
      const list = [];
      for (let i = 0; i < 10000; i++) list.push({ name: `test-${i}`, id: i });
      return list;
    },
    formattedList() {
      console.log(this.search.length > 0);
      console.log(this.list);
      return this.search.length > 0 ? this.list.filter(item => item.name.includes(this.search)) : this.list;
    }
  }
};
</script>
