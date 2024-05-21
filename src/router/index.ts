import Country from '@/views/Country.vue'
import Home from '@/views/Home.vue'
import CHome from '@/views/composition/CHome.vue';
import CCountry from '@/views/composition/CCountry.vue'
import NotFound from '@/views/NotFound.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

export const ROUTES = {
    HOME: "home",
    CHOME: 'c-home',
    COUNTRY: "country",
    CCOUNTRY: 'c-country',
    NOT_FOUND: "404",

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
        path: '/composition',
        name: ROUTES.CHOME,
        component: CHome,
    },
    { 
        path: '/composition/country/:id',
        name: ROUTES.CCOUNTRY,
        component: CCountry,
        props: true
    },
    { 
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        component: NotFound 
    },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })
  
