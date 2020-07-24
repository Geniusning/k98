<template>
  <div class="slider" ref='Slider'>
    <div class="slider-group" ref='SliderGroup'>
      <slot>
      </slot>
    </div>
    <div class="dots">
     <span class="dot" v-for="(item,index) in dots" :key="index" :class="{active:currentPageIndex == index}"></span>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import BScroll from "better-scroll";
import { addClass } from "../../common/addClass";
export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 2000
    },
    autoPlay: Boolean,
    default: true
  },
  mounted() {
    //console.log(this.$slots.default);
    setTimeout(() => {
      this._setSilderWidth();
      this._initDots();
      this._initSlider();
      if (this.autoPlay) {
        this._play();
      }
    }, 20);
    window.addEventListener("resize", () => {
      if (!this.Slider) {
        return;
      }
      this._setSilderWidth(true);
    });
  },
  methods: {
    _setSilderWidth(isResize) {
      //获取 轮播容器有多少个子元素
      this.children = this.$refs.SliderGroup.children;
      let width = 0;
      //获取轮播容器的宽度
      let sliderWidth = this.$refs.Slider.clientWidth;
      //console.log(sliderWidth);
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        // //console.log(child);
        //给每一个子元素添加样式
        addClass(child, "slider-item");
        child.style.width = sliderWidth + "px";
        width += sliderWidth;
      }

      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      this.$refs.SliderGroup.style.width = width + "px";
    },
    _initDots() {
      this.dots = this.children.length;
    },
    _initSlider() {
      this.Slider = new BScroll(this.$refs.Slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 500
      });
      this.Slider.on("scrollEnd", () => {
        let pageIndex = this.Slider.getCurrentPage().pageX;
        if (this.loop) {
          pageIndex -= 1;
        }
        this.currentPageIndex = pageIndex;

        if (this.autoPlay) {
          clearTimeout(this.timer);
          this._play();
        }
      });
    },
    _play() {
      let pageIndex = this.currentPageIndex + 1;
      if (this.loop) {
        pageIndex += 1;
      }
      this.timer = setTimeout(() => {
        this.Slider.goToPage(pageIndex, 0, 400);
      }, this.interval);
    }
  }
};
</script>

<style scoped lang="less" >
.slider {
  min-height: 1px;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    height: 4rem;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);

      &.active {
        width: 20px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
</style>