<template>
  <div class="banner" __vuec__>
    <img src="./banner.png" alt="banner">
    <div class="info">
      <p>现在就与  28593  万名工程师成为挚友 </p>
      <a :href="REGISTER">加入我们</a>
    </div>
  </div>
</template>
<script>
import constant from '/src/assets/js/constant';
export default {
  data() {
    return{
      REGISTER: constant.PATH.REGISTER
    }
  }
}
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
