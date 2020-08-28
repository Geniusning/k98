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
          </div>
          <div @click="showDetail" v-show="isShowEnvelopHandle">
            <div class="detail" v-if="messType !='onlineNotice'">&gt;&gt;详情</div>
            <div class="detail" v-else-if="dynamicFriendEvt.fromInfo.isAlreadyFriends == true ">&gt;&gt;去聊天</div>
            <div class="detail" v-else>&gt;&gt;打个招呼</div>
          </div>
        </div>
      </transition>
      <!-- 回房通知   " -->
      <div class="backToGame_wrapper" v-if="showBackToGame">
        <p class="backToGame_text">{{isDeskRoom?"同桌已开好房等你决战！":"您有未完成对战，对手还在等您"}}</p>
        <div class="btn_wrapper">
          <div class="reject_btn" @click="rejectBacToGame">{{isDeskRoom?"免战":"放弃"}}</div>
          <div class="back_btn" @click="goBackGame">{{isDeskRoom?"应战":"再战"}}</div>
        </div>
      </div>
      <div class="mask_bg" v-if="isShowGiftPanel">
        <transition name="gift-Panel" mode="out-in">
          <!-- 好友的约战送礼交互 -->
          <div class="topUpCommonInfo-wrapper" v-if="isShowGiftPanel && allMutatualInfo_temp.isAlreadyFriends">
            <div class="topUpCommonInfo-top" v-if="!isShowGiftGuide">
              <div class="img">
                <img onclick="return false" class="giftAvatar" :src="allMutatualInfo_temp.headimgurl?allMutatualInfo_temp.headimgurl:shopSettingInfo.image" alt="">
              </div>
              <div class="name">
                <p class="name" v-if="allMutatualInfo_temp.type == 3 && giftFlag">{{allMutatualInfo_temp.nickname?allMutatualInfo_temp.nickname:'店长'}}送您一份礼物</p>
                <p class="name" v-else-if="allMutatualInfo_temp.type == 4 && gameFlag">{{allMutatualInfo_temp.nickname?allMutatualInfo_temp.nickname:'朋友'}}</p>
              </div>
            </div>
            <div class="topUpCommonInfo-top" v-if="isShowGiftGuide">
              <p class="giftText">{{isvirtualGift?"收到虚拟礼物，积分存入→我的→积分明细":"收到礼券一份，存入→我的→卡券包，到店兑换"}}</p>
            </div>
            <div class="topUpCommonInfo-middle">
              <div class="partition_zone" v-if="allMutatualInfo_temp.type == 3 && giftFlag">
                <div class="topUpCommonInfo_left">
                  <img onclick="return false" class="giftImg" v-if="allMutatualInfo_temp.name==='beer'" src="./assets/image/beer.png" alt="">
                  <img onclick="return false" class="giftImg" v-else-if="allMutatualInfo_temp.name==='flower'" src="./assets/image/flower.png" alt="">
                  <img onclick="return false" class="giftImg" v-else-if="allMutatualInfo_temp.name==='house'" src="./assets/image/car.jpg" alt="">
                  <img onclick="return false" class="giftImg" v-else-if="allMutatualInfo_temp.name==='car'" src="./assets/image/boat.jpg" alt="">
                  <img onclick="return false" class="giftImg" v-else :src="allMutatualInfo_temp.image" alt="">
                </div>
                <div class="topUpCommonInfo_right">
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
                <div class="topUpCommonInfo_left">
                  <img onclick="return false" style="width:2.2rem;margin-left:1.2rem" class="giftImg" src="./assets/image/game_gift.png" alt="">
                </div>
                <div class="topUpCommonInfo_right">
                  <p class="desc title_desc">{{allMutatualInfo_temp.combatID?'约你玩几局大话骰':'约你玩一局大话骰'}}</p>
                  <p class="desc title_sub_desc">{{allMutatualInfo_temp.combatID?'':''}}</p>
                </div>
              </div>
            </div>
            <div class="topUpCommonInfo-bottom">
              <div class="bottom_partition" v-if="allMutatualInfo_temp.type == 3 && giftFlag">
                <div v-if="!isShowGiftGuide" class=" rejectBtn" @click="respondForGift(allMutatualInfo_temp,false,allMutatualInfo_temp.openid)">拒收</div>
                <div v-if="!isShowGiftGuide" class="acceptBtn" @click="respondForGift(allMutatualInfo_temp,true,allMutatualInfo_temp.openid)">感谢</div>
                <div v-if="isShowGiftGuide" class="acceptBtn" @click="confirm(allMutatualInfo_temp)">确定</div>
                <div v-if="isShowGiftGuide" class="rejectBtn" @click="gotoDetail">详情</div>
              </div>
              <div class="bottom_partition" v-else-if="allMutatualInfo_temp.type == 4 && gameFlag">
                <div class=" rejectBtn" @click="rejectForGame(allMutatualInfo_temp)">免战</div>
                <div class="acceptBtn" @click="respondForGame(allMutatualInfo_temp)">应战</div>
              </div>
            </div>
          </div>
         
          <!-- 灵魂匹配 -->
          <div class="topUpCommonInfo-wrapper" v-else-if="soulFriInfo.msgCode==21">
            <div class="topUpCommonInfo-top" v-if="isShowGiftGuide">
              <div class="img">
                <img onclick="return false" class="giftAvatar" :src="soulFriInfo.content.fromInfo.headimgurl?soulFriInfo.content.fromInfo.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966911743&di=b3b81acff7cdc59f21ec7cbde8b13298&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110928%2F0017030291764688_b.jpg'"
                  alt="">
              </div>
              <div class="name">
                <p class="name">{{soulFriInfo.content.fromInfo.nickname?soulFriInfo.content.fromInfo.nickname:'朋友'}}</p>
              </div>
            </div>
            <div class="topUpCommonInfo-top" v-if="isShowGiftGuide">
              <p class="giftText">{{isvirtualGift?"收到如下虚拟礼物，积分存入→我的→积分明细":"收到礼物兑换券一份，存入→我的→卡券，可到店使用"}}</p>
            </div>
            <div class="topUpCommonInfo-middle">
              <div class="partition_zone">
                <div class="topUpCommonInfo_right" style="padding-top: 30px">
                  <p class="desc title_desc soulText">Ta启动了寻觅灵魂玩伴</p>
                  <p class="soulText">茫茫人海中找到了你,匹配度:80%</p>
                </div>
              </div>
            </div>
            <div class="topUpCommonInfo-bottom soul-Bottom" style="margin-top:.3rem">
              <div class="bottom_partition">
                <div class="rejectBtn" style="bottom:-0.7rem;" @click="acceptSoulFri(soulFriInfo.content.fromInfo,false)">拒绝</div>
                <div class="acceptBtn" style="bottom:-.8rem;right:.15rem" @click="acceptSoulFri(soulFriInfo.content.fromInfo,true)">结识</div>
              </div>
            </div>
          </div>
          <!-- 员工送券 -->
          <div class="topUpCommonInfo-wrapper" v-else-if="topUpCommonInfo.msgCode==27">
            <div class="topUpCommonInfo-top">
              <div class="name">
                <p class="name">店员给您送礼啦</p>
              </div>
            </div>
            <div class="topUpCommonInfo-middle">
              <div class="partition_zone">
                <div class="topUpCommonInfo_left">
                  <img onclick="return false" style="width:1.7rem;margin-left:1.2rem;border-radius:40%" class="giftImg" :src="topUpCommonInfo.content.fromInfo.headimgurl?topUpCommonInfo.content.fromInfo.headimgurl:tempPic" alt="">
                </div>
                <div class="topUpCommonInfo_right">
                  <p class="desc title_desc">一份礼品已经存入您的卡券包</p>
                </div>
              </div>
            </div>
            <div class="topUpCommonInfo-bottom">
              <div class="bottom_partition">
                <div class=" rejectBtn" @click="gotoDetail">详情</div>
                <div class="acceptBtn" @click="confirm(topUpCommonInfo.content.fromInfo)">知道</div>
              </div>
            </div>
          </div>
          <!-- 贵宾上线通知 -->
          <div class="topUpCommonInfo-wrapper" v-else-if="topUpCommonInfo.msgCode==29">
            <div class="topUpCommonInfo-top">
              <div class="img">
                <img onclick="return false" class="giftAvatar" :src="topUpCommonInfo.content.fromInfo.headimgurl?topUpCommonInfo.content.fromInfo.headimgurl:tempPic"
                  alt="">
              </div>
              <div class="name">
                <p class="name">{{topUpCommonInfo.content.fromInfo.nickname?topUpCommonInfo.content.fromInfo.nickname:'朋友'}}</p>
              </div>
            </div>
            <div class="topUpCommonInfo-middle">
              <div class="partition_zone">
                <div class="topUpCommonInfo_left">
                </div>
                <div class="topUpCommonInfo_right">
                  <p class="desc title_desc" style="height:1.8rem;line-height:1.8rem;text-align:center;font-size:16px;">贵宾到店，赶紧前去打招呼吧</p>
                </div>
              </div>
            </div>
            <div class="topUpCommonInfo-bottom">
              <div class="bottom_partition">
                <div class=" rejectBtn" @click="isShowGiftPanel=false">略过</div>
                <div class="acceptBtn" @click="sayHi">欢迎</div>
              </div>
            </div>
          </div>
          <!-- 再战邀请 -->
          <div class="topUpCommonInfo-wrapper" v-else-if="topUpGameInfo.msgCode==19">
            <div class="topUpCommonInfo-top">
              <div class="img">
                <img onclick="return false" class="giftAvatar" :src="topUpGameInfo.content.fromInfo.headimgurl?topUpGameInfo.content.fromInfo.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966911743&di=b3b81acff7cdc59f21ec7cbde8b13298&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110928%2F0017030291764688_b.jpg'"
                  alt="">
              </div>
              <div class="name">
                <p class="name">{{topUpGameInfo.content.fromInfo.nickname?topUpGameInfo.content.fromInfo.nickname:'朋友'}}约你再战</p>
              </div>
            </div>
            <div class="topUpCommonInfo-middle">
              <div class="partition_zone">
                <div class="topUpCommonInfo_left">
                  <img onclick="return false" style="width:2.2rem;margin-left:1.2rem" class="giftImg" :src="topUpGameInfo.content.extMsg.resImg" alt="">
                </div>
                <div class="topUpCommonInfo_right">
                  <p class="desc title_desc">欢迎光临，一份礼品已经存入您的卡券包！</p>
                </div>
              </div>
            </div>
            <div class="topUpCommonInfo-bottom">
              <div class="bottom_partition">
                <div class=" rejectBtn" @click="rejectForGame(topUpGameInfo.content)">免战</div>
                <div class="acceptBtn" @click="respondForGame(topUpGameInfo.content)">应战</div>
              </div>
            </div>
          </div>
          <!-- 友商领券 -->
          <div class="topUpCommonInfo-wrapper" v-else-if="topUpGameInfo.msgCode==30">
            <div class="topUpCommonInfo-top">
              <div class="img">
              </div>
              <div class="name">
                <p class="name">{{topUpGameInfo.content.fromInfo.nickName?topUpGameInfo.content.fromInfo.nickName:'朋友'}}店长送礼</p>
              </div>
            </div>
            <div class="topUpCommonInfo-middle">
              <div class="partition_zone">
                <div class="topUpCommonInfo_left">
                  <img onclick="return false" style="width:2.2rem;margin-left:1.2rem" class="giftImg" :src="topUpGameInfo.content.fromInfo.headimgurl" alt="">
                </div>
                <div class="topUpCommonInfo_right">
                  <p class="desc title_desc">欢迎光临，一份礼品已经存入您的卡券包</p>
                </div>
              </div>
            </div>
            <div class="topUpCommonInfo-bottom">
              <div class="bottom_partition">
                <div class=" rejectBtn" @click="gotoDetail">详情</div>
                <div class="acceptBtn" @click="confirm(topUpGameInfo.content.fromInfo)">知道</div>
              </div>
            </div>
          </div>
           <!-- 不是好友的送礼，约战交互 -->
          <div class="topUpCommonInfo-wrapper" v-else-if="isShowGiftPanel && !isAlreadyFriend && topUpGameInfo.msgCode !=19 && topUpGameInfo.msgCode != 30">
            <div class="topUpCommonInfo-top">
              <div class="img">
                <img class="giftAvatar" v-if="topUpCommonInfo.msgCode == 3 || topUpCommonInfo.msgCode==12" :src="topUpCommonInfo.content.fromInfo.headimgurl?topUpCommonInfo.content.fromInfo.headimgurl:defaultHeadUrl" alt="">
                <img class="giftAvatar" v-else-if="topUpThumbInfo.msgCode ==2" :src="topUpThumbInfo.content.fromInfo.headimgurl?topUpThumbInfo.content.fromInfo.headimgurl:defaultHeadUrl" alt="">
                <img class="giftAvatar" v-else-if="topUpGameInfo.msgCode ==24 ||topUpGameInfo.msgCode == 7 || topUpCommonInfo.msgCode==19" :src="topUpGameInfo.content.fromInfo.headimgurl?topUpGameInfo.content.fromInfo.headimgurl:(userInfo.sex=='男'?defaultfemaletHeadUrl:defaultmaleHeadUrl)"
                  alt="">
              </div>
              <div class="name">
                <p class="name" v-if="(topUpCommonInfo.msgCode == 3 || topUpCommonInfo.msgCode==12) && giftFlag">{{topUpCommonInfo.content.fromInfo.nickname?topUpCommonInfo.content.fromInfo.nickname:'店长'}}送您一份礼物</p>
                <p class="name" v-else-if="topUpThumbInfo.msgCode == 2 && thumbFlag">{{topUpThumbInfo.content.fromInfo?topUpThumbInfo.content.fromInfo.nickname:'朋友'}}给你点赞了</p>
                <p class="name" v-else-if="(topUpGameInfo.msgCode ==24 ||topUpGameInfo.msgCode == 7 || topUpCommonInfo.msgCode==19) && gameFlag">{{topUpGameInfo.content.fromInfo.nickname?topUpGameInfo.content.fromInfo.nickname:(userInfo.sex=="男"?"邻桌小妹":"邻桌小哥")}}</p>
              </div>
            </div>
            <div class="topUpCommonInfo-middle">
              <div class="partition_zone" v-if="(topUpCommonInfo.msgCode == 3 || topUpCommonInfo.msgCode==12) && giftFlag">
                <div class="topUpCommonInfo_left">
                  <img class="giftImg" v-if="topUpCommonInfo.content.extMsg.goodInfo.extInfo.type==='beer'" src="./assets/image/beer.png" alt="">
                  <img class="giftImg" v-else-if="topUpCommonInfo.content.extMsg.goodInfo.extInfo.type==='flower'" src="./assets/image/flower.png" alt="">
                  <img class="giftImg" v-else-if="topUpCommonInfo.content.extMsg.goodInfo.extInfo.type==='house'" src="./assets/image/car.jpg" alt="">
                  <img class="giftImg" v-else-if="topUpCommonInfo.content.extMsg.goodInfo.extInfo.type==='car'" src="./assets/image/boat.jpg" alt="">
                  <img class="giftImg" v-else :src="topUpCommonInfo.content.extMsg.goodInfo.extInfo.image" alt="">
                </div>
                <div class="topUpCommonInfo_right">
                  <div>
                    <p class="desc title_desc">{{topUpCommonInfo.content.extMsg.goodInfo.extInfo.name}}</p>
                  </div>
                  <p class="desc">{{topUpCommonInfo.content.extMsg.goodInfo.extInfo.subtopic?topUpCommonInfo.content.extMsg.goodInfo.extInfo.subtopic:'土豪赠送'}}</p>
                  <p class="desc">{{topUpCommonInfo.content.extMsg.goodInfo.extInfo.limit?topUpCommonInfo.content.extMsg.goodInfo.extInfo.limit:""}}</p>
                  <p class="desc title_desc">积分：{{topUpCommonInfo.content.extMsg.goodInfo.extInfo.integral?topUpCommonInfo.content.extMsg.goodInfo.extInfo.integral:topUpCommonInfo.content.extMsg.goodInfo.extInfo.money}}</p>
                </div>
              </div>
              <div class="partition_zone" v-else-if="topUpThumbInfo.msgCode == 2 && thumbFlag">
                <div class="topUpCommonInfo_left">
                  <img style="width:2rem;margin-left:1.2rem" class="giftImg" src="./assets/image/thumb_gift.png" alt="">
                </div>
                <div class="topUpCommonInfo_right">
                  <p class="desc title_desc thumb_text">请求加你为好友...</p>
                </div>
              </div>
              <div class="partition_zone" v-else-if="(topUpGameInfo.msgCode ==24 ||topUpGameInfo.msgCode == 7|| topUpCommonInfo.msgCode==19) && gameFlag">
                <div class="topUpCommonInfo_left">
                  <img style="width:2.2rem;margin-left:1.2rem" class="giftImg" src="./assets/image/game_gift.png" alt="">
                </div>
                <div class="topUpCommonInfo_right">
                  <p class="desc title_desc">{{topUpGameInfo.content.extMsg.gameInfo.combatID?'约你玩几局大话骰':'约你玩一局大话骰'}}</p>
                  <p class="desc title_sub_desc">{{topUpGameInfo.content.extMsg.gameInfo.combatID?'':''}}</p>
                </div>
              </div>
            </div>
            <div class="topUpCommonInfo-bottom">
              <div class="bottom_partition" v-if="(topUpCommonInfo.msgCode == 3 || topUpCommonInfo.msgCode==12) && giftFlag">
                <div v-if="!isShowGiftGuide" class=" rejectBtn" @click="no_Become_Friend_respondForGift(topUpCommonInfo.content,false)">拒收</div>
                <div v-if="!isShowGiftGuide" class="acceptBtn" @click="no_Become_Friend_respondForGift(topUpCommonInfo.content,true)">感谢</div>
                <div v-if="isShowGiftGuide" class="acceptBtn" @click="confirm(topUpCommonInfo.content.fromInfo)">知道</div>
                <div v-if="isShowGiftGuide" class=" rejectBtn" @click="gotoDetail">详情</div>
              </div>
              <div class="bottom_partition" v-else-if="topUpThumbInfo.msgCode == 2 && thumbFlag">
                <div class=" rejectBtn" @click="backThumbClick(topUpThumbInfo.content.extMsg.thumbInfo.evtID,'no',topUpThumbInfo.content.fromInfo)">拒绝</div>
                <div class="acceptBtn" @click="backThumbClick(topUpThumbInfo.content.extMsg.thumbInfo.evtID,'yes',topUpThumbInfo.content.fromInfo)">接受</div>
              </div>
              <div class="bottom_partition" v-else-if="(topUpGameInfo.msgCode ==24 ||topUpGameInfo.msgCode == 7|| topUpCommonInfo.msgCode==19) && gameFlag">
                <div class=" rejectBtn" @click="no_Become_Friend_rejectForGame(topUpGameInfo.content)">免战</div>
                <div class="acceptBtn" @click="no_Become_Friend_respondForGame(topUpGameInfo.content)">应战</div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!-- <div class="movie_box" > -->
      <div ref="move_div" :style="{top:top+'px'}" @touchstart="down($event)" @touchmove="move($event)" @touchend="end" v-show="showClientServiceIconFlag" class="kefu" @click="inToLetter">
        <img onclick="return false" src="./assets/image/home_letter.png" alt="" class="pic_kefu">
        <p class="kefu-text">客服/收银</p>
        <!-- </div> -->
      </div>
      <!-- 分身切换弹框 -->
      <div class="divide-topUp" v-if="isShowDivideList">
        <div class="bg"></div>
        <div class="divide-title">
          <img class="divide-icon" src="./assets/image/divide_avatar.png" alt="">
          <span class="divide-titleText">分身消息</span>
          <img @click="isShowDivideList=false" class="divide-close" src="./assets/image/divide_close.png" alt="">
        </div>
        <ul class="divide-list">
          <li class="divide-item" v-for="(divide,index) in divideList" :key="index">
            <img class="divide-avatar" :src="divide.headimgurl?divide.headimgurl:divideAvartar" alt="">
            <i class="avatar-dot" v-show="divide.unreadMsgCount"></i>
            <p style="width:40%;text-align: center" @click="delDivide(divide.openid)" class="divide-name">{{divide.nickName}}</p>
            <p style="width:20%" class="divide-time">{{divide.latesMsgTime?divide.latesMsgTime.slice(8,10)==today?divide.latesMsgTime.slice(10,16):divide.latesMsgTime.slice(5,10):""}}</p>
            <img @click="switchToDivide(divide)" class="divide-arrow" src="./assets/image/divide_right.png" alt="">
          </li>
        </ul>
      </div>
      <!-- 分身信封入口 divide_badgeCount ||isShowDivideEnv -->
      <div class="divide_wrapper" @click="showDivideList" v-if="(hasDivideIdentity && hasUserRole)">
        <img src="./assets/image/divide_envelope.png" class="divide-env" alt="">
        <span v-show="divide_badgeCount" class="divide-dot">{{divide_badgeCount}}</span>
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
  import {
    userInfo
  } from 'os';
  export default {
    name: "app",
    data() {
      return {
        tempPic: require('./assets/image/divide_add_avatar.png'),
        divideList: [],
        isShowEnvelopHandle: true,
        // isShowDivideEnv: true, //控制分身信封显示
        isShowDivideList: false, //控制分身列表显示
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
        timeTick: null,
        appDeskCode: "",
        isDeskRoom: null,
        samedeskInfo: {},
        hasDivideIdentity: false,
        hasUserRole: false,
        flags: false,
        position: {
          x: 0,
          y: 0,
          left: 0,
          top: 0
        },
        top: 580,
        left: 0,
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
      };
    },
    computed: {
      ...mapState([
        "sameDeskInfo",
        "messageQueue",
        "topUpMessage",
        "userInfo",
        "friendPanelFlag",
        "inputValue",
        "dynamicFriendEvt",
        "messType",
        "topUpCommonInfo",
        "topUpThumbInfo",
        "topUpGameInfo",
        "allMutatualInfo",
        "soulFriInfo",
        "staticChatFriendObj",
        "shopSettingInfo",
        "divide_badgeCount",
        "deskCode"
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
    mounted() {
      let _GameUrl = window.location.href;
      let indexGame = _GameUrl.indexOf(".com");
      let shareurlGame = _GameUrl.slice(0, indexGame);
      this.responseForGameUrl = `${shareurlGame}.com/`;
      this.loadLastRoomInfo(); //加载回房信息
      this.loadIdentityList(); //拉取分身
      this.identity = sessionStorage.getItem("identity")
      this.identity = this.identity ? this.identity : ""
      this.timeTick = setTimeout(() => {
        this.clearTopUpData();
        this.allMutatualInfo_temp = {};
        this.isAlreadyFriend = false;
        var topUpGameInfo = {
          content: {
            fromInfo: {
              openid: "lakdjgjkfh",
              headimgurl: this.userInfo.sex == "男" ?
                this.defaultfemaletHeadUrl : this.defaultmaleHeadUrl,
              nickName: this.userInfo.sex == "男" ? "邻桌小妹" : "邻桌小哥"
            },
            extMsg: {
              combatID: "",
              headImgURL: "",
              inviterID: "",
              nickName: "",
              url: `${this.responseForGameUrl}game/?gamePath=game1?identity=${this.identity}`
            }
          },
          msgCode: 7
        };
        // this.addFriendEvtObj(topUpGameInfo)
        this.addMessageIntoQueue(topUpGameInfo);
      }, 20000);
      setInterval(() => {
        //轮训读取队列看是否有未处理消息
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
      // Bus.$on("hideEnvelop", (result) => {
      //   //console.log("隐藏信封------", result)
      // })
    },
    methods: {
      down(event) { // 拖动开始的操作
        this.$refs.move_div.classList.remove('kefu')
        this.$refs.move_div.classList.add('move_kefu')
        console.log(event)
        this.flags = true
        const refs = this.$refs.move_div.getBoundingClientRect()
        let touch = event
        if (event.touches) {
          touch = event.touches[0]
        }
        this.position.x = touch.clientX
        this.position.y = touch.clientY
        this.position.left = refs.left
        this.position.top = refs.top
      },
      move(event) { // 拖动中的操作
        if (this.flags) {
          let touch = event
          if (event.touches) {
            touch = event.touches[0]
          }
          const xPum = this.position.left + touch.clientX - this.position.x
          const yPum = this.position.top + touch.clientY - this.position.y
          console.log("yPum----", yPum)
          this.left = xPum
          this.top = yPum
          this.banOut()
          // 阻止页面的滑动默认事件
          document.addEventListener('touchmove', function() {
            event.preventDefault()
          }, {
            passive: false
          })
        }
      },
      end() { // 拖动结束的操作 move-kefu
        this.flags = false
        this.banOut()
      },
      banOut() { // 避免拖动出界的限制
        const refs = this.$refs.move_div.getBoundingClientRect()
        if (this.left < 0) {
          this.left = 0
        } else if (this.left > this.width - refs.width) {
          this.left = this.width - refs.width
        }
        if (this.top < 0) {
          this.top = 0
        } else if (this.top > this.height - refs.height) {
          this.top = this.height - refs.height
        }
      },
      // 临时方法 删除分身
      delDivide(targetId) {
        api.delIdentity(targetId).then(res => {
          console.log("删除结果-----", res)
        })
      },
      showDivideList() {
        this.isShowDivideList = true
        this.loadIdentityList()
      },
      getAllCommunityFriend() {
        var mySex = this.userInfo.sex == "男" ? 1 : 0;
        let params = {
          cursor: 0,
          sex: mySex,
          range: 0,
          sortType: 0
        };
        api.getFriendList(params).then(res => {
          //console.log("拉取候选人：·····················", res);
          this.getFriend(res);
        });
      },
      //拉取分身
      loadIdentityList() {
        var count = 0
        api.loadIdentityList().then(res => {
          console.log("分身res---", res)
          if (res.errorCode === 0) {
            // this.$nextTick(()=>{
            this.divideList = res.info
            this.divideList = this.divideList.filter((item, index) => {
              if (item.openid != this.userInfo.openid) {
                count += item.unreadMsgCount
                this.addDivideUnreadCount(count)
              }
              item.latesMsgTime = item.latesMsgTime ? util.timestampToTime(item.latesMsgTime) : 0
              return item.openid != this.userInfo.openid
            })
            // })
            console.log("拉取分身-------", this.divideList)
          } else {
            this.$vux.toast.show({
              text: res.errorMsg
            });
          }
        })
      },
      //切换分身
      switchToDivide(item) {
        this.identity = sessionStorage.getItem("identity")
        this.hasDivideIdentity = true;
        //console.log("identity--------", this.identity)
        if (!this.identity) {
          let data = {
            offlineOpenid: this.userInfo.openid
          }
          api.loginIdentity(data).then(res => {
            //console.log("分身下线", res)
          })
        } else {
          let data = {
            offlineOpenid: this.identity
          }
          api.loginIdentity(data).then(res => {
            //console.log("分身下线", res)
          })
        }
        this.loadIdentityList()
        sessionStorage.setItem("identity", item.openid)
        api.getUserInfo("/api/loadUserInfo").then(res => {
          this.getUserInfo(res);
          this._loadFriends(); //拉取好友
          this._loadMutualEvents(); //拉取送礼，约战，
          this.loadIdentityList();
          this.getAllCommunityFriend() //拉取候选人好友
          this.$vux.toast.show({
            text: "切换分身成功"
          });
          this.isShowDivideList = false
          setTimeout(() => {
            this.$router.push({
              path: "/message",
              query: {
                routeParamNum: 0
              }
            })
          }, 200);
          this.identity = sessionStorage.getItem("identity")
          //console.log("app-identity--", this.identity)
          let isMasterId = this.identity.indexOf("@master")
          this.identity = isMasterId > 0 ? this.identity : "" //是分身id才给赋值，不是则置为空
        })
      },
      confirm(userInfo) {
        console.log("userInfo------", userInfo)
        if (!this.userInfo.isSubscribe) {
          this.changeQrCodeText({
            title: "长按关注，以便查找、使用您的礼品券/优惠券",
            bottomText: "会员特权:领福利、交群友、参活动"
          });
          this.showQrcode(true);
        }
        let leftEnvelopInfo = {
          fromInfo: {
            nickname: userInfo.nickname,
            headimgurl: userInfo.headimgurl
          },
          extMsg: {
            lastMsg: {
              msg: `送你一张优惠券，已存入卡券包`
            }
          }
        }
        this.isShowEnvelopHandle = false
        this.changeEnvelopContent(leftEnvelopInfo)
        this.isShowGiftPanel = false;
        this.isShowGiftGuide = false;
      },
      gotoDetail() {
        if (!this.userInfo.isSubscribe) {
          this.changeQrCodeText({
            title: "长按关注，可以便捷使用或查询您的卡券",
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
        // //console.log('面板状态-----------', flag);
        this.isGiftPanel = flag;
      },
      inToLetter() {
        util.routerTo("message", this, {
          routeParamNum: 2 //路由参数2表示从店长信箱进入店长留言
        });
      },
      //拒绝回房
      rejectBacToGame() {
        if (this.isDeskRoom) {
          this.showBackToGame = false;
          return
        }
        api.enforceLeaveRoom().then(res => {
          //console.log("拒绝回房-----------", res);
        });
        this.showBackToGame = false;
      },
      goBackGame() {
        if (this.samedeskInfo.msgType == 25) {
          window.location.href = this.samedeskInfo.url
          return
        }
        window.location.href = `${this.responseForGameUrl}game/?gamePath=${this.gamePath}&roomID=${this.roomID}`;
      },
      //   //加载同桌信息
      // loadDeskRoomInfo() {
      //    //console.log("loadDeskRoomInfo---------");
      //   // var cacheRoomId = localStorage.getItem("backRoomId") || ""
      //   api.loadDeskRoomInfo(1).then(res => {
      //     //console.log("同桌信息--------", res);
      //     if (res.roomID) {
      //       this.roomID = res.roomID;
      //       this.gamePath = res.gamePath;
      //       if (this.roomID) {
      //         // localStorage.setItem("backRoomId", this.roomID)
      //         this.showBackToGame = true;
      //         this.tongzhuoFlag = true
      //       }
      //     }
      //   });
      // },
      //加载游戏回房信息
      loadLastRoomInfo() {
        api.loadLastRoomInfo(this.deskCode).then(res => {
          //console.log("回房信息--------", res);
          if (res.roomID) {
            this.roomID = res.roomID;
            this.gamePath = res.gamePath;
            if (this.roomID) {
              // localStorage.setItem("backRoomId", this.roomID)
              this.showBackToGame = true;
              this.isDeskRoom = res.isDeskRoom
            }
          }
        });
      },
      //加好友
      // onlineSendGift(e) {
      //   // //console.log(e.target.checked)
      //   this.isMakeFriendBool = e.target.checked;
      // },
      //贵宾打招呼
      sayHi() {
        this.setChatFriend(this.topUpCommonInfo.content.fromInfo);
        this.$router.push({
          // path: `/message/${this.topUpCommonInfo.content.fromInfo.openid}`
          name: "chat",
          params: {
            isClient: false,
            id: this.topUpCommonInfo.content.fromInfo.openid,
            isVip: true
          }
        });
        this.isShowGiftPanel = false;
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
                routeParamNum: 2
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
            // //console.log(this.dynamicFriendEvt.fromInfo.nickname);
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
                // //console.log(res);
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
      // rejectSoulFri() {
      //   this.isShowGiftPanel = false;
      //   this.clearTopUpData();
      // },
      //灵魂匹配接受
      acceptSoulFri(userInfo, flag) {
        this.isShowGiftPanel = false;
        api.acceptSoulFri(userInfo.openid, flag).then(res => {
          // if (res.errCode === 0) {
          this.isHandleMessageFromQueue = true;
          this.clearTopUpMessage();
          this.setChatFriend(userInfo);
          if (flag) {
            this.$router.push({
              name: "chat",
              params: {
                isSoul: true,
                id: this.staticChatFriendObj.openid
              }
            });
          }
          this.clearTopUpData();
          // }
        });
      },
      //回赞事件成为好友
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
          } else {
            this.$vux.toast.show({
              type: "text",
              text: `失败${res.errMsg}`,
              width: "12em"
            });
          }
        });
      },
      //未成为好友的送礼回复
      no_Become_Friend_respondForGift(giftInfo, flag) {
        //console.log("未成为好友的送礼回复----------------", giftInfo);
        let giftParam = {
          agree: flag, //是否接受
          recordID: giftInfo.extMsg.goodInfo.extInfo.recordID, //送礼记录ID
          fromID: giftInfo.fromInfo.openid, //赠送者
          respondType: giftInfo.extMsg.goodInfo.msgType, //记录的礼物类型  0是虚拟礼物、1是店长推荐和商城礼品
          isMakeFriend: this.isMakeFriendBool,
          isSysSendGift: false
        };
        api.respondForGift(giftParam).then(res => {
          //console.log("好友送礼回复结果---",res)
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
        //console.log("成为好友的送礼回复----------------", giftInfo);
        let giftParam = {
          agree: flag, //是否接受
          recordID: giftInfo.recordID, //送礼记录ID
          fromID: giftInfo.openid, //赠送者
          respondType: giftInfo.msgType, //记录的礼物类型  0是虚拟礼物、1是店长推荐和商城礼品
          isMakeFriend: this.isMakeFriendBool,
          // chatMsgID: giftInfo.isAlreadyFriends?giftInfo.id:""
          chatMsgID: Number(giftInfo.id),
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
          api.queueCombatReply(p, this.identity).then(res => {
            //console.log("队列邀请拒绝结果---", res);
          });
        }
        api.responseCombat(params).then(res => {
          if (res.errCode == 0) {
            //console.log("删除结果-----------", res);
          }
        });
        this.isShowGiftPanel = false;
        this._loadMutualEvents();
        // this.addFriendEvtObj({}) //清空推送内容
      },
      //未成为好友接受游戏
      no_Become_Friend_respondForGame(gameInfo) {
        this.isHandleMessageFromQueue = true;
        this.clearTopUpMessage();
        let params = {
          agree: true, //是否接受
          combatID: gameInfo.extMsg.gameInfo.combatID,
          fromID: gameInfo.fromInfo.openid
        };
        if (this.topUpGameInfo.msgCode == 24) { //队列邀请得
          let p = {
            agree: true,
            openID: gameInfo.fromInfo.openid
          };
          api.queueCombatReply(p, this.identity).then(res => {
            //console.log("队列邀请接受结果---", res);
          });
        }
        if (params.combatID) {
          //约战
          api.responseCombat(params).then(res => {
            //console.log(res);
            if (res.errCode == 0) {
              //console.log("删除结果-----------", res);
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
        //console.log("respondForGame_gameInfo-----------", game);
        var params = {};
        var gameUrl = "";
        if (this.topUpGameInfo.msgCode == 24) {
          let p = {
            agree: true,
            openID: game.openid
          };
          api.queueCombatReply(p, this.identity).then(res => { //
            //console.log("队列邀请接受结果---", res);
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
          //console.log(res);
          if (res.errCode == 0) {
            //console.log("删除结果-----------", res);
            // this.addFriendEvtObj({}) //清空推送内容
            window.location.href = gameUrl;
          }
        });
      },
      //拒绝游戏
      rejectForGame(gameInfo) {
        //console.log("rejectForGame_gameInfo0-----------", gameInfo);
        this.isHandleMessageFromQueue = true;
        this.clearTopUpMessage();
        var params = {};
        if (this.topUpGameInfo.msgCode == 24) {
          let p = {
            agree: true,
            openID: gameInfo.fromInfo.openid
          };
          api.queueCombatReply(p, this.identity).then(res => {
            //console.log("队列邀请拒接结果---", res);
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
          //console.log(res);
          if (res.errCode == 0) {
            this.isShowGiftPanel = false;
            // this.addFriendEvtObj({}) //清空推送内容
            //console.log("删除结果-----------", res);
          }
        });
        this._loadMutualEvents();
      },
      //拉取约战、点赞、送礼列表
      _loadMutualEvents() {
        api.loadMutualEvents().then(res => {
          console.log("拉取约战、点赞、送礼列表---", res)
          if (res.errCode === 0) {
            let mutualEventsObj = res.mutualEvents;
            let mutualEventsList = [];
            mutualEventsList = mutualEventsList.concat(
              mutualEventsObj.combatsEvents === null ? [] : mutualEventsObj.combatsEvents
            );
            mutualEventsList = mutualEventsList.concat(
              mutualEventsObj.giftEvents === null ? [] : mutualEventsObj.giftEvents
            );
            mutualEventsList = mutualEventsList.concat(
              mutualEventsObj.friendEvents === null ? [] : mutualEventsObj.friendEvents
            );
            console.log("mutualEventsList.length---", mutualEventsList.length)
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
        clearTopUpData: "CLEARTOPUPDATA",
        addDivideUnreadCount: "ADDDIVIDEUNREADMSG", //累计分身未读消息
        getFriend: "GET_FRIENDlIST", //获取候选人,
        changeEnvelopContent: "CHANGEENVELOPECONTENT", //更改左侧弹框内容
      }),
      ...mapActions({
        getAlreadyFriendList: "get_alreadyFriendList" //加载已经成为好友列表
      })
    },
    watch: {
      userInfo: function(newValue) {
        console.log("userInfo-watch-", newValue)
        this.hasUserRole = (newValue.role != '' || newValue.openid.indexOf("@master") > -1)
      },
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
          //如果待通知用户列表里面没有当前上线用户，则把当前上线用户push进待通知用户列表,并记录当前上线时间
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
            let isMore300s = new Date().getTime() - notifyUser[0].loginTime > 300000;
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
        console.log("this.isThrottle----", this.isThrottle)
        console.log("this.isShowEnvelop----", this.isShowEnvelop)
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
            contentStruct.chatExtMsg.extMsg.name : "",
          isAlreadyFriends: fromImfo.isAlreadyFriends,
          limit: contentStruct.chatExtMsg.extMsg.limit ?
            contentStruct.chatExtMsg.extMsg.limit : "",
          image: contentStruct.chatExtMsg.extMsg.image ?
            contentStruct.chatExtMsg.extMsg.image : "",
          msgType: contentStruct.chatExtMsg.msgType,
          isHandled: contentStruct.chatExtMsg.isHandled,
          couponID: contentStruct.chatExtMsg.extMsg.couponID ?
            contentStruct.chatExtMsg.extMsg.couponID : "",
          integral: contentStruct.chatExtMsg.extMsg.integral ?
            contentStruct.chatExtMsg.extMsg.integral : "",
          recordID: contentStruct.chatExtMsg.extMsg.recordID ?
            contentStruct.chatExtMsg.extMsg.recordID : "",
          subtopic: contentStruct.chatExtMsg.extMsg.subtopic ?
            contentStruct.chatExtMsg.extMsg.subtopic : "",
          money: contentStruct.chatExtMsg.extMsg.money ?
            contentStruct.chatExtMsg.extMsg.money : "",
          combatID: contentStruct.chatExtMsg.extMsg.combatID ?
            contentStruct.chatExtMsg.extMsg.combatID : "",
          headImgURL: contentStruct.chatExtMsg.extMsg.headImgURL ?
            contentStruct.chatExtMsg.extMsg.headImgURL : "",
          inviterID: contentStruct.chatExtMsg.extMsg.inviterID ?
            contentStruct.chatExtMsg.extMsg.inviterID : "",
          // nickName:contentStruct.chatExtMsg.extMsg.nickName?contentStruct.chatExtMsg.extMsg.nickName:"",
          url: contentStruct.chatExtMsg.extMsg.url ?
            contentStruct.chatExtMsg.extMsg.url : ""
        };
        // //console.log("allMutatualInfo---------------------", this.allMutatualInfo_temp);
        if (this.allMutatualInfo_temp.type == 3) {
          this.giftFlag = true;
          this.gameFlag = false;
        } else if (this.allMutatualInfo_temp.type == 4) {
          this.giftFlag = false;
          this.gameFlag = true;
        }
      },
      topUpCommonInfo: function(newValue) {
        clearTimeout(this.timeTick);
        if (!newValue.msgCode) {
          return;
        }
        console.log("topUpCommonInfo----------", newValue);
        this.judgeEveryBool(true, false, true, false);
        if(newValue.msgCode===29){
          return
        }
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
        // //console.log('送的礼物----------', newValue);
      },
      topUpThumbInfo: function(newValue) {
        clearTimeout(this.timeTick);
        if (!newValue.msgCode) {
          return;
        }
        //console.log("topUpThumbInfo-------------", newValue);
        this.judgeEveryBool(true, false, false, true);
      },
      soulFriInfo: function(newValue) {
        console.log("soulFriInfo----", newValue)
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
        //console.log("topUpGameInfo-------------", newValue);
        this.judgeEveryBool(true, true, false, false);
      },
      sameDeskInfo: function(newValue, oldValue) {
        this.samedeskInfo = newValue
        this.showBackToGame = true
        this.isDeskRoom = true
        //console.log("this.samedeskInfo-----", this.samedeskInfo)
      },
      //监听客服图标变动
      showClientServiceIconFlag: function(newValue) {
        console.log("newValue----", newValue)
        if (newValue) {
          this.$nextTick(() => {
            this.$refs.move_div.classList.remove('kefu')
            this.$refs.move_div.classList.add('move_kefu')
          })
        }
      },
      $route: function(newValue, oldValue) {
        //隐藏导航.控制信封和客服图标显示
        console.log("$route---", newValue)
        if (
          newValue.name == "home" ||
          newValue.name == "friend" ||
          newValue.name == "message" ||
          newValue.name == "welfare" ||
          newValue.name == "mine" ||
          newValue.name === "gameRank"
        ) {
          this.tabFlag = true;
          this.hasDivideIdentity = true
          this.showClientServiceIconFlag = true;
        } else {
          this.tabFlag = false;
          this.hasDivideIdentity = false
          this.showClientServiceIconFlag = false;
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
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }
  .backToGame_wrapper {
    width: 9rem;
    height: 4.6933rem;
    background-image: url("./assets/image/envelop_handle.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: fixed;
    z-index: 9999;
    top: 5rem;
    left: 50%;
    transform: translateX(-4.5rem);
    padding: 0 0.2667rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
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
      margin-bottom: .55rem;
      padding: 0 0.15rem;
      position: relative;
      .reject_btn,
      .back_btn {
        border: 1px solid #C62F3B;
        font-weight: 800;
        color: #C62F3B;
        font-size: 0.35rem;
        box-sizing: border-box;
      }
      .reject_btn {
        width: 0.8rem;
        text-align: center;
        position: relative;
        background-color: #fff;
      }
      .back_btn {
        border: none;
        color: #fff;
        padding: 0rem;
        position: absolute;
        right: .3rem;
        bottom: .1rem;
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
    display: inline-block;
    margin: 0 auto;
    width: 10rem;
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
    .topUpCommonInfo-wrapper {
      width: 9rem; // height: 4rem;
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
      .topUpCommonInfo-top {
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
      .topUpCommonInfo-middle {
        .partition_zone {
          display: flex;
          margin-top: 0.1333rem;
          .topUpCommonInfo_left {
            .giftImg {
              margin-left: 1.5rem;
              margin-right: 0.9333rem;
              width: 2.2rem;
              height: 1.7rem;
            }
          }
          .topUpCommonInfo_right {
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
      .topUpCommonInfo-bottom {
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
        .acceptBtn {
          position: absolute;
          right: 0.15rem;
          border-radius: 0.1rem;
          bottom: -0.4rem;
          box-sizing: border-box; // letter-spacing: 0.08rem;
          font-weight: 800;
          color: #fff;
          padding: 0.1333rem 0.4rem;
          font-size: 0.35rem; // background: -webkit-linear-gradient(top, #fedc00, #e39300);
        }
        .rejectBtn {
          font-weight: 800;
          position: absolute;
          bottom: -0.35rem;
          left: 0.4rem;
          text-align: center;
          font-size: 0.35rem;
          padding: 0rem;
          border: 1px solid rgb(156, 13, 13);
          background-color: #fff;
          color: rgb(156, 13, 13);
          width: 0.8rem;
          height: .45rem;
          line-height: .45rem;
          box-sizing: border-box;
          display: inline-block;
        }
      }
    }
    .kefu {
      position: fixed;
      right: 4px;
      animation: jump 1500ms linear 500ms infinite normal;
      text-align: center;
      @keyframes jump {
        10% {
          top: 580px;
        }
        50% {
          top: 575px;
        }
        100% {
          top: 580px;
        }
      }
      .pic_kefu {
        width: 1rem;
        height: 1rem;
      }
      .kefu-text {
        color: #317AB1;
        width: 100%;
        text-align: center;
      }
    }
    .move_kefu {
      position: fixed;
      right: 4px; // animation: jump 1500ms linear 500ms infinite normal;
      text-align: center;
      .pic_kefu {
        width: 1rem;
        height: 1rem;
      }
      .kefu-text {
        color: #317AB1;
        width: 100%;
        text-align: center;
      }
    }
    .divide-topUp {
      position: fixed;
      z-index: 11;
      top: 42%;
      left: 50%;
      margin-left: -3.3rem;
      width: 6.6rem;
      height: 11.6rem;
      margin-top: -5.8rem;
      .bg {
        position: fixed;
        background-color: rgba(0, 0, 0, .2);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
      }
      background-image: url("./assets/image/divide_bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .divide-title {
        height: 1.3rem;
        line-height: 1.3rem;
        position: relative;
        text-align: center;
        .divide-icon {
          width: 0.8rem;
          vertical-align: middle;
        }
        .divide-titleText {
          font-size: 14px;
          font-weight: 800;
          color: #fff;
          padding-top: .2rem;
        }
        .divide-close {
          position: absolute;
          top: .2rem;
          right: .2rem;
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          padding: 4px;
        }
      }
      .divide-list {
        padding: 0 0.2333rem;
        .divide-item {
          margin: 0 auto;
          margin-bottom: .1rem;
          width: 95%;
          height: 1rem;
          line-height: 1rem;
          background-color: #fff;
          display: flex;
          justify-content: space-between;
          border-radius: 4px;
          position: relative;
          .avatar-dot {
            position: absolute;
            top: 0.1rem;
            left: .7rem;
            width: .3rem;
            height: .3rem;
            border-radius: 50%;
            background-color: red;
          }
          .divide-avatar {
            width: .7rem;
            height: .7rem;
            border-radius: 50%;
            margin-top: .15rem;
            margin-left: .2rem;
            margin-right: .2rem;
          }
          .divide-name {
            font-size: 12px;
            color: #333;
            width: 2rem;
            margin-left: -.7rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis
          }
          .divide-time {
            font-size: 10px;
            color: #333;
          }
          .divide-arrow {
            width: .6rem;
            height: .6rem;
            border-radius: 50%;
            margin-top: .2rem;
            margin-right: .2rem
          }
        }
      }
    }
    .divide_wrapper {
      position: fixed;
      top: 35%;
      right: .2rem;
      z-index: 9;
      animation: jump2 1500ms linear 500ms infinite normal;
      @keyframes jump2 {
        10% {
          top: 35%;
        }
        50% {
          top: 34%;
        }
        100% {
          top: 35%;
        }
      }
      .divide-env {
        width: 1.4rem;
        height: 1rem;
      }
      .divide-dot {
        position: absolute;
        top: 0rem;
        right: 0rem;
        width: 0.5rem;
        height: .5rem;
        text-align: center;
        line-height: .5rem;
        border-radius: 50%;
        background-color: red;
        color: #fff;
      }
    }
  }
  .bottom_wrapper {
    display: inline-block;
    margin: 0 auto;
    height: 1.18rem;
    width: 10rem;
    position: relative;
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
