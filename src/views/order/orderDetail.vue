<template>
  <h1>Order Detail</h1>
  <h3> {{dishid}} </h3>
  <span> {{restaurantid}} </span>
</template>

<script>
export default {
  name: "orderDetail",
  props: ["dishid", "restaurantid"]
}
</script>

<style>

</style>