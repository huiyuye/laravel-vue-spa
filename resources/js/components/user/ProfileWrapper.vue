<template>
    <div>
        <router-link :to="{name: 'profile'}" activeClass="active" exact>个人资料</router-link> 
        <router-link :to="{name: 'profile.editProfile'}" activeClass="active" exact>修改资料</router-link> 
        <router-link :to="{name: 'profile.editPassword'}" activeClass="active" exact>修改密码</router-link> 
        <router-view/>
    </div>
</template>
