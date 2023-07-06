<template>
<form name="login-form" >
  <div v-if="!userStore.userInfo.username">
  <h1>登录页面</h1>
  <h2>请用用户名登陆</h2>
     <div class="mb-3">
            <label for="username">Username: </label>
            <input id="username" type="text" v-model="input.username"/>
          </div>
    <div class="mb-3">
      <label for="password">Password: </label>
        <input id="password" type="password" v-model="input.password"/>
    </div>
    <button class="btn btn-outline-dark" type="submit" v-on:click.prevent="login()">
            Login
    </button> 
     <h3>Output: {{ output }}</h3>
  </div>
  <div v-else>
    已登陆，点击回主页
    <button @click="backToMain">回主页</button>
  </div>
</form>
</template>

<script setup>
import { getLoginWithusername } from "../../api/index.js";
import { useUserStore } from "../../store/index.js";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
  const isLogin = !!localStorage.getItem("satoken");
  const userStore = useUserStore();
  const input = reactive({
    password: "",
    username: ""
  })
  let output = ref()
  const newRouter = useRouter();
  function backToMain(){
      newRouter.push("/HomePage");
  }
  function login(){
      if(input.username != "" && input.password != ""){
        output = "Authentication complete";
      console.log(input);
      getLoginWithusername(input).then(res => {

          // 用LocalStorage来存储satoken
              localStorage.setItem("satoken", res.data.token)
          // 用Pinia来存储userInfo
              output = res.code + res.msg;
              
      }).catch((error) => {
        console.log(error); 
      }); 
      }else{
        output = "Username and password can not be empty";
    }

   
  }

</script>

<style scoped>

</style>
