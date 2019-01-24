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
          <img v-show="componentGiftList.length>0" src="../../assets/image/integralIcon.png" alt class="integralIcon">
          <p v-show="componentGiftList.length>0" class="giftListpart_desc">虚拟礼物</p>
          <ul class="list">
            <li class="item" v-for="(item,index) in componentGiftList" :key="index" @click="sendGift(item.id,index)">
              <img :src="item.imgUrl" alt class="giftIcon">
              <p class="price">积分:{{item.money}}</p>
            </li>
          </ul>
        </div>
        <div class="shopItemListpart vux-1px-b" v-if="recommentList.length>0">
          <img v-show="recommentList.length>0" src="../../assets/image/integralIcon.png" alt class="integralIcon">
          <p v-show="recommentList.length>0" class="giftListpart_desc">门店项目</p>
          <ul class="list">
            <li class="item" v-for="(item,index) in recommentList" :key="index" @click="sendShopItemGift(item)">
              <img :src="item.goods.image" alt class="giftIcon">
              <p class="price">积分:{{item.goods.integral}}</p>
            </li>
          </ul>
        </div>
        <div class="entityGiftListpart">
          <img src="../../assets/image/integralIcon.png" alt class="integralIcon">
          <p class="giftListpart_desc">礼品商城</p>
          <ul class="list">
            <li class="item" v-for="(item,index) in sendGiftList" :key="index" @click="sendJiFenGift(item)">
              <img :src="item.goods.image" alt class="giftIcon">
              <p class="price">积分:{{item.goods.integral}}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 确认送礼物面板 -->
      <div class="sendGiftPanelBox" v-else-if="panelIndex===2" key="sendGiftPanelBox">
        <div class="header">
          <img v-if="componentConvertType == 0 || componentConvertType == 1" src="../../assets/image/integralIcon.png" class="giftBoxIfon">
          <img v-else src="../../assets/image/giftBox.png" class="giftBoxIfon">
          <p class="header_text">消耗积分{{componentGiftInfo.goods.integral}}</p>
          <div class="close" @click="closeIntegralPanel">X</div>
        </div>
        <div class="content">
          <div class="pictureBox">
            <img :src="componentGiftInfo.goods.image" alt class="pictureBox_img">
          </div>
          <div class="componentGiftInfoBox">
            <p class="title">{{componentGiftInfo.goods.name}}</p>
            <p class="desc">{{componentGiftInfo.goods.subtopic}}</p>
            <p class="limit">{{componentGiftInfo.goods.limit}}</p>
            <p class="price" v-if="componentConvertType===0 ||componentConvertType===1||componentConvertType===2 ||componentConvertType===3">特惠 ￥{{componentGiftInfo.goods.discountPrice}}</p>
            <p class="price" v-else>对方将收到{{componentGiftInfo.goods.integral}}积分</p>
          </div>
        </div>
        <div class="handle">
          <button v-if="componentConvertType===0 || componentConvertType===1" class="btn" @click="confirmShopItemGift(componentGiftInfo.goods.ID)">确认兑换</button>
          <button v-else class="btn" @click="confirmShopItemGift(componentGiftInfo.goods.ID)">确认赠送</button>
          <div class="checkBox_scene clearfix" v-if="(componentConvertType == 2 || componentConvertType==3) && isInDoor">
            <input type="checkbox" class="checkbox fl">
            <span class="scene-text fl">现场下单</span>
          </div>
        </div>
        <div class="myMoney">我的积分:{{userInfo.money}}</div>
      </div>
      <!-- 成功送礼提示框 -->
      <div class="successfullyBox" v-else="panelIndex===3" key="successfullyBox">
        <div class="envelope">
          <div class="close" @click="closeIntegralPanel">X</div>
          <img src="../../assets/image/integralIcon.png" alt class="integralIcon">
          <p class="successful_text">{{successfulText}}</p>
          <p class="successful_desc">{{successful_desc}}</p>
          <p class="gotoTopUpText" @click="gotoTopUp">去充值&gt;</p>
        </div>
        <div class="myMoney">我的积分:{{userInfo.money}}</div>
      </div>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
  import api from "common/api";
  import util from 'common/util'
  import {
    mapState,
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        panelIndex: null,
        componentGiftInfo: "",
        componentConvertType: null,
        componentGiftList: [],
        successfulText: "送礼失败",
        successful_desc: "",
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
      ...mapState(['giftList', 'userInfo']),
      ...mapGetters(['recommentList', "sendGiftList"])
    },
    created() {
      this.panelIndex = this.fatherPanelIndex;
      this.componentGiftInfo = this.giftInfo;
      this.componentConvertType = this.convertType;
      console.log('this.componentConvertType------------', this.componentConvertType)
      api.loadAllGift().then(res => {
        if (res.errCode === 0) {
          let TempGiftList = res.gifts;
          this.componentGiftList = TempGiftList.map((item, index) => {
            switch (index) {
              case 0:
                item.imgUrl = require('../../assets/image/beer.png');
                item.name = "一杯啤酒"
                return item;
                break;
              case 1:
                item.imgUrl = require('../../assets/image/flower.png');
                item.name = "一朵鲜花"
                return item;
                break;
              case 2:
                item.imgUrl = require('../../assets/image/hutui.png');
                item.name = "一栋别墅"
                return item;
                break;
              case 3:
                item.imgUrl = require('../../assets/image/boat.png');
                item.name = "一艘邮轮"
                return item;
                break;
              default:
                break;
            }
          })
        }
      })
      console.log(this.componentGiftList);
    },
    mounted() {},
    props: {
      convertType: { //是自己兑换还是送礼模式
        type: Number,
        default: null,
      },
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
      },
      isInDoor: {
        type: Boolean,
        default: false
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
      sendGift(id, index) {
        this.panelIndex = 2;
        this.componentConvertType = 4;
        let tempVirtualGift = {
          goods: {
            name: this.componentGiftList[index].name,
            image: this.componentGiftList[index].imgUrl,
            integral: this.componentGiftList[index].money,
            ID: this.componentGiftList[index].id
          }
        };
        this.componentGiftInfo = tempVirtualGift;
      },
      // converType 0:店长推荐，1:积分换礼品兑换 ,2:赠送店长推荐项目,3:赠送积分换礼品项目,4:虚拟礼物
      //赠送店铺项目
      sendShopItemGift(goodsInfo) {
        this.componentConvertType = 2;
        this.componentGiftInfo = goodsInfo;
        this.panelIndex = 2;
        this.successfulText = "赠送礼物成功,扣除" + this.componentGiftInfo.goods.integral + "积分";
      },
      //赠送积分换礼品项目
      sendJiFenGift(goodsInfo) {
        this.componentConvertType = 3;
        this.componentGiftInfo = goodsInfo;
        this.panelIndex = 2;
        this.successfulText = "赠送礼物成功,扣除" + this.componentGiftInfo.goods.integral + "积分";
      },
      //确认赠送店铺项目
      confirmShopItemGift(goodID) {
        //店长推荐兑换
        if (this.componentConvertType == 0) {
          api.convertRecommend(goodID).then(res => {
            console.log('店长推荐兑换结果--------------', res);
            if (res.errCode && res.errCode == 1021) {
              this.successfulText = "您已兑换"
            } else if (res.errCode == 1029) {
              this.successfulText = "积分不足，请点右下角前往充值";
              this.successful_desc = ``;
              return;
            } else {
              this.successfulText = "兑换成功"
            }
            this.successful_desc = `一张${util.returnDiscountType(this.componentGiftInfo.coupInfo.type)}已存入'我的卡券'`
          }).catch(err => {
            console.log(err)
          });
        } else if (this.componentConvertType == 1) { //积分换礼品兑换
          api.convertGoods(goodID).then(res => {
            console.log('积分换礼品兑换结果---------', res)
            if (res.errCode && res.errCode == 1021) {
              this.successfulText = "您已兑换"
            } else if (res.errCode == 1029) {
              this.successfulText = "积分不足，请点右下角前往充值"
              this.successful_desc = ``;
              return;
            } else if (res.errCode == 1023) {
              this.showQrcode(true);
            } else {
              this.successfulText = "兑换成功"
            }
            this.successful_desc = `一张${util.returnDiscountType(this.componentGiftInfo.coupInfo.type)}已存入'我的卡券'`
          })
        } else if (this.componentConvertType == 2) { //赠送店长推荐项目
          api.sentRecommend(goodID, this.friendId).then(res => {
            console.log('店长推荐赠送结果---------', res)
            if (res.errCode == 1029) {
              this.successfulText = "积分不足，请点右下角前往充值";
              this.successful_desc = ``;
              return;
            } else if (res.errCode == 1023) {
              this.showQrcode(true);
            }
            this.successful_desc = `一张${util.returnDiscountType(this.componentGiftInfo.coupInfo.type)}已存入对方'我的卡券'`
          })
        } else if (this.componentConvertType == 3) { //赠送积分换礼品项目
          api.sentGoods(goodID, this.friendId).then(res => {
            if (res.errCode == 1029) {
              this.successfulText = "积分不足，请点右下角前往充值"
              this.successful_desc = ``;
              return;
            } else if (res.errCode == 1023) {
              this.showQrcode(true);
            }
            this.successful_desc = `一张${util.returnDiscountType(this.componentGiftInfo.coupInfo.type)}已存入对方'我的卡券'`
            // console.log('积分赠送结果---------', res)
          })
        } else if (this.componentConvertType == 4) { //赠送虚拟礼物
          let params = {
            giftID: parseInt(goodID),
            to: this.friendId,
          }
          api.sendGift(params).then(res => {
            console.log('赠送礼物返回结果', res);
            if (res.errCode === 0) {
              this.successfulText = "赠送礼物成功,扣除您" + this.componentGiftInfo.goods.integral + "积分"
            } else if (res.errCode == 1023) {
              this.showQrcode(true);
            } else if (res.errCode == 1029) {
              this.successfulText = "积分不足，请点右下角前往充值"
            }
          })
        }
        api.getUserInfo("/api/loadUserInfo").then(res => {
          this.getUserInfo(res);
          this.panelIndex = 3;
        })
      },
      //   充值
      payForCoin(id) {
          console.log(id);
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
                  alert("微信支付成功");
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
        getUserInfo: "GET_USERINFO" //获取用户信息
      })
    },
    components: {}
  }
</script>

<style scoped lang='less'>
  @import "../../assets/less/mixin.less";
  .clearfix::after {
    content: "";
    display: block;
    visibility: hidden;
    height: 0;
    line-height: 0;
    clear: both;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
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
        .giftListpart_desc {
          position: absolute;
          top: 0.1333rem;
          color: #f2e252;
        }
        .list {
          display: flex;
          justify-content: space-around;
          padding: 0.1133rem 0.7rem;
          .item {
            text-align: center;
            .giftIcon {
              width: 1rem;
              height: 1rem;
            }
            .price {
              width: 1.4rem;
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
        .giftListpart_desc {
          position: absolute;
          top: 0.1333rem;
          color: #f2e252;
        }
        .list {
          display: flex;
          justify-content: space-around;
          padding: 0.1133rem 0.7rem;
          .item {
            text-align: center;
            .giftIcon {
              width: 1rem;
              height: 1rem;
            }
            .price {
              width: 1.4rem;
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
        .giftListpart_desc {
          position: absolute;
          top: 0.1333rem;
          color: #f2e252;
        }
        .list {
          display: flex;
          justify-content: space-around;
          padding: 0.1133rem 0.7rem;
          .item {
            text-align: center;
            .giftIcon {
              width: 1rem;
              height: 1rem;
            }
            .price {
              width: 1.4rem;
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
      position: relative;
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
          font-size: 0.4rem;
          font-weight: 800;
          color: #e59305;
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
            width: 2rem;
            height: 2rem;
            margin-right: 0.667rem;
          }
        }
        .componentGiftInfoBox {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        .giftInfoBox {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
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
        padding-bottom: 0.3rem;
        position: relative;
        .btn {
          padding: 0.08rem 0.1067rem;
          border: none;
          background: -webkit-linear-gradient(top, #fcd502, #e59305);
        }
        .checkBox_scene {
          position: absolute;
          bottom: 0.4rem;
          right: 0.6rem;
          .checkbox {
            width: 0.4rem;
            height: 0.4rem;
          }
          .scene-text {
            // padding-bottom: 0.11rem;
            margin-left: 0.1333rem;
            vertical-align: middle;
          }
        }
      }
      .myMoney {
        position: absolute;
        left: 0.2333rem;
        bottom: 0.3333rem;
      }
    }
    .successfullyBox {
      width: 100%; // .envelope {
      margin: 50% auto;
      width: 5.5rem;
      height: 3.2533rem;
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
        text-align: center;
        position: absolute;
        top: 0.2333rem;
        right: 0.1933rem;
        font-size: 0.4rem;
        font-weight: 800;
        color: #e59305;
      }
      .integralIcon {
        margin-top: 0.2267rem;
        margin-left: 0.36rem;
        width: 0.6rem;
        height: 0.6rem;
      }
      .successful_text {
        margin-top: 0.2667rem;
        font-size: 0.38rem;
        text-align: center;
      }
      .successful_desc {
        margin-top: 0.1667rem;
        font-size: 0.3rem;
        text-align: center;
        color: #8f8f8f;
      }
      .gotoTopUpText {
        position: absolute;
        bottom: 0.2533rem;
        right: 0.18rem;
      } // }
      .myMoney {
        position: absolute;
        left: 0.2333rem;
        bottom: 0.3333rem;
      }
    }
  }
</style>
