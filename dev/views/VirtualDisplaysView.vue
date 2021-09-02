<template>
  <div>
    <m-virtual-displays
      :default-displays="['table', 'cards', 'grid']"
      :custom-displays="customDisplays"
      :headers="headers"
      :items="filteredItems"
      @on-filters-reset="onFiltersReset"
      @on-card-extend-toggle="onCardExtendToggle"
    >
      <template #filters>
        <el-input v-model="search" />
      </template>

      <template v-slot:table.item.test1="{ index, header, item }">
        <p>Hello {{ index }}</p>
      </template>

      <template v-slot:table.item.actions="{ header, item }">
        <el-button>Hello</el-button>
      </template>

      <template v-slot:cards.item.actions="{ header, item }">
        <el-button>Hello</el-button>
      </template>

      <template v-slot:cards.item.extended="{ header, item }">
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <el-button>Button</el-button>
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
import MVirtualDisplays from "../../src/components/m-virtual-displays.vue";

export default {
  name: "virtual-displays-view",
  components: { MVirtualDisplays },
  data: () => ({
    activeNames: [],
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
        { text: 'Name', value: 'name', width: 180 },
        { text: 'Long title test 1', value: 'test1' },
        { text: 'Test 2', value: 'test2', textPrimary: true },
        { text: 'Test 3', value: 'test3' },
        { text: 'Test 4', value: 'test4', textPrimary: true },
        { text: 'Test 5', value: 'test5', width: 240 },
        { text: 'Test 6', value: 'test6.value.value2[1]' },
        { text: '', value: 'actions' },
      ];
    },
    items() {
      const list = [];
      for (let i = 0; i < 10000; i++) list.push({
        id: i,
        name: `test-${i}`,
        test1: 'test1',
        test2: 'test2test2test2test2test2test2test2',
        test3: 'test3',
        test4: 'test4',
        test5: 'test5',
        test6: {
          value: {
            value2: ['nested-test1', 'nested-test2']
          }
        },
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
    },
    onCardExtendToggle({ isExtended, item }) {
      console.log(isExtended, item);
    }
  }
};
</script>
