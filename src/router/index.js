import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'
import GameCompetion from 'components/home/gameCompetion/gameCompetion'
import GameCompetionDetail from 'components/home/GameCompetionDetail/GameCompetionDetail'
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
import updateAvatar from 'components/individual/updateAvatar'
import Award from 'components/welfare/award/award'
import ShareNew from 'components/welfare/ShareNew/ShareNew'
import ShareActivity from 'components/welfare/shareActivity/shareActivity'

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
            component: Home,
            meta: {
                keepAlive: true
            }
        },
        {
            path: "/gameCompetion",
            name: "gameCompetion",
            component: GameCompetion
        },
        {
            path: "/GameCompetionDetail",
            name: "GameCompetionDetail",
            component: GameCompetionDetail
        },
        {
            path: '/friend',
            name: 'friend',
            component: Friend,
            // meta: { keepAlive: true }
        },
        {
            path: '/message',
            name: 'message',
            component: Message,
            // meta: { keepAlive: true },
            props: true,
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
            component: Welfare,
            children: [{
                path: "award",
                name: "award",
                component: Award,
                // meta: { keepAlive: true }
            }, ]
        },
        {
            path: '/shareNew',
            name: 'shareNew',
            component: ShareNew,
        },
        {
            path: '/shareActivity',
            name: 'shareActivity',
            component: ShareActivity,
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
            children: [{
                path: ":id",
                name: "cardDetail",
                component: cardDetail
            }]
        },
        {
            path: "/individual",
            name: "individual",
            component: Individual,
            children: [{
                path: ':id',
                component: updateAvatar,
                name: "updateAvatar"
            }]
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