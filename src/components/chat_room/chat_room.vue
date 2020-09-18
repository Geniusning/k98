<template>
    <transition name="fade">
        <div id="chat" class="chatRoom">
            <div class="voice-bg" v-show="isVoicing"></div>
            <img class="warning" v-show="warning" src="../../assets/image/warning .png" alt />
            <div class="chat_nav">
                <div class="back_box">
                    <img
                        onclick="return false"
                        src="../../assets/image/back_chat.png"
                        alt
                        class="back_arrow"
                        @click="goBack"
                    />
                </div>
                <div class="name">
                    <div class="sex_box">
                        <img
                            v-if="staticChatFriendObj.sex===0"
                            src="../../assets/image/female.png"
                            alt
                        />
                        <img
                            v-else-if="staticChatFriendObj.sex===2"
                            src="../../assets/image/female.png"
                            alt
                        />
                        <img v-else src="../../assets/image/male.png" alt />
                    </div>
                    {{staticChatFriendObj.nickname}} {{staticChatFriendObj.staffTag}}
                    <div class="online_status">
                        <!-- <img src="../../assets/image/dot_green.png" v-if="staticChatFriendObj.onlineDiceServer || staticChatFriendObj.onlineL98Server" class="online_dot"> -->
                        <!-- <span v-if="staticChatFriendObj.onlineDiceServer || staticChatFriendObj.onlineL98Server" class="friendStatus">{{staticChatFriendObj.isInDoor?"店内":"店外"}}</span> -->
                        <span
                            v-if="staticChatFriendObj.deskCode && (staticChatFriendObj.onlineDiceServer || staticChatFriendObj.onlineL98Server)"
                            class="roomNum"
                        >{{`${staticChatFriendObj.deskCode}`}}桌</span>
                    </div>
                </div>
                <!--  -->
                <div
                    v-show="staticChatFriendObj.phone != '' && staticChatFriendObj.role != '' && l98Setting.staffCommentOpen"
                    class="comment-wrapper clearfix"
                    @click="goToComment(staticChatFriendObj.phone)"
                >
                    <img
                        onclick="return false"
                        src="../../assets/image/thumb1.png"
                        alt
                        class="avatar fl"
                    />
                    <span class="count fl">{{thumbCount}}</span>
                </div>
                <div class="backHome_box">
                    <img
                        onclick="return false"
                        src="../../assets/image/chat_home.png"
                        alt
                        class="home"
                        @click="goHome"
                    />
                </div>
            </div>
            <div class="chat_wrapper" ref="chatWrapper" @click="tagScroll">
                <!-- soul面板 -->
                <div class="soul_panel" v-if="isShowSoulPanel">
                    <div class="avatar_box">
                        <img class="avatar" :src="userInfo.headimgurl" alt />
                        <div class="line">匹配度90.2%</div>
                        <img class="avatar" :src="staticChatFriendObj.headimgurl" alt />
                    </div>
                    <div class="chat_soulText_box">
                        <p class="chatSoulText">恭喜找到自己的灵魂玩伴</p>
                        <p class="chatSoulText">赶紧送个见面礼、聊聊天、结伴玩游戏啦!</p>
                    </div>
                </div>
                <div
                    class="preview_pic"
                    v-show="showPreview"
                    ref="preview_pic"
                    @click="closePreview"
                ></div>
                <scroll
                    ref="listView"
                    class="chat_content"
                    :data="componentChatList"
                    :listen-scroll="listenScroll"
                    :pullDownRefresh="pullDownRefresh"
                    @getIndex="getIndex"
                    @scroll="myscroll"
                    @pullingDown="pullingDown"
                >
                    <ul class="chat_list" ref="chatList">
                        <li
                            class="clearfix chatListItem"
                            :data-friend="item.friend"
                            :data-vocieUnread="item.vocieUnread+''"
                            :data-messageType="item.type"
                            ref="item"
                            :class="{'friend':item.friend,'mine':!item.friend}"
                            :key="index"
                            v-for="(item,index) in componentChatList"
                        >
                            <div v-if="item.type==1" class="message_wrapper">
                                <div class="person_box">
                                    <h2
                                        class="name"
                                    >{{item.time.slice(8,10)==today?item.time.slice(11):item.time.slice(5,10)}}</h2>
                                    <img
                                        onclick="return false"
                                        :src="staticChatFriendObj.headimgurl?staticChatFriendObj.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534938165134&di=f3ae0420c8c174149ac1c123230a28ed&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FJCRXU6oUw5s17jKllv9icrTmXvozYWQDeWFhKgEXbYeR9JOEKkrWLjibU7a7FAbsBHibVKca5wWzEiaXHWSgaSlgbA%2F640%3Fwx_fmt%3Dpng'"
                                        alt
                                        class="avatar"
                                        v-if="item.friend"
                                    />
                                    <img
                                        onclick="return false"
                                        :src="userInfo.headimgurl"
                                        alt
                                        class="avatar"
                                        v-else
                                    />
                                </div>
                                <div class="message_box">
                                    <span v-show="item.type===1" class="arrow"></span>
                                    <p
                                        class="message"
                                        style="word-break: break-all;"
                                        v-if="item.type===1"
                                        v-html="item.message"
                                    ></p>
                                </div>
                            </div>
                            <div v-if="item.type==9" class="message_wrapper clearfix">
                                <div class="person_box">
                                    <h2
                                        class="name"
                                    >{{item.time.slice(8,10)==today?item.time.slice(11):item.time.slice(5,10)}}</h2>
                                    <img
                                        onclick="return false"
                                        :src="staticChatFriendObj.headimgurl?staticChatFriendObj.headimgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534938165134&di=f3ae0420c8c174149ac1c123230a28ed&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FJCRXU6oUw5s17jKllv9icrTmXvozYWQDeWFhKgEXbYeR9JOEKkrWLjibU7a7FAbsBHibVKca5wWzEiaXHWSgaSlgbA%2F640%3Fwx_fmt%3Dpng'"
                                        alt
                                        class="avatar"
                                        v-if="item.friend"
                                    />
                                    <img
                                        onclick="return false"
                                        :src="userInfo.headimgurl"
                                        alt
                                        class="avatar"
                                        v-else
                                    />
                                </div>
                                <div class="message_box">
                                    <span v-show="item.type===9" class="arrow"></span>
                                    <div
                                        class="message"
                                        style="word-break: break-all;height:1rem;padding:0"
                                        :style="{'width':item.voiceLenth}"
                                        v-if="item.type===9"
                                    >
                                        <div
                                            class="cricleplay"
                                            v-if="item.friend==1"
                                            @click="downLoadVoice(item.message,$event,index,item.chatMsgID,item.outOfDate)"
                                        >
                                            <div class="vocieDuration">{{item.vocieDuration}}''</div>
                                            <div class="small first"></div>
                                            <div class="middle stopanimate"></div>
                                            <div class="large stopanimate"></div>
                                            <!-- <img v-if="item.outOfDate" src="../../assets/image/outdate.png" class="outDate" alt=""> -->
                                        </div>
                                        <div
                                            class="cricleplay"
                                            v-else
                                            @click="downLoadVoice(item.message,$event,index,item.chatMsgID,item.outOfDate)"
                                        >
                                            <!-- :class="{stopanimate:!(index==activeVoiceIndex)}" -->
                                            <div class="vocieDuration">''{{item.vocieDuration}}</div>
                                            <div class="large stopanimate"></div>
                                            <div class="middle stopanimate"></div>
                                            <div class="small first"></div>
                                        </div>
                                    </div>
                                    <div class="dot" v-if="item.friend &&!item.vocieUnread"></div>
                                    <img
                                        v-if="item.outOfDate"
                                        src="../../assets/image/outdate.png"
                                        class="outDate"
                                        alt
                                    />
                                </div>
                            </div>
                            <div v-if="item.type==2" class="message_wrapper">
                                <div class="person_box">
                                    <h2
                                        class="name"
                                    >{{item.time.slice(8,10)==today?item.time.slice(11):item.time.slice(5,10)}}</h2>
                                    <img
                                        :src="staticChatFriendObj.headimgurl"
                                        alt
                                        class="avatar"
                                        v-if="item.friend"
                                    />
                                    <img :src="userInfo.headimgurl" alt class="avatar" v-else />
                                </div>
                                <div class="message_box" v-viewer>
                                    <span
                                        v-show="item.type===2"
                                        class="arrow"
                                        style="background:none"
                                    ></span>
                                    <img
                                        :src="item.message"
                                        @load="onImgLoaded"
                                        alt
                                        class="messRecordPic"
                                        ref="picture"
                                    />
                                </div>
                            </div>
                            <div v-else-if="item.type==3 || item.type==8" class="gift_wrapper">
                                <p class="giftRecord_time">{{item.time}}</p>
                                <div>
                                    <div v-if="item.isHandled">
                                        <div v-if="item.from==userInfo.openid">
                                            <p
                                                v-if="item.chatExtMsg.type==0"
                                                class="giftRecord_test received"
                                            >{{staticChatFriendObj.nickname}}{{item.isAgree?"收到实物礼品~存入卡券包~到店领取":"无功不受禄，不好意思收礼"}}</p>
                                            <p
                                                v-else-if="item.chatExtMsg.type==1"
                                                class="giftRecord_test received"
                                            >{{staticChatFriendObj.nickname}}{{item.isAgree?"收到门店项目券,已存入卡券包,到店使用":"无功不受禄，不好意思收礼"}}</p>
                                            <p
                                                v-else
                                                class="giftRecord_test received"
                                            >{{staticChatFriendObj.nickname}}{{item.isAgree?"收礼并表谢意,虚拟礼品存入积分,见'积分明细'":"无功不受禄，不好意思收礼"}}</p>
                                        </div>
                                        <div v-else>
                                            <p
                                                v-if="item.chatExtMsg.type==0"
                                                class="giftRecord_test received"
                                            >{{userInfo.nickname}}{{item.isAgree?"收到实物礼品~存入卡券包~到店领取":"无功不受禄，不好意思收礼"}}</p>
                                            <p
                                                v-else-if="item.chatExtMsg.type==1"
                                                class="giftRecord_test received"
                                            >{{userInfo.nickname}}{{item.isAgree?"收到门店项目券,已存入卡券包,到店使用":"无功不受禄，不好意思收礼"}}</p>
                                            <p
                                                v-else
                                                class="giftRecord_test received"
                                            >{{userInfo.nickname}}{{item.isAgree?"收礼并表谢意,虚拟礼品存入积分，见'积分明细'":"无功不受禄，不好意思收礼"}}</p>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div>
                                            <div
                                                class="myGifoInfo"
                                                :class="{'friendPanel':item.friend,'minePanel':!item.friend}"
                                                v-if="item.from==userInfo.openid"
                                            >
                                                <p
                                                    class="giftRecord_test giftText"
                                                >{{item.isBeFriendModel?"恭喜成为好友,店长":userInfo.nickname}}送{{staticChatFriendObj.nickname}}一份精美礼物</p>
                                                <div class="gift">
                                                    <div class="giftImg">
                                                        <img
                                                            onclick="return false"
                                                            v-if="item.chatExtMsg.image"
                                                            :src="item.chatExtMsg.image"
                                                            alt
                                                        />
                                                        <img
                                                            onclick="return false"
                                                            class="giftImg"
                                                            v-else-if="item.name==='beer'"
                                                            src="../../assets/image/beer.png"
                                                            alt
                                                        />
                                                        <img
                                                            onclick="return false"
                                                            class="giftImg"
                                                            v-else-if="item.name==='flower'"
                                                            src="../../assets/image/flower.png"
                                                            alt
                                                        />
                                                        <img
                                                            onclick="return false"
                                                            class="giftImg"
                                                            v-else-if="item.name==='house'"
                                                            src="../../assets/image/car.jpg"
                                                            alt
                                                        />
                                                        <img
                                                            onclick="return false"
                                                            class="giftImg"
                                                            v-else-if="item.name==='car'"
                                                            src="../../assets/image/boat.jpg"
                                                            alt
                                                        />
                                                    </div>
                                                    <div class="giftDesc">
                                                        <p class="giftName">{{item.chatExtMsg.name}}</p>
                                                        <p
                                                            class="giftIntegral"
                                                        >{{item.chatExtMsg.integral?item.chatExtMsg.integral:item.chatExtMsg.money}}积分</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="myGifoInfo"
                                                :class="{'friendPanel':item.friend,'minePanel':!item.friend}"
                                                v-else
                                            >
                                                <p
                                                    class="giftRecord_test giftText"
                                                >{{item.isBeFriendModel?"恭喜成为好友,店长":staticChatFriendObj.nickname}}送{{userInfo.nickname}}一份精美礼物</p>
                                                <div class="gift">
                                                    <div class="giftImg">
                                                        <img
                                                            onclick="return false"
                                                            v-if="item.chatExtMsg.image"
                                                            :src="item.chatExtMsg.image"
                                                            alt
                                                        />
                                                        <img
                                                            onclick="return false"
                                                            class="giftImg"
                                                            v-else-if="item.name==='beer'"
                                                            src="../../assets/image/beer.png"
                                                            alt
                                                        />
                                                        <img
                                                            onclick="return false"
                                                            class="giftImg"
                                                            v-else-if="item.name==='flower'"
                                                            src="../../assets/image/flower.png"
                                                            alt
                                                        />
                                                        <img
                                                            onclick="return false"
                                                            class="giftImg"
                                                            v-else-if="item.name==='house'"
                                                            src="../../assets/image/car.jpg"
                                                            alt
                                                        />
                                                        <img
                                                            onclick="return false"
                                                            class="giftImg"
                                                            v-else-if="item.name==='car'"
                                                            src="../../assets/image/boat.jpg"
                                                            alt
                                                        />
                                                    </div>
                                                    <div class="giftDesc">
                                                        <p class="giftName">{{item.chatExtMsg.name}}</p>
                                                        <p
                                                            class="giftIntegral"
                                                        >{{item.chatExtMsg.integral?item.chatExtMsg.integral:item.chatExtMsg.money}}积分</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p
                                                        v-if="!item.isBeFriendModel"
                                                        class="giftRecord_test giftText"
                                                    >
                                                        <span
                                                            @click="respondForGift(item,false,item.isBeFriendModel)"
                                                            class="no"
                                                        >拒收</span>
                                                        <span
                                                            @click="respondForGift(item,true,item.isBeFriendModel)"
                                                            class="yes"
                                                        >感谢</span>
                                                    </p>
                                                    <!-- <p v-else class="giftRecord_test giftText"><span @click="gotoGiftDetail" class="yes">查看</span></p> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="item.type==4" class="gift_wrapper">
                                <p class="giftRecord_time">{{item.time}}</p>
                                <div>
                                    <div v-if="item.isHandled">
                                        <p
                                            v-if="item.from==userInfo.openid"
                                            class="giftRecord_test received"
                                        >{{staticChatFriendObj.nickname}}{{item.isAgree?"应战了大话骰游戏":"免战大话骰比赛，改天有空再玩"}}</p>
                                        <p
                                            v-else
                                            class="giftRecord_test received"
                                        >{{userInfo.nickname}}{{item.isAgree?"应战了大话骰游戏":"免战大话骰比赛，改天有空再玩"}}</p>
                                    </div>
                                    <div v-else>
                                        <div>
                                            <p
                                                v-if="item.from==userInfo.openid"
                                                class="giftRecord_test no_received"
                                            >{{userInfo.nickname}}约{{staticChatFriendObj.nickname}}玩一把游戏</p>
                                            <p v-else class="giftRecord_test no_received">
                                                {{staticChatFriendObj.nickname}}约{{userInfo.nickname}}玩一把游戏
                                                <span
                                                    @click="rejectForGame(item)"
                                                    class="noGame"
                                                >免战</span>
                                                <span
                                                    @click="respondForGame(item)"
                                                    class="yesGame"
                                                >应战</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </scroll>
                <!-- div class="loading-container" v-show="isLoading">
                                   <loading></loading>
                </div>-->
            </div>
            <div ref="input_wrapper" class="input_wrapper">
                <div class="input_area clearfix">
                    <img
                        class="voiceIcon"
                        v-show="!isvoice"
                        @click="toggleVoice"
                        src="../../assets/image/microphone.png"
                        alt
                    />
                    <img
                        class="voiceIcon"
                        v-show="isvoice"
                        @click="toggleVoice"
                        src="../../assets/image/write.png"
                        alt
                    />
                    <div
                        v-show="isvoice"
                        class="send_message btn"
                        @touchstart="touchstart()"
                        @touchend="touchend"
                        @touchcancel="touchcancel"
                    >按住 说话</div>
                    <input
                        v-show="!isvoice"
                        type="text"
                        ref="sendInputRef"
                        placeholder="请输入..."
                        id="send_message"
                        class="send_message"
                        @focus="inputFocus"
                        v-model="input_value"
                    />
                    <div
                        @click="send"
                        ref="sendBtn"
                        class="action_box clearfix"
                        :class="{active:flag}"
                    >
                        <img src="../../assets/image/plane.png" alt class="icon_plane fl" />
                        <span class="send fl" ref="send">发送</span>
                    </div>
                </div>
                <div class="select_area">
                    <ul class="selectList clearfix">
                        <li class="item fl" @click="show_emotion">
                            <img
                                onclick="return false"
                                src="../../assets/image/chat_emotion.png"
                                alt
                            />
                        </li>
                        <li class="item fl" @click="show_expression">
                            <img
                                onclick="return false"
                                src="../../assets/image/message_chat.png"
                                alt
                            />
                        </li>
                        <li class="item fl" @click="showToastGift">
                            <img onclick="return false" src="../../assets/image/chat_gift.png" alt />
                        </li>
                        <li class="item fl">
                            <img onclick="return false" src="../../assets/image/chat_pic.png" alt />
                            <input
                                type="file"
                                class="file"
                                accept="image/*"
                                @change="uploadImage"
                            />
                        </li>
                        <li class="item fl" @click="laHei(true)">
                            <img onclick="return false" src="../../assets/image/hei.png" alt />
                        </li>
                        <li class="item fl" @click="playGame" style="padding:.06rem">
                            <img
                                onclick="return false"
                                src="../../assets/image/game.png"
                                alt
                                class="game"
                                style="width:0.8069rem;height:0.8067rem"
                            />
                        </li>
                    </ul>
                </div>
                <div class="emotion_area" v-if="emotionShow">
                    <swiper :auto="false" height="130px" :show-dots="false">
                        <swiper-item class="black">
                            <grid :show-vertical-dividers="true" :cols="8">
                                <div
                                    @click="selectEmtion(item.name)"
                                    :key="index"
                                    v-for="(item,index) in emotionList"
                                    class="vux-center-h"
                                    style="box-sizing:border-box;display:inline-block;padding:0.2rem 0.2rem"
                                >
                                    <img onclick="return false" :src="item.num" alt />
                                </div>
                            </grid>
                        </swiper-item>
                    </swiper>
                </div>
                <!-- 常用语 -->
                <div class="expression_wrapper" v-if="expressionShow">
                    <ul class="expressList">
                        <li
                            class="item vux-1px-b"
                            v-for="(item,index) in expressionList"
                            :key="index"
                            @click="addExpress(item)"
                        >{{item}}</li>
                    </ul>
                </div>
            </div>
            <div class="voicing" v-show="isVoicing">
                <img class="voicing-micro" src="../../assets/image/micro_icon.png" alt />
                <p class="voicing-text">正在录音...</p>
            </div>
            <!-- 删除警告 -->
            <transition name="appear">
                <div class="warning_bg" v-show="showLaHeiPanel">
                    <div class="warning_wrapper">
                        <p class="warningText">确定拉黑好友吗</p>
                        <div class="btnBox">
                            <button class="yes" @click="quitFriend">确定</button>
                            <button class="no" @click="laHei(false)">取消</button>
                        </div>
                    </div>
                </div>
            </transition>
            <!-- 信封弹框 -->
            <transition name="appear">
                <envelope v-show="isShowEnvelope" :text="envelopeText"></envelope>
            </transition>
            <qrCode v-show="qrIsShow" title="您还不是会员,关注享有会员特权"></qrCode>
            <keep-alive>
                <topUp
                    v-show="isGiftPanel"
                    @closeIntegralPanel="closeIntegralPanel"
                    :friendId="friendId"
                    :fatherPanelIndex="fatherPanelIndex"
                ></topUp>
            </keep-alive>
        </div>
    </transition>
</template>

<script type='text/ecmascript-6'>
import envelope from "base/envelope/envelope";
import loading from "../../base/loading/loading";
import qrCode from "base/qrCode/qrCode";
import topUp from "base/topUp/topUp";
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
    Popup
} from "vux";
import Scroll from "../../base/scroll/scroll.vue";
import Url from "../../common/config.js";
import api from "common/api.js";
import util from "common/util.js";
import Bus from "common/bus.js";
// import EXIF from "common/exif.js";
import { mapState, mapMutations, mapGetters } from "vuex";
import lrz from "lrz";
import { setTimeout, clearTimeout } from "timers";
export default {
    directives: {
        TransferDom,
        focus: function(el) {
            el.focus();
        }
    },
    data() {
        return {
            thumbCount: 0, //员工评价点赞次数
            times: 0,
            vocieDuration: 0, //语音时长
            activeVoiceIndex: null,
            isVoicing: false,
            isvoice: false,
            alreadyClientListCursor: 0, //拉取客服信息游标
            isStaffOrClient: false,
            sendingTimes: 0,
            isShowEnvelope: false, //信封弹框判断
            envelopeText: "", //信封弹框内容
            showPreview: false,
            scrollHeight: 0,
            // scrollToDomElement: "",
            pullDownRefresh: true,
            expressionShow: false,
            fatherPanelIndex: 1,
            isGiftPanel: false,
            friendId: "",
            showLaHeiPanel: false,
            expressionList: [
                "您好，很高兴可以成为好朋友",
                "过来喝一杯？",
                "约定好了，准时见面，不见不散",
                "玩一把游戏？"
            ],
            // showToast_gift: false,
            show: false,
            showTab: true,
            emotionShow: false,
            actionShow: false,
            flag: false,
            input_value: "",
            autofocus: false,
            emotionList: [
                // {
                //   name: "[微笑]",
                //   num: "/static/face/1.gif"
                // },
                // {
                //   name: "[色]",
                //   num: "/static/face/2.gif"
                // },
                {
                    name: "[大哭]",
                    num: "/static/face/3.gif"
                },
                {
                    name: "[嘻嘻]",
                    num: "/static/face/4.gif"
                },
                // {
                //   name: "[偷笑]",
                //   num: "/static/face/5.gif"
                // },
                // {
                //   name: "[大笑]",
                //   num: "/static/face/6.gif"
                // },
                {
                    name: "[晕]",
                    num: "/static/face/7.gif"
                },
                {
                    name: "[再见]",
                    num: "/static/face/8.gif"
                },
                // {
                //   name: "[抠鼻]",
                //   num: "/static/face/9.gif"
                // },
                // {
                //   name: "[委屈]",
                //   num: "/static/face/10.gif"
                // },
                // {
                //   name: "[抱抱]",
                //   num: "/static/face/11.gif"
                // },
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
                // {
                //   name: "[亲亲]",
                //   num: "/static/face/17.gif"
                // },
                // {
                //   name: "[难过]",
                //   num: "/static/face/18.gif"
                // }
            ],
            chatListIndex: 0,
            componentChatList: [],
            isscroll: true,
            dontFocus: true,
            isShowSoulPanel: false,
            myShareUrl: "",
            voiceLocalId: "",
            voiceServerId: "",
            messageType: 1,
            warning: false
            // isLoading: false
        };
    },
    // beforeRouteLeave(to, from, next) {
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
    created() {
        this.listenScroll = true;
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
        // this._initJssdk(this.myShareUrl)
    },
    activated() {
        let _url = window.location.href;
        if (util.isAndroid()) {
            this.myShareUrl = _url.split("#")[0];
        } else {
            this.myShareUrl = window.iosSignUrl;
        }
        console.log("this.myShareUrl-----", this.myShareUrl);
        this._initJssdk(this.myShareUrl);
        this.loadStaffCommentInfo(this.staticChatFriendObj.phone);
        console.log(
            "this.staticChatFriendObj-----------",
            this.staticChatFriendObj
        );
        if (!localStorage.getItem("friendInfo")) {
            //解决微信内置浏览器刷新获得好友信息
            localStorage.setItem(
                "friendInfo",
                JSON.stringify(this.staticChatFriendObj)
            );
        } else {
            let friendInfo = JSON.parse(localStorage.getItem("friendInfo"));
            this.setChatFriend(friendInfo);
        }
        this.sendingTimes = sessionStorage.getItem(
            this.staticChatFriendObj.openid
        )
            ? sessionStorage.getItem(this.staticChatFriendObj.openid)
            : 0; //获取发送给当前好友信息次数
        if (!(JSON.stringify(this.$route.query) === "{}")) {
            this.setChatFriend(this.$route.query.info);
        }
        //console.log(this.$route);
        this.friendId = this.$route.params.id;
        if (this.$route.params.isSoul) {
            this.isShowSoulPanel = true;
        }
        this._getChatList(); //前端获取聊天记录
        this._loadAllGift(); //获取礼物
        Bus.$on("VirtualGiftInfo", giftInfo => {
            //console.log("聊天页面bus的虚拟礼物--------", giftInfo);
            this.componentChatList.push({
                time: util.timestampToTime(new Date().getTime()),
                isHandled: false,
                friend: 0,
                type: 3,
                from: this.userInfo.openid,
                chatExtMsg: {
                    image: giftInfo.imgUrl,
                    name: giftInfo.name,
                    integral: giftInfo.money
                }
            });
        });
        Bus.$on("giftInfoRecomend", giftInfo => {
            //console.log("聊天页面bus的实体推荐礼物--------", giftInfo);
            this.componentChatList.push({
                time: util.timestampToTime(new Date().getTime()),
                isHandled: false,
                friend: 0,
                type: 3,
                from: this.userInfo.openid,
                chatExtMsg: {
                    image: giftInfo.goods.image,
                    name: giftInfo.goods.name,
                    integral: giftInfo.goods.integral
                }
            });
        });
        Bus.$on("giftInfoJiFen", giftInfo => {
            //console.log("聊天页面bus的实体积分礼物--------", giftInfo);
            this.componentChatList.push({
                time: util.timestampToTime(new Date().getTime()),
                isHandled: false,
                friend: 0,
                type: 3,
                from: this.userInfo.openid,
                chatExtMsg: {
                    image: giftInfo.goods.image,
                    name: giftInfo.goods.name,
                    integral: giftInfo.goods.integral
                }
            });
        });
        this.isVip = this.$route.params.isVip; //贵宾通知标识
    },
    deactivated() {
        wx.stopVoice({
            localId: this.voiceLocalId // 停止正在播放的语音
        });
        Bus.$off();
        sessionStorage.setItem(
            this.staticChatFriendObj.openid,
            this.sendingTimes
        ); //保存对应好友发送信息次数
        //console.log("this.$route-deactivated", this.$route)
        if (this.$route.name != "comment") {
            this.setChatFriend({}); //清除vuex里面保存的聊天好友对象
        }
        localStorage.removeItem("friendInfo"); //清除缓存中对应的好友信息，避免每次进入聊天页面都是同一个好友
        this.endCursor = null;
        this.componentChatList = [];
        let cursor = 0;
        this.changeCursor(cursor);
        this.showLaHeiPanel = false;
    },
    computed: {
        ...mapState([
            "userInfo",
            "staticChatFriendObj",
            "l98Setting",
            "inputValue",
            "socket",
            "alreadyFriendListcursor",
            "giftList",
            "shareUrl"
        ]),
        ...mapGetters(["qrIsShow", "LastChatMsg"])
    },
    methods: {
        hasClass(element, className) {
            var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
            return element.className.match(reg);
        },
        addClass(element, className) {
            if (!this.hasClass(element, className)) {
                element.className += " " + className;
            }
        },
        removeClass(element, className) {
            if (this.hasClass(element, className)) {
                var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
                element.className = element.className.replace(reg, " ");
            }
        },
        // 拉取员工评价内容
        loadStaffCommentInfo(phone) {
            api.loadStaffCommentInfo(phone).then(res => {
                //console.log("员工评价内容---", res);
                if (res.errCode === 0) {
                    this.thumbCount = res.staffCommentInfo.thumbCount;
                } else {
                    this.$vux.toast.show({
                        text: res.errMsg
                    });
                }
                //console.log("this.staffCommentInfo------", this.thumbCount);
            });
        },
        //去评价
        goToComment(phone) {
            this.$router.push({
                name: `comment`,
                params: {
                    phone: phone
                }
            });
        },
        toggleVoice() {
            this.isvoice = !this.isvoice;
            if (this.isvoice == true) {
                this.messageType = 9;
                // wx.startRecord({
                //   cancel: function() {
                //     alert("拒绝授权录音,暂无法语音聊天");
                //   }
                // });
            } else {
                this.messageType = 1;
            }
            //console.log("this.messageType", this.messageType);
        },
        _initJssdk(url) {
            if (util.isAndroid()) {
                let url = window.location.href.split("#")[0];
                util._getJssdkConfig(url);
            }
            wx.startRecord({
                success: function() {
                    localStorage.rainAllowRecord = "true";
                    setTimeout(() => {
                        wx.stopRecord({});
                    }, 500);
                },
                cancel: function() {
                    alert("拒绝授权录音,暂无法语音聊天");
                }
            });
        },
        touchcancel() {
            //console.log("touch cancel")
            this.isVoicing = false;
            wx.stopRecord({});
            clearInterval(this.vocieDurationTimer);
            clearTimeout(this.timer);
        },
        touchstart() {
            var _this = this;
            wx.stopVoice({
                localId: this.voiceLocalId // 停止正在播放的语音
            });
            wx.startRecord({
                success: function() {
                    // _this.isVoicing = false;
                    // wx.stopRecord({});
                },
                cancel: function() {
                    _this.isVoicing = false;
                    wx.stopRecord({});
                }
            });
            let nodeList = this.$refs.chatList.childNodes;
            var element;
            // //console.log("nodelist---", nodeList);
            for (let i = 0; i < nodeList.length; i++) {
                let messageType = nodeList[i].dataset.messagetype;
                if (messageType === "9") {
                    element =
                        nodeList[i].children[0].children[1].children[1]
                            .children[0];
                    // //console.log("element", element)
                    this.addClass(element.children[1], "stopanimate");
                    this.addClass(element.children[2], "stopanimate");
                    this.addClass(element.children[3], "stopanimate");
                }
            }
            this.isVoicing = true;
            this.vocieDurationTimer = setInterval(() => {
                this.vocieDuration++;
                //console.log("setInterval", this.vocieDuration);
            }, 1000);
            this.timer = setTimeout(() => {
                clearInterval(this.vocieDurationTimer);
                wx.stopRecord({
                    success: function(res) {
                        _this.voiceLocalId = res.localId;
                        wx.uploadVoice({
                            localId: _this.voiceLocalId, // 需要上传的音频的本地ID，由stopRecord接口获得
                            isShowProgressTips: 0, // 默认为1，显示进度提示
                            success: function(res) {
                                _this.voiceServerId = res.serverId; // 返回音频的服务器端ID
                                _this.send();
                            }
                        });
                    }
                });
                this.vocieDuration = 59;
                this.isVoicing = false;
            }, 59000);
        },
        touchend() {
            this.isVoicing = false;
            //console.log("录音时间---", this.vocieDuration);
            clearInterval(this.vocieDurationTimer);
            clearTimeout(this.timer);
            if (this.vocieDuration < 1) {
                // this.$vux.toast.text("录音时间过短", "middle");
                wx.stopRecord({});
                this.warning = true;
                clearTimeout(this.warningTimer);
                this.warningTimer = setTimeout(() => {
                    this.warning = false;
                }, 1000);
                this.vocieDuration = 0;
                this.isVoicing = false;
                return;
            }
            var _this = this;
            wx.stopRecord({
                success: function(res) {
                    //console.log("res.localId----", res.localId);
                    _this.voiceLocalId = res.localId;
                    //console.log("wx.stopRecord-voiceLocalId", _this.voiceLocalId);
                    wx.uploadVoice({
                        localId: _this.voiceLocalId, // 需要上传的音频的本地ID，由stopRecord接口获得
                        isShowProgressTips: 0, // 默认为1，显示进度提示
                        success: function(res) {
                            _this.voiceServerId = res.serverId; // 返回音频的服务器端ID
                            //console.log("wx.uploadVoice-voiceServerId", _this.voiceServerId);
                            _this.send();
                        }
                    });
                },
                fail: function(res) {
                    //console.log("wx.stopRecord fail---", res);
                }
            });
        },
        downLoadVoice(downId, e, index, voiceMsgID, outOfDate) {
            if (outOfDate) {
                this.$vux.toast.text("录音已过期", "middle");
                return;
            }
            // //console.log("e---", e);
            var nodeList = this.$refs.chatList.childNodes;
            var element;
            var target =
                nodeList[index].children[0].children[1].children[1].children[0];
            for (var i = 0; i < nodeList.length; i++) {
                var messageType = nodeList[i].dataset.messagetype;
                var vocieUnread = nodeList[i].dataset.vocieunread;
                var friend = nodeList[i].dataset.friend;
                // //console.log("messageType--",messageType)
                // //console.log("vocieUnread--",vocieUnread)
                // //console.log("friend--",friend)
                if (messageType == "9") {
                    element =
                        nodeList[i].children[0].children[1].children[1]
                            .children[0];
                    this.addClass(element.children[1], "stopanimate");
                    this.addClass(element.children[2], "stopanimate");
                    this.addClass(element.children[3], "stopanimate");
                }
            }
            api.setVoiceRead(voiceMsgID).then(res => {
                //console.log("设置语音已读--", res);
                this.componentChatList[index].vocieUnread = true;
            });
            var _this = this;
            wx.stopVoice({
                localId: _this.voiceLocalId // 需要停止的音频的本地ID，由stopRecord接口获得
            });
            wx.downloadVoice({
                serverId: downId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
                isShowProgressTips: 0, // 默认为1，显示进度提示
                success: function(res) {
                    _this.voiceLocalId = res.localId; // 返回音频的本地ID
                    //console.log("wx.downloadVoice--res", res);
                    // setInterval(() => {
                    //   _this.times ++
                    //   wx.playVoice({
                    //     localId: _this.voiceLocalId, // 需要播放的音频的本地ID，由stopRecord接口获得
                    //     success: function(res) {
                    //       //console.log("playVoice success----", res)
                    //     },
                    //     fail: function(res) {
                    //       //console.log("playVoice failed----", res)
                    //     }
                    //   });
                    //   //console.log("this.times -------",_this.times)
                    // }, 4000);
                    wx.playVoice({
                        localId: _this.voiceLocalId, // 需要播放的音频的本地ID，由stopRecord接口获得
                        success: function(res) {
                            //console.log("playVoice success----", res);
                        },
                        fail: function(res) {
                            //console.log("playVoice failed----", res);
                        }
                    });
                    // //console.log("e---", e);
                    _this.removeClass(target.children[1], "stopanimate");
                    _this.removeClass(target.children[2], "stopanimate");
                    _this.removeClass(target.children[3], "stopanimate");
                    wx.onVoicePlayEnd({
                        success: function(res) {
                            var localId = res.localId; // 返回音频的本地ID
                            //console.log("播放完毕localId---", localId);
                            _this.addClass(target.children[1], "stopanimate");
                            _this.addClass(target.children[2], "stopanimate");
                            _this.addClass(target.children[3], "stopanimate");
                        }
                    });
                },
                fail: function(res) {
                    this.$vux.toast.text("录音已过期", "middle");
                    //console.log("下载语音失败---", res);
                }
            });
        },
        //查看礼物详情
        gotoGiftDetail() {
            this.$router.push({
                name: "giftDetail"
            });
        },
        //接受或拒绝礼物
        respondForGift(giftInfo, flag, isSysSendGift) {
            //console.log("giftInfo----------------", giftInfo);
            let giftParam = {
                agree: flag, //是否接受
                recordID: giftInfo.recordID, //送礼记录ID
                fromID: giftInfo.from, //赠送者
                respondType: giftInfo.msgType, //记录的礼物类型  0是虚拟礼物、1是店长推荐和商城礼品
                chatMsgID: giftInfo.chatMsgID,
                isSysSendGift: isSysSendGift ? true : false
            };
            //console.log("giftParam------------", giftParam);
            api.respondForGift(giftParam).then(res => {
                //console.log("送礼操作结果-------------------", res);
                if (res.errCode == 0) {
                    if (flag) {
                        setTimeout(() => {
                            if (!this.userInfo.isSubscribe) {
                                this.changeQrCodeText({
                                    title: "长按关注，每天获签到积分及更多特权",
                                    bottomText:
                                        "会员特权:领福利、交群友、参活动"
                                });
                                this.showQrcode(true);
                            }
                        }, 1000);
                    }
                    this.componentChatList.forEach(item => {
                        if (giftParam.chatMsgID == item.chatMsgID) {
                            item.isHandled = true;
                            if (giftParam.agree) {
                                item.isAgree = true;
                            } else {
                                item.isAgree = false;
                            }
                        }
                        this.$refs.listView.refresh();
                    });
                }
            });
        },
        //接受游戏
        respondForGame(gameInfo) {
            //console.log("gameInfo-----------", gameInfo);
            let params = {
                agree: true, //是否接受
                combatID: gameInfo.combatID,
                fromID: gameInfo.from,
                chatMsgID: gameInfo.chatMsgID,
                isAgainPlay: false
            };
            if (gameInfo.combatID) {
                //约战
                api.responseCombat(params).then(res => {
                    //console.log(res);
                    if (res.errCode == 0) {
                        //console.log("删除结果-----------", res);
                        window.location.href = gameInfo.url;
                    }
                });
            } else {
                //应战
                window.location.href = gameInfo.url;
            }
        },
        //拒绝游戏
        rejectForGame(gameInfo) {
            //console.log("gameInfo0-----------", gameInfo);
            let params = {
                agree: false, //是否接受
                combatID: gameInfo.combatID,
                fromID: gameInfo.from,
                chatMsgID: gameInfo.chatMsgID,
                isAgainPlay: false
            };
            //console.log(params);
            api.responseCombat(params).then(res => {
                //console.log(res);
                if (res.errCode == 0) {
                    this.componentChatList.forEach(item => {
                        if (params.chatMsgID == item.chatMsgID) {
                            item.isHandled = true;
                            if (params.agree) {
                                item.isAgree = true;
                            } else {
                                item.isAgree = false;
                            }
                        }
                    });
                    this.$refs.listView.refresh();
                    //console.log("删除结果-----------", res);
                }
            });
        },
        laHei(flag) {
            this.showLaHeiPanel = flag;
        },
        //删除好友
        quitFriend() {
            api.quitFriend(this.staticChatFriendObj.openid).then(res => {
                //console.log("删除结果-------", res);
                this.$router.push({
                    name: "message",
                    query: {
                        routeParamNum: 0
                    }
                });
            });
        },
        //监听充值面板状态
        closeIntegralPanel(flag) {
            //console.log("面板状态-----------", flag);
            this.isGiftPanel = flag;
        },
        //约战
        playGame() {
            this.isShowEnvelope = true;
            this.envelopeText = "您已发出邀请  等待对方的回应";
            api.sentPlayGameMsg(this.friendId).then(res => {
                console.log("约战返回--------", res);
                if (res.errCode == 0) {
                    // this.text = "您已发出邀请  等待对方的回应";
                    this.componentChatList.push({
                        time: util.timestampToTime(new Date().getTime()),
                        isHandled: false,
                        type: 4,
                        from: this.userInfo.openid
                    });
                    setTimeout(() => {
                        this.isShowEnvelope = false;
                    }, 2000);
                } else if (res.errCode == 1023) {
                    this.showQrcode(true);
                } else if (res.errCode == 1089) {
                    this.$vux.toast.text(
                        "每天限20次约战机会。当天已用完，明天再来",
                        "middle"
                    );
                }
            });
        },
        onImgLoaded() {
            //console.log("图片加载完成了");
            this.$refs.listView.refresh();
        },
        // 选择表情
        selectEmtion(item) {
            this.input_value += item;
        },
        //获取礼物列表
        _loadAllGift() {
            api.loadAllGift().then(res => {
                if (res.errCode === 0) {
                    this.getGiftList(res.gifts);
                }
            });
        },
        blurAdjust() {
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
        _handleVoiceLength(voiceL) {
            var voiceLength = "";
            if (voiceL < 10) {
                voiceLength = "1.8rem";
            } else if (voiceL >= 10 && voiceL <= 40) {
                voiceLength = "2.5rem";
            } else if (voiceL > 40) {
                voiceLength = "3.5rem";
            }
            return voiceLength;
        },
        _handleChatList(item, nowTime) {
            var outOfDate = nowTime - item.stime > 259200; //判断是否大于3天
            var voiceLength = this._handleVoiceLength(item.vocieDuration);
            var tempObj = {
                outOfDate: outOfDate,
                voiceLenth: voiceLength,
                vocieDuration: item.vocieDuration,
                vocieUnread: outOfDate ? true : item.vocieUnread,
                message: item.content,
                friend: item.from === this.staticChatFriendObj.openid ? 1 : 0, //1为朋友，0为自己,
                type: item.type,
                time: util.timestampToTime(item.stime),
                chatExtMsg: item.type == 3 ? item.chatExtMsg.extMsg : "",
                isBeFriendModel: item.chatExtMsg
                    ? item.chatExtMsg.isBeFriendModel
                        ? item.chatExtMsg.isBeFriendModel
                        : false
                    : false,
                from: item.from,
                chatMsgID: item.id,
                isAgree: item.chatExtMsg ? item.chatExtMsg.isAgree : "",
                isHandled: item.chatExtMsg ? item.chatExtMsg.isHandled : "",
                msgType: item.chatExtMsg ? item.chatExtMsg.msgType : "",
                couponID: item.chatExtMsg
                    ? item.chatExtMsg.extMsg
                        ? item.chatExtMsg.extMsg.couponID
                        : ""
                    : "",
                recordID: item.chatExtMsg
                    ? item.chatExtMsg.extMsg
                        ? item.chatExtMsg.extMsg.recordID
                        : ""
                    : "",
                name: item.chatExtMsg
                    ? item.chatExtMsg.extMsg
                        ? item.chatExtMsg.extMsg.name
                        : ""
                    : "",
                combatID: item.chatExtMsg
                    ? item.chatExtMsg.extMsg
                        ? item.chatExtMsg.extMsg.combatID
                        : ""
                    : "",
                inviterID: item.chatExtMsg
                    ? item.chatExtMsg.extMsg
                        ? item.chatExtMsg.extMsg.inviterID
                        : ""
                    : "",
                url: item.chatExtMsg
                    ? item.chatExtMsg.extMsg
                        ? item.chatExtMsg.extMsg.url
                        : ""
                    : ""
            };
            return tempObj;
        },
        //获取好友聊天消息记录列表
        _getChatList() {
            let cursor = this.alreadyFriendListcursor;
            api.getFriendMessList(cursor, this.staticChatFriendObj.openid)
                .then(res => {
                    return new Promise((resolve, reject) => {
                        //console.log("好友聊天信息---------", res);
                        this.changeCursor(res.cursor);
                        let resultMessList = res.messages;
                        var nowTime = Math.round(new Date().getTime() / 1000);
                        var i;
                        for (i = resultMessList.length - 1; i >= 0; i--) {
                            let item = resultMessList[i];
                            var chatObj = this._handleChatList(item, nowTime);
                            this.componentChatList.push(chatObj);
                        }
                        if (this.isVip) {
                            setTimeout(() => {
                                this.input_value =
                                    "亲，欢迎您！您是本店贵宾，有任何需要请@我";
                                this.send();
                            }, 300);
                        }
                        //console.log("聊天记录-------", this.componentChatList);
                        this.componentChatList.forEach(item => {
                            switch (
                                item.chatExtMsg ? item.chatExtMsg.name : ""
                            ) {
                                case "beer":
                                    item.chatExtMsg.name = "啤酒";
                                    break;
                                case "flower":
                                    item.chatExtMsg.name = "鲜花";
                                    break;
                                case "house":
                                    item.chatExtMsg.name = "别墅";
                                    break;
                                case "car":
                                    item.chatExtMsg.name = "邮轮";
                                    break;
                                default:
                                    break;
                            }
                        });
                        resolve();
                    });
                })
                .then(() => {
                    // //console.log(data)
                    this.$nextTick(function() {
                        //console.log("dom更新后执行");
                        let childNodes = this.$refs.chatList.childNodes;
                        let chatListHeight = 0;
                        childNodes.forEach(item => {
                            chatListHeight += item.clientHeight;
                        });
                        this.scrollHeight = chatListHeight;
                        //console.log("this.scrollHeight----------", this.scrollHeight);
                        this.$refs.listView.finishPullDown();
                        this.$refs.listView.refresh();
                        this.$refs.listView.scrollTo(0, -this.scrollHeight);
                    });
                });
        },
        //发送消息事件
        send() {
            //console.log("发送消息");
            this.isShowSoulPanel = false; //发消息隐藏灵魂匹配面板
            // if (util.isAndroid() && this.dontFocus) {  //输入后再次弹起键盘
            //   this.dontFocus = true;
            //   document.getElementById("send_message").focus();
            // }
            this.sendingTimes++;
            if (this.sendingTimes > 20) {
                this.$vux.toast.text("朋友一直未回复，稍后再发送吧", "middle");
                return;
            }
            //  this.blurAdjust();
            if (!this.input_value && !this.voiceServerId) {
                return;
            }
            // this.$refs.sendInputRef.focus()
            //字符串转表情icon
            var emotionArr = this.input_value.match(/\[.{1,2}\]/g);
            var reg = /\[.{1,2}\]/;
            if (emotionArr) {
                for (let i = 0; i < emotionArr.length; i++) {
                    for (var j = 0; j < this.emotionList.length; j++) {
                        if (
                            this.input_value.indexOf(
                                this.emotionList[j].name
                            ) !== -1
                        ) {
                            this.input_value = this.input_value.replace(
                                reg,
                                `<img src=${this.emotionList[j].num} style="vertical-align: -6px;">`
                            );
                        }
                    }
                }
            }
            var voiceLength = this._handleVoiceLength(this.vocieDuration);
            //把自己发送的内容加到聊天列表里面
            this.componentChatList.push({
                message:
                    this.messageType == 1
                        ? this.input_value
                        : this.voiceServerId,
                friend: 0,
                type: this.messageType,
                time: util.timestampToTime(new Date().getTime()),
                vocieUnread: true,
                vocieDuration: this.vocieDuration,
                voiceLenth: voiceLength
            });
            let messObj = {
                to: this.staticChatFriendObj.openid,
                content:
                    this.messageType == 1
                        ? this.input_value
                        : this.voiceServerId,
                type: this.messageType,
                vocieDuration: this.vocieDuration
            };
            let textMessObj = JSON.stringify(messObj);
            let decc1 = new TextEncoder("utf-8");
            let result = decc1.encode(textMessObj);
            api.postFriendMess(result).then(res => {
                this.emotionShow = false;
                this.expressionShow = false;
                this.vocieDuration = 0;
            });
            this.input_value = "";
            this.$nextTick(function() {
                let childNodes = this.$refs.chatList.childNodes;
                //   let chatListHeight = 0;
                //   childNodes.forEach(item => {
                //     chatListHeight += item.clientHeight;
                //   });
                //   this.scrollHeight = chatListHeight;
                this.$refs.listView.refresh();
                this.$refs.listView.scrollBy(
                    0,
                    -childNodes[0].clientHeight - 20
                );
            });
        },
        // 发送图片
        uploadImage(e) {
            if (e.target.files[0].type === "video/mp4") {
                this.$vux.toast.text(
                    "你所选的文件格式不符合，请重新选择",
                    "middle"
                );
                return;
            }
            this.sendingTimes++;
            if (this.sendingTimes > 3) {
                this.$vux.toast.text("朋友一直未回复，稍后再发送吧", "middle");
                return;
            }
            if (!e.target.files[0]) {
                return;
            }
            let vm = this;
            lrz(e.target.files[0], {
                quality: 0.1
            })
                .then(function(rst) {
                    if (rst.base64Len > 1024 * 1024 * 1) {
                        // vm.$toast("图片不能超过1MB");
                        //console.log("图片不能超过1MB");
                        return;
                    }
                    let filename = rst.origin.name;
                    let dataURL = rst.file;
                    api.postFriendPic(
                        vm.staticChatFriendObj.openid,
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
                            vm.$nextTick(function() {
                                let childNodes = vm.$refs.chatList.childNodes;
                                let chatListHeight = 0;
                                childNodes.forEach(item => {
                                    chatListHeight += item.clientHeight;
                                });
                                vm.scrollHeight = chatListHeight;
                                vm.$refs.listView.refresh();
                                // vm.$refs.listView.scrollBy(0, -childNodes[0].clientHeight-20);
                                //console.log();
                                vm.$refs.listView.scrollTo(
                                    0,
                                    -vm.scrollHeight - 10
                                );
                            });
                        })
                        .catch(err => {
                            //console.log(err);
                        });
                })
                .catch(function(err) {
                    vm.$toast("压缩图片失败");
                });
        },
        //展示大图片
        showBigPic(pic) {
            this.showPreview = true;
            let htmlImage = `<img src="${pic}" style="width:9rem;height:9rem;margin:25% auto;" class="preview-img"/>`;
            this.$refs.preview_pic.innerHTML = htmlImage;
            //console.log(pic);
        },
        //关闭展示图
        closePreview() {
            this.showPreview = false;
        },
        //下拉刷新
        pullingDown() {
            //console.log("下拉刷新");
            if (!this.alreadyFriendListcursor || this.endCursor == 0) {
                return;
            }
            let cursor = this.alreadyFriendListcursor;
            // this.isLoading = true;
            api.getFriendMessList(cursor, this.staticChatFriendObj.openid).then(
                res => {
                    //console.log(res);
                    if (!res.messages.length) {
                        //如果有新消息才更改游标
                        return;
                    }
                    this.endCursor = res.cursor;
                    this.changeCursor(res.cursor);
                    //this.isLoading = false; //加载loading
                    this.isscroll = false; //判断下拉刷新
                    let resultMessList = res.messages;
                    var nowTime = Math.round(new Date().getTime() / 1000);
                    var i;
                    for (i = resultMessList.length - 1; i >= 0; i--) {
                        let item = resultMessList[i];
                        var chatObj = this._handleChatList(item, nowTime);
                        this.componentChatList.unshift(chatObj);
                    }
                    this.$refs.listView.finishPullDown();
                    this.$refs.listView.scrollTo(0, 0, 1000);
                    this.$refs.listView.refresh();
                }
            );
        },
        getIndex(val) {
            // this.chatListIndex = val;
            // //console.log("getIndex--------------------------:", val);
        },
        //监听滚动
        myscroll(pos) {},
        tagScroll() {
            this.expressionShow = false;
            this.emotionShow = false;
            document.getElementById("send_message").blur();
        },
        //关闭送礼
        // close_gift() {
        //   this.showToast_gift = false;
        // },
        //返回
        goBack() {
            //console.log("stop-------------", this.voiceLocalId);
            wx.stopVoice({
                localId: this.voiceLocalId // 停止正在播放的语音
            });
            this.showLaHeiPanel = false;
            this.$router.go(-1);
        },
        //返回主页
        goHome() {
            this.$router.push({
                name: "home"
            });
        },
        //选择表情
        select_emotion(item) {
            //console.log(item);
            this.input_value += item;
        },
        //选择常用语
        addExpress(item) {
            this.input_value += item;
            this.dontFocus = false;
        },
        //展示送礼面板
        showToastGift() {
            //console.log("click");
            // this.showToast_gift = true;
            this.isGiftPanel = true;
            this.expressionShow = false;
            this.emotionShow = false;
        },
        //展示表情面板
        show_emotion() {
            this.messageType = 1;
            this.isvoice = false;
            this.emotionShow = !this.emotionShow;
            this.expressionShow = false;
        },
        //切换常用语
        show_expression() {
            this.messageType = 1;
            this.isvoice = false;
            this.expressionShow = !this.expressionShow;
            this.emotionShow = false;
        },
        onItemClick(index) {
            //console.log(index);
            if (index == 0) {
                this.showTab = true;
            } else {
                this.showTab = false;
            }
        },
        inputFocus() {
            setTimeout(() => {
                this.$refs.input_wrapper.scrollIntoView(false);
                this.$refs.chatWrapper.scrollIntoView(false);
            }, 200);
            this.dontFocus = true;
            this.emotionShow = false;
            this.expressionShow = false;
            // this.isscroll = true; //允许动态滚动到最底部记录
        },
        ...mapMutations({
            setChatFriend: "SET_CHAT_FRIEND", //全局设置聊天对象的信息
            // updateChatList: "UPDATE_CHATLIST",
            showQrcode: "SHOW_QRCODE", //二维码
            changeQrCodeText: "CHANGEQRCODETEXT",
            updateValue: "UPDATE_INPUTVALUE",
            changeCursor: "CHANGE_CURSOR",
            getGiftList: "GET_GIFTLIST" //获取礼物
        })
    },
    watch: {
        LastChatMsg: function(newValue) {
            this.isShowSoulPanel = false; //当有消息隐藏灵魂匹配面板
            console.log("在聊天页面收到对方发来的消息-------------------------------：",newValue);
            this.sendingTimes = 0; //清空限制连续发送消息次数
            let messageInfo = newValue.lastMsg;
            if (messageInfo.type == 3 || messageInfo.type == 4) {
                //如果是送礼和约战则不在聊天框显示
                return;
            }
            if (messageInfo.from == this.staticChatFriendObj.openid) {
                //判断是否是进入时原来的两个人进行聊天
                var voiceLength = this._handleVoiceLength(
                    messageInfo.vocieDuration
                );
                //console.log("推送时长----", voiceLength);
                var nowTime = Math.round(new Date().getTime() / 1000);
                var chatObj = this._handleChatList(messageInfo, nowTime);
                this.componentChatList.push(chatObj);
                // this.componentChatList.push({
                //   outOfDate: false,
                //   voiceLength: voiceLength,
                //   vocieDuration: messageInfo.vocieDuration,
                //   vocieUnread: messageInfo.vocieUnread,
                //   message: messageInfo.content ? messageInfo.content : "",
                //   friend: messageInfo.from === this.staticChatFriendObj.openid ? 1 : 0, //1为朋友，0为自己
                //   from: messageInfo.from,
                //   type: messageInfo.type, //1 聊天消息 2.图标，3.送礼，4.约战
                //   time: util.timestampToTime(messageInfo.stime),
                //   chatMsgID: messageInfo.id,
                //   isAgree: messageInfo.chatExtMsg ? messageInfo.chatExtMsg.isAgree : "",
                //   isHandled: messageInfo.chatExtMsg
                //     ? messageInfo.chatExtMsg.isHandled
                //     : "",
                //   msgType: messageInfo.chatExtMsg ? messageInfo.chatExtMsg.msgType : "",
                //   couponID: messageInfo.chatExtMsg
                //     ? messageInfo.chatExtMsg.extMsg
                //       ? messageInfo.chatExtMsg.extMsg.couponID
                //       : ""
                //     : "",
                //   recordID: messageInfo.chatExtMsg
                //     ? messageInfo.chatExtMsg.extMsg
                //       ? messageInfo.chatExtMsg.extMsg.recordID
                //       : ""
                //     : "",
                //   name: messageInfo.chatExtMsg
                //     ? messageInfo.chatExtMsg.extMsg
                //       ? messageInfo.chatExtMsg.extMsg.name
                //       : ""
                //     : "",
                //   combatID: messageInfo.chatExtMsg
                //     ? messageInfo.chatExtMsg.extMsg
                //       ? messageInfo.chatExtMsg.extMsg.combatID
                //       : ""
                //     : "",
                //   inviterID: messageInfo.chatExtMsg
                //     ? messageInfo.chatExtMsg.extMsg
                //       ? messageInfo.chatExtMsg.extMsg.inviterID
                //       : ""
                //     : "",
                //   url: messageInfo.chatExtMsg
                //     ? messageInfo.chatExtMsg.extMsg
                //       ? messageInfo.chatExtMsg.extMsg.url
                //       : ""
                //     : ""
                // });
                // //console.log('聊天记录-------------', this.componentChatList)
                setTimeout(() => {
                    let childNodes = this.$refs.chatList.childNodes;
                    //console.log("LastChatMsg_childNodes-------------", childNodes);
                    this.$refs.listView.scrollBy(
                        0,
                        -childNodes[0].clientHeight - 10
                    );
                }, 100);
                // this.$refs.listView.refresh();
            }
        },
        input_value: function(newValue, oldValue) {
            if (newValue.length > 0 || oldValue > 0) {
                this.flag = true;
            } else {
                this.flag = false;
            }
        }
        // chatListIndex: function(newValue) {
        //   if (this.isscroll) {
        //     this.$nextTick(function() {
        //       let childNodes = this.$refs.chatList.childNodes;
        //       //console.log(childNodes)
        //       let chatListHeight = 0;
        //       childNodes.forEach(item => {
        //         chatListHeight += item.clientHeight
        //       })
        //       this.scrollHeight = chatListHeight;
        //       //console.log('父页面scrollHeight：', this.scrollHeight);
        //     });
        //   }
        // }
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
        loading,
        envelope,
        qrCode,
        topUp
    }
};
</script>

<style scoped lang='less'>
@import "../../assets/less/variable.less";
@import "../../assets/less/chat.less";
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
    .voice-bg {
        position: fixed;
        z-index: 8;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .warning {
        position: fixed;
        width: 3rem;
        height: 3rem;
        left: 50%;
        right: 0;
        top: 50%;
        bottom: 0;
        margin-left: -1.5rem;
        margin-top: -2rem;
        z-index: 10;
    }
    .chat_nav {
        height: 1.1733rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        padding: 0.32rem 0.4rem 0.32rem 0;
        background: #ddd;
        position: relative;
        .back_box {
            padding: 0 0.4rem;
            box-sizing: border-box;
            .back_arrow {
                width: 0.32rem;
                height: 0.5333rem;
            }
        }
        .name {
            color: #333;
            font-size: 0.4267rem;
            display: flex;
            justify-content: space-between;
            .sex_box {
                margin-right: 0.2rem;
                padding-top: 0.05rem;
                width: 0.4rem;
                img {
                    width: 100%;
                }
            }
            .online_status {
                display: flex;
                .online_dot {
                    padding-top: 0.1333rem;
                    width: 0.4rem;
                    height: 0.4rem;
                }
                .friendStatus {
                }
                .roomNum {
                    margin-left: 0.2333rem;
                    background: red;
                    color: #fff;
                    padding: 0 0.1067rem;
                    box-sizing: border-box;
                    border-radius: 3px;
                }
            }
        }
        .backHome_box {
            .home {
                width: 0.64rem;
                height: 0.5867rem;
            }
        }
        .comment-wrapper {
            border-radius: 8px;
            margin-right: -0.2667rem;
            background-color: #fff;
            padding: 0.066rem 0.1667rem;
            color: #333;
            right: 1.6667rem;
            box-sizing: border-box;
            position: absolute;
            .avatar {
                width: 0.4rem;
                height: 0.3967rem;
                margin-right: 0.1333rem;
            }
            .count {
                margin-top: -0.0267rem;
                font-size: 14px;
            }
        }
    }
    .chat_wrapper {
        flex: 1;
        padding: 0 0.3733rem;
        background: #eee;
        overflow-y: auto;
        position: relative;
        .soul_panel {
            width: 8rem;
            height: 5rem;
            box-shadow: 2px 2px 10px 7px rgba(0, 0, 0, 0.2);
            position: absolute;
            top: 0.5rem;
            left: 50%;
            margin-left: -4rem;
            z-index: 3;
            background-color: #fff;
            .avatar_box {
                display: flex;
                margin-left: 1.4rem;
                margin-top: 0.8rem;
                margin-bottom: 0.6rem;
                .avatar {
                    width: 1.2rem;
                    height: 1.2rem;
                    border-radius: 50%;
                }
                .line {
                    // width: 1.rem;
                    display: inline-block;
                    height: 16px;
                    background: linear-gradient(
                        left,
                        #ff5201 15%,
                        #ff9e19 5%,
                        #ffca24 10%,
                        #ffc322 40%,
                        #ffd709 30%
                    );
                    padding: 0.0533rem 0.08rem;
                    border-radius: 0.2rem;
                    color: #fff;
                    letter-spacing: 2px;
                    margin: 0.4rem 0.2rem;
                }
            }
            .chat_soulText_box {
                .chatSoulText {
                    text-align: center;
                    font-size: 0.4133rem;
                    color: #ccc;
                    margin-top: 0.4rem;
                }
            }
        }
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
                // height: 100%;
                .chatListItem {
                    padding: 0.4rem 0;
                    box-sizing: border-box;
                    .message_wrapper {
                    }
                }
                .friend {
                    position: relative;
                    .chatList(left, #fff);
                    .border-left();
                    .arrow {
                        .arrowDot(#fff);
                        left: -0.05rem;
                    }
                    .outDate {
                        position: absolute;
                        top: 1rem;
                        right: -0.8rem;
                        width: 0.6667rem;
                        height: 0.6667rem;
                    }
                }
                .messRecordPic {
                    width: 1.8rem;
                    height: 2rem;
                }
                .mine {
                    width: 100%;
                    position: relative;
                    .chatList(right, #ffd800);
                    .border-right();
                    .arrow {
                        .arrowDot(#ffd800);
                        right: -0.05rem;
                    }
                    .outDate {
                        position: absolute;
                        top: 1rem;
                        left: -0.8rem;
                        width: 0.6667rem;
                        height: 0.6667rem;
                    }
                    .message_box {
                        margin-right: 0.2667rem;
                    }
                }
                .messRecordPic {
                    width: 1.8rem;
                    height: 2rem;
                }
                .gift_wrapper {
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .myGifoInfo {
                        &.friendPanel {
                            background: #ffffff;
                        }
                        &.minePanel {
                            background: #ffd800;
                        }
                        border-radius: 0.08rem;
                        color: #333;
                        box-sizing: border-box;
                        padding: 0.1667rem 0.1333rem;
                        .gift {
                            margin-top: 0.2333rem;
                            margin-bottom: 0.1333rem;
                            display: flex;
                            justify-content: space-around;
                            .giftImg {
                                img {
                                    width: 1.1rem;
                                    height: 1.1rem;
                                }
                            }
                            .giftDesc {
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;
                                .giftName {
                                }
                                .giftIntegral {
                                }
                            }
                        }
                    }
                    .giftRecord_test {
                        width: 100%;
                        display: inline-block;
                        padding: 0.08rem 0.1067rem;
                        border-radius: 0.08rem;
                        color: #fff;
                        text-align: center;
                        box-sizing: border-box;
                        &.giftText {
                            color: #333;
                        }
                        .yes,
                        .no {
                            border-radius: 0.1rem;
                            box-sizing: border-box;
                            letter-spacing: 0.08rem;
                            font-weight: 600;
                            color: #333;
                            padding: 0.1333rem 0.4rem;
                            background: -webkit-linear-gradient(
                                top,
                                #fedc00,
                                #e39300
                            );
                        }
                        .no {
                            margin-right: 0.8333rem;
                        }
                        .yesGame,
                        .noGame {
                            border-radius: 0.1rem;
                            text-decoration: underline;
                            color: red;
                            font-size: 0.4rem;
                            font-weight: 700;
                        }
                        .noGame {
                            margin-left: 0.2667rem;
                            margin-right: 0.2667rem;
                        }
                    }
                    .received {
                        background: rgba(0, 0, 0, 0.2);
                    }
                    .no_received {
                        background: rgba(0, 0, 0, 0.5);
                        max-width: 100%;
                    }
                    .giftRecord_time {
                        display: inline-block;
                        color: rgb(34, 26, 26);
                    }
                }
            }
        }
        .loading-container {
            position: absolute;
            width: 100%;
            top: 2%;
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
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            .voiceIcon {
                width: 1rem;
                height: 1rem;
                float: left;
            }
            .send_message {
                outline: none;
                -webkit-appearance: none;
                font-size: 0.3733rem;
                float: left;
                width: 5.9333rem;
                height: 1rem;
                text-indent: 0.2667rem;
                border: 1px solid #999;
            }
            .btn {
                line-height: 1rem;
                text-align: center;
                border-radius: 10px;
                font-weight: 700;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            .action_box {
                margin-left: 0.2767rem;
                float: left;
                width: 2rem;
                height: 1.06rem; // line-height: 0.9867rem;
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
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -khtml-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
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
                        pointer-events: none;
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
    .voicing {
        position: fixed;
        width: 3rem;
        height: 3rem;
        left: 50%;
        right: 0;
        top: 50%;
        bottom: 0;
        margin-left: -1.5rem;
        margin-top: -2rem;
        background-color: rgba(0, 0, 0, 0.3);
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .voicing-micro {
            width: 1.5rem;
            height: 1.5rem;
        }
        .voicing-text {
            width: 100%;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: 700;
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
