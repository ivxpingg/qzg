import Vue from 'vue';
import Router from 'vue-router';
import iView from 'iview';
import routes from './routers';
import { getToken } from '@/lib/util';
// import store from '../store/store';
// import Config from '../config';
// import MD5 from 'md5';
Vue.use(Router);
const router = new Router({
    base: '/',
    routes,
    // mode: 'history'
});
// const LOGIN_PAGE_NAME = 'user';

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();

    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;