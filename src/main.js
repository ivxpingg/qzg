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

if (process.env.NODE_ENV === 'development') {
    // admin
    Cookies.set('DomAuthSessId', 'D4E88A3FD81529B56C11BB59BE6D0DAC', {expires: 1});
    // Cookies.set('DomAuthSessId', 'F15EEC893155B8959B5C78EDA533AA14', {expires: 1});

}

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
