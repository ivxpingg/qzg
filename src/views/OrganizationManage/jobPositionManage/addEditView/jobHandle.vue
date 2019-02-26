<template>
    <Modal v-model="modalValue"
           class="jobHandle-container"
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
            <FormItem label="岗位名称:" prop="employeeName">
                <Input v-model="formData.employeeName" placeholder="请输入岗位名称" :style="formInputStyle" />
            </FormItem>
            <FormItem label="归属单位:">
                <Select v-model="formData.sex" :style="formInputStyle">
                    <Option v-for="item in dict_sex"
                            :key="item.id"
                            :value="item.value"
                            :label="item.label"></Option>
                </Select>
            </FormItem>
            <FormItem label="职级:">
                <Input  placeholder="自动载入" :style="formInputStyle" />
            </FormItem>
            <FormItem label="工资职级:">
                <Input  placeholder="自动载入" :style="formInputStyle" />
            </FormItem>
            <FormItem label="岗位简介:" prop="employeeName">
                <Input v-model="formData.employeeName"
                       type="textarea"
                       :rows="3"
                       placeholder="请输入岗位简介"
                       :style="formInputStyle" />
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
        name: 'jobHandle',  // 职务新建、编辑、查看
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
            jobId: {
                type: String,
                default: ''
            }
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
                    jobId: '',
                    dutyName: '',
                    departmentId: '',
                    jobLevel: '',
                    wageLevel: ''
                },
                rules: {},
            };
        },
        watch: {
            jobId: {
                immediate: true,
                handler(val) {
                    if (val) {
                        this.formData.employeeId = val;
                        this.getData();
                    }
                    else {
                        this.resetFormData();
                    }
                }
            }
        },
        mounted() {

        },
        methods: {
            // 初始化表单数据
            resetFormData() {
                Object.assign(this.formData, this.initFormData);
            },
            getData() {
                this.$http({
                    method: 'get',
                    url: '/',
                    params: {
                        employeeId: this.employeeId
                    }
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.$Message.success({
                            content: '添加部门成功！'
                        });
                        this.$emit('modal-callback');
                        this.saveBtnLoading = false;
                        this.modalValue = false;
                        // 表单初始化
                        this.resetFormData();
                    }
                }).catch(e => {
                    this.saveBtnLoading = false;
                })
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
                    url: '/',
                    data: JSON.stringify(this.formData)
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.$Message.success({
                            content: '添加员工成功！'
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
                    url: '/',
                    data: JSON.stringify(this.formData)
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.$Message.success({
                            content: '更新员工成功！'
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
    .jobHandle-container {
    }
</style>