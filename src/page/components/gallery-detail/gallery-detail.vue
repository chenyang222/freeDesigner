<template>
    <div class="galleryDetail" __vuec__>
        <div class="close" @click="closeGallery()">X</div>
        <div class="content">
            <div class="title">{{ galleryUserInfo.name }}</div>
            <div class="userInfo">
                <div class="left-info">
                    <div class="avatar">
                        <img :src="designerInfo.avatar" alt="avatar">
                    </div>
                    <div class="info">
                        <div class="name">&nbsp;&nbsp;{{ designerInfo.name }}</div>
                        <div class="box">
                            <span class="skill" v-for="(idx, childItem) in designerInfo.role.split(',')" :key="idx">
                                【{{ childItem }}】
                            </span>
                            <span class="caree">{{ designerInfo.career }}年工作经验</span>
                        </div>
                    </div>
                </div>
                <div class="right-info" @click="clickLike">
                    <span class="number">{{ designerInfo.like_count }}</span>
                    <span class="like">like</span>
                </div>
            </div>
            <div class="image-content">
                <div class="showImage">
                    <img :src="nowImage" alt="avatar">
                </div>
                <div class="selectImage">
                    <div class="imgbox">
                        <div class="img" v-for="(idx, items) in galleryList" :key="idx">
                            <img :src="items.small_image">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '/src/assets/js/api';
export default {
    data() {
        return{
            galleryUserInfo: {},
            designerInfo: {
                role: ''
            },
            galleryList: [],
            nowImage: ''
        }
    },
    props:['detail'],
    created () {
        let that = this;
        console.info(this.detail)
        const galleryid = this.detail.id;
        const userid = this.detail.uid;
        const galleryUsrUrl = '/api/users/' + userid + '/gallery/' + galleryid; // 设计师信息
        const userInfoUrl = '/api/users/' + userid; // 设计师信息
        const galleryPicUrl = '/api/users/' + userid + '/gallery/' + galleryid + '/image/'; // 图片信息
        api.get({
            url: galleryUsrUrl
        }).done(function () {
            console.info(this.data)
            that.galleryUserInfo = this.data;
        })
        api.get({
            url: userInfoUrl
        }).done(function () {
            console.info(this.data)
            that.designerInfo = this.data;
        })
        api.get({
            url: galleryPicUrl
        }).done(function () {
            console.info(this.data)
            that.galleryList = this.data;
            that.nowImage = this.data[0].mid_image;
        })
    },
    methods: {
        closeGallery () {
            this.$parent.closeGallery()
        },
        clickLike () {
            let that = this;
            const clickLikeUrl = '/api/like_it/' + this.detail.id; // 点赞
            api.post({
                url: clickLikeUrl
            }).done(function () {
                that.designerInfo.like_count += 1 
            })
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
    z-index: 100;
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
        overflow-y: auto;
        background-color: #F4F4F4;
        border-radius: 10px;
        .title{
            width: 738px;
            margin: 0 auto;
            height: 48px;
            line-height: 48px;
            font-size: 22px;
            text-align: center;
            font-weight: bold;
            border-bottom: 1px solid #cccccc;
        }
        .userInfo{
            margin-top: 10px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            .left-info{
                display: flex;
                margin-left: 31px;
                .avatar{
                    width: 50px;
                    height: 50px;
                    img{
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
                }
                .info{
                    .name{
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 6px;
                    }
                    .box{
                        .skill{
                            font-size: 16px;
                            color: #4195f7;
                        }
                        .caree{
                            color: #808080;
                            font-size: 18px;
                        }
                    }
                }
            }
            .right-info{
                width: 127px;
                height: 36px;
                background-color: #ffffff;
                border: 1px solid #cccccc;
                border-radius: 15px;
                margin-right: 31px;
                font-size: 14px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                .number{
                    color: #4496F5;
                    margin-right: 5px;
                    font-weight: bold;
                }
                .like{
                    color: #878787;
                }
            }
        }
        .image-content{
            width: 100%;
            overflow: hidden;
            .showImage{
                width: 100%;
                height: 603px;
                overflow: hidden;
                img{
                    height: 100%;
                }
            }
            .selectImage{
                margin: 27px 29px 21px 29px;
                height: 98px;
                position: relative;
                background-color: #ffffff;
                .imgbox{
                    display: flex;
                    position: absolute;
                    height: 98px;
                    .img{
                        width: 128px;
                        height: 98px;
                        margin-right: 22px;
                        overflow: hidden;
                        display: inline-block;
                        img{
                            height: 100%;
                        }
                    }
                }
            }
        }
    }
}
</style>
