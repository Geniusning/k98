<template>
    <div id="personalInfo" class="personalInfo">
        <img onclick="return false" src="../../../assets/image/close.png" alt="" class="close" @click="closeAlbum">
        <swiper height="250px" class="swiper" :show-dots='false' v-if="lifeImgList.length">
            <swiper-item class="swiper-demo-img" v-for="(item, index) in lifeImgList" :key="index" style="text-align:center">
                <img onclick="return false" style="margin:0 auto;height:100%" :src="item">
            </swiper-item>
        </swiper>
        <img src="../../../assets/image/arrow left.png" alt class="arrow_left">
         <p class="arrow_desc">左右划动，看更多照片</p>
        <img src="../../../assets/image/Arrow Right.png" alt class="arrow_right">
    </div>
</template>

<script type='text/ecmascript-6'>
import {Swiper,SwiperItem} from 'vux'
import {
    mapState
} from 'vuex'
export default {
    data() {
        return {
            demo01_list: [],
            demo01_index: 0,
        }
    },
    computed: {
        ...mapState(['userInfo',"lifeImgList"])
    },
    methods: {
        closeAlbum() {
            console.log("关闭相册")
            this.$emit("closeAlbum",false);
        },
    },
    components: {
        Swiper,
        SwiperItem
    }
}
</script>

<style scoped lang='less'>
.personalInfo {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  .close {
    position: absolute;
    width: 1.0667rem;
    height: 1.0667rem;
    top: 0.4rem;
    right: 0.2667rem;
  }
  .swiper {
    margin-top: 50%;
    // height: 5.3333rem;
  }
     @keyframes leftMove {
        0% {
          transform: translateX(5px); //  opacity: 1;
        }
        50% {
          transform: translateX(10px);
        }
        100% {
          transform: translateX(5px);
        }
      }
      @keyframes rightMove {
        0% {
          transform: translateX(-5px); //  opacity: 1;
        }
        50% {
          transform: translateX(-10px);
        }
        100% {
          transform: translateX(-5px);
        }
      }
  .arrow_left{
        position: absolute;
        z-index: 99;
        bottom: 3.5rem;
        left: -.3rem;
        width: 1.3333rem;
        animation: leftMove 1s linear infinite;
  }
  .arrow_right{
       width: 1.3333rem;
        position: absolute;
        z-index: 99;
        bottom: 3.5rem;
        right: -.3rem;
        animation: rightMove 1s linear infinite;
  }
  .arrow_desc{
        width: 100%;
        text-align: center;
        font-size: .45rem;
        font-weight: 900;
        position: absolute;
        bottom: 3.8rem;
        z-index: 99;
        color: #fff;
  }
}
</style>
