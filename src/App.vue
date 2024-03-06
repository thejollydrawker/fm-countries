<script lang="ts">
import { defineComponent } from 'vue';
import CountriesHeader from '@/components/Header.vue'
import useCountriesStore from './stores/countries';

export default defineComponent({
    name: 'App',
    components: {
        CountriesHeader
    },
    setup() {
        const store = useCountriesStore();

        return {
            store
        }
    },
    
});
</script>

<template>
    <main :class="`h-full min-h-screen bg-primary-background dark:bg-secondary-background text-primary-text dark:text-secondary-text ${store.darkMode ? 'dark' : ''}`">
        <CountriesHeader />

        <router-view v-slot="{ Component }">
            <transition name="slide-right">
                <component :is="Component"/>
            </transition>
        </router-view>
    </main>
</template>
