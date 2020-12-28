<template>
    <div class="laborContractManage-container">
        <vIvxFilterBox>
            <Form inline>
                <FormItem label="归属部门:" :label-width="70">
                    <Select v-model="searchParams.condition.departmentId" style="width: 200px;">
                        <Option v-for="item in departmentList"
                                :key="item.departmentId"
                                :value="item.departmentId"
                                :label="item.unitName + '-' + item.departmentName"></Option>
                    </Select>
                </FormItem>
                <FormItem label="归属单位:" :label-width="70">
                    <Select v-model="searchParams.condition.departmentIds">
                        <Option v-for="item in dict_unitList"
                                :key="item.departmentIds"
                                :value="item.departmentIds"
                                :label="item.unitName"></Option>
                    </Select>
                </FormItem>
                <FormItem label="人员类型:" :label-width="70">
                    <Select v-model="searchParams.condition.employeeType" style="width: 100px; float: right;">
                        <Option value=""
                                :key="123"
                                label="全部"></Option>
                        <Option v-for="item in dict_employeeType"
                                :key="item.id"
                                :value="item.value"
                                :label="item.label"></Option>
                    </Select>
                </FormItem>
                <FormItem label="关键字:" :label-width="70">
                    <Input v-model="searchParams.condition.searchKey"
                           style="width: 120px;"
                           placeholder="请输入关键字"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" icon="ios-search" @click="getData">检索</Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" icon="md-refresh" @click="resetSearchParams">重置</Button>
                </FormItem>
            </Form>
        </vIvxFilterBox>
        <vIvxFilterBox>
            <Button type="primary" icon="md-add" @click="addLaborContract">新建合同</Button>
        </vIvxFilterBox>

        <div class="ivx-table-box">
            <Table border
                   height="540"
                   :loading="tableLoading"
                   :columns="_tableColumns"
                   :data="tableData"></Table>
            <Page prev-text="上一页"
                  next-text="下一页"
                  show-total
                  :current="searchParams.current"
                  :page-size="searchParams.size"
                  :total="searchParams.total"
                  @on-change="onPageChange"></Page>
        </div>

        <!--新建合同/续签-->
        <vLaborContractHandle ref="modal_laborContractHandle"
                              :employeeId="currentRow.employeeId"
                              :employeeName="currentRow.employeeName"
                              @modal-callback="getData"></vLaborContractHandle>

        <!--签订记录-->
        <vContractRecord ref="modal_contractRecord"
                         :laborContractId="currentRow.laborContractId"
                         @modal-callback="getData"></vContractRecord>

    </div>
</template>

<script>
    import comMixin from '../../../lib/mixin/comMixin';
    import authMixin from '../../../lib/mixin/authMixin';
    import vLaborContractHandle from './addEdit/laborContractHandle';
    import vContractRecord from './contractRecord/contractRecord';
    export default {
        name: 'laborContractManage',  // 劳动合同管理
        mixins: [comMixin, authMixin],
        components: {vLaborContractHandle, vContractRecord},
        computed: {
            _tableColumns() {
                let column = [{ title: '操作', minWidth: 360, align: 'center',
                    render: (h, params) => {
                        let list = [];
                        if (this.auth_update) {
                            list.push(h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    icon: 'ios-create'
                                },
                                on: {
                                    click: () => {
                                        this.currentRow.laborContractId = params.row.laborContractId;
                                        this.currentRow.employeeId = params.row.employeeId;
                                        this.currentRow.employeeName = params.row.employeeName;
                                        this.$refs.modal_laborContractHandle.modalValue = true;
                                    }
                                }
                            }, '续约'));
                        }

                        list.push(h('Button', {
                            props: {
                                type: 'info',
                                size: 'small',
                                icon: 'ios-eye'
                            },
                            on: {
                                click: () => {
                                    this.currentRow.laborContractId = params.row.laborContractId;
                                    this.$refs.modal_contractRecord.modalValue = true;
                                }
                            }
                        }, '签订记录'));

                        list.push(h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small',
                                icon: 'ios-create'
                            },
                            on: {
                                click: () => {
                                    this.$Modal.confirm({
                                        title: '解除',
                                        content: `确定要解除《${params.row.employeeName}》的劳动合同?`
                                    });
                                }
                            }
                        }, '解除'));

                        list.push(h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small',
                                icon: 'ios-create'
                            },
                            on: {
                                click: () => {
                                    this.$Modal.confirm({
                                        title: '解除',
                                        content: `确定要变更《${params.row.employeeName}》的劳动合同?`
                                    });
                                }
                            }
                        }, '变更'));


                        return h('div',{
                            style: { },
                            class: 'ivx-table-cell-handle'
                        },list);
                    }
                }];
                return this.auth_update || this.auth_del ? this.tableColumns.concat(column) : this.tableColumns.concat(column);
            }
        },
        data() {
            return {
                searchParams: {
                    current: 1,        // 当前第几页
                    size: 10,          // 每页几行
                    total: 0,           // 总行数
                    condition: {
                        departmentId: '',
                        searchKey: '',
                        departmentIds: '',
                        employeeType: ''
                    }
                },
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '时间', width: 150, align: 'center', key: 'insTime',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.insTime, 'YYYY-MM-DD HH:mm:ss'));
                        }
                    },
                    { title: '人员', width: 120, align: 'center', key: 'employeeName' },
                    { title: '签订时间', width: 120, align: 'center', key: 'signDate',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.signDate, 'YYYY-MM-DD'));
                        }
                    },
                    { title: '到期时间', width: 120, align: 'center', key: 'expirationDate',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.expirationDate, 'YYYY-MM-DD'));
                        }
                    },
                    { title: '状态', width: 120, align: 'center', key: 'contractStatusLabel' },
                    { title: '管理人', width: 120, align: 'center', key: 'createName' }
                ],
                tableData: [
                    {
                        insTime: '2018-09-21 08:50:08',
                        employeeName: '小陈',
                        signDate: '2018-09-21',
                        expirationDate: '2018-09-21',
                        contractStatusLabel: '合同期',
                        createName: '陈主任'
                    }
                ],
                tableLoading: false,

                currentRow: {
                    laborContractId: '',
                    employeeId: '',
                    employeeName: ''
                },

                // 字典
                departmentList: [],
                dict_employeeType: [],
                dict_unitList: []
            };
        },
        mounted() {
            this.getData();
            this.getDeparmentList('', 'departmentList');
            this.getDicts(['employeeType']);  // 员工类型
            this.getUnitList('dict_unitList');  // 归属单位
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
        methods:{
            addLaborContract() {
                this.currentRow.laborContractId = '';
                this.currentRow.employeeId = '';
                this.currentRow.employeeName = '';
                this.$refs.modal_laborContractHandle.modalValue = true;
            },
            resetSearchParams() {
                this.searchParams.condition.departmentId = '';
                this.searchParams.condition.searchKey = '';
            },
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/laborContract/list',
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
        }
    }
</script>

<style lang="scss" scoped>
    .laborContractManage-container {
    }
</style>
