<template>
 <div class="test">
     <input type="text" class="input">
 </div>
</template>

<script type='text/ecmascript-6'>
export default {
    data() {
        return {

        }
    },
    created() {
        window.addEventListener('resize', () => {
            if (document.activeElement.tagName === "INPUT") {
                //console.log('input')
                document.activeElement.scrollIntoView()
            }
        })
    },
    components: {

    }
}
</script>

<style scoped lang='less'>
.test {
  .input {
    position: fixed;
    bottom: 30px;
  }
}
</style>
