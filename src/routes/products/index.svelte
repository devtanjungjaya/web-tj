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
    import ProductItem from "../../components/listing/ProductItem.svelte";
    import Grid from "../../components/listing/Grid.svelte";

    export let products;
</script>

<Grid
    items={products}
    itemComponent={ProductItem}
/>
