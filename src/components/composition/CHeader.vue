<script lang="ts" setup>
import useCountriesStore from '@/stores/countries';
import { ROUTES } from '@/router';

const store = useCountriesStore();

</script>

<template>
    <nav class="flex py-4 px-6 sm:px-12 shadow-md w-full justify-between bg-primary-element dark:bg-secondary-element">
        <h1 class="text-2xl font-bold"><router-link :to="{name: ROUTES.CHOME}">Where in the world?</router-link></h1>
        <span @click="store.toggleDarkMode()" class="flex items-center gap-2 align-center min-w-32 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>Dark Mode
        </span>
    </nav>
</template>