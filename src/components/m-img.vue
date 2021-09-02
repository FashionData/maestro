<template>
  <el-image
    :src="src"
    :alt="alt"
    :fit="fit"
    :preview-src-list="previewSrcList"
    :lazy="lazy"
    :scroll-container="scrollContainer"
    class="m-img"
    :class="{ 'm-img--rounded': rounded }"
    :style="{ width: imgWidth, height: imgHeight, borderRadius }"
  >
    <template #error>
      <div class="loading-error" :style="{ minHeight: imgWidth }">
        <i class="ri-file-warning-line" />
        <p v-if="alt">{{ alt }}</p>
      </div>
    </template>
  </el-image>
</template>

<script>
const sizes = {
  small: 'small',
  medium: 'medium',
  large: 'large',
  extraLarge: 'extra-large',
};

export default {
  name: "m-img",
  props: {
    src: { type: String, required: true },
    alt: { type: String },
    size: { type: String, validator: (value) => Object.values(sizes).includes(value), default: sizes.medium },
    fit: { type: String, validator: (value) => ['fill', 'contain', 'cover', 'none', 'scale-down'].includes(value) },
    previewSrcList: { type: Array },
    lazy: { type: Boolean },
    scrollContainer: { type: [String, HTMLElement] },
    width: { type: String },
    borderRadius: { type: String },
    rounded: { type: Boolean },
  },
  computed: {
    imgWidth() {
      if (!this.size) return '';
      if (this.width) return this.width;

      switch (this.size) {
        case sizes.small:
          return '4.5rem';
        case sizes.medium:
          return '7rem';
        case sizes.large:
          return '12rem';
        case sizes.extraLarge:
          return '19rem';
      }
    },
    imgHeight() {
      return this.rounded ? this.imgWidth : 'auto';
    }
  }
};
</script>
