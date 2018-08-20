<template>
    <div id="gameCompetion" class="gameCompetion">
        <div class="title-wrapper">
            <h3 class="title">游戏规则介绍</h3>
            <img @click="showRuleBtn" src="../../../assets/image/Arrow.png" alt="">
            <img src="../../../assets/image/game_home.png" alt="" @click="goBackHome" class="homeBtn">
        </div>
        <transition name="slideDown">
            <div v-show="isShowRule" class="mask">
                <div class="rule-wrapper">
                    <div class="rule-main clearfix">
                        <h3 class="ruleTitle">大话骰规则介绍</h3>
                        <p>1）双方就座后，点［开始］开始游戏，摇骰钟。</p> 
                        <p>2）每人手里一骰钟，内放五颗骰子。摇玩骰钟后，双方可将鼠标移到骰钟位置查看自己的点数。</p>
                        <p>3）如果摇出的是顺子，如一二三四五，二三四五六，则重新开摇。</p>
                        <p>4）轮到已方叫牌，必须叫比对方大的牌（点数比对方大或个数比对方大即可）。如对方叫三个四，自己就得叫三个四以上的，三个五、三个六均可，也可以叫四个几，四个一到四个六都可以叫。
                        自己首先叫牌可以任意叫。</p>
                        <p>>5）在游戏中点数一既可代表一，也可代表骰钟里任意点数，但是只要有一方喊过一后那么一就只能为一，不能代表其他的点数。</p>
                        <p>6）轮到自己叫牌时，可以选择继续叫牌，或者开牌。但如果是本局游戏的第一次叫牌则不可以开牌。</p>
                        <p>7）只要叫牌方喊出的点数和个数小于双方实际骰钟的个数，则开牌方胜（参看以下实例）。</p>
                    </div>
                </div>
                <div class="arrow-wrapper">
                    <img @click="showRuleBtn" src="../../../assets/image/arrowUp.png" alt="" class="arrowUp">
                </div>
            </div>
        </transition>
        <div class="scroll-wrapper">
            <scroll ref="listScroll" class="listScroll" :data="gameList">
                <ul class="gameList">
                    <li class="gameItem" v-for="item in gameList" @click="apply">
                        <div class="gameItem-top">
                            <div v-show="item.status==0" class="hotTitle">
                                <span class="hot" >HOT</span>
                            </div>
                            <h3 class="title">{{item.title}}</h3>
                        </div>
                        <div class="gameItem-bottom">
                            <div class="name">
                                大话骰部落争霸
                            </div>
                            <div class="status" :class="{active:item.status==0,begin:item.status==1,over:item.status==2}">
                                {{item.statusText}}
                            </div>
                        </div>
                    </li>
                </ul>
            </scroll>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
import Scroll from "base/scroll/scroll";
import api from "common/api";
export default {
  data() {
    return {
      isShowRule: false,
      gameList: [
        {
          title: "活动进行中",
          status: 0,
          statusText: "进行中"
        },
        {
          title: "即将开始",
          status: 1,
          statusText: "即将开始"
        },
        {
          title: "已结束",
          status: 2,
          statusText: "已结束"
        },
        {
          title: "活动进行中",
          status: 0,
          statusText: "进行中"
        },
        {
          title: "即将开始",
          status: 1,
          statusText: "即将开始"
        },
        {
          title: "已结束",
          status: 2,
          statusText: "已结束"
        },
        {
          title: "即将开始",
          status: 1,
          statusText: "即将开始"
        },
        {
          title: "即将开始",
          status: 1,
          statusText: "即将开始"
        },
        {
          title: "已结束",
          status: 2,
          statusText: "已结束"
        },
        {
          title: "即将开始",
          status: 1,
          statusText: "即将开始"
        }
      ]
    };
  },
  created() {
    this._loadArenas();
  },
  methods: {
    //拉取游戏比赛场次
    _loadArenas() {
      api.loadArenas().then(res => {
        console.log(res);
      });
    },
    goBackHome() {
      this.$router.push({
        name: "home"
      });
    },
    showRuleBtn() {
      this.isShowRule = !this.isShowRule;
    },
    apply() {
      this.$router.push({
        name: "GameCompetionDetail"
      });
    }
  },
  components: {
    Scroll
  }
};
</script>

<style scoped lang='less'>
@import "../../../assets/less/mixin.less";
@import "../../../assets/less/variable.less";
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
  .scroll-wrapper {
    // height: 8rem;
    flex: 1;
    padding: 0 0.4133rem;
    overflow: hidden;
    .listScroll {
      height: 100%;
      .gameList {
        padding-bottom: 0.1333rem;
        .gameItem {
          margin-bottom: 0.2rem;
          width: 100%;
          height: 2.4533rem;
          .bg("../../assets/image/huodong_bg.png");
          .gameItem-top {
            position: relative;
            .hotTitle {
              width: 1.2533rem;
              height: 0.8267rem;
              .bg("../../assets/image/hot_bg.png");
              position: absolute;
              top: 0;
              left: 0;
              .hot {
                position: absolute;
                top: 0;
                left: 0;
                color: #fff;
                display: inline-block;
                transform: rotate(-30deg);
                font-size: 0.3133rem;
                padding-top: 0.08rem;
              }
            }
            .title {
              font-size: 0.3467rem;
              width: 100%;
              color: #063d27;
              text-align: center;
              box-sizing: border-box;
              padding-top: 0.2933rem;
            }
          }
          .gameItem-bottom {
            padding: 0.5133rem 0.48rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            .name {
              font-size: 0.48rem;
              text-shadow: 0 0.0533rem 0.0667rem #0b4227;
              font-weight: bold;
              color: #fff;
              letter-spacing: 0.0667rem;
            }
            .status {
              padding: 0.08rem 0.1333rem;
              border: 1.5px solid #0c412c;
              letter-spacing: 0.08rem;
              transform: rotate(-15deg);
              &.active {
                color: red;
                border: 1.5px solid red;
              }
              &.over {
                color: #0c412c;
                border: 1.5px solid #0c412c;
              }
              &.begin {
                color: green;
                border: 1.5px solid green;
              }
            }
          }
        }
      }
    }
  }
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
