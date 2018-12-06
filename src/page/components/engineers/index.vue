<template>
  <div class="home__ngineer" __vuec__>
      <div class="home__ngineer__title">
          卓越的工程师们&nbsp;&nbsp;Excellent engineers
      </div>
      <div class="home__ngineer__content">
          <div class="item">
              <div class="avatar"></div>
              <div class="title">不知火舞</div>
              <div class="exp">5年工作经验</div>
              <div class="label">【软装设计】【主案设计】</div>
          </div>
          <div class="item">
              <div class="avatar"></div>
              <div class="title">不知火舞</div>
              <div class="exp">5年工作经验</div>
              <div class="label">【软装设计】【主案设计】</div>
          </div>
          <div class="item">
              <div class="avatar"></div>
              <div class="title">不知火舞</div>
              <div class="exp">5年工作经验</div>
              <div class="label">【软装设计】【主案设计】</div>
          </div>
          <div class="item">
              <div class="avatar"></div>
              <div class="title">不知火舞</div>
              <div class="exp">5年工作经验</div>
              <div class="label">【软装设计】【主案设计】</div>
          </div>
      </div>
  </div>
</template>
<style lang="less">
.home__ngineer[__vuec__] {

    .home__ngineer__title {
        height: 57px;
        line-height: 57px;
        padding-left: 20px;
        color: #fff;
        font-size: 25px;
        background-color: #c3c3c3;
    }

    .home__ngineer__content {
        display: flex;
        justify-content: center;
        padding: 44px;
        background-color: #f4f4f4;

        .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 194px;
            height: 246px;
            border: 1px solid #000;

            & + .item {
                margin-left: 54px;
            }

            .avatar {
                width: 92px;
                height: 92px;
                border-radius: 50%;
                background-color: red;
            }
            .title {
                color: #000;
                font-size: 24px;
                font-weight: bold;
                margin-top: 20px;
            }
            .exp {
                font-size: 18px;
                color: #919191;
            }
            .label {
                font-size: 15px;
                color: #4495f7;
            }
        }

    }
}
</style>
