<template>
  <transition name="fade">
    <div id="chat" class="chatRoom">
      <div class="bg" v-show="isShowAccount">
        <div class="account_statement_wrapper" v-show="isShowAccount">
          <img class="close" src="../../assets/image/close-round.png" onclick="return false" @click="closeMoneyBg" alt="">
          <input type="number" placeholder="请输入消费金额" class="preMoney" v-model="preMoney">
          <input type="number" placeholder="请输入实际金额" class="actMoney" v-model="actMoney">
          <button class="account_btn" @click.stop="sendAccountStateMent">确定</button>
        </div>
      </div>
      <div class="chat_nav">
        <div class="back_box">
          <img onclick="return false" src="../../assets/image/back_chat.png" alt="" class="back_arrow" @click="goBack">
        </div>
        <div class="name">
          <div class="sex_box">
            <img v-if="staticChatFriendObj.sex===2" src="../../assets/image/female.png" alt="">
            <img v-else src="../../assets/image/male.png" alt="">
          </div>
          <span>{{staticChatFriendObj.nickname?staticChatFriendObj.nickname:"收银员"}}</span>
          <!-- <div class="online_status">
                      <img src="../../assets/image/dot_green.png" v-if="staticChatFriendObj.onlineDiceServer || staticChatFriendObj.onlineL98Server" class="online_dot">
                      <span v-if="staticChatFriendObj.onlineDiceServer || staticChatFriendObj.onlineL98Server" class="friendStatus">{{staticChatFriendObj.isInDoor?"店内":"店外"}}</span>
                      <span v-if="staticChatFriendObj.deskCode && (staticChatFriendObj.onlineDiceServer || staticChatFriendObj.onlineL98Server)" class="roomNum">{{`${staticChatFriendObj.deskCode}`}}</span>
                    </div> -->
        </div>
        <div class="backHome_box">
          <img onclick="return false" src="../../assets/image/chat_home.png" alt="" class="home" @click="goHome">
        </div>
      </div>
      <div class="chat_wrapper" ref="chatWrapper" @click="tagScroll">
        <div class="preview_pic" v-show="showPreview" ref="preview_pic" @click="closePreview"></div>
        <scroll ref="listView" class="chat_content" :scrollHeight="scrollHeight" :data="componentChatList" :listen-scroll="listenScroll" :pullDownRefresh="pullDownRefresh" @getIndex="getIndex" @scroll="myscroll" @pullingDown="pullingDown">
          <ul class="chat_list" ref="chatList">
            <li class="clearfix chatListItem" ref="item" :class="{'friend':item.friend,'mine':!item.friend}" :key="index" v-for="(item,index) in componentChatList">
              <div v-if="item.type===1" class="message_wrapper">
                <div class="person_box">
                  <h2 class="name">{{item.time.slice(8,10)==today?item.time.slice(11):item.time.slice(5,10)}}</h2>
                  <!-- <h2 class="name">{{item.time}}</h2> -->
                  <img onclick="return false" :src="staticChatFriendObj.headimgurl?staticChatFriendObj.headimgurl:cashierImg" alt="" class="avatar" v-if="item.friend">
                  <img onclick="return false" :src="userInfo.headimgurl?userInfo.headimgurl:cashierImg" alt="" class="avatar" v-else>
                </div>
                <div class="message_box">
                  <span v-show="item.type===1" class="arrow"></span>
                  <p class="message" style="word-break: break-all;" v-if="item.type===1" v-html="item.message"></p>
                </div>
              </div>
              <div v-if="item.type===4" class="message_wrapper">
                <div class="person_box">
                  <h2 class="name">{{item.time.slice(8,10)==today?item.time.slice(11):item.time.slice(5,10)}}</h2>
                  <!-- <h2 class="name">{{item.time}}</h2> -->
                  <img onclick="return false" :src="staticChatFriendObj.headimgurl?staticChatFriendObj.headimgurl:cashierImg" alt="" class="avatar" v-if="item.friend">
                  <img onclick="return false" :src="userInfo.headimgurl?userInfo.headimgurl:cashierImg" alt="" class="avatar" v-else>
                </div>
                <div class="message_box">
                  <span class="arrow"></span>
                  <p class="message" style="word-break: break-all;"><span style="color:red;font-size:18px;">我的台/房号:{{item.deskcode}},</span>申请买单</p>
                </div>
              </div>
              <div v-else-if="item.type===2" class="message_wrapper">
                <div class="person_box">
                  <h2 class="name">{{item.time.slice(8,10)==today?item.time.slice(11):item.time.slice(5,10)}}</h2>
                  <img :src="staticChatFriendObj.headimgurl?staticChatFriendObj.headimgurl:cashierImg" alt="" class="avatar" v-if="item.friend">
                  <img :src="userInfo.headimgurl" alt="" class="avatar" v-else>
                </div>
                <div class="message_box" v-viewer>
                  <span v-show="item.type===2" class="arrow" style="background:none"></span>
                  <img :src="item.message" @load="onImgLoaded" alt="" class="messRecordPic" ref="picture">
                </div>
              </div>
              <div v-else-if="item.type===3" class="message_wrapper cashier_wrapper">
                <div>
                  <div class="person_box">
                    <h2 class="name">{{item.time.slice(8,10)==today?item.time.slice(11):item.time.slice(5,10)}}</h2>
                    <img :src="staticChatFriendObj.headimgurl?staticChatFriendObj.headimgurl:cashierImg" alt="" class="avatar" v-if="item.friend">
                    <img :src="userInfo.headimgurl" alt="" class="avatar" v-else>
                  </div>
                  <div class="message_box">
                    <span v-show="item.type===3" class="arrow" style="background:none"></span>
                    <p class="message" style="word-break: break-all;">
                      <span style="color:red;font-size:18px">台/房号:{{item.selfpayinfo?item.selfpayinfo.deskcode:deskCode}}</span>，申请用如下卡券买单
                    </p>
                  </div>
                </div>
                <div style="margin-top:8px;" v-if="item.userCouponInfo" class="couponInfo" :class="{'vipmbg':item.userCouponInfo.coupon.type=='月卡券','viptbg':item.userCouponInfo.coupon.type=='次卡券' }">
                  <div class="myleft">
                    <p class="discount_type_text">{{item.userCouponInfo.coupon.type}}</p>
                    <p class="yuE" v-show="item.userCouponInfo.usingTimes>0">剩{{item.userCouponInfo.usingTimes}}次</p>
                  </div>
                  <div class="mycenter" style="color:#FDDC69" v-show="item.userCouponInfo.coupon.type=='月卡券' ||item.userCouponInfo.coupon.type=='次卡券'">
                    <div class="discount_theme clearfix">
                      <div class="theme">{{item.userCouponInfo.coupon.theme?item.userCouponInfo.coupon.theme:"新人礼包"}}</div>
                      <div class="receiver_wrapper" v-if="item.userCouponInfo.coupon.senderHeadImage">
                        <img onclick="return false" :src="item.userCouponInfo.coupon.senderHeadImage" alt="" class="receiver_avartar">
                        <span class="receiver_name">{{item.userCouponInfo.coupon.senderName}}</span>
                        <span>送</span>
                      </div>
                      <div class="receiverProject_wrapper">
                        <div class="integral_content">{{item.userCouponInfo.coupon.codeNum}}</div>
                        <img onclick="return false" v-if="item.userCouponInfo.coupon.image" :src="item.userCouponInfo.coupon.image" class="project_img">
                      </div>
                    </div>
                    <div class="discount_content">
                      {{item.userCouponInfo.coupon.name}}
                      <span v-if="item.userCouponInfo.usingTimes != 0" style="font-size:12px">(会员特权)</span>
                    </div>
                    <div class="discount_limitAndTime">
                      <div class="limit">积分:{{item.userCouponInfo.coupon.integral}} &nbsp;&nbsp;&nbsp;{{item.userCouponInfo.coupon.limit}}</div>
                      <p class="time">{{item.userCouponInfo.coupon.startTime}}至{{item.userCouponInfo.coupon.endTime}}</p>
                    </div>
                  </div>
                  <div class="mycenter" v-show="item.userCouponInfo.coupon.type!='月卡券' && item.userCouponInfo.coupon.type!='次卡券'">
                    <div class="discount_theme clearfix">
                      <div class="theme">{{item.userCouponInfo.coupon.theme?item.userCouponInfo.coupon.theme:"新人礼包"}}</div>
                      <div class="receiver_wrapper" v-if="item.userCouponInfo.coupon.senderHeadImage">
                        <img onclick="return false" :src="item.userCouponInfo.coupon.senderHeadImage" alt="" class="receiver_avartar">
                        <span class="receiver_name">{{item.userCouponInfo.coupon.senderName}}</span>
                        <span>送</span>
                      </div>
                      <div class="receiverProject_wrapper">
                        <div class="integral_content">{{item.userCouponInfo.coupon.codeNum}}</div>
                        <img onclick="return false" v-if="item.userCouponInfo.coupon.image" :src="item.userCouponInfo.coupon.image" class="project_img">
                      </div>
                    </div>
                    <div class="discount_content">
                      {{item.userCouponInfo.coupon.name}}
                      <span v-if="item.userCouponInfo.usingTimes != 0">--剩余{{item.usingTimes}}次</span>
                    </div>
                    <div class="discount_limitAndTime">
                      <div class="limit">积分:{{item.userCouponInfo.coupon.integral}} &nbsp;&nbsp;&nbsp;{{item.userCouponInfo.coupon.limit}}</div>
                      <p class="time">{{item.userCouponInfo.coupon.startTime}}至{{item.userCouponInfo.coupon.endTime}}</p>
                    </div>
                  </div>
                  <div class="myright">
                    <div v-if="isCashierFlag">
                      <button v-if="!item.isHandle" class="reject" @click="check(item,false)">拒绝</button>
                      <button v-if="!item.isHandle" class="agree" @click="check(item,true)">同意</button>
                      <p class="result" v-if="item.isHandle">核销人</p>
                      <p class="result-people" style="color:red" v-if="item.isHandle">{{item.checkPeople?item.checkPeople:userInfo.nickname}}</p>
                    </div>
                    <div v-else>
                      <p v-if="!item.isHandle" class="auditing">待审核</p>
                      <p v-else class="auditing">已审核</p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="item.type===5" class="account_statement">
                <div class="account_wrapper">
                  <div class="account_line">
                    <article class="line-title">台/房号：</article>
                    <span class="deskCode">{{item.selfpayinfo.deskcode}}</span>
                    <span class="date">{{item.payTime}}</span>
                  </div>
                  <div class="account_line">
                    <article class="line-title">消费金额：</article>
                    <span class="money">{{item.selfpayinfo.consumeamount}}元</span>
                  </div>
                  <div class="account_line">
                    <article class="line-title">卡券名称：</article>
                    <span class="cardname">{{item.selfpayinfo.usercouponname?item.selfpayinfo.usercouponname:"无"}}</span>
                  </div>
                  <div class="account_line">
                    <article class="line-title">实收金额：</article>
                    <span class="realMoney">{{item.selfpayinfo.payamount}}元</span>
                  </div>
                  <div class="account_remar">
                    <article class="line-title">自助买单须知：</article>
                    <p class="p1">
                      1.点最下栏
                      <span class="receiveBtn">收款码</span>输入实收金额买单
                    </p>
                    <p class="p2">
                      2.支付后,点最下栏
                      <span class="payBtn">已付款</span>通知收银查收
                    </p>
                  </div>
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
            <img src="../../assets/image/plane.png" alt="" class="icon_plane fl">
            <span class="send fl" ref="send">发送</span>
          </div>
        </div>
        <div class="select_area">
          <ul class="selectList clearfix">
            <li class="item fl">
              <img onclick="return false" src="../../assets/image/chat_emotion.png" alt="" @click="show_emotion">
            </li>
            <li class="item fl">
              <img onclick="return false" src="../../assets/image/message_chat.png" alt="" @click="show_expression">
            </li>
            <li class="item fl">
              <img onclick="return false" src="../../assets/image/chat_pic.png" alt="">
              <input type="file" class="file" accept="image/*" @change="uploadImage">
            </li>
            <li class="item fl" style="padding:0" v-if="isCashierFlag"  @click="sendStaffCouponToUser">
              <img style="width:100%;height:100%" onclick="return false" src="../../assets/image/quan-icon.jpg" alt>
            </li>
            <li class="fl">
              <button v-if="isCashierFlag" class="cashier-l" @click="showAccountStateMent">对账单</button>
              <button v-else class="cashier-l" @click="showCheckQrCode">收款码</button>
            </li>
            <li class="fl">
              <button v-if="isCashierFlag" class="cashier-r" @click="sendAlreadyGetMoney">已收款</button>
              <button v-else class="cashier-r" @click="sendAlreayPayMoney">已付款</button>
            </li>
          </ul>
        </div>
        <div class="emotion_area" v-if="emotionShow">
          <swiper :auto="false" height="130px" :show-dots="false">
            <swiper-item class="black">
              <grid :show-vertical-dividers="true" :cols="8">
                <div @click="selectEmtion(item.name)" :key="index" v-for="(item,index) in emotionList" class="vux-center-h" style="box-sizing:border-box;display:inline-block;padding:0.2rem 0.2rem">
                  <img onclick="return false" :src="item.num" alt="">
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
      <qrCode v-show="qrIsShow" :isCheckQrCode="isCheckQrCode"></qrCode>
      <!-- <keep-alive> -->
        <topUp
            v-show="isShowChangeTimePanel"
            @closeIntegralPanel="closeSchedule"
            @noMove="noMove"
            @changeCashierTime = "changeCashierTime"
            :fatherPanelIndex="fatherPanelIndex"
        ></topUp>
      <!-- </keep-alive> -->
    </div>
  </transition>
</template>

<script type='text/ecmascript-6'>
  // import envelope from 'base/envelope/envelope';
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
    Popup
  } from "vux";
  import Scroll from "../../base/scroll/scroll.vue";
  import Url from "../../common/config.js";
  import api from "common/api.js";
  import util from "common/util.js";
  import Bus from "common/bus.js";
  // import EXIF from "common/exif.js";
  import {
    mapState,
    mapMutations,
    mapGetters
  } from "vuex";
  import lrz from "lrz";
  import {
    async
  } from "q";
  export default {
    directives: {
      TransferDom,
      focus: function(el) {
        el.focus();
      }
    },
    data() {
      return {
        isShowChangeTimePanel:false,//显示是否修改交班时间
        isCheckQrCode:true,
        isShowAccount: false,
        preMoney: "",
        actMoney: "",
        cashierImg: require("../../assets/image/cashierIcon.png"),
        isCashierFlag: false,
        sendingTimes: 0,
        isShowEnvelope: false, //信封弹框判断
        envelopeText: "", //信封弹框内容
        showPreview: false,
        scrollHeight: 500,
        pullDownRefresh: true,
        expressionShow: false,
        fatherPanelIndex: 1,
        isGiftPanel: false,
        expressionList: [],
        show: false,
        showTab: true,
        emotionShow: false,
        actionShow: false,
        flag: false,
        input_value: "",
        autofocus: false,
        emotionList: [{
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
          }
        ],
        chatListIndex: 0,
        componentChatList: [],
        isscroll: true,
        cashierEndCursor: 0,
        isLoadMore: false,
        isOpenAutoPay: false, // 是否开通自助买单
        fatherPanelIndex:6,//
        lastestSelfPayInfo:{}
      };
    },
    // beforeRouteLeave(to, from, next) {
    //   // 导航离开该组件的对应路由时调用
    //   // 可以访问组件实例 `this`
    //   // this.isCheckQrCode = false
    //   // if (!this.userInfo.isSubscribe) {
    //   //   this.changeQrCodeText({
    //   //     title: "长按关注，方便收到店家留言",
    //   //     bottomText: "会员特权:领福利、交群友、参活动"
    //   //   });
    //   //   this.showQrcode(true);
    //   // }
    //   // next()
    // },
    created() {
      util.addVisitRecord(this.$route.name)
      this.listenScroll = true;
      this.today = new Date().getDate();
      this.today = new Date().getDate();
      if (this.today < 10) {
        this.today = "0" + this.today;
      } else {
        this.today = this.today.toString();
      }
      document.body.addEventListener("focusout", () => {
        //软键盘关闭事件
        window.scrollTo(0, 0); //解决ios键盘留白的bug
      });
    },
    activated() {
      if (!(JSON.stringify(this.$route.query) === "{}")) {
        this.setChatFriend(this.$route.query.info);
      }
      this.loadCashierChatList(); //获取客服聊天记录
      this.isCashierFlag = this.$route.params.isCashier;
      if (this.isCashierFlag) {
        this.getNewestSelfPay()
        this.expressionList = [
          "收到您的消息，请稍候！",
          "客官，有啥吩咐？",
          "欢迎下次光临",
        ];
      } else {
        this.expressionList = [
          "结账啦",
          "谢谢小二哥啦!"
        ];
      }
    },
    deactivated() {
      this.setChatFriend({}); //清除vuex里面保存的聊天好友对象
      this.cashierEndCursor = 0;
      this.componentChatList = [];
      let cursor = 0;
      this.changeCursor(cursor);
    },
    computed: {
      ...mapState([
        "userInfo",
        "staticChatFriendObj",
        "cashierLastChatMsg",
        "inputValue",
        "socket",
        "alreadyFriendListcursor",
        "giftList",
        "staffCouponInfo",
        "qrCodeTextObj",
        "deskId",
        "deskCode",
        "l98Setting"
      ]),
      ...mapGetters(["qrIsShow"])
    },
    methods: {
      //监听修改时间面板状态
        closeIntegralPanel(flag) {
          this.isShowChangeTimePanel = flag;
      },
      async noMove(flag){
         this.isShowChangeTimePanel = flag;
          let res = await api.confirmSelfPay(this.lastestSelfPayInfo);
          this.input_value = "您的买单款已到帐，欢迎下次光临";
          this.send();
      },
      //前移账单时间
      async changeCashierTime(flag){
        var todayYear
        var todayMon
        var todayDate
        var srcTimeStampStr
        todayYear = new Date().getFullYear()
        todayMon = new Date().getMonth()+1
        todayDate = new Date().getDate()
        srcTimeStampStr = todayYear+"-"+todayMon+"-"+todayDate+" "+ this.fontTime
        console.log("前移账单时间---",srcTimeStampStr)
        this.lastestSelfPayInfo['time'] = new Date(srcTimeStampStr).getTime()/1000
        console.log("this.lastestSelfPayInfo",this.lastestSelfPayInfo)
        console.log("this.lastestSelfPayInfo.time",this.lastestSelfPayInfo.time)
        let res = await api.confirmSelfPay(this.lastestSelfPayInfo)
        this.input_value = "您的买单款已到帐，欢迎下次光临";
        this.send();
        this.isShowChangeTimePanel = false
      },
      getNewestSelfPay(){
        api.getNewestSelfPay(this.staticChatFriendObj.openid).then(res=>{
          console.log("最新的自助买单信息",res)
          if(res.errCode===0){
            this.lastestSelfPayInfo = res.info.selfPayInfo
            this.lastestSelfPayInfo.payeephone = this.userInfo.phone
            this.scheduleShifts = res.info.shift?res.info.shift:null
          }
        })
      },
      //员工送券
      sendStaffCouponToUser() {
        let ToId = this.staticChatFriendObj.openid ? this.staticChatFriendObj.openid : sessionStorage.getItem("staffCouponToId")
        console.log("ToId-----", ToId)
        let data = {
          to: ToId,
          from: this.userInfo.openid,
          CouponId: this.staffCouponInfo.couponId
        }
        api.sendStaffCouponToUser(data).then(res => {
          if(res.errCode===0){
             this.$vux.toast.text("赠送成功", "middle");
          }
        })
      },
      //收银员已收款确认
      async sendAlreadyGetMoney() {
        this.lastestSelfPayInfo.payusername = this.staticChatFriendObj.nickname
        if(!sessionStorage.getItem(this.staticChatFriendObj.openid+this.lastestSelfPayInfo.id)){
          sessionStorage.setItem(this.staticChatFriendObj.openid+this.lastestSelfPayInfo.id,this.lastestSelfPayInfo.id)
        }else{
          this.$vux.toast.text("请勿重复确认", "middle");
          return
        }
        if(this.scheduleShifts){
        console.log("this.scheduleShifts---",this.scheduleShifts)
          for (let i = 0; i < this.scheduleShifts.shiftes.length; i++) {
            let shifte = this.scheduleShifts.shiftes[i];
            //1判断当前时间是否在交班期间，延后5分钟交班，如果在交班期间，则弹窗修改时间
             this.delayTime = this.addMin(shifte.endTime)
             console.log("this.delayTime--",this.delayTime)
            if(this.isDuringTime(shifte.endTime,this.delayTime,0)){ 
               this.fontTime = shifte.endTime
               this.isShowChangeTimePanel = true
               this.fatherPanelIndex = 5
               return
            }
          }
        }
        this.lastestSelfPayInfo.time = parseInt(new Date().getTime()/1000)
        console.log("收银员已收款确认---", this.lastestSelfPayInfo)
        let res = await api.confirmSelfPay(this.lastestSelfPayInfo);
        this.input_value = "您的买单款已到帐，欢迎下次光临";
        this.send();
      },
      //时间增加5分钟
      addMin(srcTime,sec=300){
        var todayYear
        var todayMon
        var todayDate
        var srcTimeStamp
        todayYear = new Date().getFullYear()
        todayMon = new Date().getMonth()+1
        todayDate = new Date().getDate()
        srcTime = todayYear+"-"+todayMon+"-"+todayDate+" "+ srcTime
        srcTimeStamp = new Date(srcTime).getTime()+sec*1000
        return new Date(srcTimeStamp).getHours() + ":" + (new Date(srcTimeStamp).getMinutes() > 10 ? new Date(srcTimeStamp).getMinutes() : "0" + new Date(srcTimeStamp).getMinutes()) +
            ":" + (new Date(srcTimeStamp).getSeconds() > 10 ? new Date(srcTimeStamp).getSeconds() : "0" + new Date(srcTimeStamp).getSeconds())
      },
      //判断当前时间是否在某一时间段
      isDuringTime(beginTime,endTime,isNextDay){
        var dealBeginTime  //处理后的开始时间
        var dealEndTime    //处理后的结束时间
        var todayTimeStamp
        var todayTime
        var todayYear
        var todayMon
        var todayDate
        var tomorrowTimeStamp
        todayYear = new Date().getFullYear()
        todayMon = new Date().getMonth()+1
        todayDate = new Date().getDate()
        if(isNextDay===1){
          let today0Time = new Date().setHours(0,0,0) //设置当天凌晨零时零分
          tomorrowTimeStamp = today0Time + 86400000   //设置第二天零点零分
          tomorrowYear = new Date(tomorrowTimeStamp).getFullYear()
          tomorrowMonth = new Date(tomorrowTimeStamp).getMonth()+1
          tomorrowDate = new Date(tomorrowTimeStamp).getDate()
          dealEndTime = tomorrowYear+"-"+tomorrowMonth+"-"+tomorrowDate+" "+ endTime
        }else{
          dealEndTime = todayYear+"-"+todayMon+"-"+todayDate+" "+ endTime
        }
        dealBeginTime = todayYear+"-"+todayMon+"-"+todayDate+" "+ beginTime
        if (new Date().getTime() >= new Date(dealBeginTime) && new Date().getTime() <= new Date(dealEndTime)) {
            return true
        } else {
            return false
        }
      },
      //用户已付款
      async sendAlreayPayMoney() {
        console.log("用户已付款----账单id", this.lastestSelfPayInfo)
        // let data = {
        //   id: this.lastestSelfPayInfo.id
        // };
        // let res = await api.paymentSelfPay(data);
        //console.log("顾客付款结果---", res);
        this.input_value = `<span style="color:red;font-size:18px">台/房号：${this.lastestSelfPayInfo.deskcode}，</span>已付款，请查收`;
        this.send();
        if (this.deskId && this.l98Setting.staffCommentOpen) {
          api.loadDeskHolder(this.deskId).then(res => {
            console.log("加载台/桌的绑定员工--", res)
            if (res.info.holderID) {
              this.$router.push({
                path: `/comment/${res.info.holderID}`,
                query: {
                  phone: res.info.holderID
                }
              })
            }
          })
        }
      },
      //自动领取优惠券
      acquireWaitGetCoupons(condition) {
        api.acquireWaitGetCoupons(condition).then(res => {
            console.log("有礼----", res)
            if (!res.coupon) {
              return;
            }
            this.notifyGetCoupon()
          })
          .catch(err => {
            console.log(err);
          });
      },
      //显示收款码
      showCheckQrCode() {
        if(this.l98Setting.selfPayQRcodeOpen){
          this.changeQrCodeText({
            title: "长按二维码买单，记得输入实收金额",
            bottomText: ""
          });
          this.showQrcode(true);
        }else{
          this.$vux.toast.text("暂未开通收款码", "top");
        }
      },
      //确认对账单
      async sendAccountStateMent() {
        this.lastestSelfPayInfo.payamount = parseFloat(this.actMoney)
        this.lastestSelfPayInfo.payeephone = this.userInfo.phone
        this.lastestSelfPayInfo.consumeamount = parseFloat(this.preMoney)
        // var cashierContent = this.getLastCheckInfo();
        console.log("cashierContent---", this.lastestSelfPayInfo);
        if (!this.preMoney && !this.actMoney) {
          this.$vux.toast.text("请填写金额", "top");
          return;
        }
        let data = {
          payuserid: this.staticChatFriendObj.openid,
          id: this.lastestSelfPayInfo.id,
          consumeamount: parseFloat(this.preMoney),
          payamount: parseFloat(this.actMoney)
        };
        let res = await api.matchSelfPay(data);
        console.log("res====>", res);
        if (res.errCode === 0) {
          this.isShowAccount = false;
          this.componentChatList.push({
            friend: 0, //1为朋友，0为自己,
            type: 5,
            selfpayinfo:{
              isHandle: false,
              deskcode: this.lastestSelfPayInfo.deskcode,
              usercouponname: this.lastestSelfPayInfo.usercouponname,
              payamount: this.actMoney,
              consumeamount: this.preMoney,
            },
            payTime: util.timestampToTimeNoYear(new Date().getTime())
          });
          setTimeout(() => {
            let childNodes = this.$refs.chatList.childNodes;
            console.log("childNodes[childNodes.length-1].clientHeight--", childNodes[childNodes.length - 1].clientHeight)
            this.$refs.listView.scrollBy(0, -(childNodes[childNodes.length - 1].clientHeight - 50));
          }, 100);
          this.actMoney = "";
          this.preMoney = "";
        }
      },
      closeMoneyBg() {
        this.isShowAccount = false;
        this.actMoney = "";
        this.preMoney = "";
      },
      showAccountStateMent() {
        this.isShowAccount = true;
      },
      check(item, flag) {
        this.lastestSelfPayInfo = item.selfpayinfo
        console.log("checke-this.lastestSelfPayInfo-",this.lastestSelfPayInfo)
        this.lastestSelfPayInfo.payeephone = this.userInfo.phone
        item.isHandle = true;
        let data = {
          cashierName:this.userInfo.nickname,
          cashierID: this.$route.params.from,
          couponUserID: this.$route.params.to,
          userCouponID: item.userCouponInfo.id,
          setOffWay: 2,
          isAgree: flag,
          operationTime: new Date().getTime()
        };
        api.setOffUserCoupon(data).then(res => {
          //console.log("核销结果----", res);
          if (res.errCode === 0) {
            if (flag) {
              this.input_value = "同意核销，您可以买单啦！";
            } else {
              this.input_value = "对不起，不能用券，未达到使用条件";
            }
            this.send();
          }
        });
      },
      onImgLoaded() {
        //console.log("图片加载完成了");
        if (this.clientList.length > 5) {
          let childNodes = this.$refs.chatList.childNodes;
          this.$refs.listView.scrollBy(0, -(childNodes[0].clientHeight + 10));
        }
        this.$refs.listView.refresh();
      },
      // 选择表情
      selectEmtion(item) {
        this.input_value += item;
      },
      blurAdjust() {
        setTimeout(() => {
          if (
            document.activeElement.tagName == "INPUT" ||
            document.activeElement.tagName == "TEXTAREA"
          ) {
            return;
          }
          let result = "pc";
          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            //判断iPhone|iPad|iPod|iOS
            result = "ios";
          } else if (/(Android)/i.test(navigator.userAgent)) {
            //判断Android
            result = "android";
          }
          if ((result = "ios")) {
            document.activeElement.scrollIntoViewIfNeeded(true);
          }
        }, 400);
      },
      //获取收银结账消息记录列表
      loadCashierChatList() {
        let data = {
          cursor: this.cashierEndCursor,
          from: this.$route.params.from,
          to: this.$route.params.to
        };
        api.loadCashierChatMsg(data).then(res => {
            console.log("收银聊天记录res----", res)
            return new Promise((resolve, reject) => {
              this.resultMessList = res.messages;
              this.cashierEndCursor = res.cursor;
              this.clientList = res.messages;
              var i;
              if (!this.isLoadMore) {
                for (i = this.resultMessList.length - 1; i >= 0; i--) {
                  let msg = this.resultMessList[i];
                  this.componentChatList.push({
                    message: msg.content,
                    friend: msg.from === this.staticChatFriendObj.openid ? 1 : 0, //1为朋友，0为自己,
                    type: msg.type,
                    time: util.timestampToTime(msg.stime),
                    from: msg.from,
                    chatMsgID: msg.id,
                    isHandle: msg.isHandle,
                    userCouponInfo: msg.userCoupon ? this.handleCouponInfo(msg.userCoupon) : "",
                    // deskcode: msg.selfpayinfo ? msg.selfpayinfo.deskcode : "",
                    // usercouponname: msg.selfpayinfo ?
                    //   msg.selfpayinfo.usercouponname : "",
                    // payamount: msg.selfpayinfo ? msg.selfpayinfo.payamount : "",
                    // consumeamount: msg.selfpayinfo ?
                    //   msg.selfpayinfo.consumeamount : "",
                    payTime: util.timestampToTimeNoYear(
                      msg.selfpayinfo ? msg.selfpayinfo.time : ""
                    ),
                    selfpayinfo: msg.selfpayinfo ? msg.selfpayinfo : ""
                  });
                }
              } else {
                for (i = 0; i < this.resultMessList.length; i++) {
                  let msg = this.resultMessList[i];
                  this.componentChatList.unshift({
                    message: msg.content,
                    friend: msg.from === this.staticChatFriendObj.openid ? 1 : 0, //1为朋友，0为自己,
                    type: msg.type,
                    // type: 4,
                    time: util.timestampToTime(msg.stime),
                    from: msg.from,
                    chatMsgID: msg.id,
                    isHandle: msg.isHandle,
                    userCouponInfo: msg.userCoupon ? this.handleCouponInfo(msg.userCoupon) : "",
                    // deskcode: msg.selfpayinfo ? msg.selfpayinfo.deskcode : "",
                    // usercouponname: msg.selfpayinfo ?
                    //   msg.selfpayinfo.usercouponname : "",
                    // payamount: msg.selfpayinfo ? msg.selfpayinfo.payamount : "",
                    // consumeamount: msg.selfpayinfo ?
                    //   msg.selfpayinfo.consumeamount : "",
                    payTime: util.timestampToTimeNoYear(
                      msg.selfpayinfo ? msg.selfpayinfo.time : ""
                    ),
                    selfpayinfo: msg.selfpayinfo ? msg.selfpayinfo : ""
                  });
                }
              }
              console.log("this.componentChatList---", this.componentChatList)
              //console.log("收银聊天记录componentChatList-------------", this.componentChatList);
              resolve();
            });
          })
          .then(() => {
            this.$nextTick(function() {
              let childNodes = this.$refs.chatList.childNodes;
              let chatListHeight = 0;
              childNodes.forEach(item => {
                chatListHeight += item.clientHeight;
              });
              this.scrollHeight = chatListHeight;
              this.$refs.listView.finishPullDown();
              this.$refs.listView.refresh();
              if (!this.isLoadMore) {
                this.$refs.listView.scrollTo(0, -this.scrollHeight);
              }
            });
          });
      },
      //发送消息事件
      send() {
        window.scrollTo(0, 0); //解决ios键盘留白的bug
        //  this.blurAdjust();
        if (!this.input_value) {
          return;
        }
        //字符串转表情icon
        //this.input_value------ [大哭]大风歌[晕]
        // this.input_value------- <img src=/static/face/3.gif style="vertical-align: -6px;">大风歌<img src=/static/face/7.gif style="vertical-align: -6px;">
        //console.log("this.input_value------", this.input_value);
        var emotionArr = this.input_value.match(/\[.{1,2}\]/g);
        var reg = /\[.{1,2}\]/;
        if (emotionArr) {
          for (let i = 0; i < emotionArr.length; i++) {
            for (var j = 0; j < this.emotionList.length; j++) {
              if (this.input_value.indexOf(this.emotionList[j].name) !== -1) {
                this.input_value = this.input_value.replace(
                  reg,
                  `<img src=${this.emotionList[j].num} style="vertical-align: -6px;">`
                );
              }
            }
          }
        }
        //console.log("this.input_value-------", this.input_value);
        //把自己发送的内容加到聊天列表里面
        this.componentChatList.push({
          message: this.input_value,
          friend: 0,
          type: 1,
          time: util.timestampToTime(new Date().getTime())
        });
        let messObj = {
          to: this.isCashierFlag ?
            this.staticChatFriendObj.openid : this.staticChatFriendObj.CashierID,
          content: this.input_value,
          type: 1,
          from: this.isCashierFlag ?
            this.staticChatFriendObj.CashierID : this.userInfo.openid
        };
        //console.log("this.isCashierFlag----", this.isCashierFlag);
        //console.log("messObj----", messObj);
        let textMessObj = JSON.stringify(messObj);
        let decc1 = new TextEncoder("utf-8");
        let result = decc1.encode(textMessObj);
        api.sendTextCashier(result).then(res => {
          this.emotionShow = false;
          this.expressionShow = false;
          let childNodes = this.$refs.chatList.childNodes;
          if (this.clientList.length === 0 && !this.isCashierFlag) {}
        });
        this.input_value = "";
        // if (this.clientList.length > 5) {
        this.$nextTick(function() {
          let childNodes = this.$refs.chatList.childNodes;
          this.$refs.listView.refresh();
          this.$refs.listView.scrollBy(0, -childNodes[0].clientHeight - 20);
        });
        // }
      },
      // 发送图片
      uploadImage(e) {
        if (!e.target.files[0]) {
          return;
        }
        if (e.target.files[0].type === "video/mp4") {
          this.$vux.toast.text("你所选的文件格式不符合，请重新选择", "middle");
          return;
        }
        //console.log("点击发送图片");
        let vm = this;
        lrz(e.target.files[0], {
            quality: 0.1
          })
          .then(function(rst) {
            let filename = rst.origin.name;
            let dataURL = rst.file;
            //console.log("dataURL--------", dataURL);
            if (vm.isCashierFlag) {
              //console.log(vm.staticChatFriendObj);
              api
                .sendImageCashier(
                  vm.staticChatFriendObj.openid,
                  vm.staticChatFriendObj.CashierID,
                  filename,
                  dataURL
                )
                .then(res => {
                  //console.log("图片发送--------", res);
                  vm.componentChatList.push({
                    message: res.content,
                    friend: 0,
                    type: 2,
                    time: util.timestampToTime(new Date().getTime())
                  });
                  vm.$refs.listView.refresh();
                });
            } else {
              api
                .sendImageCashier(
                  vm.staticChatFriendObj.CashierID,
                  vm.userInfo.openid,
                  filename,
                  dataURL
                )
                .then(res => {
                  vm.componentChatList.push({
                    message: res.content,
                    friend: 0,
                    type: 2,
                    time: util.timestampToTime(new Date().getTime())
                  });
                  vm.$refs.listView.refresh();
                });
            }
            vm.$nextTick(function() {
              let childNodes = vm.$refs.chatList.childNodes;
              let chatListHeight = 0;
              childNodes.forEach(item => {
                chatListHeight += item.clientHeight;
              });
              vm.scrollHeight = chatListHeight;
              vm.$refs.listView.refresh();
              // vm.$refs.listView.scrollBy(0, -childNodes[0].clientHeight-20);
              vm.$refs.listView.scrollTo(0, -vm.scrollHeight - 10);
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
        //console.log(pic);
      },
      //关闭展示图
      closePreview() {
        this.showPreview = false;
      },
      //下拉刷新
      pullingDown() {
        //console.log("下拉刷新");
        if (this.cashierEndCursor == 0) {
          return;
        }
        this.isLoadMore = true;
        this.loadCashierChatList();
        // });
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
        //console.log(item);
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
      handleCouponInfo(couponInfo) {
        couponInfo.coupon.codeNum =
          util.prefixZero(couponInfo.coupon.type, 1) +
          "-" +
          util.prefixZero(couponInfo.coupon.batch, 3) +
          "-" +
          util.prefixZero(couponInfo.coupon.acquireNum, 7);
        couponInfo.coupon.name = util.returnDiscountContent(
          couponInfo.coupon
        );
        couponInfo.coupon.type = util.returnDiscountType(
          couponInfo.coupon.type
        );
        return couponInfo
      },
      notifyGetCoupon() {
        var topUpCommonInfo = {
          content: {
            fromInfo: {
              openid: "",
              headimgurl: "",
              nickName: "店员"
            },
            extMsg: {}
          },
          msgCode: 27
        };
        console.log("topUpCommonInfo----", topUpCommonInfo)
        this.addMessageIntoQueue(topUpCommonInfo);
      },
      ...mapMutations({
        setChatFriend: "SET_CHAT_FRIEND", //全局设置聊天对象的信息
        updateValue: "UPDATE_INPUTVALUE",
        changeCursor: "CHANGE_CURSOR",
        changeQrCodeText: "CHANGEQRCODETEXT",
        showQrcode: "SHOW_QRCODE", //展示二维码
        addFriendEvtObj: "UPDATE_DYNAMICMESSAGE", //更新好友事件提示框(左侧信封弹出触发)
        judgeMessType: "JUDGE_MESSTYPE", //判断消息
        addMessageIntoQueue: "ADDMESSAGEQUEUE", //消息插入队列
      })
    },
    watch: {
      cashierLastChatMsg: function(newValue) {
        console.log("cashierLastChatMsg----------", newValue);
        let messageInfo = newValue.extMsg.lastMsg;
        messageInfo["to"] = newValue.extMsg.lastMsg.to;
        if (messageInfo.from === this.staticChatFriendObj.openid) {
          if (messageInfo.type === 3) {
            messageInfo.userCoupon.coupon.codeNum =
              util.prefixZero(messageInfo.userCoupon.coupon.type, 1) +
              "-" +
              util.prefixZero(messageInfo.userCoupon.coupon.batch, 3) +
              "-" +
              util.prefixZero(messageInfo.userCoupon.coupon.acquireNum, 7);
            messageInfo.userCoupon.coupon.name = util.returnDiscountContent(
              messageInfo.userCoupon.coupon
            );
            messageInfo.userCoupon.coupon.type = util.returnDiscountType(
              messageInfo.userCoupon.coupon.type
            );
          }
          if (messageInfo.content.indexOf('同意核销') > -1 && !this.l98Setting.selfPayQRcodeOpen) { //未开通自助买单 收到收银员发来已买单信息，弹窗告知已收到优惠券
            let condition = 5; //核销有礼
            console.log("进来核销有礼啦")
            this.acquireWaitGetCoupons(condition)
            // api.acquireWaitGetCoupons(condition).then(res => {
            //     console.log("核销有礼----", res)
            //     if (!res.coupon) {
            //       return;
            //     }
            //     this.notifyGetCoupon()
            //   })
            //   .catch(err => {
            //     //console.log(err);
            //   });
          }
          if (this.l98Setting.selfPayQRcodeOpen && messageInfo.content.indexOf('您的买单款已到帐') > -1) {
            let condition = 7
            this.acquireWaitGetCoupons(condition)
          }
          this.componentChatList.push({
            message: messageInfo.content ? messageInfo.content : "",
            friend: 1, //1为朋友，0为自己
            from: messageInfo.from,
            type: messageInfo.type, //1 聊天消息表情 2.图片，3.送礼，4.约战
            time: util.timestampToTime(messageInfo.stime),
            chatMsgID: messageInfo.id,
            userCouponInfo: messageInfo.userCoupon,
            selfpayinfo:messageInfo.selfpayinfo,
            // deskcode: messageInfo.selfpayinfo ?
            //   messageInfo.selfpayinfo.deskcode : "",
            // usercouponname: messageInfo.selfpayinfo ?
            //   messageInfo.selfpayinfo.usercouponname : "",
            // payamount: messageInfo.selfpayinfo ?
            //   messageInfo.selfpayinfo.payamount : "",
            // consumeamount: messageInfo.selfpayinfo ?
            //   messageInfo.selfpayinfo.consumeamount : "",
            payTime: util.timestampToTimeNoYear(messageInfo.selfpayinfo ? messageInfo.selfpayinfo.time : "")

          });
          console.log("componentChatList----",this.componentChatList)
          setTimeout(() => {
            let childNodes = this.$refs.chatList.childNodes;
            // //console.log("LastChatMsg_childNodes-------------", childNodes);
            console.log("childNodes[childNodes.length-1].clientHeight--", childNodes[childNodes.length - 1].clientHeight)
            this.$refs.listView.scrollBy(0, -(childNodes[childNodes.length - 1].clientHeight));
          }, 100);
        }
      },
      input_value: function(newValue, oldValue) {
        if (newValue.length > 0 || oldValue > 0) {
          this.flag = true;
        } else {
          this.flag = false;
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
      qrCode,
      topUp
    }
  };
</script>

<style scoped lang='less'>
  @import "../../assets/less/variable.less";
  @import "../../assets/less/chat.less";
  @import "../../assets/less/card.less";
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
    .bg {
      z-index: 9;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: fixed;
      background-color: rgba(0, 0, 0, 0.2);
      .account_statement_wrapper {
        .close {
          position: absolute;
          right: 0.2667rem;
          top: 0.1333rem;
          width: 1.0667rem;
          height: 1.0667rem;
        }
        position: fixed;
        display: flex;
        top: 20%;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 5rem;
        background-color: #fff;
        z-index: 10;
        .preMoney,
        .actMoney {
          width: 4rem;
          height: 0.5rem;
          border: none;
          border-bottom: 1px solid #ccc;
          text-indent: 0.1333rem;
        }
        .account_btn {
          padding: 0.2667rem 0.4rem;
          border: none;
          width: 2rem;
          border-radius: 6px;
          background: -webkit-linear-gradient(top, #fedc00, #e69900);
          color: #fff;
        }
      }
    }
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
        text-align: center; // position: relative;
        display: flex;
        justify-content: space-between;
        .sex_box {
          // position: absolute;
          // left: -.7rem;
          width: 0.4rem;
          margin-right: 0.2333rem;
          padding-top: 0.05rem;
          img {
            width: 100%;
          }
        }
        .online_status {
          // margin-left: .2rem;
          display: flex;
          .online_dot {
            padding-top: 0.1333rem;
            width: 0.4rem;
            height: 0.4rem;
          }
          .friendStatus {}
          .roomNum {
            padding-top: 0.08rem;
            font-size: 14px;
          }
        }
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
            padding-bottom: 0.4rem;
            box-sizing: border-box;
            .cashier_wrapper {
              display: flex;
              flex-direction: column;
              .vipmbg {
                background-image: url("../../assets/image/discount_vipm_bg.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
              }
              .viptbg {
                background-image: url("../../assets/image/discount_vipt_bg.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
              }
            }
            .account_statement {
              margin: 0 auto;
              background-image: url("../../assets/image/autoCheck_bg.png");
              background-repeat: no-repeat;
              width: 6rem;
              height: 9.3rem;
              background-size: 100% 100%;
              overflow: hidden;
              .account_wrapper {
                margin-top: 1.7rem;
                padding: 0 0.4rem;
                .account_line {
                  display: flex;
                  align-items: center;
                  margin-bottom: 0.5rem;
                  font-weight: 900;
                  .line-title {
                    color: #875728;
                    font-size: 16px;
                  }
                  .deskCode {
                    margin-left: 0.1rem;
                    font-size: 16px;
                    color: #875728;
                  }
                  .date {
                    margin-left: 0.4rem;
                    font-size: 14px;
                    color: #875728;
                  }
                  .money {
                    font-size: 20px;
                    color: #922222;
                    font-weight: 800;
                  }
                  .cardname {
                    font-size: 17px;
                    color: #922222;
                    font-weight: 800;
                  }
                  .realMoney {
                    font-size: 20px;
                    color: #922222;
                    font-weight: 800;
                  }
                }
                .account_remar {
                  .line-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #9a7656;
                    margin-bottom: 4px;
                  }
                  .p1,
                  .p2 {
                    font-size: 14px;
                    font-weight: 400;
                    color: #9a7656;
                  }
                  .receiveBtn {
                    padding: 0.08rem 0.1067rem;
                    background-color: #eb5d57;
                    color: #fff;
                    border-radius: 4px;
                    margin: 0 5px;
                  }
                  .payBtn {
                    padding: 0.08rem 0.1067rem;
                    background-color: #80d491;
                    color: #fff;
                    border-radius: 4px;
                    margin: 0 5px;
                  }
                }
              }
            }
          }
          .friend {
            .chatList(left,
            #fff);
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
            .chatList(right,
            #ffd800);
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
                background: #ffd800;
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
            margin-right: 0.26rem;
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
          .cashier-l,
          .cashier-r
           {
            background-color: #eb5d57;
            color: #fff;
            border-radius: 4px;
            padding: 0.23rem 0.25rem;
            border: none;
            margin-right: 0.26rem;
            // margin-top: 0.1rem;
          }
          .cashier-r {
            background-color: #80d491;
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
          margin-top: 0.5rem;
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
