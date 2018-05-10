// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import store from './store/index'
import Home from 'components/home/home'
import Friend from 'components/friend/friend'
import Message from 'components/message/message'
import Welfare from 'components/welfare/welfare'
import Mine from 'components/mine/mine'
import Card from 'components/card/card'
import Chat from 'components/chat_room/chat_room'
import Individual from 'components/individual/individual'
import vuePicturePreview from 'vue-picture-preview'
import Carousel3d from 'vue-carousel-3d';

Vue.use(Carousel3d);
Vue.use(vuePicturePreview)

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/home",

  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/friend',
    name: 'friend',
    component: Friend
  },
  {
    path: '/message',
    name: 'message',
    component: Message
  },
  {
    path: '/welfare',
    name: 'welfare',
    component: Welfare
  },
  {
    path: '/mine',
    name: 'mine',
    component: Mine
  },
  {
    path: '/card',
    name: 'card',
    component: Card
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat
  },
  {
    path: "/individual",
    name: "individual",
    component: Individual
  },
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
