<template>
  <div class="address-wrapper">
    <my-header title="新增地址" bg="#fff"></my-header>
    <van-address-edit :area-list="areaList" show-search-result :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete"
      @change-detail="onChangeDetail" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { AddressEdit, Toast } from 'vant'
import api from 'common/api'
import { areaList } from '@vant/area-data'
import myHeader from 'base/myheader/myheader'
export default {
  data() {
    return {
      areaList,
      searchResult: []
    }
  },
  components: {
    myHeader
  },
  methods: {
    onSave(content) {
      console.log('content', content)
      let addr = `${content.province}${content.city}${content.county}${
        content.addressDetail
      } ${content.name}  ${content.tel}`
      let data = {
        addr: addr
      }
      api.setUserAddr(data).then(res => {
        console.log('res', res)
        if (res.errCode === 0) {
          Toast('新建成功')
          api.getUserInfo().then(res => {
            //console.log("个人信息-------", res);
            this.getUserInfo(res)
          })
          this.$router.go(-1)
        } else {
          Toast(res.errMsg)
        }
      })
    },
    onDelete() {
      Toast('delete')
    },
    onChangeDetail(val) {
      console.log('val', val)
      if (val) {
        this.searchResult = []
      } else {
        this.searchResult = []
      }
    },
    ...mapMutations({
      getUserInfo: 'GET_USERINFO' //获取用户信息
    })
  }
}
</script>

<style lang="less">
.address-wrapper {
  .van-button--danger {
    background-color: #ffd800;
    border: 1px solid #ffd800;
    color: #333;
  }
}
</style>


