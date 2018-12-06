<template lang="jade">
dheader
banner
engineers
home-demand
hotgallery
dfooter
</template>
<script>
import {Vue, router, dheader, dfooter} from '/src/assets/js/page';
import banner from '/src/page/components/banner';
import engineers from '/src/page/components/engineers';
import homeDemand from '/src/page/components/home-demand';
import hotgallery from '/src/page/components/hot-gallery/gallery';

export default {
    components: {
        dheader,
        dfooter,
        hotgallery,
        banner,
        engineers,
        homeDemand
    },
    data () {
        return {

        };
    }
};
</script>
