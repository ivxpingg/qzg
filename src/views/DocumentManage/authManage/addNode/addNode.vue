<template>
    <div class="addNode-container">
        <Form ref="form"
              class="user-form"
              :model="formData"
              :rules="rules"
              :label-width="80">
            <FormItem label="编号:" prop="roleNo" v-if="nodeType === 'root' || nodeType === 'role'">
                <Input v-model="formData.roleNo"/>
            </FormItem>
            <FormItem label="节点名称:" prop="name"  v-if="nodeType === 'root' || nodeType === 'role'">
                <!--<Input v-model="formData.name"/>-->
                <Select v-model="formData.name">
                    <Option v-for="item in deptList"
                            :key="item.deptId"
                            :value="item.deptName"
                            :label="item.deptName"></Option>
                </Select>
            </FormItem>

            <FormItem label="用户:" prop="userId" v-if="nodeType === 'user'">
                <!--<Input v-model="formData.name"/>-->
                <Select v-model="formData.userId" filterable>
                    <Option v-for="item in userList"
                            :key="item.userId"
                            :value="item.userId"
                            :label="item.name"></Option>
                </Select>
            </FormItem>
            <!--<FormItem label="节点类型:">-->
                <!--<Select :value="formData.nodeType" readonly disabled>-->
                    <!--<Option v-for="item in dict_nodeType" :value="item.value" :key="item.id">{{item.label}}</Option>-->
                <!--</Select>-->
            <!--</FormItem>-->
            <FormItem label="顺序:" prop="sort" v-if="nodeType === 'root' || nodeType === 'role'">
                <Input v-model="formData.sort" number/>
            </FormItem>
            <FormItem label="备注:" v-if="nodeType === 'root' || nodeType === 'role'">
                <Input v-model="formData.remark" type="textarea" />
            </FormItem>
        </Form>

        <div class="ivu-modal-footer">
            <Button type="primary"
                    :loading="saveBtnLoading"
                    size="large"
                    @click="save">保存</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'addNode',
        props: {
            parentId: {
                type: String
            },
            nodeType: {
                type: String,
                default: 'root'
            }
        },
        watch: {
            parentId: {
                immediate: true,
                handler(val) {
                    this.formData.parentId = val;
                }
            },
            nodeType: {
                immediate: true,
                handler(val) {
                     // this.formData.nodeType = (val === '')? 'group' : val;
                }
            }
        },
        data() {
            return {
                saveBtnLoading: false,
                formData: {
                    parentId: '',
                    roleNo: '',
                    name: '',
                    userId: '',
                    // nodeType: '',
                    sort: 0,
                    remark: ''
                },
                rules: {
                    roleNo: [{ required: true, message: '编号不能为空！', trigger: 'blur' }],
                    name: [{ required: true, message: '请选择角色！', trigger: 'blur' }],
                    userId: [{ required: true, message: '请选择用户！', trigger: 'blur' }],
                    sort: [{ required: true, type: 'number', message: '顺序不能为空！', trigger: 'blur' }]
                },
                dict_nodeType: [],

                deptList: [],

                userList: []
            };
        },
        mounted() {
            // this.getDict();
            this.getDeptList();
            this.getUserList();
        },
        methods: {
            // 获取旧部门列表
            getDeptList() {
                this.$http({
                    method: 'get',
                    url: '/dept/list'
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.deptList = res.data|| [];
                    }
                })
            },
            getUserList() {
                this.$http({
                    method: 'post',
                    url: '/user/list',
                    data: JSON.stringify({
                        current: 1,
                        size: 1000,
                        total: 0,
                    })
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.userList = res.data.records || [];
                    }
                })
            },

            getDict() {
                this.$http({
                    method: 'get',
                    url: '/dict/getListByType',
                    params: {
                        type: 'nodeType'
                    }
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.dict_nodeType = res.data;
                    }
                })
            },
            checkRoleNo() {
                return new Promise(((resolve, reject) => {
                    this.$http({
                        method: 'get',
                        url: '/role/checkRoleNo',
                        params: {
                            roleNo: this.formData.roleNo
                        }
                    }).then(res => {
                        if(res.code === 'SUCCESS') {
                            resolve();
                        }
                        else {
                            reject(res);
                        }
                    });
                }));
            },
            save() {
                if (this.nodeType === 'root' || this.nodeType === 'role') {
                    this.saveBtnLoading = true;
                    this.checkRoleNo().then(() => {
                        this.$refs.form.validate((valid) => {
                            if (valid) {
                                this.$http({
                                    method: 'post',
                                    url: '/role/add',
                                    data: JSON.stringify(this.formData)
                                }).then(res => {
                                    this.saveBtnLoading = false;
                                    if (res.code === 'SUCCESS') {
                                        this.$Message.success({
                                            content: '添加角色成功！'
                                        });
                                        this.$emit('modal_addNodeCallback');
                                        this.nodeItem.roleNo = '';
                                    }
                                })
                            } else {
                                this.saveBtnLoading = false;
                            }
                        })
                    }).catch(() => {
                        this.saveBtnLoading = false;
                        this.$Message.error({
                            content: `编号<${this.formData.roleNo}>已经存在, 请重新输入。`
                        });
                    });
                }
                else {
                    this.saveBtnLoading = true;
                    this.$refs.form.validate((valid) => {
                        if (valid) {
                            this.$http({
                                method: 'post',
                                url: '/userRole/add',
                                data: JSON.stringify([{
                                    userId: this.formData.userId,
                                    roleId: this.parentId
                                }])
                            }).then(res => {
                                this.saveBtnLoading = false;
                                if (res.code === 'SUCCESS') {
                                    this.$Message.success({
                                        content: '添加用户成功！'
                                    });
                                    this.$emit('modal_addNodeCallback');
                                }
                            })
                        } else {
                            this.saveBtnLoading = false;
                        }
                    })
                }


            }
        }
    }
</script>

<style lang="scss" scoped>
    .addNode-container {
    }
</style>