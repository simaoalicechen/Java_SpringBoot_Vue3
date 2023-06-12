<template>
  <div>
    <h1>发现餐厅</h1>
    <!-- 子路由 -->
    <router-link to="/Discover/toplist">推荐餐厅</router-link>
    <router-link to="/Discover/topfood">推荐美食</router-link>
    <router-link to="/Discover/toptype">推荐种类</router-link>
  </div>
</template>

<script>
export default {
  name: "Discover",
}
</script>

<style>

</style>