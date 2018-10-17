<template>
  <div id="friend" class="friend">
      <div class="nav">
        <img src="../../assets/image/select.png" alt=""  @click="showToast=true">
        <img src="../../assets/image/setting.png" alt="" @click="intoSetting">
      </div>
      <div class="stack-wrapper">
        <!-- 相册··················································begin -->
              <!-- 相册··················································end -->
        <stack  ref="stack"   :pages="someList" :stackinit="stackinit" @getMoreFriend="getMoreFriend" @showAblum="showAblum" @firstData="listenFirstdata">暂时没有好友</stack>
        <div class="loading-container" v-show="!someList.length">
          <loading></loading>
        </div>
      </div>
      <div class="control_wrapper">
        <div class="gifts" @click="showToast_gift=true">
           <img src="../../assets/image/gift.png" alt="">
           <!-- <p>见面礼</p> -->
        </div>
         <div class="thumbs" @click="showPosition('middle')" v-if="!isFriend">
          <img src="../../assets/image/thumbs-o-up.png" alt="">
        </div>
         <div class="hello" v-else @click="chat">
          <img src="../../assets/image/sayhi.png" alt="">
        </div>
        <div class="playGame" @click="playGame">
           <img src="../../assets/image/game.png" alt="">
           <!-- <p>玩一把</p> -->
        </div>
      </div>
      <!-- 筛选好友信息 -->
      <div v-transfer-dom>
            <x-dialog v-model="showToast" class="dialog-demo">
              <div class="select_wrapper">
                <img src="../../assets/image/close.png" alt="" class="close" @click="cancel">
                <p class="select_title">条件筛选</p>
                  <div class="sex_wrapper">
                    <h3>性别:</h3>
                    <ul class="sex_list">
                      <li @click="chooseSex(index)" :class="{active:currentIndex1 == index}" v-for="(item,index) in sexArr" :key="index"><span>{{item.name}}</span></li>
                    </ul>
                  </div>
                  <div class="dis_wrapper">
                    <h3>范围:</h3>
                    <ul class="dis_list">
                      <!-- <li><span>范围:</span></li> -->
                      <li @click="chooseRange(index)" :class="{active:currentIndex2 == index}" v-for="(item,index) in rangeArr" :key="index">{{item.name}}</li>
                    </ul>
                  </div>
                  <p class="confirm" @click="cancel">确定</p>
              </div>
            </x-dialog>
      </div>
    <!-- 点赞 -->
    <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask width="10em"  :text="text" :position="position"></toast>
    <!-- 见面礼 -->
    <div v-transfer-dom>
      <popup v-model="showToast_gift" position="bottom">
        <div class="position-vertical-demo">
          <div class="title vux-1px-b">
            <span>手指抖一抖，就是好朋友</span>
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
                  <p  class="gift_price">￥{{item.money}}</p>
              </li>
              <!-- 
                <li class="item">
                
                <p class="gift_name">鲜花</p>
                <p class="gift_price">￥1.88</p>
              </li>
                <li class="item">
               
                <p class="gift_name gift_name_houseAndCar">别墅</p>
                <p class="gift_price">￥5.20</p>
              </li>
                <li class="item">
               
                <p class="gift_name gift_name_houseAndCar">跑车</p>
                <p class="gift_price">￥16.8</p>
              </li> -->
            </ul>
          </div>
        </div>
      </popup>
    </div>
    <!-- 引导背景 v-show="userInfo.firstLoad" -->
    <div class="guide_bg" v-show="isFirstLoad" @click="isFirstLoad=false">
      <img class="thumb" src="../../assets/image/thumb.png" alt="">
      <!-- <img class="close" src="../../assets/image/close.png" alt=""> -->
      <p class="intro">请尽快完善信息，让更多人认识你哦！</p>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import stack from "./tantan/tantan.vue";
import loading from "../../base/loading/loading";
import util from "common/util";
import api from "common/api";
import { mapState, mapActions, mapMutations } from "vuex";
import { Toast, TransferDom, Popup, XDialog, XButton, Scroller } from "vux";
export default {
  // el: "#stack",
  directives: {
    TransferDom
  },
  data() {
    return {
      imgs: [
        {
          url: 'http://covteam.u.qiniudn.com/ka2.jpg',
          title: 'pic1'
        },
        {
          url: 'http://covteam.u.qiniudn.com/poster.png',
          title: 'pic2'
        }
      ],
      showToast_gift: false,
      text: "",
      isFriend: null,
      position: "default",
      showPositionValue: false,
      personShow: false,
      showFriendList: false,
      showToast: false,
      show_mask: true,
      currentIndex1: 0,
      currentIndex2: 0,
      isFirstLoad: false,
      sexArr: [
        {
          id: 0,
          name: "男"
        },
        {
          id: 1,
          name: "女"
        },
        {
          id: 2,
          name: "全部"
        }
      ],
      rangeArr: [
        {
          id: 0,
          name: "场内"
        },
        {
          id: 1,
          name: "场外"
        },
        {
          id: 2,
          name: "全部"
        }
      ],
      someList: [],
      stackinit: {
        visible: 3,
        currentPage: 0
      },
      xid: ""
    };
  },
  //路由判断，判断是场内还是场外1场内2场外
  beforeRouteEnter(to, from, next) {
    console.log(to);
    if (to.params.routeParamNum === 1) {
      next(vm => {
        // 请求场内好友
        api.getLoadInsideCandidates(vm.inAndOutFriendCursor).then(res => {
          console.log('场内：', res);
          vm.getFriend(res);
        });
      });
    } else if (to.query.id === "0") {
      next(vm => {
        let cursor = 0
        vm.getFriendList(cursor)
      });
    } else {
      next(vm => {
        // 请求场外好友
        api.getLoadOutsideCandidates(vm.inAndOutFriendCursor).then(res => {
          console.log('场外：', res);
          vm.getFriend(res);
        });
      });
    }
  },
  computed: {
    ...mapState(["friendList", "inAndOutFriendCursor", "friendListCursor", "giftList", "userInfo"])
  },
  mounted() {
    if (this.userInfo.firstLoad) {
      this.isFirstLoad = true;
    } else {
      this.isFirstLoad = false;
    }
    this._loadAllGift();
  },
  methods: {
    //进入个人信息设置页面
    intoSetting(){
      this.$router.push({
        name:"individual"
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
    //发送礼物
    sendGift(id) {
      let params = {
        giftID: parseInt(id),
        to: this.friendId,
      }
      api.sendGift(params).then(res => {
        console.log(res);
        if (res.errCode === 0) {
          this.$vux.toast.show({
            text: "赠送礼物成功",
            type: "text",
            time: 2000,
            width: "3rem"
          });
        } else {
          this.$vux.toast.show({
            text: "余额不足，请充值",
            type: "text",
            time: 2000,
            width: "3rem"
          });
        }
      })
    },
    // 监听点击相册
    showAblum(data) {
      console.log('监听点击相册------------------------------：', data);
      this.$router.push({
        path: `/friend/${data.info.openid}`
      })
    },
    listenFirstdata(data) {
      // 下面是传回父级的数据;
      console.log('滑动页面传回给父级数据：', data)
      this.friendId = data.info.openid;
      this.setChatFriend(data);
      this.isFriend = data.isAlreadyFriend;
      this.xid = data.xid;
    },
    //获取更多朋友
    getMoreFriend() {
      console.log('触发获取更多的朋友');
      this.getMoreFriendList(this.friendListCursor)
    },
    //点赞
    showPosition(position) {
      this.position = position;
      let that = this;
      api.makeFriend(this.xid).then(res => {
        console.log(res);
        if (res.errcode === 0) {
          that.text = "飞奔个赞过去";
          this.showPositionValue = true;
        } else {
          that.text = "您已点赞了哦";
          this.showPositionValue = true;
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
        path: `/message/${this.friendId}`
      });
    },
    //玩游戏
    playGame() {
      window.location.href = "http://llwant.test.qianz.com:8081/";
    },
    // 性别选择
    chooseSex(index) {
      this.currentIndex1 = index;
    },
    chooseRange(index) {
      this.currentIndex2 = index;
    },
    cancel() {
      this.showToast = false;
    },
    ...mapActions({
      getFriendList: "get_Friendlist",//获取候选人
      getMoreFriendList: "get_moreFriendList"//获取更多候选人
    }),
    ...mapMutations({
      setChatFriend: "SET_CHAT_FRIEND",
      getFriend: "GET_FRIENDlIST", //获取候选好友
      //updateFriendCursor: "UPDATE_INANDOUT_FRIEND_CURSOR", //更新场内场外游标
      getGiftList: "GET_GIFTLIST"//获取礼物
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
    loading
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
    padding: 0 1.6rem;
    // margin-top: -0.2667rem;
    box-sizing: border-box;
    img {
      width: 1.6rem;
      height: 1.6rem;
    }
    .thumbs {
      .action();
    }
    .hello {
      .action();
    }
    .gifts {
      .action();
    }
    .playGame {
      .action();
    }
  }
  .stack-wrapper {
    margin: 0.09rem auto 0;
    // padding:0 0.5rem;
    position: relative;
    // z-index: 1000;
    width: 8.9rem;
    // width: 100%;
    height: 10.5333rem;
    list-style: none;
    pointer-events: none;
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
      top: 50%;
      // transform: translateY(-50%);
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
    }
    // .close {
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
    }
  }
}
// 弹框礼物
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
  height: 7.8rem;
  .bg("../../assets/image/bg.png");
  position: relative;
  // padding: 0.625rem;
  .close {
    position: absolute;
    right: 0.1333rem;
    top: 0.1333rem;
    width: 0.52rem;
    height: 0.52rem;
  }
  .select_title {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    padding-top: 0.5067rem;
  }
  .sex_wrapper {
    margin-top: 1rem;
    h3 {
      text-align: left;
      font-size: 16px;
      font-weight: 600;
      color: #333;
      text-indent: 0.5333rem;
      font-family: Arial, Helvetica, sans-serif;
    }
    .sex_list {
      display: flex;
      justify-content: flex-start;
      padding: 0.4133rem 0.625rem 0.6rem;
      // margin-left: 1.875rem;
      li {
        margin-right: 0.625rem;
        width: 1.7067rem;
        height: 0.6667rem;
        line-height: 0.6667rem;
        border-radius: 0.08rem;
        background: #eee;
        // padding: 0.1875rem;
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
      font-size: 16px;
      font-weight: 600;
      color: #333;
      font-family: Arial, Helvetica, sans-serif;
    }
    .dis_list {
      display: flex;
      justify-content: flex-start;
      padding: 0.4133rem 0.625rem 0.6rem;
      // margin-left: 1.875rem;
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
  }
  // 送礼弹框
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
      right: 0.4rem;
      // z-index: 999;
    }
  }
  .gift_list {
    margin-top: 0.36rem;
    .list {
      display: flex;
      justify-content: space-around;
      margin-left: 0.4rem;
      .item {
        float: left;
        // margin-right: 1rem;
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