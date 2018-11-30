<template>
  <div id="gameCompetion" class="gameCompetion">
    <!-- <div class="title-wrapper">
        <h3 class="title">大话骰游戏规则介绍</h3>
        <img @click="showRuleBtn" src="../../../assets/image/Arrow.png" alt="">
      </div> -->
    <transition name="slideDown">
        <div v-show="isShowRule" class="mask">
          <div class="rule-wrapper">
            <div class="rule-main clearfix">
              <h3 class="ruleTitle">大话骰规则介绍</h3>
              <p>1）开始: 点击色盅(图)→摇动→开局;</p>
              <p>2）叫牌: 上下推动滚轮，选个数和点数，按"出"(用图)或斋(图)键叫牌。叫牌规则:下家叫点必须在个数或点数大于上家，点大小顺序: 234561</p>
              <p>3）开牌: 当叫点个数小于所有对手开牌后该点合计个数，则叫牌者胜</p>
              <p>4）"•" (图): 万能，可当任何点数。但叫斋后只能当一点，叫斋后仍是最大</p>
              <p>5）斋: 叫点为"•"时，自动默认为斋; 选其他点时，如3个二(图)，也可点"斋(图)"叫斋，这时"•"不再是万能。</p>
              <p>6）破斋: 叫斋后默认下家叫点也都是斋，除非叫点个数是上家的双倍，则破斋，这时"·"恢复为万能点。</p>
              <p>7）劈:点"劈"杀对方时，场上输嬴比分翻倍，即×2</p>
              <p>8）反劈: 被劈后，可反劈，这时场上输嬴比分再翻倍，即×4</p>
              <p>9）降: 当被劈或被反劈后，可选择投降，这时只输一半。</p>
              <p>10）结算: 采用每场3局制，3局累计总分为正者胜出，实际场景中可按负分者喝酒，或负N杯则喝N杯。</p>
              <p>11）本大话游戏仅用于斗酒、活跃现场气氛，不得用于赌博，违者后果自负。</p>
            </div>
          </div>
          <div class="arrow-wrapper">
            <img @click="showRuleBtn" src="../../../assets/image/arrowUp.png" alt="" class="arrowUp">
          </div>
        </div>
      </transition>
    <div class="gameIntroduce-wrapper">
      <img src="../../../assets/image/gameNoticeHome.png" alt="" @click="goBackHome" class="homeBtn">
      <img src="../../../assets/image/help.png" alt="" @click="showRuleBtn" class="helpBtn">
      <div v-if="playInformation.maxRoundNumber" class="gameTitle" style="margin-bottom:3.6rem;box-sizing:border-box;padding-top:.5rem;">
        <h3 class="firstTitle" v-if="playInformation.maxRoundNumber">{{playInformation.name}}</h3>
        <h4 class="secondTitle" v-if="!Boolean(playInformation.arenaType)">冠名赛</h4>
        <h4 class="secondTitle" v-if="Boolean(playInformation.arenaType)">团体赛</h4>
      </div>
      <h4 class="noGameDesc" v-if="!playInformation.maxRoundNumber">暂无比赛</h4>
      <!-- <img src="../../../assets/image/desk.png" alt="" class="desk"> -->
      <div class="desc_wrapper">
        <!-- 说明 -->
        <div class='introduce-wrapper'>
          <h3 class='title'>比赛规则</h3>
          <ul class='introduceList' v-cloak>
            <li class='item' v-if="playInformation.startTime">开奖时间：{{playInformation.startTime}} ~ {{playInformation.endTime}}</li>
            <li class='item' v-else>游戏时间：暂无比赛时间</li>
            <li class='item' v-if="playInformation.arenaType">每个团队3人，每人打满{{playInformation.maxRoundNumber*3}}局，按合计总分排名</li>
            <li class='item' v-else-if="playInformation.startTime">每人比赛局数：{{playInformation.maxRoundNumber*3}}局</li>
            <li class='item' v-else>每人比赛局数：暂无比赛</li>
            <!-- <li class='item' v-if="playInformation.maxNumberOfPlayer">比赛人数：{{playInformation.maxNumberOfPlayer}}人</li>
            <li class='item' v-else>比赛人数：暂无比赛</li> -->
          </ul>
        </div>
        <!-- 比赛奖品 -->
        <div class="prize-wrapper">
          <h3 class='title'>比赛奖品</h3>
          <ul class='prizeList'>
            <li class='item'>第一名：{{playInformation.firstPrize?playInformation.firstPrize:"无"}}</li>
            <li class='item'>第二名：{{playInformation.secondPrize?playInformation.secondPrize:"无"}}</li>
            <li class='item'>第三名：{{playInformation.thirdPrize?playInformation.thirdPrize:"无"}}</li>
            <li class='item' v-if="Boolean(playInformation.arenaType)" style="color:#CDAA1F">比赛宣言：不中途逃跑，不放弃队友！</li>
            <li class='item' v-if="Boolean(playInformation.arenaType)">诚邀您加入：{{team.teamName}}战队</li>
            <li class='item playerItem' v-if="Boolean(playInformation.arenaType)">
              <h3 class="playerListTitle">已加盟队友：</h3>
              <ul class="playerList">
                <li class="item" v-for="(item,index) in playerList" ::key="index">
                  <img :src="item.headImagUrl" alt="" style="width:100%;height:100%;border-radius:50%">
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- Clocker -->
        <div class="clocker-wrapper">
          <!-- <h3 class="countDown" v-show="isLessThanPublickTime">暂无比赛</h3> -->
          <div v-if="countDown">
            <h3 class="countDown">倒计时</h3>
            <clocker @on-finish='onFinish' :time="clocktime"></clocker>
          </div>
        </div>
        <!-- 个人比赛确定按钮 -->
        <div class="btn-wrapper" v-if="!Boolean(playInformation.arenaType)">
          <img @click="play" src="../../../assets/image/jinruyouxi.png" alt="" v-if="isPlayStartBtn">
          <img src="../../../assets/image/noplay.png" alt="" v-else>
        </div>
        <!-- 团体赛确定按钮 -->
        <div class="btn-wrapper" v-else>
          <img src="../../../assets/image/inviteFri.png" class="Lbtn" @click="share">
          <!--   -->
          <img @click="play" src="../../../assets/image/enterPlaybtn.png" class="Lbtn" alt="" v-if="beginPlay">
          <img src="../../../assets/image/ruDui.png" class="Rbtn" @click="takePart" v-if="takePartPlay && isMoreThan3" >
        </div>
      </div>
    </div>
    <transition name="appear">
      <envelope v-show="isShowEnvelope" :text='envelopeText'></envelope>
    </transition>
    <div class="bg" v-show="isShow_bg" @click="share">
            <img src="../../../assets/image/share.png" alt="">
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import {
  Clocker
} from "vux";
import envelope from 'base/envelope/envelope'
import Scroll from "base/scroll/scroll";
import api from "common/api";
import util from "common/util";
import Config from 'common/url'
import { mapState } from 'vuex';
export default {
  data() {
    return {
      isMoreThan3: true,
      beginPlay: false,
      takePartPlay: false,
      isShow_bg: false,
      isShowRule: false,
      isPlayStartBtn: true,
      isPlayStartText: false,
      clocktime: "",
      isShowEnvelope: false,
      envelopeText: "",
      countDown: false,
      playInformation: {},
      lastAwardUsers: [],
      playerList: [],
      team: {},
      TeamIdParams: ""
    };
  },
  computed: {
    ...mapState(['baseUrl', 'shopSettingInfo'])
  },
  created() {
    // 拉取已经发布的比赛场
    var url = window.location.href;
    this.TeamIdParams = url.split("teamID=")[1];
    this._loadPublishArenas();

  },
  methods: {
    //拉取已经发布的比赛场
    _loadPublishArenas() {
      //获取当前时间戳
      let nowTimeStamp = Number(Math.round(new Date().getTime() / 1000).toString());
      api.loadPublishArenas().then(res => {
        console.log('拉取已经发布的比赛场------------------------', res)
        if (res.errCode === 0) {
          //判断是否
          if (res.lastAwardUsers.length) {
            this.lastAwardUsers = res.lastAwardUsers; //上一场比赛的前三名选手
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
            return false;
          }
          let playInfo = res.arenaInfos.reverse()[0]; //翻转数组，把时间靠前先开始
          this.isPlayStartBtn = nowTimeStamp < Number(playInfo.publishTime) ? false : true;
          this.playInformation['startTime'] = util.timestampToTime(playInfo.publishTime).slice(0, -3);
          this.playInformation['endTime'] = util.timestampToTime(playInfo.endTime).slice(0, -3);
          this.playInformation['maxNumberOfPlayer'] = playInfo.maxNumberOfPlayer;
          this.playInformation['maxRoundNumber'] = playInfo.maxRoundNumber;
          this.playInformation['maxRoundNumber'] = playInfo.maxRoundNumber;
          this.playInformation['name'] = playInfo.name;
          this.playInformation['arenaID'] = playInfo.arenaID;
          this.playInformation['arenaType'] = playInfo.arenaType;
          //判断是否团体赛
          if (this.playInformation['arenaType']) {
            //判断是拉取战队还是创建战队
            if (!this.TeamIdParams) {
              this._createTeam(this.playInformation['arenaID']);
              this.beginPlay = true;
            } else {
              this._loadTeam(this.TeamIdParams, this.playInformation['arenaID']);
              this.takePartPlay = true;   //加入战队按钮显示
              this.beginPlay = false;
            }
          }
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
          this.arenaID = playInfo.arenaID;
          this.clocktime = util.timestampToTime(playInfo.publishTime).slice(0, -3);
          if (this.clocktime) {
            this.countDown = true;
          }
        }
      })
    },
    //创建团体赛
    _createTeam(arenaID) {
      api.createTeam(arenaID).then(res => {
        console.log('创建团体赛结果---------------', res);
        if (res.errCode === 0) {
          this.team = res.team;
          this.playerList = res.team.memberInfos;
          var teamId = this.team.teamID;
          // alert(teamId);
          let shareObj = {
            title: "和我一起并肩作战",
            desc: "可以认识许多新朋友，打比赛。老板还特傻X，见人就发红包",
            link: `${Config.shareUrl}#/gameCompetion?teamID=${teamId}`,
            imgUrl: `${this.shopSettingInfo.image}`
          };
          util._getJssdkInfo(shareObj, this.myShareUrl);
        }
      })
    },
    //加入团体赛
    takePart() {
      api.joinTeam(this.team.teamID, this.team.arenaID).then(res => {
        console.log('加入团队赛------------', res)
        if (res.errCode === 0) {
          this.playerList = res.team.memberInfos;
          this.beginPlay = true;
          this.isShowEnvelope = true;
          this.envelopeText = "加入团队成功"
          setTimeout(() => {
            this.isShowEnvelope = false;
          }, 2000);
        } else if (res.errCode === 1026) {
          this.isShowEnvelope = true;
          this.envelopeText = "己加入团队,无需重复加入"
          setTimeout(() => {
            this.isShowEnvelope = false;
          }, 2000);
        }
      })
    },
    //拉取团队赛信息
    _loadTeam(teamId, arenaID) {
      api.loadTeam(teamId, arenaID).then(res => {
        console.log('拉取团队赛信息`````````````', res)
        if (res.errCode === 0) {
          alert('进去拉取内容');
          this.team = res.team;
          this.$nextTick(function () {
            this.playerList = res.team.memberInfos;
          })
          if (this.playerList.length > 3) {
            this.isMoreThan3 = false;  //大于3个人就不在分享
          }
        }
      })
    },
    //倒计时结束
    onFinish() {
      this.isPlayStartBtn = true;
      this.countDown = !this.countDown;
    },
    //分享
    share() {
      this.isShow_bg = !this.isShow_bg;
    },
    // //邀请战友
    // invite() {
    //   this.isShow_bg = !this.isShow_bg;
    // },
    //进入游戏
    play() {
      // this._loadTeam();
      let token = util.getCookie("tk");
      window.location.href = `${Config.shareUrl}game/?gamePath=game2&arenaID=${this.arenaID}`;
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
    Clocker,
    envelope
  }
};
</script>

<style scoped lang='less'>
@import "../../../assets/less/mixin.less";
@import "../../../assets/less/variable.less";
@import "../../../assets/less/gameCompetion.less";
.gameCompetion {
  height: 100%;
  background-image: url("../../../assets/image/game_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
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
      right: -0.5rem;
    }
  }
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
    position: relative;
    .homeBtn {
      width: 0.8rem;
      height: 0.8rem;
      position: absolute;
      top: 0.3333rem;
      right: 0.3333rem;
    }
    .helpBtn {
      width: 0.8rem;
      height: 0.8rem;
      position: absolute;
      top: 0.3333rem;
      left: 0.3333rem;
    }
    .noGameDesc {
      text-align: center;
      color: #25ae7e;
      font-size: 1rem;
      letter-spacing: 0.0833rem;
      // font-family: "Courier New", Courier, monospace;
      margin-bottom: 0.3rem;
      font-weight: 700;
      margin-top: 0.8rem;
    }
    .gameTitle {
      .firstTitle,
      .secondTitle {
        text-align: center;
        color: #25ae7e;
        font-size: 1.3rem;
        letter-spacing: 0.0833rem;
        font-family: "Courier New", Courier, monospace;
        font-weight: 700;
      }
      .secondTitle {
        font-size: 0.7rem;
      }
    }
    .desc_wrapper {
      width: 100%;
      position: absolute;
      padding: 0rem 0.4667rem;
      box-sizing: border-box;
      bottom: 0.5rem;
      left: 0;
      right: 0;
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
          .playerItem {
            display: flex;
            .playerListTitle {
              padding-top: 0.3333rem;
            }
            .playerList {
              display: flex;
              .item {
                width: 0.8rem;
                height: 0.8rem;
                border-radius: 50%;
                border: 1px solid #fff;
                margin-right: 0.1333rem;
              }
            }
          }
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
        width: 100%;
        display: flex;
        justify-content: space-around;
        .Lbtn,
        .Rbtn {
          width: 2.4667rem;
          height: 0.92rem;
        }
        button {
          padding: 0.1333rem 0.2667rem;
          border: none;
          border-radius: 0.1333rem;
          background: #2f8963;
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
