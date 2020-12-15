import "babel-polyfill";
import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import App from "./App.vue";
import * as firebase from "firebase";
import { initializeApp } from "@/main";

import "../src/styles/index.scss";
import "./config/firebase";

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.config.productionTip = false;

const store = new Vuex.Store({});
const router = new VueRouter({ mode: "history" });

initializeApp(Vue, App, {
  config: {
    analytics: true,
    performance: true,
  },
  firebase,
  router,
  store,
});
