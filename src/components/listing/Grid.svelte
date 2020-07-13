<div class="grid gap-2 lg:gap-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 listing">
    {#each items as item}
        <div class="pb-2 md:pb-4 xl:pb-16 container-item">
            <svelte:component this={itemComponent} {...item} />
        </div>
    {/each}
</div>

<script>
    export let items;
    export let itemComponent;
</script>

<style type="text/postcss">
.listing {
    justify-items: stretch;
}
</style>