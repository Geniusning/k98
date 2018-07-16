<template>
 <div id="home" class="home">
      <div class="top_wrapper">
            <div class="barLogo_wrapper">
              <div class="logo_wrapper">
                <img class="logo" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524204213993&di=5f93ef923bb06785474b70621b7a9e42&imgtype=0&src=http%3A%2F%2Fimg.brandcn.com%2FEditor%2FImages%2F201309%2F2013091309383713424223871.jpg" alt="">
                <p class="bar_name">Lose Demon吧(迷失的恶魔魅力四射)</p>
              </div>
            </div>
            <div class="bg"></div>
            <swiper class="slider":loop="true" :list="demo01_list" v-model="demo01_index" @click="show_introduce"></swiper>
             <!-- <carousel-3d :perspective="10" :display="5" :width="300" :height="140">
              <slide :index="index" v-for="(item,index) in demo01_list" :key="index">
               <img :src="item.img" alt="" style="height:100%">
              </slide>
            </carousel-3d> -->
      </div>
      <div class="wrapper" ref="wrapper">
        <div class="content">
            <div class="adr_wrapper">
                <div class="adr clearfix" @click="getMapPosition">
                  <img src="../../assets/image/position.png" alt="" class="position" >
                  <p class="adr_desc">龙华新区观澜街道大河路商业大厦B座4楼</p> 
                </div>
                <div class="tel">
                    <a href="tel:15764271136">
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
                    <li @click="playGame">
                        <img src="../../assets/image/game1.jpg" alt="" class="pic_game" onclick="return false">
                    </li>
                    <li>
                        <img src="../../assets/image/game2.jpg" alt="" class="pic_game" onclick="return false">
                    </li>
                    <li>
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
                        <ul class="fri_list">
                          <li class="item" v-for="(item,index) in friList" :key="index">
                            <img :src="item.src" alt="暂无图片" class="min_avatar" onclick="return false">
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
                         <!-- <li>
                            <img src="../../assets/image/meinv3.png" alt="" class="friend_avatar">
                        </li> -->
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
                  <img src="../../assets/image/close_ad.png" alt="" class="close" @click="close_adtise" >
                </div>
                <div class="welfare_content">
                  <ul class="welfare_list">
                    <li class="item clearfix" v-for="(item,index) in picList" :key="index">
                      <div class="left">
                        <img :src="item.src" alt="" class="shopPic">
                      </div>
                      <div class="center">
                        <p class="title">{{item.title}}</p>
                        <p class="desc">{{item.desc}}</p>
                        <p class="price">
                          <span class="discount_p">特惠￥{{item.price}}</span><del class="origin_p">原价￥{{item.originPrice}}</del>
                        </p>
                      </div>
                      <div class="right">
                        <div class="thunb_box clearfix" @click="thumb(index)">
                          <img src="../../assets/image/thumb1.png" alt="" class="thumb"><span class="count">{{item.count}}</span>
                        </div>
                        <div class="show_detail" @click="showDetail">
                          查看详情
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
      </div>
       <div class="fuli" @click="toWelfare">
         <img src="../../assets/image/fuli.png" alt="" class="pic_fuli">
       </div>

       <!-- 弹框 -->
       <div v-transfer-dom>
          <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
            <p style="color:#fff;text-align:center;" @click="showDialogStyle = false">
              <div class="dialog_wrapper">
                <div class="banner_content">
                  <img src="../../assets/image/banner.png" alt="" class="picBanner">
                </div>
                <div class="info_content">
                  <h2>超级优惠四人套餐￥199</h2>
                  <div class="introduce_box">
                    <h3 class="title">说明:</h3>
                    <p>用户到店可直接享受特惠价，无需团购预约</p>
                  </div>
                  <div class="endTime_box">
                    <h3 class="title">截止日期：</h3>
                    <p>2018.08.01-2018.09.01</p>
                  </div>
                  <div class="consume_box">
                    <h3 class="title">消费时间段：</h3>
                    <p>18:00-24:00</p>
                  </div>
                  <div class="btn_box">
                    <button class="btn">立即预订</button>
                  </div>
                </div>
              </div>
              <x-icon type="ios-close-outline" style="fill:#fff;margin-top:20px;" @click="closeDialog"></x-icon>
            </p>
          </x-dialog>
      </div>

      <!-- 优惠券弹框 -->
      <div v-transfer-dom>
        <x-dialog v-model="discountShow" class="dialog-discount">
          <div class="discount-box">
            <scroll ref="discountScroll" class="discountScroll" :data="dicountList" >
              <ul class="discountList">
                <li class="item" v-for="(item,index) in dicountList" @click="intoCard">
                  <div class="itemLeft">
                    <p class="itemName">{{item.name}}</p>
                    <p class="itemTime">{{item.type}}  有效期至：{{item.effectiveTime}}</p>
                  </div>
                  <div class="itemRight">
                    立即查看
                  </div>
                </li>
              </ul>
            </scroll>
          </div>
          <div @click="discountShow=false">
            <span class="vux-close"></span>
          </div>
        </x-dialog>
    </div>

 </div>
</template>

<script type='text/ecmascript-6'>
// import swiper from "swiper";
// import "swiper/dist/css/swiper.min.css";
import Scroll from "../../base/scroll/scroll";
import util from "common/util";
import api from "common/api";
import { TransferDom, Swiper, Toast, XDialog } from "vux";
import axios from "axios";
import url from "common/url";
import { mapMutations, mapActions, mapState } from "vuex";
// import { Carousel3d, Slide } from "vue-carousel-3d";
const baseList = [
  {
    url: "javascript:",
    img: "http://i4.bvimg.com/643118/73f6f52ef0786f48.png", // 404

    title: ""
  },
  {
    url: "javascript:",
    img: "http://i4.bvimg.com/643118/73f6f52ef0786f48.png",
    title: ""
  },
  {
    url: "javascript:",
    img: "http://i4.bvimg.com/643118/73f6f52ef0786f48.png",
    title: ""
  }
];
export default {
  name: "home",
  directives: {
    TransferDom
  },
  data() {
    return {
      dicountList: [
        {
          name: "获得啤酒一打",
          type: "实物券",
          effectiveTime: "2018-12-30"
        },
        {
          name: "获得5元代金券",
          type: "现金券",
          effectiveTime: "2018-12-30"
        },
        // {
        //   name: "获得水果一盘",
        //   type: "实物券",
        //   effectiveTime: "2018-12-30"
        // }
      ],
      discountShow: false, //AI优惠券
      showDialogStyle: false,
      show_advertise: true,
      friList: [
        {
          src: "http://i4.bvimg.com/643118/66f258704c27edca.png"
        },
        {
          src: "http://i4.bvimg.com/643118/66f258704c27edca.png"
        },
        {
          src: "http://i4.bvimg.com/643118/e8156b29c3381636.png "
        }
      ],
      demo01_list: baseList,
      test1: "123",
      demo01_index: 0,
      data: [1, 2, 3],
      url: "",
      distance: "",
      picList: [
        {
          src: "http://i4.bvimg.com/643118/d3ed6dbc589609a1.png",

          originPrice: "488",
          price: "388",
          desc: "朋友聚会，超级实惠的哦",
          title: "超值四人水果拼盘",
          count: 88
        },
        {
          src: "http://i4.bvimg.com/643118/0c7ed06ec325ad1d.png",
          originPrice: "388",
          price: "188",
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
    this.url = window.location.href.split("#")[0];
    this._getUserInfo();
    this._getJssdkInfo();
  },
  computed: {
    ...mapState(["friendList", "inAndOutFriendCursor"])
  },
  mounted() {
    setTimeout(() => {
      this.discountShow = true;
    }, 1000);
    this._loadFriendEvts(); //获取好友事件列表
    this.getAlreadyFriend(); //获取已经成为好友列表
    this._getInOutNum();
    //this.addBadgeCount(); //未读消息数
  },
  deactivated() {
    // console.log("离开首页了");
  },
  methods: {
    //进入优惠券
    intoCard() {
      this.$router.push({
        name: "card"
      });
       this.discountShow = false;
    },
    playGame() {
      window.location.href = "http://llwant.test.qianz.com:8081/";
      // api.loadAllQrcode().then(res => {
      //   console.log(res);
      // });
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
      this.picList[index].count++;
      // this.count++;
    },
    //查看详情
    showDetail() {
      this.showDialogStyle = true;
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
        success: function(res) {
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
      api
        .getUserInfo("/api/loadUserInfo")
        .then(res => {
          console.log(res);
          this.getuserInfo(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取jssdk
    _getJssdkInfo() {
      console.log(this.url);
      api.getJssdkInfo("/api/loadJSSDKParams?url=" + encodeURIComponent(this.url)).then(res => {
          wx.config({
            //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: "wxb2fa3c446063ec19", // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature, // 必填，签名，见附录1
            jsApiList: [
              "openLocation",
              // "onMenuShareTimeline",
              "getLocation",
              "onMenuShareAppMessage"
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(() => {
            wx.onMenuShareAppMessage({
              title: "深圳魅力四射酒吧", // 分享标题
              desc: "这是一个超级好玩的的地方哦", // 分享描述
              link: "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: "http://i2.bvimg.com/643118/b1ced24a0ebcda22.png", // 分享图标
              type: "", // 分享类型,music、video或link，不填默认为link
              dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
              success: () => {
                // 用户确认分享后执行的回调函数
                // this.$vux.toast.show({
                //   text: "分享成功",
                // });
              },
              cancel: () => {
                // 用户取消分享后执行的回调函数
              }
            });
          });
          wx.error(function(res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          });
        })
        .catch(err => {});
    },
    //获取场内场外人数
    _getInOutNum() {
      api.getInOutNum().then(res => {
        // console.log(res);
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
        num: 1
      });
    },
    //进入场内交友界面
    outFriend() {
      util.routerTo("friend", this, {
        num: 2
      });
    },
    //进入店长信箱
    inToLetter() {
      util.routerTo("message", this, {
        num: 2
      });
    },
    //查看玩家部落
    show_introduce() {
      util.routerTo("interview", this);
    },
    // 更多好友
    showMoreFriend() {
      util.routerTo("friend", this);
    },
    // 更多福利
    showMoreWelfare() {
      util.routerTo("welfare", this);
    },
    //获取用户信息
    ...mapMutations({
      getuserInfo: "GET_USERINFO",
      testmodel: "TEST",
      getPosition: "GET_POSITION",
      getFriend: "GET_FRIENDlIST"
      // addBadgeCount: "ADD_BADGE"
    }),
    ...mapActions({
      getFriendEvt: "get_FriendEvt", //获取好友事件
      getAlreadyFriend: "get_alreadyFriendList", //获取已经成为好友事件
      getFriendList: "get_Friendlist"
    })
  },
  watch: {
    $route: function(newValue, oldValue) {}
  },
  components: {
    Swiper,
    Toast,
    XDialog,
    // Carousel3d,
    // Slide,
    Scroll
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/variable.less";
@import "../../assets/less/home_common.less";
@import "../../assets/less/mixin.less";
@import "~vux/src/styles/close";
// @import "../../assets/image/dialog_bg.png";
// 优惠券开始
.weui-dialog {
  background: none;
}
.dialog-discount {
  .discount-box {
    width: 7.9467rem;
    // height: 9.6533rem;
    background-color: none;
    .bg("../../assets/image/youhuiquan_bg.png");
    .discountScroll {
      height: 100%;
      padding-top: 3.5rem;
      box-sizing: border-box;
      .discountList {
        height: 100%;
        overflow: hidden;
        .item {
          margin: 0 auto 0.2667rem;
          width: 7.0533rem;
          height: 1.68rem;
          display: flex;
          justify-content: space-between;
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
  height: 4.2667rem;
  // background: #ffe200;
  .bg {
    position: absolute;
    height: 50%;
    width: 100%;
    // background: #ffe200;
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
  // .slider_wrapper {
  //   height: 3.84rem;
  //   // position: relative;
  //   .swiper-container {
  //     width: 100%;
  //     height: 100%;
  //   }
  // }
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
    line-height: 15px;
    // flex: 1;
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
        height: 2.5333rem;
        // border-radius: 0.625rem;
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
            margin-top: 0.24rem;
            color: #8f8f8f;
            font-size: 0.32rem;
          }
          .price {
            margin-top: 0.3933rem;
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
          float: right;
          // margin-top: 0.4rem;
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
