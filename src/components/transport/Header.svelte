<script>
    export let url;
    let pages = [
        {name:"Peta Transportasi", site:"transport"},
        {name:"Jalur Transportasi", site:"transport/route"},
    ]
</script>
<div id="head" class="pt-5 px-4 sm:px-8 md:px-16">
    <h1 class="text-3xl md:text-4xl xl:text-5xl text-primary-7 font-bold font-overpass">Transportasi</h1>
</div>

<div id="route" class="flex flex-row px-4 sm:px-8 md:px-16 font-bold text-sm sm:text-base md:text-lg font-overpass">
    {#each pages as page}
        <div class="py-2 pr-4">
            <a href="{page.site}">
                {#if url == page.site}
                    <h2 class="text-primary-7">{page.name}</h2>
                {:else}
                    <h2 class="text-neutral-2 hover:text-neutral-4">{page.name}</h2>
                {/if}
            </a>
        </div>    
    {/each}
</div>    