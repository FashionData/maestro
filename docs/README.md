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

Here is a basic valid `theme.scss` file

```
// @/theme.theme.scss
$--font-path: '~element-ui/lib/theme-chalk/fonts' !default;

@import "node_modules/element-ui/packages/theme-chalk/src/index";
```

If you wanna see the full reference of what you can overrides, [see here](https://github.com/ElementUI/theme-chalk/blob/master/src/common/var.scss)
