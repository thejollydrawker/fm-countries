<script lang="ts" setup>
import useCountriesStore from '@/stores/countries';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import { ROUTES } from '@/router/index';
import { storeToRefs } from 'pinia';
import CountriesSpinner from '@/components/Spinner.vue';
import { onMounted, onBeforeMount } from 'vue';

const router = useRouter();
const store = useCountriesStore();
const {selectedCountry, getBorderNames} = storeToRefs(store);
const props = defineProps({id: String})

onBeforeMount(() => {
    if(store.countries.length === 0)
        store.fetchCountries();
})

onMounted(() => {
    getCountry(props.id);
});

onBeforeRouteUpdate((to) => {
    const countryid = typeof to.params.id === 'string' ? to.params.id : to.params.id[0];
    getCountry(countryid);
});

const getCountry = (countryId?: string) => {
    const country = countryId;
    console.log(countryId);
    

    if (country && typeof country === 'string') {
        store.fetchCountry(countryId || country);
    }
}

const navigate = (border: string) => {
    const countryBorder = store.getCountry(border);
    if (countryBorder) {
        router.push({name: ROUTES.CCOUNTRY, params: { id: countryBorder.name.common }});
    }
}
</script>

<template>
  <div class="p-16">
        <router-link :to="{name: ROUTES.CHOME}" class="py-2 px-4 border-1 max-w-max rounded-sm shadow-sm dark:shadow-slate-900 flex gap-2 items-center transition ease-in-out transform hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
            Back
        </router-link>
        <div v-if="store.loading" class="w-full mt-12 flex justify-center">
            <CountriesSpinner />
        </div>
        <section v-else class="flex flex-col md:flex-row mt-12 justify-between">
            <img :src="selectedCountry?.flags?.svg" :alt="selectedCountry?.flags?.alt" class="w-full md:w-[45%] h-[22rem] shadow-xl dark:shadow-slate-900 object-cover">

            <div class="w-5/6 md:w-[45%] mt-12 sm:mt-6">
                <h2 class="text-2xl font-bold">{{ selectedCountry?.name?.common }}</h2>
                <div class="flex flex-col md:flex-wrap md:h-36 mt-6">
                    <p class="flex gap-1 text-sm my-1" v-for="(info, index) in store.getCountryInfo" :key="index">
                        <span class="font-bold">{{ info.label }}:</span>{{ info.label.toLowerCase() === 'population' ? new Intl.NumberFormat("de-DE").format(info.value) : info.value }}
                    </p>
                </div>

                <p class="mt-20 flex flex-wrap gap-1 text-sm items-center">
                    <span class="font-bold mr-2">Border Countries:</span>
                    <template v-if="selectedCountry?.borders && selectedCountry.borders.length > 0">
                        <span @click="navigate(border.cca3)" class="bg-primary-element dark:bg-secondary-element px-5 py-1 mr-1 rounded-md flex items-center cursor-pointer"
                        v-for="(border, index) in getBorderNames(selectedCountry?.borders)" :key="index">
                            {{ border.name }}
                        </span>  
                    </template>
                    <template v-else>
                        <span class="bg-primary-element dark:bg-secondary-element px-5 py-1 mr-1 rounded-md flex items-center">
                            None
                        </span>
                    </template>
                    
                </p>
            </div>
            
        </section>
    </div>
</template>