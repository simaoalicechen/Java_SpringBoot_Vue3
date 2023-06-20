<template>
  <div
    draggable="true"
    style="select: none"
  >
    <div class="school-simple-container" @click="swapDetail">
      <template v-if="!isDetail">
        <div class="school-simple-img-container">
            <img
              class="school-simple-img"
              draggable="false"
              src="../../assets/meal.png"
            />
            <img
              class="school-simple-img"
              :src="defaultImg"
              draggable="false"
              src="../../assets/meal.png"
            />
        </div>
      </template>

      <div class="school-simple-name-row">
        <div class="school-simple-name-name">
          <template v-if="isDetail">
            <p>isDetail</p>
          </template>
          <template v-else>
            isNotDetail
          </template>
        </div>
      </div>
      <div class="school-simple-dim-container">
        <template
          v-for="item in resCards"
          :key="item.restaurantid"
        >
          <template v-if="!isDetail">
              <div class="school-simple-dim-row">
                <div class="school-simple-dim-name">
                  {{ item.restaurantname }}
                </div>
                <div class="school-simple-dim-value">{{ item.restauranttype }}</div>
                <div class="school-simple-dim-name">
                  {{ item.restaurantaddress }}
                </div>
                <div class="school-simple-dim-value">{{ item.restaurantphonenumber }}</div>
              </div>
          </template>
          <template v-if="isDetail">
            <div class="school-simple-dim-row">
              <div class="school-simple-dim-name">
                {{ item.restaurantmanager }}
              </div>
              <div class="school-simple-dim-value">
                  {{ item.restaurantaddress }}
                
                <span>
                  {{ item.restaurantphonenumber }}
                </span>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue"
import { getRestaurantList } from "../../api/index.js";

export default {
  setup(){
    const resCards = ref([])
    return {
      resCards
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
  data(){
    return {
      isDetail: false, 
    }
  },
    methods: {
    swapDetail() {
      this.isDetail = !this.isDetail;
    },
  },
}
</script>

<style scoped>
.school-simple-container {
  position: absolute;
  left: 35%;
  top: 15%;
  width: 350px;
  height: 450px;
  border-radius: 20px;
  padding: 40px;
  box-sizing: border-box;
  background: #ecf0f3;
  box-shadow: 14px 14px 20px #779886, -14px -14px 20px white;
  font-family: "Aleo";
  display: flex;
  flex-direction: column;
}

.school-simple-img-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.school-simple-img {
  max-width: 200px;
  max-height: 160px;
  border-radius: 10px;
  border: 2px solid #779886;
}

.school-simple-name-row {
  width: 100%;
  padding: 15px;
}

.school-simple-name-name {
  width: 100%;
  text-align: end;
  font-weight: bold;
  font-size: 24px;
  font-family: "Libre Baskerville";
}

.school-simple-name-borough {
  width: 100%;
  text-align: end;
  font-size: 20px;
}

.school-simple-dim-container {
  flex-grow: 1;
  overflow-y: auto;
}
.school-simple-dim-row {
  width: 100%;
  margin-bottom: 20px;
}

.school-simple-dim-name {
  font-family: "Aleo";
  font-weight: bold;
  border-bottom: 1px solid #779886;
  font-size: 18px;
}

.school-simple-dim-value {
  font-family: sans-serif;
  margin-left: 5px;
  font-size: 18px;
}

</style>