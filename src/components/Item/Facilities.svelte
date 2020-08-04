<div class="flex flex-col font-overpass">
    <span class="font-bold text-neutral-5 text-2xl sm:text-3xl mb-6">{label}</span>
    {#if facilities.length < 4}
        <div class="flex flex-col space-y-6">
            {#each facilities as facility}
                <FacilityItem
                    icon={iconMap[facility] || 'ic_sparkles.svg'}
                    label={facility}
                />
            {/each}
        </div>
    {:else}
        <div class="grid gap-6 grid-cols-2">
            {#each facilities as facility}
                <FacilityItem
                    icon={iconMap[facility] || 'ic_sparkles.svg'}
                    label={facility}
                />
            {/each}
        </div>
    {/if}
</div>

<script>
    import FacilityItem from "./FacilityItem.svelte";

    export let iconMap;
    export let facilities;

    export let label = "Fasilitas";
</script>