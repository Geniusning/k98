<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif" alt="">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: "正在载入数据"
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.loading {
  width: 100%;
  text-align: center;
  .desc {
    line-height: 20px;
    font-size: 0.2933rem;
    color: #333;
  }
}
</style>

