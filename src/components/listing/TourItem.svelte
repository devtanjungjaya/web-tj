<a rel="prefetch" href={`tours/${slug}`}>
    <div class="h-0 relative w-full" style="padding-bottom: 122%">
        <div 
            class="hover:shadow-md flex flex-col rounded-2xl border-1 border-neutral-1 overflow-hidden absolute 
            w-full h-full"
        >
            <img class="product-img h-0 object-cover bg-neutral-1" src={photos[0]} alt={name}/>
            <div class="p-3 flex-grow flex flex-col">
                <span 
                    class="font-bold font-overpass text-primary-7 leading-none sm:leading-tight 
                    text-base sm:text-lg lg:text-xl"
                >
                    {name}
                </span>
                <span class="font-overpass font-normal text-neutral-3 flex-grow text-xs sm:text-sm lg:text-base">
                    {categories.join(", ")}
                </span>
                <span class="self-end font-overpass font-bold text-neutral-9 text-xs sm:text-sm lg:text-base">
                    {prices[0].value}
                </span>
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
    import formatRupiah from "../../utilities/currency";
    export let photos;
    export let name;
    export let categories;
    export let prices;
    export let slug;
</script>
