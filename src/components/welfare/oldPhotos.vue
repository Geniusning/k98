<template>
    <div class="oldPhotos-wrapper">
        <my-header title="往期活动照片" ref="header"></my-header>
        <ul class="oldphotos-list">
            <li class="item" v-for="(item,index) in oldPhotos" :key="index">
                <img class="photo" :src="item.img" alt="">
                <p class="desc">{{item.title}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from "vuex"
import myHeader from "base/myheader/myheader";
export default {
    data () {
        return {
            oldPhotoList: []
        }
    },
    computed: {
        ...mapState(["oldPhotos"])
    },
    created () {
        console.log(this.oldPhotos)
    },
    components: {
        myHeader
    }
}
</script>

<style lang="less" scoped>
.oldPhotos-wrapper {
    height: 100%;
    width: 100%;
    overflow: auto;
    .oldphotos-list {
        width: 100%;
        .item {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 0.3rem;
            .photo {
                width: 100%;
                height: 4rem;
                // margin: 1rem auto 0 auto;
            }
            .desc {
                font-size: 0.4rem;
                padding-left: 0.1rem;
                font-weight: 800;
            }
        }
    }
}
</style>