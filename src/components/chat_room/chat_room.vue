<template>
 <div id="chat" class="chatRoom">
      <x-header>小红帽<a slot="right"></a></x-header>
      <div class="chat_wrapper" ref="chatWrapper" @click="actionShow=false">
        <scroller :lock-x="true" height="-112">
          <ul class="chat_list">
              <li class="left clearfix">
                  <div class="person_box">
                      <h2 class="name">19:20:10</h2>
                      <img src="../../assets/image/avatar3.jpg" alt="" class="avatar">
                  </div>
                  <div class="message_box">
                    <p  class="message">您好</p>
                  </div>
              </li>
               <li class="left clearfix">
                  <div class="person_box">
                      <h2 class="name">19:20:10</h2>
                      <img src="../../assets/image/avatar3.jpg" alt="" class="avatar">
                  </div>
                  <div class="message_box">
                    <p  class="message">你是我的眼</p>
                  </div>
              </li>
               <li class="left clearfix">
                  <div class="person_box">
                      <h2 class="name">19:20:10</h2>
                      <img src="../../assets/image/avatar3.jpg" alt="" class="avatar">
                  </div>
                  <div class="message_box">
                    <p class="message">你是我的眼</p>
                  </div>
              </li>
               <li class="left clearfix">
                  <div class="person_box">
                      <h2 class="name">19:20:10</h2>
                      <img src="../../assets/image/avatar3.jpg" alt="" class="avatar">
                  </div>
                  <div class="message_box">
                    <p class="message">你是我的眼</p>
                  </div>
              </li>
               <li class="left clearfix">
                  <div class="person_box">
                      <h2 class="name">19:20:10</h2>
                      <img src="../../assets/image/avatar3.jpg" alt="" class="avatar">
                  </div>
                  <div class="message_box">
                    <p class="message">你是我的眼</p>
                  </div>
              </li>
              <li class="right clearfix">
                   <div class="person_box2">
                      <h2 class="name2">19:20:10</h2>
                      <img src="../../assets/image/avatar2.jpg" alt="" class="avatar2">
                  </div>
                  <div class="message_box2">
                    <p class="message2">你衣是我的眼</p>
                  </div>
              </li>
                 <li class="right clearfix">
                   <div class="person_box2">
                      <h2 class="name2">19:20:10</h2>
                      <img src="../../assets/image/avatar2.jpg" alt="" class="avatar2">
                  </div>
                  <div class="message_box2">
                    <p class="message2">你衣是我的眼</p>
                  </div>
              </li>
                 <li class="right clearfix">
                   <div class="person_box2">
                      <h2 class="name2">19:20:10</h2>
                      <img src="../../assets/image/avatar2.jpg" alt="" class="avatar2">
                  </div>
                  <div class="message_box2">
                    <p class="message2">你衣是我的眼</p>
                  </div>
              </li>
                 <li class="right clearfix">
                   <div class="person_box2">
                      <h2 class="name2">19:20:10</h2>
                      <img src="../../assets/image/avatar2.jpg" alt="" class="avatar2">
                  </div>
                  <div class="message_box2">
                    <p class="message2">你衣是我的眼</p>
                  </div>
              </li>
                 <li class="right clearfix">
                   <div class="person_box2">
                      <h2 class="name2">19:20:10</h2>
                      <img src="../../assets/image/avatar2.jpg" alt="" class="avatar2">
                  </div>
                  <div class="message_box2">
                    <p class="message2">你衣是我的眼</p>
                  </div>
              </li>
                 <li class="right clearfix">
                   <div class="person_box2">
                      <h2 class="name2">19:20:10</h2>
                      <img src="../../assets/image/avatar2.jpg" alt="" class="avatar2">
                  </div>
                  <div class="message_box2">
                    <p class="message2">你衣是我的眼</p>
                  </div>
              </li>
                 <li class="right clearfix">
                   <div class="person_box2">
                      <h2 class="name2">19:20:10</h2>
                      <img src="../../assets/image/avatar2.jpg" alt="" class="avatar2">
                  </div>
                  <div class="message_box2">
                    <p class="message2">你衣是我的眼</p>
                  </div>
              </li>
                 <li class="right clearfix">
                   <div class="person_box2">
                      <h2 class="name2">19:20:10</h2>
                      <img src="../../assets/image/avatar2.jpg" alt="" class="avatar2">
                  </div>
                  <div class="message_box2">
                    <p class="message2">你衣是我的眼</p>
                  </div>
              </li>
          </ul>
        </scroller>
      </div>
      <div class="input_wrapper">
        <div class="input_area clearfix">
          <input type="text" id="send_message" class="send_message" @focus.prevent="focus" v-model="input_value">
          <div class="action_box">
            <img src="../../assets/image/emotion.png" alt="" id="emotion" class="emotion" @click="show_emotion">
            <span v-if="show" class="sendBtn">发送</span>
            <img v-else src="../../assets/image/plus.png" alt="" class="other_action" @click="toggle_emotion">
          </div>
        </div>
        <div class="emotion_area" v-if="emotionShow">
           <swiper :auto="false" height="150px" dots-position="center">
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
        <div class="action_area" v-if="actionShow">
          <tab :scroll-threshold="5" :line-width="1">
            <tab-item v-for="(item,index) in list" :key="index" :selected="index===0" @on-item-click="onItemClick">{{ item }}</tab-item>
          </tab>
          <div class="content_system" v-show="showTab">
            <ul class="systemList">
              <li>
                <img src="../../assets/image/pic.png" alt="">
                <p>图片</p>
              </li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="content_gift" v-show="!showTab">
            <ul class="giftList">
              <li>
                <img src="../../assets/image/gift (1).png" alt="">
                <p>￥1.99</p>
                <p>小飞机</p>
              </li>
              <li>
                 <img src="../../assets/image/gift.png" alt="">
                <p>￥8.88</p>
                <p>小花朵</p>
              </li>
              <li>  
                 <img src="../../assets/image/018-gift.png" alt="">
                <p>￥10</p>
                <p>大炮</p>
              </li>
            </ul>
          </div>
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
  GridItem,
} from "vux";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      show: false,
      showTab: true,
      emotionShow: false,
      actionShow: false,
      input_value: "",
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
  mounted() {
    // this.Slider = new BScroll(this.$refs.chatWrapper, {
    //   scrollY: true,
    //   click: false,
    //   tap: true,
    //   autoBlur: true
    // });
  },
  methods: {
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
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/variable.less";
.chatRoom {
  height: 100%;
  display: flex;
  flex-direction: column;
  .chat_wrapper {
    flex: 1;
    padding: 0 0.625rem;
    overflow-y: auto;
    .chat_list {
      width: 100%;
      //   padding: 0.625rem;
      .left {
        width: 100%;
        // display: flex;
        // justify-content: flex-start;
        .person_box {
          float: left;
          text-align: center;

          .name {
            font-size: 12px;
          }
          .avatar {
            width: 0.875rem;
            height: 0.875rem;
            border-radius: 0.875rem;
          }
        }
        .message_box {
          padding: 0.225rem 0px;
          float: left;
          .message {
            background-color: #fff;
            text-align: left;
            padding: 0.375rem;
            border-radius: 6px;
            max-width: 10rem;
            font-size: 0.3567rem;
          }
        }
      }
      .right {
        width: 100%;
        .person_box2 {
          float: right;
          text-align: center;
          .name2 {
            // width: 100px;
            // float: left;
          }
          .avatar2 {
            width: 0.875rem;
            height: 0.875rem;
            border-radius: 0.875rem;
          }
        }
        .message_box2 {
          padding: 0.225rem 0px;
          float: right;
          margin-right: 0.375rem;
          .message2 {
            background-color: #fff;
            text-align: left;
            padding: 0.375rem;
            border-radius: 6px;
            max-width: 10rem;
          }
        }
      }
    }
  }
  .input_wrapper {
    // height: 3.5rem;
    border-top: 1px solid #ccc;
    background: #fff;
    .input_area {
      padding-left: 0.125rem;
      margin-bottom: 0.08rem;
      .send_message {
        float: left;
        margin-right: 10px;
        margin-top: 0px;
        border: none;
        border-bottom: 1px solid #ccc;
        width: 75%;
        height: 0.9rem;
      }
      .action_box {
        // padding: 10px;
        float: left;
        padding-top: 0.08rem;
        .emotion {
          width: 0.875rem;
          height: 0.875rem;
          // vertical-align: -12px;
          float: left;

        }
        .sendBtn {
          display: inline-block;
          width: 1rem;
          text-align: center;
          height: 0.775rem;
          line-height: 0.775rem;
          background-color: #FF7800;
          border-radius: 0.08rem;
          color: #fff;
           float: left;
        }
        .other_action {
          width: 0.8rem;
          height: 0.8rem;
          // vertical-align: -9px;
          margin-left: 0.25rem;
           float: left;
        }
      }
    }
    // 表情区域
    .emotion_area {
      .grid-center {
        display: block;
        text-align: center;
        padding: 4px;
      }
    }
    .action_area {
      width: 100%;
      height: 3rem;
      .content_system {
        width: 100%;
        height: 100%;
        .systemList {
          width: 100%;
          padding-top: 0.4rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          li {
            img {
              width: 30px;
              height: 30px;
            }
            p {
               font-size: 0.3467rem;;
              text-align: center;
            }
          }
        }
      }
      .content_gift {
        .giftList {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          li {
            text-align: center;
            img {
              width: 30px;
              height: 30px;
            }
            p {
              font-size: 12px;
              text-align: center;
            }
          }
        }
      }
    }
    // background: green;
  }
}
</style>
