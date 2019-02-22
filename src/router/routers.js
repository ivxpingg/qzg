import Main from '../views/Main/main.vue';
const Login = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        // component: () => import('@/views/Login/login.vue')
    }
];


// 首页
const Home = [
    {
        path: '/',
        //name: 'home',
        redirect: '/home',
        component: Main,
        meta: {
            hideInMenu: true,
            notCache: true,
            requireAuth: true
        },
        children: [{
            path: '/home',
            name: 'home',
            // component: () => import('@/views/Home/home.vue'),
            component: (resolve) => require(['@/views/Home/home.vue'], resolve),
            meta: {
                hideInMenu: true,
                title: '首页',
                notCache: true,
                requireAuth: true
            }
        }]
    }
];


// 公文档案管理
const DocumentManage = [
    {
        path: '/DocumentManage',
        name: 'DocumentManage',
        component: Main,
        meta: {
            icon: 'ios-paper',
            title: '公文档案管理',
            requireAuth: true
        },
        children: [
            {
                path: 'documentFileManage',
                name: 'documentFileManage',
                meta: {
                    icon: 'md-git-network',
                    title: '档案信息管理',
                    requireAuth: true
                },
                // component: (resolve) => require(['@/views/DocumentManage/documentFileManage/documentFileManage.vue'], resolve),
                component: () => import('@/views/DocumentManage/documentFileManage/documentFileManage.vue')
            },
            {
                path: 'authManage',
                name: 'authManage',
                component: () => import('@/views/DocumentManage/authManage/authManage.vue'),
                meta: {
                    icon: 'ios-people',
                    title: '用户与档案权限管理',
                    requireAuth: true
                }
            },
            {
                path: 'logManage',
                name: 'logManage',
                component: () => import('@/views/DocumentManage/logManage/logManage.vue'),
                meta: {
                    icon: 'ios-image',
                    title: '操作日志管理',
                    requireAuth: true
                }
            }
        ]
    }
];


// 组织人事管理
const OrganizationManage = [
    {
        path: '/OrganizationManage',
        name: 'OrganizationManage',
        component: Main,
        meta: {
            icon: 'ios-paper',
            title: '组织人事管理',
            requireAuth: true
        },
        children: [
            {
                path: 'departmentManage',
                name: 'departmentManage',
                meta: {
                    icon: 'md-git-network',
                    title: '部门信息管理',
                    requireAuth: true
                },
                component: () => import('@/views/OrganizationManage/departmentManage/departmentManage.vue')
            },
            {
                path: 'staffRecordManage',
                name: 'staffRecordManage',
                component: () => import('@/views/OrganizationManage/staffRecordManage/staffRecordManage.vue'),
                meta: {
                    icon: 'ios-people',
                    title: '员工档案管理',
                    requireAuth: true
                }
            },
            {
                path: 'jobPositionManage',
                name: 'jobPositionManage',
                component: () => import('@/views/OrganizationManage/jobPositionManage/jobPositionManage.vue'),
                meta: {
                    icon: 'ios-image',
                    title: '工作职务管理',
                    requireAuth: true
                }
            },
            {
                path: 'laborContractManage',
                name: 'laborContractManage',
                component: () => import('@/views/OrganizationManage/laborContractManage/laborContractManage.vue'),
                meta: {
                    icon: 'ios-image',
                    title: '劳动合同管理',
                    requireAuth: true
                }
            },
            {
                path: 'leaveManage',
                name: 'leaveManage',
                component: () => import('@/views/OrganizationManage/leaveManage/leaveManage.vue'),
                meta: {
                    icon: 'ios-image',
                    title: '请假公出管理',
                    requireAuth: true
                }
            }
        ]
    }
];

// 职工教育培训
const StaffEducationAndTraining = [
    {
        path: '/StaffEducationAndTraining',
        name: 'StaffEducationAndTraining',
        component: Main,
        meta: {
            icon: 'ios-paper',
            title: '职工教育培训',
            requireAuth: true
        },
        children: [
            {
                path: 'trainingCourseManage',
                name: 'trainingCourseManage',
                meta: {
                    icon: 'md-git-network',
                    title: '培训课程管理',
                    requireAuth: true
                },
                component: () => import('@/views/StaffEducationAndTraining/trainingCourseManage/trainingCourseManage.vue')
            },
            {
                path: 'trainingSchoolManage',
                name: 'trainingSchoolManage',
                component: () => import('@/views/StaffEducationAndTraining/trainingSchoolManage/trainingSchoolManage.vue'),
                meta: {
                    icon: 'ios-people',
                    title: '培训学时管理',
                    requireAuth: true
                }
            },
            {
                path: 'certificateManage',
                name: 'certificateManage',
                component: () => import('@/views/StaffEducationAndTraining/certificateManage/certificateManage.vue'),
                meta: {
                    icon: 'ios-image',
                    title: '培训证书管理',
                    requireAuth: true
                }
            },
            {
                path: 'learningResourceManage',
                name: 'learningResourceManage',
                component: () => import('@/views/StaffEducationAndTraining/learningResourceManage/learningResourceManage.vue'),
                meta: {
                    icon: 'ios-image',
                    title: '学习资源管理',
                    requireAuth: true
                }
            },
            {
                path: 'statisticAnalysis ',
                name: 'statisticAnalysis',
                component: () => import('@/views/StaffEducationAndTraining/statisticAnalysis/statisticAnalysis.vue'),
                meta: {
                    icon: 'ios-image',
                    title: '统计分析',
                    requireAuth: true
                }
            }
        ]
    }
];


// 系统管理
const SystemManage = [
    {
        path: '/SystemManage',
        name: 'SystemManage',
        component: Main,
        meta: {
            icon: 'ios-settings',
            title: '系统管理',
            requireAuth: true
        },
        children: [
            {
                path: 'dataDict',
                name: 'dataDict',
                meta: {
                    icon: '_data-dict',
                    title: '数据字典',
                    requireAuth: true
                },
                component: () => import('@/views/SystemManage/dataDict/dataDict.vue')
            }
        ]
    }
]

export default [
    ...Login,
    ...Home,
    ...DocumentManage,
    ...OrganizationManage,
    ...StaffEducationAndTraining,
    ...SystemManage
]