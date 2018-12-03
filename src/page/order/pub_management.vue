/**
    @desc: 发单管理-列表页面
*/
<template lang="jade">
dheader
.pub_management(__vuec__)
  .banner.pt-40
    .title 发单管理
      .btn.create-order.ml-20
        a(href="{{pubOrderURL}}", target="_blank;") 新建发单
  .clear
  ul.tabs
    li(:class="[active_tab == 'unconfirmed' ? 'active': '']" @click="toggleTab('unconfirmed')") 未确认订单
    li(:class="[active_tab == 'confirmed' ? 'active': '']" @click="toggleTab('confirmed')") 已确认订单
    li(:class="[active_tab == 'done' ? 'active': '']" @click="toggleTab('done')") 已完成订单
  .list-wrap
    ul.orders.mt-10(v-for="order in orders")
      li
        span.title
          a(href="{{detailURL}}?id={{order.id}}") {{order.title}}
        span.pub-time.ml-20 创建于：{{order.pub_time | date}}
        span.system-cost ￥{{order.pub_cost/100}}
      li.detail
        .fl 交付日期：{{order.deadline | date}}
        .ml-60.fl 浏览量：{{order.view_count}}
        .ml-60.fl 接单量：{{order.apply_count}}
        .ml-60.fr.count-down(v-if="order.status === 80") 剩余时间：{{order.count_down}}
        .action.fr(v-if="order.status !== 80", :class="{special: $index === 0}")
          .share(title="分享订单")
            a(href="{{shareURL}}?id={{order.id}}", target="_blank;")
          .edit(v-if="order.status !== 0", title="编辑订单")
            a(href="{{pubOrderURL}}?id={{order.id}}", target="_blank;")
          .delete(v-if="order.status !== 0", @click="deleteOrder(order.id)", title="删除订单")
</template>
<script>
import {Vue, dheader} from 'src/assets/js/page';
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
            this.orders = this.data;
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
        // toggleTab(type, e) {
        //     switch(type) {
        //         case 'unconfirmed':
        //             Vue.delete(this.query, 'status');
        //             Vue.delete(this.query, 'status__lte');
        //             Vue.set(this.query, 'status__gt', 80);
        //         break;
        //         case 'confirmed':
        //             Vue.set(this.query, 'status__lte', 80);
        //             Vue.set(this.query, 'status__gt', 0);
        //         break;
        //         case 'done':
        //             Vue.delete(this.query, 'status__gt');
        //             Vue.delete(this.query, 'status__lte');
        //             Vue.set(this.query, 'status', 0);
        //         break;
        //     }
        //     let $el = $(e.currentTarget);
        //     $el.addClass('active')
        //       .siblings()
        //       .removeClass('active');
        // },
        toggleTab(type) {
            switch(type) {
                case 'unconfirmed':
                    Vue.delete(this.query, 'status');
                    Vue.delete(this.query, 'status__lte');
                    Vue.set(this.query, 'status__gt', 80);
                    break;
                case 'confirmed':
                    Vue.set(this.query, 'status__lte', 80);
                    Vue.set(this.query, 'status__gt', 0);
                    break;
                case 'done':
                    Vue.delete(this.query, 'status__gt');
                    Vue.delete(this.query, 'status__lte');
                    Vue.set(this.query, 'status', 0);
                    break;
            }
            this.active_tab = type
        },
        deleteOrder(id) {
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
    created(){
        let href = location.search.split('=')[1];
        console.log(href);
        if(href == 'confirmed'){
            this.active_tab = href;
            this.toggleTab(this.active_tab)
        }
    },
    data() {
        let pubOrderURL = constant.PATH.ORDER_PUB;
        let shareURL = constant.PATH.ORDER_SHARE;
        let detailURL = constant.PATH.ORDER_DETAIL;

        return {
            active_tab:'unconfirmed',
            url: constant.API.ORDERS,
            orders: [],
            query: {
                status__gt: 80
            },
            status: 90,
            apply_records: [],
            pubOrderURL,
            shareURL,
            detailURL
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
