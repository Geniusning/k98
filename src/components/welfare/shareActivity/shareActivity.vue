<template>
  <div class="shareActivity-wrapper">
    <div class="logo-container">
      <img onclick="return false" class="logoPic" :src="activityContent.bgImage" alt="">
      <div class="shop-container" @click="goHome">
        <img onclick="return false" class="logo" :src="shopSettingInfo.image" alt="">
        <p class="bar_name">{{shopSettingInfo.name}}</p>
      </div>
    </div>
    <div class="rule-container">
      <p class="theme">活动主题：{{activityContent.name}}</p>
      <h3 class="title">活动细则：</h3>
      <p class="desc">{{activityContent.content}}</p>
      <p class="limit">限制条件：{{activityContent.limit}}</p>
      <p class="time">活动时间：{{activityContent.startTime}} 至 {{activityContent.endTime}}</p>
    </div>
    <div class="btn-container">
      <img onclick="return false" @click="back" class="btn" src="../../../assets/image/tuichu.png" alt="">
      <img onclick="return false" @click="share" class="btn" src="../../../assets/image/fenxiang.png" alt="">
    </div>
    <div class="bg" v-show="isShow_bg" @click="share">
      <img onclick="return false" src="../../../assets/image/share.png" alt="">
      <p class="shareText">点击“...”分享好友</p>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import util from "common/util";
  import api from 'common/api';
  import Config from "common/config";
  import {
    mapState,
    mapMutations
  } from "vuex";
  export default {
    data() {
      return {
        isShow_bg: false,
        activityID: "",
        activityContent: "",
        toHomeFlag:false,
      };
    },
    created() {
      var _url = window.location.href;
      this.myShareUrl = _url.split('#')[0];
      this.activityID = this.$route.params.id;
      if (_url.indexOf('activityID') > 0) { //判断是系统本身进入当前页面的还是从分享链接进入本页面
        this.activityID = _url.split('activityID=')[1];
      }
      if (util.isAndroid()) {
        let shareObj = {
          title: "活动通知",
          desc: "本店最新活动，会员特权。点击查看",
          link: `${this.shareUrl}k98/shareActivity?activityID=${this.activityID}&visitType=5&phone=${this.userInfo.phone}&role=${this.userInfo.role}`,
          imgUrl: `${this.shopSettingInfo.image}`
        };
        util._getJssdkInfo(shareObj, this.myShareUrl, 20,"activity",this.shareGetJifen);
      } else {
        let shareObj = {
          title: "活动通知",
          desc: "本店最新活动，会员特权。点击查看",
          link: `${this.shareUrl}k98/shareActivity?activityID=${this.activityID}&visitType=5&phone=${this.userInfo.phone}&role=${this.userInfo.role}`,
          imgUrl: `${this.shopSettingInfo.image}`
        };
        util._getJssdkInfo(shareObj, this.myShareUrl, 20,"activity",this.shareGetJifen);
      }
    },
     beforeRouteEnter(to, from, next) {
      console.log("路由判断to---------------",to)
      console.log("路由判断from---------------",from)
      if(from.name==="message" || from.name==="welfare"){
        next(vm=>{
        vm.toHomeFlag = true
        })
      }
      next()
    },
    mounted() {
      this._loadActivityDetail();
    },
    computed: {
      ...mapState(["socket", "shareUrl", "activityNoticeList", "shopSettingInfo", "baseUrl","userInfo"])
    },
    methods: {
      //分享获得积分
      shareGetJifen(amount,shareType) {
        api.shareToGetIntegral(amount,shareType).then(res => {
          if (res.errCode == 1030) {
            alert('分享已上限，每天最多分享2次获得积分');
          }
        })
      },
      //加载活动详情
      _loadActivityDetail() {
        api.loadActivityDetail(this.activityID).then(res => {
          console.log('活动详情-----------------------', res);
          this.activityContent = res;
        })
      },
      goHome() {
        this.$router.push({
          name: "home"
        });
      },
      back() {
        if(this.toHomeFlag){
          this.$router.go(-1)
        }else{
          this.$router.push({
            name: "home"
          });
        }
      },
      share() {
        this.isShow_bg = !this.isShow_bg;
      },
    },
    components: {}
  };
</script>

<style scoped lang='less'>
  @import "../../../assets/less/mixin.less";
  .shareActivity-wrapper {
    height: 100%;
    padding: 0 0.3467rem;
    box-sizing: border-box;
    overflow-y: auto;
    .bg("../../assets/image/activity_bg.png");
    background-color: #ff5c01;
    .logo-container {
      box-sizing: border-box;
      padding-top: 0.2667rem;
      position: relative;
      .shop-container {
        position: absolute;
        display: flex;
        top: 0.6667rem;
        left: 0.2667rem;
        background-color: rgba(0, 0, 0, 0.1);
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
          font-family: "PingFang-SC-Regular";
          font-size: 14px;
          font-weight: bold;
        }
      }
      .logoPic {
        width: 9.4667rem;
        height: 5.3333rem;
      }
    }
    .rule-container {
      margin-top: 0.9867rem;
      font-size: 0.3467rem;
      color: #fff;
      .title {
        font-size: 0.3733rem;
        font-weight: bold;
      }
      .desc {
        margin-bottom: 0.4rem;
      }
      .limit {
        margin: 0.4rem 0;
      }
      .theme {
        margin-bottom: 0.4rem;
      }
      .time {
        margin-top: 0.4rem;
        margin-bottom: 1.28rem;
      }
    }
    .btn-container {
      display: flex;
      justify-content: space-around;
      .btn {
        width: 4rem;
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
  }
</style>
