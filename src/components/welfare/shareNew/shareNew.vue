@modify date 2019-03-07 11:18:31
<template>
  <div class="shareNew_wrapper">
    <div class="shareNew-box" id="shareNew">
      <img src="../../../assets/image/back.png" alt="" class="back-icon" @click="back2Welfare">
      <div class="shop-container" @click="goHome">
        <img class="logo" :src="shopSettingInfo.image" alt>
        <p class="bar_name">{{shopSettingInfo.name}}</p>
      </div>
      <!-- <img src="../../../assets/image/shareLogo.jpg" alt class="sharePic"> -->
      <ul class="discount-container">
        <li class="item" v-for="(item,index) in couponList" :key="index">
          <div class="myleft">
            <p class="desc" v-if="index==0">好友获赠</p>
            <p class="desc" v-else>分享获赠</p>
          </div>
          <div class="mycenter">
            <p class="discout_type" v-if="item.coupon.type==0">现金券</p>
            <p class="discout_type" v-else-if="item.coupon.type==1">实物券</p>
            <p class="discout_type" v-else-if="item.coupon.type==2">折扣券</p>
            <p class="discout_type" v-else-if="item.coupon.type==3">兑换券</p>
            <p class="discout_type" v-else>兑换券</p>
          </div>
          <div class="myright">
            <div class="discount_theme">{{item.coupon.theme?item.coupon.theme:"新人礼包"}}</div>
            <div class="discount_content">{{item.coupon.name}}</div>
            <div class="discount_limitAndTime">
              <p class="limit">{{item.coupon.limit}}</p>
              <p class="time">有效期至:{{item.coupon.endTime?item.coupon.endTime:'2019-02-22'}}</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="handle-container">
        <img @click="receiveCouponByID(couponList[0].coupon.couponID)" class="btn" src="../../../assets/image/get_discount_btn.png" alt>
        <img @click="share" class="btn" src="../../../assets/image/share_discount_btn.png" alt>
      </div>
      <div class="bg" v-show="isShow_bg" @click="share">
        <img src="../../../assets/image/share.png" alt>
        <p class="shareText">点击“...”分享好友</p>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import util from "common/util";
  import api from "common/api";
  import Config from "common/config";
  import {mapState} from "vuex";
  export default {
    data() {
      return {
        isShow_bg: false,
        couponList: [],
      };
    },
    created() {
      this._loadInviteWaitGetCoupon();
    },
    computed: {
      ...mapState(["shareUrl", "userInfo", "shopSettingInfo", "baseUrl"])
    },
    methods: {
      //领取优惠券
      receiveCouponByID(couponId) {
        api.receiveCouponByID(couponId).then(res => {
          console.log('领取结果------------', res);
          if (res.errCode === 0) {
            this.$vux.toast.show({
              text: '领取成功'
            })
          }
        })
      },
      //返回福利活动页面
      back2Welfare() {
        this.$router.push({
          name: "welfare"
        })
      },
      //获取优惠券
      _loadInviteWaitGetCoupon() {
        api.loadInviteWaitGetCoupon().then(res => {
          if (!res.coupons) {
            return false
          }
          let tempArr = []
          if (res.errCode === 0) {
            tempArr[0] = res.coupons.aCoupon;
            tempArr[1] = res.coupons.bCoupon
          }
          tempArr.forEach((element) => {
            switch (element.coupon.type) {
              case 0:
                element.coupon.name = element.coupon.value + "元代金券";
                break;
              case 1:
                element.coupon.name = element.coupon.content;
                break;
              case 2:
                element.coupon.name = element.coupon.value + "折扣券";;
                break;
              case 3:
                element.coupon.name = element.coupon.content + "兑换券";;
                break;
              default:
                break;
            }
          })
          console.log('分享的优惠券-----------------------：', tempArr)
          this.couponList = tempArr;
          let _url = window.location.href;
          this.myShareUrl = _url.split('#')[0];
          if (util.isAndroid()) {
            let shareObj = {
              title: "新人大礼包",
              desc: "哥们有空过来玩玩。不知老板是热情还是傻X，见人就发红包",
              link: `${this.shareUrl}#/newUserGetDiscount?shareUserID=${this.userInfo.openid}&userACouponID=${this.couponList[0].id}&userBCouponID=${this.couponList[1].id}&visitType=5`,
              imgUrl: `${this.shopSettingInfo.image}`
            };
            util._getJssdkInfo(shareObj, this.myShareUrl, 20);
          } else {
            let shareObj = {
              title: "新人大礼包",
              desc: "哥们有空过来玩玩。不知老板是热情还是傻X，见人就发红包",
              link: this.shareUrl + `#/newUserGetDiscount?shareUserID=${this.userInfo.openid}&userACouponID=${this.couponList[0].id}&userBCouponID=${this.couponList[1].id}&visitType=5`,
              imgUrl: `${this.shopSettingInfo.image}`
            };
            util._getJssdkInfo(shareObj, this.myShareUrl, 20);
          }
        })
      },
      goHome() {
        this.$router.push({
          name: "home"
        });
      },
      back() {
        this.$router.push({
          name: "welfare"
        });
      },
      //   分享
      share() {
        this.isShow_bg = !this.isShow_bg;
      },
    },
    watch: {
      $route: function(newValue, oldValue) {
        console.log(oldValue);
        console.log(newValue);
      }
    },
    components: {}
  };
</script>

<style scoped lang='less'>
  @import "../../../assets/less/mixin.less";
  .shareNew_wrapper {
    height: 100%;
    overflow-y: auto;
    position: relative;
    .shareNew-box {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background-color: #ff5c01;
      padding-bottom: 1.3333rem;
      position: absolute;
      .bg('../../assets/image/shareNewer.png');
      .back-icon {
        position: absolute;
        width: 0.8rem;
        height: .8rem;
        top: 0.5333rem;
        right: 0.2333rem;
      }
      .shop-container {
        position: absolute;
        display: flex;
        top: 0.6667rem;
        left: 0.2667rem;
        background-color: rgba(0, 0, 0, 0.1);
        padding: 0 0.1333rem;
        border-radius: 0.1333rem;
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
        padding: 0 0.2667rem; // display: flex;
        // justify-content: space-between;
        margin-top: 8.4rem;
        box-sizing: border-box;
        position: relative;
        z-index: 1;
        .item {
          margin-bottom: 0.6667rem;
          display: flex;
          border-radius: 0.1333rem;
          .bg("../../assets/image/share_discount_bg.png");
          .myleft {
            width: 1.4rem;
            text-align: center;
            .desc {
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
          white-space: normal;
          margin: 0.2067rem 0;
        }
        .time {}
      }
      .handle-container {
        margin-top: 1rem;
        display: flex;
        justify-content: space-around;
        .btn {
          width: 4.3733rem;
          height: 1.4133rem;
        }
      }
      .bg {
        position: fixed;
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
          position: fixed;
          right: 0;
        }
        .shareText {
          font-size: 0.7rem;
          color: #fff;
          position: fixed;
          top: 110px;
          right: 0;
        }
      }
    }
  }
</style>
