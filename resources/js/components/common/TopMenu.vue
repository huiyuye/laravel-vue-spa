<template>
<div>
    <router-link to="/">Home</router-link> |
    <router-link v-if="!user.authenticated" to="/login">登录</router-link>
    <router-link v-if="!user.authenticated" to="/register">注册</router-link>
    <router-link v-if="user.authenticated" to="/profile">个人中心</router-link>
    <li @click="logout" v-if="user.authenticated">退出</li>
</div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: 'top-menu',
    computed: {
        ...mapState({
            user: state => state.AuthUser
        })
    },
    methods: {
        logout() {
             this.$store.dispatch('logoutRequest').then(response => {
                this.$router.push({name: 'home'});
            })
        }
    }
}
</script>

