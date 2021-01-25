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
            :class="{ [display.icon]: true, 'active': displayType === display.type }"
            @click="setDisplayType(display.type)"
          />
        </template>
      </div>
    </div>

    <div v-loading="loading">
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
              <div class="column" :class="{ 'text--primary bold': header.textPrimary }" :style="{ width: columnWidth }">
                <slot
                  v-if="$scopedSlots[`table.item.${header.value}`]"
                  :name="`table.item.${header.value}`"
                  v-bind:index="index"
                  v-bind:header="header"
                  v-bind:item="item"
                />
                <p v-else>
                  {{ getItemValue(item, header.value) }}
                </p>
              </div>
            </template>
          </div>
        </RecycleScroller>
      </div>

      <div v-if="displayType === 'cards'" class="cards-display">
        <div class="headers mb-6" :class="{ 'headers--expandable-cards': $scopedSlots['cards.item.extended'] }">
          <div
            v-for="header in headers"
            :key="header.value"
            class="text--info text--uppercase"
            :style="{ width: columnWidth }"
          >
            {{ header.text }}
          </div>
        </div>

        <DynamicScroller
          :items="items"
          :min-item-size="cardSize"
          :style="{ height }"
          v-slot="{ index, item }"
        >
          <DynamicScrollerItem :item="item" active class="pb-10">
            <el-card
              body-style="display: flex; align-items: center; padding: 0; height: 100%;"
              :style="{ height: `${cardSize}px` }"
            >
              <div>
                <el-button
                  v-if="$scopedSlots['cards.item.extended']"
                  :type="extentedCardIndex === index ? 'primary' : 'default'"
                  size="small"
                  icon="ri-arrow-right-s-line ri-lg"
                  circle
                  class="expandable-button p-1"
                  :class="{ 'expandable-button--active': extentedCardIndex === index }"
                  @click="toggleCardExtension(index, item)"
                />
              </div>

              <template v-for="header in headers" :style="{ width: columnWidth }">
                <div
                  class="column"
                  :class="{ 'text--primary bold': header.textPrimary }"
                  :style="{ width: columnWidth }"
                >
                  <slot
                    v-if="$scopedSlots[`cards.item.${header.value}`]"
                    :name="`cards.item.${header.value}`"
                    v-bind:index="index"
                    v-bind:header="header"
                    v-bind:item="item"
                  />
                  <p v-else>
                    {{ getItemValue(item, header.value) }}
                  </p>
                </div>
              </template>
            </el-card>

            <div class="card-expansion" v-if="extentedCardIndex === index">
              <slot name="cards.item.extended" v-bind:item="item" />
            </div>
          </DynamicScrollerItem>
        </DynamicScroller>
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
    defaultDisplays: {
      type: Array,
      default: () => ['table'],
    },
    loading: Boolean,
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
    cardSize: {
      type: Number,
      default: 84,
    },
    gridItemSize: {
      type: Number,
      default: 256,
    },
  },
  data: () => ({
    displayType: '',
    extentedCardIndex: null,
  }),
  computed: {
    displays() {
      return [
        ...(this.defaultDisplays.includes('table') ? [{ type: 'table', icon: 'ri-table-line' }] : []),
        ...(this.defaultDisplays.includes('cards') ? [{ type: 'cards', icon: 'ri-layout-row-line' }] : []),
        ...(this.defaultDisplays.includes('grid') ? [{ type: 'grid', icon: 'ri-grid-fill' }] : []),
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
  created() {
    this.displayType = this.defaultDisplays[0];
  },
  methods: {
    emitResetFilters() {
      this.$emit('on-filters-reset')
    },
    setDisplayType(type) {
      this.displayType = type;
    },
    getItemValue(item, headerValue) {
      const splitHeaderValue = headerValue.split('.');
      if (splitHeaderValue.length === 1) {
        return item[headerValue];
      } else {
        return Object.byString(item, headerValue);
      }
    },
    toggleCardExtension(index, item) {
      this.extentedCardIndex = this.extentedCardIndex === index ? null : index;
      this.$emit('on-card-extend-toggle', { isExtended: this.extentedCardIndex === index, item });
    }
  }
};
</script>
