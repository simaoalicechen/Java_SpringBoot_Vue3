<template>
  <h3>{{ title }}</h3>
    <span>{{ type }}</span>
  <div>
  <span>{{ address }}</span>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "restaurantDetails",
  props: ["name", "address", "type"]
}
</script>

<style>

</style>