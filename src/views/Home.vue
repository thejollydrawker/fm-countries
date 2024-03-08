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
                <CountryCard :country="country" />    
            </template>
        </section>     
    </div>
</template>
<script>
import useCountriesStore from '@/stores/countries';
import { defineComponent } from 'vue';
import CountryCard from '../components/CountryCard.vue';
import CountryDropdown from '../components/Dropdown.vue';
import CountriesSpinner from '../components/Spinner.vue';
import SearchBar from '../components/SearchBar.vue';
import { storeToRefs } from 'pinia';

export default defineComponent({
    name: 'CountriesHome',
    components: {
        CountryCard,
        CountryDropdown,
        SearchBar,
        CountriesSpinner
    },
    data() {
        return {
            filter: ''
        }
    },
    setup() {
        const store = useCountriesStore();
        const {filterCountries} = storeToRefs(store);

        return {
            store,
            filterCountries
        }
    },
    created() {
        if(this.store.countries.length === 0)
            this.store.fetchCountries();
    },
    methods: {
        setFilter() {
            if (this.store.selectedRegion) {
                this.filter = {field: 'region', value: this.store.selectedRegion}
            } else if (this.store.search) {
                this.filter = {field: 'name', value: this.store.search}
            } else {
                this.filter = null
            }
        }
    }
})
</script>