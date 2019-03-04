<template>
    <Card class="calendarWatch-container" title="请假公出情况" :dis-hover="true">
        <a href="#" slot="extra" @click.prevent="changeLimit">
            <Icon type="md-create"></Icon>
            填写申请
        </a>

    </Card>
</template>

<script>
    export default {
        name: 'calendarWatch',
        data() {
            return {};
        }
    }
</script>

<style lang="scss" scoped>
    .calendarWatch-container {
    }
</style>