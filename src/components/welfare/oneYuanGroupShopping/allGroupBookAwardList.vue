<template>
  <div class="all-opened-group">
    <my-header title="已开团列表" bg="#fff"></my-header>
    <header v-if="allGroupBookList.length">
      <img src="../../../assets/image/11.png" class="gou" alt="">
      <span class="desc">即将成团，马上加入</span>
    </header>
    <main v-if="allGroupBookList.length">
      <ul class="group-list">
        <li class="group-info" v-for="(item,index) in allGroupBookList" :key="index">
          <img class="avatar" :src="item.joinGroupBookAwardInfo.headImgUrls.headImgUrls[0]" alt="">
          <span class="nickname">{{item.opener}}</span>
          <span v-if="item.joinGroupBookAwardInfo.status && (item.groupBookAwardInfo.personNums != item.joinGroupBookAwardInfo.headImgUrls.headImgUrls.length) " class="PersonsNums">
            还差{{item.groupBookAwardInfo.personNums-item.joinGroupBookAwardInfo.headImgUrls.headImgUrls.length}}人
          </span>
          <span v-else-if="!item.joinGroupBookAwardInfo.status && (item.groupBookAwardInfo.personNums == item.joinGroupBookAwardInfo.headImgUrls.headImgUrls.length)" class="PersonsNums">已成团</span>
          <span v-else class="PersonsNums">已过期</span>
          <CountDown style="color:red" :time="item.joinGroupBookAwardInfo.interval">
            <template #default="timeData" format="DD 天 HH:mm:ss">
              <span class="block">{{ timeData.days }}</span>
              <span class="colon">天</span>
              <span class="block">{{ timeData.hours }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.minutes<10?'0'+timeData.minutes: timeData.minutes}}</span> <span class="colon">:</span>
              <span class="block">{{ timeData.seconds<10?'0'+timeData.seconds:timeData.seconds }}</span> </template> </CountDown> <span class="arrow" @click="goToDetail(item.joinGroupBookAwardInfo.id)">&gt;</span>
        </li>
      </ul>
    </main>
    <main v-else class="noData">
      暂无拼团内容
    </main>
  </div>
</template>

<script>
import { CountDown } from 'vant';
import myHeader from "../../../base/myheader/myheader";
import api from "common/api";
import util from "common/util";
export default {
  data () {
    return {
      isCountingDownTime: 0,
      allGroupBookList: []
    }
  },
  created () {
    console.log("this.$route=", this.$route)
    this.groupBookAwardId = this.$route.params.groupBookAwardId
    this.loadAllOpenGroupList()
  },
  // props: ["openGroupInfoList"],
  components: {
    myHeader,
    CountDown,
  },
  methods: {
    goToDetail (id) {
      this.$router.push({
        path: `/pinTuan`,
        query: {
          groupBookAwardId: this.groupBookAwardId,
          openGroupId: id
        }
      })
    },
    loadAllOpenGroupList () {
      api.loadAllOpenGroupList(this.groupBookAwardId).then(res => {
        console.log("全部团列表=", res)
        if (res.errCode === 0) {

          let joinGroupBookAwardInfoArr = res.info
          joinGroupBookAwardInfoArr.forEach(item => {
            item.joinGroupBookAwardInfo.interval = item.joinGroupBookAwardInfo.interval * 1000 - new Date().getTime()
            // if (item.joinGroupBookAwardInfo.interval && item.joinGroupBookAwardInfo.status) {
            //   return item
            // }
            if (item.joinGroupBookAwardInfo.interval < 0) {
              item.joinGroupBookAwardInfo.interval = 0
            }
            this.allGroupBookList.unshift(item)
          });
          console.log("this.allGroupBookList=", this.allGroupBookList)
          this.allGroupBookList = this.allGroupBookList.sort(util.sortByKey("interval"))
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.all-opened-group {
  header {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin: 0.3rem 0;
    .gou {
      width: 0.6667rem;
      height: 0.6667rem;
    }
    .desc {
      font-size: 0.5rem;
      margin-left: 0.2rem;
      color: red;
    }
  }
  main {
    .group-list {
      .group-info {
        display: flex;
        justify-content: space-around;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 0.1rem;
        font-weight: 800;
        .avatar {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
        .nickname,
        .PersonsNums,
        .arrow {
          font-weight: 800;
          font-size: 16px;
        }
        .nickname,
        .PersonsNums {
          display: inline-block;
          width: 2rem;
          text-align: left;
          overflow: hidden;
        }
      }
    }
  }
  .noData {
    text-align: center;
    font-size: 18px;
    margin-top: 4rem;
    color: #ccc;
  }
}
</style>
