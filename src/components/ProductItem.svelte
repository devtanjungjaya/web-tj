<a rel="prefetch" href={`products/${slug}`}>
    <div class="flex flex-col rounded-2xl border-2 border-neutral-1 overflow-hidden h-64 product-item">
        <img class="product-img h-0 object-cover" src={photos[0]} alt={name}/>
        <div class="p-3 flex-grow flex flex-col">
            <span class="font-bold font-overpass text-primary-7 text-xl">{name}</span>
            <span class="font-overpass font-normal text-neutral-3 text-base">{shopName}</span>
            <span class="self-end font-overpass font-bold text-neutral-9 text-base">{price}</span>
        </div>
    </div>
</a>

<style type="text/postcss">
.product-item {
    max-width: 233px;
}
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
