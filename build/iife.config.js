import vue from "rollup-plugin-vue";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { baseConfig, external, globals } from "./base.config";
import { terser } from "rollup-plugin-terser";

export const unpkgConfig = {
  ...baseConfig,
  external,
  output: {
    compact: true,
    file: 'dist/maestro.min.js',
    format: 'iife',
    name: 'Maestro',
    exports: 'named',
    globals,
  },
  plugins: [
    ...baseConfig.plugins.preVue,
    baseConfig.plugins.resolve,
    vue(baseConfig.plugins.vue),
    babel(baseConfig.plugins.babel),
    commonjs(),
    terser({
      output: {
        ecma: 5,
      },
    }),
  ],
};
