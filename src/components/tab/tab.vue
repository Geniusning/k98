<template>
 <div class="tab">
     <tabbar @on-index-change="onIndexChange">
        <tabbar-item :selected="selected==0"  link="/home">
          <img v-if="selected!==0" slot="icon" src="../../assets/image/home.png">
          <img v-else slot="icon" src="../../assets/image/active_home.png">
          <span slot="label"> 首页</span>
        </tabbar-item>
        <tabbar-item :selected="selected==1" link="/friend">
          <img v-if="selected!==1" slot="icon" src="../../assets/image/friend.png">
          <img v-else slot="icon" src="../../assets/image/active_friend.png">
          <span slot="label">交友</span>
        </tabbar-item>
        <tabbar-item :selected="selected==2" badge="2" link="/message">
          <img v-if="selected!==2" slot="icon" src="../../assets/image/message.png">
          <img v-else slot="icon" src="../../assets/image/active_message.png">
          <span slot="label">消息</span>
        </tabbar-item>
        <tabbar-item :selected="selected==3"  link="/welfare">
          <img v-if="selected!==3" slot="icon" src="../../assets/image/welfare.png">
          <img v-else slot="icon" src="../../assets/image/active_welfare.png">
          <span slot="label">福利</span>
        </tabbar-item>
        <tabbar-item :selected="selected==4"  link="/mine">
          <img v-if="selected!==4" slot="icon" src="../../assets/image/mine.png">
          <img v-else slot="icon" src="../../assets/image/active_mine.png">
          <span slot="label">我的</span>
        </tabbar-item>  
    </tabbar>
 </div>
</template>

<script type='text/ecmascript-6'>
import { mapState, mapMutations } from "vuex";
import {Tabbar, TabbarItem} from "vux";
export default {
  name: "tab",
  data() {
    return {
      active: false,
      index: 0
    };
  },
  props: {
    selected: {
      type: Number,
      default: 0
    }
  },
  created() {},
  computed: {},
  methods: {
    onIndexChange(param) {
      this.index = param;
    }
  },
  watch: {},
  components: {
    Tabbar,
    TabbarItem
  }
};
</script>

<style scoped lang='less'>
.tab{
  height: 100%;
}
</style>
