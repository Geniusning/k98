<template>
 <div class="gift_detail">
        <my-header title="大话战绩" ref="header"></my-header>
        <div class="gift_wrapper vux-1px-t">
            <div class="title_content vux-1px-b">
              <div class='title_content_item clearfix'>
                <h3 class="title fl"><strong>我的战绩：</strong></h3>
                <img src="../../assets/image/jiubei.png" alt="" class="jiubeiIcon fl">
                <span class="money fl">{{gameContent.score}}</span>
              </div>
               <div class='title_content_item clearfix'>
                <h3 class="title fl"><strong>战神榜排名：</strong></h3>
                <span class="money fl">{{gameContent.ranking}}</span>
              </div>
            </div>
            <div class="scrollTitle">
              <span class="total">累计战绩</span>
              <span class="name">每局战果</span>
              <span class="content">参与项目</span>
              <span class="avatar">对手</span>
              <span class="time">时间</span>
            </div>
            <scroll class="scroll" :data="gameContent.gameScoreDetails">
                <ul class="gift_list">
                    <li class="item vux-1px" v-for="(item,index) in gameContent.gameScoreDetails" :key="index">
                        <span class="total">{{item.score}}</span>
                        <span class="name">{{item.amount}}</span>
                        <span class="content" v-if="item.content==='game1'">随机场</span>
                        <span class="content" v-else-if="item.content==='game2'">比赛场</span>
                        <span class="content" v-else>好友场</span>
                        <div class="avatar">
                          <img :src="item.headimgurl" class="gift_icon">
                        </div>
                        <span class="time">{{item.time}}</span>
                    </li>
                     <p v-if="!gameContent.gameScoreDetails.length" class="noContent">暂无战绩内容</p>
                </ul>
            </scroll>
        </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import api from "common/api";
import util from "common/util";
import myHeader from "../../base/myheader/myheader";
import Scroll from "../../base/scroll/scroll";
export default {
  data() {
    return {
      moneyIndex: 0,
      moneyInitValue: 5,
      gameContent: {
        gameScoreDetails:[]
      },
    };
  },
  mounted() {
    this._LoadGameScoreDetail()
  },
  methods: {
    //拉取游戏详情
    _LoadGameScoreDetail() {
      api.LoadGameScoreDetail().then(res => {
        console.log('游戏详情-------------------', res);
        this.gameContent = res;
        this.gameContent.gameScoreDetails.forEach(item => {
          item.time = util.timestampToTimeNoLine(item.time);
        })
      })
    }
  },
  components: {
    myHeader,
    Scroll
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/variable.less";
.gift_detail {
  height: 100%;
  .gift_wrapper {
    height: 80%;
    .title_content {
      margin-top: 0;
      display: flex;
      padding: 0.4rem 0.4rem;
      box-sizing: border-box;
      .title_content_item {
        margin-right: 0.6667rem;
        box-sizing: border-box;
      }
      .jiubeiIcon {
        width: 0.4rem;
        height: 0.5rem;
        margin-right: 0.1333rem;
      }
      .title {
        font-size: 0.4rem;
        color: #333;
      }
      .money {
        padding-top: 0.05rem;
        font-size: 0.3733rem;
        color: #ff4646;
      }
    }
    .scrollTitle {
      padding: 0.4rem 0.2rem;
      display: flex;
      justify-content: space-between;
      text-align: center;
      font-size: 0.35rem;
      .total {
        width: 20%;
      }
      .name {
        width: 20%;
      }
      .content {
        width: 20%;
      }
      .avatar {
        width: 20%;
      }
      .time {
        width: 20%;
      }
    }
    .scroll {
      height: 9.3333rem;
      overflow: hidden;
      padding-bottom: 0.1333rem;
      border-bottom: 1px solid #ccc;
      .gift_list {
        padding-bottom: 0.1333rem;
        .item {
          padding: 0.2rem 0.2rem;
          margin: 0.1333rem;
          display: flex;
          box-sizing: border-box;
          box-shadow: 1px 1px 1px 1px #eee;
          font-size: 0.35rem;
          text-align: center;
          .name {
            width: 20%;
            padding-top: 0.1333rem;
          }
          .total {
            width: 20%;
            padding-top: 0.1333rem;
          }
          .gift_icon {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
          }
          .avatar {
            width: 20%;
          }
          .content {
            width: 20%;
            padding-top: 0.1333rem;
          }
          .time {
            width: 20%;
            text-align: center;
          }
          .plus {
            color: green;
          }
        }
        .noContent {
          width: 100%;
          text-align: center;
          margin-top: 50%;
          color: #ccc;
          font-size: 0.5333rem;
        }
      }
    }
  }
}
.vux-1px:before {
  border-radius: 0.1333rem;
}
</style>
