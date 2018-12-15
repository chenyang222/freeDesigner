<style lang="less">
@import (reference) '/src/assets/css/base.less';

.footer[__vuec__] {
    height: @h-footer;
    background-color: #bababa;
    font-size: 12px; // 1.2rem
    color: #fff;

    .container {
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid #fff;
        height: 240px;
        .l {
            margin-top: -40px;
            .item {
                a {
                    display: inline-block;
                    width: 120px;
                    text-align: center;
                    font-size: 16px;
                    color: #fff;
                }
            }
        }
        .r {
            display: flex;
            .qrcode {
                img {
                    width: 122px;
                    height: 122px;
                }
                p {
                    text-align: center;
                }
            }
            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                margin-left: 20px;
                height: 122px;
                p,h4 {
                    margin: 0;
                }

                a {
                    display: inline-block;
                    background-color: #3e94fb;
                    border-radius: 20px;
                    padding: 0 10px;
                    margin-left: 10px;
                    vertical-align: middle;
                }
            }
        }
    }

    .bottom {
        text-align: center;
        padding-top: 30px;
        box-sizing: border-box;
    }
}

</style>
<template lang="jade">
footer.footer(__vuec__)
  div.container
    .l
        .item
            a(href='/') 首页
            a(href='{{ORDER_PUB_MANAGEMENT}}') 我是雇主
            a(href='{{ORDER_INTEGRAL}}') 积分充值
            a(href='/about.html') 关于平台
        .item
            a(href='{{ORDER_DEMAND}}') 需求池
            a(href='{{ORDER_APPLY_MANAGEMENT}}') 我是工作者
            a(href='{{ORDER_INTEGRAL}}') 积分管理
            a(href='{{USER_PROFILE}}') 个人中心
    .r
        .qrcode
            img(src="/src/page/components/footer/weixin.png")
            p 关注我们
        .info
            p 自由盟邦网服务热线
            h4 010-53393309
            p 客服QQ
                a(href="http://shang.qq.com/email/stop/email_stop.html?qq=1776261265&sig=a1c657365db7e82805ea4b2351081fc3ebcde159f8ae49b1&tttt=1")
                    img(src="/src/page/components/footer/qq.png") 
                    span 1776261265
            p 周一至周五：09:00—21:00
            p 周末及节假日：09:00—08:00
  div.bottom
    p Copyright © 2016 - 2020 free-designer.cn All rights reserved.自由工程协作平台©版权所有.
    p 京ICP备17002726号-1
</template>

<script>
import constant from '/src/assets/js/constant';
import _ from 'lodash';
export default {
    data() {
        return _.merge({}, constant.PATH);
    }
}
</script>
