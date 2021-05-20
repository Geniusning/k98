<template>
  <div class="videoList-wrapper">
    <ul class="video-List">
      <li @click="goToVideo(index)" class="video-item" v-if="video.videoURL" v-for="(video,index) in videoList" :key="index">
        <div class="intros" v-show="index===0">
          <img src="../../../assets/image/kuaiGuang_logo.png" alt="">
        </div>
        <div class="video-wrapper">
          <div class="shopInfo">
            <img :src="video.StoreLoge" alt="" class="shopLogo">
            <span class="shopName">{{video.storeName}}</span>
          </div>
          <video class="video" :src="video.videoURL"></video>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["videoList"],
  data () {
    return {

    }
  },
  methods: {
    goToVideo (idx) {
      this.$emit("changeVideoPage", idx)
    }
  }
}
</script>

<style lang="less" scoped>
.videoList-wrapper {
  width: 100%;
  height: 100%;
  background: #fff;
  .video-List {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .video-item {
      width: 49%;
      height: 8rem;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      margin-bottom: 0.2rem;
      .intros {
        width: 100%;
        height: 1.5rem;
        background-color: #fce609;
        color: #333;
      }
      .video-wrapper {
        width: 100%;
        position: relative;
        .shopInfo {
          display: flex;
          align-items: center;
          position: absolute;
          top: 0.2rem;
          left: 0.3rem;
          .shopLogo {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
          }
          .shopName {
            color: #fff;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            padding: 0rem 0.1rem;
          }
        }
        .video {
          width: 100%;
        }
      }
    }
    li:nth-child(2n + 1) {
      margin-right: 2%;
    }
  }
}
</style>


