<template>
    <div>
        <transition name="fade">
            <div id="chat" class="chatRoom">
              <div v-if="!isClientFlag" @click="book" class="book-box">
                <img  src="../../assets/image/plane_book.png" class="plane-book" alt="">
                <span class="book-text">预约</span>
              </div>
                <div class="chat_nav">
                    <div class="back_box">
                        <img onclick="return false" src="../../assets/image/back_chat.png" alt class="back_arrow" @click="goBack">
                    </div>
                    <div class="name">
                        <div class="sex_box">
                            <img v-if="staticChatFriendObj.sex===2" src="../../assets/image/female.png" alt="">
                            <img v-else src="../../assets/image/male.png" alt="">
                        </div>
                        <span>{{staticChatFriendObj.nickname?staticChatFriendObj.nickname:"客服小哥"}}</span>
                        <div class="helpTips" v-show="!showDialog" @click="showDialog = true">查看说明</div>
                    </div>
                    <div class="backHome_box">
                        <img onclick="return false" src="../../assets/image/chat_home.png" alt class="home" @click="goHome">
                    </div>
                </div>
                <div class="chat_wrapper" ref="chatWrapper" @click="tagScroll">
                    <div class="preview_pic" v-show="showPreview" ref="preview_pic" @click="closePreview"></div>
                    <scroll ref="listView" class="chat_content" :scrollHeight="scrollHeight" :data="componentChatList" :listen-scroll="listenScroll"
                            :pullDownRefresh="pullDownRefresh"
                            @pullingDown="pullingDown">
                        <ul class="chat_list" ref="chatList">
                            <li class="clearfix chatListItem" ref="item" :class="{'friend':item.friend,'mine':!item.friend}" :key="index" v-for="(item,index) in componentChatList">
                                <div v-if="item.type==1" class="message_wrapper">
                                    <div class="person_box">
                                        <h2 class="name">{{item.time.slice(8,10)==today?item.time.slice(11):item.time.slice(5,10)}}</h2>
                                        <!-- <h2 class="name">{{item.time}}</h2> -->
                                        <img onclick="return false" :src="staticChatFriendObj.headimgurl?staticChatFriendObj.headimgurl:clientImg" alt class="avatar" v-if="item.friend">
                                        <img onclick="return false" :src="userInfo.headimgurl?userInfo.headimgurl:clientImg" alt class="avatar" v-else>
                                    </div>
                                    <div class="message_box">
                                        <span v-show="item.type===1" class="arrow"></span>
                                        <p class="message" style="word-break: break-all;" v-if="item.type===1" v-html="item.message"></p>
                                    </div>
                                </div>
                                <div v-if="item.type==10" class="book_wrapper">
                                    <img class="book_icon" src="../../assets/image/plane_book.png" alt="">
                                    <p class="time">{{item.time}}</p>
                                    <div class="content-box ">
                                        <p class="book_title">{{item.friend === 0?"我的":"贵宾"}}预约/预订：</p>
                                        <div class="book_content">
                                            <div class="content">
                                                {{item.message}}
                                            </div>
                                        </div>
                                        <div class="book_handle" v-if="item.friend != 0 && !item.isHandled">
                                            <div class="change" @click="changeBookInfo(item)">更改</div>
                                            <div class="accept" @click="acceptBookInfo(item)">接受</div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="item.type==2" class="message_wrapper">
                                    <div class="person_box">
                                        <h2 class="name">{{item.time.slice(8,10)==today?item.time.slice(11):item.time.slice(5,10)}}</h2>
                                        <img :src="staticChatFriendObj.headimgurl?staticChatFriendObj.headimgurl:clientImg" alt class="avatar" v-if="item.friend">
                                        <img :src="userInfo.headimgurl" alt class="avatar" v-else>
                                    </div>
                                    <div class="message_box" v-viewer>
                                        <span v-show="item.type===2" class="arrow" style="background:none"></span>
                                        <img :src="item.message" @load="onImgLoaded" alt class="messRecordPic" ref="picture">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </scroll>
                </div>
                <div class="input_wrapper">
                    <div class="input_area clearfix">
                        <input type="text" ref="sendWrapper" id="send_message" class="send_message" @focus.prevent="myfocus" v-model="input_value">
                        <div @click="send" class="action_box clearfix" :class="{active:flag}">
                            <img src="../../assets/image/plane.png" alt class="icon_plane fl">
                            <span class="send fl" ref="send">发送</span>
                        </div>
                    </div>
                    <div class="select_area">
                        <ul class="selectList clearfix">
                            <li class="item fl">
                                <img onclick="return false" src="../../assets/image/chat_emotion.png" alt @click="show_emotion">
                            </li>
                            <li class="item fl">
                                <img onclick="return false" src="../../assets/image/message_chat.png" alt @click="show_expression">
                            </li>
                            <li class="item fl">
                                <img onclick="return false" src="../../assets/image/chat_pic.png" alt>
                                <input type="file" class="file" accept="image/*" @change="sendImage">
                            </li>
                            <li class="item fl" style="padding:0" v-if="isClientFlag" @click="sendStaffCouponToUser">
                                <img style="width:100%;height:100%" onclick="return false" src="../../assets/image/quan-icon.jpg" alt>
                            </li>
                        </ul>
                    </div>
                    <div class="emotion_area" v-if="emotionShow">
                        <swiper :auto="false" height="130px" :show-dots="false">
                            <swiper-item class="black">
                                <grid :show-vertical-dividers="true" :cols="8">
                                    <div @click="selectEmtion(item.name)" :key="index" v-for="(item,index) in emotionList" class="vux-center-h" style="box-sizing:border-box;display:inline-block;padding:0.2rem 0.2rem">
                                        <img onclick="return false" :src="item.num" alt>
                                    </div>
                                </grid>
                            </swiper-item>
                        </swiper>
                    </div>
                    <!-- 常用语 -->
                    <div class="expression_wrapper" v-if="expressionShow">
                        <ul class="expressList">
                            <li class="item vux-1px-b" v-for="(item,index) in expressionList" :key="index" @click="addExpress(item)">{{item}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
        <validatephone :isShow="showPhoneDialog" @close="closePhoneDialog"></validatephone>
        <div v-transfer-dom>
            <x-dialog v-model="showDialog" class="dialog-demo">
                <div class="img-box" v-if="shopSettingInfo.shopModeId===0">
                    <p>欢迎光临，关注本社群专享会员特权，你可以：</p>
                    <p>1、领福利，参活动</p>
                    <p>2、现场/线上交友互动</p>
                    <p>3、大话比赛/现场斗酒/邀友组局</p>
                    <p>4、分享引荐2人进群，还可展现自已的企业/产品/供求。</p>
                </div>
                <div class="img-box" v-else>
                    <p>温馨提示会员：</p>
                    <p>1、请在“我的-设置“中完善个人资料，以便更多人结识您</p>
                    <p>2、您可通过“个性标签“设置自已的学校、班级、专长等。以便好友查找</p>
                    <p>3、发布照片后可提交到“供求信息“栏，增加曝光度</p>
                    <p>4、社群靠大家共建。每分享引荐1好友进群，可获1朵小红花。红花越多排名越前。</p>
                </div>
                <div @click="closeTips">
                    <span class="vux-close"></span>
                </div>
            </x-dialog>
        </div>
        <img style="width:.3rem;height:.3rem" src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIdKsz6IqgWrPCkWJ0uAe5mK7LZ1qn3T2z0Ug3LnkSmpwlQ2IKz8n9PeZos1ORJ8xcUrSyJRBkNKw/132" alt="">
    </div>
</template>

<script type='text/ecmascript-6'>
// import envelope from 'base/envelope/envelope';
import loading from "../../base/loading/loading";
import validatephone from "../../base/validatephone/validatephone";
// import qrCode from 'base/qrCode/qrCode';
// import topUp from 'base/topUp/topUp';
import {
    Tab,
    TabItem,
    XHeader,
    TransferDom,
    Scroller,
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    Popup,
    XDialog
} from "vux";
import Scroll from "../../base/scroll/scroll.vue";
import Url from "../../common/config.js";
import api from "common/api.js";
import util from "common/util.js";
import Bus from "common/bus.js";
import Picker from 'better-picker'
import dateRange from "./date"
import timeRange from "./time"
// console.log(dateRange)
// console.log(timeRange)
// import EXIF from "common/exif.js";
import {
    mapState,
    mapMutations,
    mapGetters
} from "vuex";
import lrz from "lrz";
export default {
    directives: {
        TransferDom,
        focus: function (el) {
            el.focus();
        }
    },
    data () {
        return {
            showPhoneDialog: false,
            data1: dateRange,
            data2: timeRange,
            data3: [],
            showDialog: false,
            clientImg: require("../../assets/image/home_letter.png"),
            isClientFlag: false,
            showPreview: false,
            scrollHeight: 500,
            pullDownRefresh: true,
            expressionShow: false,
            expressionList: [],
            today: "",
            emotionShow: false,
            flag: false,
            input_value: "",
            emotionList: [{
                name: "[大哭]",
                num: "/static/face/3.gif"
            },
            {
                name: "[嘻嘻]",
                num: "/static/face/4.gif"
            },
            {
                name: "[晕]",
                num: "/static/face/7.gif"
            },
            {
                name: "[再见]",
                num: "/static/face/8.gif"
            },
            {
                name: "[爱心]",
                num: "/static/face/12.gif"
            },
            {
                name: "[点赞]",
                num: "/static/face/13.gif"
            },
            {
                name: "[握手]",
                num: "/static/face/14.gif"
            },
            {
                name: "[ok]",
                num: "/static/face/15.gif"
            },
            {
                name: "[玫瑰]",
                num: "/static/face/16.gif"
            }
            ],
            componentChatList: [],
            isscroll: true,
            ClientEndCursor: 0,
            isLoadMore: false,
            listenScroll: true
            // isLoading: false
        };
    },
    //     beforeRouteLeave(to, from, next) {
    //   // 导航离开该组件的对应路由时调用
    //   // 可以访问组件实例 `this`
    //   if (!this.userInfo.isSubscribe) {
    //     this.changeQrCodeText({
    //       title: "长按关注，方便收到店家留言",
    //       bottomText: "会员特权:领福利、交群友、参活动"
    //     });
    //     this.showQrcode(true);
    //   }
    //   next()
    // },
    created () {
        this.initBookPicker()
        this.today = new Date().getDate();
        this.today = new Date().getDate();
        if (this.today < 10) {
            this.today = "0" + this.today;
        } else {
            this.today = this.today.toString();
        }
        document.body.addEventListener("focusout", () => {
            //软键盘关闭事件
            window.scrollTo(0, 0); //解决ios键盘留白的bug
        });

    },
    mounted () {
        //console.log("mounted")
        console.log("this.staticChatFriendObj=", this.staticChatFriendObj)
    },
    activated () {
        this.isClientFlag = this.$route.params.isClient;
        this.loadChatMsgCliSer(); //获取客服聊天记录
        console.log("activated")
        if (!(JSON.stringify(this.$route.query) === "{}")) {
            this.setChatFriend(this.$route.query.info);
        }

        this.setMsgReadCliSer(); //标识已读
        if (this.isClientFlag) {
            this.expressionList = [
                "收到您的消息，请稍候！",
                "客官，有啥吩咐？",
                "过来玩么？要不帮您订个台？",
                "请对本店的出品和服务提个意见，以便我们更好服务您",
                "请关注本店，平时有空可上网店交朋友，玩大话骰"
            ];
        } else {
            this.expressionList = [
                "请推荐下你们家有啥好玩好吃的？",
                "小二哥，现在还能订到台(房)么？",
                "小二哥，今天现场有优惠活动么？",
                "谢谢小二哥啦!"
            ];
        }
    },
    deactivated () {
        this.setChatFriend({}); //清除vuex里面保存的聊天好友对象
        this.ClientEndCursor = null;
        this.componentChatList = [];
        let cursor = 0;
        this.changeCursor(cursor);
    },
    computed: {
        ...mapState([
            "userInfo",
            "staticChatFriendObj",
            "clientLastChatMsg",
            "inputValue",
            "socket",
            "alreadyFriendListcursor",
            "giftList",
            "staffCouponInfo",
            "shopSettingInfo",
            "l98Setting"
        ]),
        ...mapGetters(["qrIsShow"])
    },
    methods: {
        async initBookPicker () {
            if (this.l98Setting.bookStaffOpen) {
                let staff = await this.loadAllStaff()
                if (staff.length === 0) {
                    return
                }
                staff.forEach(item => {
                  // let img = `<img style="width:.3rem;height:.3rem" src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIdKsz6IqgWrPCkWJ0uAe5mK7LZ1qn3T2z0Ug3LnkSmpwlQ2IKz8n9PeZos1ORJ8xcUrSyJRBkNKw/132" alt="">`
                    let tmp = {
                        text: item.name + "(" + item.number + ")",
                        value: item.name + "(" + item.number + ")",
                        url:item.headImgUrl
                    }
                    this.data3.push(tmp)
                })
            } else {
                let desks = await this.loadDesks()
                if (desks.length === 0) {
                    return
                }
                desks.forEach(item => {
                    let tmp = {
                        text: "台/房号:" + item.code,
                        value: "台/房号:" + item.code
                    }
                    this.data3.push(tmp)
                })
            }

            this.picker = new Picker({
                data: [this.data1, this.data2, this.data3],
                selectedIndex: [0, 20, 0],
                title: `选择预约时间和${this.l98Setting.bookStaffOpen ? "服务专员" : "台/房号"}`
            });
            this.picker.on('picker.select', (selectedVal, selectedIndex) => {
                if (!this.userInfo.phone) {
                    this.showPhoneDialog = true;
                    return
                }
                let text = "预约时间" + selectedVal[0] + selectedVal[1] + "," + selectedVal[2]
                this.sendOwnMsg(text, 10, false)
                console.log(selectedVal, selectedIndex)
            })
        },
        loadDesks () {
            return new Promise(async (resolve, reject) => {
                let res = await api.loadDesks()
                console.log("桌子=", res)
                if (res.errCode === 0) {
                    resolve(res.info)
                }
            })
        },
        acceptBookInfo (bookInfo) {
            let text = ""
            if (this.isClientFlag) {
                text = `预约成功。确认人:${this.userInfo.nickname}`
            } else {
                text = `确认成功。确认人:${this.userInfo.nickname}`
            }
            this.handleBookInfo(text, true, bookInfo)
        },
        changeBookInfo (bookInfo) {
            this.picker.show();
            let text = ""
            if (this.isClientFlag) {
                text = "很抱歉，您预约的时段忙，帮您调整如下"
            } else {
                text = "时段不适合，请另更改如下"
            }
            this.handleBookInfo(text, false, bookInfo)
        },
        handleBookInfo (text, flag, bookInfo) {
            this.sendOwnMsg(text, 1, false)
            let data = {
                isAgree: flag,
                chatMsgID: bookInfo.chatMsgID
            }
            api.sendBookMsg(data).then(res => {
                console.log("回复预约消息结果=", res)
            })
            this.componentChatList.forEach(item => {
                if (item.chatMsgID === bookInfo.chatMsgID) {
                    item.isHandled = true
                }
            })
        },
        closePhoneDialog (flag) {
            console.log("flag=", flag)
            this.showPhoneDialog = flag
        },
        loadAllStaff () {
            return new Promise(async (resolve, reject) => {
                let res = await api.loadAllStaff()
                console.log("全部员工-------", res);
                if (res.errCode == 0) {
                    this.staffList = res.staff.sort(util.sortByKeyS2L("number"));
                    resolve(this.staffList)
                }
            })
        },
        //预约
        book () {
            this.picker.show();
        },

        closeTips () {
            this.showDialog = false
        },
        //员工送券
        sendStaffCouponToUser () {
            let ToId = this.staticChatFriendObj.openid ? this.staticChatFriendObj.openid : sessionStorage.getItem("staffCouponToId")
            //console.log("ToId-----", ToId)
            let data = {
                to: ToId,
                from: this.userInfo.openid,
                CouponId: this.staffCouponInfo.couponId
            }
            // return
            api.sendStaffCouponToUser(data).then(res => {
                //console.log("送券结果-------", res)
                if (res.errCode === 0) {
                    this.$vux.toast.text("赠送成功", "middle");
                }
            })
        },
        //标记客服消息已读
        setMsgReadCliSer () {
            if (this.isClientFlag) {
                //客服账号  发送消息
                api.setMsgReadCliSer(
                    this.staticChatFriendObj.CliSerID,
                    this.staticChatFriendObj.openid,
                ).then(res => {
                        //console.log("客服消息已读------", res);
                    });
            } else {
                api.setMsgReadCliSer(
                    this.userInfo.openid,
                    this.staticChatFriendObj.CliSerID,
                ).then(res => {
                        //console.log("客服消息已读------", res);
                    });
            }
        },
        onImgLoaded () {
            //console.log("图片加载完成了");
            if (this.clientList.length > 5) {
                let childNodes = this.$refs.chatList.childNodes;
                this.$refs.listView.scrollBy(0, -(childNodes[0].clientHeight + 10));
            }
            this.$refs.listView.refresh();
        },
        // 选择表情
        selectEmtion (item) {
            this.input_value += item;
        },
        //获取礼物列表
        _loadAllGift () {
            api.loadAllGift().then(res => {
                if (res.errCode === 0) {
                    this.getGiftList(res.gifts);
                }
            });
        },
        blurAdjust () {
            setTimeout(() => {
                if (
                    document.activeElement.tagName == "INPUT" ||
                    document.activeElement.tagName == "TEXTAREA"
                ) {
                    return;
                }
                let result = "pc";
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    //判断iPhone|iPad|iPod|iOS
                    result = "ios";
                } else if (/(Android)/i.test(navigator.userAgent)) {
                    //判断Android
                    result = "android";
                }
                if ((result = "ios")) {
                    document.activeElement.scrollIntoViewIfNeeded(true);
                }
            }, 400);
        },
        //获取客服聊天消息记录列表
        loadChatMsgCliSer () {
            //console.log("加载留言记录时this.isClientFlag--------", this.isClientFlag);
            if (this.isClientFlag) {
                //客服账号  加载聊天列表
                this._getChatMsgCliList(
                    this.ClientEndCursor,
                    this.staticChatFriendObj.openid,
                    this.staticChatFriendObj.CliSerID
                );
            } else {
                //用户账号  加载聊天列表
                this._getChatMsgCliList(
                    this.ClientEndCursor,
                    this.staticChatFriendObj.CliSerID,
                    this.userInfo.openid
                );
            }
        },
        _getChatMsgCliList (cursor, to, from) {
            api.loadChatMsgCliSer(cursor, to, from, 10)
                .then(res => {
                    return new Promise((resolve, reject) => {
                        var resultMessList = res.messages;
                        this.ClientEndCursor = res.cursor;
                        this.clientList = res.messages;
                        //console.log("客服聊天信息-----------", res);
                        var i;
                        if (!this.isLoadMore) {
                            for (i = resultMessList.length - 1; i >= 0; i--) {
                                let item = resultMessList[i];
                                this.componentChatList.push({
                                    message: item.content,
                                    friend: item.from === this.staticChatFriendObj.openid ? 1 : 0, //1为朋友，0为自己,
                                    type: item.type,
                                    time: util.timestampToTime(item.stime),
                                    from: item.from,
                                    to: item.to,
                                    chatMsgID: item.id,
                                    isHandled: item.chatExtMsg ? item.chatExtMsg.isHandled : false
                                });
                            }
                        } else {
                            for (i = 0; i < resultMessList.length; i++) {
                                let item = resultMessList[i];
                                this.componentChatList.unshift({
                                    message: item.content,
                                    friend: item.from === this.staticChatFriendObj.openid ? 1 : 0, //1为朋友，0为自己,
                                    type: item.type,
                                    time: util.timestampToTime(item.stime),
                                    from: item.from,
                                    to: item.to,
                                    chatMsgID: item.id,
                                    isHandled: item.chatExtMsg ? item.chatExtMsg.isHandled : false
                                });
                            }
                        }
                        console.log("客服聊天记录-------------", this.componentChatList);
                        resolve();
                    });
                })
                .then(() => {
                    this.$nextTick(function () {
                        let childNodes = this.$refs.chatList.childNodes;
                        let chatListHeight = 0;
                        childNodes.forEach(item => {
                            chatListHeight += item.clientHeight;
                        });
                        this.scrollHeight = chatListHeight;
                        this.$refs.listView.finishPullDown();
                        this.$refs.listView.refresh();
                        if (!this.isLoadMore) {
                            this.$refs.listView.scrollTo(0, -this.scrollHeight);
                        }
                    });
                });
        },
        //成为留言者
        addCommenter () {
            api.addCommenter().then(res => {
                // //console.log("成为留言者--------",res)
            });
        },
        //发送消息事件
        send () {
            window.scrollTo(0, 0); //解决ios键盘留白的bug
            //  this.blurAdjust();
            if (!this.input_value) {
                return;
            }
            //字符串转表情icon
            //这段代码是绝壁垃圾，暂时这样吧  下次头脑清醒时再来搞,功能如下两行
            //this.input_value------ [大哭]大风歌[晕]
            // this.input_value------- <img src=/static/face/3.gif style="vertical-align: -6px;">大风歌<img src=/static/face/7.gif style="vertical-align: -6px;">
            //console.log("this.input_value------", this.input_value);
            var emotionArr = this.input_value.match(/\[.{1,2}\]/g);
            var reg = /\[.{1,2}\]/;
            if (emotionArr) {
                for (let i = 0; i < emotionArr.length; i++) {
                    for (var j = 0; j < this.emotionList.length; j++) {
                        if (this.input_value.indexOf(this.emotionList[j].name) !== -1) {
                            this.input_value = this.input_value.replace(
                                reg, `<img src=${this.emotionList[j].num} style="vertical-align: -6px;">`
                            );
                        }
                    }
                }
            }
            //把自己发送的内容加到聊天列表里面
            this.sendOwnMsg(this.input_value, 1, false)
            // this.componentChatList.push({
            //     message: this.input_value,
            //     friend: 0,
            //     type: 1,
            //     time: util.timestampToTime(new Date().getTime()),
            //    
            // });
            // let messObj = {
            //     to: this.isClientFlag ?
            //         this.staticChatFriendObj.openid : this.staticChatFriendObj.CliSerID,
            //     content: this.input_value,
            //     type: 1,
            //     from: this.isClientFlag ?
            //         this.staticChatFriendObj.CliSerID : this.userInfo.openid,
            //     
            // };
            // let textMessObj = JSON.stringify(messObj);
            // let decc1 = new TextEncoder("utf-8");
            // let result = decc1.encode(textMessObj);
            // api.sendChatMsgCliSer(result).then(res => {
            //     this.emotionShow = false;
            //     this.expressionShow = false;
            //     let childNodes = this.$refs.chatList.childNodes;
            //     if (this.clientList.length === 0 && !this.isClientFlag) {
            //         // this.addCommenter(); 带删除
            //     }
            // });
            // this.input_value = "";
            // // if (this.clientList.length > 5) {
            // this.$nextTick(function () {
            //     let childNodes = this.$refs.chatList.childNodes;
            //     // let chatListHeight = 0;
            //     // childNodes.forEach(item => {
            //     //   chatListHeight += item.clientHeight;
            //     // });
            //     // this.scrollHeight = chatListHeight;
            //     this.$refs.listView.refresh();
            //     this.$refs.listView.scrollBy(0, -childNodes[0].clientHeight - 20);
            //     // this.$refs.listView.scrollBy(0, -childNodes-10);
            // });
            // // }
        },
        sendOwnMsg (msg, msgType, isHandle) {
            //把自己发送的内容加到聊天列表里面
            this.componentChatList.push({
                message: msg,
                friend: 0,
                type: msgType,
                to: this.isClientFlag ?
                    this.staticChatFriendObj.openid : this.staticChatFriendObj.CliSerID,
                time: util.timestampToTime(new Date().getTime()),
                chatExtMsg: {
                    isHandled: isHandle,
                    isAgree: isHandle
                }
            });
            let messObj = {
                to: this.isClientFlag ?
                    this.staticChatFriendObj.openid : this.staticChatFriendObj.CliSerID,
                content: msg,
                type: msgType,
                from: this.isClientFlag ?
                    this.staticChatFriendObj.CliSerID : this.userInfo.openid,
                chatExtMsg: {
                    isHandled: isHandle,
                    isAgree: isHandle
                }
            };
            let textMessObj = JSON.stringify(messObj);
            let decc1 = new TextEncoder("utf-8");
            let result = decc1.encode(textMessObj);
            api.sendChatMsgCliSer(result).then(res => {
                this.emotionShow = false;
                this.expressionShow = false;
                let childNodes = this.$refs.chatList.childNodes;
                if (this.clientList.length === 0 && !this.isClientFlag) {
                    // this.addCommenter(); 带删除
                }
            });
            this.input_value = "";
            // if (this.clientList.length > 5) {
            this.$nextTick(function () {
                let childNodes = this.$refs.chatList.childNodes;
                // let chatListHeight = 0;
                // childNodes.forEach(item => {
                //   chatListHeight += item.clientHeight;
                // });
                // this.scrollHeight = chatListHeight;
                this.$refs.listView.refresh();
                this.$refs.listView.scrollBy(0, -childNodes[0].clientHeight - 20);
                // this.$refs.listView.scrollBy(0, -childNodes-10);
            });
            // }
        },
        // 发送图片
        sendImage (e) {
            if (!e.target.files[0]) {
                return;
            }
            if (e.target.files[0].type === "video/mp4") {
                this.$vux.toast.text(
                    "你所选的文件格式不符合，请重新选择",
                    "middle"
                );
                return
            }
            //console.log("点击发送图片");
            let vm = this;
            lrz(e.target.files[0], {
                quality: 0.1
            }).then(function (rst) {
                // if (rst.base64Len > 1024 * 1024 * 1) {
                //   // vm.$toast("图片不能超过1MB");
                //   //console.log("图片不能超过1MB");
                //   return;
                // }
                let filename = rst.origin.name;
                let dataURL = rst.file;
                //console.log("dataURL--------", dataURL)
                if (vm.isClientFlag) {
                    //console.log(vm.staticChatFriendObj);
                    api.sendImageCliSer(
                        vm.userInfo.headimgurl,
                        vm.staticChatFriendObj.openid,
                        vm.staticChatFriendObj.CliSerID,
                        filename,
                        dataURL
                    )
                        .then(res => {
                            //console.log("图片发送--------", res);
                            vm.componentChatList.push({
                                message: res.content,
                                friend: 0,
                                type: 2,
                                time: util.timestampToTime(new Date().getTime())
                            });
                            vm.$refs.listView.refresh();
                        });
                } else {
                    api.sendImageCliSer(
                        vm.staticChatFriendObj.headimgurl,
                        vm.staticChatFriendObj.CliSerID,
                        vm.userInfo.openid,
                        filename,
                        dataURL
                    )
                        .then(res => {
                            vm.componentChatList.push({
                                message: res.content,
                                friend: 0,
                                type: 2,
                                time: util.timestampToTime(new Date().getTime())
                            });
                            vm.$refs.listView.refresh();
                        });
                }
                vm.$nextTick(function () {
                    let childNodes = vm.$refs.chatList.childNodes;
                    let chatListHeight = 0;
                    childNodes.forEach(item => {
                        chatListHeight += item.clientHeight;
                    });
                    vm.scrollHeight = chatListHeight;
                    vm.$refs.listView.refresh();
                    // vm.$refs.listView.scrollBy(0, -childNodes[0].clientHeight-20);
                    vm.$refs.listView.scrollTo(0, -vm.scrollHeight - 10);
                });
            })
                .catch(function (err) {
                    vm.$toast("压缩图片失败");
                });
        },
        //展示大图片
        showBigPic (pic) {
            this.showPreview = true;
            let htmlImage = `<img src="${pic}" style="width:9rem;height:9rem;margin:25% auto;" class="preview-img"/>`;
            this.$refs.preview_pic.innerHTML = htmlImage;
            //console.log(pic);
        },
        //关闭展示图
        closePreview () {
            this.showPreview = false;
        },
        //下拉刷新
        pullingDown () {
            console.log("下拉刷新");
            console.log(this.ClientEndCursor)
            if (this.ClientEndCursor == 0) {
                return;
            }
            this.isLoadMore = true;
            this.loadChatMsgCliSer();
            // });
        },
        tagScroll () {
            window.scrollTo(0, 0);
            this.expressionShow = false;
            this.emotionShow = false;
            document.getElementById("send_message").blur();
            // this.blurAdjust();
        },
        //返回
        goBack () {
            this.$router.go(-1);
        },
        //返回主页
        goHome () {
            this.$router.push({
                name: "home"
            });
        },
        //选择表情
        select_emotion (item) {
            //console.log(item);
            this.input_value += item;
        },
        //选择常用语
        addExpress (item) {
            this.input_value += item;
        },
        //展示表情面板
        show_emotion () {
            this.emotionShow = !this.emotionShow;
            this.expressionShow = false;
        },
        //切换常用语
        show_expression () {
            this.expressionShow = !this.expressionShow;
            this.emotionShow = false;
        },
        myfocus () {
            this.emotionShow = false;
            this.expressionShow = false;
            this.isscroll = true; //允许动态滚动到最底部记录
        },
        ...mapMutations({
            setChatFriend: "SET_CHAT_FRIEND", //全局设置聊天对象的信息
            showQrcode: "SHOW_QRCODE", //暂时二维码
            updateValue: "UPDATE_INPUTVALUE",
            changeCursor: "CHANGE_CURSOR",
            getGiftList: "GET_GIFTLIST", //获取礼物
            showQrcode: "SHOW_QRCODE", //二维码
            changeQrCodeText: "CHANGEQRCODETEXT",
        })
    },
    watch: {
        clientLastChatMsg: function (newValue) {
            //console.log(newValue);
            console.log("动态收到消息")
            this.setMsgReadCliSer(); //标识已读
            let messageInfo = newValue.extMsg.lastMsg;
            messageInfo["nickname"] = newValue.fromInfo.nickname;
            messageInfo["to"] = newValue.extMsg.lastMsg.to;
            //console.log("客服页面的lastchatMsg------------", messageInfo);
            this.componentChatList.push({
                message: messageInfo.content ? messageInfo.content : "",
                friend: 1, //1为朋友，0为自己
                from: messageInfo.from,
                type: messageInfo.type, //1 聊天消息表情 2.图片，3.送礼，4.约战
                time: util.timestampToTime(messageInfo.stime),
                chatMsgID: messageInfo.id
            });
            setTimeout(() => {
                let childNodes = this.$refs.chatList.childNodes;
                //console.log("LastChatMsg_childNodes-------------", childNodes);
                this.$refs.listView.scrollBy(0, -(childNodes[0].clientHeight - 10));
            }, 100);
            // this.$refs.listView.refresh();
        },
        input_value: function (newValue, oldValue) {
            if (newValue.length > 0 || oldValue > 0) {
                this.flag = true;
            } else {
                this.flag = false;
            }
        }
    },
    components: {
        XHeader,
        TransferDom,
        Tab,
        TabItem,
        Swiper,
        SwiperItem,
        Grid,
        GridItem,
        Scroll,
        Popup,
        XDialog,
        validatephone
    }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/variable.less";
@import "../../assets/less/chat.less";
@import "~vux/src/styles/close";
.chatRoom {
    position: fixed;
    z-index: 7;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    .book-box{
      position: fixed;
      z-index: 8;
      right: 0;
      top: 50%;
      width: 1.2rem;
      text-align: center;
      .plane-book {
          width: 1rem;
          height: 1rem;
      }
      .book-text{
        color: #0475B9
      }
    }
    .chat_nav {
        .chat_nav();
    }
    .chat_wrapper {
        flex: 1;
        padding: 0 0.3733rem;
        background: #eee;
        overflow-y: auto;
        position: relative;
        .preview_pic {
            position: fixed;
            text-align: center;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 998;
            background: rgba(0, 0, 0, 0.3);
            .preview-img {
                width: 2rem;
            }
        }
        .chat_content {
            height: 100%;
            .chat_list {
                .chatListItem {
                    padding: 0.4rem 0;
                    box-sizing: border-box;
                    .book_wrapper {
                        margin: 0 auto;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: space-around;
                        width: 6rem;
                        height: 3.3rem;
                        background: #fff;
                        border-radius: 6px;
                        position: relative;
                        .book_icon {
                            position: absolute;
                            top: 0.1rem;
                            left: 0.2rem;
                            width: 0.6rem;
                            height: 0.6rem;
                        }
                        .time {
                        }
                        .content-box {
                            box-sizing: border-box;
                            width: 100%;
                            padding: 0 0.1rem;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            height: 2rem;
                            .book_title {
                            }
                            .book_content {
                                display: flex;
                                justify-content: space-around;
                                height: 1rem;

                                .content {
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    justify-content: center;
                                    text-align: center;
                                    font-size: 13px;
                                }
                            }
                            .book_handle {
                                display: flex;
                                justify-content: space-around;
                                .change,
                                .accept {
                                    background: #ffd800;
                                    padding: 0.1rem 0.2rem;
                                    border-radius: 6px;
                                }
                                .accept {
                                }
                            }
                        }
                    }
                }
                .friend {
                    .chatList(left, #fff);
                    .arrow {
                        .arrowDot(#fff);
                        left: -0.05rem;
                    }
                }
                .messRecordPic {
                    width: 1.8rem;
                    height: 2rem;
                }
                .mine {
                    width: 100%;
                    .chatList(right, #ffd800);
                    .arrow {
                        .arrowDot(#ffd800);
                        right: -0.05rem;
                    }
                    .message_box {
                        margin-right: 0.2667rem;
                    }
                }
                .messRecordPic {
                    width: 1.8rem;
                    height: 2rem;
                }
            }
        }
    }
    .input_wrapper {
        border-top: 1px solid #ccc;
        background: #eee;
        padding: 0 0 0 0.4rem; //输入区域
        .input_area {
            padding: 0.2133rem 0;
            height: 1.44rem;
            box-sizing: border-box;
            .send_message {
                outline: none;
                -webkit-appearance: none;
                font-size: 0.3733rem;
                float: left;
                width: 6.9333rem;
                height: 0.9867rem;
                text-indent: 0.2667rem;
                border: 1px solid #999;
            }
            .action_box {
                margin-left: 0.2767rem;
                float: left;
                width: 2rem;
                height: 1.06rem;
                background: #999;
                border-radius: 0.1067rem;
                padding: 0.2533rem 0.2933rem;
                box-sizing: border-box;
                &.active {
                    background: #ffd800;
                }
                .icon_plane {
                    width: 0.5867rem;
                    height: 0.48rem;
                }
                .send {
                    color: #4b4b4b;
                    font-size: 0.4rem;
                }
            }
        } //选择区域
        .select_area {
            height: 1.1rem;
            box-sizing: border-box;
            .selectList {
                .item {
                    width: 0.9067rem;
                    height: 0.9067rem;
                    margin-right: 0.46rem;
                    background: #fff;
                    box-sizing: border-box;
                    padding: 0.1867rem;
                    border-radius: 0.1067rem;
                    position: relative;
                    .file {
                        position: absolute;
                        width: 0.9067rem;
                        height: 0.9067rem;
                        left: 0;
                        top: 0;
                        opacity: 0;
                    }
                    img {
                        width: 0.5333rem;
                        height: 0.5333rem;
                    }
                }
            }
        } // 表情区域
        .emotion_area {
            overflow: hidden;
            .grid-center {
                display: block;
                text-align: center;
                padding: 4px;
                font-size: 0.5333rem;
            }
        }
        .expression_wrapper {
            // width: 100%;
            margin-left: -0.4667rem;
            .expressList {
                width: 100%;
                .item {
                    height: 0.8rem;
                    box-sizing: border-box;
                    line-height: 0.8rem;
                    font-size: 0.3467rem;
                    color: #333;
                    background: #eee;
                    text-indent: 0.4667rem;
                }
            }
        }
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
            top: 45%;
            left: 50%;
            margin-left: -3rem;
            margin-top: -1rem;
            width: 6rem;
            height: 3rem;
            box-sizing: border-box;
            padding-top: 0.66rem;
            .warningText {
                width: 100%;
                text-align: center;
                color: #333;
                font-size: 0.4333rem;
                font-weight: 800;
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
                }
            }
        }
    }
}
.position-vertical-demo {
    height: 3.76rem;
    background: #fff;
    .title {
        color: @baseColor;
        font-size: 0.3733rem;
        padding: 0.2667rem;
        text-align: left;
        position: relative;
        .close {
            width: 0.4rem;
            height: 0.4rem;
            position: absolute;
            top: 0.3rem;
            right: 0.4rem; // z-index: 999;
        }
    }
    .gift_list {
        margin-top: 0.36rem;
        .list {
            display: flex;
            justify-content: space-around;
            margin-left: 0.4rem;
            .item {
                float: left; // margin-right: 1rem;
                width: 1.7067rem;
                height: 1.9467rem;
                box-sizing: border-box;
                text-align: center;
                .game {
                    width: 0.6933rem;
                    height: 0.48rem;
                }
                img {
                    width: 1.1333rem;
                    height: 1.1333rem;
                    &.flower {
                        width: 1.0933rem;
                        height: 1.16rem;
                    }
                    &.house {
                        margin-top: 0.3667rem;
                        width: 0.96rem;
                        height: 0.8267rem;
                    }
                    &.car {
                        margin-top: 0.3167rem;
                        width: 1.3067rem;
                        height: 0.8667rem;
                    }
                }
                .gift_name {
                    width: 100%;
                    text-align: center;
                    font-size: 0.2667rem;
                    color: #666;
                }
                .gift_price {
                    width: 100%;
                    text-align: center;
                    font-size: 0.2933rem;
                    color: #f13c19;
                }
            }
        }
    }
}
.weui-grid {
    padding: 0.1333rem;
}
.weui-grids:before {
    border-left: none;
}
.weui-grids:after {
    border-left: none;
}
.weui-grids:before {
    border-top: none;
}
.weui-grid:before {
    border-right: none;
}
.weui-grid:after {
    border-bottom: none;
}
.vux-popup-dialog {
    z-index: 99999;
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}
.fade-enter {
    transform: translate3d(100%, 0, 0);
}
.fade-leave-to {
    transform: translate3d(-100%, 0, 0);
}
</style>
