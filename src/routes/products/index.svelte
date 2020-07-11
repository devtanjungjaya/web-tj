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

<div class="flex flex-col px-2 md:px-6 lg:px-16 py-10">
    <div class="grid gap-2 lg:gap-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 listing">
        {#each [products[0], products[0], products[0], products[0], products[0]] as product}
            <div class="pb-2 md:pb-4 xl:pb-16 container-product-item">
                <ProductItem {...product} shopName="Toko Kelapa"/>
            </div>
        {/each}
    </div>
</div>

<style type="text/postcss">
.listing {
    justify-items: stretch;
}
</style>