<template>
 <div>
     <!-- 绑定手机弹框 -->
    <div v-transfer-dom>
          <x-dialog v-model="isShow" class="dialog-demo">
            <div  class="bindTel_wrapper">
              <h3 class="title">请绑定手机号</h3>
              <img onclick="return false" src="../../assets/image/close.png" alt="" class="close" @click="cancel">
              <div class="validate_box">
                <input type="text" class="phone" v-model="phoneNum" placeholder="请输入手机号">
                <input type="text" class="validate" v-model="vcode" placeholder="请输入验证码">
                <span class="validate_code" v-if="phoneNum.length !=11 || isShowCodeText">{{codeText}}</span>
                <span class="validate_code_avtive" @click="sendVerifyCode" v-else>{{codeText}}</span>
              </div>
              <div class="btn" @click="checkVerifyCode">确定</div>
            </div>
          </x-dialog>
    </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import { XDialog, XButton, TransferDomDirective as TransferDom } from "vux";
import { mapGetters, mapMutations } from "vuex";
import api from 'common/api'
import { setInterval, clearInterval } from 'timers';
export default {
  directives: {
    TransferDom
  },
  data() {
    return {
      codeText: "获取验证码",
      phoneNum: '',
      isShowCodeText:false,
      vcode:''
    };
  },

  computed: {
    ...mapGetters(["isShow"])
  },
  methods: {
    //手机验证取消事件
    cancel() {
      this.changeValidate(false);
    },
    //获取验证码
    sendVerifyCode() {
      console.log(this.phoneNum);
      api.getVerifyCode(this.phoneNum).then(res => {
        console.log(res)
        if (res.errCode === 0) {
          this.codeText = 60;
          this.isShowCodeText = true;
          let timer = setInterval(() => {
            this.codeText--;
            if (this.codeText === 0) {
              this.codeText = "获取验证码";
              this.isShowCodeText = false;
              clearInterval(timer);
            }
          }, 1000)
        }
      })
    },
    //验证手机验证码
    checkVerifyCode(){
      if(!this.vcode){
        return;
      }
      api.checkVerifyCode(this.phoneNum,this.vcode).then(res=>{
        console.log('是否验证成功',res);
        if(res.errCode===0){
          api.getUserInfo().then(res=>{
            this.getuserInfo(res);
          })
          this.changeValidate(false);
           this.$vux.toast.show({
            text: "验证成功"
          });
        }
      })
    },
    doShowToast() { },
    ...mapMutations({
      changeValidate: "CHANGE_VALIDATE",
      getuserInfo: "GET_USERINFO", //获取用户信息
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
.bindTel_wrapper {
  width: 8rem;
  height: 7.8rem;
  .bg("../../assets/image/bg.png");
  position: relative;
  .title {
    padding-top: 0.72rem;
    font-size: 0.4533rem;
    color: #fff;
  }
  .close {
    position: absolute;
    right: 0.1333rem;
    top: 0.1333rem;
    width: 0.52rem;
    height: 0.52rem;
  }
  .validate_box {
    padding-top: 1.5rem;
    position: relative;
    .phone {
      width: 7.0133rem;
      height: 1.0667rem;
      line-height: 1.0667rem;
      border-radius: 0.4933rem;
      outline: none;
      -webkit-appearance: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      border: 1px solid #ccc;
      text-indent: 0.4rem;
      font-size: 0.4rem;
    }
    .validate {
      width: 7.0133rem;
      height: 1.0667rem;
      line-height: 1.0667rem;
      border-radius: 0.4933rem;
      border: 1px solid #ccc;
      outline: none;
      -webkit-appearance: none;
      text-indent: 0.4rem;
      font-size: 0.4rem;
      margin-top: 0.2667rem;
    }
    .validate_code {
      position: absolute;
      width: 2.6667rem;
      height: 1.1rem;
      line-height: 1.1rem;
      right: 0.4267rem;
      top: 2.89rem;
      background: #ccc;
      color: #fff;
      border-radius: 0.4933rem;
      font-size: 0.3467rem;
      letter-spacing: 0.03rem;
    }
    .validate_code_avtive {
      position: absolute;
      width: 2.6667rem;
      height: 1.1rem;
      line-height: 1.1rem;
      right: 0.4267rem;
      top: 2.89rem;
      background: #ffd800;
      color: #fff;
      border-radius: 0.4933rem;
      font-size: 0.3467rem;
    }
  }
  .btn {
    margin: 0.4333rem auto;
    width: 7.0133rem;
    height: 1.0667rem;
    line-height: 1.0667rem;
    border-radius: 0.5067rem;
    background: #ffd800;
    color: #fff;
    text-align: center;
    font-size: 0.4267rem;
  }
}
</style>
