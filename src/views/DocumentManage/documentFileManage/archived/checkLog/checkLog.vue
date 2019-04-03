<template>
    <Modal v-model="modalValue"
           title="查阅日志"
           width="860"
           footer-hide
           @on-visible-change="onVisibleChange">

        <div class="ivx-table-box">
            <Table border
                   height="340"
                   size="small"
                   :loading="tableLoading"
                   :columns="tableColumns"
                   :data="tableData"></Table>
        </div>
    </Modal>
</template>

<script>
    import modalMixin from '../../../../../lib/mixin/modalMixin';
    import comMixin from '../../../../../lib/mixin/comMixin';
    export default {
        name: 'checkLog',  // 查阅日志
        mixins: [modalMixin, comMixin],
        props: {
            archiveId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                tableLoading: false,
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '申请时间', width: 150, align: 'center', key: 'insTime',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.insTime, 'YYYY-MM-DD HH:mm:ss'));
                        }
                    },
                    { title: '申请人', width: 120, align: 'center', key: 'applyPerson' },
                    { title: '申请用途', minWidth: 150, align: 'center', key: 'useFor' },
                    { title: '审核人', width: 120, align: 'center', key: 'auditor' },
                    { title: '通过时间', width: 150, align: 'center', key: 'auditTime',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.auditTime, 'YYYY-MM-DD HH:mm:ss'));
                        }
                    }
                ],
                tableData: [],
            };
        },
        watch: {
            archiveId(val) {
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
                    url: '/archive/archiveConsultApplyList',
                    params: {
                        archiveId: this.archiveId
                    }
                }).then(res => {
                    this.tableLoading = false;
                    if(res.code === 'SUCCESS') {
                        this.tableData = res.data || [];
                    }
                }).catch(e => {
                    this.tableLoading = false;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .checkLog-container {
    }
</style>