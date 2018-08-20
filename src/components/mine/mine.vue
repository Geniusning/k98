<template>
 <div id="mine" class="mine">
     <!-- 个人信息 -->
     <div class="personInfo_wrapper">
         <div class="person_info">
             <img :src="userInfo.headimgurl" alt="" class="avatar">
             <p class="name">{{userInfo.nickname||'小龙女'}}</p>
             <!-- <span class="bindTel" @click="showBindTel">绑定手机</span> -->
             <span class="bindTel" @click="showTelBind" v-if="showTel">绑定手机</span>
             <span class="bindTel1" @click="showTelBind" v-else>15764271126</span>
         </div>
         <img @click="edit_individual" src="../../assets/image/setting.png" alt="" class="edit">
     </div>
     <div class="content">
        <!-- 我的信息 -->
        <div class="userInfo_wrapper">
          <ul class="user_list">
            <li class="item">
              <p class="score_name">好友数</p>
              <p class="score">8个</p>
            </li>
            <li class="item">
              <p class="score_name">富豪榜</p>
              <p class="score">第6名</p>
            </li>
             <li class="item">
              <p class="score_name">大话战神榜</p>
              <p class="score">第11名</p>
            </li>
             <!-- <li class="item">
              <p class="score_name">大话排名</p>
              <p class="score">第2名</p>
            </li> -->
          </ul>
        </div>
        <!-- 我的卡券 -->
        <div class="discount_wrapper">
          <ul class="discount_list">
            <li class="item vux-1px-r" @click="checkDiscout">
              <img src="../../assets/image/discount.png" alt=""  class="pic_discount">
              <p class="discount_name">我的卡券</p>
            </li>
            <li class="item vux-1px-r" @click="gameDetal">
              <img src="../../assets/image/game_mine.png" alt="" class="pic_discount">
              <p class="discount_name">游戏明细</p>
             </li>
             <li class="item" @click="giftDetal">
              <img src="../../assets/image/yingxiangli.png" alt="" class="pic_discount">
              <p class="discount_name">积分明细</p>
             </li>
          </ul>
        </div>
        <!-- 我的标签 -->
        <div class="tag_wrapper">
          <h2 class="tag_title" @click="chooseImage">我的标签<span class="star">#</span></h2>
          <ul class="tag_list" v-if="tags_show">
            <li v-for="(item,index) in tagList" :key="index" class="item">
              {{item}}
            </li>
          </ul>
          <p v-else class="no_tags"><span class="star">#</span>请在个人编辑里面设置标签，让朋友更了解你哦<span class="star">#</span></p>
        </div>
        <!-- 个性签名 -->
        <div class="signature_wrapper">
          <h2 class="signature_title">个性签名<span class="star">#</span></h2>
          <p class="signature" v-if="showTag">我就是我，是不一样的烟火</p>
          <p v-else class="no_signature"><span class="star">#</span>请在个人编辑里面设置签名<span class="star">#</span></p>
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
    <router-view></router-view>
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
import util from "common/util";
import api from "common/api";
import Validate from "../../base/validatephone/validatephone";
export default {
  directives: {
    TransferDom
  },
  data() {
    return {
      showTel: true,
      tags_show: false,
      show1: false,
      showToast: false,
      showTag: false,
      tagList: ["幽默", "搞笑", "多动症"]
    };
  },
  computed: {
    ...mapGetters(["userInfo", "test", "isShow"])
  },
  created() {
    let url = window.location.href.split('#')[0];
    console.log(url)
    api
      .getJssdkInfo("/api/loadJSSDKParams?url=" + encodeURIComponent(url))
      .then(res => {
        wx.config({
          //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: "wxb2fa3c446063ec19",
          timestamp: res.timestamp,
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: [
            "chooseImage"
          ]
        });
      });
  },
  methods: {
    chooseImage() {
      console.log("images");
      wx.chooseImage({
        count: 2, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          console.log(localIds);
        }
      });
    },
    //查看优惠券
    checkDiscout() {
      util.routerTo("card", this);
    },
    //查看游戏明细
    gameDetal() {
      util.routerTo("gameDetail", this);
    },
    //查看收礼明细
    giftDetal() {
      util.routerTo("giftDetail", this);
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
    showTelBind() {
      this.changeValidate(true);
    },
    cancel() {
      // this.showToast = false;
      this.changeValidate(false);
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
@import "../../assets/less/mixin.less";
@import "../../assets/less/variable.less";
@import "../../assets/less/mine.less";
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
  display: flex;
  flex-direction: column;
  .personInfo_wrapper {
    width: 100%;
    height: 4.1333rem;
    position: relative;
    .bg("../../assets/image/mine_bg.jpg");
    text-align: center;
    .edit {
      position: absolute;
      width: 0.6rem;
      height: 0.56rem;
      top: 0.4rem;
      right: 0.4133rem;
    }
    .person_info {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .avatar {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
      .name {
        color: #fff;
        margin-top: 0.2133rem;
        height: 0.4133rem;
        font-size: 0.4267rem;
        font-family: "PingFang-SC-Bold";
        color: rgba(255, 255, 255, 1);
        line-height: 0.3733rem;
      }
      .bindTel {
        margin-top: 0.2667rem;
        display: inline-block;
        width: 2.1867rem;
        line-height: normal;
        padding: 0.1333rem 0;
        background-color: #fff;
        border-radius: 0.3067rem;
        font-weight: 700;
        font-family: serif;
        color: #999999;
        font-size: 0.3733rem;
      }
      .bindTel1 {
        margin-top: 0.2667rem;
        display: inline-block;
        width: 2.1867rem;
        line-height: normal;
        padding: 0.1333rem 0;
        // background-color: #fff;
        border-radius: 0.3067rem;
        font-weight: 700;
        font-family: serif;
        color: #fff;
        font-size: 0.3733rem;
      }
    }
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    .userInfo_wrapper {
      height: 1.8667rem;
      background: #fff;
      .user_list {
        display: flex;
        justify-content: space-around;
        padding-top: 0.3067rem;
        box-sizing: border-box;
        .item {
          box-sizing: border-box;
          width: 33.333%;
          text-align: center;
          .score {
            color: #ff3131;
            font-size: 0.3467rem;
            text-align: center;
            margin-bottom: 0.3333rem;
            font-weight: bold;
            font-family: "PingFang-SC-Bold";
          }
          .score_name {
            box-sizing: border-box;
            font-size: 0.3733rem;
            color: #333;
            text-align: center;
            margin-bottom: 0.4rem;
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
          flex: 1;
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
      height: 2rem;
      margin-top: 0.1333rem;
      padding-left: 0.4rem;
      background: #fff;
      .tag_title {
        .title();
      }
      .no_tags {
        margin-top: 0.2667rem;
        color: #666;
        font-size: 0.3733rem;
        .star {
          color: @baseColor;
        }
      }
      .tag_list {
        margin-top: 0.2667rem;
        display: flex;
        justify-content: flex-start;
        .item {
          height: 0.64rem;
          line-height: 0.64rem;
          border: 1px solid @baseColor;
          border-radius: 0.32rem;
          padding: 0 0.4rem;
          margin-right: 0.2667rem;
          font-size: 0.3733rem;
        }
      }
    }
    .signature_wrapper {
      flex: 1;
      margin-top: 0.1333rem;
      padding-left: 0.4rem;
      background: #fff;
      .signature_title {
        .title();
      }
      .signature {
        margin-top: 0.2667rem;
        color: #666;
        font-size: 0.3733rem;
      }
      .no_signature {
        margin-top: 0.2667rem;
        color: #666;
        font-size: 0.3733rem;
        .star {
          color: @baseColor;
        }
      }
    }
  }
}
</style>
