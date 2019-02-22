<template>
    <div class="departmentManage-container">
        <vIvxFilterBox v-if="auth_add">
            <Button type="primary" icon="md-add" @click="addDepartment">新增部门</Button>
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

        <!--新增部门-->
        <vDepartmentHandle ref="modal_addDepartment" key="add"></vDepartmentHandle>

        <!--编辑部门-->
        <vDepartmentHandle ref="modal_editDepartment"
                           type="edit"
                           :departmentId="editCurrentRow.departmentId" key="edit"></vDepartmentHandle>

    </div>
</template>

<script>
    import comMixin from '../../../lib/mixin/comMixin';
    import authMixin from '../../../lib/mixin/authMixin';
    import vDepartmentHandle from './addOrEdit/departmentHandle';
    export default {
        name: 'departmentManage',
        mixins: [comMixin, authMixin],
        components: {vDepartmentHandle},
        computed: {
            _tableColumns() {
                let column = [{ title: '操作', minWidth: 100, maxWidth: 170, align: 'center',
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
                                        this.editCurrentRow.departmentId = params.row.departmentId;
                                        this.$refs.modal_editDepartment.modalValue = true;
                                    }
                                }
                            }, '编辑'));
                        }

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
                                            content: `确定要删除《${params.row.departmentName}》部门？`,
                                            onOk: () => {
                                                this.$http({
                                                    method: 'get',
                                                    url: '/',
                                                    params: {
                                                        departmentId: params.row.departmentId
                                                    }
                                                }).then((res) => {
                                                    if (res.code === 'SUCCESS') {
                                                        this.$Message.success('删除成功！');
                                                        this.getData();
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
                return this.auth_update || this.auth_del ? this.tableColumns.concat(column) : this.tableColumns.concat(column);
            }
        },
        mounted() {
        },
        data() {
            return {
                searchParams: {
                    current: 1,        // 当前第几页
                    size: 10,          // 每页几行
                    total: 0,           // 总行数
                    condition: {}
                },
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '创建时间', width: 150, align: 'center', key: 'insTime' },
                    { title: '单位名称', minWidth: 120, align: 'center', key: 'unitName' },
                    { title: '部门名称', minWidth: 120, align: 'center', key: 'departmentName' },
                    { title: '创建人', width: 100, align: 'center', key: 'operator' },
                    { title: '在岗人数', width: 120, align: 'center', key: 'onDutyNum' },
                    { title: '简介', minWidth: 120, align: 'center', key: 'intro' },
                ],
                tableData: [
                    {
                        unitName: '泉州港水运工程', operator: '小陈', insTime: '2018-09-21  08:50:08',
                        departmentName: '授权', onDutyNum: 10, intro: '这是备注描述内容'
                    },
                    {
                        unitName: '泉州港水运工程', operator: '小陈', insTime: '2018-09-21  08:50:08',
                        departmentName: '授权', onDutyNum: 10, intro: '这是备注描述内容'
                    },
                    {
                        unitName: '泉州港水运工程', operator: '小陈', insTime: '2018-09-21  08:50:08',
                        departmentName: '授权', onDutyNum: 10, intro: '这是备注描述内容'
                    },
                ],
                tableLoading: false,

                // 当前选中的部门 编辑
                editCurrentRow: {
                    departmentId: ''
                }
            };
        },
        methods: {
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/',
                    data: JSON.stringify(this.searchParams)
                }).then((res) => {
                    this.tableLoading = false;
                    if (res.code === 'SUCCESS') {
                        this.tableData = res.data.records;
                        this.searchParams.total = res.data.page.total;
                    }
                }).catch(() => {
                    this.tableLoading = false;
                })
            },
            addDepartment() {
                this.$refs.modal_addDepartment.modalValue = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .departmentManage-container {
    }
</style>