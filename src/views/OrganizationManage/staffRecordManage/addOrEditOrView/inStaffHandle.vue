<template>
    <Modal v-model="modalValue"
           class="inStaffHandle-container"
           :title="title"
           :width="1000"
           @on-visible-change="onVisibleChange">
        <Row>
            <i-col span="6">
                <Form ref="form"
                      class="form"
                      :model="formData"
                      :rules="rules"
                      :label-width="80">
                    <FormItem label="姓名:" prop="employeeName">
                        <Input v-model="formData.employeeName" placeholder="请输入姓名" />
                    </FormItem>
                </Form>
            </i-col>
            <i-col span="18">
                <Form ref="form"
                      inline
                      class="form"
                      :model="formData"
                      :rules="rules"
                      :label-width="80">
                    <FormItem label="姓名:" prop="employeeName">
                        <Input v-model="formData.employeeName" placeholder="请输入姓名" />
                    </FormItem>
                    <FormItem label="性别:" prop="sex">
                        <Input />
                    </FormItem>
                    <FormItem label="出生年月:" prop="birthday">
                        <Input />
                    </FormItem>
                    <FormItem label="年龄:">
                        <Input  placeholder="自动计算" readonly />
                    </FormItem>
                    <FormItem label="民族:" prop="nation">
                        <Input v-model="formData.nation" placeholder="请输入民族" />
                    </FormItem>
                    <FormItem label="籍贯:" prop="nativePlace">
                        <Input v-model="formData.nativePlace" placeholder="请输入籍贯" />
                    </FormItem>
                    <FormItem label="身份证:" prop="idNumber">
                        <Input v-model="formData.idNumber" placeholder="请输入身份证" />
                    </FormItem>
                    <FormItem label="联系电话:" prop="employeeName">
                        <Input v-model="formData.employeeName" placeholder="请输入联系电话" />
                    </FormItem>

                    <template v-for="item in formData.list">
                        <FormItem label="毕业院校:" :key="item.school">
                            <Input v-model="item.school" placeholder="请输入毕业院校" />
                        </FormItem>
                        <FormItem label="类型:" :key="item.school">
                            <Input v-model="item.school" placeholder="请输入类型" />
                        </FormItem>
                        <FormItem label="专业:" :key="item.school">
                            <Input v-model="item.school" placeholder="请输入专业" />
                        </FormItem>
                        <FormItem label="学历:" :key="item.school">
                            <Input v-model="item.school" placeholder="请输入学历" />
                        </FormItem>
                    </template>



                    <FormItem label="入伍年月:" prop="joinArmyDate">
                    </FormItem>
                    <FormItem label="入党年月:" prop="joinPartyDate">
                    </FormItem>
                    <FormItem label="任职单位:" prop="departmentId">
                    </FormItem>
                    <FormItem label="职务:" prop="jobId">
                    </FormItem>
                    <FormItem label="职级:">
                        <Input  placeholder="自动载入" />
                    </FormItem>
                    <FormItem label="工资职级:">
                        <Input  placeholder="自动载入" />
                    </FormItem>
                    <FormItem label="任职时间:" prop="onJobTime">
                    </FormItem>
                    <FormItem label="任现职时间:" prop="nowJobTime">
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
    export default {
        name: 'inStaffHandle',
        mixins: [modalMixin],
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
        },
        computed: {
            title() {
                let title = {
                    add: '新增',
                    edit: '编辑',
                    view: '查看'
                };
                return title[this.type];
            }
        },
        data() {
            return {
                // 是否保存中
                saveBtnLoading: false,
                // 初始值
                initFormData: {},
                formData: {
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
                    onJobTime: '',   // 任职时间
                    nowJobTime: '',  // 现任职时间
                    list: [
                        {
                            school: '',    // 毕业院校
                            schoolTyoe: '', // 院校类型
                            major: '',      // 专业
                            eduction: ''    // 学历
                        }
                    ]
                },
                rules: {}
            };
        },
        methods: {
            save() {}
        }
    }
</script>

<style lang="scss" scoped>
    .inStaffHandle-container {
    }
</style>