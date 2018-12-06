<template>
  <div class="home__demand" __vuec__>
      您现在就可以<a :href="ORDER_PUB" class="home__demand__btn">发布需求</a>
  </div>
</template>
<style lang="less">
.home__demand[__vuec__] {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  height: 240px;
  background-color: #f4f4f4;
  border-top: 14px solid #c3c3c3;

  .home__demand__btn {
    font-size: 24px;
    color: #fff;
    width: 220px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-left: 20px;
    font-weight: bold;
    background-color: #4495f7;
    cursor: pointer;
  }
}
</style>
<script>
import constant from '/src/assets/js/constant';
export default {
  data() {
    return{
      ORDER_PUB: constant.PATH.ORDER_PUB
    }
  }
}
</script>
