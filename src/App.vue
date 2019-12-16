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
          <img onclick="return false" src="./assets/image/close_ad.png" alt="" class="close" @click.stop="close">
          <div class="top">
            <img onclick="return false" :src="dynamicFriendEvt.fromInfo.headimgurl?dynamicFriendEvt.fromInfo.headimgurl:shopSettingInfo.image" alt="" class="avatar">
            <div class="name">{{dynamicFriendEvt.fromInfo.nickname?dynamicFriendEvt.fromInfo.nickname:'店长'}}</div>
          </div>
          <div class="bottom">
            <p class="content">{{dynamicFriendEvt.extMsg.lastMsg.msg}}</p>
            <!-- <p class="content">你试试我的眼的</p> -->
          </div>
          <div @click="showDetail">
            <div class="detail" v-if="messType !='onlineNotice'">&gt;&gt;详情</div>
            <div class="detail" v-else-if="dynamicFriendEvt.fromInfo.isAlreadyFriends == true ">&gt;&gt;去聊天</div>
            <div class="detail" v-else>&gt;&gt;打个招呼</div>
          </div>
        </div>
      </transition>
      <!-- 回房通知   " -->
      <div class="backToGame_wrapper" v-if="showBackToGame">
        <p class="backToGame_text">您有未完成对战，对手还在等您</p>
        <div class="btn_wrapper">
          <div class="reject_btn" @click="rejectBacToGame">放弃</div>
          <div class="back_btn" @click="goBackGame">再战</div>
        </div>
      </div>
      <div class="mask_bg" v-if="isShowGiftPanel">
        <transition name="gift-Panel" mode="out-in">
          <!-- 好友的约战送礼交互 -->
          <div class="topUpGiftInfo-wrapper" v-if="isShowGiftPanel && allMutatualInfo_temp.isAlreadyFriends">
            <div class="topUpGiftInfo-top" v-if="!isShowGiftGuide">
              <div class="img">
                <img onclick="return false" class="giftAvatar" :src="allMutatualInfo_temp.headimgurl?allMutatualInfo_temp.headimgurl:shopSettingInfo.image" alt="">
              </div>
              <div class="name">
                <p class="name" v-if="allMutatualInfo_temp.type == 3 && giftFlag">{{allMutatualInfo_temp.nickname?allMutatualInfo_temp.nickname:'店长'}}送您一份礼物</p>
                <p class="name" v-else-if="allMutatualInfo_temp.type == 4 && gameFlag">{{allMutatualInfo_temp.nickname?allMutatualInfo_temp.nickname:'朋友'}}</p>
              </div>
            </div>
            <div class="topUpGiftInfo-top" v-if="isShowGiftGuide">
              <p class="giftText">{{isvirtualGift?"收到虚拟礼物，积分存入→我的→积分明细":"收到礼券一份，存入→我的→卡券包，到店兑换"}}</p>
            </div>
            <div class="topUpGiftInfo-middle">
              <div class="partition_zone" v-if="allMutatualInfo_temp.type == 3 && giftFlag">
                <div class="topUpGiftInfo_left">
                  <img onclick="return false" class="giftImg" v-if="allMutatualInfo_temp.name==='beer'" src="./assets/image/beer.png" alt="">
                  <img onclick="return false" class="giftImg" v-else-if="allMutatualInfo_temp.name==='flower'" src="./assets/image/flower.png" alt="">
                  <img onclick="return false" class="giftImg" v-else-if="allMutatualInfo_temp.name==='house'" src="./assets/image/hutui.png" alt="">
                  <img onclick="return false" class="giftImg" v-else-if="allMutatualInfo_temp.name==='car'" src="./assets/image/boat.png" alt="">
                  <img onclick="return false" class="giftImg" v-else :src="allMutatualInfo_temp.image" alt="">
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
                  <img onclick="return false" style="width:2.2rem;margin-left:1.2rem" class="giftImg" src="./assets/image/game_gift.png" alt="">
                </div>
                <div class="topUpGiftInfo_right">
                  <p class="desc title_desc">{{allMutatualInfo_temp.combatID?'约你玩几局大话骰':'约你玩一局大话骰'}}</p>
                  <p class="desc title_sub_desc">{{allMutatualInfo_temp.combatID?'':''}}</p>
                </div>
              </div>
            </div>
            <div class="topUpGiftInfo-bottom">
              <div class="bottom_partition" v-if="allMutatualInfo_temp.type == 3 && giftFlag">
                <div v-if="!isShowGiftGuide" class="handleBtn rejectBtn" @click="respondForGift(allMutatualInfo_temp,false,allMutatualInfo_temp.openid)">拒收</div>
                <div v-if="!isShowGiftGuide" class="handleBtn" @click="respondForGift(allMutatualInfo_temp,true,allMutatualInfo_temp.openid)">感谢</div>
                <div v-if="isShowGiftGuide" class="handleBtn" @click="confirm">确定</div>
                <div v-if="isShowGiftGuide" class="handleBtn rejectBtn" @click="gotoDetail">详情</div>
                <!-- <div class="checkBox_scene clearfix" v-if="!allMutatualInfo_temp.isAlreadyFriends">
                            <input @change="onlineSendGift" type="checkbox" class="checkbox fl" :checked='isMakeFriendBool'>
                            <span class="scene-text fl">加好友</span>
                  </div>-->
              </div>
              <div class="bottom_partition" v-else-if="allMutatualInfo_temp.type == 4 && gameFlag">
                <div class="handleBtn rejectBtn" @click="rejectForGame(allMutatualInfo_temp)">免战</div>
                <div class="handleBtn" @click="respondForGame(allMutatualInfo_temp)">应战</div>
              </div>
            </div>
          </div>
          <!-- 灵魂匹配 -->
          <div class="topUpGiftInfo-wrapper" v-else-if="soulFriInfo.msgCode==21">
            <div class="topUpGiftInfo-top" v-if="isShowGiftGuide">
              <div class="img">
                <img onclick="return false" class="giftAvatar" :src="soulFriInfo.content.fromInfo.headimgurl?soulFriInfo.content.fromInfo.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966911743&di=b3b81acff7cdc59f21ec7cbde8b13298&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110928%2F0017030291764688_b.jpg'"
                  alt="">
              </div>
              <div class="name">
                <p class="name">{{soulFriInfo.content.fromInfo.nickname?soulFriInfo.content.fromInfo.nickname:'朋友'}}</p>
              </div>
            </div>
            <div class="topUpGiftInfo-top" v-if="isShowGiftGuide">
              <p class="giftText">{{isvirtualGift?"收到如下虚拟礼物，积分存入→我的→积分明细":"收到礼物兑换券一份，存入→我的→卡券，可到店使用"}}</p>
            </div>
            <div class="topUpGiftInfo-middle">
              <div class="partition_zone">
                <div class="topUpGiftInfo_right" style="padding-top: 30px">
                  <p class="desc title_desc soulText">Ta启动了寻觅灵魂玩伴</p>
                  <p class="soulText">茫茫人海中找到了你,匹配度:80%</p>
                </div>
              </div>
            </div>
            <div class="topUpGiftInfo-bottom soul-Bottom" style="margin-top:.3rem">
              <div class="bottom_partition">
                <div class="handleBtn" @click="rejectSoulFri()">插肩而过</div>
                <div class="handleBtn" @click="acceptSoulFri(soulFriInfo.content.fromInfo)">随缘结识</div>
              </div>
            </div>
          </div>
          <!-- 不是好友的送礼，约战交互 -->
          <div class="topUpGiftInfo-wrapper" v-else-if="isShowGiftPanel && !isAlreadyFriend && topUpGameInfo.msgCode !=19">
            <div class="topUpGiftInfo-top">
              <div class="img">
                <img class="giftAvatar" v-if="topUpGiftInfo.msgCode == 3 || topUpGiftInfo.msgCode==12" :src="topUpGiftInfo.content.fromInfo.headimgurl?topUpGiftInfo.content.fromInfo.headimgurl:defaultHeadUrl" alt="">
                <img class="giftAvatar" v-else-if="topUpThumbInfo.msgCode ==2" :src="topUpThumbInfo.content.fromInfo.headimgurl?topUpThumbInfo.content.fromInfo.headimgurl:defaultHeadUrl" alt="">
                <img class="giftAvatar" v-else-if="topUpGameInfo.msgCode ==24 ||topUpGameInfo.msgCode == 7 || topUpGiftInfo.msgCode==19" :src="topUpGameInfo.content.fromInfo.headimgurl?topUpGameInfo.content.fromInfo.headimgurl:(userInfo.sex=='男'?defaultfemaletHeadUrl:defaultmaleHeadUrl)"
                  alt="">
              </div>
              <div class="name">
                <p class="name" v-if="(topUpGiftInfo.msgCode == 3 || topUpGiftInfo.msgCode==12) && giftFlag">{{topUpGiftInfo.content.fromInfo.nickname?topUpGiftInfo.content.fromInfo.nickname:'店长'}}送您一份礼物</p>
                <p class="name" v-else-if="topUpThumbInfo.msgCode == 2 && thumbFlag">{{topUpThumbInfo.content.fromInfo?topUpThumbInfo.content.fromInfo.nickname:'朋友'}}给你点赞了</p>
                <p class="name" v-else-if="(topUpGameInfo.msgCode ==24 ||topUpGameInfo.msgCode == 7 || topUpGiftInfo.msgCode==19) && gameFlag">{{topUpGameInfo.content.fromInfo.nickname?topUpGameInfo.content.fromInfo.nickname:(userInfo.sex=="男"?"邻桌小妹":"邻桌小哥")}}</p>
              </div>
            </div>
            <div class="topUpGiftInfo-middle">
              <div class="partition_zone" v-if="(topUpGiftInfo.msgCode == 3 || topUpGiftInfo.msgCode==12) && giftFlag">
                <div class="topUpGiftInfo_left">
                  <img class="giftImg" v-if="topUpGiftInfo.content.extMsg.goodInfo.extInfo.type==='beer'" src="./assets/image/beer.png" alt="">
                  <img class="giftImg" v-else-if="topUpGiftInfo.content.extMsg.goodInfo.extInfo.type==='flower'" src="./assets/image/flower.png" alt="">
                  <img class="giftImg" v-else-if="topUpGiftInfo.content.extMsg.goodInfo.extInfo.type==='house'" src="./assets/image/hutui.png" alt="">
                  <img class="giftImg" v-else-if="topUpGiftInfo.content.extMsg.goodInfo.extInfo.type==='car'" src="./assets/image/boat.png" alt="">
                  <img class="giftImg" v-else :src="topUpGiftInfo.content.extMsg.goodInfo.extInfo.image" alt="">
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
                  <img style="width:2rem;margin-left:1.2rem" class="giftImg" src="./assets/image/thumb_gift.png" alt="">
                </div>
                <div class="topUpGiftInfo_right">
                  <p class="desc title_desc thumb_text">请求加你为好友...</p>
                </div>
              </div>
              <div class="partition_zone" v-else-if="(topUpGameInfo.msgCode ==24 ||topUpGameInfo.msgCode == 7|| topUpGiftInfo.msgCode==19) && gameFlag">
                <div class="topUpGiftInfo_left">
                  <img style="width:2.2rem;margin-left:1.2rem" class="giftImg" src="./assets/image/game_gift.png" alt="">
                </div>
                <div class="topUpGiftInfo_right">
                  <p class="desc title_desc">{{topUpGameInfo.content.extMsg.gameInfo.combatID?'约你玩几局大话骰':'约你玩一局大话骰'}}</p>
                  <p class="desc title_sub_desc">{{topUpGameInfo.content.extMsg.gameInfo.combatID?'':''}}</p>
                </div>
              </div>
            </div>
            <div class="topUpGiftInfo-bottom">
              <div class="bottom_partition" v-if="(topUpGiftInfo.msgCode == 3 || topUpGiftInfo.msgCode==12) && giftFlag">
                <div v-if="!isShowGiftGuide" class="handleBtn rejectBtn" @click="no_Become_Friend_respondForGift(topUpGiftInfo.content,false)">拒收</div>
                <div v-if="!isShowGiftGuide" class="handleBtn" @click="no_Become_Friend_respondForGift(topUpGiftInfo.content,true)">感谢</div>
                <div v-if="isShowGiftGuide" class="handleBtn" @click="confirm">确定</div>
                <div v-if="isShowGiftGuide" class="handleBtn rejectBtn" @click="gotoDetail">详情</div>
                <!-- <div class="checkBox_scene clearfix">
                            <input @change="onlineSendGift" type="checkbox" class="checkbox fl" :checked='isMakeFriendBool'>
                            <span class="scene-text fl">加好友</span>
                  </div>-->
              </div>
              <div class="bottom_partition" v-else-if="topUpThumbInfo.msgCode == 2 && thumbFlag">
                <div class="handleBtn rejectBtn" @click="backThumbClick(topUpThumbInfo.content.extMsg.thumbInfo.evtID,'no',topUpThumbInfo.content.fromInfo)">拒绝</div>
                <div class="handleBtn" @click="backThumbClick(topUpThumbInfo.content.extMsg.thumbInfo.evtID,'yes',topUpThumbInfo.content.fromInfo)">接受</div>
              </div>
              <div class="bottom_partition" v-else-if="(topUpGameInfo.msgCode ==24 ||topUpGameInfo.msgCode == 7|| topUpGiftInfo.msgCode==19) && gameFlag">
                <div class="handleBtn rejectBtn" @click="no_Become_Friend_rejectForGame(topUpGameInfo.content)">免战</div>
                <div class="handleBtn" @click="no_Become_Friend_respondForGame(topUpGameInfo.content)">应战</div>
              </div>
            </div>
          </div>
          <!-- 再战邀请 -->
          <div class="topUpGiftInfo-wrapper" v-else-if="topUpGameInfo.msgCode==19">
            <div class="topUpGiftInfo-top">
              <div class="img">
                <img onclick="return false" class="giftAvatar" :src="topUpGameInfo.content.fromInfo.headimgurl?topUpGameInfo.content.fromInfo.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966911743&di=b3b81acff7cdc59f21ec7cbde8b13298&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110928%2F0017030291764688_b.jpg'"
                  alt="">
              </div>
              <div class="name">
                <p class="name">{{topUpGameInfo.content.fromInfo.nickname?topUpGameInfo.content.fromInfo.nickname:'朋友'}}约你再战</p>
              </div>
            </div>
            <div class="topUpGiftInfo-middle">
              <div class="partition_zone">
                <div class="topUpGiftInfo_left">
                  <img onclick="return false" style="width:2.2rem;margin-left:1.2rem" class="giftImg" src="./assets/image/game_gift.png" alt="">
                </div>
                <div class="topUpGiftInfo_right">
                  <p class="desc title_desc">已在房间等你 约你再战300局</p>
                </div>
              </div>
            </div>
            <div class="topUpGiftInfo-bottom">
              <div class="bottom_partition">
                <div class="handleBtn rejectBtn" @click="rejectForGame(topUpGameInfo.content)">免战</div>
                <div class="handleBtn" @click="respondForGame(topUpGameInfo.content)">应战</div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div v-show="showClientServiceIconFlag" class="kefu" @click="inToLetter">
        <img onclick="return false" src="./assets/image/home_letter.png" alt="" class="pic_kefu">
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
  import qrCode from "base/qrCode/qrCode";
  import envelope from "base/envelope/envelope";
  import topUp from "base/topUp/topUp";
  import friendPanel from "base/becomeFriendPanel/becomeFriendPanel";
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from "vuex";
  import util from "common/util";
  import api from "common/api";
  import Bus from "common/bus.js";
  export default {
    name: "app",
    data() {
      return {
        isHandleMessageFromQueue: true,
        isShowGiftGuide: false,
        isvirtualGift: false,
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
        showClientServiceIconFlag: true,
        defaultfemaletHeadUrl: require("./assets/image/avatar2.jpg"),
        defaultmaleHeadUrl: require("./assets/image/dinosourt.png"),
        responseForGameUrl: "",
        showMatchingSoulTimes: 0,
        timeTick: null
      };
    },
    computed: {
      ...mapState([
        "messageQueue",
        "topUpMessage",
        "userInfo",
        "friendPanelFlag",
        "inputValue",
        "dynamicFriendEvt",
        "messType",
        "topUpGiftInfo",
        "topUpThumbInfo",
        "topUpGameInfo",
        "allMutatualInfo",
        "soulFriInfo",
        "staticChatFriendObj",
        "shopSettingInfo"
      ]),
      ...mapGetters(["qrIsShow"])
    },
    created() {
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
    // created() {
    //    this.loadLastRoomInfo() //加载回房信息
    // },
    mounted() {
      let _GameUrl = window.location.href;
      let indexGame = _GameUrl.indexOf(".com");
      let shareurlGame = _GameUrl.slice(0, indexGame);
      this.responseForGameUrl = `${shareurlGame}.com/`;
      this.loadLastRoomInfo(); //加载回房信息
      // alert(`${this.responseForGameUrl}game/?gamePath=game1`)
      this.timeTick = setTimeout(() => {
        this.clearTopUpData();
        this.allMutatualInfo_temp = {};
        this.isAlreadyFriend = false;
        var topUpGameInfo = {
          content: {
            fromInfo: {
              openid: "lakdjgjkfh",
              headimgurl: this.userInfo.sex == "男" ?
                this.defaultfemaletHeadUrl :
                this.defaultmaleHeadUrl,
              nickName: this.userInfo.sex == "男" ? "邻桌小妹" : "邻桌小哥"
            },
            extMsg: {
              combatID: "",
              headImgURL: "",
              inviterID: "",
              nickName: "",
              url: `${this.responseForGameUrl}game/?gamePath=game1`
            }
          },
          msgCode: 7
        };
        // this.addFriendEvtObj(topUpGameInfo)
        this.addMessageIntoQueue(topUpGameInfo);
      }, 30000);
      //create setInterval to listen new message
      setInterval(() => {
        //轮训读取队列看是否有未处理消息
        // console.log("length--------",this.messageQueue.length)
        if (!this.isHandleMessageFromQueue) {
          return;
        }
        this.selectMessageFromQueue();
        if (this.topUpMessage && this.isHandleMessageFromQueue) {
          this.isHandleMessageFromQueue = false;
          this.addFriendEvtObj(this.topUpMessage);
          this.delMessageQueue();
          this.clearTopUpMessage();
        }
      }, 3000);
    },
    methods: {
      confirm() {
        if (!this.userInfo.isSubscribe) {
          this.changeQrCodeText({
            title: "长按关注，每天获签到积分及更多特权",
            bottomText: "会员特权:领福利、交群友、参活动"
          });
          this.showQrcode(true);
        }
        this.isShowGiftPanel = false;
        this.isShowGiftGuide = false;
      },
      gotoDetail() {
        if (!this.userInfo.isSubscribe) {
          this.changeQrCodeText({
            title: "长按关注，每天获签到积分及更多特权",
            bottomText: "会员特权:领福利、交群友、参活动"
          });
          this.showQrcode(true);
        }
        if (this.isvirtualGift) {
          this.$router.push({
            name: `giftDetail`
          });
        } else {
          this.$router.push({
            name: `card`
          });
        }
        this.isShowGiftPanel = false;
        this.isShowGiftGuide = false;
      },
      //监听充值面板状态
      closeIntegralPanel(flag) {
        // console.log('面板状态-----------', flag);
        this.isGiftPanel = flag;
      },
      inToLetter() {
        util.routerTo("message", this, {
          routeParamNum: 2 //路由参数2表示从店长信箱进入店长留言
        });
      },
      //拒绝回房
      rejectBacToGame() {
        api.enforceLeaveRoom().then(res => {
          console.log("拒绝回房-----------", res);
        });
        this.showBackToGame = false;
      },
      goBackGame() {
        window.location.href = `${this.responseForGameUrl}game/?gamePath=${
          this.gamePath
        }&roomID=${this.roomID}`;
      },
      //加载游戏回房信息
      loadLastRoomInfo() {
        console.log("执行回房信息---------");
        // var cacheRoomId = localStorage.getItem("backRoomId") || ""
        api.loadLastRoomInfo().then(res => {
          console.log("回房信息--------", res);
          if (res.roomID) {
            this.roomID = res.roomID;
            this.gamePath = res.gamePath;
            if (this.roomID) {
              // localStorage.setItem("backRoomId", this.roomID)
              this.showBackToGame = true;
            }
          }
        });
      },
      //加好友
      onlineSendGift(e) {
        // console.log(e.target.checked)
        this.isMakeFriendBool = e.target.checked;
      },
      showDetail() {
        switch (this.messType) {
          case "shareGetIntegral":
            this.$router.push({
              name: `giftDetail`
            });
            break;
          case "message":
            this.setChatFriend(this.dynamicFriendEvt.fromInfo);
            console.log(
              "this.dynamicFriendEvt.fromInfo-----------",
              this.dynamicFriendEvt.fromInfo
            );
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
              name: `card`
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
            // console.log(this.dynamicFriendEvt.fromInfo.nickname);
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
                // console.log(res);
                if (res.errcode === 0) {
                  this.isShowEnvelope = true;
                  this.envelopeText = "飞奔个赞过去,等待对方回赞成为好友";
                  setTimeout(() => {
                    this.isShowEnvelope = false;
                  }, 2000);
                } else if (res.errcode === 1023) {
                  this.showQrcode(true);
                } else {
                  this.isShowEnvelope = true;
                  this.envelopeText = "您已点赞了哦,等待对方回赞成为好友";
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
      //灵魂匹配拒绝
      rejectSoulFri() {
        this.isShowGiftPanel = false;
        this.clearTopUpData();
      },
      //灵魂匹配接受
      acceptSoulFri(userInfo) {
        this.isShowGiftPanel = false;
        api.acceptSoulFri(userInfo.openid).then(res => {
          // if (res.errCode === 0) {
          this.isHandleMessageFromQueue = true;
          this.clearTopUpMessage();
          this.setChatFriend(userInfo);
          this.$router.push({
            name: "chat",
            params: {
              isSoul: true,
              id: this.staticChatFriendObj.openid
            }
          });
          this.clearTopUpData();
          // }
        });
      },
      //回赞事件
      backThumbClick(type, flag, fromInfo) {
        api.giveBackThumb(type, flag).then(res => {
          if (res.errCode === 0) {
            this.setChatFriend(fromInfo);
            this._loadMutualEvents();
            this._loadFriends();
            this.isShowGiftPanel = false;
            this.clearTopUpMessage();
            this.isHandleMessageFromQueue = true;
            if (flag == "yes") {
              this.changeFriPanelFlag(true);
              Bus.$emit("changeFriendConnetion", fromInfo.openid);
            }
            // this.addFriendEvtObj({}) //清空推送内容
          }
        });
      },
      //未成为好友的送礼回复
      no_Become_Friend_respondForGift(giftInfo, flag) {
        console.log("未成为好友的送礼回复----------------", giftInfo);
        let giftParam = {
          agree: flag, //是否接受
          recordID: giftInfo.extMsg.goodInfo.extInfo.recordID, //送礼记录ID
          fromID: giftInfo.fromInfo.openid, //赠送者
          respondType: giftInfo.extMsg.goodInfo.msgType, //记录的礼物类型  0是虚拟礼物、1是店长推荐和商城礼品
          isMakeFriend: this.isMakeFriendBool,
          isSysSendGift: false
        };
        api.respondForGift(giftParam).then(res => {
          if (res.errCode == 0) {
            //重新拉取约战，送礼，点赞列表
            api.getUserInfo("/api/loadUserInfo").then(res => {
              this.getUserInfo(res);
            });
            this._loadMutualEvents();
            this.isMakeFriendBool = true;
            this.isHandleMessageFromQueue = true;
            this.clearTopUpMessage();
            //  this.addFriendEvtObj({}) //清空推送内容
          }
        });
        if (flag) {
          if (
            giftInfo.name === "beer" ||
            giftInfo.name === "flower" ||
            giftInfo.name === "house" ||
            giftInfo.name === "boat"
          ) {
            this.isvirtualGift = true;
          } else {
            this.isvirtualGift = false;
          }
          this.isShowGiftGuide = true;
        } else {
          this.isShowGiftPanel = false;
        }
        this._loadMutualEvents();
      },
      //已成为好友的送礼回复
      respondForGift(giftInfo, flag) {
        console.log("成为好友的送礼回复----------------", giftInfo);
        let giftParam = {
          agree: flag, //是否接受
          recordID: giftInfo.recordID, //送礼记录ID
          fromID: giftInfo.openid, //赠送者
          respondType: giftInfo.msgType, //记录的礼物类型  0是虚拟礼物、1是店长推荐和商城礼品
          isMakeFriend: this.isMakeFriendBool,
          // chatMsgID: giftInfo.isAlreadyFriends?giftInfo.id:""
          chatMsgID: giftInfo.id,
          isSysSendGift: false
        };
        api.respondForGift(giftParam).then(res => {
          if (res.errCode == 0) {
            //重新拉取约战，送礼，点赞列表
            // this._loadMutualEvents();
            api.getUserInfo("/api/loadUserInfo").then(res => {
              this.getUserInfo(res);
            });
            this.isMakeFriendBool = true;
            this.isHandleMessageFromQueue = true;
            this.clearTopUpMessage();
          }
        });
        if (flag) {
          if (
            giftInfo.name === "beer" ||
            giftInfo.name === "flower" ||
            giftInfo.name === "house" ||
            giftInfo.name === "boat"
          ) {
            this.isvirtualGift = true;
          } else {
            this.isvirtualGift = false;
          }
          this.isShowGiftGuide = true;
        } else {
          this.isShowGiftPanel = false;
        }
        this._loadMutualEvents();
      },
      //未成为好友拒绝游戏
      no_Become_Friend_rejectForGame(gameInfo) {
        console.log(
          "no_Become_Friend_rejectForGame_gameInfo-----------",
          gameInfo
        );
        let params = {
          agree: false, //是否接受
          combatID: gameInfo.extMsg.gameInfo.combatID,
          fromID: gameInfo.fromInfo.openid
        };
        this.isHandleMessageFromQueue = true;
        this.clearTopUpMessage();
        if (this.topUpGameInfo.msgCode == 24) {
          let p = {
            agree: false,
            openID: gameInfo.fromInfo.openid
          };
          api.queueCombatReply(p).then(res => {
            console.log("队列邀请拒绝结果---", res);
          });
        }
        api.responseCombat(params).then(res => {
          if (res.errCode == 0) {
            console.log("删除结果-----------", res);
          }
        });
        this.isShowGiftPanel = false;
        this._loadMutualEvents();
        // this.addFriendEvtObj({}) //清空推送内容
      },
      //未成为好友接受游戏
      no_Become_Friend_respondForGame(gameInfo) {
        console.log(
          "no_Become_Friend_respondForGame_gameInfo-----------",
          gameInfo
        );
        this.isHandleMessageFromQueue = true;
        this.clearTopUpMessage();
        let params = {
          agree: true, //是否接受
          combatID: gameInfo.extMsg.gameInfo.combatID,
          fromID: gameInfo.fromInfo.openid
        };
        if (this.topUpGameInfo.msgCode == 24) {
          let p = {
            agree: true,
            openID: gameInfo.fromInfo.openid
          };
          api.queueCombatReply(p).then(res => {
            console.log("队列邀请接受结果---", res);
          });
        }
        if (params.combatID) {
          //约战
          api.responseCombat(params).then(res => {
            console.log(res);
            if (res.errCode == 0) {
              console.log("删除结果-----------", res);
              window.location.href = gameInfo.extMsg.gameInfo.url;
            }
          });
        } else {
          //应战
          // alert(gameInfo.extMsg.gameInfo.url)
          window.location.href = gameInfo.extMsg.gameInfo.url;
        }
      },
      //成为好友后接受游戏
      respondForGame(game) {
        this.isHandleMessageFromQueue = true;
        this.clearTopUpMessage();
        console.log("respondForGame_gameInfo-----------", game);
        var params = {};
        var gameUrl = "";
        if (this.topUpGameInfo.msgCode == 24) {
          let p = {
            agree: true,
            openID: game.openid
          };
          api.queueCombatReply(p).then(res => {
            console.log("队列邀请接受结果---", res);
          });
        }
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
          };
          gameUrl = game.url;
        }
        //约战
        api.responseCombat(params).then(res => {
          console.log(res);
          if (res.errCode == 0) {
            console.log("删除结果-----------", res);
            // this.addFriendEvtObj({}) //清空推送内容
            window.location.href = gameUrl;
          }
        });
      },
      //拒绝游戏
      rejectForGame(gameInfo) {
        console.log("rejectForGame_gameInfo0-----------", gameInfo);
        this.isHandleMessageFromQueue = true;
        this.clearTopUpMessage();
        var params = {};
        if (this.topUpGameInfo.msgCode == 24) {
          let p = {
            agree: true,
            openID: gameInfo.fromInfo.openid
          };
          api.queueCombatReply(p).then(res => {
            console.log("队列邀请拒接结果---", res);
          });
        }
        if (this.topUpGameInfo.msgCode == 19) {
          //再战弹框
          params = {
            agree: false, //是否接受
            fromID: gameInfo.fromInfo.openid,
            IsAgainPlay: true
          };
        } else {
          params = {
            agree: false, //是否接受
            combatID: gameInfo.combatID,
            fromID: gameInfo.openid,
            chatMsgID: gameInfo.id,
            IsAgainPlay: false
          };
        }
        api.responseCombat(params).then(res => {
          console.log(res);
          if (res.errCode == 0) {
            this.isShowGiftPanel = false;
            // this.addFriendEvtObj({}) //清空推送内容
            console.log("删除结果-----------", res);
          }
        });
        this._loadMutualEvents();
      },
      //拉取约战、点赞、送礼列表
      _loadMutualEvents() {
        api.loadMutualEvents().then(res => {
          if (res.errCode === 0) {
            let mutualEventsObj = res.mutualEvents;
            let mutualEventsList = [];
            mutualEventsList = mutualEventsList.concat(
              mutualEventsObj.combatsEvents
            );
            mutualEventsList = mutualEventsList.concat(
              mutualEventsObj.giftEvents
            );
            mutualEventsList = mutualEventsList.concat(
              mutualEventsObj.friendEvents
            );
            let count = mutualEventsList.length;
            this.CalcManualEventsCount(count);
          }
          this.addBange();
        });
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
        addGiftInfo: "ADD_GIFTINFO",
        CalcManualEventsCount: "GET_ALLEVENTS_BADGECOUNT", //统计约战送礼点赞数
        addBange: "ADD_BADGE",
        changeQrCodeText: "CHANGEQRCODETEXT",
        showQrcode: "SHOW_QRCODE",
        getUserInfo: "GET_USERINFO", //获取用户信息
        addFriendEvtObj: "UPDATE_DYNAMICMESSAGE", //更新好友事件提示框
        delMessageQueue: "DELMESSAGEQUEUE",
        addMessageIntoQueue: "ADDMESSAGEQUEUE",
        clearTopUpMessage: "CLEARTOPUPMESSAGE", //清除队列消息
        selectMessageFromQueue: "SELECTMESSAGEFROMQUEUE", //选择队列消息第一个
        clearTopUpData: "CLEARTOPUPDATA"
      }),
      ...mapActions({
        getAlreadyFriendList: "get_alreadyFriendList" //加载已经成为好友列表
      })
    },
    watch: {
      deep: true,
      dynamicFriendEvt: function(newValue) {
        this.isShowEnvelop = false;
        this.isThrottle = false;
        if (newValue.notifyType === 8) {
          let onlineUser = newValue.fromInfo;
          let hasUser;
          //判断待通知用户列表里面是否有当前上线的用户
          this.notifyUserIdList.forEach(user => {
            if (user.openid === onlineUser.openid) {
              hasUser = true;
            }
          });
          //如果待通知用户列表里面没有当前上线用户，则把当前上线用户push进待通知用户列表,并记录当前上戏时间
          if (!hasUser) {
            this.isThrottle = true;
            onlineUser["loginTime"] = new Date().getTime();
            this.notifyUserIdList.push(onlineUser);
          }
          //如果待通知用户列表里面有当前上线用户，则判断距上次上线时间是否超过300秒，超过300秒，信封弹框
          if (hasUser) {
            let notifyUser = this.notifyUserIdList.filter(user => {
              return user.openid === onlineUser.openid;
            });
            let isMore300s =
              new Date().getTime() - notifyUser[0].loginTime > 300000;
            if (isMore300s) {
              this.isThrottle = true;
              this.notifyUserIdList.forEach(user => {
                //重新设置登录时间
                if (user.openid == onlineUser.openid) {
                  user["loginTime"] = new Date().getTime();
                }
              });
            } else {
              this.isThrottle = false;
            }
          }
        } else {
          this.isThrottle = true;
        }
        if (this.isThrottle) {
          this.isShowEnvelop = true;
          setTimeout(() => {
            this.isShowEnvelop = false;
          }, 3000);
        }
      },
      allMutatualInfo: function(newValue) {
        clearTimeout(this.timeTick);
        if (!Object.keys(newValue).length) {
          return;
        }
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
          name: contentStruct.chatExtMsg.extMsg.name ?
            contentStruct.chatExtMsg.extMsg.name :
            "",
          isAlreadyFriends: fromImfo.isAlreadyFriends,
          limit: contentStruct.chatExtMsg.extMsg.limit ?
            contentStruct.chatExtMsg.extMsg.limit :
            "",
          image: contentStruct.chatExtMsg.extMsg.image ?
            contentStruct.chatExtMsg.extMsg.image :
            "",
          msgType: contentStruct.chatExtMsg.msgType,
          isHandled: contentStruct.chatExtMsg.isHandled,
          couponID: contentStruct.chatExtMsg.extMsg.couponID ?
            contentStruct.chatExtMsg.extMsg.couponID :
            "",
          integral: contentStruct.chatExtMsg.extMsg.integral ?
            contentStruct.chatExtMsg.extMsg.integral :
            "",
          recordID: contentStruct.chatExtMsg.extMsg.recordID ?
            contentStruct.chatExtMsg.extMsg.recordID :
            "",
          subtopic: contentStruct.chatExtMsg.extMsg.subtopic ?
            contentStruct.chatExtMsg.extMsg.subtopic :
            "",
          money: contentStruct.chatExtMsg.extMsg.money ?
            contentStruct.chatExtMsg.extMsg.money :
            "",
          combatID: contentStruct.chatExtMsg.extMsg.combatID ?
            contentStruct.chatExtMsg.extMsg.combatID :
            "",
          headImgURL: contentStruct.chatExtMsg.extMsg.headImgURL ?
            contentStruct.chatExtMsg.extMsg.headImgURL :
            "",
          inviterID: contentStruct.chatExtMsg.extMsg.inviterID ?
            contentStruct.chatExtMsg.extMsg.inviterID :
            "",
          // nickName:contentStruct.chatExtMsg.extMsg.nickName?contentStruct.chatExtMsg.extMsg.nickName:"",
          url: contentStruct.chatExtMsg.extMsg.url ?
            contentStruct.chatExtMsg.extMsg.url :
            ""
        };
        // console.log("allMutatualInfo---------------------", this.allMutatualInfo_temp);
        if (this.allMutatualInfo_temp.type == 3) {
          this.giftFlag = true;
          this.gameFlag = false;
        } else if (this.allMutatualInfo_temp.type == 4) {
          this.giftFlag = false;
          this.gameFlag = true;
        }
      },
      topUpGiftInfo: function(newValue) {
        clearTimeout(this.timeTick);
        if (!newValue.msgCode) {
          return;
        }
        console.log("topUpGiftInfo----------", newValue);
        this.judgeEveryBool(true, false, true, false);
        switch (newValue.content.extMsg.goodInfo.extInfo.name) {
          case "beer":
            this.addGiftInfo({
              nameValue: "啤酒",
              typeValue: "beer"
            });
            break;
          case "flower":
            this.addGiftInfo({
              nameValue: "鲜花",
              typeValue: "flower"
            });
            break;
          case "house":
            this.addGiftInfo({
              nameValue: "别墅",
              typeValue: "house"
            });
            break;
          case "car":
            this.addGiftInfo({
              nameValue: "邮轮",
              typeValue: "boat"
            });
            break;
          default:
            break;
        }
        // console.log('送的礼物----------', newValue);
      },
      topUpThumbInfo: function(newValue) {
        clearTimeout(this.timeTick);
        if (!newValue.msgCode) {
          return;
        }
        console.log("topUpThumbInfo-------------", newValue);
        this.judgeEveryBool(true, false, false, true);
      },
      soulFriInfo: function(newValue) {
        clearTimeout(this.timeTick);
        if (!newValue.msgCode) {
          return;
        }
        if (this.showMatchingSoulTimes < 2) {
          this.judgeEveryBool(true, true, false, false);
        } else {
          this.clearTopUpData();
        }
        this.showMatchingSoulTimes++;
      },
      topUpGameInfo: function(newValue) {
        clearTimeout(this.timeTick);
        if (!newValue.msgCode) {
          return;
        }
        console.log("topUpGameInfo-------------", newValue);
        this.judgeEveryBool(true, true, false, false);
      },
      $route: function(newValue, oldValue) {
        // console.log("$route---------", oldValue)
        if (
          newValue.name == "message" ||
          newValue.name === "chat" ||
          newValue.name === "clientChat" ||
          newValue.name === "shareActivity"
        ) {
          //控制客服图标显示
          this.showClientServiceIconFlag = false;
        } else {
          this.showClientServiceIconFlag = true;
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
      friendPanel,
      topUp
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
    width: 8.33rem;
    height: 4.6933rem;
    background-image: url("./assets/image/envelop_handle.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: fixed;
    z-index: 9999;
    top: 5rem;
    left: 50%;
    transform: translateX(-4.4rem);
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
      justify-content: space-between;
      margin-top: 1.8rem;
      padding: 0 0.15rem;
      .reject_btn,
      .back_btn {
        border: none;
        letter-spacing: 0.08rem;
        font-weight: 800;
        color: #333;
        font-size: 0.35rem;
      }
      .reject_btn {
        border: 1px solid #ccc;
        padding: 0rem;
      }
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
      background: rgba(0, 0, 0, 0.3);
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
      background-image: url("./assets/image/envelop_handle.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: fixed;
      top: 30%;
      left: 0;
      right: 0;
      margin: 0 auto; // transform: translateX(-3.333rem);
      z-index: 99999;
      height: 4.3rem;
      .topUpGiftInfo-top {
        box-sizing: border-box;
        padding-top: 0.2333rem;
        margin-left: 0.333rem;
        display: flex;
        position: relative;
        height: 1rem;
        .giftAvatar {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
        }
        .giftText {
          margin-top: 0.1rem; // margin-left: 0.rem;
          font-size: 13px;
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
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
            .thumb_text {
              font-size: 0.4467rem;
            }
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
              color: #5b5b5b;
              font-size: 0.3467rem;
              font-weight: 600;
            }
            .soulText {
              color: #333;
              width: 100%;
              font-weight: 600;
              text-align: center;
              font-size: 0.4rem;
              margin-bottom: 0.2333rem;
            }
          }
        }
      }
      .topUpGiftInfo-bottom {
        .bottom_partition {
          display: flex;
          justify-content: space-between;
          margin-top: 0.2rem;
          padding-bottom: 0.3333rem;
          position: relative;
          width: 100%;
          box-sizing: border-box;
          .checkBox_scene {
            position: absolute;
            bottom: 0.2667rem;
            right: 0.2867rem;
            .checkbox {
              width: 0.4rem;
              height: 0.4rem;
              vertical-align: middle;
            }
            .scene-text {
              font-weight: 600;
              padding-bottom: 0.0533rem;
              vertical-align: middle;
            }
          }
        }
        .handleBtn {
          position: absolute;
          right: 0.1rem;
          border-radius: 0.1rem;
          bottom: -0.4rem;
          box-sizing: border-box; // letter-spacing: 0.08rem;
          font-weight: 800;
          color: #fff;
          padding: 0.1333rem 0.4rem;
          font-size: 0.35rem; // background: -webkit-linear-gradient(top, #fedc00, #e39300);
        }
        .rejectBtn {
          position: absolute;
          bottom: -0.4rem;
          left: 0.4rem;
          text-align: center;
          padding: 0rem;
          border: 1px solid rgb(97, 3, 3);
          color: rgb(156, 13, 13);
          width: 0.8rem;
          display: inline-block;
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
