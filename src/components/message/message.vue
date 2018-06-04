<template>
 <div id="message" class="message">
   <div class="title">
     <!-- <span :class="{active:isShow}" @click="changeMessage">消息</span><span :class="{active:!isShow}" @click="changeMessage">联系人</span> -->
      <!-- <button-tab v-model="selected_num">
        <button-tab-item class="button_tab" @on-item-click="onItemClick_tab">好友的列表</button-tab-item>
        <button-tab-item class="button_tab" @on-item-click="onItemClick_tab">新朋友招呼</button-tab-item>
        <button-tab-item class="button_tab" @on-item-click="onItemClick_tab">系统消息</button-tab-item>
      </button-tab> -->
      <div class="btn_box clearfix">
        <div :class="{active:isShow==0}" class="fri_btn fl" @click="btn_fri">好友</div>
        <div :class="{active:isShow==1}" class="hello_btn fl" @click="btn_hello">新朋友招呼<i class="dot" v-show="friendEvtList.length"></i></div>
        <div :class="{active:isShow==2}" class="system_btn fl" @click="btn_sys">店长消息</div>
      </div>
      <!-- <div class="dot" v-if="hello"></div> -->
   </div>
   <div class="message_wrapper">
     <ul class="message_list" style="margin-top:0.4rem" v-if="isShow==0">
       <li class="item vux-1px-b" @click="chat" v-for="(item,index) in alreadyFriendList">
         <div class="info_message">
           <div class="avatar">
             <img :src="item.info.headimgurl?item.info.headimgurl:'http://i1.bvimg.com/643118/795ecd968a430f39.png'" alt="">
             <!-- <i class="dot"></i> -->
           </div>
           <div class="name_and_message">
             <p class="name">{{item.info.nickname}}</p>
             <p class="message">今天天气很好</p>
           </div>
         </div>
         <div class="info_time">
           <p>下午  11:11</p>
         </div>
       </li>
     </ul>
     <div class="message_list" v-else-if="isShow==1">
       <tab bar-active-color="#ffd800" default-color="#999">
        <tab-item selected @on-item-click="onItemClick">点赞</tab-item>
        <tab-item @on-item-click="onItemClick">送礼</tab-item>
        <tab-item @on-item-click="onItemClick">约战</tab-item>
      </tab>
      <div class="newFriend_wrapper">
        <!-- 点赞 -->
        <ul class="newMessage_list" v-if="greeting_flag===0">
          <li class="item vux-1px-b" v-for="(item,index) in friendEvtList" :key="index">
            <div class="info_message">
              <div class="avatar">
                <img :src="item.from.headimgurl" alt="">
                <i class="dot"></i>
              </div>
              <div class="name_and_message">
                <p class="name">{{item.from.nickname}}</p>
                <p class="message">/thumb给我一个赞</p>
              </div>
            </div>
            <div class="thumb_wrapper clearfix" v-show="thumb_flag">
              <p class=" back_thumb vux-1px fl reject " @click="backThumbClick(item.evtID,'no')">飘过</p>
              <p class=" back_thumb vux-1px fl" @click="backThumbClick(item.evtID,'yes')">回赞</p>
            </div>
          </li>
        </ul>
        <!-- 送礼 -->
        <ul class="newMessage_list" v-if="greeting_flag===1">
          <li class="item vux-1px-b">
            <div class="info_message">
              <div class="avatar">
                <img src="../../assets/image/avater1.jpg" alt="">
                <i class="dot"></i>
              </div>
              <div class="name_and_message">
                <p class="name">小包包</p>
                <p class="message">/gift小包包送了一个飞机给我</p>
              </div>
            </div>
            <div class="thumb_wrapper">
              <p class="back_thumb vux-1px">感谢</p>
            </div>
          </li>
        </ul>
        <!-- 游戏 -->
        <ul class="newMessage_list" v-if="greeting_flag===2">
          <li class="item vux-1px-b">
            <div class="info_message">
              <div class="avatar">
                <img src="../../assets/image/avatar3.jpg" alt="">
                <i class="dot"></i>
              </div>
              <div class="name_and_message">
                <p class="name">小灭霸</p>
                <p class="message">/game小灭霸邀请我玩一把</p>
              </div>
            </div>
            <div class="thumb_wrapper">
              <p class="time">11:00</p>
            </div>
          </li>
        </ul>
      </div>
     </div>
     <ul class="message_list" style="margin-top:0.4rem" v-else>
        <li class="item vux-1px-b" @click="chat">
         <div class="info_message">
           <div class="avatar">
             <!-- <img :src="item.info.headimgurl?item.info.headimgurl:'http://i1.bvimg.com/643118/795ecd968a430f39.png'" alt=""> -->
             <img src="../../assets/image/avatar3.jpg" alt="">
             <i class="dot"></i>
           </div>
           <div class="name_and_message">
             <!-- <p class="name">{{item.info.nickname}}</p> -->
             <p class="name">美女店长</p>
             <p class="message">有事请您留言</p>  
           </div>
         </div>
         <div class="info_time">
           <p>下午  11:11</p>
         </div>
       </li>
     </ul>
   </div>
   <!-- 回赞 -->
    <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :text="text" :position="position"></toast>
 </div>
</template>

<script type='text/ecmascript-6'>
import api from "common/api";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import { Tab, TabItem, ButtonTab, ButtonTabItem, Toast } from "vux";
export default {
  data() {
    return {
      color: "#ffd800",
      hello: false,
      isShow: 0, //最上面tab切换
      selected_num: 0,
      greeting_flag: 0,
      messageList: [],
      text: "",
      // friendList:[],
      position: "default",
      thumb_flag: true, //回赞的box的flag
      showPositionValue: false //回赞的toast的flag
    };
  },
  //路由判断，判断是从导航栏进入消息页面还是从店长信箱进入消息页面
  beforeRouteEnter(to, from, next) {
    if (to.params.num === 2) {
      next(vm => {
        vm.isShow = 2;
      });
    } else {
      next(vm => {
        vm.isShow = 0;
      });
    }
  },
  computed: {
    // ...mapGetters(["friendList"]),
    ...mapState(["friendEvtList", "alreadyFriendList"])
  },
  mounted() {
    // this._loadFriendEvts();
    // console.log(this.friendList)
    this._loadFriends();
  },
  methods: {
    btn_fri() {
      this.isShow = 0;
    },
    btn_hello() {
      this.isShow = 1;
    },
    btn_sys() {
      this.isShow = 2;
    },
    //回赞事件
    backThumbClick(type, flag) {
      // let that = this;
      var cursor = 0
      api.giveBackThumb(type, flag).then(res => {
        // console.log(res);
        if (res.errcode === 0) {
          //重新拉取已经成为好友列表
          this._loadFriends();
          //重新拉取好友事件
          this.getFriendEvt(cursor)
          if (flag == "yes") {
            this.text = "已回赞";
          } else {
            this.text = "已拒绝";
          }
          this.showPositionValue = true;
        }
      });
    },

    _loadFriends() {
      let cursor = 0;
      let that = this;
      this.getAlreadyFriendList(cursor);
    },
    // tab事件
    onItemClick(index) {
      this.greeting_flag = index;
      console.log(index);
    },
    onItemClick_tab(index) {
      this.isShow = index;
    },
    changeMessage() {
      this.isShow = !this.isShow;
    },
    consoleIndex() {
      console.log(this.selected_num);
    },
    //发起聊天
    chat() {
      this.$router.push({
        name: "chat"
      });
    },
    ...mapMutations({
      addBadgeCount: "ADD_BADGE"
    }),
    ...mapActions({
      getAlreadyFriendList: "get_alreadyFriendList",
      getFriendEvt:"get_FriendEvt",
    })
  },
  components: {
    ButtonTab,
    ButtonTabItem,
    Tab,
    TabItem,
    Toast
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/base.less";
@import "../../assets/less/mixin.less";
@import "../../assets/less/variable.less";
@import "../../assets/less/message_common.less";
.message {
  height: 100%;
  overflow-y: auto;
}
.title {
  text-align: center;
  padding: 0.11rem 0.9125rem;
  margin-top: 0.1333rem;
  .btn_box {
    .fri_btn {
      width: 2.71rem;
      text-align: center;
      height: 0.8533rem;
      line-height: 0.8533rem;
      border: 1px solid #eee;
      box-sizing: border-box;
      border-top-left-radius: 0.4267rem;
      border-bottom-left-radius: 0.4267rem;
      font-size: 0.4rem;
      position: relative;
      &.active {
        background: #ffd800;
        color: #fff;
        border: 1px solid #ffd800;
      }
      .dot {
        .dot(-0.1rem,-0.1rem);
      }
    }
    .hello_btn {
      width: 2.71rem;
      text-align: center;
      height: 0.8533rem;
      line-height: 0.8533rem;
      box-sizing: border-box;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      font-size: 0.4rem;
      position: relative;
      &.active {
        background: #ffd800;
        color: #fff;
        border-top: 1px solid #ffd800;
        border-bottom: 1px solid #ffd800;
      }
      .dot {
        .dot(-0.1rem,-0.1rem);
      }
    }
    .system_btn {
      width: 2.71rem;
      text-align: center;
      height: 0.8533rem;
      line-height: 0.8533rem;
      box-sizing: border-box;
      border: 1px solid #eee;
      border-top-right-radius: 0.4267rem;
      border-bottom-right-radius: 0.4267rem;
      font-size: 0.4rem;
      position: relative;
      &.active {
        background: #ffd800;
        color: #fff;
        border: 1px solid #ffd800;
      }
      .dot {
        .dot(-0.1rem,-0.1rem);
      }
    }
  }
  .dot {
    .dot(0.2rem,0.8rem);
  }
  span {
    display: inline-block;
    width: 4rem;
    height: 1.25rem;
    line-height: 1.25rem;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  .vux-button-group > a {
    color: #666;
  }
  .vux-button-group > a.vux-button-group-current {
    color: #fff;
  }
}
.message_wrapper {
  width: 100%;
  .message_list {
    // margin-top: 10px;
    padding: 0 0.2667rem;
    .item {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      height: 1.8133rem;
      // .border-1px(#ccc);
      padding-bottom: 6px;
      margin-bottom: 8px;
      .info_message {
        display: flex;
        font-size: 12px;
        .avatar {
          margin-right: 6px;
          width: 1.4133rem;
          height: 1.4133rem;
          position: relative;
          img {
            width: 1.4133rem;
            height: 1.4133rem;
            border-radius: 50%;
          }
          .dot {
            .dot(0,0);
          }
        }
        .name_and_message {
          box-sizing: border-box;
          padding-left: 0.3233rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .name {
            color: #333333;
            font-size: 0.4267rem;
            font-weight: 800;
          }
          .message {
            color: #666;
            height: 0.6667rem;
            font-size: 0.3467rem;
            margin-top: 0.4rem;
          }
        }
      }
      .info_time {
        // padding-top: 0.3333rem;
        font-size: 0.3733rem;
        color: #999;
      }
    }
  }
  .newFriend_wrapper {
    margin-top: 0.35rem;
    .newMessage_list {
      .item {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        box-sizing: border-box;
        padding-top: 0.1867rem;
        padding-bottom: 6px;
        margin-bottom: 8px;
        .info_message {
          display: flex;
          font-size: 12px;
          .avatar {
            margin-right: 6px;
            width: 1.4133rem;
            height: 1.4133rem;
            position: relative;
            img {
              width: 1.4133rem;
              height: 1.4133rem;
              border-radius: 50%;
            }
            .dot {
              .dot(0,0);
            }
          }
          .name_and_message {
            box-sizing: border-box;
            padding-left: 0.3233rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .name {
              color: #333333;
              font-size: 0.4267rem;
              font-weight: 800;
            }
            .message {
              color: #666;
              height: 0.6667rem;
              font-size: 0.3467rem;
              margin-top: 0.4rem;
            }
          }
        }
        .thumb_wrapper {
          .back_thumb {
            box-sizing: border-box;
            width: 1.3333rem;
            padding: 0.0567rem 0;
            text-align: center;
            // .border-1px(@baseColor);
            font-size: 0.3467rem;
            color: #999;
            border-radius: 0.2667rem;
            margin-right: 0.1333rem;
          }
          .reject {
            margin-right: 0.2rem;
          }
          .time {
            font-size: 0.3733rem;
            color: #999;
            padding-right: 0.2667rem;
          }
        }
      }
    }
  }
}
.vux-1px:before {
  border-radius: 0.2667rem;
  border: 1px solid @baseColor;
}
.vux-tab .vux-tab-item.vux-tab-selected {
  color: #333;
}
.vux-button-group > a {
  height: 0.8533rem;
}
// .vux-button-group > a.vux-button-tab-item-middle:after {
//   // border-right: 1px solid #666;
//   // border-top: 1px solid #666;
//   // border-bottom: 1px solid #666;
// }
</style>
