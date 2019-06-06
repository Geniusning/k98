<template>
  <transition name="slider">
    <div class="card_detail">
      <my-header title="卡券详情" bg="#fff"></my-header>
      <!-- <div class="discount_pic vux-1px-t"> 
                        <div class="banner_bg">
                            <div class="desc">入场送一扎啤酒</div>
                            <p class="time">截止日期：2018.5.5-2018-6-5</p>
                        </div>
                    </div> -->
      <div class="QRcode_wrapper">
        <p class="desc">到店核销时 请出示此二维码或点击<span @click="lauchCheckOutCoupon" class="check">发起核销</span></p>
        <!-- <img src="../../assets/image/QRcode.png" alt="" class="QR_pic"> -->
        <canvas id="canvas" ref="canvas" style="width:220px;height:220px;"></canvas>
        <div class="card_number">券码：{{couponObj.codeNum}}</div>
      </div>
      <div class="infoMessage_wrapper">
        <ul class="infoList">
          <li class="item">
            <h3 class="title">温馨提示</h3>
            <p class="desc">1.有效期：{{startTime}}至{{couponObj.endTime}}</p>
            <p class="desc">2.使用限制：{{couponObj.limit}}</p>
            <p class="desc">3.优惠卡券限本人使用，每次只能用一种优惠方式</p>
            <p class="desc">4.兑换门店项目或礼物请到收银台领取，不提供包邮业务</p>
          </li>
        </ul>
      </div>
      <!-- 信封弹框 -->
      <transition name="appear">
        <envelope v-show="isShowEnvelope" :text='envelopeText'></envelope>
      </transition>
    </div>
  </transition>
</template>

<script type='text/ecmascript-6'>
  import util from "common/util";
  import myHeader from "../../base/myheader/myheader";
  import QRcode from 'qrcode';
  import api from 'common/api';
  import envelope from 'base/envelope/envelope';
  import {
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        couponId: "",
        qrUrl: "",
        couponObj: {},
        isShowEnvelope: false, //信封弹框判断
        envelopeText: "",
        startTime: ""
      };
    },
    mounted() {
      let startTime = new Date();
      let year = startTime.getFullYear();
      let month = startTime.getMonth() + 1;
      let date = startTime.getDate();
      this.startTime = `${year}-${month>10?month:'0'+month}-${date>10?date:'0'+date}`;
      console.log(this.startTime)
      var canvas = ""
      this.$nextTick(function() {
        // DOM操作
        canvas = document.getElementById('canvas')
      })
      this.couponId = this.$route.params.id;
      api.loadUserCouponByID(this.couponId).then(res => {
        if (res.errCode === 0) {
          console.log(res)
          this.qrUrl = res.verifyURL;
          this.couponObj = res.userCoupon.coupon;
          this.couponObj["codeNum"] =
            util.prefixZero(this.couponObj.type, 1) + "-" +
            util.prefixZero(this.couponObj.batch, 3) + "-" +
            util.prefixZero(this.couponObj.acquireNum, 7)
          QRcode.toCanvas(canvas, this.qrUrl, (error) => {
            if (error) {
              console.log(error)
            } else {
              console.log('success')
            }
          })
        }
      })
    },
    methods: {
      //自动领取优惠券
      acquireWaitGetCoupons() {
        let condition = 1 //channel为1是AI优惠券类型
        api.acquireWaitGetCoupons(condition).then(res => {
          if (!res.coupons) {
            return
          }
          if (res.coupons.length > 0) {
            this._animationToast("店长再送您一张优惠券,谢谢光临")
            // let result = {
            //   msgCode: 4,
            //   content: {
            //     extMsg: {},
            //     fromInfo: {
            //       openid: "",
            //       headimgurl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966911743&di=b3b81acff7cdc59f21ec7cbde8b13298&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110928%2F0017030291764688_b.jpg"
            //     },
            //   }
            // }
            // this.addFriendEvtObj(result);
            // this.judgeMessType('discount');
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _animationToast(text) {
        this.isShowEnvelope = true;
        this.envelopeText = text
        setTimeout(() => {
          this.isShowEnvelope = false;
        }, 2000);
      },
      lauchCheckOutCoupon() {
        api.launchSetOffUserCoupon(this.couponId).then(res => {
          console.log(res)
          if (res.errCode === 0) {
            this.acquireWaitGetCoupons()
            this._animationToast("已发起核销，待收银同意确认")
          } else if (res.errCode === 1) {
             this._animationToast("已核销完毕")
          } else if (res.errCode === 1018) {
            this._animationToast("您已发起核销，请稍等")
          }
        })
      },
      ...mapMutations({
        addFriendEvtObj: "UPDATE_DYNAMICMESSAGE", //更新好友事件提示框(左侧信封弹出触发)
        judgeMessType: "JUDGE_MESSTYPE", //判断消息类型
      })
    },
    components: {
      myHeader,
      envelope
    }
  };
</script>

<style scoped lang='less'>
  @import "../../assets/less/variable.less";
  @import "../../assets/less/mixin.less";
  .card_detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #eee;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
    .discount_pic {
      padding: 0.2667rem;
      background: #fff;
      height: 2.9067rem;
      box-sizing: border-box;
      .banner_bg {
        width: 9.4933rem;
        height: 2.3733rem;
        .bg("../../assets/image/discount1.png");
        padding-top: 1.1333rem;
        box-sizing: border-box;
        .desc {
          border-radius: 0.1333rem;
          background: #fbeca2;
          box-sizing: border-box;
          width: 4.64rem;
          padding: 0.1033rem 1rem;
          color: #666;
          margin-left: 2.4rem;
          font-size: 0.3733rem;
        }
        .time {
          margin-top: 0.1rem;
          width: 100%;
          text-align: center;
          font-size: 0.32rem;
          color: #fff;
        }
      }
    }
    .QRcode_wrapper {
      padding-top: 0.4rem;
      padding-bottom: 0.2rem;
      margin-top: 0.2667rem; // height: 7.1333rem;
      width: 100%;
      background: #fff;
      box-sizing: border-box;
      text-align: center;
      .desc {
        width: 100%;
        text-align: center;
        font-size: 0.3733rem;
        color: #4b4b4b;
        .check {
          font-size: .5rem;
          text-decoration: underline;
          color: red;
        }
      }
      .QR_pic {
        width: 4.7733rem;
        height: 4.7733rem;
        margin: 0.3067rem 2.5933rem;
      }
      .card_number {
        font-size: .4rem;
        letter-spacing: .16rem;
        text-align: center;
      }
    }
    .infoMessage_wrapper {
      box-sizing: border-box;
      padding-top: 0.4rem;
      background: #fff;
      margin-top: 0.2667rem;
      flex: 1;
      padding-bottom: 0.6667rem;
      .infoList {
        width: 100%;
        padding-left: 0.5667rem;
        .item {
          margin-top: 0.2267rem;
          .title {
            font-size: 0.4267rem;
            font-weight: 700;
            color: #4b4b4b;
            margin-bottom: 0.1133rem;
          }
          .desc {
            font-size: 0.3733rem;
            color: #666;
            margin-top: 0.1333rem;
          }
        }
      }
    }
  } // 切换动画
  .slider-enter-active,
  .slider-leave-active {
    transition: all 0.3s;
  }
  .slider-enter {
    transform: translate3d(100%, 0, 0);
  }
  .slider-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
</style>
