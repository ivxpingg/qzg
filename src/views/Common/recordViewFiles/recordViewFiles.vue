<template>
    <Modal v-model="modalValue"
           title="查看附件"
           :width="800">
        <div class="ivx-table-box">
            <Table border
                   :loading="tableLoading"
                   height="400"
                   :columns="tableColumns"
                   :data="tableData"></Table>
        </div>
        <!---->
        <!--<vViewFile ref="viewFile"-->
                   <!--:title="viewFileProps.title"-->
                   <!--:src="viewFileProps.src"-->
                   <!--:format="viewFileProps.format"-->
                   <!--:target="viewFileProps.target"></vViewFile>-->
    </Modal>
</template>

<script>
    import modalMixin from '../../../lib/mixin/modalMixin';
    import vViewFile from '../../../components/viewFile/viewFile';
    import Config from '../../../config';
    export default {
        name: 'recordViewFiles',
        mixins: [modalMixin],
        components: {vViewFile},
        props: {
            archiveId: {
                type: String,
                default: ''
            },
            preview: {
                type: Boolean,
                default: true
            },
            download: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                tableLoading: false,
                tableColumns: [
                    { title: '序号', width: 60, align: 'center', type: 'index' },
                    { title: '文件名', align: 'center', key: 'fileName' },
                    { title: '文件格式', width: 100, align: 'center', key: 'fileFormat' },
                    {
                        title: '操作',
                        width: 240,
                        align: 'center',
                        // fixed: 'right',
                        render: (h, params) => {
                            let list = [];

                            // list.push(
                            //     h('Button', {
                            //         props: {
                            //             type: 'info',
                            //             size: 'small',
                            //             icon: 'ios-eye-outline'
                            //         },
                            //         on: {
                            //             click: () => {
                            //                 this.$Spin.show();
                            //                 this.$http({
                            //                     method: 'get',
                            //                     url: '/index/getAttach',
                            //                     params: {
                            //                         archiveAttachId: params.row.archiveAttachId
                            //                     }
                            //                 }).then((res) => {
                            //                     this.$Spin.hide();
                            //                 }).catch(() => {
                            //                     this.$Spin.hide();
                            //                 })
                            //
                            //             }
                            //         }
                            //     }, '预览')
                            // );

                            list.push(
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        to: Config[Config.env].origin + Config[Config.env].ajaxUrl + '/index/getAttach?archiveAttachId=' + params.row.archiveAttachId,
                                        icon: 'ios-cloud-download-outline',
                                        target: '_blank',
                                        loading: params.row.loading
                                    },
                                    attrs: {
                                        download: params.row.fileName + '.' + params.row.fileFormat
                                    },
                                    on: {
                                        click() {
                                            params.row.loading = true;
                                            setTimeout(() => {
                                                params.row.loading = false;
                                            }, 10000);
                                        }
                                    }
                                }, '下载')
                            );

                            return h('div',{
                                class: 'ivx-table-cell-handle'
                            },list);
                        }
                    }
                ],
                tableData: []
            };
        },
        watch: {
            archiveId(val) {
                if (val) {
                    this.getData();
                }
                else {}
            }
        },
        methods: {
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'get',
                    url: '/index/getArchiveAttachList',
                    params: {
                        archiveId: this.archiveId
                    }
                }).then((res) => {
                    this.tableLoading = false;
                    if (res.code === 'SUCCESS') {
                        this.tableData = res.data.map(v => {
                            v.loading = false;
                            return v;
                        });
                    }
                }).catch(() => {
                    this.tableLoading = false;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .recordViewFiles-container {
    }
</style>