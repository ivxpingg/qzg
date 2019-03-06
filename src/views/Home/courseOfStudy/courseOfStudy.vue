<template>
    <div class="courseOfStudy-container">
        <div class="item item-top">
            <div class="left-panel">课程名称</div>
            <div class="right-panel">学习进度</div>
        </div>
        <div class="item" v-for="item in list" :key="item.courseName">
            <div class="left-panel">{{item.courseName}}</div>
            <div class="right-panel">
                <Progress :percent="item.rate"  />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'courseOfStudy',
        data() {
            return {
                list: [
                    {courseName: '课程1', rate: 60},
                    {courseName: '课程2', rate: 20},
                    {courseName: '课程3', rate: 40},
                    {courseName: '课程4', rate: 54},
                ]
            };
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