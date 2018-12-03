<template lang="jade">
.sort
  .container
    div.condition
      select(@change="sort", class="fl", v-model="sortType")
        option(value="created_on", class="fl ml-20") 创建时间
        option(value="view_count") 热度
        option(value="like_count") 点赞
      select(@change="searchCate")
        option(value="All") 全部
        option(v-for="opt in cates", value="{{opt}}") {{opt}}
.wrap-inner(__vuec__)
  .content
    ol.gallerys
      li(v-for="(outter, gallery) in gallerys")
        .gallery.fl
          .wrap
            a(@click="showOverlay(gallery)", href="javascript:;")
              img(:src="gallery.thumb", border="0")
            div.fr.mt-10
              span.watching {{gallery.view_count}}
              span.liking.ml-20(@click="likeIt(gallery.id, gallery.uid)") {{gallery.like_count}}
          .avatar
            img.mt-10.fl(:src="gallery.user_avatar")
            .fl.ml-20 {{gallery.username}}
    .clear
overlay
</template>
<script>
import constant from '/src/assets/js/constant';
import api from '/src/assets/js/api';
import overlay from '/src/page/components/gallery-overlay/overlay';

export default {
    components: {
        overlay
    },
    asyncData (resolve, reject) {
        this.fetch().done(function () {
            this.gallerys = this.data.galleries;
            this.cates = this.data.cates;
            resolve(this);
        });
    },
    watch: {
        query: {
            deep: true,
            handler () {
                this.reloadAsyncData();
            }
        }
    },
    methods: {
        // 获取基本信息
        fetch () {
            return api.get({
                url: constant.API.HOT_GALLERY,
                data: this.query
            });
        },
        // 点赞功能
        likeIt (id) {
            let url = constant.API.LIKE_IT + id + '/';
            let self = this;
            api.post({
                url: url
            }).done(function () {
                self.reloadAsyncData();
            });
        },
        // 父组件向子组件派发请求
        // 弹出相册遮罩，展示详细展开包的信息，和更多相册信息
        showOverlay (gallery) {
            this.$broadcast('changeGallery', {
                data: gallery,
                showModal: true
            });
        },
        // 切换排序
        sort (e) {
            let el = e.currentTarget;
            let order = el.value;
            this.query = {
                order_by: order
            };
        },
        // 按照分类筛选相册
        searchCate (e) {
            let el = e.currentTarget;
            let scate = el.value;
            this.query = {
                scate: scate
            };
        }
    },
    data () {
        let sortType = 'view_count';
        return {
            query: {
                order_by: sortType
            },
            cates: [],
            data: {},
            info: {},
            sortType: sortType,
            success: false,
            gallerys: []
        };
    }
};
</script>
<style lang="less">
.sort {
  padding-top: 10px;
  height: 50px ;
  line-height: 50px;
  background: rgba(255, 255, 255, .6);
}
.condition {
  width: 400px;
  margin: auto;
}
.wrap-inner[__vuec__] {
  padding: 30px 30px 40px 30px;
  border-top: 1px solid #e5e5e5;
  background: #f4f4f4;
  .content {
    display: block;
    margin: 0 auto;
    position: relative;
    padding: 0;
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

    .gallerys {
      .gallery {
        cursor: pointer;
        position: relative;
        width: 220px;
        float: left;
        padding: 0;
        margin: 0 15px 30px 15px;
        .wrap {
          padding: 10px;
          display: block;
          margin: auto;
          width: 222px;
          height: 200px;
          background: #fff;
          a,
          img {
            height: 150px;
            display: block;
          }
          a {
            width: 200px;
            img {
                margin: auto;
                max-width: 100%;
            }
          }
          span {
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            color: #ccc;
          }
          .watching {
            text-indent: 20px;
            background: url('./watch.png') left no-repeat;
          }
          .liking {
            text-indent: 15px;
            background: url('./like.png') left no-repeat;
          }
        }
        .avatar {
          height: 40px;
          line-height: 40px;
          width: 200px;
          margin: auto;
          img {
            height: 24px;
            width: 24px;
            border-radius: 12px;
          }
        }
      }
    }
  }
}
</style>
