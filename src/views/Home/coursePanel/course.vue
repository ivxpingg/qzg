<template>
    <div class="course-container">
        <vIvxFilterBox dashed>
            <Form inline>
                <FormItem label="筛选条件:" :label-width="80">
                    <RadioGroup v-model="searchParams.condition.courseType" type="button">
                        <Radio label="">全部</Radio>
                        <Radio v-for="item in dict_courseType"
                               :label="item.value" :key="item.id">{{item.label}}</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        </vIvxFilterBox>

        <div class="ivx-table-box">
            <div class="course-list-panel">
                <div class="item" v-for="item in tableData" :key="item.courseId">
                    <div class="left-panel" style="position: relative;">
                        <img src="./images/course-bg.jpg" alt="">
                        <div style="position: absolute; padding: 0 15px; left: 0; top: 20px; right: 0; text-align: center; font-size: 14px; color: #FFF;">{{item.courseName}}</div>
                    </div>
                    <div class="center-panel">
                        <div class="title">{{item.courseName}}</div>
                        <div class="time">培训时间：{{getTime(item)}}</div>
                        <div class="address">培训地点：{{item.address}}</div>
                        <div class="courseContent">培训内容：{{item.courseContent}}</div>
                    </div>
                    <div class="right-right">
                        <Button v-if="(item.courseStatus === 'sign_up' || item.courseStatus === 'training') && item.signStatus === 0" type="primary" @click="onClick_signUp(item.courseId, item.courseName)">我要报名</Button>
                        <span v-else-if="item.signStatus === 1" style="color: #19be6b;">已报名</span>
                    </div>
                    <div class="courseStatus">
                        {{item.courseStatusLabel}}
                    </div>
                </div>
            </div>
            <Page prev-text="上一页"
                  next-text="下一页"
                  show-total
                  :current="searchParams.current"
                  :page-size="searchParams.size"
                  :total="searchParams.total"
                  @on-change="onPageChange"></Page>
        </div>
    </div>
</template>

<script>
    import comMixin from '../../../lib/mixin/comMixin';
    import authMixin from '../../../lib/mixin/authMixin';
    export default {
        name: 'course', // 培训课程
        mixins: [comMixin, authMixin],
        data() {
            return {
                searchParams: {
                    current: 1,        // 当前第几页
                    size: 10,          // 每页几行
                    total: 0,           // 总行数
                    condition: {
                        courseType: '',
                        searchKey: ''
                    }
                },
                tableData: [
                    // {
                    //     courseId: '001',
                    //     courseName: 'java',
                    //     departmentName: '办公室',
                    //     startTime: '2018-09-21',
                    //     endTime: '2018-09-21',
                    //     address: '办公室',
                    //     courseStatusLabel: '报名中',
                    //     userNum: 20,
                    //     courseTypeLabel: '技能培训',
                    //     courseContent: '技能培训技能培训技能培训技能培训技能培训技能培训技能培训技能培训技能培训技能培训技能培训技能培训技能培训技能培训技能培训技能培训'
                    // }
                ],
                tableLoading: false,

                dict_courseType: []
            };
        },
        mounted() {
            this.getDicts(['courseType']);
            this.getData();
        },
        watch: {
            'searchParams.current'() {
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
            getTime(item) {
                return `${this.timeFormat(item.startTime, 'YYYY-MM-DD')} ~ ${this.timeFormat(item.endTime, 'YYYY-MM-DD')}`
            },
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/index/courseList',
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
            onClick_signUp(courseId, courseName) {
                this.$Modal.confirm({
                    title: '报名',
                    content: `确定要报名《${courseName}》课程?`,
                    onOk: () => {
                        this.$http({
                            method: 'get',
                            url: '/signRecord/add',
                            params: {
                                courseId: courseId
                            }
                        }).then((res) => {
                            if (res.code === 'SUCCESS') {
                                this.$Message.success('报名成功!');
                                this.getData();
                            }
                            else {
                                this.$Message.error('报名失败!');
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .course-container {
        .course-list-panel{
            height: 660px;
            overflow-y: auto;
            margin-bottom: 10px;
            .item {
                position: relative;
                margin-bottom: 10px;
                padding: 10px;
                border: 1px solid #dcdee2;
                border-radius: 5px;
                overflow: hidden;
                .left-panel {
                    float: left;
                    width: 120px;
                    text-align: center;
                    img {
                        display: inline-block;
                        width: 100px;
                        height: 100px;
                    }
                }

                .center-panel{
                    position: relative;
                    float: left;
                    width: calc(100% - 241px);

                    .title {
                        font-size: 16px;
                        font-weight: 700;
                    }
                    .time {
                        font-size: 12px;
                    }
                    .address{
                        font-size: 12px;
                    }
                    .courseContent{
                        font-size: 12px;
                    }

                }
                .right-right {
                    float: left;
                    margin-top: 40px;
                    width: 120px;
                    text-align: center;
                }

                .courseStatus {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                }
            }

        }
    }
</style>