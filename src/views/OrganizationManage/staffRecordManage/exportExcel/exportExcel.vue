<template>
    <Modal v-model="modalValue"
           title="人事变动记录"
           :width="850"
           footer-hide
           @on-visible-change="onVisibleChange">
        <vIvxFilterBox>
            <Form inline>

                <FormItem label="员工状态:" :label-width="65">
                    <Select v-model="searchParams.condition.employeeStatus">
                        <Option value=""
                                label="全部"></Option>
                        <Option v-for="item in dict_employeeStatus"
                                :key="item.id"
                                :value="item.value"
                                :label="item.label"></Option>
                    </Select>
                </FormItem>

                <FormItem label="员工类型:" :label-width="65">
                    <Select v-model="searchParams.condition.employeeType">
                        <Option value=""
                                label="全部"></Option>
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
                return Config[Config.env].origin + Config[Config.env].ajaxUrl +
                    `?employeeStatus=${this.searchParams.condition.employeeStatus}&employeeType=${this.searchParams.condition.employeeType}&beginTime=${this.searchParams.condition.beginTime}&endTime=${this.searchParams.condition.endTime}&fields=${this.searchParams.condition.fields.join(',')}`
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
                        fields: ['insTime', 'employeeName', 'departmentName', 'phone', 'dutyName', 'employeeStatusLabel']
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
                                }),
                                h('span', '时间')
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
                                }),
                                h('span', '员工名称')
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
                                }),
                                h('span', '部门')
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
                                }),
                                h('span', '联系电话')
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
                                }),
                                h('span', '职务')
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
                                }),
                                h('span', '状态')
                            ])
                        },
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