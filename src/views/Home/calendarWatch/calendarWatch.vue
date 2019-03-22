<template>
    <Card class="calendarWatch-container" title="请假公出情况" :dis-hover="true">
        <a href="#" slot="extra" @click.prevent="onClick_apply">
            <Icon type="md-create"></Icon>
            填写申请
        </a>

        <div class="box-panel">
            <div class="left-panel"><div id="my_calendar" class="calendar"></div></div>
            <div class="right-panel">
                <div style="padding-left: 10px;">
                    <Table border
                           height="320"
                           :loading="tableLoading"
                           :columns="tableColumns"
                           :data="tableData"></Table>
                </div>
            </div>
        </div>

        <vApplyLeaveOrGoout ref="modal_applyLeaveOrGoout" @modal-callback="modal_callback"></vApplyLeaveOrGoout>

        <vAuditOrView ref="modal_applyPage"
                      :type="modal_applyPage_props.type"
                      :relationId="modal_applyPage_props.relationId"
                      :leaveType="modal_applyPage_props.leaveType"
                      @callback="callback"></vAuditOrView>
    </Card>
</template>

<script>
    import comMixin from '../../../lib/mixin/comMixin';
    import vApplyLeaveOrGoout from './apply/applyLeaveOrGoout';
    import vAuditOrView from '../../OrganizationManage/leaveManage/add/auditOrView';
    export default {
        name: 'calendarWatch',
        mixins: [comMixin],
        components: {vApplyLeaveOrGoout, vAuditOrView},
        data() {
            return {
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '时间', minWidth: 150, align: 'center', key: 'beginTime',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.beginTime, 'YYYY-MM-DD'));
                        }
                    },
                    { title: '类型', width: 90, align: 'center', key: 'leaveTypeLabel' },
                    { title: '状态', width: 90, align: 'center', key: 'leaveStatusLabel' },
                    {
                        title: '操作', width: 90, align: 'center',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small',
                                    icon: 'ios-eye'
                                },
                                on: {
                                    click: () => {
                                        this.modal_applyPage_props.relationId = params.row.leaveApplyId;
                                        this.modal_applyPage_props.leaveType = params.row.leaveType;
                                        if (params.row.leaveStatus === 'wait_audit') {
                                            this.modal_applyPage_props.type = 'audit';
                                        }
                                        else {
                                            this.modal_applyPage_props.type = 'view';
                                        }
                                        this.$refs.modal_applyPage.modalValue = true;
                                    }
                                }
                            }, '查看')
                        }
                    }
                ],
                tableData: [
                    {
                        insTime: '2018-09-21  08:50:08',
                        employeeName: '公出',
                        employeeStatusLabel: '审核通过'
                    }
                ],
                tableLoading: false,

                modal_applyPage_props: {
                    relationId: '',
                    leaveType: 'leave',
                    type: 'view'
                }
            };
        },
        mounted() {
            this.initCalendar();
            this.getData(this.$moment().format('YYYY-MM-DD'));
        },
        methods: {
            initCalendar() {
                let that = this;
                $("#my_calendar").zabuto_calendar({
                    language: "cn",
                    today: true,
                    show_days: true,
                    action: function () {
                        let date = $("#" + this.id).data("date");
                        that.getData(date);
                    }
                });
            },
            getData(queryDate) {
                this.tableLoading = true;
                this.$http({
                    method: 'get',
                    url: '/index/leaveInfo',
                    params: {
                        queryDate: queryDate
                    }
                }).then(res => {
                    this.tableLoading = false;
                    if (res.code === 'SUCCESS') {
                        this.tableData = res.data || [];
                    }
                }).catch(e => {
                    this.tableLoading = false;
                })
            },

            onClick_apply() {
                this.$refs.modal_applyLeaveOrGoout.modalValue = true;
            },
            modal_callback() {
                this.getData(this.$moment().format('YYYY-MM-DD'));
            }
        }
    }
</script>

<style lang="scss" scoped>
    .calendarWatch-container {
        .box-panel {
            overflow: hidden;

            .left-panel {
                float: left;
                width: 300px;
            }
            .right-panel {
                float: left;
                width: calc(100% - 300px);
            }
        }
        .calendar {
            width: 300px;
        }
    }
</style>