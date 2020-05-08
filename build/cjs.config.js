import vue from "rollup-plugin-vue";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { external, baseConfig, globals } from "./base.config";

export const umdConfig = {
  ...baseConfig,
  external,
  output: {
    compact: true,
    file: 'dist/maestro.ssr.js',
    format: 'cjs',
    name: 'Maestro',
    exports: 'named',
    globals,
  },
  plugins: [
    ...baseConfig.plugins.preVue,
    baseConfig.plugins.resolve,
    vue({
      ...baseConfig.plugins.vue,
      template: {
        ...baseConfig.plugins.vue.template,
        optimizeSSR: true,
      },
    }),
    babel(baseConfig.plugins.babel),
    commonjs(),
  ],
};
