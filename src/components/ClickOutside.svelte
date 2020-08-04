<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    export let exclude = [];

    let child;
    let mouseDown = [];

    function isExcluded(target) {
        var parent = target;
        while (parent) {            
            if (exclude.indexOf(parent) >= 0 || parent === child) {
                return true;
            }
            parent = parent.parentNode;
        }
        return false;
    }
    function onClickOutside(event) {
        if (!isExcluded(event.target)) {
            dispatch('clickoutside');
        }
    }
</script>

<svelte:body 
    on:mousedown={e => {
        if(!isExcluded(e.target)) mouseDown = [...mouseDown, e.target];
    }}
    on:mouseup={e => {
        if(mouseDown.includes(e.target)) {
            onClickOutside(e);
            mouseDown = [];
        }
    }}
/>

<div style="width: fit-content" bind:this={child}>
    <slot></slot>
</div>