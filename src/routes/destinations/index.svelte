<script context="module">
    export function preload({ params, query }) {
       return this.fetch(`destinations.json`)
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

    const title = "Cari Destinasi Wisata di Buffer Zone KEK Tanjung Lesung";
    const description = "Cari Destinasi Wisata di Buffer Zone KEK Tanjung Lesung";

    export let destinations;
    export let destinationCategories;
    export let destinationFacilities;
    export let promotions;

    let filters = [];

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
   <meta name="description" content={description} />
   <meta property="og:title" content={title} />
   <meta property="og:type" content="website" />
   <meta property="og:description" content={description} />
   <meta property="og:image" content="images/landing-1.webp" />
   <meta name="twitter:title" content={title}>
   <meta name="twitter:description" content={description}>
   <meta name="twitter:image" content="images/landing-1.webp">
</svelte:head>

<div class="flex flex-col px-2 xs:px-4 md:px-6 lg:px-16 py-6 lg:py-10 min-h-screen">
    <Grid
        items={destinations}
        itemComponent={DestinationItem}
        filters={filters}
        current="destinations"
    />
</div>