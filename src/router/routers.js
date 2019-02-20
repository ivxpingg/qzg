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


// 基础信息管理
// const BaseManage = [
//     {
//         path: '/BaseManage',
//         name: 'BaseManage',
//         component: Main,
//         meta: {
//             icon: 'ios-paper',
//             title: '基础信息管理',
//             requireAuth: true
//         },
//         children: [
//             {
//                 path: 'organizetionManage',
//                 name: 'organizetionManage',
//                 meta: {
//                     icon: 'md-git-network',
//                     title: '组织结构管理',
//                     requireAuth: true
//                 },
//                 component: (resolve) => require(['@/views/BaseManage/organizetionManage/organizetionManage.vue'], resolve),
//                 // component: () => import('@/views/BaseManage/organizetionManage/organizetionManage.vue')
//             },
//             {
//                 path: 'roleManage',
//                 name: 'roleManage',
//                 component: () => import('@/views/BaseManage/roleManage/roleManage.vue'),
//                 meta: {
//                     icon: 'ios-people',
//                     title: '角色管理',
//                     requireAuth: true
//                 }
//             },
//             {
//                 path: 'eSignatureManage',
//                 name: 'eSignatureManage',
//                 component: () => import('@/views/BaseManage/eSignatureManage/eSignatureManage.vue'),
//                 meta: {
//                     icon: 'ios-image',
//                     title: '电子签名管理',
//                     requireAuth: true
//                 }
//             },
//             {
//                 path: 'auditProcessManage',
//                 name: 'auditProcessManage',
//                 component: () => import('@/views/BaseManage/auditProcessManage/auditProcessManage.vue'),
//                 meta: {
//                     icon: 'ios-infinite',
//                     title: '审核流程管理',
//                     requireAuth: true
//                 }
//             }
//         ]
//     }
// ];


//

export default [
    ...Login,
    ...Home,
]