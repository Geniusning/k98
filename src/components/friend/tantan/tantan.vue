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
      @click="transferId(item)">
        <div style="height:100%" class="stack_content">
          <div class="img_content">
            <img src="../../../assets/image/icon_changnei.png" alt="" class="icon" v-if="item.sex=='男'">
            <img src="../../../assets/image/icon_changwai1.png" alt="" class="icon" v-else-if="item.sex=='女'">
            <img src="../../../assets/image/icon_changwai2.png" alt="" class="icon" v-else>
            <img :src="item.avatar" alt="" class="blur_avatar">
            <img class="avatar" :src="item.avatar">
            <p class="name">{{item.name}}</p>
            <!-- <p class="loginTime">最近登录时间:2018-1-20 19:00:88</p> -->
          </div>
          <!-- 个人信息 -->
          <div class="userInfo_wrapper">
            <div class="userBox clearfix">
              <!-- <h3 class="username">{{item.name}}</h3> -->
              <!-- <span class="sex">男</span> -->
              <img src="../../../assets/image/male.png" alt="" class="sex" v-if="item.sex=='男'">
              <img src="../../../assets/image/female.png" alt="" class="sex" v-else>
              <span class="online" :style="{background:item.online==='好友'?'red':'gray'}">{{item.online}}</span>
              <span class="constellation">水瓶座</span>
            </div>
            <div class="sex_wrapper clearfix">
              <div class="one">
                <span class="effect">影响力:</span>
                <span>3000</span>
                <span class="degrees">阶级:</span>
                <span>长老</span>
              </div>
              <div class="one">
                <span class="thumb">点赞数: </span><span>30</span>
              </div>
              <div class="one">
                <span class="gift">收礼数: </span>
                <span>30</span>
              </div>
              <!-- <span class="sex">男</span>
              <span class="constellation">水瓶座</span> -->
              <!-- <span class="degree">学徒</span>
              <span class="thumbs"><img src="../../assets/image/thumb_small.png" alt="">300</span>
              <span class="gifts"><img src="../../assets/image/gifts_small.png" alt="">200</span> -->
            </div>
            <!-- <div class="effect_wrapper">
              <span>影响力:</span><span class="effect_num">800</span>
            </div> -->
            <div class="tag_wrapper">
              <span>搞笑</span>
              <span>幽默</span>
              <span>逗比</span>
            </div>
          </div>
          <!-- 基本信息 -->
          <!-- <div class="baseInfo_wrapper">
            <div class="baseInfo_one">
              <div class="baseInfo_one_left">
                <span>影响力:</span><span>3000</span>
              </div>
              <div class="baseInfo_one_right">
                 <span>等级:</span><span>掌门</span>
              </div>
            </div>
            <div class="baseInfo_two">
               <div class="baseInfo_two_left">
                <span>获赞数:</span><span>30</span>
              </div>
              <div class="baseInfo_two_right">
                 <span>收礼数:</span><span>8</span>
              </div>
            </div>
          </div> -->
        </div>
      </li>
    </ul>
</template>
<script>
import detectPrefixes from "./tantan.js";
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
      propData: this.pages,
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
  created() {},
  watch: {
    pages(newValue) {
      let data = newValue[0];
      this.$emit("firstData", data);
    }
  },
  computed: {
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
    document.addEventListener("touchmove", e => {
      // e.preventDefault();
    });
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
      if (this.offsetRatio >= 0.05) {
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
      //this.temporaryData.currentPage = this.temporaryData.currentPage === this.pages.length - 1 ? 0 : this.temporaryData.currentPage + 1
      console.log(this.temporaryData.currentPage);
      let index = this.temporaryData.currentPage;
      if (this.distant > 0) {
        this.temporaryData.currentPage =
          this.temporaryData.currentPage === 0
            ? this.pages.length - 1
            : this.temporaryData.currentPage - 1;
        let friendData_left = this.pages[this.temporaryData.currentPage];
        this.$emit("firstData", friendData_left);
      } else {
        this.temporaryData.currentPage =
          this.temporaryData.currentPage === this.pages.length - 1
            ? 0
            : this.temporaryData.currentPage + 1;
        let friendData_right = this.pages[this.temporaryData.currentPage];
        this.$emit("firstData", friendData_right);
        // currentPage切x 换，整体dom进行变化，把第一层滑动置最低
      }
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
            (this.temporaryData.animation ? 300 : 0) + "ms";
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
  overflow: hidden;
  position: absolute;
  opacity: 0;
  display: -webkit-flex;
  display: flex;
  box-shadow: 0px 0px 10px 1px #ccc;
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
  // padding: 0 1.25rem;
  .img_content {
    width: 100%;
    height: 7.1733rem;
    position: relative;
    text-align: center;
    .loginTime {
      position: absolute;
      top: 0;
      left: 0;
      color: #ffa811;
      z-index: 999999;
    }
    .icon {
      position: absolute;
      width: 1.8133rem;
      height: 0.6133rem;
      top: 0.4033rem;
      right: 0.2667rem;
      z-index: 100000;
    }
    .name {
      position: absolute;
      width: 1.8133rem;
      height: 0.6133rem;
      top: 6rem;
      left: 3.4167rem;
      z-index: 100000;
      font-size: 0.4rem;
      font-weight: 700;
      color: #ff7900;
    }
    .blur_avatar {
      width: 100%;
      height: 100%;
      filter: blur(0.9rem);
    }
    .avatar {
      display: block;
      margin: 0.625rem auto 0.5rem;
      width: 4.9067rem;
      height: 4.9067rem;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  .userInfo_wrapper {
    margin-top: 0.4133rem;
    .userBox {
      padding-left: 0.32rem;
      .username {
        text-align: left;
        text-indent: 0.375rem;
        font-size: 0.4rem;
        float: left;
        font-weight: 700;
        color: #ff7900;
        margin-right: 0.2rem;
      }
      .online {
        .userInfo(red);
        margin-right: 0.2333rem;
      }
      .sex {
        // .userInfo(#89b8f0);
        width: 0.4rem;
        height: 0.4rem;
        float: left;
        display: inline-block;
        text-align: center;
        border-radius: 2px;
        color: #fff;
        margin-top: 0.04rem;
        margin-right: 0.2333rem;
      }
      .constellation {
        .userInfo(#fc9d15);
      }
    }
    .sex_wrapper {
      text-align: left;
      padding-left: 0.32rem;
      margin: 0.2667rem 0;
      div {
        float: left;
        &.one {
          margin-right: 0.18rem;
        }
        .effect {
          .baseInfo(#de79e2);
        }
        .thumb {
          .baseInfo(#fc9d15);
        }
        .gift {
          .baseInfo(#ff7900);
        }
        .degrees {
          .baseInfo(#eec400);
        }
      }
      // .sex {
      //   .originBaseInfo(#89b8f0)
      // }
      // .constellation {

      // }
      // .degree {

      // }
      // .thumbs {
      //   img {
      //     position: absolute;
      //     width: 0.2533rem;
      //     height: 0.2533rem;
      //     top: 0.08rem;
      //     left: 0.04rem;
      //   }
      // }
      // .gifts {
      //   img {
      //     position: absolute;
      //     width: 0.2533rem;
      //     height: 0.2533rem;
      //     top: 0.08rem;
      //     left: 0.04rem;
      //   }
      // }
    }
    .effect_wrapper {
      margin-left: 0.32rem;
      margin-top: 0.1367rem;
      margin-bottom: 0.1367rem;
      text-align: left;
      font-size: 13px;
      color: #666;
      font-family: "PingFang-SC-Medium";
      .effect_num {
        color: #ff7900;
      }
    }
    .tag_wrapper {
      text-align: left;
      padding-left: 0.32rem;
      color: #666;
      font-family: "PingFang-SC-Medium";
      // margin: 0.2333rem 0 0;
      span {
        display: inline-block;
        padding: 0.0233rem;
        background: #ffa811;
        border-radius: 3px;
        color: #fff;
        font-size: 0.3467rem;
      }
    }
  }
}
// .stack-item img {
//   width: 100%;
//   display: block;
//   pointer-events: none;
// }
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