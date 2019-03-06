<template>
    <div class="documentView-container">
        <vIvxFilterBox>
            <Form inline>
                <FormItem label="文件来源:" :label-width="65">
                    <Select v-model="searchParams.condition.archiveSource">
                        <Option v-for="item in dict_archiveSource"
                                :key="item.id"
                                :value="item.value"
                                :label="item.label"></Option>
                    </Select>
                </FormItem>
                <FormItem label="文件关键字:" :label-width="85">
                    <Input v-model="searchParams.condition.archiveTitle"
                           style="width: 120px;"
                           placeholder="文件关键字"/>
                </FormItem>
                <FormItem label="时间:" :label-width="45">
                    <DatePicker ref="datePicker"
                                type="daterange"
                                @on-change="onChage_daterange"
                                placeholder="选择时间"
                                style="width: 180px;"></DatePicker>
                </FormItem>

                <!--<FormItem label="档案类别:" :label-width="65">-->
                    <!--<Select v-model="searchParams.condition.archiveType" style="width: 70px;">-->
                        <!--<Option v-for="item in dict_archiveType"-->
                                <!--:key="item.id"-->
                                <!--:value="item.value"-->
                                <!--:label="item.label"></Option>-->
                    <!--</Select>-->
                <!--</FormItem>-->
            </Form>
        </vIvxFilterBox>

        <div class="ivx-table-box">
            <Table border
                   height="680"
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

        <vViewFiles ref="viewFile" :data="fileList"></vViewFiles>
    </div>
</template>

<script>
    import comMixin from '../../../lib/mixin/comMixin';
    import authMixin from '../../../lib/mixin/authMixin';
    import viewFileMixin from '../../Common/viewFiles/mixin';
    export default {
        name: 'documentView',   // 公文查阅
        mixins: [comMixin, authMixin, viewFileMixin],
        data() {
            return {
                searchParams: {
                    current: 1,        // 当前第几页
                    size: 10,          // 每页几行
                    total: 0,           // 总行数
                    condition: {
                        archiveSource: '',
                        archiveStatus: '',
                        archiveTitle: '',
                        operator: '',
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
                    { title: '文件名称', minWdth: 120, align: 'center', key: 'archiveTitle' },
                    { title: '来源', width: 120, align: 'center', key: 'sourceLabel' },
                    { title: '等级', width: 120, align: 'center', key: 'archiveTypeLabel' },
                    { title: '状态', width: 120, align: 'center', key: 'applyStatusLabel' },
                    { title: '操作', width: 120, align: 'center',
                        render: (h, params) => {
                            let list = [];

                            if (params.row.applyStatus === 'unapplie') {
                                list.push(h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        icon: 'ios-create'
                                    },
                                    on: {
                                        click: () => {
                                            this.$Modal.confirm({
                                                title: '申请查阅',
                                                content: `确定要申请查阅《${params.row.archiveTitle}》档案`,
                                                onOk: () => {
                                                    this.$http({
                                                        method: 'get',
                                                        url: '/',
                                                        params: {
                                                            archiveId: params.row.archiveId
                                                        }
                                                    }).then((res) => {
                                                        if (res.code === 'SUCCESS') {
                                                            this.$Message.success('申请成功,请等待审核!')
                                                            this.getData();
                                                        }
                                                    })
                                                }
                                            })

                                        }
                                    }
                                }, '申请查阅'))
                            }

                            if (params.row.applyStatus === 'check') {
                                list.push(h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small',
                                        icon: 'ios-create'
                                    },
                                    on: {
                                        click: () => {

                                        }
                                    }
                                }, '查看'))
                            }

                            return h('div',{
                                style: { },
                                class: 'ivx-table-cell-handle'
                            },list);
                        }
                    }
                ],
                tableData: [
                    {
                        insTime: '2018-09-21  08:50:08',
                        archiveTitle: '文件名称',
                        sourceLabel: '办公室',
                        archiveTypeLabel: '机密',
                        applyStatusLabel: '可查看',
                        employeeStatusLabel: '离职',
                        applyStatus: 'check'
                    },
                    {
                        insTime: '2018-09-21  08:50:08',
                        archiveTitle: '文件名称',
                        sourceLabel: '办公室',
                        archiveTypeLabel: '机密',
                        applyStatusLabel: '未申请',
                        employeeStatusLabel: '离职',
                        applyStatus: 'unapplie'
                    },
                ],
                tableLoading: false,

                // 字典
                dict_archiveSource: [],

                // 附件
                fileList: []
            };
        },
        mounted() {
            this.getDicts(['archiveSource']);
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
                    url: '/list',
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .documentView-container {
    }
</style>