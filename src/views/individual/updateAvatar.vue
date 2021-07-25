<template>
    <transition name="update">
        <div class="avatar-container">
            <my-header title="修改头像" identity></my-header>
            <div class="avatar-wrapper vux-1px-t vux-1px-b">
                <div class="pic-box">
                    <img :src="fromPage=='individual'?userInfo.headimgurl?userInfo.headimgurl:addPic:addPic" class="pic_avatar" ref="avatar" />
                </div>
                <div class="file-box">
                    <p class="text">更换头像</p>
                    <input type="file" accept="image/*" class="file" @change="uploadAvatar" />
                </div>
            </div>
            <div class="dailyLifePhoto-wrapper">
                <div class="company-setting">
                    <h3 class="title">1、企业/产品链接设置</h3>
                    <input type="text" placeholder="请复制-粘贴您的企业/微店的网址" v-model="link" class="ip-link"> <span @click="saveCompanyLink" class="save">保存</span>
                    <p class="desc">备注：您必须分享，引荐2个以上好友访问本群，才能使用本项特权</p>
                </div>
                <h3 class="title">
                    2、上传生活照/名片/企业产品图片等，让更多朋友了解你
                    <span class="desc">(限4张)</span>
                </h3>
                <ul class="uploadLifePhotoList">
                    <li v-for="(item,index) in lifePhotoList" class="photo" :key="index">
                        <input type="text" class="lifePhoto-desc" placeholder="请输入照片备注" disabled :value="item.caption" />
                        <div class="addpic-box">
                            <img :src="item.photoURL" alt class="imgItem" />
                            <img
                                 src="../../assets/image/close-round.png"
                                 alt
                                 class="close"
                                 @click="close(item,index)" />
                        </div>
                    </li>
                    <li class="photo" v-show="isShowAddImg">
                        <input
                               type="text"
                               maxlength="18"
                               class="lifePhoto-desc"
                               placeholder="请先写主题，再点'+'上传图片"
                               v-model="lifePhotoDesc" />
                        <div class="addpic-box">
                            <img src="../../assets/image/add_pic.png" alt class="imgItem" />
                            <input
                                   type="file"
                                   accept="image/*"
                                   class="imageBtn"
                                   @change="uploadLifePic" />
                        </div>

                    </li>
                </ul>
                <!-- <button class="btn" style="margin-top:10px" @click="goBack">确定</button> -->
            </div>
            <div class="tailor_wrapper" v-if="showTailor">
                <vueCropper
                            ref="cropper"
                            :img="option.img"
                            :canMove="false"
                            :autoCrop="option.autoCrop"
                            :autoCropWidth="option.width"
                            :autoCropHeight="option.height"
                            class="cropper"></vueCropper>
                <div>
                    <p v-if="uploadAvatarShow" @click="avatarPicupLoad" class="confirm">确定头像</p>
                    <p v-else @click="LifePicupComfirmBtn" class="confirm">确定生活照</p>
                </div>
                <!-- <p @click="clip" class="clip">点击开始滑动截图</p> -->
            </div>
            <transition name="appear">
                <!-- showneededPanel -->
                <div class="warning_bg" v-show="showneededPanel">
                    <div class="warning_wrapper">
                        <div class="desc_box">
                            <img src="../../assets/image/k_3.png" class="k_3" alt="">
                            <p class="warningText">您是否需要把上述照片发布到首页“供求信息“栏？</p>
                        </div>
                        <div class="btnBox">
                            <button class="yes" @click="supply('supply')">供</button>
                            <button class="no" @click="supply('need')">求</button>
                            <button class="no" @click="hide">否</button>
                        </div>
                    </div>
                </div>
            </transition>
            <button class="btn" v-if="shopSettingInfo.shopModeId===1" @click="publishNeeded">保存</button>
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
    data () {
        return {
            showneededPanel: false,
            link: "",
            lifePhotoDesc: "",
            addPic: require("../../assets/image/divide_add_avatar.png"),
            uploadAvatarShow: true,
            showTailor: false,
            isShowAddImg: true,
            fromPage: "individual",
            option: {
                img: "",
                width: 300,
                height: 250,
                autoCrop: true,
            },
            lifePhotoList: [],
            clearSessionData: false,
        };
    },
    created () {
        this.link = this.userInfo.companyLink
        // console.log("this.$route.params---", this.$route.params)
        this.fromPage = this.$route.params.type; //判断从哪个页面跳转过来
        // console.log("判断从哪个页面跳转过来---", this.fromPage);
        if (this.fromPage === "divide") {
            // console.log("userInfo----", this.userInfo);
        } else {
            if (this.userInfo.lifePhoto.lifePhotos) {
                this.lifePhotoList = this.userInfo.lifePhoto.lifePhotos;
                if (this.userInfo.lifePhoto.lifePhotos.length == 4) {
                    this.isShowAddImg = false;
                }
            }
        }
    },
    destroyed () {
        //console.log("updateAvatar-destroyed")
        if (this.fromPage === "divide") {
            sessionStorage.removeItem("identity");
        }
    },
    computed: {
        ...mapState(["userInfo", "shopSettingInfo"]),
    },
    methods: {
        async supply (needed) {
            let res = await api.publishNeeded(needed)
            if (res.errCode === 0) {
                this.$vux.toast.text("发布成功", "middle");
                this.showneededPanel = false
            }
        },
        publishNeeded () {
            this.showneededPanel = true
        },
        hide () {
            this.showneededPanel = false
        },
        saveCompanyLink () {
            if (!this.link) {
                this.$vux.toast.text("请填入链接", "middle");
                return
            }
            let data = {
                link: this.link
            }
            api.uploadCompanyLink(data).then(res => {
                if (res.errCode === 0) {
                    api.getUserInfo().then((res) => {
                        console.log("getUserInfo----", res);
                        this.getuserInfo(res);
                    });
                    this.$vux.toast.text("保存成功", "middle");
                }
            })
        },
        goBack () {
            this.$vux.toast.text("保存成功", "middle");
            // this.$router.go(-2)
        },
        //选择上传生活照
        uploadLifePic (e) {
            if (this.lifePhotoDesc === "") {
                this.lifePhotoDesc = "求点赞"
            }
            let _this = this;
            let file = e.target.files[0];
            this.lifePicName = file.name;
            //console.log("file------", file)
            if (file.type === "video/mp4") {
                this.$vux.toast.text(
                    "你所选的文件格式不符合，请重新选择",
                    "middle"
                );
                return;
            }
            this.uploadAvatarShow = false;
            lrz(e.target.files[0], {
                quality: 0.4,
            }).then((compressedImg) => {
                //console.log("compressedImg---------", compressedImg);
                _this.showTailor = true;
                _this.option.img = compressedImg.base64;
            });
        },
        dataURItoBlob (dataURI) {
            var byteString = atob(dataURI.split(",")[1]);
            var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        },
        //确定生活照
        LifePicupComfirmBtn () {
            if (this.isUpLoading) {
                this.$vux.toast.text(
                    "正在裁剪图片上传,请稍等",
                    "middle"
                );
                return
            }
            this.isUpLoading = true
            this.$refs.cropper.getCropData((data) => {
                // console.log("this.$refs.cropper.getCropBlob----------", data);
                this.resultLife = data.split(",")[1];
                //上传生活照
                let photodata = {
                    caption: this.lifePhotoDesc ? this.lifePhotoDesc : "",
                    filename: this.lifePicName,
                    photodata: this.resultLife,
                };
                api.updateLifePic(photodata).then((res) => {
                    console.log("updateLifePic----", res);
                    this.showTailor = false
                    if (res.errCode === 0) {
                        api.getUserInfo().then((res) => {
                            console.log("getUserInfo----", res);
                            this.getuserInfo(res);
                            this.lifePhotoDesc = "";
                            if (res.lifePhoto.lifePhotos) {
                                this.lifePhotoList = res.lifePhoto.lifePhotos
                                if (res.lifePhoto.lifePhotos.length == 4) {
                                    this.isShowAddImg = false;
                                }
                            }
                            this.isUpLoading = false
                            this.$vux.toast.show({
                                text: "保存成功",
                            });
                        });
                        if (this.lifePhotoList.length === 4) {
                            this.isShowAddImg = false;
                        }
                    }
                });
            });
        },
        //删除生活照
        close (photoImg, index) {
            console.log("index---", index);
            console.log("photoImg---", photoImg);
            let data = {
                url: photoImg.photoURL,
            };
            //console.log("photoImg----", photoImg)
            api.delLifePhoto(data).then((res) => {
                console.log("删除生活照---", res);
            });
            if (this.fromPage === "divide") {
                this.lifePhotoList.splice(index, 1);
            } else {
                this.deleteLifeImg(index);
                this.lifePhotoList = this.userInfo.lifePhoto.lifePhotos;
            }
            if (this.lifePhotoList.length === 4) {
                this.isShowAddImg = false;
            } else {
                this.isShowAddImg = true;
            }
        },
        //选择头像图片
        uploadAvatar (e) {
            let file = e.target.files[0];
            //console.log("file----", file)
            if (file.type === "video/mp4") {
                this.$vux.toast.text(
                    "你所选的文件格式不符合，请重新选择",
                    "middle"
                );
                return;
            }
            this.fileName = file.name;
            this.uploadAvatarShow = true;
            let _this = this;
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                _this.result = this.result;
                //console.log(_this.result);
                _this.showTailor = true;
                _this.option.img = this.result;
            };
        },
        avatarPicupLoad () {
            this.$refs.cropper.getCropBlob((data) => {
                //console.log('this.$refs.cropper.getCropBlob----------', data);
                this.resultAvatar = data;
                this.$refs.avatar.src = data;
                this.showTailor = false;
                //更新头像
                api.updateAvatar(this.fileName, this.resultAvatar).then(
                    (res) => {
                        // //console.log(res);
                        this.addPic = res.imgURL;
                        if (res.imgURL.length > 0) {
                            api.getUserInfo()
                                .then((res) => {
                                    //console.log(res);
                                    if (this.fromPage === "individual") {
                                        //如果主身份则按正常流程走，更新个人信息
                                        console.log(
                                            "如果主身份则按正常流程走，更新个人信息"
                                        );
                                        this.getuserInfo(res);
                                    }
                                    this.$vux.toast.show({
                                        text: "保存成功",
                                    });
                                })
                                .catch((err) => {
                                    //console.log(err);
                                });
                        }
                    }
                );
            });
        },
        ...mapMutations({
            getuserInfo: "GET_USERINFO",
            addLifeImg: "CHANGE_LIFEIMG", //新增生活照
            deleteLifeImg: "DELETE_LIFEIMG", //删除生活照
        }),
    },
    components: {
        VueCropper,
        myHeader,
        XButton,
    },
};
</script>

<style scoped lang='less'>
@import "../../assets/less/variable.less";
.avatar-container {
    height: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    overflow: auto;
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
        .company-setting {
            margin-bottom: 0.5rem;
            .ip-link {
                margin: 8px 0;
                height: 0.8rem;
                width: 6rem;
                padding-left: 0.2rem;
            }
            .save {
                padding: 0.25rem 0.3rem;
                border-radius: 4px;
                color: #fff;
                background: @baseColor;
            }
            .desc {
                font-size: 13px;
                color: #999;
            }
        }
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
            flex-direction: column;
            justify-content: center;
            .photo {
                display: flex;
                align-items: center;
                justify-content: space-around;
                margin-bottom: 0.2667rem;
                .lifePhoto-desc {
                    height: 0.6rem;
                    padding-left: 0.1rem;
                }
                .addpic-box {
                    height: 2rem;
                    width: 2rem;
                    position: relative;
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
                        top: -0.3rem;
                        right: -0.3333rem;
                        padding: 0.1067rem;
                        z-index: 6;
                    }
                    .imgItem {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .btn {
            width: 100%;
            border: none;
            padding: 0.2667rem 0;
            background-color: #ffd800;
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
    .btn {
        display: block;
        margin: 0.8rem auto;
        padding: 0 0.4rem;
        border: none;
        background-color: #ffd800;
        color: #fff;
        width: 80%;
        height: 1rem;
        line-height: 1rem;
    }
    .warning_bg {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0; // background-color: rgba(0, 0, 0, 0.3);
        .warning_wrapper {
            background-image: url("../../assets/image/envelop.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: absolute;
            z-index: 9;
            top: 40%;
            left: 50%;
            margin-left: -4rem;
            margin-top: -1rem;
            width: 8rem;
            height: 4rem;
            box-sizing: border-box;
            padding-top: 0.66rem;
            .desc_box {
                display: flex;
                justify-content: space-between;
                padding: 0 0.5rem;
                .k_3 {
                    width: 3rem;
                    height: 1.5rem;
                }
                .warningText {
                    width: 100%;
                    text-align: center;
                    color: #333;
                    font-size: 0.3333rem;
                    font-weight: 800;
                    width: 3rem;
                    text-align: left;
                }
            }
            .btnBox {
                margin-top: 0.5rem;
                text-align: center;
                display: flex;
                justify-content: space-around;
                padding: 0 0.4rem;
                .yes,
                .no {
                    border: none;
                    border-radius: 0.1067rem;
                    padding: 0.2067rem 0.3333rem;
                    background-color: #ffd800;
                    font-weight: 900;
                }
            }
        }
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
