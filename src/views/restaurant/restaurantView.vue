<template>
<h1>Restaurant View</h1>
<!-- <h1>{{userStore.userInfo}}</h1> -->
<h1>{{userStore.userInfo['username']}}</h1>
<h1>登陆状态判断：{{isLogin ? '  登陆' : '  未登陆'}}</h1>
<i class="fa-duotone fa-bowl-chopsticks-noodles"></i>
<div class="block">
   <el-table
    :data="restaurants"
    style="width: 100%" height="250"
    :row-class-name="tableRowClassName" >
    <el-table-column
      prop=restaurantname
      label="餐厅名字"
      width="250">
    </el-table-column>
    <el-table-column
      prop=restauranttype
      label="餐厅种类"
      width="250">
    </el-table-column>
    <el-table-column
      prop=restaurantaddress
      label="餐厅地址"
      width="250">
    </el-table-column>
    <el-table-column
      prop=restaurantcontact
      label="餐厅联系方式"
      width="250">
    </el-table-column>
    <el-table-column
      prop=restaurantmanager
      label="餐厅经理">
    </el-table-column>
  </el-table>
  <i class="fa fa-camera-retro"></i>
  <i class="fa-regular fa-bowl-chopsticks-noodles fa-shake"></i>
    <span class="demonstration"></span>
    <el-date-picker
      v-model="value1"
      align="right"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions">
    </el-date-picker>
  </div>
</template>

<script>
import { getRestaurantList } from "../../api/index.js";
import { useUserStore} from "@/store/index.js";
import { ref, reactive } from "vue";

export default {
    setup() {
    const userStore = useUserStore();
    console.log(userStore);
    const isLogin = !!localStorage.getItem("satoken");
    function tableRowClassName({row, rowIndex}) {
        if (rowIndex %2 === 1) {
          return 'warning-row';
        } else if (rowIndex %2 === 0) {
          return 'success-row';
        }
        return '';
      }
    const restaurants = ref()
    const value1 = ref()
    return {
      userStore, isLogin, tableRowClassName, restaurants, value1
    }
  },
    created:function(){
      getRestaurantList().then(response => {
        console.log(response);
        this.restaurants = response;
      }).catch((error) => {
        console.log(error); 
        this.output = "restaurant List completed";
      }); 
    },
    data(){
      return {
        // restaurants: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        // value1: '',
      }
    }
}
</script>

<style>
#restaurantView {
  font-family: Avenir, Helvetica, Arial, sans-serif; 
  -webkit-font-smoothing: antialiased; 
  -moz-osx-font-smoothing: grayscale; 
  text-align: center; 
  color: #2c3e50;
  margin-top: 60px; 
}

#td{
  color: black;
}

#restaurantTable{
  position: relative;
	margin: auto; 
}

.el-table .warning-row {
    background: oldlace;
  }

.el-table .success-row {
    background: #f0f9eb;
  }


</style>