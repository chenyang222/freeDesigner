<template>
    <dheader></dheader>
    <div class="container">
        <form class="cont layui-form"><h2 class="title">第一步：选择溜币充值套包</h2>
            <ul class="package row clearfix">
                <li v-for="(index,item) in list" @click="prestore_info(index,item.id)">
                    <label :class="{active:active_index === index}">
                        <dl>
                            <dt>
                                <h3><span>{{item.total_points}}积分</span></h3>
                                <p>积分:{{item.ori_points}} 赠送:{{item.extra_points}} </p>
                                <span class=""> &nbsp; {{item.name}} </span>
                            </dt>
                            <dd>
                                <p><span class="package_price js">{{item.order_cost}}元</span></p>
                            </dd>
                        </dl>
                        <span class="iconfont"><i>✓</i></span>
                    </label>
                </li>
            </ul>
            <!--<h2 class="title">第二步：选择优惠信息</h2>-->
            <!--<div class="discount">-->
            <!--<div class="layui-inline">-->
            <!--<div class="layui-input-inline"><select lay-ignore="" id="changeCoupon">-->
            <!--<option value="">选择优惠信息</option>-->
            <!--<option value="">暂无优惠券可使用</option>-->
            <!--</select></div>-->
            <!--</div>-->
            <!--</div>-->
            <h2 class="title">第二步：选择支付方式并付款</h2>
            <div class="payway clearfix">
                <label class="wechatpay" data-payway="0">
                    <i class="iconfont"></i>
                </label>
            </div>
            <div class="payway clearfix">
                <button type="button" id="goToPayBt" class="click-botton" @click="pay">立即支付</button>
            </div>
        </form>

        <div class="wrap-info" v-show="isShow== true">
            <div class="wrap-info-block" v-show="isSuccessShow">
                <div><img src="./images/yes.png"/></div>
                <div class="wrap-txt">
                    <span>购买：{{list[active_index].ori_points}}</span>&nbsp;&nbsp;
                    <span>赠送：{{list[active_index].extra_points}}</span>
                    <span>支付：{{list[active_index].order_cost}}</span>
                </div>
                <div class="">
                    <a class="btn" href="/">返回首页</a>
                    <span class="btn" style="background-color: #fa7d3e" @click="backThisPage">继续购买</span>
                </div>
            </div>
            <div class="pay-code" v-if="isIframe">
                <div><img :src="orderUrl" class="code-img" /></div>
                <div class="loading"><img src="./images/loading.gif">支付中...</div>
            </div>
        </div>

    </div>

</template>

<script>
    import {Vue, dheader} from 'src/assets/js/page';
    import api from 'src/assets/js/api';
    import mixins from 'src/page/mixins';
    import $ from 'jquery';
    var serIntervalSuccess;
    export default {
        name: "integral",
        mixins: [mixins],
        components: {
            dheader
        },
        created() {
            this.get_add_prestore()
        },
        asyncData(resolve) {
            this.get_add_prestore().done(function () {
                this.list = this.data;
                resolve(this);
            });

        },

        methods: {
            get_add_prestore() {
                let vm = this;
                return api.get({
                    url: vm.url,
                })

            },
            prestore_info(index, id) {
                this.active_index = index;
                this.designerID = id;
            },
            pay() {
                let vm = this;


                if (vm.designerID == '') {
                    alert('请选择购买积分')

                } else {
                    var r = confirm("确认支付?")
                    if (r == true) {
                       api.post({
                            url: constant.API.PAY_CREATE_ORDER,
                            data: {
                                goods_id: this.designerID,
                                goods_type: 'prestore',
                                price_type: 'prestore',
                                pay_type: 1,
                                pay_from:'pc'
                            }
                        }).done(function() {
                           vm.orderUrl = this.data.url;
                           vm.orderId = this.data.id;
                           vm.isIframe = true;
                           vm.isShow = true;
                           vm.isSuccessShow = false;
                           serIntervalSuccess = setInterval(()=>{
                               vm.getSuccess()
                           },3000)
                        });
                    }
                }
            },
            getSuccess(){
                let vm = this;

                api.get({
                    url: constant.API.PAY_CHECK,
                    data: {
                        order_id: vm.orderId,
                    }
                }).done(function() {
                    if(this.data.is_paied == true){
                        clearInterval(serIntervalSuccess);
                        vm.isIframe = false;
                        vm.isShow = true;
                        vm.isSuccessShow = true;
                        // vm.$router.push({ path: '/mySuccess' })
                    }
                });
            },
            backThisPage(){
                let vm = this;
                vm.isShow = false;
                vm.isSuccessShow = false;
            }
        },
        data() {
            return {
                url: constant.API.GET_ADD_PRESTORE,
                list: '',
                active_index: '',
                designerID: '',
                isShow: false,
                orderUrl: '',
                orderId: '',
                isIframe: false,
                isSuccessShow:false
            }
        }
    }
</script>

<style scoped>
    .wrap-info{
        background-color: rgba(0, 0, 0, 0.44);
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        overflow: hidden;
    }

    .wrap-info-block{
        height: 400px;
        width: 400px;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        padding: 30px 0;
        background-color: #ffffff;
        border-radius: 10px;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #cccccc;
    }
    .wrap-txt{
        font-size: 14px;
        color: #666666;
        margin: 20px;
    }
    .wrap-info-block img{
        margin-top: 20px;
        width: 80px;
        height: 80px;
    }
    .btn{
        margin-top: 15px;
        width: 100px;
        height: 35px;
        line-height: 40px;
        border: 1px solid #cccccc;
        display: inline-block;
        margin: 0 10px;
    }
    .title {
        font-weight: normal;
        font-size: 24px;
        line-height: 24px;
        margin-top: 30px;
    }

    .package {
        margin: -6px;
        margin-top: 20px;
    }

    .package li {
        width: 300px;
        float: left;
    }

    .package li label {
        display: block;
        margin: 6px;
        background: #fff;
        border: solid 1px #e2e2e2;
        text-align: center;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .package li span.js {
        font-size: 16px;
        color: #ff9900;
    }

    .package .recommend {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 0;
        height: 0;
        border-top: 22px dashed #f90;
        border-top: 22px solid #f90 \9;
        border-left: 22px dashed #f90;
        border-left: 22px solid #f90 \9;
        border-right: 22px solid transparent;
        border-bottom: 22px solid transparent;
    }

    .package .recommend-txt {
        font-size: 14px;
        color: #fff;
        position: absolute;
        top: 4px;
        left: 0px;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    .package li label > input {
        position: absolute;
        left: 0;
        top: 0;
        cursor: pointer;
        opacity: 0;
        filter: alpha(opacity=0);
    }

    .package li label > .iconfont {
        position: absolute;
        bottom: -30px;
        right: -30px;
        font-size: 25px;
        height: 60px;
        width: 60px;
        color: #ffffff;
        background-color: #ff9900;
        display: none;
        font-weight: 200;
        text-align: left;
        transform: rotate(45deg);
        /*margin-left: 30px;*/
        line-height: 60px;
        padding: 0;
    }

    .package li label > .iconfont i {
        /*-webkit-transform: rotate(-45deg);*/
        /*-moz-transform: rotate(-45deg);*/
        /*-ms-transform: rotate(-45deg);*/
        /*-o-transform: rotate(-45deg);*/
        transform: rotate(-45deg);
        display: inline-block;
        margin: 0;
        padding: 0;
    }

    .package li label.active {
        border-color: #ff9900;
    }

    .package li label.active > .iconfont {
        display: inline-block;
    }


    .package li dt {
        padding-bottom: 10px;
        line-height: 1.6;
    }

    .package li dt h3 {
        font-weight: normal;
        font-size: 16px;
    }

    .package li dt h3 span {
        font-size: 22px;
    }

    .package li dt p {
        font-size: 12px;
        color: #999;
    }

    .package li dt > span {
        text-align: center;
        font-size: 12px;
        color: #999;
    }

    .package li dd {
        margin: 0 10px;
        padding-top: 10px;
        font-size: 16px;
        line-height: 26px;
        border-top: dashed 1px #e2e2e2;
    }

    .package li dd .usfee {
        display: none;
        color: #666;
    }

    .payway {
        margin-top: 20px;
    }

    .payway label {
        display: block;
        float: left;
        width: 156px;
        height: 40px;
        overflow: hidden;
        margin-left: 12px;
        border: solid 1px #e2e2e2;
        background-color: #fff;
        cursor: pointer;
        position: relative;
    }

    .payway label:first-child {
        margin-left: 0;
    }

    .payway label.active {
        border-color: #ff9900;
    }

    .payway label.active .iconfont {
        display: inline-block;
    }

    .payway label input {
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
        opacity: 0;
        filter: alpha(opacity=0);
    }

    .payway label .iconfont {
        position: absolute;
        right: -1px;
        bottom: -1px;
        font-size: 24px;
        color: #ff9900;
        height: 24px;
        line-height: 24px;
        display: none;
    }

    .alipay {
        background: url(./images/icon-pay.png) no-repeat 38px 2px;
    }

    .wechatpay {
        background: url(./images/icon-pay.png) no-repeat 18px -36px;
    }

    .paypal {
        background: url(./images/icon-pay.png) no-repeat 29px -72px;
    }

    .codebox {
        margin-top: 20px;
        background: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        min-height: 305px;
        display: none;
    }

    .codebox > dl {
        display: none;
        margin: 0 auto;
    }

    .ali-code {
        width: 438px;
    }

    .wechat-code {
        width: 182px;
    }

    dl.paypal-code {
        width: 320px;
        margin-top: 50px;
    }

    .paypal-code .pay-usfee {
        font-size: 20px;
        margin-bottom: 10px;
    }

    .paypal-code p {
        color: #666;
        margin-top: 10px;
    }

    .codebox td, .codebox th {
        margin: 0;
        padding: 0;
    }

    .codebox dt {
        float: left;
        width: 182px;
        margin: 0 auto;
    }

    .codebox dt div {
        width: 160px;
        height: 160px;
        padding: 10px;
        background: #fff;
        border: solid 1px #e2e2e2;
    }

    .codebox dt p {
        margin-top: 5px;
        text-align: center;
        color: #666;
    }

    .codebox dd {
        float: left;
        text-align: center;
    }

    .codebox dd span {
        display: inline-block;
        margin: 0 50px;
        line-height: 190px;
        color: #666;
    }

    .codebox dd button {
        background: #ff9900;
        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        line-height: 36px;
        padding: 0 15px;
    }

    .tips {
        margin-top: 55px;
        line-height: 2;
        color: #666;
    }

    .tips h3 {
        font-weight: normal;
        font-size: 16px;
    }

    .tips a {
        color: #666;
    }

    .red-color {
        color: red;
    }

    .click-botton {
        width: 158px;
        background: #ff9900;
        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        line-height: 38px;
        padding: 0 15px;
    }

    .discount select {
        margin-top: 20px;
        font-family: 'Microsoft Yahei';
        border: solid 1px #e6e6e6;
        width: 182px;
        height: 42px;
        padding: 10px 0 10px 10px;
        outline: none;
        cursor: pointer;
    }

    .col-md-3 {
        width: 300px;
        float: left;
    }

    .clearfix:after {
        clear: both;
        display: block;
        content: '';
        overflow: hidden;
    }
    .iframe-pay{
        position: fixed;
        width: 100%;
        height: calc(100% - 56px);
        top: 56px;
        left: 0;
        border: 0;
        z-index: 10;
    }
    .loading{
        width: 100%;
        height: 60px;
        text-align: center;
        z-index: 11;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        color: #ffffff;

    }
    .loading img{
        height: 40px;
        width: 40px;
    }
    .pay-code{
        width: 350px;
        height: 410px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
    .pay-code .code-img{
        width: 350px;
        height: 350px;
        -moz-box-shadow: 0px 0px 5px #666666; /* 老的 Firefox */
        box-shadow: 0px 0px 15px #666666;
    }


</style>
