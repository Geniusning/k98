<template>
 <div class="qrCode_wrapper">
     <!-- 绑定手机弹框 -->
    <div v-transfer-dom>
          <x-dialog v-model="qrIsShow" class="dialog-demo">
            <div  class="bindTel_wrapper">
              <h3 class="title">{{title}}</h3>
              <img onclick="return false" src="../../assets/image/close.png" alt="" class="close" @click="cancel">
              <div class="validate_box">
                  <img :src="qrUrl" alt="" class="qrCode">
                  <p class="desc">长按关注享受会员特权：领福利、交朋友</p>
              </div>
            </div>
          </x-dialog>
    </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import { XDialog, XButton, TransferDomDirective as TransferDom } from "vux";
import { mapGetters, mapMutations } from "vuex";
import api from 'common/api.js'
export default {
  directives: {
    TransferDom
  },
  data() {
    return {
        qrUrl:""
    };
  },
  props:{
    title:{
      type:String,
      default:'长按关注公众号'
    },
    
  },
  mounted() {
      this._getQrCode()
  },
  computed: {
    ...mapGetters(["qrIsShow"])
  },
  methods: {
    //手机验证取消事件
    cancel() {
      this.showQrcode(false);
    },
    _getQrCode(){
        api.loadAllQrcode().then(res=>{
          console.log('二维码-----------',res);
            this.qrUrl = res.urls[0];
        })
    },
    ...mapMutations({
      showQrcode: "SHOW_QRCODE"
    })
  },
  components: {
    XDialog,
    XButton
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/mixin.less";
.qrCode_wrapper{
  position: absolute;
  z-index: 99999;
}
.bindTel_wrapper {
  width: 8rem;
  height: 7.8rem;
  .bg("../../assets/image/bg.png");
  position: relative;
  .title {
    padding-top: 0.72rem;
    font-size: 0.4533rem;
    color: #fff;
    text-shadow:5px 5px 5px #ccc;
  }
  .close {
    position: absolute;
    right: 0.1333rem;
    top: 0.1333rem;
    width: 0.52rem;
    height: 0.52rem;
  }
  .validate_box {
    padding-top: 1rem;
    position: relative;
    text-align: center;
    .qrCode{
        width: 4rem;
        height: 4rem;
    }
    .desc{
        margin-top: 0.2667rem;
        font-family:'Times New Roman', Times, serif;
        font-size: 0.32rem;

    }
  }
}
</style>
