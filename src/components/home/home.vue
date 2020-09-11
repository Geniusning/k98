<template>
    <div id="home" class="home">
        <!-- <div class="guideBg" v-if="isFirstLoad" @click="isFirstLoad=false"></div> -->
        <div class="homeTop_wrapper">
            <div class="barLogo_wrapper">
                <div class="logo_wrapper">
                    <img onclick="return false" class="logo" :src="shopSettingInfo.image" alt />
                    <p class="bar_name">
                        <a style="color:#fff;" href="#homeShare">{{shopSettingInfo.name}}</a>
                    </p>
                </div>
            </div>
            <swiper
                :show-dots="false"
                :auto="false"
                class="slider"
                :loop="true"
                :list="demo01_list"
                v-model="demo01_index"
            ></swiper>
            <div class="shadowLeft"></div>
            <div class="shadowRight"></div>
        </div>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <div class="adr_wrapper">
                    <div class="adr clearfix" @click="getMapPosition">
                        <img
                            onclick="return false"
                            src="../../assets/image/position.png"
                            alt
                            class="position"
                        />
                        <p class="adr_desc">{{shopSettingInfo.address}}</p>
                    </div>
                    <div class="tel">
                        <a href="javascript:void(0);">
                            <img
                                onclick="return false"
                                src="../../assets/image/call.png"
                                alt
                                @click="callPhone"
                            />
                            <!-- <img onclick="return false" src="../../assets/image/avatar2.jpg" alt @click="callPhone"> -->
                        </a>
                    </div>
                </div>
                <!-- 交友游戏 -->
                <div class="entertainment_wrapper">
                    <div class="findFri_btn" @click="gotoFriend">
                        <img src="../../assets/image/findFri.png" alt />
                        <div class="desc_wrapper">
                            <div class="lineOne">
                                <ul class="fri_list" v-show="friendIconList1.length>=3">
                                    <li
                                        class="item"
                                        :class="'avar'+index"
                                        v-for="(item,index) in friendIconList1"
                                        :key="index"
                                    >
                                        <img
                                            onclick="return false"
                                            :src="item.headimgurl?item.headimgurl:defaultAvatarImg"
                                            class="min_avatar"
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div class="linetwo">
                                <ul class="fri_list">
                                    <li
                                        class="item"
                                        :class="'avar'+index"
                                        v-for="(item,index) in friendIconList2"
                                        :key="index"
                                    >
                                        <img
                                            onclick="return false"
                                            :src="item.headimgurl?item.headimgurl:defaultAvatarImg"
                                            class="min_avatar"
                                        />
                                    </li>
                                </ul>
                            </div>
                            <p
                                class="text"
                            >{{(outFriendNum+inFriendNum)>0?(outFriendNum+inFriendNum):1}}人在线,有你N个好友&gt;</p>
                        </div>
                    </div>
                    <div class="playGame_btn" @click="gotoPlay">
                        <img src="../../assets/image/playGame.png" alt />
                        <p class="text">挑战邻桌小妹/好友组局&gt;</p>
                    </div>
                </div>
                <!-- 望眼镜背景 -->
                <!-- <div class="telescope_wrapper">
                        <div v-show="isFirstLoad" @click="isFirstLoad=false">
                          <img onclick="return false" src="../../assets/image/finger.png" alt class="leftguideFinger" />
                          <p class="leftguideText">点击找朋友</p>
                        </div>
                        <div v-show="isFirstLoad" @click="isFirstLoad=false">
                          <img onclick="return false" src="../../assets/image/finger.png" alt class="rightguideFinger" />
                          <p class="rightguideText">去玩大话骰</p>
                        </div>
                        <img onclick="return false" src="../../assets/image/telescope_bg.png" alt class="telescope_img" />
                        <div class="left_radius_box" ref="leftRadiusBox" @click="gotoFriend">
                          <div class="onlineStatusPeople">{{(outFriendNum+inFriendNum)>0?(outFriendNum+inFriendNum):1}}人在线···</div>
                          <img onclick="return false" src="../../assets/image/findFriend (2).png" alt class="online_person" />
                          <div class="leftCircle" v-if="hiddenTelescope">
                            <div :class="{'leftCirclePart':!isIphoneX,'leftCirclePartIphoneX':isIphoneX}" ref="leftCirclePart"></div>
                            <div :class="{'rightCirclePart':!isIphoneX,'rightCirclePartIphoneX':isIphoneX}"></div>
                          </div>
                          <img onclick="return false" src="../../assets/image/findFriend.png" alt class="findFriend_text" v-if="hiddenTelescope" />
                          <div class="more">
                            <ul class="fri_list" v-show="friendIconList.length>3">
                              <li class="item" :class="'avar'+index" v-for="(item,index) in friendIconList" :key="index">
                                <img onclick="return false" :src="item.headimgurl?item.headimgurl:defaultAvatarImg" class="min_avatar" />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="right_radius_box" ref="rightRadiusBox" @click="gotoPlay">
                          <img onclick="return false" src="../../assets/image/intoPlay.png" alt class="online_player" />
                          <div class="rightCircle" v-if="hiddenTelescope">
                            <div :class="{'leftCirclePart':!isIphoneX,'leftCirclePartIphoneX':isIphoneX}"></div>
                            <div :class="{'rightCirclePart':!isIphoneX,'rightCirclePartIphoneX':isIphoneX}"></div>
                          </div>
                          <img onclick="return false" src="../../assets/image/dahuashai.png" alt class="dahuashai_text" v-if="hiddenTelescope" />
                        </div>
                </div>-->
                <!-- 福利 -->
                <div class="welfare_wrapper" v-show="recommentList.length">
                    <div class="title_content_wel">
                        <div class="title clearfix">
                            <img
                                onclick="return false"
                                src="../../assets/image/recomment.png"
                                alt
                                class="icon fl"
                            />
                            <h2 class="shop_title" @click="closeWebPage">店长推荐</h2>
                            <span class="desc">积分兑换更优惠</span>
                        </div>
                        <div class="more fr">
                            <img
                                onclick="return false"
                                src="../../assets/image/fuli.png"
                                alt
                                class="letter"
                                v-show="noCouponsFlag"
                                @click="toWelfare"
                            />
                        </div>
                    </div>
                    <!--<div class="advertise_wrapper" v-if="show_advertise">
                                  <img onclick="return false" src="../../assets/image/advertise.png" alt class="advertise" onclick="return false">
                                  <img onclick="return false" src="../../assets/image/close_ad.png" alt class="close" @click="close_adtise">
                    </div>-->
                    <div class="welfare_content" v-if="recommentList.length">
                        <ul class="welfare_list" v-if="recommentList.length">
                            <li
                                class="item clearfix"
                                v-for="(item,index) in recommentList"
                                :key="index"
                            >
                                <div class="left">
                                    <img
                                        onclick="return false"
                                        :src="item.goods.image"
                                        alt
                                        class="shopPic"
                                    />
                                </div>
                                <div class="center">
                                    <p class="title">{{item.goods.name}}</p>
                                    <p class="desc">{{item.goods.subtopic}}</p>
                                    <p class="limit">{{item.goods.limit}}</p>
                                    <p class="price">
                                        <span class="discount_p">原价￥{{item.goods.discountPrice}}</span>
                                        <span class="origin_p">积分换：{{item.goods.integral}}</span>
                                    </p>
                                </div>
                                <div class="right">
                                    <div class="thunb_box">
                                        <div
                                            class="booking_btn"
                                            @click="freeBook(item.goods.ID,index)"
                                        >积分兑换</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 分享引导 -->
                <div class="bg" v-show="isShow_bg" @click="share">
                    <img onclick="return false" src="../../assets/image/share.png" alt />
                    <p class="shareText">点击“...”分享好友</p>
                </div>
                <!-- 友商互推 -->
                <div class="welfare_wrapper" v-if="friendLeagleList.length">
                    <div class="title_content_wel">
                        <div class="title clearfix">
                            <img
                                onclick="return false"
                                src="../../assets/image/hutui.png"
                                alt
                                class="icon fl"
                            />
                            <h2 class="shop_title">友商大派送</h2>
                            <span class="desc">享会员优惠,交更多朋友</span>
                        </div>
                    </div>
                    <div class="welfare_content">
                        <ul class="welfare_list" v-if="friendLeagleList.length">
                            <li
                                class="item clearfix"
                                v-for="(item,index) in friendLeagleList"
                                :key="index"
                            >
                                <div class="shop-logo-name" @click="goToFriShop(item)">
                                    <p class="shop-name">
                                        <img :src="item.storelogo" alt class="shop-logo" />
                                        <span>{{item.storename}}</span>
                                    </p>
                                    <p class="distance">{{item.distance}}</p>
                                </div>
                                <div class="left">
                                    <img
                                        onclick="return false"
                                        :src="item.res.image"
                                        alt
                                        class="shopPic"
                                    />
                                </div>
                                <div class="center">
                                    <p class="title" style="font-weight:900">{{item.res.name}}</p>
                                    <p class="desc">{{item.res.content}}</p>
                                    <p class="limit">{{item.res.limit}}</p>
                                </div>
                                <div class="right">
                                    <div class="thunb_box clearfix">
                                        <!-- <p class="count fl">{{item.distance}}</p> -->
                                    </div>
                                    <div
                                        style="margin-left:.3rem"
                                        class="receive_btn"
                                        @click="goToFriShop(item)"
                                    >领&nbsp;&nbsp;&nbsp;取</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- vip卡券 -->
                <div class="shotBtn_wrapper">
                    <img
                        @click="gotoVip"
                        onclick="return false"
                        class="shotImg"
                        src="../../assets/image/integral.png"
                        alt
                    />
                    <img
                        @click="gotoCardList"
                        onclick="return false"
                        class="shotImg"
                        src="../../assets/image/cardShot.png"
                        alt
                    />
                </div>
            </div>
        </div>
        <!-- <div class="kefu" @click="inToLetter">
                                                      <img onclick="return false" src="../../assets/image/home_letter.png" alt class="pic_kefu" />
        </div>-->
        <!-- 游戏框框 -->
        <div v-transfer-dom>
            <x-dialog v-model="gameShow" class="dialog-gameBegin">
                <div class="game-box">
                    <img
                        onclick="return false"
                        class="gameFriend"
                        src="../../assets/image/zuJu.png"
                        alt
                        @click="intoFriendGame"
                    />
                    <img
                        onclick="return false"
                        class="gotoPlay"
                        src="../../assets/image/gotoPlay.png"
                        alt
                        @click="intoReadyGame"
                    />
                    <img
                        onclick="return false"
                        src="../../assets/image/gameBegin.jpg"
                        alt
                        class="gameBegin"
                    />
                    <div class="game_giftInfo">
                        <p class="giftInfo" style="font-weight:700">比赛奖品</p>
                        <p class="giftInfo">第一名：{{game_giftInfo.firstPrize.content}}</p>
                        <p class="giftInfo">第二名：{{game_giftInfo.secondPrize.content}}</p>
                        <p class="giftInfo">第三名：{{game_giftInfo.thirdPrize.content}}</p>
                    </div>
                </div>
                <div @click="closeGame">
                    <img
                        onclick="return false"
                        src="../../assets/image/gameClose.png"
                        alt
                        class="close"
                    />
                </div>
            </x-dialog>
        </div>
        <!-- <img onclick="return false" style="visibility:hidden" :src="shopSettingInfo.image" alt=""> -->
        <topUp
            :convertType="convertType"
            v-if="isGiftPanel"
            @closeIntegralPanel="closeIntegralPanel"
            :giftInfo="recommendItemIndo"
            :fatherPanelIndex="fatherPanelIndex"
        ></topUp>
        <transition name="appear">
            <envelope v-show="isShowEnvelope" :text="envelopeText"></envelope>
        </transition>
        <!-- 选择会员卡推荐员工 -->
        <div v-transfer-dom>
            <popup v-model="vipCardShow" position="bottom" should-rerender-on-show>
                <div>
                    <toggle-text @click.native="vipCardShow = false"></toggle-text>
                </div>
            </popup>
        </div>
        <router-view></router-view>
    </div>
</template>

<script type='text/ecmascript-6'>
import Scroll from "../../base/scroll/scroll";
import util from "common/util";
import api from "common/api";
import topUp from "base/topUp/topUp";
import { TransferDom, Swiper, Toast, XDialog, Popup } from "vux";
import axios from "axios";
import Config from "common/config";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import envelope from "base/envelope/envelope";
import Bus from "common/bus.js";
import { clearInterval } from "timers";
// import mySwiper from '../../libs/swiper/swiper-4.3.3.min.js'
// import {setInterval,clearInterval} from 'timers';
export default {
    name: "home",
    directives: {
        TransferDom
    },
    data() {
        return {
            isShow_bg: false,
            vipCardShow: false,
            game_giftInfo: {
                firstPrize: {},
                secondPrize: {},
                thirdPrize: {}
            },
            recommendItemIndo: {
                convert: {},
                coupInfo: {},
                recommend: {
                    couponID: "",
                    discountPrice: "",
                    image: "",
                    limit: "",
                    name: "",
                    originalPrice: "",
                    recommendID: "",
                    subtopic: ""
                }
            },
            isIphoneX: false,
            convertType: 0,
            fatherPanelIndex: 2,
            showTelescopeFlag: true,
            // circleList: [],
            friendIconList1: [],
            friendIconList2: [],
            dicountList: [],
            gameShow: false,
            discountShow: false, //AI优惠券
            showDialogStyle: false,
            show_advertise: true,
            isShowEnvelope: false,
            envelopeText: "",
            demo01_list: [],
            demo01_index: 0,
            recommendList: [],
            inFriendNum: 0,
            outFriendNum: 0,
            isGiftPanel: false,
            // hiddenTelescope: true,
            // isFirstLoad: false,
            deskCode: "",
            defaultAvatarImg: require("../../assets/image/avatar1.jpeg"),
            friendLeagleList: [],
            resId: "", //友商物品id,通过此id获得对应优惠券
            storeName: "" //友商门店名称
        };
    },
    computed: {
        ...mapState([
            "l98Setting",
            "AdvertisingPhoto",
            "loadFriendSexType",
            "baseUrl",
            "friendList",
            "inAndOutFriendCursor",
            "userInfo",
            "shareUrl",
            "shopSettingInfo",
            "noCouponsFlag"
        ]),
        ...mapGetters(["recommentList"])
    },
    mounted() {
        console.log("home url---", window.iosSignUrl);
        this.deskCode = util.GetQueryString("deskCode");
        this.storeName = util.GetQueryString("storeName");
        //console.log("this.storeName---", this.storeName);
        this.resId = util.GetQueryString("resId");
        setTimeout(() => {
            this.gameUrl = window.location.href.split("k98")[0];
            let shareObj = {
                title: "找朋友",
                desc: "您有N个好友在这儿玩! 方圆五公里的帅哥美女集结地→",
                link: `${this.shareUrl}k98/home?visitType=3&phone=${this.userInfo.phone}&role=${this.userInfo.role}`,
                imgUrl: `${this.shopSettingInfo.image}`
            };
            util.setShareInfo(shareObj, 20, "activity", this.shareGetJifen);
        }, 1000);
        if (this.resId) {
            this.getAllianceCoupon();
        }
        let params = {
            cursor: 0,
            sex: 2,
            range: 0,
            sortType: 0
        };
        this.acquireWaitGetCoupons(); //获取自动优惠券
        this.setAdvertisePhoto(); //设置轮播图
        this.getAllCommunityFriend(params); //获取群友
        this._loadPublishArenas(); //拉取已经发布的比赛场
        this.loadAlliance(); //拉取友商物品
        this.loadInviteCoupon(); //判断是否有邀新活动
    },
    activated() {
        window.scrollTo(0, 0);
        if (this.$route.params.data == "shareHomePage") {
            this.isShow_bg = true;
        }
        this.loadClientServiceList();
        this.loadCashierList();
        this.getAlreadyFriend(); //获取已经成为好友列表
        this._getInOutNum(); //获取场内场外用户数
        // this._loadInviteWaitGetCoupon(); //判断是否已经分享过邀请有礼优惠券
    },
    methods: {
        //拉取友商派送的优惠券
        getAllianceCoupon() {
            var allianceData = {
                storeName: decodeURI(this.storeName)
            };
            // console.log("allianceData---", allianceData);
            api.getAllianceCoupon(allianceData).then(res => {
                console.log("通过友商获得的优惠券-------", res);
                if (res.errCode === 0) {
                    var topUpInfo = {
                        content: {
                            fromInfo: {
                                openid: "",
                                headimgurl: this.shopSettingInfo.image,
                                nickName: this.shopSettingInfo.name
                            }
                        },
                        msgCode: 30
                    };
                    this.addMessageIntoQueue(topUpInfo);
                }
                this.clearTopUpData();
                var data = {
                    storename: decodeURI(this.storeName),
                    type: 2
                };
                //console.log("data=----", data);
                api.statAlliCount(data).then(res => {
                    if (res.errCode === 0) {
                        //console.log("统计友商2数据---------", res);
                    }
                });
            });
        },
        //跳转友商门店
        goToFriShop(shopInfo) {
            console.log("shopInfo---", shopInfo);
            var data = {
                storename: shopInfo.storename,
                type: 1
            };
            //console.log("data=----", data);
            api.statAlliCount(data).then(res => {
                if (res.errCode === 0) {
                    //console.log("统计友商数据---------", res);
                }
                window.location.href = `${shopInfo.url}/k98/home?resId=${
                    shopInfo.res.couponID
                }&storeName=${encodeURI(
                    this.shopSettingInfo.name
                )}&friStoreName=${encodeURI(
                    this.shopSettingInfo.name
                )}&visitType=10`;
            });
        },
        //拉取友商物品
        loadAlliance() {
            api.loadAlliance().then(res => {
                // console.log("拉取友商物品-------", res);
                if (res.errCode === 0) {
                    this.friendLeagleList = res.info.map(shop => {
                        shop.distance = "<" + shop.distance.toFixed(1) + "km";
                        return shop;
                    });
                }
            });
        },
        //隐藏分享引导
        share() {
            this.isShow_bg = false;
        },
        //加载客服列表
        loadClientServiceList() {
            let phone = this.userInfo.phone ? this.userInfo.phone : "7777";
            var unReadCount = 0;
            api.loadClientServiceList(phone).then(res => {
                //console.log("客服----------------", res);
                if (res.CliSerID && !res.uerInfos) {
                    unReadCount = res.unReadMsgCount;
                } else {
                    var tempArr = res.uerInfos;
                    if (tempArr.length > 0) {
                        tempArr.forEach((client, index) => {
                            unReadCount += client.unReadMsgCount;
                        });
                        this.getClientUnreadCount(unReadCount);
                        this.addBandge();
                    }
                }
            });
        },
        //加载收银员列表
        loadCashierList() {
            api.loadCashierList().then(res => {
                //console.log("收银员列表---", res)
                let unReadCount = 0;
                if (!res.uerInfos) {
                    //普通用户进入
                    unReadCount = res.unReadMsgCount;
                } else {
                    //收银员进入
                    var tempArr = res.uerInfos;
                    if (tempArr.length > 0) {
                        tempArr.forEach((client, index) => {
                            unReadCount += client.unReadMsgCount;
                        });
                    }
                }
                this.getCashierUnreadCount(unReadCount);
                this.addBandge();
            });
        },
        gotoCardList() {
            this.$router.push({
                name: "card"
            });
        },
        gotoVip() {
            // this.$vux.toast.text('商家未开通本功能', 'middle')
            this.$router.push({
                name: "vipCard"
            });
        },
        //自动领取优惠券
        acquireWaitGetCoupons() {
            let condition = 0; //访问首页有礼
            setTimeout(() => {
                api.acquireWaitGetCoupons(condition)
                    .then(res => {
                        // console.log("访问首页有礼------------------------------", res);
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
                                        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966911743&di=b3b81acff7cdc59f21ec7cbde8b13298&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110928%2F0017030291764688_b.jpg"
                                }
                            }
                        };
                        this.addFriendEvtObj(result);
                        this.judgeMessType("discount");
                    })
                    .catch(err => {
                        //console.log(err);
                    });
            }, 6000);
        },
        //分享获得优惠券
        shareGetJifen(amount, shareType) {
            api.shareToGetIntegral(amount, shareType).then(res => {
                if (res.errCode == 1030) {
                    alert("分享已上限，每天最多分享5次获得积分");
                }
            });
        },
        //监听充值面板状态
        closeIntegralPanel(flag) {
            //console.log("面板状态-----------", flag);
            this.isGiftPanel = flag;
        },
        //去游戏
        gotoPlay() {
            var identity_h = sessionStorage.getItem("identity");
            //console.log("home-identity--", identity_h)
            if (identity_h) {
                let isMasterId = identity_h.indexOf("@master");
                identity_h = isMasterId > 0 ? identity_h : "";
            }
            if (!identity_h) {
                identity_h = "";
            }
            window.location.href = `${this.gameUrl}game?identity=${identity_h}`;
        },
        gotoFriend() {
            // util.routerTo("friend", this, {
            //   routeParamNum: 0 //路由参数2为进入了场外
            // });
            this.$router.push({
                path: "/friend"
            });
        },
        //打电话
        callPhone() {
            // this.set(this.shopInfo, "name1", "hahaha")
            window.location.href = `tel://${this.shopSettingInfo.phone}`;
            api.statCalls().then(res => {
                // //console.log('打电话记录------------------', res);
            });
        },
        loadInviteCoupon() {
            api.loadInviteCoupon(false).then(res => {
                console.log("获取邀新优惠券---------", res);
                if (res.errCode === 0) {
                    this.judgeInviteCoupon(res.coupons.isputAway);
                }
            });
        },
        intoFriendGame() {
            window.location.href = `${this.gameUrl}game/?gamePath=game3&deskCode=${this.deskCode}`;
            this.gameShow = false;
        },
        //进入游戏
        intoReadyGame() {
            this.gameShow = false;
            //console.log("url------", `${this.gameUrl}game/?gamePath=game2`);
            window.location.href = `${this.gameUrl}game/?gamePath=game2`;
        },
        // 关闭游戏
        closeGame() {
            this.gameShow = false;
        },
        //拉取已经发布的比赛场
        _loadPublishArenas() {
            api.loadPublishArenas().then(res => {
                //console.log("拉取发布的比赛---------", res);
                var reverseArr = res.arenaInfos.reverse();
                if (reverseArr.length > 0) {
                    this.game_giftInfo.firstPrize.content = util.returnDiscountContent(
                        res.arenaInfos[0].firstPrize
                    );
                    this.game_giftInfo.secondPrize.content = util.returnDiscountContent(
                        res.arenaInfos[0].secondPrize
                    );
                    this.game_giftInfo.thirdPrize.content = util.returnDiscountContent(
                        res.arenaInfos[0].thirdPrize
                    );
                    this.gameShow = true;
                }
                // //console.log('拉取已经发布的比赛场:', res)
            });
        },
        //拉取首页轮播图
        // _loadAdvertisingPhoto() {
        //   api.loadAdvertisingPhoto().then(res => {
        //     // //console.log('轮播图-------------------------：', res)
        //     this.getAdvertisingImg(res.adPhotoURL);
        //     this.$nextTick(() => {
        //       let swiperList = [];
        //       res.adPhotoURL.forEach((item, index) => {
        //         swiperList.push({
        //           url: "javascript:",
        //           img: item,
        //           title: ""
        //         })
        //       })
        //       this.demo01_list = swiperList
        //     })
        //   })
        // },
        //设置轮播图
        setAdvertisePhoto() {
            this.$nextTick(() => {
                let swiperList = [];
                this.AdvertisingPhoto.forEach((item, index) => {
                    swiperList.push({
                        url: "javascript:",
                        img: item,
                        title: ""
                    });
                });
                this.demo01_list = swiperList;
                //console.log("this.demo01_list----------", this.demo01_list);
            });
        },
        closeWebPage() {
            WeixinJSBridge.invoke("closeWindow", {}, function(res) {
                // alert(res.err_msg);
                window.location.href =
                    "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU3MTc1MzA1OA==#wechat_redirect";
            });
        },
        //关闭广告
        close_adtise() {
            this.show_advertise = false;
        },
        //免费预定
        freeBook(recommendID, index) {
            if (!this.l98Setting.shopItemConvertOpen) {
                this.$vux.toast.text("商家未开通本功能", "middle");
                return;
            }
            this.isGiftPanel = true;
            (this.fatherPanelIndex = 2),
                (this.recommendItemIndo = this.recommentList[index]);
        },
        //关闭详情
        closeDialog() {
            this.showDialogStyle = false;
        },
        //获取地图位置
        getMapPosition() {
            //获取地理位置
            //console.log("获取地理位置");
            let _this = this;
            wx.getLocation({
                // type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function(res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    //window.location.href="http://apis.map.qq.com/uri/v1/marker?marker=coord:22.547986,113.988039;title:深圳魅力四射酒吧;addr:好吃好玩的地方&referer=myapp"
                    window.location.href = `http://apis.map.qq.com/uri/v1/routeplan?type=bus&from=我的位置&fromcoord=${latitude},${longitude}&to=${_this.shopSettingInfo.address}&tocoord=${_this.shopSettingInfo.lat},${_this.shopSettingInfo.lng}&policy=1&referer=myapp`;
                }
            });
        },
        //获取场内场外人数
        _getInOutNum() {
            api.getInOutNum().then(res => {
                //console.log("场内外在线数-------", res);
                this.inFriendNum = res.inFieldNumber;
                this.outFriendNum = res.outFiledNumber;
            });
        },
        //进入福利页面
        toWelfare() {
            this.$router.push({
                name: "shareNew"
            });
        },
        //拉取候选人
        getAllCommunityFriend(params) {
            api.getFriendList(params).then(res => {
                // console.log("拉取候选人：·····················", res);
                this.getFriend(res);
            });
        },
        //进入场内交友界面
        // intoFriend() {
        //   if (this.inFriendNum === 0) {
        //     this.$vux.toast.show({
        //       type: "text",
        //       text: "场内暂时没有朋友",
        //       width: "12em"
        //     });
        //     return;
        //   }
        //   util.routerTo("friend", this, {
        //     routeParamNum: 1 //路由参数1为进入了场内
        //   });
        // },
        //进入场外交友界面
        outFriend() {
            util.routerTo("friend", this, {
                routeParamNum: 2 //路由参数2为进入了场外
            });
        },
        //进入店长信箱
        // inToLetter() {
        //   util.routerTo("message", this, {
        //     routeParamNum: 2 //路由参数2表示从店长信箱进入店长留言
        //   });
        // },
        // 更多福利
        showMoreWelfare() {
            util.routerTo("welfare", this);
        },
        ...mapMutations({
            addFriendEvtObj: "UPDATE_DYNAMICMESSAGE", //更新好友事件提示框(左侧信封弹出触发)
            judgeMessType: "JUDGE_MESSTYPE", //判断消息
            getPosition: "GET_POSITION",
            updateShareUrl: "UPDATE_SHAREURL",
            getFriend: "GET_FRIENDlIST", //获取候选人,
            getRecommentList: "GET_RECOMMENTLIST",
            addBandge: "ADD_BADGE", //动态变化未读消息数量
            getClientUnreadCount: "GETCLIENTUNREADCOUNT", //客服未读消息数量
            getCashierUnreadCount: "GETCASHIERUNREADCOUNT", //收银未读消息数量
            clearTopUpData: "CLEARTOPUPDATA",
            addMessageIntoQueue: "ADDMESSAGEQUEUE",
            judgeInviteCoupon: "JUDGE_INVITE_COUPON" //判断是否还有邀请有礼
        }),
        ...mapActions({
            getAlreadyFriend: "get_alreadyFriendList" //获取已经成为好友事件
        })
    },
    watch: {
        AdvertisingPhoto: function(newValue) {
            let swiperList = [];
            newValue.forEach((item, index) => {
                swiperList.push({
                    url: "javascript:",
                    img: item,
                    title: ""
                });
            });
            this.demo01_list = swiperList;
        },
        // userInfo: function(newvalue) {
        //   // //console.log('newvalue--------------------', newvalue);
        //   if (newvalue.firstLoad) {
        //     this.isFirstLoad = true;
        //   } else {
        //     this.isFirstLoad = false;
        //   }
        // },
        friendList: function(newValue) {
            console.log("friendList-----------", newValue);
            if (newValue.length < 6) {
                this.friendIconList1 = [
                    {
                        headimgurl: require("../../assets/image/avatar1.jpeg")
                    },
                    {
                        headimgurl: require("../../assets/image/April.png")
                    },
                    {
                        headimgurl: require("../../assets/image/avatar2.jpg")
                    }
                ];
                this.friendIconList2 = [
                    {
                        headimgurl: require("../../assets/image/cat.png")
                    },
                    {
                        headimgurl: require("../../assets/image/blueSky.png")
                    }
                ];
                //console.log("this.friendIconList1------", this.friendIconList1);
                return;
            }
            let tempArr = this.friendList.map((item, index) => {
                return item.info;
            });
            this.friendIconList1 = tempArr.slice(0, 3);
            this.friendIconList2 = tempArr.slice(4, 6);
        }
    },
    components: {
        Swiper,
        Toast,
        XDialog,
        Scroll,
        envelope,
        topUp,
        Popup
        // Carousel3d,
        // Slide
    }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/variable.less";
@import "../../assets/less/home_common.less";
@import "../../assets/less/mixin.less";
@import "~vux/src/styles/close";
@import "../../libs/swiper/swiper-4.3.3.min.css"; // 优惠券开始
.weui-dialog {
    background: none;
}
.dialog-discount {
    .discount-box {
        padding: 0.2333rem 0 0.1rem;
        background-color: #ffd700;
        overflow: hidden;
        .discountScroll {
            height: 3.8rem;
            box-sizing: border-box;
            .discountList {
                .item {
                    margin: 0 auto 0.2667rem;
                    width: 7.0533rem;
                    height: 1.68rem;
                    display: flex;
                    justify-content: space-between; // border: 1px solid #FFAE00;
                    // border-left: 2px solid #FFAE00;
                    .bg("../../assets/image/discount_bg1.png");
                    box-sizing: border-box;
                    .itemLeft {
                        box-sizing: border-box;
                        padding-top: 0.4rem;
                        .itemName {
                            font-size: 0.3467rem;
                            color: #4b4b4b;
                            margin-bottom: 0.22rem;
                            padding-left: 0.4533rem;
                        }
                        .itemTime {
                            padding-left: 0.4533rem;
                            font-size: 0.2933rem;
                            color: #999;
                        }
                    }
                    .itemRight {
                        box-sizing: border-box;
                        padding: 0.2667rem;
                        padding-top: 0.6rem;
                        font-size: 0.3733rem;
                        color: #fff;
                    }
                }
            }
        }
    }
}
.vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
    color: #fff;
} // 优惠券结束
// 弹框游戏开始
.dialog-gameBegin {
    .game-box {
        position: relative;
        .game_giftInfo {
            text-align: left;
            position: absolute;
            top: 1.3rem;
            right: 2.2rem;
            .giftInfo {
                color: #fff;
                font-size: 14px;
                margin-bottom: 0.2333rem;
            }
        }
        .gameFriend,
        .gotoPlay {
            width: 2.4rem;
            position: absolute;
            bottom: 0.58rem;
        }
        .gameFriend {
            left: 2.4rem;
        }
        .gotoPlay {
            right: 1.5rem;
        }
        .gameBegin {
            width: 8.1867rem;
            height: 7.2rem;
        }
    }
    .close {
        margin-top: 0.72rem;
        width: 1.0667rem;
        height: 1.0667rem;
    }
} // 弹框游戏结束
.home {
    .guideBg {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 8;
        background-color: rgba(0, 0, 0, 0.3);
    }
    background: rgba(242, 242, 242, 1); // .kefu {
    //   position: fixed;
    //   bottom: 80px;
    //   right: 0.1333rem;
    //   animation: jump 1500ms linear 500ms infinite normal;
    //   @keyframes jump {
    //     10% {
    //       bottom: 80px;
    //     }
    //     50% {
    //       bottom: 75px;
    //     }
    //     100% {
    //       bottom: 80px;
    //     }
    //   }
    //   .pic_kefu {
    //     width: 1rem;
    //     height: 1rem;
    //   }
    // }
}
.dialog_wrapper {
    width: 7.8667rem;
    height: 10.3467rem;
    background: #ffd700;
    margin: 0 auto;
    border-radius: 10px;
    .banner_content {
        width: 100%;
        height: 3.4933rem;
        margin-bottom: 0.2667rem;
        .picBanner {
            width: 100%;
            height: 100%;
        }
    }
    .info_content {
        width: 7.0667rem;
        height: 6.2933rem;
        margin: 0 auto;
        background-image: url("../../assets/image/dialog_bg.png");
        background-repeat: no-repeat;
        background-size: 100%;
        padding-top: 0.5867rem;
        box-sizing: border-box;
        h2 {
            font-size: 0.4rem;
            color: #ff3131;
            font-weight: bold;
            text-align: center;
            font-family: "PingFang SC";
        }
        .introduce_box {
            margin-top: 0.16rem;
            .title {
                .dialogTitle;
            }
            p {
                .dialogP;
            }
        }
        .endTime_box {
            margin-top: 0.3333rem;
            .title {
                .dialogTitle;
            }
            p {
                .dialogP;
            }
        }
        .consume_box {
            margin-top: 0.2933rem;
            .title {
                .dialogTitle;
            }
            p {
                .dialogP;
            }
        }
        .btn_box {
            button {
                outline: none;
                background: #fff;
                border: none;
                color: #ffd700;
                padding: 0.1333rem;
            }
        }
    }
}
.content {
}
.entertainment_wrapper {
    display: flex;
    justify-content: space-around;
    .findFri_btn {
        position: relative;
        .desc_wrapper {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            .lineOne {
                position: absolute;
                top: 0.1rem;
                left: 0.6rem;
                .fri_list {
                    .item {
                        float: left;
                        margin-left: -0.233rem; // position: absolute;
                        .min_avatar {
                            width: 0.66rem;
                            height: 0.66rem;
                            border-radius: 50%;
                        }
                    }
                }
            }
            .linetwo {
                position: absolute;
                top: 0.9rem;
                left: 0.6rem;
                .fri_list {
                    .item {
                        float: left;
                        margin-left: -0.233rem; // position: absolute;
                        .min_avatar {
                            width: 0.66rem;
                            height: 0.66rem;
                            border-radius: 50%;
                        }
                    }
                }
            }
            .text {
                position: absolute;
                bottom: 0.14rem;
                right: 0.2rem;
                color: #fff;
                font-size: 12px;
            }
        }
        img {
            width: 4.6667rem;
            height: 2.2rem;
        }
    }
    .playGame_btn {
        position: relative;
        img {
            width: 4.6667rem;
            height: 2.2rem;
        }
        .text {
            position: absolute;
            bottom: 0.14rem;
            right: 0.2rem;
            color: #fff;
            font-size: 12px;
        }
    }
} // .telescope_wrapper {
//   @keyframes bigAndSmall {
//     0% {
//       transform: scale(1); //  opacity: 1;
//     }
//     50% {
//       transform: scale(0.7);
//     }
//     100% {
//       transform: rotate(0.8);
//     }
//   }
//   width: 100%;
//   height: 7rem;
//   background-color: #fff;
//   position: relative;
//   overflow: hidden;
//   .leftguideFinger {
//     width: 2rem;
//     height: 2rem;
//     position: absolute;
//     top: 2.5rem;
//     left: 1.5667rem;
//     z-index: 9;
//     animation: bigAndSmall 1s linear infinite;
//   }
//   .rightguideFinger {
//     width: 2rem;
//     height: 2rem;
//     position: absolute;
//     top: 2.5rem;
//     z-index: 9;
//     animation: bigAndSmall 1s linear infinite;
//     right: 0.7rem;
//   }
//   .leftguideText {
//     position: absolute;
//     top: 4.5rem;
//     left: 1.4667rem;
//     z-index: 9;
//     font-size: 0.4rem;
//     color: #fff;
//     padding: 0.1333rem;
//     font-weight: 800;
//     border: 1px solid #fff;
//     border-radius: 0.3333rem;
//   }
//   .rightguideText {
//     position: absolute;
//     top: 4.5rem;
//     z-index: 9;
//     font-size: 0.4rem;
//     color: #fff;
//     right: 0.4rem;
//     padding: 0.1333rem;
//     font-weight: 800;
//     border: 1px solid #fff;
//     border-radius: 0.3333rem;
//   }
//   @keyframes rotateAn {
//     0% {
//       transform: rotate(0deg);
//       opacity: 1;
//     }
//     99% {
//       transform: rotate(180deg);
//       opacity: 1;
//     }
//     100% {
//       transform: rotate(180deg);
//       opacity: 0;
//     }
//   }
//   .left_radius_box {
//     width: 3.4rem;
//     height: 3.4rem;
//     border-radius: 50%;
//     position: absolute;
//     z-index: 1;
//     top: 1.6rem;
//     left: 0.57rem;
//     overflow: hidden;
//     .more {
//       position: absolute;
//       z-index: -1;
//       bottom: 1.3rem;
//       left: 0.2rem;
//       padding-top: 0.3rem;
//       width: 4rem;
//       .fri_list {
//         // position: absolute;
//         .item {
//           float: left;
//           margin-left: -0.1333rem; // position: absolute;
//           .min_avatar {
//             width: 0.76rem;
//             height: 0.76rem;
//             border-radius: 50%;
//           }
//         }
//         .dotItem {
//           margin-left: 0.1rem;
//           padding-top: 0.0667rem;
//           .rightArrow {
//             position: absolute;
//             right: 0.0933rem;
//             top: 0.3rem;
//             font-size: 0.5533rem;
//             display: inline-block;
//             color: #d1d1d1;
//           }
//         }
//       }
//     }
//     .leftCircle {
//       width: 3.4rem;
//       height: 3.4rem;
//       border-radius: 50%;
//       position: absolute;
//       overflow: hidden;
//       .leftCirclePart,
//       .leftCirclePartIphoneX,
//       .rightCirclePart {
//         position: absolute;
//         width: 50%;
//         height: 100%;
//         top: 0;
//         overflow: hidden;
//       }
//       .leftCirclePart {
//         left: -0.0167rem;
//         border-radius: 50% 0 0 50%;
//         overflow: hidden;
//       }
//       .leftCirclePart::after {
//         background: linear-gradient(bottom, #9bccf7, #2785f0);
//         opacity: 1;
//         display: block;
//         content: "";
//         width: 100%;
//         height: 100%;
//         transform-origin: right center;
//         animation: rotateAn 2s 4s linear forwards;
//       }
//       .leftCirclePartIphoneX::after {
//         background: linear-gradient(bottom, #9bccf7, #2785f0);
//         opacity: 1;
//         display: block;
//         content: "";
//         width: 100%;
//         height: 3.4rem;
//         transform-origin: right center;
//       }
//       .rightCirclePart {
//         right: 2px;
//         border-radius: 0 50% 50% 0;
//         overflow: hidden;
//       }
//       .rightCirclePart::after {
//         background: linear-gradient(bottom, #9bccf7, #2785f0);
//         opacity: 1;
//         display: block;
//         content: "";
//         width: 100%;
//         height: 100%;
//         transform-origin: left center;
//         animation: rotateAn 2s 2s linear forwards;
//       }
//       .rightCirclePartIphoneX::after {
//         background: linear-gradient(bottom, #9bccf7, #2785f0);
//         opacity: 1;
//         display: block;
//         content: "";
//         width: 100%;
//         height: 3.4rem;
//         transform-origin: left center;
//       }
//     }
//     .findFriend_text {
//       position: absolute;
//       width: 2.6rem;
//       top: 1.2rem;
//       left: 0.4rem;
//     }
//     .onlineStatusPeople {
//       width: 1.7rem;
//       box-sizing: border-box;
//       text-align: center; // background-color: #fff;
//       border-radius: 0.2667rem;
//       position: absolute;
//       bottom: 2.3rem;
//       left: 0.8567rem;
//       padding: 0.05rem 0.1rem;
//       font-size: 0.28rem;
//     }
//     .online_person {
//       width: 1.7rem;
//       box-sizing: border-box;
//       text-align: center; // background-color: #fff;
//       border-radius: 0.2667rem;
//       position: absolute;
//       bottom: 0.11867rem;
//       left: 0.8067rem;
//       padding: 0.05rem 0.1rem;
//       font-size: 0.28rem;
//     }
//   }
//   .right_radius_box {
//     width: 3.4rem;
//     height: 3.4rem;
//     border-radius: 50%;
//     position: absolute;
//     z-index: 1;
//     top: 1.56rem;
//     right: 0.54rem;
//     overflow: hidden;
//     .rightCircle {
//       width: 3.4rem;
//       height: 3.4rem;
//       border-radius: 50%;
//       position: absolute;
//       overflow: hidden;
//       left: 0.0133rem;
//       .leftCirclePart,
//       .leftCirclePartIphoneX,
//       .rightCirclePart {
//         position: absolute;
//         width: 50%;
//         height: 100%;
//         top: 0;
//       }
//       .leftCirclePart {
//         left: -0.0067rem;
//         border-radius: 50% 0 0 50%;
//         overflow: hidden;
//       }
//       .leftCirclePart::after {
//         background: linear-gradient(bottom, #9bccf7, #2785f0);
//         opacity: 1;
//         display: block;
//         content: "";
//         width: 100%;
//         height: 100%;
//         transform-origin: right center;
//         animation: rotateAn 2s 4s linear forwards;
//       }
//       .leftCirclePartIphoneX::after {
//         background: linear-gradient(bottom, #9bccf7, #2785f0);
//         opacity: 1;
//         display: block;
//         content: "";
//         width: 100%;
//         height: 3.4rem;
//         transform-origin: right center;
//       }
//       .rightCirclePart {
//         right: 0.0367rem;
//         border-radius: 0 50% 50% 0;
//         overflow: hidden;
//       }
//       .rightCirclePart::after {
//         background: linear-gradient(bottom, #9bccf7, #2785f0);
//         opacity: 1;
//         display: block;
//         content: "";
//         width: 100%;
//         height: 100%;
//         transform-origin: left center;
//         animation: rotateAn 2s 2s linear forwards;
//       }
//       .rightCirclePartIphoneX::after {
//         background: linear-gradient(bottom, #9bccf7, #2785f0);
//         opacity: 1;
//         display: block;
//         content: "";
//         width: 100%;
//         height: 3.4rem;
//         transform-origin: left center;
//       }
//     }
//     .dahuashai_text {
//       position: absolute;
//       width: 2.6rem;
//       top: 1.2rem;
//       left: 0.4rem;
//     }
//     .online_player {
//       width: 1.7rem;
//       box-sizing: border-box;
//       text-align: center; // background-color: #fff;
//       border-radius: 0.2667rem;
//       position: absolute;
//       bottom: 0.0867rem;
//       left: 0.8167rem;
//       padding: 0.05rem 0.1rem;
//       font-size: 0.28rem;
//     }
//     .right_radius {
//       width: 0.04rem;
//       height: 1.6rem;
//       position: absolute;
//       right: 50%;
//       margin-right: -0.02rem;
//       transform-origin: bottom;
//     }
//   }
//   .telescope_img {
//     position: absolute; // top: -0.2333rem;
//     width: 100%;
//     height: 100%;
//   }
// }
.homeTop_wrapper {
    position: relative;
    height: 4.2667rem;
    padding-top: 0.2rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    background: -webkit-linear-gradient(
        left,
        #fff800,
        #fef200,
        #fccc00,
        #fbbc00
    );
    margin-bottom: 0.4rem; // padding: 0.1667rem;
    // .bg('../../assets/image/welfare_bg.png');
    // background: #ffe200;
    .barLogo_wrapper {
        width: 100%;
        position: absolute;
        z-index: 999;
        top: 0.96rem;
        left: 0.4rem;
        .logo_wrapper {
            display: inline-block;
            height: 0.5rem;
            background-color: rgba(0, 0, 0, 0.1);
            line-height: 0.5rem;
            margin: 0 0.5rem;
            border-radius: 10px;
            .logo {
                width: 0.6733rem;
                height: 0.6733rem;
                float: left;
                margin-top: -2px;
                border-radius: 50%;
                margin-right: 0.1367rem;
            }
            .bar_name {
                color: #f4f4f4;
                float: left;
                font-family: "PingFang-SC-Regular";
                font-size: 14px;
                font-weight: bold;
            }
        }
    }
    .slider {
        height: 100%;
        position: relative;
        top: 0.4rem;
    }
    .shadowLeft {
        position: absolute;
        width: 0.45rem;
        height: 3.8rem;
        background: #fff;
        border-radius: 0 10px 10px 0px;
        top: 1.2rem;
        left: 0;
        transform: skewY(-30deg);
    }
    .shadowRight {
        position: absolute;
        width: 0.45rem;
        height: 3.8rem;
        background: #fff;
        border-radius: 10px 0px 0px 10px;
        top: 1.2rem;
        right: 0;
        transform: skewY(30deg);
    }
}
.pic {
    width: 100%;
    height: 100%;
} // 地址
.adr_wrapper {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 0rem 0.5rem 0rem;
    height: 0.8733rem;
    box-sizing: border-box;
    margin-bottom: 0.2667rem;
    .adr {
        font-family: "Times New Roman", Times, serif;
        height: 15px;
        line-height: 15px;
        flex-grow: 1;
        display: flex;
        padding-top: 0.19rem;
        .position {
            width: 0.4067rem;
            height: 0.5133rem;
            margin-right: 0.1333rem;
            margin-top: -0.0167rem;
        }
        .adr_desc {
            font-size: 0.3733rem;
            font-family: "PingFang-SC-Regular";
            color: #9f9f9f;
            flex-grow: 1;
            padding-top: 0.07rem; // text-align: center;
        }
    }
    .navigator {
        position: relative;
        margin-top: -0.125rem;
        .distant {
            font-size: 12px;
            font-family: "PingFang-SC-Regular";
        }
        .pic_map {
            width: 0.9375rem;
            height: 0.9375rem;
            vertical-align: -0.1875rem;
        }
    }
    .tel {
        // padding-top: 2px;
        a {
            color: #ccc;
        }
        img {
            width: 0.6267rem;
            height: 0.6267rem;
            position: relative;
            top: 0.1rem;
            z-index: 5;
        }
    }
} // 好友
.friend_wrapper {
    overflow: hidden;
    .icon {
        width: 0.7733rem;
        height: 0.88rem;
        margin-right: 0.16rem;
    }
    .titleWrapper;
    .title {
        padding-bottom: 0.1333rem;
        padding-top: 0.1rem;
        float: left;
        display: inline-block;
        .title;
        .friend_title {
            .homeTitle;
            padding-top: 0.25rem;
        }
        .desc {
            .titleDesc;
            padding-top: 0.22rem;
        }
    } // .more {
    //   padding: 0.1rem 0.1333rem;
    //   padding-top: 0.3rem;
    //   float: right;
    //   .fri_list {
    //     .item {
    //       .min_avatar {
    //         width: 0.6667rem;
    //         height: 0.6667rem;
    //         border-radius: 50%;
    //       }
    //     }
    //     .dotItem {
    //       margin-left: 0.1rem;
    //     }
    //   }
    // }
    .pic_content {
        .pic_list {
            padding: 0 0.4667rem;
            display: flex;
            justify-content: space-between;
            padding-bottom: 0.167rem;
            li {
                &.out_fri {
                    // padding-top: 0.1633rem;
                }
                position: relative;
                .inner_onlinePerson {
                    .online;
                }
                .out_onlinePerson {
                    .online;
                    right: 0.6867rem;
                }
                .friend_avatar_inner {
                    width: 4.2933rem;
                    height: 2.2533rem;
                }
                .friend_avatar_out {
                    width: 4.2933rem;
                    height: 2.2533rem;
                }
            }
        }
    }
} // 游戏
.game_wrapper {
    // width: 100%;
    overflow-y: hidden;
    .icon {
        width: 0.6rem;
        height: 0.7067rem;
        margin-right: 0.16rem;
        transform: rotate(0deg);
    }
    .animations {
        animation: rock 1000ms linear 1 normal;
        @keyframes rock {
            10% {
                transform: rotate(-45deg);
            }
            30% {
                transform: rotate(0deg);
            }
            50% {
                transform: rotate(-45deg);
            }
            70% {
                transform: rotate(0deg);
            }
            90% {
                transform: rotate(-45deg);
            }
        }
    }
    .titleWrapper;
    .title {
        padding-bottom: 0.1333rem;
        padding-top: 0.2667rem;
        .title();
        .dice_title {
            .homeTitle;
            padding-top: 0.0967rem;
        }
        .desc {
            .titleDesc;
            padding-top: 0.0967rem;
        }
        .challengeGameBox {
            margin-right: 0.2667rem;
            padding-top: 0.1033rem;
            width: 2.6667rem;
            display: flex;
            justify-content: space-between;
            .arrowRight {
                font-size: 0.4rem;
                font-weight: 700;
                color: #ffdd44;
                &.active {
                    color: red;
                    font-weight: 700;
                }
            }
            .huangguan {
                width: 0.5333rem;
                height: 0.3333rem;
                padding: 0.1067rem;
            }
        }
    }
    .game_list {
        // overflow-x: auto;
        // overflow-y: hidden;
        height: 2.3333rem;
        margin: 0 0.4667rem;
        padding-bottom: 0.17rem;
        display: flex;
        justify-content: space-between;
        position: relative;
        li {
            // display: table-cell;
            box-sizing: border-box;
            .pic_game {
                float: left;
                width: 4.2933rem;
                height: 2.2533rem;
            }
            &:nth-child(2) {
                margin-left: 0.2667rem;
            }
            .nvlang {
                position: absolute;
                z-index: 4;
                width: 1.44rem;
                height: 2.33rem;
                top: -0.2rem;
                left: 0.2rem;
            }
        }
    }
} // 福利
.welfare_wrapper {
    .titleWrapper;
    .title_content_wel {
        display: flex;
        justify-content: space-between;
        .title {
            padding-bottom: 0.2333rem;
            padding-top: 0.2667rem;
            .icon {
                width: 0.9333rem;
                height: 0.9333rem;
                margin-right: 0.16rem;
            }
            .title();
            .shop_title {
                .homeTitle;
                padding-top: 0.25rem;
            }
            .desc {
                .titleDesc;
                padding-top: 0.22rem;
            }
        }
        .more {
            .letter {
                margin-right: 0.25rem;
                margin-top: 0.3rem;
                width: 1.1rem;
                height: 1.2rem;
            }
        }
    }
    .advertise_wrapper {
        position: relative;
        .close {
            width: 0.32rem;
            height: 0.3467rem;
            position: absolute;
            top: 1.4667rem;
            right: 0.4267rem;
        }
        .advertise {
            height: 3.1467rem;
        }
    }
    .welfare_content {
        margin-top: 0.1rem;
        .welfare_list {
            padding: 0 0.2667rem;
            .item {
                // height: 2.4667rem;
                padding: 0.1333rem 0.1rem;
                .shop-logo-name {
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.1333rem;
                    position: relative;
                    border-radius: 6px;
                    .shop-logo {
                        margin-right: 0.1333rem;
                        width: 0.5rem;
                        height: 0.5rem;
                        border-radius: 50%;
                    }
                    .shop-name {
                        font-weight: 800;
                        background-color: rgba(0, 0, 0, 0.1);
                        color: #fff;
                        font-size: 0.36rem;
                        display: inline-block;
                        padding: 0 0.1rem;
                        display: flex;
                        align-items: center;
                        border-radius: 6px;
                    }
                    .distance {
                        color: #8f8f8f;
                        font-size: 0.3467rem;
                        position: absolute;
                        top: 0.1rem;
                        right: 0.0333rem;
                    }
                }
                .left {
                    float: left;
                    width: 2.8533rem;
                    height: 2.1333rem;
                    .shopPic {
                        width: 100%;
                        height: 100%;
                    }
                }
                .center {
                    float: left;
                    height: 2rem;
                    margin-left: 0.2667rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .title {
                        font-size: 0.3733rem;
                        color: #333;
                        font-weight: bold;
                    }
                    .desc {
                        margin-top: 0.1rem;
                        color: #8f8f8f;
                        font-size: 0.32rem;
                    }
                    .limit {
                        margin-top: 0.16rem;
                        color: #8f8f8f;
                        font-size: 0.2667rem;
                    }
                    .price {
                        margin-top: 0.1rem;
                        display: flex;
                        .discount_p {
                            color: #333;
                            font-size: 0.3467rem;
                            margin-right: 0.3rem;
                        }
                        .origin_p {
                            color: red;
                            font-size: 0.3467rem;
                        }
                    }
                }
                .right {
                    margin-top: 1.4rem;
                    position: relative;
                    .thunb_box {
                        .thumb {
                            width: 0.4rem;
                            height: 0.4rem;
                            float: left;
                            margin-right: 0.1333rem;
                        }
                        .booking_btn {
                            width: 1.4rem;
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
                            font-size: 0.32rem;
                        }
                    }
                    .receive_btn {
                        width: 1.4rem;
                        text-align: center;
                        padding: 0.1067rem;
                        font-size: 0.32rem;
                        line-height: 0.5067rem; // background: @baseColor;
                        background: -webkit-linear-gradient(
                            left,
                            #fff800,
                            #fef200,
                            #fccc00,
                            #fbbc00
                        );
                        color: #1d1d1d;
                        border-radius: 0.08rem;
                    }
                }
            }
        }
    }
}
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
        font-size: 0.7rem;
        color: #fff;
        position: fixed;
        top: 110px;
        right: 0;
    }
}
.shotBtn_wrapper {
    margin: 0.2667rem 0 0.2667rem 0;
    display: flex;
    justify-content: space-around;
    background: #fff;
    padding-top: 0.2667rem;
    .shotImg {
        width: 4.5rem;
        height: 0.8rem;
    }
}
</style>
