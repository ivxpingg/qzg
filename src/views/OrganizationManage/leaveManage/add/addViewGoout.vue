<template>
    <div class="addViewGoout-container">

        <div class="bussiness-layout">
            <h4 style="text-align: center; font-weight: 700;">出差审批单</h4>
            <div style="text-align: right; border-bottom: 1px solid #dcdee2; padding: 10px 30px;">
                <span v-if="readonly">{{data.row_1_value_1}}</span>
                <DatePicker v-else
                            type="date"
                            placeholder="请选择时间"
                            @on-change="onChange_date_row1"
                            style="width: 120px"></DatePicker>
            </div>

            <Row class="border-left border-right border-bottom">
                <Col span="4"> <div class="title">姓名</div> </Col>
                <Col span="4">
                    <div class="text-center-center" style="padding-top: 16px;">
                        <span v-if="readonly">{{data.row_2_value_1}}</span>
                        <Input v-else v-model="data.row_2_value_1" size="small" style="width: 100px;"/>
                    </div>
                </Col>
                <Col span="4"> <div class="title">出差地点</div> </Col>
                <Col span="6">
                    <div class="text-center-center" style="padding-top: 16px;">
                        <span v-if="readonly">{{data.row_2_value_2}}</span>
                        <Input v-else v-model="data.row_2_value_2" size="small" style="width: 180px;"/>
                    </div>
                </Col>
                <Col span="3"> <div class="title">人数</div> </Col>
                <Col span="3">
                    <div class="text-center-center" style="padding-top: 16px;">
                        <span v-if="readonly">{{data.row_2_value_3}}</span>
                        <Input v-else v-model="data.row_2_value_3" size="small" style="width: 100px;"/>
                    </div>
                </Col>
            </Row>

            <Row class="border-left border-right border-bottom">
                <Col span="4"> <div class="title">同行人员</div> </Col>
                <Col span="14">
                    <div class="text-center-center" style="padding-top: 5px;">
                        <span v-if="readonly">{{data.row_3_value_1}}</span>
                        <Input v-else
                               v-model="data.row_3_value_1"
                               type="textarea"
                               :autosize="{minRows: 2, maxRows: 2}"
                               style="width: 480px;"/>
                    </div>
                </Col>
                <Col span="3"> <div class="title">出行交通工具</div> </Col>
                <Col span="3">
                    <div class="text-center-center" style="padding-top: 16px;">
                        <span v-if="readonly">{{data.row_3_value_2}}</span>
                        <Input v-else v-model="data.row_3_value_2" size="small" style="width: 100px;"/>
                    </div>
                </Col>
            </Row>

            <Row class="border-left border-right border-bottom">
                <Col span="4"> <div class="title">出差事由</div> </Col>
                <Col span="20">
                    <div class="text-center-center" style="padding-top: 5px;">
                        <span v-if="readonly">{{data.row_4_value_1}}</span>
                        <Input v-else
                               v-model="data.row_4_value_1"
                               type="textarea"
                               :autosize="{minRows: 2, maxRows: 2}"
                               style="width: 700px;"/>
                    </div>
                </Col>
            </Row>

            <Row class="border-left border-right border-bottom">
                <Col span="4"> <div class="title">出差起止时间</div> </Col>
                <Col span="8">
                    <div class="text-center-center" style="padding-top: 16px;">
                        <span v-if="readonly">{{data.row_5_value_1 + '~' + data.row_5_value_2}}</span>
                        <DatePicker type="daterange"
                                    placeholder="选择起始时间"
                                    size="small"
                                    @on-change="onChange_daterange"
                                    style="width: 270px"></DatePicker>
                    </div>
                </Col>
                <Col span="4"> <div class="title">天数</div> </Col>
                <Col span="8">
                    <div class="text-center-center" style="padding-top: 16px;">
                        <span v-if="readonly">{{data.row_5_value_3}}</span>
                        <Input v-else v-model="data.row_5_value_3" size="small" style="width: 260px;"/>
                    </div>
                </Col>
            </Row>

            <Row class="border-left border-right border-bottom">
                <Col span="4"> <div class="title">经办人</div> </Col>
                <Col span="8">
                    <div class="text-center-center" style="padding-top: 16px;">
                        <span v-if="readonly">{{data.row_6_value_1}}</span>
                        <Input v-else v-model="data.row_6_value_1" size="small" style="width: 260px;"/>
                    </div>
                </Col>
                <Col span="4"> <div class="title">审批人</div> </Col>
                <Col span="8">
                    <div class="text-center-center" style="padding-top: 16px;">
                        <span v-if="readonly">{{data.row_6_value_2}}</span>
                        <Input v-else v-model="data.row_6_value_2" size="small" style="width: 260px;"/>
                    </div>
                </Col>
            </Row>

            <Row class="border-left border-right border-bottom">
                <Col span="24"> <div class="title">以下内容由出差人员如实申报</div> </Col>
            </Row>

            <Row class="border-left border-right border-bottom">
                <Col span="4">
                    <Row>
                        <Col class="border-bottom" span="24"><div class="title">用餐情况</div></Col>
                        <Col span="24" style="height: 90px; border-left-width: 0;"><div class="title">用车情况</div></Col>
                    </Row>
                </Col>

                <Col span="16">
                    <Row class="border-bottom">
                        <Col span="5"><div class="title">自行用餐</div></Col>
                        <Col span="19">
                            <div style="margin-left: 20px; padding-top: 20px;">
                                <span v-if="readonly">{{dinnerType}}</span>
                                <RadioGroup v-else v-model="data.row_7_value_1" >
                                    <Radio label="0">全部</Radio>
                                    <Radio label="1">部分</Radio>
                                    <Radio label="2">无</Radio>
                                </RadioGroup>
                            </div>
                        </Col>
                    </Row>
                    <Row class="border-bottom">
                        <Col span="5" style="height: 70px;"><div class="title">接待单位协助安排就餐</div></Col>
                        <Col span="7" style="height: 70px;">
                            <div style="margin-left: 20px; padding-top: 20px;">
                                <span v-if="readonly">{{unitDinnerType}}</span>
                                <RadioGroup v-else v-model="data.row_8_value_1" >
                                    <Radio label="0">全部</Radio>
                                    <Radio label="1">部分</Radio>
                                    <Radio label="2">无</Radio>
                                </RadioGroup>
                            </div>
                        </Col>
                        <Col span="5" style="height: 70px;"><div class="title">交款金额</div></Col>
                        <Col span="7" style="height: 70px;">
                            <div class="text-center-center" style="padding-left: 10px; padding-top: 20px;">
                                <span v-if="readonly">{{data.row_8_value_2}}</span>
                                <Input v-else v-model="data.row_8_value_2" size="small" style="width: 150px;">
                                    <span slot="append">元</span>
                                </Input>
                            </div>
                        </Col>
                    </Row>
                    <Row class="border-bottom">
                        <Col span="5" style="height: 70px;"><div class="title">接待单位提供交通工具</div></Col>
                        <Col span="7" style="height: 70px;">
                            <div style="margin-left: 20px; padding-top: 20px;">
                                <span v-if="readonly">{{unitGoOut}}</span>
                                <RadioGroup v-else v-model="data.row_9_value_1" >
                                    <Radio label="0">全部</Radio>
                                    <Radio label="1">部分</Radio>
                                    <Radio label="2">无</Radio>
                                </RadioGroup>
                            </div>
                        </Col>
                        <Col span="5" style="height: 70px;"><div class="title">交款金额</div></Col>
                        <Col span="7" style="height: 70px;">
                            <div class="text-center-center" style="padding-left: 10px; padding-top: 20px;">
                                <span v-if="readonly">{{data.row_9_value_2}}</span>
                                <Input v-else v-model="data.row_9_value_2" size="small" style="width: 150px;">
                                    <span slot="append">元</span>
                                </Input>
                            </div>
                        </Col>
                    </Row>
                    <Row class="border-bottom">
                        <Col span="5" style="height: 90px;"><div class="title">本单位或其他省直单位提供交通工具</div></Col>
                        <Col span="19" style="height: 90px;">
                            <div style="margin-left: 20px; padding-top: 30px;">
                                <span v-if="readonly">{{otherTrip}}</span>
                                <RadioGroup v-else v-model="data.row_10_value_1" >
                                    <Radio label="0">全部</Radio>
                                    <Radio label="1">部分</Radio>
                                    <Radio label="2">无</Radio>
                                </RadioGroup>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="5"><div class="title">自行用车</div></Col>
                        <Col span="19">
                            <div style="margin-left: 20px; padding-top: 20px;">
                                <span v-if="readonly">{{bike}}</span>
                                <RadioGroup v-else v-model="data.row_11_value_1" >
                                    <Radio label="0">全部</Radio>
                                    <Radio label="1">部分</Radio>
                                    <Radio label="2">无</Radio>
                                </RadioGroup>
                            </div>
                        </Col>
                    </Row>
                </Col>

                <Col span="4">
                    <Row>
                        <Col span="24" style="height: 350px;">
                            <div class="title">说明</div>
                            <div class="text-center-center" style="padding-top: 5px;">
                                <span v-if="readonly">{{data.row_7_value_2}}</span>
                                <Input v-else
                                       v-model="data.row_7_value_2"
                                       type="textarea"
                                       :autosize="{minRows: 15, maxRows: 15}"
                                       style="width: 120px;"/>
                            </div>
                        </Col>
                    </Row>
                </Col>

            </Row>

            <Row class="border-left border-right border-bottom">
                <Col span="4"> <div class="title">备注</div> </Col>
                <Col span="20">
                    <div style="padding: 10px;">1.凡由接待单位协助安排就餐的，接待单位应该按标准安排，出差人员应当在差旅费管理办法规定的标准内向接待单位交纳相应的伙食费，原则上快餐每人每餐15元，桌餐每人每餐50元。
                        <br/>
                        2.凡由接待单位提供交通工具的，出差人员应当在差旅费管理办法规定的标准内向接待单位交纳市内交通费。
                        <br/>
                        3.交纳伙食费和市内交通费相关凭证作为报销附件归档。
                        <br/>
                        4.一天内由两家不同接待单位按照规定各安排一次工作餐的，出差人员当天不在领取伙食补助费。</div>
                </Col>
            </Row>

            <Row class="border-left border-right border-bottom">
                <Col span="4"><div class="title">经办人签名</div></Col>
                <Col span="16">

                </Col>
                <Col span="4">
                    <div class="text-center-center" style="padding-top: 16px;">
                        <span v-if="readonly">{{data.row_12_value_2}}</span>
                        <DatePicker type="date"
                                    placeholder="选择时间"
                                    size="small"
                                    @on-change="onChange_date_row12"
                                    style="width: 120px"></DatePicker>
                    </div>
                </Col>
            </Row>

            <div v-for="item in data.signature"
                 class="signature-box"
                 :style="{ top: `${item.y-50}px\\9`,  left: `${item.x-50}px\\9`,
                 transform: `translate(${item.x-50}px, ${item.y-50}px)`}">
                <img :src="joinUrl(item.url)" alt=""/>
            </div>

            <div class="stamp-layer" v-show="stampState">
                <img class="signature-img"
                     :src="joinUrl(eSignatureUrl)"
                     :style="{top: `${offsetY-50}px\\9`,  left: `${offsetX-50}px\\9`,
                 transform: `translate(${offsetX-50}px, ${offsetY-50}px)`}">
            </div>
            <div class="stamp-layer-mouse"
                 v-show="stampState"
                 @mousemove="onMousemove($event)" @click="onClick_stamp"></div>

        </div>

        <div class="ivu-modal-footer" style="padding-bottom: 0;">
            <div>
                <Button v-if="leaveApplyId === ''" type="primary" @click="onClick_submit_audit">提交审核</Button>
                <Button v-if="isAuditStatus" type="info" @click="onClick_signature">电子签名</Button>
                <Button v-if="isAuditStatus" type="primary" @click="onClick_audit_pass">审核通过</Button>
                <Button v-if="isAuditStatus" type="error" @click="onClick_audit_noPass">审核不通过</Button>
            </div>
        </div>

        <!--选择审核人员-->
        <vAuditPersonSelect ref="modal_auditPersonSelect"
                            :relationId="leaveApplyId"
                            processType="leave" @modal-callback="modal_auditPersonSelect_callback"></vAuditPersonSelect>
    </div>
</template>

<script>
    import comMixin from '../../../../lib/mixin/comMixin';
    import Config from '../../../../config';
    import vAuditPersonSelect from '../../../Common/auditPersonSelect/auditPersonSelect';
    export default {
        name: 'addViewGoout',  // 公出申请
        mixins: [comMixin],
        components: {vAuditPersonSelect},
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
            },
            // 用餐情况
            dinnerType() {
                switch (this.data.row_7_value_1) {
                    case '0': return '全部';
                    case '1': return '部分';
                    case '2': return '无';
                }
            },
            // 单位用餐情况
            unitDinnerType() {
                switch (this.data.row_8_value_1) {
                    case '0': return '全部';
                    case '1': return '部分';
                    case '2': return '无';
                }
            },
            // 接待单位交通工具
            unitGoOut() {
                switch (this.data.row_9_value_1) {
                    case '0': return '全部';
                    case '1': return '部分';
                    case '2': return '无';
                }
            },
            // 本单位或其他省直单位提供交通工具
            otherTrip() {
                switch (this.data.row_10_value_1) {
                    case '0': return '全部';
                    case '1': return '部分';
                    case '2': return '无';
                }
            },
            // 本单位或其他省直单位提供交通工具
            bike() {
                switch (this.data.row_11_value_1) {
                    case '0': return '全部';
                    case '1': return '部分';
                    case '2': return '无';
                }
            },
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

                    row_7_value_1: '2',  // 默认值
                    row_7_value_2: '',

                    row_8_value_1: '2',  // 默认值
                    row_8_value_2: '',

                    row_9_value_1: '2',  // 默认值
                    row_9_value_2: '',

                    row_10_value_1: '2',  // 默认值

                    row_11_value_1: '2',  // 默认值

                    row_12_value_1: '',
                    row_12_value_2: '',

                    signature: []
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

                // 已审核的内容
                auditContentList: [],

                // 提交通过审核对象
                auditRecord: {
                    relationId: '',
                    auditor: '',
                    auditResult: '',
                    auditContent: '',
                    leaveContent: '',
                    processType: 'leave'
                },

                // 盖章计算
                stampState: false,
                offsetX: 0,
                offsetY: 0,
                eSignatureUrl: '',
            };
        },
        watch: {
            leaveApplyId: {
                immediate: true,
                handler(val) {
                    this.auditRecord.relationId = val;
                    if (val) {
                        this.getLeaveDetail();
                        this.getAuditContent();
                    }
                    else {

                    }
                }
            },
            data: {
                deep: true,
                handler(val) {
                    this.leaveApply.beginTime = this.timeFormat(val.row_5_value_1, 'YYYY-MM-DD HH:mm:ss');
                    this.leaveApply.endTime = this.timeFormat(val.row_5_value_2, 'YYYY-MM-DD HH:mm:ss');
                }
            }
        },
        methods: {
            // 判断必填
            validate() {
                // if (this.data.row_1_value_1 === '') {
                //     this.$Message.info('请填写请假人');
                //     return false;
                // }
                // else if (this.data.row_1_value_2 === '') {
                //     this.$Message.info('请填写请假时间');
                //     return false;
                // }
                // else if (this.data.row_1_value_3 === '') {
                //     this.$Message.info('请填写请假时间');
                //     return false;
                // }

                return true;
            },
            onChange_date_row1(value) {
                this.data.row_1_value_1 = value;
            },
            onChange_daterange(value) {
                this.data.row_5_value_1 = value[0];
                this.data.row_5_value_2 = value[1];
            },
            onChange_date_row12(value) {
                this.data.row_1_value_1 = value;
            },
            // 拼接图片地址
            joinUrl(url) {
                return Config[Config.env].filePath + url;
            },
            onMousemove(e) {
                if (this.stampState) {
                    this.offsetX = e.offsetX;
                    this.offsetY = e.offsetY;
                }
            },
            onClick_stamp() {
                let exits = false;
                this.stampState = false;
                this.data.signature.forEach(v => {
                    if (v.userId === this.currentUserId) {
                        v.userId = this.currentUserId;
                        v.url = this.eSignatureUrl;
                        v.x = this.offsetX;
                        v.y = this.offsetY;

                        exits = true;
                    }
                });

                if (!exits) {
                    this.data.signature.push({
                        userId: this.currentUserId,
                        url: this.eSignatureUrl,
                        x: this.offsetX,
                        y: this.offsetY
                    })
                }

            },

            // 获取详情
            getLeaveDetail() {
                this.$http({
                    method: 'get',
                    url: '/leaveApply/detail',
                    params: {
                        leaveApplyId: this.leaveApplyId
                    }
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        Object.assign(this.leaveDetail, {
                            applyer: '',
                            auditProcessId: '',
                            auditor: '',
                            leaveApplyId: '',
                            leaveContent: '',
                            leaveStatus: '',
                            processStepId: '',
                            userId: ''
                        },res.data);

                        if (res.data.leaveContent) {
                            Object.assign(this.data, {
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
                                row_7_value_1: '2',  // 默认值
                                row_7_value_2: '',
                                row_8_value_1: '2',  // 默认值
                                row_8_value_2: '',
                                row_9_value_1: '2',  // 默认值
                                row_9_value_2: '',
                                row_10_value_1: '2',  // 默认值
                                row_11_value_1: '2',  // 默认值
                                row_12_value_1: '',
                                row_12_value_2: '',
                                signature: []
                            }, eval('[' + res.data.leaveContent + ']')[0]);
                        }
                    }
                })
            },

            // 获取审核内容
            getAuditContent() {
                this.$http({
                    method: 'get',
                    url: '/auditRecord/getAuditRecordList',
                    params: {
                        relationId: this.leaveApplyId
                    }
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.auditContentList = res.data || [];
                    }
                })
            },
            // 提交审核
            onClick_submit_audit() {
                if (this.validate()) {
                    this.leaveApply.leaveContent = JSON.stringify(this.data);
                    this.$refs.modal_auditPersonSelect.modalValue = true;
                }

            },
            // 选择神人员回调
            modal_auditPersonSelect_callback(userId) {

                if (!this.leaveApplyId) {
                    this.leaveApply.auditor = userId;
                    this.$Modal.confirm({
                        title: '提交审核',
                        content: '确定要提交请假?',
                        onOk: () => {
                            this.$http({
                                method: 'post',
                                url: '/leaveApply/leaveApply',
                                data: JSON.stringify(this.leaveApply)
                            }).then(res => {
                                if (res.code === 'SUCCESS') {
                                    this.$Message.success('提交成功!');
                                    this.$emit('callback', 'leave', 'success')
                                }
                            })
                        }
                    })
                }
                else {
                    this.auditRecord.auditor = userId;
                    this.auditRecord.auditResult = 'pass';
                    this.auditRecord.leaveContent = JSON.stringify(this.data);
                    this.$Modal.confirm({
                        title: '审核',
                        content: '确定审核通过?',
                        onOk: () => {
                            this.$http({
                                method: 'post',
                                url: '/auditRecord/audit',
                                data: JSON.stringify(this.auditRecord)
                            }).then(res => {
                                if(res.code === 'SUCCESS') {
                                    this.$Message.success('提交成功!');
                                    this.$emit('callback', 'leave', 'success');
                                }
                            })
                        }
                    })
                }
            },

            // 电子签名
            onClick_signature() {
                // this.eSignatureUrl = '../images/user-man.png';
                // this.stampState = true;

                this.$http({
                    method: 'get',
                    url: '/signature/getSignature'
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.eSignatureUrl = res.data.url;
                        this.stampState = true;
                    }
                })
            },
            // 审核通过
            onClick_audit_pass() {
                if (this.auditRecord.auditContent.trim() === '') {
                    this.$Message.error('请填写审核意见');
                    return;
                }
                if (this.leaveDetail.lastStep) {
                    this.modal_auditPersonSelect_callback('');
                }
                else {
                    this.$refs.modal_auditPersonSelect.modalValue = true;
                }
            },
            // 审核不通过
            onClick_audit_noPass() {
                if (this.auditRecord.auditContent.trim() === '') {
                    this.$Message.error('请填写审核意见');
                    return;
                }
                this.auditRecord.auditor = '';
                this.auditRecord.auditResult = 'not_pass';
                this.auditRecord.leaveContent = JSON.stringify(this.data);
                this.$Modal.confirm({
                    title: '审核',
                    content: '确定审核不通过?',
                    onOk: () => {
                        this.$http({
                            method: 'post',
                            url: '/auditRecord/audit',
                            data: JSON.stringify(this.auditRecord)
                        }).then(res => {
                            if(res.code === 'SUCCESS') {
                                this.$Message.success('提交成功!');
                                this.$emit('callback', 'leave', 'success');
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .addViewGoout-container {
        .bussiness-layout {
            position: relative;

            .title {
                padding: 15px 3px 0;
                font-size: 14px;
                min-height: 55px;
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
            >.ivu-col {
                min-height: 55px;
                border-left: 1px solid #dcdee2;
            }

            >.ivu-col:first-child {
                border-left-width: 0;
            }
        }

        .border-left {
            border-left: 1px solid #dcdee2;
        }
        .border-top {
            border-top: 1px solid #dcdee2;
        }
        .border-right {
            border-right: 1px solid #dcdee2;
        }
        .border-bottom {
            border-bottom: 1px solid #dcdee2;
        }


    }
</style>
