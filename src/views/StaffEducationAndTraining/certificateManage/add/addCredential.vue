<template>
    <Modal v-model="modalValue"
           class="addCredential-container"
           title="新建证书"
           :width="400"
           @on-visible-change="onVisibleChange">
        <Form ref="form"
              class="form"
              :model="formData"
              :rules="rules"
              :label-width="80">
            <FormItem label="毕业人员:" prop="userId">
                <Select v-model="formData.userId">
                    <Option v-for="item in userList"
                            :key="item.userId"
                            :value="item.userId"
                            :label="item.userName"></Option>
                </Select>
            </FormItem>
            <FormItem label="毕业课程:" prop="courseId">
                <Select v-model="formData.courseId">
                    <Option v-for="item in courseList"
                            :key="item.courseId"
                            :value="item.courseId"
                            :label="item.courseName"></Option>
                </Select>
            </FormItem>
            <FormItem label="毕业类型:" prop="certificateType">
                <Select v-model="formData.certificateType">
                    <Option v-for="item in dict_certificateType"
                            :key="item.id"
                            :value="item.value"
                            :label="item.label"></Option>
                </Select>
            </FormItem>
            <!--<FormItem label="证书名称:" prop="courseName">-->
                <!--<Input v-model="formData.courseName" placeholder="请输入证书名称" />-->
            <!--</FormItem>-->
            <FormItem label="发放人:" prop="issuer">
                <Input v-model="formData.issuer" placeholder="请输入发放人" />
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
        name: 'addCredential',  // 新建证书
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

                // 字典
                dict_certificateType: [],
                userList: [],
                courseList: []
            };
        },
        mounted() {
            this.getDicts(['certificateType']);
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
    .addCredential-container {
    }
</style>