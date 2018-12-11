<template>
    <div class="containers" __vuec__>
      <div class="mains">
      <div class="close">X</div>

        <div class="main-header">
          <div class="user-info">
            <div class="avatarssss">
              <img :src="info.user.avatar" alt="">
            </div>
            <div class="info">
              <div class="item-header">
                <div class="title">&nbsp;{{info.user.name}}</div>
                <div class="integral">议价：{{info.apply_cost}}积分</div>
              </div>
              <div>
                <div class="exp">&nbsp;{{info.user.career}}年工作经验</div>
              </div>
              <div class="skill">
                {{info.user.role | filterRole}}
              </div>
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
            <div class="item" v-for="(item, index) in userQuestionList" :key="index">
              <h4>第{{ index + 1 }}题：{{ item.order_question.question }}</h4>
              <div class="time">
                <img src="./ico_time.png" alt="">【{{ showAnswerTime(item.start_time, item.end_time) }}】
              </div>
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>
        <div class="tel-check">
          <h3>电话考核</h3>
          <a :href="`tel:${info.user.mobile}`"><img src="./images/ico_tel.png" alt=""></a>
        </div>
        <div class="footersss">
          <h4 class="total-price">服务总价：{{detail.pub_cost + detail.apply_cost + detail.system_cost}}积分</h4>
          <div class="price-info">【系统报价{{detail.system_cost}}+增加奖金{{detail.fee}}+接单人加价{{detail.apply_cost}}】</div>
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

export default {
  props:['info','detail'],
  asyncData(resolve) {
    let self = this;
    let id = utils.getURLParam('id');
    var a = [0,1,2,3,4]
    Promise.all([
      a.map(v=>{
        const url = `/api/apply_records/${id}/answers/?order_question=${v}`
        return api.get({
        url
      })
    })
    ]).then(res=>{
      const arr = []
      res = res[0]
      console.log(res)
    })

    // this.getUserQusetion().done(function() {
    //     this.order = this.data;
    //     resolve(this);
    //     // self.fetchLastComment().done(function () {
    //     //     this.last_comment = this.data[0];
    //     //     resolve(this);
    //     // });
    // });
  },
  filters: {
    filterRole (val) {
      if(!val) return ''
      return val.split(',').filter(v => v !== '').map(v => `【${v}】`).join('')
    }
  },
  ready(){
    setTimeout(() => {
      console.log(this.detail,this.info)
    }, 1000);
  },
  methods:{
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
      
    },
    getUserQusetion(id) {
      var a = [0,1,2,3,4]
      Promise.all([
        a.map(v=>
          api.get({
            url:`/api/apply_records/${id}/answers/?order_question=${v}`
          })
        )
      ]).then(res=>{
        console.log(res)
      })
      
      //   return fetchUtil(`/apply_records/${id}/answers/?order_question=${questionId}`)

      // api.patch({
      //     url: this.url,
      //     data: {
      //         status: 0
      //     }
      // }).done(()=> this.reloadAsyncData());
    },
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
    transform: scale(0.8);
    margin: 0 auto;
    margin-top: -80px;
    width: 800px;
    padding-bottom: 100px;
    background-color: #f0f0f0;

    .close {
      position: absolute;
      right: -200px;
      top: 0;
      font-size: 100px;
      z-index: 999999;
    }

    >div {
      padding: 0 75px;
    }

    .main-header {
      padding-top: 44px;
      padding-bottom: 44px;
      border-bottom: 10px solid #fff;
      .user-info {
        display: flex;
        .avatarssss {
          width: 120px;
          height: 120px;
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
              font-size: 22px;
              font-weight: bold;
            }
            .title {
              font-weight: bold;
            }
            .integral {
              font-weight: bold;
              color: #ff0000;
            }
            .exp {
              color: #808080;
            }
          }
        }
      }
      .explain {
        margin-top: 28px;
        h3 {
          font-size: 30px;
        }
        p {
          font-size: 22px;
          margin-top: 24px;
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
        font-weight: bold;
        font-size: 30px;
        padding: 20px 75px;
        background-color: #f0f0f0;
        span{
          color: #808080;
        }
      }
      .paper-main {
        padding: 0 75px;
        .item {
          margin-top: 40px;
          h4 {
            font-size: 22px;
            font-weight: bold;
          }
          .time {
            margin-top: 50px;
            font-size: 24px;
            color: #ff0000;
            img {
              width: 55px;
              height: 55px;
            }
          }
          p {
            padding-left: 68px;
          }
        }
      }
    }

    .tel-check {
      text-align: center;
      h3 {
        font-size: 28px;
        font-weight: bold;
        margin: 40px 0;
      }
      img {
        width: 97px;
        height: 97px;
        margin-bottom: 40px;
      }
    }

    .footersss {
      text-align: center;
      padding: 0;
      padding-top: 60px;
      padding-bottom: 60px;
      margin-bottom: 40px;
      background-color: #fff;

      .total-price {
        font-size: 34px;
        color: #4195f7;
      }
      .price-info {
        margin-top: 14px;
        font-size: 16px;
        color: #4195f7;
      }
      .submit {
        margin-top: 40px;
        display: inline-block;
        font-size: 30px;
        color: #fff;
        padding: 20px 118px;
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
