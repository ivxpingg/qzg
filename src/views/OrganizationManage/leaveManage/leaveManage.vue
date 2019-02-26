<template>
    <div class="leaveManage-container">
        <vIvxFilterBox>
            <Form inline>
                <FormItem label="归属部门:" :label-width="65">

                </FormItem>
                <FormItem label="关键字:" :label-width="65">
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
            <Button type="info" icon="ios-calendar">查看日历</Button>
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
    </div>
</template>

<script>
    import comMixin from '../../../lib/mixin/comMixin';
    import authMixin from '../../../lib/mixin/authMixin';
    export default {
        name: 'leaveManage', // 查看公出
        mixins: [comMixin, authMixin],
        computed: {
            _tableColumns() {
                let column = [{ title: '操作', minWidth: 360, align: 'center',
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
                                    this.jobHandleType = 'view';
                                    this.currentRow.jobId = params.row.jobId;
                                    this.$refs.modal_jobHandle.modalValue = true;
                                }
                            }
                        }, '查看'));

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
                    { title: '申请时间', width: 150, align: 'center', key: 'insTime',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.insTime, 'YYYY-MM-DD HH:mm:ss'));
                        }
                    },
                    { title: '申请人', width: 120, align: 'center', key: 'dutyName' },
                    { title: '部门', width: 120, align: 'center', key: 'unitName' },
                    { title: '联系电话', width: 120, align: 'center', key: 'jobLevelLabel' },
                    { title: '类型', width: 120, align: 'center', key: 'wageLevelLabel' },
                    { title: '状态', width: 120, align: 'center', key: 'wageLevelLabel' }
                ],
                tableData: [
                    {
                        insTime: '2018-09-21  08:50:08',
                        dutyName: '主任',
                        unitName: '办公室',
                        jobLevelLabel: '干部',
                        wageLevelLabel: '九级职员'
                    }
                ],
                tableLoading: false,
            };
        },
        mounted() {
            this.getData();
        },
        methods:{
            resetSearchParams() {
                this.searchParams.condition.departmentId = '';
                this.searchParams.condition.searchKey = '';
            },
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
        }
    }
</script>

<style lang="scss" scoped>
    .leaveManage-container {
    }
</style>