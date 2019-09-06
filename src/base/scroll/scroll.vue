<template>
  <div ref="wrapper" class="list-wrapper">
    <slot></slot>
  </div>
</template>
 
<script type='text/ecmascript-6'>
  import BScroll from "better-scroll";
  import loading from 'base/loading/loading'
  export default {
    data() {
      return {
        scrollData: 111,
        isPullUpLoad: true,
      };
    },
    computed:{
    },
    props: {
      pullUpTxt:{
        type:String,
        default:"加载更多数据"
      },
      // scrollHeight: {
      //   type: Number,
      //   default: 0
      // },
      probeType: {
        type: Number,
        default: 2
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      pullup: {
        type: Boolean,
        default: true
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      isScroll: {
        type: Boolean,
        default: false
      },
      pullDownRefresh: {
        type: null,
        default: false
      }
    },
    updated() {
      setTimeout(() => {
        this.refresh();
      }, 20);
    },
    created() {},
    mounted() {
      setTimeout(() => {
        this._initScroll();
      }, 20);
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return;
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: {
            threshold: 0,
            moreTxt: "加载更多",
            noMoreTxt: "没有更多数据了"
          },
          maxScrollY: 10,
          // startY:0
        });
        if (this.listenScroll) {
          let me = this;
          this.scroll.on("scroll", pos => {
            me.$emit("scroll", pos);
          });
        }
        if (this.pullup) {
          this.scroll.on("pullingUp", () => {
            console.log('触发上拉加载更多')
            this.$emit("pullingUp");
          });
        }
        // if (this.pullup) {
        //   this.scroll.on("scrollEnd", (pos) => {
        //     if (this.scroll.y <= this.scroll.maxScrollY) {
        //       this.$emit("scrollToEnd");
        //     }
        //   });
        // }
        if (this.beforeScroll) {
          this.scroll.on("beforeScrollStart", () => {
            this.$emit("beforeScroll");
          });
        }
        if (this.listenScroll) {
          let that = this;
          this.scroll.on("scroll", pos => {
            that.$emit("scroll", pos);
          });
        }
        //监听下拉刷新
        if (this.pullDownRefresh) {
          this._initPullDownRefresh();
        }
      },
      //下拉刷新
      _initPullDownRefresh() {
        this.scroll.on("touchEnd", pos => {
          if (pos.y > 50) {
            this.$emit("pullingDown");
          }
        });
      },
      enable() {
        this.scroll && this.scroll.enable();
      },
      disable() {
        this.scroll && this.scroll.disable();
      },
      finishPullDown() {
        this.finishPullDown && this.scroll.finishPullDown();
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      },
      scrollBy() {
        this.scroll && this.scroll.scrollBy.apply(this.scroll, arguments);
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
      }
    },
    components: {
      loading
    },
    watch: {
      // scrollHeight: function(newValue) {
      //   console.log("scrollHeight------",newValue)
      //   this.scroll.scrollTo(0, -newValue);
      // },
      data(newValue) {
        let len = newValue.length;
        
        console.log('scrollData---------------------', this.data);
        this.$emit("getIndex", len);
        setTimeout(() => {
          this.refresh();
        }, 30);
      }
    }
  };
</script>

<style lang="less" scoped>
  .list-wrapper {
    position: relative;
    height: 100%;
    /*position: absolute*/
    /*left: 0*/
    /*top: 0*/
    /*right: 0*/
    /*bottom: 0*/
    overflow: hidden;
    // background: #fff;
    .pullup-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px 0
    }
  }
</style>
