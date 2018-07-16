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

            <div class="btn_content">
                <span class="btn">充值</span>
            </div>
        </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import myHeader from "../../base/myheader/myheader";
import Scroll from "../../base/scroll/scroll";
export default {
  data() {
    return {
      giftList: [
        {
          name: "打赏",
          plus:true,
        },
        {
          name: "大话骰房费",
          plus:false,
        },
        {
          name: "每日签到",
          plus:true,
        },
        {
          name: "打赏",
          plus:true,
        },
        {
          name: "大话骰房费",
          plus:false,
        },
        {
          name: "分享有礼",
          plus:true,
        },
        {
          name: "打赏",
          plus:false,
        },
        {
          name: "大话骰房费",
          plus:true,
        },
        {
          name: "每日签到",
          plus:true,
        },
        {
          name: "打赏",
          plus:false,
        },
      ]
    };
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
            width: 1.8333rem
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
    .btn_content {
      text-align: center;
      line-height: 1rem;
      margin: 0.8667rem 0.5333rem 0.5rem;
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
