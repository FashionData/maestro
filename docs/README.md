# Maestro

## Installation
### Add to project
```bash
$ yarn add element-ui maestro
```
or
```bash
$ npm i element-ui maestro
```

### Use in your Vue application
Considering that your already have:
- `vuex`
- `vue-router`
- `firebase` (Explain analytics + performance associated in config part)

```javascript
// src/main.js

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { initializeApp } from "maestro";
import * as firebase from "firebase";

import "./config/firebase"; // Firebase initialization

Vue.config.productionTip = false;

initializeApp(Vue, App, { store, router, firebase });
```

You now have a running application 🎉

#### Configuration
You can use `config` to modify maestro behavior inside of your project :
`initializeApp(Vue, App, { store, router, firebase, config: { ... } });`

List of options:
- `analytics`: Add firebase analytics (must have `appId`) provided wile you configured firebase inside of your project
- `performance`: Add firebase performance (must have `measurementId`) provided wile you configured firebase inside of your project => Expose `$perf` into Vue instance.



### Typescript
To extends the Vue prototypes types, you must include a *.d.ts file in your
project root. For example, you could add a `maestro-env.d.ts` with the following content:

```typescript
/// <reference types="maestro" />
/// <reference types="maestro/shims-vue" />
```

It uses the Typescript [Triple Slash Directives](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-types-) to 
references maestro's types in your own Vue instance. Then, you should add an entry in your `tsconfig.json`

```json
{
  ...
  "include": [
    "maestro-env.d.ts"
  ]
}
```

You now have access to the types that maestro adds in your Vue instance (e.g `this.$firebase`) when 
creating component in your application

### Theme
#### Default
Import sass file into your `main.js` that imports maestro default theme.
```scss
@import '~maestro/src/styles/theme/index';
```

If you want to override variables (for colors erc...) you just have to add them before importing ` ~maestro/src/styles/theme/index`

Please refer to [this file](https://github.com/ElemeFE/element/blob/dev/packages/theme-chalk/src/common/var.scss) to see available variables.

#### Custom
If you want to start from scratch, you don't have to import any scss file, so you can start building your own custom theme.

#### Use scss variables into .vue files
If you want to use scss variables in your .vue components, you can extend the `vue.config.js` like this

```javascript
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/theme/vars.scss"; // File that import your custom variables
          // OR
          @import "~maestro/src/styles/theme/common/vars"; // For none overridden default theme  
        `
      }
    }
  }
};
```
