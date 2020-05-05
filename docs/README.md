# Maestro

## Installation

```bash
$ yarn add element-ui maestro
```
or
```bash
$ npm i element-ui maestro
```

### Theme

When using a custom theme, you can import a scss file by providing it in the `theme` option
of Maestro

```javascript
initializeApp(Vue, App, { store, router, firebase, theme: require('@/theme/theme.scss') })
```

where `theme.scss` is your base theme file. You must at least provide a valid font path and a theme to extends.
You must also create a `vars.scss` file if you want to override any of the base Element UI colors. 

Here is a basic valid `theme.scss` file with some colors overridden in `vars.scss`

```scss
// @/theme/vars.scss

$--color-primary: violet;
$--font-path: '~element-ui/lib/theme-chalk/fonts';

// Important: it should be the last thing to be imported, 
// to correctly overrides colors
@import "~maestro/src/styles/vars";
```

```scss
// @/theme/theme.scss

// Import your vars scss file
@import "./vars";

// The element UI theme to use
@import "node_modules/element-ui/packages/theme-chalk/src/index";
```

If you want to use those variables in your .vue components, you can 
extends the `vue.config.js` like this

```js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/theme/vars.scss";
        `
      }
    }
  }
};
```

If you wanna see the full reference of what you can overrides, [see here](https://github.com/ElementUI/theme-chalk/blob/master/src/common/var.scss)
