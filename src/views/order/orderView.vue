<template>
  <h1>Order View</h1>
  <h3>The order you just made:{{ tableData }}</h3>
  <!-- "orderid":11234,"menuid":12,"madetime":"2023-05-06T06:20:05.000+00:00","userid":1,"ispaid":0 -->
  <el-descriptions title="你的订单" :column="3" border :data="tableData">
  <el-descriptions-item prop="orderid" label="订单id" label-class-name="my-label" content-class-name="my-content">{{tableData.orderid}}</el-descriptions-item>
  <el-descriptions-item prop="menuid" label="菜单id">{{tableData.menuid}}</el-descriptions-item>
  <el-descriptions-item prop="madetime" label="下单时间">{{tableData.madetime}}</el-descriptions-item>
  <el-descriptions-item prop="userid" label="用户id">
    {{tableData.userid}}
  </el-descriptions-item>
  <el-descriptions-item label="是否结账" :contentStyle="{'text-align': 'right'}" :isPaidFunction="isPaidFunction">{{tableData.ispaid}}</el-descriptions-item>
</el-descriptions>
</template>

<script>
import axios from "axios"

export default {
  name: "orderView",
  created:function(){
      axios.post("http://localhost:8080/order/addOrder", 
      {
        "orderid": 11234,
        "menuid": 12,
        "madetime": "2023-05-06T06:20:05.000+00:00",
        "userid": 1,
        "ispaid": 0
      })
      .then((response) => {
        console.log(response)
        this.tableData = response.config["data"]; 
        this.tableData = eval("(" + this.tableData + ")")
      })
      .catch((error) => {
        console.log(error); 
      }); 
    },
    methods: {
      getPhonenumber(){
        return this.$store.getters[`auth/${GET_PHONENUMBER}`]
      }
    },
  data(){
      return {
        tableData: {}
      }
    }
}
</script>

<style>
  .my-label {
    background: #E1F3D8;
  }

  .my-content {
    background: #FDE2E2;
  }
</style>