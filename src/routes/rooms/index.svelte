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
                type: "rooms",
                unique: true
            }
        },
        {
            label: "Harga",
            component: PriceFilter,
            props: {
                type: "rooms",
                label: "Harga",
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
                type: "rooms",
                itemField: "publicFacilities"
            }
        },
        {
            label: "Fasilitas kamar",
            component: SelectFilter,
            props: {
                values: roomFacilities,
                label: "Fasilitas kamar",
                type: "rooms",
                itemField: "roomFacilities"
            }
        }
    ];

</script>

<div class="flex flex-col px-2 xs:px-4 md:px-6 lg:px-16 py-6 lg:py-10 min-h-screen">
    <Grid
        items={rooms}
        itemComponent={RoomItem}
        filters={filters}
        current="rooms"
    />
</div>