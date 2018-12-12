<template lang="jade">
dheader
.profile(__vuec__)
  tab
  .bfc.detail.mt-20
    .avatar-container
      .avatar ?
        img(:src="avatar")
    input.origin(v-model="origin", placeholder="原密码", type="password", maxlength="12")
    input.mt-40(v-model="newPasswd", placeholder="新密码", type="password", maxlength="12")
    .wrap.mt-40
      input.again.fl(v-model="againPasswd", placeholder="再次输入新密码", type="password", maxlength="12")
      .btn.fl.ml-20.updatePasswd
        a(@click="updatePasswd") 更新密码
    .clear
    .mt-50.title 应国家全网实名制的要求，请认证个人身份信息
    //- input.mt-40(v-model="realname", placeholder="请输入真实姓名进行认证")
    .wrap.mt-40
      input.fl(v-model="license_id", placeholder="请输入身份号码进行认证")
      .clear
    .userImg.mt-4
      p 请上传本人手持身份证照片
      img(:src="userImg", @click="uploadWork")
      upload(type="work", maxsize="2*1024", class="upload")
    .btn.authoriedID
      a(@click="authoriedID") 认证
</template>
<script>
import {Vue, dheader} from 'src/assets/js/page';
import tab from 'src/page/user/tab';
import cutimg from 'src/public/cutimg/cutimg';
import utils from 'src/assets/js/utils';
import api from 'src/assets/js/api';
import $ from 'jquery';
import upload from 'src/public/upload/upload';

function without(array, val) {
    let len = array.length;
    for (let i = len - 1;i >= 0; i--) {
        let v = array[i];
        if (v === val) {
            array.splice(i, 1);
        }
    }
    return array;
}

export default {
    components: {
        dheader,
        cutimg,
        tab,
        upload
    },
    asyncData (resolve, reject) {
        // 绑定用户信息
        window.userStat.done(function () {
          this.data.userImg = this.data.license_pic ? this.data.license_pic : './userBg.png';
          resolve(this.data);
        });
    },
    events: {
      // 上传类似作品
      uploadComplete(ret) {
        this.userImg = ret.data[0][1]
      }
    },
    methods: {
        authoriedID() {
            let data = {
              license_pic: this.userImg,
              license_id: this.license_id
            }
            const url = '/api/users/' + this.id + '/';
            api.patch({
                url,
                data
            });
        },
        updatePasswd() {
            let url = constant.API.USER_RESETPASSWORD;
            let data = {
                origin: this.origin,
                new_passwd: this.newPasswd,
                again_passwd: this.againPasswd
            };
            api.patch({
                url,
                data
            });
        },
        uploadWork() {
          $('#upload').click();
        },
    },
    data () {
        let id = utils.getURLParam('id');
        let uid = utils.getURLParam('uid');
        return {
            // user info start
            avatar: '',
            role: '',
            name: '',
            gender: '',
            id: '',
            age: 0,
            desc: '',
            view_count: 0,
            like_count: 0,
            ids: {
              id: id,
              uid: uid
            }
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
    overflow-y: auto;
    .avatar-container,
    .avatar,
    .avatar-container {
      width: 240px;
      text-align: center;
      margin: auto;
      margin-top: 50px;
    }
    .avatar {
      width: 168px;
      height: 168px;
      position: relative;
      overflow:hidden;
      img {
        height: 101%;
        width: 102%;
        position: absolute;
        left: 0;
        margin: -1px;
      }
      border-radius: 89px;
      background: #eee;
      color: #fff;
      text-align: center;
      line-height: 168px;
      font-size: 120px;
    }
    .title {
      text-align: center;
      font-size: 16px;
    }
    input {
      &.origin {
        margin-top: 130px;
      }
      display: block;
      width: 100%;
      &.again {
        width: 80%;
      }
    }
    .authoriedID{
      width: 84px;
      margin: 23px auto;
    }
    .userImg{
      p{
        text-align: center;
        font-size: 14px;
        margin-bottom: 8px;
      }
      img{
        width: 283px;
        height: 195px;
        margin: 0 auto;
        display: block;
        cursor: pointer;
      }
      .upload{
        display: none;
      }
    }
  }
}
</style>