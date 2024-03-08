<template>
    <div class="relative">
        <input :value="value" ref="input" placeholder="Search for a Country" type="text" class="peer min-w-[24rem] w-fit p-3 rounded-md min-h-16 bg-primary-element dark:bg-secondary-element text-sm pl-12 focus:pl-5 cursor-pointer shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 block peer-focus:hidden absolute top-[1.5rem] left-[1rem]">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>

        <svg v-if="store.search" @click="clearFilter" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 absolute top-[1.25rem] right-[1rem] cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    </div>
</template>
<script lang="ts">
import useCountriesStore from '@/stores/countries';
import { fromEvent, Subscription, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SearchBar',
    emits: ['filter'],
    data() : {value: string, subscription: Subscription | null} {
        return {
            value: '',
            subscription: null
        }
    },
    setup() {
        const store = useCountriesStore();

        return {
            store
        }
    },
    mounted() {
        this.subscription = fromEvent((this.$refs.input as HTMLInputElement), 'input').pipe(
            map(e => (e.target as HTMLInputElement)?.value),
            debounceTime(250),
            distinctUntilChanged()
        ).subscribe(this.filterCountries.bind(this));
    },
    unmounted() {
        this.subscription?.unsubscribe();
    },
    methods: {
        clearFilter () {
            this.store.search = undefined;
            this.value = '';
        },
        filterCountries (value: string) {
            this.store.search = value;
            this.value = value;
            this.$emit('filter');
        }
    }
})
</script>