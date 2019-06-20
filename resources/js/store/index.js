import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import AuthUser from './modules/auth-user';
import Login from './modules/login';
import EditProfile from './modules/edit-profile';
import EditPassword from './modules/edit-password';
export default new Vuex.Store({
    modules: {
        AuthUser,
        Login,
        EditProfile,
        EditPassword
    }
})