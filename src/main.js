import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory} from "vue-router"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import HomeSet from "@/components/HomeSet.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: HomeSet
        }
    ]
})

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')