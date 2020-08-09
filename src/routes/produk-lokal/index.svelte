<script context="module">
    export function preload({ params, query }) {
       return this.fetch(`produk-lokal.json`)
       .then(r => r.json())
       .then(({ products, productCategories, promotions }) => {
          return { products, productCategories, promotions };
       });
    }
</script>

<script>
    import ProductItem from "../../components/listing/ProductItem.svelte";
    import Grid from "../../components/listing/Grid.svelte";
    import SelectFilter from "../../components/filter/Select.svelte";
    import PriceFilter from "../../components/filter/PriceRange.svelte";
    import Navigation from "../../components/listing/Navigation.svelte";
    import { onMount, tick } from 'svelte';
    import { stores } from '@sapper/app';
    import { scrollHistory } from '../../stores';
    const { page } = stores();

    onMount(async () => {
        await tick();
        window.scrollTo(0, $scrollHistory[$page.path] || 0);
        initialized = true;
    })

    const title = "Cari Produk Lokal di Buffer Zone KEK Tanjung Lesung";
    const description = "Cari Produk Lokal di Buffer Zone KEK Tanjung Lesung";
    const url = "https://www.bufferzonetanjunglesung.com/produk-lokal/";

    export let products = [];
    export let productCategories;
    export let promotions;

    let filters = [];
    let initialized = false;
    let scrollY;

    $: if(initialized) $scrollHistory = { ...$scrollHistory, [$page.path]: scrollY};
    $: filters = [
        {
            label: "Kategori",
            component: SelectFilter,
            props: {
                values: productCategories,
                label: "Kategori",
                type: "products",
                itemField: "categories"
            }
        },
        {
            label: "Harga",
            component: PriceFilter,
            props: {
                label: "Harga",
                type: "products",
                maxPrice: Math.max(...products.map(product => 
                    Math.max(...product.prices.map(price => price.value))
                ))
            }
        },
        ...promotions.length ? [{
            label: "Promosi",
            component: SelectFilter,
            props: {
                values: promotions,
                label: "Promosi",
                type: "products",
                itemField: "promotions",
                itemFieldFn: (promotions) => promotions.map(p => p.promotion)
            }
        }] : []
    ];

</script>

<svelte:head>
   <title>{title}</title>
   <link rel="canonical" href={url} />
   <meta name="description" content={description} />
   <meta property="og:title" content={title} />
   <meta property="og:type" content="website" />
   <meta property="og:description" content={description} />
   <meta property="og:image" content="images/landing-1.webp" />
   <meta property="og:url" content={url} />
   <meta name="twitter:card" content="summary" />
   <meta name="twitter:title" content={title}>
   <meta name="twitter:description" content={description}>
   <meta name="twitter:image" content="images/landing-1.webp">
</svelte:head>

<svelte:window bind:scrollY={scrollY} />

<div class="flex flex-col px-2 xs:px-4 md:px-6 lg:px-16 pt-6 lg:pt-10 min-h-screen">
    <Grid
        items={products}
        itemComponent={ProductItem}
        filters={filters}
        current="produk-lokal"
    />
    <p class="mt-8 p-5 border-1 border-neutral-1 rounded-2xl font-overpass text-xs sm:text-sm text-neutral-4">
        Hidden Treasure of Tanjung Lesung merupakan kawasan desa-desa wisata di sekitar KEK Tanjung Lesung. 
        Dengan kreativitasnya, warga desa di sini memproduksi berbagai kerajinan tangan, batik, kuliner 
        tradisional, dan produk-produk lokal lainnya. Produk-produk khas yang dibuat oleh warga desa sangatlah 
        menarik dan tentunya berkualitas. Unsur-unsur budaya turut dimasukkan ke dalam produk hasil karya tangan 
        terampil warga desa. Dengan membeli produk-produk ini, Anda juga turut berkontribusi untuk kesejahteraan 
        warga desa. Ayo segera dapatkan produk-produk unik dan menarik khas Hidden Treasure of Tanjung Lesung!
    </p>
</div>
