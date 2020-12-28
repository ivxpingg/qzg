<template>
    <Modal v-model="modalValue"
           title="选择审核人员"
           :width="400"
           @on-visible-change="onVisibleChange">
        <Form ref="form"
              :model="formData"
              :rules="required ? rules : {}"
              :label-width="80">
            <FormItem label="选择人员:" prop="selectedList">
                <Select v-model="formData.selectedList" clearable filterable>
                    <Option v-for="item in userList"
                            :value="item.userId"
                            :key="item.userId">{{ item.name }}</Option>
                </Select>
            </FormItem>
        </Form>

        <div slot="footer">
            <Button type="primary"
                    size="large"
                    @click="save">确定</Button>
        </div>
    </Modal>
</template>

<script>
    import modalMixin from '../../../lib/mixin/modalMixin';
    export default {
        name: 'auditPersonSelect',  // 选择审核人员
        mixins: [modalMixin],
        props: {
            required: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            /**
             * 选择的用户
             * @returns {[Object, undefined]}
             */
            selectItem() {
               return this.userList.find(v => v.userId === this.formData.selectedList);
            }
        },
        data() {
            return {
                userList: [],
                formData: {
                    selectedList: ''
                },
                rules: {
                    selectedList: [{ required: true, message: '请选择用户！', trigger: 'blur' }],
                }
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                this.$http({
                    method: 'get',
                    url: '/auditRecord/auditorList'
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.userList = res.data || [];
                    }
                })
            },

            save() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.modalValue = false;
                        this.$emit('modal-callback', this.selectItem);
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .auditPersonSelect-container {
    }
</style>
