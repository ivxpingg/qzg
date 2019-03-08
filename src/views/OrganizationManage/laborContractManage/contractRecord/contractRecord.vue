<template>
    <Modal v-model="modalValue"
           class="contractRecord-container"
           title="签订记录"
           :width="900"
           @on-visible-change="onVisibleChange">

        <div class="ivx-table-box">
            <Table border
                   height="350"
                   :loading="tableLoading"
                   :columns="_tableColumns"
                   :data="tableData"></Table>
        </div>
        <vViewFiles ref="modal_viewFiles" :data="viewFileData"></vViewFiles>
    </Modal>
</template>

<script>
    import modalMixin from '../../../../lib/mixin/modalMixin';
    import comMixin from '../../../../lib/mixin/comMixin';
    import authMixin from '../../../../lib/mixin/authMixin';
    import viewFilesMixin from '../../../Common/viewFiles/mixin';
    export default {
        name: 'contractRecord',  // 合同记录
        mixins: [modalMixin, comMixin, authMixin, viewFilesMixin],
        props: {
            laborContractId: {
                type: String,
                default: ''
            },
        },
        computed: {
            _tableColumns() {
                let column = [{ title: '操作', minWidth: 160, align: 'center',
                    render: (h, params) => {
                        let list = [];

                        list.push(h('Button', {
                            props: {
                                type: 'info',
                                size: 'small',
                                icon: 'ios-eye'
                            },
                            on: {
                                click: () => {
                                    this.getData_vViewFile(params.row.contractRecordId, 'contract', 'viewFileData');
                                    this.$refs.modal_viewFiles.modalValue = true;
                                    // this.currentRow.laborContractId = params.row.laborContractId;
                                    // this.$refs.modal_jobHandle.modalValue = true;
                                }
                            }
                        }, '查看合同'));

                        if (this.auth_del) {
                            list.push(h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small',
                                    icon: 'ios-trash'
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: '提示',
                                            content: `确定要删除《${params.row.employeeName}》的合同？`,
                                            onOk: () => {
                                                this.$http({
                                                    method: 'get',
                                                    url: '/contractRecord/delete',
                                                    params: {
                                                        laborContractId: params.row.laborContractId,
                                                        contractRecordId: params.row.contractRecordId
                                                    }
                                                }).then((res) => {
                                                    if (res.code === 'SUCCESS') {
                                                        this.$Message.success('删除成功！');
                                                        if (this.tableData.length === 1) {
                                                            this.modalValue = false;
                                                            this.$emit('modal-callback');
                                                        }
                                                        else {
                                                            this.getData();
                                                        }

                                                        this.$emit('call-back');
                                                    }
                                                }).catch(() => {})
                                            }
                                        })
                                    }
                                }
                            }, '删除'));
                        }

                        return h('div',{
                            style: { },
                            class: 'ivx-table-cell-handle'
                        },list);
                    }
                }];
                return this.tableColumns.concat(column);
            }
        },
        data() {
            return {
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '人员', width: 110, align: 'center', key: 'employeeName' },
                    { title: '签订时间', width: 110, align: 'center', key: 'signDate',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.signDate, 'YYYY-MM-DD'));
                        }
                    },
                    { title: '到期时间', width: 110, align: 'center', key: 'expirationDate',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.expirationDate, 'YYYY-MM-DD'));
                        }
                    },
                    { title: '管理人', width: 110, align: 'center', key: 'createName' },
                    { title: '操作时间', width: 150, align: 'center', key: 'insTime',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.insTime, 'YYYY-MM-DD HH:mm:ss'));
                        }
                    }
                ],
                tableData: [
                    {
                        insTime: '2018-09-21 08:50:08',
                        employeeName: '小陈',
                        signDate: '2018-09-21',
                        expirationDate: '2018-09-21',
                        createName: '陈主任'
                    }
                ],
                tableLoading: false,

                // 查看附件数据
                viewFileData: []
            };
        },
        watch: {
            laborContractId: {
                immediate: true,
                handler(val) {
                    if(val) {
                        this.getData();
                    }
                    else {
                       this.tableData = [];
                    }
                }
            }
        },
        methods: {
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'get',
                    url: '/contractRecord/list',
                    params: {
                        laborContractId: this.laborContractId
                    }
                }).then(res => {
                    this.tableLoading = false;
                    if (res.code === 'SUCCESS') {
                        this.tableData = res.data;
                    }
                }).catch(e => {
                    this.tableLoading = false;
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .contractRecord-container {
    }
</style>