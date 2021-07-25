<template>
  <div class="shopList-wrapper">
    <ul class="shopList">
      <li class="shop" @click="goToShop"><span>1.无公众号门店01</span><span class="go">进入</span></li>
    </ul>
  </div>
</template>

<script>
import util from "common/util";
export default {
  methods: {
    goToShop () {
      let tk = util.getCookie("tk")
      window.location.href = `https://k90.93wifi.net/kone?visitFrom=test&tk=${tk}`
    }
  }
}
</script>

<style lang="less" scoped>
.shopList-wrapper {
  font-size: 18px;
  .shopList {
    margin: 0.8rem 1rem;
    .shop {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>


