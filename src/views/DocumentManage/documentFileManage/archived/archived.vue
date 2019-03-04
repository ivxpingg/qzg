<template>
    <div class="archived-container">
    </div>
</template>

<script>
    import comMixin from '../../../../lib/mixin/comMixin';
    import authMixin from '../../../../lib/mixin/authMixin';
    export default {
        name: 'archived',
        mixins: [comMixin, authMixin],
        data() {
            return {};
        }
    }
</script>

<style lang="scss" scoped>
    .archived-container {
    }
</style>