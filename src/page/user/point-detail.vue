<template lang="jade">
dheader
.profile(__vuec__)
  tab
  .bfc.detail.mt-20
    .tab-switch
        .a(@click="tabActive = 'record'", :class="{active:tabActive === 'record'}") 交易记录
        .b(@click="tabActive = 'putForward'", :class="{active:tabActive === 'putForward'}") 积分提现
    .tab-main(v-if="tabActive === 'record'")
        .item
            .num1 积分
            .num2 交易时间
            .num3 交易类型
        .item(v-for="(index, item) in pointsList")
            .num1(v-if='item.points_type == 1') + {{item.points}}
            .num1(v-if='item.points_type == 2') + {{item.points}}
                .pro ?
                    .showWarn 平台已收取您此订单20%的管理费
            .num1(v-if='item.points_type == 3') - {{item.points}}
            .num1(v-if='item.points_type == 4') + {{item.points}}
                .pro ?
                    .showWarn 平台已收取您此订单20%的管理费
            .num1(v-if='item.points_type == 5') - {{item.points}}
            .num2 {{item.created_on}}
            .num3(v-if='item.points_type == 1') 积分充值
            .num3(v-if='item.points_type == 2') 订单积分获取
            .num3(v-if='item.points_type == 3') 订单积分支付
            .num3(v-if='item.points_type == 4') 相册积分获取
            .num3(v-if='item.points_type == 5') 相册积分支付
    .tab-main(v-else="tabActive === 'putForward'")
        .tab-main-header
            p(style="color:#000;font-weight:bold;") 可提现积分
                span(style="color:#4195f7;") {{userInfo.available_cash_points}}，折换成人民币¥
                span(style="color:#ff0000;"){{userInfo.available_cash_points}}
            p(style="margin-top:-20px;font-size:16px") (1积分=1人民币，满100积分可提现）
        .form
            .form-item
                input.input(v-model='pointsFormData.points', placeholder='请输入提现金额￥（提现金额必须是10的倍数）')
                br
            .form-item
                input.input(v-model='pointsFormData.card_number', placeholder='请输入银行卡账号')
                br
            .form-item
                input.input(v-model='pointsFormData.card_name', placeholder='请输入开户行信息')
                br
            .form-item
                input.input(v-model='pointsFormData.username', placeholder='请输入您的真实姓名')
                br
            .form-item
                input.input(type='number', v-model='pointsFormData.mobile', placeholder='请输入手机号码')
                br
            .submit(@click='pointsSubmit') 确定
        .footer
            p
                | 提现说明：
            p 1、提现仅能在每周二申请，审核通过后会在1至7个工作日内打款
            p 2、请务必确认以上信息完全正确才能收到提现款
            p
                | 3、如有疑问请
                a(style='color:#00a0e9;', href="mailto:1776261265@qq.com") 联系我们
</template>

<script>
import {Vue, dheader,dfooter} from 'src/assets/js/page';
import tab from 'src/page/user/tab';
import api from 'src/assets/js/api';
export default {
    name: "point-detail",
    components: {
        dheader,
        dfooter,
        tab,
    },
    asyncData (resolve, reject) {
        api.get({
            url:`/api/points/`,
        }).done(function(){
            this.pointsList = this.data
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
            resolve(this)
        })
    },
    data(){
        return {
                  tabActive: 'record', // record 记录  putforward 提现
                  pointsFormData:{},
                  pointsList:[]
        }
    },
    ready(){
        console.log(this)
    },
    methods:{
        pointsSubmit(){
            const self = this
            api.post({
                url:`/api/withdraws/`,
                data:this.pointsFormData
            }).done(function(){
                self.pointsFormData = {}
                alert("提交成功!")
            })
        }
    }
}
</script>

<style lang="less">
@import (reference) '/src/assets/css/variables';
.main {
  background: #eee;
  min-height: 1080px;
}
@profilePaddingTop: 40px;
.profile[__vuec__] {
  font-size: 18px;
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

        .tab-switch {
            margin-top: 20px;
            display: flex;
            margin-bottom: 20px;
            >div {
                text-align: center;
                flex: 1;
                height: 40px;
                line-height: 40px;
                color: #d6d2d2;

                &.active {
                    background-color: #4b98f4;
                }
            }
        }
        .tab-main {
              .tab-main-header {
    text-align: center;
    background-color: #ececec;
    padding: 40px 0;
  }
    .form {
    background-color: #fff;
    .form-item {
      display: flex;
      align-items: center;
      padding-top: 25px;

      input {
          width: 100%;
      }

      .name {
        width: 114px;
        font-size: 22px;
        font-weight: bold;
      }
      .content {
        flex: 1;
        .input {
          font-size: 16px;
          margin: 0;
          padding: 0;
          min-height: 0;
          height: 38px;
          width: 100%;
          border: 2PX solid #fff;
          border-radius: 4PX;
        }
      }
    }
  }
  .submit {
    font-size: 22px;
    color: #fff;
    background-color: #00a0e9;
    text-align: center;
    width: 175px;
    height: 52px;
    line-height: 52px;
    border-radius: 4PX;
    margin: 30px auto 40px;
  }
  .footer {
    font-size: 16px;
    padding-left: 100px;
    padding-right: 100px;
    color: #b4b4b4;
  }
              .item {
                display: flex;
                justify-content: space-between;
                color: #000;
                text-align: center;
                padding: 18px 0;
                border-bottom: 1PX solid #ebebeb;
                    .num1 {
      width: 200px;
    }
    .num2 {
      flex: 1;
    }
    .num3 {
      width: 220px;
    }
              }
              
        }
    }
    .pro{
        width: 15px;
        height: 15px;
        line-height: 15px;
        font-size: 14px;
        display: inline-block;
        background-color: red;
        border-radius: 50%;
        color: #ffffff;
        margin-left: 10px;
        position: relative;
        .showWarn{
            width: 220px;
            height: 25px;
            line-height: 24px;
            border: 1px solid #919191;
            border-radius: 5px;
            position: absolute;
            color: #4495f7;
            top: -30px;
            left: 25px;
            display: none;
        }
    }
    .pro:hover{
        .showWarn{
            display: block;
        }        
    }
}
</style>