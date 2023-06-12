<template>
  <div>
    <h1>我的最爱美食</h1>
    <router-link to="/favfood/:1">美食1</router-link>
    <router-link to="/favfood/:2">美食2</router-link>
    <router-link to="/favfood/:3">美食3</router-link>
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: "FavFood"
}
</script>

<style>

</style>