<template>
    <div class="uploader-container">
        <div class="btns">
            <div ref="btn"><slot></slot></div>
        </div>
        <!--用来存放文件信息-->
        <vUploadList v-if="!hiddenList" ref="vUploadList" :files="vUploadList_files" @removeFile="removeFile"></vUploadList>
    </div>
</template>

<script>
    import Config from '../../config';
    import vUploadList from './uploadList';
    export default {
        name: 'vue-webuploader',
        components: {vUploadList},
        props: {
            /**
             * 默认值
             */
            defaultFiles: {
                type: Array,
                default() {
                    return []
                }
            },
            multiple: {
                type: Boolean,
                default: true
            },
            server: {
                type: String,
                default: ''
            },
            /**
             * 指定接受哪些类型的文件。 由于目前还有ext转mimeType表
             */
            accept: {
                type: Array,
                default() {
                    return null;
                }
            },
            formData: {
                type: Object,
                default() {
                    return {};
                }
            },
            fileType: {
                type: String,
                default: ''
            },
            hiddenList: {
                type: Boolean,
                default() {
                    return false
                }
            },
            // 是否手动初始化上传组件，组件如果在隐藏元素下，初始化会有问题，需要调用手动初始化
            handlerInit: {
                type: Boolean,
                default() {
                    return false;
                }
            }

        },
        computed: {
            _serverUrl() {
                return this.server || this.action + this.fileType;
            },
            vUploadList_files() {
                return this.files.concat(this.defaultFileList);
            }
        },
        data() {
            return {
                uploader: null,
                // 上传地址
                action: Config[Config.env].origin + Config[Config.env].ajaxUrl + '/file/upload/',
                swf: Config[Config.env].origin + '/webuploader/Uploader.swf',
                // 文件列表队列
                files: [],
                fileList: [],

                defaultFileList: []
            };
        },
        watch: {
            defaultFiles: {
                immediate: true,
                handler(val) {
                    this.defaultFileList = val.map(item => {
                        item.percentage = 100;
                        item.name = item.fileName + '.' + item.fileFormat;
                        return item;
                    });
                }
            }
        },
        mounted() {
            this.initWebuploader();
            this.initEvent();
        },
        methods: {
            initWebuploader() {

                if ( !WebUploader.Uploader.support() ) {
                    alert( 'Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
                    throw new Error( 'WebUploader does not support the browser you are using.' );
                }
                this.uploader = WebUploader.create({
                    swf: this.swf,
                    server: this._serverUrl,
                    pick: {
                        id: this.$refs.btn,
                        multiple: this.multiple
                    },
                    accept: this.accept,
                    thumb: {
                        width: 110,
                        height: 110,
                        // 图片质量，只有type为`image/jpeg`的时候才有效。
                        quality: 70,
                        // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                        allowMagnify: true,
                        // 是否允许裁剪。
                        crop: true,
                        // 为空的话则保留原有图片格式。
                        // 否则强制转换成指定的类型。
                        type: 'image/jpeg'
                    },
                    // 配置压缩的图片的选项。如果此选项为false, 则图片在上传前不进行压缩。
                    compress: false,
                    // {Boolean} [可选] [默认值：false] 设置为 true 后，不需要手动调用上传，有文件选择即开始上传。
                    auto: true,
                    // 开起分片上传。
                    chunked: false,
                    // {Object} [可选] [默认值：{}] 文件上传请求的参数表，每次发送都会发送此对象中的参数。
                    formData: this.formData
                });
            },
            initEvent() {
                // 当文件被加入队列之前触发，此事件的handler返回值为false，则此文件不会被添加进入队列。
                this.uploader.on('beforeFileQueued', this.beforeFileQueued);
                // 当文件被加入队列以后触发。
                this.uploader.on('fileQueued', this.fileQueued);
                // 当一批文件添加进队列以后触发。
                this.uploader.on('filesQueued', this.filesQueued);
                // 当文件被移除队列后触发。
                this.uploader.on('fileDequeued', this.fileDequeued);
                // 当 uploader 被重置的时候触发。
                this.uploader.on('reset', this.reset);
                // 当开始上传流程时触发。
                this.uploader.on('startUpload', this.startUpload);
                // 当开始上传流程暂停时触发
                this.uploader.on('stopUpload', this.stopUpload);
                // 当所有文件上传结束时触发。
                this.uploader.on('uploadFinished', this.uploadFinished);
                // 某个文件开始上传前触发，一个文件只会触发一次。
                this.uploader.on('uploadStart', this.uploadStart);
                // 上传过程中触发，携带上传进度。
                this.uploader.on('uploadProgress', this.uploadProgress);
                // 当文件上传出错时触发。
                this.uploader.on('uploadError', this.uploadError);
                // 当文件上传成功时触发。
                this.uploader.on('uploadSuccess', this.uploadSuccess);
                // 不管成功或者失败，文件上传完成时触发。
                this.uploader.on('uploadComplete', this.uploadComplete);
                //
            },
            beforeFileQueued(file) {
                return true;
            },
            fileQueued(file) {
                // 当文件被加入队列以后触发
                file.percentage = 0;

               // this.$set(this.files,this.files.length, file);
                if (this.multiple) {
                    this.$set(this.files, this.files.length, file);
                }
                else {
                    this.reset();
                    this.$set(this.files, this.files.length, file);
                }
            },
            filesQueued(files) {
                // console.dir('当一批文件添加进队列以后触发');
                // console.dir(files);
            },
            fileDequeued(file) {
                // 当文件被移除队列后触发

                if (this.files.indexOf(file) > -1) {
                    this.files.splice(this.files.indexOf(file), 1);
                    this.fileList.splice(this.fileList.indexOf(file), 1);
                    this.$emit('on-removeFile', file, this.fileList.concat(this.defaultFileList));
                }
            },
            reset(files) {
                this.files = [];
                this.fileList = [];
            },
            startUpload() {

            },
            stopUpload() {},
            uploadFinished() {
                // 当所有文件上传结束时触发。
            },
            uploadStart(file) {
                //开始上传 一个文件只会触发一次
            },
            uploadProgress(file, percentage) {
                // 上传过程中触发，携带上传进度。
                if (this.files.indexOf(file) > -1) {
                    this.files[this.files.indexOf(file)].percentage = Number.parseInt(percentage * 100);
                }
                this.$refs.vUploadList.$forceUpdate();
                this.$emit('on-uploadProgress', file,  Number.parseInt(percentage * 100));
            },
            uploadError(file, response) {
                // 当文件上传出错时触发
                if (response.code !== 'SUCCESS') {
                    this.$Message.error(`文件<${file.name}>上传失败！`);
                    this.removeFile(file);
                    this.$emit('on-uploadError', response, file, this.fileList);
                }
            },
            uploadSuccess(file, response) {
                // 当文件上传成功时触发

                if (response.code === 'SUCCESS') {
                    file.response = response.data;
                    this.fileList.push(file);
                    this.$emit('on-uploadSuccess', response, file, this.fileList.concat(this.defaultFileList));
                }
                else {

                }

            },
            uploadComplete(file) {
                // 不管成功或者失败，文件上传完成时触发。
            },

            // 移除文件
            removeFile(file) {
                if(file.id) {
                    this.uploader.removeFile(file.id, true);
                }
                else {
                    this.defaultFileList = this.defaultFileList.filter(item => item.fileId !== file.fileId);
                }
            }
        }
    }
</script>

<style lang="scss">
    .uploader-container {
        .webuploader-container {
            width: 99px;
            height: 33px;
            position: relative;
        }
        .webuploader-element-invisible {
            position: absolute !important;
            clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
            clip: rect(1px,1px,1px,1px);
        }
        .webuploader-pick {
            position: relative;
            display: inline-block;
        }

        /*.webuploader-pick {*/
            /*position: relative;*/
            /*display: inline-block;*/
            /*cursor: pointer;*/
            /*background: #00b7ee;*/
            /*padding: 10px 15px;*/
            /*color: #fff;*/
            /*text-align: center;*/
            /*border-radius: 3px;*/
            /*overflow: hidden;*/
        /*}*/
        /*.webuploader-pick-hover {*/
            /*background: #00a2d4;*/
        /*}*/

        /*.webuploader-pick-disable {*/
            /*opacity: 0.6;*/
            /*pointer-events:none;*/
        /*}*/
    }
</style>