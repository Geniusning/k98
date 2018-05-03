<template>
 <div id="mine" class="mine">
     <!-- 个人信息 -->
     <div class="personInfo_wrapper">
         <div class="person_info">
             <img :src="userInfo.headimgurl" alt="" class="avatar">
             <p class="name">{{userInfo.nickname}}</p>
             <!-- <span class="bindTel" @click="showBindTel">绑定手机</span> -->
             <span class="bindTel" @click="showTelBind">绑定手机</span>
         </div>
         <img @click="edit_individual" src="../../assets/image/setting.png" alt="" class="edit">
     </div>
     <div class="content">
        <!-- 我的信息 -->
        <div class="userInfo_wrapper">
          <ul class="user_list">
            <li class="item">
              <p class="score">888分</p>
              <p class="score_name">影响力</p>
            </li>
            <li class="item">
              <p class="score">大地主</p>
              <p class="score_name">阶级</p>
            </li>
             <li class="item">
              <p class="score">88个</p>
              <p class="score_name">获赞数</p>
            </li>
             <li class="item">
              <p class="score">8个</p>
              <p class="score_name">收礼数</p>
            </li>
          </ul>
        </div>

        <!-- 我的卡券 -->
        <div class="discount_wrapper">
          <ul class="discount_list">
            <li class="item">
              <img src="../../assets/image/discount.png" alt=""  class="pic_discount">
              <p class="discount_name">我的卡券</p>
            </li>
            <li class="item">
              <img src="../../assets/image/game_mine.png" alt="" class="pic_discount">
              <p class="discount_name">游戏明细</p>
             </li>
             <li class="item">
              <img src="../../assets/image/yingxiangli.png" alt="" class="pic_discount">
              <p class="discount_name">影响力明细</p>
             </li>
          </ul>
        </div>

        <!-- 我的标签 -->
        <div class="tag_wrapper">
          <h2 class="tag_title">我的标签<span class="star">#</span></h2>
          <ul class="tag_list" >
            <li v-for="(item,index) in tagList" :key="index" class="item">
              {{item}}
            </li>
          </ul>
        </div>
     </div>
    <!-- 绑定手机弹框 -->
    <validate v-show="isShow"></validate>
    <!-- 新增标签 -->
    <div v-transfer-dom>
          <x-dialog v-model="showTag" class="dialog-demo">
            <div style="padding:10px 0px">
              <div style="margin-bottom:10px" class="tag_box">
                <input type="text" class="tag" placeholder="请输入标签" ref="tag">
                <x-icon @click.native="closeTag" type="ios-close-empty" size="30" class="close"></x-icon>
              </div> 
              <x-button style="float:right;margin-right:20px;margin-bottom:10px;" @click.native="save" type="primary" :mini="true">新增</x-button>
            </div>
          </x-dialog>
    </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import {
  XDialog,
  XButton,
  TransferDomDirective as TransferDom,
  XInput,
  Group,
  Toast
} from "vux";
import { mapGetters, mapMutations } from "vuex";
import Validate from "../../base/validatephone/validatephone";
export default {
  directives: {
    TransferDom
  },
  data() {
    return {
      show1: false,
      showToast: false,
      showTag: false,
      tagList: ["幽默", "搞笑", "多动症"]
    };
  },
  computed: {
    ...mapGetters(["userInfo", "test", "isShow"])
  },
  methods: {
    //查看优惠券
    checkDiscout() {
      this.$router.push({
        name: "card"
      });
    },
    //编辑个人信息
    edit_individual() {
      this.$router.push({
        name: "individual"
      });
    },
    // 新增标签
    plusTag() {
      this.showTag = true;
    },
    // 保存新增标签
    save() {
      let tag = this.$refs.tag.value;
      if (!tag) {
        this.$vux.toast.show({
          type: "text",
          width: "9rem",
          text: "请输入您的个性标签"
        });
        return;
      }
      if (this.tagList.length > 4) {
        this.$vux.toast.show({
          type: "text",
          text: "最多设置5个标签哦"
        });
        return;
      }
      this.tagList.push(tag);
      console.log(this.tagList.length);
      this.showTag = false;
      this.$refs.tag.value = "";
    },
    // 关闭标签
    closeTag() {
      this.showTag = false;
    },
    showTelBind(){
      this.changeValidate(true)
    },
    cancel() {
      // this.showToast = false;
      this.changeValidate(false)
    },
    ...mapMutations({
      changeValidate: "CHANGE_VALIDATE"
    })
  },
  components: {
    XDialog,
    XButton,
    XInput,
    Group,
    Toast,
    Validate
  }
};
</script>

<style scoped lang="less">
// 吐司
.tag_box {
  position: relative;
  .close {
    position: absolute;
    top: -0.625rem;
    right: 0.625rem;
  }
  .tag {
    border: none;
  }
}
.vux-close {
  margin-top: 8px;
  margin-bottom: 8px;
}
.mine {
  height: 100%;
  background: #f4f4f4;
  .personInfo_wrapper {
    width: 100%;
    height: 3.375rem;
    position: relative;
    background: url("../../assets/image/mine_bg.png") no-repeat;
    text-align: center;
    .edit {
      position: absolute;
      width: 0.6rem;
      height: 0.56rem;
      top: 0.2rem;
      right: 0.3133rem;
    }
    .person_info {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .avatar {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
      }
      .name {
        color: #fff;
        margin-top: 0.2rem;
      }
      .bindTel {
        margin-top: 0.2rem;
        display: inline-block;
        width: 2.1867rem;
        height: 0.6133rem;
        line-height: 0.6133rem;
        background-color: #fff;
        border-radius: 10px;
        font-weight: 700;
        font-family: serif;
        color: #ff7800;
        font-size: 0.3733rem;
      }
    }
  }
  .content {
    // display: flex;
    // flex-direction: column;
    // justify-content: flex-start;
    .userInfo_wrapper {
      height: 1.8667rem;
      background: #fff;
      .user_list {
        display: flex;
        justify-content: space-around;
        padding-top: 0.48rem;
        .item {
          .score {
            color: #ff7800;
            font-size: 0.3467rem;
            text-align: center;
            margin-bottom: 0.22rem;
          }
          .score_name {
            font-size: 0.3733rem;
            color: #333;
            text-align: center;
          }
        }
      }
    }
    .discount_wrapper {
      margin-top: 0.1333rem;
      height: 2.4rem;
      background-color: #fff;
      .discount_list {
        padding-top: 0.3467rem;
        display: flex;
        justify-content: space-around;
        .item {
          text-align: center;
          .pic_discount {
            width: 1.2rem;
            height: 1.2rem;
          }
          .discount_name {
            text-align: center;
          }
        }
      }
    }
    .tag_wrapper {
      margin-top: 0.1333rem;
      padding-left: 0.4rem;
      height: 4rem;
      background: #fff;
      .tag_title {
        color: #333;
        font-size: 0.4rem;
        font-weight: bold;
        .star {
          color: #ff7800;
        }
      }
      .tag_list {
        margin-top: 0.2667rem;
        display: flex;
        justify-content: flex-start;
        .item {
          height: 0.64rem;
          line-height: 0.64rem;
          border: 1px solid #ff7800;
          border-radius: 6px;
          padding: 0 0.08rem;
          margin-right: 0.2667rem;
        }
      }
    }
  }
}
</style>
