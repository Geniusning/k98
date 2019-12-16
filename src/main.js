// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import store from './store/index'
import router from './router/index'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

// import vuePicturePreview from 'vue-picture-preview'
import { ToastPlugin, LoadingPlugin } from 'vux'
import { mapMutations, mapState, mapActions } from 'vuex'
import api from './common/api'
import config from './common/config'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(Viewer)
    // Vue.use(vuePicturePreview)
FastClick.attach(document.body)
Vue.config.productionTip = false
    /* eslint-disable no-new */
new Vue({
    router,
    store,
    computed: {
        ...mapState(['socket', "staticChatFriendObj", "LastChatMsg"])
    },
    data() {
        return {
            pingNumer: 0,
            timer: "",
            limitTimes: 0,
            lockReconnect: null
        }
    },
    mounted() {
        this.loadAdvertisingPhoto(); //拉取首页轮播图
        this.createWebsocket() //创建长链接
        this.getUserInfo(); //获取用户信息
        this.createQrcode(); //创建二维码
        this.loadStoreSetting(); //获取门店信息
        this.loadGoods(); //拉取积分换礼品列表
        this.loadRecommends(); //获取店长推荐
        this.loadMutualEvents() //统计约战送礼点赞
        this.loadL98otherSetting() //加载控制开关
        this._loadInviteCoupon() //判断是否有邀新活动
            // window.addEventListener("unload", () => {
            //     localStorage.removeItem("friendInfo") //清楚缓存
            // })
        setTimeout(() => { //13秒过后如果用户没有离开系统则把用户放入待被邀请游戏队列
            this.addWaitingCombatList()
        }, 13000);
    },
    methods: {
        //创建长连接
        createWebsocket() {
            let windowUrL = window.location.href;
            let index = windowUrL.indexOf('.com');
            let shareurl = windowUrL.slice(0, index);
            let websocketUrl = shareurl.slice(8);
            this.connectUrl = `wss://${websocketUrl}.com/api/ws`
            this.websock = new WebSocket(this.connectUrl);
            this.updateShareUrl(shareurl + '.com/'); //设置全局分享时的域名 
            // this.websock = new WebSocket(`${config.websocketUrl}?tk=${config.tk}`); //开发环境 wss://llwant1.qianz.com/api/ws
            this.websock.binaryType = "arraybuffer";
            this._initWebsocket()
        },

        //初始化长连接
        _initWebsocket() {
            this.websock.onopen = this._websocketonopen;
            this.websock.onerror = this._websocketonerror;
            this.websock.onmessage = this._websocketonmessage;
            this.websock.onclose = this._websocketclose
        },
        //重连长链接
        reconnectWebsocket() {
            if (this.lockReconnect) {
                return
            }
            this.lockReconnect = true;
            clearTimeout(this.timerReconnect)
            if (this.limitTimes < 6) {
                this.timerReconnect = setTimeout(() => {
                    this.createWebsocket()
                    this.lockReconnect = false;
                }, 5000);
                this.limitTimes++
            }
        },
        _loadInviteCoupon() {
            api.loadInviteCoupon().then(res => {
                console.log("获取优惠券---------", res)
                if (res.errCode === 0) {
                    this.judgeInviteCoupon(res.coupons.isputAway);
                }
            })
        },
        //成为待被邀请队列成员
        addWaitingCombatList() {
            api.addWaitingCombatList().then(res => {
                console.log("成为待被邀请队列成员-----------", res)
            })
        },
        //加载L98控制开关信息
        loadL98otherSetting() {
            api.loadL98otherSetting().then(res => {
                // console.log("控制开关--------", res)
                this.LoadL98Setting(res)
            })
        },
        loadAdvertisingPhoto() {
            api.loadAdvertisingPhoto().then(res => {
                // console.log('轮播图-------------------------：', res.adPhotoURL)
                this.getAdvertisingImg(res.adPhotoURL);

            })
        },
        getWeChatUrl() {
            let url = window.location.href.split('/#')[0];
            this.getUrl(url);
        },
        _websocketonopen(e) {
            console.log("WebSocket连接成功");
            this.timer = setInterval(() => {
                let msg = {
                    ops: 25,
                }
                var decc = new TextEncoder()
                this.websock.send(decc.encode((JSON.stringify(msg)))); //给服务器发送ping
                this.pingNumer++;
                // console.log("this.pingNumer", this.pingNumer)
                if (this.pingNumer > 5) { //发送三次无响应后重连
                    this.reconnectWebsocket()
                    clearTimeout(this.timer)
                }
            }, 50000);
        },
        _websocketonerror(e) {
            //错误
            console.log("WebSocket连接发生错误");
            this.reconnectWebsocket() //重连
        },
        _websocketonmessage(e) {
            //数据接收
            // console.log('测试websocket链接--------',e);
            var decc = new TextDecoder("utf-8");
            let result = JSON.parse(decc.decode(e.data));
            console.log('websocket接受消息-------------------------', result)
            if (result.ops == 25) {
                let msg = {
                    ops: 26,
                }
                this.websock.send(JSON.stringify(msg)); //给服务器发送ping
                this.pingNumer = 0;
                // console.log('客户端发送pong心跳----', this.pingNumer);
            } else if (result.ops == 26) {
                this.pingNumer = 0;
            } else {
                // this.addFriendEvtObj(result)
            }
            //处理聊天消息
            if (result.msgCode === 1) {
                // this.addFriendEvtObj(result)
                var message = result.content.extMsg
                this.appendLastMsg(message);
                this.addBange();
                // // 判断是否在聊天页面；是在聊天页面返回from给服务器表示消息已读
                let reg = new RegExp("/message/chat")
                if (reg.test(this.$route.fullPath)) {
                    console.log("是否进来标记已读")
                    console.log("message----", message)
                        // let fromId = message.allInfo.lastMsg.from;
                    let fromId = message.lastMsg.from;
                    //发送消息表示已读 
                    api.sendMsgReaded(fromId).then(res => {
                        if (res.errorCode == 0) {
                            console.log('消息已读')
                        }
                    })
                }
                this.judgeMessType('message')
            }
            //处理好友点赞事件
            else if (result.msgCode === 2) {
                this.loadMutualEvents();
                this.judgeMessType('thumb')
                this.addMessageIntoQueue(result)
            }
            //处理送礼
            else if (result.msgCode === 3) {
                this.loadMutualEvents();
                this.judgeMessType('gift')
                this.addMessageIntoQueue(result)
            } else if (result.msgCode === 4) { //发布优惠券
                this.judgeMessType('discount')
                this.addFriendEvtObj(result)
            } else if (result.msgCode === 6) { //活动通知
                this.addFriendEvtObj(result)
                this.judgeMessType('activity')

            }
            //处理约战事件
            else if (result.msgCode === 7) {
                this.loadMutualEvents();
                this.addBange();
                this.judgeMessType('playGame')
                this.addMessageIntoQueue(result)
            }else if (result.msgCode === 24) {
                this.loadMutualEvents();
                this.addBange();
                this.judgeMessType('playGame')
                this.addMessageIntoQueue(result)
                // this.addFriendEvtObj(result)
            }
            //上线通知
            else if (result.msgCode === 8) {
                this.judgeMessType('onlineNotice');
                this.addFriendEvtObj(result)
            } else if (result.msgCode === 9) {
                //分享获得积分通知
                this.addFriendEvtObj(result)
                this.judgeMessType('shareGetIntegral');
            } else if (result.msgCode === 12) {
                this.loadMutualEvents();
                this.addBange();
                this.judgeMessType('gift')
                this.addMessageIntoQueue(result)
            } else if (result.msgCode === 13) { //对方操作回赞后返回结果通知
                this.judgeMessType('backThumb');
                this.addFriendEvtObj(result)
            } else if (result.msgCode === 14) { //对方操作收到礼物后返回结果通知
                this.judgeMessType('successGift');
                this.addFriendEvtObj(result)
            } else if (result.msgCode === 15) { //对方操作拒绝礼物后返回结果通知
                this.judgeMessType('failGift');
                this.addFriendEvtObj(result)
            } else if (result.msgCode === 16) { //对方操作拒绝约占后返回结果通知
                this.judgeMessType('rejectGame');
                this.addFriendEvtObj(result)
            } else if (result.msgCode === 17) { //对方在游戏操作打招呼返回结果通知
                this.judgeMessType('gameSayHi');
                this.addFriendEvtObj(result)
            } else if (result.msgCode === 18) { //对方在游戏操作打招呼返回结果通知
                this.judgeMessType('rejectThumb');
                this.addFriendEvtObj(result)
            } else if (result.msgCode === 20) {
                this.addFriendEvtObj(result)
                this.updateClientMsg(result.content)
                this.addBange()
            } else if (result.msgCode === 22) {
                this.addFriendEvtObj(result)
                console.log("-----------------------", this.$route)
                if (this.$route.name === "chat") {
                    this.$router.go(-1)
                }
                setTimeout(() => {
                    this.setChatFriend(result.content.fromInfo)
                    this.$router.push({
                        name: "chat",
                        params: {
                            isSoul: true,
                            id: this.staticChatFriendObj.openid
                        }
                    });
                }, 500);
            }
        },
        _websocketclose(e) {
            //关闭
            console.log("websocket关闭-----------", e)
            this.reconnectWebsocket() //重连
        },
        //拉取积分换礼品列表
        loadGoods() {
            api.loadGoods().then(res => {
                console.log('积分换礼品列表------', res);
                this.getSendGiftList(res.slice(0));
            })
        },
        // 获取用户信息
        getUserInfo() {
            api.getUserInfo().then(res => {
                console.log('个人信息-------------------------：', res);
                this.getuserInfo(res);
            }).catch(err => {
                console.log(err);
            });
        },
        //获取门店信息
        loadStoreSetting() {
            api.loadStoreSetting().then(res => {
                // console.log('门店信息---------------------------------：', res)
                this.getShopSetting(res)
            })
        },
        //创建二维码
        createQrcode() {
            api.loadAllQrcode().then(res => { //没有创建过二维码才创建
                this.saveQrCode(res.urls[0])
                if (!res.urls.length || !res.urls) {
                    api.createQrcode().then(res => {
                        // console.log('创建二维码接口--------', res);
                    });
                    // console.log('进来创建二维码了')
                }

            });
        },
        //获取店长推荐
        loadRecommends() {
            api.loadRecommends().then(res => {
                console.log('店长推荐数据---------------------', res)
                this.recommendList = res;
                this.getRecommentList(this.recommendList);
            })
        },
        //拉取约战、点赞、送礼列表
        loadMutualEvents() {
            api.loadMutualEvents().then(res => {
                if (res.errCode === 0) {
                    let mutualEventsObj = res.mutualEvents;
                    console.log(mutualEventsObj);
                    let mutualEventsList = [];
                    mutualEventsList = mutualEventsList.concat(mutualEventsObj.combatsEvents)
                    mutualEventsList = mutualEventsList.concat(mutualEventsObj.giftEvents)
                    mutualEventsList = mutualEventsList.concat(mutualEventsObj.friendEvents)
                    let count = mutualEventsList.length;
                    console.log('count--------', count)
                    this.CalcManualEventsCount(count);
                }
                this.addBange();
                // console.log('拉取约战、点赞、送礼列表------------------------------', this.mutualEventsList)
            })
        },
        ...mapMutations({
            setChatFriend: "SET_CHAT_FRIEND", //全局设置聊天对象的信息
            updateClientMsg: "UPDATE_CLIENTMSG", //推送更新客服消息
            saveQrCode: "SAVEQRCODE",
            getRecommentList: "GET_RECOMMENTLIST", //获取店长推荐
            connect_websocket: "CONNECT_WEBSOCKET",
            appendLastMsg: "UPDATE_CHATLIST",
            updateValue: "UPDATE_INPUTVALUE",
            addBange: "ADD_BADGE",
            judgeInviteCoupon: "JUDGE_INVITE_COUPON", //判断是否还有邀请有礼
            compareLastMsg: "COMPARE_LASTMESS",
            getAdvertisingImg: "GET_ADVERTISINGIMG", //获取首页轮播图
            //addFriendEvt: "ADD_FRIENDEVTLIST", //新增好友事件列表
            addFriendEvtObj: "UPDATE_DYNAMICMESSAGE", //更新好友事件提示框
            addMessageIntoQueue: "ADDMESSAGEQUEUE", //add message into messagequeue
            //getChallengeGamelist: "GET_CHALLENGEGAMELIST", //更新新增约战列表
            updateShareUrl: "UPDATE_SHAREURL", //分享地址
            getuserInfo: "GET_USERINFO", //获取用户信息
            getShopSetting: "GET_SHOPINFO", //获取门店信息
            getUrl: "GET_URL", //获取公众号地址
            judgeMessType: "JUDGE_MESSTYPE", //判断消息类型
            getSendGiftList: "GET_SENDGIFTLIST", //获取积分换礼品列表
            CalcManualEventsCount: "GET_ALLEVENTS_BADGECOUNT", //统计约战送礼点赞数量
            LoadL98Setting: "L98OTHERSETTING" //加载功能控制开关
        }),
        ...mapActions({
            //getFriendEvt: "get_FriendEvt"
        })
    },
    watch: {
        //websocket推送的最新消息
        LastChatMsg: function(newValue) {
            // console.log('在main收到对方手来的消息------------------------------------：', newValue);
            this.compareLastMsg(newValue)
        }
    },
    render: h => h(App)
}).$mount('#app-box')