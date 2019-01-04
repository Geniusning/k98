<template>
  <div class="treasureRank_wrapper">
    <div class="header">
      <my-header title="财富榜" ref="header"></my-header>
      <div class="tabBox vux-1px-t">
        <button-tab v-model="tabIndex">
          <button-tab-item @on-item-click="switchTabIndex0">社群排名</button-tab-item>
          <button-tab-item @on-item-click="switchTabIndex1">好友排名</button-tab-item>
        </button-tab>
      </div>
    </div>
    <!-- <div class="body"> -->
    <!-- <div class="body-left" v-if="isFriendList"> -->
    <scroll ref="scrollList" class="scrollList" :data="allPeopleList">
      <ul class="treasureList" v-if="isFriendList">
        <li class="treasure-item-title">
          <div class="title_item">头像</div>
          <div class="title_item">名字</div>
          <div class="title_item">积分数</div>
          <div class="title_item">排名</div>
        </li>
        <li class="treasure-item-title">
          <p v-if="!allPeopleList.length" class="noData">暂无数据</p>
        </li>
        <li class="treasure-item" v-for="(item,index) in allPeopleList" :key="index">
          <div class="avatar-box">
            <img :src="item.headImgURL" alt class="avatar">
          </div>
          <div class="name">{{item.nickName}}</div>
          <div class="score">{{item.wealth}}</div>
          <div class="title_item">
            <img v-if="index===0" src="../../../assets/image/img_rank1.png" alt class="rankIcon">
            <img v-else-if="index===1" src="../../../assets/image/img_rank2.png" alt class="rankIcon">
            <img v-else-if="index===2" src="../../../assets/image/img_rank3.png" alt class="rankIcon">
            <div v-else class="rank">{{index+1}}</div>
          </div>
        </li>
      </ul>
      <ul class="treasureList" v-else>
        <li class="treasure-item-title">
          <div class="title_item">头像</div>
          <div class="title_item">名字</div>
          <div class="title_item">积分数</div>
          <div class="title_item">排名</div>
        </li>
        <li class="treasure-item-title">
          <p v-if="!friendList.length" class="noData">暂无数据</p>
        </li>
        <li class="treasure-item" v-for="(item,index) in friendList" :key="index">
          <div class="avatar-box">
            <img :src="item.headImgURL" alt class="avatar">
          </div>
          <div class="name">{{item.nickName}}</div>
          <div class="score">{{item.wealth}}</div>
          <div class="title_item">
            <img v-if="index===0" src="../../../assets/image/img_rank1.png" alt class="rankIcon">
            <img v-else-if="index===1" src="../../../assets/image/img_rank2.png" alt class="rankIcon">
            <img v-else-if="index===2" src="../../../assets/image/img_rank3.png" alt class="rankIcon">
            <div v-else class="rank">{{index+1}}</div>
          </div>
        </li>
      </ul>
    </scroll>
    <!-- </div> -->
    <!-- <div class="body-right" v-else>
          <scroll ref="scrollList" class="scrollList" :data='friendList' v-else>
            <ul class="treasureList">
              <li class="treasure-item-title">
                <div class="title_item">头像</div>
                <div class="title_item">名字</div>
                <div class="title_item">积分数</div>
                <div class="title_item">排名</div>
              </li>
              <li class="treasure-item" v-for="(item,index) in friendList" :key="index">
                <div class="avatar-box">
                  <img :src="item.headImgURL" alt class="avatar">
                </div>
                <div class="name">{{item.nickName}}</div>
                <div class="score">{{item.wealth}}</div>
                <div class="title_item">
                  <img v-if="index===0" src="../../../assets/image/img_rank1.png" alt class="rankIcon">
                  <img v-else-if="index===1" src="../../../assets/image/img_rank2.png" alt class="rankIcon">
                  <img v-else-if="index===2" src="../../../assets/image/img_rank3.png" alt class="rankIcon">
                  <div v-else class="rank">{{index+1}}</div>
                </div>
              </li>
            </ul>
          </scroll>
      </div>-->
    <!-- </div> -->
  </div>
</template>

<script type='text/ecmascript-6'>
  import {
    ButtonTab,
    ButtonTabItem
  } from 'vux';
  import myHeader from 'base/myheader/myheader';
  import Scroll from 'base/scroll/scroll'
  import api from 'common/api'
  export default {
    data() {
      return {
        tabIndex: 0,
        isFriendList: true,
        allPeopleList: [],
        friendList: [],
        allPeopleCursor: 0
      }
    },
    mounted() {
      this._loadWealthRanking();
      this._loadWealthAllPeopleRanking();
    },
    methods: {
      //拉取财富排行
      _loadWealthRanking() {
        let type = 'friend';
        api.loadWealthRanking(type).then(res => {
          console.log('财富好友排行信息----------------', res);
          if (res.errCode === 0) {
            this.friendList = res.wealthRanking.wealthInfos
          }
        })
      },
      _loadWealthAllPeopleRanking() {
        let type = 'allPerson';
        let count = 20;
        api.loadWealthRanking(type, count, this.allPeopleCursor).then(res => {
          console.log('财富全部排行信息----------------', res)
          this.allPeopleList = res.wealthRanking.wealthInfos;
          this.allPeopleCursor = res.wealthRanking.cursor;
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
  .treasureRank_wrapper {
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
    // .body-left {
    //   overflow: hidden;
    //   height: 100%;
    // }
    .scrollList {
      flex: 1;
      width: 100%;
      overflow: hidden;
      .treasureList {
        width: 100%; // height: 6rem;
        .treasure-item-title {
          width: 100%;
          font-size: 0.4rem;
          display: flex;
          justify-content: space-around;
          .title_item {
            width: 25%;
            text-align: center;
          }
          .noData {
            margin: 50% auto;
            font-size: 0.5333rem;
            color: #ccc;
            text-align: center;
          }
        }
        .treasure-item {
          width: 100%;
          font-size: 0.4rem;
          display: flex;
          justify-content: space-around;
          margin-top: 0.1333rem;
          .title_item {
            width: 25%;
            text-align: center;
          }
          .rankIcon {
            width: 0.6333rem;
            height: 0.6333rem;
          }
          .avatar-box,
          .name,
          .score,
          .rank {
            margin-top: 0.2133rem;
            width: 25%;
            text-align: center;
            display: inline-block;
          }
          .avatar {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
          }
        }
      }
    } // }
  }
</style>
