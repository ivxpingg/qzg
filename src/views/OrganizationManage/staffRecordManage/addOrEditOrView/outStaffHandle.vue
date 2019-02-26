<template>
    <Modal v-model="modalValue"
           class="outStaffHandle-container"
           :title="title"
           :width="1200"
           :footer-hide="isView"
           @on-visible-change="onVisibleChange">
        <Row>
            <i-col span="4">
                <Form ref="form_image"
                      :model="formData"
                      :label-width="60">
                    <FormItem>
                        <img :src="imgUrl" alt="头像" style="width: 100px; height: 100px;">
                    </FormItem>
                    <FormItem v-if="!isView" prop="">
                        <vWebUploader
                                v-if="modalValue"
                                ref="webUploader"
                                :multiple="false"
                                @on-uploadSuccess="onUploadSuccess"
                                fileType="head_portrait">
                            <Button type="primary" icon="ios-cloud-upload-outline">上传头像</Button>
                        </vWebUploader>
                    </FormItem>
                </Form>
            </i-col>
            <i-col span="20">
                <Form ref="form"
                      inline
                      class="form"
                      :model="formData"
                      :rules="rules"
                      :label-width="80">
                    <FormItem label="姓名:" prop="employeeName">
                        <Input v-model="formData.employeeName" placeholder="请输入姓名" :style="formInputStyle" />
                    </FormItem>
                    <FormItem label="性别:" prop="sex">
                        <Select v-model="formData.sex" :style="formInputStyle">
                            <Option v-for="item in dict_sex"
                                    :key="item.id"
                                    :value="item.value"
                                    :label="item.label"></Option>
                        </Select>
                    </FormItem>
                    <FormItem label="出生年月:">
                        <DatePicker :value="formData.birthday"
                                    :style="formInputStyle"
                                    type="month"
                                    @on-change="onChage_birthday"
                                    placeholder="选择时间" ></DatePicker>
                    </FormItem>
                    <FormItem label="年龄:">
                        <Input  placeholder="自动计算" readonly  :style="formInputStyle"/>
                    </FormItem>
                    <FormItem label="身份证:" prop="idNumber">
                        <Input v-model="formData.idNumber" placeholder="请输入身份证" :style="formInputStyle" />
                    </FormItem>
                    <FormItem label="联系电话:" prop="phone">
                        <Input v-model="formData.phone" placeholder="请输入联系电话" :style="formInputStyle" />
                    </FormItem>

                    <FormItem label="任职单位:">
                        <Select v-model="formData.sex" :style="formInputStyle">
                            <Option v-for="item in dict_sex"
                                    :key="item.id"
                                    :value="item.value"
                                    :label="item.label"></Option>
                        </Select>
                    </FormItem>
                    <FormItem label="职务:">
                        <Select v-model="formData.sex" :style="formInputStyle">
                            <Option v-for="item in dict_sex"
                                    :key="item.id"
                                    :value="item.value"
                                    :label="item.label"></Option>
                        </Select>
                    </FormItem>
                    <FormItem label="任职时间:">
                        <DatePicker :value="formData.onJobTime"
                                    :style="formInputStyle"
                                    type="month"
                                    @on-change="onChage_onJobTime"
                                    placeholder="选择时间"></DatePicker>
                    </FormItem>
                </Form>
            </i-col>
        </Row>

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
    import Config from '../../../../config';
    export default {
        name: 'outStaffHandle',
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
            employeeId: {
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
            imgUrl() {
                return this.headPortraitUrl || (this.formData.sex === 'man' ? '/images/user-man.png' : '/images/user-woman.png');
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
                    width: '340px'
                },
                // 是否保存中
                saveBtnLoading: false,
                // 初始值
                initFormData: {},
                headPortraitUrl: '',
                formData: {
                    employeeId: '',
                    employeeType: 'out-staff', // 员工类型-在编员工
                    headPortrait: '',
                    employeeName: '',  // 员工名称
                    sex: '',
                    birthday: '',
                    idNumber: '',
                    phone: '',
                    departmentId: '',    // 部门Id
                    jobId: '',       // 职务ID
                    onJobTime: '',   // 任职时间
                },
                rules: {
                    employeeName: [{ required: true, message: '姓名不能为空！', trigger: 'blur' }],
                    idNumber: [{ required: true, message: '身份证不能为空！', trigger: 'blur' },
                        { max: 18, message: '请输入正确身份证号码！', trigger: 'blur' }],
                    phone: [{ required: true, message: '电话号码不能为空！', trigger: 'blur' }],
                },

                // 字典
                dict_sex: [],
            };
        },
        watch: {
            employeeId: {
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
            this.getDicts(['sex']);
        },
        methods: {
            // 初始化表单数据
            resetFormData() {
                Object.assign(this.formData, this.initFormData);
            },
            onChage_birthday(value) { this.formData.birthday = value; },
            onChage_onJobTime(value) { this.formData.onJobTime = value; },
            // 头像上传成功
            onUploadSuccess(response, file, fileList) {
                if (response.code === 'SUCCESS') {
                    this.formData.headPortrait = response.data.fileId;
                    this.headPortraitUrl = Config[Config.env].filePath + response.data.url;
                }
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
    .outStaffHandle-container {
    }
</style>