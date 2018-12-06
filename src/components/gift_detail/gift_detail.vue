<template>
  <div class="gift_detail">
    <my-header title="财富明细" ref="header"></my-header>
    <div class="gift_wrapper vux-1px-t">
      <div class="title_content vux-1px-b">
        <div class="title_content_item clearfix">
          <h3 class="title fl">
            <strong>我的财富：</strong>
          </h3>
          <span class="money fl">${{giftContent.wealth}}</span>
        </div>
        <div class="title_content_item clearfix">
          <h3 class="title fl">
            <strong>富豪榜排名：</strong>
          </h3>
          <span class="money fl">{{giftContent.ranking}}</span>
        </div>
        <div class="title_content_item clearfix" @click="showTreasure">
          <img
            src="../../assets/image/treasure.png"
            alt
            class="fl"
            style="width:0.6rem;height:0.5rem"
          >
          <h3 class="title fl">
            <strong>财富充值</strong>
          </h3>
        </div>
      </div>
      <div class="scrollTitle">
        <span class="total">累计财富</span>
        <span class="name">增减(积分)</span>
        <span class="content">变动内容</span>
        <span class="avatar">头像</span>
        <span class="time">时间</span>
      </div>
      <scroll class="scroll" :data="giftContent.wealthDetails">
        <ul class="gift_list">
          <li class="item vux-1px" v-for="(item,index) in giftContent.wealthDetails" :key="index">
            <span class="total">{{item.money}}</span>
            <span class="name" :class="{minus:item.amount<0,plus:item.amount>0}">{{item.amount}}</span>
            <!-- <span class="name"  v-else>-3积分</span> -->
            <span class="content">{{item.content}}</span>
            <div class="avatar">
              <img :src="item.headimgurl" class="gift_icon">
            </div>
            <span class="time">{{item.time}}</span>
          </li>
          <p v-if="!giftContent.wealthDetails.length" class="noContent">暂无积分变动内容</p>
        </ul>
      </scroll>
      <topUp v-show="isIntegralPanel" @closeIntegralPanel="closeIntegralPanel"></topUp>
      <!-- <div class="selectMoneyBox" v-show="isShowTreasure">
        <h2 class="titile">请选择充值的积分</h2>
        <p class="payInfo">1元兑换100积分，5元兑换500积分，10元兑换1000积分，15元兑换1500积分</p>
        <ul class="moneyList">
          <li class="itemMoney" :class="{active:index+1==moneyIndex}" @click="selectMoney(item.id,$event)" :data-money="item.money" v-for="(item,index) in moneyList">{{item.name}}</li>
        </ul>
      </div>
      <div class="btn_content" v-show="isShowTreasure" @click="pay">
        <span class="btn">充值</span>
      </div>-->
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import api from "common/api";
import util from 'common/util'
import myHeader from "../../base/myheader/myheader";
import Scroll from "../../base/scroll/scroll";
import topUp from 'base/topUp/topUp'
import {
  mapState,
  mapMutations
} from 'vuex'
export default {
  data() {
    return {
      moneyIndex: 1,
      moneyInitValue: 5,
      // isShowTreasure: false,
      isIntegralPanel:false,
      // moneyList: [{
      //   "id": 1,
      //   "name": "1元",
      //   "money": 1,
      //   "points": 10
      // },
      // {
      //   "id": 2,
      //   "name": "5元",
      //   "money": 5,
      //   "points": 50
      // },
      // {
      //   "id": 3,
      //   "name": "10元",
      //   "money": 10,
      //   "points": 100
      // },
      // {
      //   "id": 4,
      //   "name": "15元",
      //   "money": 15,
      //   "points": 150
      // }
      // ],
      giftContent: {
        wealthDetails: []
      },
      giftList: []
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    this._loadWealthDetail();
  },
  mounted() {
    //this._loadWealthDetail();
  },
  methods: {
    //监听充值面板状态
    closeIntegralPanel(flag) {
      console.log('面板状态-----------', flag);
      this.isIntegralPanel = flag;
    },
    showTreasure() {
      this.isIntegralPanel = !this.isIntegralPanel;
    },
    //拉取礼物明细
    _loadWealthDetail() {
      api.loadWealthDetail().then(res => {
        console.log('礼物明细-----------------------------', res);
        this.giftContent = res;
        this.giftContent.wealthDetails.forEach(item => {
          item.time = util.timestampToTimeNoLine(item.time);
        })
      })
    },
    selectMoney(index, event) {
      this.moneyIndex = Number(index);
      console.log(this.moneyIndex)
      this.moneyInitValue = event.target.dataset.money;
    },
    pay() {
      api.createOrder(this.moneyIndex).then(res => {
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
      getUserInfo: "GET_USERINFO" //获取用户信息
    })
  },
  components: {
    myHeader,
    Scroll,
    topUp
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/variable.less";
.gift_detail {
  height: 100%;
  .gift_wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    .title_content {
      margin-top: 0;
      display: flex;
      padding: 0.4rem 0.1rem;
      box-sizing: border-box;
      .title_content_item {
        margin-right: 0.6667rem;
        box-sizing: border-box;
      }
      .title {
        font-size: 0.4rem;
        color: #333;
      }
      .money {
        padding-top: 0.05rem;
        font-size: 0.3733rem;
        color: #ff4646;
      }
    }
    .scrollTitle {
      padding: 0.4rem 0.2rem;
      display: flex;
      justify-content: space-between;
      text-align: center;
      font-size: 0.35rem;
      .total {
        width: 20%;
      }
      .name {
        width: 20%;
      }
      .content {
        width: 20%;
      }
      .avatar {
        width: 20%;
      }
      .time {
        width: 20%;
      }
    }
    .scroll {
      // height: 9.3333rem;
      flex: 1;
      overflow: hidden;
      padding-bottom: 0.1333rem;
      border-bottom: 1px solid #ccc;
      .gift_list {
        padding-bottom: 0.1333rem;
        .item {
          padding: 0.2rem 0.2rem;
          margin: 0.1333rem;
          display: flex;
          box-sizing: border-box;
          box-shadow: 1px 1px 1px 1px #eee;
          font-size: 0.35rem;
          text-align: center;
          .name {
            width: 20%;
            padding-top: 0.1333rem;
          }
          .total {
            width: 20%;
            padding-top: 0.1333rem;
          }
          .gift_icon {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
          }
          .avatar {
            width: 20%;
          }
          .content {
            width: 20%;
            padding-top: 0.1333rem;
          }
          .time {
            width: 20%;
            text-align: center;
          }
          .minus {
            color: green;
          }
          .plus {
            color: red;
          }
        }
        .noContent {
          width: 100%;
          text-align: center;
          margin-top: 50%;
          color: #ccc;
          font-size: 0.5333rem;
        }
      }
    }
    .selectMoneyBox {
      margin: 0.2rem 0;
      padding: 0 0.2667rem;
      .titile {
        font-size: 0.4267rem;
        font-weight: 700;
        margin: 0.2333rem 0 0 0;
      }
      .payInfo {
        margin: 0.1333rem 0;
        font-size: 0.3733rem;
      }
      .moneyList {
        display: flex;
        justify-content: space-between;
        .itemMoney {
          padding: 0.4rem;
          border: 1px solid @baseColor;
        }
        .itemMoney.active {
          background-color: @baseColor;
          color: #fff;
        }
      }
    }
    .btn_content {
      text-align: center;
      line-height: 1rem;
      margin: 0.2667rem 0.5333rem 0.5rem;
      border-radius: 0.2667rem;
      background: @baseColor;
      .btn {
        display: table;
        margin: 0 auto;
        height: 0.6667rem;
        font-size: 0.4267rem;
        color: #fff;
      }
    }
  }
}
.vux-1px:before {
  border-radius: 0.1333rem;
}
</style>
