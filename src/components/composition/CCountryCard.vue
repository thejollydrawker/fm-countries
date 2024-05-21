<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ROUTES } from '@/router';

const router = useRouter();

const props = defineProps({
    country: Object
});

const navigate = () => {
    router.push({name: ROUTES.CCOUNTRY, params: { id: props.country?.name.common }});
}
</script>

<template>
  <div @click="navigate()" v-if="country" class="shadow-md w-5/6 mx-auto sm:w-72 bg-primary-element dark:bg-secondary-element rounded-md cursor-pointer">
        <div class="relative group" >
            <img :src="country.flags.png" :alt="country.flags.alt" class="rounded-t-md w-full sm:w-72 h-52 sm:h-40 object-cover group-hover:blur-[2px]"/>
            <span class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block bg-secondary-element/40 text-white py-1 px-2 rounded-md border-2 border-white text-lg font-semibold">Details</span>
        </div>
        
        <div class="p-4">
            <h3 class="font-bold my-3">{{ country.name.common }}</h3>
            <div>
                <span class="font-semibold text-sm">Population: </span> {{ new Intl.NumberFormat("de-DE").format(country.population) }}
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