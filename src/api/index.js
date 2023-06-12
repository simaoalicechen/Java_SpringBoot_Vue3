import request from "@/utils/request.js"

export function getLoginWithusername(option){
  return request({
    url: '/user/loginwithusername', 
    method: "post",
    data: option, 
    params: {}
  })
}

export function getLoginWithphonenumber(option){
  return request({
    url: '/user/loginwithphonenumber', 
    method: "post",
    data: option, 
    params: {}
  })
}

export function getSignup(option){
  return request({
    url: '/user/signup', 
    method: "post",
    data: option, 
    params: {}
  })
}

export function addOrder(option){
  return request({
    url: '/order/addOrder', 
    method: "post",
    data: option, 
    params: {}
  })
}

export function getRestaurantList(params){
  return request({
    url: '/restaurant/restaurantview', 
    method: "get",
    params,
  })
}

export function getUserInfo(params){
  return request({
    url: '/user/checkifloggedin', 
    method: "get",
    params
  })
}

export function getLogout(params){
  console.log("进入getLogout方程");
  return request({
    url: '/user/logout', 
    method: "get",
    params
  })
}

export function getAllUser(params){
  return request({
    url: '/usermanagement/getAllUser', 
    method: "get",
    params,
  })
}