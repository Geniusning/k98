<template>
 <div id="gameCompetionDetail" class="gameCompetionDetail">
     <div class="notice-wrapper">
         <div class="name">大话骰部落争霸排行榜</div>
         <!-- <div class="status">已报名</div> -->
         <img class="home" src="../../../assets/image/game_home.png" alt="" @click="goHome">
     </div>

     <div class="scroll-wrapper">
         <div class="playerNumber">玩家人数:{{playList.length}}</div>
         <scroll class="scrollList" :data="playList">
             <ul class="userList">
                 <li class="userItem" v-for="(item,index) in playList">
                     <span class="rankNum" :class="{'first':index==0,'second':index==1,'third':index==2}">第{{index+1}}名</span>
                     <img class="avatar" :src="item.headURI" alt="">
                     <div class="username">{{item.nick}}</div>
                     <span class="score">{{item.score}}杯</span>
                 </li>
             </ul>
         </scroll>
     </div>
     <div class="btn-wrapper">
         <p class='backHome'>关注公众号，更多福利等你拿！</p>
         <img :src="QRcodeUrl" alt="" class="QRcode">
     </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import Scroll from "base/scroll/scroll";
import api from 'common/api'
import { setInterval, clearTimeout } from 'timers';
export default {
  data() {
    return {
      playList: [],
      timeout: 200000,
      QRcodeUrl: "",
      url: "",
    };
  },
  created() {
    this._loadArenaRank();//拉取比赛场排名
    this._loadAllQrcode();//拉取二维码
    this.url = window.location.href;
    alert(this.url);
  },
  methods: {
    //拉取比赛场排名
    _loadArenaRank() {
      let timer = null;
      let ArenaId = this.url.split('arenaID=')[1];
      if (timer) {
        clearTimeout(timer);
      }
      api.loadArenaRank(ArenaId).then(res => {
        console.log(res)
        if (res.errCode === 0) {
          this.playList = res.userRanks;
          if (res.isAllComplete) {  //如果比赛结束，结束轮训
            return false;
          }
          timer = setTimeout(() => {
            this._loadArenaRank();
          }, 10000);
        }
      })
    },
    _loadAllQrcode() {
      api.loadAllQrcode().then(res => {
        this.QRcodeUrl = res.urls[0]
      })
    },
    //回到主页
    goHome() {
      this.$router.push({
        name: "home"
      })
    }
  },
  components: {
    Scroll
  }
};
</script>

<style scoped lang='less'>
@import "../../../assets/less/mixin.less";
.gameCompetionDetail {
  padding-top: 0.4267rem;
  height: 100%;
  box-sizing: border-box;
  // .bg("../../assets/image/game_bg.jpg");
  background-color: #196045;
  .notice-wrapper {
    width: 8.8rem;
    height: 1.4667rem;
    position: relative;
    box-sizing: border-box;
    padding: 0.3433rem 0.2667rem;
    .bg("../../assets/image/playerTitle_bg.png");
    margin: 0 auto;
    .name {
      font-size: 0.48rem;
      text-shadow: 0 0.0533rem 0.0267rem;
      font-weight: bold;
      color: #fff;
      letter-spacing: 0.0667rem;
      text-align: center;
    }
    .home {
      position: absolute;
      width: 1rem;
      height: 1rem;
      right: 0.2667rem;
      top: 0.1333rem;
    }
  }
  .scroll-wrapper {
    width: 8.8rem;
    height: 11.04rem;
    .bg("../../assets/image/player_bg.png");
    margin: 0.2933rem auto 0;
    border-radius: 0.32rem;
    .playerNumber {
      height: 0.88rem;
      text-align: center;
      font-size: 0.4rem;
      text-shadow: 0 0.02rem 0.02rem #fff;
      font-weight: bold;
      color: #fff;
      letter-spacing: 0.0667rem;
      border-bottom: 1px solid #fff;
      box-sizing: border-box;
      margin: 0.1667rem 0.2rem 0;
      padding-top: 0.16rem;
    }
    .scrollList {
      height: 9.5rem;
      overflow: hidden;
      .userList {
        .userItem {
          display: flex;
          padding: 0 0.44rem;
          margin-top: 0.1633rem;
          .rankNum {
            color: #fff;
            font-size: 0.5133rem;
            padding-top: 0.2333rem;
            &.first {
              color: gold;
              font-weight: bold;
            }
            &.second {
              color: goldenrod;
              font-weight: bold;
            }
            &.third {
              color: red;
              font-weight: bold;
            }
          }
          .avatar {
            width: 1.2533rem;
            height: 1.2533rem;
            border-radius: 50%;
            margin: 0 0.4rem;
          }
          .username {
            width: 1.5333rem;
            font-size: 0.4rem;
            color: #fff;
            padding-top: 0.3333rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .score {
            margin-left: 0.7667rem;
            padding-top: 0.3333rem;
            color: #fff;
            font-size: 0.4rem;
          }
        }
      }
    }
  }
  .btn-wrapper {
    margin-top: 0.2667rem;
    text-align: center;
    // background-color: #366f95;
    .QRcode {
      width: 2.6667rem;
      height: 2.6667rem;
    }
    .backHome {
      font-size: 0.5333rem;
      font-weight: bold;
      text-align: center;
      color: #fff;
      margin-bottom: 0.2667rem;
    }
  }
}
</style>
