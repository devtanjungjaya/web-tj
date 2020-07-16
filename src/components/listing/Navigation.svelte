<div class="flex space-x-10 font-overpass font-bold text-xl overflow-x-auto">
    {#each navigations as navigation}
        <a 
            class={`${current == navigation.url ? 'text-primary-7' : 'text-neutral-2 hover:text-neutral-4'} nav`}
            rel="prefetch" 
            href={navigation.url}
        >
            {navigation.label}
        </a>
    {/each}
</div>

<script>
    export let current;

    const navigations = [
        {
            label: "DESTINASI WISATA",
            url: "destinations"
        },
        {
            label: "PAKET WISATA",
            url: "tours"
        },
        {
            label: "PRODUK LOKAL",
            url: "products"
        },
        {
            label: "PENGINAPAN",
            url: "rooms"
        }
    ]
</script>