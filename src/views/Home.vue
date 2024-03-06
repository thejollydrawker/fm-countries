<template>
    <div class="p-12">
        <div class="flex justify-between my-5 w-full">
            <SearchBar />
            <CountryDropdown @filter="setFilter" />
        </div>
        
        <section class="flex flex-wrap gap-4 gap-y-16 justify-between mt-12">
            <template v-for="country in filterCountries(filter)" :key="country.id">
            
                <CountryCard :country="country" />
                
            </template>
        </section>
    </div>
</template>
<script>
import useCountriesStore from '@/stores/countries';
import { defineComponent, reactive, ref } from 'vue';
import CountryCard from '../components/CountryCard.vue';
import CountryDropdown from '../components/Dropdown.vue';
import SearchBar from '../components/SearchBar.vue';
import { storeToRefs } from 'pinia';

export default defineComponent({
    name: 'CountriesHome',
    components: {
        CountryCard,
        CountryDropdown,
        SearchBar
    },
    setup() {
        const store = useCountriesStore();
        const filter = ref(null);
        const {filterCountries} = storeToRefs(store)

        const setFilter = () => {
            if (store.selectedRegion) {
                filter.value = {field: 'region', value:store.selectedRegion}
            } else {
                filter.value = null
            }
        }

        return {
            store,
            filterCountries,
            filter,
            setFilter
        }
    },
    created() {
        if(this.store.countries.length === 0)
            this.store.fetchCountries();
    }
})
</script>
<style lang="">
    
</style>