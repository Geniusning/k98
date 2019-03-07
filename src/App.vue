<template>
  <div id="app">
    <div class="top_wrapper">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <lg-preview></lg-preview>
      <transition name="envelop">
        <div class="envelop-wrapper" v-if="isShowEnvelop" @click="showDetail">
          <img src="./assets/image/close_ad.png" alt class="close" @click.stop="close">
          <div class="top">
            <img :src="dynamicFriendEvt.fromInfo?dynamicFriendEvt.fromInfo.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966911743&di=b3b81acff7cdc59f21ec7cbde8b13298&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110928%2F0017030291764688_b.jpg'"
              alt class="avatar">
            <div class="name">{{dynamicFriendEvt.fromInfo?dynamicFriendEvt.fromInfo.nickname:'店长'}}</div>
          </div>
          <div class="bottom">
            <p class="content">{{dynamicFriendEvt.extMsg.lastMsg.msg}}</p>
            <!-- <p class="content">你试试我的眼的</p> -->
          </div>
          <div class="detail" v-if="messType !='onlineNotice'">&gt;&gt;详情</div>
          <div class="detail" v-else-if="dynamicFriendEvt.fromInfo.isAlreadyFriends == true ">&gt;&gt;去聊天</div>
          <div class="detail" v-else>&gt;&gt;打招呼</div>
        </div>
      </transition>
      <transition name="gift-Panel" mode="out-in">
        <div class="topUpGiftInfo-wrapper" v-if="isShowGiftPanel">
          <div class="topUpGiftInfo-top">
            <div class="img">
              <img class="giftAvatar" :src="dynamicFriendEvt.fromInfo?dynamicFriendEvt.fromInfo.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966911743&di=b3b81acff7cdc59f21ec7cbde8b13298&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110928%2F0017030291764688_b.jpg'"
                alt>
            </div>
            <div class="name">
              <p class="name" v-if="topUpGiftInfo.msgCode == 3 && giftFlag">{{dynamicFriendEvt.fromInfo?dynamicFriendEvt.fromInfo.nickname:'店长'}}送您一份礼物</p>
              <p class="name" v-else-if="topUpThumbInfo.msgCode == 2 && thumbFlag">{{dynamicFriendEvt.fromInfo?dynamicFriendEvt.fromInfo.nickname:'朋友'}}给你点赞了</p>
              <p class="name" v-else="topUpGameInfo.msgCode == 7 && gameFlag">{{dynamicFriendEvt.fromInfo?dynamicFriendEvt.fromInfo.nickname:'朋友'}}约你玩游戏啦</p>
            </div>
            <img @click.stop="close" src="./assets/image/close-round.png" alt class="gift_close">
          </div>
          <div class="topUpGiftInfo-middle">
            <div class="partition_zone" v-if="topUpGiftInfo.msgCode == 3 && giftFlag">
              <div class="topUpGiftInfo_left">
                <img class="giftImg" v-if="topUpGiftInfo.content.extMsg.goodInfo.type==='beer'" src="./assets/image/beer.png" alt>
                <img class="giftImg" v-else-if="topUpGiftInfo.content.extMsg.goodInfo.type==='flower'" src="./assets/image/flower.png" alt>
                <img class="giftImg" v-else-if="topUpGiftInfo.content.extMsg.goodInfo.type==='house'" src="./assets/image/house.png" alt>
                <img class="giftImg" v-else-if="topUpGiftInfo.content.extMsg.goodInfo.type==='boat'" src="./assets/image/boat.png" alt>
                <img class="giftImg" v-else :src="topUpGiftInfo.content.extMsg.goodInfo.image" alt>
              </div>
              <div class="topUpGiftInfo_right">
                <p class="desc title_desc">{{topUpGiftInfo.content.extMsg.goodInfo.name}}</p>
                <p class="desc">{{topUpGiftInfo.content.extMsg.goodInfo.subtopic?topUpGiftInfo.content.extMsg.goodInfo.subtopic:'土豪赠送'}}</p>
                <p class="desc">{{topUpGiftInfo.content.extMsg.goodInfo.limit?topUpGiftInfo.content.extMsg.goodInfo.limit:""}}</p>
                <p class="desc title_desc">获得积分：{{topUpGiftInfo.content.extMsg.goodInfo.integral?topUpGiftInfo.content.extMsg.goodInfo.integral:topUpGiftInfo.content.extMsg.goodInfo.money}}</p>
              </div>
            </div>
            <div class="partition_zone" v-else-if="topUpThumbInfo.msgCode == 2 && thumbFlag">
              <div class="topUpGiftInfo_left">
                <img style="width:2.2rem;margin-left:1.2rem" class="giftImg" src="./assets/image/thumbs-o-up.png" alt>
              </div>
              <div class="topUpGiftInfo_right">
                <p class="desc title_desc">{{topUpThumbInfo.content.fromInfo.nickname}}给你点赞了,回赞成为好友</p>
              </div>
            </div>
            <div class="partition_zone" v-else="topUpGameInfo.msgCode == 7 && gameFlag">
              <div class="topUpGiftInfo_left">
                <img style="width:2.2rem;margin-left:1.2rem" class="giftImg" src="./assets/image/game.png" alt>
              </div>
              <div class="topUpGiftInfo_right">
                <p class="desc title_desc">{{topUpGameInfo.content.fromInfo.nickname}}约你玩游戏啦</p>
              </div>
            </div>
          </div>
          <div class="topUpGiftInfo-bottom">
            <div class="bottom_partition" v-if="topUpGiftInfo.msgCode == 3 && giftFlag">
              <div class="handleBtn" @click="respondForGift(topUpGiftInfo,false)">拒绝</div>
              <div class="handleBtn" @click="respondForGift(topUpGiftInfo,true)">感谢</div>
            </div>
            <div class="bottom_partition" v-else-if="topUpThumbInfo.msgCode == 2 && thumbFlag">
              <div class="handleBtn" @click="backThumbClick(topUpThumbInfo.content.extMsg.thumbInfo.evtID,'no')">飘过</div>
              <div class="handleBtn" @click="backThumbClick(topUpThumbInfo.content.extMsg.thumbInfo.evtID,'yes')">回赞</div>
            </div>
            <div class="bottom_partition" v-else="topUpGameInfo.msgCode == 7 && gameFlag">
              <div class="handleBtn" @click="rejectForGame(topUpGameInfo)">拒绝</div>
              <div class="handleBtn" @click="respondForGame(topUpGameInfo)">接受</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <qrCode v-show="qrIsShow" title="您还不是会员,关注享有会员特权"></qrCode>
    <transition name="appear">
      <envelope v-show="isShowEnvelope" :text="envelopeText"></envelope>
    </transition>
    <div class="bottom_wrapper" v-if="tabFlag">
      <tab :selected="selected"></tab>
    </div>
  </div>
</template>

<script>
  import Tab from "./components/tab/tab.vue";
  import qrCode from 'base/qrCode/qrCode';
  import envelope from 'base/envelope/envelope';
  import {
    mapState,
    mapGetters,
    mapMutations
  } from "vuex";
  import util from "common/util";
  import api from "common/api";
  export default {
    name: "app",
    data() {
      return {
        isThrottle: true,
        isShowEnvelop: false,
        isShowGiftPanel: false,
        appTopUpGiftInfo: {},
        tabFlag: false,
        selected: 0,
        envelopeText: "",
        isShowEnvelope: false,
        giftFlag: true,
        thumbFlag: true,
        gameFlag: true
      };
    },
    computed: {
      ...mapState(["inputValue", "dynamicFriendEvt", "messType", "topUpGiftInfo", "topUpThumbInfo", "topUpGameInfo"]),
      ...mapGetters(["qrIsShow"]),
    },
    created() {
      console.log(this.$route.name);
      if (
        this.$route.name === "home" ||
        this.$route.name === "friend" ||
        this.$route.name === "message" ||
        this.$route.name === "welfare" ||
        this.$route.name === "mine"
      ) {
        this.tabFlag = true;
      }
      switch (this.$route.name) {
        case "home":
          this.selected = 0;
          break;
        case "friend":
          this.selected = 1;
          break;
        case "message":
          this.selected = 2;
          break;
        case "welfare":
          this.selected = 3;
          break;
        case "mine":
          this.selected = 4;
          break;
        default:
          break;
      }
    },
    methods: {
      showDetail() {
        switch (this.messType) {
          case "shareGetIntegral":
            this.$router.push({
              name: `giftDetail`,
            });
            break;
          case "message":
            this.setChatFriend(this.dynamicFriendEvt.fromInfo);
            this.$router.push({
              path: `/message/${this.dynamicFriendEvt.fromInfo.openid}`
            });
            break;
          case "thumb":
            this.$router.push({
              name: `message`,
              params: {
                routeParamNum: 1
              }
            });
            break;
          case "playGame":
            this.$router.push({
              name: `message`,
              params: {
                routeParamNum: 2
              }
            });
            break;
          case "gift":
            this.$router.push({
              name: `message`,
              params: {
                routeParamNum: 3
              }
            });
            break;
          case "discount":
            this.$router.push({
              name: `card`,
            });
            break;
          case "onlineNotice":
            console.log(this.dynamicFriendEvt.fromInfo.nickname);
            this.setChatFriend(this.dynamicFriendEvt.fromInfo);
            if (this.dynamicFriendEvt.fromInfo.isAlreadyFriends) {
              this.$router.push({
                path: `/message/${this.dynamicFriendEvt.fromInfo.openid}`
              });
            } else {
              api.makeFriend(this.dynamicFriendEvt.fromInfo.openid).then(res => {
                console.log(res);
                if (res.errcode === 0) {
                  this.isShowEnvelope = true;
                  this.envelopeText = "飞奔个赞过去,等待对方回赞成为好友"
                  setTimeout(() => {
                    this.isShowEnvelope = false;
                  }, 2000);
                } else if (res.errcode === 1023) {
                  this.showQrcode(true);
                } else {
                  this.isShowEnvelope = true;
                  this.envelopeText = "您已点赞了哦,等待对方回赞成为好友"
                  setTimeout(() => {
                    this.isShowEnvelope = false;
                  }, 2000);
                }
              });
            }
            break;
          default:
            break;
        }
        this.isShowEnvelop = false;
      },
      //回赞事件
      backThumbClick(type, flag) {
        api.giveBackThumb(type, flag).then(res => {
          if (res.errcode === 0) {
            this._loadMutualEvents();
            this.isShowGiftPanel = false;
          }
        });
      },
      respondForGift(giftInfo, flag) {
        console.log('giftInfo----------------', giftInfo)
        let giftType = giftInfo.content.extMsg.goodInfo.integral ? 1 : 0;
        let giftParam = {
          agree: flag, //是否接受
          recordID: giftInfo.content.extMsg.goodInfo.recordID, //送礼记录ID
          fromID: giftInfo.content.fromInfo.openid, //赠送者
          respondType: giftType //记录的礼物类型  0是虚拟礼物、1是店长推荐和商城礼品
        }
        api.respondForGift(giftParam).then(res => {
          console.log('送礼操作结果-------------------', res);
          if (res.errCode == 0) {
            //重新拉取约战，送礼，点赞列表
            this._loadMutualEvents();
          }
        });
        this.isShowGiftPanel = false;
      },
      //接受游戏
      respondForGame(url) {
        window.location.href = url
      },
      //拒绝游戏
      rejectForGame() {
        this.isShowGiftPanel = false;
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
            console.log('count--------', count)
            this.CalcManualEventsCount(count);
          }
          this.addBange();
          console.log('拉取约战、点赞、送礼列表------------------------------', this.mutualEventsList)
        })
      },
      close() {
        this.isShowEnvelop = false;
        this.isShowGiftPanel = false;
      },
      ...mapMutations({
        // updateChatList: "UPDATE_CHATLIST",//更新聊天列表
        setChatFriend: "SET_CHAT_FRIEND", //全局设置聊天对象的信息
        showQrcode: "SHOW_QRCODE", //展示二维码
        addGiftInfo: "ADD_GIFTINFO",
        CalcManualEventsCount: "GET_ALLEVENTS_BADGECOUNT", //统计约战送礼点赞数
        addBange: "ADD_BADGE",
      })
    },
    watch: {
      deep: true,
      dynamicFriendEvt: function(newValue) {
        console.log('新的dynamicFriendEvt--------', newValue);
        if (this.isThrottle) {
          this.isShowEnvelop = true;
          this.isThrottle = false;
          setTimeout(() => {
            this.isShowEnvelop = false;
          }, 7000);
          setTimeout(() => {
            this.isThrottle = true;
          }, 10000);
        }
      },
      topUpGiftInfo: function(newValue) {
        console.log('topUpGiftInfo----------', newValue)
        this.isShowEnvelop = false;
        this.isShowGiftPanel = true;
        this.thumbFlag = false;
        this.gameFlag = false;
        console.log(newValue.content.extMsg.goodInfo.name)
        switch (newValue.content.extMsg.goodInfo.name) {
          case 'beer':
            this.addGiftInfo({
              nameValue: "啤酒",
              typeValue: 'beer'
            })
            break;
          case 'flower':
            this.addGiftInfo({
              nameValue: "鲜花",
              typeValue: 'flower'
            })
            break;
          case 'house':
            this.addGiftInfo({
              nameValue: "别墅",
              typeValue: 'house'
            })
            break;
          case 'car':
            this.addGiftInfo({
              nameValue: "邮轮",
              typeValue: 'boat'
            })
            break;
          default:
            break;
        }
        console.log('送的礼物----------', newValue);
      },
      topUpThumbInfo: function(newValue) {
        console.log('topUpThumbInfo-------------', newValue)
        this.isShowEnvelop = false;
        this.isShowGiftPanel = true;
        this.giftFlag = false;
        this.gameFlag = false;
      },
      topUpGameInfo: function(newValue) {
        console.log('topUpGameInfo-------------', newValue)
        this.isShowEnvelop = false;
        this.isShowGiftPanel = true;
        this.giftFlag = false;
        this.thumbFlag = false;
      },
      $route: function(newValue) {
        //隐藏导航
        if (
          newValue.name == "home" ||
          newValue.name == "friend" ||
          newValue.name == "message" ||
          newValue.name == "welfare" ||
          newValue.name == "mine" ||
          newValue.name === "gameRank"
        ) {
          this.tabFlag = true;
        } else {
          this.tabFlag = false;
        }
        //判断通过非点击tabbar栏切换选中状态
        switch (newValue.name) {
          case "home":
            this.selected = 0;
            document.title = newValue.meta.title;
            break;
          case "friend":
            this.selected = 1;
            document.title = newValue.meta.title;
            break;
          case "message":
            this.selected = 2;
            document.title = newValue.meta.title;
            break;
          case "welfare":
            this.selected = 3;
            document.title = newValue.meta.title;
            break;
          case "mine":
            document.title = newValue.meta.title;
            this.selected = 4;
            break;
          case "marsRank":
            document.title = newValue.meta.title;
            break;
          case "treasureRank":
            document.title = newValue.meta.title;
            break;
          case "gameRank":
            document.title = newValue.meta.title;
            break;
          case "gameRecord":
            document.title = newValue.meta.title;
            break;
          case "shareNew":
            document.title = newValue.meta.title;
            break;
          case "shareActivity":
            document.title = newValue.meta.title;
            break;
          case "newUserGetDiscount":
            document.title = newValue.meta.title;
            break;
          case "card":
            document.title = newValue.meta.title;
            break;
          case "individual":
            document.title = newValue.meta.title;
            break;
          case "giftDetail":
            document.title = newValue.meta.title;
            break;
          case "gameDetail":
            document.title = newValue.meta.title;
            break;
          default:
            break;
        }
      }
    },
    components: {
      Tab,
      qrCode,
      envelope
    }
  };
</script>

<style lang="less">
  html,
  body {
    overflow: hidden;
  }
  @import "./assets/reset.css"; // @import "~vux/src/styles/reset.less";
  @import "~vux/src/styles/1px.less";
  @import "./assets/less/mixin.less";
  a:hover {
    text-decoration: none !important;
  }
  .envelop-enter-active,
  .envelop-leave-active {
    transition: all 0.3s ease;
  }
  .envelop-enter {
    transform: translate3d(-100%, 0, 0);
  }
  .envelop-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
  body,
  html {
    height: 100%;
  }
  #app {
    overflow-x: hidden;
    max-width: 10rem;
    height: 100%;
    box-sizing: border-box;
    -webkit-display: flex;
    -moz-display: flex;
    -ms-display: flex;
    -o-display: flex;
    display: flex;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    -o-justify-content: space-between;
    -ms-justify-content: space-between;
    justify-content: space-between;
  }
  .top_wrapper {
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
    position: relative;
    .envelop-wrapper {
      position: fixed;
      width: 5rem;
      height: 2.5rem;
      top: 2rem;
      background-image: url("./assets/image/envelop.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding: 0.1333rem;
      z-index: 99999;
      font-size: 0.3467rem;
      .detail {
        position: absolute;
        bottom: 0.4rem;
        right: 0.2rem;
        color: orange;
      }
      .close {
        position: absolute;
        top: 0.2667rem;
        right: 0.4rem;
        width: 0.3333rem;
        height: 0.3333rem;
      }
      .top {
        display: flex;
        margin: 0.1333rem;
        .avatar {
          width: 0.6667rem;
          height: 0.6667rem;
          border-radius: 50%;
          margin-right: 0.2rem;
        }
        .name {
          width: 2rem;
          padding-top: 0.1333rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .bottom {
        margin-top: 0.2333rem;
        .content {
          padding-left: 0.1333rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .topUpGiftInfo-wrapper {
      width: 8.333rem; // height: 4rem;
      background-image: url("./assets/image/envelop.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: fixed;
      top: 30%;
      left: 0;
      right: 0;
      margin: 0 auto; // transform: translateX(-3.333rem);
      z-index: 99999;
      .topUpGiftInfo-top {
        box-sizing: border-box;
        padding-top: 0.2333rem;
        margin-left: 0.333rem;
        display: flex;
        position: relative;
        .giftAvatar {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
        }
        .name {
          margin-top: 0.1rem;
          margin-left: 0.1333rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 7.5rem;
        }
        .gift_close {
          position: absolute;
          top: 0.2333rem;
          right: 0.2533rem;
          width: 0.4rem;
          height: 0.4rem;
        }
      }
      .topUpGiftInfo-middle {
        .partition_zone {
          display: flex;
          margin-top: 0.1333rem;
          .topUpGiftInfo_left {
            .giftImg {
              margin-left: 1.5rem;
              margin-right: 0.9333rem;
              width: 2.2rem;
              height: 1.7rem;
            }
          }
          .topUpGiftInfo_right {
            // margin-top: 0.14rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .desc {
              color: #838383;
            }
            .title_desc {
              padding-right: 0.367rem;
              color: #0f0f0f;
              font-weight: 600;
              overflow: hidden;
            }
          }
        }
      }
      .topUpGiftInfo-bottom {
        .bottom_partition {
          display: flex;
          justify-content: space-around;
          margin-top: 0.1667rem;
          padding: 0 0.4rem;
          padding-bottom: 0.3333rem;
        }
        .handleBtn {
          border-radius: 0.1rem;
          box-sizing: border-box;
          letter-spacing: 0.08rem;
          font-weight: 600;
          color: #333;
          padding: 0.1333rem 0.4rem;
          background: -webkit-linear-gradient(top, #fedc00, #e39300);
        }
      }
    }
  }
  .bottom_wrapper {
    height: 1.18rem;
    max-width: 10rem;
    position: relative; // .message_box {
    //   position: absolute;
    //   top: -1.85rem;
    //   width: 100%;
    //   height: 1.8667rem;
    //   display: flex;
    //   background: -webkit-linear-gradient(left, #ffba00, #ffd800);
    //   .close {
    //     position: absolute;
    //     top: 0.4rem;
    //     right: 0.4rem;
    //     width: 0.4rem;
    //     height: 0.4rem;
    //   }
    //   .avatar {
    //     margin: 0.2933rem 0.2933rem 0 0.5333rem;
    //     width: 1.3333rem;
    //     height: 1.3333rem;
    //     .pic {
    //       width: 100%;
    //       height: 100%;
    //       border-radius: 50%;
    //     }
    //   }
    //   .userInfo {
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: space-around;
    //     padding: 0.3rem 0;
    //     .name {
    //       font-size: 0.4rem;
    //       color: #fff;
    //     }
    //     .mess {
    //       font-size: 0.3733rem;
    //       color: #fff;
    //     }
    //   }
    // }
  }
  .gift-Panel-enter-active,
  .gift-Panel-leave-active {
    transition: all 0.4s;
  }
  .gift-Panel-enter {
    transform: scale(0.1);
  }
  .gift-Panel-leave-to {
    transform: scale(0.1);
  }
</style>
