'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var Vue=_interopDefault(require('vue')),Element=_interopDefault(require('element-ui'));function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var script = {
  name: "aside-component",
  data: function data() {
    return {
      isCollapse: false
    };
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('el-aside', {
    attrs: {
      "width": "auto"
    }
  }, [_c('el-header', {
    staticClass: "menu-header d-flex justify-space-between align-center",
    class: {
      'justify-center': _vm.isCollapse
    }
  }, [_c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_vm.isCollapse ? [_vm._v("X")] : [_vm._v("App Name")]], 2), _vm._v(" "), _c('span', {
    on: {
      "click": function click($event) {
        _vm.isCollapse = !_vm.isCollapse;
      }
    }
  }, [_vm.isCollapse ? _c('i', {
    staticClass: "el-icon-caret-right"
  }) : _c('i', {
    staticClass: "el-icon-caret-left"
  })])], 1), _vm._v(" "), _c('el-menu', {
    attrs: {
      "collapse": _vm.isCollapse,
      "router": ""
    }
  }, [_c('el-menu-item', {
    attrs: {
      "index": "history"
    }
  }, [_c('i', {
    staticClass: "el-icon-menu"
  }), _vm._v(" "), _c('span', {
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v("History")])]), _vm._v(" "), _c('el-submenu', {
    attrs: {
      "index": "1"
    }
  }, [_c('template', {
    slot: "title"
  }, [_c('i', {
    staticClass: "el-icon-location"
  }), _vm._v(" "), _c('span', [_vm._v("Configuration")])]), _vm._v(" "), _c('el-menu-item-group', {
    attrs: {
      "title": "Group One"
    }
  }, [_c('el-menu-item', {
    attrs: {
      "index": "users"
    }
  }, [_vm._v("Users")])], 1)], 2), _vm._v(" "), _vm._t("default")], 2)], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-8f4cd6e0";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);var HOME = {
  name: "home",
  path: "/"
};
var LOGIN = {
  name: "login",
  path: "/login"
};
var LOGOUT = {
  name: "logout",
  path: "/logout"
};
var USERS = {
  name: "users",
  path: "/users"
};
var PROFILE = {
  name: "profile",
  path: "/profile"
};
var NOT_FOUND = {
  name: "not-found",
  path: "*"
};var script$1 = {
  name: "container-component",
  computed: {
    userRouteName: function userRouteName() {
      return PROFILE.name;
    },
    logoutRouteName: function logoutRouteName() {
      return LOGOUT.name;
    },
    title: function title() {
      var formattedPath = this.$route.path.replace('/', '').replace(/[^\w\s]/gi, ' ');
      return formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1);
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('el-container', [_c('el-header', {
    staticClass: "header"
  }, [_c('i', {
    staticClass: "el-icon-search"
  }), _vm._v(" "), _c('i', {
    staticClass: "el-icon-bell"
  }), _vm._v(" "), _c('i', {
    staticClass: "el-icon-chat-square"
  }), _vm._v(" "), _c('i', {
    staticClass: "el-icon-star-off"
  }), _vm._v(" "), _c('el-dropdown', [_c('el-avatar', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.$store.getters.user.photoURL
    }
  }), _vm._v(" "), _c('el-dropdown-menu', {
    attrs: {
      "slot": "dropdown"
    },
    slot: "dropdown"
  }, [_c('el-dropdown-item', [_c('router-link', {
    attrs: {
      "to": {
        name: _vm.userRouteName
      }
    }
  }, [_vm._v("Profile")])], 1), _vm._v(" "), _c('el-dropdown-item', [_c('router-link', {
    attrs: {
      "to": {
        name: _vm.logoutRouteName
      }
    }
  }, [_vm._v("Logout")])], 1)], 1)], 1)], 1), _vm._v(" "), _c('el-main', {
    staticStyle: {
      "padding": "0"
    }
  }, [_vm.title ? _c('header', {
    staticClass: "main-header"
  }, [_c('h1', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.title))])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "main"
  }, [_vm._t("default")], 2)])], 1);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-16278f91";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);var script$2 = {
  name: "m-layout",
  components: {
    ContainerComponent: __vue_component__$1,
    AsideComponent: __vue_component__
  }
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('el-container', {
    staticStyle: {
      "height": "100vh"
    }
  }, [_c('aside-component', [_vm._t("aside")], 2), _vm._v(" "), _c('container-component', [_vm._t("content")], 2)], 1);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = "data-v-66230455";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);var components=/*#__PURE__*/Object.freeze({__proto__:null,MLayout: __vue_component__$2});var name = "maestro";
var version = "1.0.0";
var description = "";
var main = "dist/maestro.ssr.js";
var browser = "dist/maestro.esm.js";
var module$1 = "dist/maestro.esm.js";
var unpkg = "dist/maestro.min.js";
var types = "maestro.d.ts";
var files = ["dist", "cloud-functions.js", "cloud-functions.d.ts", "maestro.d.ts", "src/**/*.vue", "!src/dev"];
var scripts = {
  prepare: "install-peers",
  serve: "vue-cli-service serve dev/main.ts",
  "docs:dev": "vuepress dev docs",
  "docs:build": "vuepress build docs",
  build: "cross-env NODE_ENV=production rollup --config build/rollup.config.js",
  "build:ssr": "cross-env NODE_ENV=production rollup --config build/rollup.config.js --format cjs",
  "build:es": "cross-env NODE_ENV=production rollup --config build/rollup.config.js --format es",
  "build:unpkg": "cross-env NODE_ENV=production rollup --config build/rollup.config.js --format iife"
};
var devDependencies = {
  "@babel/core": "^7.7.7",
  "@babel/preset-env": "^7.7.7",
  "@babel/preset-typescript": "^7.7.7",
  "@rollup/plugin-alias": "^2.2.0",
  "@rollup/plugin-commonjs": "^11.0.1",
  "@rollup/plugin-json": "^4.0.3",
  "@rollup/plugin-node-resolve": "^7.1.3",
  "@rollup/plugin-replace": "^2.2.1",
  "@vue/cli-plugin-babel": "^4.1.0",
  "@vue/cli-plugin-typescript": "^4.1.0",
  "@vue/cli-service": "^4.1.0",
  "cross-env": "^6.0.3",
  firebase: "^7.14.2",
  "install-peers-cli": "^2.2.0",
  minimist: "^1.2.0",
  "node-sass": "^4.14.0",
  rollup: "^1.27.13",
  "rollup-plugin-babel": "^4.3.3",
  "rollup-plugin-postcss": "^3.1.1",
  "rollup-plugin-terser": "^5.1.3",
  "rollup-plugin-vue": "^5.1.5",
  "sass-loader": "^8.0.2",
  typescript: "^3.7.3",
  vue: "^2.6.10",
  "vue-router": "^3.1.6",
  "vue-template-compiler": "^2.6.10",
  vuepress: "^1.4.1",
  vuex: "^3.3.0"
};
var peerDependencies = {
  "element-ui": "^2.13.1",
  vue: "^2.6.10"
};
var engines = {
  node: ">=8"
};
var dependencies = {
  "vue-debounce": "^2.5.3"
};
var packageJson = {
  name: name,
  version: version,
  description: description,
  main: main,
  browser: browser,
  module: module$1,
  unpkg: unpkg,
  types: types,
  files: files,
  scripts: scripts,
  devDependencies: devDependencies,
  peerDependencies: peerDependencies,
  engines: engines,
  dependencies: dependencies
};var log = function log(value) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "warn";
  return console[type]("[".concat(packageJson.name.toUpperCase(), "]:"), value);
};
var error = function error(message) {
  throw new Error(message);
};var checkConfiguration = function checkConfiguration(options) {
  if (!options) error("Please provide default configuration.");
  if (!options.store) error("Please initialise plugin with a Vuex store.");
  if (!options.router) error("Please initialise plugin with a Vue Router.");
  if (!options.firebase) error("Please initialise plugin with Firebase.");
};var ID = "loading-app";
var injectLoader = function injectLoader() {
  var style = "\n  #loading-app {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100vw;\n    height: 100vh;\n  }\n  \n  .spinner {\n    animation: rotation 1.5s linear infinite;\n  }\n  \n  @keyframes rotation {\n    0% {\n      transform: rotate(0deg);\n    }\n    100% {\n      transform: rotate(270deg);\n    }\n  }\n  .path {\n    stroke-dasharray: 187;\n    stroke-dashoffset: 0;\n    transform-origin: center;\n    animation: dash 1.5s ease-in-out infinite;\n  }\n  \n  @keyframes dash {\n    0% {\n      stroke-dashoffset: 187;\n    }\n    50% {\n      stroke-dashoffset: 46.75;\n      transform: rotate(135deg);\n    }\n    100% {\n      stroke-dashoffset: 187;\n      transform: rotate(450deg);\n    }\n  }";
  var html = "\n  <div id=\"".concat(ID, "\">\n    <svg class=\"spinner\" width=\"65px\" height=\"65px\" viewBox=\"0 0 66 66\" xmlns=\"http://www.w3.org/2000/svg\">\n      <circle class=\"path\" fill=\"none\" stroke-width=\"6\" stroke=\"#03A9F4\" stroke-linecap=\"round\" cx=\"33\" cy=\"33\" r=\"30\"></circle>\n    </svg>\n  </div>\n  ");
  var styleElement = document.createElement('style');
  styleElement.innerText = style;
  document.head.appendChild(styleElement);
  document.body.insertAdjacentHTML('afterbegin', html);
};
var removeLoader = function removeLoader() {
  var _document$getElementB;

  (_document$getElementB = document.getElementById(ID)) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.remove();
};var REGION = "europe-west1";
var Collections;

(function (Collections) {
  Collections["users"] = "users";
})(Collections || (Collections = {}));var userStore = {
  state: {
    user: {},
    isAuthenticated: false
  },
  getters: {
    user: function user(state) {
      return state.user;
    },
    isAuthenticated: function isAuthenticated(state) {
      return state.isAuthenticated;
    }
  },
  mutations: {
    setUser: function setUser(state, user) {
      state.user = user;
    },
    authenticateUser: function authenticateUser(state) {
      state.isAuthenticated = true;
    },
    logout: function logout(state) {
      state.isAuthenticated = false;
    }
  },
  actions: {
    // TODO: Type
    setCurrentUser: function setCurrentUser(_ref, user) {
      var commit = _ref.commit;
      commit('setUser', user);
    },
    // TODO: Type + reject
    authenticateUser: function authenticateUser(_ref2, _ref3) {
      var commit = _ref2.commit,
          dispatch = _ref2.dispatch;
      var firebase = _ref3.firebase,
          user = _ref3.user;
      var setUser = firebase.firestore().collection(Collections.users).doc(user.uid).update({
        id: user.uid,
        disabled: false,
        deleted: false,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        creationTime: user.metadata.creationTime
      }); // TODO: Update collection path

      var setConnectionHistory = firebase.firestore().collection("".concat(Collections.users, "/").concat(user.uid, "/connections-history")).doc().set({
        userId: user.uid,
        date: firebase.firestore.Timestamp.now()
      });
      return new Promise(function (resolve, reject) {
        Promise.all([setUser, setConnectionHistory]).then(function () {
          commit("authenticateUser");
          dispatch("setCurrentUser", user);
          resolve();
        }).catch(function (e) {
          return reject(e);
        });
      });
    },
    // TODO: Type + reject
    logout: function logout(_ref4) {
      var commit = _ref4.commit;
      return new Promise(function (resolve) {
        commit("logout");
        resolve();
      });
    }
  }
};var configureStore = function configureStore(appStore) {
  appStore.registerModule("m-user", userStore);
};var Messages;

(function (Messages) {
  Messages[Messages["duration"] = 5000] = "duration";
})(Messages || (Messages = {}));var script$3 = {
  name: "login-view",
  data: function data() {
    return {
      model: {
        email: "",
        password: ""
      },
      isLoading: false
    };
  },
  methods: {
    successCallback: function successCallback(user) {
      var _this = this;

      this.$store.dispatch("authenticateUser", {
        firebase: this.$firebase,
        user: user
      }).then(function () {
        _this.isLoading = false;

        _this.$router.push(_this.$route.query.redirect ? _this.$route.query.redirect.toString() : {
          name: HOME.name
        });
      }).catch(function () {
        _this.errorCallback();
      });
    },
    errorCallback: function errorCallback() {
      this.isLoading = false;
      this.$message({
        type: "error",
        // TODO: Add translation
        message: "Authentication failed",
        duration: Messages.duration
      });
    },
    authenticateUser: function authenticateUser() {
      var _this2 = this;

      var _this$model = this.model,
          email = _this$model.email,
          password = _this$model.password;
      this.isLoading = true;
      this.$firebase.auth().signInWithEmailAndPassword(email, password).then(function (_ref) {
        var user = _ref.user;
        return _this2.successCallback(user);
      }).catch(function () {
        _this2.errorCallback();
      });
    },
    googleAuthentication: function googleAuthentication() {
      var _this3 = this;

      var provider = new this.$firebase.auth.GoogleAuthProvider();
      this.isLoading = true;
      this.$firebase.auth().signInWithPopup(provider).then(function (_ref2) {
        var user = _ref2.user;
        return _this3.successCallback(user);
      }).catch(function () {
        _this3.errorCallback();
      });
    }
  }
};/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "login-view"
  }, [_c('el-card', [_c('h2', [_vm._v("Login")]), _vm._v(" "), _c('el-form', {
    ref: "form",
    staticClass: "login-form",
    attrs: {
      "model": _vm.model
    },
    nativeOn: {
      "submit": function submit($event) {
        $event.preventDefault();
        return _vm.authenticateUser($event);
      }
    }
  }, [_c('el-form-item', {
    attrs: {
      "prop": "username"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "Username",
      "prefix-icon": "fa fa-user"
    },
    model: {
      value: _vm.model.email,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "email", $$v);
      },
      expression: "model.email"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "password"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "Password",
      "type": "password",
      "prefix-icon": "fas fa-lock"
    },
    model: {
      value: _vm.model.password,
      callback: function callback($$v) {
        _vm.$set(_vm.model, "password", $$v);
      },
      expression: "model.password"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "loading": _vm.isLoading,
      "type": "primary",
      "native-type": "submit",
      "block": ""
    }
  }, [_vm._v("\n          Login\n        ")])], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "loading": _vm.isLoading,
      "type": "primary",
      "block": ""
    },
    on: {
      "click": _vm.googleAuthentication
    }
  }, [_vm._v("\n          Google\n        ")])], 1)], 1)], 1)], 1);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = "data-v-ccbf4658";
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);//
var script$4 = {
  name: "logout-view",
  activated: function activated() {
    var _this = this;

    this.$firebase.auth().signOut();
    this.$store.dispatch("logout").then(function () {
      _this.$router.push({
        name: LOGIN.name
      });
    });
  }
};/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', []);
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = "data-v-515cd8c0";
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);var script$5 = {
  name: "not-found"
};/* script */
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<p>NOT FOUND</p>")]);
};

var __vue_staticRenderFns__$5 = [];
/* style */

var __vue_inject_styles__$5 = undefined;
/* scoped */

var __vue_scope_id__$5 = undefined;
/* module identifier */

var __vue_module_identifier__$5 = "data-v-975f9fe8";
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$5 = normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);var script$6 = {
  name: "profile-view",
  data: function data() {
    return {
      userSocialInformation: {},
      editTitle: false,
      photoURL: this.$store.getters.user.photoURL,
      options: [// TODO: Use Axios to fetch API with worldwide results http://worldtimeapi.org/
      {
        label: "Amsterdam",
        value: "Europe/Amsterdam"
      }, {
        label: "Andorra",
        value: "Europe/Andorra"
      }, {
        label: "Astrakhan",
        value: "Europe/Astrakhan"
      }, {
        label: "Athens",
        value: "Europe/Athens"
      }, {
        label: "Belgrade",
        value: "Europe/Belgrade"
      }, {
        label: "Berlin",
        value: "Europe/Berlin"
      }, {
        label: "Brussels",
        value: "Europe/Brussels"
      }, {
        label: "Bucharest",
        value: "Europe/Bucharest"
      }, {
        label: "Budapest",
        value: "Europe/Budapest"
      }, {
        label: "Chisinau",
        value: "Europe/Chisinau"
      }, {
        label: "Copenhagen",
        value: "Europe/Copenhagen"
      }, {
        label: "Dublin",
        value: "Europe/Dublin"
      }, {
        label: "Gibraltar",
        value: "Europe/Gibraltar"
      }, {
        label: "Helsinki",
        value: "Europe/Helsinki"
      }, {
        label: "Istanbul",
        value: "Europe/Istanbul"
      }, {
        label: "Kaliningrad",
        value: "Europe/Kaliningrad"
      }, {
        label: "Kiev",
        value: "Europe/Kiev"
      }, {
        label: "Kirov",
        value: "Europe/Kirov"
      }, {
        label: "Lisbon",
        value: "Europe/Lisbon"
      }, {
        label: "London",
        value: "Europe/London"
      }, {
        label: "Luxembourg",
        value: "Europe/Luxembourg"
      }, {
        label: "Madrid",
        value: "Europe/Madrid"
      }, {
        label: "Malta",
        value: "Europe/Malta"
      }, {
        label: "Minsk",
        value: "Europe/Minsk"
      }, {
        label: "Monaco",
        value: "Europe/Monaco"
      }, {
        label: "Moscow",
        value: "Europe/Moscow"
      }, {
        label: "Oslo",
        value: "Europe/Oslo"
      }, {
        label: "Paris",
        value: "Europe/Paris"
      }, {
        label: "Prague",
        value: "Europe/Prague"
      }, {
        label: "Riga",
        value: "Europe/Riga"
      }, {
        label: "Rome",
        value: "Europe/Rome"
      }, {
        label: "Samara",
        value: "Europe/Samara"
      }, {
        label: "Saratov",
        value: "Europe/Saratov"
      }, {
        label: "Simferopol",
        value: "Europe/Simferopol"
      }, {
        label: "Sofia",
        value: "Europe/Sofia"
      }, {
        label: "Stockholm",
        value: "Europe/Stockholm"
      }, {
        label: "Tallinn",
        value: "Europe/Tallinn"
      }, {
        label: "Tirane",
        value: "Europe/Tirane"
      }, {
        label: "Ulyanovsk",
        value: "Europe/Ulyanovsk"
      }, {
        label: "Uzhgorod",
        value: "Europe/Uzhgorod"
      }, {
        label: "Vienna",
        value: "Europe/Vienna"
      }, {
        label: "Vilnius",
        value: "Europe/Vilnius"
      }, {
        label: "Volgograd",
        value: "Europe/Volgograd"
      }, {
        label: "Warsaw",
        value: "Europe/Warsaw"
      }, {
        label: "Zaporozhye",
        value: "Europe/Zaporozhye"
      }, {
        label: "Zurich",
        value: "Europe/Zurich"
      }]
    };
  },
  computed: {
    size: function size() {
      return 200;
    },
    information: function information() {
      return [{
        id: 'email',
        // TODO: Translate with i18n
        label: 'Email',
        placeholder: 'Email',
        props: {
          disabled: true
        }
      }, {
        class: 'form-group--reduced',
        id: 'phone',
        type: 'tel',
        // TODO: Translate with i18n
        label: 'Phone',
        placeholder: 'Phone'
      }, {
        id: 'location',
        // TODO: Translate with i18n
        label: 'Location',
        placeholder: 'Location'
      }];
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$firebase.firestore().collection(Collections.users).doc(this.$store.getters.user.uid).get().then(function (res) {
      _this.userSocialInformation = res.data();
    });
  },
  methods: {
    handleAvatarSuccess: function handleAvatarSuccess(res, file) {
      this.photoURL = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload: function beforeAvatarUpload(file) {
      var isJPG = file.type === 'image/jpeg';
      var isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!');
      }

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!');
      }

      return isJPG && isLt2M;
    },
    validateTitle: function validateTitle() {
      this.saveUserInformation('title', this.userSocialInformation.title);
      this.editTitle = !this.editTitle;
    },
    saveUserInformation: function saveUserInformation(key, value) {
      var _this2 = this;

      this.$firebase.firestore().collection(Collections.users).doc(this.$store.getters.user.uid).update(_defineProperty({}, key, value)).then(function () {
        // TODO: Translate with i18n
        _this2.$message.success('Successfully updated field');
      }).catch(function (err) {
        console.log('ERROR', err);
      });
    }
  }
};/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('el-row', {
    staticClass: "d-flex align-stretch",
    attrs: {
      "gutter": 32
    }
  }, [_c('el-col', {
    attrs: {
      "span": 8
    }
  }, [_c('el-card', {
    staticClass: "profile-card t-align-center"
  }, [_c('el-upload', {
    staticClass: "avatar-uploader",
    attrs: {
      "action": "https://jsonplaceholder.typicode.com/posts/",
      "show-file-list": false,
      "on-success": _vm.handleAvatarSuccess,
      "before-upload": _vm.beforeAvatarUpload
    }
  }, [_vm.photoURL ? _c('el-avatar', {
    attrs: {
      "size": _vm.size,
      "src": _vm.photoURL
    }
  }) : _c('el-avatar', {
    staticStyle: {
      "font-size": "50px"
    },
    attrs: {
      "size": _vm.size,
      "icon": "el-icon-plus"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "bold"
  }, [_c('p', {
    staticClass: "text-highlight"
  }, [_vm._v(_vm._s(_vm.userSocialInformation.displayName))]), _vm._v(" "), _c('p', [_vm._v("User role")])]), _vm._v(" "), _c('div', [_c('p', {
    staticClass: "uppercase"
  }, [_vm._v(_vm._s(_vm.userSocialInformation.organization))])]), _vm._v(" "), _c('div', {
    staticClass: "user-title"
  }, [_c('p', {
    staticClass: "bold"
  }, [_vm._v("Title")]), _vm._v(" "), [_c('transition', {
    attrs: {
      "name": "fade",
      "mode": "out-in"
    }
  }, [_vm.editTitle ? _c('div', {
    key: "title-input",
    staticClass: "d-flex justify-center align-center"
  }, [_c('el-input', {
    attrs: {
      "placeholder": "Title"
    },
    model: {
      value: _vm.userSocialInformation.title,
      callback: function callback($$v) {
        _vm.$set(_vm.userSocialInformation, "title", $$v);
      },
      expression: "userSocialInformation.title"
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "el-icon-circle-check",
    on: {
      "click": _vm.validateTitle
    }
  })], 1) : _c('div', {
    key: "title-value",
    staticClass: "d-flex justify-center align-center"
  }, [_c('p', [_vm._v(_vm._s(_vm.userSocialInformation.title))]), _vm._v(" "), _c('i', {
    staticClass: "el-icon-edit",
    on: {
      "click": function click($event) {
        _vm.editTitle = !_vm.editTitle;
      }
    }
  })])])]], 2), _vm._v(" "), _c('div', [_c('p', [_vm._v("Member since")]), _vm._v(" "), _c('p', {
    staticClass: "bold"
  }, [_vm._v(_vm._s(_vm.userSocialInformation.creationTime))])])], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 16
    }
  }, [_c('el-card', {
    staticClass: "profile-card full-height"
  }, [_vm._l(_vm.information, function (item) {
    return _c('div', {
      staticClass: "form-group",
      class: item.class
    }, [_c('label', {
      attrs: {
        "for": item.id
      }
    }, [_vm._v(_vm._s(item.label))]), _vm._v(" "), _c('el-input', _vm._b({
      directives: [{
        name: "debounce",
        rawName: "v-debounce:1s",
        value: function value(_value) {
          return _vm.saveUserInformation(item.id, _value);
        },
        expression: "(value) => saveUserInformation(item.id, value)",
        arg: "1s"
      }],
      attrs: {
        "type": item.type || 'text',
        "id": item.id,
        "placeholder": item.placeholder
      },
      model: {
        value: _vm.userSocialInformation[item.id],
        callback: function callback($$v) {
          _vm.$set(_vm.userSocialInformation, item.id, $$v);
        },
        expression: "userSocialInformation[item.id]"
      }
    }, 'el-input', item.props, false))], 1);
  }), _vm._v(" "), _c('div', {
    staticClass: "form-group form-group--reduced"
  }, [_c('label', {
    attrs: {
      "for": "timezone"
    }
  }, [_vm._v("Timezone")]), _vm._v(" "), _c('el-select', {
    attrs: {
      "id": "timezone",
      "placeholder": "Select",
      "clearable": ""
    },
    on: {
      "change": function change(value) {
        return _vm.saveUserInformation('timezone', value);
      }
    },
    model: {
      value: _vm.userSocialInformation.timezone,
      callback: function callback($$v) {
        _vm.$set(_vm.userSocialInformation, "timezone", $$v);
      },
      expression: "userSocialInformation.timezone"
    }
  }, _vm._l(_vm.options, function (item) {
    return _c('el-option', {
      key: item.value,
      attrs: {
        "label": item.label,
        "value": item.value
      }
    });
  }), 1)], 1)], 2)], 1)], 1);
};

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = undefined;
/* scoped */

var __vue_scope_id__$6 = undefined;
/* module identifier */

var __vue_module_identifier__$6 = "data-v-415f27c2";
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$6 = normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);var script$7 = Vue.extend({
  name: "users-view",
  data: function data() {
    return {
      users: {},
      isLoading: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.isLoading = true;
    this.$httpsCallableFunction("getAllUsers", {}).then(function (res) {
      _this.users = res.data.users;
      _this.isLoading = false;
    });
  }
});/* script */
var __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode(_vm.isLoading ? "<p>Loading...</p>" : "<p>USER Listing</p> <pre>" + _vm._ssrEscape(_vm._s(_vm.users)) + "</pre>")]);
};

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = undefined;
/* scoped */

var __vue_scope_id__$7 = undefined;
/* module identifier */

var __vue_module_identifier__$7 = "data-v-e5557764";
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$7 = normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);var auth = function auth(_ref, nextPipeline) {
  var to = _ref.to,
      next = _ref.next,
      userStore = _ref.userStore;

  if (!userStore.state.isAuthenticated) {
    return next({
      name: LOGIN.name,
      query: {
        redirect: to.path
      }
    });
  }

  return nextPipeline();
};var guest = function guest(_ref, nextPipeline) {
  var next = _ref.next,
      userStore = _ref.userStore;
  if (userStore.state.isAuthenticated) return next({
    name: HOME.name
  });
  return nextPipeline();
};var routes = [{
  path: LOGIN.path,
  name: LOGIN.name,
  meta: {
    middleware: [guest]
  },
  component: __vue_component__$3
}, {
  path: LOGOUT.path,
  name: LOGOUT.name,
  meta: {
    middleware: [auth]
  },
  component: __vue_component__$4
}, {
  path: USERS.path,
  name: USERS.name,
  // TODO: Add superAdmin
  meta: {
    middleware: [auth]
  },
  component: __vue_component__$7
}, {
  path: PROFILE.path,
  name: PROFILE.name,
  meta: {
    middleware: [auth]
  },
  component: __vue_component__$6
}, {
  path: NOT_FOUND.path,
  name: NOT_FOUND.name,
  meta: {
    middleware: [auth]
  },
  component: __vue_component__$5
}];var middlewarePipeline = function middlewarePipeline(context, middleware, index) {
  var nextMiddleware = middleware[index];
  if (!nextMiddleware) return context.next;
  return function () {
    var nextPipeline = middlewarePipeline(context, middleware, index + 1);
    nextMiddleware(context, nextPipeline);
  };
};var configureRouter = function configureRouter(router) {
  router.addRoutes(routes);
  router.beforeEach(function (to, from, next) {
    if (!to.meta.middleware) return next();
    var context = {
      to: to,
      from: from,
      next: next,
      userStore: userStore
    };
    var middleware = to.meta.middleware;
    var index = 0;
    return middleware[index](context, middlewarePipeline(context, middleware, index + 1));
  });
};var configureFirebase = function configureFirebase(Vue, firebase) {
  Vue.prototype.$firebase = firebase;

  Vue.prototype.$httpsCallableFunction = function (name) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve, reject) {
      var callableFunction = firebase.app().functions(REGION).httpsCallable(name);
      callableFunction(data).then(resolve).catch(function (err) {
        return reject(err);
      });
    });
  };

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      userStore.state.user = user;
      userStore.state.isAuthenticated = true;
    }
  });
};var installElementUi = function installElementUi(Vue) {
  Vue.use(Element);
};var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}var vueDebounce_min = createCommonjsModule(function (module, exports) {
!function(e,n){n(exports);}(commonjsGlobal,function(e){function m(o,e){function n(){for(var e=this,n=[],t=arguments.length;t--;)n[t]=arguments[t];clearTimeout(u),(u=setTimeout(function(){u=null,o.apply(e,n);},a))||o.apply(this,n);}var t,i,r,u=null,a="number"==typeof e?e:(t=String(e).split(/(ms|s)/i),i=t[0],void 0===(r=t[1])&&(r="ms"),Number(i)*{ms:1,s:1e3}[r]);return n.cancel=function(){clearTimeout(u),u=null;},n}function i(e){return e.map(function(e){return e.toLowerCase()})}function p(e,n){var t,o=(e.getNamedItem("debounce-events")||{}).value;return void 0===o&&(o=!1),i(o?o.split(","):(t=n,Array.isArray(t)?t:null==t?[]:[t]))}function y(e){return ""===e}var n={install:function(e,n){void 0===n&&(n={});var u=n.lock;void 0===u&&(u=!1);var f=n.listenTo;void 0===f&&(f="keyup");var v=n.defaultTime;void 0===v&&(v="300ms");var d=n.fireOnEmpty;void 0===d&&(d=!1);var s=n.cancelOnEmpty;void 0===s&&(s=!1),e.directive("debounce",{bind:function(n,e){var a=e.value,t=e.arg;void 0===t&&(t=v);var o=e.modifiers,c=Object.assign({fireonempty:d,cancelonempty:s,lock:u},o),i=p(n.attributes,f),l=m(function(e){a(e.target.value,e);},t);function r(e){var n,t,o,i,r,u;r=e.target.value,u=c,y(r)&&u.cancelonempty?l.cancel():(o=e.key,i=c,"Enter"===o&&(!i.lock||i.unlock)||(n=e.target.value,t=c,y(n)&&t.fireonempty)?(l.cancel(),a(e.target.value,e)):l(e));}i.forEach(function(e){n.addEventListener(e,r);});}});}};e.debounce=m,e.default=n,Object.defineProperty(e,"__esModule",{value:!0});});
});

var vueDebounce = unwrapExports(vueDebounce_min);var installVueDebounce = function installVueDebounce(Vue) {
  Vue.use(vueDebounce);
};var script$8 = {
  name: "home"
};/* script */
var __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<p>HOME VIEW OF MAESTRO DEV</p>")]);
};

var __vue_staticRenderFns__$8 = [];
/* style */

var __vue_inject_styles__$8 = undefined;
/* scoped */

var __vue_scope_id__$8 = undefined;
/* module identifier */

var __vue_module_identifier__$8 = "data-v-6ca71b02";
/* functional template */

var __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$8 = normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);var getAllUsers = function getAllUsers(admin, data, _) {
  return admin.auth().listUsers(1000, data.nextPageToken).then(function (users) {
    return users;
  }).catch(function (err) {
    return err;
  });
};var initializeApp = function initializeApp(Vue, App, options) {
  checkConfiguration(options);
  injectLoader();
  var app;
  var store = options.store,
      router = options.router,
      firebase = options.firebase;

  if (!router.options.routes || !router.options.routes.find(function (route) {
    return route.path = "/";
  })) {
    router.addRoutes([{
      path: HOME.path,
      name: HOME.name,
      meta: {
        middleware: [auth]
      },
      component: __vue_component__$8
    }]);
    log("Added placeholder HomeView");
  }

  Vue.use(install, {
    store: store,
    router: router,
    firebase: firebase
  });
  firebase.auth().onAuthStateChanged(function () {
    if (!app) {
      removeLoader(); // @ts-ignore

      app = new Vue({
        store: store,
        router: router,
        render: function render(h) {
          return h(App);
        }
      }).$mount("#app");
    }
  });
}; // install function executed by Vue.use()

var install = function installMaestro(Vue, options) {
  if (install.installed) return;
  install.installed = true;
  configureStore(options.store);
  configureRouter(options.router);
  configureFirebase(Vue, options.firebase);
  installElementUi(Vue);
  installVueDebounce(Vue);
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
} // Default export is library as a whole, registered via Vue.use()
exports.MLayout=__vue_component__$2;exports.authMiddleware=auth;exports.default=plugin;exports.getAllUsers=getAllUsers;exports.guestMiddleware=guest;exports.initializeApp=initializeApp;