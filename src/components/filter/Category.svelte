<div class="flex flex-col space-y-6">
    {#each categories as category}
        <label class="flex items-center group">
            <input class="hidden" type="checkbox" bind:group={selectedCategories} value={category}/>
            <div 
                class={`w-6 h-6 flex items-center justify-center p-1 border-neutral-1 rounded-md mr-6 
                group-hover:border-primary-7 
                ${selectedCategories.includes(category) ? 
                    'border-0 bg-primary-7' : 'border-1 group-hover:border-2'
                }`}
            >
                <svg 
                    class="text-white w-full h-full" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    class:hidden={!selectedCategories.includes(category)}
                >
                    <path 
                        fill-rule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 
                        12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clip-rule="evenodd">
                    </path>
                </svg>
            </div>
            <span class="font-overpass font-semibold text-neutral-5 text-xl">
                {category}
            </span>
        </label>
    {/each}
</div>

<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let categories;

    let selectedCategories = [];

    $: if(selectedCategories.length) {
        dispatch('filter', {
            type: 'category',
            filter: function(items) {
                return items.filter(item => {                    
                    return selectedCategories.every(selected => item.categories.includes(selected));
                });
            }
        });
    } else {
        dispatch('filter', {
            type: 'category',
            filter: function(items) {
                return items;
            }
        });
    }
</script>