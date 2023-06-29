import { createApp } from "vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'font-awesome/css/font-awesome.min.css'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import instance from "@/utils/request.js";
import {createPinia} from "pinia";
import piniaPersist from 'pinia-plugin-persist'


const pinia = createPinia();
pinia.use(piniaPersist)
const app = createApp(App).use(pinia).use(store).use(router).use(ElementPlus)
// app.use(parseTime)
//在这中间写组件的全局注册
// app.component("GlobalComponent", GlobaleComponent)
// app.config.globalProperties.axios = axiosInstance;
app.config.globalProperties.$axios = instance 
app.mount("#app")




