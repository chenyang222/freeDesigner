<template lang="jade">
dheader
modal(:show.sync="showModal", :css="{width: 640, height: 600}")
  h3.fl(slot="header")
    a 上传作品
  .slot-body.mt-40(slot="body", __vuec__)
    ul.works.mt-30
      li(v-for="work in order.works")
        a(:href="work['800x600']", target="_new;")
          img(:src="work['400x300']")
  div(slot="footer")
.wrap(__vuec__)
  orderdetail(:otitle="otitle", :order="order")
  .description(v-if="showConfirmed || order.status == 0")
    .l
      .avatar
        img(:src="order.user.avatar")
      .name {{order.user.name}}
      .exp {{order.user.career}}年工作经验
      .type {{order.user.role}}
      .tel-check
        a(:href='`tel:${order.user.mobile}`')
          img(src='./images/ico_tel.png', alt='')
        span {{order.user.mobile}}
      p 注：工作者交付稿件后五个工作日雇主未发起改稿，系统默认为订单交易结束并完成支付。
    .r
      .first
        .works_project_files
          h3 请上传完整的项目文件
            span 【交付稿件为初稿】
        .upload_file
          .file_name(v-if="order.deliver_works[0] || curFail[1]") {{order.deliver_works[0] ? order.deliver_works[0].filename : curFail[0]}}
          .file_name(v-else) 请上传ZIP等压缩包文件
          .uoloadbtn(@click='uploadWork("one")', style="display:inline-block;", v-if="!order.deliver_works[0]") 上传附件
            upload(type="deliveries")
        p(v-if="order.status != 0") 注：请务必上传与雇主要求相应的项目文件
        p(v-if="order.status != 0")（雇主有2次发起改稿的选择，如需改稿我们将会第一时间告诉您）
        .sendRevise(@click="submit('one')", style="display:inline-block;", v-if="!order.deliver_works[0] && curFail[1]") 提交文件
        &nbsp;
        //- .sendRevise(@click='uploadWork("one")', style="display:inline-block;", v-if="!order.deliver_works[0]") 上传附件
          upload(type="deliveries")
        hr
        .asd(v-if="order.modify_works[0]")
          h3 雇主发起了改稿，请您及时修改并提交文件
          p(style="height:150px;border:1px solid #000;overflow-y: scroll;") {{order.modify_works[0].desc}}
          .upload_file(v-if="order.modify_works[0].filename")
            .file_name {{order.modify_works[0].filename}}
            a.uoloadbtn(:href="order.modify_works[0].file_path", target="_new;") 下载附件
        //- .asd(v-else) 注：雇主有2次发起改稿的选择，如需改稿我们将会第一时间告诉您
        hr
      .first(v-if="order.status != 0 ? order.modify_works[0] : order.deliver_works[1]")
        .works_project_files()
          h3 请上传完整的项目文件
            span 【交付稿件为一改】
          .upload_file
            .file_name(v-if="order.deliver_works[1] || curFail[1]") {{order.deliver_works[1] ? order.deliver_works[1].filename : curFail[0]}}
            .file_name(v-else) 请上传ZIP等压缩包文件
            .uoloadbtn(@click='uploadWork("one")', style="display:inline-block;", v-if="!order.deliver_works[1]") 上传附件
              upload(type="deliveries")
          //- div(v-if="order.deliver_works[1] || curFail[1]", style="padding: 30px 0;border: 1px solid;width: 140px;text-align: center;") {{order.deliver_works[1] ? order.deliver_works[1].filename : curFail[0]}}
          //- div(v-else, style="padding: 30px 0;border: 1px solid;width: 140px;text-align: center;") 请上传项目文件
        p(v-if="order.status != 0") 注：请务必上传与雇主要求相应的项目文件
        p(v-if="order.status != 0")（雇主有2次发起改稿的选择，如需改稿我们将会第一时间告诉您）
        .sendRevise(@click="submit('two')", style="display:inline-block;", v-if="!order.deliver_works[1] && curFail[1]") 提交文件
        &nbsp;
        //- .sendRevise(@click='uploadWork("one")', style="display:inline-block;", v-if="!order.deliver_works[1]") 上传附件
          upload(type="deliveries")
        hr
        .asd(v-if="order.modify_works[1]")
          h3 雇主发起了改稿，请您及时修改并提交文件
          p(style="height:150px;border:1px solid #000;overflow-y: scroll;") {{order.modify_works[1].desc}}
          p {{order.modify_works[1].desc}}
          .upload_file(v-if="order.modify_works[1].filename")
            .file_name {{order.modify_works[1].filename}}
            a.uoloadbtn(:href="order.modify_works[1].file_path", target="_new;") 下载附件
        //- .asd(v-if="!order.modify_works[1]") 注：雇主有2次发起改稿的选择，如需改稿我们将会第一时间告诉您
        hr
      .first(v-if="order.status != ? order.modify_works[1] : order.deliver_works[2]")
        .works_project_files
          h3 请上传完整的项目文件
            span 【交付稿件为二改】
          .upload_file
            .file_name(v-if="order.deliver_works[2] || curFail[1]") {{order.deliver_works[2] ? order.deliver_works[2].filename : curFail[0]}}
            .file_name(v-else) 请上传ZIP等压缩包文件
            .uoloadbtn(@click='uploadWork("one")', style="display:inline-block;", v-if="!order.deliver_works[2]") 上传附件
              upload(type="deliveries")
          //- div(v-if="order.deliver_works[2] || curFail[1]", style="padding: 30px 0;border: 1px solid;width: 140px;text-align: center;") {{order.deliver_works[2] ? order.deliver_works[2].filename : curFail[0]}}
          //- div(v-else, style="padding: 30px 0;border: 1px solid;width: 140px;text-align: center;") 请上传项目文件
        p(v-if="order.status != 0") 注：请务必上传与雇主要求相应的项目文件
        p(v-if="order.status != 0")（雇主有2次发起改稿的选择，如需改稿我们将会第一时间告诉您）
        .sendRevise(@click="submit('three')", style="display:inline-block;", v-if="!order.deliver_works[2] && curFail[1]") 提交文件
        &nbsp;
        //- .sendRevise(@click='uploadWork("one")', style="display:inline-block;", v-if="!order.deliver_works[2]") 上传附件
          upload(type="deliveries")
        hr
        .asd(v-if="order.modify_works[2]")
          h3 雇主发起了改稿，请您及时修改并提交文件
          p(style="height:150px;border:1px solid #000;overflow-y: scroll;") {{order.modify_works[2].desc}}
          .upload_file(v-if="order.modify_works[2].filename")
            .file_name {{order.modify_works[2].filename}}
            a.uoloadbtn(:href="order.modify_works[2].file_path", target="_new;") 下载附件
        //- .asd(v-else) 注：雇主有2次发起改稿的选择，如需改稿我们将会第一时间告诉您
        hr
      p(v-if="order.status == 0", style="display:flex;align-items:center;color:#4195f7;font-size:16px;") 
        .eva(v-if="order.review_info") {{order.review_info}}
        span(style="padding-right:10px;") 恭喜您已完成此订单，佣金已转入您的积分账户
        img(src="./images/hua.png")
  .jobs-container.clear(v-if="false")
    upload(type="deliveries", maxsize="2*1024", :subtype.sync="subtype")
    .jobs.container
      .first
        .label 第一次任务交付【最多两次继续修改机会】
        .work-name.fl
          a(:href="order.works[0].lname") {{order.works[0].name}}
        .btn.fl.ml-30
          a(@click="uploadWork('first')") 上传
        .clear.time {{order.works[0].created_on}} 提交
      .second.clear(v-if="showSecondUpload")
        .label 第二次任务交付【仅余一次继续修改机会】
        .work-name.fl
          a(:href="order.works[1].lname") {{order.works[1].name}}
        .btn.fl.ml-30
          a(@click="uploadWork('second')") 上传
        .clear.time {{order.works[1].created_on}} 提交
      .third.clear(v-if="showThirdUpload")
        .label 第三次任务交付
        .work-name.fl
          a(:href="order.works[2].lname") {{order.works[2].name}}
        .btn.fl.ml-30
          a(@click="uploadWork('third')") 上传
        .clear.time {{order.works[2].created_on}} 提交
  .mt-60
dfooter
</template>
<script>
import {Vue, dheader,dfooter} from 'src/assets/js/page';
import api from 'src/assets/js/api';
import orderdetail from 'src/page/components/order-detail/order-detail';
import modal from 'src/public/modal/modal';
import upload from 'src/public/upload/upload';
import $ from 'jquery';
import utils from 'src/assets/js/utils';
import mixins from 'src/page/mixins';
import leavemessage from 'src/page/components/leave-message/leave-message';

export default {
    mixins: [mixins],
    components: {
      dfooter,
        dheader,
        orderdetail,
        upload,
        modal,
        leavemessage
    },
    ready(){
      console.log(this)
    },
    events: {
        uploadComplete(ret) {
          let data = ret.data[0];
          this.curFail = data
        }
    },
    asyncData(resolve) {
        let self = this;
        this.fetch().done(function() {
            resolve(this.data);
        });

    },
    computed: {
        otitle() {
            let status = this.order.status;
            let CONFIRMED = constant.ORDER.CONFIRMED;
            let title = '接单管理-';
            if (status > CONFIRMED) {
                title += '未确认订单';
            }
            else if (status === 0) {
                title = '已完成订单';
            }
            else if (status <= CONFIRMED) {
                title += '已确认订单';
            }
            return title;
        },
        showjobs() {
            return this.order.status <= constant.ORDER.CONFIRMED;
        },
        showConfirmed(){
          return this.order.status > 0 && this.order.status <= 80;
        },
        showSecondUpload() {
            return this.order.status <= constant.ORDER.FIRST_MODIFY;
        },
        showThirdUpload() {
            return this.order.status <= constant.ORDER.SECOND_MODIFY;
        }
    },
    methods: {
      submit(type){
        if(type === 'one'){
          api.patch({
            url:`/api/orders/${this.order.id}/`,
            data:{
              deliver_works:[this.curFail[2]]
            }
          }).done(function(){
            window.location.reload()
          })
        } else if (type === 'two'){
          api.patch({
            url:`/api/orders/${this.order.id}/`,
            data:{
              deliver_works:[
                this.order.deliver_works[0].id,
                this.curFail[2]
              ]
            }
          }).done(function(){
            window.location.reload()
          })
        } else if (type === 'three') {
          api.patch({
            url:`/api/orders/${this.order.id}/`,
            data:{
              deliver_works:[
                this.order.deliver_works[0].id,
                this.order.deliver_works[1].id,
                this.curFail[2]
              ]
            }
          }).done(function(){
            window.location.reload()
          })
        }
      },
        fetch() {
            return api.get({
                url: this.url
            });
        },
        // 获取发单人的最后一条留言
        fetchLastComment() {
            let data = {
                order_by: 'created_on',
                per_page: 1,
                user: this.order.user.id
            };
            return api.get({
                url: this.commentURL,
                data
            });
        },
        uploadWork(type) {
          this.curType = type
            $('#upload').click();
        },
         // 打开留言记录
        leaveMessage() {
            this.showleavemessage = true;
        }
    },
    data() {
        let oid = utils.getURLParam('oid');
        let aid = utils.getURLParam('aid');
        let url = constant.API.ORDERS + oid + constant.API.APPLY_RECORD + aid;
        let commentURL = constant.API.APPLY_RECORDS + aid + constant.API.ORDER_COMMENTS;

        return {
            curType:'',
            curFail:'',
            url,
            commentURL,
            id: '',
            aid,
            oid,
            showModal: false,
            showleavemessage: false,
            last_comment: null,
            order: {
                dynamic_info: {},
                user: {},
                works: []
            },
            defaultWorks: [{
                lname: '',
                created_on: ''
            }],
            desc: '',
            user: {},
            works: [],
            first_name: '未上传文件',
            second_name: '未上传文件',
            third_name: '未上传文件',
            subtype: 'first',
            apply_cost: 0.0,
            similarWorks: [],
            ORDER: constant.ORDER
        };
    }
}
</script>
<style lang="less">
@import 'src/assets/css/base';
@import '/src/assets/css/jqueryui/jquery.ui.css';
.btn {
  width: 80px;
  margin: auto;
}
.works {
    overflow: hidden;
    li {
      float: left;
      width: 160px;
      height: 120px;
      border: 1px solid #ccc;
      margin-top: 20px;
      &:not(:first-child) {
        margin-left: 30px;
      }
      padding: 10px;
      position: relative;
      a {
        height: 100%;
        width: 100%;
        img {
          height: 100%;
          margin: auto;
          display: block;
          max-width: 100%;
        }
      }
    }
  }
.wrap[__vuec__] {
  .leave-message {
    .avatar {
      margin: 0;
      width: 200px;
      height: 120px;
    }
  }
  .avatar {
    text-indent: 0;
    background: none;
    margin: auto;
    text-indent: 0;
    height: 90px;
    a {
      display: block;
      margin: auto;
      width: 64px;
      height: 64px;
    }
    img {
      height: 64px;
      width: 64px;
      border-radius: 32px;
    }
    .name,
    .tel {
      text-align: center;
      color: @cyan;
      height: 20px;
    }
  }
  .label {
    &.border {
      border-bottom: 1px solid #ccc;
    }
    &.border-top {
      border-top: 1px solid #ccc;
    }
    font-size: 1.4rem;
    color: #333;
    height: 40px;
    float: none;
    line-height: 54px;
  }
   .description {
     display: flex;
    background: #f4f4f4;
    overflow: hidden;
    padding-top: 20px;
    padding-bottom: 20px;
    .l {
      width: 330px;
      padding-left: 66px;
      box-sizing: border-box;
      .avatar{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        padding-top: 10px;
        font-size: 16px;
        font-weight: bold;
      }
      .exp {
        padding-top: 10px;
        color: #919191;
        font-size: 12px;
      }
      .type {
        padding-top: 10px;
        color: #4495f7;
        font-size: 12px;
      }
      .tel-check {
        padding-top: 20px;
        a {
          display: block;
          width: 43px;
          height: 43px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        span {
          font-size: 24px;
          color: #4195f7;
          font-weight: bold;
        }
      }
      >p {
        font-size: 14px;
      }
    }
    .r {
      flex: 1;
      .works_project_files {
        h3 {
          font-size: 16px;
          span {
            color: #4195f7;
          }
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 121px;
            height: 92px;
            border: 1px solid #000;
            img {
              width: 100%;
            }
          }
        }
      }
      textarea {
        width: 100%;
        min-height: 100px;
      }
      .upload_file {
        display: flex;
        align-items: center;
        p {
          font-size: 16px;
          color: #919191;
        }
        .file_name {
          color: #777777;
          font-size: 12px;
          width: 260px;
          height: 35px;
          line-height: 35px;
          padding-left: 10px;
          box-sizing: border-box;
          border: 1px solid #a0a0a0;
          background-color: #f0f0f0;
        }
        .uoloadbtn {
          margin-left: 20px;
          width: 112px;
          height: 35px;
          color: #fff;
          background-color: #4195f7;
          text-align: center;
          line-height: 35px;
        }
      }
      .sendRevise {
        margin-top: 20px;
        width: 172px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        color: #fff;
        background-color: #4195f7;
      }
    }
  }
  .desc {
    height: 130px;
    width: 100%;
    color: #999;
  }

  textarea {
    border: 1px solid #ccc;
  }
  .work-name {
    background: #ccc;
    border: 1px solid #ccc;
    width: 85%;
    height: 40px;
    border-radius: 5px;
    line-height: 40px;
    text-indent: 20px;
    a {
      color: #666;
    }
  }
  .time {
    color: #999;
  }
  .jobs {
    padding-top: 30px;
  }
  .eva{
    width: 100%;
    height: 100px;
    padding: 5px 10px;
    color: #777777;
    border: 1px solid #a0a0a0;
    background-color: #f0f0f0;
    font-size: 12px;
  }
}
</style>