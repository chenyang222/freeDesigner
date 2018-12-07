<template>
  <div class="home__ngineer" __vuec__>
      <div class="home__ngineer__title">
          卓越的工程师们&nbsp;&nbsp;Excellent engineers
      </div>
      <div class="home__ngineer__content">
          <div class="content clearfix">
            <ol class="gallerys">
                <li v-for="items in engineersList" :key="items.id">
                    <div class="item fl">
                        <div class="avatar">
                            <img :src="items.avatar">
                        </div>
                        <div class="title">{{items.name}}</div>
                        <div class="exp">{{items.career}}年工作经验</div>
                        <div class="label" v-if="items.role">
                            <span v-for="(idx, childItem) in items.role.split(',').slice(0,1)" :key="idx">
                                【{{ childItem }}】
                            </span>
                        </div>
                    </div>
                </li>
            </ol>
          </div>
      </div>
  </div>
</template>
<script>
import api from '/src/assets/js/api';
export default {
    data() {
        return{
            engineersList: []
        }
    },
    created (){
        let that = this;
        api.get({
            url: constant.API.USER + '?is_recommend=Tr  ue'
        }).done(function () {
            that.engineersList = this.data.slice(0, 4);
        })
    },
    methods: {
        fetch () {
            return api.get({
                url: constant.API.USER + '?is_recommend=True'
            })
        },
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
            box-shadow:0 0 15px #0CC;
        }
        .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 194px;
            height: 246px;
            cursor: pointer;
            float: left;
            margin: 0 25px 30px 25px;
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
}
</style>
