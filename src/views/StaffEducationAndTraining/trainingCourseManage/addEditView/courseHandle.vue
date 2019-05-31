<template>
    <Modal v-model="modalValue"
           class="courseHandle-container"
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
            <FormItem label="培训名称:" prop="courseName">
                <Input v-model="formData.courseName" placeholder="请输入培训名称" :style="formInputStyle" />
            </FormItem>
            <FormItem label="归属单位:" prop="departmentId">
                <Select v-model="formData.departmentId" :style="formInputStyle">
                    <Option v-for="item in dict_departmentList"
                            :key="item.departmentId"
                            :value="item.departmentId"
                            :label="item.unitName + '-' + item.departmentName"></Option>
                </Select>
            </FormItem>
            <FormItem label="开始时间:" prop="startTime">
                <DatePicker :value="formData.startTime"
                            :style="formInputStyle"
                            type="date"
                            @on-change="onChage_startTime"
                            placeholder="选择时间" ></DatePicker>
            </FormItem>
            <FormItem label="结束时间:" prop="endTime">
                <DatePicker :value="formData.endTime"
                            :style="formInputStyle"
                            type="date"
                            @on-change="onChage_endTime"
                            placeholder="选择时间" ></DatePicker>
            </FormItem>
            <FormItem label="培训地址:" prop="address">
                <Input v-model="formData.address" placeholder="请输入培训地址" :style="formInputStyle" />
            </FormItem>
            <FormItem label="培训要求:" prop="require">
                <Input v-model="formData.require" placeholder="请输入培训要求" :style="formInputStyle" />
            </FormItem>
            <FormItem label="培训学时:" prop="period">
                <InputNumber v-model="formData.period" :min="1" :style="formInputStyle"></InputNumber>
                <!--<Input v-model="formData.period" type="number" placeholder="请输入培训学时" :style="formInputStyle" />-->
            </FormItem>
            <FormItem label="培训内容:" prop="courseContent">
                <Input v-model="formData.courseContent" placeholder="请输入培训内容" :style="formInputStyle" />
            </FormItem>
            <FormItem label="培训类型:" prop="courseType">
                <Select v-model="formData.courseType" :style="formInputStyle">
                    <Option v-for="item in dict_courseType"
                            :key="item.id"
                            :value="item.value"
                            :label="item.label"></Option>
                </Select>
                <!--<Input v-model="formData.courseType" placeholder="请输入培训类型" :style="formInputStyle" />-->
            </FormItem>
            <FormItem label="附件:" prop="fileIds">
                <div v-if="!isView" style="width: 690px;">
                    <vWebUploader
                            v-if="modalValue"
                            ref="webUploader"
                            multiple
                            @on-removeFile="onRemoveFile"
                            @on-uploadSuccess="onUploadSuccess"
                            fileType="course_file">
                        <Button type="primary" icon="ios-cloud-upload-outline">上传附件</Button>
                    </vWebUploader>
                </div>
                <div v-else style="width: 690px;">
                    <Button type="primary" @click="getFilesList">查看附件</Button>
                </div>
            </FormItem>

        </Form>

        <div slot="footer">
            <Button type="primary"
                    size="large"
                    :loading="saveBtnLoading"
                    @click="save">保存</Button>
        </div>

        <!--查看附件-->
        <vViewFiles ref="modal_viewFiles" :data="courseFiles"></vViewFiles>

    </Modal>
</template>

<script>
    import modalMixin from '../../../../lib/mixin/modalMixin';
    import comMixin from '../../../../lib/mixin/comMixin';
    import viewFilesMixin from '../../../Common/viewFiles/mixin';
    export default {
        name: 'courseHandle',  // 课程管理
        mixins: [modalMixin, comMixin, viewFilesMixin],
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
            courseId: {
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
                    courseId: '',
                    courseName: '',
                    departmentId: '',
                    startTime: '',
                    endTime: '',
                    address: '',  // 培训地址
                    require: '',  // 培训要求
                    period: 1,   // 培训学时
                    courseContent: '',  // 培训内容
                    courseType: '',     // 课程类型
                    fileIds: []         // 附件
                },
                rules: {
                  courseName: [{ required: true, message: '培训名称不能为空！', trigger: 'blur' }],
                  departmentId: [{ required: true, message: '请选择归属单位！', trigger: 'blur' }],
                  startTime: [{ required: true, message: '开始时间不能为空！', trigger: 'blur' }],
                  endTime: [{ required: true, message: '结束时间不能为空！', trigger: 'blur' }],
                  address: [{ required: true, message: '培训地址不能为空！', trigger: 'blur' }],
                  require: [{ required: true, message: '培训要求不能为空！', trigger: 'blur' }],
                  period: [{ required: true, type: 'number', message: '请输入整数！', trigger: 'blur' }],
                  courseContent: [{ required: true, message: '培训内容不能为空！', trigger: 'blur' }],
                  courseType: [{ required: true, message: '请选择培训类型！', trigger: 'blur' }],
                  fileIds: [{ required: true, type: 'array', message: '请上传附件！', trigger: 'blur' }]
                },

                // 字典
                dict_departmentList: [],
                dict_courseType: [],

                // 附件列表
                courseFiles: []
            };
        },
        watch: {
            courseId: {
                immediate: true,
                handler(val) {
                    if (val) {
                        this.formData.courseId = val;
                        this.getData();
                    }
                    else {
                        this.resetFormData();
                    }
                }
            }
        },
        mounted() {
            this.getDeparmentList('', 'dict_departmentList');
            this.getDicts(['courseType']);
        },
        methods: {
            // 初始化表单数据
            resetFormData() {
                Object.assign(this.formData, this.initFormData);
            },
            onChage_startTime(value) {
                this.formData.startTime = value;
            },
            onChage_endTime(value) {
                this.formData.endTime = value;
            },
            // 移除文件
            onRemoveFile(file, fileList) {
                this.formData.fileIds = fileList.map(v => v.response.fileId);
            },
            // 文件上传成功
            onUploadSuccess(response, file, fileList) {
                // if (response.code === 'SUCCESS') {
                //     this.formData.fileIds = fileList.map(v => v.response.fileId);
                // }

              this.formData.fileIds = fileList.map(v => {
                if (v.fileId) {
                  return v.fileId;
                }
                else {
                  return v.response.fileId;
                }
              });
            },

            getFilesList () {
              this.$refs.modal_viewFiles.modalValue = true;
              this.$http({
                method: 'get',
                url: '/file/attachList',
                params: {
                  relationId: this.formData.courseId,
                  fileType: 'course_file'
                }
              }).then(res => {
                if(res.code === 'SUCCESS') {
                  this.courseFiles = res.data || [];
                }
              });
            },

            getData() {
                this.$http({
                    method: 'get',
                    url: '/course/query',
                    params: {
                        courseId: this.courseId
                    }
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        Object.assign(this.formData, res.data, {
                            startTime: this.timeFormat(res.data.startTime, 'YYYY-MM-DD'),
                            endTime: this.timeFormat(res.data.endTime, 'YYYY-MM-DD'),
                        });
                    }
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
                    url: '/course/add',
                    data: JSON.stringify(this.formData)
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.$Message.success({
                            content: '添加课程成功！'
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
            editSubmit() {
                this.$http({
                    method: 'post',
                    url: '/',
                    data: JSON.stringify(this.formData)
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.$Message.success({
                            content: '更新成功！'
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
    .courseHandle-container {
    }
</style>