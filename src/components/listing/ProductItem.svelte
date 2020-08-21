<a rel="prefetch" href={`produk-lokal/${slug}`}>
    <div class="h-0 relative w-full" style="padding-bottom: 125%">
        <div class="hover:shadow-md flex flex-col rounded-2xl overflow-hidden absolute w-full h-full">
            <div class="product-img h-0 min-w-0 min-h-0">
                <Image 
                    imgClass="object-cover" 
                    src={photos.length ? 'w_250,c_fill/' + photos[0].photoURI : ""} 
                    alt={photos.length ? photos[0].description : ""} 
                />
            </div>
            <div 
                class="p-2 xs:p-3 flex-grow flex flex-col border-1 border-t-0 border-neutral-1
                rounded-2xl rounded-t-none"
            >
                <span 
                    class="font-bold font-overpass text-primary-7 leading-none xs:leading-tight 
                    text-base xs:text-lg max-line-2"
                >
                    {name}
                </span>
                <span 
                    class="font-overpass font-normal text-neutral-3 flex-grow 
                    text-sm xs:text-base max-line-1"
                >
                    {categories.join(", ")}
                </span>
                <span class="self-end font-overpass font-bold text-neutral-9 text-sm xs:text-base">
                    {price}
                </span>
            </div>
        </div>
        {#if promotions.length}
        <span 
            class="bg-primary-7 py-2 xs:py-3 px-1 xs:px-2 top-0 absolute font-overpass font-bold text-white 
            rounded-b-lg text-sm xs:text-base shadow-lg" 
            style="right: 1.5rem"
        >
            Promo
        </span>
        {/if}
    </div>
</a>

<script>
    import formatRupiah from "../../utilities/currency";
    import Image from '../Image.svelte';

    export let photos;
    export let name;
    export let categories;
    export let prices;
    export let slug;
    export let promotions;

    $: price = prices.length ? formatRupiah(prices[0].value) : "";
</script>
