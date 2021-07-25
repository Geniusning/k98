<template>
  <div class="vipProductDetail-wrapper">
    <my-header title="商品详情" bg="#fff"></my-header>
    <div class="productInfo-wrapper">
      <img :src="oneShopRecommend.goods.image" alt="" class="product-img">
      <div style="padding:0 .4rem">
        <p class="product-name">{{oneShopRecommend.coupInfo.content}}</p>
        <!-- <p class="product-content">蓝牙4.0重低音效果 炫酷灯管体验 立体声 防水 户外便携</p> -->
        <p class="product-limit">{{oneShopRecommend.coupInfo.limit}}</p>
        <p class="product-price">
          <span class="vip-price">会员价￥{{oneShopRecommend.goods.vipMoney}}</span>
          <del class="origin-price">￥{{oneShopRecommend.goods.discountPrice}}</del>
          <span class="integral">积分换${{oneShopRecommend.goods.integral}}</span>
        </p>
      </div>
    </div>
    <div class="model-wrapper">
      <span>规格：</span>
      <ul class="model-list">
        <li class="model" @click="selectModel(index)" :class="{active:index===selectIdx}" v-for="(item,index) in modelList"
          :key="index">{{item}}</li>
      </ul>
    </div>
    <div class="nums-wrapper">
      <span>数量:</span>
      <div class="counter-wrapper">
        <Stepper v-model="count" />
      </div>
    </div>
    <div class="result-wrapper">
      <p class="result-info">共{{count}}件，合计：{{totalMoney}}元</p>
    </div>
    <div class="address-wrapper">
      <h4 class="title">领取方式: <button class="createBtn" v-if="!userInfo.userAddress" @click="createAddr">新建地址</button></h4>
      <div class="sending">
        <Radio-group checked-color="#FFE60F" v-model="radio">
          <Radio style="margin-bottom:8px;" name="1" shape="square">现场兑换（您的卡券包将收到一张券，可到店兑换）</Radio>
          <Radio name="2" shape="square">邮寄</Radio>
        </Radio-group>
      </div>

      <p class="address-info">{{userInfo.userAddress}}</p>
    </div>
    <div class="line"></div>
    <div class="detailInfo-wrapper">
      <h4 class="title">商品详情</h4>
      <ul class="image-list">
        <li class="image-item" v-for="(img,index) in  oneShopRecommend.goods.handOutImages">
          <img class="image" :src="img" alt="">
        </li>
      </ul>
    </div>
    <div class="payWays-wrapper">
      <button class="payBtn left" @click="showPayDialog('integral')">积分兑换</button>
      <button class="payBtn center" @click="showPayDialog('vipCard')">会员卡扣费</button>
      <button class="payBtn right" @click="showPayDialog('wechat')">微信支付</button>
    </div>
    <handleEnvelope v-show="isShowDialog">
      <div class="groupBookAwardInfo-wrapper">
        <!-- <div class="left">
          <img :src="oneShopRecommend.goods.image" class="pic" alt="">
        </div> -->
        <div class="right">
          <p class="desc">{{successfulText}}</p>
        </div>
      </div>
      <template slot="footer">
        <div class="footer-wrapper">
          <button class="btn-left" @click="close">取消</button>
          <button class="btn-right" @click="pay">确定</button>
        </div>
      </template>
    </handleEnvelope>
  </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex'
import { RadioGroup, Radio } from 'vant'
import { Stepper } from 'vant'
import api from 'common/api'
import util from 'common/util'
import myHeader from 'base/myheader/myheader'
import handleEnvelope from 'base/handleEnvelope/handleEnvelope'
export default {
  data() {
    return {
      radio: '1',
      modelList: [],
      count: 1,
      totalMoney: 0,
      selectIdx: 0,
      isShowDialog: false,
      successfulText: ''
    }
  },
  watch: {
    count: function() {
      this.calcul()
    }
  },
  created() {
    window.scrollTo(0, 0)
    console.log('oneShopRecommend', this.oneShopRecommend)
    this.modelList = this.oneShopRecommend.goods.tagsList
      ? this.oneShopRecommend.goods.tagsList.split(',')
      : ['无']
    this.calcul()
  },
  computed: {
    ...mapState(['oneShopRecommend', 'userInfo'])
  },
  methods: {
    showPayDialog(payType) {
      if (payType != this.oneShopRecommend.goods.payWay) {
        this.$vux.toast.text('商家暂未开通此支付方式', 'middle')
        return
      }
      this.successfulText = `确定消耗${this.totalMoney}积分兑换此商品吗?`
      this.isShowDialog = true
    },
    close() {
      this.isShowDialog = false
    },
    intergralPay() {
      api
        .convertRecommend(this.oneShopRecommend.goods.id, 'common')
        .then(res => {
          //console.log("店长推荐兑换结果--------------", res);
          if (res.errCode && res.errCode == 1021) {
            this.successfulText = '您已兑换'
          } else if (res.errCode == 1029) {
            this.successfulText = '积分不足，请点右下角前往充值'
            this.successful_desc = ``
            return
          } else {
            this.successfulText = '兑换成功'
            api.getUserInfo().then(res => {
              //console.log("个人信息-------", res);
              this.getUserInfo(res)
            })
            this.$router.push({
              name: 'card'
            })
          }
        })
    },
    vipCardPay() {
      if (this.userInfo.phone === '') {
        this.successfulText = '手机未绑定不能进行商品兑换'
        return
      }
      let data = {
        staffName: this.userInfo.nickname,
        phone: this.userInfo.phone,
        consumeMoney: this.oneShopRecommend.goods.discountPrice,
        decreaseMoney: this.oneShopRecommend.goods.vipMoney,
        decreaseDesc: '兑换会员项目'
      }
      console.log('data=', data)
      // return
      api.decreaseTopUpVip(data).then(res => {
        if (res.errCode === 0) {
          this.successfulText = '兑换成功'
          this.$router.push({
            name: 'card'
          })
        }
      })
    },
    pay() {
      if (this.oneShopRecommend.goods.payWay === 'integral') {
        this.intergralPay()
      } else if (this.oneShopRecommend.goods.payWay === 'vipCard') {
        this.vipCardPay()
      }
    },
    selectModel(idx) {
      console.log(idx)
      this.selectIdx = idx
    },
    createAddr() {
      this.$router.push({
        name: 'address'
      })
    },
    calcul() {
      if (this.oneShopRecommend.goods.payWay === 'integral') {
        this.totalMoney = this.count * this.oneShopRecommend.goods.integral
      } else if (this.oneShopRecommend.goods.payWay === 'vipCard') {
        this.totalMoney = this.count * this.oneShopRecommend.goods.vipMoney
      } else {
        this.totalMoney = this.count * this.oneShopRecommend.goods.vipMoney
      }
    },
    ...mapMutations({
      getUserInfo: 'GET_USERINFO' //获取用户信息
    })
  },
  components: {
    Stepper,
    RadioGroup,
    Radio,
    myHeader,
    handleEnvelope
  }
}
</script>


<style lang="less" scoped>
.vipProductDetail-wrapper {
  width: 100%;
  height: 100%;
  background-color: #efefef;
  .productInfo-wrapper {
    width: 100%;
    // height: 10.6rem;
    background: #fff;
    margin-bottom: 0.2rem;
    .product-img {
      width: 100%;
      height: 8rem;
    }
    .product-name {
      font-weight: 800;
      font-size: 16px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .product-content {
      font-size: 12px;
      color: #6a6a6a;
      margin: 0.1rem 0;
    }
    .product-limit {
      font-size: 12px;
      color: #6a6a6a;
      margin: 0.2rem 0;
    }
    .product-price {
      display: flex;
      align-items: center;
      .vip-price {
        font-size: 0.36rem;
        color: #fe0000;
        font-weight: 700;
      }
      .origin-price {
        color: #9a9a9a;
        font-size: 0.3rem;
        margin: 0 0.4rem;
        padding-top: 0.1rem;
      }
      .integral {
        font-size: 0.34rem;
        color: #fe0000;
      }
    }
  }
  .model-wrapper {
    background: #fff;
    padding: 0.2rem 0.4rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.2rem;
    span {
      width: 1.2rem;
    }
    .model-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .model {
        margin-left: 0.3rem;
        padding: 0.1rem 0.2rem;
        background-color: #efefef;
        color: #333;
        border-radius: 5px;
      }
      .active {
        background-color: #fee60f;
      }
    }
  }
  .nums-wrapper {
    padding: 0.2rem 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
  }
  .result-wrapper {
    display: flex;
    justify-content: flex-end;
    padding: 0.2rem 0.4rem;
    background: #efefef;
  }
  .address-wrapper {
    .title {
      position: relative;
      font-weight: 800;
      font-size: 16px;
      margin-bottom: 0.1rem;
      .createBtn {
        position: absolute;
        top: 0rem;
        right: 0rem;
        padding: 0rem 0.1rem;
        background-color: #fee60f;
        color: #333;
        border: none;
        font-weight: 100;
      }
    }
    .address-info {
      color: #fe0000;
      margin-top: 0.2rem;
      font-size: 14px;
    }
    background-color: #fff;
    padding: 0.2rem 0.4rem;
    // height: 3.8rem;
    box-sizing: border-box;
  }
  .line {
    height: 4px;
    background: #efefef;
  }
  .detailInfo-wrapper {
    background: #fff;
    .title {
      padding: 0.2rem 0.2rem;
      font-size: 16px;
      color: #333;
      font-weight: 800;
      box-sizing: content-box;
    }
    .image-list {
      .image-item {
        .image {
          width: 100%;
        }
      }
    }
  }
  .payWays-wrapper {
    position: fixed;
    width: 100%;
    display: flex;
    z-index: 2;
    bottom: 0;
    justify-content: space-between;
    .payBtn {
      width: 33.33%;
      height: 1rem;
      text-align: center;
      line-height: 1rem;
      color: #fff;
      border: none;
    }
    .left {
      background-color: #ffe60e;
    }
    .center {
      background-color: #ab0404;
    }
    .right {
      background-color: #219d00;
    }
  }
  .groupBookAwardInfo-wrapper {
    display: flex;
    justify-content: center;
    height: 1.8rem;
    padding: 0.1rem;
    .left {
      .pic {
        width: 2rem;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 0.6rem;
      .desc {
        color: #333;
        font-size: 14px;
      }
    }
  }
  .footer-wrapper {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 0.2rem;
    .btn-left,
    .btn-right {
      border: none;
      background: none;
      font-weight: 600;
    }
    .btn-left {
      margin-top: 0.1rem;
    }
    .btn-right {
      color: #fff;
      margin-right: 0.1rem;
    }
  }
}
</style>



