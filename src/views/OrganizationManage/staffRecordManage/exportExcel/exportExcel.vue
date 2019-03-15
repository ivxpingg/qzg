<template>
    <Modal v-model="modalValue"
           title="人事变动记录"
           :width="1200"
           footer-hide
           @on-visible-change="onVisibleChange">
        <vIvxFilterBox>
            <Form inline>

                <FormItem label="员工状态:" :label-width="65">
                    <Select v-model="searchParams.condition.employeeStatus" clearable>
                        <Option v-for="item in dict_employeeStatus"
                                :key="item.id"
                                :value="item.value"
                                :label="item.label"></Option>
                    </Select>
                </FormItem>

                <FormItem label="员工类型:" :label-width="65">
                    <Select v-model="searchParams.condition.employeeType" clearable>
                        <Option v-for="item in dict_employeeType"
                                :key="item.id"
                                :value="item.value"
                                :label="item.label"></Option>
                    </Select>
                </FormItem>

                <FormItem label="时间:" :label-width="45">
                    <DatePicker ref="datePicker"
                                type="daterange"
                                @on-change="onChage_daterange"
                                placeholder="选择时间"
                                style="width: 180px;"></DatePicker>
                </FormItem>

                <FormItem>
                    <Button type="success" :to="exportUrl" target="_blank">导出</Button>
                </FormItem>
            </Form>
        </vIvxFilterBox>
        <div class="ivx-table-box">
            <Table border
                   height="540"
                   :loading="tableLoading"
                   :columns="tableColumns"
                   :data="tableData"></Table>
            <Page prev-text="上一页"
                  next-text="下一页"
                  show-total
                  :current="searchParams.current"
                  :page-size="searchParams.size"
                  :total="searchParams.total"
                  @on-change="onPageChange"></Page>
        </div>
    </Modal>
</template>

<script>
    import modalMixin from '../../../../lib/mixin/modalMixin';
    import comMixin from '../../../../lib/mixin/comMixin';
    import Config from '../../../../config';
    export default {
        name: 'exportExcel',
        mixins: [modalMixin, comMixin],
        computed: {
            exportUrl() {
                return Config[Config.env].origin + Config[Config.env].ajaxUrl + '/employee/export' +
                    `?employeeStatus=${this.searchParams.condition.employeeStatus || ''}&employeeType=${this.searchParams.condition.employeeType || ''}&beginTime=${this.searchParams.condition.beginTime}&endTime=${this.searchParams.condition.endTime}&fields=${this.searchParams.condition.fields.join(',')}`
            }
        },
        data() {
            return {
                searchParams: {
                    current: 1,        // 当前第几页
                    size: 10,          // 每页几行
                    total: 0,           // 总行数
                    condition: {
                        employeeStatus: '',
                        employeeType: 'in_staff',
                        beginTime: '',
                        endTime: '',
                        fields: ['insTime',
                            'employeeName',
                            'departmentName',
                            'phone',
                            'dutyName',
                            'employeeStatusLabel',
                            'sexLabel',
                            'birthday',
                            'nativePlace',
                            'idNumber',
                            'joinArmyDate',
                            'joinPartyDate',
                            'departmentName',
                            'dutyName',
                            'jobLevelLabel',
                            'wageLevelLabel',
                            'onJobTime',
                            'nowJobTime'
                        ]
                    }
                },
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '时间', width: 150, align: 'center', key: 'insTime',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value: this.searchParams.condition.fields.indexOf('insTime') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('insTime');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('insTime'), 1);
                                            }
                                        }
                                    }
                                }, '时间')
                            ])
                        },
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.insTime, 'YYYY-MM-DD HH:mm:ss'));
                        }
                    },
                    { title: '员工名称', width: 120, align: 'center', key: 'employeeName',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value:  this.searchParams.condition.fields.indexOf('employeeName') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('employeeName');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('employeeName'), 1);
                                            }
                                        }
                                    }
                                }, '员工名称')
                            ])
                        },
                    },
                    { title: '部门', width: 120, align: 'center', key: 'departmentName',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value:  this.searchParams.condition.fields.indexOf('departmentName') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('departmentName');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('departmentName'), 1);
                                            }
                                        }
                                    }
                                }, '部门')
                            ])
                        },
                    },
                    { title: '联系电话', width: 120, align: 'center', key: 'phone',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value: this.searchParams.condition.fields.indexOf('phone') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('phone');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('phone'), 1);
                                            }
                                        }
                                    }
                                }, '联系电话')
                            ])
                        },
                    },
                    { title: '职务', width: 120, align: 'center', key: 'dutyName',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value: this.searchParams.condition.fields.indexOf('dutyName') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('dutyName');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('dutyName'), 1);
                                            }
                                        }
                                    }
                                }, '职务')
                            ])
                        },
                    },
                    { title: '状态', width: 100, align: 'center', key: 'employeeStatusLabel',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value:  this.searchParams.condition.fields.indexOf('employeeStatusLabel') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('employeeStatusLabel');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('employeeStatusLabel'), 1);
                                            }
                                        }
                                    }
                                }, '状态')
                            ])
                        },
                    },
                    { title: '性别', width: 100, align: 'center', key: 'sexLabel',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value:  this.searchParams.condition.fields.indexOf('sexLabel') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('sexLabel');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('sexLabel'), 1);
                                            }
                                        }
                                    }
                                }, '性别')
                            ])
                        },
                    },
                    { title: '出生日期', width: 120, align: 'center', key: 'birthday',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value:  this.searchParams.condition.fields.indexOf('birthday') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('birthday');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('birthday'), 1);
                                            }
                                        }
                                    }
                                }, '出生日期')
                            ])
                        },
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.birthday, 'YYYY-MM-DD'));
                        }
                    },
                    { title: '籍贯', width: 100, align: 'center', key: 'nativePlace',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value:  this.searchParams.condition.fields.indexOf('nativePlace') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('nativePlace');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('nativePlace'), 1);
                                            }
                                        }
                                    }
                                }, '籍贯')
                            ])
                        },
                    },
                    { title: '身份证号码', width: 140, align: 'center', key: 'idNumber',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value:  this.searchParams.condition.fields.indexOf('idNumber') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('idNumber');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('idNumber'), 1);
                                            }
                                        }
                                    }
                                }, '身份证号码')
                            ])
                        },
                    },
                    { title: '所属单位', width: 120, align: 'center', key: 'departmentName',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value:  this.searchParams.condition.fields.indexOf('departmentName') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('departmentName');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('departmentName'), 1);
                                            }
                                        }
                                    }
                                }, '所属单位')
                            ])
                        },
                    },
                    { title: '职务', width: 100, align: 'center', key: 'dutyName',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value:  this.searchParams.condition.fields.indexOf('dutyName') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('dutyName');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('dutyName'), 1);
                                            }
                                        }
                                    }
                                }, '职务')
                            ])
                        },
                    },
                    { title: '职级', width: 100, align: 'center', key: 'jobLevelLabel',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value:  this.searchParams.condition.fields.indexOf('jobLevelLabel') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('jobLevelLabel');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('jobLevelLabel'), 1);
                                            }
                                        }
                                    }
                                }, '职级')
                            ])
                        },
                    },
                    { title: '工资职级', width: 120, align: 'center', key: 'wageLevelLabel',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value:  this.searchParams.condition.fields.indexOf('wageLevelLabel') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('wageLevelLabel');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('wageLevelLabel'), 1);
                                            }
                                        }
                                    }
                                }, '工资职级')
                            ])
                        },
                    },
                    { title: '任职时间', width: 120, align: 'center', key: 'onJobTime',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value:  this.searchParams.condition.fields.indexOf('onJobTime') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('onJobTime');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('onJobTime'), 1);
                                            }
                                        }
                                    }
                                }, '任职时间')
                            ])
                        },
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.onJobTime, 'YYYY-MM-DD'));
                        }
                    },
                    { title: '现任职时间', width: 130, align: 'center', key: 'nowJobTime',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value:  this.searchParams.condition.fields.indexOf('nowJobTime') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('nowJobTime');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('nowJobTime'), 1);
                                            }
                                        }
                                    }
                                }, '现任职时间')
                            ])
                        },
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.nowJobTime, 'YYYY-MM-DD'));
                        }
                    },
                    { title: '入伍日期', width: 120, align: 'center', key: 'joinArmyDate',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value:  this.searchParams.condition.fields.indexOf('joinArmyDate') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('joinArmyDate');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('joinArmyDate'), 1);
                                            }
                                        }
                                    }
                                }, '入伍日期')
                            ])
                        }
                    },
                    { title: '入党日期', width: 120, align: 'center', key: 'joinPartyDate',
                        renderHeader: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value:  this.searchParams.condition.fields.indexOf('joinPartyDate') > -1
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            if (value) {
                                                this.searchParams.condition.fields.push('joinPartyDate');
                                            }
                                            else {
                                                this.searchParams.condition.fields.splice(this.searchParams.condition.fields.indexOf('joinPartyDate'), 1);
                                            }
                                        }
                                    }
                                }, '入党日期')
                            ])
                        }
                    }
                ],
                tableData: [
                    {
                        insTime: '2018-09-21  08:50:08',
                        employeeName: '沈晓晓',
                        departmentName: '办公室',
                        phone: '19020112121',
                        dutyName: '主任',
                        employeeStatusLabel: '离职'
                    }
                ],
                tableLoading: false,

                // 字典
                dict_employeeStatus: [],
                dict_employeeType: [],

                // 导出字段
            };
        },
        watch: {
            'searchParams.current'() {
                this.getData();
            },
            'searchParams.condition': {
                deep: true,
                handler() {
                    this.getData();
                }
            }
        },
        mounted() {
            this.getDicts(['employeeStatus', 'employeeType']);

            this.getData();
        },
        methods: {
            onChage_daterange(value) {
                this.searchParams.condition.beginTime = value[0];
                this.searchParams.condition.endTime = value[1];
            },
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/employee/list',
                    data: JSON.stringify(this.searchParams)
                }).then((res) => {
                    this.tableLoading = false;
                    if (res.code === 'SUCCESS') {
                        this.tableData = res.data.records;
                        this.searchParams.total = res.data.total;
                    }
                }).catch(() => {
                    this.tableLoading = false;
                })
            },
            onClick_exprot() {
                this.$http({
                    method: 'post',
                    url: '/employee/export',
                    data: JSON.stringify(this.searchParams)
                }).then((res) => {
                    if (res.code === 'SUCCESS') {

                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .exportExcel-container {
    }
</style>