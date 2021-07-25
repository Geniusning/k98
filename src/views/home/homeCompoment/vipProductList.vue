<template>
  <div class="vipProductList-wrapper">
    <ul class="productList">
      <li class="productItem" @click="goToDetail(product)" v-for="(product,index) in inVipProductList"
        :key="index">
        <img :src="product.goods.image" alt="" class="product-img">
        <h4 class="product-name">{{product.coupInfo.content}}</h4>
        <p class="product-price">
          <span class="vip-price">会员价￥{{product.goods.vipMoney}}</span>
          <del class="origin-price">{{product.goods.discountPrice}}</del>
        </p>
        <p class="product-integral">
          <span class="integral">积分换${{product.goods.integral}}</span>
          <span class="more">...</span>
        </p>
      </li>
    </ul>
    <div @click="loadMore" class="more-btn" v-show="isShowMore">
      <img src="../../../assets/image/arrowdown.png" alt="">
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      isShowMore: false,
      inVipProductList: []
    }
  },
  props: {
    vipProductList: {
      type: Array
    }
  },
  watch: {
    vipProductList(newValue) {
      this.inVipProductList = newValue.slice(0, 4)
      if (newValue.length >= 4) {
        this.isShowMore = true
      }
    },
    inVipProductList(newValue) {
      if (newValue.length === this.vipProductList.length) {
        this.isShowMore = false
      }
    }
  },
  created() {
    this.inVipProductList = this.vipProductList.slice(0, 4)
    if (this.vipProductList.length >= 4) {
      this.isShowMore = true
    }
    console.log('vipProductList', this.vipProductList)
  },
  methods: {
    loadMore() {
      let arr = this.vipProductList.slice(
        this.inVipProductList.length,
        this.inVipProductList.length + 4
      )
      this.inVipProductList = this.inVipProductList.concat(arr)
    },
    goToDetail(product) {
      this.setOneRecommend(product)
      this.$router.push({
        name: 'vipProductDetail'
      })
    },
    ...mapMutations({
      setOneRecommend: 'SetOneRecommend'
    })
  }
}
</script>

<style lang="less" scoped>
.vipProductList-wrapper {
  .productList {
    background-color: #f0f2ef;
    // display: flex;
    // justify-content: center;
    // flex-wrap: wrap;
    overflow: hidden;
    box-sizing: border-box;
    padding-bottom: 0.2rem;
    .productItem {
      float: left;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 47%;
      background-color: #fff;
      margin-top: 0.2rem;
      border-radius: 8px;
      .product-img {
        width: 100%;
        height: 4.5rem;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      .product-name {
        width: 4.5rem;
        font-size: 14px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .product-price {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        width: 4.5rem;
        .vip-price {
          color: red;
          font-size: 12px;
        }
        .origin-price {
          color: #ccc;
          font-size: 0.2rem;
          margin-left: 0.1rem;
          padding-top: 0.1rem;
        }
      }
      .product-integral {
        display: flex;
        justify-content: space-between;
        width: 4.5rem;
        .integral {
          color: red;
        }
        .more {
          width: 0.5rem;
          height: 0.4rem;
          line-height: 0.25rem;
          border-radius: 50%;
          box-sizing: border-box;
          text-align: center;
          color: #fff;
          background: #ffe60f;
          font-weight: 900;
        }
      }
      &:nth-child(even) {
        margin-left: 2%;
      }
      &:nth-child(odd) {
        margin-left: 2%;
      }
    }
  }
  .more-btn {
    background-color: #f0f2ef;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.1rem;
    img {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>


