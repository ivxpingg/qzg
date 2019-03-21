<template>
    <Modal v-model="modalValue"
           title="证书"
           :width="800"
           footer-hide
           @on-visible-change="onVisibleChange">
        <div class="ivx-table-box">
            <Table border
                   height="540"
                   :loading="tableLoading"
                   :columns="tableColumns"
                   :data="tableData"></Table>
        </div>

        <vDiploma ref="modal_diploma"
                  :certificateId="modal_diploma_props.certificateId" ></vDiploma>
    </Modal>
</template>

<script>
    import modalMixin from '../../../lib/mixin/modalMixin';
    import comMixin from '../../../lib/mixin/comMixin';
    import vDiploma from '../../StaffEducationAndTraining/certificateManage/diploma/diploma';
    export default {
        name: 'certificateList',   // 证书列表
        mixins: [modalMixin, comMixin],
        components: {vDiploma},
        data() {
            return {
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '时间', width: 150, align: 'center', key: 'insTime',
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.insTime, 'YYYY-MM-DD HH:mm:ss'));
                        }
                    },
                    { title: '课程名称', minWidth: 120, align: 'center', key: 'courseName' },
                    { title: '证书编号', minWidth: 120, align: 'center', key: 'certificateNo' },
                    { title: '操作', minWidth: 100, maxWidth: 170, align: 'center',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    icon: 'ios-create'
                                },
                                on: {
                                    click: () => {
                                        this.modal_diploma_props.certificateId = params.row.certificateId;
                                        this.$refs.modal_diploma.modalValue = true;
                                    }
                                }
                            }, '查看')
                        }
                    }
                ],
                tableData: [
                    {
                        "departmentName":"财务部",
                        "insTime":1552900088000,
                        "certificateId":"f26fb6f7108047b89ff188b29e09809f",
                        "userName":"系统维护管理员",
                        "grantFlag":"1",
                        "certificateNo":"NO.11861493",
                        "userId":"1",
                        "issuer":"小明",
                        "courseName":"技术培训",
                        "issueDate":1552900088000,
                        "courseId":"f3aedbc53a3746498ec5dd227c981fc8",
                        "certificateTypeLabel":"结业证书",
                        "certificateType":"course_completion"
                    }
                ],
                tableLoading: false,

                modal_diploma_props: {
                    certificateId: ''
                }

            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'get',
                    url: '/index/queryCertificate'
                }).then((res) => {
                    this.tableLoading = false;
                    if (res.code === 'SUCCESS') {
                        this.tableData = res.data;
                    }
                }).catch(() => {
                    this.tableLoading = false;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .certificateList-container {
    }
</style>