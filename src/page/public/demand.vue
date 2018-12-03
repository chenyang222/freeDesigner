/**
    @desc: 需求池， 承接订单的地方
*/

<template lang="jade">
dheader
.apply(__vuec__)
  .banner
    .title 需求池
    .select-wrap
      .left-wrap.fl
        select(v-model="fcate", @change="changeFcate")
          option(value="all") 选择项目分类
          option(v-for="opt in fcates", :value="opt") {{opt}}
      .right-wrap.fl
        select(v-model="scate", @change="changeScate")
          option(value="all") 选择项目需求
          option(v-for="(opt) in scates", :value="$key") {{$key}}
  .clear.mt-20
  .orders.container(v-for="order in orders")
    .name {{order.user_name}}
    .avatar.fl
      a(href="{{publicURL}}?uid={{order.user.id}}")
        img.fl(:src="order.user.avatar")
    .desc-title.fl.ellipsis(title="{{order.title}}") {{order.title}}
    .system-cost.fl.ml-100 {{order.pub_cost/100}}积分
    a.link(href="{{applyRecordURL}}?oid={{order.id}}", target="_new")
    .clear
    .time
      span.pub 创建时间：{{order.pub_time | date}}
      span.deadline.ml-40 交稿日期：{{order.deadline | date}}
      span.view.ml-40 浏览总计：{{order.view_count}}
      span.apply.ml-40 接单人数：{{order.apply_count}}
  paginator.mt-30(:info="info")
</template>
<script>
import {Vue, dheader} from 'src/assets/js/page';
import api from 'src/assets/js/api';
import mixins from 'src/page/mixins';
import $ from 'jquery';
import paginator from 'src/public/paginator/paginator';

export default {
    mixins: [mixins],
    components: {
        dheader,
        paginator
    },
    asyncData (resolve, reject) {
        let self = this;
        $.when(this.fetch(), this.fetchCategory())
        .done(function() {
            let applys = this[0];
            let categorys = this[1];
            let obj = {};
            obj.orders = applys.data;
            obj.fcates = categorys.data.fcates;
            obj.scates = categorys.data.scates;
            obj.info = applys.info;
            resolve(obj);
        });
    },
    watch: {
        query: {
            deep: true,
            handler() {
                this.reloadAsyncData();
            }
        }
    },
    methods: {
        // 获取未达成合作且未过期的订单列表
        fetch () {
            return api.get({
                url: constant.API.DEMAND,
                data: this.query
            });
        },
        // 获取项目分类，项目需求列表
        fetchCategory() {
            return api.get({
                url: constant.API.ORDER_CATEGORY
            });
        },
        // 过滤项目需求
        changeScate(e) {
            let el = e.currentTarget;
            let val = el.value;
            if (val === 'all') {
                Vue.delete(this.query, 'scate');
                return;
            }
            Vue.set(this.query, 'scate', val);
        },
        // 过滤项目分类
        changeFcate(e) {
            let el = e.currentTarget;
            let val = el.value;
            if (val === 'all') {
                Vue.delete(this.query, 'fcate');
                return;
            }
            Vue.set(this.query, 'fcate', val);
        }
    },
    data () {
        let applyRecordURL = constant.PATH.ORDER_APPLY_RECORD;
        let detailURL = constant.PATH.ORDER_PUB_DETAIL;
        let shareURL = constant.PATH.ORDER_SHARE;
        let publicURL = constant.PATH.USER_PUB;

        return {
            orders: {},
            fcate: 'all',
            scate: 'all',
            fcates: [],
            scates: [],
            user_avatar: '',
            query: {},
            publicURL,
            shareURL,
            detailURL,
            applyRecordURL
        }
    }
};
</script>

<style lang="less">
@import 'src/assets/css/variables';
.apply[__vuec__] {
   .banner {
    position: relative;
    background: #223137;
    height: 320px;
    line-height: 320px;
    font-size: 30px;
    border-top: 1px solid #c35115;
    border-bottom: 1px solid #c35115;
    .title {
      position: absolute;
      z-index: 2;
      background: url('plate.png') center no-repeat;
      width: 320px;
      height: 320px;
      left: 50%;
      margin-left: -160px;
      text-align: center;
      color: #444;
    }
  }
  .select-wrap {
    height: 70px;
    margin: auto;
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 125px;
    background: #071c22;
    select {
      color: #fff;
      position: absolute;
      top: 18px;
      right: 160px;
      option{
        color: #999999;
      }
    }
    .left-wrap,
    .right-wrap {
      position: relative;
      width: 50%;
      height: 70px;
    }
    .right-wrap {
      select {
        left: 160px;
      }
    }

  }
  font-size: 1.8rem;
  .orders {
    position: relative;
    a {
      height: 100%;
      width: 100%;
      display: inline-block;
      cursor: pointer;
    }
    .link {
      position: absolute;
      right: 0;
      height: 100%;
      left: 200px;
    }
    margin: auto;
    background: url(./demand-bg.png) no-repeat center;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 10px;
    line-height: 150px;
    font-size: 1.2rem;
    height: 150px;
    color: #666;
    .avatar {
      height: 46px;
      line-height: 46px;
      width: 130px;
      background: none;
      margin-top: 24px;
      margin-left: 60px;
      a {
        display: block;
        margin: auto;
        width: 48px;
      }
      img {
        height: 48px;
        width: 48px;
        border-radius: 24px;
      }
    }
    .name {
      margin: auto;
      font-size: 1.4rem;
      width: 130px;
      height: 24px;
      line-height: 24px;
      text-align: center;
    }
    .desc-title {
      font-size: 18px;
      color: #fff;
      width: 320px;
      height: 100px;
      line-height: 100px;
    }
    .time
    {
      height: 40px;
      line-height: 40px;
      position: relative;
      top: -22px;
      left: 320px;
      color: #999;
    }
    .count {
      width: 90px;
    }
    .system-cost {
      font-size: 2.2rem;
      height: 100px;
      line-height: 100px;
      color: red;
    }
  }
}
</style>
