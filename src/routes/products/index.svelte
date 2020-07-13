<script context="module">
    export function preload({ params, query }) {
       return this.fetch(`products.json`)
       .then(r => r.json())
       .then(({ products, productCategories }) => {
          return { products, productCategories };
       });
    }
</script>

<script>
    import ProductItem from "../../components/listing/ProductItem.svelte";
    import Grid from "../../components/listing/Grid.svelte";
    import SelectFilter from "../../components/filter/Select.svelte";
    import PriceFilter from "../../components/filter/PriceRange.svelte";

    export let products = [];
    export let productCategories;

    let filters = [];

    $: filters = [
        {
            label: "Kategori",
            component: SelectFilter,
            props: {
                values: productCategories,
                label: "Kategori",
                itemField: "categories"
            }
        },
        {
            label: "Harga",
            component: PriceFilter,
            props: {
                maxPrice: Math.max(...products.map(product => 
                    Math.max(...product.prices.map(price => price.value))
                ))
            }
        }
    ];

</script>

<Grid
    items={products}
    itemComponent={ProductItem}
    filters={filters}
/>
