<template>
  <div class="home__ngineer" __vuec__>
      <div class="home__ngineer__title">
          卓越的工程师们&nbsp;&nbsp;Excellent engineers
      </div>
      <div class="home__ngineer__content">
          <div class="content clearfix">
            <ol class="gallerys">
                <li v-for="items in engineersList" :key="items.id">
                    <div class="item fl" @click="toEngineer(items)">
                        <div class="avatar">
                            <img :src="items.avatar">
                        </div>
                        <div class="title">{{items.name}}</div>
                        <div class="exp">{{items.career}}年工作经验</div>
                        <div class="label" v-if="items.role">
                            <span v-for="(idx, childItem) in items.roleList" :key="idx">
                                【{{ childItem }}】
                            </span>
                        </div>
                    </div>
                </li>
            </ol>
          </div>
          <div class="changeEnginerrslist" @click="getRandomEnginerrsList">
            <img src="./refresh.png" alt="">
            <span>换一批</span>
          </div>
      </div>
  </div>
</template>
<script>
import api from '/src/assets/js/api';
import constant from '/src/assets/js/constant';
export default {
    data() {
        return{
            engineersList: []
        }
    },
    created (){
        this.getRandomEnginerrsList();
    },
    methods: {
        getRandomEnginerrsList () {
            let that = this;
            api.get({
                url: constant.API.USER + '?is_recommend=True',
                data: {
                    per_page: 100
                }
            }).done(function () {
                if (this.data.length > 8) {
                    let list = that.getRandomArrayElements(this.data, 14);
                    for (let i = 0;i < list.length; i++) {
                        list[i].roleList = list[i].role.split(',').slice(0,2)
                    }
                    that.engineersList = list
                } else {
                    let list = this.data;
                    for (let i = 0;i < list.length; i++) {
                        list[i].roleList = list[i].role.split(',').slice(0,2)
                    }
                    that.engineersList = list;
                }
            })
        },
        getRandomArrayElements(arr, count) { // 随机获取数组中的8个
            var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
            while (i-- > min) {
                index = Math.floor((i + 1) * Math.random());
                temp = shuffled[index];
                shuffled[index] = shuffled[i];
                shuffled[i] = temp;
            }
            return shuffled.slice(min);
        },
        toEngineer (items) {
            const publicURL = constant.PATH.USER_PUB + '?uid=' + items.id;
            window.location.href = publicURL
        }
    }
}
</script>

<style lang="less">
.home__ngineer[__vuec__] {

    .home__ngineer__title {
        height: 57px;
        line-height: 57px;
        padding-left: 20px;
        color: #fff;
        font-size: 25px;
        background-color: #c3c3c3;
    }

    .home__ngineer__content {
        padding: 44px;
        background-color: #f4f4f4;
        .content{
            display: block;
            margin: 0 auto;
            position: relative;
            padding: 0;
        }
        ol.gallerys {
            max-width: 2000px;
            margin: 0 auto;
        }
        ol.gallerys {
            max-width: 2000px;
            margin: 0 auto
        }

        @media screen and (max-width: 2059px) {
            ol.gallerys {
                max-width:1750px
            }
        }

        @media screen and (max-width: 1809px) {
            ol.gallerys {
                max-width:1500px
            }
        }

        @media screen and (max-width: 1559px) {
            ol.gallerys {
                max-width:1250px
            }
        }

        @media screen and (max-width: 1309px) {
            ol.gallerys {
                max-width:1000px
            }
        }

        @media screen and (max-width: 1059px) {
            ol.gallerys {
                max-width:750px
            }
        }

        @media screen and (max-width: 809px) {
            ol.gallerys {
                max-width:500px
            }
        }

        @media screen and (max-width: 2076px) and (-ms-high-contrast: none), (-ms-high-contrast: active) {
            ol.gallerys {
                max-width:1750px
            }
        }

        @media screen and (max-width: 1826px) and (-ms-high-contrast: none), (-ms-high-contrast: active) {
            ol.gallerys {
                max-width:1500px
            }
        }

        @media screen and (max-width: 1576px) and (-ms-high-contrast: none), (-ms-high-contrast: active) {
            ol.gallerys {
                max-width:1250px
            }
        }

        @media screen and (max-width: 1326px) and (-ms-high-contrast: none), (-ms-high-contrast: active) {
            ol.gallerys {
                max-width:1000px
            }
        }

        @media screen and (max-width: 1076px) and (-ms-high-contrast: none), (-ms-high-contrast: active) {
            ol.gallerys {
                max-width:750px
            }
        }

        @media screen and (max-width: 826px) and (-ms-high-contrast: none), (-ms-high-contrast: active) {
            ol.gallerys {
                max-width:500px
            }
        }
        .item:hover{
            box-shadow:0 0 15px #4495f7;
        }
        .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 194px;
            height: 246px;
            cursor: pointer;
            float: left;
            margin: 0 25px 30px 30px;
            background-color: #ffffff;
            box-shadow:0 0 15px #cecece;
            .avatar {
                width: 92px;
                height: 92px;
                margin-top: 7px;
                margin-bottom: 11px;
                img{
                    width: 92px;
                    height: 92px;
                    border-radius: 50%;
                }
            }
            .title {
                color: #000;
                font-size: 22px;
                font-weight: bold;
            }
            .exp {
                font-size: 18px;
                color: #919191;
                margin-top: 12px;
                margin-bottom: 33px;
            }
            .label {
                font-size: 15px;
                color: #4495f7;
            }
        }

    }
    .changeEnginerrslist{
        width: 124px;
        height: 38px;
        background-color: #4495f7;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        font-size: 20px;
        color: #ffffff;
        line-height: 38px;
        cursor: pointer;
        img{
            margin-right: 5px;
        }
    }
}
</style>
