/**
    @desc: 上传头像页面，后期支持裁切
*/

<template lang="jade">
input#cutimg(@change="uploadImage", type="file", accept="image/png, image/jpeg, image/jpg, image/gif", hidden)
</template>
<script>
import api from 'src/assets/js/api';
import utils from 'src/assets/js/utils';

export default {
    props: ['maxsize'],
    ready () {
        this.MAX_SIZE = this.maxsize * 1024; // *KB
        this.FILE_NAME_NOT_CONTAINS = [';']; // 文件名不能包含的内容
    },
    methods: {
        onUploadComplete (e) {
            this.$dispatch('uploadComplete', e);
        },
        uploadImage (e) {
            let files = e.target.files;
            let file = files[0];
            let fileName = file.name;
            let fileSize = file.size;
            // 文件大小不能为0
            if (fileSize === 0) {
                window.alert('文件大小不能为0');
                this.value = '';
                return false;
            }
            if (fileSize > this.MAX_SIZE) {
                window.alert('文件不能超过' + utils.parseSize(this.MAX_SIZE).html);
                return;
            }
            let fd = new FormData();
            fd.append('content', file);
            fd.append('type', 'avatar');
            let xhr = new XMLHttpRequest();
            // xhr.addEventListener('progress', this.onUploadProgress);
            xhr.addEventListener('load', this.onUploadComplete);
            xhr.addEventListener('error', this.onUploadFailed);
            // xhr.addEventListener('abort', this.onUploadCanceled);
            xhr.open('POST', constant.API.UPLOAD_FILE);
            xhr.send(fd);
        }
    },
    data () {
        return {

        };
    }
}
</script>