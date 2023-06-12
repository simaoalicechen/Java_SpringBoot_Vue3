import {defineStore} from "pinia";
// options store
export const useUserStore = defineStore("mainStore", {
  state: () => {
   return {
     userInfo: {

     }
   }
},
  getters: {// 相当于computed 计算属性
    gettersUserInfo: (state) => state.userInfo,
  },
  actions: {//相当于methods
    changeName(newName){
      this.userInfo["username"] = newName; 
    },
    saveUserInfo(userInfoFromBackEnd){
      this.userInfo = userInfoFromBackEnd;
    },
    deleteUserInfo(){
      this.userInfo = {};
    }
  }
})

export const useCounterStore=defineStore("counter", ()=>{
  const counter=ref(30);//state
  const getterCounter = computed(() =>{
    return counter.value+5;
  })

  function addCounter(){
    counter.value++; 
  }

  return {counter, getterCounter, addCounter}
})