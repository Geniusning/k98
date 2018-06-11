<template>
  <div id="app">
    <div class="top_wrapper">
        <keep-alive>
           <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>

      <lg-preview></lg-preview>
    </div>
    <div class="bottom_wrapper" v-if="flag">
      <transition name="messageDisplay">
          <div class="message_box" v-if="dialog">
            <img src="./assets/image/close.png" alt="" class="close">
            <div class="avatar">
              <img src="./assets/image/avatar3.jpg" alt=""  class="pic">
            </div>
            <div class="userInfo">
              <p class="name">小美女</p>
              <p class="mess">给你点了一个赞!</p>
            </div>
          </div>
      </transition>
        <tab :selected="selected"></tab>
    </div>
  </div>
</template>

<script>
import Tab from "./components/tab/tab.vue";
import { mapState, mapGetters, mapMutations } from "vuex";
import util from "common/util";

export default {
  name: "app",
  data() {
    return {
      flag: true,
      selected: 0,
      dialog: false
    };
  },
  computed: {
    ...mapState(["inputValue"])

  },
  created() {
  },
  methods: {

    ...mapMutations({
      updateChatList: "UPDATE_CHATLIST"
    })
  },
  watch: {
    $route: function(newValue) {
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
          // this.dialog = true;
          setTimeout(() => {
            this.dialog = false;
          }, 1500);
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
.messageDisplay-enter-active,
.messageDisplay-leave-active {
  transition: all 0.3s linear;
}
.messageDisplay-enter,
.messageDisplay-leave-to {
  opacity: 0;
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
  position: relative;
  .message_box {
    position: absolute;
    top: -1.85rem;
    width: 100%;
    height: 1.8667rem;
    display: flex;
    background: -webkit-linear-gradient(left, #ffba00, #ffd800);
    .close {
      position: absolute;
      top: 0.4rem;
      right: 0.4rem;
      width: 0.4rem;
      height: 0.4rem;
    }
    .avatar {
      margin: 0.2933rem 0.2933rem 0 0.5333rem;
      width: 1.3333rem;
      height: 1.3333rem;
      .pic {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .userInfo {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 0.3rem 0;
      .name {
        font-size: 0.4rem;
        color: #fff;
      }
      .mess {
        font-size: 0.3733rem;
        color: #fff;
      }
    }
  }
}
</style>
