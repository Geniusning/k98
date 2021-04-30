<template>
  <div class="oneYuan-wrapper" v-if="groupShopInfo">
    <div class="header">
      <img @click="goBack" class="back" src="../../../assets/image/back_chat.png" alt="">
      <img @click="goHome" class="home" src="../../../assets/image/chat_home.png" alt="">
    </div>
    <div class="bg" v-show="isShow_bg" @click="isShow_bg=false">
      <img onclick="return false" src="../../../assets/image/share.png" alt />
      <p class="shareText">点击“...”分享好友,一起拼团</p>
    </div>
    <div class="no-open" v-if="!groupShopInfo.joinGroupShopInfo">
      <div class="oneYuan-pic">
        <img :src="groupShopInfo.oneYuanGroupShopInfo.image" class="pic" alt="团购图案">
      </div>
      <div class="oneYuan-header">
        <div class="oneYuan-header-left">
          <div class="oneYuan-price">拼团价：{{groupShopInfo.oneYuanGroupShopInfo.groupShoppingPrice}}元</div>
          <p class="oneYuan-member">3<span class="text">人拼</span></p>
          <p class="OneIntergal">拼团仅需100积分</p>
        </div>
        <div class="oneYuan-header-right">
          <p class="time-desc">距结束还剩</p>
          <div class="time-count">
            <p v-if="!groupShopInfo.isJoinGroupShop" class="no-openGroupTips">暂未开团</p>
            <CountDown v-else style="color:red" @finish="countDownFinish" :time="time">
              <template #default="timeData" format="DD 天 HH:mm:ss">
                <span class="block">{{ timeData.days }}</span>
                <span class="colon">天</span>
                <span class="block">{{ timeData.hours }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.minutes<10?'0'+timeData.minutes: timeData.minutes}}</span> <span class="colon">:</span>
                <span class="block">{{ timeData.seconds<10?'0'+timeData.seconds:timeData.seconds }}</span> </template> </CountDown> </div> </div> </div> <div class="oneYuan-content">
                    <h3 class="title">团购名称：{{groupShopInfo.oneYuanGroupShopInfo.name}}</h3>
                    <p class="content">项目描述：{{groupShopInfo.oneYuanGroupShopInfo.subtopic}}</p>
                    <p class="content">限制条件：{{groupShopInfo.oneYuanGroupShopInfo.limit}}</p>
                    <p class="content">原价：{{groupShopInfo.oneYuanGroupShopInfo.originPrice}}元</p>
          </div>
        </div>
        <div class="opened" v-else>
          <div class="oneYuan-opened-desc">
            <div v-if="time===0">
              <p class="oneYuan-opened-tips">
                <img src="../../../assets/image/gou.png" class="gou" alt="">
                <span>很抱歉</span>
              </p>
              <p class="oneYuan-opened-text">
                还差<span style="color: #ee0a24">{{3-groupShopInfo.joinGroupShopInfo.headImgUrls.headImgUrls.length}}人</span>，
                <span>该团购活动已成团或已过期</span>
              </p>
            </div>
            <div v-else>
              <p class="oneYuan-opened-tips">
                <img src="../../../assets/image/gou.png" class="gou" alt="">
                <span v-if="(groupShopInfo.isJoinGroupShop===true || isJoinGroup)">参团成功啦！</span>
                <span v-else-if="groupShopInfo.joinGroupShopInfo?groupShopInfo.joinGroupShopInfo.status===false:false">很抱歉</span>
                <span v-else-if="groupShopInfo.isJoinGroupShop===false">好友已参团</span>
              </p>
              <p class="oneYuan-opened-text">
                还差<span style="color: #ee0a24">{{3-groupShopInfo.joinGroupShopInfo.headImgUrls.headImgUrls.length}}人</span>，
                <span v-if="groupShopInfo.isJoinGroupShop===true && groupShopInfo.joinGroupShopInfo.status">赶紧邀请好友来参团吧</span>
                <span v-else-if="groupShopInfo.joinGroupShopInfo?groupShopInfo.joinGroupShopInfo.status===false:false">该团购活动已成团或已过期</span>
                <span v-else-if="groupShopInfo.isJoinGroupShop===false">就差你啦</span>
              </p>
            </div>
            <div class="oneYuan-opened-countdown">
              <span>距结束还剩：</span>
              <CountDown style="display:inline-block;color:red" @finish="countDownFinish" :time="time">
                <template #default="timeData" format="DD 天 HH:mm:ss">
                  <span class="block">{{ timeData.days }}</span>
                  <span class="colon">天</span>
                  <span class="block">{{ timeData.hours }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.minutes<10?'0'+timeData.minutes: timeData.minutes }}</span> <span class="colon">:</span>
                  <span class="block">{{ timeData.seconds<10?'0'+timeData.seconds:timeData.seconds }}</span> </template> </CountDown> </div> <div class="oneYuan-opened-headImgUrlList">
                      <ul class="list">
                        <li class="item" v-for="(img,index) in groupShopInfo.joinGroupShopInfo.headImgUrls.headImgUrls" :key="index">
                          <img class="avatar" :src="img?img:tempPic" alt="">
                        </li>
                        <li class="item" v-for="(item,index) in 3-groupShopInfo.joinGroupShopInfo.headImgUrls.headImgUrls.length">?</li>
                      </ul>
            </div>
          </div>
          <div class="oneYuan-opened-groupShopInfo">
            <div class="left-info">
              <img :src="groupShopInfo.oneYuanGroupShopInfo.image" class="pic" alt="">
            </div>
            <div class="right-info">
              <h3 class="title">团购：{{groupShopInfo.oneYuanGroupShopInfo.name}}</h3>
              <p class="content">描述：{{groupShopInfo.oneYuanGroupShopInfo.subtopic}}</p>
              <p class="content">条件：{{groupShopInfo.oneYuanGroupShopInfo.limit}}</p>
              <p class="content">原价：{{groupShopInfo.oneYuanGroupShopInfo.originPrice}}</p>
              <p class="content">团购价格：{{groupShopInfo.oneYuanGroupShopInfo.groupShoppingPrice}}</p>
            </div>
          </div>
        </div>
        <p class="line"></p>
        <div class="oneYuan-rule">
          <h3 class="title">团购须知：</h3>
          <p class="content">1、三人成团,用100积分换一张团购劵</p>
          <p class="content">2、期限2天，不成团不扣积分</p>
          <p class="content">3、成团后团购券存入卡券包，过期作废，不退积分</p>
          <p style="color: red;" class="content">4、成团后，凭券按团购价到店购买</p>
          <div v-if="time">
            <button v-if="groupShopInfo.isJoinGroupShop === true && groupShopInfo.joinGroupShopInfo.status " class="oneYuan-btn" @click="isShow_bg=true">分享好友,邀请TA拼团</button>
            <button @click="openGroupShopping(groupShopInfo.joinGroupShopInfo?groupShopInfo.joinGroupShopInfo.status:false)" v-else-if="groupShopInfo.joinGroupShopInfo?groupShopInfo.joinGroupShopInfo.status===false:false" class="oneYuan-btn">我要开团(支付100积分预订团购指标)</button>
            <button @click="openGroupShopping(groupShopInfo.joinGroupShopInfo?groupShopInfo.joinGroupShopInfo.status:false)" v-else-if="groupShopInfo.isJoinGroupShop === false" class="oneYuan-btn">
              {{groupShopInfo.joinGroupShopInfo?'一键参团(支付100积分预订团购指标)':'一键开团(支付100积分预订团购指标)'}}
            </button>
          </div>
          <div v-else>
            <button @click="openGroupShopping(false)" class="oneYuan-btn">
              一键开团(支付100积分预订团购指标)
            </button>
          </div>
        </div>
        <topUp v-if="showGroupShopRes" @closeIntegralPanel="closeIntegralPanel" :fatherPanelIndex="fatherPanelIndex"></topUp>
      </div>
</template>
<script>
import myHeader from "../../../base/myheader/myheader";
import topUp from "base/topUp/topUp";
import { CountDown } from 'vant';
import { mapState, mapMutations } from 'vuex'
import util from "common/util";
import api from "common/api";
export default {
  data () {
    return {
      fatherPanelIndex: 7,
      showGroupShopRes: false,
      isShow_bg: false,
      time: 0,
      isJoinGroup: false,
      groupShopInfoId: "",
      groupShopInfo: null,
      openGroupId: "",
      tempPic: require("../../../assets/image/divide_add_avatar.png"),
    }
  },
  mounted () {
    util.addVisitRecord(this.$route.name);
    let shareGroupShopId = util.GetQueryString("groupShopInfoId")
    let shareOpenGroupId = util.GetQueryString("openGroupId")
    this.groupShopInfoId = shareGroupShopId ? shareGroupShopId : this.$route.query.groupShopInfoId
    this.openGroupId = shareOpenGroupId ? shareOpenGroupId : this.$route.query.openGroupId
    this.loadGroupShopForUser()
  },
  computed: {
    ...mapState(["userInfo", "shareUrl"])
  },
  methods: {
    goHome () {
      this.$router.push({
        name: "home"
      })
    },
    goBack () {
      this.$router.go(-1);
    },
    //监听提示面板板状态
    closeIntegralPanel (flag) {
      this.showGroupShopRes = flag;
    },
    //开团
    openGroupShopping (flag) {
      if (this.groupShopInfo.joinGroupShopInfo && flag) { //已开团，则参团
        api.joinGroupShopping(this.groupShopInfo.joinGroupShopInfo.id, this.groupShopInfoId).then(res => {
          console.log("参团结果---", res)
          if (res.errCode === 0) {
            this.loadGroupShopForUser()
          } else if (res.errCode === 1029) {
            this.fatherPanelIndex = 7;
            this.showGroupShopRes = true
          } else if (res.errCode === 1096) {
            this.fatherPanelIndex = 8
            this.showGroupShopRes = true
            this.loadGroupShopForUser()
          }
        })
      } else {//未开团, 则开团
        api.openGroupShopping(this.groupShopInfoId).then(res => {
          console.log("开团结果=", res)
          if (res.errCode === 0) {
            this.openGroupId = res.info.id
            console.log("this.openGroupId----", this.openGroupId)
            this.loadGroupShopForUser()
          } else if (res.errCode === 1029) {
            this.fatherPanelIndex = 7;
            this.showGroupShopRes = true
          }
        })
      }
      if (!this.userInfo.isSubscribe) {
        setTimeout(() => {
          this.changeQrCodeText({
            title: "长按关注，以便兑换优惠券",
            bottomText: "会员特权:领福利、交群友、参活动"
          });
          this.showQrcode(true);
          return
        }, 5000);
      }
    },
    //拉去用户开团信息
    loadGroupShopForUser () {
      api.loadGroupShopForUser(this.groupShopInfoId, this.openGroupId).then(res => {
        console.log("开团信息---", res)
        if (res.errCode === 0) {
          setTimeout(() => {
            let shareObj = {
              title: "1元拼团",
              desc: "一起来抢劫老板啰...",
              link: `${this.shareUrl}k98/oneYuan?visitType=11&groupShopInfoId=${this.groupShopInfoId}&openGroupId=${this.openGroupId}&openId=${this.userInfo.openid}`,
              imgUrl: `${this.groupShopInfo.oneYuanGroupShopInfo.image}`
            };
            util.setShareInfo(shareObj, 20, "groupShop", this.shareGetJifen);
          }, 1500);
          this.groupShopInfo = res.info
          let joinGroupOpenIds = this.groupShopInfo.joinGroupShopInfo ? this.groupShopInfo.joinGroupShopInfo.openId.openId : []
          if (joinGroupOpenIds.indexOf(this.userInfo.openid) > -1) {
            this.isJoinGroup = true
          }
          if (this.groupShopInfo.joinGroupShopInfo) {
            this.time = this.groupShopInfo.joinGroupShopInfo.interval * 1000 - new Date().getTime()
            if (this.time <= 0) {
              this.time = 0
            }
            console.log("time---", this.time)
          }
        }
      })
    },
    countDownFinish () {
      console.log("over")
    },
    ...mapMutations({
      changeQrCodeText: "CHANGEQRCODETEXT",
      showQrcode: "SHOW_QRCODE",
    }),
  },
  components: {
    CountDown,
    topUp,
    myHeader
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/less/variable.less';
.oneYuan-wrapper {
  height: 100%;
  .header {
    .back {
      width: 0.32rem;
      height: 0.5333rem;
      float: left;
      margin-left: 0.2rem;
      margin-top: 0.3rem;
      margin-bottom: 0.1rem;
    }
    .home {
      float: right;
      width: 0.6rem;
      height: 0.6rem;
      margin-right: 0.2rem;
      margin-top: 0.3rem;
      margin-bottom: 0.1rem;
    }
  }
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    img {
      width: 100px;
      height: 100px;
      position: fixed;
      right: 0;
    }
    .shareText {
      font-size: 0.7rem;
      color: #fff;
      position: fixed;
      top: 110px;
      right: 0;
    }
  }
  .no-open {
    .oneYuan-pic {
      height: 5.5rem;
      text-align: center;
      box-sizing: border-box;
      padding: 0 0.5rem;
      background: #fff;
      .pic {
        width: 100%;
        height: 4.5rem;
      }
    }
    .oneYuan-header {
      display: flex;
      height: 1.6rem;
      .oneYuan-header-left {
        padding-left: 0.5rem;
        background-image: url('../../../assets/image/oneYuan_bg.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        width: 70%;
        color: #fff;
        font-weight: 800;
        position: relative;
        .oneYuan-price {
          font-size: 0.6667rem;
        }
        .oneYuan-member {
          display: inline-block;
          background-color: #0082fb;
          padding: 0.03rem;
          box-sizing: border-box;
          border-radius: 0.1333rem;
          .text {
            margin-left: 0.06rem;
            border-radius: 0.1rem;
            background-color: #ffdc18;
            color: #0082fb;
          }
        }
        .OneIntergal {
          position: absolute;
          right: 1rem;
          bottom: 0.2rem;
          font-size: 16px;
        }
      }
      .oneYuan-header-right {
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        background: #fff0af;
        .time-desc {
          font-size: 0.3rem;
        }
        .time-count {
          .no-openGroupTips {
            width: 100%;
            text-align: center;
            color: #ee0a24;
            font-weight: 800;
          }
          .colon {
            display: inline-block;
            // margin: 0 2px;
            color: #ee0a24;
          }
          .block {
            display: inline-block;
            width: 0.4rem;
            color: #fff;
            font-size: 12px;
            text-align: center;
            background-color: #ee0a24;
          }
        }
      }
    }
  }
  .opened {
    width: 100%;
    .oneYuan-opened-desc {
      width: 100%;
      text-align: center;
      padding-top: 1rem;
      .oneYuan-opened-tips {
        font-size: 0.7rem;
        color: #ee0a24;
        .gou {
          vertical-align: middle;
          margin-right: 0.1333rem;
          margin-bottom: 0.1rem;
          width: 0.6667rem;
          height: 0.6667rem;
        }
      }
      .oneYuan-opened-text {
        font-size: 0.5rem;
        margin: 0.4667rem 0;
      }
      .oneYuan-opened-countdown {
        font-size: 0.4rem;
        text-align: center;
      }
      .oneYuan-opened-headImgUrlList {
        margin: 0.466rem 0 1.3rem 0;
        .list {
          padding: 0 2rem;
          display: flex;
          justify-content: space-around;
          .item {
            border: 1px solid #fff001;
            width: 1rem;
            height: 1rem;
            text-align: center;
            line-height: 1rem;
            border-radius: 50%;
            color: #fff001;
            font-size: 0.5rem;
            font-weight: 900;
            .avatar {
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
            }
          }
        }
      }
    }
    .oneYuan-opened-groupShopInfo {
      margin: 0.6rem 0;
      display: flex;
      justify-content: space-around;
      .left-info {
        .pic {
          width: 4rem;
          height: 3rem;
        }
      }
      .right-info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 5rem;
        .title {
          font-weight: 800;
          color: #333;
          font-size: 0.37rem;
        }
        .content {
          color: #9d9b9b;
          margin-top: 0.1rem;
          font-weight: 600;
          font-size: 0.32rem;
        }
      }
    }
  }
  .oneYuan-content,
  .oneYuan-rule {
    box-sizing: border-box;
    margin-bottom: 0.1333rem;
    padding: 0.5rem 0.4rem;
    background: #fff;
    .title {
      font-weight: 800;
      color: #333;
      font-size: 0.4rem;
    }
    .content {
      color: #9d9b9b;
      margin-top: 0.2rem;
      font-weight: 600;
      font-size: 0.35rem;
    }
  }
  .line {
    height: 4px;
    background: #ccc;
  }
  .oneYuan-rule {
    box-sizing: border-box;
    flex: 1;
    margin-bottom: 0;
    .oneYuan-btn {
      display: block;
      margin: 0.7rem auto;
      border: none;
      letter-spacing: 2px;
      padding: 0.3rem 0.6rem;
      background: #ffd800;
      color: #fff;
      font-size: 0.4rem;
      border-radius: 5px;
    }
  }
}
</style>
