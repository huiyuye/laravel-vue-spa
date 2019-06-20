<template>
    <form @submit.prevent="login">
        <label for="email">邮箱</label>
        <input v-model="email" 
                    name="email"
                    v-validate="{ rules: { required: true, email: true }}"
                    id="email" type="text">
        <span v-show="errors.has('email')">{{errors.first('email')}}</span>
        <label for="password">密码</label>
        <input v-model="password" 
                    v-validate="{ rules: { required: true, min: 6 }}"
                    id="password" name="password" type="password">
        <span v-show="errors.has('password')">{{errors.first('password')}}</span>
        <button type="submit">登录</button>
    </form>
</template>
<script>
import JWTToken from '../helpers/jwt';
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            this.$validator.validateAll().then(result => {
                if (result) {
                    const formData = {
                        email: this.email,
                        password: this.password
                    }
                    this.$store.dispatch('loginRequest', formData).then(response => {
                        this.$router.push({name: 'profile'});
                    })
                }
            })
        }
    }
}
</script>

