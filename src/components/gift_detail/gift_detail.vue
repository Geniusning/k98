<template>
  <div class="gift_detail">
    <my-header height="30px" title="财富明细" ref="header"></my-header>
    <div class="gift_wrapper vux-1px-t">
      <div class="title_content vux-1px-b">
        <div class="title_content_item">
          <h3 class="title ">
            我的财富：
          </h3>
          <span class="money">${{userInfo.money}}</span>
        </div>
        <div class="title_content_item">
          <h3 class="title ">
            富豪榜排名：
          </h3>
          <span class="money ">{{userInfo.wealthRanking}}</span>
        </div>
        <div class="title_content_item" @click="showTreasure">
          <!-- <img src="../../assets/image/treasure.png" alt class="" style="width:0.6rem;height:0.5rem;margin-top:.1rem"> -->
          <button class="btn_chongzhi">积分充值</button>
        </div>
      </div>
      <div class="scrollTitle">
        <span class="total">累计财富</span>
        <span class="name">积分变动</span>
        <span class="content">变动原因</span>
        <span class="avatar">头像</span>
        <span class="time">时间</span>
      </div>
      <scroll ref="scroll" class="scroll" :data="giftContent" @pullingUp="pullUpMoreData" :pullup="true">
        <ul class="gift_list">
          <li class="item vux-1px" v-for="(item,index) in giftContent" :key="index">
            <span class="total">${{item.value}}</span>
            <span class="name" :class="{minus:item.amount<0,plus:item.amount>0}">{{item.amount>0?'+'+item.amount:item.amount}}</span>
            <!-- <span class="name"  v-else>-3积分</span> -->
            <span class="content">{{item.content}}</span>
            <div class="avatar">
              <img :src="item.headimgurl?item.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534938165134&di=f3ae0420c8c174149ac1c123230a28ed&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FJCRXU6oUw5s17jKllv9icrTmXvozYWQDeWFhKgEXbYeR9JOEKkrWLjibU7a7FAbsBHibVKca5wWzEiaXHWSgaSlgbA%2F640%3Fwx_fmt%3Dpng'"
                class="gift_icon">
            </div>
            <span class="time">{{item.time}}</span>
          </li>
          <p v-if="!giftContent.length" class="noContent">暂无积分变动内容</p>
        </ul>
        <!-- <div class="pullup-wrapper">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">Pull up and load more</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">Loading...</span>
          </div>
        </div> -->
      </scroll>
      <topUp v-if="isIntegralPanel" @closeIntegralPanel="closeIntegralPanel" :fatherPanelIndex="fatherPanelIndex"></topUp>
      <qrCode v-show="qrIsShow" title="您还不是会员,关注享有会员特权"></qrCode>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import api from "common/api";
  import util from 'common/util';
  import BScroll from "better-scroll";
  import myHeader from "../../base/myheader/myheader";
  import Scroll from "../../base/scroll/scroll";
  import topUp from 'base/topUp/topUp';
  import qrCode from 'base/qrCode/qrCode';
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        moneyIndex: 1,
        moneyInitValue: 5,
        fatherPanelIndex: 0,
        isIntegralPanel: false,
        giftContent: [],
        giftList: [],
        giftCursor: 0,
        isPullUpLoad: false
        // defaultHeadUrl:require("./assets/image/avatar2.jpg")
      };
    },
    computed: {
      ...mapState(['userInfo']),
      ...mapGetters(["qrIsShow"]),
    },
    created() {
      api.getUserInfo("/api/loadUserInfo").then(res => {
        this.getUserInfo(res);
      })
    },
    mounted() {
      this._loadWealthDetail();
    },
    methods: {
      //上拉加载更多
      pullUpMoreData() {
        if (this.giftCursor) {
          this._loadWealthDetail();
          this.$refs.scroll.finishPullUp()
        } else {
          this.$vux.toast.text('没有啦', 'middle')
        }
      },
      //监听充值面板状态
      closeIntegralPanel(flag) {
        this.isIntegralPanel = flag;
      },
      showTreasure() {
        this.isIntegralPanel = !this.isIntegralPanel;
      },
      //拉取礼物明细
      _loadWealthDetail() {
        let count = 20;
        this.$vux.loading.show({
          text: "loading"
        })
        api.loadWealthDetail(this.giftCursor, count).then(res => {
          console.log('礼物明细-----------------------------', res);
          if (res.errCode == 0) {
            this.$vux.loading.hide()
            this.giftContent = this.giftContent.concat(res.wealthDetailRanking.details);
            console.log('this.giftContent---------------', this.giftContent)
            this.giftCursor = res.wealthDetailRanking.cursor;
            this.giftContent.forEach(item => {
              if (item.headimgurl.indexOf("http") === -1) {
                let imgUrl = item.headimgurl.slice(18)
                item.headimgurl = require(`../../assets/image/${imgUrl}.png`)
              }
              item.time = util.timestampToTimeNoLine(item.time);
            })
          }
          if (!this.userInfo.isSubscribe) {
            this.changeQrCodeText({
              title: "长按关注，积分在握,可换礼物/门店项目",
              bottomText: "会员特权:领福利、交群友、参活动"
            })
            this.showQrcode(true);
          }
        })
      },
      // selectMoney(index, event) {
      //   this.moneyIndex = Number(index);
      //   console.log(this.moneyIndex)
      //   this.moneyInitValue = event.target.dataset.money;
      // },
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
        changeQrCodeText: "CHANGEQRCODETEXT",
        getUserInfo: "GET_USERINFO", //获取用户信息
        showQrcode: "SHOW_QRCODE", //展示二维码
      })
    },
    components: {
      myHeader,
      Scroll,
      topUp,
      qrCode
    }
  };
</script>

<style scoped lang='less'>
  @import "../../assets/less/variable.less";
  .gift_detail {
    height: 100%;
    display: flex;
    flex-direction: column;
    .gift_wrapper {
      // flex: 1;
      height: 92%;
      display: flex;
      flex-direction: column;
      .title_content {
        margin-top: 0;
        display: flex;
        justify-content: space-around;
        padding: 0.3rem 0.1rem;
        box-sizing: border-box;
        // height: 1.3rem;
        height: 8.5%;
        .title_content_item {
          margin-right: 0.6667rem;
          box-sizing: border-box;
          display: flex;
          .btn_chongzhi {
            border: none;
            background-color: #999;
            color: #fff;
            font-weight: 700;
            border-radius: 0.1333rem;
            padding: 0 0.1333rem;
          }
        }
        .title {
          font-size: 0.3733rem;
          height: 0.8rem;
          line-height: 0.8rem;
          color: #333;
        }
        .money {
          // padding-top: 0.05rem;
          height: 0.8rem;
          line-height: 0.8rem;
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
        // height: 0.5667rem;
        height: 1.5%;
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
        // height: 14rem;
        height: 94%;
        // flex:1;
        overflow: hidden;
        padding-bottom: 0.1333rem;
        // border-bottom: 1px solid #ccc;
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
        .pullup-wrapper {
          padding: 20px;
          text-align: center;
          color: #999
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
