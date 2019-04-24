<template>
    <div class="trainingCourseManage-container">
        <vIvxFilterBox>
            <Form inline>
                <FormItem label="归属部门:" :label-width="70">
                    <Select v-model="searchParams.condition.departmentId" style="width: 220px;">
                        <Option v-for="item in dict_departmentList"
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
            <Button type="primary" icon="md-add" @click="addTrainingCourse">新建培训</Button>
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

        <!--培训课程add/edit/view-->
        <vCourseHandle ref="modal_courseHandle"
                       :type="courseHandleType"
                       :courseId="currentRow.courseId" @modal-callback="getData"></vCourseHandle>
        <!--通知-->
        <vNotificationCourse ref="modal_notificationCourse"
                             :courseId="modal_notificationCourse_props.courseId"
                             :courseName="modal_notificationCourse_props.courseName"
                             @modal-callback="resetProps"></vNotificationCourse>
        <!--查看人员-->
        <vCheckPersons ref="modal_checkPersons" key="xue"
                       :courseId="modal_checkPersons_props.courseId"></vCheckPersons>
    </div>
</template>

<script>
    import comMixin from '../../../lib/mixin/comMixin';
    import authMixin from '../../../lib/mixin/authMixin';
    import vCourseHandle from './addEditView/courseHandle';
    import vNotificationCourse from './notification/notificationCourse';
    import vCheckPersons from './checkPersons/checkPersons';
    export default {
        name: 'trainingCourseManage', // 培训课程管理
        mixins: [comMixin, authMixin],
        components: {vCourseHandle, vNotificationCourse, vCheckPersons},
        computed: {
            _tableColumns() {
                let column = [{ title: '操作', minWidth: 360, align: 'center',
                    render: (h, params) => {
                        let list = [];
                        if (this.auth_update && params.row.userNum) {
                            list.push(h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    icon: 'ios-create'
                                },
                                on: {
                                    click: () => {
                                        this.modal_notificationCourse_props.courseId = params.row.courseId;
                                        this.modal_notificationCourse_props.courseName = params.row.courseName;
                                        this.$refs.modal_notificationCourse.modalValue = true;
                                    }
                                }
                            }, '通知'));
                        }

                        list.push(h('Button', {
                            props: {
                                type: 'info',
                                size: 'small',
                                icon: 'ios-eye'
                            },
                            on: {
                                click: () => {
                                    if (this.auth_update) { this.courseHandleType = 'edit'; }
                                    else { this.courseHandleType = 'view'; }
                                    this.currentRow.courseId = params.row.courseId;
                                    this.$refs.modal_courseHandle.modalValue = true;
                                }
                            }
                        }, '查看'));

                        list.push(h('Button', {
                            props: {
                                type: 'info',
                                size: 'small',
                                icon: 'ios-eye'
                            },
                            on: {
                                click: () => {
                                    this.modal_checkPersons_props.courseId = params.row.courseId;
                                    this.$refs.modal_checkPersons.modalValue = true;
                                }
                            }
                        }, '查看学员'));

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
                                            content: `确定要删除《${params.row.courseName}》课程？`,
                                            onOk: () => {
                                                this.$http({
                                                    method: 'get',
                                                    url: '/course/delete',
                                                    params: {
                                                        courseId: params.row.courseId
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
                    { title: '培训名称', width: 120, align: 'center', key: 'courseName' },
                    { title: '发起部门', width: 120, align: 'center', key: 'departmentName' },
                    { title: '培训时间', width: 180, align: 'center',
                        render: (h, params) => {
                            let str = this.timeFormat(params.row.startTime, 'YYYY-MM-DD') + ' ~ ' + this.timeFormat(params.row.endTime, 'YYYY-MM-DD');
                            return h('div', str);
                        }
                    },
                    { title: '培训地点', width: 120, align: 'center', key: 'address' },
                    { title: '状态', width: 120, align: 'center', key: 'courseStatusLabel' },
                    { title: '学员人数', width: 120, align: 'center', key: 'userNum' },
                ],
                tableData: [
                    {
                        courseName: 'java',
                        departmentName: '办公室',
                        startTime: '2018-09-21',
                        endTime: '2018-09-21',
                        address: '办公室',
                        courseStatusLabel: '报名中',
                        userNum: 20
                    }
                ],
                tableLoading: false,

                // vCourseHandle 组件状态 add/edit/view
                courseHandleType: 'add',
                currentRow: {
                    courseId: ''
                },
                // 通知
                modal_notificationCourse_props: {
                    courseId: '',
                    courseName: ''
                },
                // 查看学员
                modal_checkPersons_props: {
                    courseId: ''
                },

                dict_departmentList: []
            };
        },
        mounted() {
            this.getDeparmentList('', 'dict_departmentList');
            this.getData();
        },
        methods: {
            // 重置子组件参数
            resetProps() {
                this.currentRow.courseId = '';
                this.modal_notificationCourse_props.courseId = '';
                this.modal_notificationCourse_props.courseName = '';
                this.modal_checkPersons_props.courseId = '';
            },
            addTrainingCourse() {
                this.courseHandleType = 'add';
                this.currentRow.courseId = '';
                this.$refs.modal_courseHandle.modalValue = true;
            },
            resetSearchParams() {
                this.searchParams.condition.departmentId = '';
                this.searchParams.condition.searchKey = '';
            },
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/course/list',
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
    .trainingCourseManage-container {
    }
</style>