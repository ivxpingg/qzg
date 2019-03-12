<template>
    <Modal v-model="modalValue"
           title="申请"
           :width="900"
           footer-hide
           @on-visible-change="onVisibleChange">
        <vApplyPage @callback="callback"></vApplyPage>
    </Modal>
</template>

<script>
    import vApplyPage from '../../../OrganizationManage/leaveManage/add/applyPage';
    import modalMixin from '../../../../lib/mixin/modalMixin';
    export default {
        name: 'applyLeaveOrGoout',
        mixins: [modalMixin],
        components: {vApplyPage},
        data() {
            return {

            };
        },
        mounted() {
        },
        methods: {
            /**
             * 请假或公出回调
             * @param type [String] 'leave': 请假； 'business': 公出
             * @param code [String] 'success': 成功； 'error': 失败
             */
            callback(type, code) {
                if (code === 'success') {
                    this.modalValue = false;
                }
            }

        }
    }
</script>

<style lang="scss" scoped>
    .applyLeaveOrGoout-container {
    }
</style>