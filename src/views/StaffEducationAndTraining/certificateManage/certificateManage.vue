<template>
    <div class="certificateManage-container">
        <vIvxFilterBox>
            <Form inline>
                <FormItem label="课程名称:" :label-width="65">
                    <Select v-model="searchParams.condition.courseId" style="width: 220px;">
                        <Option v-for="item in dict_courseList"
                                :key="item.courseId"
                                :value="item.courseId"
                                :label="item.courseName"></Option>
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
        <vIvxFilterBox>
            <Button type="primary" icon="md-add" @click="addCredential">新建证书</Button>
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

        <!--新建证书-->
        <vAddCredential ref="modal_addCredential" @modal-callback="getData"></vAddCredential>

        <!--证书-->
        <vDiploma ref="modal_diploma" :certificateId="modal_diploma_props.certificateId"></vDiploma>
    </div>
</template>

<script>
    import comMixin from '../../../lib/mixin/comMixin';
    import authMixin from '../../../lib/mixin/authMixin';
    import vAddCredential from './add/addCredential';
    import vDiploma from './diploma/diploma';
    export default {
        name: 'certificateManage',  // 证书管理
        mixins: [comMixin, authMixin],
        components: {vAddCredential, vDiploma},
        computed: {
            _tableColumns() {
                let column = [{ title: '操作', minWidth: 260, align: 'center',
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
                                    this.modal_diploma_props.certificateId = params.row.certificateId;
                                    this.$refs.modal_diploma.modalValue = true;
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
                                            content: `确定要删除《${params.row.userName}》证书？`,
                                            onOk: () => {
                                                this.$http({
                                                    method: 'get',
                                                    url: '/certificate/delete',
                                                    params: {
                                                        certificateId: params.row.certificateId
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
                return this.tableColumns.concat(column);
            }
        },
        data() {
            return {
                searchParams: {
                    current: 1,        // 当前第几页
                    size: 10,          // 每页几行
                    total: 0,           // 总行数
                    condition: {
                        courseId: '',
                        searchKey: ''
                    }
                },
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '创建时间', width: 180, align: 'center',
                        render: (h, params) => {
                            let str = this.timeFormat(params.row.insTime, 'YYYY-MM-DD HH:mm:ss');
                            return h('div', str);
                        }
                    },
                    { title: '证书归属人员', width: 120, align: 'center', key: 'userName' },
                    { title: '培训课程', width: 120, align: 'center', key: 'courseName' },
                    { title: '毕业时间', width: 120, align: 'center', key: 'issueDate',
                        render: (h, params) => {
                            let str = this.timeFormat(params.row.issueDate, 'YYYY-MM-DD');
                            return h('div', str);
                        }
                    },
                    { title: '类型', width: 120, align: 'center', key: 'certificateTypeLabel' },
                    { title: '发放人', width: 120, align: 'center', key: 'issuer' },

                ],
                tableData: [
                    {
                        insTime: '2018-09-21',
                        userName: '小红',
                        courseName: 'java',
                        issueDate: '2018-09-21',
                        certificateTypeLabel: '报名中',
                        issuer: '陈主任'
                    }
                ],
                tableLoading: false,

                propsRow: {
                    courseId: ''
                },

                // 课程列表
                dict_courseList: [],

                modal_diploma_props: {
                    certificateId: ''
                }
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            addCredential() {
                this.$refs.modal_addCredential.modalValue = true;
            },
            resetSearchParams() {
                this.searchParams.condition.courseId = '';
                this.searchParams.condition.searchKey = '';
            },
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/certificate/list',
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
    .certificateManage-container {
    }
</style>