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
            <FormItem label="岗位名称:" prop="dutyName">
                <Input v-model="formData.dutyName" placeholder="请输入岗位名称" :style="formInputStyle" />
            </FormItem>
<!--            <FormItem label="归属单位:" prop="departmentId">-->
<!--                <Select v-model="formData.departmentId" :style="formInputStyle">-->
<!--                    <Option v-for="item in departmentList"-->
<!--                            :key="item.departmentId"-->
<!--                            :value="item.departmentId"-->
<!--                            :label="item.unitName + '-' + item.departmentName"></Option>-->
<!--                </Select>-->
<!--            </FormItem>-->
            <FormItem label="职级:" prop="jobLevel">
                <Select v-model="formData.jobLevel" :style="formInputStyle">
                    <Option v-for="item in dict_jobLevel"
                            :key="item.id"
                            :value="item.value"
                            :label="item.label"></Option>
                </Select>
            </FormItem>
<!--            <FormItem label="劳务派遣:">-->
<!--                <Select v-model="formData.labor" :style="formInputStyle">-->
<!--                    <Option v-for="item in dict_labor"-->
<!--                            :key="item.id"-->
<!--                            :value="item.value"-->
<!--                            :label="item.label"></Option>-->
<!--                </Select>-->
<!--            </FormItem>-->
            <FormItem label="工资职级:" prop="wageLevel">
                <Select v-model="formData.wageLevels" multiple :style="formInputStyle">
                    <Option v-for="item in dict_wageLevel"
                            :key="item.id"
                            :value="item.value"
                            :label="item.label"></Option>
                </Select>
            </FormItem>
            <FormItem label="岗位简介:" prop="intro">
                <Input v-model="formData.intro"
                       type="textarea"
                       :rows="3"
                       placeholder="请输入岗位简介"
                       style="width: 690px;" />
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
                    // departmentId: '',
                    jobLevel: '',
                    wageLevel: '',   // 传给后台用的
                    wageLevels: [],  // 展示用的
                    intro: '',
                    labor: ''   // 劳务派遣
                },
                rules: {
                    dutyName: [{ required: true, message: '岗位不能为空！', trigger: 'blur' }],
                    // departmentId: [{ required: true, message: '岗位不能为空！', trigger: 'blur' }],
                    jobLevel: [{ required: true, message: '职级不能为空！', trigger: 'blur' }],
                    // wageLevel: [{ required: true, message: '工资职级不能为空！', trigger: 'blur' }]
                },

                departmentList: [],
                dict_jobLevel: [],
                dict_wageLevel: [],
                // dict_labor: []
            };
        },
        watch: {
            jobId: {
                immediate: true,
                handler(val) {
                    if (val) {
                        this.formData.jobId = val;
                        this.getData();
                    }
                    else {
                        this.resetFormData();
                    }
                }
            }
        },
        mounted() {
            this.getDicts(['jobLevel', 'wageLevel']);
            this.getDeparmentList('', 'departmentList');
        },
        methods: {
            // 初始化表单数据
            resetFormData() {
                Object.assign(this.formData, this.initFormData);
            },
            getData() {
                this.$http({
                    method: 'get',
                    url: '/job/query',
                    params: {
                        jobId: this.jobId
                    }
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        Object.assign(this.formData, res.data, {
                            wageLevels: res.data.wageLevel ? res.data.wageLevel.split(',') : []
                        });
                    }
                })
            },
            save() {
                this.saveBtnLoading = true;
                this.formData.wageLevel = this.formData.wageLevels.join(',');
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
                    url: '/job/add',
                    data: JSON.stringify(this.formData)
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.$Message.success({
                            content: '添加职务成功！'
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
                    url: '/job/update',
                    data: JSON.stringify(this.formData)
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.$Message.success({
                            content: '更新职务成功！'
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
