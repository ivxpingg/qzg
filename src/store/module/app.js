import {
    getBreadCrumbList,
    setTagNavListInLocalstorage,
    getTagNavListFromLocalstorage,
    getHomeRoute,
    transformMenu,
    setMenuAuth,
    getMenuListInLocalstorage} from '@/lib/util';
import routers from '@/router/routers'
import axios from '@/lib/axios';

export default {
    state: {
        menuList: [],
        breadCrumbList: [],
        tagNavList: [],
        homeRoute: getHomeRoute(routers),
        //
        auth: {
            home: [],
            organizetionManage: [],
            roleManage: [],
            eSignatureManage: [],
            auditProcessManage: [],
            workUnitManage: [],
            workPersonManage: [],
            supervisorsManage:[],
            qualitySupervision_register: [],
            qualitySupervision_accept: [],
            qualitySupervision_tell: [],
            qualitySupervision_check: [],
            qualitySupervision_account: [],
            qualitySupervision_complaint: [],
            qualityProjectCreate: [],
            safetySupervision_notification: [],
            safetySupervision_check: [],
            safetySupervision_account: [],
            safetySupervision_examine: [],
            creditRating_record: [],
            creditRating_account: [],
            majorProject_check: [],
            QA_report: [],
            QA_analyze: [],
            projectRecords: [],
            project_verification: [],
            projectCompleteQuality_authenticate: [],
            projectFileManage: [],
            dataDict: []
        },
        // 自适应
        htmlClientWidth: 0,
        mianLayoutWidth: 0,
        mianLayoutHeight: 0

    },
    getters: {
        getMenuAuth: (state) => {
            return (name) => {
                return state.auth[name];
            }
        }
    },
    mutations: {
        setMenuList (state, mList) {
            setMenuAuth(mList, state.auth);
            state.menuList = transformMenu(mList);
        },
        setBreadCrumb (state, routeMetched) {
            state.breadCrumbList = getBreadCrumbList(routeMetched, state.homeRoute);
        },
        setTagNavList (state, list) {
            if (list) {
                state.tagNavList = [...list];
                setTagNavListInLocalstorage([...list]);
            }
            else {
                state.tagNavList = getTagNavListFromLocalstorage();
            }
        },
        addTag (state, item, type = 'unshift') {
            if (state.tagNavList.findIndex(tag => tag.name === item.name) < 0) {
                if (type === 'push') state.tagNavList.push(item);
                else state.tagNavList.unshift(item);
                setTagNavListInLocalstorage([...state.tagNavList]);
            }
        },
        setMianLayoutWidth(state, width) {
            setTimeout(() => {
                state.mianLayoutWidth = width;
            }, 1000);
        },
        onresize(state) {
            state.htmlClientWidth = document.documentElement.clientWidth;
            let dom = document.querySelector('#mian_layout');
            if (dom) {
                state.mianLayoutWidth = dom.clientWidth;
                state.mianLayoutHeight = dom.clientHeight;
            }
        },

        setAuth(state, obj) {
            state.auth = obj;
        }
    },
    actions: {
        getMenuList({commit}) {
            return new Promise(((resolve, reject) => {
                let menuList = getMenuListInLocalstorage();

                menuList = [{"menuId":"001","parentId":"0","menuName":"首页","sort":1,"url":"home","icon":"ios-home","isShow":"1","children":[{"menuId":"001001","parentId":"001","menuName":"数据统计","sort":1,"isShow":"1","permission":"sys:org:count"},{"menuId":"001002","parentId":"001","menuName":"工作统计","sort":2,"isShow":"1","permission":"sys:org:supervisionCount"},{"menuId":"001003","parentId":"001","menuName":"项目动态","sort":3,"isShow":"1","permission":"sys:org:projectPanel"},{"menuId":"001004","parentId":"001","menuName":"其它","sort":4,"isShow":"1","permission":"sys:org:other"}]},{"menuId":"002","parentId":"0","menuName":"综合展示","sort":2,"url":"showSystem","icon":"ios-map","isShow":"1"},{"menuId":"011","parentId":"0","menuName":"公文办理","sort":2,"url":"documentList","icon":"md-document","isShow":"1"},{"menuId":"003","parentId":"0","menuName":"基础信息管理","sort":3,"url":"BaseManage","icon":"ios-paper","isShow":"1","children":[{"menuId":"003001","parentId":"003","menuName":"组织结构管理","sort":1,"url":"organizetionManage","icon":"md-git-network","isShow":"1","children":[{"menuId":"003001001","parentId":"003001","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"003001002","parentId":"003001","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"003001003","parentId":"003001","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"003001004","parentId":"003001","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]},{"menuId":"003002","parentId":"003","menuName":"角色管理","sort":2,"url":"roleManage","icon":"ios-people","isShow":"1","children":[{"menuId":"003002001","parentId":"003002","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"003002002","parentId":"003002","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"003002003","parentId":"003002","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"003002004","parentId":"003002","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]},{"menuId":"003003","parentId":"003","menuName":"电子签名管理","sort":3,"url":"eSignatureManage","icon":"ios-image","isShow":"1","children":[{"menuId":"003003001","parentId":"003003","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"003003002","parentId":"003003","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"003003003","parentId":"003003","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"003003004","parentId":"003003","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]},{"menuId":"003004","parentId":"003","menuName":"审核流程管理","sort":4,"url":"auditProcessManage","icon":"ios-infinite","isShow":"1","children":[{"menuId":"003004001","parentId":"003004","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"003004002","parentId":"003004","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"003004003","parentId":"003004","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"003004004","parentId":"003004","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]}]},{"menuId":"004","parentId":"0","menuName":"机构与人员","sort":4,"url":"OrgAndPersonManage","icon":"ios-people","isShow":"1","children":[{"menuId":"004001","parentId":"004","menuName":"从业单位管理","sort":1,"url":"workUnitManage","icon":"_unit","isShow":"1","children":[{"menuId":"004001001","parentId":"004001","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"004001002","parentId":"004001","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"004001003","parentId":"004001","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"004001004","parentId":"004001","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]},{"menuId":"004002","parentId":"004","menuName":"从业人员管理","sort":2,"url":"workPersonManage","icon":"_person-manage","isShow":"1","children":[{"menuId":"004002001","parentId":"004002","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"004002002","parentId":"004002","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"004002003","parentId":"004002","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"004002004","parentId":"004002","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]},{"menuId":"004003","parentId":"004","menuName":"监督单位人员管理","sort":3,"url":"supervisorsManage","icon":"_supervise-person-manage","isShow":"1","children":[{"menuId":"004003001","parentId":"004003","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"004003002","parentId":"004003","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"004003003","parentId":"004003","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"004003004","parentId":"004003","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]}]},{"menuId":"005","parentId":"0","menuName":"质量监督管理","sort":5,"url":"QualitySupervisionManage","icon":"ios-ribbon","isShow":"1","children":[{"menuId":"005001","parentId":"005","menuName":"质量监督登记","sort":1,"url":"qualitySupervision_register","icon":"_qualitySupervision_register","isShow":"1","children":[{"menuId":"005001001","parentId":"005001","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"005001002","parentId":"005001","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"005001003","parentId":"005001","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"005001006","parentId":"005001","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"},{"menuId":"005001004","parentId":"005001","menuName":"审核","sort":4,"isShow":"1","permission":"sys:org:audit"},{"menuId":"005001005","parentId":"005001","menuName":"参建单位编辑","sort":5,"isShow":"1","permission":"sys:org:special_edit"}]},{"menuId":"005002","parentId":"005","menuName":"质量监督审核","sort":2,"url":"qualitySupervision_accept","icon":"_qualitySupervision_accept","isShow":"1","children":[{"menuId":"005002001","parentId":"005002","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"005002002","parentId":"005002","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"005002003","parentId":"005002","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"005002005","parentId":"005002","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"},{"menuId":"005002004","parentId":"005002","menuName":"添加监督小组","sort":4,"isShow":"1","permission":"sys:org:addgroup"}]},{"menuId":"005003","parentId":"005","menuName":"质量监督受理及交底","sort":3,"url":"qualitySupervision_tell","icon":"_qualitySupervision_tell","isShow":"1","children":[{"menuId":"005003001","parentId":"005003","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"005003002","parentId":"005003","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"005003003","parentId":"005003","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"005003004","parentId":"005003","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]},{"menuId":"005004","parentId":"005","menuName":"质量监督检查","sort":4,"url":"qualitySupervision_check","icon":"_qualitySupervision_check","isShow":"1","children":[{"menuId":"005004001","parentId":"005004","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"005004002","parentId":"005004","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"005004003","parentId":"005004","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"005004004","parentId":"005004","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]},{"menuId":"005005","parentId":"005","menuName":"质量监督台账","sort":5,"url":"qualitySupervision_account","icon":"_account","isShow":"1","children":[{"menuId":"005005001","parentId":"005005","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"005005002","parentId":"005005","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"005005003","parentId":"005005","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"005005004","parentId":"005005","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]},{"menuId":"005006","parentId":"005","menuName":"质量安全投诉管理","sort":6,"url":"qualitySupervision_complaint","icon":"_qualitySupervision_complaint","isShow":"1","children":[{"menuId":"005006001","parentId":"005006","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"005006002","parentId":"005006","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"005006003","parentId":"005006","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"005006004","parentId":"005006","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]},{"menuId":"005007","parentId":"005","menuName":"品质工程创建","sort":7,"url":"qualityProjectCreate","icon":"_qualityProjectCreate","isShow":"1","children":[{"menuId":"005007001","parentId":"005007","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"005007002","parentId":"005007","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"005007003","parentId":"005007","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"005007004","parentId":"005007","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]}]},{"menuId":"006","parentId":"0","menuName":"安全监督管理","sort":6,"url":"SafetySupervisionManage","icon":"ios-book","isShow":"1","children":[{"menuId":"006001","parentId":"006","menuName":"安全通知","sort":1,"url":"safetySupervision_notification","icon":"_safetySupervision_notification","isShow":"1","children":[{"menuId":"006001001","parentId":"006001","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"006001002","parentId":"006001","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"006001003","parentId":"006001","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"006001004","parentId":"006001","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]},{"menuId":"006002","parentId":"006","menuName":"安全督查检查","sort":2,"url":"safetySupervision_check","icon":"_safetySupervision_check","isShow":"1","children":[{"menuId":"006002001","parentId":"006002","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"006002002","parentId":"006002","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"006002003","parentId":"006002","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"006002004","parentId":"006002","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]},{"menuId":"006003","parentId":"006","menuName":"安全督查台账","sort":3,"url":"safetySupervision_account","icon":"_account","isShow":"1","children":[{"menuId":"006003001","parentId":"006003","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"006003002","parentId":"006003","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"006003003","parentId":"006003","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"006003004","parentId":"006003","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]},{"menuId":"006004","parentId":"006","menuName":"平安工地考核","sort":4,"url":"safetySupervision_examine","icon":"_safetySupervision_examine","isShow":"1","children":[{"menuId":"006004001","parentId":"006004","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"006004002","parentId":"006004","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"006004003","parentId":"006004","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"006004004","parentId":"006004","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]}]},{"menuId":"007","parentId":"0","menuName":"信用评价管理","sort":7,"url":"CreditRatingManage","icon":"ios-medal","isShow":"1","children":[{"menuId":"007001","parentId":"007","menuName":"信用评价记录","sort":1,"url":"creditRating_record","icon":"_creditRating_record","isShow":"1","children":[{"menuId":"007001001","parentId":"007001","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"007001002","parentId":"007001","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"007001003","parentId":"007001","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"007001004","parentId":"007001","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]},{"menuId":"007002","parentId":"007","menuName":"信用评价管理台账","sort":2,"url":"creditRating_account","icon":"_account","isShow":"1","children":[{"menuId":"007002001","parentId":"007002","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"007002002","parentId":"007002","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"007002003","parentId":"007002","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"007002004","parentId":"007002","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]},{"menuId":"007003","parentId":"007","menuName":"重点项目考勤管理","sort":3,"url":"majorProject_check","icon":"_majorProject_check","isShow":"1","children":[{"menuId":"007003001","parentId":"007003","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"007003002","parentId":"007003","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"007003003","parentId":"007003","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"007003004","parentId":"007003","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]}]},{"menuId":"008","parentId":"0","menuName":"质量检测管理","sort":8,"url":"QAManage","icon":"ios-construct","isShow":"1","children":[{"menuId":"008001","parentId":"008","menuName":"质量检测报表","sort":1,"url":"QA_report","icon":"_QA_report","isShow":"1","children":[{"menuId":"008001001","parentId":"008001","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"008001002","parentId":"008001","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"008001003","parentId":"008001","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"008001004","parentId":"008001","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]},{"menuId":"008002","parentId":"008","menuName":"质量安全检测数据分析","sort":2,"url":"QA_analyze","icon":"_QA_analyze","isShow":"1","children":[{"menuId":"008002001","parentId":"008002","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"008002002","parentId":"008002","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"008002003","parentId":"008002","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"008002004","parentId":"008002","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]}]},{"menuId":"009","parentId":"0","menuName":"备案及交竣工管理","sort":9,"url":"RecordAndCompletedManage","icon":"ios-clipboard","isShow":"1","children":[{"menuId":"009001","parentId":"009","menuName":"工程备案","sort":1,"url":"projectRecords","icon":"_projectRecords","isShow":"1","children":[{"menuId":"009001001","parentId":"009001","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"009001002","parentId":"009001","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"009001003","parentId":"009001","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"009001004","parentId":"009001","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]},{"menuId":"009002","parentId":"009","menuName":"交工检测核验","sort":2,"url":"project_verification","icon":"_project_verification","isShow":"1","children":[{"menuId":"009002001","parentId":"009002","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"009002002","parentId":"009002","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"009002003","parentId":"009002","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"009002005","parentId":"009002","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"},{"menuId":"009002004","parentId":"009002","menuName":"审核","sort":4,"isShow":"1","permission":"sys:org:audit"}]},{"menuId":"009003","parentId":"009","menuName":"竣工质量鉴定","sort":3,"url":"projectCompleteQuality_authenticate","icon":"_projectCompleteQuality_authenticate2","isShow":"1","children":[{"menuId":"009003001","parentId":"009003","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"009003002","parentId":"009003","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"009003003","parentId":"009003","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"009003004","parentId":"009003","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"}]},{"menuId":"009004","parentId":"009","menuName":"工程档案管理","sort":4,"url":"projectFileManage","icon":"_projectFileManage","isShow":"1","children":[{"menuId":"009004001","parentId":"009004","menuName":"添加","sort":1,"isShow":"1","permission":"sys:org:add"},{"menuId":"009004002","parentId":"009004","menuName":"修改","sort":2,"isShow":"1","permission":"sys:org:update"},{"menuId":"009004003","parentId":"009004","menuName":"删除","sort":3,"isShow":"1","permission":"sys:org:del"},{"menuId":"009004004","parentId":"009004","menuName":"项目单位档案","sort":4,"isShow":"1","permission":"sys:org:projectFile"},{"menuId":"009004006","parentId":"009004","menuName":"查看","sort":4,"isShow":"1","permission":"sys:org:view"},{"menuId":"009004005","parentId":"009004","menuName":"监督单位档案","sort":5,"isShow":"1","permission":"sys:org:supervisionFile"}]}]}];
                if (!menuList) {
                    axios({
                        method: 'get',
                        url: '/menu/userMenus'
                    }).then(res => {
                        if (res.code === 'SUCCESS') {
                            commit('setMenuList', res.data);
                        }
                        resolve(res.data);
                    }).catch(err => {
                        reject(err);
                    })
                }
                else{
                    try {
                        commit('setMenuList', menuList);
                        resolve(menuList);
                    }
                    catch (e) {
                        reject(e);
                    }


                }

            }));
        }
    }
}