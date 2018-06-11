<template>
    <ul class="stack">
      <li class="stack-item" v-for="(item, index) in pages"
      :style="[transformIndex(index),transform(index)]"
      @touchmove.prevent="touchmove"
      @touchstart.prevent="touchstart"
      @touchend.prevent="touchend"
      @mousedown.prevent="touchstart"
      @mouseup.prevent="touchend"
      @mousemove.prevent="touchmove"
      @mouseout.prevent="touchend"
      @webkit-transition-end="onTransitionEnd(index)"
      @transitionend="onTransitionEnd(index)"
      >
        <div style="height:100%" class="stack_content">
          <div class="big_box">
            <div class="img_content">
              <div class="icon_box" v-if="item.info.sex=='男'">
                <img src="../../../assets/image/online.png" alt="" class="icon" >
                <img src="../../../assets/image/dot_green.png" alt="" class="dot">
                <span class="line_word">场内</span>
              </div>
              <div class="icon_box" v-else="item.info.sex=='女'">
                <img src="../../../assets/image/outline.png" alt="" class="icon" >
                <img src="../../../assets/image/dot_red.png" alt="" class="dot">
                <span class="line_word">场外</span>
              </div>
              <span class="time_desc">20分钟前登陆</span>
              <!-- <img src="../../../assets/image/icon_changwai2.png" alt="" class="icon" v-else> -->
              <!-- <img :src="item.info.avatar" alt="" class="blur_avatar"> -->
              <div class="avatar_box">
                <img class="avatar" :src="item.info.headimgurl?item.info.headimgurl:'http://i1.bvimg.com/643118/e8156b29c3381636.png'" alt="暂无头像" >
                <img src="../../../assets/image/friend_icon.png" alt="" class="friend_icon" v-show="item.isAlreadyFriend">
              </div>
              <p class="name">{{item.info.nickname}}</p>
            </div>
            <!-- 个人信息 -->
            <div class="userInfo_wrapper">
              <div class="userBox clearfix">
                <img src="../../../assets/image/male.png" alt="" class="sex sex_male" v-if="item.info.sex=='男'">
                <img src="../../../assets/image/female.png" alt="" class="sex sex_female" v-else>
                <!-- <span class="online" :style="{background:item.info.online==='好友'?'red':'gray'}">{{item.info.online}}</span> -->
                <span class="constellation">{{item.info.constellation?item.info.constellation:"水瓶座"}}</span>
                <span class="gift"><img src="../../../assets/image/gifts_small.png" alt="" class="gift_small">{{item.info.gift?item.info.gift:56}}</span>
                <span class="thumb"><img src="../../../assets/image/thumb_small.png" alt="" class="thumb_samll">{{item.info.thumb?item.info.thumb:99}}</span>
                <span class="friend"><img src="../../../assets/image/friend_tantan.png" alt="" class="friend_samll">{{item.info.thumb?item.info.thumb:10}}</span>
              </div>
              <div class="tag_wrapper">
                <span v-for="(item,index) in item.info.tags?item.info.tags:tempArr" :key="index">{{item}}</span>
                <!-- <span>招人爱</span>
                <span>大胃王</span> -->
              </div>
              <div class="signature_wrapper">
                <!-- <p class="word">生活不止眼前的苟且，还有诗和远方的田野</p> -->
                <p class="word">{{item.info.signature?item.info.signature:sign}}</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
</template>
<script>
import detectPrefixes from "./tantan.js";
import { mapGetters } from "vuex";
export default {
  props: {
    stackinit: {
      type: Object,
      default: []
    },
    pages: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      // propData: this.pages,
      // isFriend:false,
      tempArr: ["二傻子", "聪明", "有远见"],
      sign: "生活不止眼前的苟且，还有诗和远方的田野",
      basicdata: {
        start: {},
        end: {}
      },
      temporaryData: {
        prefixes: detectPrefixes(),
        offsetY: "",
        poswidth: 0,
        posheight: 0,
        lastPosWidth: "",
        lastPosHeight: "",
        lastZindex: "",
        rotate: 0,
        lastRotate: 0,
        visible: 3 || this.stackinit.visible,
        tracking: false,
        animation: false,
        currentPage: this.stackinit.currentPage || 0,
        opacity: 1,
        lastOpacity: 0,
        swipe: false,
        zIndex: 10
      }
    };
  },
  created() {
    console.log(this.pages);
  },
  watch: {
    pages(newValue) {
      let data = newValue[0];
      this.$emit("firstData", data);
    }
  },
  computed: {
    ...mapGetters(["friendList"]),
    // 划出面积比例
    offsetRatio() {
      let width = this.$el.offsetWidth;
      let height = this.$el.offsetHeight;
      let offsetWidth = width - Math.abs(this.temporaryData.poswidth);
      let offsetHeight = height - Math.abs(this.temporaryData.posheight);
      let ratio = 1 - offsetWidth * offsetHeight / (width * height) || 0;
      return ratio > 1 ? 1 : ratio;
    },
    // 划出宽度比例
    offsetWidthRatio() {
      let width = this.$el.offsetWidth;
      let offsetWidth = width - Math.abs(this.temporaryData.poswidth);
      let ratio = 1 - offsetWidth / width || 0;
      return ratio;
    }
  },
  mounted() {
    console.log(this.pages);
  },
  methods: {
    touchstart(e) {
      if (this.temporaryData.tracking) {
        return;
      }
      // 是否为touch
      if (e.type === "touchstart") {
        this.startX = e.touches[0].clientX;
        if (e.touches.length > 1) {
          this.temporaryData.tracking = false;
          return;
        } else {
          // 记录起始位置
          this.basicdata.start.t = new Date().getTime();
          this.basicdata.start.x = e.targetTouches[0].clientX;
          this.basicdata.start.y = e.targetTouches[0].clientY;
          this.basicdata.end.x = e.targetTouches[0].clientX;
          this.basicdata.end.y = e.targetTouches[0].clientY;
          // offsetY在touch事件中没有，只能自己计算
          this.temporaryData.offsetY =
            e.targetTouches[0].pageY - this.$el.offsetParent.offsetTop;
        }
        // pc操作
      } else {
        this.basicdata.start.t = new Date().getTime();
        this.basicdata.start.x = e.clientX;
        this.basicdata.start.y = e.clientY;
        this.basicdata.end.x = e.clientX;
        this.basicdata.end.y = e.clientY;
        this.temporaryData.offsetY = e.offsetY;
      }
      this.temporaryData.tracking = true;
      this.temporaryData.animation = false;
    },
    touchmove(e) {
      // 记录滑动位置
      this.endX = e.touches[0].clientX;
      this.distant = this.endX - this.startX;
      // console.log(this.distant);
      if (this.temporaryData.tracking && !this.temporaryData.animation) {
        if (e.type === "touchmove") {
          // e.preventDefault();
          this.basicdata.end.x = e.targetTouches[0].clientX;
          this.basicdata.end.y = e.targetTouches[0].clientY;
        } else {
          // e.preventDefault();
          this.basicdata.end.x = e.clientX;
          this.basicdata.end.y = e.clientY;
        }
        // 计算滑动值
        this.temporaryData.poswidth =
          this.basicdata.end.x - this.basicdata.start.x;
        this.temporaryData.posheight =
          this.basicdata.end.y - this.basicdata.start.y;
        let rotateDirection = this.rotateDirection();
        let angleRatio = this.angleRatio();
        this.temporaryData.rotate =
          rotateDirection * this.offsetWidthRatio * 15 * angleRatio;
      }
    },
    touchend(e, item) {
      this.temporaryData.tracking = false;
      this.temporaryData.animation = true;
      // 滑动结束，触发判断
      // 判断划出面积是否大于0.01
      if (this.offsetRatio >= 0.15) {
        // 计算划出后最终位置
        let ratio = Math.abs(
          this.temporaryData.posheight / this.temporaryData.poswidth
        );
        this.temporaryData.poswidth =
          this.temporaryData.poswidth >= 0
            ? this.temporaryData.poswidth + 200
            : this.temporaryData.poswidth - 200;
        this.temporaryData.posheight =
          this.temporaryData.posheight >= 0
            ? Math.abs(this.temporaryData.poswidth * ratio)
            : -Math.abs(this.temporaryData.poswidth * ratio);
        this.temporaryData.opacity = 0;
        this.temporaryData.swipe = true;
        this.nextTick();
        // 不满足条件则滑入
      } else {
        this.temporaryData.poswidth = 0;
        this.temporaryData.posheight = 0;
        this.temporaryData.swipe = false;
        this.temporaryData.rotate = 0;
      }
    },
    // 测试·········
    nextTick() {
      // 记录最终滑动距离
      this.temporaryData.lastPosWidth = this.temporaryData.poswidth;
      this.temporaryData.lastPosHeight = this.temporaryData.posheight;
      this.temporaryData.lastRotate = this.temporaryData.rotate;
      this.temporaryData.lastZindex = 20;
      // 循环currentPage
      this.temporaryData.currentPage =
        this.temporaryData.currentPage === this.pages.length - 1
          ? 0
          : this.temporaryData.currentPage + 1;
      let friendData = this.pages[this.temporaryData.currentPage];
      this.$emit("firstData", friendData);
      let signList = [
        "努力吧,别把自己的青春铺张在爱情上",
        "兄弟虽然我们是在网络中相遇",
        "多年后你和她情深似海，会不会想到欠我一个未来",
        "生活不止眼前的苟且，还有诗和远方的田野"
      ];
      let index = Math.floor(Math.random() * 4);
      this.sign = signList[index];
      // console.log(this.temporaryData.currentPage);
      // let index = this.temporaryData.currentPage;
      // if (this.distant > 0) {
      //   this.temporaryData.currentPage =
      //     this.temporaryData.currentPage === this.pages.length - 1
      //       ? 0
      //       : this.temporaryData.currentPage + 1;
      //   let friendData_right = this.pages[this.temporaryData.currentPage];
      //   this.$emit("firstData", friendData_right);
      // } else {
      //   // currentPage切x 换，整体dom进行变化，把第一层滑动置最低
      //   this.temporaryData.currentPage =
      //     this.temporaryData.currentPage === 0
      //       ? this.pages.length - 1
      //       : this.temporaryData.currentPage - 1;
      //   let friendData_left = this.pages[this.temporaryData.currentPage];
      //   this.$emit("firstData", friendData_left);
      // }
      this.$nextTick(() => {
        this.temporaryData.poswidth = 0;
        this.temporaryData.posheight = 0;
        this.temporaryData.opacity = 1;
        this.temporaryData.rotate = 0;
      });
    },
    prevTick() {
      // 记录最终滑动距离
      this.temporaryData.lastPosWidth = this.temporaryData.poswidth;
      this.temporaryData.lastPosHeight = this.temporaryData.posheight;
      this.temporaryData.lastRotate = this.temporaryData.rotate;
      this.temporaryData.lastZindex = 20;
      // 循环currentPage
      console.log(this.temporaryData.currentPage);
      this.temporaryData.currentPage =
        this.temporaryData.currentPage === this.pages.length - 1
          ? 0
          : this.temporaryData.currentPage - 1;
      // currentPage切换，整体dom进行变化，把第一层滑动置最低
      this.$nextTick(() => {
        this.temporaryData.poswidth = 0;
        this.temporaryData.posheight = 0;
        this.temporaryData.opacity = 1;
        this.temporaryData.rotate = 0;
      });
    },
    // prev() {
    //   this.temporaryData.tracking = false;
    //   this.temporaryData.animation = true;
    //   // 计算划出后最终位置
    //   let width = this.$el.offsetWidth;
    //   this.temporaryData.poswidth = -width;
    //   this.temporaryData.posheight = 0;
    //   this.temporaryData.opacity = 0;
    //   this.temporaryData.rotate = "-3";
    //   this.temporaryData.swipe = true;
    //   this.nextTick();
    // },
    // next() {
    //   this.temporaryData.tracking = false;
    //   this.temporaryData.animation = true;
    //   // 计算划出后最终位置
    //   let width = this.$el.offsetWidth;
    //   this.temporaryData.poswidth = width;
    //   this.temporaryData.posheight = 0;
    //   this.temporaryData.opacity = 0;
    //   this.temporaryData.rotate = "3";
    //   this.temporaryData.swipe = true;
    //   this.nextTick();
    // },
    onTransitionEnd(index) {
      let lastPage =
        this.temporaryData.currentPage === 0
          ? this.pages.length - 1
          : this.temporaryData.currentPage - 1;
      // dom发生变化正在执行的动画滑动序列已经变为上一层
      if (this.temporaryData.swipe && index === lastPage) {
        this.temporaryData.animation = true;
        this.temporaryData.lastPosWidth = 0;
        this.temporaryData.lastPosHeight = 0;
        this.temporaryData.lastOpacity = 0;
        this.temporaryData.lastRotate = 0;
        this.temporaryData.swipe = false;
        this.temporaryData.lastZindex = -1;
      }
    },
    rotateDirection() {
      if (this.temporaryData.poswidth <= 0) {
        return -1;
      } else {
        return 1;
      }
    },
    angleRatio() {
      let height = this.$el.offsetHeight;
      let offsetY = this.temporaryData.offsetY;
      let ratio = -1 * (2 * offsetY / height - 1);
      return ratio || 0;
    },
    inStack(index, currentPage) {
      let stack = [];
      let visible = this.temporaryData.visible;
      let length = this.pages.length;
      for (let i = 0; i < visible; i++) {
        if (currentPage + i < length) {
          stack.push(currentPage + i);
        } else {
          stack.push(currentPage + i - length);
        }
      }
      return stack.indexOf(index) >= 0;
    },
    // 非首页样式切换
    transform(index) {
      let currentPage = this.temporaryData.currentPage;
      let length = this.pages.length;
      let lastPage =
        currentPage === 0 ? this.pages.length - 1 : currentPage - 1;
      let style = {};
      let visible = this.temporaryData.visible;
      if (index === this.temporaryData.currentPage) {
        return;
      }
      if (this.inStack(index, currentPage)) {
        let perIndex =
          index - currentPage > 0
            ? index - currentPage
            : index - currentPage + length;
        style["opacity"] = "1";
        style["transform"] =
          "translate3D(0,0," +
          -1 * 60 * (perIndex - this.offsetRatio) +
          "px" +
          ")";
        style["zIndex"] = visible - perIndex;
        if (!this.temporaryData.tracking) {
          style[this.temporaryData.prefixes.transition + "TimingFunction"] =
            "ease";
          style[this.temporaryData.prefixes.transition + "Duration"] =
            300 + "ms";
        }
      } else if (index === lastPage) {
        style["transform"] =
          "translate3D(" +
          this.temporaryData.lastPosWidth +
          "px" +
          "," +
          this.temporaryData.lastPosHeight +
          "px" +
          ",0px) " +
          "rotate(" +
          this.temporaryData.lastRotate +
          "deg)";
        style["opacity"] = this.temporaryData.lastOpacity;
        style["zIndex"] = this.temporaryData.lastZindex;
        style[this.temporaryData.prefixes.transition + "TimingFunction"] =
          "ease";
        style[this.temporaryData.prefixes.transition + "Duration"] = 300 + "ms";
      } else {
        style["zIndex"] = "-1";
        style["transform"] =
          "translate3D(0,0," + -1 * visible * 60 + "px" + ")";
      }
      return style;
    },
    // 首页样式切换
    transformIndex(index) {
      if (index === this.temporaryData.currentPage) {
        let style = {};
        style["transform"] =
          "translate3D(" +
          this.temporaryData.poswidth +
          "px" +
          "," +
          this.temporaryData.posheight +
          "px" +
          ",0px) " +
          "rotate(" +
          this.temporaryData.rotate +
          "deg)";
        style["opacity"] = this.temporaryData.opacity;
        style["zIndex"] = 10;
        if (this.temporaryData.animation) {
          style[this.temporaryData.prefixes.transition + "TimingFunction"] =
            "ease";
          style[this.temporaryData.prefixes.transition + "Duration"] =
            (this.temporaryData.animation ? 100 : 0) + "ms";
        }
        return style;
      }
    }
  }
};
</script>
<style scoped lang='less'>
@import "../../../assets/less/variable.less";
@import "../../../assets/less/tantan.less";
.stack {
  width: 100%;
  height: 100%;
  position: relative;
  perspective: 1500px;
  perspective-origin: 50% 150%;
  -webkit-perspective: 1500px;
  -webkit-perspective-origin: 50% 150%;
  margin: 0;
  padding: 0;
}
.stack-item {
  background: rgba(255, 255, 255, 1);
  height: 100%;
  width: 100%;
  border-radius: 8px;
  text-align: center;
  // overflow: hidden;
  position: absolute;
  opacity: 0;
  display: -webkit-flex;
  display: flex;
  box-shadow: 0px 0px 0.4667rem 1px #c1c1c1;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: auto;
}
.stack_content {
  .big_box {
    background: #fff;
  }
  .img_content {
    width: 100%;
    height: 7.1733rem;
    position: relative;
    text-align: center;
    .time_desc {
      position: absolute;
      top: 0.4rem;
      left: 1.7rem;
      color: #a8a8a8;
      font-size: 0.32rem;
      padding: 0.1rem;
      border-radius: 0.3067rem;
      border: 1px solid #d9d9d9;
      box-sizing: border-box;
      padding: 0.1rem;
      z-index: 999999;
    }
    .icon_box {
      position: absolute;
      width: 1.6933rem;
      height: 0.9067rem;
      top: 0.4033rem;
      left: -0.15rem;
      z-index: 100000;
      .icon {
        width: 100%;
        height: 100%;
      }
      .dot {
        width: 0.3467rem;
        height: 0.3467rem;
        position: absolute;
        top: 0.2333rem;
        left: 0.3rem;
      }
      .line_word {
        font-size: 0.3467rem;
        color: #fff;
        position: absolute;
        left: 0.7rem;
        top: 0.13rem;
      }
    }
    .name {
      position: absolute;
      width: 100%;
      text-align: center;
      height: 0.6133rem;
      top: 6.7rem;
      // left: 3.4167rem;
      z-index: 100000;
      font-size: 0.4533rem;
      font-weight: 700;
      color: #232323;
    }
    .blur_avatar {
      width: 100%;
      height: 100%;
      // filter: blur(0.9rem);
      background: rgba(255, 255, 255, 0.5);
      -webkit-backdrop-filter: blur(0.9rem);
    }
    .avatar_box {
      box-sizing: border-box;
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      // padding: 0.1rem;
      border: 0.1067rem solid #f1f1f1;
      position: absolute;
      margin: 1.4rem auto 0.5rem;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      .avatar {
        display: block;
        position: absolute;
        top: 0.15rem;
        left: 0.15rem;
        width: 4.5333rem;
        height: 4.5333rem;
        border-radius: 50%;
      }
      .friend_icon {
        width: 0.84rem;
        height: 0.84rem;
        position: absolute;
        bottom: 0;
        right: 0.8rem;
      }
    }
  }
  .userInfo_wrapper {
    margin-top: 0.7133rem;
    padding-left: 0.4533rem;
    .userBox {
      .username {
        text-align: left;
        text-indent: 0.375rem;
        font-size: 0.4rem;
        float: left;
        font-weight: 700;
        color: #ff7900;
        margin-right: 0.2rem;
      }
      .sex {
        float: left;
        display: inline-block;
        text-align: center;
        border-radius: 2px;
        color: #fff;
        margin-top: 0.04rem;
        margin-right: 0.2333rem;
      }
      .sex_male {
        width: 0.5233rem;
        height: 0.5033rem;
        margin-top: 0.12rem;
      }
      .sex_female {
        width: 0.5333rem;
        height: 0.5333rem;
      }
      .constellation {
        .userInfo(#C579FF);
      }
      .thumb {
        box-sizing: border-box;
        padding-top: 0.03rem;
        .userInfo(#FF7272);
        text-indent: 0.2rem;
        .thumb_samll {
          width: 0.2933rem;
          height: 0.2933rem;
          position: absolute;
          top: 0.12rem;
          left: 0.15rem;
        }
      }
      .friend {
        box-sizing: border-box;
        padding-top: 0.03rem;
        .userInfo(#ffd800);
        text-indent: 0.3rem;
        .friend_samll {
          width: 0.3733rem;
          height: 0.3733rem;
          position: absolute;
          top: 0.09rem;
          left: 0.15rem;
        }
      }
      .gift {
        box-sizing: border-box;
        padding-top: 0.04rem;
        .userInfo(#75bdfa);
        text-indent: 0.4rem;
        .gift_small {
          width: 0.2833rem;
          height: 0.2833rem;
          position: absolute;
          top: 0.12rem;
          left: 0.2rem;
        }
      }
    }
    .tag_wrapper {
      text-align: left;
      color: #666;
      font-family: "PingFang-SC-Medium";
      margin-top: 0.24rem;
      span {
        display: inline-block;
        padding: 0.0533rem 0.09rem;
        border: 1px solid #bebebe;
        border-radius: 0.0533rem;
        color: #a5a5a5;
        font-size: 0.32rem;
        margin-right: 0.1333rem;
      }
    }
    .signature_wrapper {
      margin-top: 0.3233rem;
      .word {
        color: #808080;
        text-align: left;
        font-size: 0.3467rem;
      }
    }
  }
}

.stack-container li.move-back {
  /* http://matthewlein.com/ceaser/ */
  -webkit-transition-timing-function: cubic-bezier(
    0.175,
    0.885,
    0.47,
    1
  ); /* older webkit */
  -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.47, 1.515);
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.47, 1.515);
}
</style>