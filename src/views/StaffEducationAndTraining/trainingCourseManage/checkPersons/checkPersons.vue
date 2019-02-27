<template>
    <Modal v-model="modalValue"
           class="checkPersons-container"
           title="查看学员"
           :width="650"
           footer-hide
           @on-visible-change="onVisibleChange">
        <div class="ivx-table-box">
            <Table border
                   height="400"
                   :loading="tableLoading"
                   :columns="tableColumns"
                   :data="tableData"></Table>
        </div>
    </Modal>
</template>

<script>
    import modalMixin from '../../../../lib/mixin/modalMixin';
    import comMixin from '../../../../lib/mixin/comMixin';
    export default {
        name: 'checkPersons',  // 查看人员
        mixins: [modalMixin, comMixin],
        props: {
            courseId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                tableColumns: [
                    { title: '序号', width: 65, align: 'center', type: 'index', },
                    { title: '员工名称', width: 120, align: 'center', key: 'employeeName' },
                    { title: '报名时间', width: 180, align: 'center',
                        render: (h, params) => {
                            let str = this.timeFormat(params.row.signTime, 'YYYY-MM-DD HH:mm:ss');
                            return h('div', str);
                        }
                    },
                    { title: '电话', width: 120, align: 'center', key: 'phone' },
                    { title: '部门', minWidth: 120, align: 'center', key: 'departmentName' },

                ],
                tableData: [
                    {
                        employeeName: '小陈',
                        signTime: '2018-09-21',
                        phone: '13592625355',
                        departmentName: '办公室'
                    }
                ],
                tableLoading: false,
            };
        },
        watch: {
            courseId: {
                immediate: true,
                handler(val) {
                    if (val) {
                        this.formData.courseId = val;
                        this.getData();
                    }
                    else {
                        this.resetFormData();
                    }
                }
            }
        },
        methods: {
            getData() {
                this.$http({
                    method: 'get',
                    url: '/',
                    params: {
                        courseId: this.courseId
                    }
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.tableData = res.data;
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .checkPersons-container {
    }
</style>