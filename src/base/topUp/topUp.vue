<template>
  <div class="topUp_wrapper">
    <transition name="fade" mode="out-in">
      <div class="coinBox" v-if="panelIndex===-1" key="coinBox">
        <div class="coinBox_top vux-1px-b">
          <div class="integral_box">
            <img onclick="return false" src="../../assets/image/9.png" alt="会员卡" class="integral">
            <p class="integral_text">
              储值充值：
              <span v-if="showOweText">会员卡至少还需充值:{{Math.abs(userInfo.storeValue-componentGiftInfo.goods.vipMoney)}}</span>
            </p>
          </div>
          <div class="close" @click="closeIntegralPanel">X</div>
          <!-- <img onclick="return false" src="../../assets/image/close-round.png" alt="icon" class="close" @click="closeIntegralPanel"> -->
        </div>
        <div class="coinBox_bottom">
          <ul class="coinList">
            <li class="coinItem" v-for="(item,index) in moneyList" :key="item.id" @click="payForCoin(item.id,index,item.points)">
              <img onclick="return false" :src="item.imgUrl" :class="[item.iconClass,{bigAndSamll:index===clickIndex}]">
              <p class="intergral">{{item.points}}</p>
              <p class="moneyCount">￥{{item.name}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="coinBox" v-if="panelIndex===0" key="coinBox">
        <div class="coinBox_top vux-1px-b">
          <div class="integral_box">
            <img onclick="return false" src="../../assets/image/integralIcon.png" alt="icon" class="integral">
            <p class="integral_text">
              积分充值：
              <span v-if="showOweText">尚欠积分:{{Math.abs(userInfo.money-componentGiftInfo.goods.integral)}}</span>
            </p>
          </div>
          <div class="close" @click="closeIntegralPanel">X</div>
          <!-- <img onclick="return false" src="../../assets/image/close-round.png" alt="icon" class="close" @click="closeIntegralPanel"> -->
        </div>
        <div class="coinBox_bottom">
          <ul class="coinList">
            <li class="coinItem" v-for="(item,index) in moneyList" :key="item.id" @click="payForCoin(item.id,index,item.points)">
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
          <div class="close" @click="closeIntegralPanel">X</div>
          <!-- <img onclick="return false" src="../../assets/image/close-round.png" alt="" class="close" @click="closeIntegralPanel"> -->
          <img src="../../assets/image/quan-icon.jpg" class="staff-discount" @click="sendCouponToUser"
            v-if="userInfo.role" alt="">
        </div>
        <div class="giftListpart vux-1px-b">
          <img onclick="return false" v-show="componentGiftList.length>0" src="../../assets/image/integralIcon.png"
            alt="" class="integralIcon">
          <p v-show="componentGiftList.length>0" class="giftListpart_desc0">虚拟</p>
          <p v-show="componentGiftList.length>0" class="giftListpart_desc1">礼物</p>
          <ul class="list ">
            <li class="item virtual" v-for="(item,index) in componentGiftList" :key="index" @click="sendVirtualGift(item.id,index,item)">
              <img onclick="return false" :src="item.imgUrl" alt="" class="giftIcon">
              <p class="price">{{item.money}}</p>
            </li>
          </ul>
        </div>
        <div class="shopItemListpart vux-1px-b" v-if="recommentList.length>0">
          <img onclick="return false" v-show="recommentList.length>0" src="../../assets/image/integralIcon.png"
            alt="" class="integralIcon">
          <p v-show="recommentList.length>0" class="giftListpart_desc0">门店</p>
          <p v-show="recommentList.length>0" class="giftListpart_desc1">项目</p>
          <ul class="list">
            <li class="item" v-for="(item,index) in recommentList.slice(0,4)" :key="index" @click="sendShopItemGift(item)">
              <img onclick="return false" :src="item.goods.image" alt="" class="giftIcon">
              <p class="price">{{item.goods.integral}}</p>
            </li>
          </ul>
        </div>
        <div class="entityGiftListpart">
          <img onclick="return false" v-show="sendGiftList.length>0" src="../../assets/image/integralIcon.png"
            alt="" class="integralIcon">
          <p v-show="sendGiftList.length>0" class="giftListpart_desc0">礼品</p>
          <p v-show="sendGiftList.length>0" class="giftListpart_desc1">商城</p>
          <ul class="list">
            <li class="item" v-for="(item,index) in sendGiftList" :key="index" @click="sendJiFenGift(item)">
              <img onclick="return false" :src="item.goods.image" alt="" class="giftIcon">
              <p class="price">{{item.goods.integral}}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 确认送礼物面板 -->
      <div class="sendGiftPanelBox" v-else-if="panelIndex===2 || panelIndex===9" key="sendGiftPanelBox">
        <div class="header">
          <img onclick="return false" v-if="componentConvertType == 0 || componentConvertType == 1"
            src="../../assets/image/integralIcon.png" class="giftBoxIfon">
          <img onclick="return false" v-else src="../../assets/image/giftBox.png" class="giftBoxIfon">
          <p class="header_text">
            {{panelIndex===2?"消耗积分:":"消耗储值:"}}{{panelIndex===2?componentGiftInfo.goods.integral:componentGiftInfo.goods.vipMoney}}
            &nbsp;&nbsp;&nbsp;
            {{panelIndex===2?"我的积分:":"会员卡余额:"}}
            {{panelIndex===2?userInfo.money:userInfo.storeValue}}
          </p>
          <div class="close" @click="closeIntegralPanel">X</div>
        </div>
        <div class="content">
          <div class="pictureBox">
            <img onclick="return false" :src="componentGiftInfo.goods.image" alt="" class="pictureBox_img">
          </div>
          <div class="componentGiftInfoBox">
            <p class="title">{{componentGiftInfo.coupInfo?componentGiftInfo.coupInfo.content:componentGiftInfo.goods.name}}</p>
            <!-- <p class="desc">{{componentGiftInfo.goods.subtopic}}</p> -->
            <p class="limit">{{componentGiftInfo.coupInfo?componentGiftInfo.coupInfo.limit?componentGiftInfo.coupInfo.limit:'联系客服':""}}</p>
            <p class="price" v-if="componentConvertType===0 ||componentConvertType===1||componentConvertType===2 ||componentConvertType===3">
              原价:{{componentGiftInfo.goods.discountPrice}}&nbsp;&nbsp;&nbsp;
              <span style="color:red">{{panelIndex===2?"积分换:":"会员价:"}}{{panelIndex===2?componentGiftInfo.goods.integral:componentGiftInfo.goods.vipMoney}}</span>
            </p>
            <p class="price" v-else>对方将收到{{componentGiftInfo.goods.integral}}积分</p>
          </div>
        </div>
        <div class="handle" v-if="panelIndex===2">
          <div class="cancle" @click="closeIntegralPanel" v-text="userInfo.money<giftIntegral?'赚积分':'取消'"></div>
          <div v-if="componentConvertType===0 || componentConvertType===1" class="btn" @click="confirmShopItemGift('money',componentGiftInfo.goods.id,componentGiftInfo.goods,componentGiftInfo.coupInfo)"
            v-text="userInfo.money<giftIntegral?'充值':'确认'">
          </div>
          <div v-else class="btn" @click="confirmShopItemGift('money',componentGiftInfo.goods.id,componentGiftInfo.goods,componentGiftInfo.coupInfo)"
            v-text="userInfo.money<giftIntegral?'充值':'确认'"></div>
          <div v-show="userInfo.money<giftIntegral" class="tips_money">积分不足,请充值>></div>
        </div>
        <div class="handle" v-else-if="panelIndex===9">
          <div class="cancle" @click="closeIntegralPanel">取消</div>
          <div class="btn" @click="confirmShopItemGift('storeValue',componentGiftInfo.goods.id,componentGiftInfo.goods,componentGiftInfo.coupInfo)"
            v-text="userInfo.storeValue<componentGiftInfo.goods.vipMoney?'充值':'确认'">
          </div>
          <div v-show="userInfo.storeValue<componentGiftInfo.goods.vipMoney" class="tips_money">储值不足,请前往充值</div>
        </div>
      </div>
      <!-- 成功送礼提示框 -->
      <div class="successfullyBox" v-else-if="panelIndex===3">
        <div class="envelope">
          <div class="close" @click="closeIntegralPanel">X</div>
          <div class="integralIcon_wrapper">
            <img onclick="return false" src="../../assets/image/integralIcon.png" alt="" class="integralIcon">
            <div class="integralIcon_text">{{successfulText}}</div>
          </div>
          <p class="successful_text">{{successful_desc}}</p>
          <!-- <p class="successful_desc"></p> -->
          <div @click="gotoTopUp" class="payBtn">充值</div>
          <div @click="comfirm" class="btn">知道</div>
        </div>
      </div>
      <!-- 充值成功面板 -->
      <div class="successfullyBox" v-else-if="panelIndex===4">
        <div class="envelope">
          <div class="close" @click="closeIntegralPanel">X</div>
          <div class="integralIcon_wrapper">
            <img onclick="return false" src="../../assets/image/integralIcon.png" alt="" class="integralIcon">
            <div class="integralIcon_text">我的积分:{{userInfo.money}}</div>
          </div>
          <p class="successful_text">充值成功,增加{{moneyPoint}}积分</p>
          <div @click="closeIntegralPanel" class="btn">确认</div>
        </div>
      </div>
      <!-- 未开通充值面板提醒 -->
      <div class="successfullyBox" v-else-if="panelIndex===5">
        <div class="envelope">
          <div class="close" @click="closeIntegralPanel">X</div>
          <div class="integralIcon_wrapper">
            <img onclick="return false" src="../../assets/image/integralIcon.png" alt="" class="integralIcon">
            <div class="integralIcon_text">未开通充值功能</div>
          </div>

          <p style="padding:0 .3rem" class="successful_text">您可通过分享朋友圈或好友群赚积分，重复分享无效</p>
          <div @click="gotoPage('mine')" class="payBtn">赚积分</div>
          <div @click="closeIntegralPanel" class="btn">确认</div>
        </div>
      </div>
      <!-- 修改流水时间 -->
      <div class="successfullyBox" v-else-if="panelIndex===6">
        <div class="envelope">
          <div class="close" @click="closeSchedule">X</div>
          <div class="integralIcon_wrapper">
            <!-- <img onclick="return false" src="../../assets/image/integralIcon.png" alt="" class="integralIcon"> -->
            <div class="integralIcon_text">交班调整提醒</div>
          </div>
          <p style="padding:0 .3rem" class="successful_text">请对照对帐单的时间，选择是否需要把核销券时间前移计入上一班？</p>
          <div @click="noMove" class="payBtn">不用</div>
          <div @click="changeCasierTime" class="btn">前移</div>
        </div>
      </div>
      <div class="successfullyBox" v-else-if="panelIndex===7">
        <div class="envelope">
          <div class="close" @click="closeIntegralPanel">X</div>
          <div class="integralIcon_wrapper">
            <img onclick="return false" src="../../assets/image/integralIcon.png" alt="" class="integralIcon">
            <div class="integralIcon_text">积分不足，您的积分余额：{{userInfo.money}}</div>
          </div>
          <p style="padding:0 .3rem" class="successful_text">您可通过分享朋友圈好友群赚积分，也可以充值换积分</p>
          <div @click="gotoPage('mine')" class="payBtn">赚积分</div>
          <div @click="panelIndex = 0" class="btn">充值</div>
        </div>
      </div>
      <!-- 拼团成功提醒 -->
      <div class="successfullyBox" v-else-if="panelIndex===8">
        <div class="envelope">
          <div class="close" @click="closeSchedule">X</div>
          <div class="integralIcon_wrapper">
            <!-- <img onclick="return false" src="../../assets/image/integralIcon.png" alt="" class="integralIcon"> -->
            <div class="integralIcon_text">拼团成功</div>
          </div>
          <p style="padding:0 .3rem" class="successful_text">恭喜拼团成功！一张团购券已存入你的卡券包</p>
          <div @click="gotoPage('card')" class="payBtn">详情</div>
          <div @click="closeIntegralPanel" class="btn">知道</div>
        </div>
      </div>
      <!-- 确认拼团吗 -->
      <!-- <div class="successfullyBox" v-else-if="panelIndex==11">
                <div class="envelope">
                    <div class="close" @click="closeSchedule">X</div>
                    <div class="integralIcon_wrapper">
                        <div class="integralIcon_text">拼团啦</div>
                    </div>
                    <p style="padding:0 .3rem" class="successful_text">拼团{{groupBookAward.name}},消耗积分：{{groupBookAward.groupShoppingPrice}}</p>
                    <div @click="closeIntegralPanel" class="payBtn">取消</div>
                    <div @click="joinGroupBookAward" class="btn">确认</div>
                </div>
            </div> -->
      <div class="successfullyBox" v-else-if="panelIndex===10">
        <div class="envelope">
          <div class="close" @click="closeIntegralPanel">X</div>
          <div class="integralIcon_wrapper">
            <img onclick="return false" src="../../assets/image/integralIcon.png" alt="" class="integralIcon">
            <!-- <div class="integralIcon_text">消耗积分:{{componentGiftInfo.goods.integral}} &nbsp;&nbsp;&nbsp;我的积分:{{userInfo.money}}</div> -->
          </div>
          <p class="successful_text">{{successfulText}}</p>
          <p class="successful_desc">{{successful_desc}}</p>
          <!-- <div @click="gotoTopUp" class="payBtn">充值</div> -->
          <div @click="goToBandPhone" class="btn">确定</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
import api from 'common/api'
import config from 'common/config'
import util from 'common/util'
import Bus from 'common/bus.js'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      clickIndex: null,
      showOweText: false,
      panelIndex: null,
      componentGiftInfo: '',
      moneyPoint: '',
      componentConvertType: null,
      componentGiftList: [],
      successfulText: '送礼失败',
      successful_desc: '',
      moneyList: [
        {
          id: 1,
          name: '2',
          money: 2,
          points: 200,
          imgUrl: require('../../assets/image/200coin.png'),
          iconClass: 'coin200'
        },
        {
          id: 2,
          name: '10',
          money: 10,
          points: 1000,
          imgUrl: require('../../assets/image/1000coin.png'),
          iconClass: 'coin1000'
        },
        {
          id: 3,
          name: '50',
          money: 50,
          points: 5000,
          imgUrl: require('../../assets/image/5000coin.png'),
          iconClass: 'coin5000'
        },
        {
          id: 4,
          name: '100',
          money: 100,
          points: 10000,
          imgUrl: require('../../assets/image/10000coin.png'),
          iconClass: 'coin10000'
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'giftList',
      'userInfo',
      'l98Setting',
      'staffCouponInfo',
      'staticChatFriendObj'
    ]),
    ...mapGetters(['recommentList', 'sendGiftList'])
  },
  created() {
    this.panelIndex = this.fatherPanelIndex
    this.componentGiftInfo = this.giftInfo
    console.log('this.componentGiftInfo---', this.componentGiftInfo)
    if (this.componentGiftInfo && this.panelIndex === 2) {
      this.giftIntegral = this.componentGiftInfo.goods.integral //店长推荐和礼品商城
    } else if (this.componentGiftInfo && this.panelIndex === 9) {
      this.giftIntegral = this.componentGiftInfo.goods.vipMoney //储值换礼品
    }
    this.componentConvertType = this.convertType
    api.loadAllGift().then(res => {
      if (res.errCode === 0) {
        let TempGiftList = res.gifts
        this.componentGiftList = TempGiftList.map((item, index) => {
          switch (index) {
            case 0:
              item.imgUrl = require('../../assets/image/beer.png')
              item.name = '一杯啤酒'
              return item
              break
            case 1:
              item.imgUrl = require('../../assets/image/flower.png')
              item.name = '一朵鲜花'
              return item
              break
            case 2:
              item.imgUrl = require('../../assets/image/car.jpg')
              item.name = '一辆跑车'
              return item
              break
            case 3:
              item.imgUrl = require('../../assets/image/boat.jpg')
              item.name = '一艘游艇'
              return item
              break
            default:
              break
          }
        })
      }
    })
  },
  mounted() {},
  props: {
    convertType: {
      //是自己兑换还是送礼模式 0自己兑换
      type: Number,
      default: null
    },
    friendId: {
      type: String,
      default: ''
    },
    fatherPanelIndex: {
      type: Number,
      default: 1
    },
    giftInfo: {
      type: Object,
      default: null
    },
    isInDoor: {
      type: Boolean,
      default: false
    }
  },
  activated() {},
  methods: {
    goToBandPhone() {
      this.$router.push({
        name: 'giftDetail'
      })
      this.$emit('closeIntegralPanel', false)
    },
    gotoPage(pageType) {
      this.$router.push({
        name: pageType
      })
      this.$emit('closeIntegralPanel', false)
    },
    //员工送券
    sendCouponToUser() {
      let ToId = this.staticChatFriendObj.openid
        ? this.staticChatFriendObj.openid
        : sessionStorage.getItem('staffCouponToId')
      let data = {
        to: ToId,
        from: this.userInfo.openid,
        CouponId: this.staffCouponInfo.couponId
      }
      api.sendStaffCouponToUser(data).then(res => {
        //console.log("送券结果-------", res)
        if (res.errCode === 0) {
          this.$vux.toast.text('赠送成功', 'middle')
        } else {
          this.$vux.toast.text('暂未有员工送券活动', 'middle')
        }
      })
    },
    //现场送
    // onlineSendGift(e) {
    //   //console.log(e.target.checked);
    //   //console.log("触发现场送");
    // },
    comfirm() {
      setTimeout(() => {
        if (!this.userInfo.isSubscribe) {
          this.changeQrCodeText({
            title: '长按关注，即可兑换门店礼物/门店项目',
            bottomText: '会员特权:领福利、交群友、参活动'
          })
          this.showQrcode(true)
        }
      }, 500)
      this.$emit('closeIntegralPanel', false)
      this.panelIndex = 1
    },
    closeSchedule() {
      this.$emit('closeIntegralPanel', false)
    },
    noMove() {
      this.$emit('noMove', false)
    },
    //前移对账单时间
    changeCasierTime() {
      this.$emit('changeCashierTime', true)
    },
    closeIntegralPanel() {
      this.panelIndex = 1
      this.$emit('closeIntegralPanel', false)
    },
    // 前往充值
    gotoTopUp() {
      this.panelIndex = 0
    },
    //发送虚拟礼物
    sendVirtualGift(id, index, giftInfo) {
      this.VirtualGiftInfo = giftInfo
      this.componentConvertType = 4
      let tempVirtualGift = {
        goods: {
          name: this.componentGiftList[index].name,
          image: this.componentGiftList[index].imgUrl,
          integral: this.componentGiftList[index].money,
          id: this.componentGiftList[index].id
        }
      }
      this.giftIntegral = this.componentGiftList[index].money
      this.panelIndex = 2
      this.componentGiftInfo = tempVirtualGift
    },
    // converType 0:店长推荐，1:积分换礼品兑换 ,2:赠送店长推荐项目,3:赠送积分换礼品项目,4:虚拟礼物
    //赠送店铺项目
    sendShopItemGift(goodsInfo) {
      this.entityGoodInfo = goodsInfo
      this.componentConvertType = 2
      this.componentGiftInfo = goodsInfo
      this.giftIntegral = goodsInfo.goods.integral
      this.panelIndex = 2
      this.successfulText =
        '赠送礼物成功,扣除' + this.componentGiftInfo.goods.integral + '积分'
    },
    //赠送积分换礼品项目
    sendJiFenGift(goodsInfo) {
      this.entityGoodInfo = goodsInfo
      this.componentConvertType = 3
      this.componentGiftInfo = goodsInfo
      this.giftIntegral = goodsInfo.goods.integral
      this.panelIndex = 2
      this.successfulText =
        '赠送礼物成功,扣除' + this.componentGiftInfo.goods.integral + '积分'
    },
    //确认赠送
    confirmShopItemGift(type, goodID, goods, couponInfo) {
      console.log('this.giftIntegral=', this.giftIntegral)
      if (type === 'money') {
        if (this.userInfo.money < this.giftIntegral) {
          //当前积分少于项目消耗积分
          this.panelIndex = 0
          this.showOweText = true
          return
        }
      } else {
        if (this.userInfo.storeValue < this.giftIntegral) {
          //当前储值少于项目消耗储值
          this.panelIndex = -1
          this.showOweText = true
          return
        }
      }
      this.showOweText = false
      if (this.componentConvertType == 0) {
        //店长推荐兑换
        if (this.panelIndex === 2) {
          api.convertRecommend(goodID, 'common').then(res => {
            //console.log("店长推荐兑换结果--------------", res);
            if (res.errCode && res.errCode == 1021) {
              this.successfulText = '您已兑换'
            } else if (res.errCode == 1029) {
              this.successfulText = '积分不足，请点右下角前往充值'
              this.successful_desc = ``
              return
            } else {
              this.successfulText = '兑换成功'
              this.refreshUserInfo()
            }
            this.successful_desc = `一张${util.returnDiscountType(
              this.componentGiftInfo.coupInfo.type
            )}已存入'我的卡券'`
          })
        } else if (this.panelIndex === 9) {
          if (this.userInfo.phone === '') {
            this.successfulText = '手机未绑定不能进行商品兑换'
            this.successful_desc = '请前往绑定手机'
            this.panelIndex = 10
            return
          }
          let data = {
            staffName: this.userInfo.nickname,
            phone: this.userInfo.phone,
            consumeMoney: goods.discountPrice,
            decreaseMoney: goods.vipMoney,
            decreaseDesc: '兑换会员项目'
          }
          console.log('data=', data)
          // return
          api.decreaseTopUpVip(data).then(res => {
            if (res.errCode === 0) {
              this.successfulText = '兑换成功'
              this.refreshUserInfo().then(() => {
                console.log('兑换会员项目=', res)
                let messObj = {
                  to: config.cashierId,
                  content: `成功购买店长推荐项目（${
                    couponInfo.content
                  }）,已从会员卡${this.userInfo.phone}
                        扣费${goods.vipMoney}元，余额${Number(
                    this.userInfo.storeValue
                  )}`,
                  type: 1,
                  from: this.userInfo.openid
                }
                //console.log("this.isCashierFlag----", this.isCashierFlag);
                //console.log("messObj----", messObj);
                let textMessObj = JSON.stringify(messObj)
                let decc1 = new TextEncoder('utf-8')
                let result = decc1.encode(textMessObj)
                api.sendTextCashier(result).then(res => {
                  console.log('res=', res)
                })
              })
            }
          })

          api.convertRecommend(goodID, 'vip').then(res => {
            //console.log("店长推荐兑换结果--------------", res);
            if (res.errCode && res.errCode == 1021) {
              // this.successfulText = "您已兑换";
            } else if (res.errCode == 1029) {
              // this.successfulText = "积分不足，请充值";
              // this.successful_desc = ``;
              return
            } else {
              // this.successfulText = "兑换成功";
              // this.refreshUserInfo();
            }
            this.successful_desc = `一张${util.returnDiscountType(
              this.componentGiftInfo.coupInfo.type
            )}已存入'我的卡券'`
          })
        }
      } else if (this.componentConvertType == 1) {
        //积分换礼品兑换
        api.convertGoods(goodID).then(res => {
          //console.log("积分换礼品兑换结果---------", res);
          if (res.errCode && res.errCode == 1021) {
            this.successfulText = '您已兑换'
          } else if (res.errCode == 1029) {
            this.successfulText = '积分不足'
            this.successful_desc = ``
            return
          } else if (res.errCode == 1023) {
            this.showQrcode(true)
          } else {
            this.refreshUserInfo()
            this.successfulText = '兑换成功'
          }
          this.successful_desc = `一张${util.returnDiscountType(
            this.componentGiftInfo.coupInfo.type
          )}已存入'我的卡券'`
        })
      } else if (this.componentConvertType == 2) {
        //赠送店长推荐项目
        api.sentRecommend(goodID, this.friendId).then(res => {
          //console.log("店长推荐赠送结果---------", res);
          if (res.errCode == 1029) {
            this.successfulText = '积分不足'
            this.successful_desc = ``
            return
          } else if (res.errCode == 1023) {
            this.showQrcode(true)
            return
          } else {
            this.refreshUserInfo()
          }
          Bus.$emit('giftInfoRecomend', this.entityGoodInfo)
          this.successful_desc = `一张${util.returnDiscountType(
            this.componentGiftInfo.coupInfo.type
          )}已存入对方'我的卡券'`
        })
      } else if (this.componentConvertType == 3) {
        //赠送积分换礼品项目
        api.sentGoods(goodID, this.friendId).then(res => {
          if (res.errCode == 1029) {
            this.successfulText = '积分不足'
            this.successful_desc = ``
            return
          } else if (res.errCode == 1023) {
            this.showQrcode(true)
            return
          } else if (res.errCode == 0) {
            this.refreshUserInfo()
          }
          Bus.$emit('giftInfoJiFen', this.entityGoodInfo)
          this.successful_desc = `一张${util.returnDiscountType(
            this.componentGiftInfo.coupInfo.type
          )}已存入对方'我的卡券'`
          // //console.log('积分赠送结果---------', res)
        })
      } else if (this.componentConvertType == 4) {
        //赠送虚拟礼物
        let params = {
          giftID: parseInt(goodID),
          to: this.friendId
        }
        api.sendGift(params).then(res => {
          //console.log("赠送礼物返回结果", res);
          if (res.errCode === 0) {
            this.refreshUserInfo()
            this.successfulText =
              '赠送礼物成功,扣除您' +
              this.componentGiftInfo.goods.integral +
              '积分'
            Bus.$emit('VirtualGiftInfo', this.VirtualGiftInfo)
          } else if (res.errCode == 1023) {
            this.successfulText =
              '赠送礼物成功,扣除您' +
              this.componentGiftInfo.goods.integral +
              '积分'
            setTimeout(() => {
              this.showQrcode(true)
              return
            }, 700)
          } else if (res.errCode == 1029) {
            this.successfulText = '积分不足，请点右下角前往充值'
          }
        })
      }
    },
    refreshUserInfo() {
      return new Promise((resolve, reject) => {
        api.getUserInfo().then(res => {
          //console.log("个人信息-------", res);
          this.getUserInfo(res)
          this.panelIndex = 3
          resolve()
        })
      })
    },
    //前往兑换
    changeGoods() {
      this.panelIndex = 1
    },
    //   充值
    payForCoin(id, index, point) {
      this.moneyPoint = point
      if (!this.l98Setting.integralConvertOpen) {
        // this.$vux.toast.text("商家未开通本功能", "middle");
        this.panelIndex = 5
        return
      }
      this.clickIndex = index
      setTimeout(() => {
        this.clickIndex = null
      }, 200)
      api.createOrder(id).then(res => {
        if (res.errCode === 0) {
          let resultInfo = res.data
          //console.log("resultInfo----------", resultInfo);
          let _this = this
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            {
              appId: resultInfo.appId, //公众号名称，由商户传入
              timeStamp: '' + resultInfo.timeStamp, //时间戳，自1970年以来的秒数
              nonceStr: resultInfo.nonceStr, //随机串
              package: resultInfo.package,
              signType: resultInfo.signType, //微信签名方式：
              paySign: resultInfo.paySign //微信签名
            },
            res => {
              //console.log("WeixinJSBridge.invoke-res", res);
              if (res.err_msg == 'get_brand_wcpay_request:ok') {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                alert('微信支付成功')
                api
                  .getUserInfo()
                  .then(res => {
                    this.getUserInfo(res)
                    this.panelIndex = 4
                  })
                  .catch(err => {
                    //console.log(err);
                  })
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              }
            }
          )
        }
      })
    },
    ...mapMutations({
      changeQrCodeText: 'CHANGEQRCODETEXT',
      showQrcode: 'SHOW_QRCODE', //暂时二维码
      getUserInfo: 'GET_USERINFO' //获取用户信息
    })
  },
  components: {}
}
</script>

<style scoped lang='less'>
@import '../../assets/less/mixin.less';
@import '../../assets/less/topUp.less';
.clearfix::after {
  content: '';
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
    width: 9rem; // height: 5rem; // transform: translateY(50%);
    margin: 50% auto; // background-color: #fff;
    .bg('../../assets/image/envelop.png');
    .coinBox_top {
      display: flex;
      justify-content: space-between;
      padding: 0.4333rem 0.4rem 0.2rem 0.4rem;
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
        .closeText();
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
          .bigAndSamll {
            transition: all 0.5s linear;
            transform: scale(0.5);
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
    width: 9rem;
    box-sizing: border-box;
    .bg(
      '../../assets/image/envelop.png'
    ); // background-image: url('../../assets/image/envelop.png')
    .giftPanelBox_title {
      display: flex;
      justify-content: space-between;
      padding: 0.4rem 0.3rem 0.1rem 0.3rem;
      box-sizing: border-box;
      position: relative;
      .staff-discount {
        position: absolute;
        width: 1rem;
        height: 1rem;
        top: -0.8rem;
        right: 2rem;
        z-index: 2;
      }
      .desc {
        font-size: 0.4rem;
        color: #f7c600;
        margin-left: 0.1333rem;
      }
      .close {
        .closeText();
      }
    }
    .giftListpart {
      position: relative;
      margin-top: 0.1333rem;
      .close {
        position: absolute;
        top: -0.3rem;
        right: 0.5667rem;
        width: 0.48rem;
        height: 0.48rem;
      }
      .listTitleGroup();
      .list {
        display: flex;
        justify-content: space-around;
        padding: 0.1133rem 0.5rem 0.1133rem 0.9rem;
        .item {
          text-align: center;
          border-radius: 0.1067rem;
          .giftIcon {
            width: 0.9rem;
            height: 0.9rem;
          }
          .price {
            width: 1.4rem;
            text-align: center;
          }
        }
        .virtual:nth-child(3) img,
        .virtual:nth-child(4) img {
          transform: scale(1.3);
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
    // width: 8.4rem;
    width: 9rem;
    padding-bottom: 0.2333rem;
    box-sizing: border-box;
    margin: 50% auto;
    position: relative;
    .bg('../../assets/image/envelop_handle.png');
    .header {
      display: flex;
      padding: 0.2667rem 0.4rem;
      position: relative;
      .close {
        .closeText();
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
          color: #656565;
        }
      }
    }
    .handle {
      width: 100%;
      text-align: right;
      height: 1.1rem;
      padding-top: 0.2rem;
      padding-bottom: 0.3rem;
      position: relative;
      padding-right: 0.3rem;
      box-sizing: border-box;
      position: relative;
      display: flex;
      justify-content: space-between;
      .tips_money {
        left: 50%;
        font-weight: 700;
        color: #333;
        width: 4rem;
        margin-left: -2rem;
        position: absolute;
        bottom: 0.3rem;
        font-size: 12px;
      }
      .cancle {
        font-weight: 800;
        position: relative;
        bottom: -0.16rem;
        left: 0.4rem;
        text-align: center;
        font-size: 0.35rem;
        padding: 0rem;
        border: 1px solid rgb(156, 13, 13);
        background-color: #fff;
        color: rgb(156, 13, 13);
        min-width: 0.8rem;
        height: 0.45rem;
        line-height: 0.45rem;
        box-sizing: border-box;
        display: inline-block;
      }
      .btn {
        padding: 0.08rem 0.1067rem;
        border: none;
        display: inline-block;
        font-weight: 800;
        color: #fff;
        font-size: 0.35rem;
        letter-spacing: 0.08rem;
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
    width: 9rem;
    height: 4.7rem;
    .bg('../../assets/image/envelop_handle.png');
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
      .closeText();
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
        margin-left: 0.3333rem;
        font-size: 0.35rem;
        color: #333;
      }
    }
    .successful_text {
      margin-top: 0.75rem;
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
    .payBtn {
      position: absolute;
      bottom: 0.55rem;
      left: 0.38rem;
      font-weight: 800;
      font-size: 0.23rem;
      border: 1px solid rgb(156, 13, 13);
      background-color: #fff;
      color: rgb(156, 13, 13);
      width: 0.8rem;
      text-align: center;
      display: inline-block;
      height: 0.45rem;
      line-height: 0.45rem;
      box-sizing: border-box;
    }
    .btn {
      position: absolute;
      bottom: 0.55rem;
      right: 0.33rem;
      text-align: center;
      letter-spacing: 0.08rem;
      padding: 0.08rem 0.1067rem;
      border: none;
      color: #fff;
      font-weight: 800;
      font-size: 0.35rem;
      letter-spacing: 0.08rem;
    }
    .changebtn {
      position: absolute;
      bottom: 0.6rem;
      left: 0.45rem;
      font-weight: 700;
      color: #333;
    }
    .gotoTopUpText {
      position: absolute;
      bottom: 0.33rem;
      right: 0.28rem;
      color: #f7c600;
      text-decoration: underline;
    }
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
