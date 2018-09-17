<template>
  <div id="home" class="home">
    <div class="top_wrapper">
      <div class="barLogo_wrapper">
        <div class="logo_wrapper">
          <img class="logo" :src="shopSettingInfo.image" alt="">
          <p class="bar_name">{{shopSettingInfo.name}}</p>
        </div>
      </div>
      <div class="bg"></div>
      <swiper class="slider" :loop="true" :list="demo01_list" v-model="demo01_index"></swiper>
      <!-- <carousel-3d :perspective="10" :display="5" :width="300" :height="140">
                <slide :index="index" v-for="(item,index) in demo01_list1" :key="index">
                 <img :src="item.img" alt="" style="height:100%">
                </slide>
              </carousel-3d> -->
    </div>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <div class="adr_wrapper">
          <div class="adr clearfix" @click="getMapPosition">
            <img src="../../assets/image/position.png" alt="" class="position">
            <p class="adr_desc">{{shopSettingInfo.address}}</p>
          </div>
          <div class="tel">
            <a :href="shopSettingInfo.phone">
              <img src="../../assets/image/call.png" alt="">
            </a>
          </div>
        </div>
        <!-- 游戏 -->
        <div class="game_wrapper">
          <div class="title clearfix">
            <img src="../../assets/image/game_icon.png" alt="" class="icon fl">
            <h2 class="dice_title">大话骰</h2>
            <span class="desc">最烧脑游戏</span>
          </div>
          <ul class="game_list clearfix">
            <li @click="playGame_challenge">
              <img src="../../assets/image/game1.jpg" alt="" class="pic_game" onclick="return false">
            </li>
            <li @click="playGame_rank">
              <img src="../../assets/image/game2.jpg" alt="" class="pic_game" onclick="return false">
            </li>
            <li @click="playGame_friend">
              <img src="../../assets/image/game3.png" alt="" class="pic_game" onclick="return false">
            </li>
          </ul>
        </div>
        <!-- 好友 -->
        <div class="friend_wrapper">
          <div class="title_content_fri clearfix">
            <div class="title clearfix">
              <img src="../../assets/image/footPrint.png" alt="" class="icon fl" onclick="return false">
              <h2 class="friend_title">好友足迹</h2>
              <span class="desc">部落社员热聊中...</span>
            </div>
            <div class="more">
              <ul class="fri_list" v-show="friendList.length>3">
                <li class="item" v-for="(item,index) in friendIconList" :key="index">
                  <img :src="item.headimgurl?item.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534938165134&di=f3ae0420c8c174149ac1c123230a28ed&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FJCRXU6oUw5s17jKllv9icrTmXvozYWQDeWFhKgEXbYeR9JOEKkrWLjibU7a7FAbsBHibVKca5wWzEiaXHWSgaSlgbA%2F640%3Fwx_fmt%3Dpng'"
                    class="min_avatar" onclick="return false">
                </li>
                <li class="item dotItem">
                  <span class="dot">...</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="pic_content">
            <ul class="pic_list">
              <li @click="intoFriend" class="inner_fri">
                <!-- <img src="../../assets/image/online.png" class="online" onclick="return false"> -->
                <span class="inner_onlinePerson">{{inFriendNum}}人在线</span>
                <img src="../../assets/image/inner_fri.jpg" alt="" class="friend_avatar_inner" onclick="return false">
              </li>
              <li @click="outFriend" class="out_fri">
                <span class="out_onlinePerson">{{outFriendNum}}人在线</span>
                <img src="../../assets/image/out_fri.jpg" alt="" class="friend_avatar_out" onclick="return false">
              </li>
            </ul>
          </div>
        </div>
        <!-- 福利 -->
        <div class="welfare_wrapper">
          <div class="title_content_wel">
            <div class="title clearfix">
              <img src="../../assets/image/recomment.png" onclick="return false" alt="" class="icon fl">
              <h2 class="shop_title">店长推荐</h2>
              <span class="desc">更贴心、更优惠</span>
            </div>
            <div class="more fr">
              <img src="../../assets/image/letter.gif" alt="" class="letter" @click="inToLetter">
            </div>
          </div>
          <div class="advertise_wrapper" v-if="show_advertise">
            <img src="../../assets/image/advertise.png" alt="" class="advertise" onclick="return false">
            <!-- <img src="http://llwant.test.qianz.com/download/file/5007c55f109d0ad7f840d3b2e4c5263c.png" alt="" class="advertise" > -->
            <img src="../../assets/image/close_ad.png" alt="" class="close" @click="close_adtise">
          </div>
          <div class="welfare_content">
            <ul class="welfare_list">
              <li class="item clearfix" v-for="(item,index) in recommendList" :key="index">
                <div class="left">
                  <img :src="item.image" alt="" class="shopPic">
                </div>
                <div class="center">
                  <p class="title">{{item.name}}</p>
                  <p class="desc">{{item.subtopic}}</p>
                  <p class="limit">{{item.limit}}</p>
                  <p class="price">
                    <span class="discount_p">特惠￥{{item.discountPrice}}</span><del class="origin_p">原价￥{{item.originalPrice}}</del>
                  </p>
                </div>
                <div class="right">
                  <div class="thunb_box clearfix" @click="thumb(index)">
                    <span class="count fl">已订：{{item.count}}</span>
                  </div>
                  <div class="show_detail" @click="freeBook">
                    免费预订
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="fuli" @click="toWelfare" v-show="noCouponsFlag">
      <img src="../../assets/image/fuli.png" alt="" class="pic_fuli">
    </div>
    <!-- 套餐预定 -->
    <!-- <div v-transfer-dom>
            <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
              <p style="color:#fff;text-align:center;" @click="showDialogStyle = false">
      
              </p>
            </x-dialog>
        </div> -->
    <!-- 优惠券弹框 -->
    <div v-transfer-dom>
      <x-dialog v-model="discountShow" class="dialog-discount">
        <h3 class="couponTitle"></h3>
        <div class="discount-box">
          <scroll ref="discountScroll" class="discountScroll" :data="dicountList" v-if="dicountList.length">
            <ul class="discountList">
              <li class="item" v-for="(item,index) in dicountList" @click="intoCard">
                <div class="itemLeft">
                  <p class="itemName">{{item.name}}</p>
                  <p class="itemTime">{{item.type}} 有效期至：{{item.time}}</p>
                </div>
                <div class="itemRight">
                  立即查看
                </div>
              </li>
            </ul>
          </scroll>
        </div>
        <div @click="closeAICard">
          <x-icon type="ios-close-outline" style="fill:#fff;margin-top:20px;"></x-icon>
        </div>
      </x-dialog>
    </div>
    <!-- 游戏框框 -->
    <div v-transfer-dom>
      <x-dialog v-model="gameShow" class="dialog-gameBegin">
        <div class="game-box">
          <img src="../../assets/image/gameBegin.png" alt="" class="gameBegin" @click="intoReadyGame">
        </div>
        <div @click="closeGame">
          <img src="../../assets/image/gameClose.png" alt="" class="close">
        </div>
      </x-dialog>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type='text/ecmascript-6'>
import Scroll from "../../base/scroll/scroll";
import util from "common/util";
import api from "common/api";
import { TransferDom, Swiper, Toast, XDialog } from "vux";
import axios from "axios";
import url from "common/url";
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  name: "home",
  directives: {
    TransferDom
  },
  data() {
    return {
      friendIconList: [],
      dicountList: [],
      gameShow: false,
      discountShow: false, //AI优惠券
      showDialogStyle: false,
      show_advertise: true,
      demo01_list: [],
      test1: "123",
      demo01_index: 0,
      data: [1, 2, 3],
      distance: "",
      recommendList: [{
        src: "http://i4.bvimg.com/643118/0c7ed06ec325ad1d.png",
        originPrice: "488",
        price: "388",
        limit: "限周一白天使用",
        desc: "朋友聚会，超级实惠的哦",
        title: "超值四人水果拼盘",
        count: 88
      },
      {
        src: "http://i4.bvimg.com/643118/0c7ed06ec325ad1d.png",
        originPrice: "388",
        price: "188",
        limit: "限周天白天使用",
        desc: "超值优惠，值得拥有",
        title: "聚会二楼包厢特惠",
        count: 8
      }
      ],
      inFriendNum: 0,
      outFriendNum: 0
    };
  },
  created() {
    this._getUserInfo(); //获取用户信息
    this.getFriendList(); //获取候选人
    this._loadPublishArenas();
    let _url = window.location.href;
    if (util.isAndroid()) {
      let shareObj = {
        title: "深圳魅力四射激情酒吧",
        desc: "今天店里举行派对喽，快来参加",
        link: `http://llwant.test.qianz.com?/#/home`,
        imgUrl: "http://i2.bvimg.com/643118/36347406d1739907.png"
      };
      util._getJssdkInfo(shareObj, _url);
    } else {
      let shareObj = {
        title: "深圳魅力四射激情酒吧",
        desc: "今天店里举行派对喽，快来参加",
        link: this.shareUrl + "#/home ",
        imgUrl: "http://i2.bvimg.com/643118/36347406d1739907.png"
      };
      util._getJssdkInfo(shareObj, this.shareUrl);
    }
  },
  computed: {
    ...mapState(["friendList", "inAndOutFriendCursor", "userInfo", "shareUrl", "shopSettingInfo","noCouponsFlag"])
  },
  mounted() {
    this._loadFriendEvts(); //获取好友事件列表
    this.getAlreadyFriend(); //获取已经成为好友列表
    this._getInOutNum();
    this._loadUserCoupons(); //用户获取优惠券
    this._loadRecommends();//店长推荐数据
    this._loadStoreSetting() //获取门店信息
    this._loadAdvertisingPhoto();//拉取首页轮播图
    this._loadInviteWaitGetCoupon();//判断是否已经领取优惠券
  },
  methods: {
    //判断是否已经分享过优惠券
    _loadInviteWaitGetCoupon() {
      api.loadInviteWaitGetCoupon().then(res => {
        console.log('优惠券----------------------------------:', res)
        if (res.errCode === 0 && res.coupons === null) {
          this.judgeInviteCoupon(false);
        }
      })
    },

    //获取cookie
    getCookie: function (cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) != -1) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    //进入优惠券
    intoCard() {
      this.$router.push({
        name: "card"
      });
      this.discountShow = false;
    },
    //进入游戏初始页面
    intoReadyGame() {
      this.$router.push({
        name: "gameCompetion"
      });
      this.gameShow = false;
    },
    // 关闭游戏
    closeGame() {
      this.gameShow = false;
    },
    //关闭AI优惠券
    closeAICard() {
      api.clearFirstLoadTag().then(res => {
        this.discountShow = false;
      });
    },
    playGame_challenge() {
      let token = this.getCookie("tk");
      window.location.href =
        `http://llwant.test.qianz.com/game/?gamePath=game1&tk=${token}`;
    },
    playGame_rank() {
      this.$router.push({
        name: "gameCompetion"
      })
    },
    playGame_friend() {
      let token = this.getCookie("tk");
      window.location.href =
        `http://llwant.test.qianz.com/game/?gamePath=game3&tk=${token}`;
    },
    //获取cookie
    getCookie: function (cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) != -1) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    //拉取已经发布的比赛场
    _loadPublishArenas() {
      api.loadPublishArenas().then(res => {
        var reverseArr = res.arenaInfos.reverse();
        if (reverseArr.length > 0) {
          this.gameShow = true;
        }
        console.log('拉取已经发布的比赛场:', res)
      })
    },
    //用户获取首次进入系统优惠券
    _loadUserCoupons() {
      let channel = 1; //channel为1是AI优惠券类型
      api.loadUserCoupons(channel).then(res => {
        console.log("优惠券：", res);
        if (res.length === 0) {
          return false;
        }
        let AicardList = res.coupons;
        AicardList.forEach(element => {
          let tempObj = {};
          tempObj.type = element.coupon.type ? "实物券" : "现金券";
          tempObj.time = element.coupon.endTime;
          tempObj.name = element.coupon.type ?
            "获得" + element.coupon.content :
            "获得" + element.coupon.value + "元代金券";
          this.dicountList.push(tempObj);
        });
        setTimeout(() => {
          this.discountShow = this.userInfo.firstLoad;
          // this.discountShow = true;
        }, 1000);
      });
    },
    //获取店长推荐
    _loadRecommends() {
      api.loadRecommends().then(res => {
        console.log('店长推荐数据---------------------', res)
        this.recommendList = res.slice(0, 2);
      })
    },
    //获取门店信息
    _loadStoreSetting() {
      api.loadStoreSetting().then(res => {
        console.log('门店信息---------------------------------：', res)
        this.getShopSetting(res)
      })
    },
    //拉取首页轮播图
    _loadAdvertisingPhoto() {
      api.loadAdvertisingPhoto().then(res => {
        console.log('轮播图-------------------------：', res)
        let swiperList = [];
        res.adPhotoURL.forEach((item, index) => {
          swiperList.push({
            url: "javascript:",
            img: item,
            title: ""
          })
        })
        this.demo01_list = swiperList
      })
    },
    //获取好友事件
    _loadFriendEvts() {
      let cursor = 0;
      this.getFriendEvt(cursor);
    },
    //关闭广告
    close_adtise() {
      this.show_advertise = false;
    },
    //点赞
    thumb(index) {
      this.recommendList[index].count++;
      // this.count++;
    },
    //免费预定
    freeBook() {
      this.$vux.toast.show({
        text: "您己成功预订A套餐，到门店时请先到收银台扫码确认",
        type: "text",
        time: 3000,
        width: "3rem"
      });
    },
    //关闭详情
    closeDialog() {
      this.showDialogStyle = false;
    },
    //获取地图位置
    getMapPosition() {
      //获取地理位置
      wx.getLocation({
        // type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          // alert(longitude)
          var speed = res.speed; // 速度，以米/每秒计
          var accuracy = res.accuracy; // 位置精度
          //window.location.href="http://apis.map.qq.com/uri/v1/marker?marker=coord:22.547986,113.988039;title:深圳魅力四射酒吧;addr:好吃好玩的地方&referer=myapp"
          window.location.href = `http://apis.map.qq.com/uri/v1/routeplan?type=bus&from=我的位置&fromcoord=${latitude},${longitude}&to=欢乐谷&tocoord=22.547986,113.988039&policy=1&referer=myapp`;
        }
      });
    },
    // 获取用户信息
    _getUserInfo() {
      api.getUserInfo("/api/loadUserInfo").then(res => {
        console.log('个人信息-------------------------：', res);
        this.getuserInfo(res);
      })
        .catch(err => {
          console.log(err);
        });
    },
    //获取场内场外人数
    _getInOutNum() {
      api.getInOutNum().then(res => {
        this.inFriendNum = res.inFieldNumber;
        this.outFriendNum = res.outFiledNumber;
      });
    },
    //进入福利页面
    toWelfare() {
      this.$router.push({
        name: "welfare"
      });
    },
    //进入场内交友界面
    intoFriend() {
      if (this.inFriendNum === 0) {
        this.$vux.toast.show({
          type: "text",
          text: "场内暂时没有朋友",
          width: "12em"
        });
        return;
      }
      util.routerTo("friend", this, {
        routeParamNum: 1 //路由参数1为进入了场内
      });
    },
    //进入场外交友界面
    outFriend() {
      util.routerTo("friend", this, {
        routeParamNum: 2 //路由参数2为进入了场外
      });
    },
    //进入店长信箱
    inToLetter() {
      util.routerTo("message", this, {
        routeParamNum: 2 //路由参数2表示从店长信箱进入店长留言
      });
    },
    // 更多福利
    showMoreWelfare() {
      util.routerTo("welfare", this);
    },
    ...mapMutations({
      getuserInfo: "GET_USERINFO",    //获取用户信息
      getShopSetting: "GET_SHOPINFO",
      getPosition: "GET_POSITION",
      getFriend: "GET_FRIENDlIST",
      updateShareUrl: "UPDATE_SHAREURL",
      getFriend: "GET_FRIENDlIST", //获取候选人,
      judgeInviteCoupon: "JUDGE_INVITE_COUPON" //判断是否还有邀请有礼
    }),
    ...mapActions({
      getFriendEvt: "get_FriendEvt", //获取好友事件
      getAlreadyFriend: "get_alreadyFriendList", //获取已经成为好友事件
      getFriendList: "get_Friendlist"
    })
  },
  watch: {
    friendList: function (newValue) {
      let tempArr = this.friendList.map((item, index) => {
        return item.info;
      });
      this.friendIconList = tempArr.slice(0, 3);
    }
  },
  components: {
    Swiper,
    Toast,
    XDialog,
    Scroll
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/variable.less";
@import "../../assets/less/home_common.less";
@import "../../assets/less/mixin.less";
@import "~vux/src/styles/close";
// 优惠券开始
.weui-dialog {
  background: none;
}
.couponTitle {
  height: 3.0667rem;
  .bg("../../assets/image/youhuiquan_bg.png"); // background-color: #FFAE00;
}
.dialog-discount {
  .discount-box {
    padding: 0.2333rem 0 0.1rem;
    background-color: #ffd700;
    overflow: hidden;
    .discountScroll {
      height: 3.8rem;
      box-sizing: border-box;
      .discountList {
        .item {
          margin: 0 auto 0.2667rem;
          width: 7.0533rem;
          height: 1.68rem;
          display: flex;
          justify-content: space-between; // border: 1px solid #FFAE00;
          // border-left: 2px solid #FFAE00;
          .bg("../../assets/image/discount_bg1.png");
          box-sizing: border-box;
          .itemLeft {
            box-sizing: border-box;
            padding-top: 0.4rem;
            .itemName {
              font-size: 0.3467rem;
              color: #4b4b4b;
              margin-bottom: 0.22rem;
              padding-left: 0.4533rem;
            }
            .itemTime {
              padding-left: 0.4533rem;
              font-size: 0.2933rem;
              color: #999;
            }
          }
          .itemRight {
            box-sizing: border-box;
            padding: 0.2667rem;
            padding-top: 0.6rem;
            font-size: 0.3733rem;
            color: #fff;
          }
        }
      }
    }
  }
}
.vux-close {
  margin-top: 8px;
  margin-bottom: 8px;
  color: #fff;
}
// 优惠券结束
// 弹框游戏开始
.dialog-gameBegin {
  .game-box {
    .gameBegin {
      width: 8.1867rem;
      height: 7.2rem;
    }
  }
  .close {
    margin-top: 0.72rem;
    width: 1.0667rem;
    height: 1.0667rem;
  }
}
// 弹框游戏结束
.home {
  background: rgba(242, 242, 242, 1);
  .fuli {
    position: fixed;
    bottom: 180px;
    right: 1px;
    animation: jump 1500ms linear 500ms infinite normal;
    @keyframes jump {
      10% {
        bottom: 180px;
      }
      50% {
        bottom: 175px;
      }
      100% {
        bottom: 180px;
      }
    }
    .pic_fuli {
      width: 60px;
      height: 73px;
    }
  }
}
.dialog_wrapper {
  width: 7.8667rem;
  height: 10.3467rem;
  background: #ffd700;
  margin: 0 auto;
  border-radius: 10px;
  .banner_content {
    width: 100%;
    height: 3.4933rem;
    margin-bottom: 0.2667rem;
    .picBanner {
      width: 100%;
      height: 100%;
    }
  }
  .info_content {
    width: 7.0667rem;
    height: 6.2933rem;
    margin: 0 auto;
    background-image: url("../../assets/image/dialog_bg.png");
    background-repeat: no-repeat;
    background-size: 100%;
    padding-top: 0.5867rem;
    box-sizing: border-box;
    h2 {
      font-size: 0.4rem;
      color: #ff3131;
      font-weight: bold;
      text-align: center;
      font-family: "PingFang SC";
    }
    .introduce_box {
      margin-top: 0.16rem;
      .title {
        .dialogTitle;
      }
      p {
        .dialogP;
      }
    }
    .endTime_box {
      margin-top: 0.3333rem;
      .title {
        .dialogTitle;
      }
      p {
        .dialogP;
      }
    }
    .consume_box {
      margin-top: 0.2933rem;
      .title {
        .dialogTitle;
      }
      p {
        .dialogP;
      }
    }
    .btn_box {
      button {
        outline: none;
        background: #fff;
        border: none;
        color: #ffd700;
        padding: 0.1333rem;
      }
    }
  }
}
.content {
}
.top_wrapper {
  position: relative;
  height: 4.2667rem; // background: #ffe200;
  .bg {
    position: absolute;
    height: 50%;
    width: 100%; // background: #ffe200;
  }
  .barLogo_wrapper {
    width: 100%;
    position: absolute;
    z-index: 999;
    top: 0.16rem;
    left: -0.0933rem;
    .logo_wrapper {
      display: inline-block;
      height: 0.5rem;
      background-color: rgba(255, 255, 255, 0.1);
      line-height: 0.5rem;
      margin: 0 0.5rem;
      border-radius: 10px;
      .logo {
        width: 0.6733rem;
        height: 0.6733rem;
        float: left;
        margin-top: -2px;
        border-radius: 50%;
        margin-right: 0.1367rem;
      }
      .bar_name {
        color: #f4f4f4;
        float: left;
        font-family: "PingFang-SC-Regular";
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .slider {
    height: 100%;
  }
}
.pic {
  width: 100%;
  height: 100%;
}
// 地址
.adr_wrapper {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 0rem 0.5rem 0rem;
  height: 0.7733rem;
  box-sizing: border-box;
  .adr {
    font-family: "Times New Roman", Times, serif;
    height: 15px;
    line-height: 15px; // flex: 1;
    padding-top: 0.19rem;
    .position {
      width: 0.4067rem;
      height: 0.5133rem;
      float: left;
      margin-right: 0.1333rem;
      margin-top: -0.0667rem;
    }
    .adr_desc {
      font-size: 0.3733rem;
      font-family: "PingFang-SC-Regular";
      float: left;
      color: #414141;
    }
  }
  .navigator {
    position: relative;
    margin-top: -0.125rem;
    .distant {
      font-size: 12px;
      font-family: "PingFang-SC-Regular";
    }
    .pic_map {
      width: 0.9375rem;
      height: 0.9375rem;
      vertical-align: -0.1875rem;
    }
  }
  .tel {
    // padding-top: 2px;
    a {
      color: #ccc;
    }
    img {
      width: 0.88rem;
      height: 0.88rem;
      margin-top: -0.26rem;
      position: relative;
      z-index: 10;
    }
  }
}
// 好友
.friend_wrapper {
  overflow: hidden;
  .icon {
    width: 0.7733rem;
    height: 0.88rem;
    margin-right: 0.16rem;
  }
  .titleWrapper;
  .title {
    padding-bottom: 0.2333rem;
    padding-top: 0.2667rem;
    float: left;
    display: inline-block;
    .title;
    .friend_title {
      .homeTitle;
      padding-top: 0.25rem;
    }
    .desc {
      .titleDesc;
      padding-top: 0.22rem;
    }
  }
  .more {
    padding: 0.1333rem 0.1333rem;
    padding-top: 0.4rem;
    float: right;
    .fri_list {
      .item {
        float: left;
        margin-left: -0.25rem;
        .dot {
          font-size: 0.5533rem;
          display: inline-block;
          line-height: 0.3rem;
          color: #d1d1d1;
        }
        .min_avatar {
          width: 0.6667rem;
          height: 0.6667rem;
          border-radius: 50%;
        }
      }
      .dotItem {
        margin-left: 0.1rem;
      }
    }
  }
  .pic_content {
    .pic_list {
      padding: 0 0.2667rem;
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.2167rem;
      li {
        &.out_fri {
          padding-top: 0.1633rem;
        }
        position: relative;
        .inner_onlinePerson {
          .online;
        }
        .out_onlinePerson {
          .online;
        }
        .friend_avatar_inner {
          width: 4.6933rem;
          height: 2.7333rem;
        }
        .friend_avatar_out {
          width: 4.6933rem;
          height: 2.56rem;
        }
      }
    }
  }
}
// 游戏
.game_wrapper {
  // width: 100%;
  overflow-y: hidden;
  .icon {
    width: 1.1067rem;
    height: 0.6133rem;
    margin-right: 0.16rem;
  }
  .titleWrapper;
  .title {
    padding-bottom: 0.2333rem;
    padding-top: 0.2667rem;
    .title;
    .dice_title {
      .homeTitle;
      padding-top: 0.0967rem;
    }
    .desc {
      .titleDesc;
      padding-top: 0.0967rem;
    }
  }
  .game_list {
    overflow-x: auto;
    overflow-y: hidden;
    height: 2.5333rem;
    margin: 0 0.2667rem;
    padding-bottom: 0.2167rem;
    li {
      display: table-cell;
      box-sizing: border-box;
      .pic_game {
        float: left;
        width: 4.1333rem;
        height: 2.5333rem; // border-radius: 0.625rem;
      }
    }
  }
}
// 福利
.welfare_wrapper {
  .titleWrapper;
  .title_content_wel {
    display: flex;
    justify-content: space-between;
    .title {
      padding-bottom: 0.2333rem;
      padding-top: 0.2667rem;
      .icon {
        width: 0.9333rem;
        height: 0.9333rem;
        margin-right: 0.16rem;
      }
      .title();
      .shop_title {
        .homeTitle;
        padding-top: 0.25rem;
      }
      .desc {
        .titleDesc;
        padding-top: 0.22rem;
      }
    }
    .more {
      .letter {
        margin-right: 0.45rem;
        margin-top: 0.3rem;
        width: 0.8333rem;
        height: 0.6667rem;
      }
    }
  }
  .advertise_wrapper {
    position: relative;
    .close {
      width: 0.32rem;
      height: 0.3467rem;
      position: absolute;
      top: 1.4667rem;
      right: 0.4267rem;
    }
    .advertise {
      height: 3.1467rem;
    }
  }
  .welfare_content {
    margin-top: 0.1rem;
    .welfare_list {
      padding: 0 0.2667rem;
      .item {
        height: 2.6667rem;
        .left {
          float: left;
          width: 2.8533rem;
          height: 2.1333rem;
          .shopPic {
            width: 100%;
            height: 100%;
          }
        }
        .center {
          float: left;
          margin-left: 0.2667rem;
          .title {
            font-size: 0.3733rem;
            color: #333;
            font-weight: bold;
          }
          .desc {
            margin-top: 0.1rem;
            color: #8f8f8f;
            font-size: 0.32rem;
          }
          .limit {
            margin-top: 0.16rem;
            color: #8f8f8f;
            font-size: 0.2667rem;
          }
          .price {
            margin-top: 0.1rem;
            .discount_p {
              color: #ff3131;
              font-size: 0.3467rem;
              margin-right: 0.4267rem;
            }
            .origin_p {
              color: #8f8f8f;
              font-size: 0.3467rem;
            }
          }
        }
        .right {
          float: right; // margin-top: 0.4rem;
          .thunb_box {
            padding-left: 0.1833rem;
            .thumb {
              width: 0.4rem;
              height: 0.4rem;
              float: left;
              margin-right: 0.1333rem;
            }
            .count {
              float: left;
              color: #8f8f8f;
              font-size: 0.3467rem;
            }
          }
          .show_detail {
            margin-top: 1.1rem;
            width: 1.4667rem;
            padding: 0.1067rem 0;
            text-align: center;
            line-height: 0.5067rem;
            background: @baseColor;
            color: #fff;
            border-radius: 0.08rem;
          }
        }
      }
    }
  }
}
</style>
