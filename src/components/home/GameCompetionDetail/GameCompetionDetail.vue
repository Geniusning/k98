<template>
 <div id="gameCompetionDetail" class="gameCompetionDetail">
     <div class="notice-wrapper">
         <div class="name">大话骰部落争霸</div>
         <div class="status">已报名</div>
     </div>

     <div class="scroll-wrapper">
         <div class="playerNumber">玩家人数:20/50</div>
         <scroll class="scrollList" :data="playList">
             <ul class="userList">
                 <li class="userItem" v-for="(item,index) in playList">
                     <span class="rankNum">{{index+1}}</span>
                     <img class="avatar" src="../../../assets/image/avatar.jpg" alt="">
                     <div class="username">{{item.name}}</div>
                 </li>
             </ul>
         </scroll>
     </div>

     <div class="btn-wrapper">
         <img src="../../../assets/image/jinruyouxi.png" alt="">
     </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import Scroll from "base/scroll/scroll";
export default {
  data() {
    return {
      playList: [
        {
          name: "Guedklh-ss",
          headUrl: "../../../assets/image/avatar.jpg"
        },
        {
          name: "樱桃小丸子",
          headUrl: "../../../assets/image/avatar2.jpg"
        },
        {
          name: "顺其自然",
          headUrl: "../../../assets/image/avatar1.jpg"
        },
        {
          name: "Guedklh-ss",
          headUrl: "../../../assets/image/avatar.jpg"
        },
        {
          name: "樱桃小丸子",
          headUrl: "../../../assets/image/avatar2.jpg"
        },
        {
          name: "顺其自然",
          headUrl: "../../../assets/image/avatar1.jpg"
        },
        {
          name: "Guedklh-ss",
          headUrl: "../../../assets/image/avatar.jpg"
        },
        {
          name: "樱桃小丸子",
          headUrl: "../../../assets/image/avatar2.jpg"
        },
        {
          name: "顺其自然",
          headUrl: "../../../assets/image/avatar1.jpg"
        }
      ]
    };
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
  .bg("../../assets/image/game_bg.jpg");
  .notice-wrapper {
    width: 8.8rem;
    height: 1.4667rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 0.3433rem 0.2667rem;
    .bg("../../assets/image/playerTitle_bg.png");
    margin: 0 auto;
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
      text-shadow: 0 0.0533rem 0.0667rem #0b4227;
      font-weight: bold;
      color: #fff;
      letter-spacing: 0.0667rem;
      border-bottom: 1px solid #2a8459;
      box-sizing: border-box;
      padding-top: 0.1667rem;
      margin-bottom: 0.233rem;
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
            font-size: 0.6133rem;
            padding-top: 0.2333rem;
          }
          .avatar {
            width: 1.2533rem;
            height: 1.2533rem;
            border-radius: 50%;
            margin: 0 0.4rem;
          }
          .username {
            font-size: 0.4rem;
            color: #fff;
            padding-top: 0.3333rem;
          }
        }
      }
    }
  }
  .btn-wrapper{
      margin-top: 0.6667rem;
      text-align: center;
  }
}
</style>
