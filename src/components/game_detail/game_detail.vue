<template>
 <divdiv id="game_detail" class="game_detail">
     <my-header title="游戏明细"></my-header>
         <div class="list_wrapper vux-1px-t">
             <div class="title_content vux-1px-b">
                 <h3 class="title">游戏获胜率</h3>
                 <p class="ratio">56%</p>
             </div>
             <scroll class="scroll">
                <ul class="record_list">
                    <li class="item vux-1px" v-for="(item,index) in resultList" :key="index">
                        <span class="result_left" :class="{result:true,fail:false}">{{item.win}}</span>
                        <span class="time">2018-2-02</span>
                    </li>
                    <!-- <li class="item vux-1px">
                        <span class="result_left" :class="{result:false,fail:true}">失败</span>
                        <span class="time">2018-2-02</span>
                    </li> -->
                </ul>
             </scroll>
         </div>
 </divdiv>
</template>

<script type='text/ecmascript-6'>
import myHeader from "../../base/myheader/myheader";
import Scroll from "../../base/scroll/scroll";
export default {
  data() {
    return {
      win: true,
      resultList:[
          {
              win:"胜利"
          },
           {
              win:"胜利"
          }, {
              win:"胜利"
          }, {
              win:"胜利"
          }, {
              win:"胜利"
          }, {
              win:"胜利"
          }, {
              win:"胜利"
          }, {
              win:"胜利"
          }, {
              win:"胜利"
          }, {
              win:"胜利"
          }
      ]
    };
  },
  components: {
    myHeader,
    Scroll
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/variable.less";
.game_detail {
  height: 100%;
  .list_wrapper {
    padding-top: 0.1333rem;
    .title_content {
    //   margin: 0.1333rem;
      display: flex;
      justify-content: space-between;
      padding: 0.4rem 0.4rem;
      box-sizing: border-box;
    //   box-shadow: 1px 1px 1px 1px #eee;
      .title {
        font-size: 0.4rem;
        color: #333;
      }
      .ratio {
        font-size: 0.3733rem;
        color: #ff4646;
      }
    }
    .scroll {
      height: 8.3333rem;
      overflow: hidden;
      .record_list {
          padding-bottom: 0.1333rem;
        .item {
          padding: 0.4rem 0.4rem;
          margin: 0.1333rem;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          box-shadow: 1px 1px 1px 1px #eee;
          .result_left {
            font-size: 0.4rem;
            &.result {
              color: #ff4646;
            }
            &.fail {
              color: #10a600;
            }
          }
          .time {
            font-size: 0.3467rem;
            color: #999;
          }
        }
      }
    }
  }
}
.vux-1px:before {
  border-radius: 0.1333rem;
}
</style>
