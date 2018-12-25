<template>
    <div class="hisback" __vuec__>
        <div class="hisBox" v-for="(index, item) in hisList" :key="index">
            <div class="top">
                <span class="title">{{ item.order.title }}</span>
                <span class="time">{{ item.order.created_on.substr(0, 10) }}</span>
            </div>
            <div class="bot">
                {{ item.message }}
            </div>            
        </div>
    </div>
</template>

<script>
import api from '/src/assets/js/api';
export default {
    data() {
        return {
            hisList: []
        }
    },
    props: ['uid'],
    created() {
        const that = this;
        const hisUrl = '/api/user_reviews/';
        const dataForm = {
            user: this.uid,
            page_info: {
                per_page: 1000
            }
        }
        api.get({
            url: hisUrl,
            data: dataForm
        }).done(function () {
            console.info(this.data)
            that.hisList = this.data;
        })
    },
}
</script>

<style lang="less">
.hisback[__vuec__]{
    margin-top: 60px;
    .hisBox{
        width: 1080px;
        padding: 30px 50px;
        margin: 0 auto;
        border-bottom: 1px solid #999;
        .top{
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            .title{
                font-weight: bold;
                font-size: 22px;
            }
            .time{
                font-size: 18px;
                color: #999;
            }
        }
        .bot{
            width: 100%;
            font-size: 22px;
        }
    }
}
</style>