<script context="module">
   export async function preload({ params: { slug }, query }) {
      const res = await this.fetch(`products/${slug}.json`);
      const data = await res.json();
      if (res.status === 200) {
         return { data };
      } else {
         this.error(res.status, data.message);
      }
   }
</script>

<script>
   import Decorator from "../../components/Decorator.svelte";
   import Contact from "../../components/Item/Contact.svelte";
   import Header from "../../components/Item/Header.svelte";
   import Photos from "../../components/Item/Photos.svelte";
   import Prices from "../../components/Item/Prices.svelte";
   import Link from "../../components/Item/Link.svelte";
   import { onMount } from "svelte";

   let DOMPurify = null;

   onMount(async () => {
      DOMPurify = await import('dompurify');
   })

   export let data;
</script>

<div class="px-4 sm:px-8 md:px-16 py-6 sm:py-12 flex flex-col">
   <Header
      typeURL="products"
      type="PRODUK LOKAL"
      title={data.name}
      categories={data.categories}
   />
 
   <Photos photos={data.photos} />

   <div class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-10 xl:space-x-32 mt-10 sm:mt-20">
      <div class="flex flex-col flex-grow max-w-4xl">
         {#if DOMPurify}
            <p class="font-open-sans text-neutral-5 text-lg sm:text-xl">
               {@html DOMPurify.sanitize(data.description)}
            </p>
            <Decorator />
         {/if}
         <Contact {...data.contact} />
      </div>
      <div class="flex flex-col flex-shrink-0 self-start max-w-full space-y-6" style="width: 375px">
         <Prices prices={data.prices} />
         <!-- {#if data.ecommerce}
            <Link url={data.ecommerce} icon="ic_ecommerce.svg" label="Tautan toko daring" />
         {/if} -->
      </div>
   </div>
</div>