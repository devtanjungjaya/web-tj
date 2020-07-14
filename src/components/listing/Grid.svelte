<div class="flex flex-col">
    <Filter filters={filters} on:filter={event => filterFunctions = event.detail} />
    <div class="mt-16 grid gap-2 lg:gap-10 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 listing">
        {#each filteredItems as item}
            <div class="flex items-center justify-center w-full h-full">
                <div style="min-width: 200px; max-width: 250px" class="w-full">
                    <svelte:component this={itemComponent} {...item} />
                </div>
            </div>
        {/each}
    </div>
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