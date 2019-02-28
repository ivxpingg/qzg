<template>
    <Modal v-model="modalValue"
           class="inStaffHandle-container"
           title="任职记录"
           :width="850"
           footer-hide
           @on-visible-change="onVisibleChange">
        <div class="ivx-table-box">
            <Table border
                   height="350"
                   :loading="tableLoading"
                   :columns="tableColumns"
                   :data="tableData"></Table>
        </div>
    </Modal>
</template>

<script>
    import modalMixin from '../../../../lib/mixin/modalMixin';
    import comMixin from '../../../../lib/mixin/comMixin';
    export default {
        name: 'workRecord',
        mixins: [modalMixin, comMixin],
        props: {
            employeeId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                tableLoading: false,
                tableColumns: [
                    { title: '员工名称', width: 120, align: 'center', key: 'employeeName' },
                    { title: '变动类型', width: 120, align: 'center', key: 'changeTypeLabel' },
                    { title: '变动时间', width: 150, align: 'center', key: 'changeTime' },
                    { title: '变动结果', minWidth: 120, align: 'center', key: 'changeResult' },
                    { title: '操作人', width: 120, align: 'center', key: 'createName' },
                    { title: '操作时间', width: 150, align: 'center', key: 'insTime',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.insTime, 'YYYY-MM-DD HH:mm:ss'));
                        }
                    }
                ],
                tableData: [
                    {
                        // employeeName: '姓名',
                        // changeTypeLabel: '辞职',
                        // changeTime: '2018-10-10 09:09:09',
                        // changeResult: '单位1调动至单位2',
                        // create: '陈科长',
                        // insTime: '2018-10-10 09:09:09'
                    }
                ],
            };
        },
        watch: {
            'searchParams.current'() {
                this.getData();
            },
            employeeId(val) {
                if(val) {
                    this.getData();
                }
            }
        },
        methods: {
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'get',
                    url: '/employeeRecord/query',
                    params: {
                        employeeId: this.employeeId
                    }
                }).then((res) => {
                    this.tableLoading = false;
                    if (res.code === 'SUCCESS') {
                        this.tableData = res.data || [];
                    }
                }).catch(() => {
                    this.tableLoading = false;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .workRecord-container {
    }
</style>