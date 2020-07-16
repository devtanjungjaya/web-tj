<div class="flex flex-col overflow-x-auto" style="min-height: inherit">
    <Filter filters={filters} on:filter={event => filterFunctions = event.detail} />
    <div class="mt-16 grid gap-2 lg:gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 listing">
        {#each filteredItems as item}
            <div class="flex items-center justify-center w-full h-full">
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

    export let filters = [];
    export let items = [];
    export let itemComponent;

    let filterFunctions = []
    let filteredItems = [];
    
    $: filteredItems = filterFunctions.reduce(
        (items, f) => f.filter(items), 
        items
    );    
</script>

<style type="text/postcss">
.listing {
    justify-items: stretch;
}
</style>