<template>
  <div class="shareNew-wrapper" id="shareNew">
    <div class="shop-container" @click="goHome">
      <img class="logo" :src="shopSettingInfo.image">
      <p class="bar_name">{{shopSettingInfo.name}}</p>
    </div>
    <img src="../../../assets/image/shared.jpg" alt="" class="sharePic">
    <ul class="discount-container">
      <li class="item" v-if="sharedCoupon.coupon">
        <div class="item-left">
          <p v-if="sharedCoupon.coupon.type===0" class="title">现金券</p>
          <p v-else-if="sharedCoupon.coupon.type===1" class="title">实物券</p>
          <p v-else="sharedCoupon.coupon.type===2" class="title">折扣券</p>
        </div>
        <div class="item-right">
          <div class="discount-content">{{sharedCoupon.coupon.content}}</div>
          <div class="discount-limitCondition">{{sharedCoupon.coupon.limit}}</div>
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
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      isShow_bg: false,
      userACouponID: "",
      userBCouponID: "",
      shareUserID: "",
      sharedCoupon: {},
      QRcodeUrl: ""
      // picUrl:"http://i1.bvimg.com/643118/5091c94a86646498.jpg"
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
    ...mapState(["shareUrl","shopSettingInfo"]),
    ...mapGetters(["qrIsShow"])
  },
  methods: {
    //拉取优惠券
    _acquireInviteWaitGetCoupons() {
      let params = {
        shareUserID: this.shareUserID,
        userACouponID: this.userACouponID,
        userBCouponID: this.userBCouponID
      };
      // let params = {
      //   shareUserID: 'ohzRa0hhT6J0vws1EF6V2MrH63Ss',
      //   userACouponID: '9b48df84-77f1-4235-ab84-e28d9a8314ce',
      //   userBCouponID: 'cd6fadcb-c0fb-40b7-b0ed-3078b8dfe271'
      // }
      api.acquireInviteWaitGetCoupons(params).then(res => {
        console.log(res)
        this.showQrcode(true);
        if (res.errCode === 0) {
          let tempObj = res.aCoupon;
          switch (tempObj.coupon.type) {
            case 0:
              tempObj.coupon.content = tempObj.coupon.value + "元"
              break;
            case 2:
              tempObj.coupon.content = tempObj.coupon.value + "折"
              break;
            default:
              break;
          }
          this.sharedCoupon = tempObj;
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
    $route: function (newValue, oldValue) {
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
  background-color: #FE9A08;
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
    display: flex;
    // justify-content: space-between;
    justify-content: space-around;
    margin-top: 0.4rem;
    box-sizing: border-box;
    .item {
      display: flex;
      width: 4.6133rem;
      height: 2.24rem;
      .bg("../../assets/image/discountItem.png");
      .item-left {
        padding: 0.2667rem 0.3333rem;
        .title {
          width: 0.4rem;
          font-size: 0.4267rem;
          word-wrap: break-word;
          color: #d23100;
          font-weight: bold;
        }
      }
      .item-right {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0.2667rem 0;
        margin-left: 0.2667rem;
        .discount-content {
          font-size: 0.4633rem;
          font-weight: bold;
          color: #fff;
        }
        .discount-limitCondition {
          font-size: 0.3467rem;
          color: #fff;
        }
      }
    }
  }
  .rule-container {
    padding: 0 0.2667rem;
    font-size: 0.3733rem;
    color: #fff;
    margin-top: 0.2067rem;
    .title {
    }
    .desc {
      width: 100%;
      text-align: center;
      white-space: normal;
      margin: 0.2067rem 0;
    }
    .time {
    }
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
