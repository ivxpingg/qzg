<template>
    <div class="authManage-container ivu-card ivu-card-bordered ivu-card-dis-hover">
        <div class="left-panel">
            <vBTree ref="btree" @onSelectChange="onSelectChange"></vBTree>
        </div>
        <div class="right-panel">
            <Card :bordered="false" dis-hover>
                <vIvxFilterBox>
                    <Button type="primary" v-show="selectType === 'role'" @click="modal_addNode_open('role')">添加角色</Button>
                    <Button type="error" v-show="selectType === 'role'" @click="onClick_delNode('role')">删除角色</Button>
                </vIvxFilterBox>

                <Row :gutter="20" style="margin-top: 20px;">
                    <Col :span="8">
                        <Card v-show="selectType !== ''">
                            <p slot="title">节点管理</p>
                            <vRoleInfo class="roleInfo"
                                       :roleId="nodeItem.roleId"
                                       @updateNodeCallback="modal_addNodeCallback"></vRoleInfo>
                        </Card>
                    </Col>
                    <Col :span="8">
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
                    <Col :span="8">
                        <Card v-show="selectType !== ''">
                            <p slot="title">文档权限</p>

                        </Card>
                    </Col>
                </Row>

            </Card>
        </div>
    </div>
</template>

<script>
    import vBTree from './bTree/bTree';
    import vMenuTree from '../../Common/menuTree/menuTree';
    import vRoleInfo from './roleInfo/roleInfo';
    import {setMenuListInLocalstorage} from '@/lib/util';
    import { mapMutations, mapActions } from 'vuex';
    export default {
        name: 'authManage',
        components: {vBTree, vMenuTree, vRoleInfo},
        computed: {
            addNodeParentId() {
                return this.selectType === '' ? '0' : this.nodeItem.roleId;
            },
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
                selectType: '',   // 当前选中节点类型 'role': 角色; 'user' : 用户
                nodeItem: { // 当前选中节点 角色分组节点数据
                    roleId: '',
                    parentId: '',
                    roleNo: '',
                    name: '',
                    remark: '',
                    nodeType: '',
                    sort: 0,
                },
                roleMenuAuth: [],
                menuTreeCheckNodes: []
            };
        },
        watch: {
            'nodeItem.roleId'(val) {
                if (val !== '') {
                    this.getRoleMenu();
                }
            }
        },
        methods:{
            ...mapMutations([
                'setAuth'
            ]),
            ...mapActions([
                'getMenuList'
            ]),
            onSelectChange(item) {
                if (!item[0].roleNo) {
                    this.selectType = '';
                }
                else {
                    this.selectType = 'role';
                    this.nodeItem = Object.assign(this.nodeItem, item[0]);
                }
            },
            modal_addNodeCallback() {
                this.$refs.btree.getData();
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
            width: 25%;
            height: 100%;
            min-height: 700px;
            border-right: 1px solid #dcdee2;
        }
        .right-panel {
            float: left;
            width: 74.9%;
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