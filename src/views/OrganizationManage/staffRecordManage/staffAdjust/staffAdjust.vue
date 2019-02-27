<template>
    <Modal v-model="modalValue"
           class="inStaffHandle-container"
           title="人事调整"
           :width="500"
           @on-visible-change="onVisibleChange">
        <Form ref="form"
              :model="formData"
              :rules="rules"
              :label-width="80">
            <FormItem label="人员名称:">
                <Input v-model="employeeName" readonly />
            </FormItem>
            <FormItem label="调整类型:" prop="changeType">
                <Select v-model="formData.changeType">
                    <Option v-for="item in dict_changeType"
                            :key="item.id"
                            :value="item.value"
                            :label="item.label"></Option>
                </Select>
            </FormItem>
            <FormItem label="调整结果:" prop="changeResult">
                <!--调出-->
                <Input v-if="formData.changeType === 'assigning-out'" v-model="formData.changeResult" />
                <Select v-else-if="formData.changeType === 'assigning-move'" v-model="formData.changeResult" placeholder="请选择单位">
                    <Option v-for="item in dict_changeType"
                            :key="item.id"
                            :value="item.label"
                            :label="item.label"></Option>
                </Select>
                <Select v-else-if="formData.changeType === 'job-adjusted'" v-model="formData.changeResult" placeholder="请选择岗位">
                    <Option v-for="item in dict_changeType"
                            :key="item.id"
                            :value="item.label"
                            :label="item.label"></Option>
                </Select>

                <Input v-else v-model="formData.changeResult" readonly />
            </FormItem>
            <FormItem label="生效时间:" prop="changeTime">
                <DatePicker type="date"
                            @on-change="onChage_changeTime"
                            placeholder="选择时间" ></DatePicker>
            </FormItem>
            <FormItem label="说明:">
                <Input v-model="formData.remark" type="textarea" :rows="3" />
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary"
                    size="large"
                    :loading="saveBtnLoading"
                    @click="save">确定</Button>
        </div>
    </Modal>
</template>

<script>
    import modalMixin from '../../../../lib/mixin/modalMixin';
    import comMixin from '../../../../lib/mixin/comMixin';
    export default {
        name: 'staffAdjust',
        mixins: [modalMixin, comMixin],
        props: {
            employeeId: {
                type: String,
                required: true
            },
            employeeName: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                saveBtnLoading: false,
                formData: {
                    employeeId: '',
                    changeType: '',
                    changeResult: '',
                    changeTime: '',
                    remark: ''
                },
                rules: {
                    changeType: [{ required: true, message: '调整类型不能为空！', trigger: 'blur' }],
                    changeResult: [{ required: true, message: '调整结果不能为空！', trigger: 'blur' }],
                    changeTime: [{ required: true, message: '生效时间不能为空！', trigger: 'blur' }],
                },

                //字典
                dict_changeType: [],
            };
        },
        watch: {
            employeeId: {
                immediate: true,
                handler(val) {
                    if (val) {
                        this.formData.employeeId = val;
                    }
                    else {
                        this.formData.employeeId = '';
                    }
                }
            },
            'formData.changeType'(val) {
                switch (val) {
                    case 'resignation': this.formData.changeResult = '辞职'; break;
                    case 'retirement': this.formData.changeResult = '退休'; break;
                    default: this.formData.changeResult = '';
                }
            }
        },
        mounted() {
            this.getDicts(['changeType']);
        },
        methods: {
            onChage_changeTime(value) {
                this.formData.changeTime = value;
            },
            save() {
                this.saveBtnLoading = true;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$http({
                            method: 'post',
                            url: '/',
                            data: JSON.stringify(this.formData)
                        }).then(res => {
                            if(res.code === 'SUCCESS') {
                                this.$Message.success({
                                    content: '调整成功！'
                                });
                                this.$emit('modal-callback');
                                this.saveBtnLoading = false;
                                this.modalValue = false;
                                // 表单初始化
                            }
                        }).catch(e => {
                            this.saveBtnLoading = false;
                        })
                    }
                    else{
                        this.saveBtnLoading = false;
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .staffAdjust-container {
    }
</style>