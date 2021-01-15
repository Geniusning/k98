<template>
    <div class="flatform-wrapper">
        <div class="flatform-tab vux-1px-b">
            <img @click="showSelectDialog=true" class="select-icon" src="../../../assets/image/select-platform.png" alt="">
            <span @click="switchTab(0)" :class="{active:currentTab===0}">附近</span>
            <span @click="switchTab(1)" :class="{active:currentTab===1}">常去</span>
            <span @click="switchTab(2)" :class="{active:currentTab===2}">优惠</span>
        </div>
        <div class="platform-content">
            <ul class="shop-list" v-if="currentTab===0">
                <li class="shop-item" v-for="(info,index) in resultShowPlatform" :key="index">
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
        <div class="mask" v-if="showSelectDialog"></div>
        <div v-if="showSelectDialog" class="dialog-demo">
            <div class="select_wrapper">
                <img onclick="return false" src="../../../assets/image/close-round.png" alt class="close" @click="cancel" />
                <div class="item_wrapper">
                    <h3>城市</h3>
                    <el-cascader size="small" :options="options" v-model="selectedHomeTownOptions" @change="handleChangeHomeTown"></el-cascader>
                </div>
                <div class="item_wrapper" @click="showPopupPickerPos=true">
                    <h3>类型</h3>
                    <span class="instrutry">{{industryArr[0]}}</span>
                </div>
                <div class="item_wrapper">
                    <h3>商家关键字</h3>
                    <input type="text" class="keywords" placeholder="请输入商家名称关键字" v-model="keyword">
                </div>
                <p class="confirm" @click="search">确定</p>
            </div>
        </div>
        <popup-picker style="visibility:hidden" class="popup" :show="showPopupPickerPos" :data="industryList" v-model="industryArr" @on-hide="onHide" @on-change="onChange"></popup-picker>
    </div>
</template>
<script>
import {
    provinceAndCityData,
    CodeToText,
    TextToCode
} from "element-china-area-data";
import {
    PopupPicker,
    XDialog,
    TransferDomDirective as TransferDom,
} from "vux";
import avatarList from "./avatarList"
import FriAllianceInfo from './friAllianceInfo'
import api from "common/api"
import util from "common/util"
export default {
    data () {
        return {
            keyword: "",
            showPopupPickerPos: false,
            showSelectDialog: false,
            options: provinceAndCityData,
            selectedHomeTownOptions: [],
            currentTab: 0,
            platformList: [],
            frequentPlatformList: [],
            resultShowPlatform: [],
            industryArr: ["KTV"],
            industryList: [['KTV', '酒吧', '餐吧', '茶咖', '酒店', '休闲', '商会', '校友会', '协会', '社群', '本地站', '全国站', '总店', '其他']]
        }
    },
    props: ["platformInfo", "friendLeagleList"],
    mounted () {
        this.loadFrequentPlatform()
    },
    watch: {
        "platformInfo": function (oldValue) {
            this.handleProp(oldValue)
            console.log("this.platformList=", this.platformInfo)
        }
    },
    methods: {
        handleProp (platformInfo) {
            this.resultShowPlatform = []
            this.platformList = JSON.parse(JSON.stringify(platformInfo))
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
                this.resultShowPlatform.push(item)
            });
             this.resultShowPlatform = this.resultShowPlatform.sort(util.sortByKeyS2L("distance"))
        },
        //num 个数，
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
        search () {
            let copyPlatformList = JSON.parse(JSON.stringify(this.platformList))
            let result = copyPlatformList.filter((item, index) => {
                let storeInfo = item.storeInfo
                if(this.keyword){
                  return storeInfo.name.indexOf(this.keyword)>-1 && storeInfo.city === this.city && this.industry === storeInfo.industryType
                }else{
                  return storeInfo.city === this.city && this.industry === storeInfo.industryType
                }
            });
            if (result.length>0){
              this.resultShowPlatform = result
            }else {
              this.$vux.toast.text("未有符合条件的平台","middle");
            }
            this.showSelectDialog = false
            this.keyword = ""
        },
        cancel () {
            this.showSelectDialog = false
        },
        onHide () {
            this.showPopupPickerPos = false
        },
        onChange (val) {
            console.log("industry value=", val)
            this.industry = val[0]
        },
        handleChangeHomeTown (value) {
            this.city = CodeToText[value[1]]
            console.log("city=", this.city)

        },
        switchTab (i) {
            this.currentTab = i
            if (this.currentTab === 0) {
                // this.handleProp(this.platformInfo)
            }
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
        FriAllianceInfo,
        XDialog,
        PopupPicker
    }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/variable.less";
@import "../../../assets/less/home_common.less";
@import "../../../assets/less/mixin.less";
@import "~vux/src/styles/1px.less";
.flatform-wrapper {
    background-color: #fff;
    height: 100%;
    position: relative;
    .flatform-tab {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 0.36rem;
        font-weight: 900;
        color: #333;
        position: relative;
        .select-icon {
            position: absolute;
            left: 2.2rem;
            top: 0.2rem;
            width: 0.6rem;
            height: 0.6rem;
        }
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
                                .addr {
                                    width: 0.4rem;
                                    height: 0.4rem;
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
    .mask {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
    }
    .dialog-demo {
        width: 8rem;
        height: 6rem;
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-4rem);
        background: #fff;
        box-sizing: border-box;
        .select_wrapper {
            width: 100%;
            height: 100%;
            padding-bottom: 0.1867rem;
            position: relative;
            margin: auto;
            padding: 0.2rem 0.3rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
            .close {
                position: absolute;
                right: 0.1333rem;
                top: 0.1333rem;
                width: 0.52rem;
                height: 0.52rem;
            }
            .item_wrapper {
                display: flex;
                flex-direction: column;
                width: 5rem;
                h3 {
                    text-align: left;
                    font-size: 14px;
                    font-weight: 600;
                    color: #333;
                    font-family: Arial, Helvetica, sans-serif;
                }
                .instrutry {
                    font-size: 15px;
                    text-decoration: underline;
                }
                .keywords {
                    height: 0.8rem;
                }
            }
            .confirm {
              font-size: 18px;
                width: 100%;
                text-align: center;
                color: @baseColor;
            }
            .cancel_btn {
                margin-right: 0.875rem;
            }
            // 送礼弹框
        }
    }
}
</style>