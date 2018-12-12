/**
  @file: 用户-个人空间
  @author: lisen
  @date: 2016-08-27
*/

<template lang="jade">
dheader
modal.addGallery(:show.sync="showModal", :css="{width: 640, height: 600}")
  header(slot="header") 新建相册
  .body(slot="body", __vuec__)
    .mt-20
      label 相册名称
      input.name.ml-20(v-model="gname", placeholder="相册名称")
    .mt-20
      label.fl 选择分类
      select.fl.name.ml-20(v-model="scate", placeholder="相册名称")
        option(value="all", selected) 请选择
        option(v-for="scate in scates") {{scate}}
    .clear
    .mt-30
      label 描述
      textarea.desc.ml-20(v-model="gdesc", placeholder="相册描述")
    .mt-20
      label 设计理念
      textarea.desc.ml-20(v-model="concept", placeholder="请描述您作品的设计理念")
    .mt-20
      a(href="javascript:;", @click="uploadWork" class="uploadWork btn") 点击上传
      a(href="javascript:;") {{ fname }}
      upload(type="work", maxsize="2*1024", class="upload")
  div(slot="footer")
    .btn.mr-20.fr
      a(v-if="type === 'create'", @click="createGallery") 确定
      a(@click="createGallery") 保存
.profile(__vuec__)
  tab
  .bfc.detail.mt-20
    .avatar-container
      .avatar.fl ?
        img(:src="avatar")
      .desc.bfc
        .fl.ml-40
          a.active {{name}}
        .fl.ml-10 的个人空间
        .fr.addWork.btn
          a(@click="showModal = true") 添加作品
    .clear
    // 用户自己的个人空间
    gallery(:uid="id", :type="type")
</template>
<script>
import upload from 'src/public/upload/upload';
import {Vue, dheader} from 'src/assets/js/page';
import tab from 'src/page/user/tab';
import utils from 'src/assets/js/utils';
import api from 'src/assets/js/api';
import gallery from 'src/page/components/user-gallery/gallery';
import modal from 'src/public/modal/modal';
import $ from 'jquery';

export default {
    components: {
        dheader,
        gallery,
        modal,
        tab,
        upload
    },
    asyncData (resolve, reject) {
        // 绑定用户信息
        window.userStat.done(function () {
            resolve(this.data);
        });
    },
    events: {
        // 获取分类
        getCates(scates) {
          this.scates = scates;
        },
        // 编辑相册
        editGallery(gallery) {
          this.type = 'patch';
          this.gname = gallery.name;
          this.scate = gallery.scate;
          this.gdesc = gallery.desc;
          this.showModal = true;
          this.download_url = gallery.download_url;
          this.concept = gallery.concept;
          this.gid = gallery.id;
          this.fname = gallery.fname;
        },
        uploadComplete(ret){
          this.download_url = ret.data[0][1];
          this.fname = ret.fname;
        }
    },
    methods: {
        uploadWork() {
          $('#upload').click();
        },
        // 创建相册还是编辑相册
        createGallery() {
          let url = constant.API.USER_GALLERY;
          if (!this.gname) return;
          if (this.cate === 'all') return;
          let data = {
            name: this.gname,
            scate: this.scate,
            desc: this.gdesc,
            download_url: this.download_url,
            concept: this.concept,
            fname: this.fname
          }
          let ajax = api.post;
          if (this.type === 'patch') {
              ajax = api.patch;
              url += this.gid + '/';
          }
          ajax({
              url,
              data
          }).done(() => {
              this.showModal = false;
              this.$broadcast('createGallery', true);
          });
        }
    },
    data () {
        return {
            scates: [],
            // 同步显示上传work的遮罩
            view_count: 0,
            like_count: 0,
            role: '',
            gname: '', // 相册名称
            gdesc: '', // 相册描述
            name: '',
            gender: '',
            desc: '',
            gid: '',
            age: '',
            avatar: '',
            scate: '',
            showModal: false,
            type: 'create', // new: 创建新的相册， add: 添加新的作品,  none: overlay;
            fname: '',
            download_url: '',
            concept: '',
            province: '',
            available_cash_points: '',
            city: '',
            is_recommend: '',
            available_points: '',
            audit_status: '',
            download_count: '',
            career: '',
            license_pic: '',
            id: '',
            mobile: '',
            apply_count: '',
            paied_points: '',
            license_id: '',
            gallery_count: '',
            remaining: ''
        };
    }
};
</script>
<style lang="less">
@import (reference) '/src/assets/css/variables';
.main {
  background: #eee;
  min-height: 1080px;
}
@profilePaddingTop: 40px;
.profile[__vuec__] {
  padding-left: 30px;
  padding-top: @profilePaddingTop;
  height: 348px;
  background: url('./bgline.png') repeat-x;
  color: #999;
  .detail {
    padding-left: 60px;
    padding-right: 60px;
    background: #fff;
    border-radius: 10px;
    margin-right: 50px;
    height: 920px;
    .avatar-container {
      margin-top: 50px;
      text-align: center;
    }
    .desc {
      height: 50px;
      line-height: 50px;
      font-size: 12px;
      a{
        font-size: 12px;
      }
    }
    .avatar {
      width: 50px;
      height: 50px;
      position: relative;
      overflow:hidden;
      img {
        height: 101%;
        width: 102%;
        position: absolute;
        left: 0;
        margin: -1px;
        top: -1px;
      }
      border-radius: 25px;
      background: #eee;
      color: #fff;
      text-align: center;
      line-height: 168px;
      font-size: 120px;
    }
  }
}
.addWork{
  width: 84px;
  height: 42px;
  a{
    font-size: 16px !important;
  }
}
select{
  color: #999;
}
.upload{
  display: none;
}
.addGallery {
  label {
    font-size: 14px;
    width: 80px;
    display: inline-block;
  }
  input, textarea {
    width: 80%;
  }
  textarea {
    height: 120px;
  }
  .btn {
      width: 80px;
  }
}
.modal-container {
  overflow: hidden;
}
.uploadWork{
  width: 104px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  color: #ffffff;
  margin-left: 100px;
  display: inline-block;
  margin-right: 5px;
}
</style>