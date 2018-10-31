<template>
 <div class="envelope_wrapper" >
     <!-- <transition name='fade'> -->
        <div class="envelope">
            <p class="text">{{text}}</p>
        </div>
     <!-- </transition> -->
 </div>
</template>

<script type='text/ecmascript-6'>
export default {
    data() {
        return {
            flag: true,
        }
    },
    props: {
        text: {
            type: String,
            default: "操作成功"
        },
    },
    computed: {

    },
    mounted() {
    },
    methods: {
    },
    components: {

    }
}
</script>

<style scoped lang='less'>
.envelope_wrapper {
  position: fixed;
  left: 50%;
  top: 25%;
  margin-left: -1.8rem;
  z-index: 99999;
  .envelope {
    width: 3rem;
    max-width: 4rem;
    // min-height: 1rem;
    text-align: center;
    padding: 0.4rem 0.4rem;
    margin: 0 auto;
    margin-top: 50%;
    background-image: url("../../assets/image/envelop.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .text {
      color: #333;
      font-size: 0.32rem;
    }
  }
}
</style>
