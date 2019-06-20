<template>
    <form @submit.prevent="updatePassword">
        <label for="password">密码</label>
        <input v-model="password" 
                    id="password" name="password" type="password">
        <span v-show="errors.has('password')">{{errors.first('password')}}</span>
        <label for="password-confirm">确认密码</label>
        <input id="password-confirm"
                    name="password_confirmation"
                     type="password">
        <span v-show="errors.has('password_confirmation')">{{errors.first('password_confirmation')}}</span>
        <button type="submit">更新密码</button>
    </form>
</template>
<script>
export default {
    data() {
        return {
            password: ''
        }
    },
    methods: {
        updatePassword() {
            const formData = {
                password: this.password
            }
            this.$store.dispatch('updatePasswordRequest', formData).then(response => {
                
            }).catch(error => {

            });
        }
    }
}
</script>

