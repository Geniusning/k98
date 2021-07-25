
<template>
  <div class="container_box" id="video_box">
    <div class="van_swipe">
      <!--vant van-swipe 滑动组件 -->
      <van-swipe ref="swiper" :show-indicators="false" :initial-swipe="current" @change="onChange" vertical :loop="true">
        <van-swipe-item v-for="(item, index) in videos" :key="index" class="product_swiper">
          <div class="video_container">
            <!--video属性
                    webkit-playsinline ios 小窗播放，使视频不脱离文本流，安卓则无效
                    微信内置x5内核，
                    x5-video-player-type="h5-page" 启用H5播放器,是wechat安卓版特性，添加此属性，微信浏览器会自动将视频置为全屏
                    x5-video-player-fullscreen="true" 全屏设置，设置为 true 是防止横屏
                    x5-video-orientation 控制横竖屏 landscape 横屏，portrain竖屏； 默认portrain
                    poster：封面
                    src：播放地址
                    -->
            <div class="shopInfo">
              <img :src="item.shopLogo" alt="" class="shopLogo">
              <span class="shopName">{{item.shopName}}</span>
            </div>
            <video class="video_box" webkit-playsinline="true" x5-video-player-type="h5-page" x5-video-player-fullscreen="true" playsinline preload="auto" :poster="item.cover" :src="item.videoUrl" :playOrPause="playOrPause" @click="pauseVideo" @ended="onPlayerEnded()">
            </video>
            <!-- 封面 -->
            <!-- <img v-show="isVideoShow" class="play" @click="playvideo" :src="item.cover" /> -->
            <!-- 播放暂停按钮 -->
            <img v-show="iconPlayShow" class="icon_play" @click="playvideo" src="http://npjy.oss-cn-beijing.aliyuncs.com/images/file-1575340653940esdHR.png" />
          </div>
          <!-- 右侧头像、点赞、评论、分享功能 -->
          <div class="tools_right">
            <div class="tools_r_li" @click="goToShop(item.shopUrl)">
              <img src="../../../assets/image/zhe.png" class="tag_image">
            </div>
            <!-- <div class="tools_r_li">
              <i class="iconfont icon-shoucang icon_right" :class="item.fabulous?'fabulous_active':''"></i>
              <div class="tools_r_num">52.1w</div>
            </div>
            <div class="tools_r_li">
              <i class="iconfont icon-liuyan icon_right icon_right_change"></i>
              <div class="tools_r_num">12.5w</div>
            </div>
            <div class="tools_r_li">
              <i class="iconfont icon-iconfontforward icon_right"></i>
              <div class="tools_r_num">22.2w</div>
            </div> -->
          </div>
          <!-- 底部作品描述 -->
          <!-- <div class="production_box">
            <div class="production_name">
              @superKM
            </div>
            <div class="production_des">
              年轻的时候要注意‘养生’，少玩手机多睡觉！少玩手机多睡觉！少玩手机多睡觉！切记少玩手机多睡觉！少玩手机多睡觉！少玩手机多睡觉！@ 抖音小助手
            </div>
          </div> -->
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import {
  Swipe,
  SwipeItem,
  Toast
} from 'vant';

Vue.use(Swipe, Toast).use(SwipeItem);

let videoProcessInterval;
export default {
  name: 'home',
  data () {
    let u = navigator.userAgent;
    return {
      current: 0,
      isVideoShow: true,
      playOrPause: true,
      video: null,
      iconPlayShow: true,
      isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
      isiOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      tabIndex: 0,
      videos: [],
      shopUrls: []
      // 评论相关
      // videoProcess: 0,//视频播放进度
    }
  },
  props: ["videoList", "currentVideoId"],
  created () {
    this.current = this.currentVideoId
    this.videoList.forEach((item, index) => {
      this.videos.push({
        videoUrl: item.videoURL,
        shopUrl: item.storeURL,
        shopName: item.storeName,
        shopLogo: item.StoreLoge
      })
    })

  },
  mounted () {
    console.log("开始播放" + this.current);
    let video = document.querySelectorAll('video')[this.current];
    // this.isVideoShow = false;
    this.iconPlayShow = false;
    video.play();
    window.onresize = function () {
      video.style.width = window.innerWidth + "px";
      video.style.height = window.innerHeight + "px";
    }
    console.log("videos", this.videos)
  },
  computed: {
  },
  methods: {
    goToShop (url) {
      window.location.href = url
    },
    //滑动改变播放的视频
    onChange (index) {

      //改变的时候 暂停当前播放的视频
      console.log("change Index", index)
      clearInterval(videoProcessInterval)
      // this.videoProcess = 0;
      let video = document.querySelectorAll('video')[this.current];
      video.pause();
      // this.playOrPause = false;
      this.current = index;
      //切换直接自动播放下一个
      // this.isVideoShow = false;
      this.pauseVideo()
      // this.playvideo()
    },
    // 开始播放
    playvideo (event) {
      console.log("开始播放" + this.current);
      let video = document.querySelectorAll('video')[this.current];
      // this.isVideoShow = false;
      this.iconPlayShow = false;
      video.play();
      window.onresize = function () {
        video.style.width = window.innerWidth + "px";
        video.style.height = window.innerHeight + "px";
      }
      console.log("videos", this.videos)
      // this.playOrPause = !this.playOrPause;
      // videoProcessInterval = setInterval(() => {
      //   this.changeProcess(video)
      // }, 100)
    },
    pauseVideo () { //暂停
      console.log("暂停播放" + this.current);
      let video = document.querySelectorAll('video')[this.current];
      // if (this.playOrPause) {
      video.pause();
      this.iconPlayShow = true;
      // clearInterval(videoProcessInterval)
      // } else {
      // video.play();
      // this.iconPlayShow = false;
      // videoProcessInterval = setInterval(() => {
      //   this.changeProcess(video)
      // }, 100)
      // }
      // this.playOrPause = !this.playOrPause;
    },
    //记录播放进度
    changeProcess () {
      // let video = document.querySelectorAll('video')[this.current];
      // let currentTime = video.currentTime.toFixed(1);
      // let duration = video.duration.toFixed(1);
      // this.videoProcess = parseInt((currentTime / duration).toFixed(2) * 100)
    },
    onPlayerEnded () { //视频结束
      // this.isVideoShow = true
      console.log("播放结束")
      this.$refs.swiper.next()
      // this.current += this.current
    },
  }
}
</script>
<style scoped lang="less">
.clear {
  clear: both;
}

.video-player {
  height: 100vh;
  width: 100vw;
}

.product_swiper {
  width: 100vw;
  height: 100vh;
}

.van_swipe {
  width: 100vw;
  height: 100vh;
  max-width: 550px;
  margin: 0 auto;
  position: relative;
  .video_container {
    position: relative;
    height: 100%;
    .shopInfo {
      position: absolute;
      top: 0.2rem;
      left: 0.2rem;
      display: flex;
      align-items: center;
      z-index: 9999;
      .shopLogo {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
      }
      .shopName {
        padding: 0 0.1rem;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
}

.van-swipe {
  width: 100%;
  height: 100%;
}

.container_box {
  width: 100vw;
  height: 100vh;
  background: #000;
}

.video_box {
  object-fit: fill !important;
  z-index: 999;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}

video {
  object-position: 0 0;
}

.icon_play {
  position: absolute;
  top: 44%;
  right: 0;
  left: 0;
  bottom: auto;
  margin: auto;
  z-index: 999;
  height: 60px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
}

.play,
.platStart {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
}

/*头像， 点赞，转发 */
.tag_image {
  width: 0.8rem;
  height: 1rem;
  box-sizing: border-box;
  margin-bottom: 3.5rem;
  position: relative;
  box-shadow: 0px 0px 10px #9d9d9d;
}

.tag_add {
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  border-radius: 67px;
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 18px;
  margin: 0 auto;
  z-index: 1;
  font-size: 20px;
  color: #f44;
  background: #fff;
}

.tag_dui {
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  border-radius: 67px;
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin: 0 auto;
  z-index: 1;
  font-size: 11px;
  color: #f44;
  background: #fff;
}

.tag_dui_active {
  opacity: 0;
  animation: showFollow 1.4s ease-in-out 0s;
}

.tag_add_num {
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
}

@keyframes showFollow {
  0% {
    opacity: 1;
    color: #fff;
    background: #f44;
    transform: rotate(-180deg) scale(1);
  }
  35% {
    opacity: 1;
    color: #f44;
    background: #fff;
    transform: rotate(0deg) scale(1.2);
  }
  80% {
    opacity: 1;
    color: #f44;
    transform: scale(1.2);
  }
  100% {
    opacity: 0;
    display: none;
    color: #f44;
    transform: scale(0);
  }
}

.tools_right {
  z-index: 1001;
  position: absolute;
  right: 16px;
  bottom: 4rem;
}

.tools_r_li {
  margin-bottom: 20px;
  color: #fff;
  font-size: 14px;
  position: relative;
}

.tools_r_li:last-child {
  margin-bottom: 0px;
}

.icon_right {
  margin-bottom: 5px;
  font-size: 42px;
  display: block;
  text-shadow: 0px 0px 10px #9d9d9d;
  /*transition: .5s;*/
}

.production_box {
  z-index: 1001;
  position: absolute;
  /* right: 16px; */
  bottom: 48px;
  text-align: left;
  padding: 0 15px 15px 15px;
  color: #fff;
  width: 100%;
  left: 0;
  box-sizing: border-box;
  background: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  );
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
  /* Firefox 3.6 - 15 */
  background: linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
  /* 标准的语法 */
}

.production_name {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
}

.production_des {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  min-height: 62px;
  font-size: 13px;
}

.container_bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.85);
  height: 48px;
  /*border-top: 1px solid rgba(255, 255, 255, 0.7);*/
  max-width: 550px;
}

.production_top {
  display: inline-block;
  padding: 6px;
  margin-bottom: 5px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  margin-top: 5px;
}

.product_go {
  color: #fbdd21;
}

.production_title {
  margin-left: 4px;
}

.border_progress {
  width: 0;
  height: 1px;
  background: #bababa;
  position: absolute;
  top: 0;
  transition: 0.1s all;
}

.bottom_tab {
  width: 33%;
  text-align: center;
  float: left;
  color: #c9c9c9;
  padding: 10px 0;
}

.bottom_tab_icon {
  width: 44px;
}

.bottom_tab_span {
  line-height: 28px;
  border-bottom: 2px solid transparent;
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  padding: 0 4px;
  transition: 0.5s all;
}

.tab_active .bottom_tab_span {
  border-bottom: 2px solid #fff;
  color: #fff;
}

.icon-shoucang {
  transition: 0.5s all;
}

.fabulous_active {
  color: #f44;
  animation: showHeart 0.5s ease-in-out 0s;
}

/*animation-name：用来调用@keyframes定义好的动画，与@keyframes定义的动画名称一致*/
/*animation-duration ：指定元素播放动画所持续的时间*/
/*animatino-timing-function ： 和transition中的transition-timing-function 中的值一样。根据上面@keframes中分析的animation中可能存在多个小动画，因此这里的值设置是针对每一个小动画所在时间范围内的属性变换速率。*/
/*animation-delay：定义在浏览器开始执行动画之前等待的时间，这里是指整个animation执行之前的等待时间，而不是上面说的多个小动画*/
/*animation-iteration-count：定义动画的播放次数，其通常为整数，默认是1,；取值为infinite，动画将无限次的播放。*/
/*animation-direction：主要用来设置动画播放方向*/
@keyframes showHeart {
  0% {
    color: #f44;
    transform: scale(1);
  }

  25% {
    color: #fff;
    transform: scale(0);
  }

  80% {
    color: #f44;
    transform: scale(1.2);
  }

  100% {
    color: #f44;
    transform: scale(1);
  }
}

/*分享样式*/
.share_hover {
  position: fixed;
  display: none;
}

.share_box {
  position: fixed;
  bottom: -300px;
  width: 100%;
  z-index: 1002;
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: 0.5s;
}

.share_tips {
  text-align: center;
  line-height: 38px;
  color: #333;
}

.share_ul {
  box-sizing: border-box;
  padding: 0 25px 25px;
  border-bottom: 1px solid #e8e8e8;
}

.share_li {
  float: left;
  width: 33%;
  text-align: center;
}

.share_li i {
  font-size: 44px;
}

.share_cancel {
  text-align: center;
  line-height: 48px;
  color: #777;
  text-align: center;
}

.pengyouquan {
  color: #47d000;
}

.pengyouquan_li {
  animation: rotating 8s linear infinite;
}

@keyframes rotating {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.weixin {
  color: #20ca2e;
}

.lianjie {
  color: #cdcdcd;
}

.share_active {
  bottom: 0px;
}

/*评论样式*/
::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.2);
}

:-moz-placeholder {
  color: rgba(0, 0, 0, 0.2);
}

::-moz-placeholder {
  color: rgba(0, 0, 0, 0.2);
}

:-ms-input-placeholder {
  color: rgba(0, 0, 0, 0.2);
}

.comment_container {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.comment_box {
  padding: 0 15px 52px 15px;
}

.comment_top {
  text-align: center;
  font-size: 12px;
  color: #000;
  line-height: 40px;
}

.guanbi3 {
  float: right;
  font-size: 12px;
  padding: 0 10px;
  position: absolute;
  right: 6px;
}

.comment_li {
  margin-bottom: 20px;
  font-size: 14px;
  text-align: left;
}

.comment_author_left {
  float: left;
}

.comment_author_left img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.comment_author_right {
  margin-left: 46px;
  padding-top: 4px;
}

.comment_author_top {
  position: relative;
}

.comment_author_name {
  margin-bottom: 6px;
  color: #777;
}

.icon-shoucang1_box {
  position: absolute;
  right: 0px;
  top: 0;
  text-align: center;
  color: #777;
}

.comment_author_text {
  color: #555;
  margin-bottom: 10px;
  padding-right: 35px;
}

.comment_replay_box {
  padding-left: 46px;
  box-sizing: border-box;
}

.comment_replay_li {
  margin-bottom: 10px;
}

.comment_replay_left {
  float: left;
}

.comment_replay_left img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}

.comment_replay_right {
  margin-left: 35px;
  padding-top: 2px;
}

.comment_replay_top {
  position: relative;
  margin-bottom: 6px;
}

.comment_replay_text {
  padding-right: 35px;
  margin-bottom: 10px;
  color: #555;
}

.comment_author_text span,
.comment_replay_text span {
  color: #999;
  font-size: 13px;
  margin-left: 6px;
}

.shoucang1_num {
  text-align: center;
  width: 30px;
  font-size: 12px;
  /* right: -4px; */
  position: relative;
}

.comment_ul {
  height: 400px;
  overflow-y: auto;
}

.comment_input_box {
  position: fixed;
  bottom: 0;
  z-index: 2999;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  background: #fff;
  padding: 10px 15px;
  box-sizing: border-box;
}

/*.comment_form {*/
/**/
/*}*/

.comment_input {
  border: none;
  resize: none;
  width: 80%;
  float: left;
  color: #555;
  caret-color: #f44;
}

.comment_input_right {
  float: right;
}

.comment_i {
  font-size: 22px;
  color: #999;
  transition: 0.3s;
}

.comment_i_active {
  color: #f44;
}

.icon-zanwupinglun {
  font-size: 100px;
  color: #777;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(80px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

/*添加进场效果*/
.v-move {
  transition: all 1s ease;
}

.v-leave-active {
  position: absolute;
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}

.love_active {
  color: #f44;
}

/*评论样式*/
</style>
