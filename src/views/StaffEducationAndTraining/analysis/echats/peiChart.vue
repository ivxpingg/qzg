<template>
    <div class="peiChart-container" ref="chart">
    </div>
</template>

<script>
    import Echarts from 'echarts';
    import baseOption from './baseOption';
    import { merge } from '@/lib/tools';
    export default {
        name: 'peiChart',
        data() {
            return {
                chart: null
            };
        },
        mounted() {
            this.initChart();
        },
        methods: {
            initChart() {
                this.chart = Echarts.init(this.$refs.chart);
                let options = {
                    tooltip: {
                        // trigger: 'item',
                    },
                    xAxis: {
                        axisLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name:'督察类型分析',
                            type:'pie',
                            avoidLabelOverlap: false,
                            radius : ['45%', '65%'],

                            // label: {
                            //     normal: {
                            //         show: false,
                            //         position: 'center'
                            //     },
                            //     emphasis: {
                            //         show: true,
                            //         textStyle: {
                            //             fontWeight: 'bold'
                            //         }
                            //     }
                            // },
                            // labelLine: {
                            //     normal: {
                            //         show: false
                            //     }
                            // },
                            data:[
                                {value:335, name:'张三'},
                                {value:310, name:'李四'},
                                {value:234, name:'方河'},
                                {value:135, name:'卫军'},
                                {value:1548, name:'何华'}
                            ]
                        }
                    ]
                };

                options = merge(true, baseOption, options);
                this.chart.setOption(options);
            },
            getData() {
                this.$http({
                    method: 'get',
                    url: '/projectShow/checkWayCount',
                    params: {
                        year: this.year
                    }
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.resetOption(res.data);
                    }
                })
            },
            resetOption(list) {
                let myOPtion = this.chart.getOption();

                myOPtion.series[0].data = [];

                list.forEach(val => {
                    myOPtion.series[0].data.push({
                        value: val.num,
                        name: val.checkWay
                    });
                });

                this.chart.setOption(myOPtion);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .peiChart-container {
        height: 350px;
    }
</style>