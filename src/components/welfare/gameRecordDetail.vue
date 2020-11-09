<template>
    <transition name="fade">
        <div id="gameRecordDetail" class="gameRecordDetail">
            <my-header title="排名详情"></my-header>
            <!-- <div class="myRank" v-if="ownRank.ranking||ownRank.score">
        <p class="rank">我的排名：{{ownRank.ranking+1}}</p>
        <p class="score">杯数：{{ownRank.score}}</p>
      </div> -->
            <div class="content vux-1px-t" v-if="gameList.length>0">
                <scroll ref="gameRecordList" class="scrollGameList" :data="gameList">
                    <ul class="list">
                        <li class="list_Item vux-1px-b" v-for="(item,index) in gameList" :key="index">
                            <div class="rankBox">
                                <img v-if="index===0" src="../../assets/image/img_rank1.png" alt class="rankIcon">
                                <img v-else-if="index===1" src="../../assets/image/img_rank2.png" alt class="rankIcon">
                                <img v-else-if="index===2" src="../../assets/image/img_rank3.png" alt class="rankIcon">
                                <p v-else class="time" :class="{first:index===0,second:index===1,third:index===2}">第{{index+1}}名</p>
                            </div>
                            <p class="name">{{item.nick}}</p>
                            <img :src="item.headURI?item.headURI:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534938165134&di=f3ae0420c8c174149ac1c123230a28ed&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FJCRXU6oUw5s17jKllv9icrTmXvozYWQDeWFhKgEXbYeR9JOEKkrWLjibU7a7FAbsBHibVKca5wWzEiaXHWSgaSlgbA%2F640%3Fwx_fmt%3Dpng'" alt class="avatar">
                            <p class="score">{{item.score}}杯</p>
                        </li>
                    </ul>
                </scroll>
            </div>
            <div v-else class="noGameList-content vux-1px-t">暂无数据</div>
        </div>
    </transition>
</template>

<script type='text/ecmascript-6'>
import MyHeader from "base/myheader/myheader";
import Scroll from 'base/scroll/scroll';
import api from 'common/api';
import util from 'common/util';
export default {
    data () {
        return {
            gameList: [],
            ownRank: {}
        }
    },
    mounted () {
        let arenaID = this.$route.params.id;
        this._loadArenaTopRank(arenaID);
    },
    methods: {
        _loadArenaTopRank (arenaID) {
            var topNumber = 10;
            api.loadArenaTopRank(arenaID, topNumber).then(res => {
                //console.log('比赛排名详细信息------------------', res)
                if (res.errCode == 0) {
                    this.gameList = this._nomalizeGameList(res.userRanks);
                    this.ownRank = res.ownRank
                }
            }).catch(err => {
                //console.log(err)
            })
        },
        _nomalizeGameList (list) {
            let gameList = []
            list.forEach(item => {
                if (item.userID.indexOf("Robot") === -1) {
                    gameList.push(item)
                }
            })
            return gameList
        }
    },
    components: {
        MyHeader,
        Scroll
    }
}
</script>

<style scoped lang='less'>
.gameRecordDetail {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    .myRank {
        display: flex;
        justify-content: space-between;
        padding: 0.1333rem 0.5667rem;
        width: 100%;
        box-sizing: border-box;
        .rank,
        .score {
            font-size: 0.3733rem;
            color: #333;
        }
        .score {
        }
    }
    .content {
        flex: 1;
        .scrollGameList {
            height: 90%;
            .list {
                // height: 6.6667rem;
                .list_Item {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.2667rem 0.4rem;
                    .rankBox {
                        font-size: 0.3733rem;
                        width: 15%;
                        text-align: left;
                        padding-top: 0.2033rem;
                        box-sizing: border-box;
                    }
                    .rankIcon {
                        width: 0.6333rem;
                        height: 0.6333rem;
                    }
                    .name,
                    .score {
                        font-size: 0.3733rem;
                        width: 25%;
                        text-align: left;
                        padding-top: 0.2033rem;
                        box-sizing: border-box;
                    }
                    .first,
                    .second,
                    .third {
                        font-weight: 700;
                    }
                    .first {
                        color: #ff0000;
                    }
                    .second {
                        color: gold;
                    }
                    .third {
                        color: orange;
                    }
                    .score {
                        text-align: center;
                    }
                    .avatar {
                        width: 0.9333rem;
                        height: 0.9333rem;
                        border-radius: 50%;
                        border: 1px solid #ccc;
                    }
                }
            }
        }
    }
    .noGameList-content {
        padding-top: 50%;
        width: 100%;
        text-align: center;
        font-weight: 800;
        font-size: 0.6rem;
        color: #ccc;
    }
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
