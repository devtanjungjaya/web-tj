<div class="flex flex-col border-1 border-neutral-1 rounded-2xl p-5">
    <span class="font-overpass font-bold text-neutral-3 text-lg sm:text-xl">Harga</span>
    <div class="flex flex-col space-y-6 mt-4">
        {#each prices as price}
            <div class="flex flex-col font-overpass font-bold">
            <span class="text-primary-7 font-semibold text-xl sm:text-2xl leading-none">
                {formatRupiah(price.value)} {price.unit ? `/ ${price.unit}` : ''}
            </span>
            <span class="text-neutral-2 text-base sm:text-lg">
                {price.description}
            </span>
            </div>
        {/each}
    </div>
 </div>

 <script>
     import formatRupiah from "../../utilities/currency";

     export let prices;
 </script>