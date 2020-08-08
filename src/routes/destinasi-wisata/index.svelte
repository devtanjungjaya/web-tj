<script context="module">
    export function preload({ params, query }) {
       return this.fetch(`destinasi-wisata.json`)
       .then(r => r.json())
       .then(({ destinations, destinationCategories, destinationFacilities, promotions }) => {
          return { destinations, destinationCategories, destinationFacilities, promotions };
       });
    }
</script>

<script>
    import DestinationItem from "../../components/listing/DestinationItem.svelte";
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

    const title = "Cari Destinasi Wisata di Buffer Zone KEK Tanjung Lesung";
    const description = "Hidden Treasure of Tanjung Lesung, merupakan tempat wisata yang dekat dengan Jakarta dan Jabodetabek yang berkualitas! Kamu yang bosan dengan kehidupan kota Jakarta dan sekitarnya dan ingin berwisata menjelajahi keindahan alam yang segar dan asri, dapat mengunjungi wisata pantai dan air terjun di Hidden Treasure of Tanjung Lesung. Tidak hanya wisata alam, di Hidden Treasure of Tanjung Lesung juga terdapat wisata budaya seperti sanggar seni dan tari tradisional khas Banten. Penasaran apa saja yang ada di sini? Ayo jelajahi destinasi wisata Hidden Treasure of Tanjung Lesung sekarang!";
    const url = "https://www.bufferzonetanjunglesung.com/destinasi-wisata/"

    export let destinations;
    export let destinationCategories;
    export let destinationFacilities;
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
                values: destinationCategories,
                label: "Kategori",
                itemField: "categories",
                type: "destinations"
            }
        },
        {
            label: "Harga",
            component: PriceFilter,
            props: {
                label: "Harga",
                type: "destinations",
                maxPrice: Math.max(...destinations.map(destination => 
                    Math.max(...destination.prices.map(price => price.value))
                ))
            }
        },
        {
            label: "Fasilitas",
            component: SelectFilter,
            props: {
                values: destinationFacilities,
                label: "Fasilitas",
                type: "destinations",
                itemField: "facilities"
            }
        },
        ...promotions.length ? [{
            label: "Promosi",
            component: SelectFilter,
            props: {
                values: promotions,
                label: "Promosi",
                type: "destinations",
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
        items={destinations}
        itemComponent={DestinationItem}
        filters={filters}
        current="destinasi-wisata"
    />
    <p class="mt-8 p-5 border-1 border-neutral-1 rounded-2xl font-overpass text-xs sm:text-sm text-neutral-4">
        Hidden Treasure of Tanjung Lesung merupakan kawasan desa-desa wisata di sekitar KEK Tanjung Lesung. 
        Kawasan ini adalah salah satu destinasi wisata terbaik dan terindah yang dekat dari Jakarta dan 
        Jabodetabek. Hidden Treasure of Tanjung Lesung memiliki potensi wisata alam seperti pantai yang indah, 
        spot snorkeling, air terjun, hutan mangrove, dsb. Di sini juga terdapat wisata-wisata budaya seperti 
        sanggar batik, sanggar tari, berbagai kerajinan dan kuliner lokal, dsb. Kamu yang bosan dengan kehidupan 
        kota Jakarta dan sekitarnya, dan ingin berwisata menjelajahi keindahan alam yang asri serta menikmati 
        kebudayaan warga desa yang menarik, dapat menjadikan Hidden Treasure of Tanjung Lesung sebagai pilihan 
        destinasi wisata terbaik untukmu. Penasaran apa saja yang ada di sini? Ayo jelajahi destinasi wisata 
        Hidden Treasure of Tanjung Lesung sekarang!
    </p>
</div>