import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';
import * as firebase from "firebase";
import { initializeApp } from "@/main";

import '@/styles/theme/index.scss'
import './config/firebase'

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.config.productionTip = false;

const store = new Vuex.Store({});
const router = new VueRouter({ mode: 'history' });

initializeApp(Vue, App, { store, router, firebase })
