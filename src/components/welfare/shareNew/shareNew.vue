<template>
  <div class="shareNew-wrapper" id="shareNew">
    <div class="shop-container" @click="goHome">
      <img class="logo" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524204213993&di=5f93ef923bb06785474b70621b7a9e42&imgtype=0&src=http%3A%2F%2Fimg.brandcn.com%2FEditor%2FImages%2F201309%2F2013091309383713424223871.jpg" alt="">
      <p class="bar_name">Lose Demon吧(迷失的恶魔魅力四射)</p>
    </div>
    <img src="../../../assets/image/shareLogo.jpg" alt="" class="sharePic">
    <ul class="discount-container">
      <li class="item">
        <div class="item-left">
          <p class="title">现金券</p>
        </div>
        <div class="item-right">
          <div class="discount-content">￥40</div>
          <div class="discount-limitCondition">满一百元使用</div>
        </div>
      </li>
      <li class="item">
        <div class="item-left">
          <p class="title">实物券</p>
        </div>
        <div class="item-right">
          <div class="discount-content">啤酒一打</div>
          <div class="discount-limitCondition">限周一至周五使用</div>
        </div>
      </li>
    </ul>
    <!-- 规则 -->
    <div class="rule-container">
      <h3 class="title">活动规则：</h3>
      <p class="desc">
        分享优惠券给好友后，您可以领取左侧的优惠券，您的好友将获得右侧优惠券。
      </p>
      <!-- <p class="time">活动时间：2018-08-12 至 2018-09-12</p> -->
    </div>
    <!-- 操作 -->
    <div class="handle-container">
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
      isShow_bg: false,
      // picUrl:"http://i1.bvimg.com/643118/5091c94a86646498.jpg"
    };
  },
  created() {
    let _url = window.location.href;
    if (util.isAndroid()) {
      let shareObj = {
        title: "搞活动啦",
        desc: "分享给好友，双方都可以获得豪礼",
        link: `http://llwant.test.qianz.com?/#/shareNew`,
        imgUrl: "http://i1.bvimg.com/643118/52096e914aafe486.jpg"
      };
      util._getJssdkInfo(shareObj, _url);
    } else {
      let shareObj = {
        title: "搞活动啦",
        desc: "分享给好友，双方都可以获得豪礼",
        link: this.shareUrl + "#/shareNew",
        imgUrl: "http://i1.bvimg.com/643118/52096e914aafe486.jpg"
      };
      util._getJssdkInfo(shareObj, this.shareUrl);
    }
  },
  computed: {
    ...mapState(["shareUrl"])
  },
  methods: {
    goHome() {
      this.$router.push({
        name: "home"
      });
    },
    back() {
      this.$router.push({
        name: "welfare"
      });
    },
    //   分享
    share() {
      this.isShow_bg = !this.isShow_bg;
    }
  },
  watch: {
    $route: function(newValue, oldValue) {
      console.log(oldValue);
      console.log(newValue);
    }
  },
  components: {}
};
</script>

<style scoped lang='less'>
@import "../../../assets/less/mixin.less";
.shareNew-wrapper {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: #ff5c01;
  padding-bottom: 1.3333rem;
  position: relative;
  .shop-container {
    position: absolute;
    display: flex;
    top: 0.6667rem;
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
  .sharePic {
    width: 100%;
    box-shadow: 0 0.0533rem 0.3667rem 0.0533rem #ff9a0a;
  }
  .discount-container {
    padding: 0 0.2667rem;
    display: flex;
    justify-content: space-between;
    margin-top: 0.4rem;
    box-sizing: border-box;
    .item {
      display: flex;
      width: 4.6133rem;
      height: 2.24rem;
      .bg("../../assets/image/discountItem.png");
      .item-left {
        padding: 0.2667rem 0.3333rem;
        .title {
          width: 0.4rem;
          font-size: 0.4267rem;
          word-wrap: break-word;
          color: #d23100;
          font-weight: bold;
        }
      }
      .item-right {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0.2667rem 0;
        margin-left: 0.2667rem;
        .discount-content {
          font-size: 0.6133rem;
          font-weight: bold;
          color: #fff;
        }
        .discount-limitCondition {
          font-size: 0.3467rem;
          color: #fff;
        }
      }
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
    margin-top: 0.333rem;
    display: flex;
    justify-content: space-around;
    .btn {
      width: 4.3733rem;
      height: 1.4133rem;
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
