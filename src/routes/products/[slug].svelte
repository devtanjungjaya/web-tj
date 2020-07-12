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
   import Contact from "../../components/Contact.svelte";
   import Header from "../../components/Item/Header.svelte";
   import Photos from "../../components/Item/Photos.svelte";
   import Prices from "../../components/Item/Prices.svelte";

   export let data;
</script>

<div class="px-4 sm:px-8 md:px-16 py-6 sm:py-12 flex flex-col">
   <Header
      typeURL="products"
      type="PRODUK LOKAL"
      title={data.name}
      category={data.category}
   />
 
   <Photos photos={data.photos} />

   <div class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-32 mt-10 sm:mt-20">
      <div class="flex flex-col max-w-4xl">
         <p class="font-open-sans text-neutral-5 text-lg sm:text-xl">{data.description}</p>
         <Decorator />
         <Contact {...data.contact} />
      </div>
      <div class="flex flex-col info-panel flex-shrink-0 self-start max-w-full space-y-6">
         <Prices prices={data.prices} />
         {#if data.ecommerce}
            <a 
               href={data.ecommerce}
               target="_blank" 
               rel="noopener noreferrer"
               class="flex border-1 border-neutral-1 rounded-2xl px-5 sm:px-6 py-3 sm:py-4 cursor-pointer 
               items-center hover:bg-gray-100"
            >
               <img class="w-6 h-6 sm:w-7 sm:h-7" src="ic_ecommerce.svg" alt="ecommerce"/>
               <span class="ml-3 font-overpass font-bold text-primary-8 text-lg sm:text-xl">Tautan toko daring</span>
            </a>
         {/if}
      </div>
   </div>
</div>

<style type="text/postcss">
.info-panel {
   width: 375px;
}
</style>