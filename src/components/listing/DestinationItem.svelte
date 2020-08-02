<a rel="prefetch" href={`destinations/${slug}`}>
    <div class="h-0 relative w-full" style="padding-bottom: 125%">
        <div 
            class="hover:shadow-md flex flex-col rounded-2xl overflow-hidden absolute 
            w-full h-full"
        >
            <div class="product-img h-0 min-w-0 min-h-0">
                <Image 
                    class="object-cover w-full h-full"
                    placeholderClass="w-full h-full object-cover"
                    wrapperClass="w-full h-full skeleton-box"
                    ratio="68.75%"
                    src={photos[0].photoURI} 
                    alt=""
                />
            </div>
            <div 
                class="p-2 sm:p-3 flex-grow flex flex-col border-1 border-t-0 border-neutral-1 
                rounded-2xl rounded-t-none"
            >
                <span 
                    class="font-bold font-overpass text-primary-7 leading-none sm:leading-tight 
                    text-base xs:text-lg max-line-2"
                >
                    {name}
                </span>
                <span class="font-overpass font-normal text-neutral-3 flex-grow text-base xs:text-lg max-line-1">
                    {categories.join(", ")}
                </span>
                <!-- <span class="self-end font-overpass font-bold text-neutral-9 text-xs sm:text-sm lg:text-base">
                    {price}
                </span> -->
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
    import Image from "svelte-image";

    export let photos;
    export let name;
    export let categories;
    export let prices;
    export let slug;
    export let promotions = [];

    $: price = formatRupiah(prices[0].value)
</script>
