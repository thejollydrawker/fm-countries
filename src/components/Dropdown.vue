<template>
    <div id="dropdownPanel" class="relative w-fit select-none group">
    <div @click="isOpen = !isOpen" class="min-w-48 w-fit p-3 rounded-md min-h-16 bg-primary-element dark:bg-secondary-element flex items-center justify-between text-sm cursor-pointer shadow-lg">
        <span class="mr-6 ml-2 opacity-70"> {{ store.selectedRegion || 'Filter by Region' }}</span>

        <span class="flex gap-3">
            <svg v-if="store.selectedRegion" @click="setRegion()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 hidden group-hover:block">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        </span>
    </div>

    <div v-if="isOpen" v-outside:dropdownPanel="closeElement" class="bg-primary-element dark:bg-secondary-element rounded-md absolute top-[4.25rem] z-10 w-full p-3">
        <ul>
            <li v-for="(region, i) in store.regions" :key="i" @click="setRegion(($event.target as HTMLElement)?.innerHTML)" class="py-1 pl-3 cursor-pointer text-sm hover:font-bold">
                {{ region }}
            </li>
        </ul>
    </div>
</div>
</template>
<script lang="ts">
import useCountriesStore from '@/stores/countries';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CountryDropdown',
    emits: ['filter'],
    data() {
        return {
            isOpen: false
        }
    },
    setup() {
        const store = useCountriesStore();
        return {
            store
        }
    },
    methods: {
        closeElement () {
            this.isOpen = false;
        },
        setRegion (region?: string) {
           this.store.selectedRegion = region;
           this.closeElement()
           this.$emit('filter');
        }
    }
})
</script>