<template>
    <div class="tab">
        <tabbar @on-index-change="onIndexChange">
            <tabbar-item :selected="selected==0" link="/home">
                <img onclick="return false" v-if="selected!==0" slot="icon" src="../../assets/image/home.png" class="home">
                <img onclick="return false" v-else slot="icon" src="../../assets/image/active_home.png" class="home">
                <span slot="label"> 首页</span>
            </tabbar-item>
            <tabbar-item :selected="selected==1" :link="friendUlr">
                <img onclick="return false" v-if="selected!==1" slot="icon" src="../../assets/image/friend.png" class="friend">
                <img onclick="return false" v-else slot="icon" src="../../assets/image/active_friend.png" class="friend">
                <span slot="label">交友</span>
            </tabbar-item>
            <tabbar-item :selected="selected==2" :badge="count" link="/message?type=friend">
                <img onclick="return false" v-if="selected!==2" slot="icon" src="../../assets/image/message.png" class="message">
                <img onclick="return false" v-else slot="icon" src="../../assets/image/active_message.png" class="message">
                <span slot="label">消息</span>
            </tabbar-item>
            <tabbar-item :selected="selected==3" link="/welfare">
                <img onclick="return false" v-if="selected!==3" slot="icon" src="../../assets/image/welfare.png" class="welfare">
                <img onclick="return false" v-else slot="icon" src="../../assets/image/active_welfare.png" class="welfare">
                <span slot="label">活动</span>
            </tabbar-item>
            <tabbar-item :selected="selected==4" link="/mine">
                <img onclick="return false" v-if="selected!==4" slot="icon" src="../../assets/image/mine.png" class="mine">
                <img onclick="return false" v-else slot="icon" src="../../assets/image/active_mine.png" class="mine">
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script type='text/ecmascript-6'>
import { mapState, mapMutations, mapGetters } from "vuex";
import { Tabbar, TabbarItem } from "vux";
export default {
    name: "tab",
    data () {
        return {
            active: false,
            index: 0,
            // count: "",
            friendUlr: "/friend"
        };
    },
    props: {
        selected: {
            type: Number,
            default: 0
        }
    },
    created () { },
    computed: {
        ...mapGetters(["badgeCount"]),
        count () {
            return (this.badgeCount > 0 ? this.badgeCount : "").toString()
        }
    },
    mounted () { },
    methods: {
        onIndexChange (param) {
            this.index = param;
            console.log(this.index)
            if (this.index === 1) {
                // this.setSearchForSvip(false)
            }
        },
        ...mapMutations({
            setSearchForSvip: "SETSEARCHFORSVIP",//设置搜索群友时带svip参数
        })
    },
    watch: {
        // badgeCount(newValue) {
        //   //console.log("badgeCount----------watch",newValue);
        //   this.count = (newValue > 0 ? newValue : "").toString();
        // }
    },
    components: {
        Tabbar,
        TabbarItem
    }
};
</script>

<style scoped lang='less'>
.tab {
    height: 100%;
}
.home,
.message,
.welfare {
    width: 0.56rem;
    height: 0.56rem;
}
.friend {
    width: 0.6667rem;
    height: 0.56rem;
}
.mine {
    width: 0.48rem;
    height: 0.56rem;
}
</style>
