import {
    getBreadCrumbList,
    setTagNavListInLocalstorage,
    getTagNavListFromLocalstorage,
    getHomeRoute,
    transformMenu,
    setMenuAuth,
    getMenuListInLocalstorage, setMenuListInLocalstorage} from '../../lib/util';
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
            documentFileManage: [],
            authManage: [],
            logManage: [],
            departmentManage: [],
            staffRecordManage: [],
            jobPositionManage: [],
            laborContractManage: [],
            leaveManage: [],
            trainingCourseManage: [],
            trainingSchoolManage: [],
            certificateManage: [],
            learningResourceManage: [],
            statisticAnalysis: [],
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
                // 临时测试添加的清除
                // setMenuListInLocalstorage(null);
                let menuList = getMenuListInLocalstorage();
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