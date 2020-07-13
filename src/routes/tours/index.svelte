<script context="module">
    export function preload({ params, query }) {
       return this.fetch(`tours.json`)
       .then(r => r.json())
       .then(tours => {
          return { tours };
       });
    }
</script>

<script>
    import TourItem from "../../components/listing/TourItem.svelte";
    import Grid from "../../components/listing/Grid.svelte";

    export let tours;
</script>

<div class="flex flex-col px-2 md:px-6 lg:px-16 py-10">
    <Grid
        items={tours}
        itemComponent={TourItem}
    />
</div>