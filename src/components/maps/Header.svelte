<script>
    export let url;
    let maps = [
        {name:"Fasilitas Kesehatan", site:"fasilitas-kesehatan"},
        {name:"Penginapan", site:"penginapan"},
    ]
</script>
<div id="head" class="pt-5 px-4 sm:px-8 md:px-16">
    <h1 class="text-3xl md:text-4xl xl:text-5xl text-primary-7 font-bold font-overpass">Peta</h1>
</div>

<div id="route" class="flex flex-row px-4 sm:px-8 md:px-16 font-bold text-sm sm:text-base md:text-lg font-overpass">
    {#each maps as map}
        <div class="py-2 pr-4">
            <a href="maps/{map.site}">
                {#if url == map.site}
                    <h2 class="text-primary-7">{map.name}</h2>
                {:else}
                    <h2 class="text-neutral-2  hover:text-neutral-4">{map.name}</h2>
                {/if}
            </a>
        </div>    
    {/each}
</div>    