<template>
    <Card class="calendarWatch-container" title="请假公出情况" :dis-hover="true">
        <a href="#" slot="extra" @click.prevent="changeLimit">
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
    </Card>
</template>

<script>
    import comMixin from '../../../lib/mixin/comMixin';
    export default {
        name: 'calendarWatch',
        mixins: [comMixin],
        data() {
            return {
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '时间', minWidth: 150, align: 'center', key: 'insTime',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.insTime, 'YYYY-MM-DD HH:mm:ss'));
                        }
                    },
                    { title: '类型', width: 90, align: 'center', key: 'employeeName' },
                    { title: '状态', width: 90, align: 'center', key: 'employeeStatusLabel' }
                ],
                tableData: [
                    {
                        insTime: '2018-09-21  08:50:08',
                        employeeName: '公出',
                        employeeStatusLabel: '审核通过'
                    }
                ],
            };
        },
        mounted() {
            this.initCalendar();
        },
        methods: {
            initCalendar() {
                $("#my_calendar").zabuto_calendar({
                    language: "cn",
                    today: true,
                    show_days: true,
                    action: function () {
                        var date = $("#" + this.id).data("date");
                        console.dir(date);
                    }
                });
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