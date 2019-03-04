<template>
    <div class="home-container" ref="home">
        <Row :gutter="10">
            <i-col span="16" style="margin-bottom: 10px;">
                <Card title="资源中心" :dis-hover="true">
                    <Tabs v-model="name" :animated="false">
                        <TabPane label="学习资源" name="resource" icon="logo-buffer">
                            <vResource v-if="name === 'resource'">

                            </vResource>
                        </TabPane>
                        <TabPane label="培训课程" name="course" icon="md-albums">
                            <vCourse v-if="name === 'course'"></vCourse>
                        </TabPane>
                        <TabPane label="公文查阅" name="documentView" icon="md-document">
                            <vDocumentView v-if="name === 'documentView'"></vDocumentView>
                        </TabPane>
                    </Tabs>
                </Card>
            </i-col>
            <i-col span="8" style="margin-bottom: 10px;">
                <Card :dis-hover="true">
                    <vPersonInfo></vPersonInfo>
                </Card>
                <Card title="在修课程列表" style="margin-top: 10px;" :dis-hover="true">
                    <vCourseOfStudy></vCourseOfStudy>
                </Card>
            </i-col>


            <i-col span="8">
                <vNoticePanel></vNoticePanel>
            </i-col>
            <i-col span="16">
                <vCalendarWatch></vCalendarWatch>
            </i-col>
        </Row>
    </div>
</template>

<script>
    import vResource from './resourcePanel/resource';
    import vCourse from './coursePanel/course';
    import vDocumentView from './documentView/documentView';
    import vPersonInfo from './personInfoPanel/personInfo';
    import vCourseOfStudy from './courseOfStudy/courseOfStudy';
    import vNoticePanel from './noticePanel/noticePanel';
    import vCalendarWatch from './calendarWatch/calendarWatch';
    export default {
        name: 'mhome',
        components: {
            vResource,
            vCourse,
            vDocumentView,
            vPersonInfo,
            vCourseOfStudy,
            vNoticePanel,
            vCalendarWatch
        },
        data() {
            return {
                name: 'resource'
            }
        },
        mounted () {},
        methods: {
        }
    }
</script>

<style lang="scss">

</style>