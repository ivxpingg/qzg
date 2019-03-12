<template>
    <div class="courseOfStudy-container">
        <div class="item item-top">
            <div class="left-panel">课程名称</div>
            <div class="right-panel">学习进度</div>
        </div>
        <div class="item" v-for="item in list" :key="item.courseName">
            <div class="left-panel">{{item.courseName}}</div>
            <div class="right-panel">
                <Progress :percent="item.process"  />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'courseOfStudy',   // 在修课程列表
        data() {
            return {
                list: [
                    {courseName: '课程1', process: 60},
                    {courseName: '课程2', process: 20},
                    {courseName: '课程3', process: 40},
                    {courseName: '课程4', process: 54},
                ]
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                this.$http({
                    method: 'get',
                    url: '/index/learningCourseList'
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.list = res.data.map(v => {
                            v.process = parseInt(v.process * 100);
                            return v;
                        })
                    }
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
    .courseOfStudy-container {
        height: 410px;
        overflow-y: auto;
        .item {
            overflow: hidden;
            .left-panel {
                margin-top: 10px;
                float: left;
                width: 30%;
            }
            .right-panel{
                margin-top: 10px;
                float: left;
                width: 69.99%;
            }
        }
    }
</style>