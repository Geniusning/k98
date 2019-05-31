<template>
 <div>
     <div class="nav_wrapper clearfix" :style="{background:bg}">
       <div class="back_content fl" @click="goBack">
         <img onclick="return false" src="../../assets/image/back_chat.png" alt="" class="backArrow">
       </div>
       <img onclick="return false" @click="goHome" src="../../assets/image/chat_home.png" alt="" class="backHome">  
       <h3 class="title fl">{{title}}</h3>
     </div>
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
  },
  data() {
    return {};
  },
  methods: {
    goHome(){
      this.$router.push({
        name:"home"
      })
    },
    goBack() {
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
  position: relative;
  // padding: 0 0.4rem;
  box-sizing: border-box;
  // height: 1.1733rem;
  .backHome{
    position: absolute;
    width: .7rem;
    height: .7rem;
    right: 0.3667rem;
    top: 0.2333rem;
  }
  .back_content {
    padding: 0 0.4rem;
    box-sizing: border-box;
    margin: 0.32rem 0;
    .backArrow {
      width: 0.32rem;
      height: 0.5333rem;
    }
  }
  .title {
    margin-left: 3.2rem;
    font-size: 0.4267rem;
    color: #333;
    margin-top: 0.3rem;
  }
}
</style>
