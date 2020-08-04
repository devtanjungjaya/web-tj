<script>
    export let url;
</script>
<div id="head" class="py-4 px-4 sm:px-8 md:px-16">
    <h1 class="text-3xl md:text-4xl xl:text-5xl text-primary-7 font-bold">Transportasi</h1>
</div>

<div id="route" class="flex flex-row px-4 sm:px-8 md:px-16 font-bold text-sm sm:text-base md:text-lg">
    <div class="py-4 pr-4">
        <a href="/transport">
            {#if url == "map"}
                <h2 class="text-primary-7">Peta</h2>
            {:else}
                <h2 class="text-neutral-2">Peta</h2>
            {/if}
        </a>
    </div>
    <br>
    <div class="py-4 px-4">
        <a href="/transport/route">
            {#if url == "map"}
                <h2 class="text-neutral-2">Jalur</h2>
            {:else}
                <h2 class="text-primary-7">Jalur</h2>
            {/if}
        </a>
    </div>
</div>    