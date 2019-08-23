<template>
  <div class="topUp_wrapper">
    <transition name="fade" mode="out-in">
      <div class="coinBox" v-if="panelIndex===0" key="coinBox">
        <div class="coinBox_top vux-1px-b">
          <div class="integral_box">
            <img onclick="return false" src="../../assets/image/integralIcon.png" alt="icon" class="integral">
            <p class="integral_text">积分充值：<span v-if="showOweText">尚欠积分:{{Math.abs(userInfo.money-componentGiftInfo.goods.integral)}}</span></p>
          </div>
          <img onclick="return false" src="../../assets/image/close-round.png" alt="icon" class="close" @click="closeIntegralPanel">
        </div>
        <div class="coinBox_bottom">
          <ul class="coinList">
            <li class="coinItem" v-for="(item,index) in moneyList" :key="item.id" @click="payForCoin(item.id,index)">
              <img onclick="return false" :src="item.imgUrl" :class="[item.iconClass,{bigAndSamll:index===clickIndex}]">
              <p class="intergral">{{item.points}}</p>
              <p class="moneyCount">￥{{item.name}}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 选择送礼物的面板 -->
      <div class="giftPanelBox" v-else-if="panelIndex===1" key="giftPanelBox">
        <div class="giftPanelBox_title vux-1px-b">
          <p class="desc">请选择赠送对方的礼物</p>
          <img onclick="return false" src="../../assets/image/close-round.png" alt class="close" @click="closeIntegralPanel">
        </div>
        <div class="giftListpart vux-1px-b">
          <img onclick="return false" v-show="componentGiftList.length>0" src="../../assets/image/integralIcon.png" alt class="integralIcon">
          <p v-show="componentGiftList.length>0" class="giftListpart_desc0">虚拟</p>
          <p v-show="componentGiftList.length>0" class="giftListpart_desc1">礼物</p>
          <ul class="list">
            <li class="item" v-for="(item,index) in componentGiftList" :key="index" @click="sendVirtualGift(item.id,index,item)">
              <img onclick="return false" :src="item.imgUrl" alt class="giftIcon">
              <p class="price">{{item.money}}</p>
            </li>
          </ul>
        </div>
        <div class="shopItemListpart vux-1px-b" v-if="recommentList.length>0">
          <img onclick="return false" v-show="recommentList.length>0" src="../../assets/image/integralIcon.png" alt class="integralIcon">
          <p v-show="recommentList.length>0" class="giftListpart_desc0">门店</p>
          <p v-show="recommentList.length>0" class="giftListpart_desc1">项目</p>
          <ul class="list">
            <li class="item" v-for="(item,index) in recommentList" :key="index" @click="sendShopItemGift(item)">
              <img onclick="return false" :src="item.goods.image" alt class="giftIcon">
              <p class="price">{{item.goods.integral}}</p>
            </li>
          </ul>
        </div>
        <div class="entityGiftListpart">
          <img onclick="return false" v-show="sendGiftList.length>0" src="../../assets/image/integralIcon.png" alt class="integralIcon">
          <p v-show="sendGiftList.length>0" class="giftListpart_desc0">礼品</p>
          <p v-show="sendGiftList.length>0" class="giftListpart_desc1">商城</p>
          <ul class="list">
            <li class="item" v-for="(item,index) in sendGiftList" :key="index" @click="sendJiFenGift(item)">
              <img onclick="return false" :src="item.goods.image" alt class="giftIcon">
              <p class="price">{{item.goods.integral}}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 确认送礼物面板 -->
      <div class="sendGiftPanelBox" v-else-if="panelIndex===2" key="sendGiftPanelBox">
        <div class="header">
          <img onclick="return false" v-if="componentConvertType == 0 || componentConvertType == 1" src="../../assets/image/integralIcon.png" class="giftBoxIfon">
          <img onclick="return false" v-else src="../../assets/image/giftBox.png" class="giftBoxIfon">
          <p class="header_text">消耗积分{{componentGiftInfo.goods.integral}} &nbsp;&nbsp;&nbsp;我的积分:{{userInfo.money}}</p>
          <div class="close" @click="closeIntegralPanel">X</div>
        </div>
        <div class="content">
          <div class="pictureBox">
            <img onclick="return false" :src="componentGiftInfo.goods.image" alt class="pictureBox_img">
          </div>
          <div class="componentGiftInfoBox">
            <p class="title">{{componentGiftInfo.goods.name}}</p>
            <p class="desc">{{componentGiftInfo.goods.subtopic}}</p>
            <p class="limit">{{componentGiftInfo.goods.limit}}</p>
            <p class="price" v-if="componentConvertType===0 ||componentConvertType===1||componentConvertType===2 ||componentConvertType===3">原价￥{{componentGiftInfo.goods.discountPrice}}&nbsp;&nbsp;&nbsp;<span style="color:red">积分换${{componentGiftInfo.goods.integral}}</span></p>
            <p class="price" v-else>对方将收到{{componentGiftInfo.goods.integral}}积分</p>
          </div>
        </div>
        <div class="handle">
          <!-- :class="{greyBtn:userInfo.money<giftIntegral}" -->
          <button v-if="componentConvertType===0 || componentConvertType===1" class="btn" @click="confirmShopItemGift(componentGiftInfo.goods.id)">{{userInfo.money>giftIntegral?'确认兑换':'积分不足,请充值'}}</button>
          <button v-else class="btn" @click="confirmShopItemGift(componentGiftInfo.goods.id)">{{userInfo.money>giftIntegral?'确认赠送':'余额不足,请充值'}}</button>
          <div class="checkBox_scene clearfix" v-if="(componentConvertType == 2 || componentConvertType==3) && isInDoor && userInfo.money>giftIntegral ">
            <!-- <input @change="onlineSendGift" type="checkbox" class="checkbox fl">
            <span class="scene-text fl">现场下单</span> -->
          </div>
          <!-- <p class="gotoTopUpText" v-if="userInfo.money<giftIntegral" @click="gotoTopUp">去充值&gt;</p> -->
        </div>
        <div class="myMoney" v-if="userInfo.money-componentGiftInfo.goods.integral>0?false:true">尚欠积分:{{Math.abs(userInfo.money-componentGiftInfo.goods.integral)}}</div>
      </div>
      <!-- 成功送礼提示框 -->
      <div class="successfullyBox" v-else-if="panelIndex===3" key="successfullyBox">
        <div class="envelope">
          <div class="close" @click="closeIntegralPanel">X</div>
          <div class="integralIcon_wrapper">
            <img onclick="return false" src="../../assets/image/integralIcon.png" alt class="integralIcon">
            <div class="integralIcon_text">消耗积分:{{componentGiftInfo.goods.integral}} &nbsp;&nbsp;&nbsp;我的积分:{{userInfo.money}}</div>
          </div>
          <p class="successful_text">{{successfulText}}</p>
          <p class="successful_desc">{{successful_desc}}</p>
          <button @click="closeIntegralPanel" class="btn">确认</button>
          <p class="gotoTopUpText" @click="gotoTopUp">去充值&gt;</p>
        </div>
        <!-- <div class="myMoney">我的积分:{{userInfo.money}}</div> -->
      </div>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
  import api from "common/api";
  import util from 'common/util';
  import Bus from 'common/bus.js'
  import {
    mapState,
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        clickIndex:null,
        showOweText: false,
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
      ...mapState(['giftList', 'userInfo',"l98Setting"]),
      ...mapGetters(['recommentList', "sendGiftList"])
    },
    created() {
      this.panelIndex = this.fatherPanelIndex;
      this.componentGiftInfo = this.giftInfo;
      console.log(this.componentGiftInfo)
      if (this.componentGiftInfo) {
        this.giftIntegral = this.componentGiftInfo.goods.integral; //店长推荐和礼品商城
      }
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
      //现场送
      onlineSendGift(e) {
        console.log(e.target.checked)
        console.log("触发现场送")
      },
      closeIntegralPanel() {
        this.$emit("closeIntegralPanel", false);
        this.panelIndex = 1;
      },
      // 前往充值
      gotoTopUp() {
        this.panelIndex = 0;
      },
      //发送虚拟礼物
      sendVirtualGift(id, index, giftInfo) {
        this.VirtualGiftInfo = giftInfo;
        this.componentConvertType = 4;
        let tempVirtualGift = {
          goods: {
            name: this.componentGiftList[index].name,
            image: this.componentGiftList[index].imgUrl,
            integral: this.componentGiftList[index].money,
            id: this.componentGiftList[index].id
          }
        };
        this.giftIntegral = this.componentGiftList[index].money;
        this.panelIndex = 2;
        this.componentGiftInfo = tempVirtualGift;
      },
      // converType 0:店长推荐，1:积分换礼品兑换 ,2:赠送店长推荐项目,3:赠送积分换礼品项目,4:虚拟礼物
      //赠送店铺项目
      sendShopItemGift(goodsInfo) {
        this.entityGoodInfo = goodsInfo;
        this.componentConvertType = 2;
        this.componentGiftInfo = goodsInfo;
        this.giftIntegral = goodsInfo.goods.integral;
        this.panelIndex = 2;
        this.successfulText = "赠送礼物成功,扣除" + this.componentGiftInfo.goods.integral + "积分";
      },
      //赠送积分换礼品项目
      sendJiFenGift(goodsInfo) {
        this.entityGoodInfo = goodsInfo;
        this.componentConvertType = 3;
        this.componentGiftInfo = goodsInfo;
        this.giftIntegral = goodsInfo.goods.integral
        this.panelIndex = 2;
        this.successfulText = "赠送礼物成功,扣除" + this.componentGiftInfo.goods.integral + "积分";
      },
      //确认赠送店铺项目
      confirmShopItemGift(goodID) {
        if (this.userInfo.money < this.giftIntegral) { //当前积分少于项目消耗积分
          this.panelIndex = 0
          this.showOweText = true;
          return
        }
        this.showOweText = false;
        if (this.componentConvertType == 0) { //店长推荐兑换
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
              this.refreshUserInfo()
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
              this.refreshUserInfo()
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
              return
            }else{
              this.refreshUserInfo()
            }
            Bus.$emit("giftInfoRecomend", this.entityGoodInfo);
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
              return
            }else if(res.errCode==0){
              this.refreshUserInfo()
            }
            Bus.$emit("giftInfoJiFen", this.entityGoodInfo);
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
              this.refreshUserInfo()
              this.successfulText = "赠送礼物成功,扣除您" + this.componentGiftInfo.goods.integral + "积分"
              Bus.$emit("VirtualGiftInfo", this.VirtualGiftInfo);
            } else if (res.errCode == 1023) {
              this.successfulText = "赠送礼物成功,扣除您" + this.componentGiftInfo.goods.integral + "积分"
              setTimeout(() => {
                this.showQrcode(true);
                return
              }, 700);
            } else if (res.errCode == 1029) {
              this.successfulText = "积分不足，请点右下角前往充值"
            }
          })
        }
        setTimeout(() => {
          if(!this.userInfo.isSubscribe){
            this.changeQrCodeText({
                  title:"长按关注，即可兑换门店礼物/门店项目",
                  bottomText:"会员特权:领福利、交群友、参活动"
              })
             this.showQrcode(true);
          }
        }, 1000);
      },
      refreshUserInfo() {
        api.getUserInfo("/api/loadUserInfo").then(res => {
          console.log("个人信息-------", res)
          this.getUserInfo(res);
          this.panelIndex = 3;
        })
      },
      //   充值
      payForCoin(id,index) {
        console.log(id);
        if(!this.l98Setting.integralConvertOpen){
          this.$vux.toast.text('商家未开通本功能', 'middle')
          return
        }
        this.clickIndex = index;
        setTimeout(() => {
          this.clickIndex = null;
        }, 200);
        api.createOrder(id).then(res => {
          if (res.errCode === 0) {
            let resultInfo = res.data;
            console.log("resultInfo----------", resultInfo);
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
                console.log("WeixinJSBridge.invoke-res", res);
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  alert("微信支付成功");
                  api.getUserInfo("/api/loadUserInfo").then(res => {
                      this.getUserInfo(res);
                      this.panelIndex = 1;
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
         changeQrCodeText:"CHANGEQRCODETEXT",
        showQrcode: "SHOW_QRCODE", //暂时二维码
        getUserInfo: "GET_USERINFO" //获取用户信息
      })
    },
    components: {}
  }
</script>

<style scoped lang='less'>
  @import "../../assets/less/mixin.less";
  @import "../../assets/less/topUp.less";
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
      width: 100%; // height: 5rem; // transform: translateY(50%);
      margin: 50% auto; // background-color: #fff;
      .bg('../../assets/image/envelop.png');
      .coinBox_top {
        display: flex;
        justify-content: space-between;
        padding: 0.4333rem .4rem 0.2rem .4rem;
        height: 1.4667rem;
        box-sizing: border-box;
        .integral_box {
          display: flex;
          .integral {
            width: 0.7rem;
            height: 0.7rem;
          }
          .integral_text {
            padding-top: 0.2667rem;
            padding-left: 0.1333rem;
            font-weight: 700;
          }
        }
        .close {
          // padding-top: 0.1333rem;
          padding: 0.1333rem;
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
            box-sizing: border-box;
            .bigAndSamll{
             transition: all .5s linear;
             transform: scale(.5)
            }
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
              width: 1rem;
              border-radius: 0.1333rem;
              text-align: center;
              border: 1px solid #333;
              margin-top: 0.7rem;
              margin-bottom: 0.7rem;
            }
          }
        }
      }
    }
    .giftPanelBox {
      margin: 40% auto; // background-color: #fff;
      // padding-top: 0.7333rem;
      // width: 100%;
      width: 9.3333rem;
      box-sizing: border-box;
      .bg('../../assets/image/envelop.png'); // background-image: url('../../assets/image/envelop.png')
      .giftPanelBox_title {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0.3rem .1rem .3rem;
        box-sizing: border-box;
        .desc {
          font-size: 0.4rem;
          color: #F7C600;
          margin-left: 0.1333rem;
        }
        .close {
          width: 0.48rem;
          height: 0.48rem;
          margin-right: 0.1333rem;
        }
      }
      .giftListpart {
        position: relative;
        .close {
          position: absolute;
          top: -.3rem;
          right: 0.5667rem;
          width: 0.48rem;
          height: 0.48rem;
        }
        .listTitleGroup();
        .list {
          display: flex;
          justify-content: space-around;
          padding: 0.1133rem 0.5rem 0.1133rem .9rem;
          .item {
            text-align: center;
            border-radius: 0.1067rem;
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
        .listTitleGroup();
        .list {
          display: flex;
          justify-content: space-around;
          padding: 0.1133rem 0.5rem 0.1133rem 1.1rem;
          .item {
            text-align: center;
            border-radius: 0.1067rem;
            .giftIcon {
              width: 1.4rem;
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
        padding-bottom: 0.3rem;
        .listTitleGroup();
        .list {
          display: flex;
          justify-content: space-around;
          padding: 0.1133rem 0.5rem 0.1133rem 1.1rem;
          .item {
            text-align: center;
            border-radius: 0.1067rem;
            .giftIcon {
              width: 1.4rem;
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
      width: 8.4rem; // height: 4.7rem;
      padding-bottom: 0.2333rem;
      box-sizing: border-box;
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
          p {
            margin-bottom: 0.06rem;
          }
          .title {
            font-weight: 600;
            font-size: 0.41rem;
          }
          .desc {
            color: #ccc;
          }
          .limit {
            color: #ccc;
          }
          .price {
            // font-weight: 600;
            color: #656565
          }
        }
      }
      .handle {
        width: 100%;
        text-align: center;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        position: relative; // .gotoTopUpText {
        //   position: absolute;
        //   bottom: 0.13rem;
        //   right: 0.28rem;
        //   color: #F7C600;
        //   text-decoration: underline;
        // }
        .btn {
          padding: 0.08rem 0.1067rem;
          border: none;
          background: -webkit-linear-gradient(top, #fcd502, #e59305);
          font-weight: 600;
          color: #333;
        }
        .greyBtn {
          background: gray;
          color: #333;
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
            font-weight: 600;
            margin-left: 0.1333rem;
            vertical-align: middle;
          }
        }
      }
      .myMoney {
        position: absolute;
        left: 0.2333rem;
        bottom: 0.3333rem;
        color: #333;
        font-weight: 600;
      }
    }
    .successfullyBox {
      margin: 50% auto;
      width: 8.3333rem;
      height: 4.7rem;
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
        right: 0.2933rem;
        font-size: 0.4rem;
        font-weight: 800;
        color: #e59305;
      }
      .integralIcon_wrapper {
        display: flex;
        .integralIcon {
          margin-top: 0.4267rem;
          margin-left: 0.36rem;
          width: 0.7rem;
          height: 0.7rem;
        }
        .integralIcon_text {
          box-sizing: border-box;
          padding-top: 0.6333rem;
          margin-left: 0.1333rem;
          font-size: 0.35rem;
          color: #333;
        }
      }
      .successful_text {
        margin-top: .75rem;
        font-size: 0.42rem;
        font-weight: 600;
        text-align: center;
      }
      .successful_desc {
        margin-top: 0.1667rem;
        font-size: 0.3rem;
        text-align: center;
        color: #8f8f8f;
      }
      .btn {
        position: absolute;
        bottom: .6rem;
        left: 50%;
        margin-left: -1rem;
        width: 2rem;
        text-align: center;
        letter-spacing: 0.08rem;
        padding: 0.08rem 0.1067rem;
        border: none;
        background: -webkit-linear-gradient(top, #fcd502, #e59305);
        font-weight: 600;
        color: #333;
      }
      .gotoTopUpText {
        position: absolute;
        bottom: 0.33rem;
        right: 0.28rem;
        color: #F7C600;
        text-decoration: underline;
      } // }
      .myMoney {
        position: absolute;
        left: 0.2333rem;
        bottom: 0.3333rem;
        color: #333;
        font-weight: 600;
      }
    }
  }
</style>
