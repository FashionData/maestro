// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

module.exports = {
  // configureWebpack: {
  //   plugins: [new BundleAnalyzerPlugin()],
  // },
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        prependData: `@import "~@/scss/app.scss";`,
      },
    },
  },
};
