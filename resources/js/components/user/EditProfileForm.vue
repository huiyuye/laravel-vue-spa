<template>
    <form @submit.prevent="updateProfile">
        <label for="email">用户名</label>
        <input v-model="name" 
                    name="name"
                    id="name" type="text">
        <span v-show="errors.has('name')">{{errors.first('name')}}</span>
        <label for="email">邮箱</label>
        <input v-model="email" 
                    name="email"
                    id="email" type="text">
        <span v-show="errors.has('email')">{{errors.first('email')}}</span>
        <button type="submit">更新用户资料</button>
    </form>
</template>
<script>
import JWTToken from '../helpers/jwt';
import * as types from "../../store/mutation-type";
export default {
    computed: {
        name: {
            get() {
                return this.$store.state.AuthUser.name;
            },
            set(value) {
                this.$store.commit({
                    type: types.UPDATE_PROFILE_NAME,
                    value: value
                })
            }
        },
        email: {
            get() {
                return this.$store.state.AuthUser.email;
            },
            set(value) {
                this.$store.commit({
                    type: types.UPDATE_PROFILE_EMAIL,
                    value: value
                })
            }
        }
    },
    methods: {
        updateProfile() {
            const formData = {
                name: this.name,
                email: this.email
            }
            this.$store.dispatch('updateProfileRequest', formData).then(response => {
                this.$router.push({name: 'profile'});
            }).catch(error => {

            });
        }
    }
}
</script>

