<template>
 <div id="card" class="card">
     <x-header @on-click-back="onClickBack"  class="user_head">优惠券</x-header>
     <tab bar-active-color="#668599">
      <tab-item selected @on-item-click="onItemClick">未使用</tab-item>
      <tab-item @on-item-click="onItemClick">已使用</tab-item>
      <tab-item @on-item-click="onItemClick">已过期</tab-item>
    </tab>
    <!-- 温馨提示 -->
    <div class="warm_tips">
        <p class="tips">温馨提示：绑定手机，方便您到店核销</p>
        <span class="bingTel" @click="bindTel">绑定手机</span>
    </div>
    <!-- 优惠券列表 -->
    <div class="discount_wrapper">
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
                      <!-- <div class="pay-line">
                          满1000元减
                      </div> -->
                  </div>
              </div>
            </li>
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
            <!-- <li>实物券</li> -->
        </ul>
    </div>
    <validate v-show="isShow"></validate>
 </div>
</template>

<script type='text/ecmascript-6'>
import { Tab, TabItem, XHeader, XButton } from "vux";
import Validate from "../../base/validatephone/validatephone";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      flag: false
    };
  },
  computed: {
    ...mapGetters(["isShow"])
  },
  methods: {
    // 显示优惠券详情
    select_discount(){
      this.$router.push({
        name:"chat_detail"
      })
    },
    //绑定手机
    bindTel() {
      // this.isShow = true;
      this.changeValidate(true);
    },
    onItemClick(index) {
      console.log(index);
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
    Validate
  }
};
</script>

<style scoped lang='less'>
.card {
  height: 100%;
  .warm_tips {
    padding: 0.375rem 0.25rem;
    display: flex;
    justify-content: space-between;
    .tips {
      // line-height: 1.8125rem;
    }
    .bingTel {
      display: inline-block;
      width: 1.8rem;
      border: 1px solid #ccc;
      text-align: center;
      border-radius: 6px;
      background-color: #ccc;
    }
  }
  .discount_wrapper {
    padding: 0px 0.25rem;
    margin: 0.1rem auto;
    .discount_list {
      //   width: 21.875rem;
      li {
        width: 8.75rem;
        height: 1.75rem;
        margin: 0 auto;
        // border: 1px solid #ccc;
        margin-bottom: 0.5rem;
        text-align: center;
        .wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          background: #fff;
          border-radius: 8px;
          .content {
            flex: 1;
            border-radius: 8px 0 0 8px;
            box-shadow: -2px 2px 2px #ccc;
            background: #fff;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .title {
              height: 20px;
            }
            .time {
              height: 20px;
            }
          }
          .split-line {
            position: relative;
            flex: 0 0 0;
            border-left: 2px dashed #eee;
            margin: 0 5px 0 3px;
            background: #fff;
          }
          .split-line:before,
          .split-line:after {
            content: "";
            position: absolute;
            width: 16px;
            height: 8px;
            background: #eee;
            left: -9px;
            z-index: 1;
          }
          .split-line:before {
            border-radius: 0 0 8px 8px;
            top: 0;
          }
          .split-line:after {
            border-radius: 8px 8px 0 0;
            bottom: 0;
          }
          .tip {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            border-radius: 0 8px 8px 0;
            box-shadow: 2px 2px 2px #ccc;
            background: #fff;
          }
        }
      }
    }
  }
}
</style>
