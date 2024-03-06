<template>
    <div class="relative">
        <input placeholder="Search for a Country" type="text" class="peer min-w-[24rem] w-fit p-3 rounded-md min-h-16 bg-primary-element dark:bg-secondary-element text-sm pl-12 focus:pl-5 cursor-pointer shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 block peer-focus:hidden absolute top-[1.5rem] left-[1rem]">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SearchBar',
})
</script>
<style lang="">
    
</style>