<template lang="jade">
dheader
hotgallery
dfooter
</template>
<script>
import {Vue, router, dheader, dfooter} from '/src/assets/js/page';
import hotgallery from '/src/page/components/hot-gallery/gallery';

export default {
    components: {
        dheader,
        dfooter,
        hotgallery
    },
    data () {
        return {

        };
    }
};
</script>
