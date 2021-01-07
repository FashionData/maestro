import "babel-polyfill";
import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import App from "./App.vue";
import * as firebase from "firebase";
import { initializeApp } from "@/main";
import { routes } from './router/routes';

import frLocale from './locales/fr-FR.json';
import enLocale from './locales/en-US.json';

import "../src/styles/index.scss";
import "./config/firebase";

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.config.productionTip = false;

const store = new Vuex.Store({});
const router = new VueRouter({ mode: "history", routes });

initializeApp(Vue, App, {
  config: {
    analytics: true,
    performance: true,
    i18n: {
      fr: frLocale,
      en: enLocale,
    },
  },
  firebase,
  router,
  store,
});
