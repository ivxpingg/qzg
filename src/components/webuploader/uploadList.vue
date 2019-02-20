<template>
    <ul class="ivu-upload-list">
        <li class="ivu-upload-list-file" v-for="file in files" :key="file.id">
            <span><Icon :type="format(file)"></Icon>{{file.name}}</span>
            <Icon class="ivu-upload-list-remove" type="ios-close" v-show="file.percentage === 100" @click.native="removeFile(file)"></Icon>
            <transition name="fade">
                <Progress v-if="file.percentage !== 100"
                          :percent="parsePercentage(file.percentage)"
                          :status="file.percentage > 97 ? 'success' : 'normal'" :stroke-width="2" />
            </transition>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'uploadList',
        props: {
            files: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {};
        },
        methods: {
            parsePercentage (val) {
                return parseInt(val, 10);
            },
            removeFile(file) {
                this.$emit('removeFile', file);
            },
            format (file) {
                const format = file.name.split('.').pop().toLocaleLowerCase() || '';
                let type = 'ios-document-outline';

                if (['gif','jpg','jpeg','png','bmp','webp'].indexOf(format) > -1) {
                    type = 'ios-image';
                }
                if (['mp4','m3u8','rmvb','avi','swf','3gp','mkv','flv'].indexOf(format) > -1) {
                    type = 'ios-film';
                }
                if (['mp3','wav','wma','ogg','aac','flac'].indexOf(format) > -1) {
                    type = 'ios-musical-notes';
                }
                if (['doc','txt','docx','pages','epub','pdf'].indexOf(format) > -1) {
                    type = 'md-document';
                }
                if (['numbers','csv','xls','xlsx'].indexOf(format) > -1) {
                    type = 'ios-stats';
                }
                if (['keynote','ppt','pptx'].indexOf(format) > -1) {
                    type = 'ios-videocam';
                }

                return type;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .ivu-upload-list {
        .ivu-upload-list-file {
            line-height: 32px;
        }
    }
</style>