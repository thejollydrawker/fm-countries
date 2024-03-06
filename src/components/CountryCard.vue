<template>
    <div @click="navigate()" class="shadow-md w-5/6 sm:w-72 bg-primary-element dark:bg-secondary-element rounded-md cursor-pointer">
        <div class="relative group">
            <img :src="country.flags.png" :alt="country.flags.alt" class="rounded-t-md w-full sm:w-72 h-52 sm:h-40 object-cover group-hover:blur-[2px]"/>
            <span class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block bg-secondary-element/40 text-white py-1 px-2 rounded-md border-2 border-white text-lg font-semibold">Details</span>
        </div>
        
        <div class="p-4">
            <h3 class="font-bold my-3">{{ country.name.common }}</h3>
            <div>
                <span class="font-semibold text-sm">Population: </span> {{ country.population }}
            </div>
            <div>
                <span class="font-semibold text-sm">Region:</span> {{ country.region }}
            </div>
            <div>
                <span class="font-semibold text-sm">Capital:</span> {{ country.capital[0] }}
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { ROUTES } from '@/router';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CountryCard',
    props: {
        country: {
            type: Object,
            default: () => ({})
        }
    },
    setup() {
        return {
            ROUTES
        }
    },
    methods: {
        navigate() {
            this.$router.push({name: ROUTES.COUNTRY, params: { id: this.country.name.common }})
        }
    }
})
</script>