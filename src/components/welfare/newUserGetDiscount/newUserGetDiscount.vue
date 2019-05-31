<template>
  <div class="shareNew-wrapper" id="shareNew">
    <div class="shop-container" @click="goHome">
      <img class="logo" :src="shopSettingInfo.image">
      <p class="bar_name">{{shopSettingInfo.name}}</p>
    </div>
    <img src="../../../assets/image/shared.jpg" alt="" class="sharePic">
    <ul class="discount-container">
       <li class="item" v-if="sharedCoupon.coupon">
        <div class="myleft">
          <p class="desc">恭喜获赠</p>
        </div>
        <div class="mycenter">
          <p class="discout_type" v-if="sharedCoupon.coupon.type==0">现金券</p>
          <p class="discout_type" v-else-if="sharedCoupon.coupon.type==1">实物券</p>
          <p class="discout_type" v-else-if="sharedCoupon.coupon.type==2">折扣券</p>
          <p class="discout_type" v-else>兑换券</p>
        </div>
        <div class="myright">
          <div class="discount_theme">{{sharedCoupon.coupon.theme?sharedCoupon.coupon.theme:"新人礼包"}}</div>
          <div class="discount_content">{{sharedCoupon.coupon.name}}</div>
          <div class="discount_limitAndTime">
            <p class="limit">{{sharedCoupon.coupon.limit}}</p>
            <p class="time">有效期至:{{sharedCoupon.coupon.endTime}}</p>
          </div>
        </div>
      </li>
    </ul>
    <!-- 规则 -->
    <div class="rule-container">
      <p class="desc">
        优惠券已经存入您的卡券包
      </p>
    </div>
    <!-- 操作 -->
    <div class="handle-container">
      <img @click="intoDiscountList" class="btn" src="../../../assets/image/lookUp.png" alt="">
    </div>
    <qrCode v-show="qrIsShow" title="成功领券,关注公众号,以便核销"></qrCode>
    <!-- <div class="Qr-wrapper">
           <p class='desc'>长按关注本店公众号，享受会员特权：领福利、交群友、玩游戏！</p>
           <img :src="QRcodeUrl" alt="" class="QRcode">
       </div> -->
  </div>
</template>

<script type='text/ecmascript-6'>
  import util from "common/util";
  import api from "common/api";
  import qrCode from 'base/qrCode/qrCode'
  import {
    mapState,
    mapMutations,
    mapGetters
  } from "vuex";
  export default {
    data() {
      return {
        isShow_bg: false,
        userACouponID: "",
        userBCouponID: "",
        shareUserID: "",
        sharedCoupon: {},
        QRcodeUrl: ""
      };
    },
    created() {
      // alert(window.location.href);
      let url = window.location.href;
      let urlSplitArr = url.split('CouponID=');
      this.shareUserID = url.slice(url.indexOf('shareUserID='), url.indexOf("&userACouponID")).split('shareUserID=')[1]
      this.userACouponID = urlSplitArr[1].slice(0, -6);
      this.userBCouponID = urlSplitArr[2];
      this.$nextTick(() => {
        this._acquireInviteWaitGetCoupons();
      })
    },
    mounted() {
      // this._loadAllQrcode();
    },
    computed: {
      ...mapState(["shareUrl", "shopSettingInfo"]),
      ...mapGetters(["qrIsShow"])
    },
    methods: {
      //拉取优惠券
      _acquireInviteWaitGetCoupons() {
        let params = {
          shareUserID: this.shareUserID,
          userACouponID: this.userACouponID,
          userBCouponID: this.userBCouponID
          // shareUserID: 'ohzRa0vhz8yEAs08VZv8lscGDN5A',
          // userACouponID: '7eaf90b0-0456-4e3b-a780-2fa9c1791a06',
          // userBCouponID: 'b1419e9f-6de9-437e-9d5b-9987d9ff02e4'
        };
        api.acquireInviteWaitGetCoupons(params).then(res => {
          console.log('res------------',res)
          if (res.errCode === 0) {
            let tempObj = res.aCoupon;
            switch (tempObj.coupon.type) {
                case 0:
                tempObj.coupon.name = tempObj.coupon.value + "元代金券";
                break;
              case 1:
                tempObj.coupon.name = tempObj.coupon.content;
                break;
              case 2:
                tempObj.coupon.name = tempObj.coupon.value + "折扣券";;
                break;
              case 3:
                tempObj.coupon.name = tempObj.coupon.content + "兑换券";;
                break;
              default:
                break;
              // case 0:
              //   tempObj.coupon.content = tempObj.coupon.value + "元"
              //   break;
              // case 2:
              //   tempObj.coupon.content = tempObj.coupon.value + "折"
              //   break;
              // default:
              //   break;
            }
            this.sharedCoupon = tempObj;
          } else if (res.errCode === 1023) {
            this.showQrcode(true);
          }
        })
      },
      //拉取二维码
      // _loadAllQrcode() {
      //   api.loadAllQrcode().then(res => {
      //     console.log('二维码----------------', res)
      //     this.QRcodeUrl = res.urls[0]
      //   })
      // },
      goHome() {
        this.$router.push({
          name: "home"
        });
      },
      intoDiscountList() {
        this.$router.push({
          name: "card"
        });
      },
      ...mapMutations({
        showQrcode: "SHOW_QRCODE"
      })
    },
    watch: {
      $route: function(newValue, oldValue) {
        console.log(oldValue);
        console.log(newValue);
      }
    },
    components: {
      qrCode
    }
  };
</script>

<style scoped lang='less'>
  @import "../../../assets/less/mixin.less";
  .shareNew-wrapper {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    background-color: #fe9a08;
    padding-bottom: 1.3333rem;
    position: relative;
    .shop-container {
      position: absolute;
      display: flex;
      top: 0.6667rem;
      left: 0.2667rem;
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
    .sharePic {
      width: 100%;
      box-shadow: 0 0.0533rem 0.3667rem 0.0533rem #ff9a0a;
    }
    .discount-container {
      padding: 0 0.2667rem;
      margin-top: 0.4rem;
      box-sizing: border-box;
      .item {
        margin-bottom: 0.2667rem;
        display: flex;
        height: 2.24rem;
        border-radius: 0.1333rem;
        .bg("../../assets/image/share_discount_bg.png");
        .myleft {
          width: 1.4rem;
          text-align: center;
          box-sizing: border-box;
          .desc {
            width: 0.4rem;
            width: 0.4rem;
            display: inline-block;
            width: 0.4rem;
            font-size: 0.4rem;
            color: #D33700;
            font-weight: 800
          }
        }
        .mycenter {
          width: 1.4rem;
          text-align: center;
          .discout_type {
            width: 0.4rem;
            display: inline-block;
            width: 0.4rem;
            padding-top: 0.2333rem;
            font-size: 0.45rem;
            color: #D33700;
            font-weight: 900
          }
        }
        .myright {
          flex: 1;
          color: #f4f4f4;
          padding-left: 0.1867rem;
          padding: 0.1333rem;
          box-sizing: border-box;
          .discount_theme {
            font-size: 0.3733rem;
          }
          .discount_content {
            margin-top: .2rem;
            font-size: 0.45rem;
            text-align: center;
            font-weight: 700;
          }
          .discount_limitAndTime {
            margin-top: .3rem;
            display: flex;
            justify-content: space-between;
            .limit {}
            .time {
              margin-left: 0.2667rem;
            }
          }
        } // .item-left {
        //   padding: 0.2667rem 0.3333rem;
        //   .title {
        //     width: 0.4rem;
        //     font-size: 0.4267rem;
        //     word-wrap: break-word;
        //     color: #d23100;
        //     font-weight: bold;
        //   }
        // }
        // .item-right {
        //   display: flex;
        //   flex-direction: column;
        //   justify-content: space-around;
        //   padding: 0.2667rem 0;
        //   margin-left: 0.2667rem;
        //   .discount-content {
        //     font-size: 0.4633rem;
        //     font-weight: bold;
        //     color: #fff;
        //   }
        //   .discount-limitCondition {
        //     font-size: 0.3467rem;
        //     color: #fff;
        //   }
        // }
      }
    }
    .rule-container {
      padding: 0 0.2667rem;
      font-size: 0.3733rem;
      color: #fff;
      margin-top: 0.2067rem;
      .title {}
      .desc {
        width: 100%;
        text-align: center;
        white-space: normal;
        margin: 0.2067rem 0;
      }
      .time {}
    }
    .handle-container {
      margin-top: 0.333rem;
      display: flex;
      justify-content: space-around;
      .btn {
        width: 4.3733rem;
        height: 1.4133rem;
      }
    }
    .Qr-wrapper {
      width: 100%;
      text-align: center;
      margin-top: 0.2667rem;
      .desc {
        font-size: 0.3333rem;
        font-weight: bold;
        text-align: center;
        color: #fff;
        margin-bottom: 0.2667rem;
      }
      .QRcode {
        width: 4.3333rem;
        height: 4.3333rem;
      }
    }
  }
</style>
