<template>
    <div class="staffRecordManage-container">
        <vIvxFilterBox>
            <Form inline>
                <FormItem label="归属部门:" :label-width="65">
                    <Select v-model="searchParams.condition.departmentId">
                        <Option v-for="item in dict_department"
                                :key="item.departmentId"
                                :value="item.departmentId"
                                :label="item.unitName + '-' + item.departmentName"></Option>
                    </Select>
                </FormItem>
                <FormItem label="员工状态:" :label-width="65">
                    <Select v-model="searchParams.condition.employeeStatus" style="width: 70px;">
                        <Option v-for="item in dict_employeeStatus"
                                :key="item.id"
                                :value="item.value"
                                :label="item.label"></Option>
                    </Select>
                </FormItem>
                <FormItem label="姓名:" :label-width="45">
                    <Input v-model="searchParams.condition.employeeName"
                           style="width: 120px;"
                           placeholder="姓名"/>
                </FormItem>

                <FormItem label="时间:" :label-width="45">
                    <DatePicker ref="datePicker"
                                type="daterange"
                                @on-change="onChage_daterange"
                                placeholder="选择时间"
                                style="width: 180px;"></DatePicker>
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
            <Button type="primary" icon="md-add" @click="addOutStaff">新增编外人员</Button>
            <Button type="info" icon="md-clipboard" @click="openRecordView">人事变动记录</Button>
            <Button type="info" icon="md-download" @click="onClick_exportExcel">导出花名册</Button>
            <Upload ref="upload" :action="action" :show-upload-list="true" :on-success="onSuccess_upload" :on-error="onSuccess_error">
                <Button type="primary" icon="ios-cloud-upload-outline" >导入员工信息</Button>
            </Upload>
            <Button type="info" icon="md-download" to="/员工信息导入模板.xlsm" target="_blank" download="员工信息导入模板.xlsm">下载模板</Button>
            <Select v-model="searchParams.condition.employeeType" style="width: 100px; float: right;">
                <Option v-for="item in dict_employeeType"
                        :key="item.id"
                        :value="item.value"
                        :label="item.label"></Option>
            </Select>
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
        <vInStaffHandle ref="modal_inStaffHandle"
                        :employeeId="inStaff_employeeId"
                        :type="inStaffType"
                        @modal-callback="getData"></vInStaffHandle>

        <!--新增编外人员-->
        <vOutStaffHandle ref="modal_outStaffHandle"
                         :employeeId="outStaff_employeeId"
                         :type="outStaffType"
                         @modal-callback="getData"></vOutStaffHandle>
        <!--任职记录-->
        <vWorkRecord ref="modal_workRecord"
                     :employeeId="workRecord_employeeId"></vWorkRecord>
        <!--人事调整-->
        <vStaffAdjust ref="modal_staffAdjust"
                      :employeeId="staffAdjust_employeeId"
                      :employeeName="staffAdjust_employeeName"></vStaffAdjust>
        <!--人事变动记录-->
        <vRecordView ref="modal_recordView"></vRecordView>

        <!--导出-->
        <vExportExcel ref="modal_exportExcel"></vExportExcel>
    </div>
</template>

<script>
    import comMixin from '../../../lib/mixin/comMixin';
    import authMixin from '../../../lib/mixin/authMixin';
    import vInStaffHandle from './addOrEditOrView/inStaffHandle';
    import vOutStaffHandle from './addOrEditOrView/outStaffHandle';
    import vWorkRecord from './workRecord/workRecord';
    import vStaffAdjust from './staffAdjust/staffAdjust';
    import vRecordView from './recordView/recordView';
    import vExportExcel from './exportExcel/exportExcel';
    import Config from '../../../config';
    export default {
        name: 'staffRecordManage',  // 员工档案管理
        mixins: [comMixin, authMixin],
        components: {vInStaffHandle, vOutStaffHandle, vWorkRecord, vStaffAdjust, vRecordView, vExportExcel},
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
                                        if (params.row.employeeType === 'in_staff') {
                                            this.inStaffType = 'edit';
                                            this.inStaff_employeeId = params.row.employeeId;
                                            this.$refs.modal_inStaffHandle.modalValue = true;
                                        }
                                        else if (params.row.employeeType === 'out_staff') {
                                            this.outStaffType = 'edit';
                                            this.outStaff_employeeId = params.row.employeeId;
                                            this.$refs.modal_outStaffHandle.modalValue = true;
                                        }
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
                                    if (params.row.employeeType === 'in_staff') {
                                        this.inStaffType = 'view';
                                        this.inStaff_employeeId = params.row.employeeId;
                                        this.$refs.modal_inStaffHandle.modalValue = true;
                                    }
                                    else if (params.row.employeeType === 'out_staff') {
                                        this.outStaffType = 'view';
                                        this.outStaff_employeeId = params.row.employeeId;
                                        this.$refs.modal_outStaffHandle.modalValue = true;
                                    }
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
                                    this.workRecord_employeeId = params.row.employeeId;
                                    this.$refs.modal_workRecord.modalValue = true;
                                }
                            }
                        }, '任职记录'));

                        if (this.auth_update) {
                            list.push(h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    icon: 'md-contacts'
                                },
                                on: {
                                    click: () => {
                                        this.staffAdjust_employeeId = params.row.employeeId;
                                        this.staffAdjust_employeeName = params.row.employeeName;
                                        this.$refs.modal_staffAdjust.modalValue = true;
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
            },
            action() {
                return Config[Config.env].origin + Config[Config.env].ajaxUrl + '/employee/exportEmployee';
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
                        employeeType: 'in_staff',
                        beginTime: '',
                        endTime: ''
                    }
                },
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '时间', width: 150, align: 'center', key: 'insTime',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.insTime, 'YYYY-MM-DD HH:mm:ss'));
                        }
                    },
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

                // vInStaffHandle 组件状态 add/edit/view
                inStaffType: 'add',
                inStaff_employeeId: '',
                // vOutStaffHandle 组件状态 add/edit/view
                outStaffType: 'add',
                outStaff_employeeId: '',

                // 任职记录
                workRecord_employeeId: '',
                // 人事调整
                staffAdjust_employeeId: '',
                staffAdjust_employeeName: '',

                // 字典
                dict_employeeStatus: [],
                dict_employeeType: [],
                dict_department: [],
            };
        },
        watch: {
            'searchParams.current'() {
                this.getData();
            },
            'searchParams.condition': {
                deep: true,
                handler(val) {
                    this.getData();
                }
            }
        },
        mounted() {
            this.getData();
            this.getDicts(['employeeStatus', 'employeeType']);
            this.getDeparmentList('', 'dict_department');
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
            addInStaff() {
                this.inStaffType = 'add';
                this.inStaff_employeeId = '';
                this.$refs.modal_inStaffHandle.modalValue = true;
            },
            addOutStaff() {
                this.outStaffType = 'add';
                this.outStaff_employeeId = '';
                this.$refs.modal_outStaffHandle.modalValue = true;
            },
            openRecordView() {
                this.$refs.modal_recordView.modalValue = true;
            },
            onClick_exportExcel() {
                this.$refs.modal_exportExcel.modalValue = true;
            },
            onSuccess_upload(response) {
                if (response.code === 'SUCCESS') {
                    this.$Message.success('上传成功');
                    this.getData();
                    this.$refs.upload.clearFiles();
                }
                else {
                    this.$Message.error({
                        content: response.msg,
                        duration: 5
                    });
                    this.$refs.upload.clearFiles();
                }
            },
            onSuccess_error() {
                this.$Message.error('上传失败');
                this.$refs.upload.clearFiles();
            }

        }
    }
</script>

<style lang="scss" scoped>
    .staffRecordManage-container {
    }
</style>