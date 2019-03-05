<template>
    <Modal v-model="modalValue"
           class="notificationCourse-container"
           title="通知"
           :width="400"
           @on-visible-change="onVisibleChange">
        <Form ref="form"
              class="form"
              :model="formData"
              :rules="rules"
              :label-width="80">
            <FormItem label="培训名称:">
                <Input v-model="formData.courseName" readonly />
            </FormItem>
            <!--<FormItem label="实施时间:" prop="startTime">-->
                <!--<DatePicker :value="formData.startTime"-->
                            <!--:style="formInputStyle"-->
                            <!--type="date"-->
                            <!--@on-change="onChage_startTime"-->
                            <!--placeholder="选择时间" ></DatePicker>-->
            <!--</FormItem>-->
            <FormItem label="通知内容:" prop="noticeContent">
                <Input v-model="formData.noticeContent"
                       type="textarea"
                       :rows="3"
                       placeholder="请输入通知内容" />
            </FormItem>
            <FormItem >
                <vWebUploader
                        v-if="modalValue"
                        ref="webUploader"
                        multiple
                        @on-removeFile="onRemoveFile"
                        @on-uploadSuccess="onUploadSuccess"
                        fileType="notification_file">
                    <Button type="primary" icon="ios-cloud-upload-outline">上传附件</Button>
                </vWebUploader>
            </FormItem>
        </Form>

        <div slot="footer">
            <Button type="primary"
                    size="large"
                    :loading="saveBtnLoading"
                    @click="save">保存</Button>
        </div>
    </Modal>
</template>

<script>
    import modalMixin from '../../../../lib/mixin/modalMixin';
    import comMixin from '../../../../lib/mixin/comMixin';
    export default {
        name: 'notificationCourse',  // 课程通知
        mixins: [modalMixin, comMixin],
        props: {
            courseId: {
                type: String,
                default: ''
            },
            courseName: {
                type: String,
                default: ''
            }
        },
        created() {
            // 获取表单初始值
            Object.assign(this.initFormData, this.formData);
        },
        data() {
            return {
                // 是否保存中
                saveBtnLoading: false,
                // 初始值
                initFormData: {},
                formData: {
                    courseId: '',
                    courseName: '',
                    noticeContent: '',
                    fileIds: []         // 附件
                },
                rules: {
                    noticeContent: [{ required: true, message: '通知内容不能为空！', trigger: 'blur' }]
                },
            };
        },
        watch: {
            courseId: {
                immediate: true,
                handler(val) {
                    if (val) {
                        this.formData.courseId = val;
                        this.getData();
                    }
                    else {
                        this.resetFormData();
                    }
                }
            },
            courseName: {
                immediate: true,
                handler(val) {
                    this.formData.courseName = val;
                }
            }
        },
        methods: {
            // 初始化表单数据
            resetFormData() {
                Object.assign(this.formData, this.initFormData);
            },

            // 移除文件
            onRemoveFile(file, fileList) {
                this.formData.fileIds = fileList.map(v => v.response.fileId);
            },
            // 文件上传成功
            onUploadSuccess(response, file, fileList) {
                if (response.code === 'SUCCESS') {
                    this.formData.fileIds = fileList.map(v => v.response.fileId);
                }
            },
            save() {
                this.saveBtnLoading = true;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$http({
                            method: 'post',
                            url: '/course/notice',
                            data: JSON.stringify(this.formData)
                        }).then(res => {
                            this.saveBtnLoading = false;
                            if(res.code === 'SUCCESS') {
                                this.$Message.success({
                                    content: '发送通知成功！'
                                });
                                this.$emit('modal-callback');
                                this.modalValue = false;
                                // 表单初始化
                                this.resetFormData();
                            }
                        }).catch(e => {
                            this.saveBtnLoading = false;
                        })
                    }
                    else{
                        this.saveBtnLoading = false;
                    }
                })

            }
        }
    }
</script>

<style lang="scss" scoped>
    .notificationCourse-container {
    }
</style>