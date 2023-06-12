<template>
<div v-if="!userStore.username">
        <h1>登录页面</h1>
        <h3>请选择登陆方式</h3>
    <router-link to="/login/loginwithusername">用用户名登陆</router-link>
    <p>   </p>
    <router-link to="/login/loginwithphonenumber">用电话号码登陆</router-link>
</div>
<div v-else>
  <h1>已登陆</h1>
  <h1>{{userStore.userInfo}}</h1>
  <button @click="backToMain">点击回主页</button>
</div>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "@/store/index.js";
  const userStore = useUserStore()
  const newRouter = useRouter();
  // const isLogin = !!localStorage.getItem("satoken");
  function backToMain(){
    newRouter.push("/HomePage");
  }
</script>

<style scoped>

</style>