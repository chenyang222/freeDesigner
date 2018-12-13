<template>
    <div v-if="isShow" class="galleryDetail" __vuec__>
        <div class="close" @click="closeGallery()">X</div>
        <div class="content">
            <div class="contentbox">
                <div class="title">{{ galleryUserInfo.name }}</div>
                <div class="userInfo">
                    <div class="left-info">
                        <div @click="toEngineer" class="avatar">
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
                        <img src="./heart.png" alt="heart">
                        <span class="like">like</span>
                    </div>
                </div>
                <div class="image-content">
                    <div class="showImage" :style="{'background-image': 'url(' + nowImage + ')'}"></div>
                    <div class="selectImage">
                        <div class="imgbox" :style="styleObj">
                            <div @click="selectImg(items.mid_image, idx)" :class="idx == nowIndex ? 'img active' : 'img'" v-for="(idx, items) in galleryList" :key="idx">
                                <img :src="items.small_image">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="gallery-content">
                    <div class="descr">
                        <span class="descr-title">作品说明:</span>
                        <p class="descr-text">{{ galleryUserInfo.desc }}</p>
                    </div>
                    <div class="more">
                        <span class="more-title">更多作品 ...</span>
                        <div class="more-content">
                            <div v-for="(idx, items) in galleryList.slice(0, 4)" :key="idx" :style="{'background-image': 'url(' + items.small_image + ')'}"></div>
                        </div>
                    </div>
                </div>
                <div class="talkAbout">
                    <div class="talk" v-for="(idx, item) in galleryCommentList" :key="idx">
                        <div class="avatar">
                            <img :src="item.user_avatar" alt="avatar">
                        </div>
                        <div class="talk-info">
                            <div class="talk-name">{{ item.username }}</div>
                            <div class="talk-content">
                                <p>{{ item.content }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sendTalk">
                    <input type="text" v-model="inputValue">
                    <div class="send" @click="sendValue">发表</div>
                </div>
            </div>
            <div @click="prev" class="prev btnStyle">《</div>
            <div @click="next" class="next btnStyle">》</div>
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
            nowImage: '',
            nowIndex: 0,
            styleObj: {
                left: '0px'
            },
            galleryCommentList: [],
            inputValue: '',
            isShow: false
        }
    },
    props:['detail','show'],
    created () {
        console.info(this.show)
        if (this.show == 1) {
            
            this.isShow = false
        } else if (this.show == 2) {
            this.isShow = true
        }
        let that = this;
        const galleryid = this.detail.id;
        const userid = this.detail.uid;
        const galleryUsrUrl = '/api/users/' + userid + '/gallery/' + galleryid; // 设计师信息
        const userInfoUrl = '/api/users/' + userid; // 设计师信息
        const galleryPicUrl = '/api/users/' + userid + '/gallery/' + galleryid + '/image/'; // 图片信息
        api.get({
            url: galleryUsrUrl
        }).done(function () {
            that.galleryUserInfo = this.data;
        })
        api.get({
            url: userInfoUrl
        }).done(function () {
            that.designerInfo = this.data;
        })
        api.get({
            url: galleryPicUrl
        }).done(function () {
            that.galleryList = this.data;
            that.nowImage = this.data[0].mid_image;
            that.nowIndex = 0;
        })
        this.getComment();
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
        },
        selectImg (img, idx) {
            this.nowImage = img;
            this.nowIndex = idx;
            let leftPx = 0;
            if(this.nowIndex < 3){
                leftPx = 0;
            }else if(this.nowIndex + 3 <= this.galleryList.length){
                leftPx = - (this.nowIndex - 3 + 1 ) * 153.5
            }else{
                leftPx = - (this.galleryList.length - 5) * 153.5
            }
            this.styleObj = {
                left: leftPx + 'px'
            }
        },
        prev () {
            if (this.nowIndex - 1 < 0) {
                return
            }
            this.nowIndex = this.nowIndex - 1;
            this.selectImg(this.galleryList[this.nowIndex].mid_image, this.nowIndex)
        },
        next () {
            if (this.nowIndex + 1 > this.galleryList.length - 1) {
                return
            }
            this.nowIndex = this.nowIndex + 1;
            this.selectImg(this.galleryList[this.nowIndex].mid_image, this.nowIndex)
        },
        getComment () {
            let that = this;
            const galleryComment = '/api/gallery/' + this.detail.id + '/comment/'; // 讨论
            const dataForm = {
                per_page: 1000
            }
            api.get({
                url: galleryComment,
                data: dataForm
            }).done(function () {
                that.galleryCommentList = this.data;
            })
        },
        sendValue () {
            let that = this;
            const sendValueUrl = '/api/gallery/' + this.detail.id + '/comment/'; // 发送评论
            const userid = localStorage.getItem("temp_user_id");
            if (!userid) {
                return
            }
            const dataFrom = {
                uid: userid,
                content: this.inputValue,
            }
            api.post({
                url: sendValueUrl,
                data: dataFrom
            }).done(function () {
                that.inputValue = ''
                that.getComment()
            })
        },
        toEngineer () {
            const publicURL = constant.PATH.USER_PUB + '?uid=' + this.detail.uid;
            window.location.href = publicURL
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
        height: 95%;
        background-color: #F4F4F4;
        border-radius: 10px;
        position: relative;
        .contentbox{
            width: 800px;
            height: 90%;
            overflow-y: auto;
        }
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
                    cursor: pointer;
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
                    margin-right: 10px;
                    font-weight: bold;
                }
                .like{
                    color: #878787;
                }
                img{
                    width: 15px;
                    height: 13px;
                    margin-right: 5px;
                }
            }
        }
        .image-content{
            width: 100%;
            overflow: hidden;
            background-color: #ffffff;
            .showImage{
                width: 100%;
                height: 603px;
                overflow: hidden;
                background-position: center center;
                background-size: cover;
                background-repeat: no-repeat;
            }
            .selectImage{
                margin: 27px 29px 21px 29px;
                height: 98px;
                position: relative;
                .imgbox{
                    display: flex;
                    position: absolute;
                    height: 98px;
                    .img{
                        width: 128px;
                        height: 98px;
                        margin-right: 25.5px;
                        overflow: hidden;
                        display: inline-block;
                        img{
                            height: 100%;
                        }
                    }
                    .active{
                        box-shadow:0 0 15px #0CC;
                    }
                }
            }
        }
    }
    .btnStyle{
        font-size: 40px;
        color: #ffffff;
        position: absolute;
        top: 375px;
        cursor: pointer;
    }
    .prev{
        left: -70px;
    }
    .next{
        right: -70px;
    }
    .gallery-content{
        padding: 37px 30px 55px 40px;
        width: 100%;
        height: 325px;
        background-color: #f4f4f4;
        display: flex;
        justify-content: space-between;
        .descr{
            width: 320px;
            .descr-title{
                font-size: 17px;
                font-weight: bold;
            }
            .descr-text{
                position: relative;
                font-size: 18px;
                line-height: 32px;
                color: #808080;
                margin: 0;
                max-height: 195px;
                overflow: hidden;
            }
            p::after{
                content: "...";
                position: absolute;
                bottom: 0;
                right: 0;
                padding-left: 0px;
                background: -webkit-linear-gradient(left, transparent, #f4f4f4 55%);
                background: -o-linear-gradient(right, transparent, #f4f4f4 55%);
                background: -moz-linear-gradient(right, transparent, #f4f4f4 55%);
                background: linear-gradient(to right, transparent, #f4f4f4 55%);
            }
        }
        .more{
            width: 251px;
            .more-title{
                font-size: 17px;
                margin-bottom: 16px;
            }
            .more-content{
                display: flex;
                flex-wrap: wrap;
                height: 212px;
                div{
                    width: 116px;
                    height: 86px;
                    background-position: center center;
                    background-size: cover;
                    background-repeat: no-repeat;
                }
                div:nth-child(2n){
                    margin-left: 19px;
                }
                div:nth-child(2n){
                    margin-bottom: 21px;
                }
            }
        }
    }
    .talkAbout{
        padding: 0px 30px 0px 40px;
        width: 100%;
        height: 324px;
        background-color: #f4f4f4;
        overflow-y: auto;
        .talk:nth-child(1){
            border-top: 1px solid #cccccc;
        }
        .talk{
            width: 100%;
            height: 107px;
            border-bottom: 1px solid #cccccc;
            display: flex;
            padding: 23px 0px 23px 0px;
            .avatar{
                width: 36px;
                height: 36px;
                img{
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                }
            }
            .talk-info{
                margin-left: 15px;
                width: 600px;
                .talk-name{
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 12px;
                }
                .talk-content{
                    width: 600px;
                    p{
                        color: #808080;
                        font-size: 16px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                }
            }
        }
    }
    .sendTalk{
        padding: 24px 30px 0px 40px;
        width: 100%;
        background-color: #f4f4f4;
        input{
            width: 100%;
            height: 42px;
            line-height: 42px;
            border: 1px solid #cccccc;
            background-color: #ffffff;
            display: block;
        }
        .send{
            margin-top: 10px;
            width: 100px;
            font-size: 16px;
            height: 30px;
            line-height: 30px;
            color: #ffffff;
            text-align: center;
            background-color: #4195f7;
            float: right;
            cursor: pointer;
        }
    }
}
</style>
