import "./MButton.scss";

// import Themeable from '../../mixins/themeable'
// import mixins from '../../util/mixins'

/* @vue/component */
// export default mixins(
// Themeable
// ).extend({
export default {
  name: "m-button",
  computed: {
    // isDark (): boolean {
    //   return this.$vuetify.theme.dark
    // },
  },
  beforeCreate() {
    // if (!this.$vuetify || (this.$vuetify === this.$root as any)) {
    //   throw new Error('Vuetify is not properly initialized, see https://vuetifyjs.com/getting-started/quick-start#bootstrapping-the-vuetify-object')
    // }
  },
  render(h: any) {
    return h("div", "WORKING?");

    // const wrapper = h('div', { staticClass: 'v-application--wrap' }, this.$slots.default)

    // return h('div', {
    // staticClass: 'v-application',
    // class: {
    //   'v-application--is-rtl': this.$vuetify.rtl,
    //   'v-application--is-ltr': !this.$vuetify.rtl,
    //   ...this.themeClasses,
    // },
    // attrs: { 'data-app': true },
    // }, [wrapper])
  }
};
