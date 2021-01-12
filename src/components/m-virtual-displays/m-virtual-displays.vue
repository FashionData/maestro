<template>
  <div class="m-virtual-displays">
    <div class="d-flex justify-space-between mb-13">
      <div class="filters d-flex">
        <slot name="filters" />
      </div>

      <div class="actions d-flex align-center">
        <i v-if="hasFilters" class="ri-restart-line" @click="emitResetFilters" />
        <template v-if="displays.length > 1">
          <i
            v-for="display in displays"
            :key="display.type"
            :class="{ [display.icon]: true, 'active': displayType === display }"
            @click="setDisplayType(display.type)"
          />
        </template>
      </div>
    </div>

    <div v-if="displayType === 'table'" class="table-display">
      <div class="headers mb-6">
        <div
          v-for="header in headers"
          :key="header.value"
          class="text--info text--uppercase"
          :style="{ width: columnWidth }"
        >
          {{ header.text }}
        </div>
      </div>

      <RecycleScroller
        :items="items"
        :item-size="tableItemSize"
        :key-field="keyField"
        :style="{ height }"
        v-slot="{ index, item }"
      >
        <div class="row" :style="{ height: `${tableItemSize}px` }">
          <template v-for="header in headers" :style="{ width: columnWidth }">
            <div class="column" :style="{ width: columnWidth }">
              <slot
                v-if="$scopedSlots[`item.${header.value}`]"
                :name="`item.${header.value}`"
                v-bind:index="index"
                v-bind:header="header"
                v-bind:item="item"
              />
              <p v-else :class="{ 'text--primary': header.textPrimary }">{{ item[header.value] }}</p>
            </div>
          </template>
        </div>
      </RecycleScroller>
    </div>

    <RecycleScroller
      v-if="displayType === 'grid'"
      :items="items"
      :item-size="gridItemSize"
      key-field="id"
      :style="{ height }"
      v-slot="{ item }"
    >
      <el-card class="card">
        <pre>{{ item }}</pre>
        <el-button>CLICK</el-button>
      </el-card>
    </RecycleScroller>

    <template v-for="customDisplay in customSlots">
      <div v-if="customDisplay === `displays.${displayType}`" :key="customDisplay">
        <slot :name="customDisplay" />
      </div>
    </template>
  </div>
</template>

<script>
/**
 * TODO: Add props
 * - item-size: Multiple value for different displays
 * - displays: To show button displays
 */

export default {
  name: "m-virtual-displays",
  props: {
    customDisplays: Array,
    headers: {
      type: Array,
      required: true,
    },
    height: {
      type: String,
      default: '60vh',
    },
    items: {
      type: Array,
      required: true,
    },
    keyField: {
      type: String,
      default: 'id',
    },
    tableItemSize: {
      type: Number,
      default: 84,
    },
    gridItemSize: {
      type: Number,
      default: 256,
    },
  },
  data: () => ({
    displayType: 'table'
  }),
  computed: {
    displays() {
      return [
        { type: 'table', icon: 'ri-table-line' },
        // TODO: Use grid display by default `{ type: 'grid', icon: 'ri-grid-fill' }`,
        ...(this.customDisplays ? this.customDisplays : []),
      ];
    },
    hasFilters() {
      return this.$slots.filters;
    },
    columnWidth() {
      return `${100 / Object.values(this.headers[0]).length}%`;
    },
    currentDisplay() {
      return this.displays.find(display => display.type === this.displayType);
    },
    customSlots() {
      return Object.keys(this.$scopedSlots).filter(slotName => slotName.includes('displays.'));
    }
  },
  methods: {
    emitResetFilters() {
      this.$emit('on-filters-reset')
    },
    setDisplayType(type) {
      this.displayType = type;
    },
  }
};
</script>
