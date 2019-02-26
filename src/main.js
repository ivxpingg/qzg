import Vue from 'vue'
import App from './App.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import router from './router';
import store from './store/store';
import Ajax from '@/lib/axios';
import moment from 'moment';
import '@/style/app.scss';
import vIvxFilterBox from './components/ivxFilterBox/ivxFilterBox';
import vWebUploader from './components/webuploader/webuploader';
import Cookies from 'js-cookie';

Cookies.set('DomAuthSessId', 'B0419288C8E84E97B01A9F20A3EEE18A', {expires: 1});

Vue.config.productionTip = process.env.NODE_ENV === 'development';

Vue.use(iView, {
    transfer: true
});

Vue.component('vIvxFilterBox', vIvxFilterBox);
Vue.component('vWebUploader', vWebUploader);

Vue.prototype.$http = Ajax;
Vue.prototype.$moment = moment;

new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {}
}).$mount('#app')
