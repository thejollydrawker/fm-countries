<script lang="ts" setup>
import useCountriesStore from '@/stores/countries';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { ref, onMounted, onUnmounted } from 'vue';

const store = useCountriesStore();
const searchTerm = ref('');
const input = ref<HTMLInputElement | null>(null);
let subscription;

const emit = defineEmits(['filter']);

onMounted(() => {
    subscription = fromEvent((input as unknown as HTMLInputElement), 'input').pipe(
        map(e => (e.target as HTMLInputElement)?.value),
        debounceTime(250),
        distinctUntilChanged()
    ).subscribe((value) => filterCountries(value));
});

onUnmounted(() => {
    subscription?.unsubscribe();
});

const filterCountries = (value: string) => {
    store.search = value;
    searchTerm.value = value;
    emit('filter');
};

const clearFilter = () => {
    searchTerm.value = '';
    store.search = undefined;
};
</script>

<template>
    <div class="relative">
        <input :value="searchTerm" ref="input" placeholder="Search for a Country" type="text" class="peer min-w-[24rem] w-fit p-3 rounded-md min-h-16 bg-primary-element dark:bg-secondary-element text-sm pl-12 focus:pl-5 cursor-pointer shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 block peer-focus:hidden absolute top-[1.5rem] left-[1rem]">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>

        <svg v-if="store.search" @click="clearFilter" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 absolute top-[1.25rem] right-[1rem] cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    </div>
</template>