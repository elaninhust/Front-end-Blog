// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from "vue-lazyload"
import fastclick from "fastclick"
import vConsole from "vconsole"

import axios from 'axios'
import {fetch,post,patch,put} from './util/http'
import store from "./store/index"

import '../static/css/reset.css';
import '../static/css/main.css';

Vue.config.productionTip = false;

Vue.use(VueLazyload);//图片懒加载
fastclick.attach(document.body);//解决移动端点击延迟300ms的问题
new vConsole();//移动端控制台解决方案

Vue.prototype.$fetch = fetch;
Vue.prototype.$post = post;
Vue.prototype.$patch = patch;
Vue.prototype.$fetch = fetch;
Vue.prototype.$put = put;
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})	
