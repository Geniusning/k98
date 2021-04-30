<template>
  <div class="oneYuan-wrapper" v-if="groupBookAward">
    <div class="header">
      <img @click="goBack" class="back" src="../../../assets/image/back_chat.png" alt="">
      <img @click="goHome" class="home" src="../../../assets/image/chat_home.png" alt="">
    </div>
    <div class="bg" v-show="isShow_bg" @click="isShow_bg=false">
      <img onclick="return false" src="../../../assets/image/share.png" alt />
      <p class="shareText">点击“...”分享好友,一起拼团</p>
    </div>
    <div class="no-open" v-if="!groupBookAward.joinGroupBookAwardInfo">
      <div class="oneYuan-pic">
        <img :src="groupBookAward.groupBookAwardInfo.image" class="pic" alt="团购图案">
      </div>
      <div class="oneYuan-header">
        <div class="oneYuan-header-left">
          <div class="oneYuan-price">团购价：{{groupBookAward.groupBookAwardInfo.groupShoppingPrice}}积分</div>
          <p class="oneYuan-member">{{groupBookAward.groupBookAwardInfo.personNums}}<span class="text">人拼</span></p>
        </div>
        <div class="oneYuan-header-right">
          <p class="time-desc">距结束还剩</p>
          <div class="time-count">
            <p v-if="!groupBookAward.isJoining" class="no-openGroupTips">暂未开团</p>
            <CountDown v-else style="color:red" @finish="countDownFinish" :time="isCountingDownTime">
              <template #default="timeData" format="DD 天 HH:mm:ss">
                <span class="block">{{ timeData.days }}</span>
                <span class="colon">天</span>
                <span class="block">{{ timeData.hours }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.minutes<10?'0'+timeData.minutes: timeData.minutes}}</span> <span class="colon">:</span>
                <span class="block">{{ timeData.seconds<10?'0'+timeData.seconds:timeData.seconds }}</span> </template> </CountDown> </div> </div> </div> <div class="oneYuan-content">
                    <h3 class="title">团购项目名称：{{groupBookAward.groupBookAwardInfo.name}}</h3>
                    <p class="content">项目描述：{{groupBookAward.groupBookAwardInfo.subtopic}}</p>
                    <p class="content">限制条件：{{groupBookAward.groupBookAwardInfo.limit}}</p>
                    <p class="content">原价：{{groupBookAward.groupBookAwardInfo.originPrice}}元</p>
                    <!-- <p class="content">团购价格：{{groupBookAward.groupBookAwardInfo.groupShoppingPrice}}</p> -->
          </div>
          <p class="line"></p>
          <div class="oneYuan-noOpen-groupShopInfo">
            <div class="left-info">
              <img :src="groupBookAward.groupBookAwardInfo.awardImage" class="pic" alt="">
            </div>
            <div class="right-info">
              <img src="../../../assets/image/11.png" class="award-icon" alt="">
              <h3 class="title">奖品：{{groupBookAward.groupBookAwardInfo.awardName}}</h3>
              <p class="content">说明：{{groupBookAward.groupBookAwardInfo.awardIntro}}</p>
              <!-- <p class="content">条件：{{groupBookAward.groupBookAwardInfo.awardLimit}}</p> -->
              <!-- <p class="content">原价：{{groupBookAward.groupBookAwardInfo.originPrice}}</p>
                    <p class="content">团购价格：{{groupBookAward.groupBookAwardInfo.groupShoppingPrice}}</p> -->
            </div>
          </div>
        </div>
        <div class="opened" v-else>
          <div class="oneYuan-opened-desc">
            <div v-if="isCountingDownTime===0">
              <p class="oneYuan-opened-tips">
                <img src="../../../assets/image/gou.png" class="gou" alt="">
                <span>很抱歉</span>
              </p>
              <p class="oneYuan-opened-text">
                还差<span style="color: #ee0a24">{{groupBookAward.joinGroupBookAwardInfo.personNums-groupBookAward.joinGroupBookAwardInfo.headImgUrls.headImgUrls.length}}人</span>，
                <span>该团购活动已成团或已过期</span>
              </p>
            </div>
            <div v-else>
              <p class="oneYuan-opened-tips">
                <img src="../../../assets/image/gou.png" class="gou" alt="">
                <span v-if="(groupBookAward.isJoining===true || isJoinGroup)">参团成功啦！</span>
                <span v-else-if="groupBookAward.joinGroupBookAwardInfo?groupBookAward.joinGroupBookAwardInfo.status===false:false">很抱歉</span>
                <span v-else-if="groupBookAward.isJoining===false">好友已参团</span>
              </p>
              <p class="oneYuan-opened-text">
                还差<span style="color: #ee0a24">{{groupBookAward.joinGroupBookAwardInfo.personNums-groupBookAward.joinGroupBookAwardInfo.headImgUrls.headImgUrls.length}}人</span>，
                <span v-if="groupBookAward.isJoining===true && groupBookAward.joinGroupBookAwardInfo.status">赶紧邀请好友来参团吧</span>
                <span v-else-if="groupBookAward.joinGroupBookAwardInfo?groupBookAward.joinGroupBookAwardInfo.status===false:false">该团购活动已成团或已过期</span>
                <span v-else-if="groupBookAward.isJoining===false">就差你啦</span>
              </p>
            </div>
            <div class="oneYuan-opened-countdown">
              <span>距结束还剩：</span>
              <CountDown style="display:inline-block;color:red" @finish="countDownFinish" :time="isCountingDownTime">
                <template #default="timeData" format="DD 天 HH:mm:ss">
                  <span class="block">{{ timeData.days }}</span>
                  <span class="colon">天</span>
                  <span class="block">{{ timeData.hours }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.minutes<10?'0'+timeData.minutes: timeData.minutes }}</span> <span class="colon">:</span>
                  <span class="block">{{ timeData.seconds<10?'0'+timeData.seconds:timeData.seconds }}</span> </template> </CountDown> </div> <div class="oneYuan-opened-headImgUrlList">
                      <ul class="list">
                        <li class="item" v-for="(img,index) in groupBookAward.joinGroupBookAwardInfo.headImgUrls.headImgUrls" :key="index">
                          <img class="avatar" :src="img?img:tempPic" alt="">
                        </li>
                        <li class="item" v-for="(item,index) in (groupBookAward.joinGroupBookAwardInfo.personNums-groupBookAward.joinGroupBookAwardInfo.headImgUrls.headImgUrls.length)>4
                        ?4
                        :groupBookAward.joinGroupBookAwardInfo.personNums-groupBookAward.joinGroupBookAwardInfo.headImgUrls.headImgUrls.length">
                          ?
                        </li>
                        <li class="item" style="border:none" v-if="groupBookAward.joinGroupBookAwardInfo.personNums-groupBookAward.joinGroupBookAwardInfo.headImgUrls.headImgUrls.length>6">
                          ...
                        </li>
                      </ul>
            </div>
          </div>
          <div class="oneYuan-opened-groupShopInfo">
            <div class="left-info">
              <img :src="groupBookAward.groupBookAwardInfo.image" class="pic" alt="">
            </div>
            <div class="right-info">
              <h3 class="title">团购：{{groupBookAward.groupBookAwardInfo.name}}</h3>
              <p class="content">描述：{{groupBookAward.groupBookAwardInfo.subtopic}}</p>
              <p class="content">条件：{{groupBookAward.groupBookAwardInfo.limit}}</p>
              <p class="content">原价：{{groupBookAward.groupBookAwardInfo.originPrice}}元</p>
              <p class="content">团购价格：{{groupBookAward.groupBookAwardInfo.groupShoppingPrice}}积分</p>
            </div>
          </div>
          <p class="line"></p>
          <div class="oneYuan-noOpen-groupShopInfo">
            <div class="left-info">
              <img :src="groupBookAward.groupBookAwardInfo.awardImage" class="pic" alt="">
            </div>
            <div class="right-info">
              <img src="../../../assets/image/11.png" class="award-icon" alt="">
              <h3 class="title">奖品：{{groupBookAward.groupBookAwardInfo.awardName}}</h3>
              <p class="content">说明：{{groupBookAward.groupBookAwardInfo.awardIntro}}</p>
              <!-- <p class="content">条件：{{groupBookAward.groupBookAwardInfo.awardLimit}}</p> -->
              <!-- <p class="content">原价：{{groupBookAward.groupBookAwardInfo.originPrice}}</p>
                    <p class="content">团购价格：{{groupBookAward.groupBookAwardInfo.groupShoppingPrice}}</p> -->
            </div>
          </div>
        </div>
        <p class="line"></p>
        <div class="oneYuan-rule">
          <h3 class="title">团购须知：</h3>
          <p class="content">1、本团<span style="color:red">{{groupBookAward.groupBookAwardInfo.personNums}}人</span>成团，成团后团购券自动存入各人卡券包</p>
          <p class="content">2、本团期限2天，不成团不扣积分</p>
          <p class="content">3、成团后，凭券按团购价到店换商品或奖品</p>
          <p style="color: red;" class="content">4、奖品只有一份，随机抽取一位幸运儿，存入其卡券包</p>
          <div v-if="isCountingDownTime">
            <button v-if="groupBookAward.isJoining === true && groupBookAward.joinGroupBookAwardInfo.status " class="oneYuan-btn" @click="isShow_bg=true">分享好友,邀请TA拼团</button>
            <div class="btn-wrapper" v-else-if="groupBookAward.joinGroupBookAwardInfo?groupBookAward.joinGroupBookAwardInfo.status===false:false">
              <button @click="isShowDialog=true" class="oneYuan-btn">我要开团</button>
              <button class="oneYuan-btn" @click="goToAllGroupBook">查看已开的团</button>
            </div>
            <!-- openGroupBookAward(groupBookAward.joinGroupBookAwardInfo?groupBookAward.joinGroupBookAwardInfo.status:false) -->
            <button @click="isShowDialog=true" v-else-if="groupBookAward.isJoining === false" class="oneYuan-btn">
              {{groupBookAward.joinGroupBookAwardInfo?'一键参团':'一键开团'}}
            </button>
          </div>
          <div v-else class="btn-wrapper">
            <!-- openGroupBookAward(false) -->
            <button @click="isShowDialog=true" class="oneYuan-btn">
              一键开团
            </button>
            <button class="oneYuan-btn" @click="goToAllGroupBook">查看已开的团</button>
          </div>
        </div>
        <handleEnvelope v-show="isShowDialog">
          <template slot="header">
            <h1>拼团啦</h1>
          </template>
          <div class="groupBookAwardInfo-wrapper">
            <div class="left">
              <img :src="groupBookAward.groupBookAwardInfo.image" class="pic" alt="">
            </div>
            <div class="right">
              <p class="desc">{{groupBookAward.groupBookAwardInfo.name}}</p>
              <p class="desc">消耗积分:{{groupBookAward.groupBookAwardInfo.groupShoppingPrice}}</p>
            </div>
          </div>
          <template slot="footer">
            <div class="footer-wrapper">
              <button class="btn-left" @click="close">取消</button>
              <button class="btn-right" @click="openGroupBookAward(groupBookAward.joinGroupBookAwardInfo?groupBookAward.joinGroupBookAwardInfo.status:false)">确定</button>
            </div>
          </template>
        </handleEnvelope>
        <topUp v-if="showGroupShopRes" @closeIntegralPanel="closeIntegralPanel" :fatherPanelIndex="fatherPanelIndex"></topUp>
      </div>
</template>
<script>
import myHeader from "../../../base/myheader/myheader";
import topUp from "base/topUp/topUp";
import handleEnvelope from "base/handleEnvelope/handleEnvelope";
import { CountDown } from 'vant';
import { mapState, mapMutations } from 'vuex'
import util from "common/util";
import api from "common/api";
export default {
  data () {
    return {
      isShowDialog: false,//控制拼团确认框
      fatherPanelIndex: 7,
      showGroupShopRes: false,
      isShow_bg: false,
      isCountingDownTime: 0, //是否有倒计时
      isJoinGroup: false,
      groupBookAward: null,
      openGroupId: "",
      tempPic: require("../../../assets/image/divide_add_avatar.png"),
    }
  },
  mounted () {
    // util.addVisitRecord(this.$route.name);
    let shareGroupShopId = util.GetQueryString("groupBookAwardId")
    let shareOpenGroupId = util.GetQueryString("openGroupId")
    console.log("this.$route.query.groupBookAwardId=", this.$route)
    this.groupBookAwardId = shareGroupShopId ? shareGroupShopId : this.$route.query.groupBookAwardId
    this.openGroupId = shareOpenGroupId ? shareOpenGroupId : this.$route.query.openGroupId
    this.loadGroupBookAwardForUser()
  },
  destroyed () {
    clearTimeout(this.timerOfFocus)
  },
  computed: {
    ...mapState(["userInfo", "shareUrl"])
  },
  methods: {
    close () {
      this.isShowDialog = false
    },
    // //分享获得积分
    shareGetJifen (amount, shareType) {
      api.shareToGetIntegral(amount, shareType).then(res => {
        if (res.errCode == 1030) {
          alert("分享已上限，每天最多分享5次获得积分");
        }
      });
    },
    //查看全部开团列表
    goToAllGroupBook () {
      this.$router.push({
        name: "opened",
        params: {
          groupBookAwardId: this.groupBookAwardId
        }
      })
    },
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
    openGroupBookAward (flag) {
      try {
        if (this.groupBookAward.joinGroupBookAwardInfo && flag) { //已开团，则参团
          api.joinGroupBookAward(this.groupBookAward.joinGroupBookAwardInfo.id, this.groupBookAwardId).then(res => {
            console.log("参团结果---", res)
            if (res.errCode === 0) {
              this.loadGroupBookAwardForUser()
              this.timerOfFocus = setTimeout(() => {
                if (!this.userInfo.isSubscribe) {
                  this.changeQrCodeText({
                    title: "长按关注，以便成团通知及时送达您",
                    bottomText: "会员特权:领福利、交群友、参活动"
                  });
                  this.showQrcode(true);
                  this.isShowDialog = false
                }
              }, 7000);
            } else if (res.errCode === 1029) {
              this.fatherPanelIndex = 7;
              this.showGroupShopRes = true
            } else if (res.errCode === 1096) {
              this.fatherPanelIndex = 8
              this.showGroupShopRes = true
              this.loadGroupBookAwardForUser()
            }
          })
        } else {//未开团, 则开团
          api.openGroupBookAward(this.groupBookAwardId, this.groupBookAward.groupBookAwardInfo.personNums).then(res => {
            console.log("开团结果=", res)
            if (res.errCode === 0) {
              this.openGroupId = res.info.id
              console.log("this.openGroupId----", this.openGroupId)
              this.loadGroupBookAwardForUser()
              this.timerOfFocus = setTimeout(() => {
                if (!this.userInfo.isSubscribe) {
                  this.changeQrCodeText({
                    title: "长按关注，以便成团通知及时送达您",
                    bottomText: "会员特权:领福利、交群友、参活动"
                  });
                  this.showQrcode(true);
                  this.isShowDialog = false
                }
              }, 7000);
            } else if (res.errCode === 1029) {
              this.fatherPanelIndex = 7;
              this.showGroupShopRes = true
            }
          })
        }
        this.isShowDialog = false
      } catch (error) {
        console.log("error is = ", error)
      }

    },
    //拉去用户开团信息
    loadGroupBookAwardForUser () {
      api.loadGroupBookAwardForUser(this.groupBookAwardId, this.openGroupId).then(res => {
        console.log("开团信息---", res)
        if (res.errCode === 0) {
          setTimeout(() => {
            let shareObj = {
              title: "拼团",
              desc: "邀您一起拼团，还有幸运奖品哦",
              link: `${this.shareUrl}k98/pinTuan?visitType=11&groupBookAwardId=${this.groupBookAwardId}&openGroupId=${this.openGroupId}&openId=${this.userInfo.openid}`,
              imgUrl: `${this.groupBookAward.groupBookAwardInfo.image}`
            };
            util.setShareInfo(shareObj, 20, "groupShop", this.shareGetJifen);
          }, 500);
          this.groupBookAward = res.info
          let joinGroupOpenIds = this.groupBookAward.joinGroupBookAwardInfo ? this.groupBookAward.joinGroupBookAwardInfo.openId.openId : []
          if (joinGroupOpenIds.indexOf(this.userInfo.openid) > -1) {
            this.isJoinGroup = true
          }
          if (this.groupBookAward.joinGroupBookAwardInfo) {
            this.isCountingDownTime = this.groupBookAward.joinGroupBookAwardInfo.interval * 1000 - new Date().getTime()
            if (this.isCountingDownTime <= 0) {
              this.isCountingDownTime = 0
            }
          }
          console.log("time---", this.isCountingDownTime)
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
    myHeader,
    handleEnvelope
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
        margin: 0.466rem 0 0.6rem 0;
        .list {
          padding: 0 1rem;
          display: flex;
          justify-content: center;
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
            margin-left: 0.1rem;
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
      margin: 0.3rem 0.4rem;
      display: flex;
      justify-content: space-around;
      .left-info {
        .pic {
          width: 3.5rem;
          height: 2.5rem;
        }
      }
      .right-info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 5rem;
        .title {
          font-weight: 900;
          color: #333;
          font-size: 0.4rem;
        }
        .content {
          color: #9d9b9b;
          margin-top: 0.1rem;
          // font-weight: 600;
          font-size: 0.3rem;
        }
      }
    }
  }
  .oneYuan-noOpen-groupShopInfo {
    margin: 0.6rem 0.4rem;
    display: flex;
    justify-content: space-around;
    .left-info {
      .pic {
        width: 3.5rem;
        height: 2.5rem;
      }
    }
    .right-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 5rem;
      position: relative;
      .award-icon {
        position: absolute;
        top: -0.4rem;
        left: -0.8rem;
        width: 0.8rem;
        height: 0.8rem;
      }
      .title {
        font-weight: 900;
        color: #333;
        font-size: 0.4rem;
      }
      .content {
        color: #9d9b9b;
        margin-top: 0.2rem;
        // font-weight: 600;
        font-size: 0.3rem;
      }
    }
  }
  .oneYuan-content,
  .oneYuan-rule {
    box-sizing: border-box;
    margin-bottom: 0.1333rem;
    padding: 0.1rem 0.4rem;
    background: #fff;
    .title {
      font-weight: 800;
      color: #333;
      font-size: 0.4rem;
    }
    .content {
      color: #9d9b9b;
      margin-top: 0.1rem;
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
    .btn-wrapper {
      display: flex;
      justify-content: space-around;
    }
    .oneYuan-btn {
      display: block;
      margin: 0.7rem auto;
      border: none;
      letter-spacing: 2px;
      padding: 0.3rem 0.3rem;
      background: #ffd800;
      color: #fff;
      font-size: 0.4rem;
      border-radius: 5px;
    }
  }
  .groupBookAwardInfo-wrapper {
    display: flex;
    justify-content: center;
    height: 100%;
    padding: 0.1rem;
    .left {
      .pic {
        width: 2rem;
        // height: 1.4rem;
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
