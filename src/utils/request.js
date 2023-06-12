import axios from "axios";
import store from "@/store";
import { removePopper } from "element-plus/es/components/table/src/util";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 6000
});

instance.interceptors.request.use(function(config) {
  console.log("已经进入request");
  console.log(localStorage);
  const token = localStorage.getItem('satoken');
  console.log(token);
  if(token){
    config.headers.satoken = token
  }
  console.log(token);
  console.log(config);
  return config; 
}, function(error){
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  // console.log("response from response    ", response)
  // console.log("response.data:  ", response.data);
  console.log("进入respoonse了");
  console.log(response.data);
  console.log(response);
  console.log(response.status);
  // console.log(response.data.data.token);
  // console.log(response.data.code);
  // store.commit("setUserinfo", "hello");
  // store.commit("setUserinfo", response.data);
  // console.log(store.state.userinfo);
  switch(response.status){
    case 200:
      return response.data;

    case 401:
      return Promise.reject();

    default:
      return Promise.reject();
  }
}, function (error) {
  return Promise.reject(error); 
})

export default instance;
