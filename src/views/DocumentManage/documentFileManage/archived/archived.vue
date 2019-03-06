<template>
    <div class="archived-container">
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
                <!--<FormItem label="文件状态:" :label-width="65">-->
                    <!--<Select v-model="searchParams.condition.archiveStatus" style="width: 70px;">-->
                        <!--<Option v-for="item in dict_archiveStatus"-->
                                <!--:key="item.id"-->
                                <!--:value="item.value"-->
                                <!--:label="item.label"></Option>-->
                    <!--</Select>-->
                <!--</FormItem>-->
                <FormItem label="文件关键字:" :label-width="85">
                    <Input v-model="searchParams.condition.archiveTitle"
                           style="width: 120px;"
                           placeholder="文件关键字"/>
                </FormItem>
                <FormItem label="创建人:" :label-width="55">
                    <Input v-model="searchParams.condition.operator"
                           style="width: 100px;"
                           placeholder="创建人"/>
                </FormItem>
                <FormItem label="时间:" :label-width="45">
                    <DatePicker ref="datePicker"
                                type="daterange"
                                @on-change="onChage_daterange"
                                placeholder="选择时间"
                                style="width: 180px;"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" icon="ios-search" @click="getData">检索</Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" icon="md-refresh" @click="resetSearchParams">重置</Button>
                </FormItem>
            </Form>
        </vIvxFilterBox>

        <div class="box-panel">
            <div class="left-panel">
                <vIvxFilterBox style="padding-top: 10px;">
                    <Form :label-width="35">
                        <FormItem><Button type="primary" @click="onClick_newArchiveType">新建档案</Button></FormItem>
                    </Form>
                </vIvxFilterBox>

                <div class="dict-list">
                    <div class="item" v-for="item in dict_archiveType"
                         @click="archiveTypeSelect(item)"
                         :key="item.id">
                        <Icon type="md-filing" size="60" :color="getColor(item.value)" />
                        <p>{{item.label}}</p>
                    </div>
                </div>
            </div>
            <div class="right-panel">
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
        </div>

        <Modal v-model="modal_addDict"
               title="添加字典"
               draggable
               ok-text="保存"
               :width="400">
            <Form ref="formAdd"
                  :model="formData"
                  :rules="rules"
                  :label-width="80">
                <!--<FormItem label="类型:" prop="type">-->
                    <!--<Input v-model="formData.type" placeholder="字典类型" />-->
                <!--</FormItem>-->
                <!--<FormItem label="描述:" prop="description">-->
                    <!--<Input v-model="formData.description" placeholder="描述" />-->
                <!--</FormItem>-->
                <FormItem label="类别名称:" prop="label">
                    <Input v-model="formData.label" placeholder="键值" />
                </FormItem>
                <!--<FormItem label="值:" prop="value">-->
                    <!--<Input v-model="formData.value" placeholder="值" />-->
                <!--</FormItem>-->
                <FormItem label="排序:" prop="sort">
                    <Input v-model="formData.sort" number placeholder="排序，如：1，2，3" />
                </FormItem>
            </Form>

            <div slot="footer">
                <Button type="primary"
                        size="large"
                        :loading="loading_add"
                        @click="addDict_click">保存</Button>
            </div>
        </Modal>

        <!--授权-->
        <vAuthorize ref="modal_authorize"
                    :archiveId="modal_authorize_props.archiveId"></vAuthorize>

    </div>
</template>

<script>
    import comMixin from '../../../../lib/mixin/comMixin';
    import authMixin from '../../../../lib/mixin/authMixin';
    import vAuthorize from './authorize/authorize';
    export default {
        name: 'archived',
        mixins: [comMixin, authMixin],
        components: {vAuthorize},
        computed: {
            _tableColumns() {
                let column = [{ title: '操作', minWidth: 180, align: 'center',
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

                                }
                            }
                        }, '查看'));

                        list.push(h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small',
                                icon: 'md-contacts'
                            },
                            on: {
                                click: () => {
                                    this.modal_authorize_props.archiveId = params.row.archiveId;
                                    this.$refs.modal_authorize.modalValue = true;
                                }
                            }
                        }, '授权'));

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
                        archiveSource: '',
                        archiveStatus: 'complete_archive',
                        archiveTitle: '',
                        archiveType: '',
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
                    { title: '文号', width: 150, align: 'center', key: 'archiveNo' },
                    { title: '标题', minWidth: 160, align: 'center', key: 'archiveTitle' },
                    { title: '来源', width: 120, align: 'center', key: 'archiveSourceLabel' },
                    { title: '状态', width: 120, align: 'center', key: 'archiveStatusLabel' }
                ],
                tableData: [
                    {
                        insTime: '2018-09-21  08:50:08',
                        archiveNo: '闽泉港{2019}2号',
                        archiveTitle: '文件标题xxxxxxxxxxxxxx',
                        archiveSourceLabel: '省厅',
                        archiveStatusLabel: '待归档'
                    }
                ],
                tableLoading: false,
                // 字典
                dict_archiveSource: [],
                dict_archiveStatus: [],
                dict_archiveType: [],

                // 添加档案类型
                modal_addDict: false,
                loading_add: false,
                formData: {
                    // type: '',
                    // description: '',
                    label: '',
                    // value: '',
                    sort: 0
                },
                rules: {
                    label:  [{ required: true, message: '类别名称不能为空！', trigger: 'blur' }],
                    sort:  [
                        { type: 'number', message: '请输入整数！', trigger: 'blur' },
                        { required: true, type: 'number', message: '排序不能为空！', trigger: 'blur' }
                    ],
                },
                //
                modal_authorize_props: {
                    archiveId: ''
                }

            };
        },
        mounted() {
            this.getData();
            this.getDicts(['archiveSource', 'archiveStatus', 'archiveType']);
        },
        methods: {
            getColor(value) {
                return value === this.searchParams.condition.archiveType ? '#2d8cf0' : '#5cadff';
            },
            onChage_daterange(value) {
                this.searchParams.condition.beginTime = value[0];
                this.searchParams.condition.endTime = value[1];
            },
            resetSearchParams() {
                this.searchParams.condition.archiveSource = '';
                this.searchParams.condition.archiveTitle = '';
                this.searchParams.condition.archiveType = '';
                this.searchParams.condition.operator = '';
                this.searchParams.condition.beginTime = '';
                this.searchParams.condition.endTime = '';
                this.$refs.datePicker.handleClear();
            },
            archiveTypeSelect(item) {
                this.searchParams.condition.archiveType = item.value;
            },
            // 新建档案
            onClick_newArchiveType() {
                this.modal_addDict = true;
            },
            // 新建档案保存
            addDict_click() {
                this.loading_add = true;
                this.$refs.formAdd.validate((valid) => {
                    if (valid) {
                        this.$http({
                            method: 'post',
                            url: '/archive/addArchiveType',
                            data: JSON.stringify(this.formData)
                        }).then((res) => {
                            this.loading_add = false;
                            if (res.code === 'SUCCESS') {
                                this.$Message.success('添加成功!');
                                this.getDicts(['archiveType']);
                                this.modal_addDict = false;
                            }
                        }).catch(() => {
                            this.loading_add = false;
                        })
                    }
                    else {
                        this.loading_add = false;
                    }
                });
            },
            // 授权
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/archive/list',
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
    .archived-container {
        .box-panel {
            overflow: hidden;

            .left-panel {
                float: left;
                width: 150px;

                .dict-list {
                    .item {
                        margin-top: 10px;
                        text-align: center;
                        cursor: pointer;

                        p {
                            font-size: 14px;
                            text-align: center;
                        }

                    }
                }
            }
            .right-panel {
                float: left;
                width: calc(100% - 150px);
            }
        }
    }
</style>