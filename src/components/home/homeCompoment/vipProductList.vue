<template>
  <div class="vipProductList-wrapper">
    <ul class="productList">
      <li class="productItem" v-for="(product,index) in vipProductList" :key="index">
        <img src="../../../assets/image/temp1.png" alt="" class="product-img">
        <h4 class="product-name">{{product.name}}</h4>
        <p class="product-price">
          <span class="vip-price">会员价￥{{product.vipPrice}}</span>
          <del class="origin-price">会员价￥{{product.originPrice}}</del>
        </p>
        <p class="product-integral">
          <span class="integral">积分换${{product.integral}}</span>
          <span class="more">...</span>
        </p>
      </li>
    </ul>
    <p class="more-btn">
      <span>点击加载更多</span>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      vipProductList: [
        {
          name: "JBL PULSE4音乐脉动4蓝牙",
          vipPrice: 1699,
          originPrice: 1799,
          integral: 1699900,
        },
        {
          name: "JBL PULSE4音乐脉动4蓝牙",
          vipPrice: 1699,
          originPrice: 1799,
          integral: 1699900,
        }, {
          name: "JBL PULSE4音乐脉动4蓝牙",
          vipPrice: 1699,
          originPrice: 1799,
          integral: 1699900,
        }, {
          name: "JBL PULSE4音乐脉动4蓝牙",
          vipPrice: 1699,
          originPrice: 1799,
          integral: 1699900,
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.vipProductList-wrapper {
  .productList {
    background-color: #f0f2ef;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .productItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 48%;
      height: 6rem;
      background-color: #fff;
      margin-top: 0.2rem;
      padding: 0.1rem;
      .product-img {
        width: 4.5rem;
        height: 4.5rem;
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
        justify-content: space-between;
        width: 4.5rem;
        .vip-price {
          color: red;
          font-size: 14px;
        }
        .origin-price {
          color: #ccc;
          font-size: 12px;
          margin-left: 0.2rem;
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
          height: 0.5rem;
          line-height: 0.5rem;
          border-radius: 35%;
          box-sizing: border-box;
          text-align: center;
          color: #fff;
          background: #ffe60f;
          font-weight: 900;
        }
      }
    }
  }
}
</style>


