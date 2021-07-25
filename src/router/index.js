import Vue from 'vue'
import Router from 'vue-router'

import Chat from 'views/chat_room/chat_room'
import cashierChat from 'views/chat_room/cashier_chatroom'
import ShareNew from 'views/welfare/ShareNew/ShareNew'
// import Nprogress from "nprogress"
// import "nprogress/nprogress.css"

console.log("path", window.location.pathname)
const path = window.location.pathname
Vue.use(Router)
const router = new Router({
  // base: path === '/' ? "" : path + "/", xxxx/#home
  base: "/",
  mode: 'hash',
  routes: [{
      path: "*",
      component: () =>
        import('../views/404/404.vue'),
      meta: {
        title: "404"
      }
    },
    {
      path: '/',
      redirect: "/home",
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home/home.vue'),
      children: [{
        path: "moreRecommend",
        name: "moreRecommend",
        component: () =>
          import('../views/home/moreShopRecommend.vue'),
        meta: {
          title: "更多会员产品",
          keepAlive: false,
        }
      }],
      meta: {
        keepAlive: true,
        title: "首页"
      }
    },
    {
      path: '/shopList',
      name: 'shopList',
      component: () =>
        import('../views/shopList/index.vue'),
      meta: {
        title: "门店列表"
      }
    },
    {
      path: '/vipProductDetail',
      name: 'vipProductDetail',
      component: () =>
        import('../views/home/vipProductDetail/vipProductDetail.vue'),
      meta: {
        title: "会员产品详情"
      }
    },
    {
      path: '/address',
      name: 'address',
      component: () =>
        import('../views/home/vipProductDetail/address.vue'),
      meta: {
        title: "新增地址"
      }
    },
    {
      path: '/marsRank',
      name: 'marsRank',
      component: () =>
        import('../views/home/marsRank/marsRank.vue'),
      meta: {
        title: "战神榜"
      }
    },
    {
      path: '/treasureRank',
      name: 'treasureRank',
      component: () =>
        import('../views/home/treasureRank/treasureRank.vue'),
      meta: {
        title: "财富榜"
      }
    },
    {
      path: "/gameRank",
      name: "gameRank",
      component: () =>
        import('../views/home/GameRank/GameRank.vue'),
      meta: {
        title: "比赛直播间"
      }
    },
    {
      path: '/friend',
      name: 'friend',
      component: () =>
        import('../views/friend/friend.vue'),
      meta: {
        keepAlive: true,
        title: "找朋友"
      }
    },
    {
      path: '/comment',
      name: 'comment',
      component: () =>
        import('../views/friend/commentStaff.vue'),
      meta: {
        title: "看Ta的评价"
      }
    },
    {
      path: '/commentUser',
      name: 'commentUser',
      component: () =>
        import('../views/friend/commentUser.vue'),
      meta: {
        title: "了解他"
      }
    },
    {
      path: '/message',
      name: 'message',
      component: () =>
        import('../views/message/message.vue'),
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
            import('../views/chat_room/client_chatroom'),
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
        import('../views/welfare/welfare.vue'),
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
        import('../views/welfare/oldPhotos.vue'),
    },
    {
      path: '/gameRecord',
      name: 'gameRecord',
      component: () =>
        import('../views/welfare/gameRecord.vue'),
      children: [{
        path: ":id",
        name: "gameRecordDetail",
        component: () =>
          import('../views/welfare/gameRecordDetail.vue'),
        meta: {
          title: "排名详情"
        }
      }, ],
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
        import('../views/welfare/shareActivity/shareActivity.vue'),
      meta: {
        // keepAlive: true,
        title: "活动告示板"
      }
    },
    {
      path: '/newUserGetDiscount',
      name: 'newUserGetDiscount',
      component: () =>
        import('../views/welfare/newUserGetDiscount/newUserGetDiscount.vue'),
      meta: {
        keepAlive: true,
        title: "新人优惠券"
      }
    },
    {
      path: '/oneYuan',
      name: 'oneYuan',
      component: () =>
        import('../views/welfare/oneYuanGroupShopping/oneYuanGroupShopping.vue'),
      meta: {
        title: "一元团购"
      }
    },
    {
      path: '/pinTuan',
      name: 'pinTuan',
      component: () =>
        import('../views/welfare/oneYuanGroupShopping/groupBookAward.vue'),
      meta: {
        title: "拼团有奖"
      }
    },
    {
      path: '/opened',
      name: 'opened',
      component: () =>
        import('../views/welfare/oneYuanGroupShopping/allGroupBookAwardList.vue'),
      meta: {
        title: "已开的团",
        keepAlive: true,
      }
    },
    {
      path: '/awardUser',
      name: 'awardUser',
      component: () =>
        import('../views/welfare/oneYuanGroupShopping/awardUserShow.vue'),
      meta: {
        title: "已开的团",

      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: () =>
        import('../views/mine/mine.vue'),
      meta: {
        // keepAlive: true,
        title: "我的"
      }
    },
    {
      path: '/card',
      name: 'card',
      component: () =>
        import('../views/card/card.vue'),
      children: [{
        path: ":id",
        name: "cardDetail",
        meta: {
          title: "卡券"
        },
        component: () =>
          import('../views/card_detail/card_detail.vue'),
      }],
      meta: {
        title: "卡券"
      }
    },
    {
      path: '/vipCard',
      name: 'vipCard',
      component: () =>
        import('../views/card/vipCard.vue'),
      meta: {
        title: "积分换会员卡"
      }
    },
    {
      path: "/individual",
      name: "individual",
      component: () =>
        import('../views/individual/individual.vue'),
      meta: {
        title: "个人信息"
      }
    },
    {
      path: '/updateAvatar',
      component: () =>
        import('../views/individual/updateAvatar.vue'),
      name: "updateAvatar",
      meta: {
        title: "修改头像"
      }
    },
    {
      path: "/divide",
      name: "divide",
      component: () =>
        import('../views/individual/divide.vue'),
      meta: {
        title: "新增分身"
      }
    },
    {
      path: "/game_detail",
      name: "gameDetail",
      component: () =>
        import('../views/game_detail/game_detail.vue'),
      meta: {
        title: "比赛详情"
      }
    },
    {
      path: '/gift_detail',
      name: 'giftDetail',
      component: () =>
        import('../views/gift_detail/gift_detail.vue'),
      meta: {
        title: "积分详情"
      }
    },

  ]
})
router.beforeEach((to, from, next) => { //动态设置页面标题
  // Nprogress.start()
  window.document.title = to.meta.title
  next()
})
// router.afterEach(() => {
//   Nprogress.done()
// })
export default router
