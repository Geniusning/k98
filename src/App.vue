<template>
  <div id="app">
    <div class="top_wrapper">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <!-- <lg-preview></lg-preview> -->
      <!-- 左侧信封弹 -->
      <transition name="envelop">
        <div class="envelop-wrapper" v-if="isShowEnvelop">
          <img onclick="return false" src="./assets/image/close_ad.png" alt class="close" @click.stop="close">
          <div class="top">
            <img onclick="return false" :src="dynamicFriendEvt.fromInfo.headimgurl?dynamicFriendEvt.fromInfo.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534938165134&di=f3ae0420c8c174149ac1c123230a28ed&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FJCRXU6oUw5s17jKllv9icrTmXvozYWQDeWFhKgEXbYeR9JOEKkrWLjibU7a7FAbsBHibVKca5wWzEiaXHWSgaSlgbA%2F640%3Fwx_fmt%3Dpng'"
              alt class="avatar">
            <div class="name">{{dynamicFriendEvt.fromInfo.nickname?dynamicFriendEvt.fromInfo.nickname:'陌生人'}}</div>
          </div>
          <div class="bottom">
            <p class="content">{{dynamicFriendEvt.extMsg.lastMsg.msg}}</p>
            <!-- <p class="content">你试试我的眼的</p> -->
          </div>
          <div @click="showDetail">
              <div class="detail" v-if="messType !='onlineNotice'">&gt;&gt;详情</div>
              <div class="detail" v-else-if="dynamicFriendEvt.fromInfo.isAlreadyFriends == true ">&gt;&gt;去聊天</div>
              <div class="detail" v-else>&gt;&gt;打招呼</div>
            </div>
        </div>
      </transition>
      <!-- 回房通知 " -->
      <div class="backToGame_wrapper" v-if="showBackToGame">
        <p class="backToGame_text">您有未完成对战，对手还在等您</p>
        <div class="btn_wrapper">
          <button class="reject_btn" @click="rejectBacToGame">放弃</button>
          <button class="back_btn" @click="goBackGame">再战</button>
        </div>
      </div>
      <div class="mask_bg" v-if="isShowGiftPanel">
        <transition name="gift-Panel" mode="out-in">
          <!-- 好友的约战送礼交互 -->
          <div class="topUpGiftInfo-wrapper" v-if="isShowGiftPanel && allMutatualInfo_temp.isAlreadyFriends">
            <div class="topUpGiftInfo-top">
              <div class="img">
                <img onclick="return false" class="giftAvatar" :src="allMutatualInfo_temp.headimgurl?allMutatualInfo_temp.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966911743&di=b3b81acff7cdc59f21ec7cbde8b13298&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110928%2F0017030291764688_b.jpg'"
                  alt>
              </div>
              <div class="name">
                <p class="name" v-if="allMutatualInfo_temp.type == 3 && giftFlag">{{allMutatualInfo_temp.nickname?allMutatualInfo_temp.nickname:'店长'}}送您一份礼物</p>
                <p class="name" v-else-if="allMutatualInfo_temp.type == 4 && gameFlag">{{allMutatualInfo_temp.nickname?allMutatualInfo_temp.nickname:'朋友'}}约你玩大话骰</p>
              </div>
            </div>
            <div class="topUpGiftInfo-middle">
              <div class="partition_zone" v-if="allMutatualInfo_temp.type == 3 && giftFlag">
                <div class="topUpGiftInfo_left">
                  <img onclick="return false" class="giftImg" v-if="allMutatualInfo_temp.name==='beer'" src="./assets/image/beer.png" alt>
                  <img onclick="return false" class="giftImg" v-else-if="allMutatualInfo_temp.name==='flower'" src="./assets/image/flower.png" alt>
                  <img onclick="return false" class="giftImg" v-else-if="allMutatualInfo_temp.name==='house'" src="./assets/image/hutui.png" alt>
                  <img onclick="return false" class="giftImg" v-else-if="allMutatualInfo_temp.name==='car'" src="./assets/image/boat.png" alt>
                  <img onclick="return false" class="giftImg" v-else :src="allMutatualInfo_temp.image" alt>
                </div>
                <div class="topUpGiftInfo_right">
                  <div>
                    <p v-if="allMutatualInfo_temp.name=='beer'" class="desc title_desc">啤酒</p>
                    <p v-else-if="allMutatualInfo_temp.name=='flower'" class="desc title_desc">鲜花</p>
                    <p v-else-if="allMutatualInfo_temp.name=='house'" class="desc title_desc">别墅</p>
                    <p v-else-if="allMutatualInfo_temp.name=='car'" class="desc title_desc">邮轮</p>
                    <p v-else class="desc title_desc">{{allMutatualInfo_temp.name}}</p>
                  </div>
                  <p class="desc">{{allMutatualInfo_temp.subtopic?allMutatualInfo_temp.subtopic:'土豪赠送'}}</p>
                  <p class="desc">{{allMutatualInfo_temp.limit?allMutatualInfo_temp.limit:""}}</p>
                  <p class="desc title_desc">积分：{{allMutatualInfo_temp.integral?allMutatualInfo_temp.integral:allMutatualInfo_temp.money}}</p>
                </div>
              </div>
              <div class="partition_zone" v-else-if="allMutatualInfo_temp.type == 4 && gameFlag">
                <div class="topUpGiftInfo_left">
                  <img onclick="return false" style="width:2.2rem;margin-left:1.2rem" class="giftImg" src="./assets/image/game_gift.png" alt>
                </div>
                <div class="topUpGiftInfo_right">
                  <p class="desc title_desc">{{allMutatualInfo_temp.combatID?'已在房间等你':'约你玩游戏啦'}}</p>
                  <p class="desc title_sub_desc">{{allMutatualInfo_temp.combatID?'不见不散':'赶紧开房pk吧'}}</p>
                </div>
              </div>
            </div>
            <div class="topUpGiftInfo-bottom">
              <div class="bottom_partition" v-if="allMutatualInfo_temp.type == 3 && giftFlag">
                <div class="handleBtn" @click="respondForGift(allMutatualInfo_temp,false)">拒收</div>
                <div class="handleBtn" @click="respondForGift(allMutatualInfo_temp,true)">感谢</div>
                <div class="checkBox_scene clearfix" v-if="!allMutatualInfo_temp.isAlreadyFriends">
                  <input @change="onlineSendGift" type="checkbox" class="checkbox fl" :checked='isMakeFriendBool'>
                  <span class="scene-text fl">加好友</span>
                </div>
              </div>
              <div class="bottom_partition" v-else-if="allMutatualInfo_temp.type == 4 && gameFlag">
                <div class="handleBtn" @click="rejectForGame(allMutatualInfo_temp)">免战</div>
                <div class="handleBtn" @click="respondForGame(allMutatualInfo_temp)">应战</div>
              </div>
            </div>
          </div>
          <!-- 不是好友的送礼，约战交互 -->
          <div class="topUpGiftInfo-wrapper" v-else-if="isShowGiftPanel && !isAlreadyFriend &&topUpGameInfo.msgCode !=19">
            <div class="topUpGiftInfo-top">
              <div class="img">
                <img class="giftAvatar" v-if="topUpGiftInfo.msgCode == 3 || topUpGiftInfo.msgCode==12" :src="topUpGiftInfo.content.fromInfo.headimgurl?topUpGiftInfo.content.fromInfo.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966911743&di=b3b81acff7cdc59f21ec7cbde8b13298&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110928%2F0017030291764688_b.jpg'"
                  alt>
                <img class="giftAvatar" v-if="topUpThumbInfo.msgCode ==2" :src="topUpThumbInfo.content.fromInfo.headimgurl?topUpThumbInfo.content.fromInfo.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966911743&di=b3b81acff7cdc59f21ec7cbde8b13298&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110928%2F0017030291764688_b.jpg'"
                  alt>
                <img class="giftAvatar" v-else-if="topUpGameInfo.msgCode ==7 || topUpGiftInfo.msgCode==19" :src="topUpGameInfo.content.fromInfo.headimgurl?topUpGameInfo.content.fromInfo.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966911743&di=b3b81acff7cdc59f21ec7cbde8b13298&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110928%2F0017030291764688_b.jpg'"
                  alt>
              </div>
              <div class="name">
                <p class="name" v-if="(topUpGiftInfo.msgCode == 3 || topUpGiftInfo.msgCode==12) && giftFlag">{{topUpGiftInfo.content.fromInfo.nickname?topUpGiftInfo.content.fromInfo.nickname:'店长'}}送您一份礼物</p>
                <p class="name" v-else-if="topUpThumbInfo.msgCode == 2 && thumbFlag">{{topUpThumbInfo.content.fromInfo?topUpThumbInfo.content.fromInfo.nickname:'朋友'}}给你点赞了</p>
                <p class="name" v-else-if="(topUpGameInfo.msgCode == 7 || topUpGiftInfo.msgCode==19) && gameFlag">{{topUpGameInfo.content.fromInfo.nickname?topUpGameInfo.content.fromInfo.nickname:'朋友'}}约你玩大话骰</p>
              </div>
            </div>
            <div class="topUpGiftInfo-middle">
              <div class="partition_zone" v-if="(topUpGiftInfo.msgCode == 3 || topUpGiftInfo.msgCode==12) && giftFlag">
                <div class="topUpGiftInfo_left">
                  <img class="giftImg" v-if="topUpGiftInfo.content.extMsg.goodInfo.extInfo.type==='beer'" src="./assets/image/beer.png" alt>
                  <img class="giftImg" v-else-if="topUpGiftInfo.content.extMsg.goodInfo.extInfo.type==='flower'" src="./assets/image/flower.png" alt>
                  <img class="giftImg" v-else-if="topUpGiftInfo.content.extMsg.goodInfo.extInfo.type==='house'" src="./assets/image/hutui.png" alt>
                  <img class="giftImg" v-else-if="topUpGiftInfo.content.extMsg.goodInfo.extInfo.type==='car'" src="./assets/image/boat.png" alt>
                  <img class="giftImg" v-else :src="topUpGiftInfo.content.extMsg.goodInfo.extInfo.image" alt>
                </div>
                <div class="topUpGiftInfo_right">
                  <div>
                    <p class="desc title_desc">{{topUpGiftInfo.content.extMsg.goodInfo.extInfo.name}}</p>
                  </div>
                  <p class="desc">{{topUpGiftInfo.content.extMsg.goodInfo.extInfo.subtopic?topUpGiftInfo.content.extMsg.goodInfo.extInfo.subtopic:'土豪赠送'}}</p>
                  <p class="desc">{{topUpGiftInfo.content.extMsg.goodInfo.extInfo.limit?topUpGiftInfo.content.extMsg.goodInfo.extInfo.limit:""}}</p>
                  <p class="desc title_desc">积分：{{topUpGiftInfo.content.extMsg.goodInfo.extInfo.integral?topUpGiftInfo.content.extMsg.goodInfo.extInfo.integral:topUpGiftInfo.content.extMsg.goodInfo.extInfo.money}}</p>
                </div>
              </div>
              <div class="partition_zone" v-else-if="topUpThumbInfo.msgCode == 2 && thumbFlag">
                <div class="topUpGiftInfo_left">
                  <img style="width:2rem;margin-left:1.2rem" class="giftImg" src="./assets/image/thumb_gift.png" alt>
                </div>
                <div class="topUpGiftInfo_right">
                  <p class="desc title_desc thumb_text">请求加你为好友...</p>
                </div>
              </div>
              <div class="partition_zone" v-else-if="(topUpGameInfo.msgCode == 7|| topUpGiftInfo.msgCode==19) && gameFlag">
                <div class="topUpGiftInfo_left">
                  <img style="width:2.2rem;margin-left:1.2rem" class="giftImg" src="./assets/image/game_gift.png" alt>
                </div>
                <div class="topUpGiftInfo_right">
                  <p class="desc title_desc">{{topUpGameInfo.content.extMsg.gameInfo.combatID?'已在房间等你':'约你玩游戏啦'}}</p>
                  <p class="desc title_sub_desc">{{topUpGameInfo.content.extMsg.gameInfo.combatID?'不见不散':'赶紧开房pk吧'}}</p>
                </div>
              </div>
            </div>
            <div class="topUpGiftInfo-bottom">
              <div class="bottom_partition" v-if="(topUpGiftInfo.msgCode == 3 || topUpGiftInfo.msgCode==12) && giftFlag">
                <div class="handleBtn" @click="no_Become_Friend_respondForGift(topUpGiftInfo.content,false)">拒收</div>
                <div class="handleBtn" @click="no_Become_Friend_respondForGift(topUpGiftInfo.content,true)">感谢</div>
                <div class="checkBox_scene clearfix">
                  <input @change="onlineSendGift" type="checkbox" class="checkbox fl" :checked='isMakeFriendBool'>
                  <span class="scene-text fl">加好友</span>
                </div>
              </div>
              <div class="bottom_partition" v-else-if="topUpThumbInfo.msgCode == 2 && thumbFlag">
                <div class="handleBtn" @click="backThumbClick(topUpThumbInfo.content.extMsg.thumbInfo.evtID,'no',topUpThumbInfo.content.fromInfo)">拒绝</div>
                <div class="handleBtn" @click="backThumbClick(topUpThumbInfo.content.extMsg.thumbInfo.evtID,'yes',topUpThumbInfo.content.fromInfo)">接受</div>
              </div>
              <div class="bottom_partition" v-else-if="(topUpGameInfo.msgCode == 7|| topUpGiftInfo.msgCode==19) && gameFlag">
                <div class="handleBtn" @click="no_Become_Friend_rejectForGame(topUpGameInfo.content)">免战</div>
                <div class="handleBtn" @click="no_Become_Friend_respondForGame(topUpGameInfo.content)">应战</div>
              </div>
            </div>
          </div>
          <!-- 再战邀请 -->
          <div class="topUpGiftInfo-wrapper" v-else-if="topUpGameInfo.msgCode==19">
            <div class="topUpGiftInfo-top">
              <div class="img">
                <img onclick="return false" class="giftAvatar" :src="topUpGameInfo.content.fromInfo.headimgurl?topUpGameInfo.content.fromInfo.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966911743&di=b3b81acff7cdc59f21ec7cbde8b13298&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110928%2F0017030291764688_b.jpg'"
                  alt>
              </div>
              <div class="name">
                <p class="name">{{topUpGameInfo.content.fromInfo.nickname?topUpGameInfo.content.fromInfo.nickname:'朋友'}}约你再战</p>
              </div>
            </div>
            <div class="topUpGiftInfo-middle">
              <div class="partition_zone">
                <div class="topUpGiftInfo_left">
                  <img onclick="return false" style="width:2.2rem;margin-left:1.2rem" class="giftImg" src="./assets/image/game_gift.png" alt>
                </div>
                <div class="topUpGiftInfo_right">
                  <p class="desc title_desc">已在房间等你 约你再战300局</p>
                </div>
              </div>
            </div>
            <div class="topUpGiftInfo-bottom">
              <div class="bottom_partition">
                <div class="handleBtn" @click="rejectForGame(topUpGameInfo.content)">免战</div>
                <div class="handleBtn" @click="respondForGame(topUpGameInfo.content)">应战</div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div v-show="showClientServiceIconFlag" class="kefu" @click="inToLetter">
        <img onclick="return false" src="./assets/image/home_letter.png" alt class="pic_kefu" />
      </div>
    </div>
    <friendPanel v-if="friendPanelFlag"></friendPanel>
    <qrCode v-show="qrIsShow"></qrCode>
    <transition name="appear">
      <envelope v-show="isShowEnvelope" :text="envelopeText"></envelope>
    </transition>
    <!-- 底部导航栏 -->
    <div class="bottom_wrapper" v-if="tabFlag">
      <tab :selected="selected"></tab>
    </div>
  </div>
</template>

<script>
  import Tab from "./components/tab/tab.vue";
  import qrCode from 'base/qrCode/qrCode';
  import envelope from 'base/envelope/envelope';
  import friendPanel from 'base/becomeFriendPanel/becomeFriendPanel'
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from "vuex";
  import util from "common/util";
  import api from "common/api";
  import Bus from 'common/bus.js';
  export default {
    name: "app",
    data() {
      return {
        notifyUserIdList: [],
        showBackToGame: false,
        isThrottle: true,
        isShowEnvelop: false,
        isShowGiftPanel: false,
        tabFlag: false,
        selected: 0,
        envelopeText: "",
        isShowEnvelope: false,
        giftFlag: true,
        thumbFlag: true,
        gameFlag: true,
        isMakeFriendBool: true,
        allMutatualInfo_temp: {},
        isAlreadyFriend: false,
        showClientServiceIconFlag:true
      };
    },
    computed: {
      ...mapState(["friendPanelFlag", "inputValue", "dynamicFriendEvt", "messType", "topUpGiftInfo", "topUpThumbInfo", "topUpGameInfo", "allMutatualInfo"]),
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
    mounted() {
      this.loadLastRoomInfo() //加载回房信息
    },
    methods: {
       inToLetter() {
        util.routerTo("message", this, {
          routeParamNum: 2 //路由参数2表示从店长信箱进入店长留言
        });
      },
      //拒绝回房
      rejectBacToGame() {
        this.showBackToGame = false
      },
      goBackGame() {
        window.location.href = `https://singledog.qianz.com/game/?gamePath=${this.gamePath}&roomID=${this.roomID}`
      },
      //加载游戏回房信息
      loadLastRoomInfo() {
        var cacheRoomId = localStorage.getItem("backRoomId") || ""
        api.loadLastRoomInfo().then(res => {
          console.log("回房信息--------", res)
          if (res.roomID) {
            this.roomID = res.roomID
            this.gamePath = res.gamePath
            if (cacheRoomId != this.roomID) {
              this.showBackToGame = true
              localStorage.setItem("backRoomId", this.roomID)
            }
          }
        })
      },
      //加好友
      onlineSendGift(e) {
        console.log(e.target.checked)
        this.isMakeFriendBool = e.target.checked
      },
      showDetail() {
        switch (this.messType) {
          case "shareGetIntegral":
            this.$router.push({
              name: `giftDetail`,
            });
            break;
          case "message":
            this.setChatFriend(this.dynamicFriendEvt.fromInfo);
            console.log("this.dynamicFriendEvt.fromInfo-----------",this.dynamicFriendEvt.fromInfo)
            this.$router.push({
              // path: `/message/${this.dynamicFriendEvt.fromInfo.openid}`
              name: "chat",
              params: {
                isClient: false,
                id: this.dynamicFriendEvt.fromInfo.openid
              }
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
          case "activity":
            this.$router.push({
              name: `message`,
              params: {
                routeParamNum: 3
              }
            });
            break;
          case "onlineNotice":
            console.log(this.dynamicFriendEvt.fromInfo.nickname);
            this.setChatFriend(this.dynamicFriendEvt.fromInfo);
            if (this.dynamicFriendEvt.fromInfo.isAlreadyFriends) {
              this.$router.push({
              // path: `/message/${this.dynamicFriendEvt.fromInfo.openid}`
              name: "chat",
              params: {
                isClient: false,
                id: this.dynamicFriendEvt.fromInfo.openid
              }
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
            this.$router.push({
              name: `message`,
              params: {
                routeParamNum: 0
              }
            });
            break;
        }
        this.isShowEnvelop = false;
      },
      //拉取好友
      _loadFriends() {
        let cursor = 0;
        this.getAlreadyFriendList(cursor);
      },
      //回赞事件
      backThumbClick(type, flag, fromInfo) {
        api.giveBackThumb(type, flag).then(res => {
          if (res.errCode === 0) {
            this.setChatFriend(fromInfo)
            this._loadMutualEvents();
            this._loadFriends();
            this.isShowGiftPanel = false;
            if (flag == "yes") {
              this.changeFriPanelFlag(true);
              Bus.$emit("changeFriendConnetion", fromInfo.openid)
            }
          }
        });
      },
      //未成为好友的送礼回复
      no_Become_Friend_respondForGift(giftInfo, flag) {
        console.log('giftInfo----------------', giftInfo)
        let giftParam = {
          agree: flag, //是否接受
          recordID: giftInfo.extMsg.goodInfo.extInfo.recordID, //送礼记录ID
          fromID: giftInfo.fromInfo.openid, //赠送者
          respondType: giftInfo.extMsg.goodInfo.msgType, //记录的礼物类型  0是虚拟礼物、1是店长推荐和商城礼品
          isMakeFriend: this.isMakeFriendBool,
        }
        api.respondForGift(giftParam).then(res => {
          console.log('送礼操作结果-------------------', res);
          if (res.errCode == 0) {
            //重新拉取约战，送礼，点赞列表
            this._loadMutualEvents();
            this.isMakeFriendBool = true;
          }
        });
        this.isShowGiftPanel = false;
      },
      //已成为好友的送礼回复
      respondForGift(giftInfo, flag) {
        console.log('giftInfo----------------', giftInfo)
        let giftParam = {
          agree: flag, //是否接受
          recordID: giftInfo.recordID, //送礼记录ID
          fromID: giftInfo.openid, //赠送者
          respondType: giftInfo.msgType, //记录的礼物类型  0是虚拟礼物、1是店长推荐和商城礼品
          isMakeFriend: this.isMakeFriendBool,
          // chatMsgID: giftInfo.isAlreadyFriends?giftInfo.id:""
          chatMsgID: giftInfo.id
        }
        api.respondForGift(giftParam).then(res => {
          console.log('送礼操作结果-------------------', res);
          if (res.errCode == 0) {
            //重新拉取约战，送礼，点赞列表
            // this._loadMutualEvents();
            this.isMakeFriendBool = true;
          }
        });
        this.isShowGiftPanel = false;
        this._loadMutualEvents()
      },
      //未成为好友拒绝游戏
      no_Become_Friend_rejectForGame(gameInfo) {
        console.log('no_Become_Friend_rejectForGame_gameInfo-----------', gameInfo)
        let params = {
          agree: false, //是否接受
          combatID: gameInfo.extMsg.gameInfo.combatID,
          fromID: gameInfo.fromInfo.openid,
        }
        console.log(params)
        api.responseCombat(params).then(res => {
          console.log(res)
          if (res.errCode == 0) {
            this.isShowGiftPanel = false;
            console.log('删除结果-----------', res);
          }
        })
        this._loadMutualEvents()
      },
      //未成为好友接受游戏
      no_Become_Friend_respondForGame(gameInfo) {
        console.log('no_Become_Friend_respondForGame_gameInfo-----------', gameInfo)
        let params = {
          agree: true, //是否接受
          combatID: gameInfo.extMsg.gameInfo.combatID,
          fromID: gameInfo.fromInfo.openid,
        }
        if (params.combatID) {
          //约战
          api.responseCombat(params).then(res => {
            console.log(res)
            if (res.errCode == 0) {
              console.log('删除结果-----------', res);
              window.location.href = gameInfo.extMsg.gameInfo.url;
            }
          })
        } else {
          //应战
          window.location.href = gameInfo.extMsg.gameInfo.url;
        }
      },
      //成为好友后接受游戏
      respondForGame(game) {
        console.log('respondForGame_gameInfo-----------', game)
        var params = {}
        var gameUrl = ""
        if (this.topUpGameInfo.msgCode == 19) {
          gameUrl = game.extMsg.gameInfo.url;
          window.location.href = gameUrl;
          return false;
        } else {
          params = {
            agree: true, //是否接受
            combatID: game.combatID,
            fromID: game.openid,
            chatMsgID: game.id,
            IsAgainPlay: false
          }
          gameUrl = game.url
        }
        //约战
        api.responseCombat(params).then(res => {
          console.log(res)
          if (res.errCode == 0) {
            console.log('删除结果-----------', res);
            window.location.href = gameUrl;
          }
        })
      },
      //拒绝游戏
      rejectForGame(gameInfo) {
        console.log('rejectForGame_gameInfo0-----------', gameInfo)
        var params = {}
        if (this.topUpGameInfo.msgCode == 19) { //再战弹框
          params = {
            agree: false, //是否接受
            fromID: gameInfo.fromInfo.openid,
            IsAgainPlay: true
          }
        } else {
          params = {
            agree: false, //是否接受
            combatID: gameInfo.combatID,
            fromID: gameInfo.openid,
            chatMsgID: gameInfo.id,
            IsAgainPlay: false
          }
        }
        api.responseCombat(params).then(res => {
          console.log(res)
          if (res.errCode == 0) {
            this.isShowGiftPanel = false;
            console.log('删除结果-----------', res);
          }
        })
        this._loadMutualEvents()
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
            this.CalcManualEventsCount(count);
          }
          this.addBange();
          console.log('拉取约战、点赞、送礼列表------------------------------', this.mutualEventsList)
        })
      },
      close() {
        this.isShowEnvelop = false;
      },
      //判断弹框布尔值
      judgeEveryBool(isShowGiftPanel, gameFlag, giftFlag, thumbFlag) {
        this.isShowGiftPanel = isShowGiftPanel;
        this.gameFlag = gameFlag;
        this.giftFlag = giftFlag;
        this.thumbFlag = thumbFlag;
      },
      ...mapMutations({
        // updateChatList: "UPDATE_CHATLIST",//更新聊天列表
        changeFriPanelFlag: "CHANGEFRIENDPANELFLAG", //更改匹配成功flag
        setChatFriend: "SET_CHAT_FRIEND", //全局设置聊天对象的信息
        showQrcode: "SHOW_QRCODE", //展示二维码
        addGiftInfo: "ADD_GIFTINFO",
        CalcManualEventsCount: "GET_ALLEVENTS_BADGECOUNT", //统计约战送礼点赞数
        addBange: "ADD_BADGE",
      }),
      ...mapActions({
        getAlreadyFriendList: "get_alreadyFriendList", //加载已经成为好友列表
      })
    },
    watch: {
      deep: true,
      dynamicFriendEvt: function(newValue) {
        this.isShowEnvelop = false
        this.isThrottle = false
        console.log('新的dynamicFriendEvt--------', newValue);
        if (newValue.notifyType === 8) {
          let onlineUser = newValue.fromInfo
          let hasUser
          //判断待通知用户列表里面是否有当前上线的用户
          this.notifyUserIdList.forEach(user => {
            if (user.openid === onlineUser.openid) {
              hasUser = true
            }
          })
          //如果待通知用户列表里面没有当前上线用户，则把当前上线用户push进待通知用户列表,并记录当前上戏时间
          if (!hasUser) {
            this.isThrottle = true
            onlineUser["loginTime"] = new Date().getTime()
            this.notifyUserIdList.push(onlineUser)
          }
          //如果待通知用户列表里面有当前上线用户，则判断距上次上线时间是否超过300秒，超过300秒，信封弹框
          if (hasUser) {
            let notifyUser = this.notifyUserIdList.filter(user => {
              return user.openid === onlineUser.openid
            })
            let isMore300s = (new Date().getTime() - notifyUser[0].loginTime) > 300000
            if (isMore300s) {
              this.isThrottle = true
              this.notifyUserIdList.forEach(user => { //重新设置登录时间
                if (user.openid == onlineUser.openid) {
                  user["loginTime"] = new Date().getTime()
                }
              })
            } else {
              this.isThrottle = false
            }
          }
        } else {
          this.isThrottle = true
        }
        if (this.isThrottle) {
          this.isShowEnvelop = true;
          setTimeout(() => {
            this.isShowEnvelop = false;
          }, 3000);
        }
      },
      allMutatualInfo: function(newValue) {
        let contentStruct = newValue.content.extMsg.allInfo.lastMsg;
        let fromImfo = newValue.content.fromInfo;
        this.isShowGiftPanel = true;
        this.isAlreadyFriend = true;
        this.allMutatualInfo_temp = {
          openid: fromImfo.openid,
          type: contentStruct.type,
          nickname: fromImfo.nickname,
          headimgurl: fromImfo.headimgurl,
          id: contentStruct.id ? contentStruct.id : "",
          isAgree: contentStruct.chatExtMsg.isAgree,
          name: contentStruct.chatExtMsg.extMsg.name ? contentStruct.chatExtMsg.extMsg.name : "",
          isAlreadyFriends: fromImfo.isAlreadyFriends,
          limit: contentStruct.chatExtMsg.extMsg.limit ? contentStruct.chatExtMsg.extMsg.limit : "",
          image: contentStruct.chatExtMsg.extMsg.image ? contentStruct.chatExtMsg.extMsg.image : "",
          msgType: contentStruct.chatExtMsg.msgType,
          isHandled: contentStruct.chatExtMsg.isHandled,
          couponID: contentStruct.chatExtMsg.extMsg.couponID ? contentStruct.chatExtMsg.extMsg.couponID : "",
          integral: contentStruct.chatExtMsg.extMsg.integral ? contentStruct.chatExtMsg.extMsg.integral : "",
          recordID: contentStruct.chatExtMsg.extMsg.recordID ? contentStruct.chatExtMsg.extMsg.recordID : "",
          subtopic: contentStruct.chatExtMsg.extMsg.subtopic ? contentStruct.chatExtMsg.extMsg.subtopic : "",
          money: contentStruct.chatExtMsg.extMsg.money ? contentStruct.chatExtMsg.extMsg.money : "",
          combatID: contentStruct.chatExtMsg.extMsg.combatID ? contentStruct.chatExtMsg.extMsg.combatID : "",
          headImgURL: contentStruct.chatExtMsg.extMsg.headImgURL ? contentStruct.chatExtMsg.extMsg.headImgURL : "",
          inviterID: contentStruct.chatExtMsg.extMsg.inviterID ? contentStruct.chatExtMsg.extMsg.inviterID : "",
          // nickName:contentStruct.chatExtMsg.extMsg.nickName?contentStruct.chatExtMsg.extMsg.nickName:"",
          url: contentStruct.chatExtMsg.extMsg.url ? contentStruct.chatExtMsg.extMsg.url : "",
        }
        console.log("allMutatualInfo---------------------", this.allMutatualInfo_temp);
        if (this.allMutatualInfo_temp.type == 3) {
          this.giftFlag = true;
          this.gameFlag = false;
        } else if (this.allMutatualInfo_temp.type == 4) {
          this.giftFlag = false;
          this.gameFlag = true;
        }
      },
      topUpGiftInfo: function(newValue) {
        console.log('topUpGiftInfo----------', newValue)
        this.judgeEveryBool(true, false, true, false);
        switch (newValue.content.extMsg.goodInfo.extInfo.name) {
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
        this.judgeEveryBool(true, false, false, true);
      },
      topUpGameInfo: function(newValue) {
        console.log('topUpGameInfo-------------', newValue)
        this.judgeEveryBool(true, true, false, false);
      },
      $route: function(newValue) {
        if(newValue.name == "message" || 
        newValue.name==="chat" ||
        newValue.name==="clientChat"||
        newValue.name==="shareActivity"){ //控制客服图标显示
          this.showClientServiceIconFlag = false
        }else{
          this.showClientServiceIconFlag = true
        }
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
      }
    },
    components: {
      Tab,
      qrCode,
      envelope,
      friendPanel
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
  @import "./assets/less/variable.less";
  a:hover {
    text-decoration: none !important;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }
  .backToGame_wrapper {
    width: 8.4rem;
    height: 4.6933rem;
    background-image: url("./assets/image/envelop.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: fixed;
    z-index: 9999;
    top: 6rem;
    left: 50%;
    transform: translateX(-4.5rem);
    padding: 0 0.2667rem;
    .backToGame_text {
      width: 100%;
      padding-top: 1.2rem;
      text-align: center;
      color: #333;
      font-weight: 700;
      font-size: 16px;
    }
    .btn_wrapper {
      display: flex;
      justify-content: space-around;
      margin-top: 1.4rem;
      padding: 0 1rem;
      .reject_btn,
      .back_btn {
        width: 1.8667rem;
        border: none;
        background: -webkit-linear-gradient(top, #fcd502, #e59305);
        padding: 0.1rem 0.1667rem;
        font-weight: 600;
      } // .back_btn{
      // }
    }
  }
  .whole_mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10000;
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
    .mask_bg {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .3);
      z-index: 9;
    }
    .envelop-wrapper {
      position: fixed;
      width: 5rem;
      height: 2.5rem;
      top: 2rem;
      background-image: url("./assets/image/envelop.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding: 0.1333rem;
      z-index: 9999;
      font-size: 0.3467rem;
      .detail {
        position: absolute;
        bottom: 0.2rem;
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
          padding-left: 0.1333rem; // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
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
          width: 6rem;
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
            .thumb_text {
              font-size: 0.4467rem;
            }
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
              font-size: 0.3467rem;
            }
            .title_sub_desc {
              color: #5B5B5B;
              font-size: 0.3467rem;
              font-weight: 600
            }
          }
        }
      }
      .topUpGiftInfo-bottom {
        .bottom_partition {
          display: flex;
          justify-content: space-around;
          margin-top: 0.1667rem;
          padding: 0 1rem;
          padding-bottom: 0.3333rem;
          position: relative;
          .checkBox_scene {
            position: absolute;
            bottom: 0.2667rem;
            right: 0.2867rem;
            .checkbox {
              width: 0.4rem;
              height: 0.4rem;
              vertical-align: middle
            }
            .scene-text {
              font-weight: 600;
              padding-bottom: 0.0533rem;
              vertical-align: middle
            }
          }
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
    .kefu {
      position: fixed;
      bottom: 80px;
      right: 0.1333rem;
      animation: jump 1500ms linear 500ms infinite normal;
      @keyframes jump {
        10% {
          bottom: 80px;
        }
        50% {
          bottom: 75px;
        }
        100% {
          bottom: 80px;
        }
      }
      .pic_kefu {
        width: 1rem;
        height: 1rem;
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
</style>
