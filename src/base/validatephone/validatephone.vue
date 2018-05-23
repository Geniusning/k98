<template>
 <div>
     <!-- 绑定手机弹框 -->
    <div v-transfer-dom>
          <x-dialog v-model="isShow" class="dialog-demo">
            <div  class="bindTel_wrapper">
              <h3 class="title">请绑定手机号</h3>
              <img src="../../assets/image/close.png" alt="" class="close" @click="cancel">
              <div class="validate_box">
                <input type="text" class="phone" placeholder="请输入手机号">
                <input type="text" class="validate" placeholder="请输入验证码">
                <span class="validate_code">获取验证码</span>
              </div>
              <div class="btn">确定</div>
            </div>
          </x-dialog>
    </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import { XDialog, XButton, TransferDomDirective as TransferDom } from "vux";
import { mapGetters, mapMutations } from "vuex";
export default {
  directives: {
    TransferDom
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["isShow"])
  },
  methods: {
    //手机验证取消事件
    cancel() {
      this.changeValidate(false);
    },
    doShowToast() {},
    ...mapMutations({
      changeValidate: "CHANGE_VALIDATE"
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
