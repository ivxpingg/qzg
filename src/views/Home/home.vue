<template>
    <div class="home-container" ref="home">
        <vUploader @on-uploadSuccess="onUploadSuccess" @on-removeFile="onRemoveFile" >

            <Button type="primary" icon="ios-cloud-upload-outline">上传文件</Button>
        </vUploader>
    </div>
</template>

<script>
    import vUploader from '../../components/webuploader/webuploader';
    export default {
        name: 'mhome',
        components: {vUploader},
        data() {
            return { }
        },
        mounted () {



        },
        methods: {

            onUploadSuccess(response, file, fileList) {

                console.dir(fileList);
            },
            onRemoveFile(file, fileList) {
                console.dir(fileList);

            }
        }
    }
</script>

<style lang="scss">

</style>