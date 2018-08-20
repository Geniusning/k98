<template>
    <div class="shareActivity-wrapper">
        <div class="logo-container">
            <img class="logoPic" src="../../../assets/image/logo_activity.png" alt="">
            <div class="shop-container" @click="goHome">
               <img class="logo" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524204213993&di=5f93ef923bb06785474b70621b7a9e42&imgtype=0&src=http%3A%2F%2Fimg.brandcn.com%2FEditor%2FImages%2F201309%2F2013091309383713424223871.jpg" alt="">
               <p class="bar_name">Lose Demon吧(迷失的恶魔魅力四射)</p>
            </div>
        </div>
        <div class="rule-container">
            <h3 class="title">活动细则：</h3>
            <p class="desc">天天向上的主持人今晚8点驻唱，欢迎大家前来围观支持~ 现场将有签名活动</p>
            <p class="limit">限制条件：未满十八岁未成年须在成人带领下进入</p>
            <p class="time">活动时间：2018-08-12 至 2018-09-12</p>
        </div>
        <div class="btn-container">
            <img @click="back" class="btn" src="../../../assets/image/tuichu.png" alt="">
            <img @click="share" class="btn" src="../../../assets/image/fenxiang.png" alt="">
        </div>
        <div class="bg" v-show="isShow_bg" @click="share">
            <img src="../../../assets/image/share.png" alt="">
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
import util from "common/util";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isShow_bg: false
    };
  },
  created() {
    let _url = window.location.href;
    if (util.isAndroid()) {
      let shareObj = {
        title: "搞活动啦",
        desc: "今天店里举行派对喽，快来参加",
        link: `http://llwant.test.qianz.com?/#/shareActivity`,
        imgUrl: "http://i2.bvimg.com/643118/36347406d1739907.png"
      };
      util._getJssdkInfo(shareObj, _url);
    } else {
      let shareObj = {
        title: "搞活动啦",
        desc: "今天店里举行派对喽，快来参加",
        link: this.shareUrl + "#/shareActivity",
        imgUrl: "http://i2.bvimg.com/643118/36347406d1739907.png"
      };
      util._getJssdkInfo(shareObj, this.shareUrl);
    }
  },
  computed: {
    ...mapState(["shareUrl"])
  },
  methods: {
    goHome(){
       this.$router.push({
        name: "home"
      });
    },
    back() {
      this.$router.push({
        name: "welfare"
      });
    },
    share() {
      this.isShow_bg = !this.isShow_bg;
    }
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
  .logo-container {
    box-sizing: border-box;
    padding-top: 0.2667rem;
    position: relative;
    .shop-container {
      position: absolute;
      display: flex;
      top:0.6667rem;
      left: 0.2667rem;
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
      margin: 0.4rem 0;
    }
    .limit {
    }
    .time {
      margin-top: 0.4rem;
      margin-bottom: 1.28rem;
    }
  }
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    img {
      width: 100px;
      height: 100px;
      position: absolute;
      right: 0;
    }
  }
}
</style>
