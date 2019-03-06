<template>
    <Modal v-model="modalValue"
           title="文件权限分配"
           @on-visible-change="onVisibleChange">

        <div class="ivx-table-box">
            <Table border
                   height="340"
                   size="small"
                   :loading="tableLoading"
                   :columns="_tableColumns"
                   :data="tableData"></Table>
        </div>

        <div slot="footer">
            <Button type="primary"
                    size="large"
                    :loading="saveBtnLoading"
                    @click="save">保存</Button>
        </div>
    </Modal>
</template>

<script>
    import modalMixin from '../../../../../lib/mixin/modalMixin';
    import comMixin from '../../../../../lib/mixin/comMixin';
    export default {
        name: 'authorize', // 授权
        mixins: [modalMixin, comMixin],
        props: {
            archiveId: {
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
                                    value: this.getValue(params.row.userId, 'apply')
                                },
                                on: {
                                    'on-change':(value) => {
                                        if (value) {
                                            this.authData.push({
                                                archiveId: this.archiveId,
                                                userId: params.row.userId,
                                                permission: 'apply'
                                            });

                                            for (let i = 0; i < this.authData.length; i++) {
                                                if(this.authData[i].userId === params.row.userId && this.authData[i].permission === 'view') {
                                                    this.authData.splice(i, 1);
                                                }
                                            }
                                        }
                                        else {
                                            for (let i = 0; i < this.authData.length; i++) {
                                                if(this.authData[i].userId === params.row.userId && this.authData[i].permission === 'apply') {
                                                    this.authData.splice(i, 1);
                                                }
                                            }
                                        }
                                    }
                                }
                            }, '可申请'),
                            h('Checkbox', {
                                props: {
                                    value: this.getValue(params.row.userId, 'view')
                                },
                                on: {
                                    'on-change':(value) => {
                                        if (value) {
                                            this.authData.push({
                                                archiveId: this.archiveId,
                                                userId: params.row.userId,
                                                permission: 'view'
                                            });

                                            for (let i = 0; i < this.authData.length; i++) {
                                                if(this.authData[i].userId === params.row.userId && this.authData[i].permission === 'apply') {
                                                    this.authData.splice(i, 1);
                                                }
                                            }
                                        }
                                        else {
                                            for (let i = 0; i < this.authData.length; i++) {
                                                if(this.authData[i].userId === params.row.userId && this.authData[i].permission === 'view') {
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
                    { title: '用户', minWidth: 140, align: 'center', key: 'name' }
                ],
                tableData: [],
                // 档案对应的用户权限
                authData: [],
            };
        },
        watch: {
            archiveId(val) {
                if (val) {
                    this.getUserArchiveList();
                }
            }
        },
        mounted() {
            this.getUserList();
        },
        methods: {
            getValue(userId, permission) {
                for(let i = 0; i< this.authData.length; i++) {
                    if (this.authData[i].userId === userId && this.authData[i].permission === permission) {
                        return true;
                    }
                }
                return false;
            },
            // 获取用户列表
            getUserList() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/user/list',
                    data: JSON.stringify({
                        current: 1,
                        size: 100,
                        total: 0,
                    })
                }).then(res => {
                    this.tableLoading = false;
                    if(res.code === 'SUCCESS') {
                        this.tableData = res.data.records;
                    }
                }).catch(e => {
                    this.tableLoading = false;
                })
            },
            // 根据档案获取人员权限
            getUserArchiveList() {
                this.$http({
                    method: 'get',
                    url: '/archive/getUserArchiveList',
                    params: {
                        archiveId: this.archiveId
                    }
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.authData = res.data || [];
                    }
                })
            },
            save() {
                this.saveBtnLoading = true;
                this.$http({
                    method: 'post',
                    url: '/archive/archiveAuthorize',
                    data: JSON.stringify(this.authData)
                }).then(res => {
                    this.saveBtnLoading = false;
                    if(res.code === 'SUCCESS') {
                        this.$Message.success({
                            content: '授权成功！'
                        });
                        this.$emit('modal-callback');
                        this.modalValue = false;
                        // 表单初始化
                    }
                }).catch(err => {
                    this.saveBtnLoading = false;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .authorize-container {
    }
</style>