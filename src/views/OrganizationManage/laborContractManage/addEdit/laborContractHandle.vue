<template>
    <Modal v-model="modalValue"
           class="laborContractHandle-container"
           :title="title"
           :width="850"
           @on-visible-change="onVisibleChange">
        <Form ref="form"
              inline
              class="form"
              :model="formData"
              :rules="rules"
              :label-width="80">
            <FormItem label="签订人员:" prop="employeeId">
                <Input v-model="formData.employeeId" placeholder="" :style="formInputStyle" />
            </FormItem>
            <FormItem label="任职岗位:">
                <Input  placeholder="" :style="formInputStyle" />
            </FormItem>
            <FormItem label="签订时间:">
                <DatePicker :value="formData.signDate"
                            :style="formInputStyle"
                            type="date"
                            @on-change="onChage_signDate"
                            placeholder="选择时间" ></DatePicker>
            </FormItem>
            <FormItem label="到期时间:">
                <DatePicker :value="formData.expirationDate"
                            :style="formInputStyle"
                            type="date"
                            @on-change="onChage_expirationDate"
                            placeholder="选择时间" ></DatePicker>
            </FormItem>
            <FormItem label="">
                <div style="width: 700px;">
                    <Checkbox v-model="formData.remind"
                              true-value="1"
                              false-value="0">合同到期提醒</Checkbox>
                </div>
            </FormItem>
            <FormItem label="">
                <vWebUploader
                        v-if="modalValue"
                        ref="webUploader"
                        multiple
                        @on-removeFile="onRemoveFile"
                        @on-uploadSuccess="onUploadSuccess"
                        fileType="contract">
                    <Button type="primary" icon="ios-cloud-upload-outline">上传合同附件</Button>
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
        name: 'laborContractHandle', // 合同添加或续约
        mixins: [modalMixin, comMixin],
        props: {
            /**
             * 类型
             */
            type: {
                validator (value) {
                    return (['add', 'edit'].indexOf(value) > -1);
                },
                default() {
                    return 'add'
                }
            },
            laborContractId: {
                type: String,
                default: ''
            },
            employeeId: {
                type: String,
                default: ''
            },
            employeeName: {
                type: String,
                default: ''
            }
        },
        computed: {
            title() {
                let title = {
                    add: '新增',
                    edit: '续约'
                };
                return title[this.type];
            }
        },
        created() {
            Object.assign(this.initFormData, this.formData);
        },
        data() {
            return {
                formInputStyle: {
                    width: '300px'
                },
                // 是否保存中
                saveBtnLoading: false,
                // 初始值
                initFormData: {},
                formData: {
                    laborContractId: '',
                    employeeId: '',
                    employeeName: '',
                    departmentId: '',
                    signDate: '',
                    expirationDate: '',
                    remind: '0',
                    fileIds: []
                },
                rules: {
                    signDate: [{ required: true, message: '签订时间不能为空！', trigger: 'blur' }],
                    expirationDate: [{ required: true, message: '到期时间不能为空！', trigger: 'blur' }],
                },
            };
        },
        watch: {
            employeeId(val) {
                this.formData.employeeId = val;
            },
            employeeName(val) {
                this.formData.employeeName = val;
            }
        },
        methods: {
            onChage_signDate(value) { this.formData.signDate = value; },
            onChage_expirationDate(value) { this.formData.expirationDate = value; },
            // 合同移除
            onRemoveFile(file, fileList) {
                this.formData.fileIds = fileList.map(v => v.response.fileId);
            },
            // 合同上传成功
            onUploadSuccess(response, file, fileList) {
                if (response.code === 'SUCCESS') {
                    this.formData.fileIds = fileList.map(v => v.response.fileId);
                }
            },
            save() {
                this.saveBtnLoading = true;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (this.type === 'add') {
                            this.addSubmit();
                        }
                        else {
                            this.editSubmit();
                        }
                    }
                    else{
                        this.saveBtnLoading = false;
                    }
                })

            },
            addSubmit() {
                this.$http({
                    method: 'post',
                    url: '/laborContract/add',
                    data: JSON.stringify(this.formData)
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.$Message.success({
                            content: '添加合同成功！'
                        });
                        this.$emit('modal-callback');
                        this.saveBtnLoading = false;
                        this.modalValue = false;
                        // 表单初始化
                    }
                }).catch(e => {
                    this.saveBtnLoading = false;
                })
            },
            editSubmit() {
                this.$http({
                    method: 'post',
                    url: '/laborContract/add',
                    data: JSON.stringify(this.formData)
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.$Message.success({
                            content: '续约成功！'
                        });
                        this.$emit('modal-callback');
                        this.saveBtnLoading = false;
                        this.modalValue = false;
                        // 表单初始化
                    }
                }).catch(e => {
                    this.saveBtnLoading = false;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .laborContractHandle-container {
    }
</style>