<template>
  <div class="topUp_wrapper">
    <transition name="fade" mode="out-in">
      <div class="coinBox" v-if="panelIndex===0" key="coinBox">
        <div class="coinBox_top vux-1px-b">
          <div class="integral_box">
            <img src="../../assets/image/integralIcon.png" alt="icon" class="integral">
            <p class="integral_text">余额不足请充积分：</p>
          </div>
          <img src="../../assets/image/close-round.png" alt="icon" class="close" @click="closeIntegralPanel">
        </div>
        <div class="coinBox_bottom">
          <ul class="coinList">
            <li class="coinItem" v-for="(item,index) in moneyList" :key="item.id" @click="payForCoin(item.id)">
              <img :src="item.imgUrl" alt :class="item.iconClass">
              <p class="intergral">{{item.points}}</p>
              <p class="moneyCount">￥{{item.name}}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 选择送礼物的面板 -->
      <div class="giftPanelBox" v-else-if="panelIndex===1" key="giftPanelBox">
        <div class="giftPanelBox_title vux-1px-b">
          <p class="desc">手指抖一抖，就是好朋友</p>
          <img src="../../assets/image/close-round.png" alt class="close" @click="closeIntegralPanel">
        </div>
        <div class="giftListpart vux-1px-b">
          <img src="../../assets/image/integralIcon.png" alt class="integralIcon">
          <ul class="list">
            <li class="item" v-for="(item,index) in giftList" :key="index" @click="sendGift(item.id)">
              <img v-if="item.id===1" src="../../assets/image/beer.png" alt class="giftIcon">
              <img v-else-if="item.id===2" src="../../assets/image/flower.png" alt class="giftIcon">
              <img v-else-if="item.id===3" src="../../assets/image/car.png" alt class="giftIcon">
              <img v-else src="../../assets/image/boat.png" alt class="giftIcon">
              <p class="price">{{item.money}}</p>
            </li>
          </ul>
        </div>
        <div class="shopItemListpart vux-1px-b" v-if="recommentList.length>0">
          <img src="../../assets/image/integralIcon.png" alt class="integralIcon">
          <ul class="list">
            <li class="item" v-for="(item,index) in recommentList" :key="index" @click="sendShopItemGift">
              <img :src="item.recommend.image" alt class="giftIcon">
              <p class="price">9900</p>
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
      <div class="sendGiftPanelBox" v-else-if="panelIndex===2" key="sendGiftPanelBox">
        <div class="header">
          <img src="../../assets/image/giftBox.png" class="giftBoxIfon">
          <p class="header_text">送出本份礼物需要消耗您{{giftInfo.recommend.originalPrice}}积分</p>
          <div class="close" @click="closeIntegralPanel">X</div>
        </div>
        <div class="content">
          <div class="pictureBox">
            <img :src="giftInfo.recommend.image" alt class="pictureBox_img">
          </div>
          <div class="giftInfoBox">
            <p class="title">{{giftInfo.recommend.name}}</p>
            <p class="desc">{{giftInfo.recommend.subtopic}}</p>
            <p class="limit">{{giftInfo.recommend.limit}}</p>
            <p class="price">特惠 ￥{{giftInfo.recommend.discountPrice}}</p>
          </div>
        </div>
        <div class="handle">
          <button class="btn" @click="confirmShopItemGift(giftInfo.recommend.recommendID)">确认兑换</button>
        </div>
      </div>
      <div class="successfullyBox" v-else="panelIndex===3" key="successfullyBox">
        <div class="envelope">
          <div class="close" @click="closeIntegralPanel">X</div>
          <img src="../../assets/image/integralIcon.png" alt class="integralIcon">
          <p class="successful_text">{{successfulText}}</p>
          <p class="gotoTopUpText" @click="gotoTopUp">去充值&gt;</p>
          <!-- <div class="myWelfare">
                <img class="welIcon" src="../../assets/image/integralIcon.png" alt="">
                <p>20324</p>
              </div> -->
        </div>
      </div>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
  import api from "common/api";
  import {
    mapState,
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        panelIndex: null,
        successfulText: "操作成功",
        moneyList: [{
            "id": 1,
            "name": "2",
            "money": 2,
            "points": 200,
            "imgUrl": require("../../assets/image/200coin.png"),
            "iconClass": "coin200"
          },
          {
            "id": 2,
            "name": "10",
            "money": 10,
            "points": 1000,
            "imgUrl": require("../../assets/image/1000coin.png"),
            "iconClass": "coin1000"
          },
          {
            "id": 3,
            "name": "50",
            "money": 50,
            "points": 5000,
            "imgUrl": require("../../assets/image/5000coin.png"),
            "iconClass": "coin5000"
          },
          {
            "id": 4,
            "name": "100",
            "money": 100,
            "points": 10000,
            "imgUrl": require("../../assets/image/10000coin.png"),
            "iconClass": "coin10000"
          }
        ],
      }
    },
    computed: {
      ...mapState(['giftList']),
      ...mapGetters(['recommentList'])
    },
    created() {
      console.log('this.friendId----------------', this.friendId);
      console.log('this.giftInfo----------------', this.giftInfo);
      this.panelIndex = this.fatherPanelIndex;
      console.log('this.panelIndex----------', this.panelIndex)
      console.log('this.giftInfo------------', this.giftInfo)
    },
    mounted() {
      // console.log('this.friendId----------------', this.friendId);
      // console.log('this.giftInfo----------------', this.giftInfo);
      // this.panelIndex = this.fatherPanelIndex;
      // console.log('this.panelIndex----------',this.panelIndex)
      // console.log('this.giftInfo------------', this.giftInfo)
    },
    props: {
      friendId: {
        type: String,
        default: null,
      },
      fatherPanelIndex: {
        type: Number,
        default: 1
      },
      giftInfo: {
        type: Object,
        default: null,
      }
    },
    methods: {
      closeIntegralPanel() {
        this.$emit("closeIntegralPanel", false);
        // this.panelIndex = 1;
      },
      // 前往充值
      gotoTopUp() {
        this.panelIndex = 0;
      },
      //发送礼物
      sendGift(id) {
        let params = {
          giftID: parseInt(id),
          to: this.friendId,
        }
        api.sendGift(params).then(res => {
          console.log('赠送礼物返回结果', res);
          if (res.errCode === 0) {
            this.panelIndex = 3;
            this.successfulText = "送礼成功"
          } else if (res.errCode == 1023) {
            this.showQrcode(true);
          } else {
            this.panelIndex = 0; //显示充值面板
          }
        })
      },
      //赠送店铺项目
      sendShopItemGift() {
        this.panelIndex = 2;
        this.successfulText = "赠送礼物成功"
      },
      //确认赠送店铺项目
      confirmShopItemGift(recommendID) {
        api.convertRecommend(recommendID).then(res => {
          console.log('兑换结果--------------', res);
          if (res.errCode && res.errCode == 1021) {
            this.successfulText = "您已兑换，兑换券已发放至你优惠券列表"
          } else {
            this.successfulText = "兑换成功，兑换券已发放至你优惠券列表"
          }
        }).catch(err => {
          console.log(err)
        });
        alert('测试')
        this.panelIndex = 3;
      },
      //   充值
      payForCoin(id) {
        //   console.log(id);
        api.createOrder(id).then(res => {
          if (res.errCode === 0) {
            let resultInfo = res.data;
            console.log(resultInfo);
            let _this = this;
            WeixinJSBridge.invoke(
              "getBrandWCPayRequest", {
                "appId": resultInfo.appId, //公众号名称，由商户传入
                "timeStamp": "" + resultInfo.timeStamp, //时间戳，自1970年以来的秒数
                "nonceStr": resultInfo.nonceStr, //随机串
                "package": resultInfo.package,
                "signType": resultInfo.signType, //微信签名方式：
                "paySign": resultInfo.paySign //微信签名
              },
              (res) => {
                console.log(res);
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  // alert("微信支付成功");
                  this.panelIndex = 0;
                  api.getUserInfo("/api/loadUserInfo").then(res => {
                      this.getUserInfo(res);
                    })
                    .catch(err => {
                      console.log(err);
                    });
                  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                }
              }
            );
          }
        });
      },
      ...mapMutations({
        showQrcode: "SHOW_QRCODE", //暂时二维码
      })
    },
    components: {}
  }
</script>

<style scoped lang='less'>
  @import "../../assets/less/mixin.less";
  .topUp_wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 100;
    .coinBox {
      width: 100%;
      height: 4.48rem; // transform: translateY(50%);
      margin: 50% auto;
      background-color: #fff;
      .coinBox_top {
        display: flex;
        justify-content: space-between;
        padding: 0.3333rem 0.36rem;
        .integral_box {
          display: flex;
          .integral {
            width: 0.8rem;
            height: 0.8rem;
          }
          .integral_text {
            padding-top: 0.2667rem;
            padding-left: 0.1333rem;
            font-weight: 700;
          }
        }
        .close {
          padding-top: 0.1333rem;
          width: 0.5333rem;
          height: 0.5333rem;
        }
      }
      .coinBox_bottom {
        .coinList {
          display: flex;
          justify-content: space-between;
          padding: 0 1.2rem 0 0.7rem;
          .coinItem {
            width: 0.9333rem;
            .coin200 {
              width: 100%;
              margin-top: 0.96rem;
            }
            .coin1000 {
              width: 100%;
              margin-top: 0.72rem;
            }
            .coin5000 {
              width: 100%;
              margin-top: 0.32rem;
            }
            .coin10000 {
              width: 1.28rem;
              margin-top: 0.32rem;
            }
            .intergral {
              width: 100%;
              text-align: center;
              color: #ffdf03;
            }
            .moneyCount {
              margin-top: 0.3rem;
            }
          }
        }
      }
    }
    .giftPanelBox {
      margin: 50% auto;
      background-color: #fff;
      width: 100%; // height: 6.5rem;
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
          justify-content: space-around;
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
          justify-content: space-around;
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
          justify-content: space-around;
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
          top: 0.3333rem;
          right: 0.2667rem;
          width: 0.5667rem;
          height: 0.5667rem;
          text-align: center;
        }
        .giftBoxIfon {
          width: 0.6rem;
          height: 0.6rem;
          margin-right: 0.1667rem;
        }
        .header_text {
          font-size: 0.35rem;
          color: #333;
          padding-top: 0.0833rem;
        }
      }
      .content {
        display: flex; // justify-content: space-between;
        padding: 0 0.4rem;
        .pictureBox {
          margin-left: 0.7rem;
          .pictureBox_img {
            width: 2.5rem;
            height: 2rem;
            margin-right: 0.667rem;
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
        padding-top: 0.3rem;
        .btn {
          padding: 0.08rem 0.1067rem;
          border: none;
          background: -webkit-linear-gradient(top, #fcd502, #e59305);
        }
      }
    }
    .successfullyBox {
      width: 100%; // .envelope {
      margin: 50% auto;
      width: 4.7333rem;
      height: 3.0533rem;
      .bg("../../assets/image/envelop.png");
      position: relative;
      .myWelfare {
        position: absolute;
        left: 0.4rem;
        bottom: 0.2333rem;
        display: flex;
        .welIcon {
          width: 0.5rem;
          height: 0.5rem;
          margin-right: 0.1333rem;
        }
        p {
          margin-top: 0.133rem;
          font-size: 0.2667rem;
        }
      }
      .close {
        width: 0.4667rem;
        height: 0.4667rem;
        text-align: right;
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
        font-size: 0.44rem;
        text-align: center;
      }
      .gotoTopUpText {
        position: absolute;
        bottom: 0.2533rem;
        right: 0.18rem;
      } // }
    }
  }
</style>
