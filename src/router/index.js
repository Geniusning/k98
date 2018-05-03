import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from 'components/home/home'
import Friend from 'components/friend/friend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/home",
      // component: Home
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
      name: "message",
      component: Message
    },
    {
      path: "/welfare",
      name: "welfare",
      component: Welfare,
    },
  ]
})
