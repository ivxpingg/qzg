<template>
    <Modal v-model="modalValue"
           class="recordView-container"
           title="人事变动记录"
           :width="1200"
           footer-hide
           @on-visible-change="onVisibleChange">
        <vCountPanel :inforCardData="inforCardData"></vCountPanel>
        <div class="ivx-table-box">
            <Table border
                   height="350"
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
    </Modal>
</template>

<script>
    import modalMixin from '../../../../lib/mixin/modalMixin';
    import comMixin from '../../../../lib/mixin/comMixin';
    import vCountPanel from './countPanel/countPanel';
    export default {
        name: 'recordView',
        mixins: [modalMixin, comMixin],
        components: {vCountPanel},
        data() {
            return {
                searchParams: {
                    current: 1,        // 当前第几页
                    size: 10,          // 每页几行
                    total: 0           // 总行数
                },
                tableLoading: false,
                tableColumns: [
                    { title: '员工名称', width: 120, align: 'center', key: 'employeeName' },
                    { title: '变动类型', width: 120, align: 'center', key: 'changeTypeLabel' },
                    { title: '变动时间', width: 150, align: 'center', key: 'changeTime' },
                    { title: '变动结果', minWidth: 120, align: 'center', key: 'changeResult' },
                    { title: '操作人', width: 140, align: 'center', key: 'createName' },
                    { title: '操作时间', width: 150, align: 'center', key: 'insTime',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.insTime, 'YYYY-MM-DD HH:mm:ss'));
                        }
                    }
                ],
                tableData: [
                    {
                        // employeeName: '姓名',
                        // changeTypeLabel: '辞职',
                        // changeTime: '2018-10-10 09:09:09',
                        // changeResult: '单位1调动至单位2',
                        // create: '陈科长',
                        // insTime: '2018-10-10 09:09:09'
                    }
                ],

                inforCardData: [
                    { title: '新增人员', icon: 'md-person', count: 0, color: '#2d8cf0' },
                    { title: '调出人员', icon: 'md-person', count: 0, color: '#19be6b' },
                    { title: '调动人员', icon: 'md-person', count: 0, color: '#ff9900' },
                    { title: '辞职人员', icon: 'md-person', count: 0, color: '#ed3f14' },
                    { title: '退休人员', icon: 'md-person', count: 0, color: '#E46CBB' },
                    { title: '岗位变动人员', icon: 'md-person', count: 0, color: '#9A66E4' }
                ]
            };
        },
        watch: {
            modalValue(val) {
                if (val) {
                    this.getData();
                    this.countByType();
                }

            },
            'searchParams.current'() {
                this.getData();
            }
        },
        methods: {
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/employeeRecord/list',
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
            countByType() {
                this.$http({
                    method: 'get',
                    url: '/employeeRecord/countByType'
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        res.data.forEach(v => {
                            switch (v.changeType) {
                                case 'new':
                                    this.inforCardData[0].count = v.count;
                                    break;
                                case 'assigning-out':
                                    this.inforCardData[1].count = v.count;
                                    break;
                                case 'assigning-move':
                                    this.inforCardData[2].count = v.count;
                                    break;
                                case 'resignation':
                                    this.inforCardData[3].count = v.count;
                                    break;
                                case 'retirement':
                                    this.inforCardData[4].count = v.count;
                                    break;
                                case 'job-adjusted':
                                    this.inforCardData[5].count = v.count;
                                    break;
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .recordView-container {
    }
</style>