<template>
    <Modal v-model="modalValue"
           title="查看"
           :width="900"
           footer-hide
           @on-visible-change="onVisibleChange">
        <vAddViewLeave v-if="leaveType === 'leave'" :type="type" :leaveApplyId="relationId"  @callback="callback"></vAddViewLeave>
        <vAddViewGoout v-if="leaveType === 'business'" :type="type" :leaveApplyId="relationId"  @callback="callback"></vAddViewGoout>
    </Modal>
</template>

<script>
    import modalMixin from '../../../../lib/mixin/modalMixin';
    import vAddViewLeave from './addViewLeave';
    import vAddViewGoout from './addViewGoout';
    export default {
        name: 'auditOrView',
        mixins: [modalMixin],
        components: {vAddViewLeave, vAddViewGoout},
        props: {
            type: {
                validator(value) {
                    return ['add', 'audit', 'view'].indexOf(value) > -1;
                },
                default: 'add'
            },
            leaveType: {
                type: String,
                default: ''
            },
            relationId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {};
        },
        methods: {
            /**
             *
             * @param type [String] 'leave': 请假； 'business': 公出
             * @param code [String] 'success': 成功； 'error': 失败
             */
            callback(type, code) {
                this.modalValue = false;
                this.$emit('callback',type, code);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .auditOrView-container {
    }
</style>