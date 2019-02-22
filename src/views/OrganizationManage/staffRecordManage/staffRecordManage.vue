<template>
    <div class="staffRecordManage-container">
        <vIvxFilterBox>
            <Form inline>
                <FormItem label="归属部门:" :label-width="65">
                    <!--<Select v-model="searchParams.condition.operateType" style="width: 100px;">-->
                        <!--<Option v-for="item in dict_operateType"-->
                                <!--:key="item.id"-->
                                <!--:value="item.value"-->
                                <!--:label="item.label"></Option>-->
                    <!--</Select>-->
                </FormItem>
                <FormItem label="员工状态:" :label-width="65">
                    <Select v-model="searchParams.condition.employeeStatus" style="width: 100px;">
                        <Option v-for="item in dict_employeeStatus"
                                :key="item.id"
                                :value="item.value"
                                :label="item.label"></Option>
                    </Select>
                </FormItem>
                <FormItem label="姓名:" :label-width="65">
                    <Input v-model="searchParams.condition.employeeName"
                           style="width: 120px;"
                           placeholder="姓名"/>
                </FormItem>
                <FormItem label="创建人:" :label-width="65">
                    <Input v-model="searchParams.condition.operator"
                           style="width: 200px;"
                           placeholder="创建人"/>
                </FormItem>
                <FormItem label="时间:" :label-width="65">
                    <DatePicker ref="datePicker"
                                type="daterange"
                                @on-change="onChage_daterange"
                                placeholder="选择时间"
                                style="width: 200px;"></DatePicker>
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
            <Button type="primary" icon="md-add" @click="addInStaff">新增在编人员</Button>
            <Button type="primary" icon="md-add" @click="addInStaff">新增编外人员</Button>
            <Button type="info" icon="md-download" @click="addInStaff">导出花名册</Button>
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

        <!--在编人员-->
        <vInStaffHandle ref="modal_inStaffHandle"></vInStaffHandle>

        <!--新增编外人员-->
        <vOutStaffHandle></vOutStaffHandle>
    </div>
</template>

<script>
    import comMixin from '../../../lib/mixin/comMixin';
    import authMixin from '../../../lib/mixin/authMixin';
    import vInStaffHandle from './addOrEditOrView/inStaffHandle';
    import vOutStaffHandle from './addOrEditOrView/outStaffHandle';
    export default {
        name: 'staffRecordManage',  // 员工档案管理
        mixins: [comMixin, authMixin],
        components: {vInStaffHandle, vOutStaffHandle},
        computed: {
            _tableColumns() {
                let column = [{ title: '操作', minWidth: 360, align: 'center',
                    render: (h, params) => {
                        let list = [];
                        if (!this.auth_update) {
                            list.push(h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    icon: 'ios-create'
                                },
                                on: {
                                    click: () => {
                                        this.editCurrentRow.departmentId = params.row.departmentId;
                                        this.$refs.modal_editDepartment.modalValue = true;
                                    }
                                }
                            }, '编辑'));
                        }

                        list.push(h('Button', {
                            props: {
                                type: 'info',
                                size: 'small',
                                icon: 'ios-eye'
                            },
                            on: {
                                click: () => {
                                    this.editCurrentRow.departmentId = params.row.departmentId;
                                    this.$refs.modal_editDepartment.modalValue = true;
                                }
                            }
                        }, '查看'));

                        list.push(h('Button', {
                            props: {
                                type: 'info',
                                size: 'small',
                                icon: 'ios-list'
                            },
                            on: {
                                click: () => {
                                    this.editCurrentRow.departmentId = params.row.departmentId;
                                    this.$refs.modal_editDepartment.modalValue = true;
                                }
                            }
                        }, '任职记录'));

                        if (!this.auth_update) {
                            list.push(h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    icon: 'md-contacts'
                                },
                                on: {
                                    click: () => {

                                    }
                                }
                            }, '人事调整'));
                        }

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
                        employeeStatus: '',
                        employeeName: '',
                        operator: '',
                        beginTime: '',
                        endTime: ''
                    }
                },
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '时间', width: 150, align: 'center', key: 'insTime' },
                    { title: '员工名称', width: 120, align: 'center', key: 'employeeName' },
                    { title: '部门', width: 120, align: 'center', key: 'departmentName' },
                    { title: '联系电话', width: 120, align: 'center', key: 'phone' },
                    { title: '职务', width: 120, align: 'center', key: 'dutyName' },
                    { title: '状态', width: 100, align: 'center', key: 'employeeStatusLabel' }
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
                dict_department: []
            };
        },
        methods: {
            onChage_daterange(value) {
                this.searchParams.condition.beginTime = value[0];
                this.searchParams.condition.endTime = value[1];
            },
            resetSearchParams() {
                this.searchParams.condition.departmentId = '';
                this.searchParams.condition.employeeStatus = '';
                this.searchParams.condition.employeeName = '';
                this.searchParams.condition.operator = '';
                this.searchParams.condition.beginTime = '';
                this.searchParams.condition.endTime = '';
                this.$refs.datePicker.handleClear();
            },
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/',
                    data: JSON.stringify(this.searchParams)
                }).then((res) => {
                    this.tableLoading = false;
                    if (res.code === 'SUCCESS') {
                        this.tableData = res.data.records;
                        this.searchParams.total = res.data.page.total;
                    }
                }).catch(() => {
                    this.tableLoading = false;
                })
            },
            addInStaff() {
                this.$refs.modal_inStaffHandle.modalValue = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .staffRecordManage-container {
    }
</style>