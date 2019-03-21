<template>
    <div class="rankList-container">
        <div class="item item-top">
            <div class="left-panel">培训名称</div>
            <div class="right-panel">毕业人数占比</div>
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
        name: 'rankList',    // 排行榜
        data() {
            return {
                list: [
                    // {courseName: '课程1', process: 60},
                    // {courseName: '课程2', process: 20},
                    // {courseName: '课程3', process: 40},
                    // {courseName: '课程4', process: 54},
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
                    url: '/statisticAnalysis/trainRank'
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.list = res.data.map(v => {
                            v.process = parseInt(v.graduateRate * 100);
                            return v;
                        })
                    }
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
    .rankList-container {
        height: 350px;
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