<template>
  <div class="oneYuan-wrapper" v-if="groupShopInfo">
     <div class="bg" v-show="isShow_bg" @click="isShow_bg=false" >
        <img onclick="return false" src="../../../assets/image/share.png" alt />
        <p class="shareText">点击“...”分享好友,一起拼团</p>
    </div>
    <div class="no-open" v-if="!groupShopInfo.joinGroupShopInfo">
      <div class="oneYuan-pic">
        <img :src="groupShopInfo.oneYuanGroupShopInfo.image" class="pic" alt="团购图案">
      </div>
      <div class="oneYuan-header">
        <div class="oneYuan-header-left">
          <div class="oneYuan-price">拼团价：￥1.00</div>
          <p class="oneYuan-member">3<span class="text">人拼</span></p>
        </div>
        <div class="oneYuan-header-right">
          <p class="time-desc">距结束还剩</p>
          <div class="time-count">
            <p v-if="!groupShopInfo.isJoinGroupShop" class="no-openGroupTips">暂未开团</p>
            <CountDown v-else style="color:red"  @finish="countDownFinish" :time="time">
              <template #default="timeData" format="DD 天 HH:mm:ss">
                <span class="block">{{ timeData.days }}</span>
                <span class="colon">天</span>
                <span class="block">{{ timeData.hours }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.minutes<10?'0'+timeData.minutes: timeData.minutes}}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.seconds<10?'0'+timeData.seconds:timeData.seconds }}</span>
              </template>
            </CountDown>
          </div>
        </div>
      </div>
      <div class="oneYuan-content">
        <h3 class="title">团购项目名称：{{groupShopInfo.oneYuanGroupShopInfo.name}}</h3>
        <p class="content">项目描述：{{groupShopInfo.oneYuanGroupShopInfo.subtopic}}</p>
        <p class="content">限制条件：{{groupShopInfo.oneYuanGroupShopInfo.limit}}</p>
        <p class="content">原价：{{groupShopInfo.oneYuanGroupShopInfo.originPrice}}</p>
        <p class="content">团购价格：{{groupShopInfo.oneYuanGroupShopInfo.groupShoppingPrice}}</p>
      </div>
    </div>
    <div class="opened" v-else>
      <div class="oneYuan-opened-desc">
        <p class="oneYuan-opened-tips" >
          <img src="../../../assets/image/gou.png" class="gou" alt="">
          <span v-if="groupShopInfo.isJoinGroupShop===true && groupShopInfo.joinGroupShopInfo.status">参团成功啦！</span> 
          <span v-else-if="groupShopInfo.joinGroupShopInfo?groupShopInfo.joinGroupShopInfo.status===false:false">很抱歉</span> 
          <span v-else-if="groupShopInfo.isJoinGroupShop===false">好友已参团</span> 
        </p>
        <p class="oneYuan-opened-text">
          还差<span style="color: #ee0a24">{{3-groupShopInfo.joinGroupShopInfo.headImgUrls.headImgUrls.length}}人</span>，
          <span v-if="groupShopInfo.isJoinGroupShop===true && groupShopInfo.joinGroupShopInfo.status">赶紧邀请好友来参团吧</span> 
          <span v-else-if="groupShopInfo.joinGroupShopInfo?groupShopInfo.joinGroupShopInfo.status===false:false">该团购活动已成团或已过期</span> 
          <span v-else-if="groupShopInfo.isJoinGroupShop===false">就差你啦</span> 
        </p>
        <div class="oneYuan-opened-countdown">
          <span>距结束还剩：</span>
           <CountDown  style="display:inline-block;color:red"  @finish="countDownFinish" :time="time">
              <template #default="timeData" format="DD 天 HH:mm:ss">
                <span class="block">{{ timeData.days }}</span>
                <span class="colon">天</span>
                <span class="block">{{ timeData.hours }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.minutes<10?'0'+timeData.minutes: timeData.minutes }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.seconds<10?'0'+timeData.seconds:timeData.seconds }}</span>
              </template>
            </CountDown>
        </div>
        <div class="oneYuan-opened-headImgUrlList">
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
          <h3 class="title">团购项目：{{groupShopInfo.oneYuanGroupShopInfo.name}}</h3>
          <p class="content">团购描述：{{groupShopInfo.oneYuanGroupShopInfo.subtopic}}</p>
          <p class="content">限制条件：{{groupShopInfo.oneYuanGroupShopInfo.limit}}</p>
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
      <button v-if="groupShopInfo.isJoinGroupShop === true && groupShopInfo.joinGroupShopInfo.status " class="oneYuan-btn" @click="isShow_bg=true">分享好友,邀请TA拼团</button>
      <button @click="openGroupShopping(groupShopInfo.joinGroupShopInfo?groupShopInfo.joinGroupShopInfo.status:false)" v-else-if="groupShopInfo.joinGroupShopInfo?groupShopInfo.joinGroupShopInfo.status===false:false" class="oneYuan-btn">我要开团(支付100积分预订团购指标)</button>
      <button @click="openGroupShopping(groupShopInfo.joinGroupShopInfo?groupShopInfo.joinGroupShopInfo.status:false)" v-else-if="groupShopInfo.isJoinGroupShop === false" class="oneYuan-btn">
        {{groupShopInfo.joinGroupShopInfo?'一键参团(支付100积分预订团购指标)':'一键开团(支付100积分预订团购指标)'}}
      </button>
    </div>
    <topUp v-if="showGroupShopRes" @closeIntegralPanel="closeIntegralPanel" :fatherPanelIndex="fatherPanelIndex"></topUp>
  </div>
</template>
<script>
import topUp from "base/topUp/topUp";
import { CountDown } from 'vant';
import {mapState} from 'vuex'
import util from "common/util";
import api from "common/api";
export default {
  data(){
    return {
      fatherPanelIndex:7,
      showGroupShopRes:false,
      isShow_bg:false,
      time:0,
      groupShopInfoId:"",
      groupShopInfo:null,
      openGroupId:"",
      tempPic: require("../../../assets/image/divide_add_avatar.png"),
    }
  },
  mounted(){
    // let friendId = util.GetQueryString("friendId")
    // this.friendId = friendId?friendId:this.userInfo.openid
    let shareGroupShopId = util.GetQueryString("groupShopInfoId")
    let shareOpenGroupId= util.GetQueryString("openGroupId")
    this.groupShopInfoId = shareGroupShopId ? shareGroupShopId : this.$route.query.groupShopInfoId
    this.openGroupId = shareOpenGroupId ? shareOpenGroupId : this.$route.query.openGroupId
    this.loadGroupShopForUser()
  },
  computed:{
     ...mapState(["userInfo","shareUrl"])
  },
  methods:{
    //监听提示面板板状态
    closeIntegralPanel(flag) {
        this.showGroupShopRes = flag;
    },
    //开团
    openGroupShopping(flag){
      if(this.groupShopInfo.joinGroupShopInfo && flag){ //已开团，则参团
        api.joinGroupShopping(this.groupShopInfo.joinGroupShopInfo.id,this.groupShopInfoId).then(res=>{
          console.log("参团结果---",res)
          if (res.errCode===0){
            this.loadGroupShopForUser()
          }else if(res.errCode===1029){
            this.fatherPanelIndex = 7;
            this.showGroupShopRes = true
          }else if(res.errCode===1096){
            this.fatherPanelIndex = 8
            this.showGroupShopRes = true
            this.loadGroupShopForUser()
          }
        })
      }else{//未开团, 则开团
        api.openGroupShopping(this.groupShopInfoId).then(res=>{
          console.log("开团结果=",res)
          if (res.errCode===0){
            this.openGroupId = res.info.id
            console.log("this.openGroupId----",this.openGroupId)
            this.loadGroupShopForUser()
          }else if(res.errCode===1029){
            this.fatherPanelIndex = 7;
            this.showGroupShopRes = true
          }
        })
      }
    },
    //拉去用户开团信息
    loadGroupShopForUser(){
      api.loadGroupShopForUser(this.groupShopInfoId,this.openGroupId).then(res=>{
        console.log("开团信息---",res)
        if (res.errCode===0){
          setTimeout(() => {
            let shareObj = {
              title: "1元拼团",
              desc: "一起来抢劫老板啰...",
              link: `${this.shareUrl}k98/oneYuan?groupShopInfoId=${this.groupShopInfoId}&openGroupId=${this.openGroupId}`,
              imgUrl: `${this.groupShopInfo.oneYuanGroupShopInfo.image}`
            };
            util.setShareInfo(shareObj, 20, "groupShop", this.shareGetJifen);
          }, 1000);
          this.groupShopInfo = res.info
          if(this.groupShopInfo.joinGroupShopInfo){
            this.time = this.groupShopInfo.joinGroupShopInfo.interval*1000-new Date().getTime()
            if(this.time<=0){
              this.time = 0
            }
          }
        }
      })
    },
    countDownFinish(){
      console.log("over")
    }
  },
  components:{
    CountDown,
    topUp
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/variable.less";
.oneYuan-wrapper{
  height: 100%;
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
  .no-open{
    .oneYuan-pic{
      height: 5.5rem;
      text-align: center;
      box-sizing: border-box;
      padding: 0 .5rem;
      background: #fff;
      .pic{
        width: 100%;
        height: 100%;
      }
    }
    .oneYuan-header{
      display: flex;
      height: 1.6rem;
      .oneYuan-header-left{
        padding-left: .5rem;
        background-image: url('../../../assets/image/oneYuan_bg.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        width: 70%;
        color: #fff;
        font-weight: 800;
        .oneYuan-price{
          font-size: .6667rem;
        }
        .oneYuan-member{
          display: inline-block;
          background-color: #0082FB;
          padding: .03rem;
          box-sizing: border-box;
          border-radius: 0.1333rem;
          .text{
            margin-left: .06rem;
            border-radius: .1rem;
            background-color: #FFDC18;
            color: #0082FB;
          }
        }
      }
      .oneYuan-header-right{
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        background: #FFF0AF;
        .time-desc{
          font-size: .3rem;
        }
        .time-count{
          .no-openGroupTips{
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
  .opened{
    width: 100%;
    .oneYuan-opened-desc{
      width: 100%;
      text-align: center;
      margin-top: 1rem;
      .oneYuan-opened-tips{
        font-size: .7rem;
        color: #ee0a24;
        .gou{
          vertical-align:middle;
          margin-right: 0.1333rem;
          margin-bottom: .1rem;
          width: 0.6667rem;
          height: 0.6667rem;
        }
      }
      .oneYuan-opened-text{
        font-size: .5rem;
        margin: 0.4667rem 0;
      }
      .oneYuan-opened-countdown{
        font-size: 0.4rem;
        text-align: center;
      }
      .oneYuan-opened-headImgUrlList{
        margin: .466rem 0 1.3rem 0 ;
        .list{
          padding: 0 2rem;
          display: flex;
          justify-content: space-around;
          .item{
            border: 1px solid #FFF001;
            width: 1rem;
            height: 1rem;
            text-align: center;
            line-height: 1rem;
            border-radius: 50%;
            color: #FFF001;
            font-size: .5rem;
            font-weight: 900;
            .avatar{
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
            }
          }
        }
      }
    }
    .oneYuan-opened-groupShopInfo{
      margin: 0.6rem 0;
      display: flex;
      justify-content: space-around;
      .left-info{
        .pic{
          width: 5rem;
          height: 3rem;
        }
      }
      .right-info{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .title{
           font-weight: 800;
            color: #333;
            font-size: 0.4rem;
        }
        .content{
          color: #9D9B9B;
          margin-top: 0.2rem;
          font-weight: 600;
          font-size: .35rem;
        }
      }
    }
  }
  .oneYuan-content,.oneYuan-rule{
    box-sizing: border-box;
    margin-bottom: 0.1333rem;
    padding: .5rem .4rem;
    background: #fff;
    .title{
      font-weight: 800;
      color: #333;
      font-size: 0.4rem;
    }
    .content{
      color: #9D9B9B;
      margin-top: 0.2rem;
      font-weight: 600;
      font-size: .35rem;
    }
  }
  .line{
    height: 4px;
    background: #ccc;
  }
  .oneYuan-rule{
    box-sizing: border-box;
    flex: 1;
    margin-bottom: 0;
    .oneYuan-btn{
      display: block;
      margin: .7rem auto;
      border: none;
      letter-spacing: 2px;
      padding:.3rem .6rem;
      background: #FFD800;
      color: #fff;
      font-size: 0.4rem;
      border-radius: 5px;
    }
  }
}
</style>