<div class="flex flex-col overflow-x-auto" style="min-height: inherit">
    <div class="flex md:flex-col md:space-y-8">
        <Navigation {current} />
        <Filter filters={filters} on:filter={event => filterFunctions = event.detail} />
    </div>
    <div 
        class="mt-8 grid gap-2 md:gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        xl:grid-cols-5 2xl:grid-cols-6 listing">
        {#each filteredItems as item}
            <div class="flex items-center justify-between w-full h-full">
                <div style="min-width: 145px; max-width: 250px" class="w-full">
                    <svelte:component this={itemComponent} {...item} />
                </div>
            </div>
        {/each}
    </div>
    {#if !filteredItems.length}
        <span class="w-full py-32 text-center font-overpass font-bold text-neutral-4 text-xl">
            Barang tidak ditemukan
        </span>
    {/if}
</div>

<script>
    import Filter from "./Filter.svelte";
    import Navigation from "./Navigation.svelte";

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

<style type="text/postcss">
.listing {
    justify-items: center;
}
</style>