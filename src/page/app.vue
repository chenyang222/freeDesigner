<template lang="jade">
dheader
banner
hotgallery
dfooter
</template>
<script>
import {Vue, router, dheader, dfooter} from '/src/assets/js/page';
import banner from '/src/page/components/banner';
import hotgallery from '/src/page/components/hot-gallery/gallery';

export default {
    components: {
        dheader,
        dfooter,
        hotgallery,
        banner
    },
    data () {
        return {

        };
    }
};
</script>
