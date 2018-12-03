<template lang="jade">
dheader
.pub(__vuec__)
  .banner.pt-40
    .title {{order.title}}
    .subtitle.mt-10 项目详情
    .family 家族
  .detail
    .main.container
      .avatar.mt-30
        a(href="{{publicURL}}?uid={{user.id}}")
          img.fl(:src="user.avatar")
        .clear
        .name {{user.name}}
      .user-desc.mt-10 {{user.desc}}
      .task-desc.mt-30
        span {{order.scate}} {{order.task_count}} {{order.task_unit}}
        span.ml-30 交稿时间剩余：{{order.count_down}}
      .dynamic-desc
        span 建筑面积 {{order.dynamic_info.area}}平米
        span.ml-30 {{order.dynamic_info.style}}风格
        span.ml-30 {{order.dynamic_info.is_face2face | f2f}}
        span.ml-30 {{order.dynamic_info.is_mesure || mesure}}包括量房
      .time-desc
        span 创建时间：{{order.created_on | date 'yy-mm-dd'}}
        span.ml-30 交稿时间：{{order.deadline | date 'yy-mm-dd'}}
      ul.cost-desc.mt-30
        li
          span 系统报价
          span.ml-30 ￥{{order.system_cost/100 || 0}} 积分
        li
          span 已加赏金
          span.ml-30 ￥{{fee}} 积分
        li
          span 违约金额
          span.ml-30 ￥{{order.violate_cost/100 || 0}} 积分
  .description
    .project-desc.container
      .label.border.mt-20 项目描述
      .desc {{order.desc}}
      .label.border-top 项目相关资料下载
        a.ml-20.cyan(:href="order.extra_resource", target="_new;") {{order.extra_resource_name}}
      .clear
      .label.cyan 关于自由设计师接单的条例
      textarea.desc(disabled)
</template>
<script>
import {Vue, dheader} from 'src/assets/js/page';
import api from 'src/assets/js/api';
import 'third_party/jqueryui/jquery.ui';
import upload from 'src/public/upload/upload';
import $ from 'jquery';
import utils from 'src/assets/js/utils';
import mixins from 'src/page/mixins';

Vue.filter('f2f', function (val) {
    return val ? '线上' : '线下';
});
Vue.filter('mesure', function (val) {
    return val ? '' : '不';
});

export default {
    components: {
        dheader,
        upload
    },
    asyncData(resolve) {
        this.fetch()
          .done(function() {
            resolve(this.data);
        });
    },
    computed: {
        fee() {
            let fee = this.order.pub_cost - this.order.system_cost || 0;
            return fee/100;
        }
    },
    methods: {
        // 获取发单基本信息
        fetch() {
            return api.get({
                url: this.url
            });
        }
    },
    data () {
        let id = utils.getURLParam('id');
        let url = constant.API.ORDERS + id + constant.API.APPLY_RECORD;
        return {
            id: id,
            oid: '',
            url,
            user: {},
            order: {
                dynamic_info: {}
            },
            desc: '',
            works: [],
            extra_resource: '',
            extra_resource_name: '',
            apply_cost: '',
            publicURL: constant.PATH.USER_PUB,
            demandURL: constant.PATH.ORDER_DEMAND
        };
    }
};
</script>
<style lang="less">
@import 'src/assets/css/variables';
@import '/src/assets/css/jqueryui/jquery.ui.css';
.pub[__vuec__] {
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
      .name {
        text-align: center;
        color: @cyan;
      }
    }
    .name, .user-desc,
    .task-desc,
    .dynamic-desc, .time-desc,
    .cost-desc {
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
      img {
        height: 100%;
        margin: auto;
        display: block;
        max-width: 100%;
      }
      .close {
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        font-size: 16px;
      }
      &.upload {
        line-height: 80px;
        text-align: center;
        font-size: 8rem;
        cursor: pointer;
      }
    }
  }
  .description {
    background: #f4f4f4;
    overflow: hidden;
    .desc {
      height: 130px;
      width: 100%;
      color: #999;
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
    textarea {
      border: 1px solid #ccc;
    }
    .name {
      // background: #ccc;
      border: 0;
      width: 85%;
      height: 40px;
      border-radius: 5px;
      line-height: 40px;
      text-indent: 20px;
      a {
        color: #666;
      }
    }
    .cyan {
      color: @cyan !important;
    }
    input {
      width: 100%;
    }
    .action {
      height: 60px;
      line-height: 60px;
      width: 400px;
      margin: auto;
    }
  }
}
</style>
