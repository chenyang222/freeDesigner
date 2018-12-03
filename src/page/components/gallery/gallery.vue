/**
    @desc: 热点相册点击的overlay, 更多作品
*/
<template lang="jade">
div.gallerys(__vuec__)
  div.gallery.fl(v-for="(outter, gallery) in gallerys")
    .wrap(:class="{active: gallery.id === galleryid}")
      a(href="javascript:;", @click="changeGallery(gallery, $event)")
        img(:src="gallery.thumb", border="0")
</template>
<script>
import api from '/src/assets/js/api';

export default {
    props: ['ids'],
    asyncData (resolve, reject) {
        if (!this.ids.id || !this.ids.uid) {
            return;
        }
        this.fetch().done(function () {
            this.gallerys = this.data.galleries;
            this.cates = this.data.cates;
            resolve(this);
        });
    },
    watch: {
        // 从hot-gallery点击过来的时候，显示不同的更多相册
        ids: {
            deep: true,
            handler (val) {
                this.url = constant.API.USER + val.uid + constant.API.GALLERY;
                this.galleryid = val.id;
                this.query = {
                    page: val.page || this.query.page,
                    per_page: val.per_page || this.query.per_page
                };
                this.reloadAsyncData();
            }
        }
    },
    methods: {
        // 获取当前用户的相册集
        fetch () {
            return api.get({
                url:  this.url,
                data: this.query
            });
        },
        // 根据相册ID展示相册里面的图片，点击遮罩更多相册的其中一个相册
        changeGallery (gallery, e) {
            this.$dispatch('changeGallery', {
                data: gallery,
                showModal: true
            });
            e.preventDefault();
        }
    },
    data () {
        return {
            query: {
                page: this.ids.page || 1,
                per_page: this.ids.per_page || 4
            },
            url: constant.API.USER + this.ids.uid + constant.API.GALLERY,
            galleryid: this.ids.id,
            data: [],
            info: {},
            success: false,
            gallerys: [],
            cates: []
        };
    }
};
</script>
<style lang="less">
.gallerys[__vuec__] {
  padding-top: 18px;
  padding-bottom: 30px;
  margin-left: -20px;
  .gallery {
    cursor: pointer;
    display: table-cell;
    margin-left: 20px;
    margin-top: 20px;
    .wrap {
      display: block;
      margin: auto;
      width: 116px;
      height: 86px;
      img {
        width: 116px;
        height: 86px;
        display: block;
      }
      span {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #ccc;
      }
    }
  }
}
</style>
