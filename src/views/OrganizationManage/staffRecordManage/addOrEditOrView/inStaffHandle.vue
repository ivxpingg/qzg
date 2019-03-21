<template>
    <Modal v-model="modalValue"
           class="inStaffHandle-container"
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
                                    type="date"
                                    @on-change="onChage_birthday"
                                    placeholder="选择时间" ></DatePicker>
                    </FormItem>
                    <FormItem label="年龄:">
                        <Input :value="age"  placeholder="自动计算" readonly  :style="formInputStyle"/>
                    </FormItem>
                    <FormItem label="民族:">
                        <Input v-model="formData.nation" placeholder="请输入民族" :style="formInputStyle" />
                    </FormItem>
                    <FormItem label="籍贯:">
                        <Input v-model="formData.nativePlace" placeholder="请输入籍贯" :style="formInputStyle" />
                    </FormItem>
                    <FormItem label="身份证:" prop="idNumber">
                        <Input v-model="formData.idNumber" placeholder="请输入身份证" :style="formInputStyle" />
                    </FormItem>
                    <FormItem label="联系电话:" prop="phone">
                        <Input v-model="formData.phone" placeholder="请输入联系电话" :style="formInputStyle" />
                    </FormItem>



                    <FormItem label="入伍年月:">
                        <DatePicker :value="formData.joinArmyDate"
                                    :style="formInputStyle"
                                    type="month"
                                    @on-change="onChage_joinArmyDate"
                                    placeholder="选择时间"></DatePicker>
                    </FormItem>
                    <FormItem label="入党年月:">
                        <DatePicker :value="formData.joinPartyDate"
                                    :style="formInputStyle"
                                    type="month"
                                    @on-change="onChage_joinPartyDate"
                                    placeholder="选择时间"></DatePicker>
                    </FormItem>
                    <FormItem label="任职单位:">
                        <Select v-model="formData.departmentId" :style="formInputStyle">
                            <Option v-for="item in departmentList"
                                    :key="item.departmentId"
                                    :value="item.departmentId"
                                    :label="item.unitName + '-' + item.departmentName "></Option>
                        </Select>
                    </FormItem>
                    <FormItem label="职务:">
                        <Select v-model="formData.jobId" :style="formInputStyle">
                            <Option v-for="item in jobList"
                                    :key="item.jobId"
                                    :value="item.jobId"
                                    :label="item.dutyName"></Option>
                        </Select>
                    </FormItem>
                    <FormItem label="职级:">
                        <Select :value="formData.jobLevel" readonly disabled :style="formInputStyle">
                            <Option v-for="item in dict_jobLevel"
                                    :key="item.id"
                                    :value="item.value"
                                    :label="item.label"></Option>
                        </Select>
                        <!--<Input :value="formData.jobLevel"  placeholder="自动载入" readonly :style="formInputStyle" />-->
                    </FormItem>
                    <FormItem label="工资职级:">
                        <Select :value="formData.wageLevel" readonly disabled :style="formInputStyle">
                            <Option v-for="item in dict_wageLevel"
                                    :key="item.id"
                                    :value="item.value"
                                    :label="item.label"></Option>
                        </Select>
                        <!--<Input :value="formData.wageLevel" placeholder="自动载入" readonly :style="formInputStyle" />-->
                    </FormItem>
                    <FormItem label="任职时间:">
                        <DatePicker :value="formData.onJobTime"
                                    :style="formInputStyle"
                                    type="date"
                                    @on-change="onChage_onJobTime"
                                    placeholder="选择时间"></DatePicker>
                    </FormItem>
                    <FormItem label="任现职时间:">
                        <DatePicker :value="formData.nowJobTime"
                                    :style="formInputStyle"
                                    type="date"
                                    @on-change="onChage_nowJobTime"
                                    placeholder="选择时间"></DatePicker>
                    </FormItem>
                    <FormItem label="员工状态:" prop="employeeStatus">
                        <div style="width: 670px;">
                            <Select v-model="formData.employeeStatus" :style="formInputStyle">
                                <Option v-for="item in dict_employeeStatus"
                                        :key="item.id"
                                        :value="item.value"
                                        :label="item.label"></Option>
                            </Select>
                        </div>
                    </FormItem>

                    <template v-for="(item, idx) in formData.employeeSchoolList">
                        <FormItem label="毕业院校:" :key="idx + '0'">
                            <Input v-model="item.school" placeholder="请输入毕业院校"  style="width: 130px;" />
                        </FormItem>
                        <FormItem label="类型:" :key="idx + '1'" :label-width="60">
                            <Input v-model="item.schoolType" placeholder="请输入类型" style="width: 130px;"  />
                        </FormItem>
                        <FormItem label="专业:" :key="idx + '2'" :label-width="60">
                            <Input v-model="item.major" placeholder="请输入专业" style="width: 130px;"  />
                        </FormItem>
                        <FormItem label="学历:" :key="idx + '3'" :label-width="60">
                            <Input v-model="item.eduction" placeholder="请输入学历" style="width: 130px;"  />
                        </FormItem>
                        <FormItem v-if="idx === 0 && !isView" :label-width="0">
                            <Button type="error" size="small" @click="removeEmployeeSchool(item, idx)" style="margin-right: 5px;">删除</Button>
                            <Button type="primary" size="small" @click="addEmployeeSchool">添加</Button>
                        </FormItem>
                        <FormItem v-else-if="!isView" :label-width="0">
                            <Button type="error" size="small" @click="removeEmployeeSchool(item, idx)">删除</Button>
                        </FormItem>
                    </template>
                    <FormItem v-if="formData.employeeSchoolList.length === 0 && !isView">
                        <div style="width: 900px;">
                            <Button type="primary" size="small" @click="addEmployeeSchool">添加教育记录</Button>
                        </div>
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
        name: 'inStaffHandle',
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
            },
            age() {
                return this.formData.birthday ?
                    ((this.$moment().year() - this.$moment(this.formData.birthday).year()) > 0 ?
                        (this.$moment().year() - this.$moment(this.formData.birthday).year()) : 0) : '';

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
                    employeeType: 'in_staff', // 员工类型-在编员工
                    headPortrait: '',
                    employeeName: '',  // 员工名称
                    sex: '',
                    birthday: '',
                    nation: '',       // 民族
                    nativePlace: '',  // 籍贯
                    idNumber: '',
                    phone: '',
                    joinArmyDate: '', // 入伍日期
                    joinPartyDate: '', // 入党日期
                    departmentId: '',    // 部门Id
                    jobId: '',       // 职务ID
                    jobLevel: '',    // 职级
                    wageLevel: '',   // 工资职级
                    onJobTime: '',   // 任职时间
                    nowJobTime: '',  // 现任职时间
                    employeeStatus: '',
                    employeeSchoolList: [
                        // {
                        //     school: '',    // 毕业院校
                        //     schoolType: '', // 院校类型
                        //     major: '',      // 专业
                        //     eduction: ''    // 学历
                        // }
                    ]
                },
                rules: {
                    employeeName: [{ required: true, message: '姓名不能为空！', trigger: 'blur' }],
                    idNumber: [{ required: true, message: '身份证不能为空！', trigger: 'blur' },
                        { max: 18, message: '请输入正确身份证号码！', trigger: 'blur' }],
                    phone: [{ required: true, message: '电话号码不能为空！', trigger: 'blur' }],
                },

                // 字典
                dict_sex: [],
                dict_jobLevel: [],
                dict_wageLevel: [],
                dict_employeeStatus: [],
                departmentList: [],
                jobList: [],

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
            },
            'formData.departmentId'(val) {
                if (val) {
                    this.getJobList('jobList', val);
                }
            },
            'formData.jobId'(val) {
                for (let i = 0; i < this.jobList.length; i++) {
                    if (this.jobList[i].jobId === val) {
                        this.formData.jobLevel = this.jobList[i].jobLevel;
                        this.formData.wageLevel = this.jobList[i].wageLevel;
                    }
                }
            }
        },
        mounted() {
            this.getDicts(['sex', 'jobLevel', 'wageLevel', 'employeeStatus']);
            this.getDeparmentList('', 'departmentList');
        },
        methods: {
            // 初始化表单数据
            resetFormData() {
                Object.assign(this.formData, this.initFormData);
            },
            getRandom() { return Math.random(); },
            onChage_birthday(value) { this.formData.birthday = value; },
            onChage_joinArmyDate(value) { this.formData.joinArmyDate = value; },
            onChage_joinPartyDate(value) { this.formData.joinPartyDate = value; },
            onChage_onJobTime(value) { this.formData.onJobTime = value; },
            onChage_nowJobTime(value) { this.formData.nowJobTime = value; },
            // 添加毕业院校信息
            addEmployeeSchool() {
                this.formData.employeeSchoolList.push({
                    school: '',    // 毕业院校
                    schoolType: '', // 院校类型
                    major: '',      // 专业
                    eduction: ''    // 学历
                });
            },
            removeEmployeeSchool(item, idx) {
                this.formData.employeeSchoolList.splice(idx, 1);
            },
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
                    url: '/employee/query',
                    params: {
                        employeeId: this.employeeId
                    }
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        Object.assign(this.formData, res.data, {
                            birthday: this.timeFormat(res.data.birthday, 'YYYY-MM-DD'),
                            onJobTime: this.timeFormat(res.data.onJobTime, 'YYYY-MM-DD'),
                            nowJobTime: this.timeFormat(res.data.nowJobTime, 'YYYY-MM-DD')
                        });
                    }
                })
            },
            // 获取附件列表


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
                    url: '/employee/add',
                    data: JSON.stringify(this.formData)
                }).then(res => {
                    this.saveBtnLoading = false;
                    if(res.code === 'SUCCESS') {
                        this.$Message.success({
                            content: '添加员工成功！'
                        });
                        this.$emit('modal-callback');
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
                    url: '/employee/update',
                    data: JSON.stringify(this.formData)
                }).then(res => {
                    this.saveBtnLoading = false;
                    if(res.code === 'SUCCESS') {
                        this.$Message.success({
                            content: '更新员工成功！'
                        });
                        this.$emit('modal-callback');
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

<style lang="scss">
    .inStaffHandle-container {
    }
</style>