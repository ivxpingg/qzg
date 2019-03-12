<template>
    <Modal v-model="modalValue"
           title="申请"
           :width="400"
           @on-visible-change="onVisibleChange">
        <Form ref="form"
              :model="formData"
              :rules="rules"
              :label-width="80">
            <FormItem label="文件名称:">
                <Input :value="archiveTitle" readonly />
            </FormItem>
            <FormItem label="文件来源:">
                <Input  :value="archiveSourceLabel" readonly />
            </FormItem>
            <FormItem label="申请人:">
                <Input :value="userName" readonly />
            </FormItem>
            <FormItem label="说明:" prop="useFor">
                <Input v-model="formData.useFor" type="textarea" :rows="5" placeholder="请输入" />
            </FormItem>
        </Form>

        <div slot="footer">
            <Button type="primary"
                    size="large"
                    @click="save">申请</Button>
        </div>

        <!--选择审核人员-->
        <vAuditPersonSelect ref="modal_auditPersonSelect"
                            relationId=""
                            processType="archive" @modal-callback="modal_auditPersonSelect_callback"></vAuditPersonSelect>
    </Modal>
</template>

<script>
    import modalMixin from '../../../../lib/mixin/modalMixin';
    import vAuditPersonSelect from '../../../Common/auditPersonSelect/auditPersonSelect';
    export default {
        name: 'applyDocument',  // 公文申请
        mixins: [modalMixin],
        components: {vAuditPersonSelect},
        props: {
            archiveId: {
                type: String,
                default() {
                    return ''
                }
            },
            archiveTitle: {
                type: String,
                default() {
                    return ''
                }
            },
            archiveSourceLabel: {
                type: String,
            }
        },
        computed: {
            userName() {
                return this.$store.state.user.userName;
            }
        },
        data() {
            return {
                // 是否保存中
                saveBtnLoading: false,
                // 初始值
                initFormData: {},
                formData: {
                    archiveId: '',
                    auditor: '',
                    useFor: ''
                },
                rules: {
                    useFor: [{ required: true, message: '说明不能为空！', trigger: 'blur' }],
                },
            };
        },
        watch: {
            archiveId(val) {
                this.formData.archiveId = val;
            }
        },
        methods: {
            save() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$refs.modal_auditPersonSelect.modalValue = true;
                    }
                });

            },
            modal_auditPersonSelect_callback(userId) {
                this.formData.auditor = userId;

                this.$Modal.confirm({
                    title: '提交审核',
                    content: '确定要提交申请?',
                    onOk: () => {
                        this.$http({
                            method: 'post',
                            url: '/consultApply/consultApply',
                            data: JSON.stringify(this.formData)
                        }).then(res => {
                            if (res.code === 'SUCCESS') {
                                this.$Message.success('提交成功!');
                                this.modalValue = false;
                                this.$emit('modal-callback');
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .applyDocument-container {
    }
</style>