// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import store from './store/index'
import router from './router/index'
import vuePicturePreview from 'vue-picture-preview'
import {
  ToastPlugin
} from 'vux'
import {
  mapMutations,
  mapState,
  mapActions
} from 'vuex'
import api from './common/api'
import config from './common/config'
Vue.use(ToastPlugin)
Vue.use(vuePicturePreview)
FastClick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  computed: {
    ...mapState(['socket', "staticChatFriendObj", "LastChatMsg"])
  },
  created() {
    let windowUrL = window.location.href;
    let index = windowUrL.indexOf('.com');
    let shareurl = windowUrL.slice(0,index);
    this.updateShareUrl(shareurl+'.com/');
    let websocketUrl = shareurl.slice(8);
    websocketUrl = `wss://${websocketUrl}.com/api/ws`
    this.websock = new WebSocket(websocketUrl);   //以上生产环境
    // this.websock = new WebSocket(`${config.websocketUrl}?tk=${config.tk}`); //开发环境
    this.websock.binaryType = "arraybuffer";
    this.connect_websocket(this.websock);
    this.socket.onopen = this.websocketonopen;
    this.socket.onerror = this.websocketonerror;
    this.socket.onmessage = this.websocketonmessage;
    this.socket.onclose = this.websocketclose;
    this._acquireWaitGetCoupons(); //判断是否已经领取AI优惠券
    this._createQrcode(); //创建二维码
    this._getUserInfo(); //获取用户信息
    this._loadStoreSetting(); //获取门店信息
    //this.getWeChatUrl(); //获取公众号地址
    this._loadGoods(); //拉取积分换礼品列表
    this._loadRecommends();//获取店长推荐
    this._loadMutualEvents() //统计约战送礼点赞
  },
  mounted() {},
  methods: {
    getWeChatUrl() {
      let url = window.location.href.split('/#')[0];
      // alert(url);
      this.getUrl(url);
    },
    websocketonopen(e) {
      console.log("WebSocket连接成功");
    },
    websocketonerror(e) {
      //错误
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage(e) {
      //数据接收
      var decc = new TextDecoder("utf-8");
      let result = JSON.parse(decc.decode(e.data));
      console.log('websocket推送消息-------------------------', result)
      this.addFriendEvtObj(result)
      //处理聊天消息
      if (result.msgCode === 1) {
        let message = result.content.extMsg
        this.appendLastMsg(message);
        // // 判断是否在聊天页面；是在聊天页面返回from给服务器表示消息已读
        let reg = new RegExp(message.lastMsg.from)
        if (reg.test(this.$route.path)) {
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
        console.log(result)
        this._loadMutualEvents();
        //this.addFriendEvt(result.content.fromInfo) //往点赞列表新增一条数据
        // let cursor = 0
        // this.getFriendEvt(cursor);
        this.judgeMessType('thumb')
      }
      //处理送礼
      else if (result.msgCode === 3) {
        this._loadMutualEvents();
        this.judgeMessType('gift')
      } else if (result.msgCode === 4) { //发布优惠券
        this.judgeMessType('discount')
      }
      //处理约战事件
      else if (result.msgCode === 7) {
        // this.getChallengeGamelist(result.content);
        this._loadMutualEvents();
        this.addBange();
        this.judgeMessType('playGame')
      }
      //上线通知
      else if (result.msgCode === 8) {
        this.judgeMessType('onlineNotice');
      } else if (result.msgCode === 9) {
        this.judgeMessType('shareGetIntegral');
      }
    },
    websocketclose(e) {
      //关闭
      console.log("connection closed (" + e.code + ")");
    },
    //拉取积分换礼品列表
    _loadGoods() {
      api.loadGoods().then(res => {
        // console.log('积分换礼品列表------', res);
        this.getSendGiftList(res.slice(0,4));
      })
    },
    //自动领取优惠券
    _acquireWaitGetCoupons() {
      let channel = 1 //channel为1是AI优惠券类型
      setTimeout(() => {
        api.acquireWaitGetCoupons(channel).then(res => {
          console.log("AI优惠券------------------------------", res);
          if (res.coupons.length > 0) {
            let result = {
              msgCode: 4,
              content: {
                extMsg: {},
                fromInfo: {
                  openid: "",
                  headimgurl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966911743&di=b3b81acff7cdc59f21ec7cbde8b13298&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110928%2F0017030291764688_b.jpg"
                },
              }
            }
            this.addFriendEvtObj(result);
            this.judgeMessType('discount');
          }
        }).catch(err => {
          console.log(err)
        })
      }, 10000);
    },
    // 获取用户信息
    _getUserInfo() {
      api.getUserInfo().then(res => {
        console.log('个人信息-------------------------：', res);
        this.getuserInfo(res);
      }).catch(err => {
        console.log(err);
      });
    },
    //获取门店信息
    _loadStoreSetting() {
      api.loadStoreSetting().then(res => {
        // console.log('门店信息---------------------------------：', res)
        this.getShopSetting(res)
      })
    },
    //创建二维码
    _createQrcode() {
      api.loadAllQrcode().then(res => { //没有创建过二维码才创建
        if (!res.urls.length || !res.urls) {
          api.createQrcode().then(res=>{
              console.log('创建二维码接口--------',res);
          });
          console.log('进来创建二维码了')
        }

      });
    },
    //获取店长推荐
    _loadRecommends() {
      api.loadRecommends().then(res => {
        // console.log('店长推荐数据---------------------', res)
        this.recommendList = res;
        this.getRecommentList(this.recommendList);
      })
    },
     //拉取约战、点赞、送礼列表
     _loadMutualEvents() {
      api.loadMutualEvents().then(res => {
        if (res.errCode === 0) {
          let mutualEventsObj = res.mutualEvents;
          console.log(mutualEventsObj);
          let mutualEventsList = [];
          mutualEventsList = mutualEventsList.concat(mutualEventsObj.combatsEvents)
          mutualEventsList = mutualEventsList.concat(mutualEventsObj.giftEvents)
          mutualEventsList = mutualEventsList.concat(mutualEventsObj.friendEvents)
          let count = mutualEventsList.length;
          console.log('count--------',count)
          this.CalcManualEventsCount(count);
        }
        this.addBange();
        console.log('拉取约战、点赞、送礼列表------------------------------', this.mutualEventsList)
      })
    },
    ...mapMutations({
      getRecommentList: "GET_RECOMMENTLIST", //获取店长推荐
      connect_websocket: "CONNECT_WEBSOCKET",
      appendLastMsg: "UPDATE_CHATLIST",
      updateValue: "UPDATE_INPUTVALUE",
      addBange: "ADD_BADGE",
      compareLastMsg: "COMPARE_LASTMESS",
      //addFriendEvt: "ADD_FRIENDEVTLIST", //新增好友事件列表
      addFriendEvtObj: "UPDATE_DYNAMICMESSAGE", //更新好友事件提示框(左侧信封弹出触发)
      //getChallengeGamelist: "GET_CHALLENGEGAMELIST", //更新新增约战列表
      updateShareUrl: "UPDATE_SHAREURL", //苹果分享地址
      getuserInfo: "GET_USERINFO", //获取用户信息
      getShopSetting: "GET_SHOPINFO", //获取门店信息
      getUrl: "GET_URL", //获取公众号地址
      judgeMessType: "JUDGE_MESSTYPE", //判断消息类型
      getSendGiftList: "GET_SENDGIFTLIST", //获取积分换礼品列表
      CalcManualEventsCount:"GET_ALLEVENTS_BADGECOUNT"//统计约战送礼点赞数量
    }),
    ...mapActions({
      //getFriendEvt: "get_FriendEvt"
    })
  },
  watch: {
    //websocket推送的最新消息
    LastChatMsg: function (newValue) {
      // console.log('在main收到对方手来的消息------------------------------------：', newValue);
      this.compareLastMsg(newValue)
    }
  },
  render: h => h(App)
}).$mount('#app-box')
