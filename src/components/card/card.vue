<template>
 <div id="card" class="card">
   <my-header title="我的卡券" bg="#fff"></my-header>
     <div class="tab_wrapper">
      <tab bar-active-color="#FFAE00">
        <tab-item selected @on-item-click="onItemClick">未使用(2)</tab-item>
        <tab-item @on-item-click="onItemClick">已使用(1)</tab-item>
        <tab-item @on-item-click="onItemClick">已过期(2)</tab-item>
      </tab>
     </div>
    <!-- 温馨提示 -->
    <div class="warm_tips">
        <p class="tips">温馨提示：绑定手机，方便您到店核销</p>
        <span class="bingTel" @click="bindTel">绑定手机</span>
    </div>
    <!-- 优惠券列表 -->
    <div class="discount_wrapper">
      <!-- 未使用 -->
      <ul class="no_user_list" v-show="tagIndex==0">
        <li class="item" v-for="(item,index) in unusedList" @click="selectDiscout">
          <div class="left1">
            <p class="name">{{item.content}}</p>
            <p class="time">{{item.time}}</p>
          </div>
          <div class="right1">
            立即使用
          </div>
        </li>
      </ul>
      <!-- 已使用 -->
      <ul class="usered_list" v-show="tagIndex==1">
        <li class="item" v-for="(item,index) in usedList" :key="index">
          <div class="left1">
            <p class="name">{{item.content}}</p>
            <p class="time">{{item.time}}</p>
          </div>
          <div class="right1">
            已使用
          </div>
        </li>
      </ul>
      <!-- 已过期 -->
       <ul class="past_list" v-show="tagIndex==2">
        <li class="item" v-for="(item,index) in timeOutList" :key="index">
          <div class="left1">
            <p class="name">{{item.content}}</p>
            <p class="time">{{item.time}}</p>
          </div>
          <div class="right1">
            已过期
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="discount_wrapper">
        <ul class="discount_list">
            <li @click="select_discount">
               <div class="wrapper">
                  <div class="content">
                      <div class="title">
                         10元优惠券
                      </div>
                      <div class="time">
                          有效期至: 2018-01-25
                      </div>
                  </div>
                  <div class="split-line"></div>
                  <div class="tip">
                      <div class="money">
                          申请使用
                      </div>
                  </div>
              </div>
            </li>
        </ul>
    </div> -->
    <validate v-show="isShow"></validate>
    <router-view></router-view>
 
 </div>
</template>

<script type='text/ecmascript-6'>
import { Tab, TabItem, XHeader, XButton } from "vux";
import Validate from "../../base/validatephone/validatephone";
import { mapGetters, mapMutations } from "vuex";
import myHeader from "../../base/myheader/myheader.vue";
export default {
  data() {
    return {
      flag: false,
      tagIndex: 0,
      unusedList: [
        {
          content: "啤酒9折优惠券",
          time: "过期时间:2018-01-25"
        },
        {
          content: "啤酒9折优惠券",
          time: "过期时间:2018-01-25"
        },
        {
          content: "啤酒9折优惠券",
          time: "过期时间:2018-01-25"
        },
        {
          content: "啤酒9折优惠券",
          time: "过期时间:2018-01-25"
        }
      ],
      usedList: [
        {
          content: "啤酒9折优惠券",
          time: "过期时间:2018-01-25"
        },
        {
          content: "啤酒9折优惠券",
          time: "过期时间:2018-01-25"
        },
        {
          content: "啤酒9折优惠券",
          time: "过期时间:2018-01-25"
        },
        {
          content: "啤酒9折优惠券",
          time: "过期时间:2018-01-25"
        }
      ],
      timeOutList: [
        {
          content: "啤酒9折优惠券",
          time: "过期时间:2018-01-25"
        },
        {
          content: "啤酒9折优惠券",
          time: "过期时间:2018-01-25"
        },
        {
          content: "啤酒9折优惠券",
          time: "过期时间:2018-01-25"
        },
        {
          content: "啤酒9折优惠券",
          time: "过期时间:2018-01-25"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["isShow"])
  },
  methods: {
    //返回上一页
    goBack() {
      this.$router.go(-1);
    },
    // 显示优惠券详情
    select_discount() {
      this.$router.push({
        name: "chat_detail"
      });
    },
    //进入优惠券详情
    selectDiscout() {
      let id = 0;
      this.$router.push({
        path: `/card/${id}`
      });
    },
    //绑定手机
    bindTel() {
      // this.isShow = true;
      this.changeValidate(true);
    },
    onItemClick(index) {
      this.tagIndex = index;
      console.log(this.tagIndex);
    },
    onClickBack() {},
    ...mapMutations({
      changeValidate: "CHANGE_VALIDATE"
    })
  },
  components: {
    Tab,
    TabItem,
    XHeader,
    XButton,
    Validate,
    myHeader
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/variable.less";
@import "../../assets/less/base.less";
@import "../../assets/less/mixin.less";
@import "../../assets/less/card.less";
.card {
  height: 100%;
  background: #eee;
  .tab_wrapper {
    .vux-tab .vux-tab-item {
      color: #333;
    }
    .vux-tab .vux-tab-item.vux-tab-selected {
      color: #ffae00;
    }
    .border-1px(#ddd);
  }
  .warm_tips {
    padding: 0.175rem 0.25rem;
    display: flex;
    justify-content: space-between;
    .tips {
      // line-height: 1.8125rem;
      padding-top: 0.15rem;
      box-sizing: border-box;
      font-size: 0.4rem;
    }
    .bingTel {
      display: inline-block;
      width: 1.8rem;
      padding: 0.2rem 0;
      border: 1px solid #ccc;
      text-align: center;
      border-radius: 6px;
      background-color: #ccc;
      color: #fff;
    }
  }
  .discount_wrapper {
    // margin-top: 0.2133rem;
    padding: 0 0.1867rem;
    .no_user_list {
      .card("../../assets/image/discount_bg.png",0.5333rem);
    }
    .usered_list {
      .card("../../assets/image/used.png",0.7333rem);
    }
    .past_list {
      .card("../../assets/image/past.png",0.7333rem);
    }
  }
  // .discount_wrapper {
  //   padding: 0px 0.25rem;
  //   margin: 0.1rem auto;
  //   .discount_list {
  //     //   width: 21.875rem;
  //     li {
  //       width: 8.75rem;
  //       height: 1.75rem;
  //       margin: 0 auto;
  //       // border: 1px solid #ccc;
  //       margin-bottom: 0.5rem;
  //       text-align: center;
  //       .wrapper {
  //         width: 100%;
  //         height: 100%;
  //         display: flex;
  //         background: #fff;
  //         border-radius: 8px;
  //         .content {
  //           flex: 1;
  //           border-radius: 8px 0 0 8px;
  //           box-shadow: -2px 2px 2px #ccc;
  //           background: #fff;
  //           display: flex;
  //           flex-direction: column;
  //           justify-content: space-around;
  //           .title {
  //             height: 20px;
  //           }
  //           .time {
  //             height: 20px;
  //           }
  //         }
  //         .split-line {
  //           position: relative;
  //           flex: 0 0 0;
  //           border-left: 2px dashed #eee;
  //           margin: 0 5px 0 3px;
  //           background: #fff;
  //         }
  //         .split-line:before,
  //         .split-line:after {
  //           content: "";
  //           position: absolute;
  //           width: 16px;
  //           height: 8px;
  //           background: #eee;
  //           left: -9px;
  //           z-index: 1;
  //         }
  //         .split-line:before {
  //           border-radius: 0 0 8px 8px;
  //           top: 0;
  //         }
  //         .split-line:after {
  //           border-radius: 8px 8px 0 0;
  //           bottom: 0;
  //         }
  //         .tip {
  //           display: flex;
  //           flex-direction: column;
  //           justify-content: space-around;
  //           border-radius: 0 8px 8px 0;
  //           box-shadow: 2px 2px 2px #ccc;
  //           background: #fff;
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>
