<template>
 <div class="gift_detail">
        <my-header title="收礼明细" ref="header"></my-header>
        <div class="gift_wrapper vux-1px-t">
            <div class="title_content vux-1px-b">
                <h3 class="title"><strong>我的积分余额：</strong></h3>
                <span class="money">688分</span>
            </div>
             <!-- <div class="title_content vux-1px-b">
                <h3 class="title"><strong>收礼总金额：</strong></h3>
                <span class="money">￥888</span>
            </div>
             <div class="title_content vux-1px-b">
                <h3 class="title"><strong>送礼总金额：</strong></h3>
                <span class="money">￥988</span>
            </div> -->
            <scroll class="scroll" :data="giftList">
                <ul class="gift_list">
                    <li class="item vux-1px" v-for="(item,index) in giftList" :key="index">
                        <span class="name">{{item.name}}</span>
                        <!-- <img src="../../assets/image/small_flower (2).png" class="gift_icon" v-if="index<5"/>
                        <img src="../../assets/image/small_beer.png" class="gift_icon" v-if="index>=5"/> -->
                        <span class="sum" :class="{plus:item.plus}" v-if="item.plus">+3积分</span>
                        <span class="sum"  v-else>-3积分</span>
                        <span class="time">2018-05-09</span>
                    </li>
                </ul>
            </scroll>
            <div class="selectMoneyBox">
              <h2 class="titile">请选择充值的金额</h2>
              <ul class="moneyList">
                <li class="itemMoney" :class="{active:index==moneyIndex}" @click="selectMoney(index,$event)" :data-money="money.payNum" v-for="(money,index) in moneyList">{{money.content}}</li>
              </ul>
            </div>
            <div class="btn_content" @click="pay">
                <span class="btn">充值</span>
            </div>
        </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import api from "common/api";
import myHeader from "../../base/myheader/myheader";
import Scroll from "../../base/scroll/scroll";
export default {
  data() {
    return {
      moneyIndex: 0,
      moneyInitValue: 5,
      moneyList: [
        {
          payNum: 5,
          content: "5元"
        },
        {
          payNum: 10,
          content: "10元"
        },
        {
          payNum: 15,
          content: "15元"
        },
        {
          payNum: 20,
          content: "20元"
        }
      ],
      giftList: [
        {
          name: "打赏",
          plus: true
        },
        {
          name: "大话骰房费",
          plus: false
        },
        {
          name: "每日签到",
          plus: true
        },
        {
          name: "打赏",
          plus: true
        },
        {
          name: "大话骰房费",
          plus: false
        },
        {
          name: "分享有礼",
          plus: true
        },
        {
          name: "打赏",
          plus: false
        },
        {
          name: "大话骰房费",
          plus: true
        },
        {
          name: "每日签到",
          plus: true
        },
        {
          name: "打赏",
          plus: false
        }
      ]
    };
  },
  methods: {
    selectMoney(index, event) {
      this.moneyIndex = index;
      this.moneyInitValue = event.target.dataset.money;
    },
    pay() {
      api.createOrder().then(res => {
        if (res.errCode === 0) {
          let resultInfo = res.data;
          console.log(resultInfo);
          WeixinJSBridge.invoke(
            "getBrandWCPayRequest",
            {
              "appId": resultInfo.appId, //公众号名称，由商户传入
              "timeStamp": "" + resultInfo.timeStamp, //时间戳，自1970年以来的秒数
              "nonceStr": resultInfo.nonceStr, //随机串
              "package": resultInfo.package,
              "signType": resultInfo.signType, //微信签名方式：
              "paySign": resultInfo.paySign //微信签名
            },
            function(res) {
              console.log(res);
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                console.log("微信支付成功");
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              }
            }
          );
        }
      });
    }
  },
  components: {
    myHeader,
    Scroll
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/variable.less";
.gift_detail {
  height: 100%;
  .gift_wrapper {
    height: 80%;
    .title_content {
      margin-top: 0;
      display: flex;
      justify-content: space-between;
      padding: 0.4rem 0.4rem;
      box-sizing: border-box;
      .title {
        font-size: 0.4rem;
        color: #333;
      }
      .money {
        font-size: 0.3733rem;
        color: #ff4646;
      }
    }
    .scroll {
      height: 9.3333rem;
      overflow: hidden;
      padding-bottom: 0.1333rem;
      border-bottom: 1px solid #ccc;
      .gift_list {
        padding-bottom: 0.1333rem;
        .item {
          padding: 0.4rem 0.4rem;
          margin: 0.1333rem;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          box-shadow: 1px 1px 1px 1px #eee;
          .name {
            font-size: 0.4rem;
            width: 2.6667rem;
          }
          .gift_icon {
            width: 0.5rem;
            height: 0.5rem;
          }
          .sum {
            font-size: 0.4rem;
            color: red;
            font-weight: 700;
            width: 1.8333rem;
          }
          .plus {
            color: green;
          }
          .time {
            font-size: 0.4rem;
            color: #999;
          }
        }
      }
    }
    .selectMoneyBox {
      margin: 0.2rem 0;
      padding: 0 0.2667rem;
      .titile {
        font-size: 0.4267rem;
        font-weight: 700;
        margin: 0.2333rem 0;
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
