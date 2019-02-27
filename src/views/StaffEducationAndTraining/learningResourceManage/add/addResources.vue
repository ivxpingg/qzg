<template>
    <Modal v-model="modalValue"
           class="addResources-container"
           title="新建资源"
           :width="800"
           @on-visible-change="onVisibleChange">
        <Form ref="form"
              class="form"
              :model="formData"
              :rules="rules"
              :label-width="80">
            
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
        name: 'addResources',
        mixins: [modalMixin, comMixin],
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
                    userId: '',
                    courseId: '',
                    certificateType: '',
                    issuer: ''   // 发放人
                },
                rules: {
                    userId: [{ required: true, message: '毕业人员不能为空！', trigger: 'blur' }],
                    courseId: [{ required: true, message: '毕业课程不能为空！', trigger: 'blur' }],
                    certificateType: [{ required: true, message: '毕业类型不能为空！', trigger: 'blur' }],
                    issuer: [{ required: true, message: '发放人不能为空！', trigger: 'blur' }],
                },
            };
        },
        methods: {
            // 初始化表单数据
            resetFormData() {
                Object.assign(this.formData, this.initFormData);
            },
            save() {
                this.saveBtnLoading = true;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$http({
                            method: 'post',
                            url: '/',
                            data: JSON.stringify(this.formData)
                        }).then(res => {
                            if(res.code === 'SUCCESS') {
                                this.$Message.success({
                                    content: '添加成功！'
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
    .addResources-container {
    }
</style>