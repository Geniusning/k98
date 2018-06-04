// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import store from './store/index'
import router from './router/index'
import vuePicturePreview from 'vue-picture-preview'
// import Carousel3d from 'vue-carousel-3d';
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

// Vue.use(Carousel3d);
Vue.use(vuePicturePreview)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
