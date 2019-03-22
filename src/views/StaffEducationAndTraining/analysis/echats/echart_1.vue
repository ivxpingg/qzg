<template>
    <div class="echart_1-container">
        <div class="echart" ref="chart"></div>
        <Form class="form" inline>
            <FormItem label="">
                <Select v-model="selectValue">
                    <Option value="day" label="近30天"></Option>
                    <Option value="month" label="近6月份"></Option>
                </Select>
            </FormItem>
        </Form>

    </div>
</template>

<script>
    import Echarts from 'echarts';
    import baseOption from './baseOption';
    import { merge } from '@/lib/tools';
    export default {
        name: 'echart_1',
        data() {
            return {
                selectValue: 'month',
                chart: null
            };

        },
        mounted() {
            this.initChart();
            this.getData();
        },
        watch: {
            selectValue() {
                this.getData();
            }
        },
        methods: {
            initChart() {
                this.chart = Echarts.init(this.$refs.chart);
                let options = {
                    grid: {
                        bottom: 30
                    },
                    tooltip: {
                        trigger: 'axis',
                    },
                    xAxis: {
                        show: true,
                        type: 'category',
                        boundaryGap: false,
                        data: []
                        // data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                    },
                    yAxis: {
                        type: 'value',
                        name: '单位(次)'
                    },
                    series: [{
                        // data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320],
                        data: [],
                        type: 'line',
                        smooth: true,
                        areaStyle: {}
                    }]
                };

                options = merge(true, baseOption, options);
                this.chart.setOption(options);
            },
            getData() {
                this.$http({
                    method: 'get',
                    url: '/statisticAnalysis/resourceVisitInfo',
                    params: {
                        type: this.selectValue
                    }
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

                let format = this.selectValue === 'month' ? 'M月' : 'D日';

                data.forEach(val => {
                    myOPtion.xAxis[0].data.push(this.$moment(val.insTime).format(format));
                    myOPtion.series[0].data.push(val.visitNum);
                });

                this.chart.setOption(myOPtion);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echart_1-container {
        position: relative;
        .echart {
            height: 350px;
        }

        .form {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
</style>