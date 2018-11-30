<template>
  <div id="mine" class="mine">
    <!-- 个人信息 -->
    <div class="personInfo_wrapper">
      <div class="person_info">
        <img :src="userInfo.headimgurl" alt="" class="avatar">
        <p class="name">{{userInfo.nickname||'小龙女'}}</p>
        <!-- <span class="bindTel" @click="showBindTel">绑定手机</span> -->
        <span class="bindTel" @click="showTelBind" v-if="!userInfo.phone">绑定手机</span>
        <span class="bindTel1" v-else>{{userInfo.phone}}</span>
      </div>
      <img @click="edit_individual" src="../../assets/image/setting.png" alt="" class="edit">
    </div>
    <div class="content">
      <!-- 我的信息 -->
      <div class="userInfo_wrapper">
        <ul class="user_list">
          <li class="item">
            <p class="score_name">好友数</p>
            <p class="score">{{userInfo.numOfFriends}}个</p>
          </li>
          <li class="item">
            <p class="score_name">富豪榜</p>
            <p class="score">第{{userInfo.wealthRanking}}名</p>
          </li>
          <li class="item">
            <p class="score_name">大话战神榜</p>
            <p class="score">第{{userInfo.gameScoreRanking}}名</p>
          </li>
        </ul>
      </div>
      <!-- 签到 -->
      <span class="signIn" @click="sign_in">签到</span>
      <!-- 我的卡券 -->
      <div class="discount_wrapper">
        <ul class="discount_list">
          <li class="item vux-1px-r" @click="checkDiscout">
            <img src="../../assets/image/discount.png" alt="" class="pic_discount">
            <p class="discount_name">我的卡券</p>
          </li>
          <li class="item vux-1px-r" @click="giftDetal">
            <img src="../../assets/image/yingxiangli.png" alt="" class="pic_discount">
            <p class="discount_name">积分明细</p>
          </li>
          <li class="item " @click="gameDetal">
            <img src="../../assets/image/game_mine.png" alt="" class="pic_discount">
            <p class="discount_name">游戏明细</p>
          </li>
        </ul>
      </div>
      <!-- 我的标签 -->
      <div class="tag_wrapper">
        <h2 class="tag_title" >我的标签<span class="star">#</span></h2>
        <ul class="tag_list" v-if="userInfo.tags.length">
        <!-- <ul class="tag_list" v-if="showTag"> -->
          <li v-for="(item,index) in tagList" :key="index" class="item">
            {{item}}
          </li>
        </ul>
        <!-- <p v-if="userInfo.tags.length">{{userInfo.tags}}</p> -->
        <p v-else class="no_tags"><span class="star">#</span>请在个人编辑里面设置标签，让朋友更了解你哦<span class="star">#</span></p>
      </div>
      <!-- 个性签名 -->
      <div class="signature_wrapper">
        <h2 class="signature_title">个性签名<span class="star">#</span></h2>
        <!-- <p class="signature" v-if="showTag">youare</p> -->
        <p class="signature" v-if="userInfo.signature.length">{{userInfo.signature}}</p>
        <p v-else class="no_signature"><span class="star">#</span>请在个人编辑里面设置签名<span class="star">#</span></p>
      </div>
      <!-- 营销推广 -->
      <!-- <div class="marketing_wrapper"> -->
      <div class="marketing_wrapper" v-show="userInfo.role">
        <h2 class="marketing_title">营销推广<span class="star">#</span></h2>
        <ul class="marketing-list">
          <li class="marketing-item">
            <div class="marketing-left">
              门店名片(首页)
            </div>
            <div class="marketing-right" @click="homeShare">
              分享->
            </div>
          </li>
          <li class="marketing-item" v-show="noCouponsFlag">
            <div class="marketing-left">
              邀新有礼
            </div>
            <div class="marketing-right" @click="inviteShare">
              分享->
            </div>
          </li>
          <li class="marketing-item">
            <div class="marketing-left">
              大话争霸赛
            </div>
            <div class="marketing-right" @click="gameShare">
              分享->
            </div>
          </li>
          <!-- <li class="marketing-item">
            <div class="marketing-left">
              门店活动通知
            </div>
            <div class="marketing-right" @click="activetyShare">
              分享->
            </div>
          </li> -->
        </ul>
      </div>
    </div>
    <!-- 绑定手机弹框 -->
    <validate v-show="isShow"></validate>
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
import {mapState,mapGetters,mapMutations} from "vuex";
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
    ...mapState(["noCouponsFlag"]),
    ...mapGetters(["userInfo", "test", "isShow"])
  },
  created() {
    //判断是否自定义了标签
    if(this.userInfo.tags){
      this.tagList = this.userInfo.tags.split('、');
    }
  },
  methods: {
    activetyShare() {
      this.$router.push({
        name: "shareActivity"
      })
    },
    gameShare() {
      let token = util.getCookie("tk");
      window.location.href =
        `http://llwant.test.qianz.com/game/?gamePath=game3&tk=${token}`;
    },
    inviteShare() {
      this.$router.push({
        name: "shareNew"
      })
    },
    homeShare() {
      this.$router.push({
        name: "home"
      })
    },
    // chooseImage() {
    //   console.log("images");
    //   wx.chooseImage({
    //     count: 1, // 默认9
    //     sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
    //     sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
    //     success: function (res) {
    //       var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    //       console.log(localIds);
    //     }
    //   });
    // },
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
    //签到
    sign_in() {
      api.checkIn().then(res => {
        console.log('签到---------------------------', res);
        if (res.errCode === 0) {
          this.$vux.toast.show({
            text: "签到成功 +2积分",
            type: "text",
            time: 3000,
            width: "3rem"
          });
        } else {
          this.$vux.toast.show({
            text: "今日您已签到 明天再来吧",
            type: "text",
            time: 3000,
            width: "3rem"
          });
        }
      })
    },
    // 新增标签
    // plusTag() {
    //   this.showTag = true;
    // },
    // 保存新增标签
    // save() {
    //   let tag = this.$refs.tag.value;
    //   if (!tag) {
    //     this.$vux.toast.show({
    //       type: "text",
    //       width: "9rem",
    //       text: "请输入您的个性标签"
    //     });
    //     return;
    //   }
    //   if (this.tagList.length > 4) {
    //     this.$vux.toast.show({
    //       type: "text",
    //       text: "最多设置5个标签哦"
    //     });
    //     return;
    //   }
    //   this.tagList.push(tag);
    //   console.log(this.tagList.length);
    //   this.showTag = false;
    //   this.$refs.tag.value = "";
    // },
    // 关闭标签
    // closeTag() {
    //   this.showTag = false;
    // },
    showTelBind() {
      this.changeValidate(true);
    },
    cancel() {
      // this.showToast = false;
      this.changeValidate(false);
    },
    ...mapMutations({
      changeValidate: "CHANGE_VALIDATE",
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
        padding: 0.1333rem 0; // background-color: #fff;
        border-radius: 0.3067rem;
        font-weight: 700;
        font-family: serif;
        color: #fff;
        font-size: 0.3733rem;
      }
    }
  }
  .content {
    // flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
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
    .signIn {
      position: absolute;
      top: -1rem;
      right: 0rem;
      box-sizing: border-box;
      width: 1.0667rem;
      height: 1.0667rem;
      text-align: center;
      line-height: 1.0667rem;
      border-radius: 50%;
      background: #f6d001;
      color: #fff;
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
    .marketing_wrapper {
      // height: 6rem;
      margin-top: 0.1333rem;
      padding: 0 0.4rem;
      background: #fff;
      .marketing_title {
        .title();
      }
      .marketing-list {
        .marketing-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.24rem;
          .marketing-left {
            font-size: 0.3733rem;
            margin-top: 0.1333rem;
          }
          .marketing-right {
            font-size: 0.3733rem;
            padding: 0.1067rem 0.1333rem;
            background-color: @baseColor;
            color: #fff;
          }
        }
      }
    }
    .signature_wrapper {
      // flex: 1;
      margin-top: 0.1333rem;
      padding-left: 0.4rem;
      padding-bottom: 0.2667rem;
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
