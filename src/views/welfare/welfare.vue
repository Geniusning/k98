<template>
  <div id="welfare" class="welfare">
    <!-- logo -->
    <div class="logo-container">
      <div class="logo-wrapper">
        <swiper height="150px" v-if="oldPhoto_list.length>0" :show-dots="false" :auto="true" class="slider"
          :loop="true" :list="oldPhoto_list" v-model="index_pic"></swiper>
        <img v-else onclick="return false" :src="activityNoticeList.length>0?activityNoticeList[0].image:tempPic"
          alt style=" width: 9.2rem;height:100%">
      </div>
    </div>
    <!-- 分享有礼 -->
    <div class="share-wrapper" v-show="noCouponsFlag">
      <img onclick="return false" @click="shareNewFriend" src="../../assets/image/share_enter.png"
        class="shareEnter" alt>
    </div>
    <!-- 活动通知 -->
    <div v-show="activityNoticeList.length>0" style="background:#fff;padding:.2667rem">
      <div class="activity-wrapper">
        <div class="title">
          <span class="title_text">活动告示板</span>
        </div>
        <span class="oldPhotos linear_btn" v-if="oldPhoto_list.length>0" @click="gotoOldPhotos">往期照片</span>
        <ul class="activityList" v-if="activityNoticeList.length>0">
          <li class="item-active" v-for="(item,index) in activityNoticeList" :key="index">
            <img onclick="return false" :src="item.image" style="width:2.8533rem;height:2.1333rem"
              alt class="picActive">
            <div class="desc_box">
              <h2>主题：{{item.name}}</h2>
              <p class="desc">{{item.content}}</p>
              <div class="detailBtnBox">
                <div class="linear_btn" @click="showActivityDetail(item.activityID)">查看详情</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 团购 -->
    <div class="share-wrapper" v-if="groupShopInfo?groupShopInfo.isPutAway:false">
      <img class="product-img" :src="groupShopInfo.image" alt="">
      <img onclick="return false" @click="goToGroupShop(groupShopInfo.activityID)" src="../../assets/image/groupShop.png"
        class="shareEnter" alt>
    </div>
    <!-- 拼团有奖活动 -->
    <div class="share-wrapper" v-if="groupBookAwardInfo?groupBookAwardInfo.isPutAway:false">
      <img class="product-img" style="top:1.2rem" :src="groupBookAwardInfo.image" alt="">
      <img onclick="return false" @click="goToGroupBook(groupBookAwardInfo.activityID)" src="../../assets/image/groupBook.png"
        class="shareEnter" alt>
      <img class="award-product-img" style="top:1.2rem" :src="groupBookAwardInfo.awardImage" alt="">
      <img class="award-word" src="../../assets/image/11.png" alt="">
    </div>
    <!-- 大话骰动态 -->
    <div class="game-wrapper">
      <div v-if="isShowGameEntry" class="broadcasting-room linear_btn" @click="playGame">立即参与</div>
      <div class="game-content">
        <div class="title"><span class="title_text">大话排名赛</span></div>
        <div class="gamerule">
          <h3 class="intro_title">说明</h3>
          <p>1)被朋友邀请助战的，本期获奖奖品归朋友所有，下期开始归自己所有。</p>
          <p>2)比赛结束后，奖品直接存入获奖者"我的卡券"，到门店扫码核销，即可兑奖。</p>
          <p>3)详细规则及奖品，以门店现场解释为准。</p>
        </div>
        <div class="handle-wrapper">
          <button class="linear_btn btnRecord" style="width: 2rem" @click="goToGameRecord">查看往期赛事</button>
          <button class="linear_btn btnPlayGame" @click="goTobroadcastingRoom(arenaInfo.arenaID)"
            v-if="isShowGameEntry">比赛直播间</button>
        </div>
        <div class="line-box">
          <h4 class="game-result">本期比赛奖品</h4>
        </div>
        <div ref="rankList">
          <ul class="rankList" v-if="gameShow">
            <li class="item" v-for="(item,index) in rankList" :key="index">
              <div class="itemLeft">
                <p class="rank" :class="{first:index===0,second:index===1,third:index===2}">第{{index+1}}名</p>
              </div>
              <div class="itemright">
                <p class="prize">奖品：{{item.content}}</p>
                <!-- <p class="limit">限制：{{item.limit}}</p> -->
              </div>
            </li>
          </ul>
          <p v-else class="noGame">暂无比赛</p>
        </div>
      </div>
      <!-- <div class="handle-wrapper">
                <button class="btnRecord" @click="goToGameRecord">查看往期赛事</button>
                <button class="btnPlayGame" @click="playGame" v-if="isShowGameEntry">立即参与></button>
            </div>-->
    </div>
    <!-- 人人抽奖 -->
    <!-- <div class="game-wrapper">
                 <div class="game-content">
                   <div class="title">人人抽奖动态</div>
                   <div class="gamerule">
                      <strong>活动规则：</strong>这是游戏规则这是游戏规则这是游戏规则这是游戏规则这是游戏规则这是游
                     <span class="join" @click="choujiang">立即抽奖</span>
                   </div>
                   <div class="line-box">
                      <h4 class="game-result">抽奖公告</h4>
                   </div>
                     <div class="swiper-container award">
                        <div class="swiper-wrapper">
                          <div class="swiper-slide">
                             <ul class="rankList">
                              <li class="item" v-for="(item,index) in rankList2">
                                <div class="itemLeft">
                                  <img onclick="return false" :src="item.imgUrl" alt="" class="avatar">
                                  <p class="name">{{item.name}}{{item.content}}</p>
                                </div>
                                <div class="itemright">
                                  <p class="prize">{{item.time}}</p>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div class="swiper-slide">
                             <ul class="rankList">
                              <li class="item" v-for="(item,index) in rankList2">
                                <div class="itemLeft">
                                  <img onclick="return false" :src="item.imgUrl" alt="" class="avatar">
                                  <p class="name">{{item.name}}{{item.content}}</p>
                                </div>
                                <div class="itemright">
                                  <p class="prize">{{item.time}}</p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                 </div>
          </div>-->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script type='text/ecmascript-6'>
import { Swiper } from 'vux'
import util from 'common/util'
import api from 'common/api'
import Config from 'common/config'
import { mapState, mapMutations } from 'vuex'
import Scroll from '../../base/scroll/scroll.vue'
export default {
  data() {
    return {
      tempPic: require('../../assets/image/attention.png'),
      title: '游戏期数',
      gameShow: false,
      isShowGameEntry: false,
      oldPhoto_list: [],
      index_pic: 0,
      // gameValue: ['第一期'],
      rankList: [],
      arenaInfo: {},
      arenaID: '',
      groupShopInfo: null,
      groupBookAwardInfo: null,
      openGroupId: ''
    }
  },
  computed: {
    ...mapState([
      'baseUrl',
      'shareUrl',
      'activityNoticeList',
      'noCouponsFlag',
      'AdvertisingPhoto',
      'shopSettingInfo',
      'userInfo'
    ])
  },
  created() {
    util.addVisitRecord(this.$route.name)
    this.loadActivityInfo() //获取活动通知

    this.loadPublishArenas() //拉取是否有比赛场
    this.loadOldPhotos()
  },
  activated() {
    this.judgeHasGroupShop() //判断是否有团购信息
    this.judgeHasGroupBookAward() //判断是否有拼团有奖活动
    setTimeout(() => {
      let shareObj = {
        title: '活动进行中…快来吧，就缺你啦！',
        desc: '群友聚会、大话比赛、福利大派送',
        link: `${this.shareUrl}#/welfare?visitType=12&phone=${
          this.userInfo.phone
        }&role=${this.userInfo.role}&openId=${this.userInfo.openid}`,
        imgUrl: `${this.shopSettingInfo.image}`
      }
      util.setShareInfo(shareObj, 20, 'activity', this.shareGetJifen)
    }, 2000)
  },
  methods: {
    // //分享获得积分
    shareGetJifen(amount, shareType) {
      api.shareToGetIntegral(amount, shareType).then(res => {
        if (res.errCode == 1030) {
          alert('分享已上限，每天最多分享5次获得积分')
        }
      })
    },
    gotoOldPhotos() {
      this.$router.push({
        name: 'oldPhotos'
      })
      this.saveOldPhotos(this.oldPhoto_list)
    },
    //拉取往期告示牌图片
    loadOldPhotos() {
      api.loadOldPhotos().then(res => {
        console.log('告示牌-----', res)
        let swiperList = []
        if (res.info.length > 0) {
          res.info.forEach((item, index) => {
            swiperList.push({
              url: 'javascript:',
              img: item.imageUrl,
              title: item.desc
            })
          })
          this.oldPhoto_list = swiperList
        }
      })
    },
    //拉取已经发布的比赛场
    loadPublishArenas() {
      api.loadPublishArenas().then(res => {
        //console.log("---------------------",res)
        var reverseArr = res.arenaInfos.reverse()
        //console.log('拉取已经发布的比赛场:', reverseArr)
        if (reverseArr.length > 0) {
          this.gameShow = true
          this.isShowGameEntry = true
          let arenaInfo = res.arenaInfos[0]
          this.arenaID = arenaInfo.arenaID
          this.arenaInfo = arenaInfo
          var typeCoupon = ['firstPrize', 'secondPrize', 'thirdPrize']
          for (let i = 0; i < typeCoupon.length; i++) {
            switch (arenaInfo[typeCoupon[i]].type) {
              case 0:
                arenaInfo[typeCoupon[i]].content =
                  arenaInfo[typeCoupon[i]].value + '元现金券'
                break
              case 1:
                arenaInfo[typeCoupon[i]].content =
                  arenaInfo[typeCoupon[i]].content
                break
              case 2:
                arenaInfo[typeCoupon[i]].content =
                  arenaInfo[typeCoupon[i]].value + '折扣券'
                break
              case 3:
                arenaInfo[typeCoupon[i]].content =
                  arenaInfo[typeCoupon[i]].content + '兑换券'
                break
              default:
                arenaInfo[typeCoupon[i]].content = '其他券'
                break
            }
          }
          this.rankList[0] = arenaInfo.firstPrize
          this.rankList[1] = arenaInfo.secondPrize
          this.rankList[2] = arenaInfo.thirdPrize
        }
        //console.log('this.rankList------------------', this.rankList)
      })
    },
    //查看往期赛事
    goToGameRecord() {
      this.$router.push({
        name: 'gameRecord'
      })
    },
    //进入直播间
    goTobroadcastingRoom(arenaID) {
      this.$router.push({
        name: 'gameRank',
        params: {
          arenaID: arenaID
        }
      })
    },
    //拉取活动通知
    loadActivityInfo() {
      api.loadActivityInfo().then(res => {
        //console.log("活动通知列表-------------",res)
        this.getActivityNoticeList(res.slice(0, 2))
      })
    },
    //判断是否有团购活动
    judgeHasGroupShop() {
      api.judgeHasGroupShop().then(res => {
        if (res.errCode === 0) {
          console.log('res团购', res)
          if (res.info.myJoinGroupShopList.length > 0) {
            this.openGroupId = res.info.myJoinGroupShopList[0].id
          }
          this.groupShopInfo = res.info
        }
      })
    },
    //判断是否有拼团有奖 活动
    judgeHasGroupBookAward() {
      api.judgeHasGroupBookAward().then(res => {
        if (res.errCode === 0) {
          console.log('拼团', res)
          if (res.info.myJoinGroupShopList.length > 0) {
            let tempArr = res.info.myJoinGroupShopList
            for (let index = 0; index < tempArr.length; index++) {
              const element = tempArr[index]
              if (element.status) {
                this.bookOpenGroupId = element.id
                break
              }
            }
          }

          this.groupBookAwardInfo = res.info
        }
      })
    },
    //进入一元团购
    goToGroupShop(id) {
      this.$router.push({
        path: `/oneYuan`,
        query: {
          groupShopInfoId: id,
          openGroupId: this.openGroupId
        }
      })
    },
    //进入拼团有奖
    goToGroupBook(id) {
      this.$router.push({
        path: `/pinTuan`,
        query: {
          groupBookAwardId: id,
          openGroupId: this.bookOpenGroupId
        }
      })
    },
    //进入分享有礼
    shareNewFriend() {
      this.$router.push({
        name: 'shareNew'
      })
    },
    showActivityDetail(activityID) {
      this.$router.push({
        path: '/shareActivity/' + activityID
      })
    },
    //进入游戏
    playGame() {
      window.location.href = `${this.baseUrl}/game/?gamePath=game2`
    },
    ...mapMutations({
      getActivityNoticeList: 'GET_ACTIVITY_NOTICE', //获取活动通知
      saveOldPhotos: 'SAVEOLDPHOTOS' //获取活动通知
    })
    //抽奖
    // choujiang() {
    //   // this.$router.push({
    //   //   path: `/welfare/award`
    //   // });
    // }
  },
  components: {
    Scroll,
    Swiper
  }
}
</script>

<style scoped lang='less'>
@import '../../libs/swiper/swiper-4.3.3.min.css';
@import '../../assets/less/variable.less';
@import '../../assets/less/btn.less';
@import '../../assets/less/mixin.less';
.weui-cells {
  margin-top: 0 !important;
}
.rankList {
  // height: 4rem;
  box-sizing: border-box;
  padding: 0 0.2667rem;
  .item {
    margin-top: 0.3rem;
    display: flex;
    justify-content: flex-start;
    .itemLeft {
      .rank {
        padding-top: 0.1333rem;
        font-size: 0.3733rem;
        color: #333;
        font-weight: 600;
        margin-right: 0.4rem;
      }
      .first {
        color: #ff0000;
      }
      .second {
        color: gold;
      }
      .third {
        color: orange;
      }
    }
    .itemright {
      display: flex;
      justify-content: flex-start;
      .prize {
        width: 4.3333rem;
        text-align: left;
        padding-top: 0.1333rem;
        font-size: 0.3467rem;
      }
      .limit {
        padding-top: 0.1333rem;
        font-size: 0.3467rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.noGame {
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  font-size: 0.4rem;
  font-weight: 800;
  color: #ccc;
}
.welfare {
  height: 100%;
  overflow-y: auto;
  background-color: #f1f1f1;
  background-origin: content-box;
  background-repeat: no-repeat;
  background-size: 100%;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    img {
      width: 100px;
      height: 100px;
      position: absolute;
      right: 0;
    }
  }
  .logo-container {
    padding-top: 0.16rem;
    background-color: #fff;
    height: 3.6rem;
    .bg('../../assets/image/welfare_bg.png');
  }
  .logo-wrapper {
    position: relative;
    width: 9.2rem;
    height: 3.6rem;
    // background-color: #fff;
    margin: 0 auto;
    .reserve {
      position: absolute;
      color: #fff;
      top: 0.1333rem;
      left: 0.1333rem;
      padding: 0.08rem 0.3733rem;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 0.2667rem;
    }
  }
  .share-wrapper {
    padding-top: 0.1867rem;
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    margin-top: 0.3rem;
    position: relative;
    .product-img,
    .award-product-img {
      position: absolute;
      width: 1.8rem;
      height: 1.2rem;
      top: 1rem;
    }
    .product-img {
      left: 2.2rem;
    }
    .award-product-img {
      right: 2rem;
    }
    .award-word {
      position: absolute;
      width: 0.6rem;
      height: 0.6rem;
      top: 1rem;
      right: 3.5rem;
    }
    .shareEnter {
      width: 100%;
    }
  }
  .game-wrapper {
    height: 10.5667rem;
    background-color: #fff;
    margin-top: 0.1333rem;
    padding: 0.2667rem;
    box-sizing: border-box;
    position: relative;
    .broadcasting-room {
      position: absolute;
      top: 0.6667rem;
      right: 0.4667rem;
    }
    .game-content {
      width: 9.4667rem;
      height: 9.9rem;
      background-color: #f1f1f1;
      box-sizing: border-box;
      .title {
        width: 4.32rem;
        height: 0.8rem;
        background-color: transparent;
        font-size: 0.4267rem;
        font-weight: bold;
        color: #f1f1f1;
        text-align: center;
        box-sizing: border-box;
        padding-top: 0.1133rem;
        position: relative;
        letter-spacing: 0.133rem;
        &.title::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 1;
          border-bottom: 1px solid;
          border-radius: 0 0.1567rem 0.1567rem 0;
          background: -webkit-linear-gradient(top, #fd3a49, #f75a2d);
          // box-shadow: 0 0.15em #f1f1f1 inset;
          transform: scale(1.1, 1.3) perspective(0.5em) rotateX(-5deg);
          transform-origin: top left;
        }
        .title_text {
          width: 100%;
          top: 0.15rem;
          position: absolute;
          z-index: 2;
          left: -0.2333rem;
        }
      }
      .gamerule {
        font-size: 0.3733rem;
        color: #666;
        padding: 0.2933rem 0.2667rem;
        position: relative;
        width: 100%;
        box-sizing: border-box;
        .intro_title {
          font-size: 0.4267rem;
          font-weight: 800;
          color: #333;
        }
      }
      .line-box {
        margin: 0.5333rem auto 0;
        height: 2px;
        width: 90%;
        background-color: #ffe200;
        position: relative;
        .game-result {
          position: absolute;
          text-align: center;
          margin-left: -1.4rem;
          top: -0.31rem;
          left: 50%;
          color: #333;
          font-weight: 600;
          font-size: 0.4267rem;
          width: 2.9333rem;
          height: 0.6rem;
          background-color: #f1f1f1;
        }
      }
    }
    .handle-wrapper {
      display: flex;
      justify-content: space-around;
      padding-top: 0.4667rem;
      box-sizing: border-box;
      .btnRecord,
      .btnPlayGame {
        // width: 2.8667rem;
        border: none;
        outline: none;
      }
    }
  }
  .activity-wrapper {
    background-color: #f1f1f1;
    padding-bottom: 0.22rem;
    position: relative;

    .title {
      width: 4.32rem;
      height: 0.8rem;
      font-size: 0.4267rem;
      font-weight: bold;
      color: #fff;
      text-align: center;
      box-sizing: border-box;
      padding-top: 0.1133rem;
      position: relative;
      &.title::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        border-bottom: 1px solid;
        border-radius: 0 0.1567rem 0.1567rem 0;
        background: -webkit-linear-gradient(
          top,
          #fd3a49,
          #f75a2d
        ); // box-shadow: 0 0.15em #f1f1f1 inset;
        transform: scale(1.1, 1.3) perspective(0.5em) rotateX(-5deg);
        transform-origin: top left;
      }
      .title_text {
        width: 100%;
        position: absolute;
        z-index: 2;
        top: 0.13rem;
        left: -0.2333rem;
        letter-spacing: 0.133rem;
      }
    }
    .oldPhotos {
      position: absolute;
      top: 0.1667rem;
      right: 0.2667rem;
    }
    .activityList {
      .item-active {
        margin-top: 0.48rem;
        padding: 0 0.2667rem;
        display: flex;
        justify-content: flex-start;
        position: relative;
        .picActive {
          width: 2.8533rem;
          height: 2.1333rem;
        }
        .desc_box {
          flex: 1;
          padding-left: 0.2667rem;
          h2 {
            font-size: 0.33rem;
            font-weight: 900;
          }
          .desc {
            font-size: 0.3rem;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .detailBtnBox {
            text-align: right;
            position: absolute;
            bottom: -0.1rem;
            right: 0.2667rem;
          }
        }
      }
    }
  }
}
.vux-cell-box:not(:first-child):before {
  border: none;
}
</style>
