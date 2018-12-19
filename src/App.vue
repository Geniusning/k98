<template>
  <div id="app">
    <div class="top_wrapper">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <lg-preview></lg-preview>
      <transition name='envelop'>
        <!-- isShowEnvelop -->
        <div class="envelop-wrapper" v-if="isShowEnvelop" @click="showDetail">
          <img src="./assets/image/close_ad.png" alt="" class="close" @click.stop="close">
          <div class="top">
            <img :src="dynamicFriendEvt.fromInfo?dynamicFriendEvt.fromInfo.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534938165134&di=f3ae0420c8c174149ac1c123230a28ed&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FJCRXU6oUw5s17jKllv9icrTmXvozYWQDeWFhKgEXbYeR9JOEKkrWLjibU7a7FAbsBHibVKca5wWzEiaXHWSgaSlgbA%2F640%3Fwx_fmt%3Dpng'"
              alt="" class="avatar">
            <div class="name">{{dynamicFriendEvt.fromInfo?dynamicFriendEvt.fromInfo.nickname:'店长'}}</div>
          </div>
          <div class="bottom">
            <p class="content">{{dynamicFriendEvt.extMsg.lastMsg.msg}}</p>
            <!-- <p class="content">你试试我的眼的</p> -->
          </div>
          <div class="detail">&gt;&gt;详情</div>
        </div>
      </transition>
    </div>
    <div class="bottom_wrapper" v-if="tabFlag">
      <tab :selected="selected"></tab>
    </div>
  </div>
</template>

<script>
  import Tab from "./components/tab/tab.vue";
  import {
    mapState,
    mapGetters,
    mapMutations
  } from "vuex";
  import util from "common/util";
  import api from "common/api";
  export default {
    name: "app",
    data() {
      return {
        isThrottle: true,
        isShowEnvelop: false,
        tabFlag: false,
        selected: 0,
        shareObj: {
          title: "深圳魅力四射酒吧首页",
          desc: "这是一个超级好玩的的地方哦",
          link: "",
          imgUrl: "http://i1.bvimg.com/643118/d3ed6dbc589609a1.png"
        }
      };
    },
    computed: {
      ...mapState(["inputValue", "dynamicFriendEvt", "messType"])
    },
    created() {
      console.log(this.$route.name);
      if (
        this.$route.name === "home" ||
        this.$route.name === "friend" ||
        this.$route.name === "message" ||
        this.$route.name === "welfare" ||
        this.$route.name === "mine"
      ) {
        this.tabFlag = true;
      }
      switch (this.$route.name) {
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
    },
    methods: {
      showDetail() {
        switch (this.messType) {
          case "message":
            this.$router.push({
              name: `message`,
              params: {
                routeParamNum: 0
              }
            });
            break;
          case "thumb":
            this.$router.push({
              name: `message`,
              params: {
                routeParamNum: 4
              }
            });
            break;
          case "playGame":
            this.$router.push({
              name: `message`,
              params: {
                routeParamNum: 2
              }
            });
            break;
          case "gift":
            this.$router.push({
              name: `message`,
              params: {
                routeParamNum: 3
              }
            });
            break;
          case "discount":
            this.$router.push({
              name: `card`,
            });
            break;
          default:
            break;
        }
        this.isShowEnvelop = false;
      },
      close() {
        this.isShowEnvelop = false;
      },
      ...mapMutations({
        // updateChatList: "UPDATE_CHATLIST",//更新聊天列表
        setChatFriend: "SET_CHAT_FRIEND", //全局设置聊天对象的信息
      })
    },
    watch: {
      dynamicFriendEvt: function() {
        if (this.isThrottle) {
          this.isShowEnvelop = true;
          this.isThrottle = false;
          setTimeout(() => {
            this.isShowEnvelop = false;
          }, 7000);
          setTimeout(() => {
            this.isThrottle = true;
          }, 10000);
        }
      },
      $route: function(newValue) {
        //隐藏导航
        if (
          newValue.name == "home" ||
          newValue.name == "friend" ||
          newValue.name == "message" ||
          newValue.name == "welfare" ||
          newValue.name == "mine" ||
          newValue.name === "gameRank"
        ) {
          this.tabFlag = true;
        } else {
          this.tabFlag = false;
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
  .envelop-enter-active,
  .envelop-leave-active {
    transition: all 0.3s ease;
  }
  .envelop-enter {
    transform: translate3d(-100%, 0, 0);
  }
  .envelop-leave-to {
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
    box-sizing: border-box;
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
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
    position: relative;
    .envelop-wrapper {
      position: absolute;
      width: 4rem;
      height: 2.2533rem;
      top: 2rem;
      background-image: url("./assets/image/envelop.png");
      background-repeat: no-repeat;
      background-size: contain;
      padding: 0.1333rem;
      z-index: 99999;
      font-size: 0.3467rem;
      .detail {
        position: absolute;
        bottom: 0.4rem;
        right: 0.2rem;
        color: orange;
      }
      .close {
        position: absolute;
        top: 0.2667rem;
        right: 0.4rem;
        width: 0.3333rem;
        height: 0.3333rem;
      }
      .top {
        display: flex;
        margin: 0.1333rem;
        .avatar {
          width: 0.6667rem;
          height: 0.6667rem;
          border-radius: 50%;
          margin-right: 0.2rem;
        }
        .name {
          width: 2rem;
          padding-top: 0.1333rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .bottom {
        margin-top: 0.2333rem;
        .content {
          padding-left: 0.1333rem;
        }
      }
    }
  }
  .bottom_wrapper {
    height: 1.18rem;
    max-width: 10rem;
    position: relative; // .message_box {
    //   position: absolute;
    //   top: -1.85rem;
    //   width: 100%;
    //   height: 1.8667rem;
    //   display: flex;
    //   background: -webkit-linear-gradient(left, #ffba00, #ffd800);
    //   .close {
    //     position: absolute;
    //     top: 0.4rem;
    //     right: 0.4rem;
    //     width: 0.4rem;
    //     height: 0.4rem;
    //   }
    //   .avatar {
    //     margin: 0.2933rem 0.2933rem 0 0.5333rem;
    //     width: 1.3333rem;
    //     height: 1.3333rem;
    //     .pic {
    //       width: 100%;
    //       height: 100%;
    //       border-radius: 50%;
    //     }
    //   }
    //   .userInfo {
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: space-around;
    //     padding: 0.3rem 0;
    //     .name {
    //       font-size: 0.4rem;
    //       color: #fff;
    //     }
    //     .mess {
    //       font-size: 0.3733rem;
    //       color: #fff;
    //     }
    //   }
    // }
  }
</style>
