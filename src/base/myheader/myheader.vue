<template>
    <div class="nav_wrapper" :style="{background:bg,height:height}">
        <div class="back_content fl" @click="goBack">
            <img onclick="return false" src="../../assets/image/back_chat.png" alt="" class="backArrow">
        </div>
        <h3 class="title fl">{{title}}</h3>
        <img onclick="return false" @click="goHome" src="../../assets/image/chat_home.png" alt="" class="backHome">
    </div>
</template>

<script type='text/ecmascript-6'>
export default {
    props: {
        title: {
            type: String,
            default: "我的标题"
        },
        bg: {
            type: String,
            default: "#fff"
        },
        height: {
            type: String,
            default: "1.2rem"
        }
    },
    data () {
        return {};
    },
    methods: {
        goHome () {
            this.$router.push({
                name: "home"
            })
        },
        goBack () {
            this.$router.go(-1);
        }
    },
    components: {}
};
</script>

<style scoped lang='less'>
@import "../../assets/less/variable.less";
.nav_wrapper {
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 0.2rem;
    // padding: 0 0.4rem;
    box-sizing: border-box;
    height: 0.8rem;
    align-items: center;
    .backHome {
        width: 0.7rem;
        height: 0.7rem;
    }
    .back_content {
        .backArrow {
            width: 0.32rem;
            height: 0.5333rem;
        }
    }
    .title {
        font-size: 0.4267rem;
        color: #333;
    }
}
</style>
