<script context="module">
    export function preload({ params, query }) {
       return this.fetch(`products.json`).then(r => r.json()).then(products => {
          return { products };
       });
    }
</script>

<script>
    import ProductItem from "../../components/ProductItem.svelte";
    import Index from "../index.svelte";

    export let products;
</script>

<div class="flex flex-col px-1 lg:px-16 py-10">
    <div class="flex flex-wrap justify-between">
        {#each products as product}
            <div class="px-1 sm:px-4 pb-4 sm:pb-16 container-product-item">
                <ProductItem {...product} shopName="Toko Kelapa"/>
            </div>
        {/each}
    </div>
</div>