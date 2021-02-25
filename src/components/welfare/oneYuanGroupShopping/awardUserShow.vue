<template>
    <div class="all-opened-group">
        <my-header title="中奖查看" bg="#fff"></my-header>
        <header v-if="awardUserList.length">
            <img src="../../../assets/image/gou.png" class="gou" alt="">
            <span class="desc">成团了，查看奖品花落谁家</span>
        </header>
        <main v-if="awardUserList.length">
            <ul class="group-list">
                <li class="group-info" v-for="(item,index) in awardUserList" :key="index">
                    <img class="avatar" :src="item.headImgUrl" alt="">
                    <span class="nickname">{{item.nickName}}</span>
                    <img class="arrow" src="../../../assets/image/award.png" v-show="item.winnerTag" />
                </li>
            </ul>
        </main>
        <main v-else class="noData">
            暂无拼团内容
        </main>
    </div>
</template>

<script>
import myHeader from "../../../base/myheader/myheader";
import api from "common/api";
export default {
    data () {
        return {
            isCountingDownTime: 0,
            awardUserList: []
        }
    },
    created () {
        console.log("this.$route=", this.$route)
        this.winEventId = this.$route.params.winEventId
        this.loadWinnerEventInfo()
    },
    // props: ["openGroupInfoList"],
    components: {
        myHeader,
    },
    methods: {
        loadWinnerEventInfo () {
            api.loadWinnerEventInfo(this.winEventId).then(res => {
                console.log("全部团列表=", res)
                if (res.errCode === 0) {
                    let winnerInfo = res.info.winner
                    let othersInfo = res.info.others
                    this.awardUserList = othersInfo.map(user => {
                        if (user.nickName === winnerInfo.nickName) {
                            user["winnerTag"] = true
                        } else {
                            user["winnerTag"] = false
                        }
                        return user
                    })
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.all-opened-group {
    header {
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        margin: 0.3rem 0;
        .gou {
            width: 0.6667rem;
            height: 0.6667rem;
        }
        .desc {
            font-size: 0.5rem;
            margin-left: 0.2rem;
            color: red;
        }
    }
    main {
        .group-list {
            .group-info {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                border: 1px solid #ccc;
                border-radius: 20px;
                box-sizing: border-box;
                padding: 0.1rem;
                font-weight: 800;
                margin-bottom: 0.1333rem;
                .avatar {
                    margin: 0 0.5667rem;
                    width: 1rem;
                    height: 1rem;
                    border-radius: 50%;
                }
                .nickname,
                .PersonsNums,
                .arrow {
                    font-weight: 800;
                    font-size: 16px;
                    width: 5rem;
                }
                .arrow {
                    margin-left: 1.5rem;
                    width: 0.6rem;
                    height: 0.6rem;
                }
            }
        }
    }
    .noData {
        text-align: center;
        font-size: 18px;
        margin-top: 4rem;
        color: #ccc;
    }
}
</style>