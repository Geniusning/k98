<template>
  <div class="marsRank_wrapper">
    <div class="header">
      <my-header title="战神榜" ref="header"></my-header>
      <div class="tabBox vux-1px-t">
        <button-tab v-model="tabIndex">
          <button-tab-item @on-item-click="switchTabIndex0">社群排名</button-tab-item>
          <button-tab-item @on-item-click="switchTabIndex1">好友排名</button-tab-item>
        </button-tab>
      </div>
    </div>
    <!-- <div class="body">
        <div class="body-left" v-if="isFriendList"> -->
    <scroll ref="scrollList" class="scrollList">
      <ul class="marsList" v-if="isFriendList">
        <li class="mars-item-title">
          <div class="title_item">头像</div>
          <div class="title_item">名字</div>
          <div class="title_item">杯数</div>
          <div class="title_item">排名</div>
        </li>
        <li class="treasure-item-title">
          <p v-if="!allPeopleList.length" class="noData">暂无数据</p>
        </li>
        <li class="mars-item"  v-for="(item,index) in allPeopleList" :key="index">
          <div class="avatar-box">
            <img :src="item.headImgURL" alt class="avatar">
          </div>
          <div class="name">{{item.nickName}}</div>
          <div class="score">{{item.score}}</div>
          <div class="title_item">
            <img v-if="index===0" src="../../../assets/image/img_rank1.png" alt class="rankIcon">
            <img v-else-if="index===1" src="../../../assets/image/img_rank2.png" alt class="rankIcon">
            <img v-else-if="index===2" src="../../../assets/image/img_rank3.png" alt class="rankIcon">
            <div v-else class="rank">{{index+1}}</div>
          </div>
        </li>
      </ul>
      <ul class="marsList" v-else>
        <li class="mars-item-title">
          <div class="title_item">头像</div>
          <div class="title_item">名字</div>
          <div class="title_item">杯数</div>
          <div class="title_item">排名</div>
        </li>
        <li class="treasure-item-title">
          <p v-if="!friendList.length" class="noData">暂无数据</p>
        </li>
        <li class="mars-item" :class="{own:userInfo.openid==item.openid}" v-for="(item,index) in friendList" :key="index">
          <div class="avatar-box">
            <img :src="item.headImgURL?item.headImgURL:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534938165134&di=f3ae0420c8c174149ac1c123230a28ed&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FJCRXU6oUw5s17jKllv9icrTmXvozYWQDeWFhKgEXbYeR9JOEKkrWLjibU7a7FAbsBHibVKca5wWzEiaXHWSgaSlgbA%2F640%3Fwx_fmt%3Dpng'" alt class="avatar">
          </div>
          <div class="name">{{item.nickName}}</div>
          <div class="score">{{item.score}}</div>
          <div class="title_item">
            <img v-if="index===0" src="../../../assets/image/img_rank1.png" alt class="rankIcon">
            <img v-else-if="index===1" src="../../../assets/image/img_rank2.png" alt class="rankIcon">
            <img v-else-if="index===2" src="../../../assets/image/img_rank3.png" alt class="rankIcon">
            <div v-else class="rank">{{index+1}}</div>
          </div>
        </li>
      </ul>
      <!-- <p v-else class="noData">暂无数据</p> -->
    </scroll>
  </div>
</template>

<script type='text/ecmascript-6'>
import {mapState} from 'vuex';
  import {
    ButtonTab,
    ButtonTabItem
  } from 'vux';
  import myHeader from 'base/myheader/myheader';
  import Scroll from 'base/scroll/scroll'
  import api from 'common/api'
  import util from 'common/util'
  export default {
    data() {
      return {
        tabIndex: 0,
        isFriendList: true,
        allPeopleCursor: 0,
        allPeopleList: [],
        friendList: [],
      }
    },
    mounted() {
      this._loadGameScoreRanking()
      this._loadGameAllPeopleRanking()
      //util.addVisitRecord(this.$route.name)
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      _loadGameScoreRanking() {
        let type = 'friend'
        api.loadGameScoreRanking(type).then(res => {
          if (res.errCode === 0) {
            this.friendList = res.scoreRanking.gameScoreInfos
          }
          //console.log('拉取好友排名----------', res);
        })
      },
      _loadGameAllPeopleRanking() {
        let type = 'allPerson';
        let count = 20;
        api.loadGameScoreRanking(type, count, this.allPeopleCursor).then(res => {
          //console.log('战神榜全部排行信息----------------', res)
          this.allPeopleList = res.scoreRanking.gameScoreInfos;
          this.allPeopleCursor = res.scoreRanking.cursor;
        })
      },
      switchTabIndex0() {
        this.tabIndex = 0
        this.isFriendList = true;
      },
      switchTabIndex1() {
        this.tabIndex = 1;
        this.isFriendList = false;
      },
    },
    components: {
      ButtonTab,
      ButtonTabItem,
      myHeader,
      Scroll
    }
  }
</script>

<style scoped lang='less'>
  .vux-button-group>a.vux-button-tab-item-last:after,
  .vux-button-group>a.vux-button-tab-item-first:after {
    border-right: 1px solid #ffd800;
    border-top: 1px solid #ffd800;
    border-bottom: 1px solid #ffd800;
    border: 1px solid #ffd800;
  }
  .vux-button-group>a.vux-button-group-current {
    background: #ffd800;
  }
  .marsRank_wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    .header {
      height: 2.2667rem;
      box-sizing: border-box;
      .tabBox {
        padding-top: 0.1333rem;
      }
    } // .body {
    //   flex: 1;
    //   width: 100%;
    .scrollList {
      flex: 1;
      width: 100%;
      .marsList {
        width: 100%;
        .mars-item-title {
          width: 100%;
          font-size: 0.4rem;
          display: flex;
          justify-content: space-around;
          .title_item {
            // box-sizing: border-box;
            // padding-top: 0.2667rem;
            width: 25%;
            text-align: center;
          }
        }
        .mars-item {
          width: 100%;
          font-size: 0.4rem;
          display: flex;
          justify-content: space-around;
          &.own{
            background-color: #ffd800;
            color: #fff;
          }
          .title_item {
          
            width: 25%;
            text-align: center;
            .rankIcon {
              margin-top: 0.1667rem;
              width: 0.6333rem;
              height: 0.6333rem;
            }
          }
          .avatar-box,
          .name,
          .score,
          .rank {
            width: 25%;
            text-align: center;
            margin-top: 0.2133rem;
            display: inline-block;
          }
          .avatar {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
          }
        }
      }
      .noData {
        margin: 50% auto;
        font-size: 0.5333rem;
        color: #ccc;
        text-align: center;
      }
    } // }
  }
</style>
