/**
    @desc: 接单管理-列表页面
*/
<template lang="jade">
dheader
.pub_management(__vuec__)
  .banner.pt-40
    .title 接单管理
  .clear
  ul.tabs
    li.active(@click="toggleTab('active', $event)") 订单申请记录
    li(@click="toggleTab('confirmed', $event)") 已确认订单
    li(@click="toggleTab('finished', $event)") 已完成订单
  .list-wrap
    ul.orders.mt-10(v-for="record in records")
      li
        span.title
          a(href="{{detailURL}}?oid={{record.order.id}}{{and}}aid={{record.id}}") {{record.order.title}}
        span.pub-time.ml-20 创建于：{{record.order.pub_time | date}}
        span.system-cost ￥{{record.order.pub_cost/100}}
      li.detail
        .fl 交付日期：{{record.order.deadline | date}}
        .ml-60.fl 浏览量：{{record.order.view_count}}
        .ml-60.fl 接单量：{{record.order.apply_count}}
        .ml-60.fr.count-down(v-if="record.order.status === ORDER.CONFIRMED") 剩余时间：{{record.order.count_down}}
        .action.fr(:class="{special: $index === 0}")
          .edit(v-if="record.status !== 'finished'", title="编辑")
            a(href="{{applyRecordURL}}?oid={{record.order.id}}{{and}}type=edit", target="_blank;")
          .delete(@click="deleteRecord(record.id)", title="删除")
</template>
<script>
import {Vue, dheader} from 'src/assets/js/page';
import constant from 'src/assets/js/constant';
import api from 'src/assets/js/api';
import mixins from 'src/page/mixins';
import utils from 'src/assets/js/utils';
import $ from 'jquery';

export default {
    mixins: [mixins],
    components: {
        dheader
    },
    asyncData(resolve) {
        this.fetch()
          .done(function() {
            this.records = this.data;
            resolve(this);
        });
    },
    methods: {
        // 获取基本信息
        fetch() {
            let data = this.query;
            return api.get({
                url: this.url,
                data
            });
        },
        toggleTab(type, e) {
            Vue.set(this.query, 'status', type);
            let $el = $(e.currentTarget);
            $el.addClass('active')
              .siblings()
              .removeClass('active');
        },
        deleteRecord(id) {
            api.delete({
                url: this.url + id + '/'
            }).done(() => this.reloadAsyncData());
        }
    },
    watch: {
        query: {
            deep: true,
            handler() {
                this.reloadAsyncData();
            }
        }
    },
    data() {
        let detailURL = constant.PATH.ORDER_APPLY_DETAIL;
        let applyRecordURL = constant.PATH.ORDER_APPLY_RECORD;

        return {
            url: constant.API.APPLY_RECORDS,
            orders: [],
            records: [],
            query: {
                status: 'active'
            },
            status: 90,
            apply_records: [],
            detailURL,
            applyRecordURL,
            ORDER: constant.ORDER
        };
    }
};
</script>
<style lang="less">
@import 'src/assets/css/variables';
.pub_management[__vuec__] {
   .banner {
    background: #f4f4f4;
    height: 140px;
    font-size: 30px;
    border-bottom: 1px solid #ccc;
    .title {
      text-align: center;
      color: #444;
      .create-order {
        display: inline-block;
        position: relative;
        top: -6px;
      }
    }
  }
  .tabs {
    position: relative;
    top: -26px;
    height: 26px;
    margin: auto;
    display:block;
    width: 540px;
    li {
      cursor: pointer;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border: 1px solid #ccc;
      border-bottom: 0;
      float: left;
      margin-left: 40px;
      height: 26px;
      line-height: 26px;
      font-size: 1.4rem;
      width: 140px;
      text-align: center;
      padding: 0;
      background: #e2e2e2;
      color: #777;
      &.active {
        color: @cyan;
        background: #fff;
        border-bottom: 0;
      }
    }
  }
  font-size: 1.8rem;
  .list-wrap {
    overflow: hidden;
    min-height: 400px;
    position: relative;
    top: -25px;
  }
  .orders {
    width: 960px;
    margin: auto;
    height: 100px;
    line-height: 100px;
  }
  li {
    height: 40px;
    line-height: 45px;
    font-size: 1.4rem;
    &:first-child {
      border-bottom: 1px solid #ccc;
      color: #444;
      .pub-time {
        color: #999;
        font-size: 1.4rem;
      }
      .title {
        a {
          font-size: 1.8rem;
        }
      }
    }
    &.detail {
      height: 24px;
      line-height: 24px;
    }
    .system-cost {
      float: right;
      color: @cyan;
    }
    .count-down {
      color: red;
      position: relative;
      right: -70px;
    }
    color: #999;
    .share,
    .edit,
    .delete {
      width: 24px;
      height: 24px;
      float: left;
      margin-left: 10px;
      cursor: pointer;
      a {
        height: 100%;
        width: 100%;
        display: inline-block;
      }
    }
    .action {
      position: relative;
      right: -54px;
      &.special {
        right: -60px;
      }
      .share {
        background: url(./images/share.png) no-repeat center;
      }
      .edit {
        background: url(./images/edit.png) no-repeat center;
      }
      .delete {
        background: url(./images/delete.png) no-repeat center;
      }
    }
  }
}
</style>
