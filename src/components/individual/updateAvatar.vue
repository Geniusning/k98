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
            <div class="dailyLifePhoto-wrapper" >
              <h3 class="title">上传生活照<span class="desc">(最多上传4张)</span></h3>
              <ul class="uploadLifePhotoList">
                <li v-for="(item,index) in lifePhotoList" class="photo">
                  <img :src="item" alt="" class="imgItem">
                  <img src="../../assets/image/close-round.png" alt="" class="close" @click="close(index)">
                </li>
                 <li class="photo" v-show="isShowAddImg">
                  <img src="../../assets/image/add_pic.png" alt="" class="imgItem" @click="chooseImage">
                </li>
              </ul>
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

        </div>
    </transition>
</template>

<script type='text/ecmascript-6'>
import VueCropper from "vue-cropper";
import myHeader from "../../base/myheader/myheader";
import { XButton } from "vux";
import { mapState, mapMutations } from "vuex";
import api from "common/api";
import util from "common/util";
import lrz from "lrz";
export default {
  data() {
    return {
      showTailor: false,
      isShowAddImg:true,
      option: {
        img: "",
        width: 300,
        height: 250,
        autoCrop: true
      },
      lifePhotoList: []
    };
  },
  created() {
    let url = window.location.href.split("#")[0];
    console.log(url);
    api
      .getJssdkInfo("/api/loadJSSDKParams?url=" + encodeURIComponent(url))
      .then(res => {
        wx.config({
          //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: "wxb2fa3c446063ec19",
          timestamp: res.timestamp,
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: ["chooseImage"]
        });
      });
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    //上传生活照
    chooseImage() {
      console.log("images");
      let _this = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          console.log('localIds----------------------',localIds);
          _this.lifePhotoList.push(localIds[0]);
          if(_this.lifePhotoList.length>3){
            _this.isShowAddImg = false;
          }
        }
      });
    },
    //删除生活照
    close(index){
      this.lifePhotoList.splice(index,1);
      if(this.lifePhotoList.length===4){
        this.isShowAddImg = false;
      }else{
        this.isShowAddImg = true;
      }
    },
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
    update() {},
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
    myHeader
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
  .dailyLifePhoto-wrapper {
    padding: 0.2667rem 0.2rem;
    .title {
      font-size: 0.3533rem;
      font-weight: 600;
      margin-bottom: 0.2667rem;
      .desc{
        font-size: 0.0067rem;
        font-weight: normal;
      }
    }
    .uploadLifePhotoList {
      display: flex;
      justify-content: flex-start;
      .photo {
        width: 2rem;
        height: 2rem;
        position: relative;
        margin-right: 0.2667rem;
        .close{
          position: absolute;
          width: 0.4rem;
          height: 0.4rem;
          top: -0.1333rem;
          right: -0.1333rem;
        }
        .imgItem {
          width: 100%;
          height: 100%;
        }
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
