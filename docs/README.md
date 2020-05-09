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
- `firebase`

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
