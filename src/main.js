// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import store from './store/index'
import router from './router/index'
import vuePicturePreview from 'vue-picture-preview'
import { ToastPlugin } from 'vux'
import {
    mapMutations,
    mapState,
    mapActions
} from 'vuex'
import api from './common/api'
import util from 'common/util'
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
        // 苹果设备
        if (!util.isAndroid()) {
            let _urlIos = window.location.href.split('#')[0];
            this.updateShareUrl(_urlIos); //更改分享url
        }
        this.websock = new WebSocket("ws://llwant.test.qianz.com/api/ws?tk=-cpX1ha2aJpZ9-IPx5hXZ3L6IqkrwDTStSm9nmORJP9JYcW0w6uZWc7nCgDMj9rSYHunHQ==");
        // this.websock = new WebSocket("ws://llwant.test.qianz.com/api/ws");
        this.websock.binaryType = "arraybuffer";
        this.connect_websocket(this.websock);
        this.socket.onopen = this.websocketonopen;
        this.socket.onerror = this.websocketonerror;
        this.socket.onmessage = this.websocketonmessage;
        this.socket.onclose = this.websocketclose;
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
            console.log('对方发来的信息-------------------------', result)
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
            }
            //处理好友点赞事件
            if (result.msgCode === 2) {
                console.log(result)
                this.addFriendEvt(result.content.fromInfo) //往点赞列表新增一条数据
                    // this.addFriendEvtObj(result)
                let cursor = 0
                this.getFriendEvt(cursor)
            }
        },
        websocketclose(e) {
            //关闭
            console.log("connection closed (" + e.code + ")");
        },
        ...mapMutations({
            connect_websocket: "CONNECT_WEBSOCKET",
            appendLastMsg: "UPDATE_CHATLIST",
            updateValue: "UPDATE_INPUTVALUE",
            addBange: "ADD_BADGE",
            compareLastMsg: "COMPARE_LASTMESS",
            addFriendEvt: "ADD_FRIENDEVTLIST", //新增好友事件列表
            addFriendEvtObj: "UPDATE_DYNAMICMESSAGE", //更新好友事件提示框
            updateShareUrl: "UPDATE_SHAREURL",
        }),
        ...mapActions({
            getFriendEvt: "get_FriendEvt"
        })
    },
    watch: {
        //websocket推送的最新消息
        LastChatMsg: function(newValue) {
            console.log('在main收到对方手来的消息------------------------------------：', newValue);
            this.compareLastMsg(newValue)
        }
    },
    render: h => h(App)
}).$mount('#app-box')