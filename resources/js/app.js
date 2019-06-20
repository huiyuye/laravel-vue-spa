require('./bootstrap');

window.Vue = require('vue');
import router from './routes';
import store from './store';
import jwtToken from './components/helpers/jwt';
import App from './components/App.vue';
import VeeValidate from 'vee-validate';

axios.interceptors.request.use(function (config) {
    if (jwtToken.getToken()) {
        config.headers['Authorization'] = 'Bearer ' + jwtToken.getToken();
    }
    return config;
}, function (error) {
    return Promise.reject(error);
})
Vue.use(VeeValidate);
new Vue({
    router,
    store, 
    render: h => h(App)
  }).$mount('#app')
