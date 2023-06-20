<template>
  <div class = "drop-zone" > 
    <div id = 'first_choice'
    @drop="onDrop($event, 'first')"
    @dragenter.prevent
    @dragover.prevent
    ><p>第一选择</p>
        <div v-for="item in getList1('first')" 
         :key="item.restaurantid" 
         class = "drag-el" 
         draggable="true" 
         @dragstart="startDrag($event, item)"
    >
      {{item}}
      </div>
    </div>
    </div> 
  <div class = "drop-zone"> 
    <div id = 'second_choice'
    @drop="onDrop($event, 'second')"
    @dragenter.prevent
    @dragover.prevent
    ><p>第二选择</p>
            <div v-for="item in getList2('second')" 
         :key="item.restaurantid" 
         class = "drag-el" 
         draggable="true" 
         @dragstart="startDrag($event, item)"
    >
      {{item}}
      </div>
    </div>
    </div> 
  <div class = "drop-zone"> 
    <div id = 'third_choice'
    @drop="onDrop($event, 'third')"
    @dragenter.prevent
    @dragover.prevent
    ><p>第三选择</p>
      <div v-for="item in getList3('third')" 
         :key="item.restaurantid" 
         class = "drag-el" 
         draggable="true" 
         @dragstart="startDrag($event, item)"
    >
      {{item}}
      </div>
    </div>
    </div>

<div class="card-containter"
    draggable="true"
    style="select: none"
    @dragstart="startDrag($event, item)"

  >
  <RestaurantShareCard ref="RestaurantShareCard" class = "card"
  ></RestaurantShareCard>
</div>


</template>

<script>
import RestaurantShareCard  from "./restaurantShareCard.vue"
import { getUserResRelation } from "../../api/index.js";
import { addOrUpdateUserResRelation } from "../../api/index.js";
import { ref } from "vue";

export default {
  name: "restaurantCardDrag",
  components:{RestaurantShareCard},
  setup(){
    const RestaurantShareCard = ref(null)
    const userResRelation = ref([])
    let listLevelOne = ref([])
    let listLevelTwo = ref([])
    let listLevelThree = ref([])

    const getList1 = (levelList) =>{
      return listLevelOne._rawValue.filter((item) => item.level == levelList);
    }
    const getList2 = (levelList) =>{
      return listLevelTwo.value.filter((item) => item.level == levelList);
    }
    const getList3 = (levelList) =>{
      return listLevelThree.value.filter((item) => item.level == levelList);
    }

      const startDrag = (event, item) => {
        item = userResRelation;
        event.dataTransfer.dropEffect = 'move'
        event.dataTransfer.effectAllowed = 'move'
      }

      const onDrop = (event, type) => {
        RestaurantShareCard.value.increaseCardIndex()
        const cardIndex = RestaurantShareCard.value.getCurrCardIndex()
        let tempUserResRelation = {}
        tempUserResRelation["level"] = type
        tempUserResRelation["restaurantid"] = cardIndex
        tempUserResRelation["userid"] = userResRelation._rawValue.userid
        console.log("变之前的listLevelOne", listLevelOne)
        console.log("变之前的listLevelTwo", listLevelTwo)
        console.log("变之前的listLevelThree", listLevelThree)
        console.log("变之前的userResRelation", userResRelation)
        console.log("新的数据tempUserResRelation是个list", tempUserResRelation)
        if(type==="first"){
          listLevelOne._rawValue.push(tempUserResRelation)
          console.log("变之后", listLevelOne)
        }else if(type==="second"){
          listLevelTwo._rawValue.push(tempUserResRelation)
        }else{
          listLevelThree._rawValue.push(tempUserResRelation)
        }
        addOrUpdateUserResRelation(
          {
          "userid": userResRelation._rawValue.userid,
          "restaurantid": cardIndex,
          "level": type, 
          "tokenString": localStorage.getItem("satoken")
        }
        ).then(response => {
          console.log(response);
        }).catch((error) => {
          console.log(error); 
        }); 
    }
      return {
        startDrag,onDrop, userResRelation, RestaurantShareCard, listLevelTwo,listLevelOne, listLevelThree, getList1, getList2, getList3
      }
    },
  created:function(){
      getUserResRelation().then(response => {
        this.userResRelation  = response["0"];
      }).catch((error) => {
        console.log(error); 
      }); 
    },
}
</script>

<style>
.card {
  position: absolute; 
  left: 35%;
  top: 12%; 
}

.drop-zone {
  top: 25%;
  width: 25%;
  left: 70%;
  background-color: #ecf0f1;
  padding: 10px;
  min-height: 20px;
  margin-top: 105px; 
  margin-bottom: 5px; 
}
/* 
.drop-zone {
  width: 25%;
  left: 70%;
  background-color: #ecf0f1;
  padding: 10px;
  min-height: 20px;
  margin-top: 105px; 
  margin-bottom: 5px; 
}

.drop-zone {
  width: 25%;
  left: 70%;
  background-color: #ecf0f1;
  padding: 10px;
  min-height: 20px;
  margin-top: 105px; 
  margin-bottom: 5px; 
} */
/* .drag-el {
  background-color: #3498db;
  color: white;
  padding: 5px;
  margin-bottom: 10px;
} */
</style>