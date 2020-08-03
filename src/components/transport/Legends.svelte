<script>
    export let map;
    export let layers = [];
    export let colors = [];
    export let check = [];
    export let typeURL = [];
    export let type = [];
    $: innerWidth = 0;
    function changeFunc(id,checked){
        map.setLayoutProperty(
            id,
            'visibility',
            checked ? 'none' : 'visible'
        );
    };
</script>

<style type="text/postcss">
    .filter-group {
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
        width: 25%;
        max-height: 100%;
        padding-top: 1rem;
        border-left-width: 0;
        overflow: hidden;
    }
    .legenda {
        border-top-width: 0;
        border-left-width: 0;
        border-right-width: 0;
        padding-bottom: 1rem;
    }
    .filter {
        height: 100%;
        overflow-y: auto;
        padding-top: 1rem;
        font-size: 0.625rem;
    }
    .box {
        border-top-width: 0;
        border-left-width: 0;
        border-right-width: 0;
    }
    .checkbox {
        width: 100%;
        height: 100%;
        min-width: 100%;
        min-height: 100%;
    }
</style>

<svelte:window bind:innerWidth></svelte:window>

<div id="filter-group" class="filter-group flex flex-col relative border-1 border-neutral-4">
    <div class="legenda border-1 border-neutral-2 px-2 sm:px-4 align-middle text-primary-7 text-xs sm:text-base md:text-lg font-bold relative">
        <h1 class="relative">Legenda</h1>
    </div>
    <div class="filter flex flex-col text-primary-6 p-0">
        {#each colors as color,i }
            {#if check[i]}
                {#if innerWidth > 640}
                    <label class='box flex flex-row py-2 px-2 hover:text-primary-7 hover:bg-neutral-2 text-neutral-5 font-bold border-1 border-neutral-1 items-center last:border-0 sm:text-xs md:text-sm'>
                        {#if (type[i] == "route")}
                            <div class="h-5 w-5">
                                <div class="relative checkbox align-middle mx-1 rounded-full" style="--theme-color: {color}; background-color: var(--theme-color);"></div>
                            </div>
                        {:else}
                            <div class="h-5 w-5">
                                <img src="{typeURL[i]}.png" alt="ENA-ENA ( ͡° ͜ʖ ͡°)" class="w-full h-full mx-1">
                            </div>
                        {/if}
                        <input type="checkbox" class= "opacity-0" on:change={changeFunc(layers[111+i].id,check[i])} bind:checked={check[i]}>
                        <p class="float-right overflow-hidden">{layers[111+i].id}</p>
                    </label>
                {:else}
                    <label class='box flex flex-row py-2 px-2 hover:text-primary-7 hover:bg-neutral-2 align-middle text-neutral-5 font-bold border-2 items-center'  style="--theme-color: {color}; border-color: var(--theme-color);">
                        <p class="overflow-hidden">{layers[111+i].id}</p>
                        <input type="checkbox" class= "opacity-0" on:change={changeFunc(layers[111+i].id,check[i])} bind:checked={check[i]}>
                    </label>
                {/if}
            {:else}
                {#if innerWidth > 640}
                    <label class='box flex flex-row py-2 px-2 hover:text-primary-7 hover:bg-neutral-2 text-neutral-5 border-1 border-neutral-1 italic items-center last:border-0 sm:text-xs md:text-sm'>
                        <div class="h-5 w-5">
                            <div class="checkbox align-middle mx-1 bg-neutral-1 text-neutral-1 rounded-full"></div>
                        </div>
                        <input id={layers[111+i].id} type="checkbox" class= "opacity-0"  on:change={changeFunc(layers[111+i].id,check[i])} bind:checked={check[i]}>
                        <p class="overflow-hidden">{layers[111+i].id}</p>
                    </label>
                {:else}
                    <label class='box flex flex-row py-2 px-2 hover:text-primary-7 hover:bg-neutral-2 text-neutral-5 border-1 border-neutral-1 italic items-center'>
                        <p class="w-full overflow-hidden">{layers[111+i].id}</p>
                        <input id={layers[111+i].id} type="checkbox" class= "opacity-0"  on:change={changeFunc(layers[111+i].id,check[i])} bind:checked={check[i]}>
                    </label>
                {/if}
                
            {/if}
        {/each}
    </div>
</div>