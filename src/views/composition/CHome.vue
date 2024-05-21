<script setup>
import CCountryCard from '../../components/composition/CCountryCard.vue';
import CountryDropdown from '../../components/Dropdown.vue';
import CountriesSpinner from '../../components/Spinner.vue';
import SearchBar from '../../components/SearchBar.vue';
import { storeToRefs } from 'pinia';
import useCountriesStore from '@/stores/countries';
import { ref } from 'vue';

const store = useCountriesStore();
const {filterCountries} = storeToRefs(store);

if(store.countries.length === 0)
    store.fetchCountries();

const filter = ref(null);

const setFilter = () => {
    if (store.selectedRegion) {
        filter.value = {field: 'region', value: store.selectedRegion};
    } else if (store.search) {
        filter.value = {field: 'name', value: store.search};
    } else {
        filter.value = null;
    }
}
</script>

<template>
    <div class="p-12">
        <div class="flex flex-col gap-5 sm:gap-1 sm:flex-row justify-between my-5 w-full">
            <SearchBar @filter="setFilter"/>
            <CountryDropdown @filter="setFilter" />
        </div>
        
        <div v-if="store.loading" class="w-full mt-12 flex justify-center">
            <CountriesSpinner />
        </div>

        <section v-else class="flex flex-wrap gap-4 gap-y-16 justify-between mt-12">
            <template v-for="country in filterCountries" :key="country.id">
                <CCountryCard :country="country" />    
            </template>
        </section>     
    </div>
</template>