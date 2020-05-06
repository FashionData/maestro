module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "./dev/theme/vars.scss";
          @import "@/styles/app.scss";
        `
      }
    }
  }
};
