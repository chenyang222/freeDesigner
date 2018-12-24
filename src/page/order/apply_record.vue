<template lang="jade">
dheader
.wrap(__vuec__)
  orderdetail(otitle="项目详情", :order="order")
  .descriptions
    .container
      .label 上传同类案例（请上传jpg、png大小不超过2M的图片）
      ul.works
        li(v-for="work in works")
          .close(@click="deleteWork($index)") x
          a
            img(:src="work[1]")
        li.upload(@click="uploadWork") +
      upload(type="work", maxsize="2*1024")
      .label 竞标描述
      textarea.desc(placeholder="请在此处描述您的竞标优势", v-model="desc")
      //- .fixDesc(@click="fixDesc") 修改
      div
      .clear
      .label 问题解答（雇主上传了 {{questionList.length}} 个问题）
      .answer-btn(@click="beginAnswer", v-show="timing == 0 && !overAnswer") 开始答题
      .answering(v-show="timing > 0 && !overAnswer")
        .timing.answer-btn {{ timingText }}
        .now(v-for='(index, item) in questionList', :key='index', v-show='index == nowIndex')
          .calc NO.{{ index + 1 }}/{{questionList.length}}
            span {{ item.question }}
        textarea.answerTextArea(placeholder="请在此处做解答", v-model="answerContent")
        .answerBtn
          .answer-btn(@click="giveUpAnswer") 放弃答题
          .answer-btn(@click="nextQuestion") 下一题
      .overAnswer(v-show='overAnswer')
        .overTittle【答题结束】
        .clickMore 试卷详情
          img.open(v-show='!showMore', @click='showMore = true', src='./images/open.png', alt='open')
        .closeMore
          img.close(v-show='showMore', @click='showMore = false', src='./images/close.png', alt='close')  
        .answersBox(v-show='showMore', v-for='(index, item) in answerList', :key='index')
          .anContent.questionTop
            .number 第{{ index + 1 }}题
            div {{ questionList[index].question }}
          .anContent
            .timeAnswer
              .time 使用时间:【{{ showAnswerTime(item.start_time, item.end_time) }}】
              .content(v-show='item.answer') {{ item.answer }}
              .noAnswer(v-show='!item.answer') 接单人没有回答此试题
      //- .label.cyan 关于自由设计师接单的条例
      //- textarea.desc(disabled)
      .label 我想加价
      .wrap
        input(v-model="apply_cost", type="number")
        .fixCost(@click="fixCost") 确认
        span
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
            this.works.push(ret.data[0]);
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
      const getQuestionsUrl = '/api/orders/' + this.oid + '/questions/';
      let that = this;
      api.get({
          url: getQuestionsUrl
      }).done(function () {
        let newdata = this.data.filter((item, index) => {
          if (item.question) {
            return item
          }
        })
        that.questionList = newdata;
      })
      let timer = setInterval( ()=> {
        if (that.id) {
          clearInterval(timer)
          const res = []
          let number = 0;
          for (let i = 0; i < 5; i++) {
            const getAnswerUrl = '/api/apply_records/'+ that.id +'/answers';
            api.get({
                url: getAnswerUrl,
                data: {
                  order_question: i
                }
            }).done(function () {
              number++
              if (this.data.length !== 0) res.push(this.data[0])
              if (number == 5) {
                that.res = res.length;
                if (res.length > 0) {
                  that.answerList = res;
                  that.overAnswer = true;
                }
              }
            })
          }
        }
      }, 1000)
    },
    computed: {

      questionTotal () {
        console.log(this)
        return 1
          // return this.data && JSON.stringify(this.data) === '{}';
      },
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
          let that = this;
          if (this.res > 0 || this.answerList.length == 0) {
            const data = {
              desc: that.desc,
              apply_cost: parseInt(that.apply_cost, 10),
              works: that.works
            };
            api.patch({
              url: that.url + that.id + '/',
              data
            }).done(() => window.location.href = constant.PATH.ORDER_APPLY_MANAGEMENT);
          } else {
            let number = 0;
            for (let i = 0; i < this.answerList.length; i++) {
              const setOrderAnswerUrl = '/api/apply_records/' + this.id + '/answers/?order_question=' + this.answerList[i].qid;
              const data = {
                answer: this.answerList[i].answer,
                start_time: this.answerList[i].start_time,
                end_time: this.answerList[i].end_time
              }
              api.post({
                url: setOrderAnswerUrl,
                isNeed: true,
                data
              }).done(function () {
                number++;
                if (number == 5){
                  const data = {
                    desc: that.desc,
                    apply_cost: parseInt(that.apply_cost, 10),
                    works: that.works
                  };
                  api.patch({
                    url: that.url + that.id + '/',
                    data
                  }).done(() => window.location.href = constant.PATH.ORDER_APPLY_MANAGEMENT);
                }
              })
            }
          }
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
        },
        fixDesc () {
          let data = {
              desc: this.desc
          };
          api.patch({
              url: this.url + this.id + '/',
              data
          })
        },
        fixCost () {
          let data = {
              apply_cost: parseInt(this.apply_cost, 10)
          };
          api.patch({
              url: this.url + this.id + '/',
              data
          })
        },
        beginAnswer () {
          if (this.questionList.length === 0) {
            return
          }
          this.startTime = new Date().getTime()
          this.timer = setInterval(() => {
            this.timing += 1
            const hour = Math.floor(this.timing / 3600)
            const min = Math.floor(this.timing / 60) % 60
            const sec = this.timing % 60
            let t = ''
            if (hour < 10) {
              t = '0' + hour + ':'
            } else {
              t = hour + ':'
            }
            if (min < 10) { t += '0' }
            t += min + ':'
            if (sec < 10) { t += '0' }
            t += sec
            this.timingText = t
          }, 1000)
        },
        nextQuestion () {
          this.endTime = new Date().getTime()
          const dataForm = {
            answer: this.answerContent,
            start_time: this.startTime,
            end_time: this.endTime,
            qid: this.questionList[this.nowIndex].qid
          }
          this.answerList.push(dataForm)
          this.answerContent = ''
          this.nowIndex += 1
          this.startTime = new Date().getTime()
          if (this.nowIndex > this.questionList.length - 1) {
            this.overAnswer = true
          }
        },
        giveUpAnswer () {
          clearInterval(this.timer)
          this.timer = null
          this.timing = 0
          this.timingText = '00:00:00'
          this.nowIndex = 0
          this.answerContent = ''
          this.answerList = []
        },
        showAnswerTime (start, end) {
          const time = (end - start) / 1000
          const hour = Math.floor(time / 3600)
          const min = Math.floor(time / 60) % 60
          const sec = time % 60
          let t = ''
          if (hour > 0) {
            if (hour < 10) {
              t = '0' + hour + ':'
            } else {
              t = hour + '时'
            }
          }
          if (min < 10) { t += '0' }
          t += min + '分'
          if (sec < 10) { t += '0' }
          t += sec.toFixed(0) + '秒'
          return t
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
              dynamic_info: {},
              user:{

              }
            },
            desc: '',
            works: [],
            extra_resource: '',
            extra_resource_name: '',
            apply_cost: '',
            publicURL: constant.PATH.USER_PUB,
            demandURL: constant.PATH.ORDER_DEMAND,
            questionList: [],
            timing: 0,
            timingText: '00:00:00',
            timer: null,
            answerContent: '',
            nowIndex: 0,
            startTime: '',
            endTime: '',
            answerList: [],
            overAnswer: false,
            showMore: false,
            res: 0,
            score: '',
            comments: ''
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
      border: 1px solid #000;
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
  .descriptions {
    border-top: 1px solid #ccc;
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
    .desc {
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
      width: 87%;
      margin-right: 1%;
    }
    .fixCost{
      width: 120px;
      height: 38px;
      background-color: #4495f7;
      color: #ffffff;
      font-size: 14px;
      line-height: 38px;
      text-align: center;
      border-radius: 5px;
      margin-top: 10px;
      cursor: pointer;
      display: inline-block;
    }
    .action {
      height: 60px;
      line-height: 60px;
      width: 400px;
      margin: auto;
    }
  }
  .fixDesc{
    width: 120px;
    height: 38px;
    background-color: #4495f7;
    color: #ffffff;
    font-size: 14px;
    line-height: 38px;
    text-align: center;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
  }
  .answer-btn{
    width: 146px;
    height: 38px;
    background-color: #4495f7;
    color: #ffffff;
    font-size: 14px;
    line-height: 38px;
    text-align: center;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
  }
  .timing{
    margin: 0 auto;
  }
  .now{
    .calc{
      font-size: 16px;
      padding-bottom: 10px;
      color: #777777;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      span{
        margin-left: 30px;
        font-weight: normal;
      }
    }
  }
  .answerTextArea{
    width: 100%;
    height: 130px;
    border: none;
    background-color: #f4f4f4;
    border-bottom: 1px solid #ccc;
  }
  .answerBtn{
    width: 70%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .overAnswer{
    .overTittle{
        color: #979797;
        font-size: 20px;
        text-align: center;
    }
    .clickMore,.closeMore{
        margin-top: 10px;
        color: #979797;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
          width: 24px;
          height: 21px;
          margin-top: 5px;
        }
    }
    .answersBox{
        background-color: #ebebeb;
        padding: 15px;
        .questionTop{
            font-size: 14px;
            margin-top: 5px;
            margin-bottom: 10px;
        }
        .anContent{
            display: flex;
            .time{
                font-size: 16px;
                color: #ff0000;
            }
            .content,.noAnswer{
                font-size: 16px;
                line-height: 26px;
                margin-top: 5px;
            }
            .noAnswer{
                color: #ff0000;
            }
            .number{
                width: 60px;
                margin-right: 13px;
            }
        }
    }
  }
}
</style>