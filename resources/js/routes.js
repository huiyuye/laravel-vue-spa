import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/pages/Home.vue';
import Store from './store/index';
import JWTToken from './components/helpers/jwt';

Vue.use(VueRouter)
let routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {}
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('./components/pages/About.vue'),
        meta: {}
    },
    {
        path: '/posts/:id',
        name: 'posts',
        component: () => import('./components/posts/Post.vue'),
        meta: {}
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('./components/register/Register.vue'),
        meta: {requireGuest: true}
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./components/login/Login.vue'),
        meta: {requireGuest: true}
    },
    {
        path: '/confirm',
        name: 'confirm',
        component: () => import('./components/confirm/Email.vue'),
        meta: {}
    },
    {
        path: '/profile',
        component: () => import('./components/user/ProfileWrapper.vue'),
        children: [
            {
                path: '',
                name: 'profile',
                component: () => import('./components/user/Profile.vue'),
                meta: {}
            },
            {
                path: 'edit-profile',
                name: 'profile.editProfile',
                component: () => import('./components/user/EditProfile.vue'),
                meta: {}
            },
            {
                path: 'edit-password',
                name: 'profile.editPassword',
                component: () => import('./components/password/EditPassword.vue'),
                meta: {}
            }
        ],
        meta: { requireAuth: true }
    }
]
 const router = new VueRouter({
     mode: 'history',
     routes
 });

 router.beforeEach((to, from, next) => {
    if ( to.meta.requireAuth ) {
        if ( Store.state.AuthUser.authenticated || JWTToken.getToken()) {
            return next();
        } else {
            return next({'name': 'login'});
        }
    }
    if ( to.meta.requireGuest  ) {
        if ( Store.state.AuthUser.authenticated || JWTToken.getToken()) {
            return next({'name': 'home'});
        } else {
            return next();
        }
    }
    return next();
 })
 export default router;