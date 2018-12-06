<template>
  <div class="giftPanel_wrapper">
    <!-- 选择送礼物的面板 -->
    <div class="giftPanelBox" v-if="panleIndex===0">
      <div class="giftPanelBox_title vux-1px-b">
        <p class="desc">手指抖一抖，就是好朋友</p>
        <img src="../../assets/image/close-round.png" alt class="close" @click="closeGiftPanel">
      </div>
      <div class="giftListpart vux-1px-b">
        <img src="../../assets/image/integralIcon.png" alt class="integralIcon">
        <ul class="list">
          <li class="item">
            <img src="../../assets/image/beer.png" alt class="giftIcon">
            <p class="price">9</p>
          </li>
          <li class="item">
            <img src="../../assets/image/flower.png" alt class="giftIcon">
            <p class="price">188</p>
          </li>
          <li class="item">
            <img src="../../assets/image/car.png" alt class="giftIcon">
            <p class="price">999</p>
          </li>
          <li class="item">
            <img src="../../assets/image/boat.png" alt class="giftIcon">
            <p class="price">1688</p>
          </li>
        </ul>
      </div>
      <div class="shopItemListpart vux-1px-b">
        <img src="../../assets/image/integralIcon.png" alt class="integralIcon">
        <ul class="list">
          <li class="item">
            <img src="../../assets/image/coffee.png" alt class="giftIcon">
            <p class="price">9900</p>
          </li>
          <li class="item">
            <img src="../../assets/image/coffee.png" alt class="giftIcon">
            <p class="price">12800</p>
          </li>
          <li class="item">
            <img src="../../assets/image/coffee.png" alt class="giftIcon">
            <p class="price">20000</p>
          </li>
          <li class="item">
            <img src="../../assets/image/coffee.png" alt class="giftIcon">
            <p class="price">99999</p>
          </li>
        </ul>
      </div>
      <div class="entityGiftListpart">
        <img src="../../assets/image/integralIcon.png" alt class="integralIcon">
        <ul class="list">
          <li class="item">
            <img src="../../assets/image/wawa1.png" alt class="giftIcon">
            <p class="price">9900</p>
          </li>
          <li class="item">
            <img src="../../assets/image/wawa2.png" alt class="giftIcon">
            <p class="price">12800</p>
          </li>
          <li class="item">
            <img src="../../assets/image/wawa3.png" alt class="giftIcon">
            <p class="price">99889</p>
          </li>
          <li class="item">
            <img src="../../assets/image/wawa4.png" alt class="giftIcon">
            <p class="price">99999</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 确认送礼物面板 -->
    <div class="sendGiftPanelBox" v-else-if="panleIndex===1">
      <div class="header">
        <img src="../../assets/image/giftBox.png" class="giftBoxIfon">
        <p class="header_text">送出本份礼物需要消耗您积分：88</p>
        <div class="close" @click="closeGiftPanel">X</div>
      </div>
      <div class="content">
        <div class="pictureBox">
          <img src="../../assets/image/coffee.png" alt class="pictureBox_img">
        </div>
        <div class="giftInfoBox">
          <p class="title">咖啡套餐</p>
          <p class="desc">英式咖啡</p>
          <p class="limit">限周二使用</p>
          <p class="price">特惠￥19</p>
        </div>
      </div>
      <div class="handle">
        <button class="btn">确认赠送</button>
      </div>
    </div>
    <!-- 赠送成功后面板 -->
    <div class="sendedSuccessfulBox" v-else>
      <div class="envelope">
        <div class="close" @click="closeGiftPanel">X</div>
        <img src="../../assets/image/integralIcon.png" alt class="integralIcon">
        <p class="successful_text">充值成功，增加9999积分</p>
        <p class="gotoTopUpText" @click="gotoTopUp">去充值&gt;</p>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      panleIndex: 2,
    }
  },
  methods: {
    closeGiftPanel() {
      this.$emit("closeGiftPanel", false);
    },
  },
  components: {

  }
}
</script>

<style scoped lang='less'>
@import "../../assets/less/mixin.less";
.giftPanel_wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  .giftPanelBox {
    transform: translateY(50%);
    background-color: #fff;
    width: 100%;
    height: 6.5rem;
    .giftPanelBox_title {
      display: flex;
      justify-content: space-between;
      padding: 0.3rem;
      .desc {
        font-size: 0.4rem;
        color: #f2e252;
      }
      .close {
        width: 0.48rem;
        height: 0.48rem;
      }
    }
    .giftListpart {
      position: relative;
      .integralIcon {
        position: absolute;
        left: 0.1333rem;
        bottom: 0.1333rem;
        width: 0.6267rem;
        height: 0.6267rem;
      }
      .list {
        display: flex;
        justify-content: space-between;
        padding: 0.1133rem 0.7rem;
        .item {
          .giftIcon {
            width: 1rem;
            height: 1.2rem;
          }
          .price {
            width: 1.2rem;
            text-align: center;
          }
        }
      }
    }
    .shopItemListpart {
      position: relative;
      .integralIcon {
        position: absolute;
        left: 0.1333rem;
        bottom: 0.1333rem;
        width: 0.6267rem;
        height: 0.6267rem;
      }
      .list {
        display: flex;
        justify-content: space-between;
        padding: 0.1133rem 0.7rem;
        .item {
          .giftIcon {
            width: 1rem;
            height: 1rem;
          }
          .price {
            width: 1rem;
            text-align: center;
          }
        }
      }
    }
    .entityGiftListpart {
      position: relative;
      .integralIcon {
        position: absolute;
        left: 0.1333rem;
        bottom: 0.1333rem;
        width: 0.6267rem;
        height: 0.6267rem;
      }
      .list {
        display: flex;
        justify-content: space-between;
        padding: 0.1133rem 0.7rem;
        .item {
          .giftIcon {
            width: 1rem;
            height: 1rem;
          }
          .price {
            width: 1rem;
            text-align: center;
          }
        }
      }
    }
  }
  .sendGiftPanelBox {
    width: 7.3333rem;
    height: 4.5rem;
    margin: 50% auto;
    .bg("../../assets/image/envelop.png");
    .header {
      display: flex;
      padding: 0.2667rem 0.4rem;
      position: relative;
      .close {
        font-size: 0.3467rem;
        position: absolute;
        top: 0.2333rem;
        right: 0.3667rem;
        width: 0.5667rem;
        height: 0.5667rem;
        text-align: right;
      }
      .giftBoxIfon {
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0.1667rem;
      }
      .header_text {
        font-size: 0.3rem;
        color: #333;
        padding-top: 0.0533rem;
      }
    }
    .content {
      display: flex;
      // justify-content: space-between;
      padding: 0 0.4rem;
      .pictureBox {
        .pictureBox_img {
          width: 2.5rem;
          margin-right: 0.2667rem;
        }
      }
      .giftInfoBox {
        p {
          margin-bottom: 0.06rem;
        }
        .title {
          font-weight: 600;
        }
        .desc {
          color: #ccc;
        }
        .limit {
          color: #ccc;
        }
        .price {
          font-weight: 600;
        }
      }
    }
    .handle {
      width: 100%;
      text-align: center;
      padding-top: 0.4rem;
      .btn {
        padding: 0.08rem 0.1067rem;
        border: none;
        background: -webkit-linear-gradient(top, #fcd502, #e59305);
      }
    }
  }
  .sendedSuccessfulBox {
    width: 100%;
    .envelope {
      margin: 50% auto;
      width: 4.7333rem;
      height: 3.0533rem;
      .bg("../../assets/image/envelop.png");
      position: relative;
      .close {
        width: 0.4667rem;
        height: 0.4667rem;
        text-align: center;
        position: absolute;
        top: 0.1333rem;
        right: 0.1933rem;
      }
      .integralIcon {
        margin-top: 0.2267rem;
        margin-left: 0.36rem;
        width: 0.6rem;
        height: 0.6rem;
      }
      .successful_text {
        margin-top: 0.2667rem;
        font-size: 0.34rem;
        text-align: center;
      }
      .gotoTopUpText {
        position: absolute;
        bottom: 0.3533rem;
        right: 0.18rem;
      }
    }
  }
}
</style>
