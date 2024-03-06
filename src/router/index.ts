import Country from '@/views/Country.vue'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

export const ROUTES = {
    HOME: "home",
    COUNTRY: "country",
    NOT_FOUND: "404"
}

const routes = [
    {
        path: '/',
        name: ROUTES.HOME,
        component: Home
    },
    { 
        path: '/country/:id',
        name: ROUTES.COUNTRY,
        component: Country 
    },
    { 
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        component: NotFound },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })
  
