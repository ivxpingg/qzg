<template>
    <div class="jobPositionManage-container">
        <vIvxFilterBox>
            <Form inline>
                <FormItem label="归属部门:" :label-width="70">
                    <Select v-model="searchParams.condition.departmentId" style="width: 200px;">
                        <Option v-for="item in departmentList"
                                :key="item.departmentId"
                                :value="item.departmentId"
                                :label="item.unitName + '-' + item.departmentName"></Option>
                    </Select>
                </FormItem>
                <FormItem label="关键字:" :label-width="70">
                    <Input v-model="searchParams.condition.searchKey"
                           style="width: 120px;"
                           placeholder="请输入关键字"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" icon="ios-search" @click="getData">检索</Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" icon="md-refresh" @click="resetSearchParams">重置</Button>
                </FormItem>
            </Form>
        </vIvxFilterBox>
        <vIvxFilterBox>
            <Button type="primary" icon="md-add" @click="addJob">新建职务</Button>
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

        <vJobHandle ref="modal_jobHandle"
                    :type="jobHandleType"
                    :jobId="currentRow.jobId"
                    @modal-callback="getData"></vJobHandle>
    </div>
</template>

<script>
    import comMixin from '../../../lib/mixin/comMixin';
    import authMixin from '../../../lib/mixin/authMixin';
    import vJobHandle from './addEditView/jobHandle';
    export default {
        name: 'jobPositionManage',  // 工作职务管理
        mixins: [comMixin, authMixin],
        components: {vJobHandle},
        computed: {
            _tableColumns() {
                let column = [{ title: '操作', minWidth: 360, align: 'center',
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
                                        this.jobHandleType = 'edit';
                                        this.currentRow.jobId = params.row.jobId;
                                        this.$refs.modal_jobHandle.modalValue = true;
                                    }
                                }
                            }, '编辑'));
                        }

                        list.push(h('Button', {
                            props: {
                                type: 'info',
                                size: 'small',
                                icon: 'ios-eye'
                            },
                            on: {
                                click: () => {
                                    this.jobHandleType = 'view';
                                    this.currentRow.jobId = params.row.jobId;
                                    this.$refs.modal_jobHandle.modalValue = true;
                                }
                            }
                        }, '查看'));

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
                                            content: `确定要删除《${params.row.dutyName}》职务？`,
                                            onOk: () => {
                                                this.$http({
                                                    method: 'get',
                                                    url: '/job/delete',
                                                    params: {
                                                        jobId: params.row.jobId
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
        data() {
            return {
                searchParams: {
                    current: 1,        // 当前第几页
                    size: 10,          // 每页几行
                    total: 0,           // 总行数
                    condition: {
                        departmentId: '',
                        searchKey: ''
                    }
                },
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '时间', width: 150, align: 'center', key: 'insTime',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.insTime, 'YYYY-MM-DD HH:mm:ss'));
                        }
                    },
                    { title: '职务名称', width: 120, align: 'center', key: 'dutyName' },
                    { title: '归属单位', width: 120, align: 'center', key: 'unitName' },
                    { title: '职级', width: 120, align: 'center', key: 'jobLevelLabel' },
                    { title: '工资职级', width: 200, align: 'center', key: 'wageLevelLabel' }
                ],
                tableData: [
                    // {
                    //     insTime: '2018-09-21  08:50:08',
                    //     dutyName: '主任',
                    //     unitName: '办公室',
                    //     jobLevelLabel: '干部',
                    //     wageLevelLabel: '九级职员'
                    // }
                ],
                tableLoading: false,

                // vJobHandle 组件状态 add/edit/view
                jobHandleType: 'add',
                currentRow: {
                    jobId: ''
                },

                departmentList: []
            };
        },
        mounted() {
            this.getData();
            this.getDeparmentList('', 'departmentList');
        },
        watch: {
            'searchParams.current'() {
                this.getData();
            },
            'searchParams.condition': {
                deep: true,
                handler() {
                    this.getData();
                }
            }
        },
        methods:{
            addJob() {
                this.jobHandleType = 'add';
                this.currentRow.jobId = '';
                this.$refs.modal_jobHandle.modalValue = true;
            },
            resetSearchParams() {
                this.searchParams.condition.departmentId = '';
                this.searchParams.condition.searchKey = '';
            },
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/job/list',
                    data: JSON.stringify(this.searchParams)
                }).then((res) => {
                    this.tableLoading = false;
                    if (res.code === 'SUCCESS') {
                        this.tableData = res.data.records;
                        this.searchParams.total = res.data.total;
                    }
                }).catch(() => {
                    this.tableLoading = false;
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .jobPositionManage-container {
    }
</style>