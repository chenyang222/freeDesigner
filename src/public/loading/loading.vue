<template>
  <div class="loading-box" __vuec__>
    <img src="./loading-o.png" alt="">
  </div>
</template> 
<style lang="less">
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading-box[__vuec__]{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 99999999;

  img {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30px;
    height: 30px;
    margin-left: -15px;
    margin-top: -15px;
    animation: rotate 2s linear infinite;
  }
}
</style>
