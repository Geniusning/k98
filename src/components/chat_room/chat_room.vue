<template>
  <transition name="fade">
    <div id="chat" class="chatRoom">
      <div class="chat_nav">
        <div class="back_box">
          <img src="../../assets/image/back_chat.png" alt class="back_arrow" @click="goBack">
        </div>
        <div class="name">{{staticChatFriendObj.nickname}}</div>
        <div class="backHome_box">
          <img src="../../assets/image/chat_home.png" alt class="home" @click="goHome">
        </div>
      </div>
      <div class="chat_wrapper" ref="chatWrapper" @click="tagScroll">
        <div class="preview_pic" v-show="showPreview" ref="preview_pic" @click="closePreview"></div>
        <scroll ref="listView" class="chat_content" :scrollHeight="scrollHeight" :scrollToDomElement="scrollToDomElement" :data="componentChatList" :listen-scroll="listenScroll" :pullDownRefresh="pullDownRefresh" @getIndex="getIndex" @scroll="myscroll" @pullingDown="pullingDown">
          <ul class="chat_list" ref="chatList">
            <li class="clearfix" ref="item" :class="{'friend':item.friend,'mine':!item.friend}" v-for="(item,index) in componentChatList">
              <div class="person_box">
                <h2 class="name">{{item.time.slice(8,10)==today?item.time.slice(11):item.time.slice(5,10)}}</h2>
                <img :src="staticChatFriendObj.headimgurl" alt class="avatar" v-if="item.friend">
                <img :src="userInfo.headimgurl" alt class="avatar" v-else>
              </div>
              <div class="message_box">
                <span v-show="item.type===1" class="arrow"></span>
                <p class="message" v-if="item.type===1" v-html="item.message"></p>
                <img v-else :src="item.message" @load="onImgLoaded" alt class="messRecordPic" @click="showBigPic(item.message)" ref="picture">
              </div>
            </li>
          </ul>
        </scroll>
        <!-- <div class="loading-container" v-show="isLoading">
                    <loading></loading>
          </div>-->
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
              <img src="../../assets/image/chat_emotion.png" alt @click="show_emotion">
            </li>
            <li class="item fl">
              <img src="../../assets/image/message_chat.png" alt @click="show_expression">
            </li>
            <li class="item fl" @click="showToastGift">
              <img src="../../assets/image/chat_gift.png" alt>
            </li>
            <li class="item fl">
              <img src="../../assets/image/chat_pic.png" alt>
              <input type="file" class="file" accept="image/*" @change="uploadImage">
            </li>
            <li class="item fl" @click="playGame">
              <img src="../../assets/image/game_chat.png" alt class="game">
            </li>
          </ul>
        </div>
        <div class="emotion_area" v-if="emotionShow">
          <swiper :auto="false" height="130px" :show-dots="false">
            <swiper-item class="black">
              <grid :show-vertical-dividers="true" :cols="8">
                <div @click="selectEmtion(item.name)" v-for="item in emotionList" class="vux-center-h" style="box-sizing:border-box;display:inline-block;padding:0.2rem 0.2rem">
                  <img :src="item.num" alt>
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
      <!-- 送礼 -->
      <!-- <div v-transfer-dom>
          <popup v-model="showToast_gift" position="bottom">
            <div class="position-vertical-demo">
              <div class="title vux-1px-b">
                <span>送个小礼，就是好朋友</span>
                <img src="../../assets/image/close-round.png" alt="" class="close" @click="close_gift">
              </div>
              <div class="gift_list">
                <ul class="list clearfix">
                  <li class="item" v-for="(item,index) in giftList" @click="sendGift(item.id)" :key="item.id">
                    <img v-if="item.id===1" src="../../assets/image/beer.png" alt="" class="beer">
                    <img v-else-if="item.id===2" src="../../assets/image/flower.png" alt="" class="flower">
                    <img v-else-if="item.id===3" src="../../assets/image/house.png" alt="" class="house">
                    <img v-else src="../../assets/image/car.png" alt="" class="car">
                    <p v-if="item.name==='beer'" class="gift_name">{{item.name==='beer'?'啤酒':"礼物"}}</p>
                    <p v-else-if="item.name==='flower'" class="gift_name">{{item.name==='flower'?'鲜花':"礼物"}}</p>
                    <p v-else-if="item.name==='house'" class="gift_name gift_name_houseAndCar">{{item.name==='house'?'别墅':"礼物"}}</p>
                    <p v-else class="gift_name gift_name_houseAndCar">{{item.name==='car'?'跑车':"礼物"}}</p>
                    <p class="gift_price">￥{{item.money}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </popup>
        </div>-->
      <!-- 信封弹框 -->
      <transition name="appear">
        <envelope v-show="isShowEnvelope" :text="envelopeText"></envelope>
      </transition>
      <qrCode v-show="qrIsShow" title="您还不是会员,关注享有会员特权"></qrCode>
      <topUp v-show="isGiftPanel" @closeIntegralPanel="closeIntegralPanel" :friendId="friendId" :fatherPanelIndex="fatherPanelIndex"></topUp>
    </div>
  </transition>
</template>
<script type='text/ecmascript-6'>
  import envelope from 'base/envelope/envelope';
  import loading from "../../base/loading/loading";
  import qrCode from 'base/qrCode/qrCode';
  import topUp from 'base/topUp/topUp';
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
    WechatEmotion as Emotion
  } from "vux";
  import Scroll from "../../base/scroll/scroll.vue";
  import Url from "../../common/url.js";
  import api from "common/api.js";
  import util from "common/util.js";
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
        isShowEnvelope: false, //信封弹框判断
        envelopeText: "", //信封弹框内容
        showPreview: false,
        scrollHeight: 0,
        scrollToDomElement: "",
        pullDownRefresh: true,
        expressionShow: false,
        fatherPanelIndex: 1,
        isGiftPanel: false,
        friendId:"",
        expressionList: [
          "您好，很高兴可以成为好朋友",
          "过来喝一杯？",
          "约定好了，准时见面，不见不散",
          "玩一把游戏？"
        ],
        // showToast_gift: false,
        show: false,
        showTab: true,
        emotionShow: false,
        actionShow: false,
        flag: false,
        input_value: "",
        autofocus: false,
        emotionList: [{
            name: "[微笑]",
            num: "/static/face/1.gif"
            // num:1
          },
          {
            name: "[色]",
            num: "/static/face/2.gif"
          },
          {
            name: "[大哭]",
            num: "/static/face/3.gif"
          },
          {
            name: "[嘻嘻]",
            num: "/static/face/4.gif"
          },
          {
            name: "[偷笑]",
            num: "/static/face/5.gif"
          },
          {
            name: "[大笑]",
            num: "/static/face/6.gif"
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
            name: "[抠鼻]",
            num: "/static/face/9.gif"
          },
          {
            name: "[委屈]",
            num: "/static/face/10.gif"
          },
          {
            name: "[抱抱]",
            num: "/static/face/11.gif"
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
          {
            name: "[亲亲]",
            num: "/static/face/17.gif"
          },
          {
            name: "[难过]",
            num: "/static/face/18.gif"
          }
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
      console.log(this.today);
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
      this._getChatList(); //前端暂时获取聊天记录
      this._loadAllGift(); //获取礼物
      this.friendId = this.$route.params.id;
    },
    deactivated() {
      this.endCursor = null;
      this.componentChatList = [];
      let cursor = 0;
      this.changeCursor(cursor);
    },
    computed: {
      ...mapState([
        "userInfo",
        "staticChatFriendObj",
        "LastChatMsg",
        "inputValue",
        "socket",
        "alreadyFriendListcursor",
        "giftList"
      ]),
      ...mapGetters(["qrIsShow"]),
    },
    methods: {
      //监听充值面板状态
      closeIntegralPanel(flag) {
        console.log('面板状态-----------', flag);
        this.isGiftPanel = flag;
      },
      //约战
      playGame() {
        api.sentPlayGameMsg(this.friendId).then(res => {
          console.log('约战返回--------', res)
          if (res.errCode == 0) {
            // this.text = "您已发出邀请  等待对方的回应";
            this.isShowEnvelope = true;
            this.envelopeText = "您已发出邀请  等待对方的回应"
            setTimeout(() => {
              this.isShowEnvelope = false;
            }, 2000);
          } else if (res.errCode == 1023) {
            this.showQrcode(true);
          }
        })
      },
      onImgLoaded() {
        console.log('图片加载完成了')
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
      //发送礼物
      // sendGift(id) {
      //   let params = {
      //     giftID: parseInt(id),
      //     to: this.staticChatFriendObj.openid,
      //   }
      //   api.sendGift(params).then(res => {
      //     console.log(res);
      //     if (res.errCode === 0) {
      //       this.isShowEnvelope = true;
      //       this.envelopeText = "赠送礼物成功"
      //       setTimeout(() => {
      //         this.isShowEnvelope = false;
      //       }, 2000);
      //       this.showToast_gift = false;
      //     } else {
      //       this.isShowEnvelope = true;
      //       this.envelopeText = "余额不足，请充值"
      //       setTimeout(() => {
      //         this.isShowEnvelope = false;
      //         this.$router.push({
      //           name: "giftDetail"
      //         })
      //       }, 2000);
      //     }
      //   })
      // },
      //获取聊天消息列表
      _getChatList() {
        let cursor = this.alreadyFriendListcursor;
        api.getFriendMessList(cursor, this.staticChatFriendObj.openid).then(res => {
          console.log(res);
          this.changeCursor(res.cursor);
          let resultMessList = res.messages;
          var i;
          for (i = resultMessList.length - 1; i >= 0; i--) {
            let item = resultMessList[i];
            this.componentChatList.push({
              message: item.content,
              friend: item.from === this.staticChatFriendObj.openid ? 1 : 0, //1为朋友，0为自己,
              type: item.type,
              time: util.timestampToTime(item.stime)
            });
          }
          this.$refs.listView.finishPullDown();
        });
      },
      //发送消息事件
      send() {
        if (!this.input_value) {
          return;
        }
        //字符串转表情icon
        for (var i = 0; i < this.emotionList.length; i++) {
          // debugger;
          if (this.input_value.indexOf(this.emotionList[i].name) !== -1) {
            var reg = /\[.*\]/;
            console.log(this.input_value.match(reg)[0]);
            this.input_value = this.input_value.replace(
              reg,
              `<img src=${this.emotionList[i].num} style="vertical-align: -6px;">`
            );
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
          type: 1
        };
        let textMessObj = JSON.stringify(messObj);
        let decc1 = new TextEncoder("utf-8");
        let result = decc1.encode(textMessObj);
        api.postFriendMess(result).then(res => {
          console.log('发送消息成功:`````````````````````````````````````````', res);
          this.emotionShow = false;
        });
        this.$refs.listView.refresh();
        this.input_value = "";
        // document.getElementById("send_message").focus();
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
            api.postFriendPic(vm.staticChatFriendObj.openid, filename, dataURL).then(res => {
                vm.componentChatList.push({
                  message: res.content,
                  friend: 0,
                  type: 2,
                  time: util.timestampToTime(new Date().getTime())
                });
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
        let htmlImage = `<img src="${pic}" style="width:8rem;" class="preview-img"/>`;
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
        api
          .getFriendMessList(cursor, this.staticChatFriendObj.openid)
          .then(res => {
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
                friend: item.from === this.staticChatFriendObj.openid ? 1 : 0, //1为朋友，0为自己
                time: util.timestampToTime(item.stime),
                type: item.type
              });
            }
            this.$refs.listView.finishPullDown();
            this.$refs.listView.scrollTo(0, 0, 1000);
            // this.$refs.listView.disable();
          });
      },
      getIndex(val) {
        console.log("getIndex--------------------------:", val);
        this.chatListIndex = val;
      },
      //监听滚动
      myscroll(pos) {
        // console.log(pos);
      },
      tagScroll() {
        this.expressionShow = false;
        this.emotionShow = false;
        document.getElementById("send_message").blur();
      },
      //关闭送礼
      // close_gift() {
      //   this.showToast_gift = false;
      // },
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
      //展示送礼面板
      showToastGift() {
        console.log("click");
        // this.showToast_gift = true;
        this.isGiftPanel=true;
        this.expressionShow = false;
        this.emotionShow = false;
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
      onItemClick(index) {
        console.log(index);
        if (index == 0) {
          this.showTab = true;
        } else {
          this.showTab = false;
        }
      },
      myfocus() {
        this.emotionShow = false;
        this.expressionShow = false;
        this.isscroll = true; //允许动态滚动到最底部记录
      },
      ...mapMutations({
        updateChatList: "UPDATE_CHATLIST",
        showQrcode: "SHOW_QRCODE", //暂时二维码
        updateValue: "UPDATE_INPUTVALUE",
        changeCursor: "CHANGE_CURSOR",
        getGiftList: "GET_GIFTLIST" //获取礼物
      })
    },
    watch: {
      LastChatMsg: function(newValue) {
        // console.log('在聊天页面收到对方发来的消息-------------------------------：',newValue);
        if (newValue.lastMsg.from == this.staticChatFriendObj.openid) {
          //判断是否是进入时原来的两个人进行聊天
          // console.log('在聊天页面的时间-----------------------------------------：',newValue.lastMsg.stime)
          this.componentChatList.push({
            message: newValue.lastMsg.content,
            friend: newValue.lastMsg.from === this.staticChatFriendObj.openid ? 1 : 0, //1为朋友，0为自己
            type: newValue.lastMsg.type,
            time: newValue.lastMsg.stime
          });
        }
      },
      input_value: function(newValue, oldValue) {
        if (newValue.length > 0 || oldValue > 0) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      },
      chatListIndex: function(newValue) {
        console.log('父页面的chatListIndex：', newValue)
        if (this.isscroll) {
          this.$nextTick(function() {
            let childNodes = this.$refs.chatList.childNodes;
            let chatListHeight = 0;
            childNodes.forEach(item => {
              chatListHeight += item.clientHeight
            })
            this.scrollHeight = chatListHeight;
            console.log('父页面scrollHeight：', this.scrollHeight)
          });
        }
      }
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
      loading,
      Emotion,
      envelope,
      qrCode,
      topUp
    }
  };
</script>

<style scoped lang='less'>
  @import "../../assets/less/variable.less";
  @import "../../assets/less/chat.less";
  .chatRoom {
    position: fixed;
    z-index: 9;
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
      padding: 0.1333rem 0.3733rem 0.1333rem;
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
          .friend {
            margin-bottom: 0.4667rem;
            .chatList(left, #fff);
            .arrow {
              .arrowDot(#fff);
              left: -0.05rem;
            }
            .messRecordPic {
              width: 1.8rem;
            }
          }
          .mine {
            width: 100%;
            margin-bottom: 0.4667rem;
            .chatList(right, #ffd800);
            .arrow {
              .arrowDot(#ffd800);
              right: -0.05rem;
            }
            .message_box {
              margin-right: 0.2667rem;
            }
            .messRecordPic {
              width: 1.8rem;
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
