import fs from "fs";
import vue from "rollup-plugin-vue";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { baseConfig, external } from "./base.config";

const esbrowserslist = fs.readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

export const esConfig = {
  ...baseConfig,
  external,
  output: {
    file: 'dist/maestro.esm.js',
    format: 'esm',
    exports: 'named',
  },
  plugins: [
    ...baseConfig.plugins.preVue,
    baseConfig.plugins.resolve,
    vue(baseConfig.plugins.vue),
    babel({
      ...baseConfig.plugins.babel,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: esbrowserslist,
          },
        ],
      ],
    }),
    commonjs()
  ],
};
