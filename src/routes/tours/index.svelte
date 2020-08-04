<script context="module">
    export function preload({ params, query }) {
       return this.fetch(`tours.json`)
       .then(r => r.json())
       .then(({ tours, tourCategories, tourFacilities, promotions }) => {
          return { tours, tourCategories, tourFacilities, promotions };
       });
    }
</script>

<script>
    import TourItem from "../../components/listing/TourItem.svelte";
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

    const title = "Cari Paket Wisata di Buffer Zone KEK Tanjung Lesung";
    const description = "Cari Paket Wisata di Buffer Zone KEK Tanjung Lesung";

    export let tours;
    export let tourCategories;
    export let tourFacilities;
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
                values: tourCategories,
                label: "Kategori",
                type: "tours",
                itemField: "categories"
            }
        },
        {
            label: "Harga",
            component: PriceFilter,
            props: {
                type: "tours",
                label: "Harga",
                maxPrice: Math.max(...tours.map(tour => 
                    Math.max(...tour.prices.map(price => price.value))
                ))
            }
        },
        {
            label: "Fasilitas",
            component: SelectFilter,
            props: {
                values: tourFacilities,
                label: "Fasilitas",
                type: "tours",
                itemField: "facilities"
            }
        },
        ...promotions.length ? [{
            label: "Promosi",
            component: SelectFilter,
            props: {
                values: promotions,
                label: "Promosi",
                type: "tours",
                itemField: "promotions",
                itemFieldFn: (promotions) => promotions.map(p => p.promotion)
            }
        }] : []
    ];

</script>

<svelte:head>
   <title>{title}</title>
   <meta name="description" content={description} />
   <meta property="og:title" content={title} />
   <meta property="og:type" content="website" />
   <meta property="og:description" content={description} />
   <meta property="og:image" content="images/landing-1.webp" />
   <meta name="twitter:title" content={title}>
   <meta name="twitter:description" content={description}>
   <meta name="twitter:image" content="images/landing-1.webp">
</svelte:head>

<svelte:window bind:scrollY={scrollY} />

<div class="flex flex-col px-2 xs:px-4 md:px-6 lg:px-16 py-6 lg:py-10 min-h-screen">
    <Grid
        items={tours}
        itemComponent={TourItem}
        filters={filters}
        current="tours"
    />
</div>