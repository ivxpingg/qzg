<template>
    <Modal v-model="modalValue"
           class="addCredential-container"
           title="证书"
           :width="1064"
           @on-visible-change="onVisibleChange">
        <div class="diploma-box">
            <div class="content" style="padding-top: 250px;">
                {{certificateInfo.userName}} 于 {{certificateInfo.issueDate}}, 参加由“{{certificateInfo.departmentName}}”举办的《{{certificateInfo.courseName}}》，
                考核合格，准予结业。
            </div>
            <div class="content" style="position: absolute; left: 0; bottom: 180px;">
                特发此证！
            </div>
            <div class="num" style="left: 160px; bottom: 100px;">
                证书编号：{{certificateInfo.certificateNo}}
            </div>
            <div class="date" style="right: 140px; bottom: 100px;">
                填发日期： {{certificateInfo.issueDate}}
            </div>
        </div>
    </Modal>
</template>

<script>
    import modalMixin from '../../../../lib/mixin/modalMixin';
    import comMixin from '../../../../lib/mixin/comMixin';
    export default {
        name: 'diploma',
        mixins: [modalMixin, comMixin],
        props: {
            certificateId: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                certificateInfo: {
                    departmentName: '',
                    courseName: '',
                    certificateNo: '',
                    issueDate: '',
                    userName: '',
                    userId: '',
                    certificateTypeLabel: '',
                    issuer: '',
                    certificateType: ''
                }
            };
        },
        watch: {
            certificateId(val) {
                if (val) {
                    this.getData();
                }
            }
        },
        methods: {
            getData() {
                this.$http({
                    method: 'get',
                    url: '/certificate/query',
                    params: {
                        certificateId: this.certificateId
                    }
                }).then((res) => {

                    if (res.code === 'SUCCESS') {
                        Object.assign(this.certificateInfo, res.data, {
                            issueDate: this.timeFormat(res.data.issueDate, 'YYYY年MM月DD日')
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .diploma-container {
    }

    .diploma-box {
        position: relative;
        width: 1024px;
        height: 678px;
        background: url("./images/diploma-bg.jpg") no-repeat;

        .content{
            padding: 0 100px 0;
            font-size: 30px;
            font-weight: 700;
            letter-spacing: 10px;
            text-indent: 60px;
            line-height: 60px;
        }

        .num, .date {
            position: absolute;
            font-size: 20px;
            letter-spacing: 4px;
        }
    }
</style>