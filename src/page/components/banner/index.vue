<template>
  <div class="banner" __vuec__>
    <img src="./banner.png" alt="banner">
    <div v-if="!data.id" class="info">
      <p>现在就与  28593  万名工程师成为挚友 </p>
      <a :href="REGISTER">加入我们</a>
    </div>
  </div>
</template>
<script>
import eventVue from '../../../assets/js/eventVue'
import api from '/src/assets/js/api';
import constant from '/src/assets/js/constant';
import _ from 'lodash';

export default {
    // 获取users的信息
    asyncData (resolve) {
        this.fetch()
        .done(function () {
            resolve(this);
        });
    },
    computed: {
      isLogout () {
          return this.data && JSON.stringify(this.data) === '{}';
      }
    },
    methods: {
        fetch () {
            let promise = api.get({
                url: constant.API.USER_STAT
            });
            return promise;
        }
    },
    data() {
        return _.merge({}, constant.PATH, {
            info: {},
            data: {},
            // 未登录状态
            success: false,
            REGISTER: constant.PATH.REGISTER
        });
    }
};
</script>

<style lang="less">
.banner[__vuec__]{
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
  img{
    width: 100%;
  }
  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    p {
      font-size: 18px;
      color: #bbb;
    }
    a {
      color: #fff;
      width: 180px;
      height: 34px;
      margin-left: 20px;
      line-height: 34px;
      text-align: center;
      background-color: #4495f7;
    }
  }
}
</style>
