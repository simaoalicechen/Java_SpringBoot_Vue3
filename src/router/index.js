import { createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: "/",
    redirect:'homepage',
    name: "HomePage",
    component: () => import('../views/HomePage.vue')
  },
  // {
  //   path: "/logout",
  //   name: "logout",
  //   component: () => import('../views/LogoutView.vue')
  // },
  {
    path: "/login/loginwithphonenumber",
    name: "LoginWithPhonenumber",
    component: () => import('../views/Login/LoginWithPhonenumber.vue')
  },
  {
    path: "/login/loginwithusername",
    name: "LoginWithUsername",
    component: () => import('../views/Login/LoginWithUsername.vue')
  },
  {
    path: "/login",
    name: "login",
    component: () => import('../views/LoginView.vue')
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import('../views/SignupView.vue')
  },
  {
    path: "/error",
    name: "generalerror",
    component: () => import('../error/GeneralError.vue')
  },
  {
    path: "/HomePage",
    name: "HomePage",
    component: () => import('../views/HomePage.vue'),
    children: [
      {
        path: "homechildren",
        name: "HomeChildren",
        component: () => import('../views/HomeChildren.vue'),
      },
    ]
  },
  {
    //凡事是父路由，要加<RouterView></RouterView>相当于是一个容器，来防止子路由。
    path: "/usermanagement",
    name: "admin",
    component: () => import('../admin/admin.vue'),
    children: [
      {
        path: "getalluser",
        name: "Usermanagement",
        component: () => import('../admin/usermanagement.vue')
      },
    ]
  },
  {
    path: "/restaurant/restaurantView",
    name: "RestaurantView",
    component: () => import('../views/restaurant/restaurantView.vue')
  },
  {
    path: "/restaurant/restaurantDetails",
    name: "RestaurantDetails",
    component: () => import('../views/restaurant/restaurantDetails.vue')
  },
  {
    path: "/restaurant/restaurantCard",
    name: "RestaurantCard",
    component: () => import('../views/restaurant/restaurantCard.vue')
  },
  {
    path: "/restaurant/restaurantShareCard",
    name: "RestaurantShareCard",
    component: () => import('../views/restaurant/restaurantShareCard.vue')
  },
  {
    path: "/restaurant/restaurantCardDrag",
    name: "RestaurantCardDrag",
    component: () => import('../views/restaurant/restaurantCardDrag.vue')
  },
  {
    path: "/restaurant/resShelf",
    name: "resShelf",
    component: () => import('../views/restaurant/resShelf.vue')
  },
  {
    path: "/order/addOrder",
    name: "OrderView",
    component: () => import('../views/order/orderView.vue')
  },
  {
    path: "/favFood",
    name: "FavFood",
    component: () => import('../components/FavFood.vue')
  },
  {
    path: "/discover",
    name: "Discover",
    component: () => import('../components/Discover.vue')
  },
  {
    path: "/myRestaurant",
    name: "MyRestaurant",
    component: () => import('../components/MyRestaurant.vue')
  },
  {
    path: "/Discover/toplist",
    name: "TopList",
    component: () => import('../components/Discover/TopList.vue')
  },
  {
    path: "/Discover/topfood",
    name: "TopFood",
    component: () => import('../components/Discover/TopFood.vue')
  },
  {
    path: "/Discover/toptype",
    name: "TopType",
    component: () => import('../components/Discover/TopType.vue')
  },
  {
    path: "/favfood/:id",
    name: "Food",
    component: () => import('../components/FavFood/Food.vue')
  },
  {
    // path: "/",
    // name: "home",
    // component: HomeView,
  },
  {
    // path: "/about",
    // name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
  linkActiveClass: 'active'
});


export default router;
