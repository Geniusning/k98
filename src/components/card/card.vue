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
    <div class="warm_tips" v-show="!unusedList.length">
      <p class="tips">温馨提示：无券买单请点按钮</p>
      <span class="bingTel" @click="payNoCashier">无券买单</span>
    </div>
    <!-- 优惠券列表 -->
    <div class="discount_wrapper">
      <!-- 未使用 -->
      <ul class="no_user_list" v-show="tagIndex==0">
        <h3 class="noCouponTips" v-if="!unusedList.length">暂无优惠券</h3>
        <li v-else class="item" :class="{'vipmbg':item.coupon.type=='月卡券','viptbg':item.coupon.type=='次卡券' }" v-for="(item,index) in unusedList" :key="index">
          <div class="myleft">
            <p class="discount_type_text">{{item.coupon.type}}</p>
            <p class="yuE" v-show="item.usingTimes>0">剩{{item.usingTimes}}次</p>
          </div>
          <div class="mycenter" style="color:#FDDC69" v-show="item.coupon.type=='月卡券' ||item.coupon.type=='次卡券'">
            <div class="discount_theme clearfix">
              <div class="theme">
                {{item.coupon.theme?item.coupon.theme:"新人礼包"}}
              </div>
              <div class="receiver_wrapper" v-if="item.coupon.senderHeadImage">
                <img onclick="return false" :src="item.coupon.senderHeadImage" alt="" class="receiver_avartar">
                <span class="receiver_name">{{item.coupon.senderName}}</span><span>送</span>
              </div>
              <div class="receiverProject_wrapper">
                <div class="integral_content">
                  {{item.coupon.codeNum}}
                </div>
                <img onclick="return false" v-if="item.coupon.image" :src="item.coupon.image" class="project_img">
              </div>
            </div>
            <div class="discount_content">{{item.coupon.name}} <span v-if="item.usingTimes != 0" style="font-size:12px">(会员特权)</span></div>
            <div class="discount_limitAndTime">
              <div class="limit">积分:{{item.coupon.integral}} &nbsp;&nbsp;&nbsp;{{item.coupon.limit}}</div>
              <p class="time">{{item.coupon.startTime}}至{{item.coupon.endTime}}</p>
            </div>
          </div>
          <div class="mycenter" v-show="item.coupon.type!='月卡券' && item.coupon.type!='次卡券'">
            <div class="discount_theme clearfix">
              <div class="theme">
                {{item.coupon.theme?item.coupon.theme:"新人礼包"}}
              </div>
              <div class="receiver_wrapper" v-if="item.coupon.senderHeadImage">
                <img onclick="return false" :src="item.coupon.senderHeadImage" alt="" class="receiver_avartar">
                <span class="receiver_name">{{item.coupon.senderName}}</span><span>送</span>
              </div>
              <div class="receiverProject_wrapper">
                <div class="integral_content">
                  {{item.coupon.codeNum}}
                </div>
                <img onclick="return false" v-if="item.coupon.image" :src="item.coupon.image" class="project_img">
              </div>
            </div>
            <div class="discount_content">{{item.coupon.name}} <span v-if="item.usingTimes != 0">--剩余{{item.usingTimes}}次</span></div>
            <div class="discount_limitAndTime">
              <div class="limit">积分:{{item.coupon.integral}} &nbsp;&nbsp;&nbsp;{{item.coupon.limit}}</div>
              <p class="time">{{item.coupon.startTime}}至{{item.coupon.endTime}}</p>
            </div>
          </div>
          <div class="myright" @click="selectDiscout(item.id,item.canIuse)">
            <p class="use_text">用券买单</p>
          </div>
        </li>
      </ul>
      <!-- 已使用 -->
      <ul class="usered_list" v-show="tagIndex==1">
        <h3 class="noCouponTips" v-if="!usedList.length">暂无优惠券</h3>
        <li v-else class="item" :class="{'vipmbg':item.coupon.type=='月卡券','viptbg':item.coupon.type=='次卡券' }" v-for="(item,index) in usedList" :key="index">
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
              <p class="time">有效期至:{{item.coupon.endTime}}</p>
            </div>
          </div>
          <div class="myright">
            <p class="use_text">已使用</p>
          </div>
        </li>
      </ul>
      <!-- 已过期 -->
      <ul class="past_list" v-show="tagIndex==2">
        <h3 class="noCouponTips" v-if="!timeOutList.length">暂无优惠券</h3>
        <li v-else class="item" v-for="(item,index) in timeOutList" :key="index">
          <!-- <div class="left1">
                <p class="name">{{item.coupon.name}}</p>
                <p class="time">{{item.coupon.endTime}}</p>
              </div>
              <div class="right1">
                已过期
              </div> -->
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
              <p class="time">有效期至:{{item.coupon.endTime}}</p>
            </div>
          </div>
          <div class="myright">
            <p class="use_text">已过期</p>
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
              <p class="time">有效期至:{{item.coupon.endTime}}</p>
            </div>
          </div>
          <div class="myright">
            <p class="use_text">已赠送</p>
          </div>
        </li>
      </ul>
    </div>
    <validate v-show="isShow"></validate>
    <Popup @close="closePopUp" :show="showPanel" :top="25" :height="5">
      <group title="请输入消费桌桌号">
         <input type="number" v-model="deskNum" style="display:block;height:.7rem;line-height:.7rem;margin:30px auto;text-indent: 4px;">
      </group>
       <x-button @click.native="saveDeskNum" style="width:300px;background-color:#FFD800;color:#fff;" type="default">确定</x-button>
    </Popup>
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
    XButton,
    Group,
    XInput
  } from "vux";
  import Validate from "../../base/validatephone/validatephone";
  import {
    mapGetters,
    mapMutations,
    mapState
  } from "vuex";
  import myHeader from "../../base/myheader/myheader.vue";
  import Popup from 'base/popUp/popUp'
  export default {
    data() {
      return {
        showPanel: false,
        deskNum:"",
        vipColor: "#FDDC69",
        flag: false,
        tagIndex: 0,
        unusedList: [],
        unuseCouponsLength: 0,
        usedCouponsLength: 0,
        timeOutListLength: 0,
        usedList: [],
        timeOutList: [],
        songLiList: [],
        showPositionValue: false,
        isScan:false,
      };
    },
    computed: {
      ...mapGetters(["isShow"]),
      ...mapState(["userInfo", "deskCode", "deskId"])
    },
    created() {
      this._loadUserAllCoupon(); //获取优惠券
      this.loadCashierList();
    },
    mounted(){
      console.log("card--mounted")
      this.isScan = util.GetQueryString("isScan")
      console.log(this.isScan)
      if(this.isScan){
        this.showPanel = true;
      }
    },
    beforeRouteUpdate(to, from, next) {
      if (from.name === "cardDetail") {
        this._loadUserAllCoupon(); //获取优惠券
      }
      next();
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      if (!this.userInfo.isSubscribe) {
        this.changeQrCodeText({
          title: "长按关注，方便核销优惠券",
          bottomText: "会员特权:领福利、交群友、参活动"
        });
        this.showQrcode(true);
      }
      next()
    },
    methods: {
      saveDeskNum(){
        if(!this.deskNum){
          this.$vux.toast.text('请输入桌号', 'top')
          return
        }
        console.log(Number(this.deskNum))
        this.saveDeskCode(Number(this.deskNum),"")
        this.showPanel = false;
      },
       closePopUp(flag) {
        this.showPanel = flag
      },
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
          //已使用优惠券
          this.distributeDiscount(res.usedCoupos, this.usedList);
          //过期优惠券
          this.distributeDiscount(res.expiredCoupos, this.timeOutList);
          //已送礼优惠券
          this.distributeDiscount(res.sentCoupos, this.songLiList);
        });
      },
      distributeDiscount(resDiscountList, discountList) {
        // let tempDiscountList = []
        resDiscountList.forEach(element => {
          element.coupon.codeNum =
            util.prefixZero(element.coupon.type, 1) +
            "-" +
            util.prefixZero(element.coupon.batch, 3) +
            "-" +
            util.prefixZero(element.coupon.acquireNum, 7);
          element['canIuse'] = util.compareDate(element.coupon.startTime, util.timestampToTime(new Date().getTime()).slice(0, 10))
          // element.getTime = util.timestampToTime(element.getTime);
          element.coupon.name = util.returnDiscountContent(element.coupon)
          element.coupon.type = util.returnDiscountType(element.coupon.type);
          discountList.push(element);
        });
        discountList = discountList.sort(util.sortByKey("getTime"))
      },
      //返回上一页
      goBack() {
        this.$router.push({
          name: "card"
        });
      },
      //进入优惠券详情
      selectDiscout(id, canIuse) {
        if (!canIuse) {
          this.$vux.toast.text('未到时间时间', 'middle')
          return
        }
        if(!this.deskCode){
          this.$vux.toast.text('请到店扫消费桌二维码使用', 'middle')
          return
        }
        this.$router.push({
          path: `/card/${id}`
        });
      },
      //绑定手机
      bindTel() {
        // this.isShow = true;
        this.changeValidate(true);
      },
      async payNoCashier() {
        let data = {
          deskid: this.deskId || "",
          deskcode: this.deskCode || 1,
          payuserid: this.userInfo.openid,
          payuserheadimgurl: this.userInfo.headimgurl,
        };
        let res2 = await api.launchSelfPay(data);
        console.log("res2------", res2)
        if (res2.errorCode === 0) {
          this.cashierObj["openid"] = this.cashierObj.CashierID
          this.setChatFriend(this.cashierObj);
          setTimeout(() => {
            this.$router.push({
              name: "cashierChat",
              params: {
                from: this.userInfo.openid,
                to: this.cashierObj.CashierID,
                deskCode: this.deskCode,
                isCashier: false,
              }
            });
          }, 500);
        }
      },
      //加载收银员列表 (该接口会判断当前用户是否是收银员，若是会加载向收银员申请核销的用户列表，若否则会加载收银员消息表)
      loadCashierList() {
        api.loadCashierList().then(res => {
          console.log("加载收银员列表---", res)
          this.cashierObj = res
        })
      },
      onItemClick(index) {
        this.tagIndex = index;
        //console.log(this.tagIndex);
      },
      onClickBack() {},
      ...mapMutations({
        setChatFriend: "SET_CHAT_FRIEND", //全局设置聊天对象的信息
        changeQrCodeText: "CHANGEQRCODETEXT",
        changeValidate: "CHANGE_VALIDATE",
        showQrcode: "SHOW_QRCODE", //展示二维码
         saveDeskCode: "SAVEDESKCODE",//保存桌贴号,桌号id
      })
    },
    components: {
      Tab,
      TabItem,
      XHeader,
      XButton,
      Validate,
      myHeader,
      scroll,
      Popup,
      Group,
    XInput
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
        .vipmbg {
          background-image: url("../../assets/image/discount_vipm_bg.png");
          background-repeat: no-repeat;
          background-size: 100%;
        }
        .viptbg {
          background-image: url("../../assets/image/discount_vipt_bg.png");
          background-repeat: no-repeat;
          background-size: 100%;
        }
        .item {
          display: flex;
        }
        .myleft {
          width: 1.3rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          .discount_type_text {
            display: inline-block;
            width: 0.4rem;
            font-size: 0.45rem;
            color: #d33700;
            font-weight: 900;
          }
          .yuE {
            color: #d33700;
            font-size: 0.1333rem;
          }
        }
        .mycenter {
          margin-left: 0.1rem;
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
                left: 0.6rem;
                margin-top: 0.1667rem;
                width: 1.3rem;
                height: 1rem;
              }
            }
          }
          .discount_content {
            margin-top: 0.3rem;
            font-size: 0.45rem;
            text-align: center;
          }
          .discount_limitAndTime {
            margin-top: 0.4rem;
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
            color: #d33700;
            font-weight: 900;
          }
        }
      }
      .songLiList {
        overflow-y: auto;
        .card("../../assets/image/songli_discount_bg.png",
        0.5333rem);
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
            color: #d33700;
            font-weight: 900;
          }
        }
        .mycenter {
          margin-left: 0.1rem;
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
                left: 0.6rem;
                margin-top: 0.1667rem;
                width: 1.3rem;
                height: 1rem;
              }
            }
          }
          .discount_content {
            margin-top: 0.3rem;
            font-size: 0.45rem;
            text-align: center;
          }
          .discount_limitAndTime {
            margin-top: 0.4rem;
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
            color: #d33700;
            font-weight: 900;
          }
        }
      }
      .usered_list {
        overflow-y: auto;
        .card("../../assets/image/songli_discount_bg.png",
        0.5333rem);
        .vipmbg {
          background-image: url("../../assets/image/discount_vipm_bg.png");
          background-repeat: no-repeat;
          background-size: 100%;
        }
        .viptbg {
          background-image: url("../../assets/image/discount_vipt_bg.png");
          background-repeat: no-repeat;
          background-size: 100%;
        }
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
            color: #d33700;
            font-weight: 900;
          }
        }
        .mycenter {
          margin-left: 0.1rem;
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
                left: 0.6rem;
                margin-top: 0.1667rem;
                width: 1.3rem;
                height: 1rem;
              }
            }
          }
          .discount_content {
            margin-top: 0.3rem;
            font-size: 0.45rem;
            text-align: center;
          }
          .discount_limitAndTime {
            margin-top: 0.4rem;
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
          padding-top: 0.2667rem;
          text-align: center;
          box-sizing: border-box;
          .use_text {
            display: inline-block;
            width: 0.4rem;
            font-size: 0.4rem;
            color: #d33700;
            font-weight: 900;
          }
        }
      }
      .past_list {
        overflow-y: auto;
        .card("../../assets/image/songli_discount_bg.png",
        0.5333rem);
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
            color: #d33700;
            font-weight: 900;
          }
        }
        .mycenter {
          margin-left: 0.1rem;
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
                left: 0.6rem;
                margin-top: 0.1667rem;
                width: 1.3rem;
                height: 1rem;
              }
            }
          }
          .discount_content {
            margin-top: 0.3rem;
            font-size: 0.45rem;
            text-align: center;
          }
          .discount_limitAndTime {
            margin-top: 0.4rem;
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
          padding-top: 0.2667rem;
          text-align: center;
          box-sizing: border-box;
          .use_text {
            display: inline-block;
            width: 0.4rem;
            font-size: 0.4rem;
            color: #d33700;
            font-weight: 900;
          }
        }
      }
    }
  }
</style>
