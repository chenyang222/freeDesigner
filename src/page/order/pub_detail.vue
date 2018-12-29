<template lang="jade">
dheader
modal(:show.sync="showModal", :css="{width: 640, height: 600}")
  h3.fl(slot="header", style="margin:0;")
    a 同类案例	
  .slot-body.mt-40(slot="body", __vuec__)
    ul.works.mt-30
      li(v-for="work in similarWorks")
        a(:href="work[1]", target="_new;")
          img(:src="work[1]", :alt="work[0]")
  div(slot="footer")
order-user-info(:info="currentApplyRecords", :detail="order", v-if="userInfoVisible", @closeUserInfo="closeUserInfo")
.wrap(__vuec__)
  orderdetail(:otitle="otitle", :order="order")
  .description(v-if="isConfirmed || order.status == 0")
    .l
      .avatar
        img(:src="order.applier.avatar")
      .name {{order.applier.name}}
      .exp {{order.applier.career}}年工作经验
      .type {{order.applier.role}}
      .tel-check
        a(:href='`tel:${order.applier.mobile}`')
          img(src='./images/ico_tel.png', alt='')
        span {{order.applier.mobile}}
      p 注：工作者交付稿件后五个工作日雇主未发起改稿，系统默认为订单交易结束并完成支付。
    .r
      div
        .works_project_files
          h3 工作者提交的项目文件
            span 【交付稿件为初稿】
          .upload_file
            .file_name(v-if="order.deliver_works[0]") {{order.deliver_works[0].filename}}
            .file_name(v-else) 工作者还未上传项目文件
            a.uoloadbtn(:href="order.deliver_works[0].file_path", target="_new;", v-if="order.deliver_works[0].file_path") 下载附件
          //- div(v-if="order.deliver_works[0]", style="padding: 30px 0;border: 1px solid;width: 140px;text-align: center;") {{order.deliver_works[0].filename}}
          //- div(v-else, style="padding: 30px 0;border: 1px solid;width: 140px;text-align: center;") 
        hr(v-if="order.deliver_works[0].file_path")
        p(v-if="order.status != 0 && order.deliver_works[0].file_path") 注：您可以选择确认并评价或者发起改稿（为保证双方权益，仅允许发起改稿2次）
        hr(v-if="order.status != 0 && order.deliver_works[0].file_path")
        div(v-if="order.deliver_works[0]")
          textarea.revise(v-if="order.deliver_works[0] && !order.modify_works && order.status != 0",placeholder="请在此处编辑改稿内容", v-model="reviseVal")
          div(v-if="order.deliver_works[0] && order.modify_works", style="height:150px;border:1px solid #000;overflow-y: scroll;") {{order.modify_works[0].desc}}
          .upload_file
            p(v-if="(order.deliver_works[0] && !order.modify_works && order.status != 0) || (order.modify_works && order.status == 0)") 上传改稿所需附件
            .file_name(v-if="(order.deliver_works[0] && !order.modify_works && order.status != 0) || (order.modify_works && order.status == 0 && reviseFile[0])") {{reviseFile[0] || '请上传ZIP等压缩包文件'}}
            .file_name(v-if="order.deliver_works[0] && order.modify_works[0].filename") {{order.modify_works[0].filename || '雇主没有添加附件'}}
            .uoloadbtn(@click='uploadZip', v-if="order.status != 0 && order.deliver_works[0] && !order.modify_works") 上传压缩附件
              upload(type="resource")
          .sendRevise(@click="handleRevise" v-if="order.status != 0 && order.deliver_works[0] && !order.modify_works") 发起改稿
        hr(v-if="order.status != 0 && order.deliver_works[0].file_path")
      div(v-if="order.deliver_works[1]")
        .works_project_files
          h3 工作者提交的项目文件
            span 【交付稿件为一改】
          .upload_file
            .file_name(v-if="order.deliver_works[1]") {{order.deliver_works[1].filename}}
            .file_name(v-if="!order.deliver_works[1]") 工作者还未上传项目文件
            a.uoloadbtn(:href="order.deliver_works[1].file_path", target="_new;") 下载附件
          //- div(v-if="order.deliver_works[1]", style="padding: 30px 0;border: 1px solid;width: 140px;text-align: center;") {{order.deliver_works[1].filename}}
          //- div(v-else, style="padding: 30px 0;border: 1px solid;width: 140px;text-align: center;") 工作者还未上传
        hr(v-if="order.deliver_works[1].file_path")
        p(v-if="order.status != 0 && order.deliver_works[1].file_path") 注：您可以选择确认并评价或者发起改稿（为保证双方权益，仅允许发起改稿2次）
        hr(v-if="order.status != 0 && order.deliver_works[1].file_path")
        div
          textarea.revise(v-if="!order.modify_works[1] && order.status != 0",placeholder="请在此处编辑改稿内容", v-model="reviseVal")
          div(v-if="order.modify_works[1]", style="height:150px;border:1px solid #000;overflow-y: scroll;") {{order.modify_works[1].desc}}
          .upload_file
            p(v-if="(!order.modify_works[1] && order.status != 0) || (order.modify_works[1] && order.status == 0)") 上传改稿所需附件
            .file_name(v-if="(!order.modify_works[1] && order.status != 0) || (order.modify_works[1] && order.status == 0) && reviseFile[0]") {{reviseFile[0] || '请上传ZIP等压缩包文件'}}
            .file_name(v-if="order.modify_works[1].filename") {{order.modify_works[1].filename || '雇主没有添加附件'}}
            .uoloadbtn(@click='uploadZip', v-if="order.status != 0 && !order.modify_works[1]") 上传压缩附件
              upload(type="resource")
          .sendRevise(@click="handleRevise" v-if="order.status != 0 && !order.modify_works[1]") 发起改稿
        hr(v-if="order.deliver_works[1].file_path")
      div(v-if="order.deliver_works[2]")
        .works_project_files
          h3 工作者提交的项目文件
            span 【交付稿件为二改】
          .upload_file
            .file_name(v-if="order.deliver_works[2]") {{order.deliver_works[2].filename}}
            .file_name(v-if="!order.deliver_works[2]") 工作者还未上传项目文件
            a.uoloadbtn(:href="order.deliver_works[2].file_path", target="_new;", v-if="order.status != 0") 下载附件
          //- div(v-if="order.deliver_works[2]", style="padding: 30px 0;border: 1px solid;width: 140px;text-align: center;") {{order.deliver_works[2].filename}}
          //- div(v-else, style="padding: 30px 0;border: 1px solid;width: 140px;text-align: center;") 工作者还未上传
        hr(v-if="order.deliver_works[2].file_path")
        p(v-if="order.status != 0 && order.deliver_works[2].file_path") 注：您可以选择确认并评价或者发起改稿（为保证双方权益，仅允许发起改稿2次）
        hr(v-if="order.deliver_works[2].file_path")
        //- div
          textarea.revise(v-if="!order.modify_works[2]",placeholder="请在此处编辑改稿内容", v-model="reviseVal")
          div(v-else, style="height:150px;border:1px solid #000;") {{order.modify_works[2].desc}}
          .upload_file
            p(v-if="!order.modify_works[2]") 上传改稿所需附件
            .file_name(v-if="!order.modify_works[2]") {{reviseFile[0] || '请上传ZIP等压缩包文件'}}
            .file_name(v-else) {{order.modify_works[2].filename}}
            .uoloadbtn(@click='uploadZip', v-if="!order.modify_works[2]") 上传压缩附件
              upload(type="resource")
          .sendRevise(@click="handleRevise" v-if="!order.modify_works[2]") 发起改稿
        hr(v-if="order.deliver_works[2].file_path")
      div(v-if="order.status != 0")
        textarea.revise(placeholder="请在此处编辑对工作者的评价", v-model="evaluateVal", v-if="order.deliver_works[0].file_path")
        .sendRevise(@click="submit", v-if="order.deliver_works[0].file_path") 确定完成
  
  .jobs-container.clear(v-if="false")
    upload(type="*", maxsize="2*1024", :subtype.sync="subtype")
    .jobs.container
      .first(v-if="showFirstWork")
        .label 第一次任务交付【最多二次继续修改机会】
        .work-name.fl
          a(:href="order.works[0].lname") {{order.works[0].name}}
        .btn.mt-50.verify-btn(:class="{'btn-gray': disabledFirstBtn}")
          a(@click="verifyWork('first')") 验证未通过继续修改
      .second.clear(v-if="showSecondWork")
        .label 第二次任务交付【仅余一次继续修改机会】
        .work-name.fl
          a(:href="order.works[1].lname") {{order.works[1].name}}
        .clear
        .btn.mt-50.verify-btn(:class="{'btn-gray': disabledSecondBtn}")
          a(@click="verifyWork('second')") 验证未通过继续修改
        .clear.time {{order.works[1].created_on}} 提交
      .third.clear(v-if="showThirdWork")
        .label 第三次任务交付
        .work-name.fl
          a(:href="order.works[2].lname") {{order.works[2].name}}
        .clear.time {{order.works[2].created_on}} 提交
  .clear

  table(v-if="showappliers")
    div(v-if="order.apply_records.length !== 0")
      thead
        th.applier 接单人
        th.applier 竞标描述
        th.action 操作
        th.similar 同类案例
        th.challenge 议价
      tbody
      tr(v-for="record in order.apply_records")
        td
          .item
              .avatar
                img(:src="record.user.avatar", alt='')
              .info
                .item-header
                  .title  {{record.user.name}}
                div
                  .exp  {{record.user.career}}年工作经验
                .skill
                  | {{record.user.role}}
        td(style="font-size:12px;color:#919191;line-height:25px;") {{ record.desc.length > 60 ? record.desc.substring(0, 60) + '...' : record.desc || '未填写'}}
        td
          .btn.w-100(style="margin:auto")
            a(@click="showUserInfo(record)") 查看详情
        td.similar-work
          a(@click="showOverlay(record.works)")
            img(:src="record.works[0]['200x150']", v-if="record.works.length")
            span 共{{record.works.length}}图片
        td.challenge
          {{record.apply_cost / 100}}积分
    div(v-if="order.apply_records.length == 0 && order.status == 90", style="height:100px;text-align: center;line-height: 100px;") 暂无接单人
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
import orderUserInfo from '/src/page/order/order_user_info'

export default {
    mixins: [mixins],
    components: {
        dheader,
        orderdetail,
        upload,
        modal,
        dfooter,
        orderUserInfo
    },
    events: {
      uploadComplete(resp) {
        let data = resp.data[0]
        this.reviseFile = data
      },
    },
    asyncData(resolve) {
        let self = this;
        this.fetch().done(function() {
            this.order = this.data;
            console.info(this.order)
            resolve(this);
            // self.fetchLastComment().done(function () {
            //     this.last_comment = this.data[0];
            //     resolve(this);
            // });
        });
    },
    computed: {
      userInfo(){
        return this.order.apply_records[0]
      },
        showappliers() {
            return this.order.status > constant.ORDER.CONFIRMED;
        },
        showjobs() {
            return this.order.status <= constant.ORDER.CONFIRMED;
        },
        // 第一次修改的按钮禁止
        disabledFirstBtn() {
            return this.order.status <= constant.ORDER.FIRST_MODIFY;
        },
        // 第二次修改的按钮禁止
        disabledSecondBtn() {
            return this.order.status <= constant.ORDER.SECOND_MODIFY;
        },
        showFirstWork() {
            return this.order.status <= constant.ORDER.FIRST_COMMIT;
        },
        showSecondWork() {
            return this.order.status <= constant.ORDER.SECOND_COMMIT;
        },
        showThirdWork() {
            return this.order.status <= constant.ORDER.THIRD_COMMIT;
        },
        // 确认订单按钮显示
        isConfirmed() {
            return this.order.status > 0 && this.order.status <= 80;
        },
        // 确认订单按钮显示
        isFirstCommit() {
            return this.order.status > 0 && this.order.status <= 60;
        },
        aid () {
            if (!this.order.apply_records) return;
            return this.order.apply_records[0].id;
        },
        otitle() {
            let status = this.order.status;
            let CONFIRMED = constant.ORDER.CONFIRMED;
            let title = '发单管理-';
            if (status === 0) {
              title = '已完成订单';
            } else if (status > CONFIRMED) {
                title += '未确认订单';
            } else if (status <= CONFIRMED) {
                title += '已确认订单';
            }
            return title;
        },
    },
    methods: {
      handleRevise(){
        const self = this
        api.post({
          url:`/api/orders/${this.data.id}/modify_works/`,
          data:{
            work:this.reviseFile[2],
            desc:this.reviseVal
          }
        }).done(function(){
          self.reviseFile = {}
          self.reviseVal = ''
          window.location.reload()
          // alert('发起改稿成功')
        })
      },
      uploadZip() {
          $('#upload').click();
      },
      showUserInfo(item){
        this.currentApplyRecords = item
        this.userInfoVisible = true
      },
      closeUserInfo(){
        this.userInfoVisible = false
        this.currentApplyRecords = null
      },
        fetch() {
            return api.get({
                url: this.url
            });
        },
        submit() {
          const id = this.order.id
          const evaluateVal = this.evaluateVal
          api.post({
            url:`/api/orders/${id}/finish_orders/`
          }).done(function(){
            api.post({
              url:`/api/orders/${id}/review_applier/`,
              data:{
                message:evaluateVal
              }
            }).done(function(){
              window.location.reload()
            })
          })
        },
        // 确认之后对单个确认订单的接单人留言
        // 1. 获取发单人的最后一条留言
        fetchLastComment() {
            let aid = this.order.apply_records[0].id;
            let commentURL = constant.API.APPLY_RECORDS + aid + constant.API.ORDER_COMMENTS;
            let data = {
                order_by: 'created_on',
                per_page: 1,
                user: this.order.applier.id
            };
            return api.get({
                url: commentURL,
                data
            });
        },
        // 2. 获取未确认订单的最后一条留言
        fetchLastComments() {

        },
        // 打开留言记录
        leaveMessage(aid) {
            if (aid) {
                this.aid = aid;
            }
            this.showleavemessage = true;
        },
        uploadWork() {
            $('#upload').click();
        },
        verifyWork(type) {
            let status = constant.ORDER.FIRST_MODIFY;
            if (type === 'second') {
                status = constant.ORDER.SECOND_MODIFY;
            }
            api.patch({
                url: this.url,
                data: {
                  status
                }
            }).done(()=>this.reloadAsyncData());
        },
        deleteWork(index) {
            this.works.splice(index, 1);
            let works = this.works;
            Vue.set(this.works, works);
            api.patch({
                url: this.url + this.id + '/',
                data: {
                    works: works
                }
            });
        },
        showOverlay(works) {
            this.showModal = true;
            this.similarWorks = works;
        },
        // 确认合作人
        confirmOrder(id) {
            let url = constant.API.ORDERS + id + constant.API.ORDER_CONFIRM;
            api.patch({
                url,
                data: {
                    aid: id
                }
            }).done(() => {
                window.location.href = constant.PATH.ORDER_PUB_MANAGEMENT+"?status=confirmed"
            });
        }
    },
    data() {
        let id = utils.getURLParam('id');
        let url = constant.API.ORDERS + id;

        return {
            reviseFile:{},
            reviseVal:'',
            evaluateVal:'',
            currentApplyRecords:{},
            userInfoVisible:false,
            url,
            aid: '',
            showModal: false,
            showleavemessage: false,
            last_comment: null,
            order: {
                dynamic_info: {},
                user: {}
            },
            works: [],
            apply_cost: '0.00',
            similarWorks: [],
            ORDER: constant.ORDER
        };
    }
}
</script>
<style lang="less">
@import 'src/assets/css/base';
@import '/src/assets/css/jqueryui/jquery.ui.css';
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
.verify-btn {
  width: 160px;
}
.wrap[__vuec__] {
  .avatar-wrap {
    width: 160px;
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
  .banner {
    background: #f4f4f4;
    height: 140px;
    font-size: 30px;
    border-bottom: 1px solid #ccc;
    .title {
      text-align: center;
      color: #444;
    }
    .subtitle {
      font-size: 1.4rem;
      color: #888;
      text-align: center;
    }
    .family {
      color: #888;
      border: 1px solid #ccc;
      width: 180px;
      height: 24px;
      line-height: 24px;
      padding: 0;
      margin: auto;
      background: #333;
      border-radius: 5px;
      position: relative;
      top: 11px;
      color: #fff;
      font-size: 1.4rem;
      text-align: center;
    }
  }
  .detail {
    overflow: hidden;
    border-bottom: 1px solid #ccc;
    padding-bottom: 30px;
    .name, .user-desc,
    .task-desc,
    .dynamic-desc, .time-desc
    {
      text-align: center;
    }
    .user-desc {
      color: #999;
    }
    .task-desc {
      color: #333;
      font-size: 1.8rem;
      border-bottom: 1px solid #ccc;
    }
    .dynamic-desc {
      margin-top: 5px;
    }
    .dynamic-desc,
    .time-desc {
      color: @cyan;
      font-size: 1.4rem;
    }
    .cost-desc {
      color: red;
      font-size: 1.7rem;
      padding-left: 440px;
    }
  }
  table {
    thead, th {
      background: #f4f4f4;
      color: #999;
      font-size: 1.8rem;
      font-weight: 400;
    }
    th {
      &.applier {
      }
      &.similar {

      }
      &.action {

      }
      &.challenge {

      }
    }
    td {
      .item {
      display: flex;
      justify-content: center;
      align-items: center;
      .avatar {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 !important;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        width: 200px;
        margin-left: 25px;
        >div {
          display: flex;
          font-size: 26px;
          &.item-header {
            justify-content: space-between;
          }
          &.skill {
            font-size: 22px;
            font-weight: bold;
          }
          .title {
            font-size: 16px;
            font-weight: bold;
          }
          .integral {
            font-weight: bold;
            color: #ff0000;
          }
          .exp {
            font-size: 12px;
            color: #808080;
          }
        }
      }
    }
      .name {
        text-align: left;
        text-indent: 50px !important;
      }
      &.challenge {
        color: red;
        font-size: 1.8rem;
      }
    }
    .similar-work {
      a {
        position: relative;
        height: 134px;
        line-height: 134px;
        width: 134px;
        img {
          height: 100%;
          max-width: 100%;
        }
        span {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          height: 134px;
          line-height: 134px;
          color: #fff;
          background: rgba(0, 0, 0, .5);
        }
      }
    }
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
      display: block;
      height: 100%;
      width: 100%;
    }
  }
  .time {
    color: #999;
  }
  .jobs {
    padding-top: 30px;
  }
}
</style>
