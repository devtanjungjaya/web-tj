<div 
    class="flex flex-no-wrap overflow-x-auto scrolling-touch pl-5 space-x-6
    md:px-10 md:grid md:gap-3 md:grid-cols-3 md:space-x-0 
    lg:px-0 lg:flex lg:space-x-1 lg:justify-center shortcut xl:space-x-6"
>
    {#each items as item, i}
        <a 
            rel="prefetch" 
            href={item.url}
            class={`px-4 md:px-8 py-2 pt-3 md:py-3 md:pt-4 bg-primary-7 rounded-2xl font-overpass font-bold 
            text-white w-full lg:w-auto text-lg md:text-xl xl:text-2xl 2xl:text-3xl leading-tight inline-block 
            items-center hover:bg-primary-8 whitespace-no-wrap ${i === items.length - 1 ? 'last' : ''}`}
        >
            {item.label}
        </a>
    {/each}
</div>

<style type="text/postcss">
    .shortcut::-webkit-scrollbar {    
        display: none;
    }
    .shortcut {
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    @media (max-width: 768px) {
        .shortcut::after {
            display: block;
            content: " ";
            height: 20px;
            min-width: 1.25rem;
        }
        .shortcut {
            margin-left: -1.25rem;
            margin-right: -1.25rem;
        }
    }
</style>

<script>
    const items = [
        {
            label: 'Cara ke sini',
            url: 'transport'
        },
        {
            label: "Destinasi Wisata",
            url: "destinasi-wisata"
        },
        {
            label: "Paket Wisata",
            url: "tours"
        },
        {
            label: "Produk Lokal",
            url: "produk-lokal"
        },
        {
            label: "Penginapan",
            url: "rooms"
        }
    ]
</script>