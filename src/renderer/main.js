import Vue from 'vue'
import axios from './axios/axios';
import "style-loader!reset.css";
import "style-loader!animate.css";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/style.css";

import App from './App'
import router from './router'
import store from './store'
import { mixin } from './mixins/mixin';
import { lenLimit, toJson, toPrice, dateTime } from './filters/custom.filter';

Vue.mixin(mixin);
Vue.filter("lenLimit", lenLimit);
Vue.filter("toJson", toJson);
Vue.filter("toPrice", toPrice);
Vue.filter("dateTime", dateTime);
Vue.use(ElementUI);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))


Vue.axios = Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
window.$vue = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
