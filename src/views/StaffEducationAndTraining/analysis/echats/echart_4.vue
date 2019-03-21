<template>
    <div class="echart_4-container" ref="chart">
    </div>
</template>

<script>
    import Echarts from 'echarts';
    import baseOption from './baseOption';
    import { merge } from '@/lib/tools';
    export default {
        name: 'echart_4',
        data() {
            return {
                chart: null
            };
        },
        mounted() {
            this.initChart();
            this.getData();
        },
        methods: {
            initChart() {
                this.chart = Echarts.init(this.$refs.chart);
                let options = {
                    legend: {
                        top: 0,
                        right: 0,
                        data: []
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        name: '',
                        type: 'category',
                        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        data: []
                    },
                    yAxis: {
                        type: 'value',
                        name: '学时'
                    },
                    series: [
                        {
                            data: [],
                            type: 'bar',
                            name: '学时'
                        }
                    ]
                };

                options = merge(true, baseOption, options);
                this.chart.setOption(options);
            },
            getData() {
                this.$http({
                    method: 'get',
                    url: '/statisticAnalysis/studyRank'
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.resetOption(res.data);
                    }
                })
            },
            resetOption(data) {
                let myOPtion = this.chart.getOption();

                myOPtion.xAxis[0].data = [];
                myOPtion.series[0].data = [];


                data.forEach(val => {
                    myOPtion.xAxis[0].data.push(val.userName || '');
                    myOPtion.series[0].data.push(val.period);
                });
                this.chart.setOption(myOPtion);
                this.chart.resize();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echart_4-container {
        height: 350px;
    }
</style>