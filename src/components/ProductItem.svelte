<a rel="prefetch" href={`products/${slug}`}>
    <div class="h-0 relative w-full" style="padding-bottom: 122%">
        <div class="flex flex-col rounded-2xl border-2 border-neutral-1 overflow-hidden absolute w-full h-full">
            <img class="product-img h-0 object-cover" src={photos[0]} alt={name}/>
            <div class="p-3 flex-grow flex flex-col">
                <span class="font-bold font-overpass text-primary-7 leading-none sm:leading-tight text-base sm:text-lg md:text-xl">{name}</span>
                <span class="font-overpass font-normal text-neutral-3 flex-grow text-xs sm:text-sm md:text-base">{shopName}</span>
                <span class="self-end font-overpass font-bold text-neutral-9 text-xs sm:text-sm md:text-base">{price}</span>
            </div>
        </div>
    </div>
</a>

<style type="text/postcss">
.product-img {
    flex-basis: 60%;
}
</style>

<script>
    import formatRupiah from "../utilities/currency";
    export let photos;
    export let name;
    export let shopName;
    export let prices;
    export let slug;

    let price;

    $: price = formatRupiah(prices[0].value);
</script>
