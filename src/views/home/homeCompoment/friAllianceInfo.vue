<template>
  <div class="firAlliance-wrapper">
    <ul class="welfare_list" v-if="friendLeagles.length">
      <li class="item clearfix vux-1px-t" v-for="(item,index) in friendLeagles" :key="index">
        <div class="shop-logo-name" @click="goToFriShop(item)">
          <div class="shop-info">
            <img :src="item.storelogo" alt class="shop-logo" />
            <div class="shop-name-address">
              <span class="name">{{item.storename}}</span>
              <p class="addr"><img class="addr-icon" src="../../../assets/image/address.png" alt="">{{item.addr}}</p>
            </div>
          </div>
          <p class="distance">
            <span>{{item.industryType}}</span>
            <span>{{item.distance}}</span>
          </p>
        </div>
        <div class="res-info" style="display:flex">
          <div class="left">
            <img onclick="return false" :src="item.res.image" alt class="shopPic" />
          </div>
          <div class="center">
            <p class="title" style="font-weight:900">{{item.res.name}}</p>
            <p class="desc">{{item.res.content}}</p>
            <p class="limit">{{item.res.limit}}</p>
          </div>
          <div class="entry">
            <div style="margin-left:.3rem" class="linear_btn" @click="goToFriShop(item)">
              {{item.enterBtnText ? "领&nbsp;&nbsp;&nbsp;取" :"进&nbsp;&nbsp;&nbsp;入" }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import api from 'common/api'
export default {
  props: ['friendLeagles'],
  computed: {
    ...mapState(['shopSettingInfo'])
  },
  methods: {
    //跳转友商门店
    goToFriShop(shopInfo) {
      console.log('shopInfo---', shopInfo)
      var data = {
        storename: shopInfo.storename,
        type: 1
      }
      //console.log("data=----", data);
      api.statAlliCount(data).then(res => {
        if (res.errCode === 0) {
          //console.log("统计友商数据---------", res);
        }
        window.location.href = `${shopInfo.url}?resId=${
          shopInfo.res.couponID
        }&storeName=${encodeURI(
          this.shopSettingInfo.name
        )}&friStoreName=${encodeURI(this.shopSettingInfo.name)}&visitType=10`
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import '../../../assets/less/btn.less';
@import '../../../assets/less/home_common.less';
.welfareContent();
</style>
