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
    <div class="body">
      <div class="body-left" v-if="!isFriendList">
        <scroll ref="scrollList" class="scrollList">
          <ul class="treasureList">
            <li class="treasure-item-title">
              <div class="title_item">头像</div>
              <div class="title_item">名字</div>
              <div class="title_item">积分</div>
              <div class="title_item">操作</div>
            </li>
            <li class="treasure-item">
              <div class="avatar-box">
                <img src='../../../assets/image/small_car.png' alt class="avatar">
              </div>
              <div class="name">大毛</div>
              <div class="score">11</div>
              <div class="rank">充值</div>
            </li>
          </ul>
        </scroll>
      </div>
       <div class="body-right" v-else>
        <scroll ref="scrollList" class="scrollList">
          <ul class="treasureList">
            <li class="treasure-item-title">
              <div class="title_item">头像</div>
              <div class="title_item">名字</div>
              <div class="title_item">积分</div>
              <div class="title_item">操作</div>
            </li>
            <li class="treasure-item">
              <div class="avatar-box">
                <img src='../../../assets/image/small_house.png' alt class="avatar">
              </div>
              <div class="name">大毛</div>
              <div class="score">11</div>
              <div class="rank">充值</div>
            </li>
             <li class="treasure-item">
              <div class="avatar-box">
                <img src='../../../assets/image/small_house.png' alt class="avatar">
              </div>
              <div class="name">大毛</div>
              <div class="score">11</div>
              <div class="rank">充值</div>
            </li>
             <li class="treasure-item">
              <div class="avatar-box">
                <img src='../../../assets/image/small_house.png' alt class="avatar">
              </div>
              <div class="name">大毛</div>
              <div class="score">11</div>
              <div class="rank">充值</div>
            </li>
          </ul>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { ButtonTab, ButtonTabItem } from 'vux';
import myHeader from 'base/myheader/myheader';
import Scroll from 'base/scroll/scroll'
export default {
  data() {
    return {
      tabIndex: 0,
      isFriendList:true,
    }
  },
  methods: {
    switchTabIndex0() {
      this.tabIndex = 0
      this.isFriendList = false;
    },
    switchTabIndex1() {
      this.tabIndex = 1;
      this.isFriendList = true;
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
.vux-button-group > a.vux-button-tab-item-last:after,.vux-button-group > a.vux-button-tab-item-first:after {
  border-right: 1px solid #ffd800;
    border-top: 1px solid #ffd800;
    border-bottom: 1px solid #ffd800;
    border: 1px solid #ffd800;
}
.vux-button-group > a.vux-button-group-current{
  background: #ffd800;
}
.treasureRank_wrapper{
  display: flex;
  flex-direction: column;
  height: 100%;
  .header{
    height: 2.2667rem;
    box-sizing: border-box;
    .tabBox{
      padding-top: 0.1333rem;
    }
  }
  .body{
    flex: 1;
    width: 100%;
    .scrollList{
      height: 100%;
       width: 100%;
      .treasureList{
        width: 100%;
        height: 100%;
        .treasure-item-title{
          width: 100%;
          font-size: 0.4rem;
          display: flex;
          justify-content: space-around;
          .title_item{
            width: 25%;
            text-align: center;
          }
        }
        .treasure-item{
            width: 100%;
          font-size: 0.4rem;
          display: flex;
          justify-content: space-around;
          margin-top: 0.1333rem;
          .avatar-box,.name,.score,.rank{
            width: 25%;
            text-align: center;
          }
          .avatar{
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
          }
        
        }
      }
    }
  }
}
</style>
