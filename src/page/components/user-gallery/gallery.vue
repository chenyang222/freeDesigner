<template lang="jade">
div.sort
  .container
    div.condition
      select.fl(@change="changeSort")
        option(value="created_on", class="fl ml-20") 创建时间
        option(value="view_count") 热度
        option(value="like_count") 点赞
      select.fl.ml-20(@change="searchCate")
        option(value="All") 全部
        option(v-for="opt in cates", value="{{opt}}") {{opt}}
.wrap-inner(__vuec__)
  .content
    ol.gallerys
      li(v-for="(outter, gallery) in gallerys", @mouseenter="showEditbar", @mouseleave="hideEditbar")
        .gallery.fl
          .edit-bar(v-if="!!type")
            .edit.fl.ml-20(@click="editGallery(gallery)")
            .delete.fr.mr-10(@click="deleteGallery(gallery.id)")
          .wrap
            a(@click="showOverlay(gallery)", href="javascript:;")
              img(:src="gallery.thumb", border="0")
            div.fr.mt-10
              span.watching {{gallery.view_count}}
              span.liking.ml-20(@click="likeIt(gallery.id, gallery.uid)") {{gallery.like_count}}
          .avatar
            .img
              img.ml-20(:src="gallery.user_avatar")
            .ml-40.name {{gallery.name}}
    .clear
  .clear
  paginator(:info="info", :size="9")
uploadwork(v-if="!!type")
overlay(v-else)
modal(:show.sync="showModal", type="warning", action="deleteGallery", :css="deleteModalCSS",
text="你确认要删除相册吗？", subtext="在首页、个人作品展示登出的相册也将删除")
  header(slot="header") 删除提醒
</template>
<script>
import constant from '/src/assets/js/constant';
import api from '/src/assets/js/api';
import utils from '/src/assets/js/utils';
import overlay from '/src/page/components/gallery-overlay/overlay';
import uploadwork from '/src/page/components/upload-work/upload-work';
import paginator from 'src/public/paginator/paginator';
import $ from 'jquery';
import modal from 'src/public/modal/modal';

export default {
    props: ['uid', 'type'],
    components: {
        overlay,
        uploadwork,
        paginator,
        modal
    },
    events: {
        createGallery(success) {
            if (success) {
                this.reloadAsyncData();
            }
        },
        closeModal() {
            this.reloadAsyncData();
        },
        confirmModal(data) {
            // 确认删除
            if (data.action === 'deleteGallery') {
                this.showModal = false;
                api.delete({
                    url: this.url + this.gid + '/'
                }).done(() => this.reloadAsyncData());
            }
        }
    },
    asyncData (resolve, reject) {
        if (!this.uid) {
            return;
        }
        let self = this;
        this.fetch().done(function () {
            this.gallerys = this.data.galleries;
            this.cates = this.data.cates;
            self.$dispatch('getCates', this.data.cates);
            resolve(this);
        });
    },
    watch: {
        uid() {
            this.reloadAsyncData();
        },
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
            this.uid = this.uid || utils.getURLParam('uid');
            this.url = constant.API.USER + this.uid + constant.API.GALLERY;
            return api.get({
                url: this.url,
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
        changeSort (e) {
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
        },
        // 编辑相册
        editGallery(gallery) {
            this.$dispatch('editGallery', gallery);
        },
        // 弹出警告弹窗删除相册
        deleteGallery(id) {
            this.showModal = true;
            this.gid = id;
        },
        showEditbar(e) {
            let el = e.target;
            let $el = $(el);
            $el.find('.edit-bar').show();
        },
        hideEditbar(e) {
            let el = e.target;
            let $el = $(el);
            $el.find('.edit-bar').hide();
        }
    },
    data () {
        return {
            url: '',
            gid: '', //当前相册的ID
            query: {},
            cates: [],
            info: {},
            data: {},
            success: false,
            gallerys: [],
            showModal: false,
            deleteModalCSS: {
                width: 420,
                height: 200
            }
        };
    }
};
</script>
<style lang="less">
@import (reference) 'src/assets/css/base';
.container {
  min-width: 1280px;
}
.sort {
  padding-top: 10px;
  height: 50px ;
  line-height: 50px;
}
.condition {
  width: 400px;
  margin: auto;
}
.wrap-inner[__vuec__] {
  padding: 30px 30px 40px 30px;
  border-top: 1px solid #e5e5e5;
  background: #f4f4f4;
  height: 770px;
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
        .edit-bar {
          display: none;
          position: absolute;
          height: 40px;
          z-index: 1;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, .8);
          .edit {
            cursor: pointer;
            color: @cyan;
            height: 40px;
            width: 40px;
            background: url(./edit.png) no-repeat center;
            &:hover {
              background: url(./edit_hover.png) no-repeat center;
            }
          }
          .delete {
            height: 40px;
            width: 40px;
            background: url('./delete.png') no-repeat center;
            &:hover {
              background: url(./delete_hover.png) no-repeat center;
            }
          }
        }
        .wrap {
          padding: 10px;
          display: block;
          margin: auto;
          width: 222px;
          height: 200px;
          background: #fff;
          .close {
            right: 0;
            top: 0;
            font-size: 16px;
            position: absolute;
          }
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
          width: 222px;
          margin: auto;
          border-radius: 0;
          background: #fff;
          margin-left: 0;
          margin-right: 0;
          .img {
            float: left;
            img {
              top: 10px;
              height: 24px;
              width: 24px;
              border-radius: 1.2rem;
            }
          }
          .name {
            font-size: 1.4rem;
            color: #333;
            overflow: hidden;
            text-align: left;
            text-indent: 20px;
          }
        }
      }
    }
  }
}
</style>
