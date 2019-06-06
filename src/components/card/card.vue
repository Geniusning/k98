<template>
  <div id="card" class="card">
    <my-header title="我的卡券" bg="#fff"></my-header>
    <div class="tab_wrapper">
      <tab bar-active-color="#FFAE00">
        <tab-item selected @on-item-click="onItemClick">未使用({{unuseCouponsLength}})</tab-item>
        <tab-item @on-item-click="onItemClick">已使用({{usedCouponsLength}})</tab-item>
        <tab-item @on-item-click="onItemClick">已过期({{timeOutListLength}})</tab-item>
        <tab-item @on-item-click="onItemClick">已送礼({{songLiList.length}})</tab-item>
      </tab>
    </div>
    <!-- 温馨提示 -->
    <div class="warm_tips" v-show="!userInfo.phone">
      <p class="tips">温馨提示：绑定手机，方便您到店核销</p>
      <span class="bingTel" @click="bindTel">绑定手机</span>
    </div>
    <!-- 优惠券列表 -->
    <div class="discount_wrapper">
      <!-- 未使用 -->
      <ul class="no_user_list" v-show="tagIndex==0">
        <h3 class="noCouponTips" v-if="!unusedList.length">暂无优惠券</h3>
        <li v-else class="item" v-for="(item,index) in unusedList">
          <div class="myleft">
            <p class="discount_type_text">{{item.coupon.type}}</p>
          </div>
          <div class="mycenter">
            <div class="discount_theme clearfix">
              <div class="theme">
                {{item.coupon.theme?item.coupon.theme:"新人礼包"}}
              </div>
              <div class="receiver_wrapper" v-if="item.coupon.senderHeadImage">
                <img onclick="return false" :src="item.coupon.senderHeadImage" alt="" class="receiver_avartar">
                <span class="receiver_name">{{item.coupon.senderName}}</span><span>送</span>
              </div>
              <!-- v-if="item.coupon.integral" -->
              <div class="receiverProject_wrapper">
                <div class="integral_content">
                  {{item.coupon.codeNum}}
                  <!-- <img onclick="return false" src="../../assets/image/integralIcon.png" class="integral_icon"> -->
                  <!-- <span class="integral_text">{{item.coupon.integral}}</span> -->
                </div>
                <img onclick="return false" v-if="item.coupon.image" :src="item.coupon.image" class="project_img">
              </div>
            </div>
            <div class="discount_content">{{item.coupon.name}}</div>
            <div class="discount_limitAndTime">
              <div class="limit">积分:{{item.coupon.integral}} &nbsp;&nbsp;&nbsp;{{item.coupon.limit}}</div>
              <p class="time">有效期至:{{item.coupon.time}}</p>
            </div>
          </div>
          <div class="myright" @click="selectDiscout(item.id)">
            <p class="use_text">立即使用</p>
          </div>
        </li>
      </ul>
      <!-- 已使用 -->
      <ul class="usered_list" v-show="tagIndex==1">
        <h3 class="noCouponTips" v-if="!usedList.length">暂无优惠券</h3>
        <li v-else class="item" v-for="(item,index) in usedList" :key="index">
          <div class="left1">
            <p class="name">{{item.coupon.name}}</p>
            <p class="time">{{item.coupon.time}}</p>
          </div>
          <div class="right1">
            已使用
          </div>
        </li>
      </ul>
      <!-- 已过期 -->
      <ul class="past_list" v-show="tagIndex==2">
        <h3 class="noCouponTips" v-if="!timeOutList.length">暂无优惠券</h3>
        <li v-else class="item" v-for="(item,index) in timeOutList" :key="index">
          <div class="left1">
            <p class="name">{{item.coupon.name}}</p>
            <p class="time">{{item.coupon.time}}</p>
          </div>
          <div class="right1">
            已过期
          </div>
        </li>
      </ul>
      <!-- 已送礼 -->
      <ul class="songLiList" v-show="tagIndex==3">
        <h3 class="noCouponTips" v-if="!songLiList.length">暂无优惠券</h3>
        <li v-else class="item" v-for="(item,index) in songLiList" :key="index">
          <div class="myleft">
            <p class="discount_type_text">{{item.coupon.type}}</p>
          </div>
          <div class="mycenter">
            <div class="discount_theme clearfix">
              <div class="theme">
                {{item.coupon.theme?item.coupon.theme:"新人礼包"}}
              </div>
              <div class="receiver_wrapper" v-if="item.coupon.receiverHeadImage">
                <img onclick="return false" :src="item.coupon.receiverHeadImage" alt="" class="receiver_avartar">
                <span class="receiver_name">{{item.coupon.receiverName}}</span><span>收</span>
              </div>
              <!-- v-if="item.coupon.integral" -->
              <div class="receiverProject_wrapper">
                <div class="integral_content">
                  1-01-0000001
                  <!-- <img onclick="return false" src="../../assets/image/integralIcon.png" class="integral_icon"> -->
                  <!-- <span class="integral_text">{{item.coupon.integral}}</span> -->
                </div>
                <img onclick="return false" v-if="item.coupon.image" :src="item.coupon.image" class="project_img">
              </div>
            </div>
            <div class="discount_content">{{item.coupon.name}}</div>
            <div class="discount_limitAndTime">
              <div class="limit">积分:{{item.coupon.integral}} &nbsp;&nbsp;&nbsp;{{item.coupon.limit}}</div>
              <p class="time">有效期至:{{item.coupon.time}}</p>
            </div>
          </div>
          <div class="myright">
            <p class="use_text">已赠送</p>
          </div>
        </li>
      </ul>
    </div>
    <validate v-show="isShow"></validate>
    <router-view></router-view>
  </div>
</template>

<script type='text/ecmascript-6'>
  import api from "common/api";
  import util from "common/util";
  import scroll from "../../base/scroll/scroll.vue";
  import {
    Tab,
    TabItem,
    XHeader,
    XButton
  } from "vux";
  import Validate from "../../base/validatephone/validatephone";
  import {
    mapGetters,
    mapMutations,
    mapState
  } from "vuex";
  import myHeader from "../../base/myheader/myheader.vue";
  export default {
    data() {
      return {
        flag: false,
        tagIndex: 0,
        unusedList: [],
        unuseCouponsLength: 0,
        usedCouponsLength: 0,
        timeOutListLength: 0,
        usedList: [],
        timeOutList: [],
        songLiList: [],
      };
    },
    computed: {
      ...mapGetters(["isShow"]),
      ...mapState(["userInfo"])
    },
    created() {
      this._loadUserAllCoupon() //获取优惠券
    },
    beforeRouteUpdate(to, from, next) {
      if (from.name === "cardDetail") {
        this._loadUserAllCoupon() //获取优惠券
      }
      next();
    },
    methods: {
      //获取优惠券
      _loadUserAllCoupon() {
        api.loadUserAllCoupon().then(res => {
          console.log("优惠券：", res);
          this.unusedList = [];
          this.usedList = [];
          this.timeOutList = [];
          this.songLiList = [];
          this.unuseCouponsLength = res.unuseCoupons.length;
          this.usedCouponsLength = res.usedCoupos.length;
          this.timeOutListLength = res.expiredCoupos.length;
          //未使用优惠券
          this.distributeDiscount(res.unuseCoupons, this.unusedList);
          // res.unuseCoupons.forEach(element => {
          //   element.coupon.time = "过期时间：" + element.coupon.endTime;
          //   element.coupon.name = element.coupon.type ? "获得" + element.coupon.content : "获得" + element.coupon.value + "元代金券";
          //   this.unusedList.push(element)
          // });
          //已使用优惠券
          this.distributeDiscount(res.usedCoupos, this.usedList);
          // res.usedCoupos.forEach(element => {
          //   element.coupon.time = "过期时间：" + element.coupon.endTime;
          //   element.coupon.name = element.coupon.type ? "获得" + element.coupon.content : "获得" + element.coupon.value + "元代金券";
          //   this.usedList.push(element)
          // });
          //过期优惠券
          this.distributeDiscount(res.expiredCoupos, this.timeOutList);
          //已送礼优惠券
          this.distributeDiscount(res.sentCoupos, this.songLiList);
          // res.expiredCoupos.forEach(element => {
          //   element.coupon.time = "过期时间：" + element.coupon.endTime;
          //   element.coupon.name = element.coupon.type ? "获得" + element.coupon.content : "获得" + element.coupon.value + "元代金券";
          //   this.timeOutList.push(element);
          //   console.log(this.timeOutList)
          // })
        });
      },
      distributeDiscount(resDiscountList, discountList) {
          // let tempDiscountList = []
          resDiscountList.forEach(element => {
            element.coupon.codeNum =
              util.prefixZero(element.coupon.type, 1) + "-" +
              util.prefixZero(element.coupon.batch, 3) + "-" +
              util.prefixZero(element.coupon.acquireNum, 7)
            element.coupon.time = element.coupon.endTime;
            element.getTime = util.timestampToTime(element.getTime);
            switch (element.coupon.type) {
              case 0:
                element.coupon.name = element.coupon.value + "元代金券";
                break;
              case 1:
                element.coupon.name = element.coupon.content;
                break;
              case 2:
                element.coupon.name = element.coupon.value + "折";
                break;
              case 3:
                element.coupon.name = element.coupon.content;
                break;
              case 4:
                element.coupon.name = element.coupon.content;
                break;
              default:
                break;
            }
            element.coupon.type = util.returnDiscountType(element.coupon.type);
            discountList.push(element)
          });
      },
      //返回上一页
      goBack() {
        this.$router.push({
          name: "card"
        });
      },
      //进入优惠券详情
      selectDiscout(id) {
        this.$router.push({
          path: `/card/${id}`
        });
      },
      //绑定手机
      bindTel() {
        // this.isShow = true;
        this.changeValidate(true);
      },
      onItemClick(index) {
        this.tagIndex = index;
        console.log(this.tagIndex);
      },
      onClickBack() {},
      ...mapMutations({
        changeValidate: "CHANGE_VALIDATE"
      })
    },
    components: {
      Tab,
      TabItem,
      XHeader,
      XButton,
      Validate,
      myHeader,
      scroll
    }
  };
</script>

<style scoped lang='less'>
  @import "../../assets/less/variable.less";
  @import "../../assets/less/base.less";
  @import "../../assets/less/mixin.less";
  @import "../../assets/less/card.less";
  .card {
    height: 100%;
    background: #eee;
    .tab_wrapper {
      .vux-tab .vux-tab-item {
        color: #333;
      }
      .vux-tab .vux-tab-item.vux-tab-selected {
        color: #ffae00;
      }
      .border-1px(#ddd);
    }
    .warm_tips {
      padding: 0.175rem 0.25rem;
      display: flex;
      justify-content: space-between;
      .tips {
        // line-height: 1.8125rem;
        padding-top: 0.15rem;
        box-sizing: border-box;
        font-size: 0.4rem;
      }
      .bingTel {
        display: inline-block;
        width: 1.8rem;
        padding: 0.2rem 0;
        border: 1px solid #ccc;
        text-align: center;
        border-radius: 6px;
        background-color: #ccc;
        color: #fff;
      }
    }
    .discount_wrapper {
      margin-top: 0.1133rem;
      background: #eee;
      padding: 0 0.1867rem;
      .noCouponTips {
        font-size: 0.5333rem;
        color: #ccc;
        width: 100%;
        text-align: center;
        margin-top: 50%;
      }
      .no_user_list {
        overflow-y: auto;
        .card("../../assets/image/discount_bg.png", 0.5333rem);
        .item {
          display: flex;
        }
        .myleft {
          width: 1.3rem;
          text-align: center;
          .discount_type_text {
            display: inline-block;
            width: 0.4rem;
            padding-top: 0.2333rem;
            font-size: 0.45rem;
            color: #D33700;
            font-weight: 900
          }
        }
        .mycenter {
          margin-left: .1rem;
          flex: 1;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          position: relative;
          .discount_theme {
            font-size: 0.3733rem;
            position: relative;
            .theme,
            .receiver_wrapper,
            .receiverProject_wrapper {
              float: left;
            }
            .theme {}
            .receiver_wrapper {
              margin-left: 0.6667rem;
              .receiver_avartar {
                width: 0.5333rem;
                height: 0.5333rem;
                border-radius: 50%;
                margin-right: 0.1667rem;
                float: left;
              }
              .receiver_name {
                float: left;
                max-width: 1.2rem;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
            }
            .receiverProject_wrapper {
              position: absolute;
              right: 0.1333rem;
              .integral_content {
                font-size: 0.32rem;
              }
              .project_img {
                position: absolute;
                left: .6rem;
                margin-top: 0.1667rem;
                width: 1.3rem;
                height: 1rem;
              }
            }
          }
          .discount_content {
            margin-top: .3rem;
            font-size: 0.45rem;
            text-align: center;
          }
          .discount_limitAndTime {
            margin-top: .4rem;
            display: flex;
            justify-content: space-between;
            .limit {}
            .time {
              margin-left: 0.2667rem;
            }
          }
        }
        .myright {
          width: 1.3rem;
          text-align: center;
          box-sizing: border-box;
          .use_text {
            display: inline-block;
            width: 0.4rem;
            font-size: 0.4rem;
            color: #D33700;
            font-weight: 900
          }
        }
      }
      .songLiList {
        overflow-y: auto;
        .card("../../assets/image/songli_discount_bg.png", 0.5333rem);
        .item {
          display: flex;
        }
        .myleft {
          width: 1.3rem;
          text-align: center;
          .discount_type_text {
            display: inline-block;
            width: 0.4rem;
            padding-top: 0.2333rem;
            font-size: 0.45rem;
            color: #D33700;
            font-weight: 900
          }
        }
        .mycenter {
          margin-left: .1rem;
          flex: 1;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          position: relative;
          .discount_theme {
            font-size: 0.3733rem;
            position: relative;
            .theme,
            .receiver_wrapper,
            .receiverProject_wrapper {
              float: left;
            }
            .theme {}
            .receiver_wrapper {
              margin-left: 0.6667rem;
              .receiver_avartar {
                width: 0.5333rem;
                height: 0.5333rem;
                border-radius: 50%;
                margin-right: 0.1667rem;
                float: left;
              }
              .receiver_name {
                float: left;
                max-width: 1.2rem;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
            }
            .receiverProject_wrapper {
              position: absolute;
              right: 0.1333rem;
              .integral_content {
                font-size: 0.32rem;
              }
              .project_img {
                position: absolute;
                left: .6rem;
                margin-top: 0.1667rem;
                width: 1.3rem;
                height: 1rem;
              }
            }
          }
          .discount_content {
            margin-top: .3rem;
            font-size: 0.45rem;
            text-align: center;
          }
          .discount_limitAndTime {
            margin-top: .4rem;
            display: flex;
            justify-content: space-between;
            .limit {}
            .time {
              margin-left: 0.2667rem;
            }
          }
        }
        .myright {
          width: 1.3rem;
          text-align: center;
          padding-top: 0.22rem;
          box-sizing: border-box;
          .use_text {
            display: inline-block;
            width: 0.4rem;
            font-size: 0.4rem;
            color: #D33700;
            font-weight: 900
          }
        }
      }
      .usered_list {
        overflow-y: auto;
        .card("../../assets/image/used.png", 0.7333rem);
      }
      .past_list {
        overflow-y: auto;
        .card("../../assets/image/past.png", 0.7333rem);
      }
    }
  }
</style>
