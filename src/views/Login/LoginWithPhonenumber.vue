<template>
<form name="login-form" >
  <div v-if="!userStore.userInfo.username">
  <h1>登录页面</h1>
  <h2>请用电话号码登陆</h2>
    <div class="mb-3">
      <label for="phonenumber">Phone Number: </label>
        <input id="phonenumber" type="text" v-model="input.phonenumber"/>
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
import { getLoginWithphonenumber } from "../../api/index.js";
import { useUserStore } from "../../store/index.js";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const isLogin = !!localStorage.getItem("satoken");
const userStore = useUserStore();
// const isLogin = userStore.userInfo.username

const input = reactive({
            password: "alice12345",
            phonenumber: "12345678910"
        })
  let output = ref()
  const newRouter = useRouter();
  function backToMain(){
      newRouter.push("/HomePage");
  }
  function login(){
      if(input.phonenumber != "" && input.password != ""){
        output = "Authentication complete";
        getLoginWithphonenumber({
          password: input.password,
          phonenumber: input.phonenumber
        }).then(res => {
          // 用LocalStorage来存储satoken
          localStorage.setItem("satoken", res.data.token)
          // 用Pinia来存储userInfo
          userStore.saveUserInfo(res.data);
          output = res.code + res.msg;
              
            }).catch((error) => {
              console.log('catch',error);
            }); 
      }else{
        output = "Phonenumber and password can not be empty";
      }
 
    // return {
    //   isLogin, userStore, input, output, newRouter, backToMain
    // }
  }
</script>

<style scoped>

</style>
