<template>
    <div class="comment-wrapper">
        <!-- 分享引导 -->
        <div class="bg" v-if="isShow_bg" @click="isShow_bg = false">
            <img
                onclick="return false"
                src="../../assets/image/share.png"
                alt
            />
            <p class="shareText">
                支持我捧个场，分享吧！每引荐一位好友送1朵小红花和20积分
            </p>
            <p class="shareText" style="top:4.8rem">
                红花大于2个，您也可以展示您的企业/产品，交更多群友
            </p>
        </div>
        <div class="content">
            <header>
                <div class="comment-header-left">
                    <img
                        :src="
                            scopeUserInfo.headimgurl
                                ? scopeUserInfo.headimgurl
                                : tempPic
                        "
                        class="comment-avatarUrl"
                        alt=""
                    />
                    <span class="comment-name">{{
                        scopeUserInfo.nickname
                    }}</span>
                </div>
                <div class="comment-header-right" @click="goHome">
                    <img
                        src="../../assets/image/chat_home.png"
                        class="comment-home"
                        alt=""
                    />
                </div>
            </header>
            <div>
                <div v-if="lifePhotolist.length > 0" class="comment-slider">
                    <swiper
                        height="256px"
                        :list="lifePhotolist"
                        :interval="2000"
                        :auto="true"
                        :show-dots="false"
                        v-model="swiperItemIndex"
                        :min-moving-distance="10"
                    ></swiper>
                </div>
                <div v-else class="comment-slider">
                    <p class="comment-staffData">
                        用户未上传图片，暂无图片信息
                    </p>
                </div>
            </div>
            <div class="comment-result">
                <ul class="comment-header-list">
                    <li class="comment-divide" @click="giveThumb">
                        <img
                            src="../../assets/image/thumb_up.png"
                            class="comment-icon"
                            alt=""
                        />
                        <span class="comment-count">{{
                            staffCommentInfo.thumbCount
                        }}</span>
                    </li>
                    <li class="comment-divide" @click="unGiveThumb">
                        <img
                            src="../../assets/image/thumb_down.png"
                            class="comment-icon"
                            alt=""
                        />
                        <span class="comment-count">{{
                            staffCommentInfo.unThumbCount
                        }}</span>
                    </li>
                    <li class="comment-divide">
                        <img
                            src="../../assets/image/message_comment.png"
                            class="comment-icon"
                            alt=""
                        />
                        <span class="comment-count">{{
                            staffCommentInfo.messageCount
                        }}</span>
                    </li>
                </ul>
                <scroll
                    ref="listView"
                    class="comment_content"
                    style="background: #f1f1f1"
                    :data="staffCommentInfo.messageList"
                >
                    <div>
                        <div
                            v-if="staffCommentInfo.thumbAvatarList"
                            class="comment-thums-list"
                        >
                            <img src="../../assets/image/thumb_up.png" alt="" />
                            <ul class="thumb-avatar-list">
                                <li
                                    class="avatar"
                                    v-for="(avatar,
                                    index) in staffCommentInfo.thumbAvatarList"
                                    :key="index"
                                >
                                    <!-- <img src="../../assets/image/avatar1.jpeg" alt=""> -->
                                    <img :src="avatar" alt="" />
                                </li>
                            </ul>
                        </div>
                        <div
                            class="comment-message-list"
                            v-show="
                                staffCommentInfo.messageList.length > 0
                                    ? true
                                    : false
                            "
                        >
                            <img
                                src="../../assets/image/message_comment.png"
                                alt=""
                            />
                            <ul class="message-list">
                                <li
                                    class="message-item"
                                    v-for="(staff,
                                    index) in staffCommentInfo.messageList"
                                    :key="index"
                                >
                                    <img :src="staff.headImgUrl" alt="" />
                                    <div class="message">
                                        <div class="message-top">
                                            <span class="name">{{
                                                staff.nickname
                                            }}</span>
                                            <span class="time">{{
                                                staff.time
                                            }}</span>
                                        </div>
                                        <div class="message-bottom">
                                            <p v-html="staff.message"></p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </scroll>
            </div>
        </div>
        <div class="comment-send">
            <div>
                <input
                    v-model="inputValue"
                    type="text"
                    class="input-comment"
                    placeholder="请输入评价"
                />
                <div class="btn" @click="send">发送</div>
            </div>
            <div class="emotion_area">
                <div
                    @click="selectEmtion(item.name)"
                    :key="index"
                    v-for="(item, index) in emotionList"
                    class="vux-center-h"
                    style="
                        box-sizing: border-box;
                        display: inline-block;
                        padding: 0.2rem 0.18rem;
                    "
                >
                    <img onclick="return false" :src="item.num" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperItem, Grid, GridItem } from "vux";
import Scroll from "../../base/scroll/scroll.vue";
import api from "common/api";
import util from "common/util";
import Bus from "common/bus";
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            isShow_bg: false,
            scopeUserInfo: {},
            tempPic: require("../../assets/image/divide_add_avatar.png"),
            staffInfoByPhone: {},
            phone: "",
            emotionList: [
                {
                    name: "[大哭]",
                    num: "/static/face/3.gif",
                },
                {
                    name: "[嘻嘻]",
                    num: "/static/face/4.gif",
                },
                {
                    name: "[晕]",
                    num: "/static/face/7.gif",
                },
                {
                    name: "[再见]",
                    num: "/static/face/8.gif",
                },
                {
                    name: "[爱心]",
                    num: "/static/face/12.gif",
                },
                {
                    name: "[点赞]",
                    num: "/static/face/13.gif",
                },
                {
                    name: "[握手]",
                    num: "/static/face/14.gif",
                },
                {
                    name: "[ok]",
                    num: "/static/face/15.gif",
                },
                {
                    name: "[玫瑰]",
                    num: "/static/face/16.gif",
                },
            ],
            emotionShow: false,
            swiperItemIndex: 0,
            lifePhotolist: [], //员工照片
            inputValue: "", // 输入框内容
            staffCommentInfo: {
                messageList: [],
            },
            staffInfo: {},
            storePhotoList: [],
            queryPhone: "",
        };
    },
    created() {
        setTimeout(() => {
            this.isShow_bg = true;
            setTimeout(() => {
                this.isShow_bg = false;
            }, 5000);
        }, 8000);
        util.addVisitRecord(this.$route.name);
        let urlOpenId = util.GetQueryString("openId");
        this.isSelf = this.$route.params.isSelf;
        this.scopeOpenId = this.$route.params.openId;
        console.log("this.$route.params.openId---",this.$route.params.openId)
        this.scopeOpenId = urlOpenId ? urlOpenId : this.scopeOpenId;
        this.loadUserInfoByOpenId();
        this.loadCommentInfo();
        document.body.addEventListener("focusout", () => {
            //软键盘关闭事件
            window.scrollTo(0, 0); //解决ios键盘留白的bug
        });
    },
    mounted() {
        setTimeout(() => {
            let shareObj = {
                title: "找朋友",
                desc: "我看行……大伙帮Ta捧个场吧",
                link: `${this.shareUrl}k98/commentUser?openId=${this.isSelf?this.userInfo.openid:this.scopeOpenId}`,
                imgUrl: `${this.scopeUserInfo.headimgurl}`,
            };
            util.setShareInfo(shareObj, 20, "comment", this.shareGetJifen);
        }, 1000);
    },
    watch: {
        $route(newRoute) {
            console.log("newRoute----", newRoute);
        },
        queryPhone(newValue) {
            console.log("queryPhone-newValue---", newValue);
        },
    },
    computed: {
        ...mapState(["l98Setting", "lifeImgList", "userInfo", "shareUrl"]),
    },
    methods: {
        //分享获得积分
        shareGetJifen(amount, shareType) {
            api.shareToGetIntegral(amount, shareType).then((res) => {
                if (res.errCode == 1030) {
                    alert("分享已上限，每天最多分享5次获得积分");
                }
            });
        },
        //通过openId获得用户信息
        async loadUserInfoByOpenId() {
            let res = await api.getUserInfo(this.scopeOpenId);
            console.log("用户信息---", res);
            this.scopeUserInfo = res;
            var tempArr = [];
            if (res.lifePhoto.lifePhotos) {
                res.lifePhoto.lifePhotos.forEach((lifePhoto) => {
                    tempArr.push({
                        url: "javascript:",
                        img: lifePhoto.photoURL,
                        title: lifePhoto.caption ? lifePhoto.caption : "求点赞",
                    });
                });
            } else {
                tempArr.push({
                    url: "javascript:",
                    img: res.headimgurl,
                    title: "求点赞",
                });
            }
            this.lifePhotolist = tempArr;
        },
        goHome() {
            this.setChatFriend({}); //清空全局聊天对象
            this.$router.push({
                name: "home",
            });
        },
        showEmotion() {
            this.emotionShow = !this.emotionShow;
        },
        //点赞
        giveThumb() {
            if (this.isSelf) {
                this.$vux.toast.text(`不能自己点赞或留言`);
                return;
            }
            if (this.scopeUserInfo.isComment) {
                this.$vux.toast.text(`榜主已关闭评价/留言功能`);
                return;
            }
            api.giveThumb(this.scopeUserInfo.openid).then((res) => {
                if (res.errCode === 0) {
                    this.loadCommentInfo();
                } else if (res.errCode === 1051) {
                    this.$vux.toast.text(`一天只能点赞一次`);
                } else {
                    this.$vux.toast.text(res.errMsg);
                }
            });
        },
        //鄙视
        unGiveThumb() {
            if (this.isSelf) {
                this.$vux.toast.text(`不能自己点赞或留言`);
                return;
            }
            if (this.scopeUserInfo.isComment) {
                this.$vux.toast.text(`榜主已关闭评价/留言功能`);
                return;
            }
            api.giveUnThumb(this.scopeUserInfo.openid).then((res) => {
                if (res.errCode === 0) {
                    this.loadCommentInfo();
                } else if (res.errCode === 1051) {
                    this.$vux.toast.text(`一天只能鄙视一次`);
                } else {
                    this.$vux.toast.text(res.errMsg);
                }
            });
        },
        //发布留言
        send() {
            if (this.isSelf) {
                this.$vux.toast.text(`不能自己点赞或留言`);
                return;
            }
            if (this.scopeUserInfo.isComment) {
                this.$vux.toast.text(`榜主已关闭评价/留言功能`);
                return;
            }
            var emotionArr = this.inputValue.match(/\[.{1,2}\]/g);
            var reg = /\[.{1,2}\]/;
            if (emotionArr) {
                for (let i = 0; i < emotionArr.length; i++) {
                    for (var j = 0; j < this.emotionList.length; j++) {
                        if (
                            this.inputValue.indexOf(
                                this.emotionList[j].name
                            ) !== -1
                        ) {
                            this.inputValue = this.inputValue.replace(
                                reg,
                                `<img src=${this.emotionList[j].num} style="vertical-align: -6px;">`
                            );
                        }
                    }
                }
            }
            let data = {
                openId: this.scopeUserInfo.openid,
                message: this.inputValue,
                time: new Date().getTime(),
                nickname: this.userInfo.nickname,
                headImgUrl: this.userInfo.headimgurl,
            };
            api.sendCommentMessage(data).then((res) => {
                if (res.errCode === 0) {
                    this.inputValue = "";
                    this.loadCommentInfo();
                } else {
                    this.$vux.toast.show({
                        text: res.errMsg,
                    });
                }
            });
            //console.log(this.inputValue);
        },
        selectEmtion(item) {
            this.inputValue += item;
        },
        loadCommentInfo() {
            api.loadStaffCommentInfo(this.scopeOpenId).then((res) => {
                console.log("评价内容---", res);
                if (res.errCode === 0) {
                    this.staffCommentInfo = res.staffCommentInfo;
                    this.staffCommentInfo.messageList.forEach((message) => {
                        message.time = util.timestampToTime(message.time);
                    });
                } else {
                    this.$vux.toast.show({
                        text: res.errMsg,
                    });
                }
                //console.log("this.staffCommentInfo------", this.staffCommentInfo);
            });
        },
        ...mapMutations({
            setChatFriend: "SET_CHAT_FRIEND", //全局设置聊天对象的信息
            addFriendEvtObj: "UPDATE_DYNAMICMESSAGE", //更新好友事件提示框(左侧信封弹出触发)
            judgeMessType: "JUDGE_MESSTYPE", //判断消息类型
            changeQrCodeText: "CHANGEQRCODETEXT",
            showQrcode: "SHOW_QRCODE",
        }),
    },
    components: {
        Swiper,
        Scroll,
        SwiperItem,
        Grid,
        GridItem,
    },
};
</script>

<style lang="less" scoped>
.bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    img {
        width: 100px;
        height: 100px;
        position: fixed;
        right: 0;
    }
    .shareText {
        font-size: 0.5rem;
        color: #fff;
        position: fixed;
        top: 2.8rem;
        right: 0.5rem;
    }
}
@import "./comment.less";
</style>


