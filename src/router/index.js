import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'
import GameRank from 'components/home/GameRank/GameRank'
import MarsRank from 'components/home/marsRank/marsRank'
import TreasureRank from 'components/home/treasureRank/treasureRank'
import Friend from 'components/friend/friend'
import PersonalInfo from 'components/friend/personalInfo/personalInfo'
import Message from 'components/message/message'
import Welfare from 'components/welfare/welfare'
import Mine from 'components/mine/mine'
import Card from 'components/card/card'
import cardDetail from 'components/card_detail/card_detail'
import Chat from 'components/chat_room/chat_room'
import Individual from 'components/individual/individual'
import GameDetail from 'components/game_detail/game_detail'
import GiftDetail from 'components/gift_detail/gift_detail'
import updateAvatar from 'components/individual/updateAvatar'
import Award from 'components/welfare/award/award'
import ShareNew from 'components/welfare/ShareNew/ShareNew'
import ShareActivity from 'components/welfare/shareActivity/shareActivity'
import NewUserGetDiscount from 'components/welfare/newUserGetDiscount/newUserGetDiscount'
import GameRecord from 'components/welfare/gameRecord'
import GameRecordDetail from 'components/welfare/gameRecordDetail'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      redirect: "/home",

    },
    {
      path: '/home',
      name: 'home',
      component: (resolve)=>require(['../components/home/home.vue'],resolve),
      meta: {
        keepAlive: true,
        title: "首页"
      }
    },
    {
      path: '/marsRank',
      name: 'marsRank',
      component: (resolve)=>require(['../components/home/marsRank/marsRank.vue'],resolve),
      meta: { 
        title:"战神榜"
       }
    },
    {
      path: '/treasureRank',
      name: 'treasureRank',
      component: (resolve)=>require(['../components/home/treasureRank/treasureRank.vue'],resolve),
      meta: { 
        title:"财富榜"
       }
    },
    {
      path: "/gameRank",
      name: "gameRank",
      component: (resolve)=>require(['../components/home/GameRank/GameRank.vue'],resolve),
      meta: { 
        title:"比赛直播间"
       }
    },
    {
      path: '/friend',
      name: 'friend',
      component: (resolve)=>require(['../components/friend/friend.vue'],resolve),
      children: [{
        path: ':id',
        name: "personalInfo",
        component: (resolve)=>require(['../components/friend/personalInfo/personalInfo.vue'],resolve),
      }, ],
      meta: {
        title: "找朋友"
      }
    },
    {
      path: '/message',
      name: 'message',
      component: (resolve)=>require(['../components/message/message.vue'],resolve),
      meta: {
        title: "消息"
      },
      // props: true,
      children: [{
        path: ":id",
        name: "chat",
        component: Chat,
        // meta: { keepAlive: true }
      }, ]
    },
    {
      path: '/welfare',
      name: 'welfare',
      component: (resolve)=>require(['../components/welfare/welfare.vue'],resolve),
      meta: {
        title: "福利"
      },
      children: [{
        path: "award",
        name: "award",
        component: Award,
      }, ]
    },
    {
      path: '/gameRecord',
      name: 'gameRecord',
      component: (resolve)=>require(['../components/welfare/gameRecord.vue'],resolve),
      children: [{
        path: ":id",
        name: "gameRecordDetail",
        component: (resolve)=>require(['../components/welfare/gameRecordDetail.vue'],resolve),
      }, ],
      meta: {
        title: "游戏记录"
      }
    },
    {
      path: '/shareNew',
      name: 'shareNew',
      component:ShareNew,
      meta: {
        title: "新人有礼"
      }
    },
    {
      path: '/shareActivity',
      name: 'shareActivity',
      component: (resolve)=>require(['../components/welfare/shareActivity/shareActivity.vue'],resolve),
      meta: {
        // keepAlive: true,
        title: "分享活动"
      }
    },
    {
      path: '/newUserGetDiscount',
      name: 'newUserGetDiscount',
      component: (resolve)=>require(['../components/welfare/newUserGetDiscount/newUserGetDiscount.vue'],resolve),
      meta: {
        keepAlive: true,
        title: "新人优惠券"
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: (resolve)=>require(['../components/mine/mine.vue'],resolve),
      meta: {
        keepAlive: true,
        title: "我的"
      }
    },
    {
      path: '/card',
      name: 'card',
      component: (resolve)=>require(['../components/card/card.vue'],resolve),
      children: [{
        path: ":id",
        name: "cardDetail",
        component: (resolve)=>require(['../components/card_detail/card_detail.vue'],resolve),
      }],
      meta: {
        title: "优惠券"
      }
    },
    {
      path: "/individual",
      name: "individual",
      component: (resolve)=>require(['../components/individual/individual.vue'],resolve),
      children: [{
        path: ':id',
        component: (resolve)=>require(['../components/individual/updateAvatar.vue'],resolve),
        name: "updateAvatar"
      }],
      meta: {
        title: "个人信息"
      }
    },
    {
      path: "/game_detail",
      name: "gameDetail",
      component: (resolve)=>require(['../components/game_detail/game_detail.vue'],resolve),
      meta: {
        title: "比赛详情"
      }
    },
    {
      path: '/gift_detail',
      name: 'giftDetail',
      component: (resolve)=>require(['../components/gift_detail/gift_detail.vue'],resolve),
      meta: {
        title: "积分详情"
      }
    },

  ]
})
