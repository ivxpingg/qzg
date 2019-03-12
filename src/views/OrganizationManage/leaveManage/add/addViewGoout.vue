<template>
    <div class="addViewGoout-container">

        <div class="bussiness-layout">
            <h4 style="text-align: center; font-weight: 700;">出差审批单</h4>
            <div style="text-align: right; border-bottom: 1px solid #dcdee2; padding: 10px 30px;">
                <span v-if="readonly">{{data.row_1_value_1}}</span>
                <DatePicker v-else
                            type="date"
                            placeholder="请选择时间"
                            @on-change="onChange_date"
                            style="width: 120px"></DatePicker>
            </div>

            <Row>
                <Col span="4"> <div class="title">姓名</div> </Col>
                <Col span="4">
                    <div class="text-center-center" style="padding-top: 20px;">
                        <span v-if="readonly">{{data.row_2_value_1}}</span>
                        <Input v-else v-model="data.row_2_value_1" size="small" style="width: 100px;"/>
                    </div>
                </Col>
                <Col span="4"> <div class="title">出差地点</div> </Col>
                <Col span="6">
                    <div class="text-center-center" style="padding-top: 20px;">
                        <span v-if="readonly">{{data.row_2_value_2}}</span>
                        <Input v-else v-model="data.row_2_value_2" size="small" style="width: 180px;"/>
                    </div>
                </Col>
                <Col span="3"> <div class="title">人数</div> </Col>
                <Col span="3">
                    <div class="text-center-center" style="padding-top: 20px;">
                        <span v-if="readonly">{{data.row_2_value_3}}</span>
                        <Input v-else v-model="data.row_2_value_3" size="small" style="width: 100px;"/>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col span="4"> <div class="title">同行人员</div> </Col>
                <Col span="14"></Col>
                <Col span="3"> <div class="title">出行交通工具</div> </Col>
                <Col span="3"></Col>
            </Row>

            <Row>
                <Col span="4"> <div class="title">出差事由</div> </Col>
                <Col span="20"></Col>
            </Row>

            <Row>
                <Col span="4"> <div class="title">出差起止时间</div> </Col>
                <Col span="8"></Col>
                <Col span="4"> <div class="title">天数</div> </Col>
                <Col span="8"></Col>
            </Row>

            <Row>
                <Col span="4"> <div class="title">经办人</div> </Col>
                <Col span="8"></Col>
                <Col span="4"> <div class="title">审批人</div> </Col>
                <Col span="8"></Col>
            </Row>

            <Row>
                <Col span="24"> <div class="title">以下内容由出差人员如实申报</div> </Col>
            </Row>

            <Row>
                <Col span="4">
                    <Row>
                        <Col span="24"><div class="title">用餐情况</div></Col>
                        <Col span="24"><div class="title">用车情况</div></Col>
                    </Row>
                </Col>

                <Col span="16">
                    <Row>
                        <Col span="5"><div class="title">自行用餐</div></Col>
                        <Col span="19"></Col>
                    </Row>
                    <Row>
                        <Col span="5"><div class="title">接待单位协助安排就餐</div></Col>
                        <Col span="7"></Col>
                        <Col span="5"><div class="title">交款金额</div></Col>
                        <Col span="7"></Col>
                    </Row>
                    <Row>
                        <Col span="5"><div class="title">接待单位提供交通工具</div></Col>
                        <Col span="7"></Col>
                        <Col span="5"><div class="title">交款金额</div></Col>
                        <Col span="7"></Col>
                    </Row>
                    <Row>
                        <Col span="5"><div class="title">本单位或其他省直单位提供交通工具</div></Col>
                        <Col span="19"></Col>
                    </Row>
                    <Row>
                        <Col span="5"><div class="title">自行用车</div></Col>
                        <Col span="19"></Col>
                    </Row>
                </Col>

                <Col span="4">
                    <Row>
                        <Col span="24"><div class="title">说明</div></Col>
                        <Col span="24"></Col>
                    </Row>
                </Col>

            </Row>

            <Row>
                <Col span="4"> <div class="title">备注</div> </Col>
                <Col span="20">
                    <div>1.凡由接待单位协助安排就餐的，接待单位应该按标准安排，出差人员应当在差旅费管理办法规定的标准内向接待单位交纳相应的伙食费，原则上快餐每人每餐15元，桌餐每人每餐50元。
                        <br/>
                        2.凡由接待单位提供交通工具的，出差人员应当在差旅费管理办法规定的标准内向接待单位交纳市内交通费。
                        <br/>
                        3.交纳伙食费和市内交通费相关凭证作为报销附件归档。
                        <br/>
                        4.一天内由两家不同接待单位按照规定各安排一次工作餐的，出差人员当天不在领取伙食补助费。</div>
                </Col>
            </Row>
            <Row>
                <Col span="4"></Col>
                <Col span="16"> <div class="title">经办人签名</div> </Col>
                <Col span="4"></Col>
            </Row>

        </div>
    </div>
</template>

<script>
    import comMixin from '../../../../lib/mixin/comMixin';
    import Config from '../../../../config';
    export default {
        name: 'addViewGoout',  // 公出申请
        mixins: [comMixin],
        components: {},
        props: {
            type: {
                validator(value) {
                    return ['add', 'audit', 'view'].indexOf(value) > -1;
                },
                default: 'add'
            },
            leaveApplyId: {
                type: String,
                default: ''
            }
        },
        computed: {
            readonly() {
                return this.type !== 'add';
            },
            isAuditStatus() {
                return this.currentUserId === this.leaveDetail.auditor && this.leaveDetail.leaveStatus === 'wait_audit';
            },
            currentUserId() {
                return this.$store.state.user.userId;
            }
        },
        data() {
            return {
                // 提交审核对象
                leaveApply: {
                    auditor: '',
                    leaveType: 'business',  // 请假类型， 请假：'leave'; 公出：'business'
                    beginTime: '',
                    endTime: '',
                    leaveContent : ''
                },
                data: {
                    row_1_value_1: '',

                    row_2_value_1: this.$store.state.user.userName,
                    row_2_value_2: '',
                    row_2_value_3: '',

                    row_3_value_1: '',
                    row_3_value_2: '',

                    row_4_value_1: '',

                    row_5_value_1: '',
                    row_5_value_2: '',
                    row_5_value_3: '',

                    row_6_value_1: '',
                    row_6_value_2: '',



                },

                // 请假公出详情
                leaveDetail: {
                    applyer: '',
                    auditProcessId: '',
                    auditor: '',
                    leaveApplyId: '',
                    leaveContent: '',
                    leaveStatus: '',
                    processStepId: '',
                    userId: '',
                    lastStep: ''
                },
            };
        },
        methods: {
            onChange_date(value) {
                this.data.row_1_value_1 = value;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .addViewGoout-container {
        .bussiness-layout {
            position: relative;

            .title {
                font-size: 14px;
                min-height: 60px;
                text-align: center;
                letter-spacing: 2px;

                &.letter-spacing-20 {
                    letter-spacing: 20px;
                }
            }

            .text-center-center {
                text-align: center;
            }
        }

        .ivu-row {
            .ivu-col {
                min-height: 65px;
                height: 100%;
                border-width: 0 0 1px 1px;
                border-style: solid;
                border-color: #dcdee2;

                &:last-child {
                    border-right-width: 1px;
                }
            }

            &:first-child {
                .ivu-col {
                    border-top-width: 1px;
                }
            }
        }
    }
</style>