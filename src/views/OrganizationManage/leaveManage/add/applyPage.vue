<template>
    <div class="applyPage-container">
        <Tabs v-model="name" :animated="false">
            <TabPane label="请假申请" name="leave">
                <vAddViewLeave type="add"  @callback="callback"></vAddViewLeave>
            </TabPane>
            <TabPane label="公出申请" name="business">
                <vAddViewGoout type="add"  @callback="callback"></vAddViewGoout>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import vAddViewLeave from './addViewLeave';
    import vAddViewGoout from './addViewGoout';
    export default {
        name: 'applyPage',  // 请假和公出申请页面
        components: {vAddViewLeave, vAddViewGoout},
        props: {},
        data() {
            return {
                name: 'leave'
            };
        },
        methods: {
            /**
             *
             * @param type [String] 'leave': 请假； 'business': 公出
             * @param code [String] 'success': 成功； 'error': 失败
             */
            callback(type, code) {
                this.$emit('callback',type, code);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .applyPage-container {
    }
</style>