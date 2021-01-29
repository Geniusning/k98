/*
 * @Author: liuning
 * @Date: 2020-05-04 14:49:48
 * @Last Modified by: liuning
 * @Last Modified time: 2021-01-29 17:17:36
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import store from './store/index'
import router from './router/index'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import IntroJs from 'intro.js'
import 'intro.js/introjs.css';


// import vuePicturePreview from 'vue-picture-preview'
import { ToastPlugin, LoadingPlugin } from 'vux'
import { mapMutations, mapState, mapActions } from 'vuex'
import { Cascader } from 'element-ui';
import api from 'common/api'
import util from "common/util";
import config from 'common/config'

Vue.use(IntroJs);
Vue.use(Cascader)
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
    ...mapState(['socket', "staticChatFriendObj", "LastChatMsg", "userInfo", "soulCursor",
      "soulResult", "otherWechatMsg"
    ])
  },
  data () {
    return {
      pingNumer: 0,
      timer: "",
      limitTimes: 0,
      lockReconnect: null,
      openId: ''
    }
  },
  created () {
    if (!util.isAndroid()) {
      // let wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
      // let versionNumber = wechatInfo[1].split(".").join("")
      // if (versionNumber > 7014) {
        window.iosSignUrl = window.location.href.split('#')[0]
        util._getJssdkConfig(window.iosSignUrl)
      } 
      // else {
      //   window.onload = function () {
      //     window.iosSignUrl = window.location.href.split('#')[0]
      //     setTimeout(() => {
      //       console.log("window.iosSignUrl----", window.iosSignUrl)
      //       util._getJssdkConfig(window.iosSignUrl)
      //     }, 1500);
      //   }
      // }
    // }
    this.deskCode = util.GetQueryString("deskCode")
    this.deskId = util.GetQueryString("deskID")
    this.saveDeskCode({
      deskCode: this.deskCode,
      deskId: this.deskId
    })
    this.getUserInfo(); //获取用户信息 this.openId
    this.loadAdvertisingPhoto(); //拉取首页轮播图
    this.createQrcode(); //创建二维码
    this.loadStoreSetting(); //获取门店信息
    this.loadGoods(); //拉取积分换礼品列表
    this.loadRecommends(); //获取店长推荐
    this.loadMutualEvents() //统计约战送礼点赞
    this.loadL98otherSetting() //加载控制开关
    this.createWebsocket() //创建长链接
    this.getCaptainMessList() //店长群发通知
    this.loadStaffCouponAct() //员工送券活动通知
    this.loadPublisherIdlist() //拉取供求发布者id
    setInterval(() => { //每隔10秒拉取用户在其他公众号的消息
      this.loadUserOtherShopInfo()
    }, 20000);
  },
  mounted () {
   
    window.addEventListener("unload", () => {
      this.setChatFriend({}); //清除vuex里面保存的聊天好友对象
      localStorage.removeItem("friendInfo");
      localStorage.removeItem("rainAllowRecord") //清楚缓存
      sessionStorage.removeItem("identity")
    })
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        // this.getUserInfo()
      } else if (document.visibilityState === 'hidden') {
        console.log('后台')
      }
    })
    setTimeout(() => { //13秒过后如果用户没有离开系统则把用户放入待被邀请游戏队列
      this.addWaitingCombatList()
    }, 13000);
  },
  methods: {
    //创建长连接
    createWebsocket () {
      let windowUrL = window.location.href;
      let index = windowUrL.indexOf('.com');
      let shareurl = windowUrL.slice(0, index);
      let websocketUrl = shareurl.slice(8);
      if (this.deskCode != "") {
        this.connectUrl = `wss://${websocketUrl}.com/api/ws?deskCode=${this.deskCode}`
      } else {
        this.connectUrl = `wss://${websocketUrl}.com/api/ws`
      }
      this.websock = new WebSocket(this.connectUrl);
      this.updateShareUrl(shareurl + '.com/'); //设置全局分享时的域名
      // this.websock = new WebSocket(`${config.websocketUrl}?tk=${config.tk}&deskCode=1`); //开发环境 wss://llwant1.qianz.com/api/ws
      this.websock.binaryType = "arraybuffer";
      this.initWebsocket()
    },

    //初始化长连接
    initWebsocket () {
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose
    },
    //重连长链接
    reconnectWebsocket () {
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
    loadUserOtherShopInfo () {
      api.loadUserOtherShopInfo(this.userInfo.phone).then(res => {
        if(res.errCode===0){
          this.saveUserOtherWechatMsg(res.info)
        }
        console.log("其他公众号消息=", this.otherWechatMsg)
      })
    },
    //关闭公众号
    closeWebPage () {
      WeixinJSBridge.invoke("closeWindow", {}, function (res) {
        // alert(res.err_msg);
        // window.location.href =
        //   "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU3MTc1MzA1OA==#wechat_redirect";
      });
    },
    //成为待被邀请队列成员
    addWaitingCombatList () {
      api.addWaitingCombatList().then(res => {
        //console.log("成为待被邀请队列成员-----------", res)
      })
    },
    //拉取供求发布者id
    loadPublisherIdlist () {
      api.loadPublisherList("supply").then(res => {
        if (res.errCode === 0) {
          // console.log("拉取供求发布者id---", res)
          this.savePublisherIdList(res.info.publisherIds)
        }
      })
    },
    //加载L98控制开关信息
    loadL98otherSetting () {
      api.loadL98otherSetting().then(res => {
        // console.log("控制开关--------", res)
        this.LoadL98Setting(res)
      })
    },
    loadAdvertisingPhoto () {
      api.loadAdvertisingPhoto().then(res => {
        //console.log('轮播图-------------------------：', res.adPhotoURL)
        this.getAdvertisingImg(res.adPhotoURL);

      })
    },
    getWeChatUrl () {
      let url = window.location.href.split('/#')[0];
      this.getUrl(url);
    },
    websocketonopen (e) {
      //console.log("WebSocket连接成功");
      this.timer = setInterval(() => {
        let msg = {
          ops: 25,
        }
        var decc = new TextEncoder()
        this.websock.send(decc.encode((JSON.stringify(msg)))); //给服务器发送ping
        this.pingNumer++;
        // //console.log("this.pingNumer", this.pingNumer)
        if (this.pingNumer > 5) { //发送三次无响应后重连
          this.reconnectWebsocket()
          clearTimeout(this.timer)
        }
      }, 50000);
    },
    websocketonerror (e) {
      //错误
      //console.log("WebSocket连接发生错误");
      this.reconnectWebsocket() //重连
    },
    //数据接收
    websocketonmessage (e) {
      let cacheOpenId = sessionStorage.getItem('identity') ? sessionStorage.getItem('identity') : this.userInfo.openid
      var decc = new TextDecoder("utf-8");
      let result = JSON.parse(decc.decode(e.data));
      console.log('websocket接受消息-------------------------', result)
      if (result.ops == 25) {
        let msg = {
          ops: 26,
        }
        this.websock.send(JSON.stringify(msg)); //给服务器发送ping
        this.pingNumer = 0;
        // //console.log('客户端发送pong心跳----', this.pingNumer);
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
          //console.log("是否进来标记已读")
          //console.log("message----", message)
          // let fromId = message.allInfo.lastMsg.from;
          let fromId = message.lastMsg.from;
          //发送消息表示已读
          api.sendMsgReaded(fromId).then(res => {
            if (res.errCode == 0) {
              console.log('消息已读')
            }
          })
        }
        this.judgeMessType('message')
        if (result.identiry != cacheOpenId) {
          this.addDivideNum(1)
          return
        }

      }
      //处理好友点赞事件
      else if (result.msgCode === 2) {
        this.loadMutualEvents();
        this.judgeMessType('thumb')

        if (result.identiry != cacheOpenId) {
          this.addDivideNum(1)
          return
        } else {
          this.addMessageIntoQueue(result)
        }
      }
      //处理送礼
      else if (result.msgCode === 3) {
        this.loadMutualEvents();
        this.judgeMessType('gift')

        if (result.identiry != cacheOpenId) {
          this.addDivideNum(1)
          return
        } else {
          this.addMessageIntoQueue(result)
        }
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
        var message = result.content.extMsg
        let reg = new RegExp("/message/chat")
        if (reg.test(this.$route.fullPath)) {
          let fromId = message.inviterID;
          //发送消息表示已读
          api.sendMsgReaded(fromId).then(res => {
            if (res.errCode == 0) {
              console.log('消息已读')
            }
          })
        }
        this.judgeMessType('playGame')
        if (result.identiry != cacheOpenId) {
          this.addDivideNum(1)
          return
        } else {
          console.log("this.addMessageIntoQueue(result)---")
          this.addMessageIntoQueue(result)
        }
      } else if (result.msgCode === 24) { //游戏队列约战
        this.loadMutualEvents();
        this.addBange();
        this.judgeMessType('playGame')

        if (result.identiry != cacheOpenId) {
          this.addDivideNum(1)
          return
        } else {
          this.addMessageIntoQueue(result)
        }
        // this.addFriendEvtObj(result)
      } else if (result.msgCode === 8) { //上线通知
        this.judgeMessType('onlineNotice');
        this.addFriendEvtObj(result)
      } else if (result.msgCode === 29) { //贵宾上线通知
        this.addFriendEvtObj(result)
      } else if (result.msgCode === 9) { //分享获得积分通知
        console.log("分享获得积分")
        this.addFriendEvtObj(result)
        this.judgeMessType('shareGetIntegral');
      } else if (result.msgCode === 12) { //好友送礼
        this.loadMutualEvents();
        this.addBange();
        this.judgeMessType('gift')

        if (result.identiry != cacheOpenId) {
          this.addDivideNum(1)
          return
        } else {
          //console.log("添加消息进队列")
          this.addMessageIntoQueue(result)
        }
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
      } else if (result.msgCode === 28) { //收银员对话推送
        // this.addFriendEvtObj(result)
        this.updateCashierMsg(result.content)
        this.addBange()
      } else if (result.msgCode === 21) { //灵魂匹配待被查找
        this.addFriendEvtObj(result)
      } else if (result.msgCode === 22) { //灵魂匹配待回复，然后被拉入聊天框
        this.addFriendEvtObj(result)
        if (result.content.extMsg.isAgree) {
          if (this.$route.name === "chat") {
            this.$router.go(-1)
          }
          this.updateSoulParams({
            cursor: this.soulCursor,
            flag: true
          })

          this.setChatFriend(result.content.fromInfo)
          this.$router.push({
            name: "chat",
            params: {
              isSoul: true,
              id: this.staticChatFriendObj.openid
            }
          });

        } else { //如果被拒绝 继续搜索
          api.searchWaitBeMakeFriUser(this.soulCursor).then(res => {
            console.log("搜索结果----------", res);
            if (res.errCode === 0) {
              this.updateSoulParams({
                cursor: res.info.cursor,
                flag: true
              })
            }
          });
        }
      } else if (result.msgCode === 25) {
        this.loadSameDeskInfo(result.content.extMsg)
      } else if (result.msgCode === 27) {
        this.judgeMessType('successGift');
        this.addFriendEvtObj(result)
      }
    },
    websocketclose (e) {
      console.log("websocket关闭-----------", e)
      this.reconnectWebsocket() //重连
    },
    //拉取积分换礼品列表
    loadGoods () {
      api.loadGoods().then(res => {
        // console.log('积分换礼品列表------', res);
        this.getSendGiftList(res.slice(0));
      })
    },
    // 获取用户信息
    getUserInfo (openId = "") {
      api.getUserInfo(openId).then(res => {
        console.log('个人信息-------------------------：', res);
        this.getuserInfo(res);
        this.loadUserOtherShopInfo()
      }).catch(err => {
        console.log(err);
      });
    },
    //获取门店信息
    loadStoreSetting () {
      api.loadStoreSetting().then(res => {
        // console.log('门店信息---------------------------------：', res)
        this.getShopSetting(res)
      })
    },
    //创建二维码
    createQrcode () {
      api.loadAllQrcode().then(res => { //没有创建过二维码才创建
        this.saveQrCode(res.urls[0])
        if (!res.urls.length || !res.urls) {
          api.createQrcode().then(res => {
            //console.log('创建二维码接口--------', res);
          });
          // //console.log('进来创建二维码了')
        }
      });
    },
    //获取在线店长推荐
    loadRecommends () {
      api.loadRecommends().then(res => {
        // console.log('店长推荐数据---------------------', res)
        this.getRecommentList(res);
      })
    },
    // //获取全部店长推荐
    // loadAllRecommends () {
    //   api.loadAllRecommends().then(res => {
    //     console.log('全部店长推荐数据---------------------', res)
    //     this.getAllRecommentList(res);
    //   })
    // },
    //拉取约战、点赞、送礼列表
    loadMutualEvents () {
      api.loadMutualEvents().then(res => {
        if (res.errCode === 0) {
          let mutualEventsObj = res.mutualEvents;
          let mutualEventsList = [];
          mutualEventsList = mutualEventsList.concat(mutualEventsObj.combatsEvents === null ? [] : mutualEventsObj.combatsEvents)
          mutualEventsList = mutualEventsList.concat(mutualEventsObj.giftEvents === null ? [] : mutualEventsObj.giftEvents)
          mutualEventsList = mutualEventsList.concat(mutualEventsObj.friendEvents === null ? [] : mutualEventsObj.friendEvents)
          mutualEventsList = mutualEventsList.concat(
            mutualEventsObj.commentEvents === null ? [] : mutualEventsObj.commentEvents
          );
          mutualEventsList = mutualEventsList.concat(
            mutualEventsObj.subscribeEvents === null ? [] : mutualEventsObj.subscribeEvents
          );
          let count = mutualEventsList.length;
          this.CalcManualEventsCount(count);
          this.addBange();
        }
        // //console.log('拉取约战、点赞、送礼列表------------------------------', this.mutualEventsList)
      })
    },
    //拉取员工送券活动
    loadStaffCouponAct () {
      api.loadStaffCouponAct().then(res => {
        //console.log("员工送券活动-------", res)
        if (res.errCode === 0) {
          this.getStaffCouponInfo(res.coupon)
        }
      })
    },
    ...mapMutations({
      getStaffCouponInfo: "GETSTAFFCOUPONINFO", //存储员工送券活动数据
      setChatFriend: "SET_CHAT_FRIEND", //全局设置聊天对象的信息
      updateClientMsg: "UPDATE_CLIENTMSG", //推送更新客服消息
      updateCashierMsg: "UPDATE_CASHIERMSG", //推送更新收银消息
      saveQrCode: "SAVEQRCODE",
      getRecommentList: "GET_RECOMMENTLIST", //获取在线店长推荐
      appendLastMsg: "UPDATE_CHATLIST",
      addBange: "ADD_BADGE",
      compareLastMsg: "COMPARE_LASTMESS",
      getAdvertisingImg: "GET_ADVERTISINGIMG", //获取首页轮播图
      addFriendEvtObj: "UPDATE_DYNAMICMESSAGE", //更新好友事件提示框
      judgeMessType: "JUDGE_MESSTYPE", //判断消息类型
      addMessageIntoQueue: "ADDMESSAGEQUEUE", //add message into messagequeue
      updateShareUrl: "UPDATE_SHAREURL", //分享地址
      getuserInfo: "GET_USERINFO", //获取用户信息
      getShopSetting: "GET_SHOPINFO", //获取门店信息
      getUrl: "GET_URL", //获取公众号地址
      getSendGiftList: "GET_SENDGIFTLIST", //获取积分换礼品列表
      CalcManualEventsCount: "GET_ALLEVENTS_BADGECOUNT", //统计约战送礼点赞数量
      LoadL98Setting: "L98OTHERSETTING", //加载功能控制开关
      loadSameDeskInfo: "GETSAMEDESKINFO", //加载同一个桌贴游戏信息
      addDivideNum: "ADDDIVIDENUM", //累加分身未读消息
      saveDeskCode: "SAVEDESKCODE", //保存桌贴号,桌号id
      updateSoulParams: "UPDATESOULPARAMS", //更新灵魂匹配参数
      savePublisherIdList: "SAVEPUBLISHERID", //拉取供求者id
      saveUserOtherWechatMsg: "SAVEALLIANCEINFO" //拉取用户在其他公众号的消息
    }),
    ...mapActions({
      //getFriendEvt: "get_FriendEvt"
      getCaptainMessList: "get_captainMessageList" //获取店长信息
    })
  },
  watch: {
    //websocket推送的最新消息
    LastChatMsg: function (newValue) {
      // //console.log('在main收到对方手来的消息------------------------------------：', newValue);
      this.compareLastMsg(newValue)
    }
  },
  render: h => h(App)
}).$mount('#app-box')
