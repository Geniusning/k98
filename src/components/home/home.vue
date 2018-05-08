<template>
 <div id="home" class="home">
      <div class="top_wrapper">
            <div class="barLogo_wrapper">
              <div class="logo_wrapper">
                <img class="logo" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524204213993&di=5f93ef923bb06785474b70621b7a9e42&imgtype=0&src=http%3A%2F%2Fimg.brandcn.com%2FEditor%2FImages%2F201309%2F2013091309383713424223871.jpg" alt="">
                <p class="bar_name">Lose Demon吧(迷失的恶魔魅力四射)</p>
              </div>
            </div>
            <!-- <div class="slider_wrapper">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" @click="show_introduce"><img src="../../assets/image/1.jpg" alt="" class="pic"></div>
                        <div class="swiper-slide" @click="show_introduce"><img src="../../assets/image/2.jpg" alt="" class="pic"></div>
                        <div class="swiper-slide" @click="show_introduce"><img src="../../assets/image/3.jpg" alt="" class="pic"></div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>  
            </div> -->
            <swiper :auto="true" :loop="true" :list="demo01_list" v-model="demo01_index" @click="show_introduce"></swiper>
      </div>
      <div class="wrapper" ref="wrapper">
        <div class="content">
            <div class="adr_wrapper">
                <div class="adr clearfix">
                  <img src="../../assets/image/position.png" alt="" class="position">
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
                    <h2 class="dice_title">大话骰</h2>
                    <span class="desc">最烧脑的酒吧游戏</span>
                </div>
                <ul class="game_list clearfix">
                    <li @click.prevent="playGame(1)">
                        <!-- <a href=""> -->
                            <img src="../../assets/image/game1.png" alt="" class="pic_game">
                            <!-- <p class="game_desc">同场匹配</p> -->
                        <!-- </a> -->
                    </li>
                    <li @click.prevent="playGame(3)">
                        <!-- <a href=""> -->
                            <img src="../../assets/image/game2.png" alt="" class="pic_game">
                            <!-- <p class="game_desc">部落争霸</p> -->
                        <!-- </a> -->
                    </li>
                    <li @click.prevent="playGame(2)">
                        <!-- <a href=""> -->
                            <img src="../../assets/image/game3.png" alt="" class="pic_game">
                            <!-- <p class="game_desc">开放组局</p> -->
                        <!-- </a> -->
                    </li>
                </ul>
            </div>
            <!-- 好友 -->
            <div class="friend_wrapper">
                <div class="title_content_fri">
                    <div class="title clearfix">
                        <h2 class="friend_title">缘来同场</h2>
                        <span class="desc">找呀找呀找朋友</span>
                    </div>
                    <div class="more">
                        <!-- <span @click="showMoreFriend">更多>></span> -->
                    </div>
                </div>
                <div class="pic_content">
                    <ul class="pic_list">
                        <li @click="intoFriend" class="inner_fri">
                            <img src="../../assets/image/online.png" class="online" onclick="return false">
                            <img src="../../assets/image/inner_fri.png" alt="" class="friend_avatar" onclick="return false">
                        </li>
                        <li @click="intoFriend">
                            <img src="../../assets/image/out_fri.png" alt="" class="friend_avatar" onclick="return false">
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
                        <h2 class="shop_title">店长推荐</h2>
                        <span class="desc">多优惠,更省钱</span>
                    </div>
                    <div class="more">
                        <!-- <span @click="showMoreWelfare">更多>></span> -->
                    </div>
                </div>
                <ul class="welfare_list">
                    <li v-for="(item, index) in picList" :key="index"> 
                      <img class="pic_welfare" v-preview="item.src" :src="item.src" >
                      <div class="Onsale">
                        <p class="money"><span class="origin_price">特价￥{{item.price}}</span><del>原价￥{{item.originPrice}}</del></p>
                        <p class="desc">{{item.desc}}</p>
                      </div>
                    </li>
                </ul>
            </div>
        </div>
      </div>
       <div class="fuli" @click="toWelfare">
         <img src="../../assets/image/fuli.png" alt="" class="pic_fuli">
       </div>
 </div>
</template>

<script type='text/ecmascript-6'>
// import swiper from "swiper";
// import "swiper/dist/css/swiper.min.css";
import util from "common/util";
import api from "common/api";
import { Previewer, TransferDom, Scroller, Swiper, Toast } from "vux";
import axios from "axios";
import url from "common/url";
import { mapMutations } from "vuex";
const baseList = [
  {
    url: "javascript:",
    img: "http://i4.bvimg.com/643118/b468123c905b0039.jpg", // 404

    title: ""
  },
  {
    url: "javascript:",
    img: "http://i2.bvimg.com/643118/69278a1e38cb4574.png",
    title: ""
  },
  {
    url: "javascript:",
    img: "http://i2.bvimg.com/643118/68e0d5bc3b55fee4.png",
    title: "",
    fallbackImg:
      "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg"
  }
];
export default {
  name: "home",
  directives: {
    TransferDom
  },
  data() {
    return {
      demo01_list: baseList,
      test1: "123",
      demo01_index: 0,
      data: [1, 2, 3],
      url: "",
      distance: "",
      picList: [
        {
          src: "http://i2.bvimg.com/643118/547e062360e36336.png",
          originPrice: "388",
          price: "188",
          desc: "超值优惠，值得拥有"
        },
        {
          src: "http://i2.bvimg.com/643118/5f04d9b63ac4eeb0.png",

          originPrice: "488",
          price: "388",
          desc: "朋友聚会，超级实惠的哦"
        },
        {
          src: "http://i2.bvimg.com/643118/83f7e6c0ef2053aa.png",
          originPrice: "888",
          price: "388",
          desc: "特价宣传，超值优惠，谁用谁知道"
        },
        {
          src: "http://i2.bvimg.com/643118/5f04d9b63ac4eeb0.png",

          originPrice: "488",
          price: "388",
          desc: "朋友聚会，超级实惠的哦"
        }
      ]
    };
  },
  created() {
    this.url = window.location.href;
    this._getUserInfo();
    this._getJssdkInfo();
    //   var mySwiper = new swiper(".swiper-container", {
    //   // pagination: ".swiper-pagination",
    //   paginationClickable: true,
    //   autoplay: 3000
    // });
  },
  computed: {},
  mounted() {
    // var mySwiper = new swiper(".swiper-container", {
    //   // pagination: ".swiper-pagination",
    //   paginationClickable: true,
    //   autoplay: 3000
    // });
  },
  methods: {
    // 获取用户信息
    _getUserInfo() {
      api
        .getUserInfo("/api/loadUserInfo")
        .then(res => {
          this.getuserInfo(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取jssdk
    _getJssdkInfo() {
      api
        .getJssdkInfo("/api/loadJSSDKParams?url=" + this.url)
        .then(res => {
          console.log(res);
          console.log(res.data);
          wx.config({
            //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: "wxb2fa3c446063ec19", // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature, // 必填，签名，见附录1
            jsApiList: [
              // "scanQRCode",
              // "onMenuShareTimeline",
              "getLocation",
              "onMenuShareAppMessage"
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(() => {
            wx.onMenuShareAppMessage({
              title: "深圳魅力四射酒吧", // 分享标题
              desc: "这是一个超级好玩的的地方哦", // 分享描述
              link: "http://llwant.test.qianz.com", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
            //获取地理位置
            wx.getLocation({
              // type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function(res) {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                console.log("纬度");
                console.log(latitude);
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度
              }
            });
          });
          wx.error(function(res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          });
        })
        .catch(err => {});
    },
    //进入游戏
    playGame(num) {
      util.routerTo("game1", this, { type: num });
    },
    //进入福利页面
    toWelfare() {
      this.$router.push({
        name: "welfare",
        params: { userId: 123 }
      });
    },
    //进入交友界面
    intoFriend() {
      var _this = this;
      // this.getLocation();
      wx.getLocation({
        type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function(res) {
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          // alert(latitude)
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          let position = {
            latitude: latitude,
            longitude: longitude
          };
          // _this.getPosition(position);
          // _this.$router.push({
          //   name: "friend",
          //   params: {
          //     latitude: latitude,
          //     longitude: longitude
          //   }
          // });
          var speed = res.speed; // 速度，以米/每秒计
          var accuracy = res.accuracy; // 位置精度
        },
        cancel: () => {
          alert("用户拒绝获取地理位置");
        }
      });
    },
    //获取地理位置
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.showError
        );
      } else {
        this.$refs.navigator.innerHTML =
          "Geolocation is not supported by this browser.";
      }
    },
    showPosition(position) {
      alert(position.coords.latitude, position.coords.longitude);
    },
    showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED: //用户不允许地理定位
          alert("用户拒绝地理位置上报");
          break;
        case error.POSITION_UNAVAILABLE: //无法获取当前位置
          break;
        case error.TIMEOUT: //操作超时
          break;
        case error.UNKNOWN_ERROR:
          break;
      }
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
      getPosition: "GET_POSITION"
    })
  },
  components: {
    Previewer,
    Scroller,
    Swiper,
    Toast
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/variable.less";
@import "../../assets/less/home_common.less";
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
.content {
}
.top_wrapper {
  position: relative;
  height: 3.84rem;
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
      }
    }
  }
  .slider_wrapper {
    height: 3.84rem;
    // position: relative;
    .swiper-container {
      width: 100%;
      height: 100%;
    }
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
    line-height: 15px;
    // flex: 1;
    padding-top: 0.19rem;
    .position {
      width: 0.3067rem;
      height: 0.4133rem;
      float: left;
      margin-right: 0.1333rem;
      margin-top: -0.0667rem;
    }
    .adr_desc {
      font-size: 13px;
      font-family: "PingFang-SC-Regular";
      float: left;
      color: #888888;
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
      z-index: 9999;
    }
  }
}
// 好友
.friend_wrapper {
  .titleWrapper;
  .title {
    padding-bottom: 0.4rem;
    padding-top: 0.32rem;
    .title;
    .friend_title {
      .homeTitle;
    }
    .desc {
      .titleDesc;
    }
  }
  .pic_content {
    .pic_list {
      padding: 0 0.4rem;
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.2667rem;
      .inner_fri {
        position: relative;
        .online {
          position: absolute;
          width: 0.6133rem;
          height: 0.6133rem;
          line-height: 0.6133rem;
          font-size: 0.19rem;
          border-radius: 50%;
          text-align: center;
          background: red;
          color: #fff;
          left: 0;
          top: 0;
          font-family: "PingFang-SC-Bold";
          font-weight: 700;
        }
      }
      .friend_avatar {
        width: 4.4rem;
        height: 1.6533rem;
      }
    }
  }
}
// 游戏
.game_wrapper {
  // width: 100%;
  .titleWrapper;
  .title {
    padding-bottom: 0.4rem;
    padding-top: 0.32rem;
    .title;
    .dice_title {
      .homeTitle;
    }
    .desc {
      .titleDesc;
    }
  }
  .game_list {
    // width: 100%;
    overflow: auto;
    height: 2.5333rem;
    // display: flex;
    // justify-content: space-between;
    padding: 0 0.2667rem;
    padding-bottom: 0.2667rem;
    .pic_game {
      float: left;
      width: 4.1333rem;
      height: 2.5333rem;
      // border-radius: 0.625rem;
    }
  }
}
// 福利
.welfare_wrapper {
  .titleWrapper;
  .title {
    padding-bottom: 0.4rem;
    padding-top: 0.32rem;
    .title;
    .shop_title {
      .homeTitle;
    }
    .desc {
      .titleDesc;
    }
  }

  .welfare_list {
    padding: 0 0.2667rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      width: 4.6667rem;
      margin-bottom: 0.375rem;
      .pic_welfare {
        width: 100%;
        height: 3.5467rem;
        // border-radius: 10px;
      }
      .Onsale {
        .money {
          display: flex;
          justify-content: space-between;
          .origin_price {
            color: #ff3320;
            font-size: 14px;
          }
          del {
            color: gray;
            font-size: 14px;
          }
        }
        .desc {
          color: gray;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
