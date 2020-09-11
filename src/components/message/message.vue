<template>
  <div id="message" class="message_wrapper">
    <div @click="showCashierList" class="showCheckFlow" v-if="(isShowTab===2) && (isCashierListFlag)">查流水</div>
    <div class="mask" v-if="showFriendInfoFlag">
      <img @click="close" src="../../assets/image/close.png" class="close" alt="">
    </div>
    <div class="title">
      <div class="btn_box clearfix">
        <div :class="{active:isShowTab==0}" class="fri_btn fl" @click="selectList(0)">好友<i class="dot" v-show="msg_badgeCount"></i></div>
        <div :class="{active:isShowTab==1}" class="hello_btn fl" @click="selectList(1)">新朋友<i class="dot" v-show="mutualEventsList.length"></i></div>
        <div :class="{active:isShowTab==2}" class="vux-1px-l hello_btn fl" @click="selectList(2)"><i class="dot" v-show="client_badgeCount || cashier_badgeCount"></i>{{!isClientListFlag?"客服/结账":"留言/结账"}}</div>
        <div :class="{active:isShowTab==3}" class="system_btn fl" @click="selectList(3)">通知<i class="dot" v-show="group_badgeCount"></i></div>
      </div>
    </div>
    <div class="message_wrapper">
      <Popup @close="closePopUp" :show="showCashierFlow" :showCloseBtn="false">
        <div class="cashier_stream-wrapper">
          <ul class="cashier_stream_title">
            <li class="title_name" style="width:25%">买单时间</li>
            <li class="title_name" style="width:15%">台/房号</li>
            <li class="title_name">金额</li>
            <li class="title_name">收款码</li>
            <li class="title_name">券名称</li>
            <li class="title_name">买单人</li>
          </ul>
          <scroll :data="cashierFlowList" :pullDownRefresh="true" @pullingUp="pullingUp">
            <ul class="cashier_stream_detail">
              <li v-for="(cashier,index) in cashierFlowList" :key="index" class="stream_detail_item">
                <span class="detail_name" style="width:25%">{{cashier.time}}</span>
                <span class="detail_name" style="width:15%">{{cashier.deskcode}}</span>
                <span class="detail_name">{{cashier.consumeamount}}</span>
                <span class="detail_name">{{cashier.qrcodename?cashier.qrcodename:"无券买单"}}</span>
                <span class="detail_name">{{cashier.usercouponname?cashier.usercouponname:"无券买单"}}</span>
                <div class="detail_name">
                  <img :src="cashier.payuserheadimgurl" class="headUrl">
                </div>
              </li>
            </ul>
          </scroll>
          <img class="cashier_stream-close" @click="showCashierFlow=false" src="../../assets/image/close-round.png">
        </div>
      </Popup>
      <!-- 关注二维码 -->
      <div v-show="(!userInfo.isSubscribe && isShowQrCode) && ((isShowTab==0 || isShowTab==1)) " class="qrCode_wrapper">
        <img onclick="return false" @click="closeQrCode" class="close" src="../../assets/image/close.png" alt="">
        <p class="qrCode_text" style="font-size: 14px">{{isShowTab===2?"长按关注，以便客服应答及时送达给您":"长按关注，以便好友消息及时送达给您"}}</p>
        <img @touchstart="touchstart" @touchend="touchend" :src="qrCode" alt="" class="qrcodeImg">
        <p class="qrCode_text">会员特权:领福利、交群友、参活动</p>
      </div>
      <!-- 下单码 -->
      <div v-show="(l98Setting.placeOrderQRcodeOpen && isShowQrCode) && (isShowTab===2 && deskId != undefined ) " class="qrCode_wrapper">
        <img onclick="return false" @click="closeQrCode" class="close" src="../../assets/image/close.png" alt="">
        <p class="qrCode_text" style="font-size: 14px">长按识别二维码，可以直接下单</p>
        <img @touchstart="touchstart" @touchend="touchend" :src="OrderQrCode" alt="" class="qrcodeImg">
        <!-- <p class="qrCode_text"></p> -->
      </div>
      <!-- 好友 -->
      <scroll :data='alreadyFriendList' v-if="isShowTab==0">
        <ul class="message_list" style="margin-top:0.4rem">
          <li class="item vux-1px-b" @click="chat(item)" v-for="(item,index) in alreadyFriendList" :key="index">
            <div class="info_message">
              <div class="avatar">
                <img :src="item.info.headimgurl?item.info.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534938165134&di=f3ae0420c8c174149ac1c123230a28ed&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FJCRXU6oUw5s17jKllv9icrTmXvozYWQDeWFhKgEXbYeR9JOEKkrWLjibU7a7FAbsBHibVKca5wWzEiaXHWSgaSlgbA%2F640%3Fwx_fmt%3Dpng'"
                  alt="">
                <i class="dot" v-cloak v-show="item.info.unReadMsgCount>0"></i>
                <!-- <i class="dot" v-cloak v-show="item.info.unReadMsgCount">{{item.info.unReadMsgCount}}</i> -->
              </div>
              <div class="name_and_message">
                <div class="personStatus">
                  <p class="name">{{item.info.nickname}}</p>
                  <div class="sex-box">
                    <img src="../../assets/image/female.png" v-if="item.info.sex===0" class="sex-icon">
                    <img src="../../assets/image/female.png" v-else-if="item.info.sex===2" class="sex-icon">
                    <img src="../../assets/image/male.png" v-else class="sex-icon">
                  </div>
                  <img src="../../assets/image/dot_green.png" v-if="item.info.onlineDiceServer || item.info.onlineL98Server" class="online_dot">
                  <span v-if="item.info.onlineDiceServer || item.info.onlineL98Server" class="friendStatus">{{item.isInDoor?"店内":"店外"}}</span>
                  <span v-if="item.info.deskCode && (item.info.onlineDiceServer || item.info.onlineL98Server)" class="roomNum">{{`${item.info.deskCode}`}}桌</span>
                </div>
                <p class="message" v-if="item.info.lastMsg?item.info.lastMsg.type===1:''" v-html='item.info.lastMsg?item.info.lastMsg.content:""'></p>
                <p class="message" v-else-if="item.info.lastMsg?item.info.lastMsg.type===2:''">[图片]</p>
                <p class="message" v-else-if="item.info.lastMsg?item.info.lastMsg.type===3:''">约战，送礼信息</p>
                <p class="message" v-else-if="item.info.lastMsg?item.info.lastMsg.type===4:''">约战，送礼信息</p>
                <p class="message" v-else-if="item.info.lastMsg?item.info.lastMsg.type===9:''">语音</p>
                <p class="message" v-else></p>
              </div>
            </div>
            <div class="info_time">
              <p>{{item.info.lastMsg?item.info.lastMsg.stime.slice(8,10)==today?item.info.lastMsg.stime.slice(10,16):item.info.lastMsg.stime.slice(5,10):""}}</p>
            </div>
          </li>
          <!-- <p v-if="!alreadyFriendList.length" class="noFriend">暂无好友</p> -->
        </ul>
      </scroll>
      <!-- 新朋友 -->
      <scroll :data='mutualEventsList' v-else-if="isShowTab===1">
        <ul class="newMessage_list">
          <li class="item " v-for="(item,index) in mutualEventsList" :key="index">
            <!-- v-if="item.from.headimgurl" -->
            <div class="blank vux-1px-b">
              <div class="info_message">
                <div class="avatar">
                  <img :src="item.from.headimgurl?item.from.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534938165134&di=f3ae0420c8c174149ac1c123230a28ed&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FJCRXU6oUw5s17jKllv9icrTmXvozYWQDeWFhKgEXbYeR9JOEKkrWLjibU7a7FAbsBHibVKca5wWzEiaXHWSgaSlgbA%2F640%3Fwx_fmt%3Dpng'"
                    alt="">
                  <i class="dot"></i>
                </div>
                <div class="name_and_message">
                  <p class="name">{{item.from.nickname}}</p>
                  <p class="message" style="color:green;font-weight:800" v-if="item.combatID">{{item.from.nickname}}邀请玩把大话骰</p>
                  <p class="message" style="color:#333" v-else-if="item.id==1">{{item.from.nickname}}送你一个啤酒</p>
                  <p class="message" style="color:#333" v-else-if="item.id==2">{{item.from.nickname}}送你一个鲜花</p>
                  <p class="message" style="color:#333" v-else-if="item.id==3">{{item.from.nickname}}送你一个别墅</p>
                  <p class="message" style="color:#333" v-else-if="item.id==4">{{item.from.nickname}}送你一个跑车</p>
                  <p class="message" style="color:#333" v-else-if="item.integral">{{item.from.nickname}}送你{{item.name}}</p>
                  <p class="message" v-else>{{item.from.nickname}}给你点赞,请求加好友</p>
                </div>
              </div>
              <div class="thumb_wrapper">
                <div class="clearfix backThumbBox" v-if="item.combatID">
                  <p class=" back_thumb vux-1px fl reject " @click="rejectGame(index,item.combatID,item.from.openid)">免战</p>
                  <p class=" back_thumb vux-1px fl" @click="playGame(item.url,item.combatID,item.from.openid)">应战</p>
                </div>
                <div class="clearfix backThumbBox" v-else-if="item.gift">
                  <p class=" back_thumb vux-1px fl reject" @click="respondForGift(index,item,false)">拒绝</p>
                  <p class=" back_thumb vux-1px fl" @click="respondForGift(index,item,true)">感谢</p>
                </div>
                <div class="clearfix " v-else>
                  <p class=" back_thumb vux-1px fl reject " @click="showFriendInfo(item)">瞅瞅Ta</p>
                  <p class=" back_thumb vux-1px fl reject " @click="backThumbClick(index,item.evtID,'no',item.from)">拒绝</p>
                  <p class=" back_thumb vux-1px fl" @click="backThumbClick(index,item.evtID,'yes',item.from)">接受</p>
                </div>
                <div class="time_wrapper" style="margin-top:.4rem;color:#ccc">
                  <p class="time_desc" style="text-align:right;box-sizing:border-box;padding-right:.09rem">{{item.time}}</p>
                </div>
              </div>
              <!-- <div class="checkBox_scene clearfix" v-show="item.integral">
                                      <input @change="onlineSendGift" type="checkbox" class="checkbox fl" :checked='isMakeFriendBool'>
                                      <span class="scene-text fl">加好友</span>
                                    </div> -->
            </div>
          </li>
          <p v-if="!mutualEventsList.length" class="noContent">暂无新朋友消息</p>
        </ul>
      </scroll>
      <!-- 客服通知 -->
      <scroll ref="clientScroll" :data="clientServiceList" v-else-if="isShowTab===2">
        <div>
          <ul class="message_list">
            <li v-if="!isClientListFlag" class="item vux-1px-b" @click="ChatToClient">
              <div class="info_message">
                <div class="avatar">
                  <img :src="clientImg" alt="">
                  <i class="dot" v-cloak v-show="clientObj.unReadMsgCount && client_badgeCount"></i>
                </div>
                <div class="name_and_message">
                  <p class="name" style="font-weight:800;font-size:15px">客服小哥</p>
                  <p class="captainMessage">欢迎光临! 有任何问题或建议，请留言</p>
                  <p class="time"> {{clientObj.lastMsg?clientObj.lastMsg.stime.slice(8,10)==today?clientObj.lastMsg.stime.slice(10,16):clientObj.lastMsg.stime.slice(5,10):""}}</p>
                </div>
              </div>
            </li>
            <li v-if="!isCashierListFlag" class="item vux-1px-b" @click="userToCashierChat">
              <div class="info_message">
                <div class="avatar">
                  <img :src="cashierImg" alt="">
                  <i class="dot" v-cloak v-show="cashier_badgeCount"></i>
                </div>
                <div class="name_and_message">
                  <p class="name" style="font-weight:800;font-size:15px">收银员</p>
                  <button class="discount-pay" @click.stop="goToCard">有券买单</button>
                  <button class="noDiscount-pay" @click.stop="payNoCashier">无券买单</button>
                </div>
              </div>
            </li>
          </ul>
          <ul class="message_list">
            <li v-if="isClientListFlag" class="item vux-1px-b" @click="clientChat(item)" v-for="(item,index) in clientServiceList" :key="index">
              <div class="info_message">
                <div class="avatar">
                  <img :src="item.headimgurl?item.headimgurl:clientImg" alt="">
                  <i class="dot" v-cloak v-show="item.unReadMsgCount"></i>
                </div>
                <div class="name_and_message">
                  <div class="personStatus">
                    <p class="name">{{item.nickname?item.nickname:"游客"}}</p>
                    <img src="../../assets/image/dot_green.png" v-if="item.onlineDiceServer || item.onlineL98Server" class="online_dot">
                    <span v-if="item.onlineDiceServer || item.onlineL98Server" class="friendStatus">{{item.isIndoor?"店内":"店外"}}</span>
                    <span v-if="item.deskCode && (item.onlineDiceServer || item.onlineL98Server)" class="roomNum">{{`${item.deskCode}`}}桌</span>
                  </div>
                  <p class="captainMessage">{{userInfo.role?"请查看用户留言消息":"欢迎光临! 有任何问题或建议，请留言"}}</p>
                  <p class="time"> {{item.lastMsg?item.lastMsg.stime.slice(8,10)==today?item.lastMsg.stime.slice(10,16):item.lastMsg.stime.slice(5,10):""}}</p>
                </div>
              </div>
            </li>
            <!-- <li class="item vux-1px-b" style="width:100%;text-align:center;height:30px;line-height:22px;font-size:16px;font-weight:900">收银情况</li> -->
            <li v-if="isCashierListFlag" class="item vux-1px-b" @click="cashierChat(item)" v-for="(item,index) in cashierServiceList" :key="index">
              <div class="info_message">
                <div class="avatar">
                  <img :src="item.headimgurl?item.headimgurl:cashierImg" alt="">
                  <i class="dot" v-cloak v-show="item.unReadMsgCount"></i>
                </div>
                <div class="name_and_message">
                  <div class="personStatus">
                    <p class="name">{{item.nickname?item.nickname:"游客"}}</p>
                    <img src="../../assets/image/dot_green.png" v-if="item.onlineDiceServer || item.onlineL98Server" class="online_dot">
                    <span v-if="item.onlineDiceServer || item.onlineL98Server" class="friendStatus">{{item.isIndoor?"店内":"店外"}}</span>
                    <span v-if="item.deskCode && (item.onlineDiceServer || item.onlineL98Server)" class="roomNum">{{`${item.deskCode}`}}桌</span>
                  </div>
                  <p class="captainMessage">请查看结账情况</p>
                  <!-- <p class="time"> {{item.lastMsg?item.lastMsg.stime.slice(8,10)==today?item.lastMsg.stime.slice(10,16):item.lastMsg.stime.slice(5,10):""}}</p> -->
                </div>
              </div>
            </li>
            <!-- <p v-show="(!clientServiceList.length && isClientListFlag)" class="noContent">未有留言者</p> -->
          </ul>
        </div>
      </scroll>
      <!-- 通知 -->
      <scroll :data="captainMessageList" v-else-if="isShowTab==3">
        <ul class="message_list" style="margin-top:0.4rem">
          <li class="item vux-1px-b" v-for="(item,index) in captainMessageList" :key="index">
            <div class="info_message">
              <div class="avatar">
                <img v-if="item.type===1" src='../../assets/image/1.png' style="border-radius:0" alt="">
                <img v-else-if="item.type===2" src='../../assets/image/2.png' style="border-radius:0" alt="">
                <img v-else-if="item.type===3" src='../../assets/image/3.png' style="border-radius:0" alt="">
                <img v-else-if="item.type===4" src='../../assets/image/4.png' style="border-radius:0" alt="">
                <img v-else-if="item.type===5" src='../../assets/image/5.png' style="border-radius:0" alt="">
                <img v-else-if="item.type===6" src='../../assets/image/6.png' style="border-radius:0" alt="">
                <i v-show="item.unread" class="dot" style="top:-.2rem;right:-.1rem"></i>
              </div>
              <div class="name_and_message">
                <p class="captainMessage">{{item.name}} <span class="time">{{item.time}}</span></p>
                <p class="handle-wrapper">
                  <span class="del" @click="delNotice(item.id)">删除</span>
                  <span class="lookUp" @click="setUnreadNotice(item.id,item.type)">查看</span>
                </p>
              </div>
            </div>
          </li>
          <p v-if="!captainMessageList.length" class="noContent">暂无系统通知消息</p>
        </ul>
      </scroll>
    </div>
    <!-- 回赞 -->
    <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :text="text" :position="position"></toast>
    <!-- 查看好友详细信息 -->
    <div class="stack-item" v-if="showFriendInfoFlag">
      <div style="height:100%" class="stack_content">
        <div class="big_box">
          <div class="img_content">
            <div class="avatar_box">
              <img class="avatar" :src="friendInfo.from.headimgurl?friendInfo.from.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534938165134&di=f3ae0420c8c174149ac1c123230a28ed&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FJCRXU6oUw5s17jKllv9icrTmXvozYWQDeWFhKgEXbYeR9JOEKkrWLjibU7a7FAbsBHibVKca5wWzEiaXHWSgaSlgbA%2F640%3Fwx_fmt%3Dpng'"
                alt="暂无头像">
            </div>
            <p class="name">{{friendInfo.from.nickname}}</p>
          </div>
          <div class="userInfo_wrapper">
            <div class="userBox clearfix">
              <img src="../../assets/image/male.png" alt="" class="sex sex_male" v-if="friendInfo.from.sex=='男'">
              <img src="../../assets/image/female.png" alt="" class="sex sex_female" v-else>
              <span class="constellation">{{friendInfo.from.constellation?friendInfo.from.constellation.slice(0,3):"水瓶座"}}</span>
              <span class="friend">好友 {{friendInfo.from.numOfFriends?friendInfo.from.numOfFriends:0}}</span>
              <span class="gift">富豪榜 {{friendInfo.from.wealthRanking}}</span>
              <span class="thumb">战神榜 {{friendInfo.from.gameScoreRanking}}</span>
            </div>
            <div class="tag_wrapper">
              <span v-for="(item,index) in friendInfo.from.tags?friendInfo.from.tags.split('、'):''" :key="index">{{item}}</span>
            </div>
            <div class="signature_wrapper">
              <p class="word">个性签名：{{friendInfo.from.signature?friendInfo.from.signature:sign}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type='text/ecmascript-6'>
  import api from "common/api"
  import Scroll from 'base/scroll/scroll'
  import Popup from 'base/popUp/popUp'
  import Bus from 'common/bus.js'
  import {
    mapMutations,
    mapActions,
    mapGetters,
    mapState
  } from "vuex";
  import {
    Tab,
    TabItem,
    ButtonTab,
    ButtonTabItem,
    Toast
  } from "vux";
  import util from 'common/util'
  export default {
    data() {
      return {
        showCashierFlow: false,
        cashierFlowList: [], //收银账单
        isShowQrCode: true,
        isClientListFlag: true, //判断是否是客服
        isCashierListFlag: true, //判断是否是收银员
        clientObj: {}, //客服对象
        customerObj: {},
        cashierObj: {}, //收银对象
        divideAvartar: require('../../assets/image/divide_add_avatar.png'),
        clientImg: require("../../assets/image/home_letter.png"),
        cashierImg: require("../../assets/image/cashierIcon.png"),
        color: "#ffd800",
        isShowTab: 2, //最上面tab切换
        selected_num: 0,
        greeting_flag: 0,
        OrderQrCode: "", //下单二维码
        text: "", //回赞和拒绝文案
        mutualEventsList: [],
        position: "default",
        thumb_flag: true, //回赞的box的flag
        showPositionValue: false, //回赞的toast的flag
        // isMakeFriendBool: true,
        friendInfo: {},
        showFriendInfoFlag: false,
        sign: "爱情陷阱",
        clientServiceList: [], //客服留言列表
        cashierServiceList: [], //收银员买单列表
        cashierCursor: 0,
      };
    },
    //路由判断，判断是从导航栏进入消息页面还是从店长信箱进入消息页面
    beforeRouteEnter(to, from, next) {
      console.log("to", to)
      if (to.params.routeParamNum === 1) {
        next(vm => {
          vm.isShowTab = 1;
        });
      } else if (from.name === "gameRecord") {
        next(vm => {
          vm.isShowTab = 3;
        });
      } else if (from.params.type === "cashier") {
        next(vm => {
          vm.isShowTab = 2;
        });
      } else if (from.name === "shareNew") {
        next(vm => {
          vm.isShowTab = 3;
        });
      } else if (from.name === "card") {
        next(vm => {
          vm.isShowTab = 3;
        });
      } else if (to.query.routeParamNum === "0") {
        next(vm => {
          vm.isShowTab = 0;
        });
      } else if (to.query.routeParamNum === 0) {
        next(vm => {
          vm.isShowTab = 0;
        });
      } else if (to.params.routeParamNum === 2) {
        next(vm => {
          vm.isShowTab = 2;
        });
      } else if (to.query.routeParamNum === 2) {
        next(vm => {
          vm.isShowTab = 2;
        });
      } else if (to.query.type === "friend") {
        next(vm => {
          vm.isShowTab = 0;
        });
      } else if (to.query.type === "cashier") {
        next(vm => {
          vm.isShowTab = 2;
        });
      } else if (to.query.routeParamNum == "2") {
        next(vm => {
          vm.isShowTab = 2;
        });
      } else {
        next(vm => {
          vm.isShowTab = 0;
        });
      }
    },
    beforeRouteUpdate(to, from, next) {
      //console.log("beforeRouteUpdate---------", from)
      if (from.name === "clientChat" || from.name === 'chat' || from.name === "cashierChat") {
        this.loadClientServiceList()
        this.loadCashierList()
      }
      next()
    },
    computed: {
      ...mapState([
        "friendEvtList",
        "alreadyFriendList",
        "staticChatFriendObj",
        "LastChatMsg",
        'captainMessageList',
        "friendGiftList",
        "challengeGameList",
        "manualEventsList_badgeCount",
        "userInfo",
        "client_badgeCount",
        "cashier_badgeCount",
        "qrCode",
        "shareUrl",
        "divide_badgeCount",
        "group_badgeCount",
        "msg_badgeCount",
        "deskId",
        "deskCode",
        "l98Setting"
      ]),
      messageTime() {
        return
      }
    },
    created() {
      this.today = new Date().getDate();
      // //console.log(this.today);
      if (this.today < 10) {
        this.today = "0" + this.today;
      } else {
        this.today = this.today.toString();
      }
      Bus.$on('incre', (num) => {
        this.divide_badgeCount += num
        this.loadIdentityList()
        //console.log("bus----------message", num)
      })
    },
    mounted() {
      this._loadFriends(); //拉取好友
      this._loadMutualEvents(); //拉取送礼，约战，
      this.getCaptainMessList(); //加载群发通知
      this.loadClientServiceList() //加载客服列表  
      this.loadCashierList() //加载收银员列表  
      this.loadIdentityList() //加载分身 
      this.loadSelfPay() //买单流水
      this.getPlaceOrderQRcodebyID() //拉取下单码
      // this.isShowTab = this.getQueryString("routeParamNum")
      // this.isShowQrCode = localStorage.getItem("isShowQrCode") === "false" ? false : true
    },
    methods: {
      //拉取下单码
      getPlaceOrderQRcodebyID() {
        console.log('this.deskId---',this.deskId)
        console.log('deskCode---',this.deskCode)
        api.getPlaceOrderQRcodebyID(this.deskId).then(res => {
          console.log("拉取下单码----", res)
          if (res.errCode === 0) {
            this.OrderQrCode = res.info
          }
        })
      },
      //用户长按识别二维码后，关闭原网页
      touchstart() {
        this.startTime = +new Date()
        this.timer = setTimeout(() => {
          window.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
              this.closeWebPage()
            }
          })
        }, 700)
      },
      //用户长按识别二维码后，关闭原网页
      touchend() {
        this.endTime = +new Date()
        if (this.endTime - this.startTime < 700) {
          clearTimeout(this.timer)
          window.removeEventListener('visibilitychange')
        }
      },
      //关闭公众号
      closeWebPage() {
        WeixinJSBridge.invoke("closeWindow", {}, function(res) {
          // alert(res.err_msg);
          // window.location.href =
          //   "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU3MTc1MzA1OA==#wechat_redirect";
        });
      },
      // 临时方法 删除分身
      delDivide(targetId) {
        api.delIdentity(targetId).then(res => {
          //console.log("删除结果-----", res)
        })
      },
      async payNoCashier() {
        let data = {
          deskid: this.deskId || "fefd338f-b59c-49c0-b918-5ed3d28e4cd1",
          deskcode: Number(this.deskCode) || 1,
          payuserid: this.userInfo.openid,
          payuserheadimgurl: this.userInfo.headimgurl,
        };
        let res2 = await api.launchSelfPay(data);
        console.log("res2------", res2)
        if (res2.errorCode === 0) {
          this.cashierObj["openid"] = this.cashierObj.CashierID
          this.setChatFriend(this.cashierObj);
          setTimeout(() => {
            this.$router.push({
              name: "cashierChat",
              params: {
                from: this.userInfo.openid,
                to: this.cashierObj.CashierID,
                deskCode: this.deskCode,
                isCashier: false,
              }
            });
          }, 500);
        } else {
          this.$vux.toast.text(`${res2.errorMsg}`);
        }
      },
      closePopUp(flag) {
        this.showCashierFlow = flag
      },
      //显示收银流水
      showCashierList() {
        this.showCashierFlow = true;
      },
      //买单流水
      async loadSelfPay() {
        let res = await api.loadSelfPay(this.cashierCursor, 50)
        console.log("买单流水-------", res)
        if (res.errCode === 0) {
          this.cashierFlowList = res.info.selfpayes
          this.cashierFlowList.forEach(item => {
            item.time = util.timestampToTimeNoYear(item.time)
          })
          this.cashierCursor = res.info.cursor
        }
      },
      async pullingUp() {
        if (this.cashierCursor != 0) {
          let res = await api.loadSelfPay(this.cashierCursor, 50)
          console.log("更多买单流水----", res)
          if (res.errCode === 0) {
            res.info.selfpayes.forEach(item => {
              item.time = util.timestampToTimeNoYear(item.time)
              this.cashierFlowList.push(item)
            })
            this.cashierCursor = res.info.cursor
          }
        }
      },
      goToCard() {
        this.$router.push({
          name: "card",
          params: {
            type: "cashier"
          }
        })
      },
      //删除群发通知
      delNotice(noticeId) {
        api.delNotice(noticeId).then(res => {
          //console.log('删除群发消息', res)
          if (res.errCode === 0) {
            this.$vux.toast.text('删除成功');
            this.getCaptainMessList()
          } else {
            this.$vux.toast.text(res, errMsg);
          }
        })
      },
      //设置群发通知已读
      setUnreadNotice(noticeId, type) {
        api.setUnreadNotice(noticeId).then(res => {
          //console.log('群发消息已读---', res)
          if (res.errCode === 0) {
            switch (type) {
              case 1:
                this.$router.push({
                  name: 'welfare'
                })
                break;
              case 2:
                let _url = window.location.href;
                this.gameUrl = _url.split("k98")[0];
                window.location.href = `${this.gameUrl}game/?gamePath=game2`;
                break;
              case 3:
                this.$router.push({
                  name: 'shareNew'
                })
                break;
              case 4:
                break;
              case 5:
                this.$router.push({
                  name: 'gameRecord'
                })
                break;
              case 6:
                this.$router.push({
                  name: 'card'
                })
                break;
              default:
                break;
            }
          } else {
            this.$vux.toast.text(res, errMsg);
          }
        })
      },
      //拉取分身
      loadIdentityList() {
        var count = 0
        api.loadIdentityList().then(res => {
          if (res.errorCode === 0) {
            this.divideList = res.info.filter(item => {
              if (item.openid != this.userInfo.openid) {
                count += item.unreadMsgCount
                this.addDivideUnreadCount(count)
              }
              item.latesMsgTime = item.latesMsgTime ? util.timestampToTime(item.latesMsgTime) : 0
              return item.openid != this.userInfo.openid
            })
            //console.log("拉取分身-------", this.divideList)
          } else {
            this.$vux.toast.text(res.errorMsg);
          }
        })
      },
      closeQrCode() {
        this.isShowQrCode = false
        // localStorage.setItem("isShowQrCode", false)
      },
      getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      //加载客服列表
      loadClientServiceList() {
        let phone = this.userInfo.phone ? this.userInfo.phone : "7777"
        var unReadCount = 0;
        api.loadClientServiceList(phone).then(res => {
          //console.log("客服----------------", res)
          if (res.CliSerID && !res.uerInfos) { //用户进入
            this.isClientListFlag = false
            this.clientObj = res
            unReadCount = this.clientObj.unReadMsgCount
            if (this.clientObj.lastMsg) {
              this.clientObj.lastMsg.stime = util.timestampToTime(res.lastMsg.stime)
            }
          } else { //客服进入
            this.customerObj = res
            var tempArr = res.uerInfos
            if (tempArr.length > 0) {
              tempArr.forEach((client, index) => {
                unReadCount += client.unReadMsgCount
                if (client.lastMsg) {
                  client["stime"] = client.lastMsg.stime
                  client.lastMsg.stime = util.timestampToTime(client.lastMsg.stime)
                }
                if (client.deskCode != 0 && client.deskCode) {
                  client.deskCode = util.prefixZero(client.deskCode, 3)
                }
                if (client.unReadMsgCount > 0) { //把未读消息放到数组前面
                  var item = tempArr.splice(index, 1)
                  tempArr.unshift(item[0])
                }
              })
              this.clientServiceList = tempArr.sort(util.sortByKey("stime"))
              //console.log("客服列表-------------", this.clientServiceList)
            }
          }
          this.getClientUnreadCount(unReadCount)
          this.addBandge()
        })
      },
      //加载收银员列表 (该接口会判断当前用户是否是收银员，若是会加载向收银员申请核销的用户列表，若否则会加载收银员消息表)
      loadCashierList() {
        api.loadCashierList().then(res => {
          //console.log("收银员列表---", res)
          let unReadCount = 0
          this.cashierObj = res
          if (!res.uerInfos) { //普通用户进入
            this.isCashierListFlag = false
            unReadCount = this.cashierObj.unReadMsgCount
          } else { //收银员进入
            var tempArr = res.uerInfos
            if (tempArr.length > 0) {
              tempArr.forEach((client, index) => {
                unReadCount += client.unReadMsgCount
                if (client.deskCode != 0 && client.deskCode) {
                  client.deskCode = util.prefixZero(client.deskCode, 3)
                }
                if (client.unReadMsgCount > 0) { //把未读消息放到数组前面
                  var item = tempArr.splice(index, 1)
                  tempArr.unshift(item[0])
                }
              })
              this.cashierServiceList = tempArr.sort(util.sortByKey("stime"))
              //console.log("客服列表-------------", this.cashierServiceList)
            }
          }
          this.getCashierUnreadCount(unReadCount)
          this.addBandge()
        })
      },
      //瞅瞅他好友信息
      showFriendInfo(userInfo) {
        this.showFriendInfoFlag = true;
        this.friendInfo = userInfo
      },
      close() {
        this.showFriendInfoFlag = false;
      },
      //删除点赞，约战，送礼列表
      removeEventList() {
        this._loadFriends();
        this._loadMutualEvents();
      },
      //勾选是否加好友
      // onlineSendGift(e) {
      //   //console.log(e.target.checked)
      //   this.isMakeFriendBool = e.target.checked
      // },
      selectList(index) {
        this.isShowTab = index;
        if (this.isShowTab === 2) {
         
          this.loadClientServiceList()
          this.loadCashierList()
          setTimeout(() => {
            this.$nextTick(function() {
              this.$refs.clientScroll.scrollTo(0, 0)
            })
          }, 50);
        } else if (this.isShowTab === 3) {
          // Bus.$emit("hideEnvelop", false)
        } else {
          this._loadFriends(); //拉取好友
          this._loadMutualEvents(); //拉取送礼，约战，
        }
      },
      //拉取约战、点赞、送礼列表
      _loadMutualEvents() {
        api.loadMutualEvents().then(res => {
          if (res.errCode === 0) {
            let mutualEventsObj = res.mutualEvents;
            let tempEventList = [];
            console.log("mutualEventsObj------------", mutualEventsObj);
            this.mutualEventsList = []; //先清空
            tempEventList = tempEventList.concat(mutualEventsObj.combatsEvents === null ? [] : mutualEventsObj.combatsEvents)
            tempEventList = tempEventList.concat(mutualEventsObj.giftEvents === null ? [] : mutualEventsObj.giftEvents)
            tempEventList = tempEventList.concat(mutualEventsObj.friendEvents === null ? [] : mutualEventsObj.friendEvents)
            this.mutualEventsList = tempEventList.sort((a, b) => {
              return b.time - a.time
            })
            this.CalcManualEventsCount(this.mutualEventsList.length);
            this.addBandge();
            this.mutualEventsList.forEach(item => {
              item.time = util.timestampToTimeNoLine(Number(item.time))
              if (item.gift) {
                item = Object.assign(item, item.gift)
              }
            })
          }
          console.log('拉取约战、点赞、送礼列表------------------------------', this.mutualEventsList)
        })
      },
      //接受或拒接送礼
      respondForGift(index, giftInfo, flag) {
        // //console.log('giftInfo----------------', giftInfo)
        let giftType = giftInfo.integral ? 1 : 0;
        let giftParam = {
          agree: flag, //是否接受
          recordID: giftInfo.giftRecordID, //送礼记录ID
          fromID: giftInfo.from.openid, //赠送者
          respondType: giftType, //记录的礼物类型  0是虚拟礼物、1是店长推荐和商城礼品
          // isMakeFriend: this.isMakeFriendBool,
        }
        api.respondForGift(giftParam).then(res => {
          // //console.log('送礼操作结果-------------------', res);
          if (res.errCode == 0) {
            this.removeEventList()
            if (flag) {
              this.text = "已感谢";
              api.getUserInfo("/api/loadUserInfo").then(res => {
                this.getUserInfo(res);
              })
              setTimeout(() => {
                if (!this.userInfo.isSubscribe) {
                  this.changeQrCodeText({
                    title: "长按关注，每天获签到积分及更多特权",
                    bottomText: "会员特权:领福利、交群友、参活动"
                  })
                  this.showQrcode(true)
                }
              }, 1000);
            } else {
              this.text = "已拒接";
            }
            this.showPositionValue = true;
          }
        })
      },
      //回赞事件
      backThumbClick(index, type, flag, fromInfo) {
        //console.log(fromInfo)
        this.fromUserInfo = fromInfo
        api.giveBackThumb(type, flag).then(res => {
          //console.log("回赞事件----------", res);
          if (res.errCode === 0) {
            this.setChatFriend(fromInfo)
            //重新拉取已经成为好友列表
            this.removeEventList()
            //重新拉取约战，送礼，点赞列表
            // this._loadMutualEvents();
            if (flag == "yes") {
              this.chanageFriendPanelFlag(true)
              Bus.$emit("changeFriendConnetion", fromInfo.openid)
              this.text = "已回赞";
            } else {
              this.text = "已拒绝";
            }
            this.showPositionValue = true;
          }
        });
      },
      //进入游戏
      playGame(url, combatID, openId) {
        let params = {
          agree: true,
          combatID: combatID,
          fromID: openId
        }
        //约战
        api.responseCombat(params).then(res => {
          //console.log(res)
          if (res.errCode == 0) {
            console.log('删除结果-----------', res);
            window.location.href = url;
          }
        })
      },
      //拒接游戏
      rejectGame(index, combatID, openId) {
        let params = {
          agree: false,
          combatID: combatID,
          fromID: openId
        }
        api.responseCombat(params).then(res => {
          //console.log('拒接结果-----------', res);
          if (res.errCode == 0) {
            this.text = "已拒绝";
            this.removeEventList()
            this.showPositionValue = true;
            this.addBandge();
          }
        })
      },
      clearHistory(combatID, url) {
        api.deleteInviteCombat(combatID).then(res => {
          //console.log('删除结果-----------', res);
          if (res.errCode == 0) {
            window.location.href = url;
          }
        })
      },
      //拉取好友
      _loadFriends() {
        let cursor = 0;
        this.getAlreadyFriendList(cursor);
      },
      // tab事件
      onItemClick(index) {
        this.greeting_flag = index;
        //console.log(index);
      },
      //以用户身份进入客服发消息
      ChatToClient() {
        this.clientObj["openid"] = this.clientObj.CliSerID
        this.setChatFriend(this.clientObj);
        this.$router.push({
          name: "clientChat",
          params: {
            isClient: false,
          }
        });
      },
      //以客服身份进入页面
      clientChat(client) {
        client["CliSerID"] = this.customerObj.CliSerID
        this.setChatFriend(client);
        //console.log("向留言用户发消息 client-------------", client)
        this.$router.push({
          name: "clientChat",
          params: {
            isClient: true,
          }
        });
      },
      //以收银员身份进入结账页面
      cashierChat(user) {
        user["CashierID"] = this.cashierObj.CashierID
        this.setChatFriend(user);
        this.$router.push({
          name: "cashierChat",
          params: {
            to: user.openid,
            from: this.cashierObj.CashierID,
            isCashier: true,
          }
        });
      },
      //以用户身份进入结账页面
      userToCashierChat() {
        this.cashierObj["openid"] = this.cashierObj.CashierID
        this.setChatFriend(this.cashierObj);
        this.$router.push({
          name: "cashierChat",
          params: {
            to: this.cashierObj.CashierID,
            from: this.userInfo.openid,
            isCashier: false,
          }
        });
      },
      //发起好友聊天
      chat(item) {
        this.isShowEnvelope = false;
        this.setChatFriend(item);
        this.$router.push({
          name: "chat",
          params: {
            isClient: false,
            id: this.staticChatFriendObj.openid ? this.staticChatFriendObj.openid : item.phone
          }
        });
      },
      ...mapMutations({
        getUserInfo: "GET_USERINFO", //获取用户信息
        chanageFriendPanelFlag: "CHANGEFRIENDPANELFLAG", //显示好友匹配成功弹框
        CalcManualEventsCount: "GET_ALLEVENTS_BADGECOUNT", //统计约战送礼点赞数量
        setChatFriend: "SET_CHAT_FRIEND", //全局设置聊天对象的信息
        compareLastMsg: "COMPARE_LASTMESS", //推送最后的一个消息跟已有好友消息列表对比
        toTopFriend: "TO_TOP_MESSAGE", //把最新消息的置顶
        //getChallengeGamelist: "GET_CHALLENGEGAMELIST", //更新新增约战列表
        // clearChallengeGameList: "CLEAR_CHALLENGEGAMELIST",//清空约战记录
        addBandge: "ADD_BADGE", //动态变化未读消息数量
        getClientUnreadCount: "GETCLIENTUNREADCOUNT", //客服未读消息数量
        getCashierUnreadCount: "GETCASHIERUNREADCOUNT", //收银未读消息数量
        changeQrCodeText: "CHANGEQRCODETEXT",
        showQrcode: "SHOW_QRCODE",
        addDivideUnreadCount: "ADDDIVIDEUNREADMSG" //累计分身未读消息
      }),
      ...mapActions({
        getAlreadyFriendList: "get_alreadyFriendList", //加载已经成为好友列表
        getFriendEvt: "get_FriendEvt", //加载好友事件类型
        //getFriendGift: "get_FriendGift", //获取好友送礼事件
        getCaptainMessList: "get_captainMessageList" //获取店长信息
      })
    },
    watch: {
      //监听约战通知，刷新送礼，约战，点赞列表
      manualEventsList_badgeCount: function() {
        this._loadMutualEvents();
      },
      //监听最新的一条消息
      LastChatMsg: function(newValue) {
        // //console.log('在消息列表收到对方手来的消息------------------------------------：',newValue);
        // this.compareLastMsg(newValue);
        //把最新的一条消息放到最顶部
        let tempAlreadyFriendList = [];
        this.alreadyFriendList.forEach((element, index) => {
          // //console.log(element);
          if (newValue.lastMsg.from == element.info.openid) {
            tempAlreadyFriendList.unshift(element);
          } else {
            tempAlreadyFriendList.push(element);
          }
        });
        this.toTopFriend(tempAlreadyFriendList)
        // //console.log(tempAlreadyFriendList)
      },
      $route: function(newRoute) {
        if (newRoute.name == "message") {
          this._loadFriends();
        }
      }
    },
    components: {
      ButtonTab,
      ButtonTabItem,
      Tab,
      TabItem,
      Toast,
      Scroll,
      Popup
    }
  };
</script>

<style scoped lang='less'>
  @import "../../assets/less/base.less";
  @import "../../assets/less/mixin.less";
  @import "../../assets/less/variable.less";
  @import "../../assets/less/tantan.less";
  @import "../../assets/less/message_common.less";
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 7;
  }
  .message_wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .showCheckFlow {
      right: 0.1333rem;
      bottom: 20%;
      position: absolute;
      width: 1.0667rem;
      height: 1.0667rem;
      line-height: 1.0667rem;
      border-radius: 50%;
      text-align: center;
      background-color: red;
      color: #fff;
      z-index: 3;
    }
    .close {
      width: 0.8rem;
      position: absolute;
      top: 0.3rem;
      right: 0.2667rem
    }
    .stack-item {
      position: absolute;
      z-index: 8;
      top: 10%;
      left: 10%;
      right: 10%;
      bottom: 30%;
      margin: auto;
      text-align: center;
      .stack_content {
        margin-bottom: 20px;
        .big_box {
          background: #fff;
          .img_content {
            width: 100%;
            height: 7.1733rem;
            position: relative;
            text-align: center;
            .avatar_box {
              box-sizing: border-box;
              width: 5rem;
              height: 5rem;
              border-radius: 50%; // padding: 0.1rem;
              border: 0.1067rem solid #f1f1f1;
              position: absolute;
              margin: 1.4rem auto 0.5rem;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              .avatar {
                display: block;
                position: absolute;
                top: 0.15rem;
                left: 0.15rem;
                width: 4.5333rem;
                height: 4.5333rem;
                border-radius: 50%;
              }
              .friend_icon {
                width: 0.84rem;
                height: 0.84rem;
                position: absolute;
                bottom: 0;
                right: 0.8rem;
              }
            }
            .name {
              position: absolute;
              width: 100%;
              text-align: center;
              height: 0.6133rem;
              top: 6.7rem; // left: 3.4167rem;
              z-index: 1;
              font-size: 0.4533rem;
              font-weight: 700;
              color: #232323;
            }
          }
          .userInfo_wrapper {
            margin-top: 0.7133rem;
            padding-left: 0.4533rem;
            padding-bottom: 0.2667rem;
            .userBox {
              .username {
                text-align: left;
                text-indent: 0.375rem;
                font-size: 0.4rem;
                float: left;
                font-weight: 700;
                color: #ff7900;
                margin-right: 0.2rem;
              }
              .sex {
                float: left;
                display: inline-block;
                text-align: center;
                border-radius: 2px;
                color: #fff;
                margin-top: 0.04rem;
                margin-right: 0.2333rem;
              }
              .sex_male {
                width: 0.5233rem;
                height: 0.5033rem;
                margin-top: 0.12rem;
              }
              .sex_female {
                width: 0.5333rem;
                height: 0.5333rem;
              }
              .constellation {
                .userInfo(#c579ff);
              }
              .thumb {
                box-sizing: border-box;
                padding-top: 0.03rem;
                .userInfo(#61d78b);
                .thumb_samll {
                  width: 0.2933rem;
                  height: 0.2933rem;
                  position: absolute;
                  top: 0.12rem;
                  left: 0.15rem;
                }
              }
              .friend {
                box-sizing: border-box;
                padding-top: 0.03rem;
                .userInfo(#ffd800);
                .friend_samll {
                  width: 0.3733rem;
                  height: 0.3733rem;
                  vertical-align: -0.0267rem;
                }
              }
              .gift {
                box-sizing: border-box;
                padding-top: 0.04rem;
                .userInfo(#ee8232);
                .gift_small {
                  width: 0.2833rem;
                  height: 0.2833rem;
                  position: absolute;
                  top: 0.12rem;
                  left: 0.2rem;
                }
              }
            }
            .tag_wrapper {
              text-align: left;
              color: #666;
              font-family: "PingFang-SC-Medium";
              margin-top: 0.24rem;
              span {
                display: inline-block;
                padding: 0.0533rem 0.09rem;
                border: 1px solid #bebebe;
                border-radius: 0.0533rem;
                color: #a5a5a5;
                font-size: 0.32rem;
                margin-right: 0.1333rem;
              }
            }
            .signature_wrapper {
              margin-top: 0.3233rem;
              .word {
                color: #808080;
                text-align: left;
                font-size: 0.3467rem;
              }
            }
          }
        }
      }
    }
  }
  .title {
    text-align: center;
    padding: 0.11rem 0.7rem;
    margin-top: 0.1333rem;
    height: 1rem;
    .btn_box {
      .fri_btn {
        width: 2rem;
        text-align: center;
        height: 0.8533rem;
        line-height: 0.8533rem;
        border: 1px solid #eee;
        box-sizing: border-box;
        border-top-left-radius: 0.4267rem;
        border-bottom-left-radius: 0.4267rem;
        font-size: 0.4rem;
        position: relative;
        &.active {
          background: #ffd800;
          color: #fff;
          border: 1px solid #ffd800;
        }
        .dot {
          .dot(-0.1rem, -0.1rem);
        }
      }
      .hello_btn {
        width: 2.2rem;
        text-align: center;
        height: 0.8533rem;
        line-height: 0.8533rem;
        box-sizing: border-box;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        font-size: 0.4rem;
        position: relative;
        &.active {
          background: #ffd800;
          color: #fff;
          border-top: 1px solid #ffd800;
          border-bottom: 1px solid #ffd800;
        }
        .dot {
          .dot(-0.1rem, -0.1rem);
        }
      }
      .fenShen {
        width: 1.5rem;
        text-align: center;
        height: 0.8533rem;
        line-height: 0.8533rem;
        box-sizing: border-box;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        font-size: 0.4rem;
        position: relative;
        &.active {
          background: #ffd800;
          color: #fff;
          border-top: 1px solid #ffd800;
          border-bottom: 1px solid #ffd800;
        }
        .dot {
          .dot(-0.1rem, -0.1rem);
        }
      }
      .system_btn {
        width: 2rem;
        text-align: center;
        height: 0.8533rem;
        line-height: 0.8533rem;
        box-sizing: border-box;
        border: 1px solid #eee;
        border-top-right-radius: 0.4267rem;
        border-bottom-right-radius: 0.4267rem;
        font-size: 0.4rem;
        position: relative;
        &.active {
          background: #ffd800;
          color: #fff;
          border: 1px solid #ffd800;
        }
        .dot {
          .dot(-0.1rem, -0.1rem);
        }
      }
    }
    .dot {
      .dot(0.2rem, 0.8rem);
    }
    span {
      display: inline-block;
      width: 4rem;
      height: 1.25rem;
      line-height: 1.25rem;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 10px;
    }
    .vux-button-group>a {
      color: #666;
    }
    .vux-button-group>a.vux-button-group-current {
      color: #fff;
    }
  }
  .message_wrapper {
    width: 100%;
    flex-grow: 1;
    .cashier_stream-wrapper{
      height: 9rem;
      position: relative;
      z-index: 3;
      .cashier_stream_title {
        height: 1rem;
        line-height: 1rem;
        display: flex;
        .title_name {
          width: 20%;
          text-align: center;
        }
      }
      .cashier_stream_detail {
        // height: 8rem;
        flex: 1;
        .stream_detail_item {
          display: flex;
          margin-bottom: 0.1333rem;
          .detail_name {
            display: inline-block;
            width: 20%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
          }
          .headUrl {
            width: 0.5333rem;
            height: 0.5333rem;
          }
        }
      }
      .cashier_stream-close{
        z-index: 9999;
        position: absolute;
        bottom: -2rem;
        left: 50%;
        width: 1rem;
        height: 1rem;
        transform: translateX(-50%);
      }
    }
    .message_list {
      // height: 100%;
      padding: 0 0.2667rem;
      .dot {
        .dot(0.1333rem, 0.4267rem);
      }
      .item {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        height: 1.8133rem; // .border-1px(#ccc);
        padding-bottom: 6px;
        margin-bottom: 8px;
        .info_message {
          display: flex;
          font-size: 12px;
          .avatar {
            margin-right: 6px;
            width: 1.4133rem;
            height: 1.4133rem;
            position: relative;
            img {
              width: 1.4133rem;
              height: 1.4133rem;
              border-radius: 10%;
            }
            .dot {
              .dot(0, 0);
            }
          }
          .name_and_message {
            box-sizing: border-box;
            padding-left: 0.3233rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            .discount-pay {
              position: absolute;
              top: 0.4rem;
              right: -4rem;
              background: red;
              color: #fff;
              padding: 0.08rem 0.2333rem;
              border: none;
              border-radius: 4px;
              font-size: 14px;
              border: 1px solid red;
            }
            .noDiscount-pay {
              position: absolute;
              top: 0.4rem;
              right: -6rem;
              background: #fff;
              color: red;
              border: none;
              border: 1px solid red;
              border-radius: 4px;
              padding: 0.08rem 0.2333rem;
              font-size: 14px;
            }
            .time {
              position: absolute;
              right: .1rem;
              top: .1rem;
              font-size: 0.3733rem;
              color: #999;
            }
            .personStatus {
              width: 4rem;
              display: flex;
              .name {
                color: #333333;
                font-size: 0.4267rem;
                font-weight: 800; // width: 3rem;
                margin-right: .05rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .sex-icon {
                margin-top: .05rem;
                width: .4rem;
                height: .4rem;
              }
              .online_dot {
                width: 0.4rem;
                height: .4rem;
                margin-top: .1rem;
                font-weight: 600;
              }
              .friendStatus {
                display: inline-block;
                width: 1.4rem;
                color: #333;
                font-size: 15px;
              }
              .roomNum {
                color: #333;
                z-index: 2;
                display: inline-block;
                height: .3rem;
                line-height: .3rem;
                font-size: 11px;
                width: 1rem;
                margin-top: .1rem;
                color: red;
              }
            }
            .message {
              color: #666;
              width: 4rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              height: 0.6667rem;
              font-size: 0.3467rem;
              margin-top: 0.4rem;
              text-align: left;
            }
            .captainMessage {
              color: #333;
              width: 7rem;
              overflow: hidden;
              height: 0.6667rem;
              font-size: 14px;
              text-align: left;
              font-weight: 800;
              position: relative;
              .time {
                position: absolute;
                color: #666;
                font-size: 12px;
              }
            }
          }
        }
        .info_time {
          margin-right: 0.4rem;
          margin-top: 0.1rem;
          font-size: 0.3733rem;
          color: #999;
          position: relative;
        }
        .handle-wrapper {
          display: flex;
          justify-content: flex-end;
          .del {
            padding: 0.1067rem 0.1867rem;
            background-color: #B5B5B5;
            color: #fff;
            border-radius: 0.1333rem
          }
          .lookUp {
            margin-left: 0.6rem;
            padding: 0.1067rem 0.1867rem;
            background-color: #FFD800;
            color: #fff;
            border-radius: 0.1333rem
          }
        }
        .deleteBtn {
          position: absolute;
          right: 0.2667rem;
          bottom: 0.2667rem
        }
      }
      .noContent {
        width: 100%;
        text-align: center;
        margin-top: 50%;
        color: #ccc;
        font-size: 0.5333rem;
      }
    }
    .noFriend {
      width: 100%;
      text-align: center;
      margin-top: 50%;
      color: #ccc;
      font-size: 0.5333rem;
    }
    .newMessage_list {
      position: relative;
      .item {
        position: relative; // display: flex;
        // justify-content: space-between;
        box-sizing: border-box;
        box-sizing: border-box;
        padding-top: 0.1867rem;
        padding-left: 0.2667rem;
        margin-bottom: 8px;
        .blank {
          padding-bottom: 6px;
          display: flex;
          justify-content: space-between;
        }
        .info_message {
          width: 52%;
          display: flex;
          font-size: 12px;
          .avatar {
            margin-right: 6px;
            width: 1.4133rem;
            height: 1.4133rem;
            position: relative;
            img {
              width: 1.4133rem;
              height: 1.4133rem;
              border-radius: 10%;
            }
            .dot {
              .dot(0, 0);
            }
          }
          .name_and_message {
            box-sizing: border-box;
            padding-left: 0.3233rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .name {
              color: #333333;
              font-size: 0.4267rem;
              font-weight: 800;
              width: 3rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .message {
              width: 5rem;
              color: #666; // height: 0.6667rem;
              font-size: 0.3467rem;
              margin-top: 0.2rem;
              overflow: hidden; // text-overflow: ellipsis;
              // white-space: nowrap;
            }
          }
        }
        .thumb_wrapper {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .backThumbBox {
            display: flex;
            justify-content: flex-end;
            padding-right: 0.2633rem;
          }
          .back_thumb {
            box-sizing: border-box;
            display: inline-block;
            width: 1.3333rem;
            padding: 0.0567rem 0;
            text-align: center; // .border-1px(@baseColor);
            font-size: 0.3467rem;
            color: #999;
            border-radius: 0.2667rem;
            margin-right: 0.1rem;
          }
          .reject {
            margin-right: 0.1rem;
            margin-left: .1rem
          }
          .time {
            font-size: 0.3733rem;
            color: #999;
            padding-right: 0.2667rem;
          }
        }
        .checkBox_scene {
          position: absolute;
          right: 3.2rem;
          top: .3rem;
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
        } // }
      }
    } // }
    .noContent {
      width: 100%;
      text-align: center;
      margin-top: 50%;
      color: #ccc;
      font-size: 0.5333rem;
    }
    .qrCode_wrapper {
      position: fixed;
      bottom: 1.2rem; // bottom: 0;
      width: 100%;
      height: 5.3333rem;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      background-color: rgba(0, 0, 0, .4);
      padding: .2rem 0;
      z-index: 1;
      .close {
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: .2rem;
        right: .1rem;
        z-index: 9;
      }
      .qrCode_text {
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 12px;
      }
      .qrcodeImg {
        width: 4rem;
        height: 4rem;
        margin: .2rem 0;
      }
    }
  }
  .vux-1px:before {
    border-radius: 0.2667rem;
    border: 1px solid @baseColor;
  }
  .vux-tab .vux-tab-item.vux-tab-selected {
    color: #333;
  }
  .vux-button-group>a {
    height: 0.8533rem;
  }
</style>
