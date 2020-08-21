<script>
    export let data;
    export let map;
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
        width: 25%;
        height: 100%;
        overflow: hidden;
        float: right;
        background-color: white;
    }
    .legenda {
        border-top-width: 0;
        border-left-width: 0;
        border-right-width: 0;
    }
    .filter {
        height: 100%;
        overflow-y: auto;
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

<div id="filter-group" class="filter-group flex flex-col relative border-l-1 border-neutral-1">
    <div class="legenda border-1 border-neutral-2 py-4 px-2 sm:px-4 align-middle text-primary-7 text-xs sm:text-base md:text-lg font-bold relative">
        <h1 class="relative">Legenda</h1>
    </div>
    <div class="filter flex flex-col text-primary-6 p-0">
        {#each data as X,i }
            {#if X.check}
                {#if innerWidth > 640}
                    <label 
                        class='box flex flex-row py-2 px-2 hover:text-primary-7 hover:bg-gray-100 cursor-pointer text-neutral-5 
                        font-bold border-1 border-neutral-1 items-center last:border-0 sm:text-xs md:text-sm'
                    >
                        {#if (X.type != "point")}
                            <div 
                                class="h-5 w-5 flex-shrink-0 mr-2 rounded-full" 
                                style={`background-color: ${X.color}`}
                            />
                        {:else}
                            <div class="h-5 w-5 mr-2 flex-shrink-0">
                                <img src="{X.url}.png" alt="icon-legend" class="w-full h-full">
                            </div>
                        {/if}
                        <input type="checkbox" class= "hidden" on:change={changeFunc(X.name,X.check)} bind:checked={X.check}>
                        <p class="flex-grow">{X.name}</p>
                    </label>
                {:else}
                    <label 
                        class='box flex flex-row py-2 px-2 hover:text-primary-7 hover:bg-gray-100 cursor-pointer align-middle 
                        text-neutral-5 font-bold border-2 items-center'
                        style={`border-color: ${X.color}`}
                    >
                        <p class="overflow-hidden">{X.name}</p>
                        <input type="checkbox" class= "opacity-0" on:change={changeFunc(X.name,X.check)} bind:checked={X.check}>
                    </label>
                {/if}
            {:else}
                {#if innerWidth > 640}
                    <label class='box flex flex-row py-2 px-2 hover:text-primary-7 hover:bg-gray-100 cursor-pointer text-neutral-5 border-1 border-neutral-1 italic items-center last:border-0 sm:text-xs md:text-sm'>
                        <div class="h-5 w-5">
                            <div class="checkbox align-middle mx-1 bg-neutral-1 text-neutral-1 rounded-full"></div>
                        </div>
                        <input id={X.name} type="checkbox" class= "opacity-0"  on:change={changeFunc(X.name,X.check)} bind:checked={X.check}>
                        <p class="overflow-hidden">{X.name}</p>
                    </label>
                {:else}
                    <label class='box flex flex-row py-2 px-2 hover:text-primary-7 hover:bg-gray-100 cursor-pointer text-neutral-5 border-1 border-neutral-1 italic items-center'>
                        <p class="w-full overflow-hidden">{X.name}</p>
                        <input id={X.name} type="checkbox" class= "opacity-0"  on:change={changeFunc(X.name,X.check)} bind:checked={X.check}>
                    </label>
                {/if}
                
            {/if}
        {/each}
    </div>
</div>