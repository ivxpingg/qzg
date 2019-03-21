<template>
    <div class="personInfo-container">
        <div class="user-info">
            <div class="left-panel">
                <img width="100" height="100" src="/images/user-man.png" alt="">
            </div>
            <div class="right-panel">
                <div class="attr name">{{$store.state.user.userName}}</div>
                <div class="attr">部门：{{$store.state.user.roleName}}</div>
                <div class="attr">账号：{{$store.state.user.loginName}}</div>
                <div class="attr">证书数量：<Button type="text" @click="lookCertificate">{{certificateCount}} 个</Button></div>
            </div>
        </div>
        <div class="other-info">
            <div class="item">
                <div class="title">培训学时</div>
                <div class="value">{{baseCount.trainPeriodNum || 0}}h</div>
            </div>
            <div class="item">
                <div class="title">待结业课程</div>
                <div class="value">{{baseCount.noCompletedCourseNum}}</div>
            </div>
            <div class="item">
                <div class="title">待办事项</div>
                <div class="value">{{baseCount.waitHandleNum}}</div>
            </div>
            <div class="item">
                <div class="title">消息通知</div>
                <div class="value">{{baseCount.noticeNum}}</div>
            </div>
        </div>

        <vCertificateList ref="modal_certificateList"></vCertificateList>
    </div>
</template>

<script>
    import vCertificateList from '../certificateList/certificateList';
    export default {
        name: 'personInfo',
        components: {vCertificateList},
        data() {
            return {
                baseCount: {
                    noticeNum: '0',
                    trainPeriodNum: '0',
                    noCompletedCourseNum: '0',
                    waitHandleNum: '10'
                },

                certificateCount: 0
            };
        },
        mounted() {
            this.getData();
            this.getCertificateCount();
        },
        methods: {
            getData() {
                this.$http({
                    method: 'get',
                    url: '/index/baseCount'
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        Object.assign(this.baseCount, res.data);
                    }
                })
            },
            getCertificateCount() {
                this.tableLoading = true;
                this.$http({
                    method: 'get',
                    url: '/index/queryCertificate'
                }).then((res) => {
                    this.tableLoading = false;
                    if (res.code === 'SUCCESS') {
                        this.certificateCount = res.data.length;
                    }
                }).catch(() => {
                    this.tableLoading = false;
                })
            },
            lookCertificate() {
                this.$refs.modal_certificateList.modalValue = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .personInfo-container {
        .user-info {
            height: 200px;
            padding-top: 30px;
            .left-panel {
                float: left;
                width: 40%;
                text-align: center;
                img {
                    display: inline-block;
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
            }
            .right-panel {
                float: left;
                width: 59%;
                .attr {
                    margin-top: 10px;
                    margin-left: 15px;
                }
                .name {
                    font-size: 16px;
                    font-weight: 700;
                }
            }
        }
        .other-info {
            height: 200px;
            .item {
                float: left;
                height: 100px;
                width: 50%;
                border-width: 0 0 1px 1px;
                border-style: solid;
                border-color: #dcdee2;

                &:nth-child(1), &:nth-child(2) {
                    border-top-width: 1px ;
                }
                &:nth-child(2n) {
                    border-right-width: 1px ;
                }

                .title {
                    margin-top: 20px;
                    margin-bottom: 10px;
                    font-size: 18px;
                    color: #515a6e;
                    text-align: center;
                }
                .value {
                    font-size: 20px;
                    color: #2d8cf0;
                    text-align: center;
                }
            }
        }
    }
</style>