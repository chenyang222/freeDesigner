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
                    background-color: red;
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

                span {
                    display: inline-block;
                    background-color: #3e94fb;
                    border-radius: 20px;
                    padding: 0 10px;
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
            a(href='') 首页
            a(href='') 我是雇主
            a(href='') 积分充值
            a(href='') 关于平台
        .item
            a(href='') 需求池
            a(href='') 我是工作者
            a(href='') 积分管理
            a(href='') 个人中心
    .r
        .qrcode
            img
            p 关注我们
        .info
            p 自由盟邦网服务热线
            h4 010-53393309
            p 客服QQ
                span 1776261265
            p 周一至周五：09:00—21:00
            p 周末及节假日：09:00—08:00
  div.bottom
    p Copyright © 2016 - 2020 free-designer.cn All rights reserved.自由工程协作平台©版权所有.
    p 京ICP备17002726号-1
</template>