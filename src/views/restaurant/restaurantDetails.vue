<template>
  <h1>restaurautDetail</h1>
  <div class = "drop-zone" id = 'first_choice'
    @drop="onDrop($event, '川菜')"
    @dragenter.prevent
    @dragover.prevent
    ><p>第一选择</p>
    <div v-for="item in getList('川菜')" 
         :key="item.restaurantid" 
         class = "drag-el" 
         draggable="true" 
         @dragstart="startDrag($event, item)"
    >
      {{item.restaurantname}}
      {{item.restauranttype}}
      </div>
  </div>
    <div class = "drop-zone" id='second_choice'
    @drop="onDrop($event, '干锅')"
    @dragenter.prevent
    @dragover.prevent
    ><p>第二选择</p>
    <div v-for="item in getList('干锅')" 
         :key="item.restaurantid" 
         class = "drag-el" 
         draggable="true" 
         @dragstart="startDrag($event, item)"
    >
      {{item.restaurantname}}
      {{item.restauranttype}}
      </div>
  </div>
    <div class = "drop-zone" id='third_choice'
    @drop="onDrop($event, '粤菜')"
    @dragenter.prevent
    @dragover.prevent
    ><p>第三选择</p>
    <div v-for="item in getList('粤菜')" 
         :key="item.restaurantid" 
         class = "drag-el" 
         draggable="true" 
         @dragstart="startDrag($event, item)"
    >
      {{item.restaurantname}}
      {{item.restauranttype}}
      </div>
  </div>



</template>

<script>

//TODO the for loop could be optimized in the HTML
import {ref} from "vue"
import { getRestaurantList } from "../../api/index.js";
// import { useUserStore} from "@/store/index.js";

export default {
  setup(){
    const resCards = ref([])
    const getList = (list) =>{
      console.log(resCards.value);
      return resCards.value.filter((item) => item.restauranttype == list);
    }

    const startDrag = (event, item) => {
      console.log(item)
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('restaurantid', item.restaurantid)
    }

    const onDrop = (event, type) => {
        const resid = event.dataTransfer.getData('restaurantid')
        const item = resCards.value.find((item) => item.restaurantid == resid)
        item.restauranttype = type
    }

    return {
      startDrag,
      onDrop, resCards, getList
    }
  },
  created:function(){
      getRestaurantList().then(response => {
        console.log(response);
        this.resCards = response;
      }).catch((error) => {
        console.log(error); 
        this.output = "restaurant List completed";
      }); 
    },

}
</script>

<style>

.drop-zone {
  width: 50%;
  margin: 50px auto;
  background-color: #ecf0f1;
  padding: 10px;
  min-height: 10px;
}

.drag-el {
  background-color: #3498db;
  color: white;
  padding: 5px;
  margin-bottom: 10px;
}

</style>