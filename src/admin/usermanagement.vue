<template>
    <h3> this is usermanagement page </h3>

    <div>
      <el-table :data="tableData" style="width: 100%"  height="250" :row-class-name="tableRowClassName">
        <el-table-column fixed prop="userid" label = "编号" width="300">
        </el-table-column>
        <el-table-column prop="username" label = "用户名" width="300">
        </el-table-column>
        <el-table-column prop="password" label = "密码" width="300">
        </el-table-column>
        <el-table-column prop="phonenumber" label = "电话号码" width=300>
        </el-table-column>
        <el-table-column prop="registrationtime" label = "注册时间" width=300>
        </el-table-column>
      </el-table>    
      <el-date-picker
      v-model="value1"
      align="right"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions">
    </el-date-picker>
      <i class="fa fa-camera-retro"></i>
     </div>

</template>
  
<script>
  import { getAllUser } from "../api/index.js";
  import { ref, reactive } from "vue";

  export default {
    setup(){
      function tableRowClassName({row, rowIndex}) {
        if(rowIndex%2 === 1) {
          return 'warning-row';
        } else if (rowIndex%2 === 0) {
          return 'success-row';
        }
        return '';
      }
      const tableData = ref();
      const value1 = ref();
      return {
        tableRowClassName, tableData, value1
      }
    },
    created:function(){
      getAllUser().then(response => {
        let token = localStorage.getItem("satoken");
        console.log(token);
        console.log(response);
        this.tableData = response;
      }).catch((error) => {
        console.log(error); 
      }); 
    },
  }
  
  </script>
  <style>
  .el-table .warning-row {
    background: oldlace; 
  }

  .el-table .success-row {
    background: #f0f9eb; 
  }

  </style>