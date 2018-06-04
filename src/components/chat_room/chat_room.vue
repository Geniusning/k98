<template>
 <div id="chat" class="chatRoom">
      <div class="chat_nav">
        <div class="back_box">
          <img src="../../assets/image/back_chat.png" alt="" class="back_arrow" @click="goBack">
        </div>
        <div class="name">
          夏美
        </div>
        <div class="backHome_box">
          <img src="../../assets/image/chat_home.png" alt="" class="home" @click="goHome">
        </div>
      </div>
      <div class="chat_wrapper" ref="chatWrapper" @click="tagScroll">
        <scroll ref="listView" class="chat_content" :scrollHeight='scrollHeight' :data="chatList" @getIndex="getIndex" @scroll="myscroll" :listen-scroll="listenScroll">
          <ul class="chat_list" ref="chatList">
              <li class="clearfix" ref="item" :class="{'friend':item.friend,'mine':!item.friend}" v-for="(item,index) in chatList">
                  <div class="person_box">
                      <h2 class="name">19:20:10</h2>
                      <img src="../../assets/image/avatar3.jpg" alt="" class="avatar" v-if="item.friend">
                      <img src="../../assets/image/avatar2.jpg" alt="" class="avatar" v-else>
                  </div>
                  <div class="message_box">
                    <span class="arrow"></span>
                    <p  class="message">{{item.message}}</p>
                  </div>
              </li>
          </ul>
         </scroll>
      </div>
      <div class="input_wrapper">
        <div class="input_area clearfix">
          <input type="text" ref="sendWrapper" id="send_message" class="send_message" :autofocus="autofocus" @focus.prevent="myfocus" v-model="input_value">
          <div @click="send" class="action_box clearfix" :class="{active:flag}">
              <img src="../../assets/image/plane.png" alt="" class="icon_plane fl">
              <span class="send fl"  ref="send">发送</span>
          </div>
        </div>
        <div class="select_area">
          <ul class="selectList clearfix">
            <li class="item fl">
              <img src="../../assets/image/chat_emotion.png" alt="" @click="show_emotion">
            </li>
             <li class="item fl">
              <img src="../../assets/image/message_chat.png" alt="" @click="show_expression">
            </li>
            <li class="item fl">
              <img src="../../assets/image/chat_gift.png" alt="" @click="showToastGift">
            </li>
            <li class="item fl">
              <img src="../../assets/image/chat_pic.png" alt="">
              <input type="file" class="file">
            </li>
            <li class="item fl">
              <img src="../../assets/image/game_chat.png" alt="" class="game">
            </li>
          </ul>
        </div>
        <div class="emotion_area" v-if="emotionShow">
           <swiper :auto="false" height="130px" dots-position="center">
            <swiper-item class="black">
                <grid :show-vertical-dividers="true"  :cols="8">
                  <grid-item v-for="(item,index) in emoj1" :key="index">
                    <span slot="label" class="grid-center" @click="select_emotion(item)">{{item}}</span>
                  </grid-item>
                </grid>
            </swiper-item>
            <swiper-item class="black">
                <grid :show-vertical-dividers="true"  :cols="8">
                  <grid-item v-for="(item,index) in emoj2" :key="index">
                    <span slot="label" class="grid-center" @click="select_emotion(item)">{{item}}</span>
                  </grid-item>
                </grid>
            </swiper-item>
          </swiper>
        </div>
        <!-- 常用语 -->
        <div class="expression_wrapper" v-if="expressionShow">
          <ul class="expressList">
            <li class="item vux-1px-b" v-for="(item,index) in expressionList" :key="index" @click="addExpress(item)">{{item}}</li>
          </ul>
        </div>
      </div>

      <!-- 送礼 -->
      <div v-transfer-dom>
        <popup v-model="showToast_gift" position="bottom">
          <div class="position-vertical-demo">
            <div class="title vux-1px-b">
              <span>送个小礼，就是好朋友</span>
              <img src="../../assets/image/close-round.png" alt="" class="close" @click="close_gift">
            </div>
            <div class="gift_list">
              <ul class="list clearfix">
                <li class="item">
                  <img src="../../assets/image/beer.png" alt="" class="beer">
                  <p class="gift_name">啤酒</p>
                  <p class="gift_price">￥0.99</p>
                </li>
                  <li class="item">
                  <img src="../../assets/image/flower.png" alt="" class="flower">
                  <p class="gift_name">鲜花</p>
                  <p class="gift_price">￥1.88</p>
                </li>
                  <li class="item">
                  <img src="../../assets/image/house.png" alt="" class="house">
                  <p class="gift_name">别墅</p>
                  <p class="gift_price">￥5.20</p>
                </li>
                  <li class="item">
                  <img src="../../assets/image/car.png" alt="" class="car">
                  <p class="gift_name">跑车</p>
                  <p class="gift_price">￥16.8</p>
                </li>
              </ul>
            </div>
          </div>
        </popup>
    </div>
 </div>
</template>
<script type='text/ecmascript-6'>
import {
  Tab,
  TabItem,
  XHeader,
  TransferDom,
  Scroller,
  Swiper,
  SwiperItem,
  Grid,
  GridItem,
  Popup
} from "vux";
import Scroll from "../../base/scroll/scroll.vue";
export default {
  directives: {
    TransferDom,
    focus: function(el) {
      el.focus();
    }
  },
  data() {
    return {
      scrollHeight: 0,
      expressionShow: false,
      expressionList: [
        "您好，很高兴可以成为好朋友",
        "过来喝一杯？",
        "约定好了，准时见面，不见不散",
        "玩一把游戏？"
      ],
      showToast_gift: false,
      show: false,
      showTab: true,
      emotionShow: false,
      actionShow: false,
      flag: false,
      input_value: "",
      autofocus: false,
      chatList: [
        {
          message:
            "哈哈，很高兴认识你哦1我们这里是全深圳全好的kTV,音响质量超级好",
          friend: 1,
          mine: 0
        },
        {
          message: "哈哈，很高兴认识你哦",
          friend: 1,
          mine: 0
        },
        {
          message: "哈哈，很高兴认识你哦",
          friend: 1,
          mine: 0
        },
        {
          message: "哈哈，很高兴认识你哦",
          friend: 0,
          mine: 1
        },
        {
          message: "哈哈，很高兴认识你哦",
          friend: 1,
          mine: 0
        },
        {
          message: "哈哈，很高兴认识你哦",
          friend: 0,
          mine: 1
        },
        {
          message: "哈哈，很高兴认识你哦",
          friend: 1,
          mine: 0
        },
        {
          message: "哈哈，很高兴认识你哦",
          friend: 0,
          mine: 1
        },
        {
          message: "哈哈，很高兴认识你哦",
          friend: 1,
          mine: 0
        },
        {
          message: "哈哈，很高兴认识你哦",
          friend: 0,
          mine: 1
        }
      ],
      list: ["操作", "礼物"],
      emoj1: [
        "😄",
        "😒",
        "😂",
        "😊",
        "😉",
        "😍",
        "😘",
        "😚",
        "😜",
        "😳",
        "😔",
        "😣",
        "😢",
        "😭",
        "😭",
        "😅",
        "😩",
        "😨",
        "😱",
        "😤",
        "😵",
        "😶",
        "🤕",
        "🙄"
      ],
      emoj2: [
        "😖",
        "😋",
        "😷",
        "😎",
        "😇",
        "🤓",
        "🤗",
        "🤖",
        "👲",
        "👳",
        "👳",
        "👮",
        "❤️️",
        "💔",
        "💝",
        "💋",
        "🙈",
        "🙉",
        "💀",
        "👻"
      ],
      index: 0
    };
  },
  created() {
    this.listenScroll = true;
  },
  activated() {
    setTimeout(() => {
      this.chatList = [
        {
          message:
            "哈哈，很高兴认识你哦1我们这里是全深圳全好的kTV,音响质量超级好",
          friend: 1,
          mine: 0
        },
        {
          message: "哈哈，很高兴认识你哦",
          friend: 0,
          mine: 1
        },
        {
          message: "哈哈，很高兴认识你哦",
          friend: 1,
          mine: 0
        },
        {
          message: "哈哈，很高兴认识你哦",
          friend: 0,
          mine: 1
        },
        {
          message: "哈哈，很高兴认识你哦",
          friend: 1,
          mine: 0
        },
        {
          message: "哈哈，很高兴认识你哦",
          friend: 0,
          mine: 1
        }
      ];
    }, 100);
    // this.$nextTick(function() {
    //   this.scrollHeight = this.$refs.chatList.clientHeight;
    // });
  },
  
  methods: {
    getIndex(val) {
      this.index = val;
    },
    //监听滚动
    myscroll(pos) {
      // console.log(pos);
    },
    tagScroll() {
      this.expressionShow = false;
      this.emotionShow = false;
      document.getElementById("send_message").blur();
    },
    //关闭送礼
    close_gift() {
      this.showToast_gift = false;
    },
    //返回
    goBack() {
      this.$router.go(-1);
    },
    //返回主页
    goHome() {
      this.$router.push({
        name: "home"
      });
    },
    //选择表情
    select_emotion(item) {
      console.log(item);
      this.input_value += item;
    },
    //选择常用语
    addExpress(item) {
      this.input_value = item;
    },
    //展示送礼面板
    showToastGift() {
      this.showToast_gift = true;
      this.expressionShow = false;
      this.emotionShow = false;
    },
    //展示表情面板
    show_emotion() {
      this.emotionShow = !this.emotionShow;
      this.expressionShow = false;
    },
    //切换常用语
    show_expression() {
      this.expressionShow = !this.expressionShow;
      this.emotionShow = false;
    },
    //发送事件
    send() {
      if (!this.input_value) {
        return;
      }
      this.chatList.push({
        message: this.input_value,
        friend: 0
      });
      this.$refs.listView.refresh();
      this.input_value = "";
      document.getElementById("send_message").focus();
    },
    onItemClick(index) {
      console.log(index);
      if (index == 0) {
        this.showTab = true;
      } else {
        this.showTab = false;
      }
    },
    myfocus() {
      this.emotionShow = false;
      this.expressionShow = false;
      setTimeout(() => {
        let panel = this.$refs.sendWrapper;
        panel.scrollIntoView(true);
      }, 200);
    }
  },
  watch: {
    input_value: function(newValue, oldValue) {
      if (newValue.length > 0 || oldValue > 0) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    index: function(newValue) {
      this.$nextTick(function() {
        this.scrollHeight = this.$refs.chatList.clientHeight;
      });
    },
    chatList: function() {}
  },
  components: {
    XHeader,
    TransferDom,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    Scroll,
    Popup
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/variable.less";
@import "../../assets/less/chat.less";
.chatRoom {
  height: 100%;
  display: flex;
  flex-direction: column;
  .chat_nav {
    height: 1.1733rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 0.32rem 0.4rem;
    background: #ddd;
    .back_box {
      .back_arrow {
        width: 0.32rem;
        height: 0.5333rem;
      }
    }
    .name {
      color: #333;
      font-size: 0.4267rem;
    }
    .backHome_box {
      .home {
        width: 0.64rem;
        height: 0.5867rem;
      }
    }
  }
  .chat_wrapper {
    flex: 1;
    padding: 0.1333rem 0.3733rem 0.1333rem;
    background: #eee;
    overflow-y: auto;
    .chat_content {
      height: 100%;
      .chat_list {
        .friend {
          margin-bottom: 0.4667rem;
          .chatList(left,#fff);
          .arrow {
            .arrowDot(#fff);
            left: -0.05rem;
          }
        }
        .mine {
          width: 100%;
          margin-bottom: 0.4667rem;
          .chatList(right,#FFD800);
          .arrow {
            .arrowDot(#FFD800);
            right: -0.05rem;
          }
          .message_box {
            margin-right: 0.2667rem;
          }
        }
      }
    }
  }
  .input_wrapper {
    border-top: 1px solid #ccc;
    background: #eee;
    padding: 0 0 0 0.4rem;
    //输入区域
    .input_area {
      padding: 0.2133rem 0;
      height: 1.44rem;
      box-sizing: border-box;
      .send_message {
        outline: none;
        -webkit-appearance: none;
        font-size: 0.3733rem;
        float: left;
        width: 6.9333rem;
        height: 0.9867rem;
        text-indent: 0.2667rem;
        border: 1px solid #999;
      }
      .action_box {
        margin-left: 0.2767rem;
        float: left;
        width: 2rem;
        height: 1.06rem;
        // line-height: 0.9867rem;
        background: #999;
        border-radius: 0.1067rem;
        padding: 0.2533rem 0.2933rem;
        box-sizing: border-box;
        &.active {
          background: #ffd800;
        }
        .icon_plane {
          width: 0.5867rem;
          height: 0.48rem;
        }
        .send {
          color: #4b4b4b;
          font-size: 0.4rem;
        }
      }
    }
    //选择区域
    .select_area {
      height: 1.1rem;
      box-sizing: border-box;
      .selectList {
        .item {
          width: 0.9067rem;
          height: 0.9067rem;
          margin-right: 0.46rem;
          background: #fff;
          box-sizing: border-box;
          padding: 0.1867rem;
          border-radius: 0.1067rem;
          position: relative;
          .file {
            position: absolute;
            width: 0.9067rem;
            height: 0.9067rem;
            left: 0;
            top: 0;
            opacity: 0;
          }
          img {
            width: 0.5333rem;
            height: 0.5333rem;
          }
        }
      }
    }
    // 表情区域
    .emotion_area {
      overflow: hidden;
      .grid-center {
        display: block;
        text-align: center;
        padding: 4px;
        font-size: 0.5333rem;
      }
    }
    .expression_wrapper {
      // width: 100%;
      margin-left: -0.4667rem;
      .expressList {
        width: 100%;
        .item {
          height: 0.8rem;
          box-sizing: border-box;
          line-height: 0.8rem;
          font-size: 0.3467rem;
          color: #333;
          background: #eee;
          text-indent: 0.4667rem;
        }
      }
    }
  }
}
.position-vertical-demo {
  height: 3.76rem;
  background: #fff;
  .title {
    color: @baseColor;
    font-size: 0.3733rem;
    padding: 0.2667rem;
    text-align: left;
    position: relative;
    .close {
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      top: 0.3rem;
      right: 0.4rem;
      // z-index: 999;
    }
  }
  .gift_list {
    margin-top: 0.36rem;
    .list {
      display: flex;
      justify-content: space-around;
      margin-left: 0.4rem;
      .item {
        float: left;
        // margin-right: 1rem;
        width: 1.7067rem;
        height: 1.9467rem;
        box-sizing: border-box;
        text-align: center;
        .game {
          width: 0.6933rem;
          height: 0.48rem;
        }
        img {
          width: 1.1333rem;
          height: 1.1333rem;
          &.flower {
            width: 1.0933rem;
            height: 1.16rem;
          }
          &.house {
            margin-top: 0.3667rem;
            width: 0.96rem;
            height: 0.8267rem;
          }
          &.car {
            margin-top: 0.3167rem;
            width: 1.3067rem;
            height: 0.8667rem;
          }
        }
        .gift_name {
          width: 100%;
          text-align: center;
          font-size: 0.2667rem;
          color: #666;
        }
        .gift_price {
          width: 100%;
          text-align: center;
          font-size: 0.2933rem;
          color: #f13c19;
        }
      }
    }
  }
}
.weui-grid {
  padding: 0.1333rem;
}
.weui-grids:before {
  border-left: none;
}
.weui-grids:after {
  border-left: none;
}
.weui-grids:before {
  border-top: none;
}
.weui-grid:before {
  border-right: none;
}
.weui-grid:after {
  border-bottom: none;
}
</style>
