<template>
    <div class="authManage-container ivu-card ivu-card-bordered ivu-card-dis-hover">
        <div class="left-panel">
            <vBTree ref="btree" @onSelectChange="onSelectChange"></vBTree>
        </div>
        <div class="right-panel">
            <Card :bordered="false" dis-hover>
                <vIvxFilterBox>
                    <Button type="primary" v-show="selectType === 'role' || selectType === 'root'" @click="modal_addNode_open('role')">添加角色</Button>
                    <Button type="error" v-show="selectType === 'role'" @click="onClick_delNode_role">删除角色</Button>
                    <Button type="primary" v-show="ableAddUser" @click="modal_addNode_open('user')">添加用户</Button>
                    <Button type="error" v-show="selectType === 'user'" @click="onClick_delNode_user">移除用户</Button>
                </vIvxFilterBox>

                <Row :gutter="20" style="margin-top: 20px;">
                    <Col :span="7">
                        <Card v-show="selectType === 'role'">
                            <p slot="title">角色管理</p>
                            <vRoleInfo class="roleInfo"
                                       :roleId="nodeItem.roleId"
                                       @updateNodeCallback="modal_addNodeCallback"></vRoleInfo>
                        </Card>
                    </Col>
                    <Col :span="7">
                        <Card v-show="selectType === 'role'">
                            <p slot="title">菜单权限</p>
                            <vMenuTree ref="menuTree"
                                       class="menu-tree"
                                       :checkedNodes="roleMenuAuth"
                                       :roleId="nodeItem.roleId"
                                       @onCheckChange="menuTree_onCheckChange"></vMenuTree>
                            <div class="ivu-modal-footer">
                                <Button type="primary"
                                        size="large"
                                        @click="saveMenuTreeAuth">保存</Button>
                            </div>
                        </Card>
                    </Col>
                    <Col :span="10">
                        <Card v-show="selectType === 'role'">
                            <p slot="title">文档权限</p>
                            <vDocumentAuth ref="documentAuth" :roleId="nodeItem.roleId"></vDocumentAuth>
                        </Card>
                    </Col>
                </Row>

            </Card>
        </div>

        <!--添加节点-->
        <Modal v-model="modal_addNode"
               title="添加"
               :width="350"
               footer-hide>
            <vAddNode :parentId="nodeItem.roleId"
                      :nodeType="addNodeType"
                      @modal_addNodeCallback="modal_addNodeCallback"></vAddNode>
        </Modal>
    </div>
</template>

<script>
    import vBTree from './bTree/bTree';
    import vMenuTree from '../../Common/menuTree/menuTree';
    import vRoleInfo from './roleInfo/roleInfo';
    import vDocumentAuth from './documentAuth/documentAuth';
    import vAddNode from './addNode/addNode';
    import {setMenuListInLocalstorage} from '@/lib/util';
    import { mapMutations, mapActions } from 'vuex';
    export default {
        name: 'authManage',
        components: {vBTree, vMenuTree, vRoleInfo, vDocumentAuth, vAddNode},
        computed: {
            roleMenus() {
                return this.menuTreeCheckNodes.map((val) => {
                    return {
                        roleId: this.nodeItem.roleId,
                        menuId: val.menuId
                    };
                });
            }
        },
        data() {
            return {
                selectType: 'root',   // 当前选中节点类型 root: 未选中节点， 'role': 角色; 'user' : 用户
                nodeItem: { // 当前选中节点 角色分组节点数据
                    roleId: '0',
                    userId: '',
                    parentId: '',
                    roleNo: '',
                    name: '',
                    remark: '',
                    sort: 0,
                },
                roleMenuAuth: [],
                menuTreeCheckNodes: [],

                modal_addNode: false,
                addNodeType: 'role',

                // 是否能添加用户
                ableAddUser: false
            };
        },
        watch: {
            'nodeItem.roleId'(val) {
                if (val !== '') {
                    this.getRoleMenu();
                }
            }
        },
        mounted() {
        },
        methods:{
            ...mapMutations([
                'setAuth'
            ]),
            ...mapActions([
                'getMenuList'
            ]),
            onSelectChange(item) {
                if (!item[0]) {
                    this.selectType = 'root';
                    Object.assign(this.nodeItem, {
                        roleId: '0',
                        parentId: '',
                        userId: '',
                        roleNo: '',
                        name: '',
                        remark: '',
                        sort: 0,
                    });
                    this.ableAddUser = false;
                }
                else if(item[0].roleNo) {
                    this.selectType = 'role';
                    Object.assign(this.nodeItem, item[0]);

                    if (item[0].children && item[0].children.length > 0 && item[0].children[0].roleNo) {
                        this.ableAddUser = false;
                    }
                    else{
                        this.ableAddUser = true;
                    }
                }
                else if(item[0].userId) {
                    this.selectType = 'user';
                    this.ableAddUser = false;

                    Object.assign(this.nodeItem, {
                        roleId: item[0].roleId,
                        parentId: '',
                        userId: item[0].userId,
                        roleNo: '',
                        name: item[0].userName,
                        remark: '',
                        sort: 0,
                    });
                }
            },
            modal_addNodeCallback() {
                this.selectType = 'root';
                this.ableAddUser = false;
                Object.assign(this.nodeItem, {
                    roleId: '0',
                    parentId: '',
                    userId: '',
                    roleNo: '',
                    name: '',
                    remark: '',
                    sort: 0,
                });

                this.$refs.btree.getData();
                this.modal_addNode = false;
            },
            /**
             * 菜单树返回的选中的项， 获取选中的项没有采用默认方法，
             *
             * @param item
             */
            menuTree_onCheckChange(item) {
                this.menuTreeCheckNodes = this.$refs.menuTree.$refs.tree.flatState.filter(obj => obj.node.checked || obj.node.indeterminate).map(obj => obj.node);
            },
            // 获取角色菜单权限
            getRoleMenu() {
                this.$http({
                    method: 'get',
                    url: '/role/getRoleMenu',
                    params: {
                        roleId: this.nodeItem.roleId
                    }
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.roleMenuAuth = res.data === '' ? [] : res.data;
                    }
                })
            },
            // 保存角色的菜单权限
            saveMenuTreeAuth() {
                this.$http({
                    method: 'post',
                    url: '/role/addRoleMenu',
                    data: JSON.stringify(this.roleMenus)
                }).then(res => {
                    if(res.code === 'SUCCESS') {
                        this.$Message.success({
                            content: '菜单权限保存成功！'
                        });

                        setMenuListInLocalstorage(null);
                        this.getMenuList();
                    }
                })
            },

            //
            modal_addNode_open(type) {
                this.addNodeType = type;
                this.modal_addNode = true;
            },
            onClick_delNode_role() {
                if (this.nodeItem.children.length > 0) {
                    this.$Message.error({
                        content: `无法删除，<${this.nodeItem.name}>节点下存在子节点`
                    });
                }
                else {
                    this.$Modal.confirm({
                        title: '删除',
                        content: `确定要删除<${this.nodeItem.name}>？`,
                        onOk: () => {
                            this.$http({
                                method: 'get',
                                url: '/role/delete',
                                params: {
                                    roleId: this.nodeItem.roleId
                                }
                            }).then(res => {
                                if(res.code === 'SUCCESS') {
                                    this.$Message.success({
                                        content: '删除成功！'
                                    });
                                    this.selectType = 'root';
                                    this.ableAddUser = false;
                                    Object.assign(this.nodeItem, {
                                        roleId: '0',
                                        parentId: '',
                                        userId: '',
                                        roleNo: '',
                                        name: '',
                                        remark: '',
                                        sort: 0,
                                    });
                                    this.$refs.btree.getData();
                                }
                            })
                        }
                    });
                }
            },
            onClick_delNode_user() {
                this.$Modal.confirm({
                    title: '移除',
                    content: `确定要移除<${this.nodeItem.name}>？`,
                    onOk: () => {
                        this.$http({
                            method: 'post',
                            url: '/userRole/delete',
                            data: JSON.stringify([
                                {
                                    roleId: this.nodeItem.roleId,
                                    userId: this.nodeItem.userId
                                }
                            ])
                        }).then(res => {
                            if(res.code === 'SUCCESS') {
                                this.$Message.success({
                                    content: '移除成功！'
                                });
                                this.selectType = 'root';
                                this.ableAddUser = false;
                                Object.assign(this.nodeItem, {
                                    roleId: '0',
                                    parentId: '',
                                    userId: '',
                                    roleNo: '',
                                    name: '',
                                    remark: '',
                                    sort: 0,
                                });
                                this.$refs.btree.getData();
                            }
                        })
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .authManage-container {
        position: relative;
        min-height: 700px;

        .left-panel {
            float: left;
            width: 20%;
            height: 100%;
            min-height: 700px;
            border-right: 1px solid #dcdee2;
        }
        .right-panel {
            float: left;
            width: 80%;
            .roleInfo {
                height: 399px;
            }

            .menu-tree {
                height: 350px;
                overflow-y: auto;
            }
            .ivu-modal-footer {
                padding-bottom: 0px;
            }
        }
    }
</style>