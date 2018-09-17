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
            </div>

            <div class="infoMessage_wrapper">
                <ul class="infoList">
                    <li class="item">
                        <h3 class="title">使用说明</h3>
                        <p class="desc">使用时段：{{couponObj.limit}} {{couponObj.startTime}}至{{couponObj.endTime}}</p>
                    </li>
                    <li class="item">
                        <h3 class="title">温馨提示</h3>
                        <p class="desc">1.使用时，请出示此二维码供商家核销</p>
                        <p class="desc">2.每张券仅限一人使用且只能使用一次</p>
                        <p class="desc">3.提供免费wifi</p>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script type='text/ecmascript-6'>
import myHeader from "../../base/myheader/myheader";
import QRcode from 'qrcode'
import api from 'common/api'
export default {
    data() {
        return {
            couponId: "",
            qrUrl: "",
            couponObj: {}
        };
    },
    mounted() {
        var canvas = ""
        this.$nextTick(function () {
            // DOM操作
            canvas = document.getElementById('canvas')
        })
        this.couponId = this.$route.params.id;

        api.loadUserCouponByID(this.couponId).then(res => {
            if (res.errCode === 0) {
                console.log(res)
                this.qrUrl = res.verifyURL;
                this.couponObj = res.userCoupon.coupon;
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
        lauchCheckOutCoupon() {
            api.launchSetOffUserCoupon(this.couponId).then(res => {
                console.log(res)
                if (res.errCode === 0) {
                    this.$vux.toast.show({
                        text: "已发起核销，带收银同意确认",
                        type: "text",
                        time: 3000,
                        width: "3rem"
                    });
                }
            })
        }
    },
    components: {
        myHeader,

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
    margin-top: 0.2667rem;
    // height: 7.1333rem;
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
        text-decoration: underline;
        color: red;
      }
    }
    .QR_pic {
      width: 4.7733rem;
      height: 4.7733rem;
      margin: 0.3067rem 2.5933rem;
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
}
// 切换动画
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
