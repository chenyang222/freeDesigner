<template>
    <div class="containers" __vuec__>
      <div class="mains">
      <div class="close" @click="close">X</div>

        <div class="main-header">
          <div class="user-info">
            <div class="avatarssss">
              <img :src="info.user.avatar" alt="">
            </div>
            <div class="info">
              <div class="item-header">
                <div class="title">{{info.user.name}}</div>
              </div>
              <div>
                <div class="exp">{{info.user.career}}年工作经验</div>
              </div>
              <div class="skill">
                {{info.user.role}}
              </div>
              <div class="integral">议价：{{info.apply_cost / 100}}积分</div>
            </div>
          </div>
          <div class="explain">
            <h3>竞标说明</h3>
            <p>{{info.desc || '暂无'}}</p>
          </div>
        </div>
        <div class="test-paper">
          <div class="paper-header">
            <h3>答题试卷<span>【您设置了{{userQuestionList.length}}道试题】</span></h3>
          </div>
          <div class="paper-main">
            <div class="item" v-for="item in userQuestionList">
              <div class="headerrrrrrrr">
                <h4>第{{ $index + 1 }}题：{{ item.order_question.question }}</h4>
                <div class="time">
                  <img src="./ico_time.png" alt="">【{{ showAnswerTime(item.start_time, item.end_time) }}】
                </div>
              </div>
              <p>{{ item.answer }}</p>
            </div>
          </div>
          <!-- 117338可用积分 -->
        </div>
        <div class="tel-check">
          <h3>电话考核</h3>
          <a :href="`tel:${info.user.mobile}`"><img src="./images/ico_tel.png" alt=""></a>
          <p>{{info.user.mobile}}</p>
        </div>
        <div class="footersss">
          <h4 class="total-price">服务总价：{{(detail.pub_cost + info.apply_cost) / 100}}积分</h4>
          <div class="price-info">【系统报价{{detail.system_cost/100}}+增加奖金{{detail.fee / 100}}+接单人加价{{info.apply_cost / 100}}】</div>
          <div class="submit" @click="surePay">确定合作并付款</div>
          <div class="agree" @click="showAgree">
            <img src="./images/redyes.png" alt="redyes">
            <span>我已阅读并同意遵守本次服务协议</span>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import api from 'src/assets/js/api';
import utils from 'src/assets/js/utils';
import eventVue from 'src/assets/js/eventVue';

export default {
  props:['info','detail'],
  asyncData(resolve) {
    let self = this;
    setTimeout(() => {
      let n = 0
      const res = []
      for (let i = 0; i < 5; i++) {
        api.get({
          url:`/api/apply_records/${this.info.id}/answers/`,
          data:{
            order_question:i
          }
        }).done(function(){
          n++
          if(this.data.length !== 0) res.push(this.data[0])
          if(n === 5){
            resolve(Object.assign({},{
              userQuestionList:res
            }))
          }
        })
      }
    }, 1000);
  },
  filters: {
    filterRole (val) {
      if(!val) return ''
      return val.split(',').filter(v => v !== '').map(v => `【${v}】`).join('')
    }
  },
  methods:{
    close(){
      this.$emit('closeuserinfo')
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
    },
    surePay(){
      api.post({
        url:'/api/pay/create_order/',
        data:{
          goods_id: this.info.id,
          goods_type: 'pre_order',
          price_type: 'all'
        }
      }).done(function(){
        api.post({
        url:'/api/pay/create_order/',
        data:{
          goods_id: this.info.id,
          goods_type: 'pre_order',
          price_type: 'all'
        }
      }).done(function(){
        window.location.reload()
      })
      })
    }
  }
}
</script>
<style lang="less">
.containers[__vuec__] {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  z-index: 9999999;
  padding: 30px;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.2);

  .mains {
    margin: 0 auto;
    margin-top: 160px;
    width: 892px;
    padding-bottom: 100px;
    background-color: #fff;

    .close {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 100px;
      z-index: 999999;
    }

    >div {
      padding: 0 75px;
    }

    .main-header {
      display: flex;
      padding: 60px 100px;
      .user-info {
        display: flex;
        .avatarssss {
          width: 85px;
          height: 85px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          flex: 1;
          margin-left: 25px;
          >div {
            display: flex;
            font-size: 26px;
            &.item-header {
              justify-content: space-between;
            }
            &.skill {
              color: #4495f7;
              font-size: 14px;
            }
            .title {
              font-size: 19px;
              font-weight: bold;
            }
            &.integral {
              font-weight: bold;
              font-size: 14px;
              color: #4195f7;
            }
            .exp {
              font-size: 14px;
              color: #808080;
            }
          }
        }
      }
      .explain {
        flex: 1;
        margin-left: 40px;
        h3 {
          margin: 0;
          font-size: 16px;
        }
        p {
          margin: 0;
          word-break: break-all;
          word-wrap:break-word;
          margin-top: 16px;
          font-size: 14px;
          color: #919191;
        }
      }
    }

    .case {
      width: 100%;
      overflow: hidden;
      padding-right: 0;
      padding-bottom: 33px;
      border-bottom: 10px solid #fff;
      h3 {
        font-size: 30px;
        padding: 36px 0 30px;
      }
      .box {
        width: 100%;
        overflow-x: scroll;
        .item {
          display: inline-block;
          width: 578px;
          height: 449px;
          // background-color: red;
          img {
            width: 100%;
            height: 100%;
          }

          & + .item {
            margin-left: 44px;
          }
        }
      }

    }

    .test-paper {
      padding: 0;
      padding-bottom: 50px;
      background-color: #fff;
      .paper-header {
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
        padding-left: 100px;
        font-size: 16px;
        font-weight: bold;
        span{
          font-weight: normal;
          font-size: 16px;
          color: #777777;
        }
      }
      .paper-main {
      padding-left: 100px;
      padding-right: 100px;
        .item {
          margin-top: 40px;
          .headerrrrrrrr {
            display: flex;
            justify-content: space-between;
          }
          h4 {
            margin: 0;
            font-size: 14px;
            font-weight: bold;
          }
          .time {
            font-size: 14px;
            color: #4195f7;
            img {
              width: 20px;
              height: 20px;
            }
          }
          p {
            color: #777777;
            font-size: 14px;
          }
        }
      }
    }

    .tel-check {
      padding-left: 100px;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
      text-align: center;
      h3 {
      text-align: left;

        font-size: 16px;
        font-weight: bold;
        margin: 10px 0;
      }
      img {
        width: 43px;
        height: 43px;
        margin-bottom: 10px;
      }
      p {
        margin: 0;
        font-size: 24px;
        color: #4195f7;
      }
    }

    .footersss {
      text-align: center;
      padding: 0;
      padding-top: 30px;
      padding-bottom: 60px;
      background-color: #fff;

      .total-price {
        font-size: 18px;
        color: #4195f7;
      }
      .price-info {
        margin-top: 14px;
        font-size: 12px;
        color: #4195f7;
      }
      .submit {
        margin-top: 40px;
        display: inline-block;
        font-size: 30px;
        color: #fff;
        padding: 10px 70px;
        background-color: #4195f7;
      }
      .agree {
        margin-top: 20px;
        img {
          width: 18px;
          height: 18px;
        }
        span {
          padding-left: 14px;
          font-size: 18px;
          color: #818181;
        }
      }
    }

  }
}
</style>
