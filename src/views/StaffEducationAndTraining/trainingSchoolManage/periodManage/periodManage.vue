<template>
    <Modal v-model="modalValue"
           class="periodManage-container"
           title="学时"
           :width="1200"
           footer-hide
           @on-visible-change="onVisibleChange">
        <div class="ivx-table-box">
            <Table border
                   height="400"
                   :loading="tableLoading"
                   :columns="_tableColumns"
                   :data="tableData"></Table>
        </div>
    </Modal>
</template>

<script>
    import modalMixin from '../../../../lib/mixin/modalMixin';
    import comMixin from '../../../../lib/mixin/comMixin';
    export default {
        name: 'periodManage',  // 学时管理
        mixins: [modalMixin, comMixin],
        props: {
            courseId: {
                type: String,
                default: ''
            }
        },
        computed: {
            _tableColumns() {
                let column = [];

                if (!this.auth_update) {
                    column.push({ title: '打卡学时', minWidth: 120, align: 'center',
                        render: (h, params) => {
                            return h('InputNumber', {
                                props: {
                                    value: params.row.period,
                                    editable: false,
                                    min: 0,
                                    size: 'large',
                                    formatter: value => `${value}小时`,
                                    parser: value => value.replace('小时', '')
                                },
                                on: {
                                    'on-change': (value) => {
                                        this.$http({
                                            method: 'get',
                                            url: '/period/update',
                                            params: {
                                                period: value,
                                                periodId: params.row.periodId
                                            }
                                        }).then((res) => {
                                            if (res.code === 'SUCCESS') {
                                                this.$Message.success('修改成功！');
                                            }
                                        }).catch(() => {})
                                    }
                                }
                            })
                        }
                    });
                    column.push({
                        title: '操作', minWidth: 200, align: 'center',
                        render: (h, params) => {
                            let list = [];
                            // list.push(h('Button', {
                            //     props: {
                            //         type: 'primary',
                            //         size: 'small',
                            //         icon: 'ios-notifications'
                            //     },
                            //     on: {
                            //         click: () => {
                            //            this.$Message.info('通知什么todo');
                            //         }
                            //     }
                            // }, '通知'));
                            //
                            if (params.row.certificateStatus === '0') {
                                list.push(h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        icon: 'md-send'
                                    },
                                    on: {
                                        click: () => {
                                            this.$Modal.confirm({
                                                title: '提示',
                                                content: '确定要下发证书?',
                                                onOk: () => {
                                                    this.$http({
                                                        method: 'get',
                                                        url: '/period/grant',
                                                        params: {
                                                            courseId: params.row.courseId,
                                                            userId: params.row.userId
                                                        }
                                                    }).then((res) => {
                                                        if (res.code === 'SUCCESS') {
                                                            this.$Message.success('下发成功！');
                                                            this.getData();
                                                        }
                                                    }).catch(() => {
                                                    })
                                                }
                                            })
                                        }
                                    }
                                }, '下发证书'))
                            }
                            else if (params.row.certificateStatus === '1') {
                                list.push(h('span', '已下发证书'));
                            }

                            return h('div',{
                                style: { },
                                class: 'ivx-table-cell-handle'
                            },list);
                        }
                    })

                }
                else {
                    column.push({ title: '打卡学时', minWidth: 120, align: 'center',
                        render(h, params) {
                            return h('div', params.row.period + '小时');
                        }
                    });
                }



                return this.tableColumns.concat(column);
            }
        },
        data() {
            return {
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '员工名称', width: 120, align: 'center', key: 'userName' },
                    { title: '报名时间', width: 180, align: 'center',
                        render: (h, params) => {
                            let str = this.timeFormat(params.row.insTime, 'YYYY-MM-DD HH:mm:ss');
                            return h('div', str);
                        }
                    },
                    // { title: '电话', width: 120, align: 'center', key: 'phone' },
                    // { title: '部门', minWidth: 120, align: 'center', key: 'departmentName' },
                    { title: '状态', minWidth: 120, align: 'center', key: 'status',
                        render: (h, params) => {
                            return h('span', params.row.status === '1' ? '已完成' : '学习中')
                        }
                    }
                ],
                tableData: [
                    {
                        employeeName: '小陈',
                        signTime: '2018-09-21',
                        phone: '13592625355',
                        departmentName: '办公室',
                        period: 0
                    }
                ],
                tableLoading: false,
            };
        },
        watch: {
            courseId: {
                immediate: true,
                handler(val) {
                    if (val) {
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
                this.$http({
                    method: 'get',
                    url: '/period/query',
                    params: {
                        courseId: this.courseId
                    }
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.tableData = res.data;
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
   
</style>