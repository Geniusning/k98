<template>
    <div class="envelope_wrapper">
        <header>
          <slot name="header"></slot>
        </header>
        <main>
          <slot></slot>
        </main>
        <footer>
          <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script type='text/ecmascript-6'>
export default {
    data () {
        return {
            flag: true,
        }
    },
    props: {

    },
    computed: {

    },
    mounted () {
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
    top: 30%;
    box-sizing: border-box;
    padding: .2rem;
    margin-left: -4rem;
    z-index: 99999;
    width: 8rem;
    height: 4rem;
    background-image: url("../../assets/image/envelop_handle.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    header{
      height: .5rem;
      line-height: .5rem;
      padding-top: .1rem;
      padding-left: .2rem;
       box-sizing: border-box;
      font-size: 16px;
      // background: red;
    }
    main{
      flex: 1;
      box-sizing: border-box;
      // background: yellow;
     
    }
    footer{
      height: 1rem;
      // background: green;
      box-sizing: border-box;
    }
}
</style>
