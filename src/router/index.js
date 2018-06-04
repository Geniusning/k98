import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'
import Friend from 'components/friend/friend'
import Message from 'components/message/message'
import Welfare from 'components/welfare/welfare'
import Mine from 'components/mine/mine'
import Card from 'components/card/card'
import cardDetail from 'components/card_detail/card_detail'
import Chat from 'components/chat_room/chat_room'
import Individual from 'components/individual/individual'
import GameDetail from 'components/game_detail/game_detail'
import GiftDetail from 'components/gift_detail/gift_detail'

Vue.use(Router)

export default new Router({
  routes: [
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
      component: Message,
      props: true,
    },
    {
      path: '/welfare',
      name: 'welfare',
      component: Welfare,
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine,
    },
    {
      path: '/card',
      name: 'card',
      component: Card,
      children: [
        {
          path: ":id",
          component: cardDetail
        }
      ]
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
    {
      path: "/game_detail",
      name: "gameDetail",
      component: GameDetail
    },
    {
      path: '/gift_detail',
      name: 'giftDetail',
      component: GiftDetail,
    }
  ]
})
