<template>
    <div class="flatform-wrapper">
        <div class="flatform-tab vux-1px-b">
            <span @click="switchTab(0)" :class="{active:currentTab===0}">附近</span>
            <span @click="switchTab(1)" :class="{active:currentTab===1}">常去</span>
            <span @click="switchTab(2)" :class="{active:currentTab===2}">优惠</span>
        </div>
        <div class="platform-content">
            <ul class="shop-list" v-if="currentTab===0">
                <li class="shop-item" v-for="(info,index) in platformList" :key="index">
                    <div class="shop-top" @click="goToLeagleHome(info)">
                        <div class="left">
                            <img class="shop-logo" :src="info.storeInfo.image" alt="">
                            <div class="shop-name-adrr">
                                <p class="shop-name">{{info.storeInfo.name}}</p>
                                <p class="shop-addr"><img class="addr" src="../../../assets/image/address.png" alt="">{{info.storeInfo.address}}</p>
                            </div>
                        </div>
                        <div class="right">
                            <span class="shop-mode">{{info.storeInfo.industryType}}</span>
                            <span>&lt;{{info.distance.toFixed(2)}}km</span>
                        </div>
                    </div>
                    <div class="shop-bottom" @click="goToLeagleFri(info)">
                        <ul class="staff-list">
                            <li class="staff-item" v-for="(staff,index) in info.staffsInfo" :key="index" v-if="index<4">
                                <img class="avatar" :src="staff.headImgUrl" alt="">
                                <span class="number">{{staff.jobNumber}}</span>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <ul class="shop-list" v-if="currentTab===1">
                <li class="shop-item" v-for="(info,index) in frequentPlatformList" :key="index">
                    <div class="shop-top" @click="goToLeagleHome(info)">
                        <div class="left">
                            <img class="shop-logo" :src="info.storeInfo.image" alt="">
                            <div class="shop-name-adrr">
                                <p class="shop-name">{{info.storeInfo.name}}</p>
                                <p class="shop-addr"><img class="addr" src="../../../assets/image/address.png" alt="">{{info.storeInfo.address}}</p>
                            </div>
                        </div>
                        <div class="right">
                            <span class="shop-mode">{{info.storeInfo.industryType}}</span>
                            <span>&lt;{{info.distance.toFixed(2)}}km</span>
                        </div>
                    </div>
                    <div class="shop-bottom" @click="goToLeagleFri(info)">
                        <ul class="staff-list">
                            <li class="staff-item" v-for="(staff,index) in info.staffsInfo" :key="index" v-if="index<4">
                                <img class="avatar" :src="staff.headImgUrl" alt="">
                                <span class="number">{{staff.jobNumber}}</span>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <ul class="shop-list" v-if="currentTab===2">
                <div class="welfare_content">
                    <friAllianceInfo :friendLeagles="friendLeagleList"></friAllianceInfo>
                </div>
            </ul>
        </div>
    </div>
</template>
<script>
import avatarList from "./avatarList"
import FriAllianceInfo from './friAllianceInfo'
import api from "common/api"
export default {
    data () {
        return {
            currentTab: 0,
            platformList: [],
            frequentPlatformList: []
        }
    },
    props: ["platformInfo", "friendLeagleList"],
    mounted () {
        console.log("avatarList=", avatarList)
        this.loadFrequentPlatform()
    },
    watch: {
        "platformInfo": function (oldValue) {
            this.platformList = this.platformInfo
            //生成随机数租
            this.platformList.forEach((item, index) => {
                let randNums = this.randNum(0, 18, 4)
                if (item.staffsInfo.length !== 0) {
                    for (let i = 0, len = randNums.length; i < len; i++) {
                        item.staffsInfo.unshift({
                            headImgUrl: avatarList[randNums[i]],
                            jobNumber: parseInt(Math.random() * 900 + 100)
                        })
                    }
                }
            });
            console.log("this.platformList=", this.platformInfo)
        }
    },
    methods: {
        /*
   *    @param    number    最小值
   *    @param    number    最大值
   *    @param    number    个数
   *    @return    arr        输出随机值（会含最小、最大值）
   */
        randNum (min, max, num) {
            var arr = [],
                t;
            function fn (i) {
                for (i; i < num; i++) {
                    t = parseInt(Math.random() * (max - min + 1) + min);
                    for (var k in arr) {
                        if (arr[k] == t) {
                            fn(i);
                            break;
                        }
                    }
                    arr[i] = t;
                }
            }
            fn(0);
            return arr
        },
        switchTab (i) {
            this.currentTab = i
        },
        async goToLeagleHome (info) {
            let res = await this.collectFrequentPlatform(info.storeInfo.storeId)
            if (res === 0) {
                window.location.href = `${info.storeInfo.url}/k98/home`
            }
        },
        async goToLeagleFri (info) {
            let res = await this.collectFrequentPlatform(info.storeInfo.storeId)
            if (res === 0) {
                window.location.href = `${info.storeInfo.url}/k98/friend`
            }
        },
        collectFrequentPlatform (storeId) {
            return new Promise((resolve, reject) => {
                api.collectFrequentPlatform(storeId).then(res => {
                    console.log("收集结果=", res)
                    resolve(res.errCode)
                })
            })
        },
        loadFrequentPlatform () {
            api.loadFrequentPlatform().then(res => {
                console.log("加载常去的平台=", res)
                if (res.errCode === 0) {
                    this.frequentPlatformList = res.info
                    this.frequentPlatformList.forEach((item, index) => {
                        let randNums = this.randNum(0, 18, 4)
                        if (item.staffsInfo.length !== 0) {
                            for (let i = 0, len = randNums.length; i < len; i++) {
                                item.staffsInfo.unshift({
                                    headImgUrl: avatarList[randNums[i]],
                                    jobNumber: parseInt(Math.random() * 900 + 100)
                                })
                            }
                        }
                    });
                }
            })

        },
    },
    components: {
        FriAllianceInfo
    }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/variable.less";
@import "../../../assets/less/home_common.less";
@import "~vux/src/styles/1px.less";
.flatform-wrapper {
    background-color: #fff;
    height: 100%;
    .flatform-tab {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 0.36rem;
        font-weight: 900;
        color: #333;
        span {
            display: inline-block;
            text-align: center;
            position: relative;
            &.active {
                color: @baseColor;
            }
            &.active::after {
                position: absolute;
                content: " ";
                width: 100%;
                border-bottom: 1px solid @baseColor;
                bottom: 0;
                right: 0rem;
                background-color: @baseColor;
            }
        }
    }
    .platform-content {
        padding: 0.1333rem;
        .shop-list {
            .shop-item {
                margin-bottom: 0.2rem;
                .shop-top {
                    display: flex;
                    justify-content: space-between;
                    .left {
                        display: flex;
                        .shop-logo {
                            width: 0.8rem;
                            height: 0.8rem;
                            border-radius: 50%;
                        }
                        .shop-name-adrr {
                            margin-left: 0.2rem;
                            .shop-name {
                                font-size: 16px;
                                color: #333;
                                font-weight: 800;
                            }
                            .shop-addr {
                                font-size: 12px;
                                color: rgb(116, 114, 114);
                                display: flex;
                                align-items: center;
                                .addr{
                                  width: .4rem;
                                  height: .4rem;
                                }
                            }
                        }
                    }
                    .right {
                        font-size: 12px;
                        color: rgb(116, 114, 114);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                }
                .shop-bottom {
                    margin-top: 0.1rem;
                    .staff-list {
                        display: flex;
                        justify-content: space-between;
                        .staff-item {
                            position: relative;
                            .avatar {
                                width: 2rem;
                                height: 2rem;
                                border-radius: 6px;
                            }
                            .number {
                                display: inline-block;
                                width: 2rem;
                                height: 0.5rem;
                                line-height: 0.5rem;
                                text-align: center;
                                position: absolute;
                                bottom: 0.1rem;
                                left: 0rem;
                                color: #fff;
                                background-color: rgba(0, 0, 0, 0.2);
                            }
                        }
                    }
                }
            }
            .welfareContent();
        }
    }
}
</style>