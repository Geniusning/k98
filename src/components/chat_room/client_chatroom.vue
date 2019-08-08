<template>        
  <transition name="fade">
    <div id="chat" class="chatRoom">
      <div class="chat_nav">
        <div class="back_box">
          <img onclick="return false" src="../../assets/image/back_chat.png" alt class="back_arrow" @click="goBack">
        </div>
        <div class="name">{{staticChatFriendObj.nickname?staticChatFriendObj.nickname:"客服小哥"}}</div>
        <div class="backHome_box">
          <img onclick="return false" src="../../assets/image/chat_home.png" alt class="home" @click="goHome">
        </div>
      </div>
      <div class="chat_wrapper" ref="chatWrapper" @click="tagScroll">
        <div class="preview_pic" v-show="showPreview" ref="preview_pic" @click="closePreview"></div>
        <scroll ref="listView" class="chat_content" :scrollHeight="scrollHeight"  :data="componentChatList" :listen-scroll="listenScroll" :pullDownRefresh="pullDownRefresh" @getIndex="getIndex" @scroll="myscroll" @pullingDown="pullingDown">
          <ul class="chat_list" ref="chatList">
            <li class="clearfix chatListItem" ref="item" :class="{'friend':item.friend,'mine':!item.friend}" :key="index" v-for="(item,index) in componentChatList">
              <div v-if="item.type==1" class="message_wrapper">
                <div class="person_box">
                  <h2 class="name">{{item.time.slice(8,10)==today?item.time.slice(11):item.time.slice(5,10)}}</h2>
                  <!-- <h2 class="name">{{item.time}}</h2> -->
                  <img onclick="return false" :src="staticChatFriendObj.headimgurl?staticChatFriendObj.headimgurl:clientImg"
                    alt class="avatar" v-if="item.friend">
                  <img onclick="return false" :src="userInfo.headimgurl" alt class="avatar" v-else>
                </div>
                <div class="message_box">
                  <span v-show="item.type===1" class="arrow"></span>
                  <p class="message" style="word-break: break-all;" v-if="item.type===1" v-html="item.message"></p>
                </div>
              </div>
              <div v-if="item.type==2" class="message_wrapper">
                <div class="person_box">
                  <h2 class="name">{{item.time.slice(8,10)==today?item.time.slice(11):item.time.slice(5,10)}}</h2>
                  <img :src="staticChatFriendObj.headimgurl" alt class="avatar" v-if="item.friend">
                  <img :src="userInfo.headimgurl" alt class="avatar" v-else>
                </div>
                <div class="message_box" v-viewer>
                  <span v-show="item.type===2" class="arrow" style="background:none"></span>
                  <img :src="item.message" @load="onImgLoaded" alt class="messRecordPic"  ref="picture">
                </div>
              </div>
            </li>
          </ul>
        </scroll>
      </div>
      <div class="input_wrapper">
        <div class="input_area clearfix">
          <input type="text" ref="sendWrapper" id="send_message" class="send_message" @focus.prevent="myfocus" v-model="input_value">
          <div @click="send" class="action_box clearfix" :class="{active:flag}">
            <img src="../../assets/image/plane.png" alt class="icon_plane fl">
            <span class="send fl" ref="send">发送</span>
          </div>
        </div>
        <div class="select_area">
          <ul class="selectList clearfix">
            <li class="item fl">
              <img onclick="return false" src="../../assets/image/chat_emotion.png" alt @click="show_emotion">
            </li>
            <li class="item fl">
              <img onclick="return false" src="../../assets/image/message_chat.png" alt @click="show_expression">
            </li>
            <li class="item fl">
              <img onclick="return false" src="../../assets/image/chat_pic.png" alt>
              <input type="file" class="file" accept="image/*" @change="uploadImage">
            </li>
          </ul>
        </div>
        <div class="emotion_area" v-if="emotionShow">
          <swiper :auto="false" height="130px" :show-dots="false">
            <swiper-item class="black">
              <grid :show-vertical-dividers="true" :cols="8">
                <div @click="selectEmtion(item.name)" :key="index" v-for="(item,index) in emotionList" class="vux-center-h" style="box-sizing:border-box;display:inline-block;padding:0.2rem 0.2rem">
                  <img onclick="return false" :src="item.num" alt>
                </div>
              </grid>
            </swiper-item>
          </swiper>
        </div>
        <!-- 常用语 -->
        <div class="expression_wrapper" v-if="expressionShow">
          <ul class="expressList">
            <li class="item vux-1px-b" v-for="(item,index) in expressionList" :key="index" @click="addExpress(item)">{{item}}</li>
          </ul>
        </div>
      </div>
      <!-- 删除警告 -->
      <!-- <transition name="appear">
        <div class="warning_bg" v-show="showLaHeiPanel">
          <div class="warning_wrapper">
            <p class="warningText">确定拉黑好友吗</p>
            <div class="btnBox">
              <button class="yes" @click="quitFriend">确定</button>
              <button class="no" @click="laHei(false)">取消</button>
            </div>
          </div>
        </div>
      </transition> -->
      <!-- 信封弹框 -->
      <!-- <transition name="appear">
        <envelope v-show="isShowEnvelope" :text="envelopeText"></envelope>
      </transition> -->
      <!-- <qrCode v-show="qrIsShow" title="您还不是会员,关注享有会员特权"></qrCode> -->
      <!-- <keep-alive>
        <topUp v-show="isGiftPanel" @closeIntegralPanel="closeIntegralPanel" :friendId="friendId" :fatherPanelIndex="fatherPanelIndex"></topUp>
      </keep-alive> -->
    </div>
  </transition>
</template>

<script type='text/ecmascript-6'>
  // import envelope from 'base/envelope/envelope';
  import loading from "../../base/loading/loading";
  // import qrCode from 'base/qrCode/qrCode';
  // import topUp from 'base/topUp/topUp';
  import {
    Tab,
    TabItem,
    XHeader,
    TransferDom,
    Scroller,
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    Popup,
  } from "vux";
  import Scroll from "../../base/scroll/scroll.vue";
  import Url from "../../common/config.js";
  import api from "common/api.js";
  import util from "common/util.js";
  import Bus from 'common/bus.js'
  // import EXIF from "common/exif.js";
  import {
    mapState,
    mapMutations,
    mapGetters
  } from "vuex";
  import lrz from "lrz";
  export default {
    directives: {
      TransferDom,
      focus: function(el) {
        el.focus();
      }
    },
    data() {
      return {
        clientImg:require("../../assets/image/home_letter.png"),
        alreadyClientListCursor:0,
        isStaffOrClient:false,
        sendingTimes:0,
        isShowEnvelope: false, //信封弹框判断
        envelopeText: "", //信封弹框内容
        showPreview: false,
        scrollHeight: 500,
        // scrollToDomElement: "",
        pullDownRefresh: true,
        expressionShow: false,
        fatherPanelIndex: 1,
        isGiftPanel: false,
        friendId: "",
        expressionList:[],
        // showToast_gift: false,
        show: false,
        showTab: true,
        emotionShow: false,
        actionShow: false,
        flag: false,
        input_value: "",
        autofocus: false,
        emotionList: [
          // {
          //   name: "[微笑]",
          //   num: "/static/face/1.gif"
          // },
          // {
          //   name: "[色]",
          //   num: "/static/face/2.gif"
          // },
          {
            name: "[大哭]",
            num: "/static/face/3.gif"
          },
          {
            name: "[嘻嘻]",
            num: "/static/face/4.gif"
          },
          {
            name: "[晕]",
            num: "/static/face/7.gif"
          },
          {
            name: "[再见]",
            num: "/static/face/8.gif"
          },
          {
            name: "[爱心]",
            num: "/static/face/12.gif"
          },
          {
            name: "[点赞]",
            num: "/static/face/13.gif"
          },
          {
            name: "[握手]",
            num: "/static/face/14.gif"
          },
          {
            name: "[ok]",
            num: "/static/face/15.gif"
          },
          {
            name: "[玫瑰]",
            num: "/static/face/16.gif"
          },
        ],
        chatListIndex: 0,
        componentChatList: [],
        isscroll: true,
        // isLoading: false
      };
    },
    created() {
      this.listenScroll = true;
      this.today = new Date().getDate();
      this.today = new Date().getDate();
      if (this.today < 10) {
        this.today = "0" + this.today;
      } else {
        this.today = this.today.toString();
      }
      window.addEventListener("resize", function() {
        if (document.activeElement.tagName === "INPUT") {
          document.activeElement.scrollIntoView({
            behavior: "smooth"
          });
        }
      });
    },
    activated() {
      console.log(this.staticChatFriendObj)
      console.log(this.$route)
      if (!(JSON.stringify(this.$route.query) === "{}")) {
        this.setChatFriend(this.$route.query.info);
      }
      this.setMsgReadCliSer();//标识已读
      this._loadChatMsgCliSer(); //获取客服聊天记录 
    
      this.friendId = this.$route.params.id;
      this.isStaffOrClient = this.$route.params.isClient
      if(this.isStaffOrClient){
        this.expressionList =   [
          "客官，有啥吩咐？",
          "过来玩么？要不帮您订个台？",
          "向您推荐几样本店的好东西",
          "请关注本店，平时有空可上网店交朋友，玩大话骰"
        ]
      }else{
        this.expressionList =   [
          "请推荐下你们家有啥好玩好吃的？",
          "小二哥，现在还能订到台(房)么？",
          "小二哥，今天现场有优惠活动么？",
          "谢谢小二哥啦!"
        ]
      }
    },
    deactivated() {
      this.setChatFriend({});//清除vuex里面保存的聊天好友对象
      this.endCursor = null;
      this.componentChatList = [];
      let cursor = 0;
      this.changeCursor(cursor);
    },
    computed: {
      ...mapState([
        "userInfo",
        "staticChatFriendObj",
        // "LastChatMsg",
        "inputValue",
        "socket",
        "alreadyFriendListcursor",
        "giftList"
      ]),
      ...mapGetters(["qrIsShow", "LastChatMsg"]),
    },
    methods: {
      //标记客服消息已读
      setMsgReadCliSer(){
        api.setMsgReadCliSer(this.staticChatFriendObj.openid).then(res=>{
          console.log("客服消息已读------",res)
        })
      },
      onImgLoaded() {
        console.log('图片加载完成了')
        if(this.clientList.length>5){
            let childNodes = this.$refs.chatList.childNodes;
          this.$refs.listView.scrollBy(0,-(childNodes[0].clientHeight+10));
        }
        this.$refs.listView.refresh();
      },
      // 选择表情
      selectEmtion(item) {
        this.input_value += item;
      },
      //获取礼物列表
      _loadAllGift() {
        api.loadAllGift().then(res => {
          if (res.errCode === 0) {
            this.getGiftList(res.gifts);
          }
        })
      },
      blurAdjust() {
        setTimeout(() => {
          if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
            return
          }
          let result = 'pc';
          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
            result = 'ios'
          } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
            result = 'android'
          }
          if (result = 'ios') {
            document.activeElement.scrollIntoViewIfNeeded(true);
          }
        }, 400)
      },
      //获取客服聊天消息记录列表
      _loadChatMsgCliSer(){
        api.loadChatMsgCliSer(this.alreadyClientListCursor,this.staticChatFriendObj.openid,10).then(res=>{
          var resultMessList = res.messages
          this.clientList = res.messages
          console.log("客服聊天信息-----------", res)
          var i
          for (i = resultMessList.length - 1; i >= 0; i--) {
            let item = resultMessList[i];
            this.componentChatList.push({
              message: item.content,
              friend: item.from === this.staticChatFriendObj.openid ? 1 : 0, //1为朋友，0为自己,
              type: item.type,
              time: util.timestampToTime(item.stime),
              from: item.from,
              chatMsgID: item.id,
            });
          }
         
        })

        setTimeout(() => {
            let childNodes = this.$refs.chatList.childNodes;
            let chatListHeight = 0;
            childNodes.forEach(item => {
              chatListHeight += item.clientHeight
            })
          this.scrollHeight = chatListHeight;
          this.$refs.listView.finishPullDown();
          this.$refs.listView.refresh()
          }, 100);
      },
      //成为留言者
      addCommenter(CliSerOpenID){
        api.addCommenter(CliSerOpenID).then(res=>{
          // console.log("成为留言者--------",res)
        })
      },
      //发送消息事件
      send() {
        window.scrollTo(0, 0); //解决ios键盘留白的bug
        //  this.blurAdjust();
        if (!this.input_value) {
          return;
        }
        //字符串转表情icon
        for (var i = 0; i < this.emotionList.length; i++) {
          if (this.input_value.indexOf(this.emotionList[i].name) !== -1) {
            var reg = /\[.*\]/;
            console.log(this.input_value.match(reg)[0]);
            this.input_value = this.input_value.replace(reg,`<img src=${this.emotionList[i].num} style="vertical-align: -6px;">`);
          }
        }
        //把自己发送的内容加到聊天列表里面
        this.componentChatList.push({
          message: this.input_value,
          friend: 0,
          type: 1,
          time: util.timestampToTime(new Date().getTime())
        });
        let messObj = {
          To: this.staticChatFriendObj.openid,
          Content: this.input_value,
          type: 1,
        };
        let textMessObj = JSON.stringify(messObj);
        let decc1 = new TextEncoder("utf-8");
        let result = decc1.encode(textMessObj);
        api.sendChatMsgCliSer(result).then(res => {
        this.emotionShow = false;
        this.expressionShow = false;
        let childNodes = this.$refs.chatList.childNodes;
        if(this.clientList.length>5){
          this.$refs.listView.scrollBy(0,-(childNodes[0].clientHeight+2));
        }
        if(this.clientList.length===0 && !this.isStaffOrClient){
          this.addCommenter(this.staticChatFriendObj.wxOpenID)
        }
        });
        this.input_value = "";     
        // document.getElementById("send_message").focus();   this.addCommenter()
      },
      // 发送图片
      uploadImage(e) {
        if (!e.target.files[0]) {
          return;
        }
        let vm = this;
        lrz(e.target.files[0], {
            quality: 0.1
          }).then(function(rst) {
            if (rst.base64Len > 1024 * 1024 * 1) {
              // vm.$toast("图片不能超过1MB");
              console.log("图片不能超过1MB");
              return;
            }
            let filename = rst.origin.name;
            let dataURL = rst.file;
            api.sendImageCliSer(vm.staticChatFriendObj.openid, filename, dataURL).then(res => {
                vm.componentChatList.push({
                  message: res.content,
                  friend: 0,
                  type: 2,
                  time: util.timestampToTime(new Date().getTime())
                });
                vm.$refs.listView.refresh()
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(function(err) {
            vm.$toast("压缩图片失败");
          });
      },
      //展示大图片
      showBigPic(pic) {
        this.showPreview = true;
        let htmlImage = `<img src="${pic}" style="width:9rem;height:9rem;margin:25% auto;" class="preview-img"/>`;
        this.$refs.preview_pic.innerHTML = htmlImage;
        console.log(pic);
      },
      //关闭展示图
      closePreview() {
        this.showPreview = false;
      },
      //下拉刷新
      pullingDown() {
        console.log("下拉刷新");
        if (!this.alreadyFriendListcursor || this.endCursor == 0) {
          return;
        }
        let cursor = this.alreadyFriendListcursor;
        // this.isLoading = true;
        api.getFriendMessList(cursor, this.staticChatFriendObj.openid).then(res => {
          console.log(res);
          if (!res.messages.length) {
            //如果有新消息才更改游标
            return;
          }
          this.endCursor = res.cursor;
          this.changeCursor(res.cursor);
          //this.isLoading = false; //加载loading
          this.isscroll = false; //判断下拉刷新
          let resultMessList = res.messages;
          var i;
          for (i = resultMessList.length - 1; i >= 0; i--) {
            let item = resultMessList[i];
            this.componentChatList.unshift({
              message: item.content,
              friend: item.from === this.staticChatFriendObj.openid ? 1 : 0, //1为朋友，0为自己,
              type: item.type,
              time: util.timestampToTime(item.stime),
              chatExtMsg: item.type == 3 ? item.chatExtMsg.extMsg : "",
              from: item.from,
              chatMsgID: item.id,
              isAgree: item.chatExtMsg ? item.chatExtMsg.isAgree : '',
              isHandled: item.chatExtMsg ? item.chatExtMsg.isHandled : '',
              msgType: item.chatExtMsg ? item.chatExtMsg.msgType : '',
              couponID: item.chatExtMsg ? (item.chatExtMsg.extMsg ? item.chatExtMsg.extMsg.couponID : "") : '',
              recordID: item.chatExtMsg ? (item.chatExtMsg.extMsg ? item.chatExtMsg.extMsg.recordID : "") : '',
              name: item.chatExtMsg ? (item.chatExtMsg.extMsg ? item.chatExtMsg.extMsg.name : "") : '',
              combatID: item.chatExtMsg ? (item.chatExtMsg.extMsg ? item.chatExtMsg.extMsg.combatID : "") : '',
              inviterID: item.chatExtMsg ? (item.chatExtMsg.extMsg ? item.chatExtMsg.extMsg.inviterID : "") : '',
              url: item.chatExtMsg ? (item.chatExtMsg.extMsg ? item.chatExtMsg.extMsg.url : "") : '',
            });
          }
          this.$refs.listView.finishPullDown();
          this.$refs.listView.scrollTo(0, 0, 1000);
          this.$refs.listView.refresh();
        });
      },
      tagScroll() {
        window.scrollTo(0, 0);
        this.expressionShow = false;
        this.emotionShow = false;
        document.getElementById("send_message").blur();
        // this.blurAdjust();
      },
      //返回
      goBack() {
        this.$router.go(-1);
      },
      //返回主页
      goHome() {
        this.$router.push({
          name: "home"
        });
      },
      //选择表情
      select_emotion(item) {
        console.log(item);
        this.input_value += item;
      },
      //选择常用语
      addExpress(item) {
        this.input_value += item;
      },
      //展示表情面板
      show_emotion() {
        this.emotionShow = !this.emotionShow;
        this.expressionShow = false;
      },
      //切换常用语
      show_expression() {
        this.expressionShow = !this.expressionShow;
        this.emotionShow = false;
      },
      myfocus() {
        this.emotionShow = false;
        this.expressionShow = false;
        this.isscroll = true; //允许动态滚动到最底部记录
      },
      ...mapMutations({
        setChatFriend: "SET_CHAT_FRIEND", //全局设置聊天对象的信息
        updateChatList: "UPDATE_CHATLIST",
        showQrcode: "SHOW_QRCODE", //暂时二维码
        updateValue: "UPDATE_INPUTVALUE",
        changeCursor: "CHANGE_CURSOR",
        getGiftList: "GET_GIFTLIST", //获取礼物
      })
    },
    watch: {
      // LastChatMsg: function(newValue) {
      //   console.log('在聊天页面收到对方发来的消息-------------------------------：', newValue);
      //   this.sendingTimes = 0; //清空限制连续发送消息次数
      //   let messageInfo = newValue.allInfo.lastMsg;
      //   if (messageInfo.type == 3 || messageInfo.type == 4) { //如果是送礼和约战则不在聊天框显示
      //     return
      //   }
      //   if (messageInfo.from == this.staticChatFriendObj.openid) {
      //     //判断是否是进入时原来的两个人进行聊天
      //     this.componentChatList.push({
      //       message: messageInfo.content ? messageInfo.content : "",
      //       friend: messageInfo.from === this.staticChatFriendObj.openid ? 1 : 0, //1为朋友，0为自己
      //       from: messageInfo.from,
      //       type: messageInfo.type, //1 聊天消息 2.图标，3.送礼，4.约战
      //       time: util.timestampToTime(messageInfo.stime),
      //       chatMsgID: messageInfo.id,
      //       isAgree: messageInfo.chatExtMsg ? messageInfo.chatExtMsg.isAgree : '',
      //       isHandled: messageInfo.chatExtMsg ? messageInfo.chatExtMsg.isHandled : '',
      //       msgType: messageInfo.chatExtMsg ? messageInfo.chatExtMsg.msgType : '',
      //       couponID: messageInfo.chatExtMsg ? (messageInfo.chatExtMsg.extMsg ? messageInfo.chatExtMsg.extMsg.couponID : "") : '',
      //       recordID: messageInfo.chatExtMsg ? (messageInfo.chatExtMsg.extMsg ? messageInfo.chatExtMsg.extMsg.recordID : "") : '',
      //       name: messageInfo.chatExtMsg ? (messageInfo.chatExtMsg.extMsg ? messageInfo.chatExtMsg.extMsg.name : "") : '',
      //       combatID: messageInfo.chatExtMsg ? (messageInfo.chatExtMsg.extMsg ? messageInfo.chatExtMsg.extMsg.combatID : "") : '',
      //       inviterID: messageInfo.chatExtMsg ? (messageInfo.chatExtMsg.extMsg ? messageInfo.chatExtMsg.extMsg.inviterID : "") : '',
      //       url: messageInfo.chatExtMsg ? (messageInfo.chatExtMsg.extMsg ? messageInfo.chatExtMsg.extMsg.url : "") : '',
      //     });
      //     // console.log('聊天记录-------------', this.componentChatList)
      //     setTimeout(() => {
      //       let childNodes = this.$refs.chatList.childNodes;
      //       console.log("LastChatMsg_childNodes-------------",childNodes) 
      //       this.$refs.listView.scrollBy(0,-(childNodes[0].clientHeight));
      //     }, 100);
      //     // this.$refs.listView.refresh();
      //   }
      // },
      input_value: function(newValue, oldValue) {
        if (newValue.length > 0 || oldValue > 0) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      },
      // chatListIndex: function(newValue) {
      //   if (this.isscroll) {
      //     this.$nextTick(function() {
      //       let childNodes = this.$refs.chatList.childNodes;
      //       console.log(childNodes)
      //       let chatListHeight = 0;
      //       childNodes.forEach(item => {
      //         chatListHeight += item.clientHeight
      //       })
      //       this.scrollHeight = chatListHeight;
      //       console.log('父页面scrollHeight：', this.scrollHeight);
      //     });
      //   }
      // }
    },
    components: {
      XHeader,
      TransferDom,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Grid,
      GridItem,
      Scroll,
      Popup,
    }
  };
</script>

<style scoped lang='less'>
  @import "../../assets/less/variable.less";
  @import "../../assets/less/chat.less";
  .chatRoom {
    position: fixed;
    z-index: 7;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    .chat_nav {
      height: 1.1733rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      padding: 0.32rem 0.4rem 0.32rem 0;
      background: #ddd;
      .back_box {
        padding: 0 0.4rem;
        box-sizing: border-box;
        .back_arrow {
          width: 0.32rem;
          height: 0.5333rem;
        }
      }
      .name {
        color: #333;
        font-size: 0.4267rem;
      }
      .backHome_box {
        .home {
          width: 0.64rem;
          height: 0.5867rem;
        }
      }
    }
    .chat_wrapper {
      flex: 1;
      padding: 0 0.3733rem;
      background: #eee;
      overflow-y: auto;
      position: relative;
      .preview_pic {
        position: fixed;
        text-align: center;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 998;
        background: rgba(0, 0, 0, 0.3);
        .preview-img {
          width: 2rem;
        }
      }
      .chat_content {
        height: 100%;
        .chat_list {
          .chatListItem {
            padding: 0.4rem 0;
            box-sizing: border-box;
          }
          .friend {
            .chatList(left, #fff);
            .arrow {
              .arrowDot(#fff);
              left: -0.05rem;
            }
          }
          .messRecordPic {
            width: 1.8rem;
            height: 2rem;
          }
          .mine {
            width: 100%;
            .chatList(right, #ffd800);
            .arrow {
              .arrowDot(#ffd800);
              right: -0.05rem;
            }
            .message_box {
              margin-right: 0.2667rem;
            }
          }
          .messRecordPic {
            width: 1.8rem;
            height: 2rem;
          }
          .gift_wrapper {
            text-align: left;
            display: flex;
            flex-direction: column;
            align-items: center;
            .myGifoInfo {
              &.friendPanel {
                background: #ffffff;
              }
              &.minePanel {
                background: #FFD800;
              }
              border-radius: 0.08rem;
              color: #333;
              box-sizing: border-box;
              padding: 0.1667rem 0.1333rem;
              .gift {
                margin-top: 0.2333rem;
                margin-bottom: 0.1333rem;
                display: flex;
                justify-content: space-around;
                .giftImg {
                  img {
                    width: 1.1rem;
                    height: 1.1rem;
                  }
                }
                .giftDesc {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  .giftName {}
                  .giftIntegral {}
                }
              }
            }
            .giftRecord_test {
              width: 100%;
              display: inline-block;
              padding: 0.08rem 0.1067rem;
              border-radius: 0.08rem;
              color: #fff;
              text-align: center;
              box-sizing: border-box;
              &.giftText {
                color: #333;
              }
              .yes,
              .no {
                border-radius: 0.1rem;
                box-sizing: border-box;
                letter-spacing: 0.08rem;
                font-weight: 600;
                color: #333;
                padding: 0.1333rem 0.4rem;
                background: -webkit-linear-gradient(top, #fedc00, #e39300);
              }
              .no {
                margin-right: 0.8333rem;
              }
              .yesGame,
              .noGame {
                border-radius: 0.1rem;
                text-decoration: underline;
                color: red;
                font-size: 0.4rem;
                font-weight: 700;
              }
              .noGame {
                margin-left: 0.2667rem;
                margin-right: 0.2667rem;
              }
            }
            .received {
              background: rgba(0, 0, 0, 0.2);
            }
            .no_received {
              background: rgba(0, 0, 0, 0.5);
              max-width: 100%;
            }
            .giftRecord_time {
              display: inline-block;
              color: rgb(34, 26, 26);
            }
          }
        }
      }
      .loading-container {
        position: absolute;
        width: 100%;
        top: 2%;
      }
    }
    .input_wrapper {
      border-top: 1px solid #ccc;
      background: #eee;
      padding: 0 0 0 0.4rem; //输入区域
      .input_area {
        padding: 0.2133rem 0;
        height: 1.44rem;
        box-sizing: border-box;
        .send_message {
          outline: none;
          -webkit-appearance: none;
          font-size: 0.3733rem;
          float: left;
          width: 6.9333rem;
          height: 0.9867rem;
          text-indent: 0.2667rem;
          border: 1px solid #999;
        }
        .action_box {
          margin-left: 0.2767rem;
          float: left;
          width: 2rem;
          height: 1.06rem; // line-height: 0.9867rem;
          background: #999;
          border-radius: 0.1067rem;
          padding: 0.2533rem 0.2933rem;
          box-sizing: border-box;
          &.active {
            background: #ffd800;
          }
          .icon_plane {
            width: 0.5867rem;
            height: 0.48rem;
          }
          .send {
            color: #4b4b4b;
            font-size: 0.4rem;
          }
        }
      } //选择区域
      .select_area {
        height: 1.1rem;
        box-sizing: border-box;
        .selectList {
          .item {
            width: 0.9067rem;
            height: 0.9067rem;
            margin-right: 0.46rem;
            background: #fff;
            box-sizing: border-box;
            padding: 0.1867rem;
            border-radius: 0.1067rem;
            position: relative;
            .file {
              position: absolute;
              width: 0.9067rem;
              height: 0.9067rem;
              left: 0;
              top: 0;
              opacity: 0;
            }
            img {
              width: 0.5333rem;
              height: 0.5333rem;
            }
          }
        }
      } // 表情区域
      .emotion_area {
        overflow: hidden;
        .grid-center {
          display: block;
          text-align: center;
          padding: 4px;
          font-size: 0.5333rem;
        }
      }
      .expression_wrapper {
        // width: 100%;
        margin-left: -0.4667rem;
        .expressList {
          width: 100%;
          .item {
            height: 0.8rem;
            box-sizing: border-box;
            line-height: 0.8rem;
            font-size: 0.3467rem;
            color: #333;
            background: #eee;
            text-indent: 0.4667rem;
          }
        }
      }
    }
    .warning_bg {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0; // background-color: rgba(0, 0, 0, 0.3);
      .warning_wrapper {
        background-image: url("../../assets/image/envelop.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 45%;
        left: 50%;
        margin-left: -3rem;
        margin-top: -1rem;
        width: 6rem;
        height: 3rem;
        box-sizing: border-box;
        padding-top: 0.66rem;
        .warningText {
          width: 100%;
          text-align: center;
          color: #333;
          font-size: 0.4333rem;
          font-weight: 800;
        }
        .btnBox {
          margin-top: .5rem;
          text-align: center;
          display: flex;
          justify-content: space-around;
          padding: 0 0.4rem;
          .yes,
          .no {
            border: none;
            border-radius: 0.1067rem;
            padding: 0.2067rem 0.3333rem;
            background-color: #ffd800;
          }
        }
      }
    }
  }
  .position-vertical-demo {
    height: 3.76rem;
    background: #fff;
    .title {
      color: @baseColor;
      font-size: 0.3733rem;
      padding: 0.2667rem;
      text-align: left;
      position: relative;
      .close {
        width: 0.4rem;
        height: 0.4rem;
        position: absolute;
        top: 0.3rem;
        right: 0.4rem; // z-index: 999;
      }
    }
    .gift_list {
      margin-top: 0.36rem;
      .list {
        display: flex;
        justify-content: space-around;
        margin-left: 0.4rem;
        .item {
          float: left; // margin-right: 1rem;
          width: 1.7067rem;
          height: 1.9467rem;
          box-sizing: border-box;
          text-align: center;
          .game {
            width: 0.6933rem;
            height: 0.48rem;
          }
          img {
            width: 1.1333rem;
            height: 1.1333rem;
            &.flower {
              width: 1.0933rem;
              height: 1.16rem;
            }
            &.house {
              margin-top: 0.3667rem;
              width: 0.96rem;
              height: 0.8267rem;
            }
            &.car {
              margin-top: 0.3167rem;
              width: 1.3067rem;
              height: 0.8667rem;
            }
          }
          .gift_name {
            width: 100%;
            text-align: center;
            font-size: 0.2667rem;
            color: #666;
          }
          .gift_price {
            width: 100%;
            text-align: center;
            font-size: 0.2933rem;
            color: #f13c19;
          }
        }
      }
    }
  }
  .weui-grid {
    padding: 0.1333rem;
  }
  .weui-grids:before {
    border-left: none;
  }
  .weui-grids:after {
    border-left: none;
  }
  .weui-grids:before {
    border-top: none;
  }
  .weui-grid:before {
    border-right: none;
  }
  .weui-grid:after {
    border-bottom: none;
  }
  .vux-popup-dialog {
    z-index: 99999;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s;
  }
  .fade-enter {
    transform: translate3d(100%, 0, 0);
  }
  .fade-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
</style>
