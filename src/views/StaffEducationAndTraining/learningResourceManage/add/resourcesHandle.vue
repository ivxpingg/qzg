<template>
    <Modal v-model="modalValue"
           class="resourcesHandle-container"
           :title="title"
           :width="850"
           :footer-hide="isView"
           @on-visible-change="onVisibleChange">
        <Form ref="form"
              inline
              class="form"
              :model="formData"
              :rules="rules"
              :label-width="80">
            <FormItem label="资源名称:" prop="resourceName">
                <Input v-model="formData.resourceName" placeholder="请输入资源名称" :style="formInputStyle" />
            </FormItem>
            <FormItem label="资源类型:" prop="resourceType">
                <Select v-model="formData.resourceType" :style="formInputStyle">
                    <Option v-for="item in dict_resourceType"
                            :key="item.id"
                            :value="item.value"
                            :label="item.label"></Option>
                </Select>
            </FormItem>
            <FormItem label="开始时间:" prop="startTime">
                <DatePicker :value="formData.startTime"
                            :style="formInputStyle"
                            type="date"
                            @on-change="onChage_startTime"
                            placeholder="选择时间" ></DatePicker>
            </FormItem>
            <FormItem label="结束时间:" prop="endTime">
                <DatePicker :value="formData.endTime"
                            :style="formInputStyle"
                            type="date"
                            @on-change="onChage_endTime"
                            placeholder="选择时间" ></DatePicker>
            </FormItem>
            <FormItem label="资源描述:" prop="description">
                <Input v-model="formData.description"
                       type="textarea"
                       :rows="3"
                       placeholder="请输入资源描述" style="width: 690px;" />
            </FormItem>
            <FormItem prop="fileIds">
                <div style="width: 690px;">
                    <vWebUploader
                            v-if="modalValue"
                            ref="webUploader"
                            multiple
                            :defaultFiles="formData.defaultFiles"
                            @on-removeFile="onRemoveFile"
                            @on-uploadSuccess="onUploadSuccess"
                            :fileType="fileType">
                        <Button type="primary" icon="ios-cloud-upload-outline">上传学习资源</Button>
                    </vWebUploader>
                </div>
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
        name: 'resourcesHandle',
        mixins: [modalMixin, comMixin],
        props: {
            /**
             * 类型
             */
            type: {
                validator (value) {
                    return (['add', 'edit', 'view'].indexOf(value) > -1);
                },
                default() {
                    return 'add'
                }
            },
            resourceId: {
                type: String,
                default: ''
            }
        },
        created() {
            // 获取表单初始值
            Object.assign(this.initFormData, this.formData);
        },
        computed: {
            title() {
                let title = {
                    add: '新增',
                    edit: '编辑',
                    view: '查看'
                };
                return title[this.type];
            },
            isView() {
                return this.type === 'view';
            }
        },
        data() {
            return {
                fileType: 'learning_resource',  // 附件文件类型
                formInputStyle: {
                    width: '300px'
                },
                // 是否保存中
                saveBtnLoading: false,
                // 初始值
                initFormData: {},
                formData: {
                    resourceId: '',
                    resourceName: '',  // 资源名称
                    resourceType: null,  // 资源类型
                    startTime: '',     //
                    endTime: '',
                    description: '',   // 资源描述
                    fileIds: [],
                    defaultFiles: []
                },
                rules: {
                    resourceName: [{ required: true, message: '资源名称不能为空！', trigger: 'blur' }],
                    resourceType: [{ required: true, message: '请选择资源类型！', trigger: 'blur' }],
                    startTime: [{ required: true, message: '开始时间不能为空！', trigger: 'blur' }],
                    endTime: [{ required: true, message: '结束时间不能为空！', trigger: 'blur' }],
                    description: [{ required: true, message: '资源描述不能为空！', trigger: 'blur' }],
                    fileIds: [{ required: true, type: 'array', message: '请上传资源！', trigger: 'blur' }],
                },

                // 字典
                dict_resourceType: []
            };
        },
        watch: {
            resourceId: {
                immediate: true,
                handler(val) {
                    if (val) {
                        this.formData.resourceId = val;
                        this.getData();
                    }
                    else {
                        this.resetFormData();
                    }
                }
            }
        },
        mounted() {
            this.getDicts(['resourceType']);
        },
        methods: {
            // 初始化表单数据
            resetFormData() {
                Object.assign(this.formData, this.initFormData);
            },
            onChage_startTime(value) {
                this.formData.startTime = value;
            },
            onChage_endTime(value) {
                this.formData.endTime = value;
            },
            // 移除文件
            onRemoveFile(file, fileList) {
                this.formData.fileIds = fileList.map(v => v.response.fileId);
            },
            // 文件上传成功
            onUploadSuccess(response, file, fileList) {
                this.formData.fileIds = fileList.map(v => {
                    if (v.fileId) {
                        return v.fileId;
                    }
                    else {
                        return v.response.fileId;
                    }
                });
            },
            getData() {
                this.$http({
                    method: 'get',
                    url: '/resource/query',
                    params: {
                        resourceId: this.resourceId
                    }
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        Object.assign(this.formData, res.data, {
                            startTime: this.timeFormat(res.data.startTime, 'YYYY-MM-DD'),
                            endTime: this.timeFormat(res.data.endTime, 'YYYY-MM-DD'),
                        });
                    }
                });

                this.getFilesList(this.resourceId, this.fileType).then(data => {
                    this.formData.defaultFiles = data;
                })

            },
            save() {
                if (this.type === 'add') {
                    this.addSubmit();
                }
                else {
                    this.updateSubmit();
                }
            },
            addSubmit() {
                this.saveBtnLoading = true;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$http({
                            method: 'post',
                            url: '/resource/add',
                            data: JSON.stringify(this.formData)
                        }).then(res => {
                            this.saveBtnLoading = false;
                            if(res.code === 'SUCCESS') {
                                this.$Message.success({
                                    content: '添加成功！'
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
            },
            updateSubmit() {
                this.saveBtnLoading = true;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$http({
                            method: 'post',
                            url: '/resource/update',
                            data: JSON.stringify(this.formData)
                        }).then(res => {
                            this.saveBtnLoading = false;
                            if(res.code === 'SUCCESS') {
                                this.$Message.success({
                                    content: '修改成功！'
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
    .resourcesHandle-container {
    }
</style>