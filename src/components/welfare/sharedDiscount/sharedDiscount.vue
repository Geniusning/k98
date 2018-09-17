<template>
  <div class="shareNew-wrapper" id="shareNew">
    <div class="shop-container" @click="goHome">
      <img class="logo" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524204213993&di=5f93ef923bb06785474b70621b7a9e42&imgtype=0&src=http%3A%2F%2Fimg.brandcn.com%2FEditor%2FImages%2F201309%2F2013091309383713424223871.jpg" alt="">
      <p class="bar_name">Lose Demon吧(迷失的恶魔魅力四射)</p>
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
      <!-- <img @click="share" class="btn" src="../../../assets/image/fenxiang.png" alt=""> -->
    </div>
    <!-- <div class="bg" v-show="isShow_bg" @click="share">
      <img src="../../../assets/image/share.png" alt="">
    </div> -->
  </div>
</template>

<script type='text/ecmascript-6'>
import util from "common/util";
import api from "common/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isShow_bg: false,
      userACouponID: "",
      userBCouponID: "",
      shareUserID: "",
      sharedCoupon: {},
      // picUrl:"http://i1.bvimg.com/643118/5091c94a86646498.jpg"
    };
  },
  created() {
    alert(window.location.href);
    let url = window.location.href;
    let urlSplitArr = url.split('CouponID=');
    this.shareUserID = url.slice(url.indexOf('shareUserID='), url.indexOf("&userACouponID")).split('shareUserID=')[1]
    this.userACouponID = urlSplitArr[1].slice(0, -6);
    this.userBCouponID = urlSplitArr[2];
    this.$nextTick(()=>{
      this._acquireInviteWaitGetCoupons();
    })
  },
  mounted() {
  },
  computed: {
    ...mapState(["shareUrl"])
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

  },
  watch: {
    $route: function (newValue, oldValue) {
      console.log(oldValue);
      console.log(newValue);
    }
  },
  components: {}
};
</script>

<style scoped lang='less'>
@import "../../../assets/less/mixin.less";
.shareNew-wrapper {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: #ff5c01;
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
  .bg {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    img {
      width: 100px;
      height: 100px;
      position: absolute;
      right: 0;
    }
  }
}
</style>
