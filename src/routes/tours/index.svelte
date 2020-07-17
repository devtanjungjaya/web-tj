<script context="module">
    export function preload({ params, query }) {
       return this.fetch(`tours.json`)
       .then(r => r.json())
       .then(({ tours, tourCategories, tourFacilities }) => {
          return { tours, tourCategories, tourFacilities };
       });
    }
</script>

<script>
    import TourItem from "../../components/listing/TourItem.svelte";
    import Grid from "../../components/listing/Grid.svelte";
    import SelectFilter from "../../components/filter/Select.svelte";
    import PriceFilter from "../../components/filter/PriceRange.svelte";
    import Navigation from "../../components/listing/Navigation.svelte";

    export let tours;
    export let tourCategories;
    export let tourFacilities;

    let filters = [];

    $: filters = [
        {
            label: "Kategori",
            component: SelectFilter,
            props: {
                values: tourCategories,
                label: "Kategori",
                itemField: "categories"
            }
        },
        {
            label: "Harga",
            component: PriceFilter,
            props: {
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
                itemField: "facilities"
            }
        }
    ];

</script>

<div class="flex flex-col px-2 sm:px-4 md:px-6 lg:px-16 py-6 space-y-8" style="min-height: inherit">
    <Navigation current="tours" />
    <Grid
        items={tours}
        itemComponent={TourItem}
        filters={filters}
    />
</div>