<template>
    <div
        id="friend"
        class="friend"
    >
        <div class="nav">
            <img
                onclick="return false"
                src="../../assets/image/select.png"
                alt
                @click="showToast=true"
            />
            <!-- <div class="switchBtn_wrapper" @click="switchMakeFriModal">
                <div class="imgBox">
                  <img onclick="return false" class="soulIcon" src="../../assets/image/soulIcon.png" alt="">
                  <span class="dot left"></span>
                  <span class="dot right"></span>
                </div>
                <p class="soulText">{{modalSwitch?"自己找":"1键找玩伴"}}</p>
                <p class="intro_soulText" v-show="isFirstLoad">1键找到你的幸运玩伴</p>
            </div>-->
            <div class="shopInfo">
                <img
                    :src="shopSettingInfo.image"
                    class="logo"
                    alt
                />
                <span class="name">{{shopSettingInfo.name}}</span>
            </div>
        </div>
        <div class="stack-wrapper">
            <div
                class="switchBtn_wrapper"
                @click="switchMakeFriModal"
            >
                <div class="imgBox">
                    <img
                        onclick="return false"
                        class="soulIcon"
                        src="../../assets/image/soulIcon.png"
                        alt
                    />
                    <span class="dot left"></span>
                    <span class="dot right"></span>
                </div>
                <p class="soulText">{{modalSwitch?"自己找":"有缘人"}}</p>
                <p
                    class="intro_soulText"
                    v-show="isFirstLoad"
                >一键找到你的有缘人</p>
                <p
                    class="intro_picAndComment"
                    v-show="isFirstLoad"
                >照片及评价</p>
            </div>
            <!-- isFirstLoad -->
            <div v-if="isFirstLoad">
                <p class="intro_mfTips">绿灯在线，红灯离线</p>
                <img
                    src="../../assets/image/arrow left.png"
                    alt
                    class="arrow_left"
                />
                <img
                    src="../../assets/image/Arrow Right.png"
                    alt
                    class="arrow_right"
                />
                <p class="arrow_desc">左划换人，右划喜欢</p>
            </div>
            <stack
                ref="stack"
                :pages="someList"
                :visible="visible"
                :currentIndex="currentPage"
                :resultSoulText="soulText"
                :searchResult="isEndResultSearchBtnBox"
                :stopSearch="searching"
                :positionList="positionList"
                @getMoreFriend="sonGetMoreFriend"
                @showIntroduce="showIntroduce"
                @heartBeat="thumbHeartBeat"
                @showAblum="showAblum"
                @firstData="listenFirstdata"
            >暂时没有好友</stack>
            <div
                class="loading-container"
                v-show="!someList.length"
            >
                <loading></loading>
            </div>
        </div>
        <div class="control_wrapper">
            <div
                class="soulBtns_wrapper"
                v-show="isEndResultSearchBtnBox"
            >
                <button
                    class="btn"
                    @click="cancleSoulSearch"
                >退出</button>
                <button
                    class="btn"
                    @click="intoSetting"
                >去完善</button>
            </div>
            <div
                class="btns_wrapper"
                v-show="!soulSwitch"
            >
                <div
                    class="gifts"
                    @click="isFirstLoad=false"
                >
                    <img
                        onclick="return false"
                        src="../../assets/image/gift.png"
                        @click="isGiftPanel=true"
                        alt
                    />
                    <img
                        onclick="return false"
                        src="../../assets/image/gift.png"
                        v-show="isFirstLoad"
                        class="guideGift"
                        alt
                    />
                    <p
                        class="handleText"
                        v-show="isFirstLoad"
                    >送礼成好友</p>
                    <!-- <p>见面礼</p> -->
                </div>
                <!--  -->
                <div
                    class="thumbs"
                    v-if="!isFriend"
                    @click="isFirstLoad=false"
                >
                    <img
                        onclick="return false"
                        ref="thumbHeartBeat"
                        src="../../assets/image/thumbs-o-up.png"
                        @click="giveThumb('middle')"
                        alt
                    />
                    <img
                        onclick="return false"
                        src="../../assets/image/thumbs-o-up.png"
                        v-show="isFirstLoad"
                        class="guideThumbs"
                        alt
                    />
                    <p
                        class="handleText"
                        v-show="isFirstLoad"
                    >互赞成好友</p>
                </div>
                <div
                    class="hello"
                    v-else
                    @click="isFirstLoad=false"
                >
                    <img
                        onclick="return false"
                        src="../../assets/image/sayhi.png"
                        @click="chat"
                        alt
                    />
                    <img
                        onclick="return false"
                        src="../../assets/image/thumbs-o-up.png"
                        v-show="isFirstLoad"
                        class="guideThumbs"
                        alt
                    />
                    <p
                        class="handleText"
                        v-show="isFirstLoad"
                    >互赞成好友</p>
                </div>
                <div
                    class="playGame"
                    @click="isFirstLoad=false"
                >
                    <img
                        onclick="return false"
                        src="../../assets/image/game.png"
                        @click="playGame"
                        alt
                    />
                    <img
                        onclick="return false"
                        src="../../assets/image/game.png"
                        v-show="isFirstLoad"
                        class="guidePlayGame"
                        alt
                    />
                    <p
                        class="handleText"
                        v-show="isFirstLoad"
                    >约战大话骰</p>
                    <!-- <p>玩一把</p> -->
                </div>
            </div>
        </div>
        <!-- 筛选好友信息 -->
        <div v-transfer-dom>
            <x-dialog
                v-model="showToast"
                class="dialog-demo"
            >
                <div class="select_wrapper">
                    <img
                        onclick="return false"
                        src="../../assets/image/close.png"
                        alt
                        class="close"
                        @click="cancel"
                    />
                    <p class="select_title">条件筛选</p>
                    <div class="sex_wrapper">
                        <h3>性别:</h3>
                        <ul class="sex_list">
                            <li
                                @click="chooseSex(item.id)"
                                :class="{active:sexType == item.id}"
                                v-for="(item,index) in sexArr"
                                :key="index"
                            >
                                <span>{{item.name}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="dis_wrapper">
                        <h3>范围:</h3>
                        <ul class="dis_list">
                            <li
                                style="margin-left:.09rem"
                                @click="chooseRange(item.id)"
                                :class="{active:rangeType == index}"
                                v-for="(item,index) in rangeArr"
                                :key="index"
                            >{{item.name}}</li>
                        </ul>
                    </div>
                    <!-- <div class="dis_wrapper">
                        <h3>等级:</h3>
                        <ul class="dis_list">
                            <li
                                @click="chooseDegree(item.id,index)"
                                :class="{active:currentSortIndex == index}"
                                v-for="(item,index) in rankList"
                                :key="index"
                            >{{item.name}}</li>
                        </ul>
                    </div>-->
                    <div class="dis_wrapper">
                        <h3>籍贯</h3>
                        <ul class="dis_list">
                            <li
                                @click="chooseHomeTownType(index)"
                                :class="{active:homeTownType == index}"
                                v-for="(item,index) in homeTownList"
                                :key="index"
                                v-if="homeTownType!=2"
                            >{{item.name}}</li>
                            <li
                                style="width:300px;background:#fff;"
                                v-if="homeTownType===2"
                            >
                                <el-cascader
                                    v-if="homeTownType===2"
                                    size="small"
                                    :options="options"
                                    v-model="selectedHomeTownOptions"
                                    @change="handleChangeHomeTown"
                                ></el-cascader>
                            </li>
                        </ul>
                    </div>
                    <div class="dis_wrapper">
                        <h3>行业</h3>
                        <ul class="dis_list">
                            <li
                                @click="chooseIndustry(index)"
                                :class="{active:industryType == index}"
                                v-for="(item,index) in industryList"
                                :key="index"
                            >{{item.name}}</li>
                        </ul>
                    </div>
                    <div class="dis_wrapper">
                        <h3>关键字</h3>
                        <ul class="dis_list">
                            <li><input
                                    type="text"
                                    class="keywords"
                                    placeholder="请输入昵称或个性标签"
                                    v-model="keyword"
                                ></li>
                        </ul>
                    </div>
                    <p
                        class="confirm"
                        @click="getSortedFriend"
                    >确定</p>
                </div>
            </x-dialog>
        </div>
        <!-- 引导背景 v-show="userInfo.firstLoadisFirstLoad"   isFirstLoad-->
        <div
            class="guide_bg"
            v-show="isFirstLoad"
        >
            <p class="flower">分享好友获小红花，提升排名</p>
            <p
                class="know"
                @click="isFirstLoad=false"
            >知道了</p>
            <p class="intro">设置个人资料</p>
        </div>
        <!-- 分享引导 -->
        <div
            class="bg"
            v-if="isShow_bg"
            @click="share"
        >
            <img
                onclick="return false"
                src="../../assets/image/share.png"
                alt
            />
            <p class="shareText">引荐小红花说明</p>
            <p
                class="shareText"
                style="top: 3.8rem;"
            >分享好友，引荐1位朋友加入社群</p>
            <p
                class="shareText"
                style="top: 4.8rem;"
            >获得一朵小红花，红花越多排名越靠前</p>
        </div>
        <keep-alive>
            <topUp
                v-show="isGiftPanel"
                @closeIntegralPanel="closeIntegralPanel"
                :isInDoor="isInDoor"
                :friendId="friendId"
                :fatherPanelIndex="fatherPanelIndex"
            ></topUp>
        </keep-alive>
        <qrCode
            v-show="qrIsShow"
            title="您还不是会员,关注享有会员特权"
        ></qrCode>
        <transition name="appear">
            <envelope
                v-show="isShowEnvelope"
                :text="envelopeText"
            ></envelope>
        </transition>
        <keep-alive>
            <lifePhote
                v-show="showAblumFlag"
                @closeAlbum="closeAlbum"
            ></lifePhote>
        </keep-alive>
        <popup-picker
            v-if="showPopupPickerPos"
            :show="showPopupPickerPos"
            :data="positionList"
            v-model="positionArr"
            @on-hide="onHide_P"
            @on-change="onChange_P"
        ></popup-picker>
        <router-view></router-view>
    </div>
</template>

<script>
import {
    provinceAndCityData,
    CodeToText,
    TextToCode,
} from "element-china-area-data";
import stack from "./tantan/tantan.vue";
import loading from "../../base/loading/loading";
import envelope from "base/envelope/envelope";
import topUp from "base/topUp/topUp";
import qrCode from "base/qrCode/qrCode";
import util from "common/util";
import api from "common/api";
import Bus from "common/bus.js";
import lifePhote from "./personalInfo/personalInfo";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import {
    Toast,
    TransferDom,
    Popup,
    XDialog,
    XButton,
    Scroller,
    PopupPicker,
} from "vux";
export default {
    // el: "#stack",
    directives: {
        TransferDom,
    },
    data() {
        return {
            keyword: "",
            showPopupPickerPos: false, // 职位picker
            options: provinceAndCityData,
            selectedHomeTownOptions: [],
            isShow_bg: false,
            searching: false,
            soulText: `<span style="display:inline-block;margin-top:.6rem">正在地球的每一个角落</span><br>寻找你的有缘人`,
            showAblumFlag: false, //展示生活照
            sexType: 0, //性别类型
            rangeType: 0, //店内外类型
            homeTownType: 0, //同乡，
            industryType: 0, //同行查看
            fatherPanelIndex: 1,
            showToast_gift: false,
            envelopeText: "",
            isFriend: null,
            isShowEnvelope: false,
            showToast: false,
            isFirstLoad: false,
            isGiftPanel: false, //礼物面板状态
            isInDoor: false, //好友是否在线
            homeTownList: [
                {
                    id: 0,
                    name: "全部",
                },
                {
                    id: 1,
                    name: "同乡",
                },
                {
                    id: 2,
                    name: "其他地区",
                },
            ],
            industryList: [
                {
                    id: 0,
                    name: "全部",
                },
                {
                    id: 1,
                    name: "同行",
                },
                {
                    id: 2,
                    name: "其他行业",
                },
            ],
            sexArr: [
                {
                    id: 0,
                    name: "全部",
                },
                {
                    id: 1,
                    name: "男",
                },
                {
                    id: 2,
                    name: "女",
                },
            ],
            rangeArr: [
                {
                    id: 0,
                    name: "全部",
                },
                {
                    id: 1,
                    name: "店内",
                },
                {
                    id: 2,
                    name: "店外",
                },
                {
                    id: 3,
                    name: "店员",
                },
            ],
            positionList: [
                [
                    "自由职业",
                    "全职在家",
                    "贸易/商业",
                    "生产/制造",
                    "房地产/建筑",
                    "银行/金融",
                    "IT/互联网",
                    "电子商务",
                    "通信电子",
                    "政府机关",
                    "文化/艺术",
                    "医疗/健康",
                    "传媒影视",
                    "设计/创意",
                    "娱乐/休闲",
                    "美容/保健",
                    "零售/商场",
                    "健身/体育",
                    "学生",
                    "其他",
                ],
            ],
            // rankList: [
            //     {
            //         id: 1,
            //         name: "财富榜"
            //     },
            //     {
            //         id: 2,
            //         name: "战神榜"
            //     },
            //     {
            //         id: 3,
            //         name: "好友数"
            //     }
            // ],
            someList: [],
            friendId: "",
            visible: 3,
            currentPage: 0,
            modalSwitch: false,
            isEndResultSearchBtnBox: false,
            soulTimer: null,
            hometownCode: "",
            industryCode: "",
            positionArr: ["自由职业"],
        };
    },
    computed: {
        ...mapState([
            "l98Setting",
            "lifeImgList",
            "shopSettingInfo",
            "friendList",
            "inAndOutFriendCursor",
            "friendListCursor",
            "giftList",
            "userInfo",
            "loadFriendSexType",
            "staticChatFriendObj",
            "focusThumbTimes",
            "unfocusThumbTimes",
            "focusPlayTimes",
            "unfocusPlayTimes",
            "soulSwitch",
            "shareUrl",
            "soulCursor",
            "soulResult",
        ]),
        ...mapGetters(["qrIsShow"]),
    },
    created() {
        this._getUserInfo().then((res) => {
            console.log("res---", res);
            let param = {
                cursor: 0,
                sex: res.sex === "男" ? 2 : 1,
                range: this.rangeType,
                hometowncode: "",
                industry: "",
                keyword: "",
            };
            this.getAllCommunityFriend(param);
        });
        let isFriActCoupon = util.GetQueryString("friendCoupon");
        if (isFriActCoupon) {
            this.acquireWaitGetCoupons();
        }
        setTimeout(() => {
            let shareObj = {
                title: "找朋友",
                desc: "您有N个好友在这儿玩! 方圆五公里的帅哥美女集结地→",
                link: `${this.shareUrl}k98/friend?visitType=3&phone=${this.userInfo.phone}&role=${this.userInfo.role}&openId=${this.userInfo.openid}`,
                imgUrl: `${this.shopSettingInfo.image}`,
            };
            util.setShareInfo(shareObj, 20, "activity", this.shareGetJifen);
        }, 1500);
    },
    mounted() {
        util.addVisitRecord(this.$route.name);
        console.log("this.loadFriendSexType----", this.loadFriendSexType);

        if (this.userInfo.sex === "男") {
            this.sexType = 0;
        } else {
            this.sexType = 1;
        }
        console.log("this.userInfo---", this.userInfo);
        if (this.userInfo.firstLoad) {
            this.isFirstLoad = true;
        } else {
            this.isFirstLoad = false;
        }
        this._clearFirstLoadTag(); //标识已经进入过公众号
        this._loadAllGift();
    },
    activated() {
        if (this.$route.params.data == "sharefriPage") {
            this.isShow_bg = true;
        }
        (this.soulText = `<span style="display:inline-block;margin-top:.6rem">正在地球的每一个角落</span><br>寻找你的有缘人`),
            Bus.$on("changeFriendConnetion", (openid) => {
                //console.log("bus-openid---------", openid);
                this.isFriend = true;
                this.changeFriIcon(openid);
            });
    },
    deactivated() {
        this.modalSwitch = false;
        this.switchSoulModal(this.modalSwitch);
        this.isEndResultSearchBtnBox = false;
        this.searching = false;
        this.soulText = "";
        clearTimeout(this.soulTimer);
    },
    methods: {
        showIntroduce() {
            this.isShow_bg = true;
        },
        //分享获得积分
        shareGetJifen(amount, shareType) {
            api.shareToGetIntegral(amount, shareType).then((res) => {
                if (res.errCode == 1030) {
                    alert("分享已上限，每天最多分享5次获得积分");
                }
            });
        },
        //职位选择
        onHide_P() {
            this.showPopupPickerPos = false;
        },
        onChange_P(val) {
            console.log("val---", this.positionList[0].indexOf(val[0]));
            this.industryCode = String(this.positionList[0].indexOf(val[0]));
        },
        handleChangeHomeTown(value) {
            // this.homeTown = CodeToText[value[0]] + CodeToText[value[1]];
            this.hometownCode = value[1];
            console.log("this.hometownCode---", this.hometownCode);
        },
        // 性别选择
        chooseSex(id) {
            this.sexType = id;
        },
        chooseRange(index) {
            this.rangeType = index;
        },
        // chooseDegree(id, index) {
        //     this.currentSortIndex = index;
        // },
        chooseHomeTownType(index) {
            if (index === 1) {
                this.hometownCode = this.userInfo.hometownCode;
            } else if (index === 0) {
                this.hometownCode = "";
            }
            this.homeTownType = index;
        },
        chooseIndustry(index) {
            if (index === 2) {
                this.showPopupPickerPos = true;
            } else if (index === 1) {
                this.industryCode = this.userInfo.industry;
            } else {
                this.industryCode = "";
            }
            this.industryType = index;
        },
        getSortedFriend() {
            this.changeFriendCursor(0);
            this.currentPage++;
            this.visible = 3;
            let params = {
                cursor: 0,
                sex: this.sexType,
                range: this.rangeType,
                hometowncode: this.hometownCode,
                industry: this.industryCode,
                keyword: this.keyword,
            };
            api.getFriendList(params).then((res) => {
                if (res.info.candidates.length === 0) {
                    this.$vux.toast.text(
                        "对不起，找不到同时符合所有条件的朋友。您可减少条件限制",
                        "middle"
                    );
                    this.homeTownType = 0;
                    this.keyword = "";
                    this.industryCode = "";
                    return;
                }
                this.changeFriendCursor(res.info.cursor);
                this.getFriend(res.info);
                this.showToast = false;
            });
        },
        acquireWaitGetCoupons() {
            let condition = 1; //访问朋友页有礼
            api.acquireWaitGetCoupons(condition)
                .then((res) => {
                    console.log(
                        "访问朋友页------------------------------",
                        res
                    );
                    if (!res.coupon) {
                        return;
                    }
                    let result = {
                        msgCode: 4,
                        content: {
                            extMsg: {},
                            fromInfo: {
                                openid: "",
                                headimgurl:
                                    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966911743&di=b3b81acff7cdc59f21ec7cbde8b13298&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110928%2F0017030291764688_b.jpg",
                            },
                        },
                    };
                    this.addFriendEvtObj(result);
                    this.judgeMessType("discount");
                })
                .catch((err) => {
                    //console.log(err);
                });
        },
        //隐藏分享引导
        share() {
            this.isShow_bg = false;
        },
        //退出灵魂匹配
        cancleSoulSearch() {
            this.modalSwitch = false;
            this.switchSoulModal(this.modalSwitch);
            this.isEndResultSearchBtnBox = false;
            this.searching = false;
            // this.soulText = `正在地球的每一个角落<br>寻找你的灵魂玩伴`
            this.soulText = `<span style="display:inline-block;margin-top:.6rem">正在地球的每一个角落</span><br>寻找你的有缘人`;
        },
        //切换交友模式
        switchMakeFriModal() {
            this.modalSwitch = !this.modalSwitch;
            this.switchSoulModal(this.modalSwitch);
            if (this.modalSwitch) {
                console.log("this.soulCursor----", this.soulCursor);
                api.searchWaitBeMakeFriUser(this.soulCursor).then((res) => {
                    console.log("搜索结果----------", res);
                    if (res.errCode === 0) {
                        this.updateSoulParams({
                            cursor: res.cursor,
                            flag: false,
                        });
                    }
                });
            }
            if (!this.modalSwitch) {
                clearTimeout(this.soulTimer);
                this.isEndResultSearchBtnBox = false;
                this.soulText = `<span style="display:inline-block;margin-top:.6rem">正在地球的每一个角落</span><br>寻找你的有缘人`;
                return;
            }
            this.soulTimer = setTimeout(() => {
                this.soulText =
                    "对不起<br>找不到和您匹配度>60%的有缘人<br>请完善个人资料,以便精准匹配";
                this.isEndResultSearchBtnBox = true;
                this.searching = true;
                // this.updateSoulParams(0,true)
            }, 15000);
        },
        //拉取候选人
        getAllCommunityFriend(params) {
            api.getFriendList(params).then((res) => {
                console.log("拉取候选人：·····················", res);
                this.changeFriendCursor(res.info.cursor);
                this.getFriend(res.info);
            });
        },
        //监听礼物面板状态
        closeGiftPanel(flag) {
            this.isGiftPanel = flag;
        },
        //监听充值面板状态
        closeIntegralPanel(flag) {
            this.isGiftPanel = flag;
        },
        //标识进入过公众号
        _clearFirstLoadTag() {
            if (!this.userInfo.firstLoad) {
                return;
            }
            api.clearFirstLoadTag().then((res) => {
                this._getUserInfo();
            });
        },
        // 获取用户信息
        _getUserInfo() {
            return new Promise((resolve, reject) => {
                api.getUserInfo()
                    .then((res) => {
                        this.getuserInfo(res);
                        resolve(res);
                    })
                    .catch((err) => {
                        //console.log(err);
                    });
            });
        },
        //进入个人信息设置页面
        intoSetting() {
            this.$router.push({
                name: "individual",
            });
        },
        //拉取礼物
        _loadAllGift() {
            api.loadAllGift().then((res) => {
                if (res.errCode === 0) {
                    this.getGiftList(res.gifts);
                }
            });
        },
        //监听关闭相册
        closeAlbum(flag) {
            //console.log(flag);
            this.showAblumFlag = flag;
        },
        // 监听点击相册
        showAblum(data) {
            // //console.log('监听点击相册------------------------------：', data);
            this.showAblumFlag = true;
            this.changeUserLifeImgList(data.info.lifePhoto.lifePhotos);
            this.$router.push({
                path: `/friend/${data.info.openid}`,
            });
        },
        listenFirstdata(data) {
            // 下面是传回父级的数据;
            // this.friendOnlineStatus = data.info.onlineL98Server; //好友在线状态
            console.log("滑动页面传回给父级数据：", data);
            let openId = data.info.openid;
            this.friendId = openId;
            sessionStorage.setItem("staffCouponToId", openId);
            // this.setChatFriend(data);
            this.friendInfo = data;
            if (this.l98Setting.friConverOpen || this.userInfo.role != "") {
                //开启开关，所有游客都可以和员工直接对话
                this.isFriend = true;
            } else {
                if (this.friendInfo.info.role != "") {
                    this.isFriend = true;
                } else {
                    this.isFriend = data.isAlreadyFriend;
                }
            }
            this.xid = openId;
            this.isInDoor = data.isInDoor;
        },
        //监听右滑心跳
        thumbHeartBeat(data) {
            //console.log("heartBeat--------------", data);
            this.$refs.thumbHeartBeat.className = "heartBeat";
            setTimeout(() => {
                this.$refs.thumbHeartBeat.className = "";
            }, 500);
        },
        //获取更多朋友
        sonGetMoreFriend() {
            //console.log("触发获取更多的朋友");
            this.getMoreFriendList(
                this.friendListCursor,
                this.loadFriendSexType
            );
        },
        getMoreFriendList(cursor, sex) {
            let params = {
                cursor: this.friendListCursor,
                sex: this.sexType,
                range: this.rangeType,
                hometowncode: this.homeTownCode,
                industry: this.industryCode,
                keyword: this.keyword,
            };
            api.getFriendList(params).then((res) => {
                if (res.info.cursor == 0) {
                    this.changeFriendCursor(res.info.cursor);
                    return false;
                }
                this.changeFriendCursor(res.info.cursor);
                this.MutationGetMoreFriendList(res.info.candidates);
            });
        },
        //点赞
        giveThumb(position) {
            //每天限制30次
            //从本地缓存读取当日约战点赞次数，数据格式 {unfocusThumbTimes:0,focusThumbLimitTimes:0,unfocusPlayTimes:0,focusPlayTimes:0,date:new Date().getDate()}
            let thumbTimes = localStorage.getItem("thumbTimes")
                ? localStorage.getItem("thumbTimes")
                : {
                      unfocusThumbTimes: this.unfocusThumbTimes,
                      focusThumbTimes: this.focusThumbTimes,
                      date: new Date().getDate(),
                  };
            let todayDate = new Date().getDate();
            if (typeof thumbTimes === "string") {
                thumbTimes = JSON.parse(thumbTimes);
            }
            //console.log("thumbTimes---------", thumbTimes);
            // 判断未关注用户今天点赞次数是否达到10次，达到10次弹框提醒关注
            if (!this.userInfo.isSubscribe) {
                //判断是否关注公众号
                this.changeUnfocusThumbTimes(-1);
                if (
                    thumbTimes.date == todayDate &&
                    Number(thumbTimes.unfocusThumbTimes) < 1
                ) {
                    // 当未关注用户点赞次数达到10次，存入缓存
                    thumbTimes["date"] = new Date().getDate();
                    let unfocusThumbNum = Number(thumbTimes.unfocusThumbTimes);
                    unfocusThumbNum--;
                    thumbTimes["unfocusThumbTimes"] = unfocusThumbNum;
                    localStorage.setItem(
                        "thumbTimes",
                        JSON.stringify(thumbTimes)
                    );
                    this.changeQrCodeText({
                        title: "游客仅限10次交友机会，长按关注获取更多特权",
                        bottomText: "会员特权:领福利、交群友、参活动",
                    });
                    this.showQrcode(true);
                    return;
                } else {
                    thumbTimes["date"] = new Date().getDate();
                    thumbTimes["unfocusThumbTimes"] = this.unfocusThumbTimes;
                    localStorage.setItem(
                        "thumbTimes",
                        JSON.stringify(thumbTimes)
                    );
                }
            } else {
                this.changeFocusThumbTimes(-1);
                // 当已关注用户点赞次数达到30次，存入缓存
                // 判断已关注用户今天点赞此时是否达到30，达到30次弹框提醒今日点赞次数已用完
                if (
                    thumbTimes.date == todayDate &&
                    Number(thumbTimes.focusThumbTimes) < 1
                ) {
                    //console.log("进来了");
                    thumbTimes["date"] = new Date().getDate();
                    let focusThumbNum = Number(thumbTimes.focusThumbTimes);
                    focusThumbNum--;
                    thumbTimes["focusThumbTimes"] = focusThumbNum;
                    localStorage.setItem(
                        "thumbTimes",
                        JSON.stringify(thumbTimes)
                    );
                    this.$vux.toast.text(
                        "每天限30次点赞交友机会。当天已用完，明天再来",
                        "middle"
                    );
                    return;
                } else {
                    thumbTimes["date"] = new Date().getDate();
                    thumbTimes["focusThumbTimes"] = this.focusThumbTimes;
                    localStorage.setItem(
                        "thumbTimes",
                        JSON.stringify(thumbTimes)
                    );
                }
            }
            api.makeFriend(this.xid).then((res) => {
                //console.log("giveThumb----", res);
                if (res.errCode === 0) {
                    this.isShowEnvelope = true;
                    this.envelopeText = "飞奔个赞过去,等待对方回赞成为好友";
                    setTimeout(() => {
                        this.isShowEnvelope = false;
                    }, 2000);
                } else if (res.errCode === 1023) {
                    // this.showQrcode(true);
                } else {
                    this.isShowEnvelope = true;
                    this.envelopeText = "您已点赞了哦,等待对方回赞成为好友";
                    setTimeout(() => {
                        this.isShowEnvelope = false;
                    }, 2000);
                }
            });
        },
        //关闭礼物
        close_gift() {
            this.showToast_gift = false;
        },
        //发起聊天
        chat() {
            // util.routerTo("chat", this);
            //console.log("jinrula");
            this.setChatFriend(this.friendInfo);
            this.$router.push({
                name: "chat",
                params: {
                    isClient: false,
                    id: this.staticChatFriendObj.openid
                        ? this.staticChatFriendObj.openid
                        : item.phone,
                },
            });
            api.beFriend(this.staticChatFriendObj.openid).then((res) => {
                console.log("成为好友结果---", res);
            });
            // //console.log()
            // this.$router.push({
            //   path: `/message/${this.friendId}`,
            //   query: this.friendInfo
            // });
        },
        //玩游戏
        playGame() {
            if (this.friendInfo.info.isBattle) {
                //群友挂免战功能，不能邀约战
                this.$vux.toast.text("已挂免战牌,暂不接受群友挑战", "middle");
                return;
            }
            let playTimes = localStorage.getItem("playTimes")
                ? localStorage.getItem("playTimes")
                : {
                      unfocusPlayTimes: this.unfocusPlayTimes,
                      focusPlayTimes: this.focusPlayTimes,
                      date: new Date().getDate(),
                  };
            let todayDate = new Date().getDate();
            if (typeof playTimes === "string") {
                playTimes = JSON.parse(playTimes);
            }
            //console.log("playTimes---------", playTimes);
            // 判断未关注用户今天点赞次数是否达到10次，达到10次弹框提醒关注
            if (!this.userInfo.isSubscribe) {
                //判断是否关注公众号
                this.changeUnFocusPlayTimes(-1);
                if (
                    playTimes.date == todayDate &&
                    Number(playTimes.unfocusPlayTimes) < 1
                ) {
                    // 当未关注用户点赞次数达到10次，存入缓存
                    playTimes["date"] = new Date().getDate();
                    let unFoucusplayNum = Number(playTimes.unfocusPlayTimes);
                    unFoucusplayNum--;
                    playTimes["unfocusPlayTimes"] = unFoucusplayNum;
                    localStorage.setItem(
                        "playTimes",
                        JSON.stringify(playTimes)
                    );
                    this.changeQrCodeText({
                        title: "游客仅限10次挑战群友机会，长按关注获取更多特权",
                        bottomText: "会员特权:领福利、交群友、参活动",
                    });
                    this.showQrcode(true);
                    return;
                } else {
                    playTimes["date"] = new Date().getDate();
                    playTimes["unfocusPlayTimes"] = this.unfocusPlayTimes;
                    localStorage.setItem(
                        "playTimes",
                        JSON.stringify(playTimes)
                    );
                }
            } else {
                this.changeFocusPlayTimes(-1);
                // 当已关注用户点赞次数达到30次，存入缓存
                // 判断已关注用户今天点赞此时是否达到30，达到30次弹框提醒今日点赞次数已用完
                if (
                    playTimes.date == todayDate &&
                    Number(playTimes.focusPlayTimes) < 1
                ) {
                    //console.log("进来了");
                    playTimes["date"] = new Date().getDate();
                    let focusPlayTimes = Number(playTimes.focusPlayTimes);
                    focusPlayTimes--;
                    playTimes["focusPlayTimes"] = focusPlayTimes;
                    localStorage.setItem(
                        "playTimes",
                        JSON.stringify(playTimes)
                    );
                    this.$vux.toast.text(
                        "每天限30次约战机会。当天已用完，明天再来",
                        "middle"
                    );
                    return;
                } else {
                    playTimes["date"] = new Date().getDate();
                    playTimes["focusPlayTimes"] = this.focusPlayTimes;
                    localStorage.setItem(
                        "playTimes",
                        JSON.stringify(playTimes)
                    );
                }
            }
            api.sentPlayGameMsg(this.friendId).then((res) => {
                //console.log("约战返回--------", res);
                if (res.errCode == 0) {
                    // this.text = "您已发出邀请  等待对方的回应";
                    this.isShowEnvelope = true;
                    this.envelopeText = "您已发出邀请  等待对方的回应";
                    setTimeout(() => {
                        this.isShowEnvelope = false;
                    }, 2000);
                } else if (res.errCode == 1023) {
                } else if (res.errCode == 1022) {
                    this.isShowEnvelope = true;
                    this.envelopeText = "该用户己离线，无法通知";
                    setTimeout(() => {
                        this.isShowEnvelope = false;
                    }, 2000);
                    return;
                } else if (res.errCode == 1089) {
                    //  this.$vux.toast.text('每天限20次约战机会。当天已用完，明天再来', 'middle')
                }
            });
        },
        cancel() {
            this.homeTownType = 0;
            this.showPopupPickerPos = false;
            this.selectedHomeTownOptions = [];
            this.showToast = false;
        },
        ...mapActions({
            // getFriendList: "get_Friendlist", //获取候选人
            // getMoreFriendList: "get_moreFriendList" //获取更多候选人
        }),
        ...mapMutations({
            changeUnFocusPlayTimes: "CHANGEUNFOCUSPLAYTIMES", //未关注用户约战次数
            changeFocusPlayTimes: "CHANGEFOCUSPLAYTIMES", //关注用户约战次数
            changeUnfocusThumbTimes: "CHANGEUNFOCUSTHUMBTIMES", //未关注用户点赞次数
            changeFocusThumbTimes: "CHANGEFOCUSTHUMBTIMES", //关注用户点赞次数
            changeFriIcon: "CHANGEFRIENDICON", //回赞后更改好友页面图标
            changeSexType: "CHANGESEXTYPE", //改变拉取候选人性别参数
            MutationGetMoreFriendList: "GET_MOREFRIENDlIST", //获取更多候选人
            getLessThan10friendList: "GET_LESSTHAN10FRIENDLIST", //获取少于10个候选人
            changeFriendCursor: "CHANGE_FRIENDlISTCURSOR", //改变游标
            changeQrCodeText: "CHANGEQRCODETEXT",
            showQrcode: "SHOW_QRCODE", //展示二维码
            setChatFriend: "SET_CHAT_FRIEND",
            getuserInfo: "GET_USERINFO", //获取用户信息
            getFriend: "GET_FRIENDlIST", //获取候选好友
            updateFriendCursor: "UPDATE_INANDOUT_FRIEND_CURSOR", //更新场内场外游标
            changeUserLifeImgList: "GET_LIFEIMG", //更改用户生活照
            getGiftList: "GET_GIFTLIST", //获取礼物
            switchSoulModal: "SWITCHSOULFLAG", //切换灵魂匹配模式
            updateSoulParams: "UPDATESOULPARAMS", //更新灵魂匹配参数
            addFriendEvtObj: "UPDATE_DYNAMICMESSAGE", //更新好友事件提示框
            judgeMessType: "JUDGE_MESSTYPE", //判断消息类型
        }),
    },
    watch: {
        friendList(newValue) {
            this.someList = newValue;
        },
    },
    components: {
        stack,
        Popup,
        Toast,
        XDialog,
        XButton,
        Scroller,
        loading,
        envelope,
        qrCode,
        topUp,
        lifePhote,
        PopupPicker,
    },
};
</script>

<style scoped lang="less">
@import "../../assets/less/variable.less";
@import "../../assets/less/friend_common.less";
@import "../../assets/less/mixin.less";
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
.friend {
    height: 100%;
    background-color: #fff;
    background-image: url("../../assets/image/friend_bg.png");
    background-repeat: no-repeat;
    background-size: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-sizing: border-box;
    .nav {
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;
        align-items: center;
        padding: 0 0.3rem;
        box-sizing: border-box;
        position: relative;
        margin-top: -0.5rem;
        .select {
            font-size: 13px;
            color: #ff7900;
            font-weight: 700;
        }
        .shopInfo {
            display: flex;
            height: 0.5rem;
            background-color: rgba(0, 0, 0, 0.2);
            line-height: 0.5rem;
            margin-top: 0.3rem;
            border-radius: 10px;
            padding: 0 0.1rem;
            .logo {
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 50%;
            }
            .name {
                margin-left: 4px;
                color: #fff;
            }
        }
        img {
            width: 0.6667rem;
            height: 0.6667rem;
        }
    }
    .control_wrapper {
        height: 2.5rem;
        @keyframes bigAndSmall {
            0% {
                transform: scale(1); //  opacity: 1;
            }
            50% {
                transform: scale(1.6);
            }
            100% {
                transform: rotate(1);
            }
        }
        .soulBtns_wrapper {
            display: flex;
            justify-content: space-between;
            padding: 0 1.6rem; // margin-top: -0.2667rem;
            box-sizing: border-box;
            position: relative;
            margin-top: 0.9667rem;
            .btn {
                width: 2.6667rem;
                height: 1rem;
                line-height: 1rem;
                padding: 0.1067rem 0.1067rem;
                text-align: center;
                line-height: 0.5067rem;
                background: -webkit-linear-gradient(
                    left,
                    #fff800,
                    #fef200,
                    #fccc00,
                    #fbbc00
                );
                color: #1d1d1d;
                border-radius: 0.08rem;
                border: none;
                font-size: 16px;
                font-weight: 700;
            }
        }
        .btns_wrapper {
            display: flex;
            justify-content: space-between;
            padding: 0 1.6rem; // margin-top: -0.2667rem;
            box-sizing: border-box;
            position: relative;
        }
        .control_guide {
            position: absolute;
            z-index: 9;
            color: #fff;
            font-size: 0.4rem;
            margin: 0 auto;
            bottom: 2.8333rem;
            text-align: center;
        }
        img {
            width: 1.6rem;
            height: 1.6rem;
            // .thumbs{
            //   }
        }
        .heartBeat {
            animation: bigAndSmall 0.3s linear 1;
        }
        .thumbs {
            position: relative;
            .guideThumbs {
                position: absolute;
                z-index: 10;
                top: 0.8667rem;
                left: 0;
            }
            .handleText {
                position: absolute;
                z-index: 99999;
                color: #fff;
                font-weight: 600;
                font-size: 0.4rem;
                top: 0.2rem;
                left: -0.4rem;
                width: 2.3333rem;
            }
            .action();
        }
        .hello {
            position: relative;
            .handleText {
                position: absolute;
                z-index: 99999;
                color: #fff;
                font-weight: 600;
                font-size: 0.4rem;
                top: 0.2rem;
                left: -0.4rem;
                width: 2.3333rem;
            }
            .guideThumbs {
                position: absolute;
                z-index: 10;
                top: 0.8667rem;
                left: 0;
            }
            .action();
        }
        .gifts {
            position: relative;
            .guideGift {
                position: absolute;
                z-index: 10;
                top: 0.8667rem;
                left: 0;
            }
            .handleText {
                position: absolute;
                z-index: 99999;
                color: #fff;
                font-weight: 600;
                font-size: 0.4rem;
                top: 0.2rem;
                left: -0.4rem;
                width: 2.3333rem;
            }
            .action();
        }
        .playGame {
            position: relative;
            .handleText {
                position: absolute;
                z-index: 99999;
                color: #fff;
                font-weight: 600;
                font-size: 0.4rem;
                top: 0.2rem;
                left: -0.4rem;
                width: 2.3333rem;
            }
            .guidePlayGame {
                position: absolute;
                z-index: 10;
                top: 0.8667rem;
                left: 0;
            }
            .action();
        }
    }
    .stack-wrapper {
        margin: 0rem auto 0;
        // padding:0 0.5rem;
        position: relative;
        // z-index: 1000;
        width: 8.9rem;
        // width: 100%;
        height: 10.1rem;
        list-style: none;
        .switchBtn_wrapper {
            position: absolute;
            top: -1.3rem;
            left: 3.8rem;
            .intro_soulText,
            .intro_picAndComment {
                position: absolute;
                top: 0.7rem;
                left: 1.5rem;
                color: #fff;
                font-size: 0.3467rem;
                font-weight: 700;
                z-index: 99;
                width: 3.6667rem;
            }
            .intro_picAndComment {
                top: 2.5rem;
                left: 2.5rem;
            }
            .imgBox {
                .soulIcon {
                    margin-left: 0.1rem;
                    margin-bottom: -0.15rem;
                    width: 1.2533rem;
                    height: 0.8533rem;
                    position: relative;
                }
                .dot {
                    position: absolute;
                    top: 0.236rem;
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background-color: #fff;
                    // background:linear-gradient(top left,#fff,#317FBB) ;
                    animation: bling 1000ms linear infinite normal;
                }
                .left {
                    left: 0.4rem;
                }
                .right {
                    left: 0.9rem;
                }
            }
            @keyframes bling {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            .soulText {
                background-color: rgba(0, 0, 0, 0.2);
                color: #fff;
                text-align: center;
                padding: 0 0.08rem;
                font-size: 12px;
                border-radius: 5px;
                position: relative;
            }
        }
        @keyframes leftMove {
            0% {
                transform: translateX(5px);
                //  opacity: 1;
            }
            50% {
                transform: translateX(10px);
            }
            100% {
                transform: translateX(5px);
            }
        }
        @keyframes rightMove {
            0% {
                transform: translateX(-5px); //  opacity: 1;
            }
            50% {
                transform: translateX(-10px);
            }
            100% {
                transform: translateX(-5px);
            }
        }
        .arrow_desc {
            width: 100%;
            text-align: center;
            font-size: 0.45rem;
            font-weight: 900;
            position: absolute;
            top: 3.8rem;
            z-index: 99;
            color: #fff;
        }
        .arrow_left {
            position: absolute;
            z-index: 99;
            top: 3.5rem;
            left: -0.3rem;
            width: 1.3333rem;
            animation: leftMove 1s linear infinite;
        }
        .arrow_right {
            width: 1.3333rem;
            position: absolute;
            z-index: 99;
            top: 3.5rem;
            right: -0.3rem;
            animation: rightMove 1s linear infinite;
        }
        .intro_mfTips {
            position: absolute;
            top: 0.4667rem;
            left: 1.6rem;
            color: #fff;
            font-size: 0.4rem;
            font-weight: 700;
            z-index: 10;
        }
        .ablum-wrapper {
            position: absolute;
            top: 100px;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 999999;
            background-color: rgba(0, 0, 0, 0.3);
            width: 100%;
            height: 4rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .loading-container {
            position: absolute;
            width: 100%;
            top: 50%;
        }
    }
    .guide_bg {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 9;
        .know {
            position: absolute;
            display: inline-block;
            bottom: 36%;
            left: 50%;
            width: 2rem;
            text-align: center;
            margin-left: -1rem;
            color: red;
            font-size: 20px;
            border: 2px solid red;
        }
        .intro,
        .flower {
            width: 2.5rem;
            position: absolute;
            bottom: 1.4667rem;
            right: 0.1rem;
            color: #fff;
            font-size: 0.4rem;
            font-weight: 700;
        }
        .flower {
            width: 4rem;
            bottom: 8.5rem;
            font-size: 0.3rem;
        }
    }
}
//弹框选择
.select_wrapper {
    width: 8rem; // height: 8.1rem;
    padding-bottom: 0.1867rem;
    .bg("../../assets/image/bg.png");
    position: relative; // padding: 0.625rem;
    margin: auto;
    .close {
        position: absolute;
        right: 0.1333rem;
        top: 0.1333rem;
        width: 0.52rem;
        height: 0.52rem;
    }
    .select_title {
        color: #fff;
        font-size: 16px;
        // font-weight: bold;
        padding-top: 0.5067rem;
    }
    .sex_wrapper {
        margin-top: 1.3rem;
        h3 {
            text-align: left;
            font-size: 14px;
            font-weight: 600;
            color: #333;
            text-indent: 0.5333rem;
            font-family: Arial, Helvetica, sans-serif;
        }
        .sex_list {
            display: flex;
            justify-content: space-between;
            padding: 0.2133rem 0.625rem 0.1rem;
            li {
                width: 1.7067rem;
                height: 0.6667rem;
                line-height: 0.6667rem;
                border-radius: 0.08rem;
                background: #eee; // padding: 0.1875rem;
                font-size: 0.3467rem;
                &.active {
                    background-color: @baseColor;
                    color: #fff;
                }
            }
        }
    }
    .dis_wrapper {
        h3 {
            text-align: left;
            text-indent: 0.5333rem;
            font-size: 14px;
            font-weight: 600;
            color: #333;
            font-family: Arial, Helvetica, sans-serif;
        }
        .dis_list {
            display: flex;
            justify-content: space-between;
            padding: 0.1133rem 0.625rem 0.1rem;
            .keywords {
                height: 0.8rem;
                line-height: 0.8rem;
                padding-left: 0.1rem;
            }
            li {
                // margin-right: 0.625rem;
                width: 1.7067rem;
                height: 0.6667rem;
                line-height: 0.6667rem;
                border-radius: 0.08rem;
                background: #eee;
                font-size: 0.3467rem;
                &.active {
                    background-color: @baseColor;
                    color: #fff;
                }
            }
        }
    }
    .confirm {
        text-align: center;
        color: @baseColor;
        font-size: 0.4267rem;
        font-family: "PingFang-SC-Bold";
        padding: 0.3333rem 0;
    }
    .cancel_btn {
        margin-right: 0.875rem;
    }
    // 送礼弹框
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
                float: left;
                // margin-right: 1rem;
                width: 1.7067rem;
                height: 1.9467rem;
                box-sizing: border-box;
                text-align: center;
                img {
                    width: 1.1333rem;
                    height: 1.1333rem;
                    &.flower {
                        width: 1.0933rem;
                        height: 1.16rem;
                    }
                    &.house {
                        margin-top: 0.1667rem;
                        width: 0.96rem;
                        height: 0.8267rem;
                    }
                    &.car {
                        margin-top: 0.1167rem;
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
                .gift_name_houseAndCar {
                    margin-top: 0.2267rem;
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
</style>
