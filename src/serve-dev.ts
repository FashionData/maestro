import Vue, { VNode } from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Dev from '@/serve-dev.vue';
import { configureElementUi } from "@/init/element-ui";
import { configureStore } from "@/init/store";
import { configureRouter } from "@/init/router";

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({});
const router = new VueRouter({ mode: 'history' });

configureElementUi(Vue);
configureStore(store);
configureRouter(router);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h): VNode => h(Dev),
}).$mount('#app');
