<div class="flex flex-col space-y-4 lg:space-y-8">
    <div class="flex font-overpass font-bold w-full items-center">
        <span class="mr-auto text-neutral-5 text-xl md:text-2xl lg:text-3xl">{title}</span>
        <a rel="prefetch" href={url} class="text-sm md:text-base lg:text-lg text-primary-7 hover:underline">
            LIHAT LAINNYA
        </a>
    </div>
    <div 
        class="grid gap-2 md:gap-10 grid-cols-2 lg:grid-cols-4 listing">
        {#each items as item}
            <div class="flex items-center justify-center w-full h-full">
                <div style="min-width: 145px; max-width: 250px" class="w-full">
                    <svelte:component this={itemComponent} {...item} />
                </div>
            </div>
        {/each}
    </div>
</div>

<script>
    export let title;
    export let url;
    export let items;
    export let itemComponent;
</script>