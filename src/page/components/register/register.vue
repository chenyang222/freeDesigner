<template lang="jade">
div.mt-60
  .fl.mobile
    input(v-model="mobile", placeholder="您的手机号码", maxlength=11)
  .btn.fl.ml-10(@click="getVerifyCode")
    a 获取验证码
.clear
div.mt-70
  .fl.password
    input(v-model="password", placeholder="设置密码 区分大小写", maxlength=12, type="password")
.clear
div.mt-70
  .fl.verify-code
    input(v-model="vcode", placeholder="输入验证码", maxlength=6)
  .btn.fl.ml-10(@click="register")
    a 注册
</template>
<script>
import constant from '/src/assets/js/constant';
import api from '/src/assets/js/api';
export default {
    methods: {
        register() {
            let data = {
                mobile: this.mobile,
                password: this.password,
                vcode: this.vcode
            }
            api.post({
                url: constant.API.REGISTER,
                data: data
            }).done(() => {
                window.location.href = constant.PATH.LOGIN;
            });
        },
        // 获取手机验证码
        getVerifyCode() {

        }
    },
    data () {
        let mobile = Math.random()*100000;
        mobile = mobile.toFixed(0);
        return {
            mobile: mobile,
            password: '123456',
            vcode: ''
        };
    }
}
</script>