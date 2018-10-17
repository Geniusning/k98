<template>
 <div id="gameRecord" class="gameRecord-wrapper">
    <my-header title="往期赛事"></my-header>
    <div class="content vux-1px-t">
        <scroll ref="gameRecordList" class="scrollGameList" :data='gameList'>
            <ul class="list">
                <li class="list_Item vux-1px-b" v-for="(item,index) in gameList" :key="index">
                    <p class="time">{{item.value}}</p>
                    <p class="handle" @click="getDetailGameInfo(item.key)">点击查看></p>
                </li>
            </ul>
        </scroll>
    </div>
    <router-view></router-view>
 </div>
</template>

<script type='text/ecmascript-6'>
import MyHeader from "base/myheader/myheader";
import Scroll from 'base/scroll/scroll';
import api from 'common/api';
import util from 'common/util';
export default {
    data() {
        return {
            gameList: [],
        }
    },
    mounted() {
        this._loadAllArenaInfo();
    },
    methods: {
        //拉取比赛按照结束时间重新排名
        _loadAllArenaInfo() {
            api.loadAllArenaInfo().then(res => {
                console.log('比赛排名赛事--------------------', res);
                let tempGameList = [];
                res.arenaInfos.forEach(item => {
                    tempGameList.push({
                        key: item.arenaID,
                        value: util.timestampToTime(item.endTime)
                    })
                })
                console.log('tempGameList---------------------', tempGameList)
                this.gameList = tempGameList;
                console.log(this.gameList)
            })
        },
        getDetailGameInfo(key) {
            this.$router.push({
                path: `/gameRecord/${key}`
            })
        }
    },
    components: {
        MyHeader,
        Scroll
    }
}
</script>

<style scoped lang='less'>
.gameRecord-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    .scrollGameList {
      height: 100%;
      .list {
        height: 6.6667rem;
        .list_Item {
          display: flex;
          justify-content: space-between;
          padding: 0.2667rem 0.4rem;
          .time {
            font-size: 0.3733rem;
          }
          .handle {
            font-size: 0.3733rem;
          }
        }
      }
    }
  }
}
</style>
