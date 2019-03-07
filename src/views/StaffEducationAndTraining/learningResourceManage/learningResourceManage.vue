<template>
    <div class="learningResourceManage-container">
        <vIvxFilterBox>
            <Form inline>
                <FormItem label="资源类型:" :label-width="65">
                    <Select v-model="searchParams.condition.resourceId" style="width: 120px;">
                        <Option v-for="item in dict_resourceType"
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
        <vIvxFilterBox>
            <Button type="primary" icon="md-add" @click="addResources">新建资源</Button>
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

        <!--添加资源-->
        <vResourcesHandle ref="modal_resourcesHandle"
                          :type="modal_resourcesHandle_props.type"
                          :resourceId="modal_resourcesHandle_props.resourceId"
                          @modal-callback="getData"></vResourcesHandle>

        <!--查看附件-->
        <vViewFiles ref="modal_viewFiles" :data="resourcesFiles"></vViewFiles>

    </div>
</template>

<script>
    import comMixin from '../../../lib/mixin/comMixin';
    import authMixin from '../../../lib/mixin/authMixin';
    import viewFilesMixin from '../../Common/viewFiles/mixin';
    import vResourcesHandle from './add/resourcesHandle';
    export default {
        name: 'learningResourceManage',  // 资源管理
        mixins: [comMixin, authMixin, viewFilesMixin],
        components: {vResourcesHandle},
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
                                    // this.propsRow.resourceId = params.row.resourceId;
                                    this.getData_vViewFile(params.row.resourceId, 'learning_resource', 'resourcesFiles');
                                    this.$refs.modal_viewFiles.modalValue = true;

                                }
                            }
                        }, '查看资源'));

                        if (params.row.publishStatus === 'unpublished' && this.auth_update) {
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
                                            content: `确定要发布《${params.row.resourceName}》？`,
                                            onOk: () => {
                                                this.$http({
                                                    method: 'post',
                                                    url: '/resource/update',
                                                    data: JSON.stringify({
                                                        resourceId: params.row.resourceId,
                                                        publishStatus: 'published'
                                                    })
                                                }).then((res) => {
                                                    if (res.code === 'SUCCESS') {
                                                        this.$Message.success('发布成功！');
                                                        this.getData();
                                                    }
                                                }).catch(() => {})
                                            }
                                        })
                                    }
                                }
                            }, '发布'));
                        }

                        if (params.row.publishStatus === 'published' && this.auth_update) {
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
                                            content: `确定要下架《${params.row.resourceName}》？`,
                                            onOk: () => {
                                                this.$http({
                                                    method: 'post',
                                                    url: '/resource/update',
                                                    params: {
                                                        resourceId: params.row.resourceId,
                                                        publishStatus: 'unpublished'
                                                    }
                                                }).then((res) => {
                                                    if (res.code === 'SUCCESS') {
                                                        this.$Message.success('下架成功！');
                                                        this.getData();
                                                    }
                                                }).catch(() => {})
                                            }
                                        })
                                    }
                                }
                            }, '下架'));
                        }
                        if (this.auth_update) {
                            list.push(h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small',
                                    icon: 'ios-trash'
                                },
                                on: {
                                    click: () => {
                                        this.modal_resourcesHandle_props.type = 'edit';
                                        this.modal_resourcesHandle_props.resourceId = params.row.resourceId;
                                        this.$refs.modal_resourcesHandle.modalValue = true;
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
                                            content: `确定要删除《${params.row.resourceName}》资源？`,
                                            onOk: () => {
                                                this.$http({
                                                    method: 'get',
                                                    url: '/resource/delete',
                                                    params: {
                                                        resourceId: params.row.resourceId
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
                        resourceId: '',
                        searchKey: ''
                    }
                },
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '资源名称', width: 120, align: 'center', key: 'resourceName' },
                    { title: '资源类型', width: 120, align: 'center', key: 'resourceTypeLabel' },
                    { title: '发布时间', width: 180, align: 'center',
                        render: (h, params) => {
                            let str = this.timeFormat(params.row.publishTime, 'YYYY-MM-DD HH:mm:ss');
                            return h('div', str);
                        }
                    },
                    { title: '状态', width: 120, align: 'center', key: 'publishStatusLabel'},
                    { title: '浏览量', width: 120, align: 'center', key: 'pageView' }

                ],
                tableData: [
                    // {
                    //     resourceName: '资源名称1',
                    //     resourceTypeLabel: '视频',
                    //     publishTime: '2018-09-21',
                    //     publishStatus: 'unpublished',
                    //     publishStatusLabel: '未发布',
                    //     pageView: 10
                    // }
                ],
                tableLoading: false,

                // modal_addResources add/edit/view
                modal_resourcesHandle_props: {
                    type: 'add',
                    resourceId: ''
                },

                // 字典
                dict_resourceType: [],

                // 附件列表
                resourcesFiles: []
            };
        },
        mounted() {
            this.getDicts(['resourceType']);
            this.getData();
        },
        methods: {
            addResources() {
                this.modal_resourcesHandle_props.type = 'add';
                this.modal_resourcesHandle_props.resourceId = '';
                this.$refs.modal_resourcesHandle.modalValue = true;
            },
            resetSearchParams() {
                this.searchParams.condition.resourceId = '';
                this.searchParams.condition.searchKey = '';
            },
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/resource/list',
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
    .learningResourceManage-container {
    }
</style>