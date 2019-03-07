<template>
    <div class="documentAuth-container">
        <div class="ivx-table-box">
            <Table border
                   height="330"
                   size="small"
                   :loading="tableLoading"
                   :columns="_tableColumns"
                   :data="dict_archiveType"></Table>
        </div>
        <div class="ivu-modal-footer" style="padding-bottom: 0;">
            <Button type="primary"
                    size="large"
                    @click="saveDocumentAuth">保存</Button>
        </div>
    </div>
</template>

<script>
    import modalMixin from '../../../../lib/mixin/modalMixin';
    import comMixin from '../../../../lib/mixin/comMixin';
    export default {
        name: 'documentAuth',  // 文档权限
        mixins: [modalMixin, comMixin],
        props: {
            roleId: {
                type: String,
                default: ''
            }
        },
        computed: {
            _tableColumns() {
                let column = [{ title: '权限', width: 200, align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Checkbox', {
                                props: {
                                    value: this.getValue(params.row.value, 'apply')
                                },
                                on: {
                                    'on-change':(value) => {
                                        if (value) {
                                            this.authData.push({
                                                roleId: this.roleId,
                                                archiveType: params.row.value,
                                                permission: 'apply'
                                            });

                                            for (let i = 0; i < this.authData.length; i++) {
                                                if(this.authData[i].archiveType === params.row.value && this.authData[i].permission === 'view') {
                                                    this.authData.splice(i, 1);
                                                }
                                            }
                                        }
                                        else {
                                            for (let i = 0; i < this.authData.length; i++) {
                                                if(this.authData[i].archiveType === params.row.value && this.authData[i].permission === 'apply') {
                                                    this.authData.splice(i, 1);
                                                }
                                            }
                                        }
                                    }
                                }
                            }, '可申请'),
                            h('Checkbox', {
                                props: {
                                    value: this.getValue(params.row.value, 'view')
                                },
                                on: {
                                    'on-change':(value) => {
                                        if (value) {
                                            this.authData.push({
                                                roleId: this.roleId,
                                                archiveType: params.row.value,
                                                permission: 'view'
                                            });

                                            for (let i = 0; i < this.authData.length; i++) {
                                                if(this.authData[i].archiveType === params.row.value && this.authData[i].permission === 'apply') {
                                                    this.authData.splice(i, 1);
                                                }
                                            }
                                        }
                                        else {
                                            for (let i = 0; i < this.authData.length; i++) {
                                                if(this.authData[i].archiveType === params.row.value && this.authData[i].permission === 'view') {
                                                    this.authData.splice(i, 1);
                                                }
                                            }
                                        }
                                    }
                                }
                            }, '可查看')
                        ]);
                    }
                }];

                return this.tableColumns.concat(column);
            }
        },
        data() {
            return {
                saveBtnLoading: false,
                tableLoading: false,
                tableColumns: [
                    { title: '类型', minWidth: 140, align: 'center', key: 'label' }
                ],
                tableData: [],
                // 档案对应的用户权限
                authData: [],

                dict_archiveType: [],
            };
        },
        watch: {
            roleId(val) {
                if (val) {
                    this.getRoleArchiveList();
                }
            }
        },
        mounted() {
            this.getDicts(['archiveType']);
            // this.getUserList();
        },
        methods: {
            getValue(archiveType, permission) {
                for(let i = 0; i< this.authData.length; i++) {
                    if (this.authData[i].archiveType === archiveType && this.authData[i].permission === permission) {
                        return true;
                    }
                }
                return false;
            },
            // 根据角色获取档案权限
            getRoleArchiveList() {
                this.$http({
                    method: 'get',
                    url: '/archive/getRoleArchiveList',
                    params: {
                        roleId: this.roleId
                    }
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.authData = res.data || [];
                    }
                })
            },
            // 保存角色文档类型权限
            saveDocumentAuth() {
                this.$http({
                    method: 'post',
                    url: '/archive/roleArchiveAuth',
                    data: JSON.stringify(this.authData)
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.$Message.success({
                            content: '文档权限保存成功！'
                        });
                    }
                })
            }

        }
    }
</script>

<style lang="scss" scoped>
    .documentAuth-container {
    }
</style>