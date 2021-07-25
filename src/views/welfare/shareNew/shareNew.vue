
<template>
  <div class="shareNew_wrapper">
    <div class="shareNew-box" id="shareNew">
      <div class="back-icon" @click="back2Welfare">
        <img class="backIconImg" onclick="return false" src="../../../assets/image/white_home.png"
          alt="">
        <p style="font-size:14px;color:#fff">了解商家</p>
      </div>
      <img class="shareImg" src="../../../assets/image/shareLogo.jpg" alt="">
      <div class="shop-container" @click="goHome">
        <img onclick="return false" class="logo" :src="shopSettingInfo.image" alt>
        <p class="bar_name">{{shopSettingInfo.name}}</p>
      </div>
      <!-- <img onclick="return false" src="../../../assets/image/shareLogo.jpg" alt class="sharePic"> -->
      <ul class="discount-container">
        <li class="item" v-for="(item,index) in couponList" :key="index">
          <div class="myleft">
            <p class="desc" v-if="index==0">新人获赠</p>
            <p class="desc" v-else>分享获赠</p>
          </div>
          <div class="mycenter">
            <p class="discout_type" v-if="item.type==0">现金券</p>
            <p class="discout_type" v-else-if="item.type==1">实物券</p>
            <p class="discout_type" v-else-if="item.type==2">折扣券</p>
            <p class="discout_type" v-else-if="item.type==3">兑换券</p>
            <p class="discout_type" v-else-if="item.type==4">满减券</p>
            <p class="discout_type" v-else>兑换券</p>
          </div>
          <div class="myright">
            <div class="discount_theme">{{item.theme?item.theme:"新人礼包"}}</div>
            <div class="discount_content">{{item.name}}</div>
            <div class="discount_limitAndTime">
              <p class="limit">{{item.limit}}</p>
              <p class="time">有效期至:{{item.endTime?item.endTime:'2030-02-22'}}</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="handle-container">
        <img onclick="return false" @click="receiveACouponByID(couponList[0].couponID,'a')" class="btn"
          src="../../../assets/image/get_discount_btn.png" alt>
        <img onclick="return false" @click="share" class="btn" src="../../../assets/image/share_discount_btn.png"
          alt>
      </div>
      <div class="bg" v-show="isShow_bg" @click="share">
        <img onclick="return false" src="../../../assets/image/share.png" alt>
        <p class="shareText">点击“...”分享好友</p>
        <p class="shareText">首次分享获得优惠券</p>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import util from 'common/util'
import api from 'common/api'
import Config from 'common/config'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isShow_bg: false,
      couponList: [],
      activityId: ''
    }
  },
  mounted() {
    util.addVisitRecord(this.$route.name)
    this._loadInviteCoupon()
  },
  computed: {
    ...mapState(['shareUrl', 'userInfo', 'shopSettingInfo', 'baseUrl'])
  },
  methods: {
    getTkCookie() {
      alert(document.cookie)
      let arr = document.cookie.split(';')
      arr.forEach(item => {
        let tkname = item.split('=')[0]
        if (tkname == 'tk') {
          // alert("tk="+item.split("=")[1])
          return item.split('=')[1]
        }
      })
    },
    //领取优惠券
    receiveACouponByID(couponId, type) {
      api.acquireInviteCoupon(couponId, type).then(res => {
        //console.log("领取结果------------", res);
        if (res.errCode === 0) {
          this.$vux.toast.show({
            text: '领取成功'
          })
        } else if (res.errCode == 1036) {
          this.$vux.toast.text(
            "您是老客户，不能领新人礼包。可以通过'分享'好友获得优惠券"
          )
        } else if (res.errCode == 1035) {
          // 已经领取过le
          this.$vux.toast.text('您已领取过啦')
        } else if (res.errCode == 1010) {
          //   优惠券删除了
          this.$vux.toast.text('您来的太迟了，活动已结束')
        } else if (res.errCode == 1017) {
          this.$vux.toast.text('您来的太迟了，优惠券发完啦')
        }
      })
    },
    //返回福利活动页面
    back2Welfare() {
      this.$router.push({
        name: 'home'
      })
    },
    //获取优惠券
    _loadInviteCoupon() {
      api.loadInviteCoupon(true).then(res => {
        //console.log("获取优惠券---------", res);
        if (!res.coupons) {
          return false
        }
        let tempArr = []
        if (res.errCode === 0) {
          tempArr[0] = res.coupons.aCoupon
          tempArr[1] = res.coupons.bCoupon
          this.activityId = res.coupons.activityId
        }
        //console.log("tempArr------", tempArr);
        tempArr.forEach(element => {
          switch (element.type) {
            case 0:
              element.name = element.value + '元代金券'
              break
            case 1:
              element.name = element.content
              break
            case 2:
              element.name = element.value + '折扣券'
              break
            case 3:
              element.name = element.content + '兑换券'
              break
            case 4:
              element.name = element.content
              break
            default:
              element.name = element.content
              break
          }
        })
        this.couponList = tempArr
        setTimeout(() => {
          let shareObj = {
            title: '新人大礼包',
            desc: `抢了${
              this.shopSettingInfo.aliasName
            }一份新人礼包，转送给你，有空去瞅瞅`,
            link: `${this.shareUrl}#/shareNew?visitType=4&phone=${
              this.userInfo.phone
            }&role=${this.userInfo.role}&openId=${this.userInfo.openid}`,
            imgUrl: `${this.shopSettingInfo.image}`
          }
          util.setShareInfo(
            shareObj,
            this.couponList[1].couponID,
            'b',
            this.receiveACouponByID
          )
        }, 1000)
      })
    },
    goHome() {
      this.$router.push({
        name: 'home'
      })
    },
    back() {
      this.$router.push({
        name: 'welfare'
      })
    },
    //   分享
    share() {
      this.isShow_bg = !this.isShow_bg
    }
  },
  watch: {
    $route: function(newValue, oldValue) {
      //console.log(oldValue);
      //console.log(newValue);
    }
  },
  components: {}
}
</script>

<style scoped lang='less'>
@import '../../../assets/less/mixin.less';
.shareNew_wrapper {
  // height: 100%;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #ff9a0a;
  .shareNew-box {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
    padding-bottom: 0.5333rem;
    position: absolute; // .bg('../../assets/image/shareNewer.png');
    background-size: cover;
    .back-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      width: 1.6rem;
      top: 0.3333rem;
      right: 0.2333rem;
      .backIconImg {
        width: 0.7rem;
        height: 0.7rem;
      }
    }
    .shareImg {
      width: 100%;
      height: 9rem;
    }
    .shop-container {
      position: absolute;
      display: flex;
      top: 0.6667rem;
      left: 0.2667rem;
      background-color: rgba(0, 0, 0, 0.1);
      padding: 0 0.1333rem;
      border-radius: 0.1333rem;
      .logo {
        width: 0.6733rem;
        height: 0.6733rem;
        float: left;
        margin-top: -2px;
        border-radius: 50%;
        margin-right: 0.1367rem;
      }
      .bar_name {
        color: #f4f4f4;
        float: left;
        font-family: 'PingFang-SC-Regular';
        font-size: 16px;
        font-weight: bold;
      }
    }
    .sharePic {
      width: 100%;
      box-shadow: 0 0.0533rem 0.3667rem 0.0533rem #ff9a0a;
    }
    .discount-container {
      padding: 0 0.2667rem; // display: flex;
      // justify-content: space-between;
      margin-top: -0.1333rem;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
      .item {
        margin-bottom: 0.6667rem;
        display: flex;
        border-radius: 0.1333rem;
        .bg('../../assets/image/share_discount_bg.png');
        .myleft {
          width: 1.4rem;
          text-align: center;
          .desc {
            width: 0.4rem;
            display: inline-block;
            width: 0.4rem;
            font-size: 0.4rem;
            color: #d33700;
            font-weight: 800;
          }
        }
        .mycenter {
          width: 1.4rem;
          text-align: center;
          .discout_type {
            width: 0.4rem;
            display: inline-block;
            width: 0.4rem;
            padding-top: 0.2333rem;
            font-size: 0.45rem;
            color: #d33700;
            font-weight: 900;
          }
        }
        .myright {
          flex: 1;
          color: #f4f4f4;
          padding-left: 0.1867rem;
          padding: 0.1333rem;
          box-sizing: border-box;
          .discount_theme {
            font-size: 0.3733rem;
          }
          .discount_content {
            margin-top: 0.2rem;
            font-size: 0.45rem;
            text-align: center;
            font-weight: 700;
          }
          .discount_limitAndTime {
            margin-top: 0.3rem;
            display: flex;
            justify-content: space-between;
            .limit {
            }
            .time {
              margin-left: 0.2667rem;
            }
          }
        } // .item-left {
        //   padding: 0.2667rem 0.3333rem;
        //   .title {
        //     width: 0.4rem;
        //     font-size: 0.4267rem;
        //     word-wrap: break-word;
        //     color: #d23100;
        //     font-weight: bold;
        //   }
        // }
        // .item-right {
        //   display: flex;
        //   flex-direction: column;
        //   justify-content: space-around;
        //   padding: 0.2667rem 0;
        //   margin-left: 0.2667rem;
        //   .discount-content {
        //     font-size: 0.4633rem;
        //     font-weight: bold;
        //     color: #fff;
        //   }
        //   .discount-limitCondition {
        //     font-size: 0.3467rem;
        //     color: #fff;
        //   }
        // }
      }
    }
    .rule-container {
      padding: 0 0.2667rem;
      font-size: 0.3733rem;
      color: #fff;
      margin-top: 0.2067rem;
      .title {
      }
      .desc {
        white-space: normal;
        margin: 0.2067rem 0;
      }
      .time {
      }
    }
    .handle-container {
      margin-top: 1rem;
      display: flex;
      justify-content: space-around;
      .btn {
        width: 4.3733rem;
        height: 1.4133rem;
      }
    }
    .bg {
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
      text-align: right;
      img {
        width: 100px;
        height: 100px;
        position: relative;
        right: -0.3333rem;
      }
      .shareText {
        font-size: 0.6rem;
        color: #fff; // position: fixed;
        top: 110px;
        right: 0;
      }
    }
  }
}
</style>
