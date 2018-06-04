<template>
  <div id="app">
    <div class="top_wrapper">
      <!-- <transition name="slider"> -->
        <!-- <keep-alive> -->
        <router-view></router-view>
        <!-- </keep-alive> -->
      <!-- </transition> -->
      <lg-preview></lg-preview>
    </div>
    <div class="bottom_wrapper" v-if="flag">
        <tab :selected="selected"></tab>
    </div>
  </div>
</template>

<script>
import Tab from "./components/tab/tab.vue";
import { mapGetters } from "vuex";
import util from "common/util";
export default {
  name: "app",
  data() {
    return {
      flag: true,
      selected: 0
    };
  },
  computed: {
    // ...mapGetters(["isShow"])
  },
  watch: {
    $route: function(newValue) {
      // console.log(newValue);
      if (
        newValue.name == "interview" ||
        newValue.name == "individual" ||
        newValue.name == "chat" ||
        newValue.name == "gameDetail" ||
        newValue.name == "giftDetail"
      ) {
        this.flag = false;
      } else {
        this.flag = true;
      }
      //判断通过非点击tabbar栏切换选中状态
      switch (newValue.name) {
        case "home":
          this.selected = 0;
          break;
        case "friend":
          this.selected = 1;
          break;
        case "message":
          this.selected = 2;
          break;
        case "welfare":
          this.selected = 3;
          break;
        case "mine":
          this.selected = 4;
          break;
        default:
          break;
      }
    }
  },
  components: {
    Tab
  }
};
</script>

<style lang="less">
@import "./assets/reset.css";
// @import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
a:hover {
  text-decoration: none !important;
}
.slider-enter-active,
.slider-leave-active {
  transition: all 0.5s linear;
}
.slider-enter,
.slider-leave-to {
  transform: translate3d(-100%, 0, 0);
}
body,
html {
  height: 100%;
}
#app {
  overflow-x: hidden;
  max-width: 10rem;
  height: 100%;
  -webkit-display: flex;
  -moz-display: flex;
  -ms-display: flex;
  -o-display: flex;
  display: flex;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  -o-flex-direction: column;
  flex-direction: column;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  -o-justify-content: space-between;
  -ms-justify-content: space-between;
  justify-content: space-between;
}
.top_wrapper {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  -webkit-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  -o-flex: 1;
  flex: 1;
}
.bottom_wrapper {
  height: 1.18rem;
  max-width: 10rem;
}
</style>
