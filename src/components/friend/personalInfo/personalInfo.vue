<template>
    <div id="personalInfo" class="personalInfo">
        <img onclick="return false" src="../../../assets/image/close.png" alt="" class="close" @click="closeAlbum">
        <swiper class="swiper" :show-dots='false' v-if="lifeImgList.length">
            <swiper-item class="swiper-demo-img" v-for="(item, index) in lifeImgList" :key="index">
                <img onclick="return false" style="width:100%;height:100%" :src="item">
            </swiper-item>
        </swiper>
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
    height: 5.3333rem;
  }
}
</style>
