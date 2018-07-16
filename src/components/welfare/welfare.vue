<template>
 <div id="welfare" class="welfare">
     <div class="shop_wrapper">
         <div class="pic">
             <img src="../../assets/image/shop.png"  alt="">
         </div>
         <div class="desc">
             <h3>深圳魅力四射酒吧</h3>
             <p>优惠活动正在进行中,预定热线<a class="tel" href="tel:15764271136">2314499</a></p>
         </div>
     </div>
     <!-- 分享有礼 -->
     <div class="bg" v-show="isShow_bg" @click="share">
         <img src="../../assets/image/share.png" alt="">
     </div>
     <div class="share_wrapper">
       <div class="share_box clearfix">
         <div class="pic_content">
           <img class="pic" src="../../assets/image/share_gift.png" alt="" onclick="return false">
         </div>
         <div class="btn_content" @click="isShow_bg=true">
           <img class="btn" src="../../assets/image/share_btn.png" alt="" onclick="return false">
         </div>
       </div>
       <div class="discount_box">
         <ul class="discount_list">
           <li class="item1">
             <h3 class="discount_title">分享好友奖励</h3>
             <p class="discount_desc">分享好友后双方均获得5折啤酒券</p>
           </li>
           <li class="item2">
              <h3 class="discount_title">邀请新人奖励</h3>
             <p class="discount_desc">分享好友后双方均获得5折啤酒券</p>
           </li>
           <li class="item3">
              <h3 class="discount_title">新人消费奖励</h3>
             <p class="discount_desc">分享好友后双方均获得5折啤酒券</p>
           </li>
         </ul>
         <p class="time">
           有效日期:2018.9-2018.10
         </p>
       </div>
     </div>
     <!-- 店长福利 -->
     <div class="welfare_wrapper">
        <div class="dynamic-content">
          <h3 class="title">大话骰动态：</h3>
          <div class="rolling-content">
             <swiper auto height="30px" direction="vertical" :interval=1000 class="text-scroll" :show-dots="false">
              <swiper-item><p class="dynamicText" style="padding:0.07rem 0">15日大毛排名赛获得第一名，获得啤酒一打</p></swiper-item>
              <swiper-item><p class="dynamicText" style="padding:0.07rem 0">16日二毛排名赛获得第二名，获得50现金券一张</p></swiper-item>
              <swiper-item><p class="dynamicText" style="padding:0.07rem 0">17日三毛排名赛获得第三名，获得水果一盘</p></swiper-item>
            </swiper>
          </div>
        </div>
        <div class="sellActivity-content">
          <div class="title">促销活动</div>
          <ul class="list">
            <li class="item">
              <img src="http://i4.bvimg.com/643118/d3ed6dbc589609a1.png" alt="" class="activity-pic">
              <div class="activityInfo">
                <p>店内进行酒水促销活动</p>
                <p>有效期至：2018-12-30</p>
              </div>
            </li>
             <li class="item">
              <img src="http://i4.bvimg.com/643118/0c7ed06ec325ad1d.png" alt="" class="activity-pic">
              <div class="activityInfo">
                <p>店内进行酒水促销活动</p>
                <p>有效期至：2018-12-30</p>
              </div>
            </li>
             <li class="item">
              <img src="http://i4.bvimg.com/643118/d3ed6dbc589609a1.png" alt="" class="activity-pic">
              <div class="activityInfo">
                <p>店内进行酒水促销活动</p>
                <p>有效期至：2018-12-30</p>
              </div>
            </li>
          </ul>
        </div>
         <!-- <h3 class="title">店长福利</h3> -->
         <!-- <div class="welfare_list">
             <ul>
                <li class="item">
                  <img src="../../assets/image/welfare_show1.png" alt="" onclick="return false">
                </li>
                <li class="item">
                   <img src="../../assets/image/welfare_show2.png" alt="" onclick="return false">
                </li>
                 <li class="item">
                  <img src="../../assets/image/welfare_show1.png" alt="" onclick="return false">
                </li>
                <li class="item">
                   <img src="../../assets/image/welfare_show2.png" alt="" onclick="return false">
                </li>
            </ul>
         </div> -->
     </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import { Swiper, SwiperItem } from "vux";
export default {
  data() {
    return {
      isShow_bg: false
    };
  },
  methods: {
    //   分享
    share() {
      this.isShow_bg = !this.isShow_bg;
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  watch: {
    $route(newValue, oldValue) {
      // console.log(newValue);
    }
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/variable.less";
@import "../../assets/less/welfare_common.less";
.welfare {
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
  background-image: url("../../assets/image/welfare_bg.png");
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

  .shop_wrapper {
    display: flex;
    justify-content: flex-start;
    .pic {
      // box-sizing: border-box;
      padding-top: 0.2667rem;
      padding-left: 0.4rem;
      margin-right: 0.25rem;
      width: 2.2533rem;
      height: 2.2533rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .desc {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      h3 {
        font-size: 18px;
        font-weight: 300;
        color: #ffffff;
        // -webkit-text-stroke: 1px #1b1a1f;
      }
      p {
        color: #fff;
        font-size: 14px;
        .tel {
          color: black;
          font-size: 14px;
          // font-weight: 800;
        }
      }
    }
  }
  .share_wrapper {
    margin-top: 0.2267rem;
    padding: 0 0.3rem;
    .share_box {
      .pic_content {
        width: 4.2933rem;
        height: 2.64rem;
        float: left;
        .pic {
          width: 100%;
          height: 100%;
        }
      }
      .btn_content {
        width: 5.04rem;
        height: 1.2133rem;
        float: left;
        margin-top: 0.7733rem;
        .btn {
          width: 100%;
          height: 100%;
        }
      }
    }
    .discount_box {
      // width: 8.9467rem;
      height: 3.44rem;
      box-sizing: border-box;
      padding: 0.2667rem 0.2267rem 0;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.1333rem;
      box-shadow: 2px 0px 8px rgba(76, 76, 76, 0.36);
      border: 1px solid #ff7900;
      .discount_list {
        display: flex;
        justify-content: space-between;
        .item1 {
          .discountItem("../../assets/image/share_bg1.png");
          .discount_title {
            .discountTitle;
          }
          .discount_desc {
            .discountDesc;
          }
        }
        .item2 {
          .discountItem("../../assets/image/share_bg2.png");
          .discount_title {
            .discountTitle;
          }
          .discount_desc {
            .discountDesc;
          }
        }
        .item3 {
          .discountItem("../../assets/image/share_bg3.png");
          .discount_title {
            .discountTitle;
          }
          .discount_desc {
            .discountDesc;
          }
        }
      }
      .time {
        width: 100%;
        text-align: center;
        box-sizing: border-box;
        margin-top: 0.1333rem;
      }
    }
  }
  .welfare_wrapper {
    margin-top: 0.5rem;
    padding: 0 0.1rem;
    .dynamic-content {
      display: flex;
      .title {
        margin-right: 0.1333rem;
        font-size: 0.4rem;
        color: #333;
        font-weight: 700;
      }
      .rolling-content {
        flex: 1;
        height: 0.8rem;
        .dynamicText {
          color: #ff7900;
        }
      }
    }
    .sellActivity-content {
      margin-top: 0.4rem;
      .title {
        margin-right: 0.1333rem;
        font-size: 0.4rem;
        color: #333;
        font-weight: 700;
      }
      .list{
        margin-top: 0.3rem;
        .item{
          display: flex;
          margin-bottom: 0.2667rem;
          .activity-pic{
            width: 2rem;
            height: 2rem;
          }
          .activityInfo{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            font-size: 0.4rem;
            margin-left: 0.4rem;
          }
        }
      }
    }
  }
  // .welfare_wrapper {
  //   overflow-y: auto;
  //   background: #ffffff;
  //   .title {
  //     font-size: 16px;
  //     font-weight: 800;
  //     color: #ff7900;
  //     padding: 0.4267rem 0 0.2933rem;
  //     text-align: center;
  //   }
  //   .welfare_list {
  //     padding: 0 0.5333rem;
  //     .item {
  //       width: 8.9333rem;
  //       height: 2.4267rem;
  //       margin-bottom: 0.1333rem;
  //       border: 1px solid #ccc;
  //       border-radius: 10px;
  //       margin-bottom: 0.24rem;
  //       img {
  //         width: 100%;
  //         height: 100%;
  //       }
  //     }
  //   }
  // }
}
</style>
