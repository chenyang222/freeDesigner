/**
  @desc: 接单详情，这个地方是确认订单的一改，二改，三改。
*/

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
  .description
    .job-pay.container.pb-40
      .leave-message.fl
        .avatar.mt-30
          a(href="{{publicURL}}?uid={{order.user.id}}")
            img.fl(:src="order.user.avatar")
          .name {{order.user.name}}
          .tel TEL: {{order.user.mobile}}
      .bfc
        .label 发单人最后留言：
        .message(v-if="last_comment") {{last_comment.message}}
        .message.gray(v-else) 发单人没有留言哦!
        .btn
          a(@click="leaveMessage") 留言
      leavemessage(:aid="aid", :show.sync="showleavemessage")
  .jobs-container.clear(v-if="showjobs")
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
</template>
<script>
import {Vue, dheader} from 'src/assets/js/page';
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
        dheader,
        orderdetail,
        upload,
        modal,
        leavemessage
    },
    events: {
        uploadComplete(ret) {
            let data = ret.data;
            let subtype = ret.subtype;
            let fname = ret.fname;
            let rData = this.order.works;
            if (!rData.length) {
              rData = this.defaultWorks;
            }
            data.name = fname;
            switch(subtype) {
                case 'first':
                    this.first_name = fname;
                    rData[0] = data;
                break;
                case 'second':
                    this.second_name = fname;
                    rData[1] = data;
                break;
                case 'third':
                    this.third_name = fname;
                    rData[2] = data;
                break;
            };
            api.patch({
                url: constant.API.ORDERS + this.oid,
                data: {
                  works: rData
                }
            }).done(()=>this.reloadAsyncData());
        }
    },
    asyncData(resolve) {
        let self = this;
        this.fetch().done(function() {
            resolve(this.data);
            self.fetchLastComment().done(function () {
                this.last_comment = this.data[0];
                resolve(this);
            });
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
            else if (status <= CONFIRMED) {
                title += '已确认订单';
            }
            else if (status === 0) {
                title = '已完成订单';
            }
            return title;
        },
        showjobs() {
            return this.order.status <= constant.ORDER.CONFIRMED;
        },
        showSecondUpload() {
            return this.order.status <= constant.ORDER.FIRST_MODIFY;
        },
        showThirdUpload() {
            return this.order.status <= constant.ORDER.SECOND_MODIFY;
        }
    },
    methods: {
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
        uploadWork(subtype) {
            this.subtype = subtype;
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
    background: #f4f4f4;
    overflow: hidden;
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
}
</style>