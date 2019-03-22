<template>
    <div class="logManage-container">
        <vIvxFilterBox>
            <Form inline>
                <FormItem label="操作类型:" :label-width="65">
                    <Select v-model="searchParams.condition.operateType" style="width: 100px;">
                        <Option v-for="item in dict_operateType"
                                :key="item.id"
                                :value="item.value"
                                :label="item.label"></Option>
                    </Select>
                </FormItem>
                <FormItem label="操作人:" :label-width="65">
                    <Input v-model="searchParams.condition.operator"
                           style="width: 120px;"
                           placeholder="操作人"/>
                </FormItem>
                <FormItem label="档案名称:" :label-width="65">
                    <Input v-model="searchParams.condition.archiveTitle"
                           style="width: 200px;"
                           placeholder="档案名称"/>
                </FormItem>
                <FormItem label="操作结果:" :label-width="65">
                    <Input v-model="searchParams.condition.result"
                           style="width: 100px;"
                           placeholder="操作结果"/>
                </FormItem>
                <FormItem label="操作时间:" :label-width="65">
                    <DatePicker ref="datePicker"
                                type="daterange"
                                @on-change="onChage_daterange"
                                placeholder="选择时间"
                                style="width: 200px;"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" icon="ios-search" @click="getData">检索</Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" icon="md-refresh" @click="resetSearchParams">重置</Button>
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
    </div>
</template>

<script>
    import comMixin from '../../../lib/mixin/comMixin';
    export default {
        name: 'logManage',
        mixins: [comMixin],
        data() {
            return {
                searchParams: {
                    current: 1,        // 当前第几页
                    size: 10,          // 每页几行
                    total: 0,           // 总行数
                    condition: {
                        operateType: '',
                        operator: '',
                        archiveTitle: '',
                        result: '',
                        beginTime: '',
                        endTime: ''
                    }
                },
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '文件名称', minWidth: 120, align: 'center', key: 'archiveTitle' },
                    { title: '操作人', width: 100, align: 'center', key: 'operator' },
                    { title: '操作时间', width: 150, align: 'center', key: 'insTime',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.insTime, 'YYYY-MM-DD HH:mm:ss'));
                        }
                    },
                    { title: '操作类型', width: 120, align: 'center', key: 'operateTypeLabel' },
                    { title: '操作内容', minWidth: 120, align: 'center', key: 'operateContent' },
                    { title: '操作结果', width: 100, align: 'center', key: 'operateResultLabel' },
                    { title: '备注', minWidth: 120, align: 'center', key: 'remark',
                        render:(h, params) => {
                            return h('Input', {
                                props: {
                                    type: 'textarea',
                                    value: params.row.remark,
                                    rows: 2
                                },
                                on: {
                                    'on-change': (event) => {
                                        params.row.remark = event.target.value.trim();
                                    },
                                    'on-blur': () => {
                                        this.$http({
                                            method: 'post',
                                            url: '/archiveLog/updateRemark',
                                            data: JSON.stringify({
                                                archiveLogId: params.row.archiveLogId,
                                                remark: params.row.remark
                                            })
                                        }).then((res) => {
                                            if (res.code === 'SUCCESS') {
                                                // this.$Message.success('修改备注成功');
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    },
                ],
                tableData: [],
                tableLoading: false,

                // 字典
                dict_operateType: []
            };
        },
        mounted() {
            this.getDicts(['operateType']);
            this.getData();
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
        methods: {
            onChage_daterange(value) {
                this.searchParams.condition.beginTime = value[0];
                this.searchParams.condition.endTime = value[1];
            },
            resetSearchParams() {
                this.searchParams.condition.operateType = '';
                this.searchParams.condition.operator = '';
                this.searchParams.condition.archiveTitle = '';
                this.searchParams.condition.result = '';
                this.searchParams.condition.beginTime = '';
                this.searchParams.condition.endTime = '';
                this.$refs.datePicker.handleClear();
            },
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/archiveLog/list',
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
    .logManage-container {
    }
</style>