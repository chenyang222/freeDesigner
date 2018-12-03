<template lang="jade">
modal(:show.sync="showModal")
  .slot-header(slot="header")
  .slot-body(slot="body", __vuec__)
    .avatar
      a(:href="publicURL")
        img.fl(:src="user_avatar")
        .bfc
          .name {{name}}
          .user 由{{username}} 上传 {{created_on | date}}
    .clear
    .fl
      work(:ids="ids")
    .bfc.ml-40
      .watching
        label 浏览总量
        .fr {{view_count}}
      .liking(@click="likeIt")
        img(src="./like.png")
        .fr.ml-10 {{like_count}}
      .more.mt-20
        .title
          a(:href="publicURL")更多作品
        gallery(:ids="ids", :created_on.sync="created_on")
    .clear
    .desc.mt-20 {{desc}}
  .slot-footer(slot="footer")
</template>
<script>
import modal from '/src/public/modal/modal';
import api from '/src/assets/js/api';
import utils from '/src/assets/js/utils';
import gallery from '/src/page/components/gallery/gallery';
import work from '/src/page/components/work/work';

export default {
    components: {
        modal,
        gallery,
        work
    },
    // 接受其它组件分发过来的事件，hot-gallery 点击
    events: {
        changeGallery (gallery) {
            this.showModal = gallery.showModal;
            Object.assign(this, gallery.data);
            this.ids = {
                id: this.id,
                uid: this.uid
            };
            this.publicURL = constant.PATH.USER_PUB + '?uid=' + this.uid + '&id=' + this.id;
        }
    },
    methods: {
        likeIt() {
            let url = constant.API.LIKE_IT + this.id + '/';
            let self = this;
            api.post({
                url: url
            }).done(function () {
                self.like_count++;
            });
        }
    },
    data () {
        return {
            showModal: false,
            name: '龙湖御景中式别墅',
            username: '刀刀原创',
            user_avatar: '',
            created_on: '',
            view_count: 0,
            like_count: 0,
            desc: '',
            id: '',
            ids: {
                uid: '',
                id: ''
            },
            publicURL: '',
            andSymbol: '&'
        };
    }
};
</script>
<style lang="less">
@import (reference) '/src/assets/css/components/button';
.modal-container {
  height: 640px;
  width: 840px;
  overflow-y: auto;
}
.slot-body[__vuec__] {
  overflow-y: auto;
  .bfc {
    .watching,
    .liking,
    .more {
      font-size: 1.4rem;
      color: #999;
    }
    .watching,
    .liking {
      border-bottom: 1px solid #999;
      height: 48px;
      line-height: 48px;
      cursor: pointer;
    }
    .liking img{
      position: relative;
      top: 5px;
    }
  }
  .avatar {
    height: 46px;
    line-height: 40px;
    text-indent: 30px;
    width: 280px;
    img {
      height: 48px;
      width: 48px;
      border-radius: 24px;
    }
    .name {
      font-size: 1.6rem;
      color: #333;
    }
    .user {
      font-size: 1.4rem;
      color: #999;
      position: relative;
      top: -20px;
    }
  }
  .desc {
    font-size: 1.4rem;
    color: #333;
  }
}
</style>