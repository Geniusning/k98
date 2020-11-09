<template>
    <div id="gameCompetionDetail" class="gameCompetionDetail">
        <div class="bg"></div>
        <div class="notice-wrapper">
            <div class="name">大话骰{{this.isTeamGame?"团体":"个人"}}排名赛直播间</div>
            <img src="../../../assets/image/refresh.png" alt class="refresh" @click="refresh">
            <span class="refresh-text">刷新排名</span>
            <img class="home" src="../../../assets/image/game_home.png" alt @click="goHome">
        </div>
        <div style="height: 85%;">
            <div class="scroll-wrapper" v-if="!isTeamGame">
                <div class="playerNumber" v-if="!isTeamGame">
                    <ul class="titleList">
                        <li class="subTitle">名次</li>
                        <li class="subTitle">参赛者</li>
                        <li class="subTitle">战绩(杯)</li>
                        <li class="subTitle">已打(局)</li>
                        <li class="subTitle">邀请人</li>
                    </ul>
                </div>
                <loading v-show="isLoading" style="position:absolute;top:30%;left:0"></loading>
                <scroll class="scrollList" :data="playList" v-if="playList.length">
                    <ul class="userList">
                        <li class="userItem" v-for="(item,index) in playList" :key="index">
                            <span class="rankNum" :class="{'first':index==0,'second':index==1,'third':index==2}">{{index+1}}</span>
                            <div class="userInfo">
                                <img class="avatar" :src="item.headURI?item.headURI:robotImg" alt>
                                <div class="username">{{item.teamName?item.teamName:(item.nick?item.nick:'无名')}}</div>
                            </div>
                            <span class="score" style="padding-top:.3rem">{{item.score}}</span>
                            <span class="finishRound">{{item.finishRound}}</span>
                            <span class="inviterInfo" v-if="!item.inviterDate">暂无</span>
                            <div class="userInfo" v-else>
                                <img class="avatar" :src="item.inviterDate.headURI" alt>
                                <div class="username">{{item.inviterDate.nick}}</div>
                            </div>
                        </li>
                    </ul>
                </scroll>
                <p style="font-size:20px;font-weight:400;color:#ccc;width:100%;text-align:center;margin-top:50%" class="noContentText" v-else>暂无选手参赛</p>
            </div>
            <div class="scroll-wrapper" v-else>
                <div class="playerNumber">
                    <ul class="titleList">
                        <li class="subTitle">名次</li>
                        <li class="subTitle">队长</li>
                        <li class="subTitle">队员</li>
                        <li class="subTitle">战绩(杯)</li>
                        <li class="subTitle">已打(局)</li>
                    </ul>
                </div>
                <loading v-show="isLoading" style="position:absolute;top:30%;left:0"></loading>
                <scroll class="scrollList" :data="playList" v-if="playList.length">
                    <ul class="userList">
                        <li class="userItem" v-for="(item,index) in playList" :key="index">
                            <span class="rankNum" :class="{'first':index==0,'second':index==1,'third':index==2}">{{index+1}}</span>
                            <div class="userInfo">
                                <img class="avatar" :src="item.captain.headURI?item.captain.headURI:robotImg" alt>
                                <!-- <div class="username">{{item.teamName?item.teamName:(item.captain.nick?item.captain.nick:'无名')}}</div> -->
                            </div>
                            <div class="score">
                                <img v-for="(teamMate,index) in item.member" :key="index" v-if="teamMate.id!=item.captain.id" :class="'memberHeadImg'+index" :src="teamMate.headURI" alt="">
                            </div>
                            <span class="finishRound">{{item.score}}</span>
                            <span class="inviterInfo">{{item.finishRound}}</span>

                        </li>
                    </ul>
                </scroll>
                <p style="font-size:20px;font-weight:400;color:#ccc;width:100%;text-align:center;margin-top:50%" class="noContentText" v-else>暂无选手参赛</p>
            </div>
        </div>
        <!-- <div class="btn-wrapper">
         <p class='backHome'>长按关注本店公众号，享受会员特权：领福利、交群友、玩游戏！</p>
         <img :src="QRcodeUrl" alt="" class="QRcode">
    </div>-->
    </div>
</template>

<script type='text/ecmascript-6'>
import Scroll from "base/scroll/scroll";
import Loading from "base/loading/loading";
import api from 'common/api'
import util from "common/util"
// import { setInterval, clearTimeout } from 'timers';
export default {
    data () {
        return {
            playList: [],
            timeout: 200000,
            QRcodeUrl: "",
            url: "",
            arenaID: '',
            isLoading: false,
            isTeamGame: true,
            robotImg: require("../../../assets/image/XiaoWanzi.png")
        };
    },
    mounted () {
        this._loadArenaRank();//拉取比赛场排名
        //this._loadAllQrcode();//拉取二维码
        //console.log('arenaID------------------------------', this.$route.params.arenaID);
    },
    methods: {
        //拉取比赛场排名
        _loadArenaRank () {
            // let timer = null;
            this.playList = []
            this.url = window.location.href;
            this.isLoading = true;
            var ArenaId = this.url.split('arenaID=')[1];
            if (ArenaId) {
                this.arenaID = ArenaId;
            } else {
                this.arenaID = this.$route.params.arenaID
            }
            api.loadArenaRank(this.arenaID).then(res => {
                //console.log('比赛排名信息-----------', res)
                var tempArr = []
                if (res.errCode === 0) {
                    if (res.arenaType == 1) {    //arenaType=0个人赛  arenaType=1团体赛
                        tempArr = res.teamRanks;
                        this.isTeamGame = true
                    } else {
                        tempArr = res.userRanks;
                        this.isTeamGame = false
                    }
                    //console.log("this.isTeamGame-----",this.isTeamGame)
                    tempArr.forEach(player => {
                        this.playList.push(player)
                    });
                    this.isLoading = false;
                    if (res.isAllComplete) {  //如果比赛结束，结束轮训
                        this.$vux.toast.show({
                            text: "比赛已结束",
                            type: "text",
                            time: 2000,
                            width: "3rem"
                        });
                        return false;
                    }
                    // timer = setTimeout(() => {
                    //   this._loadArenaRank();
                    // }, 10000);
                }
            })
        },
        //刷新
        refresh () {
            this._loadArenaRank();
        },
        //拉取二维码
        // _loadAllQrcode() {
        //   api.loadAllQrcode().then(res => {
        //     //console.log('二维码----------------', res)
        //     this.QRcodeUrl = res.urls[0]
        //   })
        // },
        //回到主页
        goHome () {
            this.$router.push({
                name: "welfare"
            })
        }
    },
    components: {
        Scroll,
        Loading
    }
};
</script>

<style scoped lang='less'>
@import "../../../assets/less/mixin.less";
.gameCompetionDetail {
    height: 100%;
    box-sizing: border-box;
    // background-color: #196045;
    overflow-y: auto;
    position: relative;
    .bg {
        width: 100%;
        height: 4rem;
        position: absolute;
        background: -webkit-linear-gradient(
            top,
            #fbbc00,
            #fccc00,
            #fccc00,
            #fff
        );
        z-index: -1;
    }
    .notice-wrapper {
        width: 8.8rem;
        height: 10%;
        position: relative;
        box-sizing: border-box;
        padding: 0.3433rem 0.2667rem;
        // .bg("../../assets/image/playerTitle_bg.png");
        position: relative;
        margin: 0 auto;
        .refresh {
            position: absolute;
            width: 0.8rem;
            height: 0.8rem;
            top: 0.3rem;
            left: 0rem;
        }
        .refresh-text {
            position: absolute;
            width: 1.5rem;
            top: 1.13rem;
            left: -0.2rem;
        }
        .name {
            font-size: 0.48rem;
            // text-shadow: 0 0.0533rem 0.0267rem;
            font-weight: bold;
            color: #333;
            letter-spacing: 0.0667rem;
            text-align: center;
        }
        .home {
            position: absolute;
            width: 1rem;
            height: 1rem;
            right: -0.2rem;
            top: 0.1333rem;
        }
    }
    .scroll-wrapper {
        width: 8.8rem;
        height: 100%;
        // .bg("../../assets/image/player_bg.png");
        margin: 0.2933rem auto 0;
        border-radius: 0.32rem;
        border: 1px solid #333;
        background-color: #fff;
        .playerNumber {
            width: 100%;
            border-bottom: 1px solid #ccc;
            .titleList {
                width: 100%;
                display: flex;
                .subTitle {
                    width: 20%;
                    text-align: center;
                    font-size: 0.4rem;
                    color: #333;
                }
            }
        }
        .scrollList {
            height: 94%;
            overflow: hidden;
            .userList {
                .userItem {
                    display: flex;
                    margin-top: 0.1633rem;
                    width: 100%;
                    border-bottom: 1px solid #ccc;
                    .rankNum {
                        color: #333;
                        font-size: 0.5133rem;
                        padding-top: 0.2333rem;
                        width: 20%;
                        text-align: center;
                        &.first {
                            color: gold;
                            font-weight: bold;
                        }
                        &.second {
                            color: goldenrod;
                            font-weight: bold;
                        }
                        &.third {
                            color: red;
                            font-weight: bold;
                        }
                    }
                    .userInfo {
                        text-align: center;
                        width: 20%;
                        .avatar {
                            width: 1rem;
                            height: 1rem;
                            border-radius: 50%;
                        }
                        .username {
                            font-size: 0.4rem;
                            color: #333;
                            // padding-top: 0.1333rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                    .score {
                        width: 20%;
                        text-align: center;
                        // padding-top: 0.3333rem;
                        color: #333;
                        font-size: 0.4rem;
                        position: relative;
                        .memberHeadImg0,
                        .memberHeadImg1 {
                            position: absolute;

                            width: 1rem;
                            height: 1rem;
                            border-radius: 50%;
                        }
                        .memberHeadImg0 {
                            left: 0.6rem;
                        }
                        .memberHeadImg1 {
                            left: -0rem;
                        }
                        .memberHeadImg2 {
                            left: -0rem;
                        }
                    }
                    .finishRound {
                        width: 20%;
                        text-align: center;
                        padding-top: 0.3333rem;
                        color: #333;
                        font-size: 0.4rem;
                    }
                    .inviterInfo {
                        width: 20%;
                        text-align: center;
                        padding-top: 0.3333rem;
                        color: #333;
                        font-size: 0.4rem;
                    }
                }
            }
        }
    }
    .btn-wrapper {
        margin-top: 0.2667rem;
        text-align: center;
        // background-color: #366f95;
        .QRcode {
            width: 2.6667rem;
            height: 2.6667rem;
        }
        .backHome {
            font-size: 0.3333rem;
            font-weight: bold;
            text-align: center;
            color: #333;
            margin-bottom: 0.2667rem;
        }
    }
}
</style>
