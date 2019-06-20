<template>
    <div class="container">
        <li><span>用户名</span><span>{{ user.name }}</span></li>
        <li><span>邮箱</span><span>{{ user.email }}</span></li>
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
        created () {
            this.$store.dispatch('setAuthUser');
        }
    }
</script>
