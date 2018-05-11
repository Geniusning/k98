<template>
  <div id="friend" class="friend">
      <div class="nav">
        <!-- <img src="../../assets/image/Category.png" alt="" @click="personShow=true"> -->
        <!-- <span class="select" @click="showToast=true">筛选</span> -->
        <!-- <img src="../../assets/image/friends.png" alt="" @click="showFriendList = true"> -->
        <img src="../../assets/image/select.png" alt=""  @click="showToast=true">
      </div>
      <div class="stack-wrapper">
        <stack ref="stack" :pages="someList" :stackinit="stackinit" @firstData='listenFirstdata'></stack>
      </div>
      <!-- <div class="controls">
        <button @click="prev" class="button"><i class="prev"></i><span class="text-hidden">prev</span></button>
        <button @click="next" class="button"><i class="next"></i><span class="text-hidden">next</span></button>
      </div> -->
      <div class="control_wrapper">
        <div class="thumbs" @click="showPosition('middle')">
          <img src="../../assets/image/thumbs-o-up.png" alt="">
          <p>赞一个</p>
        </div>
        <div class="gifts" @click="showToast_gift=true">
           <img src="../../assets/image/gift.png" alt="">
           <p>见面礼</p>
        </div>
        <div class="playGame">
           <img src="../../assets/image/game.png" alt="">
           <p>玩一把</p>
        </div>
      </div>
    <!-- 个人资料 -->
      <div v-transfer-dom class="horizontal" :show-mask='show_mask'>
          <popup v-model="personShow" position="left"  :show-mask='show_mask'>
            <div :style="{width:'300px',height:height+'px'}" class="bg">
              <ul class="personList">
                <h3 class="title">个人信息</h3>
                <li>
                  <div class="left_box">
                    昵称
                  </div>
                  <div class="right_box" @click="changePersonInfo">
                    <span class="name">希公主</span>
                    <img src="../../assets/image/more.png" alt="" class="arrow">
                  </div>
                </li>
                <li>
                  <div class="left_box">
                    头像
                  </div>
                  <div class="right_box" @click="changePersonInfo">
                    <img src="../../assets/image/avatar.jpg" alt="" class="avatar">
                    <img src="../../assets/image/more.png" alt="" class="arrow">
                  </div>
                </li>
                <li>
                  <div class="left_box">
                    个人标签
                  </div>
                  <div class="right_box" @click="changeTagInfo">
                    <span class="tag">幽默</span>
                    <span class="tag">搞笑</span>
                    <span class="tag">逗比</span>
                    <img src="../../assets/image/more.png" alt="" class="arrow">
                  </div>
                </li>
              </ul>
            </div>
          </popup>
      </div>
      <!-- 筛选好友信息 -->
      <div v-transfer-dom>
            <x-dialog v-model="showToast" class="dialog-demo">
              <div class="select_wrapper">
                <img src="../../assets/image/close.png" alt="" class="close" @click="cancel">
                <p class="select_title">条件筛选</p>
                  <div class="sex_wrapper">
                    <h3>性别:</h3>
                    <ul class="sex_list">
                   
                      <li @click="chooseSex(index)" :class="{active:currentIndex1 == index}" v-for="(item,index) in sexArr" :key="index"><span>{{item.name}}</span></li>
                    </ul>
                  </div>
                  <div class="dis_wrapper">
                    <h3>范围:</h3>
                    <ul class="dis_list">
                      <!-- <li><span>范围:</span></li> -->
                      <li @click="chooseRange(index)" :class="{active:currentIndex2 == index}" v-for="(item,index) in rangeArr" :key="index">{{item.name}}</li>
                    </ul>
                  </div>
                  <p class="confirm" @click="cancel">确定</p>
              </div>
            </x-dialog>
      </div>


    <!-- 点赞 -->
    <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask text="赞过去了哦" :position="position"></toast>

    <!-- 见面礼 -->
      <div v-transfer-dom>
      <x-dialog v-model="showToast_gift" class="dialog-demo" :hide-on-blur="true">
        <div style="padding:15px;">
          <div class="friend_gift_wrapper">
            <ul class="gift_list">
              <li class="item">
                <img src="../../assets/image/gift (1).png" alt="">
                <p>￥1.68</p>
              </li>
              <li class="item">
                 <img src="../../assets/image/018-gift.png" alt="">
                <p>￥5.20</p>
              </li>
              <li class="item">
                 <img src="../../assets/image/3 gift bag present b.png" alt="">
                <p>￥6.66</p>
              </li>
            </ul>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import stack from "./tantan/tantan.vue";
import util from "common/util";
// import Scroll from "../../base/scroll/scroll";

import { Toast, TransferDom, Popup, XDialog, XButton, Scroller } from "vux";
export default {
  // el: "#stack",
  directives: {
    TransferDom
  },
  data() {
    return {
      showToast_gift: false, 
      position: "default",
      showPositionValue: false,
      personShow: false,
      showFriendList: false,
      showToast: false,
      show_mask: true,
      currentIndex1: 0,
      currentIndex2: 0,
      height: 0,
      sexArr: [
        {
          num: 0,
          name: "男"
        },
        {
          num: 1,
          name: "女"
        },
        {
          num: 2,
          name: "全部"
        }
      ],
      rangeArr: [
        {
          num: 0,
          name: "场内"
        },
        {
          num: 1,
          name: "场外"
        },
        {
          num: 2,
          name: "全部"
        }
      ],
      someList: [],
      stackinit: {
        visible: 3,
        currentPage: 0
      }
    };
  },
  created() {
    this.height = document.body.clientHeight;
    console.log(this.height);
  },
  mounted() {
    let that = this;
    // setTimeout(() => {
      that.someList = [
        {
          name: "安以轩",
          sex: "女",
          core: "3000",
          degree: "长老",
          thumb: "99",
          gift: "10",
          tag: ["二楞", "逗比"],
          avatar: "http://i1.bvimg.com/643118/795ecd968a430f39.png",
          online:"好友"
        },
        {
          name: "二毛",
          sex: "男",
          core: "3000",
          degree: "长老",
          thumb: "99",
          gift: "10",
          tag: ["二楞", "逗比"],
          avatar: "http://i1.bvimg.com/643118/66f258704c27edca.png",
          online:"陌生人"
        },
        {
          name: "凯特丝",
          sex: "女",
          core: "3000",
          degree: "长老",
          thumb: "99",
          gift: "10",
          tag: ["二楞", "逗比"],
          avatar: "http://i1.bvimg.com/643118/c8fbfc37236ea2c7.png",
          online:"好友"
        },
        {
          name: "六皇子",
          sex: "男",
          core: "3000",
          degree: "长老",
          thumb: "99",
          gift: "10",
          tag: ["二楞", "逗比"],
          avatar: "http://i1.bvimg.com/643118/e8156b29c3381636.png",
          online:"陌生人"
        },
        {
          name: "五阿哥",
          sex: "女",
          core: "3000",
          degree: "长老",
          thumb: "99",
          gift: "10",
          tag: ["二楞", "逗比"],
          avatar: "http://i1.bvimg.com/643118/dc9bba536bec851d.jpg",
          online:"好友"
        }
      ];
    // }, 17);
  },
  methods: {
    listenFirstdata(data){
      console.log('下面是传回父级的数据')
      console.log(data)
    },
    //点赞
    showPosition(position) {
      this.position = position;
      this.showPositionValue = true;
    },
    //跳转个人修改信息
    changePersonInfo() {
      util.routerTo("individual", this);
    },
    //跳转修改标签
    changeTagInfo() {
      util.routerTo("mine", this);
    },
    //发起聊天
    chat() {
      util.routerTo("chat", this);
    },
    // 性别选择
    chooseSex(index) {
      this.currentIndex1 = index;
    },
    chooseRange(index) {
      this.currentIndex2 = index;
    },
    cancel() {
      this.showToast = false;
    },
    // prev() {
    //   this.$refs.stack.$emit("prev");
    // },
    // next() {
    //   this.$refs.stack.$emit("next");
    // }
  },
  watch: {
    $route(newValue, oldValue) {
      console.log(newValue);
    }
  },
  components: {
    stack,
    Popup,
    Toast,
    XDialog,
    XButton,
    Scroller,
    // Scroll
  },
  watch: {
    // someList(newValue,oldValue){
    //   this.scroll.refresh()
    // }
  }
};
</script>
<style scoped lang="less">
@import "../../assets/less/variable.less";
@import "../../assets/less/friend_common.less";
@import "../../assets/less/mixin.less";
.friend {
  height: 100%;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .nav {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    padding: 0.09rem 0.3rem 0.1rem;
    box-sizing: border-box;
    .select {
      font-size: 13px;
      color: #ff7900;
      font-weight: 700;
    }
    img {
      width: 0.5333rem;
      height: 0.5333rem;
      margin-bottom: 0.08rem;
    }
  }
  .control_wrapper {
    // height: 5.625rem;
    display: flex;
    justify-content: space-between;
    padding: 0 1.0667rem;
    // margin-top: -0.2667rem;
    box-sizing: border-box;
    img {
      width: 1.6rem;
      height: 1.6rem;
    }
    .thumbs {
      .action;
     
    }
    .gifts {
      .action;
    
    }
    .playGame {
      .action;
    }
  }
  .stack-wrapper {
    margin: 0.09rem auto 0;
    position: relative;
    z-index: 1000;
    width: 8.9rem;
    height: 10rem;
    list-style: none;
    pointer-events: none;
  }
}
// 弹框礼物
.friend_gift_wrapper {
  .gift_list {
    display: flex;
    justify-content: space-between;
    padding: 0 0.4rem;
    .item {
      img {
        width: 1.5rem;
        height: 1.5rem;
      }
      p {
      }
    }
  }
}
//弹框选择
.select_wrapper {
  width: 8rem;
  height: 7.8rem;
  .bg("../../assets/image/bg.png");
  position: relative;
  // padding: 0.625rem;
  .close {
    position: absolute;
    right: 0.1333rem;
    top: 0.1333rem;
    width: 0.52rem;
    height: 0.52rem;
  }
  .select_title {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    padding-top: 0.5067rem;
  }
  .sex_wrapper {
    margin-top: 1rem;
    h3 {
      text-align: left;
      font-size: 16px;
      font-weight: 600;
      color: #333;
      text-indent: 0.5333rem;
      font-family: Arial, Helvetica, sans-serif;
    }
    .sex_list {
      display: flex;
      justify-content: flex-start;
      padding: 0.4133rem 0.625rem 0.6rem;
      // margin-left: 1.875rem;
      li {
        margin-right: 0.625rem;
        width: 1.7067rem;
        height: 0.6667rem;
        line-height: 0.6667rem;
        border: 1px solid #ccc;
        border-radius: 0.1333rem;
        // padding: 0.1875rem;
        font-size: 12px;
        &.active {
          background-color: #ff7900;
          color: #fff;
        }
      }
    }
  }
  .dis_wrapper {
    h3 {
      text-align: left;
      text-indent: 0.5333rem;
      font-size: 16px;
      font-weight: 600;
      color: #333;
      font-family: Arial, Helvetica, sans-serif;
    }
    .dis_list {
      display: flex;
      justify-content: flex-start;
      padding: 0.4133rem 0.625rem 0.6rem;
      // margin-left: 1.875rem;
      li {
        margin-right: 0.625rem;
        width: 1.7067rem;
        height: 0.6667rem;
        line-height: 0.6667rem;
        border: 1px solid #ccc;
        border-radius: 0.1333rem;
        &.active {
          background-color: #ff7900;
          color: #fff;
        }
      }
    }
  }
  .confirm {
    text-align: center;
    color: #ff7900;
    font-size: 14px;
    font-family: "PingFang-SC-Bold";
  }
  .cancel_btn {
    margin-right: 0.875rem;
  }
}
</style>