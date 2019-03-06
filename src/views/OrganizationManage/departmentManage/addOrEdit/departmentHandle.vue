<template>
    <Modal v-model="modalValue"
           :title="title"
           @on-visible-change="onVisibleChange">
        <Form ref="form"
              :model="formData"
              :rules="rules"
              :label-width="80">
            <FormItem label="单位名称:" prop="unitName">
                <Input v-model="formData.unitName" placeholder="请输入单位名称" />
            </FormItem>
            <FormItem label="部门名称:" prop="departmentName">
                <Input v-model="formData.departmentName" placeholder="请输入部门名称" />
            </FormItem>
            <FormItem label="部门简介:" prop="intro">
                <Input v-model="formData.intro" type="textarea" :rows="5" placeholder="请输入" />
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
    export default {
        name: 'addDepartment',
        mixins: [modalMixin],
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
            // 部门Id
            departmentId: {
                type: String,
                default: ''
            }
        },
        computed: {
            title() {
                return this.type === 'add' ? '新增部门' : '编辑部门';
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
                    departmentId: '',
                    unitName: '',
                    departmentName: '',
                    intro: '',
                },
                rules: {
                    unitName: [{ required: true, message: '单位名称不能为空！', trigger: 'blur' }],
                    departmentName: [{ required: true, message: '部门名称不能为空！', trigger: 'blur' }],
                    intro: [{ required: true, message: '部门简介不能为空！', trigger: 'blur' }],
                },

            };
        },
        watch: {
            departmentId(val) {
                this.resetFormData();
                this.formData.departmentId = val;
                if (this.type === 'edit' && val) {
                    this.getData();
                }
            }
        },
        methods: {
            // 初始化表单数据
            resetFormData() {
                Object.assign(this.formData, this.initFormData);
            },
            /**
             * 获取单位详情
             */
            getData() {
                this.$http({
                    method: 'get',
                    url: '/department/query',
                    params: {
                        departmentId: this.departmentId
                    }
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        Object.assign(this.formData, res.data);
                    }
                }).catch(e => {
                })
            },
            save() {
                if (this.type === 'add') {
                    this.addSubmit();
                }
                else {
                    this.editSubmit();
                }
            },
            addSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.saveBtnLoading = true;
                        this.$http({
                            method: 'post',
                            url: '/department/add',
                            data: JSON.stringify(this.formData)
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
                    } else {

                    }
                })
            },
            editSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.saveBtnLoading = true;
                        this.$http({
                            method: 'post',
                            url: '/department/update',
                            data: JSON.stringify(this.formData)
                        }).then(res => {
                            this.saveBtnLoading = false;
                            if(res.code === 'SUCCESS') {
                                this.$Message.success({
                                    content: '编辑部门成功！'
                                });
                                this.$emit('modal-callback');
                                this.modalValue = false;
                                // 表单初始化
                                this.resetFormData();
                            }
                        }).catch(e => {
                            this.saveBtnLoading = false;
                        })
                    } else {

                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>