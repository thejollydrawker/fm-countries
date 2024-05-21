<script lang="ts">
import { defineComponent } from 'vue';
import CountriesHeader from '@/components/Header.vue';
import CCountriesHeader from '@/components/composition/CHeader.vue';
import useCountriesStore from './stores/countries';
import { ROUTES } from './router';

export default defineComponent({
    name: 'App',
    components: {
        CountriesHeader,
        CCountriesHeader
    },
    setup() {
        const store = useCountriesStore();

        return {
            store,
            ROUTES
        }
    },
    
});
</script>

<template>
    <main :class="`h-full min-h-screen bg-primary-background dark:bg-secondary-background text-primary-text dark:text-secondary-text ${store.darkMode ? 'dark' : ''}`">
        <CountriesHeader v-if="$route.name === ROUTES.COUNTRY"/>
        <CCountriesHeader v-else/>
        
        <router-view v-slot="{ Component }">
            <Transition name="fade">
                <component :is="Component"/>
            </Transition>
        </router-view>
    </main>
</template>
<style>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
