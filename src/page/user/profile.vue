<template lang="jade">
dheader
.profile(__vuec__)
  tab
  .bfc.detail.mt-20
    .avatar-container
      .avatar
        img(:src="avatar")
      .avatar-config.btn.mt-20
        a(@click="configAvatar") 设置头像
        cutimg(:maxsize="maxsize")
      .prompt.mt-30 JPG或PNG格式，不超过800K
    div.mt-30(style="border-top:2px solid #cccccc;border-bottom:2px solid #cccccc;padding:15px 0;font-size:12px")
      span(style="margin:0px 10px")
        b 资产情况：
      span(style="margin:0px 10px") 可用积分：{{userinfo.available_points}}
      span(style="margin:0px 10px") 可提现积分：{{userinfo.available_cash_points}}
    input.name.mt-30(placeholder="您的尊称", v-model="name")
    input.name.mt-30(placeholder="我的年龄", v-model="age")
    input.name.mt-30(placeholder="从业年限", v-model="career")
    textarea.desc.mt-30(placeholder="您的简介", v-model="desc")
    .professional.mt-20
      .title 请选择承接业务类型（请最多选择两个技能）
      ul.roles
        li(v-for="_role in allRoles",
        @click="selecteRole",
        :class="{active: role.indexOf(_role) !== -1 }") {{_role}}
    .clear
    .save.btn.mt-30(@click="save")
      a 保存设置
</template>
<script>
import {Vue, dheader} from 'src/assets/js/page';
import tab from 'src/page/user/tab';
import cutimg from 'src/public/cutimg/cutimg';
import utils from 'src/assets/js/utils';
import api from 'src/assets/js/api';
import $ from 'jquery';
import eventVue from '../../assets/js/eventVue'

export default {
    components: {
        dheader,
        cutimg,
        tab
    },
    asyncData (resolve, reject) {
        // 绑定用户信息
        window.userStat.done(function () {
            console.info(this.data)
            resolve(this.data);
        });
    },
    events: {
        // 上传图像完毕, 接受cutimg 的时间广播
        uploadComplete (e) {
            let resp = JSON.parse(e.target.responseText);
            this.avatar = resp.data['168x168'];
            this.saveAvatar();
        }
    },
    created(){
        this.getUser()
    },
    methods: {
        // 获取选择的role
        getSelectRoles () {
            let $selectedRoles = $('.roles li.active');
            let roles = [];
            $selectedRoles.each((index, item) => {
                let role = $(item).text();
                roles.push(role);
            });
            return roles.join();
        },
        // 选择一个专业
        selecteRole (e) {
            let el = e.currentTarget;
            let $el = $(el);
            let role = this.role.split(',');
            let $selectedRoles = $('.roles li.active');
            if ($selectedRoles.length >= 2 && !$el.hasClass('active')) {
                return;
            }
            $el.toggleClass('active');
            let roleTxt = $el.text().trim();
            if ($el.hasClass('active')) {
                role.push(roleTxt);
            }
            else {
                role = utils.without(role, roleTxt);
            }
            this.role = role.join();
        },
        // 设置头像，触发cutimg组件的input[type="file"]控件的点击事件
        configAvatar() {
            $('#cutimg').click();
        },
        patch(data) {
            let url = this.url;
            api.patch({
                url,
                data
            });
        },
        // 保存用户设置
        save () {
            let data = {
                name: this.name,
                desc: this.desc,
                avatar: this.avatar,
                role: this.role,
                career: this.career,
                age: this.age
            };
            this.patch(data);
        },
        saveAvatar() {
            this.patch({
                avatar: this.avatar
            });
        },
        getUser:function(){
            eventVue.$on("userinfo",(data)=>{   //这里最好用箭头函数，不然this指向有问题
                this.userinfo = data;
            })
        }

    },
    data () {
        let id = utils.getURLParam('id');
        let uid = utils.getURLParam('uid');
        let url = constant.API.USER;// + this.id + '/';
        return {
            userinfo:'',
            url: url,
            view_count: 0,
            like_count: 0,
            gender: '',
            age: '',
            id: '',
            // 头像的大小
            maxsize: 800,
            // user info start
            avatar: '',
            desc: '',
            name: '',
            role: '',
            // user info end
            allRoles: [
                '主案设计',
                '软装配饰',
                '造价预算',
                '施组编制',
                '效果图',
                '施工图',

                '项目经理',
                '风水设计',
                '平面规划',
                '声学设计',
                '灯光设计',

                '强电系统',
                '弱电系统',
                '园林设计',
                '暖通系统',
                '建筑结构'
            ],
            ids: {
              id: id,
              uid: uid,
              page: 1,
              per_page: 100
            },
            province: '',
            available_cash_points: '',
            city: '',
            is_recommend: '',
            available_points: '',
            audit_status: '',
            download_count: '',
            career: '',
            license_pic: '',
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
    overflow-y: auto;
    .avatar-container,
    .avatar,
    .avatar-config,
    .btn {
      margin: auto;
    }
    .avatar-container {
      width: 240px;
      margin-top: 50px;
      text-align: center;
    }
    .avatar {
      width: 173px;
      height: 173px;
      overflow:hidden;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
      }
    }
    .prompt{
      text-align: center;
      font-size: 1.4rem;
    }
    .avatar-config,
    .save {
      width: 82px;
    }
    .name{
        height: 41px;
    }
    .name,
    .desc {
    //   background: #eee;
      width: 100%;
    }
    .desc {
      height: 128px;
    }
    .professional {
      .title {
        font-size: 14px;
      }
      .roles {
        margin-left: -11px;
        li {
          float: left;
          cursor: pointer;
          width: 80px;
          font-size: 14px;
          border: 1px solid #999;
          border-radius: 10px;
          margin-left: 11px;
          margin-top: 12px;
          text-align: center;
          &.active {
            border: 1px solid @cyan;
            color: @cyan;
          }
          &:hover {
            border: 1px solid @cyan;
            color: @cyan;
          }
        }
      }
    }
  }
}
</style>
