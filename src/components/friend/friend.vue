<template>
  <div id="friend" class="friend">
    <div class="nav">
      <img onclick="return false" src="../../assets/image/select.png" alt @click="showToast=true">
      <img onclick="return false" src="../../assets/image/setting.png" alt @click="intoSetting">
    </div>
    <div class="stack-wrapper">
      <div v-show="isFirstLoad">
        <p class="intro_mfTips">绿灯闪烁表示好友在线哦，红灯表示离线</p>
        <img src="../../assets/image/arrow left.png" alt class="arrow_left">
        <img src="../../assets/image/Arrow Right.png" alt class="arrow_right">
        <p class="arrow_desc">左右滑动可换人,右滑表示喜欢哦</p>
      </div>
      <!-- 相册··················································begin -->
      <!-- 相册··················································end -->
      <stack ref="stack" :pages="someList" :visible="visible" :currentIndex="currentPage"
       @getMoreFriend="sonGetMoreFriend" 
       @heartBeat="thumbHeartBeat" 
       @showAblum="showAblum" 
       @firstData="listenFirstdata"
       >
       暂时没有好友</stack>
      <div class="loading-container" v-show="!someList.length">
        <loading></loading>
      </div>
    </div>
    <div class="control_wrapper">
      <!-- <p class="control_guide" v-show="isFirstLoad">互赞成为好友。
                        <br>下面分别是送礼、点赞、约Ta玩大话骰
                      </p> -->
      <div class="gifts">
        <img onclick="return false" src="../../assets/image/gift.png" @click="isGiftPanel=true" alt>
        <img onclick="return false" src="../../assets/image/gift.png" v-show="isFirstLoad" class="guideGift" alt>
        <p class="handleText" v-show="isFirstLoad">送礼成好友</p>
        <!-- <p>见面礼</p> -->
      </div>
      <!--  -->
      <div class="thumbs" v-if="!isFriend" >
        <img onclick="return false" ref="thumbHeartBeat" src="../../assets/image/thumbs-o-up.png" @click="giveThumb('middle')" alt>
        <img onclick="return false" src="../../assets/image/thumbs-o-up.png" v-show="isFirstLoad" class="guideThumbs" alt>
        <p class="handleText" v-show="isFirstLoad">互赞成好友</p>
      </div>
      <div class="hello" v-else>
        <img onclick="return false" src="../../assets/image/sayhi.png" @click="chat" alt>
        <img onclick="return false" src="../../assets/image/thumbs-o-up.png" v-show="isFirstLoad" class="guideThumbs" alt>
        <p class="handleText" v-show="isFirstLoad">互赞成好友</p>
      </div>
      <div class="playGame">
        <img onclick="return false" src="../../assets/image/game.png" @click="playGame" alt>
        <img onclick="return false" src="../../assets/image/game.png" v-show="isFirstLoad" class="guidePlayGame" alt>
        <p class="handleText" v-show="isFirstLoad">约战大话骰</p>
        <!-- <p>玩一把</p> -->
      </div>
    </div>
    <!-- 筛选好友信息 -->
    <div v-transfer-dom>
      <x-dialog v-model="showToast" class="dialog-demo">
        <div class="select_wrapper">
          <img onclick="return false" src="../../assets/image/close.png" alt class="close" @click="cancel">
          <p class="select_title">条件筛选</p>
          <div class="sex_wrapper">
            <h3>性别:</h3>
            <ul class="sex_list">
              <li @click="chooseSex(item.id)" :class="{active:sexType == index}" v-for="(item,index) in sexArr" :key="index">
                <span>{{item.name}}</span>
              </li>
            </ul>
          </div>
          <div class="dis_wrapper">
            <h3>范围:</h3>
            <ul class="dis_list">
              <li @click="chooseRange(item.id)" :class="{active:rangeType == index}" v-for="(item,index) in rangeArr" :key="index">{{item.name}}</li>
            </ul>
          </div>
          <div class="dis_wrapper">
            <h3>等级:</h3>
            <ul class="dis_list">
              <li @click="chooseDegree(item.id,index)" :class="{active:currentSortIndex == index}" v-for="(item,index) in rankList" :key="index">{{item.name}}</li>
            </ul>
          </div>
          <p class="confirm" @click="getSortedFriend">确定</p>
        </div>
      </x-dialog>
    </div>
    <!-- 点赞 -->
    <toast v-model="showPositionValue" type="text" :time="2000" is-show-mask width="10em" :text="text" :position="position"></toast>
    <!-- 引导背景 v-show="userInfo.firstLoadisFirstLoad" -->
    <div class="guide_bg" v-show="isFirstLoad" @click="isFirstLoad=false">
      <img onclick="return false" class="thumb" src="../../assets/image/thumb.png" alt>
      <p class="intro">完善资料送福利，每天推3名星座匹配群友</p>
    </div>
    <keep-alive>
      <topUp v-show="isGiftPanel" @closeIntegralPanel="closeIntegralPanel" :isInDoor="isInDoor" :friendId="friendId" :fatherPanelIndex="fatherPanelIndex"></topUp>
    </keep-alive>
    <qrCode v-show="qrIsShow" title="您还不是会员,关注享有会员特权"></qrCode>
    <transition name="appear">
      <envelope v-show="isShowEnvelope" :text="envelopeText"></envelope>
    </transition>
    <keep-alive>
      <lifePhote v-show="showAblumFlag" @closeAlbum="closeAlbum"></lifePhote>
    </keep-alive>
    <router-view></router-view>
  </div>
</template>
<script>
  import stack from "./tantan/tantan.vue";
  import loading from "../../base/loading/loading";
  import envelope from 'base/envelope/envelope';
  import topUp from 'base/topUp/topUp';
  import qrCode from 'base/qrCode/qrCode';
  import util from "common/util";
  import api from "common/api";
  import Bus from 'common/bus.js'
  import lifePhote from './personalInfo/personalInfo'
  import {mapState,mapActions,mapMutations,mapGetters} from "vuex";
  import {Toast,TransferDom,Popup,XDialog,XButton,Scroller} from "vux";
  export default {
    // el: "#stack",
    directives: {
      TransferDom
    },
    data() {
      
      return {
        isAlreadyFriend:false,  
        imgs: [{
            url: 'http://covteam.u.qiniudn.com/ka2.jpg',
            title: 'pic1'
          },
          {
            url: 'http://covteam.u.qiniudn.com/poster.png',
            title: 'pic2'
          }
        ],
        showAblumFlag:false,//展示生活照
        sortType: 0, //排序类型
        currentSortIndex:null,
        sexType: 0, //性别类型
        rangeType: 0, //店内外类型
        fatherPanelIndex: 1,
        showToast_gift: false,
        text: "",
        envelopeText: "",
        isFriend: null,
        position: "default",
        showPositionValue: false,
        isShowEnvelope: false,
        personShow: false,
        showFriendList: false,
        showToast: false,
        show_mask: true,
        isFirstLoad: false,
        friendOnlineStatus: false,
        isIntegralPanel: false, //面板显示状态
        isGiftPanel: false, //礼物面板状态
        isInDoor: false, //好友是否在线
        sexArr: [{
            id: 0,
            name: "全部"
          },
          {
            id: 1,
            name: "男"
          },
          {
            id: 2,
            name: "女"
          }
        ],
        rangeArr: [{
            id: 0,
            name: "全部"
          },
          {
            id: 1,
            name: "店内"
          },
          {
            id: 2,
            name: "店外"
          }
        ],
        rankList: [
         {
            id: 1,
            name: "财富榜"
          },
          {
            id: 2,
            name: "战神榜"
          },
          {
            id: 3,
            name: "好友数"
          }
        ],
        someList: [],
        friendId: "",

          visible: 3,
          currentPage: 0,
      };
    },
    //路由判断，判断是场内还是场外1场内2场外
    // beforeRouteEnter(to, from, next) {
    //   console.log(to);
    //   if (to.query.id === "0") {
    //     next(vm => {
    //       console.log("loadFriendSexType-----------", vm.loadFriendSexType)
    //       let param = {
    //         mySex: Number(vm.loadFriendSexType),
    //         cursor: 0,
    //         sex: vm.sexType,
    //         range: vm.rangeType,
    //         sortType: vm.sortType
    //       }
    //       vm.getAllCommunityFriend(param)
    //     });
    //   }
    // },
    computed: {
      ...mapState(["friendList", "inAndOutFriendCursor", "friendListCursor", "giftList", "userInfo", "loadFriendSexType"]),
      ...mapGetters(["qrIsShow"]),
    },
    mounted() {
       let param = {
            mySex: Number(this.loadFriendSexType),
            cursor: 0,
            sex: this.sexType,
            range: this.rangeType,
            sortType: this.sortType
          }
          this.getAllCommunityFriend(param)
      console.log(this.friendList)
      if (this.userInfo.firstLoad) {
        this.isFirstLoad = true;
      } else {
        this.isFirstLoad = false;
      }
      this._clearFirstLoadTag(); //标识已经进入过公众号
      this._loadAllGift();
    },
    activated(){
      console.log("进入找朋友页面")
      console.log("好友列表--------------",this.someList)
      Bus.$on("changeFriendConnetion",(openid)=>{
        this.isFriend = true
       this.changeFriIcon(openid)
      })
    },
    methods: {
      //拉取候选人
      getAllCommunityFriend(params) {
        api.getFriendList(params).then(res => {
          console.log('拉取候选人：·····················', res);
          this.changeFriendCursor(res.cursor)
          this.getFriend(res)
        })
      },
      //监听礼物面板状态
      closeGiftPanel(flag) {
        this.isGiftPanel = flag;
      },
      //监听充值面板状态
      closeIntegralPanel(flag) {
        console.log('面板状态-----------', flag);
        this.isGiftPanel = flag;
      },
      //标识进入过公众号
      _clearFirstLoadTag() {
        if (!this.userInfo.firstLoad) {
          return;
        }
        api.clearFirstLoadTag().then(res => {
          console.log('标识进入过公众号---------------', res);
          this._getUserInfo();
        });
      },
      // 获取用户信息
      _getUserInfo() {
        api.getUserInfo().then(res => {
          console.log('个人信息-------------------------：', res);
          this.getuserInfo(res);
        }).catch(err => {
          console.log(err);
        });
      },
      //进入个人信息设置页面
      intoSetting() {
        this.$router.push({
          name: "individual"
        })
      },
      //拉取礼物
      _loadAllGift() {
        api.loadAllGift().then(res => {
          if (res.errCode === 0) {
            this.getGiftList(res.gifts);
          }
        })
      },
      //监听关闭相册
      closeAlbum(flag){
        console.log(flag);
        this.showAblumFlag = flag;
      },
      // 监听点击相册
      showAblum(data) {
        console.log('监听点击相册------------------------------：', data);
        this.showAblumFlag = true;
        this.changeUserLifeImgList(data.info.lifePhotoURL.lifePhotoURL);
        // this.$router.push({
        //   path: `/friend/${data.info.openid}`,
        // })
      },
      listenFirstdata(data) {
        // 下面是传回父级的数据;
        this.friendOnlineStatus = data.info.onlineL98Server; //好友在线状态
        console.log('滑动页面传回给父级数据：', data)
        let openId = data.info.openid;
        this.friendId = openId;
        // this.setChatFriend(data);
        this.friendInfo = data;
        this.isFriend = data.isAlreadyFriend;
        this.xid = openId;
        this.isInDoor = data.isInDoor;
      },
      //监听右滑心跳
      thumbHeartBeat(data){
        console.log("heartBeat--------------")
        console.log()
        this.$refs.thumbHeartBeat.className = "heartBeat"
        setTimeout(() => {
           this.$refs.thumbHeartBeat.className = ""
        }, 500);
      },
      //获取更多朋友
      sonGetMoreFriend() {
        console.log('触发获取更多的朋友');
        this.getMoreFriendList(this.friendListCursor, this.loadFriendSexType);
      },
      getMoreFriendList(cursor, sex) {
        let params = {
          mySex: Number(this.loadFriendSexType),
          cursor: this.friendListCursor,
          sex: this.sexType,
          range: this.rangeType,
          sortType: this.sortType
        }
        api.getFriendList(params).then(res => {
          if (res.cursor == 0) {
            this.changeFriendCursor(res.cursor);
            return false;
          }
          this.changeFriendCursor(res.cursor);
          this.MutationGetMoreFriendList(res.candidates);
        })
      },
      //点赞
      giveThumb(position) {
        // this.position = position;
        api.makeFriend(this.xid).then(res => {
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
      },
      //关闭礼物
      close_gift() {
        this.showToast_gift = false;
      },
      //发起聊天
      chat() {
        // util.routerTo("chat", this);
        this.$router.push({
          path: `/message/${this.friendId}`,
          query: this.friendInfo
        });
      },
      //玩游戏
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
          } else if (res.errCode == 1022) {
            this.isShowEnvelope = true;
            this.envelopeText = "该用户己离线，无法通知";
            setTimeout(() => {
              this.isShowEnvelope = false;
            }, 2000);
            return;
          }
        })
      },
      // 性别选择
      chooseSex(index) {
        this.sexType = index;
      },
      chooseRange(index) {
        this.rangeType = index;

      },
      chooseDegree(id,index) {
        this.sortType = id;
        this.currentSortIndex = index

      },
      getSortedFriend() {
        
        this.changeFriendCursor(0);
        this.currentPage++;
        this.visible = 3;
        let params = {
          mySex: Number(this.loadFriendSexType),
          cursor: this.friendListCursor,
          sex: this.sexType,
          range: this.rangeType,
          sortType: this.sortType
        }
        api.getFriendList(params).then(res => {
          console.log('拉取排序后的候选人：·····················', res);
          this.changeFriendCursor(res.cursor)
          this.getFriend(res)
          this.showToast = false;
        })
      },
      cancel(){
         this.showToast = false;
      },
      ...mapActions({
        // getFriendList: "get_Friendlist", //获取候选人
        // getMoreFriendList: "get_moreFriendList" //获取更多候选人
      }),
      ...mapMutations({
        changeFriIcon:"CHANGEFRIENDICON",//回赞后更改好友页面图标
        changeSexType: "CHANGESEXTYPE", //改变拉取候选人性别参数
        MutationGetMoreFriendList: "GET_MOREFRIENDlIST", //获取更多候选人
        getLessThan10friendList: "GET_LESSTHAN10FRIENDLIST", //获取少于10个候选人
        changeFriendCursor: "CHANGE_FRIENDlISTCURSOR", //改变游标
        showQrcode: "SHOW_QRCODE", //展示二维码
        setChatFriend: "SET_CHAT_FRIEND",
        getuserInfo: "GET_USERINFO", //获取用户信息
        getFriend: "GET_FRIENDlIST", //获取候选好友
        updateFriendCursor: "UPDATE_INANDOUT_FRIEND_CURSOR", //更新场内场外游标
        changeUserLifeImgList: "GET_LIFEIMG", //更改用户生活照
        getGiftList: "GET_GIFTLIST" //获取礼物
      })
    },
    watch: {
      friendList(newValue) {
        this.someList = newValue;
      },
    },
    components: {
      stack,
      Popup,
      Toast,
      XDialog,
      XButton,
      Scroller,
      loading,
      envelope,
      qrCode,
      topUp,
      lifePhote
    }
  };
</script>
<style scoped lang="less">
  @import "../../assets/less/variable.less";
  @import "../../assets/less/friend_common.less";
  @import "../../assets/less/mixin.less";
  .friend {
    height: 100%;
    background-color: #fff;
    background-image: url("../../assets/image/friend_bg.png");
    background-repeat: no-repeat;
    background-size: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .nav {
      display: flex;
      justify-content: space-between;
      flex-direction: row-reverse;
      padding: 0.09rem 0.3rem 0.1rem;
      box-sizing: border-box;
      .select {
        font-size: 13px;
        color: #ff7900;
        font-weight: 700;
      }
      img {
        width: 0.6667rem;
        height: 0.6667rem;
        margin-bottom: 0.08rem;
      }
    }
    .control_wrapper {
      // height: 5.625rem;
      display: flex;
      justify-content: space-between;
      padding: 0 1.6rem; // margin-top: -0.2667rem;
      box-sizing: border-box;
      position: relative;
       @keyframes bigAndSmall {
      0% {
        transform: scale(1); //  opacity: 1;
      }
      50% {
        transform: scale(1.6);
      }
      100% {
        transform: rotate(1);
      }
    }
      .control_guide {
        position: absolute;
        z-index: 9;
        color: #fff;
        font-size: 0.4rem;
        margin: 0 auto;
        bottom: 2.8333rem;
        text-align: center;
      }
      img {
        width: 1.6rem;
        height: 1.6rem;
        // .thumbs{
        //   }
      }
      .heartBeat{
        animation: bigAndSmall .3s linear 1;
      }
      .thumbs {
        position: relative;
        .guideThumbs {
          position: absolute;
          z-index: 10;
          top: 0.8667rem;
          left: 0;
        }
        .handleText {
          position: absolute;
          z-index: 99999;
          color: #fff;
          font-weight: 600;
          font-size: .4rem;
          top: .2rem;
          left: -.4rem;
          width: 2.3333rem;
        }
        .action();
      }
      .hello {
        position: relative;
        .handleText {
          position: absolute;
          z-index: 99999;
          color: #fff;
          font-weight: 600;
          font-size: .4rem;
          top: .2rem;
          left: -.4rem;
          width: 2.3333rem;
        }
        .guideThumbs {
          position: absolute;
          z-index: 10;
          top: 0.8667rem;
          left: 0;
        }
        .action();
      }
      .gifts {
        position: relative;
        .guideGift {
          position: absolute;
          z-index: 10;
          top: 0.8667rem;
          left: 0;
        }
        .handleText {
          position: absolute;
          z-index: 99999;
          color: #fff;
          font-weight: 600;
          font-size: .4rem;
          top: .2rem;
          left: -.4rem;
          width: 2.3333rem;
        }
        .action();
      }
      .playGame {
        position: relative;
        .handleText {
          position: absolute;
          z-index: 99999;
          color: #fff;
          font-weight: 600;
          font-size: .4rem;
          top: .2rem;
          left: -.4rem;
          width: 2.3333rem;
        }
        .guidePlayGame {
          position: absolute;
          z-index: 10;
          top: 0.8667rem;
          left: 0;
        }
        .action();
      }
    }
    .stack-wrapper {
      margin: 0.09rem auto 0; // padding:0 0.5rem;
      position: relative; // z-index: 1000;
      width: 8.9rem; // width: 100%;
      height: 10.5333rem;
      list-style: none;
      pointer-events: none;
      @keyframes leftMove {
        0% {
          transform: translateX(5px); //  opacity: 1;
        }
        50% {
          transform: translateX(10px);
        }
        100% {
          transform: translateX(5px);
        }
      }
      @keyframes rightMove {
        0% {
          transform: translateX(-5px); //  opacity: 1;
        }
        50% {
          transform: translateX(-10px);
        }
        100% {
          transform: translateX(-5px);
        }
      }
      .arrow_desc {
        width: 100%;
        text-align: center;
        font-size: .45rem;
        font-weight: 900;
        position: absolute;
        top: 3.8rem;
        z-index: 99;
        color: #fff;
      }
      .arrow_left {
        position: absolute;
        z-index: 99;
        top: 3.5rem;
        left: -.3rem;
        width: 1.3333rem;
        animation: leftMove 1s linear infinite;
      }
      .arrow_right {
        width: 1.3333rem;
        position: absolute;
        z-index: 99;
        top: 3.5rem;
        right: -.3rem;
        animation: rightMove 1s linear infinite;
      }
      .intro_mfTips {
        position: absolute;
        top: .4667rem;
        left: 1.6rem;
        color: #fff;
        font-size: 0.4rem;
        font-weight: 700;
        z-index: 10;
      }
      .ablum-wrapper {
        position: absolute;
        top: 100px;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 999999;
        background-color: rgba(0, 0, 0, 0.3);
        width: 100%;
        height: 4rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .loading-container {
        position: absolute;
        width: 100%;
        top: 50%; // transform: translateY(-50%);
      }
    }
    .guide_bg {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.3);
      .thumb {
        position: absolute;
        width: 0.8rem;
        top: 0.2667rem;
        left: 0.9933rem;
        animation: jump 1000ms linear 500ms infinite normal;
        @keyframes jump {
          10% {
            left: 0.9933rem;
          }
          50% {
            left: 0.9033rem;
          }
          100% {
            left: 0.9933rem;
          }
        }
      } // .close {
      //   position: absolute;
      //   width: 0.8rem;
      //   top: 0.2667rem;
      //   right: 0.3933rem;
      // }
      .intro {
        position: absolute;
        top: 0.4667rem;
        left: 2rem;
        color: #fff;
        font-size: 0.4rem;
        font-weight: 700;
      }
    }
  } // 弹框礼物
  // .friend_gift_wrapper {
  //   .gift_list {
  //     display: flex;
  //     justify-content: space-between;
  //     padding: 0 0.4rem;
  //     .item {
  //       img {
  //         width: 1.5rem;
  //         height: 1.5rem;
  //       }
  //       p {
  //       }
  //     }
  //   }
  // }
  //弹框选择
  .select_wrapper {
    width: 8rem;
    // height: 8.1rem;
    padding-bottom: 0.1867rem;
    .bg("../../assets/image/bg.png");
    position: relative; // padding: 0.625rem;
    .close {
      position: absolute;
      right: 0.1333rem;
      top: 0.1333rem;
      width: 0.52rem;
      height: 0.52rem;
    }
    .select_title {
      color: #fff;
      font-size: 16px; // font-weight: bold;
      padding-top: 0.5067rem;
    }
    .sex_wrapper {
      margin-top: 1rem;
      h3 {
        text-align: left;
        font-size: 14px;
        font-weight: 600;
        color: #333;
        text-indent: 0.5333rem;
        font-family: Arial, Helvetica, sans-serif;
      }
      .sex_list {
        display: flex;
        justify-content: flex-start;
        padding: 0.2133rem 0.625rem 0.3rem; // margin-left: 1.875rem;
        li {
          margin-right: 0.625rem;
          width: 1.7067rem;
          height: 0.6667rem;
          line-height: 0.6667rem;
          border-radius: 0.08rem;
          background: #eee; // padding: 0.1875rem;
          font-size: 0.3467rem;
          &.active {
            background-color: @baseColor;
            color: #fff;
          }
        }
      }
    }
    .dis_wrapper {
      h3 {
        text-align: left;
        text-indent: 0.5333rem;
        font-size: 14px;
        font-weight: 600;
        color: #333;
        font-family: Arial, Helvetica, sans-serif;
      }
      .dis_list {
        display: flex;
        justify-content: flex-start;
        padding: 0.2133rem 0.625rem 0.3rem; // margin-left: 1.875rem;
        li {
          margin-right: 0.625rem;
          width: 1.7067rem;
          height: 0.6667rem;
          line-height: 0.6667rem;
          border-radius: 0.08rem;
          background: #eee;
          font-size: 0.3467rem;
          &.active {
            background-color: @baseColor;
            color: #fff;
          }
        }
      }
    }
    .confirm {
      text-align: center;
      color: @baseColor;
      font-size: 0.4267rem;
      font-family: "PingFang-SC-Bold";
    }
    .cancel_btn {
      margin-right: 0.875rem;
    } // 送礼弹框
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
          img {
            width: 1.1333rem;
            height: 1.1333rem;
            &.flower {
              width: 1.0933rem;
              height: 1.16rem;
            }
            &.house {
              margin-top: 0.1667rem;
              width: 0.96rem;
              height: 0.8267rem;
            }
            &.car {
              margin-top: 0.1167rem;
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
          .gift_name_houseAndCar {
            margin-top: 0.2267rem;
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
</style>