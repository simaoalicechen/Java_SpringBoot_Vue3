<template>
  <div style="select: none">
    <div class="school-sharecard-container" 
         @click="swapDetail"
         >
      <div v-if="!isDetail" 
      class="school-simple-img-container"
      >
        <span><p>Image, isDetail, {{currCard.restaurantname}}</p>
        </span>
      </div>
      <div class="school-simple-name-row">
        <div class="school-simple-name-name">
              {{currCard.restaurantname}}
        </div>
      </div>
      <div v-if="isDetail">
        <p>isNotDetail</p>
        <div class="school-data">
          {{currCard.restauranttype}}
        </div>
        <div class="school-data">
          {{currCard.restaurantaddress}}
        </div>
        <div class="school-data">
          {{currCard.restaurantcontact}}
        </div>
        <div class="school-data">
          {{currCard.restaurantmanager}}
        </div>
        <div class="school-desc">
          其他数据
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRestaurantList } from "../../api/index.js";

export default {
  name: "restaurantShareCard",
  computed: {
    currCard(){
      let res = {}
      if(this.resCards[this.cardIndex]){
        res = this.resCards[this.cardIndex]
      }
      return res;
    }
  },
  data() {
    return {
      isDetail: true,
      resCards: [],
      cardIndex: 0,
    };
  },
  created:function(){
      getRestaurantList().then(response => {
        console.log(response);
        this.resCards = response;
        this.currCard = this.resCards[this.cardIndex]
      }).catch((error) => {
        console.log(error); 
        this.output = "restaurant List completed";
      }); 
    },
  methods: {
    swapDetail() {
      this.isDetail = !this.isDetail;
    },
    increaseCardIndex(){
      if(this.cardIndex >= this.resCards.length-1){
        return this.cardIndex; 
      }
      return this.cardIndex ++;
    }, 
    getCurrCard(){
      this.currCard = this.resCards[this.cardIndex]
      return this.currCard
    },
    getCurrCardIndex(){
      return this.cardIndex; 
    }

  },
}
</script>

<style>
.school-sharecard-container {
  width: 350px;
  height: 500px;
  border-radius: 20px;
  padding: 10px;
  box-sizing: border-box;
  background: #ecf0f3;
  box-shadow: 3px 3px 3px #9da29c;
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
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  font-family: "Libre Baskerville";
}

.school-data {
  width: 100%;
  text-align: left;
  font-size: 15px;
}

.school-desc {
  width: 100%;
  height: 100px;
  text-align: left;
  font-size: 15px;
  overflow-y: scroll;
  background-color: #d7ddd9;
  padding-top: 10px;
}
.school-detail-dim-row {
  width: 100%;
  margin-bottom: 10px;
}
.school-detail-dim-name {
  font-family: "Aleo";
  font-weight: bold;
  border-bottom: 1px solid #779886;
  font-size: 18px;
}

.school-detail-dim-value {
  font-family: sans-serif;
  margin-left: 5px;
  font-size: 18px;
}

</style>