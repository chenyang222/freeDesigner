<template lang="jade">
modal(:show.sync="show", :css="{width: 640, height: 600}")
  .slot-header(slot="header") 上传作品
  .slot-body.mt-40(slot="body", __vuec__)
    ul.works.mt-30
      li(v-for="work in works")
        .close(@click="deleteWork(work.id)") x
        a(@mouseenter="show")
          img(:src="work.mid_image")
      li.upload(@click="uploadWork") +
    upload(type="work")
  div(slot="footer")
</template>
<script type="text/javascript">
import constant from '/src/assets/js/constant';
import api from '/src/assets/js/api';
import modal from 'src/public/modal/modal';
import upload from 'src/public/upload/upload';

export default {
    components: {
        modal,
        upload
    },
    // 接受父组件广播过来的事件
    events: {
        changeGallery(params) {
            this.show = params.showModal || false;
            let gid = params.data.id;
            this.url = constant.API.USER_GALLERY + gid + constant.API.IMAGE;
        },
        uploadComplete(resp) {
            let data = {
                name: '',
                image: resp.data
            };
            api.post({
                url: this.url,
                data
            }).done(() => {
                this.reloadAsyncData();
            });
        }
    },
    asyncData(resolve) {
        if (!this.url) {
            return;
        }
        this.fetch().done(function () {
            this.works = this.data;
            resolve(this);
        });
    },
    watch: {
        url() {
            this.reloadAsyncData();
        }
    },
    methods: {

        // 上传作品到指定的相册，如果没有，则新建
        uploadWork() {
            document.getElementById('upload').click();
        },
        fetch () {
            return api.get({
                url: this.url
            });
        },
        deleteWork(id) {
            api.delete({
                url: this.url + id + '/'
            }).done(() => this.reloadAsyncData());
        }
    },
    data() {
        return {
            works: [],
            url: '',
            show: false,
            data: {},
            info: {},
            success: false
        };
    }
}
</script>
<style lang="less">
.slot-body[__vuec__] {
  height: 500px;
  overflow: auto;
  .new {
    input {
      border: 0;
      border-radius: 0;
      border-bottom: 1px solid #ccc;
    }
  }
  .works {
    li {
      float: left;
      width: 200px;
      height: 150px;
      border: 1px solid #ccc;
      margin-left: 30px;
      margin-top: 30px;
      padding: 10px;
      position: relative;
      img {
        height: 100%;
        margin: auto;
        display: block;
        max-width: 100%;
      }
      .close {
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        font-size: 16px;
      }
      &.upload {
        line-height: 120px;
        text-align: center;
        font-size: 8rem;
        cursor: pointer;
      }
    }
  }
}
</style>
