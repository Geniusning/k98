<template>
 <div id="personalInfo" class="personalInfo">
     <img src="../../../assets/image/close.png" alt="" class="close" @click="goback">
     <swiper class="swiper" :show-dots='false' :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>
 </div>
</template>

<script type='text/ecmascript-6'>
import {Swiper} from 'vux'
export default {
    data() {
        return {
            demo01_list: [{
                url: 'javascript:',
                img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
                title: ''
            }, {
                url: 'javascript:',
                img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
                title: ''
            }, {
                url: 'javascript:',
                img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg',
                title: '    '
            }],
            demo01_index: 0,
        }
    },
    methods: {
        demo01_onIndexChange(index) {
            console.log(index)
            this.demo01_index = index
        },
        goback(){
            this.$router.go(-1)
        },
    },
    components: {
        Swiper
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
  background-color: rgba(0, 0, 0, 0.8);
  .close{
      position: absolute;
      width: 1.0667rem;
      height: 1.0667rem;
      top: 0.4rem;
      right: 0.2667rem;
  }
  .swiper{
      margin-top: 50%;
      height: 5.3333rem;
  }
}
</style>
