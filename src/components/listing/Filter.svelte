<ClickOutside on:clickoutside={() => opened = null}>
    <div class="md:flex items-center rounded-2xl border-1 border-neutral-1 filter hidden">
        {#each filters as filter, i}
            <div class="relative">
                <div 
                    class="flex items-center flex-1 px-4 py-2 border-neutral-1 max-w-xs 
                    cursor-pointer hover:bg-gray-100 overflow-hidden" 
                    on:click={() => opened = i}
                    class:border-l-1={i > 0}
                    class:rounded-l-2xl={i === 0}
                    class:rounded-r-2xl={i === filters.length-1}
                >
                    <span 
                        class="flex-grow font-overpass font-semibold text-neutral-7 text-lg lg:text-xl 
                        mr-6 lg:mr-12">
                        {filter.label}
                    </span>
                    <svg class="text-primary-7 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path 
                            fill-rule="evenodd" 
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 
                            01-1.414 0l-4-4a1 1 0 010-1.414z" 
                            clip-rule="evenodd">
                        </path>
                    </svg>
                </div>
                {#if filter.component}
                    <div 
                        class={`absolute rounded-2xl border-neutral-1 border-1 p-6 mt-4 left-0 z-10 bg-white shadow-xl
                            ${opened === i ? 'block' : 'hidden'} overflow-hidden`}
                        style="min-width: 272px; max-height: 345px; overflow-y: auto"
                    >
                        <svelte:component 
                            this={filter.component} 
                            on:filter={updateFilter}
                            {...filter.props}
                        />
                    </div>
                {/if}
            </div>
        {/each}
    </div>
    <span 
        class="flex md:hidden items-center px-4 xs:px-5 py-2 justify-center rounded-2xl border-1 
        border-neutral-1 cursor-pointer hover:bg-gray-100 overflow-hidden font-overpass font-semibold 
        text-neutral-7 text-lg"
        on:click={() => openFilter = true}
    >
        Filter
    </span>
    <div 
        class={`inset-0 ${openFilter && innerWidth <= 768 ? "flex" : "hidden"} fixed min-w-full min-h-screen 
        flex-col bg-white z-20`}
        transition:fly={{duration:250, y: 600}}
    >
        <div 
            class="flex items-center w-full border-b-1 border-neutral-1 py-3 px-2 sm:px-5 bg-white z-30"
        >
            <svg 
                class="text-neutral-5 cursor-pointer w-10 h-10 p-2 rounded-full hover:bg-gray-100" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                on:click={() => openFilter = false}
            >
                <path 
                    fill-rule="evenodd" 
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 
                    4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 
                    5.707a1 1 0 010-1.414z" 
                    clip-rule="evenodd"
                >
                </path>
            </svg>
            <span class="font-overpass font-bold text-primary-7 text-2xl sm:text-3xl mx-auto pr-10">
                Filter
            </span>
        </div>
        <div class="p-4 sm:p-6 overflow-y-auto">
            {#each filters as filter, i}
                {#if i > 0}
                    <Decorator />
                {/if}
                <div class="flex flex-col">
                    <span class="font-overpass font-bold text-neutral-5 text-xl sm:text-2xl mb-6 sm:mb-6">
                        {filter.label}
                    </span>
                    <svelte:component 
                        this={filter.component} 
                        on:filter={updateFilter}
                        {...filter.props}
                        grid={true}
                    />
                </div>
            {/each}
        </div>
    </div>
</ClickOutside>

<svelte:head>
   {#if openFilter && innerWidth <= 768}
      <style>
         body {
            overflow-y: hidden;
         }
      </style>
   {/if}
</svelte:head>	

<svelte:window bind:innerWidth={innerWidth} />

<script>
    import ClickOutside from "../ClickOutside.svelte";
    import Decorator from "../Decorator.svelte";
    import { createEventDispatcher } from 'svelte';
    import { fly } from "svelte/transition";
    const dispatch = createEventDispatcher();

    export let filters;

    let opened = null;
    let openFilter = false;
    let filterFunctions = [];
    let innerWidth = 1000;

    function updateFilter(event) {
        filterFunctions = [
            ...filterFunctions.filter(f => f.type != event.detail.type),
            event.detail
        ];
        dispatch('filter', filterFunctions);
    }
</script>

<style type="text/postcss">
.filter {
    width: fit-content;
}
</style>