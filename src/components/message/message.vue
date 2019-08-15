<template>
  <div id="message" class="message_wrapper">
    <div class="mask" v-if="showFriendInfoFlag">
      <img @click="close" src="../../assets/image/close.png" class="close" alt="">
    </div>
    <div class="title">
      <div class="btn_box clearfix">
        <div :class="{active:isShowTab==0}" class="fri_btn fl" @click="selectList(0)">好友</div>
        <div :class="{active:isShowTab==1}" class="hello_btn fl" @click="selectList(1)">新朋友<i class="dot" v-show="mutualEventsList.length"></i></div>
        <div :class="{active:isShowTab==2}" class="vux-1px-l hello_btn fl" @click="selectList(2)"><i class="dot" v-show="client_badgeCount"></i>{{clientTitleFlag?"值班客服":"用户留言"}}</div>
        <!-- <div :class="{active:isShowTab==3}" class="vux-1px-l hello_btn fl" @click="selectList(3)">通知<i class="dot" v-show="friendGiftList.length"></i></div> -->
        <div :class="{active:isShowTab==3}" class="system_btn fl" @click="selectList(3)">通知<i class="dot" v-show="friendEvtList.length"></i></div>
      </div>
      <!-- <div class="dot" v-if="hello"></div> -->
    </div>
    <div class="message_content">
      <!-- 好友 -->
      <div class="message_list"  v-if="isShowTab==0">
      <scroll :data='alreadyFriendList'>
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
                <p class="name">{{item.info.nickname}}</p>
                <p class="message" v-if="item.info.lastMsg?item.info.lastMsg.type===1:''" v-html='item.info.lastMsg?item.info.lastMsg.content:""'></p>
                <p class="message" v-else-if="item.info.lastMsg?item.info.lastMsg.type===2:''">[图片]</p>
                <p class="message" v-else-if="item.info.lastMsg?item.info.lastMsg.type===3:''">约战，送礼信息</p>
                <p class="message" v-else></p>
              </div>
            </div>
            <div class="info_time">
              <p>{{item.info.lastMsg?item.info.lastMsg.stime.slice(8,10)==today?item.info.lastMsg.stime.slice(10,16):item.info.lastMsg.stime.slice(5,10):""}}</p>
              <img src="../../assets/image/dot_green.png" v-if="item.info.onlineDiceServer || item.info.onlineL98Server" class="online_dot">
              <span v-if="item.info.onlineDiceServer || item.info.onlineL98Server" class="friendStatus">{{item.isInDoor?"店内":"店外"}}</span>
              <span v-if="item.info.deskCode && (item.info.onlineDiceServer || item.info.onlineL98Server)" class="roomNum">{{`${item.info.deskCode}`}}</span>
            </div>
          </li>
        </ul>
      </scroll>
      <p v-if="!alreadyFriendList.length" class="noFriend">暂无好友</p>
      <div v-if="!userInfo.isSubscribe && isShowQrCode" class="qrCode_wrapper">
        <img onclick="return false" @click="closeQrCode"  class="close" src="../../assets/image/close.png" alt="">
        <p class="qrCode_text">长按关注，以便收到好友消息!</p>
        <img :src="qrCode" alt="" class="qrcodeImg">
        <p class="qrCode_text">关注享有会员特权:领福利、交群友</p>
      </div>
      </div>
      <!-- 新朋友 -->
      <div class="newMessage_list" v-else-if="isShowTab===1">
        <scroll :data='mutualEventsList'>
          <ul>
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
                <div class="checkBox_scene clearfix" v-show="item.integral">
                  <input @change="onlineSendGift" type="checkbox" class="checkbox fl" :checked='isMakeFriendBool'>
                  <span class="scene-text fl">加好友</span>
                </div>
              </div>
            </li>
          </ul>
          <p v-if="!mutualEventsList.length" class="noContent">暂无新朋友消息</p>
        </scroll>
        <div v-if="!userInfo.isSubscribe && isShowQrCode" class="qrCode_wrapper">
          <img onclick="return false" @click="closeQrCode" class="close" src="../../assets/image/close.png" alt="">
          <p class="qrCode_text">长按关注，以便收到好友消息!</p>
          <img  :src="qrCode" alt="" class="qrcodeImg">
          <p class="qrCode_text">关注享有会员特权:领福利、交群友</p>
        </div>
      </div>
      <!-- 客服通知 -->
      <srcoll :data="clientServiceList" v-else-if="isShowTab===2">
        <ul v-if="isClientListFlag"  class="message_list">
          <li class="item vux-1px-b" @click="ChatToClient" >
            <div class="info_message">
              <div class="avatar">
                <img :src="clientImg" alt="">
                <i class="dot" v-cloak v-show="clientObj.unReadMsgCount && client_badgeCount"></i>
              </div>
              <div class="name_and_message">
                <p class="name">客服小哥</p>
                <p class="captainMessage">欢迎光临! 请留言，我将尽快回复您</p>
                <p class="time"> {{clientObj.lastMsg?clientObj.lastMsg.stime.slice(8,10)==today?clientObj.lastMsg.stime.slice(10,16):clientObj.lastMsg.stime.slice(5,10):""}}</p>
              </div>
            </div>
          </li>
        </ul>
        <ul v-else class="message_list">
          <li class="item vux-1px-b" @click="clientChat(item)" v-for="(item,index) in clientServiceList" :key="index">
            <div class="info_message">
              <div class="avatar">
                <img :src="item.headimgurl?item.headimgurl:clientImg" alt="">
                <i class="dot" v-cloak v-show="item.unReadMsgCount && client_badgeCount"></i>
              </div>
              <div class="name_and_message">
                <p class="name">{{item.nickname?item.nickname:"客服小哥"}}</p>
                <p class="captainMessage">{{userInfo.role?"请查看用户留言消息":"欢迎光临! 请留言，我将尽快回复您"}}</p>
                <p class="time"> {{item.lastMsg?item.lastMsg.stime.slice(8,10)==today?item.lastMsg.stime.slice(10,16):item.lastMsg.stime.slice(5,10):""}}</p>
                <img src="../../assets/image/dot_green.png" v-if="item.onlineDiceServer || item.onlineL98Server" class="online_dot">
                <span v-if="item.onlineDiceServer || item.onlineL98Server" class="friendStatus">{{item.isIndoor?"店内":"店外"}}</span>
                <span v-if="item.deskCode && (item.onlineDiceServer || item.onlineL98Server)" class="roomNum" >{{`${item.deskCode}`}}</span>
              </div>
            </div>
          </li>
          <p v-show="!clientServiceList.length" class="noContent">未有访客留言</p>
        </ul>
     
      </srcoll>
      <!-- 通知 -->
      <scroll :data="captainMessageList" v-else-if="isShowTab==3">
        <ul class="message_list" style="margin-top:0.4rem" >
          <li class="item vux-1px-b" v-for="(item,index) in captainMessageList" :key="index" @click="gotoActivity(item.activityInfo)">
            <div class="info_message">
              <div class="avatar">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966911743&di=b3b81acff7cdc59f21ec7cbde8b13298&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110928%2F0017030291764688_b.jpg" alt="">
              </div>
              <div class="name_and_message">
                <p class="name">店长</p>
                <p class="captainMessage">活动通知:{{item.activityInfo.name}}>时间:{{item.activityInfo.startTime}}</p>
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
        isShowQrCode:true,
        isClientListFlag:false,
        clientTitleFlag:false,
        clientObj:{},
        customerObj:{},
        clientImg: require("../../assets/image/home_letter.png"),
        color: "#ffd800",
        hello: false,
        isShowTab: 2, //最上面tab切换
        selected_num: 0,
        greeting_flag: 0,
        text: "", //回赞和拒绝文案
        mutualEventsList: [],
        position: "default",
        thumb_flag: true, //回赞的box的flag
        showPositionValue: false, //回赞的toast的flag
        isMakeFriendBool: true,
        friendInfo: {},
        showFriendInfoFlag: false,
        sign: "爱情陷阱",
        clientServiceList: []
      };
    },
    //路由判断，判断是从导航栏进入消息页面还是从店长信箱进入消息页面
    beforeRouteEnter(to, from, next) {
      console.log("to",to)
      console.log("from",from)
      if (to.params.routeParamNum === 1) {
        next(vm => {
          vm.isShowTab = 1;
        });
      }else if (from.name === "shareActivity") {
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
      } 
       else {
        next(vm => {
          vm.isShowTab = 2;
        });
      }
    },
    beforeRouteUpdate(to, from, next) {
      console.log("beforeRouteUpdate---------",from)
      if (from.name === "clientChat") {
        this.loadClientServiceList()
      }
      next()
    },
    computed: {
      ...mapState([
        "friendEvtList",
        "alreadyFriendList",
        "staticChatFriendObj",
        "LastChatMsg",
        "friendGiftList",
        "captainMessageList",
        "challengeGameList",
        "manualEventsList_badgeCount",
        "userInfo",
        "client_badgeCount",
        "qrCode"
      ]),
      messageTime() {
        return
      }
    },
    created() {
      this.today = new Date().getDate();
      // console.log(this.today);
      if (this.today < 10) {
        this.today = "0" + this.today;
      } else {
        this.today = this.today.toString();
      }
  
    },
    mounted() {
      console.log("mounted--------")
      this._loadFriends(); //拉取好友
      this._loadMutualEvents(); //拉取送礼，约战，
      this.getCaptainMessList(); //获取店长信  
      this.loadClientServiceList() //加载客服列表  
      // this.isShowTab = this.getQueryString("routeParamNum")
      this.isShowQrCode = localStorage.getItem("isShowQrCode")==="false"?false:true
     
    },
    destroyed() {
      // console.log("组件销毁");
    },
    methods: {
      closeQrCode(){
        this.isShowQrCode = false
        localStorage.setItem("isShowQrCode",false)
      },
      //进入活动详情
      gotoActivity(activetyInfo){
        this.$router.push({
          name: "shareActivity",
          params: {
            id: activetyInfo.activityID
          }
        });
      },
      getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
      },
      //加载客服列表
      loadClientServiceList() {
        let phone = this.userInfo.phone ? this.userInfo.phone : "7777"
        var unReadCount = 0;
        api.loadClientServiceList(phone).then(res => {
          console.log("客服----------------",res)
          if(res.CliSerID && !res.uerInfos){
            this.isClientListFlag = true
            this.clientTitleFlag = true
            this.clientObj = res
            unReadCount = this.clientObj.unReadMsgCount
            this.clientObj.lastMsg.stime =util.timestampToTime(res.lastMsg.stime)
          }else{
            this.customerObj = res
            var tempArr = res.uerInfos
            if(tempArr.length>0){
              tempArr.forEach((client,index) => {
                unReadCount += client.unReadMsgCount
                if(client.lastMsg){
                  client["stime"] = client.lastMsg.stime
                  client.lastMsg.stime = util.timestampToTime(client.lastMsg.stime)
                }
                if(client.deskCode!=0 && client.deskCode){
                  client.deskCode = util.prefixZero(client.deskCode,3)
                }
                if(client.unReadMsgCount>0){  //把未读消息放到数组前面
                  var item = tempArr.splice(index,1)
                  tempArr.unshift(item[0])
                }
              })
              this.clientServiceList = tempArr.sort(util.sortByKey("stime"))
              console.log("客服列表-------------", this.clientServiceList)
            }
          }
              this.getClientUnreadCount(unReadCount)
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
        // this.mutualEventsList.splice(index,1)
        this._loadFriends();
        // this.addBandge();
        //重新拉取约战，送礼，点赞列表
        this._loadMutualEvents();
      },
      //勾选是否加好友
      onlineSendGift(e) {
        console.log(e.target.checked)
        this.isMakeFriendBool = e.target.checked
      },
      selectList(index) {
        console.log("index--------",index)
        this.isShowTab = index;
        console.log("this.isShowTab--------",this.isShowTab)
      },
      //拉取约战、点赞、送礼列表
      _loadMutualEvents() {
        api.loadMutualEvents().then(res => {
          if (res.errCode === 0) {
            let mutualEventsObj = res.mutualEvents;
            let tempEventList = [];
            console.log("mutualEventsObj------------", mutualEventsObj);
            this.mutualEventsList = []; //先清空
            tempEventList = tempEventList.concat(mutualEventsObj.combatsEvents)
            tempEventList = tempEventList.concat(mutualEventsObj.giftEvents)
            tempEventList = tempEventList.concat(mutualEventsObj.friendEvents)
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
        console.log('giftInfo----------------', giftInfo)
        let giftType = giftInfo.integral ? 1 : 0;
        let giftParam = {
          agree: flag, //是否接受
          recordID: giftInfo.giftRecordID, //送礼记录ID
          fromID: giftInfo.from.openid, //赠送者
          respondType: giftType, //记录的礼物类型  0是虚拟礼物、1是店长推荐和商城礼品
          isMakeFriend: this.isMakeFriendBool,
        }
        api.respondForGift(giftParam).then(res => {
          console.log('送礼操作结果-------------------', res);
          if (res.errCode == 0) {
            this.removeEventList()
            if (flag) {
              this.text = "已感谢";
            } else {
              this.text = "已拒接";
            }
            //重新拉取约战，送礼，点赞列表
            // this._loadMutualEvents();
            this.showPositionValue = true;
          }
        })
      },
      //回赞事件
      backThumbClick(index, type, flag, fromInfo) {
        console.log(fromInfo)
        this.fromUserInfo = fromInfo
        api.giveBackThumb(type, flag).then(res => {
          console.log("回赞事件----------", res);
          if (res.errCode === 0) {
            this.setChatFriend(fromInfo)
            //重新拉取已经成为好友列表
            this.removeEventList()
            console.log("jinlaile")
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
          console.log(res)
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
          console.log('拒接结果-----------', res);
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
          console.log('删除结果-----------', res);
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
        console.log(index);
      },
      //向客服发消息
      ChatToClient(){
        this.clientObj["openid"] = this.clientObj.CliSerID
        this.setChatFriend(this.clientObj);
         this.$router.push({
          name: "clientChat",
          params: {
            isClient: false,
          }
        });
      },
      //向留言用户发消息
      clientChat(client) {
        client["CliSerID"] = this.customerObj.CliSerID
        this.setChatFriend(client);
        console.log("向留言用户发消息 client-------------",client)
        this.$router.push({
          name: "clientChat",
          params: {
            isClient: true,
          }
        });
      },
      //发起好友聊天
      chat(item) {
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
        chanageFriendPanelFlag: "CHANGEFRIENDPANELFLAG", //显示好友匹配成功弹框
        CalcManualEventsCount: "GET_ALLEVENTS_BADGECOUNT", //统计约战送礼点赞数量
        setChatFriend: "SET_CHAT_FRIEND", //全局设置聊天对象的信息
        compareLastMsg: "COMPARE_LASTMESS", //推送最后的一个消息跟已有好友消息列表对比
        toTopFriend: "TO_TOP_MESSAGE", //把最新消息的置顶
        //getChallengeGamelist: "GET_CHALLENGEGAMELIST", //更新新增约战列表
        // clearChallengeGameList: "CLEAR_CHALLENGEGAMELIST",//清空约战记录
        addBandge: "ADD_BADGE", //动态变化未读消息数量
        getClientUnreadCount: "GETCLIENTUNREADCOUNT", //客服未读消息数量
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
        // console.log('在消息列表收到对方手来的消息------------------------------------：',newValue);
        // this.compareLastMsg(newValue);
        //把最新的一条消息放到最顶部
        let tempAlreadyFriendList = [];
        this.alreadyFriendList.forEach((element, index) => {
          // console.log(element);
          if (newValue.lastMsg.from == element.info.openid) {
            tempAlreadyFriendList.unshift(element);
          } else {
            tempAlreadyFriendList.push(element);
          }
        });
        this.toTopFriend(tempAlreadyFriendList)
        // console.log(tempAlreadyFriendList)
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
      Scroll
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
              z-index: 10000;
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
    padding: 0.11rem 0.6125rem;
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
  .message_content {
    width: 100%;
    flex-grow: 1;
    overflow-y: auto;
    // position: relative;
    .list-wrapper{
    position: relative;

    }
    .message_list {
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
              border-radius: 50%;
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
            .time{
              position: absolute;
              right: .1rem;
              top: .1rem;
              font-size: 0.3733rem;
              color: #999;
            }
           .online_dot{
            width: 0.4rem;
            position: absolute;
            bottom: 0.48rem;
            right: 1.8rem;
            color: #333;
            font-weight: 600;
          }
          .friendStatus {
            display: inline-block;
            width: 1.4rem;
            position: absolute;
            bottom: 0.5rem;
            color: #333;
            right: 0.3rem;
            font-size: 15px;
          }
          .roomNum{
            position: absolute;
            bottom: 0.55rem;
            color: #333;
            right: 0rem;
            display: inline-block;
            padding: 0rem 0.1067rem;
            line-height: .3rem;;
            border: 1px solid #333;
            font-size: 11px;
          }
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
              color: #666;
              width: 7rem;
              overflow: hidden; // text-overflow: ellipsis;
              // white-space: nowrap;
              height: 0.6667rem;
              font-size: 0.3467rem;
              margin-top: 0.4rem;
              text-align: left;
            }
          }
        }
        .info_time {
          // padding-top: 0.3333rem;
          margin-right: 0.4rem;
          margin-top: 0.1rem;
          font-size: 0.3733rem;
          color: #999;
          position: relative;
          .online_dot{
            width: 0.4rem;
            position: absolute;
            bottom: 0.48rem;
            right: 1.8rem;
            color: #333;
            font-weight: 600;
          }
          .friendStatus {
            display: inline-block;
            width: 1.4rem;
            position: absolute;
            bottom: 0.5rem;
            color: #333;
            right: 0.3rem;
            font-size: 15px;
          }
          .roomNum{
            position: absolute;
            bottom: 0.55rem;
            color: #333;
            right: 0rem;
            display: inline-block;
            padding: 0rem 0.1067rem;
            line-height: .3rem;;
            border: 1px solid #333;
            font-size: 11px;
          }
          .deleteBtn {
            position: absolute;
            right: 0.2667rem;
            bottom: 0.2667rem
          }
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
    .noFriend{
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
              border-radius: 50%;
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
            .captainMessage {}
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
    .qrCode_wrapper{
      position: fixed;
      bottom: 1.2rem;
      // bottom: 0;
      width: 100%;
      height: 5.3333rem;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      background-color: rgba(0, 0, 0, .4);
      padding: .2rem 0;
      .close{
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: .2rem;
        right: .1rem;
        z-index: 9;
      }
      .qrCode_text{
        width: 100%;
        text-align: center;
        color: #fff;
      }
      .qrcodeImg{
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
