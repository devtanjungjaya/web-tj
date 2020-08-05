<div class={values.length < 4 || !grid ? "flex flex-col space-y-6" : "grid gap-6 grid-cols-2"}>
    {#each values as value}
        <label class="flex items-center group">
            {#if unique}
                <input 
                    class="hidden" 
                    type="radio" 
                    bind:group={$filter[type+label]} 
                    value={value}
                    on:click={() => {
                        if($filter[type+label] == value) $filter[type+label] = [];
                    }}
                />
            {:else}
                <input 
                    class="hidden" 
                    type="checkbox" 
                    bind:group={$filter[type+label]} 
                    value={value}
                />
            {/if}
            <div 
                class={`w-6 h-6 flex items-center justify-center p-1 border-neutral-1 rounded-md mr-3 sm:mr-6 
                md:group-hover:border-primary-7 flex-shrink-0
                ${$filter[type+label].includes(value) ? 
                    'border-0 bg-primary-7' : 'border-1 md:group-hover:border-2'
                }`}
            >
                <svg 
                    class={`text-white w-full h-full ${$filter[type+label].includes(value) ? '' : 'hidden'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                >
                    <path 
                        fill-rule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 
                        12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clip-rule="evenodd">
                    </path>
                </svg>
            </div>
            <span class="font-overpass font-semibold text-neutral-5 text-base sm:text-lg leading-tight">
                {value}
            </span>
        </label>
    {/each}
</div>

<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { filter } from '../../stores';
    const dispatch = createEventDispatcher();

    export let values;
    export let label;
    export let itemField;
    export let itemFieldFn = (itemField) => itemField;
    export let unique = false;
    export let grid = false;
    export let type;

    let dispatchTimeout = null;
    
    if($filter[type+label] === undefined) $filter[type+label] = [];

    onMount(() => {
        dispatchFilter($filter[type+label]);
    })

    $: delayedDispatch($filter[type+label]);

    function delayedDispatch(data) {
        if(dispatchTimeout) {
            clearTimeout(dispatchTimeout);
            dispatchTimeout = null;
        }
        dispatchTimeout = setTimeout(() => {
            dispatchFilter(data);
        }, 100);
    }

    function dispatchFilter(selected) {
        dispatch('filter', {
            type: label,
            filter: selected.length ? (items) => {
                return items.filter(item =>                     
                    unique ?
                    itemFieldFn(item[itemField]).includes(selected)
                    : selected.every(selected => itemFieldFn(item[itemField]).includes(selected))
                );
            } : null
        });
    }
</script>