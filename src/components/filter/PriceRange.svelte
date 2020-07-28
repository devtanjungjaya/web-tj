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
            value={min} 
            on:input={event => {
                edit = "min-input";
                minValue = parseInt(event.target.value.replace(/[^,\d]/g, "")) || 0;
                min = formatRupiah(minValue);
            }}
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
                edit = "max-input";
                maxValue = parseInt(event.target.value.replace(/[^,\d]/g, "")) || 0;
                max = formatRupiah(maxValue);
            }}
            value={max} 
        />
    </div>
</div>

<div class="px-3 md:px-1 w-full">
<div 
    class="h-1 w-full bg-neutral-1 mt-8 rounded-lg relative" 
    bind:this={bar}
    bind:clientWidth={knobWidth}
>
    <div
        class="h-full bg-primary-6 rounded-lg absolute"
        style={`left: ${knob.min}px; width: ${knob.max-knob.min}px`}
    />
    <div 
        class="rounded-full bg-primary-7 h-6 w-6 absolute cursor-pointer hover:shadow-lg"
        style={`top: 50%; transform: translateY(-50%); left: calc(${knob['min']}px - 0.625rem)`}
        on:touchstart|self|preventDefault={_ => pressed['min'] = true}
        on:mousedown|self|preventDefault={_ => pressed['min'] = true}
    />
    <div
        class="rounded-full bg-primary-7 h-6 w-6 absolute cursor-pointer hover:shadow-lg"
        style={`top: 50%; transform: translateY(-50%); left: calc(${knob['max']}px - 0.625rem)`}
        on:touchstart|self|preventDefault={_ => pressed['max'] = true}
        on:mousedown|self|preventDefault={_ => pressed['max'] = true}
    />
</div>
</div>

<svelte:body
    on:mouseup={_ => pressed = {min: false, max: false}}
    on:touchend={_ => pressed = {min: false, max: false}}
    on:mousemove|stopPropagation={handleKnobMove}
    on:touchmove|stopPropagation={handleKnobMove}
/>

<script>
    import formatRupiah from "../../utilities/currency";
    import { createEventDispatcher, onMount } from 'svelte';
    const dispatch = createEventDispatcher();
    const interval = 10000;
    const distance = interval*5;

    export let maxPrice = 1000000;
    export let type;
    export let label;

    let minValue = 0;
    let maxValue = maxPrice;
    let min = (store[type] && store[type].min) || formatRupiah(minValue);
    let max = (store[type] && store[type].max) || formatRupiah(maxValue);

    let knob = {min: 0, max: 0};
    let knobWidth;
    let bar;
    let pressed = {min: false, max: false};

    let edit = null;

    onMount(() => {
        filter(minValue, maxValue);
    })

    $: store[type] = { min, max };
    $: {
        minValue = parseInt(min.replace(/[^,\d]/g, "")) || 0;
        maxValue = parseInt(max.replace(/[^,\d]/g, "")) || 0;

        if(maxValue > maxPrice) {
            maxValue = maxPrice;
            max = formatRupiah(maxValue);
        }

        switch(edit) {
            case "min-input":
                if(maxValue < minValue+distance) {
                    maxValue = Math.min(minValue + distance, maxPrice);
                    max = formatRupiah(maxValue);
                    if(minValue+distance > maxPrice) {
                        minValue = maxValue - distance;
                        min = formatRupiah(minValue);
                    }
                }
                break;
            case "max-input":
                if(maxValue < minValue+distance) {
                    minValue = Math.max(maxValue - distance, 0);
                    min = formatRupiah(minValue);
                    if(maxValue-distance < 1) {
                        maxValue = minValue + distance;
                        max = formatRupiah(maxValue);
                    }
                }
                break;
        }

        if(maxValue >= maxPrice && edit !== 'max-input') max = formatRupiah(maxValue) + "+";
        edit = null;
    }
    $: knob = {min: valueToKnob(minValue, knobWidth), max: valueToKnob(maxValue, knobWidth)}
    $: filter(minValue, maxValue)

    function filter(fMin, fMax) {
        dispatch('filter', {
            type: label,
            filter: !isNaN(fMin) && !isNaN(fMax) && (fMin > 1 || fMax < maxPrice) ? (items) => {
                return items.filter(item => 
                    item.prices.some(price => price.value >= fMin && price.value <= fMax)
                );
            } : null
        });
    }

    function handleKnobMove(e) {
        if(!pressed.min && !pressed.max) return;
        const pressedKnob = knob[pressed.min ? 'min' : 'max'];

        const rect = bar.getBoundingClientRect();
        let x = e.clientX || e.touches[0].clientX;
        
        const step = valueToKnob(interval, knobWidth);
        let roundedKnob = Math.round(knobToValue(pressedKnob, knobWidth)/interval)*interval;
        
        if(pressed.min && (x - rect.left) >= knob.max - (step * 5)) {
            roundedKnob = maxValue - (interval * 5);
            x = valueToKnob(roundedKnob, knobWidth) + rect.left;
        }else if(pressed.max && (x - rect.left) <= knob.min + (step * 5)) {
            roundedKnob = minValue + (interval * 5);
            x = valueToKnob(roundedKnob, knobWidth) + rect.left;
        }
        if(x < rect.left) x = rect.left;
        if(x > rect.right) x = rect.right;

        knob[pressed.min ? 'min' : 'max'] = Math.round((x - rect.left)/step)*step;

        if(pressed.min) min = formatRupiah(Math.max(roundedKnob, 0));
        else max = formatRupiah(Math.max(roundedKnob, 0));
    }

    function valueToKnob(value, width) {
        return map(value, 0, maxPrice, 0, width);
    }

    function knobToValue(knob, width) {
        return map(knob, 0, width, 0, maxPrice);
    }

    function map(input, inputStart, inputEnd, outputStart, outputEnd) {
        return outputStart + ((outputEnd - outputStart) / (inputEnd - inputStart)) * (input - inputStart);
    }
</script>