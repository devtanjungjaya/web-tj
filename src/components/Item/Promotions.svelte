<div class="p-5 rounded-2xl border-1 border-neutral-1 flex flex-col mb-6 max-w-xl">
    <span class="font-overpass font-bold text-neutral-3 text-base sm:text-lg mb-2">Promo</span>
    {#each promotions as promotion}
        <div class="flex flex-col space-y-1">
            <span class="font-overpass font-bold text-primary-7 text-lg sm:text-xl">{promotion.promotion}</span>
            <span class="font-open-sans font-normal text-neutral-4 text-base sm:text-lg">{promotion.description}</span>
        </div>
    {/each}
</div>

<script>
    export let promotions;
</script>