<template lang="jade">
dheader
.wrap(__vuec__)
  orderdetail(otitle="项目详情", :order="order")
  .description
    .container
      .label 竞标描述
      textarea.desc(placeholder="芍药居哈哈，我就在这里住哦，给我下单， 方便啊......", v-model="desc")
      .label 上传同类案例（请上传jpg、png大小不超过2M的图片）
      ul.works
        li(v-for="work in works")
          .close(@click="deleteWork($index)") x
          a
            img(:src="work['ori']")
        li.upload(@click="uploadWork") +
      upload(type="work", maxsize="2*1024")
      .clear
      .label.cyan 关于自由设计师接单的条例
      textarea.desc(disabled)
      .label 我想加价
      .wrap
        input(v-model="apply_cost", type="number")
      .action.mt-30
        .btn.fl.btn-gray.w-100
          a(:href="demandURL") 返回需求池
        .btn.fl.ml-30(v-if="local_id != order.user.id")
          a(v-if="!type", @click="submit") 确认接单
          a(@click="submit") 保存接单
</template>
<script>
import {Vue, dheader} from 'src/assets/js/page';
import api from 'src/assets/js/api';
import 'third_party/jqueryui/jquery.ui';
import upload from 'src/public/upload/upload';
import orderdetail from 'src/page/components/order-detail/order-detail';
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
    mixins: [mixins],
    components: {
        dheader,
        upload,
        orderdetail
    },
    events: {
        // 上传类似作品
        uploadComplete(ret) {
            this.works.push(ret.data);
            let data = {
                works: this.works
            };
            api.patch({
                url: this.url + this.id + '/',
                data
            });
        }
    },
    asyncData(resolve) {
        this.fetch()
          .done(function() {
            resolve(this.data);
        });
    },
    created(){
        this.local_id = localStorage.getItem('temp_user_id');
    },
    computed: {
        fee() {
            let fee = this.order.pub_cost - this.order.system_cost || 0;
            return fee;
        }
    },
    methods: {
        fetch() {
            return api.get({
                url: this.url
            });
        },
        submit() {
            let data = {
                desc: this.desc,
                apply_cost: parseInt(this.apply_cost, 10),
                works: this.works
            };
            api.patch({
                url: this.url + this.id + '/',
                data
            }).done(() => window.location.href = constant.PATH.ORDER_APPLY_MANAGEMENT);
        },
        uploadWork() {
            $('#upload').click();
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
        }
    },
    data() {
        let oid = utils.getURLParam('oid');
        let type = utils.getURLParam('type');
        let url = constant.API.ORDERS + oid + constant.API.APPLY_RECORD;
        return {
            local_id:'',
            id: '',
            oid: oid,
            url,
            user: {},
            type, // 当前记录是否是编辑状态
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
}
</script>
<style lang="less">
@import 'src/assets/css/variables';

.wrap[__vuec__] {
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