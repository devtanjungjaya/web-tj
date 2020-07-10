<script context="module">
    export function preload({ params, query }) {
       return this.fetch(`products.json`).then(r => r.json()).then(products => {
          return { products };
       });
    }
 </script>

 <script>
     import ProductItem from "../../components/ProductItem.svelte";

     export let products;
 </script>

 <ProductItem {...products[0]} shopName="Toko Kelapa" />