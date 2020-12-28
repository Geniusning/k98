import Vue from 'vue'
import Router from 'vue-router'

import Chat from 'components/chat_room/chat_room'
// import clientChat from 'components/chat_room/client_chatroom'
import cashierChat from 'components/chat_room/cashier_chatroom'
// import Award from 'components/welfare/award/award'
import ShareNew from 'components/welfare/ShareNew/ShareNew'
import Nprogress from "nprogress"
import "nprogress/nprogress.css"


Vue.use(Router)
const router = new Router({
  base: '/k98',
  mode: 'history',
  routes: [{
    path: '/',
    redirect: "/home",
  },
  {
    path: '/home',
    name: 'home',
    children:[
      {
        path:"moreRecommend",
        name:"moreRecommend",
        component: () =>
          import('../components/home/moreShopRecommend.vue'),
        meta: {
          title: "更多会员产品",
          keepAlive: true,
        }
      }
    ],
    component: () => import('../components/home/home.vue'),
    meta: {
      keepAlive: true,
      title: "首页"
    }
  },
  {
    path: '/marsRank',
    name: 'marsRank',
    component: () =>
      import('../components/home/marsRank/marsRank.vue'),
    meta: {
      title: "战神榜"
    }
  },
  {
    path: '/treasureRank',
    name: 'treasureRank',
    component: () =>
      import('../components/home/treasureRank/treasureRank.vue'),
    meta: {
      title: "财富榜"
    }
  },
  {
    path: "/gameRank",
    name: "gameRank",
    component: () =>
      import('../components/home/GameRank/GameRank.vue'),
    meta: {
      title: "比赛直播间"
    }
  },
  {
    path: '/friend',
    name: 'friend',
    component: () =>
      import('../components/friend/friend.vue'),
    meta: {
      keepAlive: true,
      title: "找朋友"
    }
  },
  {
    path: '/comment',
    name: 'comment',
    component: () =>
      import('../components/friend/commentStaff.vue'),
    meta: {
      title: "看Ta的评价"
    }
  },
  {
    path: '/commentUser',
    name: 'commentUser',
    component: () =>
      import('../components/friend/commentUser.vue'),
    meta: {
      title: "了解他"
    }
  },
  {
    path: '/message',
    name: 'message',
    component: () =>
      import('../components/message/message.vue'),
    meta: {
      title: "消息"
    },
    // props: true,
    children: [{
      path: "chat",
      name: "chat",
      component: Chat,
      meta: {
        title: "聊天"
      }
    },
    {
      path: "clientChat",
      name: "clientChat",
      component: () =>
        import('../components/chat_room/client_chatroom'),
      // component: clientChat,
      meta: {
        title: "客服聊天"
      }
    },
    {
      path: "cashierChat",
      name: "cashierChat",
      component: cashierChat,
      meta: {
        title: "收银结账"
      }
    },
    ]
  },
  {
    path: '/welfare',
    name: 'welfare',
    component: () =>
      import('../components/welfare/welfare.vue'),
    meta: {
      title: "福利",
      keepAlive: true,
    },
    children: [

      //   {
      //   path: "award",
      //   name: "award",
      //   component: Award,
      // },
    ]
  },
  {
    path: "/oldPhotos",
    name: "oldPhotos",
    meta: {
      title: "往期照片",
    },
    component: () =>
      import('../components/welfare/oldPhotos.vue'),
  },
  {
    path: '/gameRecord',
    name: 'gameRecord',
    component: () =>
      import('../components/welfare/gameRecord.vue'),
    children: [{
      path: ":id",
      name: "gameRecordDetail",
      component: () =>
        import('../components/welfare/gameRecordDetail.vue'),
      meta: {
        title: "排名详情"
      }
    },],
    meta: {
      title: "游戏记录"
    }
  },
  {
    path: '/shareNew',
    name: 'shareNew',
    component: ShareNew,
    meta: {
      title: "新人有礼"
    }
  },
  {
    path: '/shareActivity/:id',
    name: 'shareActivity',
    component: () =>
      import('../components/welfare/shareActivity/shareActivity.vue'),
    meta: {
      // keepAlive: true,
      title: "活动告示板"
    }
  },
  {
    path: '/newUserGetDiscount',
    name: 'newUserGetDiscount',
    component: () =>
      import('../components/welfare/newUserGetDiscount/newUserGetDiscount.vue'),
    meta: {
      keepAlive: true,
      title: "新人优惠券"
    }
  },
  {
    path: '/oneYuan',
    name: 'oneYuan',
    component: () =>
      import('../components/welfare/oneYuanGroupShopping/oneYuanGroupShopping.vue'),
    meta: {
      title: "一元团购"
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: () =>
      import('../components/mine/mine.vue'),
    meta: {
      // keepAlive: true,
      title: "我的"
    }
  },
  {
    path: '/card',
    name: 'card',
    component: () =>
      import('../components/card/card.vue'),
    children: [{
      path: ":id",
      name: "cardDetail",
      meta: {
        title: "卡券"
      },
      component: () =>
        import('../components/card_detail/card_detail.vue'),
    }],
    meta: {
      title: "卡券"
    }
  },
  {
    path: '/vipCard',
    name: 'vipCard',
    component: () =>
      import('../components/card/vipCard.vue'),
    meta: {
      title: "积分换会员卡"
    }
  },
  {
    path: "/individual",
    name: "individual",
    component: () =>
      import('../components/individual/individual.vue'),
    meta: {
      title: "个人信息"
    }
  },
  {
    path: '/updateAvatar',
    component: () =>
      import('../components/individual/updateAvatar.vue'),
    name: "updateAvatar",
    meta: {
      title: "修改头像"
    }
  },
  {
    path: "/divide",
    name: "divide",
    component: () =>
      import('../components/individual/divide.vue'),
    meta: {
      title: "新增分身"
    }
  },
  {
    path: "/game_detail",
    name: "gameDetail",
    component: () =>
      import('../components/game_detail/game_detail.vue'),
    meta: {
      title: "比赛详情"
    }
  },
  {
    path: '/gift_detail',
    name: 'giftDetail',
    component: () =>
      import('../components/gift_detail/gift_detail.vue'),
    meta: {
      title: "积分详情"
    }
  },

  ]
})
router.beforeEach((to, from, next) => { //动态设置页面标题
  Nprogress.start()
  window.document.title = to.meta.title
  next()
})
router.afterEach(() => {
  Nprogress.done()
})
export default router
