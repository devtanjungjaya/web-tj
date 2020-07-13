<script context="module">
    export function preload({ params, query }) {
       return this.fetch(`products.json`)
       .then(r => r.json())
       .then(products => {
          return { products };
       });
    }
</script>

<script>
    import ProductItem from "../../components/ProductItem.svelte";
    import Grid from "../../components/listing/Grid.svelte";

    export let products;
</script>

<div class="flex flex-col px-2 md:px-6 lg:px-16 py-10">
    <Grid
        items={products}
        itemComponent={ProductItem}
    />
</div>