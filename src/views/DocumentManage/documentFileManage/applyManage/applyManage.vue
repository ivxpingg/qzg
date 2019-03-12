<template>
    <div class="applyManage-container">
        <vIvxFilterBox dashed>
            <Form inline>
                <FormItem label="筛选条件:" :label-width="65">
                    <RadioGroup v-model="searchParams.condition.applyStatus" type="button">
                        <Radio label="">全部</Radio>
                        <Radio v-for="item in dict_applyStatus"
                               :label="item.value" :key="item.id">{{item.label}}</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="操作时间:" :label-width="65">
                    <DatePicker ref="datePicker"
                                type="daterange"
                                @on-change="onChage_daterange"
                                placeholder="选择时间"
                                style="width: 200px;"></DatePicker>
                </FormItem>
            </Form>
        </vIvxFilterBox>

        <div class="ivx-table-box">
            <Table border
                   height="540"
                   :loading="tableLoading"
                   :columns="tableColumns"
                   :data="tableData"></Table>
            <Page prev-text="上一页"
                  next-text="下一页"
                  show-total
                  :current="searchParams.current"
                  :page-size="searchParams.size"
                  :total="searchParams.total"
                  @on-change="onPageChange"></Page>
        </div>

        <!--公文申请查阅审核-->
        <vAuditDocument ref="modal_auditDocument"
                        :consultApplyId="modal_auditDocument_props.consultApplyId"
                        @modal-callback="modal_auditDocument_callback"></vAuditDocument>
    </div>
</template>

<script>
    import comMixin from '../../../../lib/mixin/comMixin';
    import authMixin from '../../../../lib/mixin/authMixin';
    import vAuditDocument from './auditDocument/auditDocument';
    export default {
        name: 'applyManage',
        mixins: [comMixin, authMixin],
        components: {vAuditDocument},
        data() {
            return {
                searchParams: {
                    current: 1,        // 当前第几页
                    size: 10,          // 每页几行
                    total: 0,           // 总行数
                    condition: {
                        applyStatus: '',
                        beginTime: '',
                        endTime: ''
                    }
                },
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '时间', width: 150, align: 'center', key: 'insTime',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.insTime, 'YYYY-MM-DD HH:mm:ss'));
                        }
                    },
                    { title: '文号', width: 160, align: 'center', key: 'archiveNo' },
                    { title: '文件名称', minWdth: 120, align: 'center', key: 'archiveTitle' },
                    { title: '申请人', width: 130, align: 'center', key: 'applyPerson' },
                    { title: '申请用途', minWidth: 100, align: 'center', key: 'useFor' },
                    { title: '状态', width: 120, align: 'center', key: 'applyStatusLabel' },
                    { title: '操作', width: 120, align: 'center',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small',
                                    icon: 'ios-create'
                                },
                                on: {
                                    click: () => {
                                        this.modal_auditDocument_props.consultApplyId = params.row.consultApplyId;
                                        this.$refs.modal_auditDocument.modalValue = true;
                                    }
                                }
                            }, '查看')
                        }
                    }
                ],
                tableData: [],
                tableLoading: false,

                // 字典
                dict_applyStatus: [],

                // 公文查阅审核参数
                modal_auditDocument_props: {
                    consultApplyId: ''
                }
            };
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
        mounted() {
            this.getData();
            this.getDicts(['applyStatus']);
        },
        methods: {
            onChage_daterange(value) {
                this.searchParams.condition.beginTime = value[0];
                this.searchParams.condition.endTime = value[1];
            },
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/consultApply/list',
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

            modal_auditDocument_callback() {
                this.getData();
                this.modal_auditDocument_props.consultApplyId = '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .applyManage-container {
    }
</style>