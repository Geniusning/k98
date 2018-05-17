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
      <div class="chat_wrapper" ref="chatWrapper" @click="actionShow=false">
        <scroll class="chat_content" :data="chatList2">
          <ul class="chat_list">
              <li class="clearfix" :class="{'friend':index<5,'mine':index>=5}" v-for="(item,index) in chatList">
                  <div class="person_box">
                      <h2 class="name">19:20:10</h2>
                      <img src="../../assets/image/avatar3.jpg" alt="" class="avatar">
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
          <input type="text" id="send_message" class="send_message" @focus.prevent="focus" v-model="input_value">
          <div class="action_box clearfix">
              <img src="../../assets/image/plane.png" alt="" class="icon_plane fl">
              <span class="send fl">发送</span>
          </div>
        </div>
        <div class="select_area">
          <ul class="selectList clearfix">
            <li class="item fl">
              <img src="../../assets/image/chat_pic.png" alt="">
              <input type="file" class="file">
            </li>
             <li class="item fl">
              <img src="../../assets/image/chat_emotion.png" alt="" @click="show_emotion">
            </li>
             <li class="item fl">
              <img src="../../assets/image/chat_gift.png" alt="">
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
  GridItem
} from "vux";
import Scroll from "../../base/scroll/scroll.vue";
export default {
  data() {
    return {
      show: false,
      showTab: true,
      emotionShow: false,
      actionShow: false,
      input_value: "",
      chatList: [
        {
          message:
            "哈哈，很高兴认识你哦1我们这里是全深圳全好的kTV,音响质量超级好"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        }
      ],
      chatList2: [
        {
          message: "哈哈，很高兴认识你哦1"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
        },
        {
          message: "哈哈，很高兴认识你哦"
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
      ]
    };
  },
  created() {
    console.log(document.body.clientHeight);
  },
  mounted() {},
  methods: {
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
    //展示表情面板
    show_emotion() {
      this.emotionShow = !this.emotionShow;
      this.actionShow = false;
    },
    // 切换表情面板
    toggle_emotion() {
      this.actionShow = !this.actionShow;
      this.emotionShow = false;
    },
    onItemClick(index) {
      console.log(index);
      if (index == 0) {
        this.showTab = true;
      } else {
        this.showTab = false;
      }
    },
    focus() {
      this.actionShow = false;
      this.emotionShow = false;
    }
  },
  watch: {
    input_value(newValue, oldValue) {
      if (newValue.length > 0 || oldValue > 0) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  },
  components: {
    XHeader,
    Scroller,
    TransferDom,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    Scroll
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
    padding: 0 0.4rem;
    //输入区域
    .input_area {
      padding: 0.2133rem 0;
      height: 1.44rem;
      box-sizing: border-box;
      .send_message {
        float: left;
        width: 6.9333rem;
        height: 0.9867rem;
        text-indent: 0.2667rem;
        border: 1px solid #999;
      }
      .action_box {
        margin-left: 0.1667rem;
        float: left;
        // width: 2rem;
        background: #ffd800;
        border-radius: 0.1067rem;
        padding: 0.27rem 0.2333rem;
        box-sizing: border-box;
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
          margin-right: 0.4rem;
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
      }
    }
    // background: green;
  }
}

.weui-grid {
  padding: 0.1333rem;
}
</style>
