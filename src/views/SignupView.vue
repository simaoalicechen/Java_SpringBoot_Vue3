<template>
<form name="login-form" >
  <h1>注册页面</h1>
  <div v-if="!isLogin">
  <h2>请输入用户名和手机号注册</h2>
     <div class="mb-3">
            <label for="username">Username: </label>
            <input id="username" type="text" v-model="input.username"/>
          </div>
      <div class="mb-3">
            <label for="phonenumber">Phonenumber: </label>
            <input id="phonenumber" type="text" v-model="input.phonenumber"/>
          </div>
    <div class="mb-3">
      <label for="password">Password: </label>
        <input id="password" type="password" v-model="input.password"/>
    </div>
    <button class="btn btn-outline-dark" type="submit" v-on:click.prevent="signup()">
            Signup
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
import { getSignup } from "../api/index.js";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
const input = ref({
       password: "",
       username: "",
       phonenumber: "",
    })
let output = ref();
const isLogin = !!localStorage.getItem("satoken");
const newRouter = useRouter();
function backToMain(){
      newRouter.push("/");
  }
function signup(){
    if(input.username != "" && input.phonenumber != "" && input.password != ""){
      
    getSignup({
        "username": input.username,
        "password": input.password,
        "phonenumber": input.phonenumber
      }).then(response => {
        console.log("SignupView:  ", response);
        output = response.code + response.msg;
      }).catch((error) => {
        console.log(error); 
        output = response.code + response.msg;
      }); 
      }else{
        output = "Username and password can not be empty";
    }
  }


</script>

<style scoped>

</style>
