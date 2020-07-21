<template>
  <transition name="update">
    <div class="avatar-container">
      <my-header title="修改头像" identity=""></my-header>
      <div class="avatar-wrapper vux-1px-t vux-1px-b">
        <div class="pic-box">
          <img :src="fromPage=='individual'?userInfo.headimgurl?userInfo.headimgurl:addPic:addPic" alt="" class="pic_avatar" ref="avatar">
        </div>
        <div class="file-box">
          <p class="text">更换头像</p>
          <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" class="file" @change="uploadAvatar">
        </div>
      </div>
      <div class="dailyLifePhoto-wrapper">
        <h3 class="title">上传生活照<span class="desc">(最多上传4张)</span></h3>
        <ul class="uploadLifePhotoList">
          <li v-for="(item,index) in lifePhotoList" class="photo" :key="index">
            <img :src="item" alt="" class="imgItem">
            <img src="../../assets/image/close-round.png" alt="" class="close" @click="close(item,index)">
          </li>
          <li class="photo" v-show="isShowAddImg">
            <img src="../../assets/image/add_pic.png" alt="" class="imgItem">
            <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" class="imageBtn" @change="uploadLifePic">
          </li>
        </ul>
        <!-- <button class="btn" style="margin-top:10px" @click="uploadAllLifePicBtn">保存</button> -->
      </div>
      <div class="tailor_wrapper" v-if="showTailor">
        <vueCropper ref="cropper" :img="option.img" :canMove="false" :autoCrop="option.autoCrop" :autoCropWidth="option.width" :autoCropHeight="option.height" class="cropper"></vueCropper>
        <div>
          <p v-if="uploadAvatarShow" @click="avatarPicupLoad" class="confirm">确定头像</p>
          <p v-else @click="LifePicupComfirmBtn" class="confirm">确定生活照</p>
        </div>
        <!-- <p @click="clip" class="clip">点击开始滑动截图</p> -->
      </div>
    </div>
  </transition>
</template>

<script type='text/ecmascript-6'>
  import VueCropper from "vue-cropper";
  import myHeader from "../../base/myheader/myheader";
  import {
    XButton
  } from "vux";
  import {
    mapState,
    mapMutations
  } from "vuex";
  import api from "common/api";
  import util from "common/util";
  import lrz from "lrz";
  export default {
    data() {
      return {
        addPic: require('../../assets/image/divide_add_avatar.png'),
        uploadAvatarShow: true,
        showTailor: false,
        isShowAddImg: true,
        fromPage: "individual",
        option: {
          img: "",
          width: 300,
          height: 250,
          autoCrop: true
        },
        lifePhotoList: [],
        clearSessionData: false,
      };
    },
    created() {
      this.fromPage = this.$route.params.type //判断从哪个页面跳转过来
      if (this.fromPage === 'divide') {
        console.log("userInfo----", this.userInfo)
      } else {
        if (this.userInfo.lifePhotoURL.lifePhotoURL) {
          this.lifePhotoList = this.userInfo.lifePhotoURL.lifePhotoURL;
          if (this.userInfo.lifePhotoURL.lifePhotoURL.length == 4) {
            this.isShowAddImg = false;
          }
        }
      }
    },
    destroyed() {
      console.log("updateAvatar-destroyed")
      if (this.fromPage === 'divide') {
        sessionStorage.removeItem("identity")
      }
    },
    computed: {
      ...mapState(["userInfo"])
    },
    methods: {
      //选择上传生活照
      uploadLifePic(e) {
        let _this = this;
        let file = e.target.files[0];
        this.lifePicName = file.name;
        console.log("file------", file)
        if (file.type === "video/mp4") {
          this.$vux.toast.text(
            "你所选的文件格式不符合，请重新选择",
            "middle"
          );
          return
        }
        this.uploadAvatarShow = false;
        lrz(e.target.files[0], {
          quality: 0.4
        }).then(compressedImg => {
          console.log("compressedImg---------", compressedImg);
          _this.showTailor = true;
          _this.option.img = compressedImg.base64;
        })
      },
      //确定生活照
      LifePicupComfirmBtn() {
        this.$refs.cropper.getCropBlob(data => {
          console.log('this.$refs.cropper.getCropBlob----------', data);
          this.resultLife = data;
          this.showTailor = false;
          //上传生活照
          api.updateLifePic(this.lifePicName, this.resultLife).then(res => {
            console.log(res)
            if (res.errorCode === 0) {
              api.getUserInfo().then(res => {
                console.log(res);
                this.getuserInfo(res);
                if (this.userInfo.lifePhotoURL.lifePhotoURL) {
                  this.lifePhotoList = this.userInfo.lifePhotoURL.lifePhotoURL;
                  if (this.userInfo.lifePhotoURL.lifePhotoURL.length == 4) {
                    this.isShowAddImg = false;
                  }
                }
                this.$vux.toast.show({
                  text: "保存成功"
                });
              })
              if (this.lifePhotoList.length === 4) {
                this.isShowAddImg = false;
              }
            }
          });
        });
      },
      //删除生活照
      close(photoImg, index) {
        let data = {
          url: photoImg
        }
        console.log("photoImg----", photoImg)
        api.delLifePhoto(data).then(res => {
          console.log("删除生活照---", res)
        })
        if (this.fromPage === "divide") {
          this.lifePhotoList.splice(index, 1)
        } else {
          this.deleteLifeImg(index);
          this.lifePhotoList = this.userInfo.lifePhotoURL.lifePhotoURL;
        }
        if (this.lifePhotoList.length === 4) {
          this.isShowAddImg = false;
        } else {
          this.isShowAddImg = true;
        }
      },
      //选择头像图片
      uploadAvatar(e) {
        let file = e.target.files[0];
        console.log("file----", file)
        if (file.type === "video/mp4") {
          this.$vux.toast.text(
            "你所选的文件格式不符合，请重新选择",
            "middle"
          );
          return
        }
        this.fileName = file.name;
        this.uploadAvatarShow = true;
        let _this = this;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
          _this.result = this.result;
          console.log(_this.result);
          _this.showTailor = true;
          _this.option.img = this.result;
        };
      },
      avatarPicupLoad() {
        this.$refs.cropper.getCropBlob(data => {
          console.log('this.$refs.cropper.getCropBlob----------', data);
          this.resultAvatar = data;
          this.$refs.avatar.src = data;
          this.showTailor = false;
          //更新头像
          api.updateAvatar(this.fileName, this.resultAvatar).then(res => {
            // console.log(res);
            this.addPic = res.imgURL
            if (res.imgURL.length > 0) {
              api.getUserInfo().then(res => {
                  console.log(res);
                  if (this.fromPage === "individual") { //如果主身份则按正常流程走，更新个人信息
                    this.getuserInfo(res);
                  }
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
        getuserInfo: "GET_USERINFO",
        addLifeImg: "CHANGE_LIFEIMG", //新增生活照
        deleteLifeImg: "DELETE_LIFEIMG" //删除生活照
      })
    },
    components: {
      VueCropper,
      myHeader,
      XButton
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
        .desc {
          font-size: 0.267rem;
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
          .imageBtn {
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
          }
          .close {
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
      .btn {
        width: 100%;
        border: none;
        padding: 0.2667rem 0;
        background-color: #FFD800;
        color: #fff;
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
