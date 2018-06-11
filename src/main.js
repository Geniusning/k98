// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import store from './store/index'
import router from './router/index'
import vuePicturePreview from 'vue-picture-preview'
import { ToastPlugin } from 'vux'
import VueSocketio from 'vue-socket.io';
import Url from './common/url'
import api from './common/api'

Vue.use(ToastPlugin)
Vue.use(vuePicturePreview)

FastClick.attach(document.body)
Vue.config.productionTip = false

import { mapMutations, mapState } from 'vuex'
/* eslint-disable no-new */
new Vue({
  router,
  store,
  computed: {
    ...mapState(['socket', "staticChatFriendObj", "LastChatMsg"])
  },
  created() {
    this.websock = new WebSocket("ws://llwant.test.qianz.com/api/ws?tk=ARB154f2FviEbekQN2O_abdN-CYKDYK6SBGEbgPkZdv3FSYPaBzcV8TCrKqO6rWWBXkZUA==");
    // this.websock = new WebSocket("ws://llwant.test.qianz.com/api/ws");
    this.websock.binaryType = "arraybuffer";
    this.connect_websocket(this.websock)
    this.socket.onopen = this.websocketonopen;
    this.socket.onerror = this.websocketonerror;
    this.socket.onmessage = this.websocketonmessage;
    this.socket.onclose = this.websocketclose;
  },
  mounted() {

  },
  methods: {
    websocketonopen(e) {
      console.log("WebSocket连接成功");
    },
    websocketonerror(e) {
      //错误
      console.log(e);
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage(e) {
      //数据接收
      var decc = new TextDecoder("utf-8");
      let result = JSON.parse(decc.decode(e.data));
      console.log(result);
      //处理聊天消息
      if (result.msgCode == 1) {
        this.appendLastMsg(result.content);
        // // 判断是否在聊天页面；是在聊天页面返回from给服务器表示消息已读
        // let reg = /\/message\/+this.staticChatFriendObj/;
        let reg = new RegExp(result.content.lastMsg.from)
        console.log(reg.test(this.$route.path))
        if (reg.test(this.$route.path)) {
          let fromId = result.content.lastMsg.from;
          //发送消息表示已读
          api.sendMsgReaded(fromId).then(res=>{
            console.log(res)
          })
        }
      }
    },
    websocketclose(e) {
      //关闭
      console.log("connection closed (" + e.code + ")");
      console.log(new Date())
    },
    //微信支付
    onBridgeReady() {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "appId": "wx2421b1c4370ec43b",     //公众号名称，由商户传入     
          "timeStamp": "1395712654",         //时间戳，自1970年以来的秒数     
          "nonceStr": "e61463f8efa94090b1f366cccfbbb444", //随机串     
          "package": "prepay_id=u802345jgfjsdfgsdg888",
          "signType": "MD5",         //微信签名方式：     
          "paySign": "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
        },
        function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") { }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
        }
      );
    },

    ...mapMutations({
      connect_websocket: "CONNECT_WEBSOCKET",
      appendLastMsg: "UPDATE_CHATLIST",
      updateValue: "UPDATE_INPUTVALUE",
      addBange: "ADD_BADGE"
    })
  },
  watch: {
    //websocket推送的最新消息
    // LastChatMsg: function (newValue) {
    //   console.log(newValue)
    // }
  },
  render: h => h(App)
}).$mount('#app-box')
