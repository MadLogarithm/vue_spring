import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory} from "vue-router"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import HomeSet from "@/components/HomeSet.vue";
import BasicGet from "@/page/backend/BasicGet.vue";
import BasicSelect from "@/page/backend/BasicSelect.vue";
import BasicEdit from "@/page/backend/BasicEdit.vue";
import InputRules from "@/page/frontend/InputRules.vue";
import HomePage from "@/page/home/HomePage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: HomeSet,
            children: [
                {
                  path: '/home',
                  component: HomePage
                },
                {
                    path: '/basicGet',
                    component: BasicGet
                },
                {
                    path: '/basicSelect',
                    component: BasicSelect
                },
                {
                    path: '/basicEdit',
                    component: BasicEdit
                },
                {
                    path: '/inputRules',
                    component: InputRules
                }
            ]
        }
    ]
})

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')