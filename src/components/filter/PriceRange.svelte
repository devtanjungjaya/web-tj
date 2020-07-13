<div class="flex space-x-3 items-center">
    <div class="flex flex-col space-y-1">
        <span class="ml-4 font-overpass font-normal text-neutral-3 text-lg">min harga</span>
        <input
            class="border-1 focus:border-2 rounded-lg border-neutral-1 focus:border-primary-7 px-4 py-2 
            font-overpass font-semibold text-primary-7 outline-none box-border text-xl"
            style="max-width: 12.5rem"
            spellcheck="false"
            type="text" 
            on:input={event => {
                edit = 1;
                min = formatRupiah(event.target.value);
            }} 
            value={min} 
        />
    </div>
    <div class="bg-neutral-1 mb-6 self-end" style="height: 1px; width: 20px"></div>
    <div class="flex flex-col space-y-1">
        <span class="ml-4 font-overpass font-normal text-neutral-3 text-lg">max harga</span>
        <input
            class="border-1 focus:border-2 rounded-lg border-neutral-1 focus:border-primary-7 px-4 py-2 
            font-overpass font-semibold text-primary-7 outline-none box-border text-xl"
            style="max-width: 12.5rem"
            spellcheck="false"
            type="text" 
            on:input={event => {
                edit = 2;
                max = formatRupiah(event.target.value);
            }} 
            value={max} 
        />
    </div>
</div>

<script>
    import formatRupiah from "../../utilities/currency";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let maxPrice;

    let min = formatRupiah(1);
    let max = formatRupiah(maxPrice || 1000000);
    let minValue = 1;
    let maxValue = 1000000;

    let edit = null;

    $: {
        minValue = parseInt(min.replace(/[^,\d]/g, ""));
        maxValue = parseInt(max.replace(/[^,\d]/g, ""));
        if(maxValue < minValue && edit === 1) max = min;
        else if(maxValue < minValue && edit === 2) min = max;
        edit = null;
    }

    $: if(!isNaN(minValue) && !isNaN(maxValue)) {
        dispatch('filter', {
            type: 'price',
            filter: function(items) {
                return items.filter(item => 
                    item.prices.some(price => price.value >= minValue && price.value <= maxValue)
                );
            }
        })
    }
</script>