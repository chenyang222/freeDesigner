<template lang="jade">
input(@change="uploadImage", type="file", :accept="accept", hidden, :id="id")
</template>
<script>
import api from 'src/assets/js/api';
import utils from 'src/assets/js/utils';

export default {
    props: {
        maxsize: {
            default: 5 * 1024 * 100
        },
        type: {
            default: 'work'
        },
        subtype: {
            default: ''
        },
        id: {
            default: 'upload'
        }
    },
    ready () {
        this.MAX_SIZE = this.maxsize * 1024; // *KB
        this.FILE_NAME_NOT_CONTAINS = [';']; // 文件名不能包含的内容
    },
    computed: {
        accept() {
            let accept = '*';
            switch(this.type) {
                case 'work':
                    accept = 'image/png, image/jpeg, image/jpg, image/gif';
                break;
                case 'resource':
                    accept = '*';
                break;
            }
            return accept;
        }
    },
    methods: {
        onUploadComplete (e) {
            let resp = e.target.responseText;
            let ret = JSON.parse(resp);
            this.$dispatch('uploadComplete', {
                data: ret.data,
                fname: this.fname,
                subtype: this.subtype
            });
        },
        onUploadProgress(e) {
            this.$dispatch('uploadProgress', e);
        },
        uploadImage (e) {
            let files = e.target.files;
            let file = files[0];
            let fileName = file.name;
            let fileSize = file.size;
            this.fname = fileName;
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
            fd.append('type', this.type);
            let xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', this.onUploadProgress);
            xhr.addEventListener('load', this.onUploadComplete);
            xhr.addEventListener('error', this.onUploadFailed);
            // xhr.addEventListener('abort', this.onUploadCanceled);
            xhr.open('POST', constant.API.UPLOAD_FILE);
            xhr.send(fd);
            e.target.value = '';
        }
    },
    data () {
        return {
            fname: ''
        };
    }
}
</script>
