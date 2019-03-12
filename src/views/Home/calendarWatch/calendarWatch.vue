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
                           height="300"
                           :loading="tableLoading"
                           :columns="tableColumns"
                           :data="tableData"></Table>
                </div>
            </div>
        </div>

        <vApplyLeaveOrGoout ref="modal_applyLeaveOrGoout" @modal-callback="modal_callback"></vApplyLeaveOrGoout>
    </Card>
</template>

<script>
    import comMixin from '../../../lib/mixin/comMixin';
    import vApplyLeaveOrGoout from './apply/applyLeaveOrGoout';
    export default {
        name: 'calendarWatch',
        mixins: [comMixin],
        components: {vApplyLeaveOrGoout},
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
                    { title: '状态', width: 90, align: 'center', key: 'leaveStatusLabel' }
                ],
                tableData: [
                    {
                        insTime: '2018-09-21  08:50:08',
                        employeeName: '公出',
                        employeeStatusLabel: '审核通过'
                    }
                ],
                tableLoading: false
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
                width: 400px;
            }
            .right-panel {
                float: left;
                width: calc(100% - 400px);
            }
        }
        .calendar {
            width: 400px;
        }
    }
</style>