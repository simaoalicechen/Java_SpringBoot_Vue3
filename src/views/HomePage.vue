<template>
  <div v-if="!userStore.userInfo.username">
    你未登陆，请登录
    <button @click="toLoginPage">点击登录</button>
  </div>
  <div v-else>
    <div>
    Welcome, {{ userStore.userInfo.username }}!
    </div>
    <router-link to="/discover">发现餐厅</router-link>
    <router-link to="/myRestaurant">我的餐厅</router-link>
    <router-link to="/favfood">我的最爱美食</router-link>
    <p>{{ userStore.role }}</p>
    <button @click="logout">Logout</button>
  </div>
  <RouterView></RouterView>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { useUserStore } from "../store/index.js";
  import { ref, reactive } from "vue";
  import { getUserInfo, getLogout } from "../api/index.js";

  const userStore = useUserStore();
  const newRouter = useRouter();
  console.log("useUserStore", useUserStore);
  const isLogin = !!localStorage.getItem("satoken");
  const tokenFromLS = localStorage.getItem("satoken");
  getUserInfo(tokenFromLS).then(res => {
          console.log(res);
          // 用Pinia来存储userInfo
          userStore.saveUserInfo(res.data);
          // console.log("res: ", res);   
          // localStorage.setItem("userInfo", JSON.stringify(res));
          }).catch((error) => {
              console.log('catch',error);
              // console.log(error.response.data); 
            }); 
  function toLoginPage() {
  newRouter.push("/login");
}
  function logout(){
  console.log("已经进入logout方程");
  getLogout(
    // {tokenString = localStorage.getItem("satoken") }
  )
  .then((res) => {
    console.log("tokenFromLS 来自logout的getLogout: ", tokenFromLS)
    // 用Pinia来存储userInfo
    console.log(
      "userStore 在deleteUserInfo之前，在App中。",
      userStore.userInfo
    );
    userStore.deleteUserInfo();
    console.log(
      "userStore 在deleteUserInfo之后，在App中。",
      userStore.userInfo
    );
    localStorage.removeItem("satoken");
    console.log(localStorage);
  })
  .catch((error) => {
    console.log("catch", error);
  });
  }
  // console.log("newRouter:" , newRouter)
  function changePage(){
  console.log("newRouter:" , newRouter)
    newRouter.push("/login");
  }
</script>