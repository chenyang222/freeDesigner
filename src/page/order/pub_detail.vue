/**
  @desc: 发单详情，这个地方是确认订单的合作人和最终的的一改，二改，三改。
*/
<template lang="jade">
dheader
modal(:show.sync="showModal", :css="{width: 640, height: 600}")
  h3.fl(slot="header")
    a 上传作品
  .slot-body.mt-40(slot="body", __vuec__)
    ul.works.mt-30
      li(v-for="work in similarWorks")
        a(:href="work['800x600']", target="_new;")
          img(:src="work['400x300']")
  div(slot="footer")
leavemessage(:aid.sync="aid", :show.sync="showleavemessage")
.wrap(__vuec__)
  orderdetail(:otitle="otitle", :order="order")
  .description(v-if="isConfirmed")
    .job-pay.container.pb-40
      .leave-message.fl
        .avatar.mt-30
          a(href="{{publicURL}}?uid={{order.applier.id}}")
            img.fl(:src="order.applier.avatar")
          .name {{order.applier.name}}
          .tel TEL: {{order.applier.mobile}}
      .bfc
        .label 接单人的最后留言：
        .message(v-if="last_comment") {{last_comment.message}}
        .message.gray(v-else) 接单人没有留言哦!
        .btn.fr.mr-100
          a(@click="leaveMessage") 留言
  .jobs-container.clear(v-if="showjobs")
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
  .container.clear.mt-20(v-if="isConfirmed")
    .btn.fl
      a(@click="submit") 确认订单
  .clear
  table(v-if="showappliers")
    thead
      th.applier 接单人
      th.action 操作
      th.similar 同类案例
      th.challenge 议价
    tbody
      tr(v-for="record in order.apply_records")
        td
          .avatar-wrap.fl
            .avatar.mt-30
              a(href="{{publicURL}}?uid={{record.user.id}}")
                img.fl(:src="record.user.avatar")
            .clear
            .name.cyan {{record.user.name}}
          .bfc
            .fl
              .label 接单人的最后留言：
              .message(v-if="record.message") {{record.message}}
              .message.gray(v-else) 接单人没有留言哦!
            .btn.fl.ml-20.mt-50
              a(@click="leaveMessage(record.id)") 留言
        td
          .btn.w-100(style="margin:auto")
            a(@click="confirmOrder(record.id)") 合作确认
        td.similar-work
          a(@click="showOverlay(record.works)")
            img(:src="record.works[0]['200x150']", v-if="record.works.length")
            span 共{{record.works.length}}图片
        td.challenge
          {{record.apply_cost}}积分
</template>
<script>
import {Vue, dheader} from 'src/assets/js/page';
import api from 'src/assets/js/api';
import orderdetail from 'src/page/components/order-detail/order-detail';
import modal from 'src/public/modal/modal';
import upload from 'src/public/upload/upload';
import leavemessage from 'src/page/components/leave-message/leave-message';
import $ from 'jquery';
import utils from 'src/assets/js/utils';
import mixins from 'src/page/mixins';

export default {
    mixins: [mixins],
    components: {
        dheader,
        orderdetail,
        upload,
        modal,
        leavemessage
    },
    asyncData(resolve) {
        let self = this;
        this.fetch().done(function() {
            this.order = this.data;
            resolve(this);
            self.fetchLastComment().done(function () {
                this.last_comment = this.data[0];
                resolve(this);
            });
        });
    },
    computed: {
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
            console.log(this.order.status);
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
            if (status > CONFIRMED) {
                title += '未确认订单';
            }
            else if (status <= CONFIRMED) {
                title += '已确认订单';
            }
            else if (status === 0) {
                title = '已完成订单';
            }
            return title;
        },
    },
    methods: {
        fetch() {
            return api.get({
                url: this.url
            });
        },
        submit() {
            api.patch({
                url: this.url,
                data: {
                    status: 0
                }
            }).done(()=> this.reloadAsyncData());
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
    background: #f4f4f4;
    overflow: hidden;
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
        width: 40%;
      }
      &.similar {

      }
      &.action {

      }
      &.challenge {

      }
    }
    td {
      .avatar {
        margin-left: 50px;
        a {
          margin-left: 0;
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
