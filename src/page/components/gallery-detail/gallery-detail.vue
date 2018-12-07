<template>
    <div class="galleryDetail" __vuec__>
        <div class="close" @click="closeGallery()">X</div>
        <div class="content">

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return{}
        },
        props:['detail'],
        created () {
            console.info(this.detail)
        },
        methods: {
            closeGallery () {
                this.$parent.closeGallery()
            }
        }
    }
</script>

<style lang="less">
.galleryDetail[__vuec__]{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    .close{
        font-size: 30px;
        color: #ffffff;
        position: absolute;
        top: 5px;
        right: 30px;
        cursor: pointer;
    }
    .content{
        width: 800px;
        height: 90%;
        overflow: hidden;
        background-color: #ffffff;
    }
}
</style>
