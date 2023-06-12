<template>
  <RouterView></RouterView>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/index.js";
import { ref, reactive, computed } from "vue";
import { getUserInfo, getLogout } from "@/api/index.js";
import HomePage from "@/views/HomePage";

const newRouter = useRouter();
console.log("newRouter 在APP.vue中：", newRouter.userInfo);
function toLoginPage() {
  newRouter.push("/login");
}
// const isLogin = !!localStorage.getItem("satoken");
const tokenFromLS = localStorage.getItem("satoken");
getUserInfo({
  tokenString: tokenFromLS,
})
  .then((res) => {
    console.log("res来自于getUserInfo在App中: ", res);
    // 用Pinia来存储userInfo
    userStore.saveUserInfo(JSON.parse(res.data));
    console.log(
      "userStore 在getUserInfo then之后，在App中。",
      userStore.userInfo
    );
  })
  .catch((error) => {
    console.log("catch", error);
  });

const userStore = useUserStore();
console.log("userStore 在getUserInfo之后，在App中。", userStore.userInfo);

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>