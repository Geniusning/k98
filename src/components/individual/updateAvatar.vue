<template>
    <transition name="update">
        <div class="avatar-container">
            <my-header title="修改头像"></my-header>
            <div class="avatar-wrapper vux-1px-t vux-1px-b">
                <div class="pic-box">
                    <img :src="userInfo.headimgurl" alt="" class="pic_avatar" ref="avatar">
                </div>
                <div class="file-box">
                    <p class="text">更换头像</p>
                    <input type="file" class="file" @change="onChange">
                </div>
            </div>
            <div class="tailor_wrapper" v-if="showTailor">
                <vueCropper
                    ref="cropper"
                    :img="option.img" 
                    :canMove="false"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.width"
                    :autoCropHeight="option.height"
                    class="cropper"
                ></vueCropper>
                <p @click="stop" class="confirm">确定</p>
                <!-- <p @click="clip" class="clip">点击开始滑动截图</p> -->
            </div>
            <!-- <div class="btn_wrapper"  @click="update">
              <x-button type="default">保存</x-button>
            </div> -->
        </div>
    </transition>
</template>

<script type='text/ecmascript-6'>
import VueCropper from "vue-cropper";
import myHeader from "../../base/myheader/myheader";
import { XButton } from "vux";
import { mapState, mapMutations } from "vuex";
import api from "common/api";
import lrz from "lrz";
export default {
  data() {
    return {
      showTailor: false,
      option: {
        img: "",
        width: 300,
        height: 250,
        autoCrop: true
      }
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    //选择图片
    onChange(e) {
      console.log(e.target.files[0]);
      let file = e.target.files[0];
      this.fileName = file.name;
      let _this = this;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        _this.result = this.result;
        _this.showTailor = true;
        _this.option.img = this.result;
      };
    },
    update() {
    },
    stop() {
      this.$refs.cropper.getCropBlob(data => {
        console.log(data);
        this.result1 = data;
        this.$refs.avatar.src = data;
        this.showTailor = false;
        //更新头像
        api.updateAvatar(this.fileName, this.result1).then(res => {
          console.log(res);
          if (res.imgURL.length > 0) {
            api
              .getUserInfo("/api/loadUserInfo")
              .then(res => {
                console.log(res);
                this.getuserInfo(res);
                this.$vux.toast.show({
                  text: "保存成功"
                });
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      });
    },
    ...mapMutations({
      getuserInfo: "GET_USERINFO"
    })
  },
  components: {
    VueCropper,
    myHeader,
    // XButton
  }
};
</script>

<style scoped lang='less'>
.avatar-container {
  height: 100%;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  .avatar-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0.2667rem 0.2667rem;
    .pic-box {
      .pic_avatar {
        width: 1.5667rem;
        height: 1.5667rem;
        border: 1px solid #f1f1f1;
        border-radius: 50%;
      }
    }
    .file-box {
      position: relative;
      .text {
        position: absolute;
        top: 0.5667rem;
        left: 3.6667rem;
        font-size: 16px;
      }
      .file {
        height: 100%;
        opacity: 0;
      }
    }
  }
  .tailor_wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
    .cropper {
      position: absolute;
    }
    .clip {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 9999;
      color: #fff;
    }
    .confirm {
      position: absolute;
      z-index: 9999;
      color: #fff;
      bottom: 20px;
      right: 20px;
      font-size: 0.5333rem;
    }
  }
  .btn_wrapper {
    margin-top: 0.8rem;
    padding: 0 0.4rem;
  }
}
.update-enter-active,
.update-leave-active {
  transition: all 0.1s;
}
.update-enter {
  transform: translate3d(100%, 0, 0);
}
.update-leave-to {
  transform: translate3d(-100%, 0, 0);
}
</style>
