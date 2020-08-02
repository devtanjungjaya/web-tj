<div class="flex flex-col overflow-x-auto" style="min-height: inherit">
    <div class="flex md:flex-col md:space-y-4 lg:space-y-8">
        <Navigation {current} />
        <Filter filters={filters} on:filter={event => filterFunctions = event.detail} />
    </div>
    <div 
        class="mt-8 lg:mt-12 grid gap-2 xs:gap-4 sm:gap-6 md:gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        xl:grid-cols-5 2xl:grid-cols-6 listing">
        {#each filteredItems as item}
        <IntersectionObserver let:intersecting>
            <div 
                class="flex items-center justify-center w-full h-full transition duration-150 ease-in-out" 
                class:invisible={!intersecting}
                class:opacity-0={!intersecting}
            >
                <div style="min-width: 145px; max-width: 250px" class="w-full">
                    <svelte:component this={itemComponent} {...item} />
                </div>
            </div>
        </IntersectionObserver>
        {/each}
    </div>
    {#if !filteredItems.length}
        <span class="w-full py-32 text-center font-overpass font-bold text-neutral-4 text-xl">
            Tidak ditemukan...
        </span>
    {/if}
</div>

<script>
    import Filter from "./Filter.svelte";
    import Navigation from "./Navigation.svelte";
    import IntersectionObserver from '../IntersectionObserver.svelte';
    import { fly } from 'svelte/transition';

    export let filters = [];
    export let items = [];
    export let itemComponent;
    export let current;

    let filterFunctions = []
    let filteredItems = [];
    
    $: filteredItems = filterFunctions.reduce(
        (items, f) => f.filter(items), 
        items
    );    
</script>