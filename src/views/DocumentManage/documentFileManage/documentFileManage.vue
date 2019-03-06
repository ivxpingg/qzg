<template>
    <div class="documentFileManage-container">
        <Tabs v-model="name" :animated="false">
            <TabPane label="待归档文件" name="toArchive">
                <vToArchive v-if="name === 'toArchive'"></vToArchive>
            </TabPane>
            <TabPane label="已归档文件" name="archived">
                <vArchived v-if="name === 'archived'"></vArchived>
            </TabPane>
            <TabPane label="查阅申请管理" name="applyMange">
                <vApplyManage v-if="name === 'applyMange'"></vApplyManage>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import vToArchive from './toArchive/toArchive';
    import vArchived from './archived/archived';
    import vApplyManage from './applyManage/applyManage';
    export default {
        name: 'documentFileManage',
        components: {vToArchive,vArchived,vApplyManage},
        data() {
            return {
                name: 'applyMange'
            };
        }
    }
</script>

<style lang="scss" scoped>
    .documentFileManage-container {
    }
</style>