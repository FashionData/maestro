<template>
  <div>
    <m-virtual-displays
      :custom-displays="customDisplays"
      :headers="headers"
      :items="filteredItems"
      @on-filters-reset="onFiltersReset"
    >
      <template #filters>
        <el-input v-model="search" />
      </template>

      <template v-slot:item.test1="{ header, item }">
        <p>Hello</p>
      </template>

      <template v-slot:item.actions="{ header, item }">
        <el-button>Hello</el-button>
      </template>

      <template v-slot:displays.custom="{ item }">
        <p>CUSTOM DISPLAY</p>
      </template>

      <template v-slot:displays.map="{ item }">
        <p>MAP</p>
      </template>
    </m-virtual-displays>
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
    customDisplays() {
      return [
        { type: 'custom', icon: 'ri-grid-line' },
        { type: 'map', icon: 'ri-map-line' },
      ]
    },
    headers() {
      return [
        { text: 'Name', value: 'name' },
        { text: 'Test 1', value: 'test1' },
        { text: 'Test 2', value: 'test2', textPrimary: true },
        { text: 'Test 3', value: 'test3' },
        { text: 'Test 4', value: 'test4', textPrimary: true },
        { text: 'Test 5', value: 'test5' },
        { text: 'Test 6', value: 'test6' },
        { text: '', value: 'actions' },
      ];
    },
    items() {
      const list = [];
      for (let i = 0; i < 10000; i++) list.push({
        id: i,
        name: `test-${i}`,
        test1: 'test1',
        test2: 'test2',
        test3: 'test3',
        test4: 'test4',
        test5: 'test5',
        test6: 'test6',
      });
      return list;
    },
    filteredItems() {
      return this.search.length > 0 ? this.items.filter(item => item.name.includes(this.search)) : this.items;
    }
  },
  methods: {
    onFiltersReset() {
      this.search = '';
    }
  }
};
</script>
