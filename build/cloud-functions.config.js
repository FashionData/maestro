import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { baseConfig } from "./base.config";

export const cloudFunctionsConfig = {
  input: 'src/cloud-functions/index.ts',
  output: {
    compact: true,
    file: 'dist/cloud-functions/index.js',
    format: 'cjs',
  },
  plugins: [
    baseConfig.plugins.resolve,
    babel(baseConfig.plugins.babel),
    commonjs(),
  ],
};
