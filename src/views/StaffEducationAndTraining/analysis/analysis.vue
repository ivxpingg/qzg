<template>
    <div class="analysis-container">
        <div class="count-panel">
            <div class="item">
                <vInfoCard shadow :color="countData[0].color" :icon="countData[0].icon" :icon-size="36">
                    <vCountTo :end="countData[0].count" class="six-count-style" count-class="count-style"/>
                    <p>{{ countData[0].title }}</p>
                </vInfoCard>
            </div>
            <div class="item">
                <vInfoCard shadow :color="countData[1].color" :icon="countData[1].icon" :icon-size="36">
                    <vCountTo :end="countData[1].count" class="six-count-style" count-class="count-style"/>
                    <p>{{ countData[1].title }}</p>
                </vInfoCard>
            </div>
            <div class="item">
                <vInfoCard shadow :color="countData[2].color" :icon="countData[2].icon" :icon-size="36">
                    <vCountTo :end="countData[2].count" class="six-count-style" count-class="count-style">
                        <span slot="right" class="count-style">%</span>
                    </vCountTo>
                    <p>{{ countData[2].title }}%</p>
                </vInfoCard>
            </div>
            <div class="item">
                <vInfoCard shadow :color="countData[3].color" :icon="countData[3].icon" :icon-size="36">
                    <vCountTo :end="countData[3].count" class="six-count-style" count-class="count-style"></vCountTo>
                    <p>{{ countData[3].title }}</p>
                </vInfoCard>
            </div>
            <div class="item">
                <vInfoCard shadow :color="countData[4].color" :icon="countData[4].icon" :icon-size="36">
                    <vCountTo :end="countData[4].count" class="six-count-style" count-class="count-style">
                        <span slot="right" class="count-style">h/人</span>
                    </vCountTo>
                    <p>{{ countData[4].title }}</p>
                </vInfoCard>
            </div>
        </div>
        <Row :gutter="10">
            <Col span="16" class="m-b-10">
                <Card title="学习资源访问情况" :dis-hover="true">

                </Card>
            </Col>
            <Col span="8" class="m-b-10">
                <Card title="培训排行榜" :dis-hover="true">

                </Card>
            </Col>

            <Col span="8" class="m-b-10">
                <Card title="培训类型情况" :dis-hover="true">

                </Card>
            </Col>
            <Col span="8" class="m-b-10">
                <Card title="培训报名情况" :dis-hover="true">

                </Card>
            </Col>
            <Col span="8" class="m-b-10">
                <Card title="学习排行榜" :dis-hover="true">

                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import vInfoCard from '../../../components/info-card/index';
    import vCountTo from '../../../components/count-to/index';
    export default {
        name: 'analysis',
        components: {
            vInfoCard,
            vCountTo
        },
        data() {
            return {
                countData: [
                    { title: '课程数量', icon: 'md-person', count: 10, color: '#2d8cf0' },
                    { title: '培训人次', icon: 'md-person', count:120, color: '#19be6b' },
                    { title: '课程合格率', icon: 'md-person', count: 90, color: '#ff9900' },
                    { title: '学习资源数量', icon: 'md-person', count: 200, color: '#ed3f14' },
                    { title: '学员学时', icon: 'md-person', count: 20, color: '#E46CBB' }
                ]
            };
        }
    }
</script>

<style lang="scss" scoped>
    .analysis-container {
        .count-panel {
            overflow: hidden;
            margin: 0 -5px 10px;
            .item {
                box-sizing: border-box;
                float: left;
                padding: 0 5px;
                width: 20%;
                height: 120px;
            }
        }

        .m-b-10 {
            margin-bottom: 10px;
        }
    }
</style>
<style lang="scss">
    .count-panel{
        .count-style {
            font-size: 36px;
        }
    }

</style>