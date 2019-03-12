<template>
    <Modal v-model="modalValue"
           title="选择审核人员"
           :width="400"
           @on-visible-change="onVisibleChange">
        <Form ref="form"
              :model="formData"
              :rules="rules"
              :label-width="80">
            <FormItem label="选择人员:" prop="selectedList">
                <Select v-model="formData.selectedList">
                    <Option v-for="item in userList"
                            :value="item.userId"
                            :key="item.userId">{{ item.name }}</Option>
                </Select>
            </FormItem>
        </Form>

        <div slot="footer">
            <Button type="primary"
                    size="large"
                    @click="save">确定</Button>
        </div>
    </Modal>
</template>

<script>
    import modalMixin from '../../../lib/mixin/modalMixin';
    export default {
        name: 'auditPersonSelect',  // 选择审核人员
        mixins: [modalMixin],
        props: {
            /**
             *  关联ID【传consultApplyId,leaveApplyId】
             */
            relationId: {
                type: String,
                default: ''
            },
            /**
             * 流程类型【档案查阅申请:archive，请假/公出申请：leave】
             */
            processType: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                userList: [],
                formData: {
                    selectedList: ''
                },
                rules: {
                    selectedList: [{ required: true,  message: '请选择用户！', trigger: 'blur' }],
                }

            };
        },
        watch: {
            relationId: {
                immediate: true,
                handler(val) {
                    if (val) {
                        this.getData();
                    }
                }
            },
            processType: {
                immediate: true,
                handler() {
                    if (this.relationId === '') {
                        this.getData();
                    }
                }
            }
        },
        methods: {
            getData() {
                this.$http({
                    method: 'get',
                    url: '/auditRecord/auditorList',
                    params: {
                        relationId: this.relationId,
                        processType: this.processType
                    }
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.userList = res.data || [];
                    }
                })
            },

            save() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.modalValue = false;
                        this.$emit('modal-callback', this.formData.selectedList);
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .auditPersonSelect-container {
    }
</style>