<template>
    <div class="trainingSchoolManage-container">
        <vIvxFilterBox>
            <Form inline>
                <FormItem label="课程状态:" :label-width="65">
                    <Select v-model="searchParams.condition.departmentId" style="width: 120px;">
                        <Option v-for="item in dict_courseStatus"
                                :key="item.id"
                                :value="item.value"
                                :label="item.label"></Option>
                    </Select>
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

        <!--学时管理-->
        <vPeriodManage ref="modal_periodManage"
                       :courseId="modal_periodManage_props.courseId"></vPeriodManage>

    </div>
</template>

<script>
    import comMixin from '../../../lib/mixin/comMixin';
    import authMixin from '../../../lib/mixin/authMixin';
    import vPeriodManage from './periodManage/periodManage';
    export default {
        name: 'trainingSchoolManage',
        mixins: [comMixin, authMixin],
        components: {vPeriodManage},
        data() {
            return {
                searchParams: {
                    current: 1,        // 当前第几页
                    size: 10,          // 每页几行
                    total: 0,           // 总行数
                    condition: {
                        courseStatus: '',
                        searchKey: ''
                    }
                },
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '培训名称', width: 120, align: 'center', key: 'courseName' },
                    { title: '发起部门', width: 120, align: 'center', key: 'departmentName' },
                    { title: '状态', width: 120, align: 'center', key: 'courseStatusLabel' },
                    { title: '学员人数', width: 120, align: 'center', key: 'userNum' },
                    { title: '课程进度', width: 120, align: 'center', key: 'progress' },
                    { title: '学时完成率', width: 120, align: 'center', key: 'completionRates' },
                    { title: '符合毕业人数', width: 120, align: 'center', key: 'passUserNum' },
                    { title: '操作', minWidth: 120, align: 'center',
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
                                        this.modal_periodManage_props.courseId = params.row.courseId;
                                        this.$refs.modal_periodManage.modalValue = true;
                                    }
                                }
                            }, '查看详情'));

                            return h('div',{
                                style: { },
                                class: 'ivx-table-cell-handle'
                            },list);
                        }
                    }
                ],
                tableData: [
                    {
                        courseName: 'java',
                        departmentName: '办公室',
                        courseStatusLabel: '2018-09-21',
                        userNum: 20,
                        progress: '20%',
                        completionRates: '20%',
                        passUserNum: 10
                    }
                ],
                tableLoading: false,

                // 学时管理
                modal_periodManage_props: {
                    courseId: ''
                },

                // 字典
                dict_courseStatus: []
            };
        },
        mounted() {
            this.getDicts(['courseStatus']);
            this.getData();
        },
        methods: {
            resetSearchParams() {
                this.searchParams.condition.courseStatus = '';
                this.searchParams.condition.searchKey = '';
            },
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/period/coursePeriod',
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
    .trainingSchoolManage-container {
    }
</style>