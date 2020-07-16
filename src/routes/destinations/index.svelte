<script context="module">
    export function preload({ params, query }) {
       return this.fetch(`destinations.json`)
       .then(r => r.json())
       .then(({ destinations, destinationCategories, destinationFacilities }) => {
          return { destinations, destinationCategories, destinationFacilities };
       });
    }
</script>

<script>
    import DestinationItem from "../../components/listing/DestinationItem.svelte";
    import Grid from "../../components/listing/Grid.svelte";
    import SelectFilter from "../../components/filter/Select.svelte";
    import PriceFilter from "../../components/filter/PriceRange.svelte";
    import Navigation from "../../components/listing/Navigation.svelte";

    export let destinations;
    export let destinationCategories;
    export let destinationFacilities;

    let filters = [];

    $: filters = [
        {
            label: "Kategori",
            component: SelectFilter,
            props: {
                values: destinationCategories,
                label: "Kategori",
                itemField: "categories"
            }
        },
        {
            label: "Harga",
            component: PriceFilter,
            props: {
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
                itemField: "facilities"
            }
        }
    ];

</script>

<div class="flex flex-col px-2 md:px-6 lg:px-16 py-10 space-y-8" style="min-height: inherit">
    <Navigation current="destinations" />
    <Grid
        items={destinations}
        itemComponent={DestinationItem}
        filters={filters}
    />
</div>