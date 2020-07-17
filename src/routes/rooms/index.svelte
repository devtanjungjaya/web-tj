<script context="module">
    export function preload({ params, query }) {
       return this.fetch(`rooms.json`)
       .then(r => r.json())
       .then(({ rooms, roomCategories, roomFacilities, publicFacilities }) => {
          return { rooms, roomCategories, roomFacilities, publicFacilities };
       });
    }
</script>

<script>
    import RoomItem from "../../components/listing/RoomItem.svelte";
    import Grid from "../../components/listing/Grid.svelte";
    import SelectFilter from "../../components/filter/Select.svelte";
    import PriceFilter from "../../components/filter/PriceRange.svelte";
    import Navigation from "../../components/listing/Navigation.svelte";

    export let rooms;
    export let roomCategories;
    export let roomFacilities;
    export let publicFacilities;

    let filters = [];

    $: filters = [
        {
            label: "Kategori",
            component: SelectFilter,
            props: {
                values: roomCategories,
                label: "Kategori",
                itemField: "categories",
                unique: true
            }
        },
        {
            label: "Harga",
            component: PriceFilter,
            props: {
                maxPrice: Math.max(...rooms.map(room => 
                    Math.max(...room.prices.map(price => price.value))
                ))
            }
        },
        {
            label: "Fasilitas publik",
            component: SelectFilter,
            props: {
                values: publicFacilities,
                label: "Fasilitas publik",
                itemField: "publicFacilities"
            }
        },
        {
            label: "Fasilitas kamar",
            component: SelectFilter,
            props: {
                values: roomFacilities,
                label: "Fasilitas kamar",
                itemField: "roomFacilities"
            }
        }
    ];

</script>

<div class="flex flex-col px-2 md:px-6 lg:px-16 py-6 space-y-8" style="min-height: inherit">
    <Navigation current="rooms" />
    <Grid
        items={rooms}
        itemComponent={RoomItem}
        filters={filters}
    />
</div>