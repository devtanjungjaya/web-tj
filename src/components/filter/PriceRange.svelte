<script context="module">
    const store = {};
</script>

<div class="flex flex-col sm:flex-row sm:space-x-3 items-start sm:items-center">
    <div class="flex flex-col space-y-1 mb-3 sm:mb-0 w-full sm:max-w-2xs">
        <span class="ml-4 font-overpass font-normal text-neutral-3 text-lg">min harga</span>
        <input
            class="border-1 rounded-lg border-neutral-1 focus:border-primary-7 px-4 py-2 
            font-overpass font-semibold text-primary-7 outline-none box-border text-xl sm:max-w-2xs"
            spellcheck="false"
            type="text" 
            on:input={event => {
                edit = 1;
                min = formatRupiah(event.target.value);
            }} 
            value={min} 
        />
    </div>
    <div class="bg-neutral-1 mb-6 self-end hidden sm:block" style="height: 1px; width: 20px"></div>
    <div class="flex flex-col space-y-1 w-full sm:max-w-2xs">
        <span class="ml-4 font-overpass font-normal text-neutral-3 text-lg">max harga</span>
        <input
            class="border-1 rounded-lg border-neutral-1 focus:border-primary-7 px-4 py-2 
            font-overpass font-semibold text-primary-7 outline-none box-border text-xl sm:max-w-2xs"
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
    import { createEventDispatcher, onMount } from 'svelte';
    const dispatch = createEventDispatcher();

    export let maxPrice;
    export let type;

    let minValue = 1;
    let maxValue = maxPrice || 1000000;
    let min = (store[type] && store[type].min) || formatRupiah(minValue);
    let max = (store[type] && store[type].max) || formatRupiah(maxValue);

    let edit = null;

    onMount(() => {
        filter(minValue, maxValue);
    })

    $: store[type] = { min, max };
    $: {
        minValue = parseInt(min.replace(/[^,\d]/g, ""));
        maxValue = parseInt(max.replace(/[^,\d]/g, ""));
        if(maxValue < minValue && edit === 1) max = min;
        else if(maxValue < minValue && edit === 2) min = max;
        edit = null;
    }

    $: filter(minValue, maxValue)

    function filter(fMin, fMax) {
        dispatch('filter', {
            type: 'price',
            filter: !isNaN(fMin) && !isNaN(fMax) && (fMin > 1 || fMax < maxPrice) ? (items) => {
                return items.filter(item => 
                    item.prices.some(price => price.value >= fMin && price.value <= fMax)
                );
            } : null
        });
    }
</script>