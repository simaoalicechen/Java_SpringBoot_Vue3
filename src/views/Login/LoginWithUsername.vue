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
  const output = ref()
  const newRouter = useRouter();
  function backToMain(){
      newRouter.push("/HomePage");
  }
  function login(){
      if(this.input.username != "" && this.input.password != ""){
        this.output = "Authentication complete";
        this.output = "Authentication complete.";
      console.log(this.input);
      getLoginWithusername(this.input).then(res => {

          // 用LocalStorage来存储satoken
          console.log("res 来自于loginwithphonenumber： ", res);
          console.log(res.data);
          console.log(res.data.token);
              localStorage.setItem("satoken", res.data.token)
          // 用Pinia来存储userInfo
              userStore.saveUserInfo(res.data);
              console.log("userStore: ", userStore);
              console.log("userStore userinfo username: ", userStore.userInfo.username);
              this.output = res.code + res.msg;
              
      }).catch((error) => {
        console.log(error); 
        // this.output = res.code + res.msg;
      }); 
      }else{
        this.output = "Username and password can not be empty";
    }
  }

</script>

<style scoped>

</style>
