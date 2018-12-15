<template lang="jade">
dheader
.wrap(__vuec__)
  .banner.pt-40
    .title {{title}}
    .subtitle.mt-10 发起众包
  .detail
    ul.main.container
      li
        .label 选择项目分类：
        .fr
          select(v-model="fcate", :disabled="this.id ? true :false")
            option(v-for="opt in fcates", :value="opt") {{opt}}
        .clear
        .desc 选择您的工程分类
      li
        .label 选择项目需求：
        .fr
          select(v-model="scate", :disabled="this.id ? true :false")
            option(v-for="(opt) in scates", :value="$key") {{$key}}
        .clear
        .desc 选择您要发包的项目类型
      li
        .label 任务量
        .fr
          input(v-model="task_count", placeholder="请填写数量及选择单位", :disabled="this.id ? true :false")
          select(v-model="task_unit", :disabled="this.id ? true :false")
            option(v-for="opt in units", :value="opt") {{opt}}
        .clear
        .desc 填写您需求的数量【如1套、5张、1项】
      li(v-if="scateitems.hasOwnProperty('area')")
        .label 平米数
        .fr
          input(v-model="dynamic_info.area", placeholder="请填写建筑平米数", @change="getSysCost", :disabled="this.id ? true :false")
          .area.fl 平米
        .clear
        .desc 填写项目的建筑平米数
      li
        .label 项目地址
        .fr
          input(v-model="location", placeholder="请填写项目地址", :disabled="this.id ? true :false")
        .clear
        .desc 请填写您项目大概位置
      li.h-auto
        ul.selection.dynamic-items
            li(v-for="item in scateitems", v-if="$key !== 'area'")
              .label {{ item }}
              .clear
              div(v-if="$key === 'style'", @change="resetDynamicItems")
                select(data-dynamic="{{$key}}", :disabled="this.id ? true :false")
                  option(v-for="opt in styles", :value="opt", selected="$index === 0") {{opt}}
              div(v-else)
                select(data-dynamic="{{$key}}", @change="resetDynamicItems", :disabled="this.id ? true :false")
                  option(value="false", selected) 否
                  option(value="true") 是
      li.clear
        .label 任务交付日期
        .fr
          input.deadline(v-model="deadline", placeholder="交付日期", :disabled="this.id ? true :false")
        .clear
        .desc 选择您要求承接方的任务交付日期
    .transition
      ul.other.container
        li.desc-wrap
          .label 其它要求及项目描述：
          textarea.desc(v-model="desc", placeholder="填写相关说明及要求，如：要求接单者展示同类案例，等")
        li
          .label 项目相关资料
          .upload-wrap
            .img-box
              .img-item(v-for='item in projectFiles', :key='$key')
                img(v-if="item[3] === 'img'", :src='item[1]', alt='')
                span(v-else='') {{item[0]}}
              .img-item.btna(@click='uploadZip', v-if="!this.id")
              upload(type="resource")
          .clear
        li
          .label 增加赏金（积分）
          input(placeholder="0.00", v-model="feeComputed", type="number", @keyup="getSysCost | debounce 800")
        li
          .label 设置问题以及试卷
          div.question_item
            span 第一题 
            input(placeholder="第一题", v-model="question.a")
          div.question_item
            span 第二题 
            input(placeholder="第二题", v-model="question.b")
          div.question_item
            span 第三题 
            input(placeholder="第三题", v-model="question.c")
          div.question_item
            span 第四题 
            input(placeholder="第四题", v-model="question.d")
          div.question_item
            span 第五题 
            input(placeholder="第五题", v-model="question.e")
      ul.submit
        li.sys-cost
          .label 系统报价
            .number.ml-20 {{system_cost / 100}}积分
        li.pub-cost
          .label 最终报价 (系统报价 {{system_cost / 100}} + 赏金 {{fee}})
            .number.ml-20 {{pub_cost / 100}}积分
        li
          .btn
            a(v-if="!id", @click="submit") 确认发单
            a(v-else, @click="submit") 保存发单
</template>
<script>
import {Vue, dheader} from 'src/assets/js/page';
import api from 'src/assets/js/api';
import 'third_party/jqueryui/jquery.ui';
import upload from 'src/public/upload/upload';
import $ from 'jquery';
import utils from 'src/assets/js/utils';
import mixins from 'src/page/mixins';
import _ from 'lodash';

export default {
    mixins: [mixins],
    components: {
        dheader,
        upload
    },
    events: {
        uploadComplete(resp) {
          let data = resp.data
          switch (data[0][0].split('.')[1]) {
            case 'png':
            case 'jpeg':
            case 'jpg':
            case 'gif':
              data[0][3] = 'img'
              break
            default:
              data[0][3] = 'file'
              break
          }
          this.projectFiles.push(data[0])
        },
        uploadProgress(e) {
            let position = e.position;
            let loaded = e.loaded;
        }
    },
    computed: {
      feeComputed:{
        get:function(){
          return this.fee
        },
        set:function(val){
          this.fee = val
        }
      },
        pub_cost() {
            let fee = parseInt(this.fee, 10) || 0;
            let sysCost = parseInt(this.system_cost, 10) || 0;
            let pubCost = fee * 100 + sysCost;
            return pubCost;
        },
        // 获得表单数据
        formData() {
            this.dynamic_info.total_cost = this.total_cost;
            this.setDynamicItems();
            let data = {
                dynamic_info: this.dynamic_info,
                scate: this.scate,
                fcate: this.fcate,
                system_cost: this.system_cost,
                location: this.location,
                extra_info: this.desc,
                style: this.style,
                pub_cost: this.pub_cost,
                deadline: this.deadline,
                task_count: this.task_count,
                task_unit: this.task_unit,
                violate_cost: this.violate_cost,
                desc: this.desc,
                fee: parseInt(this.fee, 10),
                files:this.projectFiles.length ? this.projectFiles.map(v => {
                  return v[2]
                }).join() : this.files
            };
            return data;
        }
    },
    watch: {
        scate(val) {
            this.scateitems = this.scates[val];
        }
    },
    asyncData(resolve) {
        let self = this;
        this.fetchCategory()
          .done(function(res) {
            resolve(this.data);
            // 默认动态必填项的
            self.scateitems = self.scates[self.scate];
        });
        if (this.id) {
          let orderInfo = null
          let question = null
            this.fetch()
            .done(function () {
              orderInfo = this.data
            });

            this.getQuestionList()
            .done(function(){
              question = this.data
            })

            let timer = setInterval(() => {
              if(orderInfo && question){
                clearInterval(timer)
                if(!question.length) {
                  resolve(Object.assign({},{
                    ...orderInfo,
                    question:{
                      a:'',
                      b:'',
                      c:'',
                      d:'',
                      e:''
                    },
                    questionEdit:[]
                  }))
                } else {
                  let v = question.sort((a,b)=>a.qid-b.qid)
                  resolve(Object.assign({},{
                    ...orderInfo,
                    question:Object.assign({},{
                    a: v[0].question,
                    b: v[1].question,
                    c: v[2].question,
                    d: v[3].question,
                    e: v[4].question
                  }),
                    questionEdit:v
                  }))
                }
              }
            }, 500);
        }
    },
    ready() {
        let self = this;
        $('.deadline').datepicker({
            dateFormat: "yy-mm-dd",
            onSelect(date) {
                self.deadline = date;
            }
        });
    },
    methods: {
        fetch() {
            return api.get({
                url: this.url + this.id + '/'
            });
        },
        getQuestionList(){
          return api.get({
            url:`/api/orders/${this.id}/questions/`
          })
        },
        // 获取分类信息和动态必填项
        fetchCategory() {
            return api.get({
                url: constant.API.ORDER_CATEGORY,
                data: this.query
            });
        },
        // 获得系统报价
        getSysCost() {
            let self = this;
            let url = constant.API.SUGGEST_PRICE;
            api.post({
                url,
                data: this.formData
            }).done(function() {
                self.system_cost = this.data.system_cost;
            });
        },
        submit() {
            const {question,questionEdit} = this
            const self = this
            this.formData.pub_cost = this.formData.system_cost
            console.info(this.formData)
            let ajax = this.id ? api.patch : api.post;
            let data = this.id ? {
                fee: this.fee,
                desc:this.desc
            } : this.formData;
            let url = this.id ? this.url + this.id + '/' : this.url;
            ajax({
                url: url,
                data,
            }).done(function(){
              const id = this.data.id         
              if(!self.id) {
                Promise.all([
                  Object.keys(question).map((v, i) =>
                    api.post({
                      url: `/api/orders/${id}/questions/`,
                      data:{
                        qid: i,
                        question: question[v]
                      }
                    })
                  )
                ]).then(()=>{
                  setTimeout(() => {
                    window.location.href = constant.PATH.ORDER_PUB_MANAGEMENT
                  }, 2000);
                })
              } else {
                Promise.all([
                  questionEdit.map((v,i)=>{
                    api.patch({
                      url:`/api/orders/${self.id}/questions/${v.qid}/`,
                      data:{
                        question:question[Object.keys(question)[i]]
                      }
                    })
                  })
                ]).then(()=>{
                  setTimeout(() => {
                    window.location.href = constant.PATH.ORDER_PUB_MANAGEMENT
                  }, 2000);
                })
              }
            })
        },
        uploadZip() {
            $('#upload').click();
        },
        // 获取动态必填项的内容
        setDynamicItems() {
            let self = this;
            let $dynamicitems = $('.dynamic-items select');
            $dynamicitems.each(function (index, item) {
                let $select = $(item);
                let key = $select.data('dynamic');
                let val = $select.val().trim();
                self.dynamic_info[key] = val;
            });
        },
        resetDynamicItems() {
            this.setDynamicItems();
        }
    },
    data() {
        let id = utils.getURLParam('id');
        return {
            orderType:1,
            projectFiles:[],
            id,
            // 默认是订单, 如果单独的订单页面会重新渲染
            url: constant.API.ORDERS,
            title: '项目发单',
            fcates: [],
            scates: [],
            dynamic_info: {},
            fcate: '家庭室内工程',
            scate: '主案设计',
            scateitems: {},
            styles: ['简约', '现代', '中式', '欧式', '前卫', '其它'],
            units: ['张', '套', '项', '天'],
            task_unit: '套',
            task_count: '',
            extra_resource: '',
            location: '',
            extra_resource_name: '未上传文件',
            system_cost: 200,
            total_cost: 0, // 项目总价， 预算
            fee: 0,
            violate_cost: '', // 违约金
            deadline: utils.formatDate(new Date().getTime() + 24*1000*3600, 'yyyy-mm-dd hh:nn'),
            desc: '',
            lodash: _,
            question: {
              a: '',
              b: '',
              c: '',
              d: '',
              e: ''
            },
        };
    }
}
</script>
<style lang="less">
@import 'src/assets/css/variables';
@import '/src/assets/css/jqueryui/jquery.ui.css';

.wrap[__vuec__] {
  .img-box {
  display: flex;
  flex-wrap: wrap;

  .img-item {
    width: 140px;
    height: 105px;
    background-color: #ececec;
    margin-right: 12px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }

    span {
      color: #959595;
    }

    &:nth-child(3n+0){
      margin-right: 0;
    }
    &:nth-child(n+4){
      margin-top: 10px;
    }
    &.btna {
      background: url('./images/add.png') no-repeat center #ececee;
      background-size: 50%;
    }
  }
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
  }
  .detail {
    .main,
    .other {
      width: 960px;
    }
    select {
      background: url(./images/arrow-down.png) no-repeat 95% 50%;
      color: @cyan;
      font-size: 18px;
      direction: rtl;
    }
    .main {
      padding-bottom: 60px;
    }
    ul {
      li {
        color: #333;
        .label {
          float: left;
          font-size: 1.8rem;
          height: 80px;
          line-height: 130px;
        }
        .clear {
          border-bottom: 1px solid #ccc;
        }
        .fr {
          margin-top: 40px;
          input {
            float: left;
            border: 0;
            font-size: 18px;
            color: @cyan;
            position: relative;
            top: -4px;
            text-align: right;
            &.deadline {
              width: 186px;
              color: red;
              background: #fff url(./images/arrow-down.png) no-repeat center right;
              position: relative;
              top: 0px;
              text-align: left;
            }
          }
          .area {
            width: 60px;
            color: @cyan;
            font-size: 1.8rem;
            text-indent: 15px;
            position: relative;
            top: 3px;
          }
        }
        .desc {
          margin-top: 5px;
          color: #bbb;
        }

      }
      &.selection {
        li {
          float: left;
          width: 25%;
          select {
            width: auto;
            margin: 0;
            padding: 0;
            direction: ltr;
            padding-right: 20px;
          }
        }
      }
    }
    .transition {
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      background-color: #f4f4f4;
    }
    .other {
      .desc-wrap {
        height: 180px;
        .desc {
          height: 130px;
          width: 100%;
          color: #333;
        }
      }
      .label {
        font-size: 1.4rem;
        color: #666;
        height: 40px;
        float: none;
        line-height: 40px;
      }
      .name {
        background: #ccc;
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
      .save {
        float: right;
      }
      .clear {
        border: 0;
      }
      input {
        width: 100%;
      }
      .question_item {
        display: flex;
        align-items: center;

        &+.question_item {
          margin-top: 20px;
        }
        span {
          display: inline-block;
          width: 55px;
        }
      }
    }
    .submit {
      background-color: #fff;
      padding-top: 30px;
      padding-bottom: 30px;
      li {
        height: 60px;
      }
      .label {
        width: 480px;
        height: 50px;
        line-height: 50px;
        float: none;
        margin: auto;
        .number {
          display: inline-block;
          color: blue;
        }
      }
    }
  }
  .family {
    color: #888;
    border: 1px solid #ccc;
    width: 180px;
    height: 24px;
    padding: 0;
    margin: auto;
    background: #fff;
    border-radius: 5px;
    position: relative;
    top: 11px;
    select {
      position: relative;
      top: -4px;
      color: #888;
    }
  }
  .btn {
    width: 80px;
    margin: auto;

  }

}
</style>