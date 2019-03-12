<template>
    <Modal v-model="modalValue"
           title="申请"
           :width="800"
           @on-visible-change="onVisibleChange">
        <Form inline
              :model="formData"
              :label-width="80">
            <FormItem label="文件名称:">
                <Input v-model="formData.archiveTitle" readonly style="width: 260px;" />
            </FormItem>
            <FormItem label="文件来源:">
                <Input v-model="formData.archiveSourceLabel" readonly  style="width: 260px;"/>
            </FormItem>
            <FormItem label="申请人:">
                <Input v-model="formData.name" readonly  style="width: 260px;"/>
            </FormItem>
            <FormItem label="申请时间:">
                <Input v-model="formData.insTime" readonly  style="width: 260px;"/>
            </FormItem>
            <FormItem label="说明:">
                <Input v-model="formData.useFor" readonly type="textarea" :rows="3"  style="width: 610px;"/>
            </FormItem>
        </Form>
        <Divider></Divider>
        <Form ref="form"
              :model="submitForm"
              inline
              :rules="rules"
              :label-width="120">
            <template v-for="item in auditContentList">
                <FormItem :label="item.processStepName">
                    <Input :value="item.auditContent" readonly type="textarea" :rows="3"  style="width: 570px;"/>
                </FormItem>
                <FormItem label="审核人:" :label-width="350">
                    <div style="width: 100px;">{{item.userName}}</div>
                </FormItem>
                <FormItem label="审核时间:">
                    <div style="width: 120px;">
                        {{timeFormat(item.insTime, 'YYYY-MM-DD HH:mm:ss')}}
                    </div>
                </FormItem>
            </template>
            <FormItem v-if="formData.applyStatus === 'wait_audit'" label="审核意见:" prop="auditContent">
                <Input type="textarea" v-model="submitForm.auditContent" :rows="3"  style="width: 570px;"/>
            </FormItem>
        </Form>

        <div slot="footer">
            <Button v-if="userId === formData.auditor" type="primary" size="large" @click="onClick_auditPass">审核通过</Button>
            <Button v-if="userId === formData.auditor" type="error" size="large" @click="onClick_auditNoPass">审核不通过</Button>
        </div>

        <!--选择审核人员-->
        <vAuditPersonSelect ref="modal_auditPersonSelect"
                            :relationId="consultApplyId"
                            processType="archive" @modal-callback="modal_auditPersonSelect_callback"></vAuditPersonSelect>
    </Modal>
</template>

<script>
    import modalMixin from '../../../../../lib/mixin/modalMixin';
    import comMixin from '../../../../../lib/mixin/comMixin';
    import vAuditPersonSelect from '../../../../Common/auditPersonSelect/auditPersonSelect';
    export default {
        name: 'auditDocument',  // 审核档案申请查阅
        mixins: [modalMixin, comMixin],
        components: {vAuditPersonSelect},
        props: {
            consultApplyId: {
                type: String,
                default() {
                    return ''
                }
            }
        },
        computed: {
            userId() {
                return this.$store.state.user.userId;
            }
        },
        data() {
            return {
                // 申请详情
                formData: {
                    archiveTitle: '',
                    archiveSourceLabel: '',
                    auditor: '',
                    name: '',
                    insTime: '',
                    useFor: '',
                    lastStep: '',
                    applyStatus: ''
                },

                // 已审核的内容
                auditContentList: [],

                // 审核内容
                submitForm: {
                    relationId: '',
                    auditor: '',
                    auditResult: '',
                    auditContent: '',
                    processType: 'archive'
                },
                rules: {
                    auditContent: [{ required: true, message: '审核意见不能为空！', trigger: 'blur' }]
                }
            };
        },
        watch: {
            consultApplyId(val) {
                this.submitForm.relationId = val;
                if (val) {
                    this.getDataDetail();
                    this.getAuditContent();
                }
            }
        },
        methods: {
            getDataDetail() {
                this.$http({
                    method: 'get',
                    url: '/consultApply/detail',
                    params: {
                        consultApplyId: this.consultApplyId
                    }
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        Object.assign(this.formData, {
                            archiveTitle: '',
                            archiveSourceLabel: '',
                            auditor: '',
                            name: '',
                            insTime: '',
                            useFor: '',
                            lastStep: '',
                            applyStatus: ''
                        },res.data, {
                            insTime: this.timeFormat(res.data.insTime, 'YYYY-MM-DD HH:mm:ss')
                        })
                    }
                })
            },
            getAuditContent() {
                this.$http({
                    method: 'get',
                    url: '/auditRecord/getAuditRecordList',
                    params: {
                        relationId: this.consultApplyId
                    }
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.auditContentList = res.data || [];
                    }
                })
            },
            onClick_auditPass() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (this.formData.lastStep) {
                            this.modal_auditPersonSelect_callback('');
                        }
                        else {
                            this.$refs.modal_auditPersonSelect.modalValue = true;
                        }

                    }
                })

            },
            onClick_auditNoPass() {
                this.submitForm.auditor = '';
                this.submitForm.auditResult = 'not_pass';
                this.$Modal.confirm({
                    title: '审核',
                    content: '确定审核不通过?',
                    onOk: () => {
                        this.$http({
                            method: 'post',
                            url: '/auditRecord/audit',
                            data: JSON.stringify(this.submitForm)
                        }).then(res => {
                            if(res.code === 'SUCCESS') {
                                this.$Message.success('提交成功!');
                                this.modalValue = false;
                                this.$emit('modal-callback');
                            }
                        })
                    }
                })
            },

            modal_auditPersonSelect_callback(userId) {
                this.submitForm.auditor = userId;
                this.submitForm.auditResult = 'pass';
                this.$Modal.confirm({
                    title: '审核',
                    content: '确定审核通过?',
                    onOk: () => {
                        this.$http({
                            method: 'post',
                            url: '/auditRecord/audit',
                            data: JSON.stringify(this.submitForm)
                        }).then(res => {
                            if(res.code === 'SUCCESS') {
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
    .auditDocument-container {
    }
</style>