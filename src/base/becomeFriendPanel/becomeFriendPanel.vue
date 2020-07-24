<template>
 <div class="friendPanel">
     <div class="bg_wrapper">
         <div class="top_part">
            <h2 class="congratulation_title">~ 恭  喜 ~</h2>
            <h6 class="sub_title">您与{{staticChatFriendObj.nickname}}互赞成为好友啦</h6>
            <img onclick="return false" @click="close" class="closeBtn" src="../../assets/image/close.png" alt="">
         </div>
         <div class="middle_part">
            <div class="avatar_wrapper">
                <img class="avatar_left" :src="userInfo.headimgurl" alt="">
                <img class="avatar_right" :src="staticChatFriendObj.headimgurl" alt="">
                <img class="connetion_tie" src="../../assets/image/connection_tie.png" alt="">
            </div>
         </div>
         <div class="bottom_part">
            <ul class="handleList_wrapper">
                <li class="handle_btn handle_btn_gift">
                    <img onclick="return false"  class="icon " src="../../assets/image/gift_bg.png" alt="" @click="sendGift">
                    <!-- <p class="desc">见面礼</p> -->
                </li>
                <li class="handle_btn handle_btn_sayhi">
                    <img onclick="return false" class="icon" src="../../assets/image/sayhi_bg.png" alt="" @click="chat">
                    <!-- <p class="desc">去聊聊</p> -->
                </li>
                <li class="handle_btn handle_btn_game">
                    <img onclick="return false" class="icon" src="../../assets/image/game_bg.png" alt="" @click="playGame">
                    <!-- <p class="desc">玩一把</p> -->
                </li>
                <!-- <li class="close_wrapper" @click="close">
                    <div class="close_btn">关闭</div>
                </li> -->
            </ul>
         </div>
     </div>
     <qrCode v-show="qrIsShow" title="您还不是会员,关注享有会员特权"></qrCode>
     <transition name="appear">
      <envelope v-show="isShowEnvelope" :text="envelopeText"></envelope>
     </transition>
     <topUp v-show="isGiftPanel" @closeIntegralPanel="closeIntegralPanel" :friendId="staticChatFriendObj.openid" :fatherPanelIndex="fatherPanelIndex"></topUp>
 </div>
</template>
<script type='text/ecmascript-6'>
import {mapMutations,mapState,mapGetters} from 'vuex'
import topUp from 'base/topUp/topUp';
import api from "common/api";
 import qrCode from 'base/qrCode/qrCode';
  import envelope from 'base/envelope/envelope';
 export default {
   data () {
     return {
          isGiftPanel: false, //礼物面板状态
          fatherPanelIndex: 1,
          isShowEnvelope:false,
          envelopeText:""
     }
   },
   computed: {
       ...mapState(["userInfo","staticChatFriendObj"]),
       ...mapGetters(["qrIsShow"]),
   },
   methods: {
       close(){
           this.changeFriPanelFlag(false)
       },
    //监听送礼面板状态
      closeIntegralPanel(flag) {
        //console.log('面板状态-----------', flag);
        this.isGiftPanel = flag;
      },
       sendGift(){
           this.isGiftPanel = true
           //console.log("见面礼")
       },
       chat(){
          this.$router.push({
            name:"chat",
            params: { 
                isClient: false,
                id:this.staticChatFriendObj.openid?this.staticChatFriendObj.openid:item.phone
            }
        });
          this.changeFriPanelFlag(false)
        //   this.$router.push({
        //   path: `/message/${this.staticChatFriendObj.openid}`
        // });
       },
         //玩游戏
      playGame() {
        api.sentPlayGameMsg(this.staticChatFriendObj.openid).then(res => {
          //console.log('约战返回--------', res)
          if (res.errCode == 0) {
            // this.text = "您已发出邀请  等待对方的回应";
            this.isShowEnvelope = true;
            this.envelopeText = "您已发出邀请  等待对方的回应"
            setTimeout(() => {
              this.isShowEnvelope = false;
            }, 2000);
          } else if (res.errCode == 1023) {
            this.showQrcode(true);
          } else if (res.errCode == 1022) {
            this.isShowEnvelope = true;
            this.envelopeText = "该用户己离线，无法通知";
            setTimeout(() => {
              this.isShowEnvelope = false;
            }, 2000);
            return;
          }
        })
      },
       ...mapMutations({
           showQrcode: "SHOW_QRCODE", //展示二维码
           changeFriPanelFlag:"CHANGEFRIENDPANELFLAG" //更改匹配成功flag
       })
   },
   components: {
      topUp,
      qrCode,
      envelope
   }
 }
</script>

<style scoped lang='less'>
@import "../../assets/less/mixin.less";
.friendPanel{
    position: absolute;
    padding: 0 0.4rem;
    top: 0;
    // height: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    box-sizing: border-box;
    .bg_wrapper{
        // display: flex;
        // flex-direction: column;
        // justify-content: space-between;
        width: 9.2rem;
        // height: 92%;
        margin: 0.56rem auto 0.1333rem;
        position: relative;
        .bg("../../assets/image/friendPanel.png");
        // background: 
        padding-top: 0.5067rem;
        box-sizing: border-box;
        .congratulation_title{
            font-size: 26px;
            color:333;
            font-weight: 700;
            margin-bottom: 0.2667rem;
            text-align: center;
        }
        .sub_title{
            text-align: center;
            font-size: 18px;
            color:333;
            font-weight: 700;
            margin-bottom: 0.3333rem;
        }
        .closeBtn{
            position: absolute;
            width: 0.8333rem;
            height: 0.8333rem;
            top: 0.2667rem;
            right: 0.3rem;
        }
        .avatar_wrapper{
            display: flex;
            justify-content: space-around;
            position: relative;
            padding: 0 .5rem;
            .avatar_left{
                width: 3.7867rem;
                height: 3.7867rem;
                border-radius: 50%;
                border: 4px solid #fff;
                left: 0.1667rem;
                position: relative;
            }
            .avatar_right{
                width: 3.7867rem;
                height: 3.7867rem;
                border-radius: 50%;
                left: -0.233rem;
                border: 4px solid #fff;
                position: relative;
                z-index: 99;
            }
            .connetion_tie{
                position: absolute;
                top: 3rem;
                width: 3.2rem;
            }
        }
        .handleList_wrapper{
            margin-top: 1.78rem;
            padding-bottom: 0.2667rem;
            .handle_btn{
                // width: 3.6667rem;
                // height: .9rem;
                margin: 0 auto;
                padding: 0.0633rem 0.4rem;
                text-align: center;
                margin-bottom: 0.4rem;
                .icon{
                    width: 4.56rem;
                    height: 1.2667rem;
                }
                .desc{
                    margin-top: 0.14rem;
                    text-indent: 1.4333rem;
                    font-size: 0.4rem;
                    color: #fff;
                }
            }
            .handle_btn_gift{
                // .bg("../../assets/image/gift_bg.png")
            }
            .handle_btn_sayhi{
                //   .bg("../../assets/image/sayhi_bg.png")
            }
            .handle_btn_game{
                //   .bg("../../assets/image/game_bg.png")
            }
            .close_wrapper{
                text-align: center;
                .close_btn{
                    display: inline-block;
                    padding: 0.1333rem 0.2667rem;
                    border: 1px solid #333;
                }
            }
        }
    }
}
 
</style>
