<template lang="jade">
dheader
.transition
  .container
    .in-a-word 下一刻，你将会与 {{number}} 位设计师，成为挚友
    .join-them.mt-10
.register-container
  .container
    .title-wrap
      .title 【自由】室内设计师场景的合作交易平台
      .sub-title.mt-10 加入自由设计师合作交易平台，这里可以找到室内装饰中的各类小伙伴，
      .sub-title 分担各类擅长专业，并且由您与众多小伙伴共同打造强大的装饰设计圈。
    register
</template>
<script>
import {Vue, router, dheader, dfooter} from '/src/assets/js/page';
import register from '/src/page/components/register/register';

export default {
    components: {
        dheader,
        dfooter,
        register
    },
    data () {
        return {
            number: '54678'
        };
    }
};
</script>

