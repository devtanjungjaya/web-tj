<div class="flex flex-col sm:flex-row sm:space-x-3 items-start sm:items-center">
    <div class="flex flex-col space-y-1 mb-3 sm:mb-0 w-full sm:max-w-2xs">
        <span class="ml-4 font-overpass font-normal text-neutral-3 text-lg">min harga</span>
        <span
            class="border-1 rounded-lg border-neutral-1 focus:border-primary-7 px-4 py-2 
            font-overpass font-semibold text-primary-7 outline-none box-border text-xl md:w-48"
        >
            {formatRupiah($filter[type+label].min)}
        </span>
    </div>
    <div class="bg-neutral-1 mb-6 self-end hidden sm:block" style="height: 1px; width: 20px"></div>
    <div class="flex flex-col space-y-1 w-full sm:max-w-2xs">
        <span class="ml-4 font-overpass font-normal text-neutral-3 text-lg">max harga</span>
        <span
            class="border-1 rounded-lg border-neutral-1 focus:border-primary-7 px-4 py-2 
            font-overpass font-semibold text-primary-7 outline-none box-border text-xl md:w-48"
        >
            {formatRupiah($filter[type+label].max)}
        </span>
    </div>
</div>

<div class="px-3 md:px-1 w-full">
<div 
    class="h-1 w-full bg-neutral-1 mt-8 rounded-lg relative" 
    bind:this={bar}
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
    import { filter } from '../../stores';
    const dispatch = createEventDispatcher();
    const interval = 10000;
    const distanceUnit = 1;
    const distance = interval*distanceUnit;

    export let maxPrice = 1000000;
    let roundedMaxPrice = Math.round(maxPrice/interval)*interval;
    export let type;
    export let label;
    export let visible = true;

    if($filter[type+label] === undefined) $filter[type+label] = {
        min: 0,
        max: roundedMaxPrice
    }

    let knob = {min: 0, max: 0};
    let knobWidth = 0;
    let bar;
    let pressed = {min: false, max: false};

    onMount(() => {
        dispatchFilter($filter[type+label].min, $filter[type+label].max);
    })

    $: roundedMaxPrice = Math.round(maxPrice/interval)*interval;
    $: if(visible && bar) {
        knobWidth = bar.getBoundingClientRect().width;
    }
    $: updateKnob($filter[type+label], knobWidth)
    $: dispatchFilter($filter[type+label].min, $filter[type+label].max)

    function dispatchFilter(fMin, fMax) {
        dispatch('filter', {
            type: label,
            filter: !isNaN(fMin) && !isNaN(fMax) && (fMin > 1 || fMax < roundedMaxPrice) ? (items) => {
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
        
        if(pressed.min && (x - rect.left) >= knob.max - (step * distanceUnit)) {
            const roundedKnob = $filter[type+label].max - (interval * distanceUnit);
            x = valueToKnob(roundedKnob, knobWidth) + rect.left;
        }else if(pressed.max && (x - rect.left) <= knob.min + (step * distanceUnit)) {
            const roundedKnob = $filter[type+label].min + (interval * distanceUnit);
            x = valueToKnob(roundedKnob, knobWidth) + rect.left;
        }
        if(x < rect.left) x = rect.left;
        if(x > rect.right) x = rect.right;

        const newValue = Math.round(knobToValue(x - rect.left, knobWidth)/interval)*interval;
        if(pressed.min) {
            $filter[type+label] = {
                ...$filter[type+label],
                min: Math.max(newValue, 0),
            }
        } else {
            $filter[type+label] = {
                ...$filter[type+label],
                max: Math.min(newValue, roundedMaxPrice)
            }
        }
    }

    function updateKnob(value, width) {
        const step = valueToKnob(interval, width);
        knob = {
            min: valueToKnob(Math.round(value.min/step)*step, width),
            max: valueToKnob(Math.round(value.max/step)*step, width)
        }
    }

    function valueToKnob(value, width) {
        return map(value, 0, roundedMaxPrice, 0, width);
    }

    function knobToValue(knob, width) {
        return map(knob, 0, width, 0, roundedMaxPrice);
    }

    function map(input, inputStart, inputEnd, outputStart, outputEnd) {
        return outputStart + ((outputEnd - outputStart) / (inputEnd - inputStart)) * (input - inputStart);
    }
</script>