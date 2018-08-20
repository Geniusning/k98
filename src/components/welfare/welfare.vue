<template>
 <div id="welfare" class="welfare">
   <!-- logo -->
   <div class="logo-container">
      <div class="logo-wrapper">
        <p class="reserve">
          优惠进行中 预定热线<span class="tel">0755-2314499</span>
        </p>
        <p class="shopName">深圳魅力四射酒吧</p>
      </div>
   </div>
   <!-- 分享有礼 -->
   <div class="share-wrapper">
     <img @click="shareNewFriend" src="../../assets/image/share_enter.png" class="shareEnter" alt="">
     <!-- <div class="share-box">
        <div class="btn" @click="share">邀新有礼</div>
        <ul class="shareList">
          <li class="item">
            <div class="price-Box">
               <p class="price">10元</p>
               <p class="">领取后次日使用有效</p>
            </div>
              <p class="desc">新人礼包</p>
          </li>
           <li class="item">
             <div class="price-Box">
               <p class="price">啤酒3瓶</p>
               <p class="">领取后即可使用</p>
            </div>
              <p class="desc">成功邀请可获取</p>
          </li>
        </ul>
     </div> -->
   </div>
     <!-- 分享有礼遮罩 -->
     <div class="bg" v-show="isShow_bg" @click="share">
         <img  src="../../assets/image/share.png" alt="">
     </div>
     <!-- 大话骰动态 -->
     <div class="game-wrapper">
       <div class="game-content">
         <div class="title">大话骰排名赛动态</div>
         <div class="gamerule">
            <strong>活动规则：</strong>这是游戏规则这是游戏规则这是游戏规则这是游戏规则这是游戏规则这是游
           <span class="join">立即参与</span>
         </div>
         <div class="line-box">
            <h4 class="game-result">赛果公告</h4>
         </div>
           <div class="swiper-container game">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <ul class="rankList">
                    <li class="item" v-for="(item,index) in rankList1">
                      <div class="itemLeft">
                        <p class="rank" :class="{first:index===0,second:index===1,third:index===2}">{{item.rank}}</p>
                        <img :src="item.imgUrl" alt="" class="avatar">
                        <p class="name">{{item.name}}</p>
                      </div>
                      <div class="itemright">
                        <p class="prize">奖品：{{item.prize}}</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="swiper-slide">
                   <ul class="rankList">
                    <li class="item" v-for="(item,index) in rankList2">
                      <div class="itemLeft">
                        <p class="rank">{{item.rank}}</p>
                        <img :src="item.imgUrl" alt="" class="avatar">
                        <p class="name">{{item.name}}</p>
                      </div>
                      <div class="itemright">
                        <p class="prize">奖品：{{item.prize}}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
       </div>
     </div>
     <!-- 人人抽奖 -->
     <div class="game-wrapper">
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
                        <img :src="item.imgUrl" alt="" class="avatar">
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
                        <img :src="item.imgUrl" alt="" class="avatar">
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
     </div>
      <!-- 活动通知 -->
      <div class="activity-wrapper">
          <div class="title">活动通知</div>
          <ul class="activityList">
            <li class="item">
              <img src="http://i1.bvimg.com/643118/d3ed6dbc589609a1.png" alt="" class="pic">
              <div>
                  <p class="desc">
                    天天向上约会今晚8点将驻点演唱，欢迎大家今晚前来观赏（现场将有抽奖活动哦）
                  </p>
                  <div class="detailBtnBox">
                    <button class="btn" @click="showActivityDetail">查看详情</button>
                  </div>
              </div>
            </li>
             <li class="item">
              <img src="http://i1.bvimg.com/643118/d3ed6dbc589609a1.png" alt="" class="pic">
              <div>
                  <p class="desc">
                    天天向上约会今晚8点将驻点演唱，欢迎大家今晚前来观赏（现场将有抽奖活动哦）
                  </p>
                  <div class="detailBtnBox">
                    <button class="btn"  @click="showActivityDetail">查看详情</button>
                  </div>
              </div>
            </li>
          </ul>
      </div>
      <router-view></router-view>
 </div>
</template>

<script type='text/ecmascript-6'>
import Swiper from "../../libs/swiper/swiper-4.3.3.min.js";
// import { Swiper, SwiperItem } from "vux";
import util from "common/util";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isShow_bg: false,
      rankList1: [
        {
          rank: "第一名",
          imgUrl: "http://i1.bvimg.com/643118/47aaa8265e29874c.jpg",
          name: "夏雨荷",
          prize: "一瓶XO"
        },
        {
          rank: "第二名",
          imgUrl: "http://i1.bvimg.com/643118/cd7b5471885e117f.jpg",
          name: "泰勒斯",
          prize: "免房费"
        },
        {
          rank: "第三名",
          imgUrl: "http://i1.bvimg.com/643118/96545237381246c7.jpg",
          name: "小夏河",
          prize: "代金券100元"
        }
      ],
      rankList2: [
        {
          rank: "第四名",
          time: "2018-12-30 8:30",
          content: "获得一张5元现金券",
          imgUrl: "http://i1.bvimg.com/643118/96545237381246c7.jpg",
          name: "夏雨荷",
          prize: "一盘水果"
        },
        {
          rank: "第五名",
          time: "2018-12-30 8:30",
          content: "获得一张免房券",
          imgUrl: "http://i1.bvimg.com/643118/cd7b5471885e117f.jpg",
          name: "泰勒斯",
          prize: "公仔一个"
        },
        {
          rank: "第六名",
          time: "2018-12-30 8:30",
          content: "获得一扎啤酒",
          imgUrl: "http://i1.bvimg.com/643118/cd7b5471885e117f.jpg",
          name: "小夏河",
          prize: "现金券50"
        }
      ]
    };
  },
  created() {
    let _url = window.location.href;
    if (util.isAndroid()) {
      let shareObj = {
        title: "这是一个圆你梦的city",
        desc: "如果我能看得见WO就是Android，就会轻易的假装到处遨游",
        link: `http://llwant.test.qianz.com?/#/welfare`,
        imgUrl: "http://i1.bvimg.com/643118/0c7ed06ec325ad1d.png"
      };
      util._getJssdkInfo(shareObj, _url);
    } else {
      let shareObj = {
        title: "这是一个圆你梦的city",
        desc: "如果我能看得见wo就是IOS，就会轻易的假装到处遨游",
        link: this.shareUrl + "#/welfare",
        imgUrl: "http://i1.bvimg.com/643118/0c7ed06ec325ad1d.png"
      };
      util._getJssdkInfo(shareObj, this.shareUrl);
    }
  },
  computed: {
    ...mapState(["shareUrl"])
  },
  mounted() {
    new Swiper(".game", {
      direction: "vertical",
      loop: true,
      autoplay: {
        delay: 2000 //1秒切换一次
      }
    });
    new Swiper(".award", {
      direction: "vertical",
      loop: true,
      autoplay: {
        delay: 3000 //1秒切换一次swiper-container-award
      }
    });
  },
  methods: {
    directRightUrl() {
      let { href, protocol, host, search, hash } = window.location;
      const param = "welfare"; // 解决支付路径问题添加的前缀，替换成你的
      search = search || "?";
      hash = hash || "#/";
      let newHref = `${protocol}//${host}${pathname}${search}${hash}${param}`;
      if (newHref !== href) {
        window.location.replace(newHref);
      }
    },
    //   分享
    share() {
      this.isShow_bg = !this.isShow_bg;
    },
    //进入分享有礼
    shareNewFriend() {
      this.$router.push({
        name: "shareNew"
      });
    },
    showActivityDetail() {
      this.$router.push({
        name: "shareActivity"
      });
    },
    //抽奖
    choujiang() {
      // this.$router.push({
      //   path: `/welfare/award`
      // });
    }
  },
  components: {},
  watch: {
    $route(newValue, oldValue) {
      console.log(newValue);
    }
  }
};
</script>

<style scoped lang='less'>
@import "../../libs/swiper/swiper-4.3.3.min.css";
@import "../../assets/less/variable.less";
@import "../../assets/less/welfare_common.less";
@import "../../assets/less/mixin.less";
.swiper-container,
.swiper-container-award {
  margin-top: 0.4rem;
}

.swiper-wrapper,
.swiper-wrapper-award {
  height: 4rem !important;
  padding: 0 0.5333rem;
  box-sizing: border-box;
}
.swiper-slide {
  height: 4rem !important;
  .rankList {
    .item {
      margin-top: 0.4rem;
      display: flex;
      justify-content: space-between;
      .itemLeft {
        display: flex;
        .rank {
          padding-top: 0.1333rem;
          font-size: 0.3733rem;
          color: #333;
          font-weight: 600;
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
        .avatar {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          margin: 0 0.1333rem;
        }
        .name {
          padding-top: 0.1333rem;
          font-size: 0.3467rem;
        }
      }
      .itemright {
        .prize {
          padding-top: 0.1333rem;
          font-size: 0.3467rem;
        }
      }
    }
  }
}
.swiper-slide-award {
  height: 4rem !important;
  .rankList {
    .item {
      margin-top: 0.4rem;
      display: flex;
      justify-content: space-between;
      .itemLeft {
        display: flex;
        .avatar {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          margin: 0 0.1333rem;
        }
        .name {
          padding-top: 0.1333rem;
          font-size: 0.3467rem;
        }
      }
      .itemright {
        .prize {
          padding-top: 0.1333rem;
          font-size: 0.3467rem;
        }
      }
    }
  }
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
    .bg("../../assets/image/welfare_bg.png");
  }
  .logo-wrapper {
    position: relative;
    width: 9.2rem;
    height: 2.8rem;
    background-color: #fff;
    .bg("../../assets/image/banner.png");
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
    .shopName {
      padding: 0.16rem 0.7467rem;
      background-color: #fff;
      color: #333;
      font-size: 0.4rem;
      position: absolute;
      bottom: -0.4333rem;
      left: 50%;
      margin-left: -2.4rem;
      border-radius: 0.3467rem;
    }
  }
  .share-wrapper {
    padding-top: 0.1867rem;
    box-sizing: border-box;
    // height: 4.2667rem;
    width: 100%;
    background-color: #fff;
    margin-top: 0.3rem;
    .shareEnter {
      width: 100%;
    }
    // .share-box {
    //   position: relative;
    //   width: 9.4667rem;
    //   height: 3.4133rem;
    //   border: 0.0533rem solid #ffe200;
    //   margin: 0 auto 0.2667rem;
    //   .btn {
    //     width: 4.2667rem;
    //     height: 0.9333rem;
    //     box-sizing: border-box;
    //     text-align: center;
    //     padding-top: 0.1rem;
    //     position: absolute;
    //     left: 50%;
    //     margin-left: -2.1rem;
    //     top: -0.45rem;
    //     font-size: 0.48rem;
    //     color: #ff0000;
    //     .bg("../../assets/image/share_btn.png");
    //   }
    //   .shareList {
    //     margin-top: 0.5867rem;
    //     display: flex;
    //     justify-content: space-around;
    //     .item {
    //       position: relative;
    //       width: 3.6533rem;
    //       height: 2.5867rem;
    //       .bg("../../assets/image/share_bg.png");
    //       .price-Box {
    //         width: 100%;
    //         position: absolute;
    //         color: #ff0000;
    //         text-align: center;
    //         top: 0.3rem;
    //         .price {
    //           font-weight: 700;
    //           font-size: 0.4467rem;
    //         }
    //         .yuan {
    //           font-size: 0.2933rem;
    //         }
    //       }
    //       .desc {
    //         width: 100%;
    //         position: absolute;
    //         font-size: 0.35rem;
    //         color: #ff0000;
    //         // background-color: #fff;
    //         border-radius: 0.2133rem;
    //         bottom: 0.1333rem;
    //         font-weight: 600;
    //         text-align: center;
    //         margin: 0 auto;
    //       }
    //     }
    //   }
    // }
  }
  .game-wrapper {
    height: 7.8667rem;
    background-color: #fff;
    margin-top: 0.1333rem;
    padding: 0.2667rem;
    box-sizing: border-box;
    .game-content {
      width: 9.4667rem;
      height: 7.3067rem;
      background-color: #f1f1f1;
      padding-top: 0.2933rem;
      box-sizing: border-box;
      .title {
        width: 4.32rem;
        height: 0.8rem;
        .bg("../../assets/image/btn_bg.png");
        font-size: 0.4267rem;
        font-weight: bold;
        color: #ff0000;
        text-align: center;
        box-sizing: border-box;
        padding-top: 0.1133rem;
        margin: 0 auto;
      }
      .gamerule {
        font-size: 0.3733rem;
        color: #666;
        margin: 0.2933rem 0.2667rem;
        .join {
          font-size: 0.4rem;
          color: #ff0000;
          text-decoration: underline;
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
          margin-left: -1.2rem;
          top: -0.21rem;
          left: 50%;
          color: #333;
          font-weight: 600;
          font-size: 0.4267rem;
          width: 2.3333rem;
          height: 0.8rem;
          background-color: #f1f1f1;
        }
      }
    }
  }
  .activity-wrapper {
    margin-top: 0.1333rem;
    background-color: #fff;
    padding-top: 0.32rem;
    height: 6.6667rem;
    .title {
      width: 4.32rem;
      height: 0.8rem;
      .bg("../../assets/image/btn_bg.png");
      font-size: 0.4267rem;
      font-weight: bold;
      color: #ff0000;
      text-align: center;
      box-sizing: border-box;
      padding-top: 0.1133rem;
      margin: 0 auto;
    }
    .activityList {
      .item {
        margin-top: 0.48rem;
        padding: 0 0.2667rem;
        display: flex;
        .pic {
          width: 2.8533rem;
          height: 2.1333rem;
        }
        .desc {
          margin-left: 0.2667rem;
          font-size: 0.3733rem;
          color: #333;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .detailBtnBox {
          text-align: right;
          button {
            border: none;
            outline: none;
            // width: 1.4667rem;
            padding: 0.08rem 0.1333rem;
            padding: 0.0867rem 0;
            text-align: center;
            line-height: 0.5067rem;
            background: #ffd800;
            color: #fff;
            border-radius: 0.08rem;
          }
        }
      }
    }
  }
}
</style>
