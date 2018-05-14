<template>
 <div id="message" class="message">
   <div class="title">
     <!-- <span :class="{active:isShow}" @click="changeMessage">消息</span><span :class="{active:!isShow}" @click="changeMessage">联系人</span> -->
      <button-tab v-model="selected_num">
        <button-tab-item class="button_tab" @on-item-click="isShow=true">好友的消息</button-tab-item>
        <button-tab-item class="button_tab" @on-item-click="isShow=false">新朋友招呼</button-tab-item>
      </button-tab>
      
   </div>
   <div class="message_wrapper">
     <ul class="message_list" v-if="isShow">
       <li class="item border-1px" @click="chat">
         <div class="info_message">
           <div class="avatar">
             <img src="../../assets/image/avatar2.jpg" alt="">
           </div>
           <div class="name_and_message">
             <p class="name">小番茄</p>
             <p class="message">今天天气很好</p>
           </div>
         </div>
         <div class="info_time">
           <p>下午  11:11</p>
         </div>
       </li>
       <li class="item border-1px">
         <div class="info_message">
           <div class="avatar">
             <img src="../../assets/image/avatar3.jpg" alt="">
           </div>
           <div class="name_and_message">
            <p class="name">小番茄</p>
             <p class="message">今天天气很好</p>
           </div>
         </div>
         <div class="info_time">
           <p>下午  18:11</p>
         </div>
       </li>
        <li class="item border-1px">
         <div class="info_message">
           <div class="avatar">
             <img src="../../assets/image/avatar.jpg" alt="">
           </div>
           <div class="name_and_message">
            <p class="name">小番茄</p>
             <p class="message">今天天气很好</p>
           </div>
         </div>
         <div class="info_time">
           <p>下午  13:11</p>
         </div>
       </li>
     </ul>
     <div class="message_list" v-else>
       <tab bar-active-color="#ffd800">
        <tab-item selected >点赞</tab-item>
        <tab-item >送礼</tab-item>
        <tab-item >约战</tab-item>
      </tab>
     </div>
   </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import { Tab, TabItem, ButtonTab, ButtonTabItem, Divider } from "vux";
export default {
  data() {
    return {
      color:"#ffd800",
      isShow: true,
      selected_num: 0
    };
  },
  methods: {
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
    }
  },
  components: {
    ButtonTab,
    ButtonTabItem,
    Tab,
    TabItem
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/base.less";
@import "../../assets/less/mixin.less";
.message {
  height: 100%;
  overflow-y: auto;
}
.title {
  text-align: center;
  padding: 0.11rem 0.9125rem;
  span {
    display: inline-block;
    width: 4rem;
    height: 1.25rem;
    line-height: 1.25rem;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 10px;
    &.active {
      background-color: red;
      color: #fff;
    }
  }
}
.message_wrapper {
  width: 100%;
  .message_list {
    margin-top: 10px;
    padding: 0 0.2667rem;
    .item {
      display: flex;
      justify-content: space-between;
      .border-1px(#ccc);
      padding-bottom: 6px;
      margin-bottom: 8px;
      .info_message {
        display: flex;
        font-size: 12px;
        .avatar {
          margin-right: 6px;
          width: 1.4133rem;
          height: 1.4133rem;
          img {
            width: 1.4133rem;
            height: 1.4133rem;
            border-radius: 50%;
          }
        }
        .name_and_message {
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
          }
        }
      }
      .info_time {
        padding-top: 0.3333rem;
        font-size: 0.3733rem;
        color: #999;
      }
    }
  }
}
</style>
