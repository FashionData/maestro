import path from "path";
import replace from "@rollup/plugin-replace";
import alias from "@rollup/plugin-alias";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";

const projectRoot = path.resolve(__dirname, '..');
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json', '.scss'];

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
export const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'element-ui',
  'vue'
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
// Provide global variable names to replace your external imports (eg. jquery: '$')
export const globals = {
  'element-ui': 'Element',
  vue: 'Vue',
};

export const baseConfig = {
  input: 'src/main.ts',
  plugins: {
    preVue: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      alias({
        resolve: extensions,
        entries: {
          '@': path.resolve(projectRoot, 'src'),
        },
      }),
      json(),
      postcss(),
    ],
    vue: {
      css: true,
      template: {
        isProduction: true,
      },
    },
    babel: {
      exclude: 'node_modules/**',
      extensions
    },
    resolve: resolve({
      mainFields: ['module', 'main', 'jsnext:main', 'browser'],
      extensions
    }),
  },
};
