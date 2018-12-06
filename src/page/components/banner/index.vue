<template>
  <div class="banner" __vuec__>
    <div class="info">
      <p>现在就与  28593  万名工程师成为挚友 </p>
      <div>加入我们</div>
    </div>
  </div>
</template>
<style lang="less">
.banner[__vuec__]{
  position: relative;
  height: 400px;
  background-color: red;

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

    div {
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
