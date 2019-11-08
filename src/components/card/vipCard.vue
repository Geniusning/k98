<template>
  <div class="welfare_wrapper">
    <div class="title_content_wel ">
      <div class="title clearfix">
        <h2 class="shop_title2">· 请选择卡种(单选)</h2>
      </div>
    </div>
    <div class="welfare_content " v-if="vipCardList.length">
      <ul class="welfare_list" v-if="vipCardList.length">
        <li class="item clearfix" v-for="(item,index) in vipCardList" :key="index">
          <div class="left">
            <img class="shopLogo" :src="shopSettingInfo.image" alt="">
            <!-- <p class="shopName">{{shopSettingInfo.name}}</p> -->
            <p class="code">{{item.CouponInfo.codeNum}}</p>
            <p class="time">{{item.CouponInfo.endTime}}</p>
            <p class="vipTimes">{{item.vipCardType==0?"VIP/"+item.usingMonths+"个月":"VIP/"+item.usingTimes+"次"}}</p>
            <img v-if="item.vipCardType==0" onclick="return false" src="../../assets/image/vipMonths.png" alt class="shopPic" />
            <img v-else onclick="return false" src="../../assets/image/vipTimes.png" alt class="shopPic" />
          </div>
          <div class="center">
            <p class="title">{{item.vipCardType==0?"VIP "+item.usingMonths+"个月":"VIP "+item.usingTimes+"次"}}</p>
            <p class="desc">{{item.vipName}}(会员特权)</p>
            <p class="limit">{{item.CouponInfo.limit}}(限制条件)</p>
            <p class="price">
              <span class="origin_p">积分换：{{item.vipIntegral}}积分</span>
            </p>
          </div>
          <div class="right">
            <div class="thunb_box">
              <label class="ui-radio" :class="{'checked':radio_vip==item.vipId}">
                  <input type="radio" @change="selectVip" v-model="radio_vip" :value="item.vipId">
              </label>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="title_content_wel vux-1px-t">
      <div class="title clearfix">
        <h2 class="shop_title2">· 请选择推荐人(必填)</h2>
      </div>
    </div>
    <div class="staff_content">
      <ul class="staff_list" id="style-1" v-if="staffList.length">
        <li class="staffItem" v-for="(item,index) in staffList" :key="index">
          <div class="staff_left">
            <img class="avatarImg" :src="item.headImgUrl?item.headImgUrl:defaultHeadImg" alt="">
            <p class="staffName">{{item.name}}  工号：</p>
            <p class="staffName" style="font-size:15px">{{item.number}}</p>
          </div>
          <div class="staff_right">
            <div class="thunb_box">
              <label class="ui-radio" :class="{'checked':radio_phone==item.phone}">
                    <input type="radio" @change="selectPhone" v-model="radio_phone" :value="item.phone">
              </label>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="btn_content">
      <div class="btn" @click="goBack">取消</div>
      <div class="btn" @click="book">确认兑换</div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import util from "common/util";
  import api from "common/api";
  import {
    mapMutations,
    mapActions,
    mapState,
    mapGetters
  } from "vuex";
  import myHeader from "../../base/myheader/myheader.vue";
  export default {
    name: "vip_card",
    data() {
      return {
        vipCardList: [],
        staffList: [],
        radio_vip: '',
        radio_phone: '',
        defaultHeadImg: require("../../assets/image/home_letter.png")
      }
    },
    mounted() {
      this.loadVipCardList()
      this.loadAllStaff()
    },
    computed: {
      ...mapState(["shopSettingInfo"])
    },
    methods: {
      book() {
        this.$vux.toast.text('功能暂未完善', 'middle')
      },
      goBack() {
        this.$router.go(-1)
      },
      selectVip() {
        console.log("this.radio_vip--------", this.radio_vip)
      },
      selectPhone() {
        console.log("radio_phone----------", this.radio_phone)
      },
      loadAllStaff() {
        api.loadAllStaff().then(res => {
          console.log("全部员工-------", res)
          if (res.errCode == 0) {
            this.staffList = res.staff.sort(util.sortByKeyS2L("number"))
          }
        })
      },
      //加载vip卡券
      loadVipCardList() {
        api.loadVipCardList().then(res => {
          console.log("vipCardlist--------", res)
          this.vipCardList = res
          this.vipCardList.forEach(item => {
            item.CouponInfo.codeNum =
              util.prefixZero(item.CouponInfo.type, 1) +
              util.prefixZero(item.CouponInfo.batch, 3) +
              util.prefixZero(item.CouponInfo.acquireNum, 4)
          })
        })
      },
    },
    components: {
      myHeader
    }
  }
</script>

<style scoped lang='less'>
  @import "../../assets/less/variable.less";
  @import "../../assets/less/home_common.less";
  @import "../../assets/less/mixin.less";
  @import "~vux/src/styles/close";
  .welfare_wrapper {
    // .titleWrapper;
    .title_content_wel {
      // display: flex;
      // justify-content: space-between;
      .title {
        font-size: 16px;
        .shop_title {
          background-color: #F2F2F2;
          padding-left: 0.8667rem;
          font-weight: 900;
          height: 1rem;
          line-height: 1rem;
          padding-top: 0.2667rem;
        }
        .shop_title2 {
          background-color: #F2F2F2;
          margin-top: 0.08rem;
          font-size: 16px;
          height: .7rem;
          font-weight: 900;
          padding-left: 0.2667rem;
          padding-top: 0.1333rem;
        }
      }
    }
    .welfare_content {
      margin-top: 0.1rem; // padding-top: .3rem;
      .welfare_list {
        .item {
          padding: 0.32rem 0.2667rem; // height: 2.4667rem;
          margin-bottom: 0.0533rem;
          background-color: #f2f2f2;
          .left {
            float: left;
            width: 2.8533rem;
            height: 2.1333rem;
            position: relative;
            .shopLogo,
            .shopName {
              position: absolute;
              top: 0.1333rem;
            }
            .time {
              position: absolute;
              color: #FEDD6A;
              bottom: 0.1rem;
              font-size: 0.2333rem;
              right: 0.08rem;
              ;
            }
            .code {
              position: absolute;
              color: #FEDD6A;
              bottom: 0.1rem;
              font-size: 0.2333rem;
            }
            .shopLogo {
              width: 0.4rem;
              height: 0.4rem;
              border-radius: 50%;
              left: 0.1333rem;
            }
            .vipTimes {
              position: absolute;
              color: #FEDD6A;
              font-size: 0.2333rem;
              right: 0.1333rem;
              top: 0.2333rem;
              font-weight: 900
            }
            .shopPic {
              width: 100%;
              height: 100%;
            }
          }
          .center {
            float: left;
            margin-left: 0.2667rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .title {
              font-size: 0.3733rem;
              color: #333;
              font-weight: bold;
            }
            .desc {
              margin-top: 0.1rem;
              color: #8f8f8f;
              font-size: 0.32rem;
            }
            .limit {
              margin-top: 0.16rem;
              color: #8f8f8f;
              font-size: 0.2667rem;
            }
            .price {
              margin-top: 0.1rem;
              .discount_p {
                color: #333;
                font-size: 0.3467rem;
                margin-right: 0.4267rem;
              }
              .origin_p {
                color: red;
                font-size: 0.3467rem;
              }
            }
          }
          .right {
            margin-top: 1.4rem;
            position: relative;
            .thunb_box {}
            .show_detail_btn {
              width: 1.4667rem;
              padding: 0.1067rem 0;
              text-align: center;
              line-height: 0.5067rem; // background: @baseColor;
              background: -webkit-linear-gradient( left, #fff800, #fef200, #fccc00, #fbbc00);
              color: #1d1d1d;
              border-radius: 0.08rem;
            }
          }
        }
      }
    }
    .staff_content {
      background-color: #F2F2F2;
      margin-top: 0.0533rem;
      padding: 0.56rem 0;
      .staff_list {
        width: 7.0667rem;
        height: 6rem;
        overflow-y: scroll;
        margin: 0 auto;
        background: #DEDEDE;
        border-radius: 0.2667rem;
        padding: 0.4267rem;
        box-sizing: border-box;
        .staffItem {
          width: 6.16rem;
          border-radius: 0.1333rem;
          background-color: #B4B4B4;
          margin-bottom: 6px;
          height: 1.3333rem;
          display: flex;
          justify-content: space-between;
          .staff_left {
            padding: 0.2267rem;
            .avatarImg {
              width: 0.9667rem;
              height: 0.9667rem;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 0.2667rem;
            }
            .staffName {
              display: inline-block;
              color: #fff;
            }
          }
          .staff_right {
            margin-top: .4rem;
            margin-right: .4rem;
          }
        }
      }
      #style-1::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
      }
      #style-1::-webkit-scrollbar {
        width: 6px;
        background-color: #F5F5F5;
      }
      #style-1::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #B4B4B4;
      }
    }
    .btn_content {
      margin-top: .4rem;
      display: flex;
      justify-content: space-around;
      padding-bottom: .3rem;
      .btn {
        padding: 0.2067rem 0.3067rem;
        text-align: center;
        line-height: 0.5067rem;
        background: -webkit-linear-gradient( left, #fff800, #fef200, #fccc00, #fbbc00);
        color: #1d1d1d;
        font-weight: 900;
        font-size: 14px;
        border-radius: 0.08rem;
      }
    }
    .ui-radio {
      width: 0.3867rem;
      height: 0.3867rem;
      border: 1px solid #333;
      display: inline-block;
      position: relative;
    }
    .ui-radio.disabled {
      border-color: #ccc;
    }
    .ui-radio::after {
      content: '√';
      width: 0.1333rem;
      height: 0.1333rem; // border-radius: 50%;
      display: inline-block;
      position: absolute;
      left: 50%;
      top: 20%;
      margin: -0.2rem 0 0 -0.1rem;
      color: red;
      transition: all .5s ease;
      opacity: 0;
      transform: scale(0);
      font-weight: 900;
      font-size: 0.4667rem;
    }
    .ui-radio.disabled::after {
      background-color: #fff;
    }
    .ui-radio.checked::after {
      opacity: 1;
      transform: scale(1);
    }
    .ui-radio input[type=radio] {
      opacity: 0;
      margin: 0;
    }
  }
</style>
