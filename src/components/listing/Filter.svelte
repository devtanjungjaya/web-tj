<ClickOutside on:clickoutside={() => opened = null}>
    <div class="ml-1 flex items-center rounded-2xl border-1 border-neutral-1 filter">
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
                    <span class="flex-grow font-overpass font-semibold text-neutral-7 text-xl mr-12">
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
                        class={`absolute rounded-2xl border-neutral-1 border-1 p-6 mt-4 left-0 z-10 bg-white
                            ${opened === i ? 'block' : 'hidden'}`}
                        style="min-width: 272px"
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
</ClickOutside>

<script>
    import ClickOutside from "../ClickOutside.svelte";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let filters;

    let opened = null;
    let filterFunctions = [];

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