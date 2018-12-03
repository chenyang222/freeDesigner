<template lang="jade">
div.title 登录
.fl.mt-100
  div
    label 输入您的手机号码
    input(v-model="mobile", placeholder="请输入您注册的手机号")
  div.mt-20
    label 输入密码
    input(v-model="password", type="password", placeholder="请输入密码")
  div.mt-20
    div.btn(@click="login")
      a(href="javascript:;") 登录
.slogon.fl.ml-40.mt-100
  img(src="src/page/login/logo.png")
  div.mt-10 Free interior Designer
  div(style="margin-top:5px; font-size: 14px;") 室内设计师场景的合作交易平台
.clear
.bottom.mt-100
  a(href="/register/register.html") 没有注册吗？
</template>
<script>
import constant from '/src/assets/js/constant';
import api from '/src/assets/js/api';
export default {
    methods: {
        login () {
            let data = {
                mobile: this.mobile,
                password: this.password
            }
            api.post({
                url: constant.API.LOGIN,
                data: data
            }).done(() => {
                window.location.href = constant.PATH.HOME;
            });
        }
    },
    data () {
        return {
            mobile: '',
            password: ''
        };
    }
}
</script>