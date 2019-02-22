import Vue from 'vue';
import Router from 'vue-router';
import iView from 'iview';
import routes from './routers';
import { getToken } from '@/lib/util';
import store from '../store/store';
import Config from '../config';
import MD5 from 'md5';
Vue.use(Router);
const router = new Router({
    base: '/',
    routes,
    // mode: 'history'
});
// const LOGIN_PAGE_NAME = 'user';

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();

    if(to.query.loginName !== undefined) {
        let loginName = to.query.loginName;
        let password = MD5(to.query.password + Config.password_key);
        store._actions.handleLogin[0]({loginName , password }).then(res => {
            store._actions.getMenuList[0]().then(res => {
                next();
            });
        });
    }
    else {
        next();
    }
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;