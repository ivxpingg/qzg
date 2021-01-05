<template>
    <div class="toArchive-container">
        <vIvxFilterBox>
            <Form inline>
                <FormItem label="文件来源:" :label-width="70">
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
                <!--<FormItem label="创建人:" :label-width="60">-->
                    <!--<Input v-model="searchParams.condition.operator"-->
                           <!--style="width: 100px;"-->
                           <!--placeholder="请输入"/>-->
                <!--</FormItem>-->
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
                <FormItem>

                </FormItem>
            </Form>
        </vIvxFilterBox>
        <vIvxFilterBox>
            <Dropdown @on-click="toArchiveList">
                <Button type="primary">
                    归档
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="item in dict_archiveType"
                                  :key="item.id"
                                  :name="item.value">{{item.label}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </vIvxFilterBox>

        <div class="ivx-table-box">
            <Table border
                   ref="table"
                   height="540"
                   :loading="tableLoading"
                   :columns="_tableColumns"
                   :data="tableData"></Table>
            <Page prev-text="上一页"
                  next-text="下一页"
                  show-total
                  show-sizer
                  :page-size-opts="[10, 20, 30, 40, 50]"
                  :current="searchParams.current"
                  :page-size="searchParams.size"
                  :total="searchParams.total"
                  @on-page-size-change="onPageSizeChange"
                  @on-change="onPageChange"></Page>
        </div>

        <!--查看档案附件-->
        <vRecordViewFiles ref="modal_recordViewFiles"
                          :archiveId="modal_recordViewFiles_props.archiveId" ></vRecordViewFiles>
    </div>
</template>

<script>
    import comMixin from '../../../../lib/mixin/comMixin';
    import authMixin from '../../../../lib/mixin/authMixin';
    import vRecordViewFiles from '../../../Common/recordViewFiles/recordViewFiles';
    export default {
        name: 'toArchive',
        mixins: [comMixin, authMixin],
        components: {vRecordViewFiles},
        computed: {
            _tableColumns() {
                let column = [{ title: '操作', width: 120, align: 'center',
                    render: (h, params) => {
                        let list = [];

                        // list.push(h('Button', {
                        //     props: {
                        //         type: 'info',
                        //         size: 'small',
                        //         icon: 'ios-eye'
                        //     },
                        //     on: {
                        //         click: () => {
                        //             this.modal_recordViewFiles_props.archiveId = params.row.archiveId;
                        //             this.$refs.modal_recordViewFiles.modalValue = true;
                        //         }
                        //     }
                        // }, '查看'));

                        list.push(h('Dropdown', {
                            props: {
                                type: 'primary',
                                size: 'small',
                                icon: 'ios-create'
                            },
                            style: {
                                marginLeft: '10px'
                            },
                            on: {
                                'on-click': (archiveType) => {
                                    this.toArchive(archiveType, params.row);
                                }
                            }
                        }, [h('a',[ '归档',  h('Icon', { props: { type: 'ios-arrow-down' } }) ]),
                            h('DropdownMenu', {
                                props: {},
                                slot: 'list'
                            } ,this.dict_archiveType.map(item => {
                                return h('DropdownItem', {
                                    props:{
                                        name: item.value
                                    }
                                }, item.label)
                            })) ]));

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
                        archiveStatus: 'wait_archive',
                        archiveTitle: '',
                        operator: '',
                        beginTime: '',
                        endTime: ''
                    }
                },
                tableColumns: [
                    { title: '', width: 65, align: 'center', type: 'selection',
                        // renderHeader:(h, params) => {
                        //     return h('Checkbox', {
                        //         props: {
                        //             value: false
                        //         },
                        //         on: {
                        //             'on-change': (value) => {
                        //                 this.tableData.forEach(val => {
                        //                     if(value) {
                        //                         if (this.selectedList.indexOf(val.archiveId) === -1) {
                        //                             this.selectedList.push(val.archiveId);
                        //                         }
                        //                     }
                        //                     else {
                        //                         if (this.selectedList.indexOf(val.archiveId) !== -1) {
                        //                             this.selectedList.splice(this.selectedList.indexOf(val.archiveId), 1);
                        //                         }
                        //                     }
                        //                 });
                        //
                        //             }
                        //         }
                        //     })
                        // },
                        // render: (h, params) => {
                        //     return h('Checkbox', {
                        //         props: {
                        //             value: this.isSelectedValue(params.row.archiveId)
                        //         },
                        //         on: {
                        //             'on-change': (value) => {
                        //                 if(value) {
                        //                     this.selectedList.push(params.row.archiveId);
                        //                 }
                        //                 else {
                        //                     this.selectedList.splice(this.selectedList.indexOf(params.row.archiveId), 1);
                        //                 }
                        //             }
                        //         }
                        //     })
                        // }
                    },
                    { title: '时间', width: 150, align: 'center', key: 'insTime',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.archiveTime, 'YYYY-MM-DD HH:mm:ss'));
                        }
                    },
                    { title: '文号', width: 180, align: 'center', key: 'archiveNo' },
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

                modal_recordViewFiles_props: {
                    archiveId: ''
                }
            };
        },
        mounted() {
            this.getData();
            this.getDicts(['archiveSource', 'archiveStatus', 'archiveType']);
        },
        watch: {
            'searchParams.current'() {
                this.getData();
            },
            'searchParams.size'() {
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
                this.searchParams.condition.archiveSource = '';
                this.searchParams.condition.archiveTitle = '';
                this.searchParams.condition.operator = '';
                this.searchParams.condition.beginTime = '';
                this.searchParams.condition.endTime = '';
                this.$refs.datePicker.handleClear();
            },
            // 归档
            toArchive(archiveType, row) {
                this.$http({
                    method: 'post',
                    url: '/archive/handleArchive',
                    data: JSON.stringify({
                        archiveIds:  row.archiveId,
                        archiveType: archiveType
                    })
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.$Message.success('归档成功!');
                        this.getData();
                    }
                })
            },
            // isSelectedValue(value) {
            //     return this.selectedList.indexOf(value) !== -1;
            // },
            // 批量归档
            toArchiveList(archiveType) {

                let ids = this.$refs.table.getSelection().map(v => v.archiveId).join(',');

                if (ids === '') {
                    this.$Message.info('请选择要归档的文档');
                    return
                }

                this.$http({
                    method: 'post',
                    url: '/archive/handleArchive',
                    data: JSON.stringify({
                        archiveIds: ids,
                        archiveType: archiveType
                    })
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.$Message.success('归档成功!');
                        this.getData();
                    }
                })
            },

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
    .toArchive-container {
    }
</style>
