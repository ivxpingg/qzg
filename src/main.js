import Vue from 'vue'
import App from './App.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import router from './router';
import store from './store/store';
import Ajax from '@/lib/axios';
import '@/style/app.scss';


Vue.config.productionTip = process.env.NODE_ENV === 'development';

Vue.use(iView, {
    transfer: true
});

Vue.prototype.$http = Ajax;

new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {}
}).$mount('#app')
