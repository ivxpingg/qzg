<template>
    <div class="addLeave-container">
        <div class="leave-layout">
            <Row>
                <Col span="6"> <div class="title letter-spacing-20">请假人</div> </Col>
                <Col span="4">
                    <div class="text-center-center" style="padding-top: 20px;">
                        <span v-if="view">{{data.row_1_value_1}}</span>
                        <Input v-else v-model="data.row_1_value_1" size="small" style="width: 100px;"/>
                    </div>
                </Col>
                <Col span="4"> <div class="title">请假时间</div> </Col>
                <Col span="10">
                    <div class="text-center-center" style="padding-top: 5px;">
                        <span v-if="view">{{data.row_1_value_2}}</span>
                        <Input v-else v-model="data.row_1_value_2" size="small" style="width: 45px;"/>
                        年
                        <span v-if="view">{{data.row_1_value_3}}</span>
                        <Input v-else v-model="data.row_1_value_3" size="small" style="width: 35px;"/>
                        月
                        <span v-if="view">{{data.row_1_value_4}}</span>
                        <Input v-else v-model="data.row_1_value_4" size="small" style="width: 35px;"/>
                        日
                        至
                        <span v-if="view">{{data.row_1_value_5}}</span>
                        <Input v-else v-model="data.row_1_value_5" size="small" style="width: 45px;"/>
                        年
                        <span v-if="view">{{data.row_1_value_6}}</span>
                        <Input v-else v-model="data.row_1_value_6" size="small" style="width: 35px;"/>
                        月
                        <span v-if="view">{{data.row_1_value_7}}</span>
                        <Input v-else v-model="data.row_1_value_7" size="small" style="width: 35px;"/>
                    </div>
                    <div class="text-center-center" style="margin-top: 5px;">
                        共
                        <span v-if="view">{{data.row_1_value_8}}</span>
                        <Input v-else v-model="data.row_1_value_8" size="small" style="width: 45px;"/> 天
                    </div>

                </Col>
            </Row>
            <Row>
                <Col span="6"> <div class="title">请假类型</div> </Col>
                <Col span="18">
                    <div style="margin-left: 20px; padding-top: 20px;">
                        <span v-if="view">{{leaveType}}</span>
                        <RadioGroup v-else v-model="data.row_2_value_1" >
                            <Radio label="0">年休假</Radio>
                            <Radio label="1">探亲假</Radio>
                            <Radio label="2">婚假</Radio>
                            <Radio label="3">产假</Radio>
                            <Radio label="4">病假</Radio>
                            <Radio label="5">事假</Radio>
                            <Radio label="6">丧假</Radio>
                        </RadioGroup>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span="6"> <div class="title">处室意见</div> </Col>
                <Col span="18">
                    <div>
                        <Input v-model="data.row_3_value_1" type="textarea" :readonly="view" :autosize="{minRows: 3, maxRows: 3}" />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span="6"> <div class="title">人事部门审核</div> </Col>
                <Col span="18">
                    <div>
                        <Input v-model="data.row_4_value_1" type="textarea" :readonly="view" :autosize="{minRows: 3, maxRows: 3}" />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span="6"> <div class="title">局分管领导意见</div> </Col>
                <Col span="18">
                    <div>
                        <Input v-model="data.row_5_value_1" type="textarea" :readonly="view" :autosize="{minRows: 3, maxRows: 3}" />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span="6"> <div class="title">局主要领导意见</div> </Col>
                <Col span="18">
                    <div>
                        <Input v-model="data.row_6_value_1" type="textarea" :readonly="view" :autosize="{minRows: 3, maxRows: 3}" />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span="6"> <div class="title">销假时间</div> </Col>
                <Col span="6">
                    <div class="text-center-center" style="padding-top: 15px;">
                        <span v-if="view">{{data.row_7_value_1}}</span>
                        <Input v-else v-model="data.row_7_value_1" size="small" style="width: 45px;"/>
                        年
                        <span v-if="view">{{data.row_7_value_2}}</span>
                        <Input v-else v-model="data.row_7_value_2" size="small" style="width: 35px;"/>
                        月
                        <span v-if="view">{{data.row_7_value_3}}</span>
                        <Input v-else v-model="data.row_7_value_3" size="small" style="width: 35px;"/>
                        日
                    </div>
                </Col>
                <Col span="2">
                    <div class="text-center-center" style="letter-spacing: 6px; padding-top: 5px;">
                        销假<br/>
                        人签<br/>
                        名
                    </div>
                </Col>
                <Col span="4">
                    <div class="text-center-center" style="padding-top: 20px;">
                        <span v-if="view">{{data.row_7_value_4}}</span>
                        <Input v-else v-model="data.row_7_value_4" size="small" style="width: 100px;"/>
                    </div>
                </Col>
                <Col span="2">
                    <div class="text-center-center" style="letter-spacing: 6px; padding-top: 5px;">
                        直接<br/>
                        领导<br/>
                        签名
                    </div>
                </Col>
                <Col span="4">
                    <div class="text-center-center" style="padding-top: 20px;">
                        <span v-if="view">{{data.row_7_value_5}}</span>
                        <Input v-else v-model="data.row_7_value_5" size="small" style="width: 100px;"/>
                    </div>
                </Col>
            </Row>
            <div class="remark-content">
                <div class="item">备注：1、工作人员请销假请严格按照请销假管理制度执行；</div>
                <div class="item">2、请假类型一栏请在相应的类型后打√；</div>
                <div class="item">3、病假应附医院开具的疾病证明书；</div>
                <div class="item">4、局领导班子其他成员请假由人事部门审核，报局主要领导审批；局属单位、机关处室负责人请假由人事部门审核，经局分管领导同意，送局主要领导审批；局机关其他工作人员请假由所在处室负责人同意，报人事部门审核，送局分管领导审批；</div>
                <div class="item">5、局属各单位除负责人以外人员可参照本报告单自行审批。</div>
            </div>

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
    import Config from '../../../../config';
    import vAuditPersonSelect from '../../../Common/auditPersonSelect/auditPersonSelect';
    export default {
        name: 'addLeave',  // 请假申请
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
            view() {
                return this.type === 'view';
            },
            leaveType() {
                switch (this.data.row_2_value_1) {
                    case '0': return '年休假';
                    case '1': return '探亲假';
                    case '2': return '婚假';
                    case '3': return '产假';
                    case '4': return '病假';
                    case '5': return '事假';
                    case '6': return '丧假';
                }
            },
            isAuditStatus() {
                return this.currentUserId === this.leaveDetail.auditor && this.leaveDetail.leaveStatus === 'wait_audit';
            }
        },
        data() {
            return {
                currentUserId: this.$store.state.user.userId,
                // 提交审核对象
                leaveApply: {
                    auditor: '',
                    leaveType: 'leave',  // 请假类型， 请假：'leave'; 公出：'business'
                    beginTime: '',
                    endTime: '',
                    leaveContent : ''
                },
                // leaveContent
                data: {
                    row_1_value_1: '',
                    row_1_value_2: '',
                    row_1_value_3: '',
                    row_1_value_4: '',
                    row_1_value_5: '',
                    row_1_value_6: '',
                    row_1_value_7: '',
                    row_1_value_8: '',
                    row_2_value_1: '',
                    row_3_value_1: '',
                    row_4_value_1: '',
                    row_5_value_1: '',
                    row_6_value_1: '',
                    row_7_value_1: '',
                    row_7_value_2: '',
                    row_7_value_3: '',
                    row_7_value_4: '',
                    row_7_value_5: '',
                    signature: [
                        // {
                        //     roleId: '',
                        //     userId: '',
                        //     url: '',
                        //     x: 0,
                        //     y: 0
                        // }
                    ]
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
                    userId: ''
                },
                // 提交通过审核对象
                auditRecord: {
                    relationId: '',
                    auditor: '',
                    auditResult: '',
                    auditContent: '',
                    processType: 'leave'
                },

                // 盖章计算
                stampState: false,
                offsetX: 0,
                offsetY: 0,
                eSignatureUrl: '',

                // 选择用户人员

            };
        },
        watch: {
            leaveApplyId(val) {
                this.auditRecord.relationId = val;
                if (val) {
                    this.getLeaveDetail();
                }
                else {

                }
            },
            data: {
                deep: true,
                handler(val) {
                    this.leaveApply.beginTime = `${val.row_1_value_2}-${val.row_1_value_3}-${val.row_1_value_4}`;
                    this.leaveApply.endTime = `${val.row_1_value_2}-${val.row_1_value_3}-${val.row_1_value_4}`
                }
            }
        },
        mounted() {},
        methods: {
            // 判断必填
            validate() {
                if (this.data.row_1_value_1 === '') {
                    this.$Message.info('请填写请假人');
                    return false;
                }
                else if (this.data.row_1_value_2 === '') {
                    this.$Message.info('请填写请假时间');
                    return false;
                }
                else if (this.data.row_1_value_3 === '') {
                    this.$Message.info('请填写请假时间');
                    return false;
                }
                else if (this.data.row_1_value_4 === '') {
                    this.$Message.info('请填写请假时间');
                    return false;
                }
                else if (this.data.row_1_value_5 === '') {
                    this.$Message.info('请填写请假时间');
                    return false;
                }
                else if (this.data.row_1_value_6 === '') {
                    this.$Message.info('请填写请假时间');
                    return false;
                }
                else if (this.data.row_1_value_7 === '') {
                    this.$Message.info('请填写请假时间');
                    return false;
                }

                return true;
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
                                row_1_value_2: '',
                                row_1_value_3: '',
                                row_1_value_4: '',
                                row_1_value_5: '',
                                row_1_value_6: '',
                                row_1_value_7: '',
                                row_1_value_8: '',
                                row_2_value_1: '',
                                row_3_value_1: '',
                                row_4_value_1: '',
                                row_5_value_1: '',
                                row_6_value_1: '',
                                row_7_value_1: '',
                                row_7_value_2: '',
                                row_7_value_3: '',
                                row_7_value_4: '',
                                row_7_value_5: '',
                                signature: []
                            }, eval('[' + res.data.leaveContent + ']')[0]);
                        }
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
            modal_auditPersonSelect_callback(userId) {

                if (!this.leaveApplyId) {
                    // this.leaveApply.auditResult = 'pass';
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
                    this.auditRecord.auditContent = JSON.stringify(this.data);
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
                this.auditRecord.auditContent = JSON.stringify(this.data);
                this.$refs.modal_auditPersonSelect.modalValue = true;
            },
            // 审核不通过
            onClick_audit_noPass() {
                this.auditRecord.auditor = '';
                this.auditRecord.auditResult = 'not_pass';
                this.auditRecord.auditContent = JSON.stringify(this.data);
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
    .addLeave-container {
        .leave-layout {
            position: relative;
            .title {
                font-size: 14px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                letter-spacing: 2px;

                &.letter-spacing-20 {
                    letter-spacing: 20px;
                }
            }

            .text-center-center {
                text-align: center;
            }

            .signature-box {
                position: absolute;
                z-index: 10;
                top: 0;
                left: 0;
                width: 100px;
                height: 100px;
                img {
                    width: 100px;
                    height: 100px;
                    border-image: none;
                    border: none;
                }
            }
            .stamp-layer{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 100;
                background-color: rgba(33,33,33,0.2);
                overflow: hidden;
                .signature-img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100px;
                    height: 100px;
                    box-shadow:3px 3px 5px #7d7d7d;
                    transition: all 0.05s;
                }
            }
            .stamp-layer-mouse {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 101;
                cursor: url("./images/cursor-stamp.png"), pointer;
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

        .remark-content {
            padding: 20px 40px;
            font-size: 14px;
            .item {
                text-indent: 42px;
                &:first-child{
                    text-indent: 0;
                }
            }
        }
    }
</style>