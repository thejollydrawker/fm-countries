<template>
    <div id="dropdownPanel" class="relative select-none">
    <div @click="isOpen = !isOpen" class="min-w-48 w-fit p-3 rounded-md min-h-16 bg-primary-element dark:bg-secondary-element flex items-center justify-between text-sm cursor-pointer shadow-lg">
        <span class="mr-6 ml-2 opacity-70"> {{ store.selectedRegion || 'Filter by Region' }}</span>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 select-none">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
    </div>

    <div v-if="isOpen" v-outside:dropdownPanel="closeElement" class="bg-primary-element dark:bg-secondary-element rounded-md absolute top-14 z-10 w-full p-3">
        <ul>
            <li v-for="(region, i) in store.regions" :key="i" @click="setRegion" class="py-1 pl-3 cursor-pointer text-sm">
                {{ region }}
            </li>
        </ul>
    </div>
</div>
</template>
<script lang="ts">
import useCountriesStore from '@/stores/countries';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'CountryDropdown',
    emits: ['filter'],
    setup(props, {emit}) {
        const isOpen = ref(false);
        const store = useCountriesStore();

        const closeElement = () => {
            isOpen.value = false;
        }

        const setRegion = (el: any) => {
           store.selectedRegion = el.target.innerHTML;
           emit('filter');
        }

        return {
            isOpen,
            store,
            closeElement,
            setRegion
        }
    }
})
</script>