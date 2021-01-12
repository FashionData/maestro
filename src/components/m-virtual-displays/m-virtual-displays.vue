<template>
  <div class="m-virtual-displays">
    <div class="d-flex justify-space-between mb-13">
      <div class="filters d-flex">
        <slot name="filters" />
      </div>

      <div class="actions d-flex align-center">
        <i v-if="showResetFiltersButton" class="ri-restart-line" @click="emitResetFilters" />
        <i
          class="ri-table-line"
          :class="{ 'active': displayType === 'table' }"
          @click="setDisplayType('table')"
        />
        <i
          class="ri-grid-fill"
          :class="{ 'active': displayType === 'cards' }"
          @click="setDisplayType('cards')"
        />
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
        :item-size="84"
        key-field="id"
        :style="{ height: '85vh' }"
        v-slot="{ item }"
      >
        <div class="row" :style="{ height: `${84}px` }">
          <template v-for="header in headers" :style="{ width: columnWidth }">
            <div class="column" :style="{ width: columnWidth }">
              <slot
                v-if="$scopedSlots[`item.${header.value}`]"
                :name="`item.${header.value}`"
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
      v-if="displayType === 'cards'"
      :items="items"
      :item-size="256"
      key-field="id"
      :style="{ height: '85vh' }"
      v-slot="{ item }"
    >
      <el-card class="card">
        <pre>{{ item }}</pre>
        <el-button>CLICK</el-button>
      </el-card>
    </RecycleScroller>
  </div>
</template>

<script>
/**
 * TODO: Add props
 * - height: for table height
 * - item-size: Multiple value for different displays
 * - displays: To show button displays
 * - key-field: For scroller
 */

export default {
  name: "m-virtual-displays",
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    }
  },
  data: () => ({
    displayType: 'table'
  }),
  computed: {
    showResetFiltersButton() {
      return this.$slots.filters;
    },
    columnWidth() {
      return `${100 / Object.values(this.headers[0]).length}%`;
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
