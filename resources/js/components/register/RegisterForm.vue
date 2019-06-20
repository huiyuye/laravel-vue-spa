<template>
    <form @submit.prevent="register">
        <label for="name">用户名</label>
        <input v-model="name"
                    name="name"
                    v-validate="{ rules: { required: true, min: 4 }}"
                    id="name" type="text">
        <span v-show="errors.has('name')">{{errors.first('name')}}</span>
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
        <label for="password-confirm">确认密码</label>
        <input id="password-confirm"
                    name="password_confirmation"
                    v-validate="{ rules: { required: true, min: 6, confirmed: 'password' }}"
                     type="password">
        <span v-show="errors.has('password_confirmation')">{{errors.first('password_confirmation')}}</span>
        <button type="submit">注册</button>
    </form>
</template>
<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        register() {
            const formData = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            axios.post('/api/register', formData).then(response => {
                this.$router.push({name: 'confirm'});
            })
        }
    }
}
</script>

