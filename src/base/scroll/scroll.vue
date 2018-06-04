<template>
  <div ref='wrapper'>
    <slot></slot>
  </div>
</template>
 
<script type='text/ecmascript-6'>
import BScroll from "better-scroll";
export default {
  props: {
    scrollHeight: {
      type: Number,
      default: 0
    },
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
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    isScroll: {
      type: Boolean,
      default: false
    }
  },
  created() {
    
  },
  mounted() {
    // setTimeout(() => {
      console.log(this.data);
      this._initScroll();
    // }, 17);
  },
  methods: {
    _initScroll() {
      // if (!this.$refs.wrapper) {
      //   return;
      // }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      });
      if (this.listenScroll) {
        let me = this;
        this.scroll.on("scroll", pos => {
          me.$emit("scroll", pos);
        });
      }
      if (this.pullup) {
        this.scroll.on("scrollEnd", () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit("scrollToEnd");
          }
        });
      }
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
      if (this.listenScroll) {
        let that = this;
        console.log(this.listenScroll);
        this.scroll.on("scroll", pos => {
          console.log(pos);
          that.$emit("scroll", pos);
        });
      }
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  watch: {
    scrollHeight: function(newValue) {
      // console.log(newValue);
      this.scroll.scrollTo(0, -newValue, 1000);
    },
    data(newValue) {
      let len = newValue.length - 1;
      this.$emit("getIndex", len);
      setTimeout(() => {
        this.refresh();
      }, 20);
    }
  }
};
</script>