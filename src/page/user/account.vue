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
    input.mt-40(v-model="realname", placeholder="请输入真实姓名进行认证")
    .wrap.mt-40
      input.fl.again(v-model="realid", placeholder="请输入身份号码进行认证")
      .btn.fl.ml-20.authoriedID
        a(@click="authoriedID") 认证

</template>
<script>
import {Vue, dheader} from 'src/assets/js/page';
import tab from 'src/page/user/tab';
import cutimg from 'src/public/cutimg/cutimg';
import utils from 'src/assets/js/utils';
import api from 'src/assets/js/api';
import $ from 'jquery';

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
        tab
    },
    asyncData (resolve, reject) {
        // 绑定用户信息
        window.userStat.done(function () {
            resolve(this.data);
        });
    },
    methods: {
        authoriedID() {

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
        }
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
  background: #999;
  color: #999;
  .detail {
    padding-left: 60px;
    padding-right: 60px;
    background: #fff;
    border-radius: 10px;
    margin-right: 50px;
    height: 920px;
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
  }
}
</style>