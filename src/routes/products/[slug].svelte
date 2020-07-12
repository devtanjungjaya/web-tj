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
   import Carousel from '../../components/Carousel.svelte';
   import Contact from "../../components/Contact.svelte";
   import Header from "../../components/Item/Header.svelte";

    export let data;
</script>

<div class="px-4 sm:px-8 md:px-16 py-6 sm:py-12 flex flex-col">
   <Header
      typeURL="products"
      type="PRODUK LOKAL"
      title={data.name}
      categories={data.categories}
   />
 
   <Carousel perPage={{ 1100: 3, 800: 2 }} dots={false}>
      {#each data.photos as photo, i}
         <div 
            class="px-1 sm:px-4"
            style="height: 360px"
         >
            <img class="object-cover w-full h-full rounded-2xl" src={photo} alt={`foto-produk-${i}`} />
         </div>
      {/each}
   </Carousel>

   <div class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-32 mt-10 sm:mt-20">
      <div class="flex flex-col max-w-4xl">
         <p class="font-open-sans text-neutral-5 text-lg sm:text-xl">{data.description}</p>
         <Decorator />
         <Contact {...data.contact} />
      </div>
      <div class="flex flex-col info-panel flex-shrink-0 self-start max-w-full space-y-6">
         <div class="flex flex-col border-1 border-neutral-1 rounded-2xl px-6 py-4">
            {#if data.prices.length > 1}
               <span class="font-overpass font-bold text-neutral-3 text-lg sm:text-xl">Harga</span>
               <div class="flex flex-col space-y-6 mt-4">
                  {#each data.prices as price}
                     <div class="flex flex-col font-overpass font-bold">
                        <span class="text-primary-7 font-semibold text-xl sm:text-2xl leading-none">{price.value}</span>
                        <span class="text-neutral-2 text-base sm:text-lg">
                           {price.description}
                        </span>
                     </div>
                  {/each}
               </div>
            {:else}
               <span class="font-overpass font-bold text-neutral-3 text-base sm:text-lg">Harga</span>
               <span class="font-overpass font-semibold text-primary-7 text-xl sm:text-2xl">{data.prices[0].value}</span>
            {/if}
         </div>
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