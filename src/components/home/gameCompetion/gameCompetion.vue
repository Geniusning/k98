<template>
  <div id="gameCompetion" class="gameCompetion">
    <div class="title-wrapper">
      <h3 class="title">大话骰游戏规则介绍</h3>
      <img @click="showRuleBtn" src="../../../assets/image/Arrow.png" alt="">
      <img src="../../../assets/image/gameNoticeHome.png" alt="" @click="goBackHome" class="homeBtn">
    </div>
    <transition name="slideDown">
      <div v-show="isShowRule" class="mask">
        <div class="rule-wrapper">
          <div class="rule-main clearfix">
            <h3 class="ruleTitle">大话骰规则介绍</h3>
            <p>1）点击骰钟开始游戏</p>
            <p>2）轮到己方叫牌，必须叫比对方大的牌（点数比对方大或个数比对方大即可）。如对方叫三个四，自己就得叫三个四以上的，三个五、三个六均可，也可以叫四个几，四个一到四个六都可以叫。 自己首先叫牌可以任意叫。</p>
            <p>3）轮到自己叫牌时，可以选择继续叫牌，或者开牌。但如果是本局游戏的第一次叫牌则不可以开牌。</p>
            <p>4）在游戏中点数一既可代表一，也可代表骰钟里任意点数，但是只要有一方喊过一后那么一就只能为一，不能代表其他的点数。</p>
            <p>5）斋：叫点后，一点不能再当成任何点数；</p>
            <p>6）劈：叫‘劈’后，认输还是x1结算，开牌后输赢x2,对手，‘反劈’后，认输2倍结算，开牌后输赢x4结算，只能反劈一次。</p>
            <p>6）投降：对手劈你或反劈后，可选择投降，只输一半；</p>
            <p>7）只要叫牌方喊出的点数和个数小于双方实际骰钟的个数，则开牌方胜。</p>
            <p>8）比赛时间结束得出本轮比赛排行榜，前三名有丰富奖品</p>
          </div>
        </div>
        <div class="arrow-wrapper">
          <img @click="showRuleBtn" src="../../../assets/image/arrowUp.png" alt="" class="arrowUp">
        </div>
      </div>
    </transition>
    <div class="gameIntroduce-wrapper">
      <!-- 说明 -->
      <div class='introduce-wrapper'>
        <h3 class='title'>说明</h3>
        <ul class='introduceList' v-cloak>
          <li class='item'>游戏时间：{{playInformation.startTime}} ~ {{playInformation.endTime}}</li>
          <li class='item'>每人比赛局数：{{playInformation.maxRoundNumber}}局</li>
          <li class='item'>比赛人数：{{playInformation.maxNumberOfPlayer}}人</li>
        </ul>
      </div>
      <!-- 比赛奖品 -->
      <div class="prize-wrapper">
        <h3 class='title'>比赛奖品</h3>
        <ul class='prizeList'>
          <li class='item'>第一名：{{playInformation.firstPrize}}</li>
          <li class='item'>第二名：{{playInformation.secondPrize}}</li>
          <li class='item'>第三名：{{playInformation.thirdPrize}}</li>
        </ul>
      </div>
      <!-- 上期前三名玩家公布 -->
      <!-- <div class="lastPrizeResult-wrapper">
        <h3 class='title'>上期前三名玩家公布</h3>
        <ul class='lastPrizeResultList'>
          <li class='item' v-for="(item,index) in lastAwardUsers">
            <img :src="item.headURI" alt="" class="avatar">
            <div class="nameAndDesc clearfix">
              <span class='name fl'>{{item.nick}}</span>
              <p class='desc fl'>获得{{item.Prize.content}}</p>
            </div>
          </li>
        </ul>
      </div> -->
      <!-- Clocker -->
      <div class="clocker-wrapper">
        <h3 class="countDown" v-show="isLessThanPublickTime">暂无比赛</h3>
        <div v-if="countDown">
          <h3 class="countDown">倒计时</h3>
          <clocker @on-finish='onFinish' :time="clocktime"></clocker>
        </div>
      </div>
      <!-- 确定按钮 -->
      <div class="btn-wrapper">
        <img @click="play" src="../../../assets/image/jinruyouxi.png" alt="" v-if="isPlayStartBtn">
        <img src="../../../assets/image/noplay.png" alt="" v-else>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { Clocker } from "vux";
import Scroll from "base/scroll/scroll";
import api from "common/api";
import util from "common/util";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      isShowRule: false,
      isPlayStartBtn: true,
      isPlayStartText: false,
      isLessThanPublickTime: false,
      clocktime: "",
      countDown: false,
      playInformation: {},
      lastAwardUsers: [],
    };
  },
  computed:{
    ...mapState(['baseUrl'])
  },
  created() {
    // 拉取已经发布的比赛场
    this._loadPublishArenas();
  },
  methods: {
    //拉取已经发布的比赛场
    _loadPublishArenas() {
      //获取当前时间戳
      let nowTimeStamp = Number(Math.round(new Date().getTime() / 1000).toString());
      api.loadPublishArenas().then(res => {
        console.log('拉取已经发布的比赛场:', res)
        if (res.errCode === 0) {
          //判断是否
          if (res.lastAwardUsers.length) {
            this.lastAwardUsers = res.lastAwardUsers;//上一场比赛的前三名选手
            for (var i = 0; i < this.lastAwardUsers.length; i++) {
              switch (this.lastAwardUsers[i].Prize.type) {
                case 0:
                  this.lastAwardUsers[i].Prize.content = this.lastAwardUsers[i].Prize.value + "元代金券"
                  break;
                case 2:
                  this.lastAwardUsers[i].Prize.content = this.lastAwardUsers[i].Prize.value + "折扣券"
                  break
                default:
                  break;
              }
            }
          }
          //如果没有已发布的比赛则不显示
          if (!res.arenaInfos.length) {
            this.isPlayStartBtn = false;
            this.isPlayStartText = true;
            this.isLessThanPublickTime = true;
            return false;
          }
          let playInfo = res.arenaInfos.reverse()[0];//翻转数组，把时间靠前先开始
          this.isPlayStartBtn = nowTimeStamp < Number(playInfo.publishTime) ? false : true;
          this.playInformation['startTime'] = util.timestampToTime(playInfo.publishTime).slice(0, -3);
          this.playInformation['endTime'] = util.timestampToTime(playInfo.endTime).slice(0, -3);
          this.playInformation['maxNumberOfPlayer'] = playInfo.maxNumberOfPlayer;
          this.playInformation['maxRoundNumber'] = playInfo.maxRoundNumber;
          this.playInformation['maxRoundNumber'] = playInfo.maxRoundNumber;
          let prizeArr = ['firstPrize', 'secondPrize', 'thirdPrize']
          for (var i = 0; i < prizeArr.length; i++) {
            switch (playInfo[prizeArr[i]].type) {
              case 0:
                this.playInformation[`${prizeArr[i]}`] = playInfo[prizeArr[i]].value + "元代金券";
                break;
              case 1:
                this.playInformation[`${prizeArr[i]}`] = playInfo[prizeArr[i]].content;
                break;
              default:
                this.playInformation[`${prizeArr[i]}`] = playInfo[prizeArr[i]].value + "折";
                break;
            }
          }
          console.log(this.playInformation)
          this.arenaID = playInfo.arenaID;
          this.clocktime = util.timestampToTime(playInfo.publishTime).slice(0, -3);
          if (this.clocktime) {
            this.countDown = true;
          }
        }
      })
    },
    //倒计时结束
    onFinish() {
      this.isPlayStartBtn = true;
      this.countDown = !this.countDown;
    },
    //进入游戏
    play() {
      let token = this.getCookie("tk");
      // token ="fCfYmLWfDLlAFntkvBxAvyXKVBKjJMdaaf4epk8VJntPH1ViQTpfLkRqejJEz3nuraFmBw==";
      window.location.href = `${this.baseUrl}/game/?gamePath=game2&arenaID=${this.arenaID}`;
    },
    //获取cookie
    getCookie: function (cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) != -1) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    goBackHome() {
      this.$router.push({
        name: "home"
      });
    },
    showRuleBtn() {
      this.isShowRule = !this.isShowRule;
    }
  },
  components: {
    Scroll,
    Clocker
  }
};
</script>

<style scoped lang='less'>
@import "../../../assets/less/mixin.less";
@import "../../../assets/less/variable.less";
@import "../../../assets/less/gameCompetion.less";
.gameCompetion {
  height: 100%;
  background-image: url("../../../assets/image/game_bg.jpg");
  background-size: 100%;
  display: flex;
  flex-direction: column;
  .title-wrapper {
    position: relative;
    height: 1.5467rem;
    width: 100%;
    text-align: center;
    .homeBtn {
      width: 0.8rem;
      height: 0.8rem;
      position: absolute;
      top: 0.3333rem;
      right: 0.5333rem;
    }
    .title {
      width: 100%;
      text-align: center;
      font-size: 0.4533rem;
      color: #fff;
      padding: 0.1333rem 0 0.18rem;
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 0 0.5867rem;
    height: 100%;
    overflow: auto;
    .rule-wrapper {
      min-height: 100%;
      .rule-main {
        padding-top: 0.5rem;
        padding-bottom: 0.6667rem;
        .ruleTitle {
          width: 100%;
          text-align: center;
          font-size: 0.5533rem;
          color: #fff;
          font-weight: bold;
          margin-bottom: 0.5667rem;
        }
        p {
          color: #fff;
          font-size: 0.3867rem;
          margin-bottom: 0.2667rem;
        }
      }
    }
    .arrow-wrapper {
      text-align: center;
      margin: -0.6667rem auto 0;
      clear: both;
    }
  }
  .gameIntroduce-wrapper {
    padding: 0rem 0.4667rem;
    color: #fff;
    flex: 1;
    font-size: 0.3733rem;
    overflow-y: auto;
    .introduce-wrapper {
      .title {
        .title();
      }
      .introduceList {
        padding-left: 0.4rem;
        .item {
          .item();
        }
      }
    }
    .prize-wrapper {
      .title {
        .title();
      }
      .prizeList {
        padding-left: 0.4rem;
        .item {
          .item();
        }
      }
    }
    .lastPrizeResult-wrapper {
      .title {
        .title();
      }
      .lastPrizeResultList {
        padding-left: 0.4rem;
        .item {
          .item();
          display: flex;
          .avatar {
            width: 1.0667rem;
            height: 1.0667rem;
            border-radius: 50%;
          }
          .nameAndDesc {
            padding-top: 0.3667rem;
          }
          .name {
            margin: 0 0.5667rem;
          }
          .desc {
          }
        }
      }
    }
    .clocker-wrapper {
      padding-top: 0.5667rem;
      text-align: center;
      color: red;
      .countDown {
      }
    }
    .btn-wrapper {
      margin-top: 0.5rem;
      text-align: center;
      button {
        padding: 0.1333rem 0.2667rem;
        border: none;
        border-radius: 0.1333rem;
        background: #2f8963;
      }
    }
  } // .scroll-wrapper {
  //   // height: 8rem;
  //   flex: 1;
  //   padding: 0 0.4133rem;
  //   overflow: hidden;
  //   .listScroll {
  //     height: 100%;
  //     .gameList {
  //       padding-bottom: 0.1333rem;
  //       .gameItem {
  //         margin-bottom: 0.2rem;
  //         width: 100%;
  //         height: 2.4533rem;
  //         .bg("../../assets/image/huodong_bg.png");
  //         .gameItem-top {
  //           position: relative;
  //           .hotTitle {
  //             width: 1.2533rem;
  //             height: 0.8267rem;
  //             .bg("../../assets/image/hot_bg.png");
  //             position: absolute;
  //             top: 0;
  //             left: 0;
  //             .hot {
  //               position: absolute;
  //               top: 0;
  //               left: 0;
  //               color: #fff;
  //               display: inline-block;
  //               transform: rotate(-30deg);
  //               font-size: 0.3133rem;
  //               padding-top: 0.08rem;
  //             }
  //           }
  //           .title {
  //             font-size: 0.3467rem;
  //             width: 100%;
  //             color: #063d27;
  //             text-align: center;
  //             box-sizing: border-box;
  //             padding-top: 0.2933rem;
  //           }
  //         }
  //         .gameItem-bottom {
  //           padding: 0.5133rem 0.48rem;
  //           box-sizing: border-box;
  //           display: flex;
  //           justify-content: space-between;
  //           .name {
  //             font-size: 0.48rem;
  //             text-shadow: 0 0.0533rem 0.0667rem #0b4227;
  //             font-weight: bold;
  //             color: #fff;
  //             letter-spacing: 0.0667rem;
  //           }
  //           .status {
  //             padding: 0.08rem 0.1333rem;
  //             border: 1.5px solid #0c412c;
  //             letter-spacing: 0.08rem;
  //             transform: rotate(-15deg);
  //             &.active {
  //               color: red;
  //               border: 1.5px solid red;
  //             }
  //             &.over {
  //               color: #0c412c;
  //               border: 1.5px solid #0c412c;
  //             }
  //             &.begin {
  //               color: green;
  //               border: 1.5px solid green;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
}
.slideDown-enter-active,
.slideDown-leave-active {
  transition: all 0.3s;
}
.slideDown-enter {
  transform: translate3d(0, -100%, 0);
}
.slideDown-leave-to {
  transform: translate3d(0, -100%, 0);
}
</style>
